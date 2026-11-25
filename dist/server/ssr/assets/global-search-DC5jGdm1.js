import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { u as X } from "./settings-BHhlqS1D.js";
import { t as Search } from "./search-sutoz6q6.js";
//#region app/global-search.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function GlobalSearch() {
	const [q, setQ] = (0, import_react.useState)(""), [results, setResults] = (0, import_react.useState)([]), [loading, setLoading] = (0, import_react.useState)(false), [error, setError] = (0, import_react.useState)(""), [active, setActive] = (0, import_react.useState)(-1);
	const input = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const controller = new AbortController();
		const timer = setTimeout(async () => {
			if (q.trim().length < 2) {
				setResults([]);
				setLoading(false);
				return;
			}
			setLoading(true);
			setError("");
			setActive(-1);
			try {
				const response = await fetch(`/api/platform/search?q=${encodeURIComponent(q)}`, {
					signal: controller.signal,
					cache: "no-store"
				}), body = await response.json();
				if (!response.ok) throw new Error(body.error);
				if (!controller.signal.aborted) setResults(body.results ?? []);
			} catch (e) {
				if (!controller.signal.aborted) setError(e instanceof Error ? e.message : "Search failed");
			} finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		}, 250);
		return () => {
			clearTimeout(timer);
			controller.abort();
		};
	}, [q]);
	(0, import_react.useEffect)(() => {
		const shortcut = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "k") {
				e.preventDefault();
				input.current?.focus();
			}
		};
		window.addEventListener("keydown", shortcut);
		return () => window.removeEventListener("keydown", shortcut);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "search-wrap",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 18 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: input,
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search customer, site, device or IP…",
				"aria-label": "Search NOCX records",
				role: "combobox",
				"aria-expanded": q.trim().length >= 2,
				"aria-controls": "entity-search-results",
				"aria-autocomplete": "list",
				"aria-activedescendant": active >= 0 ? `entity-result-${active}` : void 0,
				onKeyDown: (e) => {
					if (e.key === "Escape") setQ("");
					if (e.key === "ArrowDown") {
						e.preventDefault();
						setActive((v) => Math.min(v + 1, results.length - 1));
					}
					if (e.key === "ArrowUp") {
						e.preventDefault();
						setActive((v) => Math.max(v - 1, 0));
					}
					if (e.key === "Enter" && results[active]) {
						window.location.hash = results[active].href;
						setQ("");
					}
				}
			}),
			q && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-label": "Clear search",
				onClick: () => setQ(""),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
			}),
			q.trim().length >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "search-results",
				id: "entity-search-results",
				role: "listbox",
				"aria-label": "Matching records",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						children: loading ? "Searching…" : error || `${results.length} records found`
					}),
					results.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						id: `entity-result-${i}`,
						role: "option",
						"aria-selected": active === i,
						className: active === i ? "search-option-active" : "",
						href: r.href,
						onClick: () => setQ(""),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: r.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							r.kind,
							" · ",
							r.context
						] })]
					}, `${r.kind}-${r.id}`)),
					!loading && !error && !results.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "search-empty",
						children: "No records match. Try a hostname, exact IP or account number."
					})
				]
			})
		]
	});
}
//#endregion
export { GlobalSearch as default };
