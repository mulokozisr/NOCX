import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon } from "./network-CaMqMjRB.js";
import { t as KeyRound } from "./key-round-CSmhIP5z.js";
import { t as Download } from "./download-CU5_C7Ji.js";
import { n as useOperatorAccess } from "./operator-access-CJCL0tBn.js";
import { n as generateWireguardKeypair, t as adminClientConfig } from "./wireguard-onboarding-DtKSJRLq.js";
import { t as Trash2 } from "./trash-2-Z3MGkqFx.js";
import { t as Smartphone } from "./smartphone-DAhfw1Eo.js";
//#region node_modules/lucide-react/dist/esm/icons/qr-code.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var QrCode = createLucideIcon("QrCode", [
	["rect", {
		width: "5",
		height: "5",
		x: "3",
		y: "3",
		rx: "1",
		key: "1tu5fj"
	}],
	["rect", {
		width: "5",
		height: "5",
		x: "16",
		y: "3",
		rx: "1",
		key: "1v8r4q"
	}],
	["rect", {
		width: "5",
		height: "5",
		x: "3",
		y: "16",
		rx: "1",
		key: "1x03jg"
	}],
	["path", {
		d: "M21 16h-3a2 2 0 0 0-2 2v3",
		key: "177gqh"
	}],
	["path", {
		d: "M21 21v.01",
		key: "ents32"
	}],
	["path", {
		d: "M12 7v3a2 2 0 0 1-2 2H7",
		key: "8crl2c"
	}],
	["path", {
		d: "M3 12h.01",
		key: "nlz23k"
	}],
	["path", {
		d: "M12 3h.01",
		key: "n36tog"
	}],
	["path", {
		d: "M12 16v.01",
		key: "133mhm"
	}],
	["path", {
		d: "M16 12h1",
		key: "1slzba"
	}],
	["path", {
		d: "M21 12v.01",
		key: "1lwtk9"
	}],
	["path", {
		d: "M12 21v-1",
		key: "1880an"
	}]
]);
//#endregion
//#region app/vpn-access.tsx
var import_jsx_runtime = require_jsx_runtime();
var NAME = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,79}$/;
var qrLoader = null;
function loadQr() {
	return qrLoader ??= new Promise((resolve, reject) => {
		const w = window;
		if (w.qrcode) return resolve(w.qrcode);
		const s = document.createElement("script");
		s.src = "/nocx-qrcode.js";
		s.onload = () => w.qrcode ? resolve(w.qrcode) : reject(/* @__PURE__ */ new Error("QR unavailable"));
		s.onerror = () => {
			qrLoader = null;
			reject(/* @__PURE__ */ new Error("QR unavailable"));
		};
		document.head.appendChild(s);
	});
}
function download(name, text) {
	const url = URL.createObjectURL(new Blob([text], { type: "text/plain" })), a = document.createElement("a");
	a.href = url;
	a.download = name;
	a.click();
	setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function QrImage({ text }) {
	const [src, setSrc] = (0, import_react.useState)(""), [failed, setFailed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let live = true;
		loadQr().then((q) => {
			const c = q(0, "M");
			c.addData(text);
			c.make();
			if (live) setSrc("data:image/svg+xml;charset=utf-8," + encodeURIComponent(c.createSvgTag({
				cellSize: 4,
				margin: 4
			})));
		}).catch(() => {
			if (live) setFailed(true);
		});
		return () => {
			live = false;
		};
	}, [text]);
	if (failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
		className: "wg-error",
		children: "QR code could not be shown; use Download .conf instead."
	});
	return src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		className: "vpn-qr",
		src,
		alt: "WireGuard configuration QR code",
		width: 240,
		height: 240
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Preparing QR code…" });
}
function statusLabel(job) {
	if (job.status === "queued") return {
		text: "Preparing on the VPN server…",
		tone: "pending"
	};
	if (job.status === "waiting_router" || job.status === "vpn_connected") return {
		text: "Ready — import it on the device",
		tone: "ready"
	};
	if (job.status === "monitoring_active") return job.online === 1 ? {
		text: "Connected",
		tone: "ok"
	} : {
		text: "Not connected right now",
		tone: "idle"
	};
	if (job.status === "revoke_pending") return {
		text: "Removing VPN access",
		tone: "pending"
	};
	if (job.status === "failed") return {
		text: "Needs review",
		tone: "bad"
	};
	return {
		text: job.status,
		tone: "idle"
	};
}
function VpnAccess() {
	const access = useOperatorAccess();
	const [data, setData] = (0, import_react.useState)(null), [error, setError] = (0, import_react.useState)(""), [name, setName] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(false), [keys, setKeys] = (0, import_react.useState)({}), [shown, setShown] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async () => {
		try {
			const r = await fetch("/api/platform/wireguard-onboarding", { cache: "no-store" }), p = await r.json();
			if (!r.ok) throw new Error(p.error || "VPN access is unavailable");
			setData(p);
			setError("");
		} catch (e) {
			setError(e instanceof Error ? e.message : "VPN access is unavailable");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
		const t = setInterval(() => {
			if (!document.hidden) load();
		}, 15e3);
		return () => clearInterval(t);
	}, [load]);
	(0, import_react.useEffect)(() => {
		if (!Object.keys(keys).length) return;
		const before = (e) => {
			e.preventDefault();
			e.returnValue = "";
		};
		window.addEventListener("beforeunload", before);
		return () => window.removeEventListener("beforeunload", before);
	}, [keys]);
	const post = async (payload) => {
		const r = await fetch("/api/platform/wireguard-onboarding", {
			method: "POST",
			headers: access.headers,
			body: JSON.stringify(payload)
		}), body = await r.json();
		if (!r.ok) throw new Error(body.error || "The request failed");
		return body;
	};
	const create = async () => {
		setBusy(true);
		setError("");
		try {
			const pair = await generateWireguardKeypair(), res = await post({
				action: "create_admin_client",
				hostname: name.trim(),
				publicKey: pair.publicKey
			});
			setKeys((k) => ({
				...k,
				[res.id]: pair.privateKey
			}));
			setShown(res.id);
			setName("");
			await load();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not create the VPN access.");
		} finally {
			setBusy(false);
		}
	};
	const remove = async (job) => {
		if (!window.confirm(`Remove VPN access for ${job.hostname}? That phone or computer will no longer connect.`)) return;
		setBusy(true);
		setError("");
		try {
			await post({
				action: "revoke",
				id: job.id
			});
			setKeys((k) => {
				const n = { ...k };
				delete n[job.id];
				return n;
			});
			await load();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Removal failed");
		} finally {
			setBusy(false);
		}
	};
	const jobs = (data?.jobs ?? []).filter((j) => j.model === "admin-client" && j.status !== "revoked");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "workflow-page vpn-access",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "wg-onboarding panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "wg-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "Administrator VPN access"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "WireGuard config for a phone or computer" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Reach the NOC-X VPN (10.66.66.0/24) from your own device. Only VPN traffic uses the tunnel; normal Internet traffic is unchanged." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: data?.hub?.current ? "wg-connected" : "wg-disconnected",
						role: "status",
						children: ["VPN server service: ", data?.hub?.current ? "Connected" : data ? "Not connected" : "Checking…"]
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "wg-error",
					role: "alert",
					children: error
				}),
				data && !data.canConfigureHub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "wg-notice",
					children: "Only the owner or an administrator can create phone or computer VPN access."
				}),
				data?.canConfigureHub && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "vpn-steps",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Name the device" }), "e.g. admin-phone or office-laptop"] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Create the config" }), "The key is made in this browser and never sent to NOC-X"] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Import it" }), "Scan the QR code in the WireGuard app, or import the .conf on a computer"] })] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "vpn-create",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Device name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							maxLength: 80,
							placeholder: "e.g. admin-phone",
							onChange: (e) => setName(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter" && NAME.test(name.trim()) && !busy) create();
							}
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "primary-button",
							onClick: () => void create(),
							disabled: busy || !data.hub?.current || !NAME.test(name.trim()),
							children: busy ? "Working…" : "Create VPN config"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "wg-help",
						children: "Save or scan the config before leaving this page — it can't be shown again. If it's lost, remove that access and create a new one. A config that never connects is removed automatically after 24 hours."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "wg-jobs",
						"aria-live": "polite",
						children: [jobs.map((job) => {
							const key = keys[job.id];
							let conf = null;
							try {
								conf = key && job.address && job.server_public_key ? adminClientConfig(job, key) : null;
							} catch {
								conf = null;
							}
							const s = statusLabel(job);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: job.hostname }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["Phone / computer", job.address ? " · " + job.address : ""] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "vpn-status vpn-" + s.tone,
									children: s.text
								}),
								job.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
									className: "wg-error",
									children: job.error
								}),
								key && !conf && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Waiting for the VPN server to add this peer (usually under a minute)…" }),
								!key && job.status !== "revoke_pending" && job.status !== "monitoring_active" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Config no longer available on this page. If it was lost, remove this access and create a new one." }),
								job.last_observed_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["Last check: ", new Date(job.last_observed_at).toLocaleString()] }),
								conf && shown === job.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrImage, { text: conf })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "wg-job-actions",
								children: [
									conf && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "secondary-button",
										onClick: () => setShown(shown === job.id ? "" : job.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { size: 15 }), shown === job.id ? "Hide QR code" : "Show QR code"]
									}),
									conf && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "secondary-button",
										onClick: () => download("nocx-" + job.hostname + ".conf", conf),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), "Download .conf"]
									}),
									job.status !== "revoke_pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "secondary-button",
										disabled: busy,
										onClick: () => void remove(job),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 15 }), "Remove access"]
									})
								]
							})] }, job.id);
						}), data && !jobs.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "vpn-empty",
							children: "No phone or computer VPN access yet."
						})]
					})
				] })
			]
		})
	});
}
//#endregion
export { VpnAccess as default };
