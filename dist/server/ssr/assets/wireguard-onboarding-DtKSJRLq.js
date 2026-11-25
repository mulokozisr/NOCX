//#region lib/wireguard-policy.ts
var WG_KEY = /^[A-Za-z0-9+/]{43}=$/;
function ipv4(value) {
	return typeof value === "string" && /^(?:0|[1-9]\d{0,2})(?:\.(?:0|[1-9]\d{0,2})){3}$/.test(value) && value.split(".").every((x) => Number(x) <= 255);
}
function privateIpv4(value) {
	if (!ipv4(value)) return false;
	const [a, b] = value.split(".").map(Number);
	return a === 10 || a === 172 && b >= 16 && b <= 31 || a === 192 && b === 168;
}
function validKey(value) {
	if (typeof value !== "string" || !WG_KEY.test(value)) return false;
	try {
		return btoa(atob(value)) === value && atob(value).length === 32 && !/^A{43}=$/.test(value);
	} catch {
		return false;
	}
}
function endpointValid(value) {
	if (typeof value !== "string") return false;
	const match = /^([a-zA-Z0-9](?:[a-zA-Z0-9.-]{0,251}[a-zA-Z0-9])?):([0-9]{1,5})$/.exec(value);
	return !!match && Number(match[2]) > 0 && Number(match[2]) <= 65535;
}
//#endregion
//#region lib/wireguard-client.ts
function base64(bytes) {
	return btoa(String.fromCharCode(...bytes));
}
async function generateWireguardKeypair() {
	const pair = await crypto.subtle.generateKey({ name: "X25519" }, true, ["deriveBits"]);
	const jwk = await crypto.subtle.exportKey("jwk", pair.privateKey);
	if (!jwk.d) throw new Error("This browser cannot export a WireGuard key");
	return {
		privateKey: jwk.d.replace(/-/g, "+").replace(/_/g, "/").padEnd(44, "="),
		publicKey: base64(new Uint8Array(await crypto.subtle.exportKey("raw", pair.publicKey)))
	};
}
function wireguardArtifact(job, privateKey) {
	if (!validKey(privateKey) || !validKey(job.server_public_key) || !privateIpv4(job.address) || !privateIpv4(job.server_address) || !endpointValid(job.endpoint) || !/^[a-f0-9-]{36}$/.test(job.id)) throw new Error("Invalid connection metadata");
	if (job.vendor === "Cudy") return `[Interface]\nPrivateKey = ${privateKey}\nAddress = ${job.address}/32\n\n[Peer]\nPublicKey = ${job.server_public_key}\nEndpoint = ${job.endpoint}\nAllowedIPs = 10.66.66.0/24\nPersistentKeepalive = 25\n`;
	const name = "wg-nocx-" + job.id.slice(0, 8), [host, port] = job.endpoint.split(":");
	return `# NOC-X WireGuard onboarding. Requires RouterOS 7 with WireGuard support.\n# Keep this script private. It contains this router's private key.\n# VPN subnet routing via DOXA; existing Internet/default routes are preserved.\n{\n:local iface "${name}";\n:if ([:len [/interface wireguard find where name=$iface]] > 0) do={ :error "NOC-X interface already exists. Check the previous import before retrying." };\n/interface wireguard add name=$iface private-key="${privateKey}" comment="NOCX ${job.id}";\n/ip address add address=${job.address}/32 interface=$iface comment="NOCX ${job.id}";\n/interface wireguard peers add interface=$iface public-key="${job.server_public_key}" endpoint-address="${host}" endpoint-port=${port} allowed-address=10.66.66.0/24 persistent-keepalive=25s comment="NOCX ${job.id}";\n/ip route add dst-address=10.66.66.0/24 gateway=$iface comment="NOCX ${job.id}";\n/ip firewall filter add chain=input action=accept protocol=icmp in-interface=$iface src-address=${job.server_address}/32 dst-address=${job.address}/32 comment="NOCX ping ${job.id}";\n:if ([:len [/ip firewall filter find]] > 1) do={ /ip firewall filter move [find where comment="NOCX ping ${job.id}"] 0 };\n:put "NOC-X VPN configured. Return to NOC-X to check the connection.";\n}\n`;
}
/** Flat WireGuard config for an administrator phone or computer (VPN subnet only, no full tunnel). */
function adminClientConfig(job, privateKey) {
	if (!validKey(privateKey) || !validKey(job.server_public_key) || !privateIpv4(job.address) || !endpointValid(job.endpoint)) throw new Error("Invalid connection metadata");
	return `[Interface]\nPrivateKey = ${privateKey}\nAddress = ${job.address}/32\n\n[Peer]\nPublicKey = ${job.server_public_key}\nEndpoint = ${job.endpoint}\nAllowedIPs = 10.66.66.0/24\nPersistentKeepalive = 25\n`;
}
//#endregion
export { generateWireguardKeypair as n, wireguardArtifact as r, adminClientConfig as t };
