import importlib.util
import io
import json
import pathlib
import tempfile
import sys
sys.dont_write_bytecode = True
import unittest
import urllib.error
from unittest.mock import patch
spec = importlib.util.spec_from_file_location("collector", pathlib.Path(__file__).parent.parent / "examples/multi-vendor-collector/collector.py")
collector = importlib.util.module_from_spec(spec)
spec.loader.exec_module(collector)
class Reply:
    status = 202
    def __init__(self, body): self.body = body
    def __enter__(self): return self
    def __exit__(self, *args): pass
    def read(self): return json.dumps(self.body).encode()
class ReplayTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        collector.SPOOL = pathlib.Path(self.temp.name)
        collector.DRY_RUN = False
        collector.ENDPOINT = "https://example.test/metrics"
        self.payload = {"collectorId": "c1", "schemaVersion": "1.0", "samples": [{"deviceId": "d1"}]}
    def tearDown(self): self.temp.cleanup()
    def queued(self):
        collector.persist(self.payload, "request-one")
        return collector.SPOOL / "request-one.json"
    def test_failed_replay_retains_original_file_and_request_id(self):
        path = self.queued()
        with patch.object(collector.urllib.request, "urlopen", side_effect=urllib.error.URLError("offline")) as request:
            collector.replay()
        self.assertTrue(path.exists())
        self.assertEqual(json.loads(path.read_text()), self.payload)
        self.assertEqual(request.call_args.args[0].get_header("X-request-id"), "request-one")
    def test_acknowledged_replay_deletes_only_accepted_payload(self):
        path = self.queued()
        with patch.object(collector.urllib.request, "urlopen", return_value=Reply({"accepted": True, "counts": {"accepted": 1, "duplicate": 0, "rejected": 0}})):
            collector.replay()
        self.assertFalse(path.exists())
    def test_partial_response_is_preserved_in_quarantine(self):
        path = self.queued()
        with patch.object(collector.urllib.request, "urlopen", return_value=Reply({"accepted": False, "counts": {"accepted": 0, "rejected": 1}, "errors": [{"reason": "Expired sample"}]})):
            collector.replay()
        self.assertFalse(path.exists())
        self.assertTrue((collector.SPOOL / "rejected/request-one.json").exists())
        self.assertTrue((collector.SPOOL / "rejected/request-one.response.json").exists())
    def test_permanent_http_rejection_keeps_payload(self):
        self.queued()
        error = urllib.error.HTTPError("https://example.test", 422, "Invalid", {}, io.BytesIO(b"expired"))
        with patch.object(collector.urllib.request, "urlopen", side_effect=error): collector.replay()
        self.assertTrue((collector.SPOOL / "rejected/request-one.json").exists())
    def test_malformed_acknowledgement_is_not_delivery(self):
        path = self.queued()
        with patch.object(collector.urllib.request, "urlopen", return_value=Reply({"accepted": True})):
            collector.replay()
        self.assertTrue(path.exists())
if __name__ == "__main__": unittest.main()
