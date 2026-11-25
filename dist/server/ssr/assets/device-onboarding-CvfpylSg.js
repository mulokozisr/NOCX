import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck, r as Activity, t as Network } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, s as Router } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { n as useOperatorAccess, t as OperatorAccess } from "./operator-access-CJCL0tBn.js";
import { t as Radar } from "./radar-BnxOE1TP.js";
import { t as Wifi } from "./wifi-SlipR1re.js";
import { n as generateWireguardKeypair, r as wireguardArtifact } from "./wireguard-onboarding-DtKSJRLq.js";
//#region app/wireguard-onboarding.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var labels = {
	awaiting_router_key: "Waiting for MikroTik bootstrap",
	queued: "Preparing connection",
	waiting_router: "Waiting for router",
	vpn_connected: "VPN connected · checking reachability",
	monitoring_active: "Monitoring active",
	revoke_pending: "Removing VPN access",
	revoked: "VPN access removed",
	failed: "Needs review"
};
function download(name, text) {
	const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	a.click();
	setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function WireguardOnboarding() {
	const access = useOperatorAccess(), [data, setData] = (0, import_react.useState)(null), [error, setError] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(false), [keys, setKeys] = (0, import_react.useState)({}), [scripts, setScripts] = (0, import_react.useState)({}), [token, setToken] = (0, import_react.useState)(""), [setup, setSetup] = (0, import_react.useState)(false), [collector, setCollector] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)({
		hostname: "",
		vendor: "Cudy",
		siteId: "",
		compatible: false
	});
	const load = (0, import_react.useCallback)(async () => {
		try {
			const r = await fetch("/api/platform/wireguard-onboarding", { cache: "no-store" }), p = await r.json();
			if (!r.ok) throw new Error(p.error || "Onboarding is unavailable");
			setData(p);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Onboarding is unavailable");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
		const timer = setInterval(() => {
			if (!document.hidden) load();
		}, 15e3);
		return () => clearInterval(timer);
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
	const post = async (p) => {
		const r = await fetch("/api/platform/wireguard-onboarding", {
			method: "POST",
			headers: access.headers,
			body: JSON.stringify(p)
		}), body = await r.json();
		if (!r.ok) throw new Error(body.error || "The request failed");
		return body;
	};
	const create = async () => {
		setBusy(true);
		setError("");
		try {
			if (form.vendor === "MikroTik") {
				const result = await post({
					action: "create_mikrotik_bootstrap",
					...form
				});
				setScripts((s) => ({
					...s,
					[result.id]: result.script
				}));
				download("nocx-" + form.hostname + "-bootstrap.rsc", result.script);
			} else {
				const pair = await generateWireguardKeypair();
				const result = await post({
					action: "create",
					...form,
					publicKey: pair.publicKey
				});
				setKeys((k) => ({
					...k,
					[result.id]: pair.privateKey
				}));
			}
			setForm((f) => ({
				...f,
				hostname: "",
				compatible: false
			}));
			await load();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not prepare the connection.");
		} finally {
			setBusy(false);
		}
	};
	const configure = async () => {
		if (data?.hub && !window.confirm("Rotate the service token? The installed VPS service will stop accepting requests until you update its token.")) return;
		setBusy(true);
		setError("");
		try {
			setToken((await post({
				action: "configure_hub",
				collectorId: data?.hub?.collector_id || collector
			})).token);
			await load();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Service setup failed");
		} finally {
			setBusy(false);
		}
	};
	const revoke = async (job) => {
		if (!window.confirm(`Remove VPN access for ${job.hostname}? The VPS service must be connected to complete removal.`)) return;
		setBusy(true);
		setError("");
		try {
			await post({
				action: "revoke",
				id: job.id
			});
			setKeys((k) => {
				const next = { ...k };
				delete next[job.id];
				return next;
			});
			await load();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Revocation failed");
		} finally {
			setBusy(false);
		}
	};
	const refreshBootstrap = async (job) => {
		setBusy(true);
		setError("");
		try {
			const result = await post({
				action: "reissue_mikrotik_bootstrap",
				id: job.id
			});
			setScripts((s) => ({
				...s,
				[job.id]: result.script
			}));
			download("nocx-" + job.hostname + "-bootstrap.rsc", result.script);
			await load();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not refresh the bootstrap script");
		} finally {
			setBusy(false);
		}
	};
	const getArtifact = (job) => {
		try {
			if (job.vendor === "MikroTik" && scripts[job.id]) download("nocx-" + job.hostname + "-bootstrap.rsc", scripts[job.id]);
			else download("nocx-" + job.hostname + ".conf", wireguardArtifact(job, keys[job.id]));
		} catch (e) {
			setError(e instanceof Error ? e.message : "Download failed");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "wg-onboarding panel",
		"aria-labelledby": "wg-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "wg-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "GUIDED VPN SETUP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "wg-title",
						children: "Connect a new Cudy or MikroTik"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Choose the router, get its configuration, then apply it locally. NOC-X prepares the server side automatically." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: data?.hub?.current ? "wg-connected" : "wg-disconnected",
					role: "status",
					children: ["VPS service: ", data?.hub?.current ? "Connected" : data ? "Not connected" : "Checking…"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "wg-error",
				role: "alert",
				children: error
			}),
			!data?.hub?.current && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "wg-notice",
				children: "An administrator must install the provisioning service once on the VPS. After that, permitted staff can onboard routers without accessing the server."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "wg-form",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Router type", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: form.vendor,
						onChange: (e) => setForm((f) => ({
							...f,
							vendor: e.target.value,
							compatible: false
						})),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Cudy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "MikroTik" })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Device name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.hostname,
						maxLength: 80,
						placeholder: "e.g. shanga-router-02",
						onChange: (e) => setForm((f) => ({
							...f,
							hostname: e.target.value
						}))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Site", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: form.siteId,
						onChange: (e) => setForm((f) => ({
							...f,
							siteId: e.target.value
						})),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Assign later"
						}), data?.sites.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.id,
							children: s.name
						}, s.id))]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "wg-check",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: form.compatible,
					onChange: (e) => setForm((f) => ({
						...f,
						compatible: e.target.checked
					}))
				}), form.vendor === "Cudy" ? "This router supports WireGuard client configuration import." : "This router runs RouterOS 7 with WireGuard support."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "wg-help",
				children: [form.vendor === "Cudy" ? "Import the downloaded .conf in the router’s WireGuard client settings, enable it and allow ping from the server VPN address. Keep any “route all traffic through VPN” option off." : "Paste the one-time bootstrap script into the router’s Terminal using a local administrator account. It checks RouterOS, creates the key on the router, sends only the public key to NOC-X, and completes the management tunnel after DOXA prepares the peer.", " Your Internet traffic keeps its existing route."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "primary-button",
				onClick: () => void create(),
				disabled: busy || !access.canWrite || !data?.hub?.current || !form.hostname || !form.compatible,
				children: busy ? "Working…" : "Prepare router connection"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "wg-help",
				children: "This setup enables availability monitoring. New MikroTik bootstrap scripts also configure read-only SNMPv3 through DOXA for uptime, CPU, memory and disk metrics. Statistics appear after successful SNMP reads; VPN connectivity alone does not confirm SNMP. The router model is identified automatically when discovery or read-only SNMP reports it. Cudy private keys remain only in this page and its downloaded file. MikroTik private keys are generated and retained by RouterOS; the one-time bootstrap expires after 15 minutes."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "wg-jobs",
				"aria-live": "polite",
				children: [data?.jobs.filter((job) => job.model !== "admin-client").map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: job.hostname }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						job.vendor,
						" · ",
						job.model || "Model pending identification",
						job.address ? " · " + job.address : ""
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [labels[job.status] || job.status, job.status === "monitoring_active" ? " · " + (job.online === 1 ? "last check reachable" : "last check unreachable") : ""] }),
					job.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "wg-error",
						children: job.error
					}),
					job.last_observed_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["Last check: ", new Date(job.last_observed_at).toLocaleString()] })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wg-job-actions",
					children: [
						job.vendor === "MikroTik" && ![
							"revoked",
							"revoke_pending",
							"failed"
						].includes(job.status) && Date.parse(job.expires_at) > Date.now() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary-button",
							disabled: busy,
							onClick: () => void refreshBootstrap(job),
							children: "Get fresh bootstrap script"
						}),
						job.vendor === "MikroTik" && scripts[job.id] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary-button",
							onClick: () => getArtifact(job),
							children: "Download bootstrap script"
						}),
						job.vendor === "Cudy" && job.address && job.status !== "revoked" && job.status !== "revoke_pending" && (keys[job.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary-button",
							onClick: () => getArtifact(job),
							children: "Download configuration"
						}) : job.status !== "monitoring_active" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Original download required. If lost, remove this request and create a new one with a different device name." })),
						job.status !== "revoked" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary-button",
							disabled: busy || job.status === "revoke_pending",
							onClick: () => void revoke(job),
							children: job.status === "revoke_pending" ? "Removal pending" : "Remove VPN access"
						})
					]
				})] }, job.id)), data && !data.jobs.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No guided VPN connections yet." })]
			}),
			data?.canConfigureHub && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				open: setup,
				onToggle: (e) => setSetup(e.currentTarget.open),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Administrator: one-time VPS setup" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Select the existing monitoring collector, generate a service token and install the service on the WireGuard VPS. This token only authorizes the provisioning queue; it is not a server login." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Monitoring collector", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: data.hub?.collector_id || collector,
						disabled: !!data.hub,
						onChange: (e) => setCollector(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select collector"
						}), data.collectors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.name
						}, c.id))]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: busy || !data.hub && !collector,
						onClick: () => void configure(),
						children: data.hub ? "Rotate service token" : "Generate service token"
					}),
					token && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "wg-secret",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Service token — shown only in this session" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: token }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button",
								onClick: () => void navigator.clipboard.writeText(token).catch(() => setError("Select and copy the service token manually.")),
								children: "Copy token"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button",
								onClick: () => setToken(""),
								children: "Hide token"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/nocx-wireguard-install.sh",
							download: true,
							children: "Download the VPS installer"
						}), " and copy it to your VPS."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Run ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "sudo bash nocx-wireguard-install.sh" }),
							". Enter this NOC-X HTTPS origin, your existing WireGuard interface, pool, VPN server address, public UDP endpoint and the service token when prompted."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The installer checks the existing interface before starting. If SaveConfig is enabled, disable it first to prevent peer persistence conflicts." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Return here and wait for “VPS service: Connected”. Keep the service running for monitoring and revocation." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Existing peers are preserved. New router keys are unique; only the server VPN address is routed through each new tunnel. Unconnected requests expire after 24 hours and are removed when the service next polls." })
				]
			})
		]
	});
}
//#endregion
//#region app/device-onboarding.tsx
function time(value) {
	if (!value) return "Never";
	const parsed = new Date(value);
	return Number.isNaN(parsed.valueOf()) ? "Unavailable" : parsed.toLocaleString("en-GB", {
		timeZone: "Africa/Dar_es_Salaam",
		dateStyle: "medium",
		timeStyle: "short"
	});
}
function onboardingParameters() {
	return typeof window === "undefined" ? new URLSearchParams() : new URLSearchParams(window.location.hash.split("?")[1] ?? "");
}
function initialTab() {
	const value = onboardingParameters().get("tab");
	return value === "mikrotik_manual" || value === "cudy" || value === "registered" ? value : "mikrotik_discovery";
}
function DeviceOnboarding() {
	const [fleet, setFleet] = (0, import_react.useState)(null), [cudy, setCudy] = (0, import_react.useState)(null), [mikrotikDiscovery, setMikrotikDiscovery] = (0, import_react.useState)(null), [loading, setLoading] = (0, import_react.useState)(true), [error, setError] = (0, import_react.useState)(""), [success, setSuccess] = (0, import_react.useState)("");
	const [tab, setTab] = (0, import_react.useState)(initialTab), [query, setQuery] = (0, import_react.useState)(""), [selectedCandidateId, setSelectedCandidateId] = (0, import_react.useState)(() => onboardingParameters().get("candidate") ?? "");
	const access = useOperatorAccess();
	const [submitting, setSubmitting] = (0, import_react.useState)(false), [registeringCandidate, setRegisteringCandidate] = (0, import_react.useState)("");
	const [mikrotik, setMikrotik] = (0, import_react.useState)({
		hostname: "",
		model: "MikroTik RouterOS",
		managementAddress: "",
		site: "",
		collectorId: "",
		owner: "Network Operations",
		snmpMode: "SNMPv2c-read-only",
		credentialReferenceId: "collector-local-snmp"
	});
	const [discovery, setDiscovery] = (0, import_react.useState)({
		cidr: "10.66.66.0/24",
		collectorId: "",
		site: "",
		owner: "Network Operations"
	});
	const [mikrotikRange, setMikrotikRange] = (0, import_react.useState)({
		cidr: "10.66.66.0/24",
		collectorId: "",
		site: "",
		owner: "Network Operations",
		snmpMode: "SNMPv2c-read-only",
		credentialReferenceId: "collector-local-snmp"
	});
	const [siteAssignment, setSiteAssignment] = (0, import_react.useState)({
		deviceId: "",
		site: ""
	});
	const [cudyModels, setCudyModels] = (0, import_react.useState)({});
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError("");
		try {
			const [fleetResponse, cudyResponse, mikrotikResponse] = await Promise.all([
				fetch("/api/platform/device-fleet-onboarding", { cache: "no-store" }),
				fetch("/api/platform/cudy-pilot", { cache: "no-store" }),
				fetch("/api/platform/mikrotik-discovery", { cache: "no-store" })
			]);
			const fleetBody = await fleetResponse.json(), cudyBody = await cudyResponse.json(), mikrotikBody = await mikrotikResponse.json();
			if (!fleetResponse.ok) throw new Error(fleetBody.error ?? "Device onboarding is unavailable");
			if (!cudyResponse.ok) throw new Error(cudyBody.error ?? "Cudy discovery is unavailable");
			if (!mikrotikResponse.ok) throw new Error(mikrotikBody.error ?? "MikroTik discovery is unavailable");
			setFleet(fleetBody);
			setCudy(cudyBody);
			setMikrotikDiscovery(mikrotikBody);
			const current = fleetBody.collectors.find((item) => item.current)?.id ?? "";
			setMikrotik((value) => ({
				...value,
				collectorId: value.collectorId || current
			}));
			setDiscovery((value) => ({
				...value,
				collectorId: value.collectorId || current
			}));
			setMikrotikRange((value) => ({
				...value,
				collectorId: value.collectorId || current
			}));
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Device onboarding is unavailable");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(initial);
	}, [load]);
	(0, import_react.useEffect)(() => {
		if (!selectedCandidateId || loading) return;
		const target = document.getElementById(`onboarding-candidate-${selectedCandidateId}`);
		if (target) target.scrollIntoView({
			block: "center",
			behavior: "smooth"
		});
	}, [
		cudy,
		mikrotikDiscovery,
		loading,
		selectedCandidateId
	]);
	const runAction = async (url, payload, done) => {
		if (!access.canWrite) throw new Error("Your account role cannot register or discover devices");
		const response = await fetch(url, {
			method: "POST",
			headers: access.headers,
			body: JSON.stringify(payload)
		}), body = await response.json();
		if (!response.ok) throw new Error(body.error ?? "The onboarding action failed");
		setSuccess(done);
		await load();
	};
	const registerMikrotik = async () => {
		if (submitting) return;
		setSubmitting(true);
		setError("");
		setSuccess("");
		try {
			await runAction("/api/platform/device-fleet-onboarding", {
				action: "register_mikrotik",
				...mikrotik
			}, `${mikrotik.hostname} is registered for read-only MikroTik monitoring.`);
			setMikrotik((value) => ({
				...value,
				hostname: "",
				managementAddress: ""
			}));
			setTab("registered");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "MikroTik registration failed");
		} finally {
			setSubmitting(false);
		}
	};
	const authorizeMikrotikDiscovery = async () => {
		if (submitting) return;
		setSubmitting(true);
		setError("");
		setSuccess("");
		try {
			await runAction("/api/platform/mikrotik-discovery", {
				action: "request_mikrotik_range_discovery",
				...mikrotikRange
			}, `MikroTik discovery was authorized for ${mikrotikRange.cidr}. Discovered routers will wait for approval.`);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "MikroTik discovery failed");
		} finally {
			setSubmitting(false);
		}
	};
	const reviewMikrotikCandidate = async (candidateId, action) => {
		if (registeringCandidate) return;
		setRegisteringCandidate(candidateId);
		setError("");
		setSuccess("");
		try {
			await runAction("/api/platform/mikrotik-discovery", {
				action,
				candidateId
			}, action === "approve_mikrotik_candidate" ? "The MikroTik onboarding request was approved and registered for read-only monitoring." : "The MikroTik onboarding request was dismissed.");
			if (action === "approve_mikrotik_candidate") setTab("registered");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "MikroTik approval failed");
		} finally {
			setRegisteringCandidate("");
		}
	};
	const authorizeCudyDiscovery = async () => {
		if (submitting) return;
		setSubmitting(true);
		setError("");
		setSuccess("");
		try {
			await runAction("/api/platform/cudy-pilot", {
				action: "request_cudy_range_discovery",
				...discovery
			}, `Discovery was authorized for ${discovery.cidr}.`);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Cudy discovery failed");
		} finally {
			setSubmitting(false);
		}
	};
	const registerCudyCandidate = async (candidateId) => {
		if (registeringCandidate) return;
		setRegisteringCandidate(candidateId);
		setError("");
		setSuccess("");
		try {
			await runAction("/api/platform/cudy-pilot", {
				action: "register_cudy_candidate",
				candidateId,
				confirmedModel: cudyModels[candidateId]?.trim()
			}, "The selected Cudy device is registered for availability monitoring.");
			setTab("registered");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Cudy registration failed");
		} finally {
			setRegisteringCandidate("");
		}
	};
	const assignSite = async () => {
		if (submitting) return;
		setSubmitting(true);
		setError("");
		setSuccess("");
		try {
			await runAction("/api/platform/device-fleet-onboarding", {
				action: "update_device_site",
				...siteAssignment
			}, "The device site was saved without contacting the router.");
			setSiteAssignment({
				deviceId: "",
				site: ""
			});
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Site assignment failed");
		} finally {
			setSubmitting(false);
		}
	};
	const currentCollectors = fleet?.collectors.filter((item) => item.current) ?? [];
	const visibleDevices = (0, import_react.useMemo)(() => {
		const needle = query.trim().toLowerCase();
		return (fleet?.devices ?? []).filter((row) => !needle || `${row.device?.hostname} ${row.device?.vendor} ${row.device?.model} ${row.device?.site} ${row.managementAddress}`.toLowerCase().includes(needle));
	}, [fleet, query]);
	const cudyCount = fleet?.devices.filter((item) => item.kind === "cudy").length ?? 0, mikrotikCount = fleet?.devices.filter((item) => item.kind === "mikrotik").length ?? 0, pendingMikrotik = mikrotikDiscovery?.pendingCount ?? 0;
	const chooseTab = (next) => {
		setTab(next);
		setSelectedCandidateId("");
		window.history.replaceState(null, "", `#/device-onboarding?tab=${next}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "onboard-page fleet-onboarding-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "onboard-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "DEVICE ONBOARDING"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Add a device" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "module-context",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Prepare a WireGuard connection below, or discover routers already reachable by your collector. Site assignment is optional." })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary-button",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 16 }), loading ? "Refreshing…" : "Refresh"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "onboard-live-strip onboard-live-error",
				role: "alert",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Onboarding action failed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			success && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "onboard-live-strip onboard-live-success",
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Completed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: success })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WireguardOnboarding, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "onboard-summary nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "MikroTik registered" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: fleet ? mikrotikCount : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "SNMP GET-only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Cudy registered" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: fleet ? cudyCount : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "WireGuard availability" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "MikroTik approvals" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: mikrotikDiscovery ? pendingMikrotik : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Pending onboarding" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Current collectors" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: fleet ? currentCollectors.length : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Seen in the last 3 minutes" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel onboard-control-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "onboard-vendor-tabs",
						role: "tablist",
						"aria-label": "Onboarding method",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: tab === "mikrotik_discovery" ? "active" : "",
								onClick: () => chooseTab("mikrotik_discovery"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {}), "Discover MikroTik"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: tab === "mikrotik_manual" ? "active" : "",
								onClick: () => chooseTab("mikrotik_manual"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, {}), "Add manually"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: tab === "cudy" ? "active" : "",
								onClick: () => chooseTab("cudy"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, {}), "Discover Cudy"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: tab === "registered" ? "active" : "",
								onClick: () => chooseTab("registered"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Registered devices"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperatorAccess, { access }),
					tab === "mikrotik_discovery" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "onboard-workspace",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "AUTOMATIC MIKROTIK DISCOVERY"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Scan a private range and create pending onboarding requests" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "DOXA checks reachability and reads standard SNMP identity fields. MikroTik fingerprints appear below for approval; discovery never enrolls a device automatically." })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "onboard-form-grid",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Private IP range" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: mikrotikRange.cidr,
										onChange: (event) => setMikrotikRange((value) => ({
											...value,
											cidr: event.target.value
										}))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Collector" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: mikrotikRange.collectorId,
										onChange: (event) => setMikrotikRange((value) => ({
											...value,
											collectorId: event.target.value
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Select current collector"
										}), currentCollectors.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: item.id,
											children: [
												item.name,
												" · ",
												item.version
											]
										}, item.id))]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Site (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: mikrotikRange.site,
										onChange: (event) => setMikrotikRange((value) => ({
											...value,
											site: event.target.value
										})),
										placeholder: "Assign later"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Owner" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: mikrotikRange.owner,
										onChange: (event) => setMikrotikRange((value) => ({
											...value,
											owner: event.target.value
										}))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SNMP mode" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: mikrotikRange.snmpMode,
										onChange: (event) => setMikrotikRange((value) => ({
											...value,
											snmpMode: event.target.value
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "SNMPv2c-read-only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "SNMPv3" })]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Credential reference" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: mikrotikRange.credentialReferenceId,
										onChange: (event) => setMikrotikRange((value) => ({
											...value,
											credentialReferenceId: event.target.value
										}))
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Site may be assigned later. Authorized account role required; credentials remain on DOXA and router writes are disabled."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "primary-button",
								disabled: submitting || !mikrotikRange.cidr || !mikrotikRange.collectorId || !access.canWrite,
								onClick: () => void authorizeMikrotikDiscovery(),
								children: submitting ? "Authorizing…" : !access.canWrite ? "Role permission required" : "Authorize MikroTik discovery"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "candidate-list",
								children: [mikrotikDiscovery?.candidates.filter((item) => item.status === "pending_approval" && !item.alreadyRegistered).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									id: `onboarding-candidate-${item.id}`,
									className: selectedCandidateId === item.id ? "candidate-selected" : "",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.hostname || item.address }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											item.address,
											" · ",
											item.model ?? "MikroTik RouterOS",
											item.routerOsVersion ? ` ${item.routerOsVersion}` : "",
											" · ",
											item.scope?.site || "Unassigned",
											" · confidence ",
											item.confidence,
											"%"
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: ["Pending onboarding approval · discovered ", time(item.discoveredAt)] })
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "candidate-actions",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "secondary-button",
											disabled: !access.canWrite || Boolean(registeringCandidate),
											onClick: () => void reviewMikrotikCandidate(item.id, "reject_mikrotik_candidate"),
											children: "Dismiss"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "primary-button",
											disabled: !access.canWrite || Boolean(registeringCandidate),
											onClick: () => void reviewMikrotikCandidate(item.id, "approve_mikrotik_candidate"),
											children: registeringCandidate === item.id ? "Working…" : "Approve onboarding"
										})]
									})]
								}, item.id)), !mikrotikDiscovery?.candidates.some((item) => item.status === "pending_approval" && !item.alreadyRegistered) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "onboard-empty",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No pending MikroTik requests" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Authorize a private range and keep the DOXA device agent running. Discovered RouterOS devices will wait here for approval." })
									]
								})]
							})
						]
					}),
					tab === "mikrotik_manual" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "onboard-workspace",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "MIKROTIK DIRECT REGISTRATION"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Register a RouterOS device on the WireGuard network" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The collector receives the target address and profile. SNMP credentials stay on DOXA and are never returned by NOCX." })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, {})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "onboard-form-grid",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hostname" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: mikrotik.hostname,
										onChange: (event) => setMikrotik((value) => ({
											...value,
											hostname: event.target.value
										})),
										placeholder: "zanzibar-core-01"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Management IP" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: mikrotik.managementAddress,
										onChange: (event) => setMikrotik((value) => ({
											...value,
											managementAddress: event.target.value
										})),
										placeholder: "10.66.66.12"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Model" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: mikrotik.model,
										onChange: (event) => setMikrotik((value) => ({
											...value,
											model: event.target.value
										})),
										placeholder: "RB750Gr3"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Site (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: mikrotik.site,
										onChange: (event) => setMikrotik((value) => ({
											...value,
											site: event.target.value
										})),
										placeholder: "Assign later"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Collector" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: mikrotik.collectorId,
										onChange: (event) => setMikrotik((value) => ({
											...value,
											collectorId: event.target.value
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Select current collector"
										}), currentCollectors.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: item.id,
											children: [
												item.name,
												" · ",
												item.version
											]
										}, item.id))]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SNMP mode" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: mikrotik.snmpMode,
										onChange: (event) => setMikrotik((value) => ({
											...value,
											snmpMode: event.target.value
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "SNMPv2c-read-only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "SNMPv3" })]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Owner" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: mikrotik.owner,
										onChange: (event) => setMikrotik((value) => ({
											...value,
											owner: event.target.value
										}))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Credential reference" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: mikrotik.credentialReferenceId,
										onChange: (event) => setMikrotik((value) => ({
											...value,
											credentialReferenceId: event.target.value
										}))
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Site may be assigned later. SNMP SET and router configuration writes are disabled."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "primary-button",
								disabled: submitting || !mikrotik.hostname || !mikrotik.managementAddress || !mikrotik.collectorId || !access.canWrite,
								onClick: () => void registerMikrotik(),
								children: submitting ? "Registering…" : "Register MikroTik"
							})] })
						]
					}),
					tab === "cudy" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "onboard-workspace",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "CUDY RANGE DISCOVERY"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Discover Cudy routers reachable from DOXA" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Authorize a private /24–/32 range. The collector checks reachability and Cudy/LuCI fingerprints, then returns candidates for approval." })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "onboard-form-grid",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Private IP range" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: discovery.cidr,
										onChange: (event) => setDiscovery((value) => ({
											...value,
											cidr: event.target.value
										}))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Collector" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: discovery.collectorId,
										onChange: (event) => setDiscovery((value) => ({
											...value,
											collectorId: event.target.value
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Select current collector"
										}), currentCollectors.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: item.id,
											children: [
												item.name,
												" · ",
												item.version
											]
										}, item.id))]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Site (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: discovery.site,
										onChange: (event) => setDiscovery((value) => ({
											...value,
											site: event.target.value
										})),
										placeholder: "Assign later"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Owner" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: discovery.owner,
										onChange: (event) => setDiscovery((value) => ({
											...value,
											owner: event.target.value
										}))
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Site may be assigned later. Maximum 256 private addresses; no credentials or configuration writes."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "primary-button",
								disabled: submitting || !discovery.cidr || !discovery.collectorId || !access.canWrite,
								onClick: () => void authorizeCudyDiscovery(),
								children: submitting ? "Authorizing…" : "Authorize discovery"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "candidate-list",
								children: [cudy?.discoveryCandidates.filter((item) => item.status === "discovered").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									id: `onboarding-candidate-${item.id}`,
									className: selectedCandidateId === item.id ? "candidate-selected" : "",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.address }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											item.model ?? "Cudy candidate",
											" · confidence ",
											item.confidence,
											"%"
										] })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "candidate-model-confirm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confirm model" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: cudyModels[item.id] ?? "",
												onChange: (event) => setCudyModels((models) => ({
													...models,
													[item.id]: event.target.value
												})),
												placeholder: "e.g. LT400 V2"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "primary-button",
											disabled: !access.canWrite || Boolean(registeringCandidate) || !cudyModels[item.id]?.trim(),
											onClick: () => void registerCudyCandidate(item.id),
											children: registeringCandidate === item.id ? "Registering…" : "Approve and register"
										})
									]
								}, item.id)), !cudy?.discoveryCandidates.some((item) => item.status === "discovered") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "onboard-empty",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No unregistered Cudy candidates" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Authorize a range and keep the DOXA device agent running." })
									]
								})]
							})
						]
					}),
					tab === "registered" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "onboard-workspace registered-workspace",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "SHARED MONITORING INVENTORY"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Registered Cudy and MikroTik devices" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Devices may remain Unassigned after onboarding. Add or change their site here without contacting the router." })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "onboard-search",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: query,
									onChange: (event) => setQuery(event.target.value),
									placeholder: "Search devices…"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "site-assignment-bar",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Registered device" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: siteAssignment.deviceId,
										onChange: (event) => {
											const deviceId = event.target.value, existing = fleet?.devices.find((item) => item.deviceId === deviceId);
											setSiteAssignment({
												deviceId,
												site: existing?.device?.site && existing.device.site !== "Unassigned" ? existing.device.site : ""
											});
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Select device"
										}), (fleet?.devices ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: row.deviceId,
											children: [
												row.device?.hostname ?? row.managementAddress,
												" · ",
												row.device?.site ?? "Unassigned"
											]
										}, row.deviceId))]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Site name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: siteAssignment.site,
										onChange: (event) => setSiteAssignment((value) => ({
											...value,
											site: event.target.value
										})),
										placeholder: "e.g. Zanzibar HQ"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "primary-button",
										disabled: submitting || !access.canWrite || !siteAssignment.deviceId || !siteAssignment.site.trim(),
										onClick: () => void assignSite(),
										children: submitting ? "Saving…" : "Save site"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Metadata only. No device contact or network configuration change." })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "registered-device-table",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "registered-device-head",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Device" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Vendor / profile" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Address" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Collector" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Status" })
										]
									}),
									visibleDevices.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `#/devices?device=${encodeURIComponent(row.deviceId)}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.device?.hostname ?? row.deviceId }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: row.device?.site ?? "Unassigned" })] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.device?.vendor ?? row.kind }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: row.monitoringProfile })] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: row.managementAddress }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.collector?.name ?? row.collectorId }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: row.collector?.current ? "Current" : "Stale" })] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `device-status status-${row.device?.status === "online" ? "online" : row.device?.status === "offline" ? "offline" : "unknown"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), row.device?.status ?? "unknown"]
											})
										]
									}, row.registrationId)),
									!loading && !visibleDevices.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "onboard-empty",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No registered devices match" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Add a MikroTik or discover a Cudy device to begin monitoring." })
										]
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "onboard-live-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Monitoring boundary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Registered targets can report availability and read-only telemetry. The platform never returns SNMP secrets and never enables SNMP SET or router configuration writes." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["Last checked ", time(fleet?.checkedAt ?? null)] })
				]
			})
		]
	});
}
//#endregion
export { DeviceOnboarding as default };
