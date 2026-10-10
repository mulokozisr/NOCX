import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
test("collector replay preserves failures, quarantines rejection and deletes only acknowledgements", () => {
  const result = spawnSync("python3", ["tests/collector_replay.py"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stdout + result.stderr);
});
