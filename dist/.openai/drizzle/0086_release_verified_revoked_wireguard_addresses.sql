INSERT INTO audit_events(id,actor_email,action,resource_type,resource_id,outcome,metadata,created_at)
SELECT 'wg-release-repair-5f135497-v2','system@nocx.local','wireguard.address.released','wireguard_enrollment',e.id,'allowed','{"address":"10.66.66.18","deviceId":"device-wg-5f135497-4b07-4c20-898c-a9a24890dfd2","reason":"verified-repair"}',CURRENT_TIMESTAMP
FROM wireguard_enrollments e
JOIN devices d ON d.id=e.device_id
WHERE e.id='5f135497-4b07-4c20-898c-a9a24890dfd2' AND e.device_id='device-wg-5f135497-4b07-4c20-898c-a9a24890dfd2' AND e.status='revoked' AND e.address='10.66.66.18'
  AND d.source='wireguard-self-service' AND d.management_ip='10.66.66.18'
  AND NOT EXISTS(SELECT 1 FROM network_monitoring_registrations r WHERE r.device_id=e.device_id AND r.status<>'disabled')
ON CONFLICT(id) DO NOTHING;
--> statement-breakpoint
UPDATE devices SET management_ip=NULL,status='unknown',updated_at=CURRENT_TIMESTAMP
WHERE id='device-wg-5f135497-4b07-4c20-898c-a9a24890dfd2' AND source='wireguard-self-service' AND management_ip='10.66.66.18'
  AND EXISTS(SELECT 1 FROM wireguard_enrollments e WHERE e.id='5f135497-4b07-4c20-898c-a9a24890dfd2' AND e.device_id=devices.id AND e.status='revoked' AND e.address='10.66.66.18')
  AND NOT EXISTS(SELECT 1 FROM network_monitoring_registrations r WHERE r.device_id=devices.id AND r.status<>'disabled');
--> statement-breakpoint
INSERT INTO audit_events(id,actor_email,action,resource_type,resource_id,outcome,metadata,created_at)
SELECT 'wg-release-repair-ea90369a-v2','system@nocx.local','wireguard.address.released','wireguard_enrollment',e.id,'allowed','{"address":"10.66.66.19","deviceId":"device-wg-ea90369a-78de-44f0-8026-24140aaecac6","reason":"verified-repair"}',CURRENT_TIMESTAMP
FROM wireguard_enrollments e
JOIN devices d ON d.id=e.device_id
WHERE e.id='ea90369a-78de-44f0-8026-24140aaecac6' AND e.device_id='device-wg-ea90369a-78de-44f0-8026-24140aaecac6' AND e.status='revoked' AND e.address='10.66.66.19'
  AND d.source='wireguard-self-service' AND d.management_ip='10.66.66.19'
  AND NOT EXISTS(SELECT 1 FROM network_monitoring_registrations r WHERE r.device_id=e.device_id AND r.status<>'disabled')
ON CONFLICT(id) DO NOTHING;
--> statement-breakpoint
UPDATE devices SET management_ip=NULL,status='unknown',updated_at=CURRENT_TIMESTAMP
WHERE id='device-wg-ea90369a-78de-44f0-8026-24140aaecac6' AND source='wireguard-self-service' AND management_ip='10.66.66.19'
  AND EXISTS(SELECT 1 FROM wireguard_enrollments e WHERE e.id='ea90369a-78de-44f0-8026-24140aaecac6' AND e.device_id=devices.id AND e.status='revoked' AND e.address='10.66.66.19')
  AND NOT EXISTS(SELECT 1 FROM network_monitoring_registrations r WHERE r.device_id=devices.id AND r.status<>'disabled');
