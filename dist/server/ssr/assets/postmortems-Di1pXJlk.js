import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3 } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Users } from "./users-BADfTVSw.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as Plus } from "./plus-M3dz1mQn.js";
import { t as FileCheck2 } from "./file-check-2-Bo8ysJZD.js";
import { t as Link2 } from "./link-2-DD83a-mv.js";
import { t as BookOpenCheck } from "./book-open-check-BcPb2lYo.js";
import { t as Target } from "./target-DhNgcuPf.js";
//#region app/postmortems.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/postmortems.tsx
var import_jsx_runtime = require_jsx_runtime();
var slug = (value) => value.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-");
function formatDate(value) {
	if (!value) return "—";
	return new Intl.DateTimeFormat(void 0, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "Africa/Dar_es_Salaam"
	}).format(new Date(value));
}
function localDate(date) {
	return (/* @__PURE__ */ new Date(date.getTime() - date.getTimezoneOffset() * 6e4)).toISOString().slice(0, 10);
}
function draftFrom(review) {
	return review ? {
		impactSummary: review.impactSummary,
		rootCause: review.rootCause,
		contributingFactors: review.contributingFactors.join("\n"),
		downtimeMinutes: String(review.downtimeMinutes)
	} : {
		impactSummary: "",
		rootCause: "",
		contributingFactors: "",
		downtimeMinutes: "0"
	};
}
function PostIncidentReview() {
	const [data, setData] = (0, import_react.useState)(null), [selected, setSelected] = (0, import_react.useState)(null), [loading, setLoading] = (0, import_react.useState)(true), [working, setWorking] = (0, import_react.useState)(""), [error, setError] = (0, import_react.useState)(""), [notice, setNotice] = (0, import_react.useState)("");
	const [reviewDraft, setReviewDraft] = (0, import_react.useState)({
		impactSummary: "",
		rootCause: "",
		contributingFactors: "",
		downtimeMinutes: "0"
	});
	const [actionDraft, setActionDraft] = (0, import_react.useState)(() => ({
		title: "",
		ownerEmail: "",
		dueAt: localDate(new Date(Date.now() + 10080 * 6e4))
	})), [verificationEvidence, setVerificationEvidence] = (0, import_react.useState)({});
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/reviews", { cache: "no-store" }), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Post-incident reviews are unavailable");
			setData(body);
			if (quiet) setSelected((current) => current ? body.reviews.find((item) => item.id === current.id) ?? body.reviews[0] ?? null : body.reviews[0] ?? null);
			else {
				const next = body.reviews[0] ?? null;
				setSelected(next);
				setReviewDraft(draftFrom(next));
			}
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Post-incident reviews are unavailable");
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
	const closure = (0, import_react.useMemo)(() => {
		const actions = selected?.actions ?? [];
		return {
			total: actions.length,
			verified: actions.filter((item) => item.status === "verified").length
		};
	}, [selected]);
	function chooseReview(review) {
		setSelected(review);
		setReviewDraft(draftFrom(review));
	}
	async function startReview(incidentId) {
		setWorking(`start-${incidentId}`);
		setError("");
		try {
			const response = await fetch("/api/platform/reviews", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "start",
					incidentId
				})
			}), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Review could not be started");
			setNotice(`${body.reviewNumber} created from resolved incident evidence.`);
			await load(true);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Review could not be started");
		} finally {
			setWorking("");
		}
	}
	async function saveReview(action) {
		if (!selected) return;
		setWorking(action);
		setError("");
		try {
			const response = await fetch("/api/platform/reviews", {
				method: "PATCH",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					id: selected.id,
					action,
					impactSummary: reviewDraft.impactSummary,
					rootCause: reviewDraft.rootCause,
					contributingFactors: reviewDraft.contributingFactors.split("\n").map((item) => item.trim()).filter(Boolean),
					downtimeMinutes: Number(reviewDraft.downtimeMinutes)
				})
			}), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Review could not be saved");
			setNotice(action === "approve_review" ? "Root-cause evidence independently approved and locked." : "Review evidence saved.");
			await load(true);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Review could not be saved");
		} finally {
			setWorking("");
		}
	}
	async function addAction(event) {
		event.preventDefault();
		if (!selected) return;
		setWorking("add_action");
		setError("");
		try {
			const response = await fetch("/api/platform/reviews", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "add_action",
					reviewId: selected.id,
					...actionDraft,
					dueAt: (/* @__PURE__ */ new Date(`${actionDraft.dueAt}T23:59:00`)).toISOString()
				})
			}), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Corrective action could not be added");
			setActionDraft({
				title: "",
				ownerEmail: "",
				dueAt: localDate(new Date(Date.now() + 10080 * 6e4))
			});
			setNotice(`${body.actionNumber} added with accountable ownership.`);
			await load(true);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Corrective action could not be added");
		} finally {
			setWorking("");
		}
	}
	async function transitionAction(item, action) {
		setWorking(`${action}-${item.id}`);
		setError("");
		try {
			const response = await fetch("/api/platform/reviews", {
				method: "PATCH",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					id: item.id,
					action,
					evidence: verificationEvidence[item.id] ?? ""
				})
			}), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Corrective action could not be updated");
			setNotice(action === "verify_action" ? "Corrective action independently verified." : "Corrective action marked in progress.");
			await load(true);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Corrective action could not be updated");
		} finally {
			setWorking("");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pir-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "pir-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Post-incident review & corrective actions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT REVIEW & CORRECTIVE EVIDENCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Accept root-cause and prevention claims only from strict incident resolution chronology, active registered owners, independent approval and ordered corrective-action evidence." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: loading ? "refresh-spin" : "",
						size: 15
					}), "Refresh"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Review evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict resolution and lifecycle evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future, malformed, contradictory, unsupported or inactive-owner records are excluded; no demonstration outage, approval or corrective-action result is included." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 network writes"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "pir-summary nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Accepted reviews" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.acceptedReviews ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.draftReviews} drafts require approval` : "Review evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Accepted actions" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.acceptedCorrectiveActions ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.openActions} still open` : "Action evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Resolved candidates" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.candidates ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "Strict incidents not yet reviewed" : "Incident evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Actions verified" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.verifiedActions ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Ordered independent evidence required" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel pir-candidates",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT RESOLVED-INCIDENT INTAKE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accepted review candidates" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Valid non-future opening and resolution chronology is required, and malformed reviews cannot hide a candidate." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data ? `${data.candidates.length} candidates` : "Unavailable" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: data?.candidates.map((incident) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `pir-icon pir-${slug(incident.severity)}`,
							children: incident.severity === "critical" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 16 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: incident.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							incident.id,
							" · ",
							incident.affectedCustomers,
							" customers · resolved ",
							formatDate(incident.resolvedAt)
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary-button",
							onClick: () => void startReview(incident.id),
							disabled: Boolean(working),
							children: working === `start-${incident.id}` ? "Starting…" : "Start review"
						})
					] }, incident.id)) }),
					data && !loading && !data.candidates.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pir-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 24 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted review candidate" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This means no eligible resolved incident row is stored; it does not establish incident-free operation." })
						]
					}),
					!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pir-empty pir-unavailable",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Review candidates unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated review snapshot before interpreting resolved-incident intake." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "pir-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel pir-register",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "STRICT REVIEW REGISTER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accepted production incident reviews" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every displayed record retains strict incident, owner, chronology, approval and corrective-scope support." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data ? `${data.reviews.length} accepted records` : "Unavailable" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pir-list",
							children: data?.reviews.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: selected?.id === item.id ? "active" : "",
								onClick: () => chooseReview(item),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `pir-icon pir-${slug(item.incident?.severity ?? "high")}`,
										children: item.incident?.severity === "critical" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 16 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											item.reviewNumber,
											" · ",
											item.incidentId
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
											item.ownerEmail,
											" · ",
											item.downtimeMinutes,
											" min downtime"
										] })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", {
										className: `pir-status pir-${slug(item.status)}`,
										children: item.status
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
								]
							}, item.id))
						}),
						data && !loading && !data.reviews.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pir-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenCheck, { size: 24 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted production review" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Start from an eligible resolved incident when one becomes available." })
							]
						}),
						!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pir-empty pir-unavailable",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Review register unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated review snapshot before interpreting review state." })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "panel pir-detail",
					children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "SELECTED ACCEPTED REVIEW"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								selected.reviewNumber,
								" · linked to ",
								selected.incidentId
							] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pir-impact",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Customer impact" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.incident?.affectedCustomers ?? "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Chronology downtime" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [selected.downtimeMinutes, " min"] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Action closure" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									closure.verified,
									"/",
									closure.total
								] })] })
							]
						}),
						selected.status === "draft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pir-review-form",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Impact summary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									minLength: 20,
									value: reviewDraft.impactSummary,
									onChange: (event) => setReviewDraft({
										...reviewDraft,
										impactSummary: event.target.value
									}),
									placeholder: "Describe customer and service impact using incident evidence…"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Validated root cause" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									minLength: 20,
									value: reviewDraft.rootCause,
									onChange: (event) => setReviewDraft({
										...reviewDraft,
										rootCause: event.target.value
									}),
									placeholder: "State the evidence-backed technical or process cause…"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contributing factors · one per line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: reviewDraft.contributingFactors,
									onChange: (event) => setReviewDraft({
										...reviewDraft,
										contributingFactors: event.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Downtime minutes · must match incident chronology" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									max: "43200",
									value: reviewDraft.downtimeMinutes,
									onChange: (event) => setReviewDraft({
										...reviewDraft,
										downtimeMinutes: event.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "secondary-button",
									onClick: () => void saveReview("save_review"),
									disabled: Boolean(working),
									children: "Save evidence"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "primary-button",
									onClick: () => void saveReview("approve_review"),
									disabled: Boolean(working),
									children: "Approve independently"
								})] })
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Validated root cause" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selected.rootCause })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Impact evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selected.impactSummary })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Review governance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Review owner" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.ownerEmail })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Approved by" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.approvedBy })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Approved at" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatDate(selected.approvedAt) })] })
							] })] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pir-evidence",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Evidence is append-only after approval." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Corrective work follows approval, start, then independent verification; network actions remain disabled." })] })]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `pir-empty ${data ? "" : "pir-unavailable"}`,
						children: [
							data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenCheck, { size: 24 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "Select an accepted review" : "Review evidence unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data ? "Review evidence and corrective actions will appear here." : "Load an authenticated review snapshot before interpreting approval or closure." })
						]
					})
				})]
			}),
			selected?.status === "draft" && data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel pir-add-action",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "STRICT CORRECTIVE SCOPE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Add an owned prevention action" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only an active registered operator can own corrective work." })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: addAction,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Action" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							minLength: 12,
							value: actionDraft.title,
							onChange: (event) => setActionDraft({
								...actionDraft,
								title: event.target.value
							}),
							placeholder: "Describe the measurable prevention work…"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Active registered owner" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							required: true,
							value: actionDraft.ownerEmail,
							onChange: (event) => setActionDraft({
								...actionDraft,
								ownerEmail: event.target.value
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select operator"
							}), data.operators.map((operator) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: operator.email,
								children: [
									operator.displayName,
									" · ",
									operator.email
								]
							}, operator.id))]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Due date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							required: true,
							value: actionDraft.dueAt,
							onChange: (event) => setActionDraft({
								...actionDraft,
								dueAt: event.target.value
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							disabled: working === "add_action",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 15 }), working === "add_action" ? "Adding…" : "Add action"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel pir-actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT PREVENTION TRACKING"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accepted corrective-action register" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Registered ownership, due chronology, approved review support and an ordered start-to-verification lifecycle are required." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data ? `${data.actions.length} accepted records` : "Unavailable" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pir-table",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Action" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Source review" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Owner" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Due" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "State" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Control" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data?.actions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.actionNumber })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { size: 12 }), data.reviews.find((review) => review.id === item.reviewId)?.reviewNumber ?? item.reviewId] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 12 }), item.ownerEmail] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatDate(item.dueAt) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `action-${slug(item.status)}`,
								children: item.status.replaceAll("_", " ")
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.status === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button table-action",
								onClick: () => void transitionAction(item, "start_action"),
								disabled: Boolean(working) || data.reviews.find((review) => review.id === item.reviewId)?.status !== "approved",
								children: data.reviews.find((review) => review.id === item.reviewId)?.status === "approved" ? "Start" : "Await approval"
							}) : item.status === "in_progress" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "verify-action",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: verificationEvidence[item.id] ?? "",
									onChange: (event) => setVerificationEvidence({
										...verificationEvidence,
										[item.id]: event.target.value
									}),
									placeholder: "Verification evidence…"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "secondary-button",
									onClick: () => void transitionAction(item, "verify_action"),
									disabled: Boolean(working),
									children: "Verify"
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }) })
						] }, item.id)) })] })
					}),
					data && !loading && !data.actions.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pir-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { size: 24 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted corrective action" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Actions are created inside a draft review and remain evidence-linked." })
						]
					}),
					!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pir-empty pir-unavailable",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Corrective-action evidence unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated review snapshot before interpreting prevention work." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "Work can start only after review approval; verification then requires independent evidence. NOCX never marks work complete automatically."] })
				]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "app-toast",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), notice]
			})
		]
	});
}
//#endregion
export { PostIncidentReview as default };
