import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
//#region app/migration/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var digest = async (value) => Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)))).map((n) => n.toString(16).padStart(2, "0")).join("");
function MigrationPage() {
	const [mode, setMode] = (0, import_react.useState)("essential");
	const [password, setPassword] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(false), [message, setMessage] = (0, import_react.useState)(""), cancelled = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		fetch("/api/platform/migration-transfer", { cache: "no-store" }).then(async (response) => {
			const report = await response.json();
			if (!response.ok) throw new Error(report.error || "Readiness check failed.");
			setMessage(report.ready ? `Ready: ${report.protectedTables} application tables protected; ${report.hostingHistoryTables} hosting-history tables included.` : `Not ready: ${report.problem} Diagnostic: read ${report.schemaObjectsRead} schema objects, ${report.guardsRead} guards; database totals ${JSON.stringify(report.totals)}.`);
		}).catch((error) => setMessage(error instanceof Error ? error.message : "Readiness check failed."));
	}, []);
	async function request(body) {
		const response = await fetch("/api/platform/migration-transfer", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(body),
			cache: "no-store"
		});
		const result = await response.json();
		if (!response.ok) throw new Error(result.error || "Export request failed.");
		return result;
	}
	async function download(event) {
		event.preventDefault();
		setBusy(true);
		setMessage("Starting backup…");
		cancelled.current = false;
		let key = null, completed = false, writer = null;
		try {
			const picker = window.showSaveFilePicker;
			if (picker) writer = await (await picker.call(window, {
				suggestedName: `nocx-${mode}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.sql`,
				types: [{
					description: "SQLite SQL backup",
					accept: { "application/sql": [".sql"] }
				}]
			})).createWritable();
			const start = await request({
				action: "start",
				password,
				mode
			});
			setPassword("");
			key = {
				id: start.id,
				token: start.token
			};
			if (await digest(start.header) !== start.headerSha) throw new Error("Header verification failed.");
			const parts = writer ? [] : [start.header];
			if (writer) await writer.write(start.header);
			let bytes = new TextEncoder().encode(start.header).length, seq = 0, chain = start.headerSha;
			for (;;) {
				if (cancelled.current) throw new Error("Backup cancelled.");
				setMessage(`Database updates paused · Downloading chunk ${seq + 1} · ${(bytes / 1048576).toFixed(1)} MiB`);
				let chunk;
				for (let attempt = 0;; attempt++) try {
					chunk = await request({
						...key,
						action: "next"
					});
					break;
				} catch (error) {
					if (attempt === 2) throw error;
				}
				if (chunk.seq !== seq || await digest(chunk.sql) !== chunk.sha || await digest(chain + chunk.sha) !== chunk.chain) throw new Error("Chunk verification failed. Discard this incomplete backup.");
				bytes += new TextEncoder().encode(chunk.sql).length;
				if (!writer && bytes > 256 * 1048576) throw new Error("Backup exceeds this browser’s memory limit. Retry in Chrome with direct-to-file saving. No partial file was downloaded.");
				if (writer) await writer.write(chunk.sql);
				else parts.push(chunk.sql);
				chain = chunk.chain;
				for (let attempt = 0;; attempt++) try {
					await request({
						...key,
						action: "ack",
						seq: chunk.seq,
						sha: chunk.sha
					});
					break;
				} catch (error) {
					if (attempt === 2) throw error;
				}
				seq++;
				if (chunk.sql.endsWith("-- NOCX_EXPORT_COMPLETE\n")) break;
			}
			const result = await request({
				...key,
				action: "finish",
				chain
			});
			if (!result.complete || !result.resumed || result.chain !== chain) throw new Error("Backup completion was not confirmed.");
			completed = true;
			if (writer) {
				await writer.close();
				writer = null;
				setMessage(`${mode === "essential" ? "Essential configuration" : "Full backup"} saved: ${result.tables} tables, ${result.rows} rows. Every chunk was verified; checksum-chain SHA-256: ${chain}. Database updates resumed. Restore testing is still required.`);
				return;
			}
			const blob = new Blob(parts, { type: "application/sql;charset=utf-8" }), checksum = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", await blob.arrayBuffer()))).map((n) => n.toString(16).padStart(2, "0")).join("");
			const url = URL.createObjectURL(blob), link = document.createElement("a");
			link.href = url;
			link.download = `nocx-${mode}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.sql`;
			document.body.appendChild(link);
			link.click();
			link.remove();
			setTimeout(() => URL.revokeObjectURL(url), 6e4);
			setMessage(`${mode === "essential" ? "Essential configuration" : "Full backup"} verified: ${result.tables} tables, ${result.rows} rows. Database updates resumed. SHA-256: ${checksum}. Keep the file private; restore testing is still required.`);
		} catch (error) {
			await writer?.abort().catch(() => {});
			setMessage((error instanceof Error ? error.message : "Backup failed.") + " No complete backup was saved. Cancellation is being requested; updates automatically resume within two minutes of the last export request.");
		} finally {
			if (key && !completed) await request({
				...key,
				action: "cancel"
			}).catch(() => {});
			setPassword("");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "customer-portal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "portal-brand",
				href: "/",
				children: "NOC-X"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "portal-eyebrow",
						children: "ADMINISTRATION"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Migration backup" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Choose essential configuration or a full database backup." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Database changes and monitoring ingestion pause during export. WireGuard and device connectivity are not changed. The export can run for up to 24 hours. Updates resume when finished, or within two minutes if interrupted. Keep this tab open and active, and prevent your computer from sleeping." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The file contains sensitive account and network data. Keep it private. Runtime secrets and external files are not included." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => void download(e),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Data to migrate", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: mode,
								disabled: busy,
								onChange: (e) => setMode(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "essential",
									children: "Essential configuration only"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "full",
									children: "Full database including history"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: mode === "essential" ? "Keeps accounts, sites, devices, services, network and monitoring configuration. Excludes reporting, metrics, incidents, alerts, tasks, logs and old login sessions. Required linked monitoring approvals are retained." : "Includes every application record and reporting history." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Confirm your current NOC-X password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								autoComplete: "current-password",
								required: true,
								disabled: busy,
								maxLength: 128,
								value: password,
								onChange: (e) => setPassword(e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: busy,
								children: busy ? "Exporting…" : mode === "essential" ? "Pause updates and download essentials" : "Pause updates and download full backup"
							}),
							busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									cancelled.current = true;
									setMessage("Cancelling after the current request…");
								},
								children: "Cancel backup"
							})
						]
					}),
					message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						style: { overflowWrap: "anywhere" },
						children: message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Requires an unrestricted administrator or owner. Interrupted exports are not complete backups." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						children: "Back to dashboard"
					})
				]
			})
		]
	});
}
//#endregion
export { MigrationPage as default };
