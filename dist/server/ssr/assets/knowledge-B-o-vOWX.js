import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3 } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as Users } from "./users-BADfTVSw.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as Plus } from "./plus-M3dz1mQn.js";
import { t as FileCheck2 } from "./file-check-2-Bo8ysJZD.js";
import { t as Link2 } from "./link-2-DD83a-mv.js";
import { t as BookOpenCheck } from "./book-open-check-BcPb2lYo.js";
//#region app/knowledge.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/knowledge.tsx
var import_jsx_runtime = require_jsx_runtime();
var blank = {
	title: "",
	category: "",
	audience: "",
	sourceKey: "",
	summary: "",
	steps: ""
};
function date(value) {
	return value ? new Intl.DateTimeFormat(void 0, {
		dateStyle: "medium",
		timeZone: "Africa/Dar_es_Salaam"
	}).format(new Date(value)) : "—";
}
function KnowledgeBase() {
	const [data, setData] = (0, import_react.useState)(null), [selected, setSelected] = (0, import_react.useState)(null), [loading, setLoading] = (0, import_react.useState)(true), [working, setWorking] = (0, import_react.useState)(""), [error, setError] = (0, import_react.useState)(""), [notice, setNotice] = (0, import_react.useState)(""), [query, setQuery] = (0, import_react.useState)(""), [showCreate, setShowCreate] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(blank), [revisionDraft, setRevisionDraft] = (0, import_react.useState)({
		summary: "",
		steps: ""
	});
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/knowledge", { cache: "no-store" }), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Knowledge records are unavailable");
			setData(body);
			setSelected((current) => {
				const next = current ? body.articles.find((item) => item.id === current.id) ?? body.articles[0] ?? null : body.articles[0] ?? null;
				if (!quiet) setRevisionDraft({
					summary: next?.current?.summary ?? "",
					steps: next?.current?.steps.join("\n") ?? ""
				});
				return next;
			});
			setError("");
		} catch (reason) {
			setData(null);
			setSelected(null);
			setError(reason instanceof Error ? reason.message : "Knowledge records are unavailable");
		} finally {
			if (!quiet) setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void load(), 0), timer = window.setInterval(() => void load(true), 3e4);
		return () => {
			window.clearTimeout(initial);
			window.clearInterval(timer);
		};
	}, [load]);
	const filtered = (0, import_react.useMemo)(() => (data?.articles ?? []).filter((article) => `${article.articleNumber} ${article.title} ${article.category} ${article.ownerEmail} ${article.source?.label ?? ""}`.toLowerCase().includes(query.toLowerCase())), [data, query]);
	const viewerOwnsSelected = Boolean(data && selected && data.viewer.email.toLowerCase() === selected.ownerEmail.toLowerCase());
	const viewerCanApproveSelected = Boolean(data && selected?.current && data.viewer.email.toLowerCase() !== selected.ownerEmail.toLowerCase() && data.viewer.email.toLowerCase() !== selected.current.createdBy.toLowerCase());
	function choose(article) {
		setSelected(article);
		setRevisionDraft({
			summary: article.current?.summary ?? "",
			steps: article.current?.steps.join("\n") ?? ""
		});
	}
	async function request(method, body, key, success) {
		setWorking(key);
		setError("");
		try {
			const response = await fetch("/api/platform/knowledge", {
				method,
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body)
			}), payload = await response.json();
			if (!response.ok) throw new Error(payload.error || "Knowledge action failed");
			setNotice(success);
			window.setTimeout(() => setNotice(""), 3200);
			await load(true);
			return true;
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Knowledge action failed");
			return false;
		} finally {
			setWorking("");
		}
	}
	async function create(event) {
		event.preventDefault();
		const [sourceType, sourceId] = draft.sourceKey.split(":");
		if (await request("POST", {
			title: draft.title,
			category: draft.category,
			audience: draft.audience,
			sourceType,
			sourceId,
			summary: draft.summary,
			steps: draft.steps.split("\n")
		}, "create", "Evidence-linked knowledge draft created.")) {
			setDraft(blank);
			setShowCreate(false);
		}
	}
	async function act(action) {
		if (!selected) return;
		const success = action === "save_revision" ? "Draft procedure saved." : action === "approve_revision" ? "Knowledge revision independently approved and published internally." : "New controlled revision started.";
		await request("PATCH", {
			id: selected.id,
			action,
			summary: revisionDraft.summary,
			steps: revisionDraft.steps.split("\n")
		}, action, success);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "knowledge-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "knowledge-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Accepted operational knowledge" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT KNOWLEDGE-EVIDENCE CONTROL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Accept internal procedures only from strict source chronology, active registered ownership, contiguous revisions, independent publication and exact review windows." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "knowledge-hero-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						onClick: () => void load(),
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							className: loading ? "refresh-spin" : "",
							size: 15
						}), "Refresh"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						onClick: () => setShowCreate((value) => !value),
						disabled: !data,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 15 }), "Draft article"]
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Knowledge evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict accepted sources only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future, malformed, unsupported, inactive-owner or broken-revision records are excluded. Internal guidance never authorizes external publishing or network changes." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 external sends"] })
				]
			}),
			showCreate && data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel knowledge-create",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT EVIDENCE INTAKE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Draft from accepted operational evidence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Choose a strict published known error or independently approved incident review." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						onClick: () => setShowCreate(false),
						children: "Cancel"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: create,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Accepted evidence source" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								required: true,
								value: draft.sourceKey,
								onChange: (event) => setDraft({
									...draft,
									sourceKey: event.target.value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select accepted evidence…"
								}), data.evidence.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: `${item.sourceType}:${item.sourceId}`,
									children: [
										item.label,
										" · ",
										item.title
									]
								}, `${item.sourceType}:${item.sourceId}`))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Article title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								minLength: 12,
								value: draft.title,
								onChange: (event) => setDraft({
									...draft,
									title: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								minLength: 3,
								value: draft.category,
								onChange: (event) => setDraft({
									...draft,
									category: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Audience" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								minLength: 3,
								value: draft.audience,
								onChange: (event) => setDraft({
									...draft,
									audience: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "wide",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Evidence-backed purpose" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									required: true,
									minLength: 20,
									value: draft.summary,
									onChange: (event) => setDraft({
										...draft,
										summary: event.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "wide",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Procedure · one step per line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									required: true,
									value: draft.steps,
									onChange: (event) => setDraft({
										...draft,
										steps: event.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "primary-button",
								disabled: working === "create" || !draft.sourceKey,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenCheck, { size: 15 }), working === "create" ? "Creating…" : "Create controlled draft"]
							})
						]
					}),
					!loading && !data.evidence.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "knowledge-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 24 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No unused accepted evidence is available" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Publish a strict known error or approve a strict incident review before drafting guidance." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "knowledge-summary nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Published accepted articles" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.published ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "Strict internal guidance" : "Knowledge evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Review due" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.reviewDue ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Exact 90-day cycle" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Accepted draft revisions" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.drafts ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Independent review pending" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Unused accepted evidence" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.evidenceAvailable ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "Eligible for strict drafting" : "Source evidence unavailable" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "knowledge-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel knowledge-library",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "STRICT ARTICLE REGISTER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accepted procedures, troubleshooting & lessons" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every displayed article retains strict source chronology, active ownership and a contiguous revision history." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Search accepted knowledge…",
							"aria-label": "Search accepted knowledge base"
						})] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "knowledge-list",
							children: filtered.map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: selected?.id === article.id ? "active" : "",
								onClick: () => choose(article),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "knowledge-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenCheck, { size: 16 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											article.articleNumber,
											" · ",
											article.category
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: article.title }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
											article.ownerEmail,
											" · accepted revision ",
											article.currentRevision
										] })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", {
										className: article.status === "published" && !article.reviewDue ? "approved" : "due",
										children: article.reviewDue ? "Review due" : article.status
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
								]
							}, article.id))
						}),
						data && !loading && !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "knowledge-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenCheck, { size: 24 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted article recorded" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: query ? "No accepted article matches this search." : "Start only from accepted production evidence when it becomes available." })
							]
						}),
						!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "knowledge-empty knowledge-unavailable",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Knowledge register unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated knowledge snapshot before interpreting publication state." })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "panel knowledge-detail",
					children: selected && selected.current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "SELECTED ACCEPTED ARTICLE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								selected.articleNumber,
								" · active owner ",
								selected.ownerEmail
							] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "knowledge-meta",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Accepted source evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.source?.label ?? selected.sourceId })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Exact review due" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: date(selected.reviewDueAt) })] })]
						}),
						selected.current.status === "draft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "knowledge-revision-form",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Evidence-backed purpose" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: revisionDraft.summary,
									onChange: (event) => setRevisionDraft({
										...revisionDraft,
										summary: event.target.value
									}),
									disabled: !viewerOwnsSelected
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Procedure · one step per line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: revisionDraft.steps,
									onChange: (event) => setRevisionDraft({
										...revisionDraft,
										steps: event.target.value
									}),
									disabled: !viewerOwnsSelected
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "secondary-button",
									onClick: () => void act("save_revision"),
									disabled: Boolean(working) || !viewerOwnsSelected,
									children: "Save owned draft"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "primary-button",
									onClick: () => void act("approve_revision"),
									disabled: Boolean(working) || !viewerCanApproveSelected,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 14 }), "Approve independently"]
								})] })
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Accepted purpose" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selected.current.summary })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Approved restoration procedure" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: selected.current.steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: step }, step)) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "knowledge-links",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Strict publication evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { size: 12 }), selected.source?.label ?? selected.sourceId] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 12 }), selected.audience] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 12 }),
										"Approved by ",
										selected.current.approvedBy
									] })
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button knowledge-revise",
								onClick: () => void act("start_revision"),
								disabled: Boolean(working) || !viewerOwnsSelected,
								children: "Start owned revision"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "knowledge-safety",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Guidance does not authorize network changes." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Strict publication remains internal; operators must still follow access, change, maintenance, rollback and validation controls." })] })]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `knowledge-empty ${data ? "" : "knowledge-unavailable"}`,
						children: [
							data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenCheck, { size: 24 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "Select an accepted article" : "Knowledge evidence unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data ? "Controlled content and strict publication evidence will appear here." : "Load an authenticated knowledge snapshot before interpreting guidance." })
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel knowledge-governance",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "STRICT PUBLICATION GOVERNANCE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Chronology-backed, independently reviewed and revision-controlled" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Only strict published known errors and approved incident reviews can originate guidance."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Active authors cannot approve their own drafts or revisions."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Published revisions remain immutable and enter an exact 90-day review cycle."] })
				] })]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "app-toast",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), notice]
			})
		]
	});
}
//#endregion
export { KnowledgeBase as default };
