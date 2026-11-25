import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as KeyRound } from "./key-round-CSmhIP5z.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Ban } from "./ban-Dzkuy3l_.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as FileCheck2 } from "./file-check-2-Bo8ysJZD.js";
import { t as Download } from "./download-CU5_C7Ji.js";
import { t as ListChecks } from "./list-checks-Bc5p-G5V.js";
import { t as RadioTower } from "./radio-tower-ChIm1GPm.js";
import { t as TimerReset } from "./timer-reset-cTDIq75g.js";
//#region node_modules/lucide-react/dist/esm/icons/file-up.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FileUp = createLucideIcon("FileUp", [
	["path", {
		d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
		key: "1rqfz7"
	}],
	["path", {
		d: "M14 2v4a2 2 0 0 0 2 2h4",
		key: "tnqrlb"
	}],
	["path", {
		d: "M12 12v6",
		key: "3ahymv"
	}],
	["path", {
		d: "m15 15-3-3-3 3",
		key: "15xj92"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/cloud-upload.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CloudUpload = createLucideIcon("CloudUpload", [
	["path", {
		d: "M12 13v8",
		key: "1l5pq0"
	}],
	["path", {
		d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
		key: "1pljnt"
	}],
	["path", {
		d: "m8 17 4-4 4 4",
		key: "1quai1"
	}]
]);
//#endregion
//#region app/device-intake.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/device-intake.tsx
var import_jsx_runtime = require_jsx_runtime();
var headers = [
	"hostname",
	"vendor",
	"model",
	"serial",
	"site",
	"management_address",
	"collector_id",
	"snmp_mode",
	"credential_reference_id",
	"owner"
];
function parseCsvLine(line) {
	const cells = [];
	let cell = "";
	let quoted = false;
	for (let index = 0; index < line.length; index += 1) {
		const char = line[index];
		if (char === "\"") if (quoted && line[index + 1] === "\"") {
			cell += "\"";
			index += 1;
		} else quoted = !quoted;
		else if (char === "," && !quoted) {
			cells.push(cell.trim());
			cell = "";
		} else cell += char;
	}
	cells.push(cell.trim());
	return cells;
}
function parseCsv(source) {
	const lines = source.replaceAll("\r\n", "\n").split("\n").filter((line) => line.trim());
	if (lines.length < 2) return [];
	const incomingHeaders = parseCsvLine(lines[0]).map((value) => value.toLowerCase());
	if (headers.some((header) => !incomingHeaders.includes(header))) throw new Error("The CSV does not match the approved intake contract.");
	return lines.slice(1).map((line) => {
		const values = parseCsvLine(line);
		const value = (header) => values[incomingHeaders.indexOf(header)]?.trim() ?? "";
		return {
			hostname: value("hostname"),
			vendor: value("vendor"),
			model: value("model"),
			serial: value("serial"),
			site: value("site"),
			managementAddress: value("management_address"),
			collectorId: value("collector_id"),
			snmpMode: value("snmp_mode"),
			credentialReferenceId: value("credential_reference_id"),
			owner: value("owner")
		};
	});
}
function validateRows(rows) {
	const errors = [];
	if (rows.length === 0) errors.push("No device rows were found.");
	if (rows.length > 10) errors.push("An onboarding wave cannot contain more than 10 devices.");
	const identityKeys = /* @__PURE__ */ new Set();
	rows.forEach((row, index) => {
		const rowNumber = index + 2;
		if ([
			row.hostname,
			row.vendor,
			row.model,
			row.serial,
			row.site,
			row.managementAddress,
			row.collectorId,
			row.snmpMode,
			row.credentialReferenceId,
			row.owner
		].some((value) => !value)) errors.push(`Row ${rowNumber}: every approved field is required.`);
		if (!["MikroTik", "Ubiquiti"].includes(row.vendor)) errors.push(`Row ${rowNumber}: vendor must be MikroTik or Ubiquiti.`);
		if (!["SNMPv3", "SNMPv2c-read-only"].includes(row.snmpMode)) errors.push(`Row ${rowNumber}: unsupported SNMP mode.`);
		if (/[/\\*]/.test(row.managementAddress)) errors.push(`Row ${rowNumber}: use one exact management address, not a range or wildcard.`);
		const identity = `${row.vendor.toLowerCase()}:${row.serial.toLowerCase()}`;
		if (identityKeys.has(identity)) errors.push(`Row ${rowNumber}: duplicate vendor and serial in this batch.`);
		identityKeys.add(identity);
	});
	return errors;
}
function evidenceTime(value) {
	if (!value) return "Not recorded";
	const parsed = new Date(value);
	return Number.isNaN(parsed.valueOf()) ? value : parsed.toLocaleString();
}
function DeviceIntake() {
	const [evidence, setEvidence] = (0, import_react.useState)(null);
	const [evidenceError, setEvidenceError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedBatchId, setSelectedBatchId] = (0, import_react.useState)("");
	const [fileName, setFileName] = (0, import_react.useState)("");
	const [rows, setRows] = (0, import_react.useState)([]);
	const [errors, setErrors] = (0, import_react.useState)([]);
	const [notice, setNotice] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [selectedCandidateIds, setSelectedCandidateIds] = (0, import_react.useState)([]);
	const [sealingManifest, setSealingManifest] = (0, import_react.useState)(false);
	const [manifestError, setManifestError] = (0, import_react.useState)("");
	const [windowForm, setWindowForm] = (0, import_react.useState)({
		waveId: "",
		leadOperatorId: "",
		scheduledStart: "",
		scheduledEnd: "",
		abortCriteria: "Collector heartbeat becomes stale\nCredential reference becomes inactive\nAny unexpected write request is detected"
	});
	const [schedulingWindow, setSchedulingWindow] = (0, import_react.useState)(false);
	const [windowError, setWindowError] = (0, import_react.useState)("");
	const [preflightForm, setPreflightForm] = (0, import_react.useState)({
		windowId: "",
		checkKey: "",
		evidenceReference: "",
		notes: ""
	});
	const [recordingPreflight, setRecordingPreflight] = (0, import_react.useState)(false);
	const [preflightError, setPreflightError] = (0, import_react.useState)("");
	const [validationForm, setValidationForm] = (0, import_react.useState)({
		evidenceId: "",
		reason: ""
	});
	const [validatingPreflight, setValidatingPreflight] = (0, import_react.useState)(false);
	const [validationError, setValidationError] = (0, import_react.useState)("");
	const [releaseForm, setReleaseForm] = (0, import_react.useState)({
		windowId: "",
		reason: ""
	});
	const [decidingRelease, setDecidingRelease] = (0, import_react.useState)(false);
	const [releaseError, setReleaseError] = (0, import_react.useState)("");
	const [activationForm, setActivationForm] = (0, import_react.useState)({
		releaseDecisionId: "",
		changeReference: "",
		rollbackOwner: "",
		rollbackEvidenceReference: "",
		expiresAt: ""
	});
	const [requestingActivation, setRequestingActivation] = (0, import_react.useState)(false);
	const [activationError, setActivationError] = (0, import_react.useState)("");
	const [activationReviewForm, setActivationReviewForm] = (0, import_react.useState)({
		activationRequestId: "",
		reason: ""
	});
	const [reviewingActivation, setReviewingActivation] = (0, import_react.useState)(false);
	const [activationReviewError, setActivationReviewError] = (0, import_react.useState)("");
	const [permitForm, setPermitForm] = (0, import_react.useState)({
		activationReviewId: "",
		executorOperatorId: "",
		proposedStart: "",
		proposedEnd: ""
	});
	const [requestingPermit, setRequestingPermit] = (0, import_react.useState)(false);
	const [permitError, setPermitError] = (0, import_react.useState)("");
	const [permitDecisionForm, setPermitDecisionForm] = (0, import_react.useState)({
		permitRequestId: "",
		reason: ""
	});
	const [decidingPermit, setDecidingPermit] = (0, import_react.useState)(false);
	const [permitDecisionError, setPermitDecisionError] = (0, import_react.useState)("");
	const [permitRevocationForm, setPermitRevocationForm] = (0, import_react.useState)({
		permitRequestId: "",
		reason: ""
	});
	const [revokingPermit, setRevokingPermit] = (0, import_react.useState)(false);
	const [permitRevocationError, setPermitRevocationError] = (0, import_react.useState)("");
	const [runtimePermitDecisionId, setRuntimePermitDecisionId] = (0, import_react.useState)("");
	const [issuingRuntimePermit, setIssuingRuntimePermit] = (0, import_react.useState)(false);
	const [runtimePermitError, setRuntimePermitError] = (0, import_react.useState)("");
	const [verificationForm, setVerificationForm] = (0, import_react.useState)({
		candidateId: "",
		reason: ""
	});
	const [decidingVerification, setDecidingVerification] = (0, import_react.useState)(false);
	const [verificationError, setVerificationError] = (0, import_react.useState)("");
	const [enrollmentDecisionId, setEnrollmentDecisionId] = (0, import_react.useState)("");
	const [requestingEnrollment, setRequestingEnrollment] = (0, import_react.useState)(false);
	const [enrollmentError, setEnrollmentError] = (0, import_react.useState)("");
	const [enrollmentReviewForm, setEnrollmentReviewForm] = (0, import_react.useState)({
		enrollmentRequestId: "",
		reason: ""
	});
	const [reviewingEnrollment, setReviewingEnrollment] = (0, import_react.useState)(false);
	const [enrollmentReviewError, setEnrollmentReviewError] = (0, import_react.useState)("");
	const [creationReviewId, setCreationReviewId] = (0, import_react.useState)("");
	const [requestingCreationAuthorization, setRequestingCreationAuthorization] = (0, import_react.useState)(false);
	const [creationAuthorizationError, setCreationAuthorizationError] = (0, import_react.useState)("");
	const [creationDecisionForm, setCreationDecisionForm] = (0, import_react.useState)({
		creationRequestId: "",
		reason: ""
	});
	const [decidingCreationAuthorization, setDecidingCreationAuthorization] = (0, import_react.useState)(false);
	const [creationDecisionError, setCreationDecisionError] = (0, import_react.useState)("");
	const [creationExecutionDecisionId, setCreationExecutionDecisionId] = (0, import_react.useState)("");
	const [executingInventoryCreation, setExecutingInventoryCreation] = (0, import_react.useState)(false);
	const [creationExecutionError, setCreationExecutionError] = (0, import_react.useState)("");
	const [monitoringActivationExecutionId, setMonitoringActivationExecutionId] = (0, import_react.useState)("");
	const [requestingMonitoringActivation, setRequestingMonitoringActivation] = (0, import_react.useState)(false);
	const [monitoringActivationError, setMonitoringActivationError] = (0, import_react.useState)("");
	const [monitoringActivationReviewForm, setMonitoringActivationReviewForm] = (0, import_react.useState)({
		monitoringActivationRequestId: "",
		reason: ""
	});
	const [reviewingMonitoringActivation, setReviewingMonitoringActivation] = (0, import_react.useState)(false);
	const [monitoringActivationReviewError, setMonitoringActivationReviewError] = (0, import_react.useState)("");
	const [monitoringAuthorizationReviewId, setMonitoringAuthorizationReviewId] = (0, import_react.useState)("");
	const [requestingMonitoringAuthorization, setRequestingMonitoringAuthorization] = (0, import_react.useState)(false);
	const [monitoringAuthorizationError, setMonitoringAuthorizationError] = (0, import_react.useState)("");
	const [monitoringAuthorizationDecisionForm, setMonitoringAuthorizationDecisionForm] = (0, import_react.useState)({
		monitoringAuthorizationRequestId: "",
		reason: ""
	});
	const [decidingMonitoringAuthorization, setDecidingMonitoringAuthorization] = (0, import_react.useState)(false);
	const [monitoringAuthorizationDecisionError, setMonitoringAuthorizationDecisionError] = (0, import_react.useState)("");
	const [monitoringRegistrationDecisionId, setMonitoringRegistrationDecisionId] = (0, import_react.useState)("");
	const [registeringMonitoringTarget, setRegisteringMonitoringTarget] = (0, import_react.useState)(false);
	const [monitoringRegistrationError, setMonitoringRegistrationError] = (0, import_react.useState)("");
	const [monitoringPollClaimId, setMonitoringPollClaimId] = (0, import_react.useState)("");
	const [requestingMonitoringPoll, setRequestingMonitoringPoll] = (0, import_react.useState)(false);
	const [monitoringPollError, setMonitoringPollError] = (0, import_react.useState)("");
	const [monitoringPollDecisionForm, setMonitoringPollDecisionForm] = (0, import_react.useState)({
		monitoringPollRequestId: "",
		reason: ""
	});
	const [decidingMonitoringPoll, setDecidingMonitoringPoll] = (0, import_react.useState)(false);
	const [monitoringPollDecisionError, setMonitoringPollDecisionError] = (0, import_react.useState)("");
	const [monitoringPollPermitDecisionId, setMonitoringPollPermitDecisionId] = (0, import_react.useState)("");
	const [issuingMonitoringPollPermit, setIssuingMonitoringPollPermit] = (0, import_react.useState)(false);
	const [monitoringPollPermitError, setMonitoringPollPermitError] = (0, import_react.useState)("");
	const [monitoringPollExecutionDecisionForm, setMonitoringPollExecutionDecisionForm] = (0, import_react.useState)({
		monitoringPollExecutionRequestId: "",
		reason: ""
	});
	const [decidingMonitoringPollExecution, setDecidingMonitoringPollExecution] = (0, import_react.useState)(false);
	const [monitoringPollExecutionDecisionError, setMonitoringPollExecutionDecisionError] = (0, import_react.useState)("");
	const [monitoringPollCompletionDecisionForm, setMonitoringPollCompletionDecisionForm] = (0, import_react.useState)({
		monitoringPollExecutionStartId: "",
		reason: ""
	});
	const [decidingMonitoringPollCompletion, setDecidingMonitoringPollCompletion] = (0, import_react.useState)(false);
	const [monitoringPollCompletionDecisionError, setMonitoringPollCompletionDecisionError] = (0, import_react.useState)("");
	const [recurringMonitoringCompletionDecisionId, setRecurringMonitoringCompletionDecisionId] = (0, import_react.useState)("");
	const [requestingRecurringMonitoringActivation, setRequestingRecurringMonitoringActivation] = (0, import_react.useState)(false);
	const [recurringMonitoringActivationError, setRecurringMonitoringActivationError] = (0, import_react.useState)("");
	const [recurringMonitoringActivationReviewForm, setRecurringMonitoringActivationReviewForm] = (0, import_react.useState)({
		recurringMonitoringActivationRequestId: "",
		reason: ""
	});
	const [reviewingRecurringMonitoringActivation, setReviewingRecurringMonitoringActivation] = (0, import_react.useState)(false);
	const [recurringMonitoringActivationReviewError, setRecurringMonitoringActivationReviewError] = (0, import_react.useState)("");
	const [recurringMonitoringActivationDecisionForm, setRecurringMonitoringActivationDecisionForm] = (0, import_react.useState)({
		recurringMonitoringActivationReviewId: "",
		reason: ""
	});
	const [decidingRecurringMonitoringActivation, setDecidingRecurringMonitoringActivation] = (0, import_react.useState)(false);
	const [recurringMonitoringActivationDecisionError, setRecurringMonitoringActivationDecisionError] = (0, import_react.useState)("");
	const [recurringMonitoringActivationDecisionId, setRecurringMonitoringActivationDecisionId] = (0, import_react.useState)("");
	const [registeringRecurringMonitoringSchedule, setRegisteringRecurringMonitoringSchedule] = (0, import_react.useState)(false);
	const [recurringMonitoringScheduleError, setRecurringMonitoringScheduleError] = (0, import_react.useState)("");
	const [recurringProgramForm, setRecurringProgramForm] = (0, import_react.useState)({
		recurringMonitoringScheduleClaimId: "",
		version: 266,
		reason: ""
	});
	const [recordingRecurringProgram, setRecordingRecurringProgram] = (0, import_react.useState)(false);
	const [recurringProgramError, setRecurringProgramError] = (0, import_react.useState)("");
	const [selectedRecurringProgramClaimId, setSelectedRecurringProgramClaimId] = (0, import_react.useState)("");
	const fileInput = (0, import_react.useRef)(null);
	const loadEvidence = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/platform/device-intake", { cache: "no-store" });
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "Persistent intake evidence could not be read.");
			setEvidence(result);
			setEvidenceError("");
			setSelectedBatchId((current) => current || result.batches[0]?.id || "");
			setSelectedCandidateIds((current) => {
				const eligibleIds = new Set(result.nextWaveCandidates.map((candidate) => candidate.id));
				const retained = current.filter((id) => eligibleIds.has(id));
				return retained.length ? retained : result.nextWaveCandidates.map((candidate) => candidate.id);
			});
			setWindowForm((current) => ({
				...current,
				waveId: result.waveManifests.some((manifest) => manifest.id === current.waveId && manifest.currentlyEligible) ? current.waveId : result.waveManifests.find((manifest) => manifest.currentlyEligible)?.id ?? "",
				leadOperatorId: result.activeOperators.some((operator) => operator.id === current.leadOperatorId) ? current.leadOperatorId : result.activeOperators[0]?.id ?? ""
			}));
			setPreflightForm((current) => {
				const selectedWindow = result.waveSchedules.find((window) => window.id === current.windowId && window.scheduleReady) ?? result.waveSchedules.find((window) => window.scheduleReady) ?? null;
				const checkKey = selectedWindow?.missingPreflightChecks.includes(current.checkKey) ? current.checkKey : selectedWindow?.missingPreflightChecks[0] ?? "";
				return {
					...current,
					windowId: selectedWindow?.id ?? "",
					checkKey
				};
			});
			setValidationForm((current) => ({
				...current,
				evidenceId: result.preflightEvidence.some((item) => item.id === current.evidenceId && item.status === "pending" && item.recordedBy.toLowerCase() !== result.viewer.email.toLowerCase()) ? current.evidenceId : result.preflightEvidence.find((item) => item.status === "pending" && item.recordedBy.toLowerCase() !== result.viewer.email.toLowerCase())?.id ?? ""
			}));
			setReleaseForm((current) => ({
				...current,
				windowId: result.waveSchedules.some((window) => window.id === current.windowId && window.decisionOwnerEligible && !window.latestReleaseDecision?.decisionSupported) ? current.windowId : result.waveSchedules.find((window) => window.decisionOwnerEligible && !window.latestReleaseDecision?.decisionSupported)?.id ?? ""
			}));
			setActivationForm((current) => {
				const eligible = result.waveSchedules.filter((window) => window.latestReleaseDecision?.decision === "approved" && window.latestReleaseDecision.decisionSupported && window.lead?.email.toLowerCase() === result.viewer.email.toLowerCase() && !result.activationRequests.some((request) => request.releaseDecisionId === window.latestReleaseDecision?.id && request.requestCurrent));
				return {
					...current,
					releaseDecisionId: eligible.some((window) => window.latestReleaseDecision?.id === current.releaseDecisionId) ? current.releaseDecisionId : eligible[0]?.latestReleaseDecision?.id ?? ""
				};
			});
			setActivationReviewForm((current) => {
				const viewer = result.viewer.email.toLowerCase();
				const eligible = result.activationRequests.filter((activationRequest) => {
					const window = result.waveSchedules.find((item) => item.id === activationRequest.windowId);
					const excluded = [
						activationRequest.requestedBy,
						window?.createdBy,
						window?.manifest?.preparedBy,
						window?.latestReleaseDecision?.decidedBy,
						...(window?.preflightEvidence ?? []).flatMap((item) => [item.recordedBy, item.validatedBy ?? ""])
					].filter(Boolean).map((email) => email.toLowerCase());
					return activationRequest.requestCurrent && !result.activationReviews.some((review) => review.activationRequestId === activationRequest.id) && !excluded.includes(viewer);
				});
				return {
					...current,
					activationRequestId: eligible.some((item) => item.id === current.activationRequestId) ? current.activationRequestId : eligible[0]?.id ?? ""
				};
			});
			setPermitForm((current) => {
				const eligible = result.activationReviews.filter((review) => {
					const activationRequest = result.activationRequests.find((item) => item.id === review.activationRequestId);
					return review.decision === "cleared" && review.reviewCurrent && activationRequest?.requestedBy.toLowerCase() === result.viewer.email.toLowerCase() && !result.permitRequests.some((permit) => permit.activationReviewId === review.id && permit.permitRequestCurrent);
				});
				return {
					...current,
					activationReviewId: eligible.some((review) => review.id === current.activationReviewId) ? current.activationReviewId : eligible[0]?.id ?? "",
					executorOperatorId: result.activeOperators.some((operator) => operator.id === current.executorOperatorId) ? current.executorOperatorId : result.activeOperators[0]?.id ?? ""
				};
			});
			setPermitDecisionForm((current) => {
				const viewer = result.viewer.email.toLowerCase();
				const eligible = result.permitRequests.filter((permitRequest) => {
					const activationReview = result.activationReviews.find((item) => item.id === permitRequest.activationReviewId), activationRequest = result.activationRequests.find((item) => item.id === permitRequest.activationRequestId), window = result.waveSchedules.find((item) => item.id === permitRequest.windowId);
					const excluded = [
						permitRequest.requestedBy,
						permitRequest.executor?.email,
						activationReview?.reviewedBy,
						activationRequest?.requestedBy,
						window?.latestReleaseDecision?.decidedBy,
						window?.manifest?.preparedBy,
						window?.createdBy,
						...(window?.preflightEvidence ?? []).flatMap((item) => [item.recordedBy, item.validatedBy ?? ""])
					].filter(Boolean).map((email) => email.toLowerCase());
					return permitRequest.permitRequestCurrent && !result.permitDecisions.some((permitDecision) => permitDecision.permitRequestId === permitRequest.id) && !excluded.includes(viewer);
				});
				return {
					...current,
					permitRequestId: eligible.some((item) => item.id === current.permitRequestId) ? current.permitRequestId : eligible[0]?.id ?? ""
				};
			});
			setPermitRevocationForm((current) => {
				const eligible = result.permitRequests.filter((permitRequest) => Date.parse(permitRequest.proposedEnd) > Date.parse(result.checkedAt) && !result.permitRevocations.some((revocation) => revocation.permitRequestId === permitRequest.id && revocation.revocationSupported));
				return {
					...current,
					permitRequestId: eligible.some((item) => item.id === current.permitRequestId) ? current.permitRequestId : eligible[0]?.id ?? ""
				};
			});
			setRuntimePermitDecisionId((current) => {
				const eligible = result.permitDecisions.filter((permitDecision) => permitDecision.decision === "approved" && permitDecision.decisionCurrent && permitDecision.decidedBy.toLowerCase() === result.viewer.email.toLowerCase() && !result.runtimePermits.some((runtimePermit) => runtimePermit.permitDecisionId === permitDecision.id));
				return eligible.some((item) => item.id === current) ? current : eligible[0]?.id ?? "";
			});
			setSelectedRecurringProgramClaimId((current) => result.recurringMonitoringProgram.some((item) => item.claim.id === current) ? current : result.recurringMonitoringProgram[0]?.claim.id ?? "");
		} catch (error) {
			setEvidenceError(error instanceof Error ? error.message : "Persistent intake evidence could not be read.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void loadEvidence(), 0);
		return () => window.clearTimeout(initial);
	}, [loadEvidence]);
	const selectedBatch = (0, import_react.useMemo)(() => evidence?.batches.find((batch) => batch.id === selectedBatchId) ?? evidence?.batches[0] ?? null, [evidence, selectedBatchId]);
	const selectedRecurringProgram = (0, import_react.useMemo)(() => evidence?.recurringMonitoringProgram.find((item) => item.claim.id === selectedRecurringProgramClaimId) ?? evidence?.recurringMonitoringProgram[0] ?? null, [evidence, selectedRecurringProgramClaimId]);
	const reviewEligibleActivationRequests = (0, import_react.useMemo)(() => {
		if (!evidence) return [];
		const viewer = evidence.viewer.email.toLowerCase();
		return evidence.activationRequests.filter((activationRequest) => {
			const window = evidence.waveSchedules.find((item) => item.id === activationRequest.windowId);
			const excluded = [
				activationRequest.requestedBy,
				window?.createdBy,
				window?.manifest?.preparedBy,
				window?.latestReleaseDecision?.decidedBy,
				...(window?.preflightEvidence ?? []).flatMap((item) => [item.recordedBy, item.validatedBy ?? ""])
			].filter(Boolean).map((email) => email.toLowerCase());
			return activationRequest.requestCurrent && !evidence.activationReviews.some((review) => review.activationRequestId === activationRequest.id) && !excluded.includes(viewer);
		});
	}, [evidence]);
	const permitDecisionEligibleRequests = (0, import_react.useMemo)(() => {
		if (!evidence) return [];
		const viewer = evidence.viewer.email.toLowerCase();
		return evidence.permitRequests.filter((permitRequest) => {
			const activationReview = evidence.activationReviews.find((item) => item.id === permitRequest.activationReviewId), activationRequest = evidence.activationRequests.find((item) => item.id === permitRequest.activationRequestId), window = evidence.waveSchedules.find((item) => item.id === permitRequest.windowId);
			const excluded = [
				permitRequest.requestedBy,
				permitRequest.executor?.email,
				activationReview?.reviewedBy,
				activationRequest?.requestedBy,
				window?.latestReleaseDecision?.decidedBy,
				window?.manifest?.preparedBy,
				window?.createdBy,
				...(window?.preflightEvidence ?? []).flatMap((item) => [item.recordedBy, item.validatedBy ?? ""])
			].filter(Boolean).map((email) => email.toLowerCase());
			return permitRequest.permitRequestCurrent && !evidence.permitDecisions.some((permitDecision) => permitDecision.permitRequestId === permitRequest.id) && !excluded.includes(viewer);
		});
	}, [evidence]);
	const notify = (message) => {
		setNotice(message);
		window.setTimeout(() => setNotice(""), 3e3);
	};
	const downloadTemplate = () => {
		const url = URL.createObjectURL(new Blob([`${headers.join(",")}\n`], { type: "text/csv;charset=utf-8" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = "nocx-device-intake-template.csv";
		link.click();
		URL.revokeObjectURL(url);
		notify("Blank CSV contract downloaded. No example equipment or ownership data is included.");
	};
	const loadFile = async (event) => {
		const file = event.target.files?.[0];
		if (!file) return;
		try {
			const parsed = parseCsv(await file.text());
			setFileName(file.name);
			setRows(parsed);
			setErrors(validateRows(parsed));
		} catch (error) {
			setFileName(file.name);
			setRows([]);
			setErrors([error instanceof Error ? error.message : "The CSV could not be read."]);
		}
	};
	const stageDraft = async () => {
		if (errors.length || !rows.length || submitting) return;
		setSubmitting(true);
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					fileName,
					rows
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The intake batch was not accepted.");
			notify(`${result.accepted ?? rows.length} candidate records staged as draft. Probes remain disabled.`);
			setRows([]);
			setErrors([]);
			setFileName("");
			if (fileInput.current) fileInput.current.value = "";
			await loadEvidence();
		} catch (error) {
			setErrors([error instanceof Error ? error.message : "The intake batch was not accepted."]);
		} finally {
			setSubmitting(false);
		}
	};
	const toggleCandidate = (candidateId) => {
		setSelectedCandidateIds((current) => current.includes(candidateId) ? current.filter((id) => id !== candidateId) : [...current, candidateId].slice(0, 10));
		setManifestError("");
	};
	const sealManifest = async () => {
		if (!selectedCandidateIds.length || sealingManifest) return;
		setSealingManifest(true);
		setManifestError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "seal_wave",
					candidateIds: selectedCandidateIds
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The onboarding manifest could not be sealed.");
			notify(`${result.candidateCount ?? selectedCandidateIds.length} exact candidates sealed into a read-only manifest. No device was contacted.`);
			await loadEvidence();
		} catch (error) {
			setManifestError(error instanceof Error ? error.message : "The onboarding manifest could not be sealed.");
		} finally {
			setSealingManifest(false);
		}
	};
	const scheduleWindow = async () => {
		if (schedulingWindow) return;
		const abortCriteria = windowForm.abortCriteria.split("\n").map((item) => item.trim()).filter(Boolean);
		setSchedulingWindow(true);
		setWindowError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "schedule_wave",
					waveId: windowForm.waveId,
					leadOperatorId: windowForm.leadOperatorId,
					scheduledStart: windowForm.scheduledStart ? new Date(windowForm.scheduledStart).toISOString() : "",
					scheduledEnd: windowForm.scheduledEnd ? new Date(windowForm.scheduledEnd).toISOString() : "",
					abortCriteria
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The commissioning window could not be scheduled.");
			notify("Commissioning window scheduled with mandatory checks and abort criteria. Device contact remains disabled.");
			setWindowForm((current) => ({
				...current,
				scheduledStart: "",
				scheduledEnd: ""
			}));
			await loadEvidence();
		} catch (error) {
			setWindowError(error instanceof Error ? error.message : "The commissioning window could not be scheduled.");
		} finally {
			setSchedulingWindow(false);
		}
	};
	const recordPreflight = async () => {
		if (recordingPreflight) return;
		setRecordingPreflight(true);
		setPreflightError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "record_preflight",
					...preflightForm
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "Preflight evidence could not be recorded.");
			notify("Preflight evidence recorded for independent validation. Release authority remains disabled.");
			setPreflightForm((current) => ({
				...current,
				evidenceReference: "",
				notes: ""
			}));
			await loadEvidence();
		} catch (error) {
			setPreflightError(error instanceof Error ? error.message : "Preflight evidence could not be recorded.");
		} finally {
			setRecordingPreflight(false);
		}
	};
	const validatePreflight = async (outcome) => {
		if (validatingPreflight) return;
		setValidatingPreflight(true);
		setValidationError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "PATCH",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "validate_preflight",
					evidenceId: validationForm.evidenceId,
					outcome,
					reason: validationForm.reason
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "Preflight validation failed.");
			notify(outcome === "accepted" ? "Preflight evidence independently accepted." : "Preflight evidence rejected; the check remains blocked.");
			setValidationForm({
				evidenceId: "",
				reason: ""
			});
			await loadEvidence();
		} catch (error) {
			setValidationError(error instanceof Error ? error.message : "Preflight validation failed.");
		} finally {
			setValidatingPreflight(false);
		}
	};
	const decideRelease = async (releaseDecision) => {
		if (decidingRelease) return;
		setDecidingRelease(true);
		setReleaseError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "decide_wave_release",
					windowId: releaseForm.windowId,
					decision: releaseDecision,
					reason: releaseForm.reason
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The release decision could not be recorded.");
			notify(releaseDecision === "approved" ? "Read-only onboarding release approved. Device activation remains disabled." : "Onboarding release blocked with an immutable decision record.");
			setReleaseForm({
				windowId: "",
				reason: ""
			});
			await loadEvidence();
		} catch (error) {
			setReleaseError(error instanceof Error ? error.message : "The release decision could not be recorded.");
		} finally {
			setDecidingRelease(false);
		}
	};
	const requestActivationHandoff = async () => {
		if (requestingActivation) return;
		setRequestingActivation(true);
		setActivationError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "request_activation_handoff",
					...activationForm,
					expiresAt: activationForm.expiresAt ? new Date(activationForm.expiresAt).toISOString() : ""
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The activation handoff request could not be recorded.");
			notify("Activation handoff requested with exact scope and rollback evidence. Authorization remains pending.");
			setActivationForm({
				releaseDecisionId: "",
				changeReference: "",
				rollbackOwner: "",
				rollbackEvidenceReference: "",
				expiresAt: ""
			});
			await loadEvidence();
		} catch (error) {
			setActivationError(error instanceof Error ? error.message : "The activation handoff request could not be recorded.");
		} finally {
			setRequestingActivation(false);
		}
	};
	const reviewActivationHandoff = async (reviewDecision) => {
		if (reviewingActivation) return;
		setReviewingActivation(true);
		setActivationReviewError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "review_activation_handoff",
					activationRequestId: activationReviewForm.activationRequestId,
					decision: reviewDecision,
					reason: activationReviewForm.reason
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The activation handoff review could not be recorded.");
			notify(reviewDecision === "cleared" ? "Handoff evidence cleared independently. No execution permit was issued." : "Activation handoff blocked with an immutable review record.");
			setActivationReviewForm({
				activationRequestId: "",
				reason: ""
			});
			await loadEvidence();
		} catch (error) {
			setActivationReviewError(error instanceof Error ? error.message : "The activation handoff review could not be recorded.");
		} finally {
			setReviewingActivation(false);
		}
	};
	const requestExecutionPermit = async () => {
		if (requestingPermit) return;
		setRequestingPermit(true);
		setPermitError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "request_execution_permit",
					...permitForm,
					proposedStart: permitForm.proposedStart ? new Date(permitForm.proposedStart).toISOString() : "",
					proposedEnd: permitForm.proposedEnd ? new Date(permitForm.proposedEnd).toISOString() : ""
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The execution permit request could not be recorded.");
			notify("Execution permit requested for the exact scope and timebox. No permit was issued.");
			setPermitForm({
				activationReviewId: "",
				executorOperatorId: "",
				proposedStart: "",
				proposedEnd: ""
			});
			await loadEvidence();
		} catch (error) {
			setPermitError(error instanceof Error ? error.message : "The execution permit request could not be recorded.");
		} finally {
			setRequestingPermit(false);
		}
	};
	const decideExecutionPermit = async (permitDecision) => {
		if (decidingPermit) return;
		setDecidingPermit(true);
		setPermitDecisionError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "decide_execution_permit",
					permitRequestId: permitDecisionForm.permitRequestId,
					decision: permitDecision,
					reason: permitDecisionForm.reason
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The execution permit decision could not be recorded.");
			notify(permitDecision === "approved" ? "Permit request approved independently. Runtime permit issuance remains disabled." : "Permit request blocked with an immutable decision record.");
			setPermitDecisionForm({
				permitRequestId: "",
				reason: ""
			});
			await loadEvidence();
		} catch (error) {
			setPermitDecisionError(error instanceof Error ? error.message : "The execution permit decision could not be recorded.");
		} finally {
			setDecidingPermit(false);
		}
	};
	const revokeExecutionPermit = async () => {
		if (revokingPermit) return;
		setRevokingPermit(true);
		setPermitRevocationError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "revoke_execution_permit",
					permitRequestId: permitRevocationForm.permitRequestId,
					reason: permitRevocationForm.reason
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The execution permit could not be revoked.");
			notify("Permit request revoked fail-closed. No runtime authority exists.");
			setPermitRevocationForm({
				permitRequestId: "",
				reason: ""
			});
			await loadEvidence();
		} catch (error) {
			setPermitRevocationError(error instanceof Error ? error.message : "The execution permit could not be revoked.");
		} finally {
			setRevokingPermit(false);
		}
	};
	const issueRuntimePermit = async () => {
		if (issuingRuntimePermit) return;
		setIssuingRuntimePermit(true);
		setRuntimePermitError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "issue_runtime_permit",
					permitDecisionId: runtimePermitDecisionId
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The runtime permit could not be issued.");
			notify("Bounded SNMP GET-only runtime permit issued for authenticated assigned-collector consumption.");
			setRuntimePermitDecisionId("");
			await loadEvidence();
		} catch (error) {
			setRuntimePermitError(error instanceof Error ? error.message : "The runtime permit could not be issued.");
		} finally {
			setIssuingRuntimePermit(false);
		}
	};
	const decideReadOnlyVerification = async (verificationDecision) => {
		if (decidingVerification) return;
		const assessment = evidence?.candidateExecutionAssessments.find((item) => item.candidateId === verificationForm.candidateId);
		if (!assessment?.runtimePermitId || !assessment.evidenceDigest || assessment.evidenceReceiptIds.length !== 4) {
			setVerificationError("Select one complete, current four-operation evidence package.");
			return;
		}
		setDecidingVerification(true);
		setVerificationError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "decide_read_only_verification",
					candidateId: assessment.candidateId,
					runtimePermitId: assessment.runtimePermitId,
					evidenceDigest: assessment.evidenceDigest,
					evidenceReceiptIds: assessment.evidenceReceiptIds,
					decision: verificationDecision,
					reason: verificationForm.reason
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The read-only verification decision could not be recorded.");
			notify(verificationDecision === "approved" ? "Read-only evidence approved independently. Monitoring activation remains disabled." : "Read-only evidence blocked with an immutable independent decision.");
			setVerificationForm({
				candidateId: "",
				reason: ""
			});
			await loadEvidence();
		} catch (error) {
			setVerificationError(error instanceof Error ? error.message : "The read-only verification decision could not be recorded.");
		} finally {
			setDecidingVerification(false);
		}
	};
	const requestInventoryEnrollment = async () => {
		if (requestingEnrollment) return;
		setRequestingEnrollment(true);
		setEnrollmentError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "request_inventory_enrollment",
					verificationDecisionId: enrollmentDecisionId
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The inventory enrollment request could not be recorded.");
			notify("Inventory enrollment requested from an approved evidence package. No device was created and monitoring remains disabled.");
			setEnrollmentDecisionId("");
			await loadEvidence();
		} catch (error) {
			setEnrollmentError(error instanceof Error ? error.message : "The inventory enrollment request could not be recorded.");
		} finally {
			setRequestingEnrollment(false);
		}
	};
	const reviewInventoryEnrollment = async (reviewDecision) => {
		if (reviewingEnrollment) return;
		setReviewingEnrollment(true);
		setEnrollmentReviewError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "review_inventory_enrollment",
					enrollmentRequestId: enrollmentReviewForm.enrollmentRequestId,
					decision: reviewDecision,
					reason: enrollmentReviewForm.reason
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The enrollment review could not be recorded.");
			notify(reviewDecision === "cleared" ? "Enrollment request cleared independently. Device creation and monitoring remain disabled." : "Enrollment request blocked with an immutable independent review.");
			setEnrollmentReviewForm({
				enrollmentRequestId: "",
				reason: ""
			});
			await loadEvidence();
		} catch (error) {
			setEnrollmentReviewError(error instanceof Error ? error.message : "The enrollment review could not be recorded.");
		} finally {
			setReviewingEnrollment(false);
		}
	};
	const requestDeviceCreationAuthorization = async () => {
		if (requestingCreationAuthorization) return;
		setRequestingCreationAuthorization(true);
		setCreationAuthorizationError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "request_device_creation_authorization",
					enrollmentReviewId: creationReviewId
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The device-creation authorization request could not be recorded.");
			notify("Device-creation authorization requested from a cleared review. No device was created and monitoring remains disabled.");
			setCreationReviewId("");
			await loadEvidence();
		} catch (error) {
			setCreationAuthorizationError(error instanceof Error ? error.message : "The device-creation authorization request could not be recorded.");
		} finally {
			setRequestingCreationAuthorization(false);
		}
	};
	const decideDeviceCreationAuthorization = async (creationDecision) => {
		if (decidingCreationAuthorization) return;
		setDecidingCreationAuthorization(true);
		setCreationDecisionError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "decide_device_creation_authorization",
					creationRequestId: creationDecisionForm.creationRequestId,
					decision: creationDecision,
					reason: creationDecisionForm.reason
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The device-creation authorization decision could not be recorded.");
			notify(creationDecision === "approved" ? "Device creation authorized independently. No device was created and monitoring remains disabled." : "Device-creation authorization blocked with an immutable independent decision.");
			setCreationDecisionForm({
				creationRequestId: "",
				reason: ""
			});
			await loadEvidence();
		} catch (error) {
			setCreationDecisionError(error instanceof Error ? error.message : "The device-creation authorization decision could not be recorded.");
		} finally {
			setDecidingCreationAuthorization(false);
		}
	};
	const createInventoryDevice = async () => {
		if (executingInventoryCreation) return;
		setExecutingInventoryCreation(true);
		setCreationExecutionError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "create_inventory_device",
					creationDecisionId: creationExecutionDecisionId
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The inventory device could not be created.");
			notify("Inventory device created from the locked snapshot. Monitoring, probes and network writes remain disabled.");
			setCreationExecutionDecisionId("");
			await loadEvidence();
		} catch (error) {
			setCreationExecutionError(error instanceof Error ? error.message : "The inventory device could not be created.");
		} finally {
			setExecutingInventoryCreation(false);
		}
	};
	const requestMonitoringActivation = async () => {
		if (requestingMonitoringActivation) return;
		setRequestingMonitoringActivation(true);
		setMonitoringActivationError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "request_monitoring_activation",
					creationExecutionId: monitoringActivationExecutionId
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The monitoring-activation request could not be recorded.");
			notify("Monitoring activation requested from current enrollment evidence. Monitoring and device contact remain disabled.");
			setMonitoringActivationExecutionId("");
			await loadEvidence();
		} catch (error) {
			setMonitoringActivationError(error instanceof Error ? error.message : "The monitoring-activation request could not be recorded.");
		} finally {
			setRequestingMonitoringActivation(false);
		}
	};
	const reviewMonitoringActivation = async (reviewDecision) => {
		if (reviewingMonitoringActivation) return;
		setReviewingMonitoringActivation(true);
		setMonitoringActivationReviewError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "review_monitoring_activation",
					monitoringActivationRequestId: monitoringActivationReviewForm.monitoringActivationRequestId,
					decision: reviewDecision,
					reason: monitoringActivationReviewForm.reason
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The monitoring-activation review could not be recorded.");
			notify(`Monitoring request ${reviewDecision}. Monitoring, device contact and credential execution remain disabled.`);
			setMonitoringActivationReviewForm({
				monitoringActivationRequestId: "",
				reason: ""
			});
			await loadEvidence();
		} catch (error) {
			setMonitoringActivationReviewError(error instanceof Error ? error.message : "The monitoring-activation review could not be recorded.");
		} finally {
			setReviewingMonitoringActivation(false);
		}
	};
	const requestMonitoringAuthorization = async () => {
		if (requestingMonitoringAuthorization) return;
		setRequestingMonitoringAuthorization(true);
		setMonitoringAuthorizationError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "request_monitoring_authorization",
					monitoringActivationReviewId: monitoringAuthorizationReviewId
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The monitoring authorization request could not be recorded.");
			notify("Final monitoring authorization requested from the exact independent clearance. Monitoring and device contact remain disabled.");
			setMonitoringAuthorizationReviewId("");
			await loadEvidence();
		} catch (error) {
			setMonitoringAuthorizationError(error instanceof Error ? error.message : "The monitoring authorization request could not be recorded.");
		} finally {
			setRequestingMonitoringAuthorization(false);
		}
	};
	const decideMonitoringAuthorization = async (authorizationDecision) => {
		if (decidingMonitoringAuthorization) return;
		setDecidingMonitoringAuthorization(true);
		setMonitoringAuthorizationDecisionError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "decide_monitoring_authorization",
					monitoringAuthorizationRequestId: monitoringAuthorizationDecisionForm.monitoringAuthorizationRequestId,
					decision: authorizationDecision,
					reason: monitoringAuthorizationDecisionForm.reason
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The monitoring authorization decision could not be recorded.");
			notify(`Monitoring authorization ${authorizationDecision}. No monitoring, polling or device contact has started.`);
			setMonitoringAuthorizationDecisionForm({
				monitoringAuthorizationRequestId: "",
				reason: ""
			});
			await loadEvidence();
		} catch (error) {
			setMonitoringAuthorizationDecisionError(error instanceof Error ? error.message : "The monitoring authorization decision could not be recorded.");
		} finally {
			setDecidingMonitoringAuthorization(false);
		}
	};
	const registerMonitoringTarget = async () => {
		if (registeringMonitoringTarget) return;
		setRegisteringMonitoringTarget(true);
		setMonitoringRegistrationError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "register_monitoring_target",
					monitoringAuthorizationDecisionId: monitoringRegistrationDecisionId
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The monitoring target could not be registered.");
			notify("Monitoring target registered internally. Polling, device contact and credential execution remain disabled.");
			setMonitoringRegistrationDecisionId("");
			await loadEvidence();
		} catch (error) {
			setMonitoringRegistrationError(error instanceof Error ? error.message : "The monitoring target could not be registered.");
		} finally {
			setRegisteringMonitoringTarget(false);
		}
	};
	const requestMonitoringPoll = async () => {
		if (requestingMonitoringPoll) return;
		setRequestingMonitoringPoll(true);
		setMonitoringPollError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "request_monitoring_poll",
					monitoringCollectorClaimId: monitoringPollClaimId
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The monitoring poll request could not be recorded.");
			notify("First read-only poll requested for a 15-minute window. No poll or device contact has started.");
			setMonitoringPollClaimId("");
			await loadEvidence();
		} catch (error) {
			setMonitoringPollError(error instanceof Error ? error.message : "The monitoring poll request could not be recorded.");
		} finally {
			setRequestingMonitoringPoll(false);
		}
	};
	const decideMonitoringPoll = async (pollDecision) => {
		if (decidingMonitoringPoll) return;
		setDecidingMonitoringPoll(true);
		setMonitoringPollDecisionError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "decide_monitoring_poll",
					monitoringPollRequestId: monitoringPollDecisionForm.monitoringPollRequestId,
					decision: pollDecision,
					reason: monitoringPollDecisionForm.reason
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The first-poll decision could not be recorded.");
			notify(`First-poll request ${pollDecision}. No poll, device contact or credential execution has started.`);
			setMonitoringPollDecisionForm({
				monitoringPollRequestId: "",
				reason: ""
			});
			await loadEvidence();
		} catch (error) {
			setMonitoringPollDecisionError(error instanceof Error ? error.message : "The first-poll decision could not be recorded.");
		} finally {
			setDecidingMonitoringPoll(false);
		}
	};
	const issueMonitoringPollPermit = async () => {
		if (issuingMonitoringPollPermit) return;
		setIssuingMonitoringPollPermit(true);
		setMonitoringPollPermitError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "issue_monitoring_poll_permit",
					monitoringPollDecisionId: monitoringPollPermitDecisionId
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The first-poll permit could not be issued.");
			notify("Bounded first-poll permit issued. No poll, device contact or credential execution has started.");
			setMonitoringPollPermitDecisionId("");
			await loadEvidence();
		} catch (error) {
			setMonitoringPollPermitError(error instanceof Error ? error.message : "The first-poll permit could not be issued.");
		} finally {
			setIssuingMonitoringPollPermit(false);
		}
	};
	const decideMonitoringPollExecution = async (executionDecision) => {
		if (decidingMonitoringPollExecution) return;
		setDecidingMonitoringPollExecution(true);
		setMonitoringPollExecutionDecisionError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "decide_monitoring_poll_execution",
					monitoringPollExecutionRequestId: monitoringPollExecutionDecisionForm.monitoringPollExecutionRequestId,
					decision: executionDecision,
					reason: monitoringPollExecutionDecisionForm.reason
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The execution-intent decision could not be recorded.");
			notify(`First-poll execution intent ${executionDecision}. Polling has not started.`);
			setMonitoringPollExecutionDecisionForm({
				monitoringPollExecutionRequestId: "",
				reason: ""
			});
			await loadEvidence();
		} catch (error) {
			setMonitoringPollExecutionDecisionError(error instanceof Error ? error.message : "The execution-intent decision could not be recorded.");
		} finally {
			setDecidingMonitoringPollExecution(false);
		}
	};
	const decideMonitoringPollCompletion = async (completionDecision) => {
		if (decidingMonitoringPollCompletion) return;
		setDecidingMonitoringPollCompletion(true);
		setMonitoringPollCompletionDecisionError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "decide_monitoring_poll_completion",
					monitoringPollExecutionStartId: monitoringPollCompletionDecisionForm.monitoringPollExecutionStartId,
					decision: completionDecision,
					reason: monitoringPollCompletionDecisionForm.reason
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The first-poll completion decision could not be recorded.");
			notify(`First-poll completion ${completionDecision}. Recurring monitoring and alerts remain disabled.`);
			setMonitoringPollCompletionDecisionForm({
				monitoringPollExecutionStartId: "",
				reason: ""
			});
			await loadEvidence();
		} catch (error) {
			setMonitoringPollCompletionDecisionError(error instanceof Error ? error.message : "The first-poll completion decision could not be recorded.");
		} finally {
			setDecidingMonitoringPollCompletion(false);
		}
	};
	const requestRecurringMonitoringActivation = async () => {
		if (requestingRecurringMonitoringActivation) return;
		setRequestingRecurringMonitoringActivation(true);
		setRecurringMonitoringActivationError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "request_recurring_monitoring_activation",
					monitoringPollCompletionDecisionId: recurringMonitoringCompletionDecisionId
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The recurring-monitoring activation request could not be recorded.");
			notify("Recurring-monitoring activation requested. Polling and alerts remain disabled.");
			setRecurringMonitoringCompletionDecisionId("");
			await loadEvidence();
		} catch (error) {
			setRecurringMonitoringActivationError(error instanceof Error ? error.message : "The recurring-monitoring activation request could not be recorded.");
		} finally {
			setRequestingRecurringMonitoringActivation(false);
		}
	};
	const reviewRecurringMonitoringActivation = async (reviewDecision) => {
		if (reviewingRecurringMonitoringActivation) return;
		setReviewingRecurringMonitoringActivation(true);
		setRecurringMonitoringActivationReviewError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "review_recurring_monitoring_activation",
					recurringMonitoringActivationRequestId: recurringMonitoringActivationReviewForm.recurringMonitoringActivationRequestId,
					decision: reviewDecision,
					reason: recurringMonitoringActivationReviewForm.reason
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The recurring-monitoring activation review could not be recorded.");
			notify(`Recurring-monitoring activation request ${reviewDecision}. Polling and alerts remain disabled.`);
			setRecurringMonitoringActivationReviewForm({
				recurringMonitoringActivationRequestId: "",
				reason: ""
			});
			await loadEvidence();
		} catch (error) {
			setRecurringMonitoringActivationReviewError(error instanceof Error ? error.message : "The recurring-monitoring activation review could not be recorded.");
		} finally {
			setReviewingRecurringMonitoringActivation(false);
		}
	};
	const decideRecurringMonitoringActivation = async (activationDecision) => {
		if (decidingRecurringMonitoringActivation) return;
		setDecidingRecurringMonitoringActivation(true);
		setRecurringMonitoringActivationDecisionError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "decide_recurring_monitoring_activation",
					recurringMonitoringActivationReviewId: recurringMonitoringActivationDecisionForm.recurringMonitoringActivationReviewId,
					decision: activationDecision,
					reason: recurringMonitoringActivationDecisionForm.reason
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The recurring-monitoring activation decision could not be recorded.");
			notify(`Recurring-monitoring activation ${activationDecision}. Scheduling authority is recorded, but polling remains stopped.`);
			setRecurringMonitoringActivationDecisionForm({
				recurringMonitoringActivationReviewId: "",
				reason: ""
			});
			await loadEvidence();
		} catch (error) {
			setRecurringMonitoringActivationDecisionError(error instanceof Error ? error.message : "The recurring-monitoring activation decision could not be recorded.");
		} finally {
			setDecidingRecurringMonitoringActivation(false);
		}
	};
	const registerRecurringMonitoringSchedule = async () => {
		if (registeringRecurringMonitoringSchedule) return;
		setRegisteringRecurringMonitoringSchedule(true);
		setRecurringMonitoringScheduleError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "register_recurring_monitoring_schedule",
					recurringMonitoringActivationDecisionId
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The recurring-monitoring schedule could not be registered.");
			notify("Recurring schedule registered. Polling and alerts remain stopped.");
			setRecurringMonitoringActivationDecisionId("");
			await loadEvidence();
		} catch (error) {
			setRecurringMonitoringScheduleError(error instanceof Error ? error.message : "The recurring-monitoring schedule could not be registered.");
		} finally {
			setRegisteringRecurringMonitoringSchedule(false);
		}
	};
	const recordRecurringProgramGate = async () => {
		if (recordingRecurringProgram) return;
		setRecordingRecurringProgram(true);
		setRecurringProgramError("");
		try {
			const response = await fetch("/api/platform/device-intake", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "record_recurring_monitoring_program_gate",
					...recurringProgramForm
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "The recurring-monitoring program gate could not be recorded.");
			notify(`Version ${recurringProgramForm.version} evidence recorded; runtime authority remains disabled.`);
			setRecurringProgramForm({
				recurringMonitoringScheduleClaimId: "",
				version: 266,
				reason: ""
			});
			await loadEvidence();
		} catch (error) {
			setRecurringProgramError(error instanceof Error ? error.message : "The recurring-monitoring program gate could not be recorded.");
		} finally {
			setRecordingRecurringProgram(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "intake-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "intake-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Authorize the reviewed recurring profile" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "ORDERED PRODUCTION ASSURANCE PROGRAM"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A third operator recomputes the cleared-review digest and approves or blocks scheduling authority. Approval cannot itself register a schedule, start polling or enable alerts." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "intake-hero-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: () => void loadEvidence(),
							disabled: loading,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), loading ? "Refreshing…" : "Refresh evidence"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: downloadTemplate,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), "Download blank CSV"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							onClick: () => fileInput.current?.click(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { size: 15 }), "Select completed CSV"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileInput,
							type: "file",
							accept: ".csv,text/csv",
							onChange: loadFile,
							"aria-label": "Select completed device intake CSV"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "intake-summary nocx-summary-grid",
				"aria-label": "Persistent device intake evidence",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Assessed devices" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : evidence?.summary.assessedCandidates ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Current permits only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Read-only verified" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : evidence?.summary.readOnlyVerifiedCandidates ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Four successful outcomes" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Approved recurring profiles" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : evidence?.summary.approvedRecurringMonitoringActivations ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Polling still stopped" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "SNMP SET / network writes" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Disabled" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "SNMP GET-only boundary" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "intake-evidence-note",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Persistent evidence only." }), " No seeded batch, template example, device availability, equipment date, site, owner or activation claim is supplied by this interface."] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-wave",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "EXACT WAVE SELECTION"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Versioned collector and credential readiness" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Select up to ten currently eligible candidates. The sealed manifest records an evidence snapshot only; it does not start polling, execute credentials or contact a device." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, {})] }), evidence?.nextWaveCandidates.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-wave-grid",
						children: evidence.nextWaveCandidates.map((candidate, index) => {
							const selected = selectedCandidateIds.includes(candidate.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: selected ? "selected" : "",
								onClick: () => toggleCandidate(candidate.id),
								"aria-pressed": selected,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(index + 1).padStart(2, "0") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: candidate.hostname }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											candidate.vendor,
											" ",
											candidate.model,
											" · ",
											candidate.site
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
											candidate.collector?.name,
											" · collector ",
											candidate.collector?.version,
											" · ",
											candidate.snmpMode
										] })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: selected ? "Selected" : "Eligible" })
								]
							}, candidate.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "intake-wave-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
							selectedCandidateIds.length,
							" exact candidate",
							selectedCandidateIds.length === 1 ? "" : "s",
							" · SNMP GET-only · activation disabled"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							onClick: () => void sealManifest(),
							disabled: !evidence.viewer.canAdmin || !selectedCandidateIds.length || sealingManifest,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 14 }), sealingManifest ? "Sealing…" : "Seal selected manifest"]
						})]
					}),
					manifestError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), manifestError]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "intake-empty",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No candidate currently passes every wave gate" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Resolve collector freshness/version, credential state, candidate state or safety blockers before sealing the next onboarding manifest." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-manifests",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "IMMUTABLE WAVE MANIFESTS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Evidence-locked onboarding register" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every manifest is rechecked against current collector, credential and candidate evidence. A sealed manifest is preparation evidence, not commissioning or activation." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {})] }), evidence?.waveManifests.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "intake-manifest-grid",
					children: evidence.waveManifests.map((manifest) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							manifest.candidateCount,
							" device",
							manifest.candidateCount === 1 ? "" : "s"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: manifest.currentlyEligible ? "wave-ready" : "wave-blocked",
							children: manifest.currentlyEligible ? "Current" : "Blocked"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Prepared" }), evidenceTime(manifest.preparedAt)] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Operator" }), manifest.preparedBy] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Manifest digest" }),
							manifest.manifestDigest.slice(0, 16),
							"…"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Safety" }),
							"SNMP SET ",
							String(manifest.snmpSetEnabled),
							" · writes ",
							String(manifest.networkWritesEnabled)
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: manifest.currentlyEligible ? "Every candidate still passes current read-only gates." : manifest.blockers.join(" · ").replaceAll("_", " ") })
					] }, manifest.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "intake-empty",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No sealed onboarding manifests" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "An authorized operator can seal an exact eligible candidate selection without activating devices." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "intake-window-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel intake-window-form",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "CONTROLLED COMMISSIONING WINDOW"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Assign the wave handoff" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Windows must be future-dated, last 15 minutes to 4 hours and include at least two abort criteria." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-window-fields",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Current sealed manifest" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: windowForm.waveId,
									onChange: (event) => setWindowForm((current) => ({
										...current,
										waveId: event.target.value
									})),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select a manifest"
									}), evidence?.waveManifests.filter((manifest) => manifest.currentlyEligible).map((manifest) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: manifest.id,
										children: [
											manifest.candidateCount,
											" devices · ",
											manifest.manifestDigest.slice(0, 10)
										]
									}, manifest.id))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lead operator" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: windowForm.leadOperatorId,
									onChange: (event) => setWindowForm((current) => ({
										...current,
										leadOperatorId: event.target.value
									})),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select an active operator"
									}), evidence?.activeOperators.map((operator) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: operator.id,
										children: [
											operator.displayName,
											" · ",
											operator.email
										]
									}, operator.id))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Window starts" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "datetime-local",
									value: windowForm.scheduledStart,
									onChange: (event) => setWindowForm((current) => ({
										...current,
										scheduledStart: event.target.value
									}))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Window ends" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "datetime-local",
									value: windowForm.scheduledEnd,
									onChange: (event) => setWindowForm((current) => ({
										...current,
										scheduledEnd: event.target.value
									}))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "wide",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Abort criteria · one per line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 4,
										value: windowForm.abortCriteria,
										onChange: (event) => setWindowForm((current) => ({
											...current,
											abortCriteria: event.target.value
										}))
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-window-checks",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Mandatory checks" }), evidence?.controls.requiredWindowChecks.map((check) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), check.replaceAll("_", " ")] }, check))]
						}),
						windowError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-manifest-error",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), windowError]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Device contact, credential execution and network writes remain disabled."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							disabled: !evidence?.viewer.canAdmin || !windowForm.waveId || !windowForm.leadOperatorId || !windowForm.scheduledStart || !windowForm.scheduledEnd || schedulingWindow,
							onClick: () => void scheduleWindow(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { size: 14 }), schedulingWindow ? "Scheduling…" : "Schedule controlled window"]
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel intake-window-register",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "WINDOW REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Persistent scheduling evidence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Readiness is recalculated from current manifest, operator and safety evidence." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {})] }), evidence?.waveSchedules.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: evidence.waveSchedules.map((window) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: evidenceTime(window.scheduledStart) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["to ", evidenceTime(window.scheduledEnd)] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: window.lead?.displayName ?? "Lead unresolved" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							window.manifest?.candidateCount ?? 0,
							" manifest devices · ",
							window.abortCriteria.length,
							" abort criteria"
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
							className: window.scheduleReady ? "ready" : "blocked",
							children: window.scheduleReady ? "Ready" : "Blocked"
						}),
						!window.scheduleReady && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: window.blockers.join(" · ").replaceAll("_", " ") })
					] }, window.id)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No commissioning windows scheduled" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Scheduling remains unavailable until a current manifest and active operator are recorded." })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "intake-preflight-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel intake-preflight-form",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "PREFLIGHT EVIDENCE COLLECTION"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Record one required check" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Evidence is stored as a digest-bound pending record. The recorder cannot independently validate the same record." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-window-fields",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Schedule-ready window" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: preflightForm.windowId,
									onChange: (event) => {
										const window = evidence?.waveSchedules.find((item) => item.id === event.target.value);
										setPreflightForm((current) => ({
											...current,
											windowId: event.target.value,
											checkKey: window?.missingPreflightChecks[0] ?? ""
										}));
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select a window"
									}), evidence?.waveSchedules.filter((window) => window.scheduleReady).map((window) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: window.id,
										children: [
											evidenceTime(window.scheduledStart),
											" · ",
											window.manifest?.candidateCount ?? 0,
											" devices"
										]
									}, window.id))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Required check" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: preflightForm.checkKey,
									onChange: (event) => setPreflightForm((current) => ({
										...current,
										checkKey: event.target.value
									})),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select a missing check"
									}), (evidence?.waveSchedules.find((window) => window.id === preflightForm.windowId)?.missingPreflightChecks ?? []).map((check) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: check,
										children: check.replaceAll("_", " ")
									}, check))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "wide",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Evidence reference" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: preflightForm.evidenceReference,
										onChange: (event) => setPreflightForm((current) => ({
											...current,
											evidenceReference: event.target.value
										})),
										placeholder: "Ticket, observation or evidence identifier"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "wide",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Evidence notes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 4,
										value: preflightForm.notes,
										onChange: (event) => setPreflightForm((current) => ({
											...current,
											notes: event.target.value
										})),
										placeholder: "Describe what was checked and the observed result"
									})]
								})
							]
						}),
						preflightError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-manifest-error",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), preflightError]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Recording evidence grants no release, activation or device-contact authority."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							disabled: !evidence?.viewer.canAdmin || !preflightForm.windowId || !preflightForm.checkKey || preflightForm.evidenceReference.trim().length < 8 || preflightForm.notes.trim().length < 12 || recordingPreflight,
							onClick: () => void recordPreflight(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 14 }), recordingPreflight ? "Recording…" : "Record pending evidence"]
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel intake-preflight-register",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "PREFLIGHT REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Validation-bound evidence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only independently validated evidence can satisfy a required check." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {})] }), evidence?.preflightEvidence.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: evidence.preflightEvidence.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.checkKey.replaceAll("_", " ") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [item.evidenceDigest.slice(0, 16), "…"] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["recorded by ", item.recordedBy] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
							className: item.independentlyValidated ? "ready" : "blocked",
							children: item.independentlyValidated ? "Validated" : "Pending"
						}),
						!item.independentlyValidated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
					] }, item.id)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No preflight evidence recorded" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "All five required checks remain unsatisfied until real evidence is recorded and independently validated." })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-validation-control",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "INDEPENDENT VALIDATION CONTROL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accept or reject another operator’s evidence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The validator must be different from the recorder. Acceptance satisfies only one required check and does not authorize device contact or release." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pending evidence from another operator" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: validationForm.evidenceId,
							onChange: (event) => setValidationForm((current) => ({
								...current,
								evidenceId: event.target.value
							})),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select pending evidence"
							}), evidence?.preflightEvidence.filter((item) => item.status === "pending" && item.recordedBy.toLowerCase() !== evidence.viewer.email.toLowerCase()).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: item.id,
								children: [
									item.checkKey.replaceAll("_", " "),
									" · ",
									item.recordedBy
								]
							}, item.id))]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Validation reason" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: validationForm.reason,
							onChange: (event) => setValidationForm((current) => ({
								...current,
								reason: event.target.value
							})),
							placeholder: "Explain why this evidence is accepted or rejected"
						})] })]
					}),
					validationError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), validationError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Validation changes evidence state only; release and network actions remain disabled."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !validationForm.evidenceId || validationForm.reason.trim().length < 12 || validatingPreflight,
						onClick: () => void validatePreflight("rejected"),
						children: "Reject evidence"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !validationForm.evidenceId || validationForm.reason.trim().length < 12 || validatingPreflight,
						onClick: () => void validatePreflight("accepted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), validatingPreflight ? "Validating…" : "Accept independently"]
					})] })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-release-control",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "FINAL READ-ONLY RELEASE DECISION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Approve or block the evidence-complete wave" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The decision owner must be separate from the window lead, evidence recorders and validators. Approval authorizes only the documented read-only onboarding handoff." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Decision-owner-eligible window" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: releaseForm.windowId,
							onChange: (event) => setReleaseForm((current) => ({
								...current,
								windowId: event.target.value
							})),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select an evidence-complete window"
							}), evidence?.waveSchedules.filter((window) => window.decisionOwnerEligible && !window.latestReleaseDecision?.decisionSupported).map((window) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: window.id,
								children: [
									evidenceTime(window.scheduledStart),
									" · ",
									window.manifest?.candidateCount ?? 0,
									" devices · five checks"
								]
							}, window.id))]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Decision reason" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: releaseForm.reason,
							onChange: (event) => setReleaseForm((current) => ({
								...current,
								reason: event.target.value
							})),
							placeholder: "State why the evidence-complete wave is approved or blocked"
						})] })]
					}),
					releaseError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), releaseError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Approval does not contact devices, execute credentials or enable activation."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !releaseForm.windowId || releaseForm.reason.trim().length < 12 || decidingRelease,
						onClick: () => void decideRelease("blocked"),
						children: "Block release"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !releaseForm.windowId || releaseForm.reason.trim().length < 12 || decidingRelease,
						onClick: () => void decideRelease("approved"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 14 }), decidingRelease ? "Recording…" : "Approve read-only release"]
					})] })] }),
					evidence?.waveSchedules.some((window) => window.latestReleaseDecision?.decisionSupported) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-release-register",
						children: evidence.waveSchedules.filter((window) => window.latestReleaseDecision?.decisionSupported).map((window) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: window.latestReleaseDecision?.decision }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								window.manifest?.candidateCount ?? 0,
								" devices · ",
								evidenceTime(window.latestReleaseDecision?.decidedAt)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: window.latestReleaseDecision?.decidedBy }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: window.latestReleaseDecision?.reason })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: window.latestReleaseDecision?.decision === "approved" ? "Read-only" : "Blocked" })
						] }, window.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-activation-request",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "ACTIVATION HANDOFF REQUEST"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Bind the approved release to execution evidence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The window lead records the exact approved scope, change reference, rollback owner, rollback evidence and expiry. This request does not authorize device contact or execution." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-activation-fields",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lead-owned approved release" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: activationForm.releaseDecisionId,
								onChange: (event) => setActivationForm((current) => ({
									...current,
									releaseDecisionId: event.target.value
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select an approved release"
								}), evidence?.waveSchedules.filter((window) => window.latestReleaseDecision?.decision === "approved" && window.latestReleaseDecision.decisionSupported && window.lead?.email.toLowerCase() === evidence.viewer.email.toLowerCase() && !evidence.activationRequests.some((request) => request.releaseDecisionId === window.latestReleaseDecision?.id && request.requestCurrent)).map((window) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: window.latestReleaseDecision.id,
									children: [
										window.manifest?.candidateCount ?? 0,
										" devices · ",
										evidenceTime(window.scheduledStart),
										" · ",
										window.manifest?.manifestDigest.slice(0, 10)
									]
								}, window.latestReleaseDecision.id))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Change reference" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: activationForm.changeReference,
								onChange: (event) => setActivationForm((current) => ({
									...current,
									changeReference: event.target.value
								})),
								placeholder: "Approved change or maintenance record"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rollback owner" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: activationForm.rollbackOwner,
								onChange: (event) => setActivationForm((current) => ({
									...current,
									rollbackOwner: event.target.value
								})),
								placeholder: "Named rollback owner"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rollback evidence reference" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: activationForm.rollbackEvidenceReference,
								onChange: (event) => setActivationForm((current) => ({
									...current,
									rollbackEvidenceReference: event.target.value
								})),
								placeholder: "Rollback plan, ticket or runbook reference"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Request expires" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "datetime-local",
								value: activationForm.expiresAt,
								onChange: (event) => setActivationForm((current) => ({
									...current,
									expiresAt: event.target.value
								}))
							})] })
						]
					}),
					activationError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), activationError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "This record grants no device contact, credential execution, activation or network-write authority."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !evidence?.viewer.canAdmin || !activationForm.releaseDecisionId || activationForm.changeReference.trim().length < 4 || activationForm.rollbackOwner.trim().length < 3 || activationForm.rollbackEvidenceReference.trim().length < 8 || !activationForm.expiresAt || requestingActivation,
						onClick: () => void requestActivationHandoff(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), requestingActivation ? "Requesting…" : "Request activation handoff"]
					})] }),
					evidence?.activationRequests.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-activation-register",
						children: evidence.activationRequests.map((request) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: request.changeReference }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								request.scopeCandidateIds.length,
								" devices · expires ",
								evidenceTime(request.expiresAt)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: request.requestedBy }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								"Rollback: ",
								request.rollbackOwner,
								" · ",
								request.rollbackEvidenceReference
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: request.requestCurrent ? "ready" : "blocked",
								children: request.requestCurrent ? "Current" : "Blocked"
							}),
							!request.requestCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: request.blockers.join(" · ").replaceAll("_", " ") })
						] }, request.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No activation handoff requests" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The window lead can bind a current approved release to exact execution evidence without granting authorization." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-activation-review",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "INDEPENDENT ACTIVATION READINESS REVIEW"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Clear or block another operator’s handoff" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The reviewer must be separate from the manifest, window, preflight, release and request participants. A cleared review validates evidence only and cannot issue an execution permit." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Independent-review-eligible request" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: activationReviewForm.activationRequestId,
							onChange: (event) => setActivationReviewForm((current) => ({
								...current,
								activationRequestId: event.target.value
							})),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select a current request"
							}), reviewEligibleActivationRequests.map((request) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: request.id,
								children: [
									request.changeReference,
									" · ",
									request.scopeCandidateIds.length,
									" devices · ",
									request.requestedBy
								]
							}, request.id))]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Review reason" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: activationReviewForm.reason,
							onChange: (event) => setActivationReviewForm((current) => ({
								...current,
								reason: event.target.value
							})),
							placeholder: "Explain why the digest-bound handoff evidence is cleared or blocked"
						})] })]
					}),
					activationReviewError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), activationReviewError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Reviewing evidence grants no device contact, credential execution, activation or network-write authority."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !activationReviewForm.activationRequestId || activationReviewForm.reason.trim().length < 12 || reviewingActivation,
						onClick: () => void reviewActivationHandoff("blocked"),
						children: "Block handoff"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !activationReviewForm.activationRequestId || activationReviewForm.reason.trim().length < 12 || reviewingActivation,
						onClick: () => void reviewActivationHandoff("cleared"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 14 }), reviewingActivation ? "Reviewing…" : "Clear handoff evidence"]
					})] })] }),
					evidence?.activationReviews.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-activation-review-register",
						children: evidence.activationReviews.map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: review.decision }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								evidenceTime(review.reviewedAt),
								" · ",
								review.requestDigest.slice(0, 16),
								"…"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: review.reviewedBy }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: review.reason })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: review.reviewCurrent ? "ready" : "blocked",
								children: review.reviewCurrent ? "Current" : "Historical"
							}),
							!review.reviewSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: review.blockers.join(" · ").replaceAll("_", " ") })
						] }, review.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No independent activation reviews" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A separate operator must review a current digest-bound request before the handoff can be cleared as evidence-ready." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-permit-request",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "EXECUTION PERMIT REQUEST"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Bind a cleared review to one executor and timebox" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only the original window lead can request this final authorization handoff. The request remains evidence only: it cannot contact devices, execute credentials or issue a runtime permit." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-permit-fields",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lead-owned cleared review" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: permitForm.activationReviewId,
								onChange: (event) => setPermitForm((current) => ({
									...current,
									activationReviewId: event.target.value
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select a cleared review"
								}), evidence?.activationReviews.filter((review) => {
									const activationRequest = evidence.activationRequests.find((item) => item.id === review.activationRequestId);
									return review.decision === "cleared" && review.reviewCurrent && activationRequest?.requestedBy.toLowerCase() === evidence.viewer.email.toLowerCase() && !evidence.permitRequests.some((permit) => permit.activationReviewId === review.id && permit.permitRequestCurrent);
								}).map((review) => {
									const activationRequest = evidence.activationRequests.find((item) => item.id === review.activationRequestId);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: review.id,
										children: [
											activationRequest?.changeReference ?? review.id,
											" · ",
											activationRequest?.scopeCandidateIds.length ?? 0,
											" devices · ",
											review.requestDigest.slice(0, 10)
										]
									}, review.id);
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Active executor" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: permitForm.executorOperatorId,
								onChange: (event) => setPermitForm((current) => ({
									...current,
									executorOperatorId: event.target.value
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select an active operator"
								}), evidence?.activeOperators.map((operator) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: operator.id,
									children: [
										operator.displayName,
										" · ",
										operator.email
									]
								}, operator.id))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Proposed start" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "datetime-local",
								value: permitForm.proposedStart,
								onChange: (event) => setPermitForm((current) => ({
									...current,
									proposedStart: event.target.value
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Proposed end" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "datetime-local",
								value: permitForm.proposedEnd,
								onChange: (event) => setPermitForm((current) => ({
									...current,
									proposedEnd: event.target.value
								}))
							})] })
						]
					}),
					permitError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), permitError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Submission records a proposed scope and timebox; execution permit issuance remains disabled."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !evidence?.viewer.canAdmin || !permitForm.activationReviewId || !permitForm.executorOperatorId || !permitForm.proposedStart || !permitForm.proposedEnd || requestingPermit,
						onClick: () => void requestExecutionPermit(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { size: 14 }), requestingPermit ? "Requesting…" : "Request execution permit"]
					})] }),
					evidence?.permitRequests.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-permit-register",
						children: evidence.permitRequests.map((permit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: permit.executor?.displayName ?? "Executor unresolved" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								permit.scopeCandidateIds.length,
								" devices · ",
								evidenceTime(permit.proposedStart),
								" to ",
								evidenceTime(permit.proposedEnd)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: permit.requestedBy }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								permit.reviewDigest.slice(0, 16),
								"… · permit issued ",
								String(permit.executionPermitIssued)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: permit.permitRequestCurrent ? "ready" : "blocked",
								children: permit.permitRequestCurrent ? "Current" : "Blocked"
							}),
							!permit.permitRequestCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: permit.blockers.join(" · ").replaceAll("_", " ") })
						] }, permit.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No execution permit requests" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A cleared review can be bound to one active executor and one exact future timebox without issuing a permit." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-permit-decision",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "INDEPENDENT PERMIT DECISION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Approve or block another operator’s exact timebox" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The decision owner must be separate from the executor and every manifest, window, preflight, release, activation and permit-request participant. Approval records eligibility for a later issuance step only." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Decision-owner-eligible request" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: permitDecisionForm.permitRequestId,
							onChange: (event) => setPermitDecisionForm((current) => ({
								...current,
								permitRequestId: event.target.value
							})),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select a current permit request"
							}), permitDecisionEligibleRequests.map((permit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: permit.id,
								children: [
									permit.executor?.displayName ?? "Executor unresolved",
									" · ",
									permit.scopeCandidateIds.length,
									" devices · ",
									evidenceTime(permit.proposedStart)
								]
							}, permit.id))]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Decision reason" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: permitDecisionForm.reason,
							onChange: (event) => setPermitDecisionForm((current) => ({
								...current,
								reason: event.target.value
							})),
							placeholder: "Explain why the exact permit request is approved for issuance or blocked"
						})] })]
					}),
					permitDecisionError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), permitDecisionError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Approval records administrative eligibility only; no runtime permit or device authority is issued."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !permitDecisionForm.permitRequestId || permitDecisionForm.reason.trim().length < 12 || decidingPermit,
						onClick: () => void decideExecutionPermit("blocked"),
						children: "Block permit request"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !permitDecisionForm.permitRequestId || permitDecisionForm.reason.trim().length < 12 || decidingPermit,
						onClick: () => void decideExecutionPermit("approved"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), decidingPermit ? "Recording…" : "Approve for issuance"]
					})] })] }),
					evidence?.permitDecisions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-permit-decision-register",
						children: evidence.permitDecisions.map((permitDecision) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: permitDecision.decision }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								evidenceTime(permitDecision.decidedAt),
								" · ",
								permitDecision.permitRequestDigest.slice(0, 16),
								"…"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: permitDecision.decidedBy }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: permitDecision.reason })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: permitDecision.decisionCurrent ? "ready" : "blocked",
								children: permitDecision.decisionCurrent ? "Current" : "Historical"
							}),
							!permitDecision.decisionSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: permitDecision.blockers.join(" · ").replaceAll("_", " ") })
						] }, permitDecision.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No independent permit decisions" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A fully separate operator must approve or block a current permit request before any future issuance stage." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "BOUNDED RUNTIME PERMIT ISSUANCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Issue one exact read-only permit" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The independent decision owner converts a current approval into a digest-bound WireGuard and SNMP GET-only permit. Issuance does not start a collector, contact a device or expose credential values." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Decision-owner-issued approval" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: runtimePermitDecisionId,
							onChange: (event) => setRuntimePermitDecisionId(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select an approved decision"
							}), evidence?.permitDecisions.filter((permitDecision) => permitDecision.decision === "approved" && permitDecision.decisionCurrent && permitDecision.decidedBy.toLowerCase() === evidence.viewer.email.toLowerCase() && !evidence.runtimePermits.some((runtimePermit) => runtimePermit.permitDecisionId === permitDecision.id)).map((permitDecision) => {
								const request = evidence.permitRequests.find((item) => item.id === permitDecision.permitRequestId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: permitDecision.id,
									children: [
										request?.executor?.displayName ?? "Executor unresolved",
										" · ",
										request?.scopeCandidateIds.length ?? 0,
										" devices · ",
										evidenceTime(request?.proposedStart)
									]
								}, permitDecision.id);
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-runtime-policy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Enforced capability policy" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "WireGuard transport only"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "SNMP GET only"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Identity, uptime, interface inventory and counters"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "SNMP SET and network writes prohibited"] })
							]
						})]
					}),
					runtimePermitError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), runtimePermitError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Issuance creates bounded authority only. An authenticated assigned collector must fetch it through the separate enforcement endpoint."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !runtimePermitDecisionId || issuingRuntimePermit,
						onClick: () => void issueRuntimePermit(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, { size: 14 }), issuingRuntimePermit ? "Issuing…" : "Issue bounded runtime permit"]
					})] }),
					evidence?.runtimePermits.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.runtimePermits.map((runtimePermit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: runtimePermit.runtimeState }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								runtimePermit.scopeCandidateIds.length,
								" devices · ",
								evidenceTime(runtimePermit.validFrom),
								" to ",
								evidenceTime(runtimePermit.validUntil)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: runtimePermit.issuedBy }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								runtimePermit.capabilityPolicy.transport,
								" · ",
								runtimePermit.capabilityPolicy.protocol,
								" · ",
								runtimePermit.capabilityPolicy.allowedOperations?.length ?? 0,
								" operations"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: runtimePermit.runtimePermitCurrent ? "ready" : "blocked",
								children: runtimePermit.runtimePermitCurrent ? "Bounded" : "Blocked"
							}),
							!runtimePermit.runtimePermitCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: runtimePermit.blockers.join(" · ").replaceAll("_", " ") })
						] }, runtimePermit.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No bounded runtime permits" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A current independent approval can issue one exact read-only authority record without starting collector execution." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "COLLECTOR PERMIT CONSUMPTION REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Prove which collector fetched which exact scope" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The authenticated collector endpoint returns only assigned candidates from a still-current permit. Every successful fetch is digest-bound and records that no device contact, credential execution or network write occurred." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {})] }),
					evidence?.permitConsumptions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.permitConsumptions.map((consumption) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: consumption.collectorId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								consumption.candidateIds.length,
								" assigned devices · ",
								evidenceTime(consumption.consumedAt)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: consumption.runtimePermitId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								consumption.runtimePermitDigest.slice(0, 16),
								"… · device contact ",
								String(consumption.deviceContactAttempted)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: consumption.receiptCurrent ? "ready" : "blocked",
								children: consumption.receiptCurrent ? "Current" : "Blocked"
							}),
							!consumption.receiptCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: consumption.blockers.join(" · ").replaceAll("_", " ") })
						] }, consumption.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No collector consumption receipts" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A receipt appears only after an authenticated, current collector fetches a permit assigned to one or more of its exact candidates." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Fetching a permit returns credential references only. It does not resolve secrets, run SNMP GET, start polling or contact any device."] }) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "READ-ONLY EXECUTION EVIDENCE REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Record outcomes without storing SNMP response values" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Authenticated collectors may report only one permitted operation, outcome metadata, timestamp, idempotency key and a SHA-256 response digest. Every row is revalidated against its current permit and exact candidate assignment." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, {})] }),
					evidence?.executionReceipts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.executionReceipts.map((receipt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: receipt.operation.replaceAll("_", " ") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								receipt.candidateId,
								" · ",
								evidenceTime(receipt.observedAt)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: receipt.outcome }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								receipt.collectorId,
								" · ",
								receipt.responseDigest.slice(0, 16),
								"…",
								receipt.errorCode ? ` · ${receipt.errorCode}` : ""
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: receipt.executionEvidenceCurrent ? "ready" : "blocked",
								children: receipt.executionEvidenceCurrent ? "Current" : "Blocked"
							}),
							!receipt.executionEvidenceCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: receipt.blockers.join(" · ").replaceAll("_", " ") })
						] }, receipt.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No read-only execution evidence" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The register stays empty until an authenticated collector reports a permitted SNMP GET outcome from a current consumed permit." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "This API records collector-reported evidence; the NOCX server does not initiate device contact and accepts no raw response fields."] }) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "FOUR-OPERATION COMPLETENESS REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Fail closed until the exact read-only profile is complete" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Assessment is derived at read from one current runtime permit and its current collector consumption. Evidence from expired, revoked, mismatched or different permits cannot be combined." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})] }),
					evidence?.candidateExecutionAssessments.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.candidateExecutionAssessments.map((assessment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: assessment.candidate?.hostname ?? assessment.candidateId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								assessment.candidate?.vendor ?? "Candidate unresolved",
								" · ",
								assessment.observedOperations.length,
								"/",
								assessment.expectedOperations.length,
								" operations"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: assessment.assessmentState.replaceAll("_", " ") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: assessment.missingOperations.length ? `Missing: ${assessment.missingOperations.join(", ").replaceAll("_", " ")}` : `${assessment.evidenceDigest?.slice(0, 16) ?? "Digest unavailable"}…` })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: assessment.readOnlyVerified ? "ready" : "blocked",
								children: assessment.readOnlyVerified ? "Verified" : "Blocked"
							}),
							assessment.failedOperations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Non-successful: ", assessment.failedOperations.join(" · ").replaceAll("_", " ")] })
						] }, assessment.candidateId))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No candidates under active runtime assessment" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A candidate appears only when persistent runtime-permit evidence exists. No onboarding completion is inferred from an empty register." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Read-only verification is evidence completeness only. It does not create a device, activate monitoring, enable probes or authorize network writes."] }) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "INDEPENDENT READ-ONLY VERIFICATION DECISION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accept or block another participant’s evidence package" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The decision owner must be separate from the permit requester, executor, approver and issuer. The API re-derives all four latest successful receipts and their digest before appending a decision." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Independent-decision-eligible package" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: verificationForm.candidateId,
							onChange: (event) => setVerificationForm((current) => ({
								...current,
								candidateId: event.target.value
							})),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select a verified package"
							}), evidence?.candidateExecutionAssessments.filter((assessment) => assessment.readOnlyVerified && assessment.verificationDecisionEligible && assessment.evidenceDigest).map((assessment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: assessment.candidateId,
								children: [
									assessment.candidate?.hostname ?? assessment.candidateId,
									" · ",
									assessment.evidenceDigest?.slice(0, 12),
									" · ",
									assessment.latestVerificationDecision?.decision ?? "undecided"
								]
							}, assessment.candidateId))]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Decision reason" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: verificationForm.reason,
							onChange: (event) => setVerificationForm((current) => ({
								...current,
								reason: event.target.value
							})),
							placeholder: "Explain why the exact four-operation evidence package is accepted or blocked"
						})] })]
					}),
					verificationError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), verificationError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Approval validates evidence only; device creation, monitoring activation, probes, SNMP SET and network writes remain disabled."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !verificationForm.candidateId || verificationForm.reason.trim().length < 12 || decidingVerification,
						onClick: () => void decideReadOnlyVerification("blocked"),
						children: "Block evidence"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !verificationForm.candidateId || verificationForm.reason.trim().length < 12 || decidingVerification,
						onClick: () => void decideReadOnlyVerification("approved"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), decidingVerification ? "Recording…" : "Approve read-only evidence"]
					})] })] }),
					evidence?.verificationDecisions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.verificationDecisions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.decision }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								item.candidateId,
								" · ",
								evidenceTime(item.decidedAt)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.decidedBy }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								item.evidenceDigest.slice(0, 16),
								"… · ",
								item.reason
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: item.decisionCurrent ? "ready" : "blocked",
								children: item.decisionCurrent ? "Current" : "Historical"
							}),
							!item.decisionSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
						] }, item.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No independent verification decisions" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A decision can exist only after one exact candidate has four current successful read-only operation receipts." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "CONTROLLED INVENTORY ENROLLMENT REQUEST"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Lock the approved candidate metadata before creation" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only the independent verification owner may request enrollment. The record binds hostname, vendor, model, serial, site, exact address, collector, SNMP mode, credential reference, owner and evidence digest." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Owner-approved verification" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: enrollmentDecisionId,
							onChange: (event) => setEnrollmentDecisionId(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select an approved verification"
							}), evidence?.verificationDecisions.filter((item) => item.decision === "approved" && item.decisionCurrent && item.decidedBy.toLowerCase() === evidence.viewer.email.toLowerCase() && !evidence.enrollmentRequests.some((request) => request.verificationDecisionId === item.id)).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: item.id,
								children: [
									item.candidateId,
									" · ",
									item.evidenceDigest.slice(0, 12),
									" · ",
									evidenceTime(item.decidedAt)
								]
							}, item.id))]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-runtime-policy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Enrollment request boundary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Exact candidate metadata snapshot"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Approved evidence digest locked"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "SNMP read-only profile proposed"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Device creation and monitoring activation prohibited"] })
							]
						})]
					}),
					enrollmentError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), enrollmentError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "This request creates no inventory device, telemetry target, probe, credential execution, SNMP SET, or network write."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !enrollmentDecisionId || requestingEnrollment,
						onClick: () => void requestInventoryEnrollment(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { size: 14 }), requestingEnrollment ? "Requesting…" : "Request inventory enrollment"]
					})] }),
					evidence?.enrollmentRequests.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.enrollmentRequests.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.candidateSnapshot.hostname ?? item.candidateId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								item.candidateSnapshot.vendor,
								" ",
								item.candidateSnapshot.model,
								" · ",
								item.candidateSnapshot.site
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.monitoringProfileKey }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								item.candidateSnapshot.managementAddress,
								" · ",
								item.evidenceDigest.slice(0, 16),
								"…"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: item.enrollmentRequestCurrent ? "ready" : "blocked",
								children: item.enrollmentRequestCurrent ? "Requested" : "Blocked"
							}),
							!item.enrollmentRequestCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
						] }, item.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No inventory enrollment requests" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A request appears only after a current independent verification approval is revalidated by its decision owner." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "INDEPENDENT INVENTORY ENROLLMENT REVIEW"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Clear or block a metadata-locked request" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A separate reviewer revalidates the exact candidate snapshot, approved evidence digest, read-only profile and request digest. Self-review is rejected and clearance grants no device-creation or monitoring authority." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Independent-review-eligible request" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: enrollmentReviewForm.enrollmentRequestId,
							onChange: (event) => setEnrollmentReviewForm((current) => ({
								...current,
								enrollmentRequestId: event.target.value
							})),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select a current request"
							}), evidence?.enrollmentRequests.filter((request) => request.enrollmentRequestCurrent && request.enrollmentReviewEligible).map((request) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: request.id,
								children: [
									request.candidateSnapshot.hostname ?? request.candidateId,
									" · ",
									request.evidenceDigest.slice(0, 12),
									" · ",
									request.requestedBy
								]
							}, request.id))]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Review reason" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: enrollmentReviewForm.reason,
							onChange: (event) => setEnrollmentReviewForm((current) => ({
								...current,
								reason: event.target.value
							})),
							placeholder: "Explain why the exact metadata-locked enrollment request is cleared or blocked"
						})] })]
					}),
					enrollmentReviewError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), enrollmentReviewError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Review is evidence-only; it cannot create an inventory device, activate monitoring, enable probes, execute credentials, permit SNMP SET or authorize network writes."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !enrollmentReviewForm.enrollmentRequestId || enrollmentReviewForm.reason.trim().length < 12 || reviewingEnrollment,
						onClick: () => void reviewInventoryEnrollment("blocked"),
						children: "Block enrollment"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !enrollmentReviewForm.enrollmentRequestId || enrollmentReviewForm.reason.trim().length < 12 || reviewingEnrollment,
						onClick: () => void reviewInventoryEnrollment("cleared"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), reviewingEnrollment ? "Recording…" : "Clear enrollment evidence"]
					})] })] }),
					evidence?.enrollmentReviews.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.enrollmentReviews.map((review) => {
							const request = evidence.enrollmentRequests.find((item) => item.id === review.enrollmentRequestId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: review.decision }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									request?.candidateSnapshot.hostname ?? request?.candidateId ?? review.enrollmentRequestId,
									" · ",
									evidenceTime(review.reviewedAt)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: review.reviewedBy }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									review.requestDigest.slice(0, 16),
									"… · ",
									review.reason
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: review.reviewCurrent && review.decision === "cleared" ? "ready" : "blocked",
									children: review.reviewCurrent ? review.decision : "Historical"
								}),
								!review.reviewSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: review.blockers.join(" · ").replaceAll("_", " ") })
							] }, review.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No independent enrollment reviews" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A review can exist only when a different operator revalidates a current metadata-locked enrollment request." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "DEVICE-CREATION AUTHORIZATION REQUEST"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Lock the cleared chain for a separate final decision" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only the independent enrollment-review owner may submit one request. The API recomputes both immutable digests and revalidates the candidate, verification, runtime and read-only safety chain." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Owner-cleared enrollment review" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: creationReviewId,
							onChange: (event) => setCreationReviewId(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select a current cleared review"
							}), evidence?.enrollmentReviews.filter((review) => review.reviewCurrent && review.decision === "cleared" && review.reviewedBy.toLowerCase() === evidence.viewer.email.toLowerCase() && !evidence.creationRequests.some((request) => request.enrollmentReviewId === review.id)).map((review) => {
								const request = evidence.enrollmentRequests.find((item) => item.id === review.enrollmentRequestId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: review.id,
									children: [
										request?.candidateSnapshot.hostname ?? request?.candidateId ?? review.enrollmentRequestId,
										" · ",
										review.requestDigest.slice(0, 12),
										" · ",
										evidenceTime(review.reviewedAt)
									]
								}, review.id);
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-runtime-policy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Creation-request boundary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Enrollment request digest locked"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Independent review digest locked"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Exact candidate chain revalidated"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Device creation and monitoring activation remain prohibited"] })
							]
						})]
					}),
					creationAuthorizationError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), creationAuthorizationError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "This is a request for a later independent decision; it creates no device and grants no monitoring, probe, credential, SNMP SET or network-write authority."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !creationReviewId || requestingCreationAuthorization,
						onClick: () => void requestDeviceCreationAuthorization(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { size: 14 }), requestingCreationAuthorization ? "Requesting…" : "Request creation authorization"]
					})] }),
					evidence?.creationRequests.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.creationRequests.map((request) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: evidence.enrollmentRequests.find((item) => item.id === request.enrollmentRequestId)?.candidateSnapshot.hostname ?? request.candidateId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									request.status,
									" · ",
									evidenceTime(request.requestedAt)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: request.requestedBy }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [request.enrollmentReviewDigest.slice(0, 16), "… · review digest"] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: request.creationRequestCurrent ? "ready" : "blocked",
									children: request.creationRequestCurrent ? "Requested" : "Blocked"
								}),
								!request.creationRequestCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: request.blockers.join(" · ").replaceAll("_", " ") })
							] }, request.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No device-creation authorization requests" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A request appears only when the owner of a current independent clearance asks for a separate final authorization decision." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "INDEPENDENT DEVICE-CREATION AUTHORIZATION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Approve or block the exact creation request" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A different operator recomputes the entire request digest and revalidates every upstream gate. Approval authorizes a later inventory-record transaction only; monitoring remains outside this authority." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Independent-decision-eligible request" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: creationDecisionForm.creationRequestId,
							onChange: (event) => setCreationDecisionForm((current) => ({
								...current,
								creationRequestId: event.target.value
							})),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select a current creation request"
							}), evidence?.creationRequests.filter((request) => request.creationRequestCurrent && request.creationDecisionEligible).map((request) => {
								const enrollment = evidence.enrollmentRequests.find((item) => item.id === request.enrollmentRequestId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: request.id,
									children: [
										enrollment?.candidateSnapshot.hostname ?? request.candidateId,
										" · ",
										request.enrollmentReviewDigest.slice(0, 12),
										" · ",
										request.requestedBy
									]
								}, request.id);
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Decision reason" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: creationDecisionForm.reason,
							onChange: (event) => setCreationDecisionForm((current) => ({
								...current,
								reason: event.target.value
							})),
							placeholder: "Explain why this exact device-creation request is approved or blocked"
						})] })]
					}),
					creationDecisionError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), creationDecisionError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Approval authorizes device creation only. This action creates no device and cannot activate monitoring, probes, credentials, SNMP SET or network writes."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !creationDecisionForm.creationRequestId || creationDecisionForm.reason.trim().length < 12 || decidingCreationAuthorization,
						onClick: () => void decideDeviceCreationAuthorization("blocked"),
						children: "Block creation request"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !creationDecisionForm.creationRequestId || creationDecisionForm.reason.trim().length < 12 || decidingCreationAuthorization,
						onClick: () => void decideDeviceCreationAuthorization("approved"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), decidingCreationAuthorization ? "Recording…" : "Authorize device creation"]
					})] })] }),
					evidence?.creationDecisions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.creationDecisions.map((item) => {
							const request = evidence.creationRequests.find((candidate) => candidate.id === item.creationRequestId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.decision }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									request?.candidateId ?? item.creationRequestId,
									" · ",
									evidenceTime(item.decidedAt)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.decidedBy }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									item.creationRequestDigest.slice(0, 16),
									"… · ",
									item.reason
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: item.decisionCurrent && item.decision === "approved" ? "ready" : "blocked",
									children: item.decisionCurrent ? item.decision : "Historical"
								}),
								!item.decisionSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
							] }, item.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No independent creation decisions" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A decision appears only when a different operator revalidates a current exact creation-authorization request." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "RECOVERABLE INVENTORY CREATION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Create the exact approved device record once" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The independent decision owner executes an idempotent, conflict-checked write from the locked candidate snapshot. The resulting record is deliberately unknown and carries no monitoring evidence." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Owner-approved creation decision" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: creationExecutionDecisionId,
							onChange: (event) => setCreationExecutionDecisionId(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select a current approval"
							}), evidence?.creationDecisions.filter((item) => item.decision === "approved" && item.decisionCurrent && item.deviceCreationAuthorized && item.decidedBy.toLowerCase() === evidence.viewer.email.toLowerCase() && !evidence.creationExecutions.some((execution) => execution.creationDecisionId === item.id && execution.executionSupported)).map((item) => {
								const request = evidence.creationRequests.find((candidate) => candidate.id === item.creationRequestId);
								const enrollment = request ? evidence.enrollmentRequests.find((candidate) => candidate.id === request.enrollmentRequestId) : null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: item.id,
									children: [
										enrollment?.candidateSnapshot.hostname ?? request?.candidateId ?? item.creationRequestId,
										" · ",
										item.creationRequestDigest.slice(0, 12),
										" · ",
										evidenceTime(item.decidedAt)
									]
								}, item.id);
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-runtime-policy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Creation boundary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Hostname and management address conflict-checked"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Exact approved snapshot only"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Idempotent execution receipt"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Unknown status; no last-seen or monitoring claim"] })
							]
						})]
					}),
					creationExecutionError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), creationExecutionError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "The new inventory record remains unmonitored. No probe, credential, device contact, SNMP SET, telemetry target or network write is enabled."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !creationExecutionDecisionId || executingInventoryCreation,
						onClick: () => void createInventoryDevice(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { size: 14 }), executingInventoryCreation ? "Creating…" : "Create inventory device"]
					})] }),
					evidence?.creationExecutions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.creationExecutions.map((execution) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: execution.inventoryDevice?.hostname ?? execution.deviceId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								execution.inventoryDevice?.vendor ?? "Device unresolved",
								" ",
								execution.inventoryDevice?.model ?? "",
								" · ",
								execution.inventoryDevice?.site ?? "Site unresolved"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: execution.inventoryDevice?.status ?? execution.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								execution.deviceId,
								" · ",
								evidenceTime(execution.executedAt)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: execution.executionSupported ? "ready" : "blocked",
								children: execution.executionSupported ? "Enrolled" : "Blocked"
							}),
							!execution.executionSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: execution.blockers.join(" · ").replaceAll("_", " ") })
						] }, execution.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No controlled inventory creations" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A device appears only after an independent approved decision is executed by its owner from the exact locked snapshot." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "CONTROLLED MONITORING-ACTIVATION REQUEST"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Lock current operational references before activation" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The creation executor may submit one request for an enrolled unknown device. The request binds the creation receipt, read-only profile, current collector and active credential reference without contacting the device." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Owner-created eligible inventory device" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: monitoringActivationExecutionId,
							onChange: (event) => setMonitoringActivationExecutionId(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select a safely enrolled device"
							}), evidence?.creationExecutions.filter((execution) => execution.executionSupported && execution.executedBy.toLowerCase() === evidence.viewer.email.toLowerCase() && !evidence.monitoringActivationRequests.some((request) => request.creationExecutionId === execution.id)).map((execution) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: execution.id,
								children: [
									execution.inventoryDevice?.hostname ?? execution.deviceId,
									" · ",
									execution.inventoryDevice?.status ?? "unknown",
									" · ",
									execution.creationDecisionDigest.slice(0, 12)
								]
							}, execution.id))]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-runtime-policy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Monitoring-request boundary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Completed creation receipt locked"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Current versioned collector required"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Active credential reference only"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "No monitoring, contact or probe activation"] })
							]
						})]
					}),
					monitoringActivationError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), monitoringActivationError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "This request enables nothing. Device contact, credential execution, polling, probes, SNMP SET, telemetry writes and network writes remain disabled."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !monitoringActivationExecutionId || requestingMonitoringActivation,
						onClick: () => void requestMonitoringActivation(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, { size: 14 }), requestingMonitoringActivation ? "Requesting…" : "Request monitoring activation"]
					})] }),
					evidence?.monitoringActivationRequests.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringActivationRequests.map((request) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: evidence.creationExecutions.find((item) => item.id === request.creationExecutionId)?.inventoryDevice?.hostname ?? request.deviceId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									request.monitoringProfileKey,
									" · ",
									evidenceTime(request.requestedAt)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: request.collectorId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									request.credentialReferenceId,
									" · ",
									request.creationExecutionDigest.slice(0, 16),
									"…"
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: request.monitoringActivationRequestCurrent ? "ready" : "blocked",
									children: request.monitoringActivationRequestCurrent ? "Requested" : "Blocked"
								}),
								!request.monitoringActivationRequestCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: request.blockers.join(" · ").replaceAll("_", " ") })
							] }, request.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No monitoring-activation requests" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A request appears only after a safely created unknown device still has current collector and credential-reference evidence." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "INDEPENDENT MONITORING-ACTIVATION REVIEW"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Clear or block the exact monitoring request" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A different operator recomputes the immutable request digest and revalidates the completed creation receipt, unknown device, read-only profile, current collector and active credential reference." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Independent-review-eligible request" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: monitoringActivationReviewForm.monitoringActivationRequestId,
								onChange: (event) => setMonitoringActivationReviewForm((current) => ({
									...current,
									monitoringActivationRequestId: event.target.value
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select another operator’s current request"
								}), evidence?.monitoringActivationRequests.filter((request) => request.monitoringActivationReviewEligible).map((request) => {
									const execution = evidence.creationExecutions.find((item) => item.id === request.creationExecutionId);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: request.id,
										children: [
											execution?.inventoryDevice?.hostname ?? request.deviceId,
											" · ",
											request.creationExecutionDigest.slice(0, 12),
											" · ",
											request.requestedBy
										]
									}, request.id);
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Independent review reason" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: monitoringActivationReviewForm.reason,
								onChange: (event) => setMonitoringActivationReviewForm((current) => ({
									...current,
									reason: event.target.value
								})),
								placeholder: "Explain why this exact monitoring request is cleared or blocked"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "intake-runtime-policy",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Review boundary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Exact request digest recomputed"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Reviewer must differ from requester"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Current collector and credential reference revalidated"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Clearance activates no monitoring or contact"] })
								]
							})
						]
					}),
					monitoringActivationReviewError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), monitoringActivationReviewError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "This evidence review grants no monitoring, polling, device contact, credential execution, probes, SNMP SET, telemetry writes or network-write authority."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !monitoringActivationReviewForm.monitoringActivationRequestId || monitoringActivationReviewForm.reason.trim().length < 12 || reviewingMonitoringActivation,
						onClick: () => void reviewMonitoringActivation("blocked"),
						children: "Block monitoring request"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !monitoringActivationReviewForm.monitoringActivationRequestId || monitoringActivationReviewForm.reason.trim().length < 12 || reviewingMonitoringActivation,
						onClick: () => void reviewMonitoringActivation("cleared"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), reviewingMonitoringActivation ? "Recording…" : "Clear monitoring request"]
					})] })] }),
					evidence?.monitoringActivationReviews.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringActivationReviews.map((review) => {
							const request = evidence.monitoringActivationRequests.find((item) => item.id === review.monitoringActivationRequestId);
							const execution = request ? evidence.creationExecutions.find((item) => item.id === request.creationExecutionId) : null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: review.decision }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									execution?.inventoryDevice?.hostname ?? request?.deviceId ?? review.monitoringActivationRequestId,
									" · ",
									evidenceTime(review.reviewedAt)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: review.reviewedBy }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									review.requestDigest.slice(0, 16),
									"… · ",
									review.reason
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: review.reviewCurrent && review.decision === "cleared" ? "ready" : "blocked",
									children: review.reviewCurrent ? review.decision : "Historical"
								}),
								!review.reviewSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: review.blockers.join(" · ").replaceAll("_", " ") })
							] }, review.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No independent monitoring reviews" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A review appears only after a different operator revalidates a current exact monitoring-activation request." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "FINAL MONITORING AUTHORIZATION REQUEST"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Lock the cleared request for a separate final decision" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The independent clearance owner may submit one evidence-only request that binds the exact monitoring request, review digests, device scope and creation receipt for a later decision by another operator." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Owner-cleared monitoring review" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: monitoringAuthorizationReviewId,
							onChange: (event) => setMonitoringAuthorizationReviewId(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select your current independent clearance"
							}), evidence?.monitoringActivationReviews.filter((review) => review.reviewCurrent && review.decision === "cleared" && review.reviewedBy.toLowerCase() === evidence.viewer.email.toLowerCase() && !evidence.monitoringAuthorizationRequests.some((request) => request.monitoringActivationReviewId === review.id)).map((review) => {
								const request = evidence.monitoringActivationRequests.find((item) => item.id === review.monitoringActivationRequestId);
								const execution = request ? evidence.creationExecutions.find((item) => item.id === request.creationExecutionId) : null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: review.id,
									children: [
										execution?.inventoryDevice?.hostname ?? request?.deviceId ?? review.monitoringActivationRequestId,
										" · ",
										review.requestDigest.slice(0, 12),
										" · ",
										evidenceTime(review.reviewedAt)
									]
								}, review.id);
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-runtime-policy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Authorization-request boundary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Cleared review must remain latest"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Request and review digests locked"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Exact device scope revalidated"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "No activation or device contact authority"] })
							]
						})]
					}),
					monitoringAuthorizationError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), monitoringAuthorizationError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "This is evidence for a later independent decision. It cannot start polling, contact the device, execute credentials, enable probes, perform SNMP SET or write to the network."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !monitoringAuthorizationReviewId || requestingMonitoringAuthorization,
						onClick: () => void requestMonitoringAuthorization(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { size: 14 }), requestingMonitoringAuthorization ? "Requesting…" : "Request final monitoring authorization"]
					})] }),
					evidence?.monitoringAuthorizationRequests.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringAuthorizationRequests.map((request) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: evidence.creationExecutions.find((item) => item.id === request.creationExecutionId)?.inventoryDevice?.hostname ?? request.deviceId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									request.status,
									" · ",
									evidenceTime(request.requestedAt)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: request.requestedBy }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [request.monitoringActivationReviewDigest.slice(0, 16), "… · review digest"] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: request.monitoringAuthorizationRequestCurrent ? "ready" : "blocked",
									children: request.monitoringAuthorizationRequestCurrent ? "Requested" : "Blocked"
								}),
								!request.monitoringAuthorizationRequestCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: request.blockers.join(" · ").replaceAll("_", " ") })
							] }, request.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No final monitoring authorization requests" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A request appears only when the independent clearance owner locks a current exact evidence chain for a later separate decision." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "INDEPENDENT FINAL MONITORING DECISION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Authorize or block a later controlled activation" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A different operator recomputes the final request digest and every upstream evidence link. Approval authorizes only a later activation transaction; this decision performs no runtime action." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Independent-decision-eligible authorization request" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: monitoringAuthorizationDecisionForm.monitoringAuthorizationRequestId,
								onChange: (event) => setMonitoringAuthorizationDecisionForm((current) => ({
									...current,
									monitoringAuthorizationRequestId: event.target.value
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select another operator’s current request"
								}), evidence?.monitoringAuthorizationRequests.filter((request) => request.monitoringAuthorizationDecisionEligible).map((request) => {
									const execution = evidence.creationExecutions.find((item) => item.id === request.creationExecutionId);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: request.id,
										children: [
											execution?.inventoryDevice?.hostname ?? request.deviceId,
											" · ",
											request.monitoringActivationReviewDigest.slice(0, 12),
											" · ",
											request.requestedBy
										]
									}, request.id);
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Decision reason" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: monitoringAuthorizationDecisionForm.reason,
								onChange: (event) => setMonitoringAuthorizationDecisionForm((current) => ({
									...current,
									reason: event.target.value
								})),
								placeholder: "Explain why this exact final monitoring authorization is approved or blocked"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "intake-runtime-policy",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Final-decision boundary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Decision owner must differ from requester"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Entire digest chain revalidated"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Approval is evidence for a later transaction"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "No polling, contact, probe or network write"] })
								]
							})
						]
					}),
					monitoringAuthorizationDecisionError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), monitoringAuthorizationDecisionError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Approval records monitoring authority only. It does not contact the device, execute credentials, start polling, enable probes, perform SNMP SET, write telemetry, or change the network."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !monitoringAuthorizationDecisionForm.monitoringAuthorizationRequestId || monitoringAuthorizationDecisionForm.reason.trim().length < 12 || decidingMonitoringAuthorization,
						onClick: () => void decideMonitoringAuthorization("blocked"),
						children: "Block final authorization"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !monitoringAuthorizationDecisionForm.monitoringAuthorizationRequestId || monitoringAuthorizationDecisionForm.reason.trim().length < 12 || decidingMonitoringAuthorization,
						onClick: () => void decideMonitoringAuthorization("approved"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), decidingMonitoringAuthorization ? "Recording…" : "Authorize later activation"]
					})] })] }),
					evidence?.monitoringAuthorizationDecisions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringAuthorizationDecisions.map((item) => {
							const request = evidence.monitoringAuthorizationRequests.find((candidate) => candidate.id === item.monitoringAuthorizationRequestId);
							const execution = request ? evidence.creationExecutions.find((candidate) => candidate.id === request.creationExecutionId) : null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.decision }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									execution?.inventoryDevice?.hostname ?? request?.deviceId ?? item.monitoringAuthorizationRequestId,
									" · ",
									evidenceTime(item.decidedAt)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.decidedBy }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									item.authorizationRequestDigest.slice(0, 16),
									"… · ",
									item.reason
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: item.decisionCurrent && item.decision === "approved" ? "ready" : "blocked",
									children: item.decisionCurrent ? item.decision : "Historical"
								}),
								!item.decisionSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
							] }, item.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No independent final monitoring decisions" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A decision appears only when a different operator revalidates the exact authorization request and its complete evidence chain." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "RECOVERABLE MONITORING TARGET REGISTRATION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Register the exact approved target once" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The final decision owner records an idempotent internal target binding for the approved device, collector, credential reference and read-only profile. Registration is configuration evidence, not a poll." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Owner-approved monitoring decision" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: monitoringRegistrationDecisionId,
							onChange: (event) => setMonitoringRegistrationDecisionId(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select a current approval"
							}), evidence?.monitoringAuthorizationDecisions.filter((item) => item.decision === "approved" && item.decisionCurrent && item.monitoringActivationAuthorized && item.decidedBy.toLowerCase() === evidence.viewer.email.toLowerCase() && !evidence.monitoringRegistrations.some((registration) => registration.monitoringAuthorizationDecisionId === item.id && registration.registrationSupported)).map((item) => {
								const request = evidence.monitoringAuthorizationRequests.find((candidate) => candidate.id === item.monitoringAuthorizationRequestId);
								const execution = request ? evidence.creationExecutions.find((candidate) => candidate.id === request.creationExecutionId) : null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: item.id,
									children: [
										execution?.inventoryDevice?.hostname ?? request?.deviceId ?? item.monitoringAuthorizationRequestId,
										" · ",
										item.authorizationRequestDigest.slice(0, 12),
										" · ",
										evidenceTime(item.decidedAt)
									]
								}, item.id);
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-runtime-policy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Registration boundary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Exact decision digest locked"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Device, collector and credential reference bound"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Idempotent recoverable record"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Polling and device contact remain disabled"] })
							]
						})]
					}),
					monitoringRegistrationError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), monitoringRegistrationError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Registration creates no telemetry claim. It does not contact the device, execute credentials, poll, probe, perform SNMP SET or write to the network."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !monitoringRegistrationDecisionId || registeringMonitoringTarget,
						onClick: () => void registerMonitoringTarget(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { size: 14 }), registeringMonitoringTarget ? "Registering…" : "Register monitoring target"]
					})] }),
					evidence?.monitoringRegistrations.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringRegistrations.map((registration) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: registration.deviceId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								registration.monitoringProfileKey,
								" · ",
								evidenceTime(registration.registeredAt)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: registration.collectorId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								registration.credentialReferenceId,
								" · ",
								registration.authorizationDecisionDigest.slice(0, 16),
								"…"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: registration.registrationSupported ? "ready" : "blocked",
								children: registration.registrationSupported ? "Registered" : "Blocked"
							}),
							!registration.registrationSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: registration.blockers.join(" · ").replaceAll("_", " ") })
						] }, registration.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No monitoring target registrations" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A target appears only after the final decision owner registers a current approved chain without starting any runtime activity." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "AUTHENTICATED COLLECTOR CLAIM REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Prove which current collector claimed which exact target" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The collector API exposes only registrations assigned to the authenticated, versioned, current collector. A claim is locked to the registration digest and remains a zero-runtime evidence receipt." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-runtime-policy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Collector-claim boundary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Bearer authentication required"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Exact collector assignment enforced"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Registration SHA-256 digest required"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "No secrets, polling or device contact authority"] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Claims are written only through the collector boundary. They cannot start polling, contact a device, execute credentials, enable probes, perform SNMP SET or write to the network."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "intake-evidence-badge",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "Fail closed"]
					})] }),
					evidence?.monitoringCollectorClaims.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringCollectorClaims.map((claim) => {
							const registration = evidence.monitoringRegistrations.find((item) => item.id === claim.monitoringRegistrationId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: claim.deviceId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									registration?.monitoringProfileKey ?? "Profile unresolved",
									" · ",
									evidenceTime(claim.claimedAt)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: claim.collectorId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									claim.registrationDigest.slice(0, 16),
									"… · authenticated ",
									String(claim.collectorAuthenticated)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: claim.claimSupported ? "ready" : "blocked",
									children: claim.claimSupported ? "Claimed" : "Blocked"
								}),
								!claim.claimSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: claim.blockers.join(" · ").replaceAll("_", " ") })
							] }, claim.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No authenticated collector claims" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A claim appears only after the exact assigned collector authenticates, recomputes the registration digest and records a zero-runtime receipt." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "BOUNDED FIRST-POLL PERMIT REQUEST"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Request a 15-minute four-operation read-only window" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The registration owner may bind a supported collector claim to the exact system identity, uptime, interface inventory and interface counter operations. A later independent decision is still required." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerReset, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Owner-registered authenticated claim" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: monitoringPollClaimId,
							onChange: (event) => setMonitoringPollClaimId(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select a current collector claim"
							}), evidence?.monitoringCollectorClaims.filter((claim) => claim.claimSupported && evidence.monitoringRegistrations.find((registration) => registration.id === claim.monitoringRegistrationId)?.registeredBy.toLowerCase() === evidence.viewer.email.toLowerCase() && !evidence.monitoringPollRequests.some((request) => request.monitoringCollectorClaimId === claim.id)).map((claim) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: claim.id,
								children: [
									claim.deviceId,
									" · ",
									claim.collectorId,
									" · ",
									claim.registrationDigest.slice(0, 12)
								]
							}, claim.id))]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-runtime-policy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "First-poll request boundary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Authenticated claim digest locked"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Exactly four SNMP GET operations"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "15-minute proposed window"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Request executes no poll or credential"] })
							]
						})]
					}),
					monitoringPollError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), monitoringPollError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "This request grants no runtime authority. Polling, device contact, credential execution, probes, SNMP SET and network writes remain disabled."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !monitoringPollClaimId || requestingMonitoringPoll,
						onClick: () => void requestMonitoringPoll(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerReset, { size: 14 }), requestingMonitoringPoll ? "Requesting…" : "Request first-poll permit"]
					})] }),
					evidence?.monitoringPollRequests.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringPollRequests.map((request) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: request.deviceId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								request.allowedOperations.length,
								" read-only operations · ",
								evidenceTime(request.requestedAt)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: request.collectorId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								evidenceTime(request.proposedStart),
								" → ",
								evidenceTime(request.proposedEnd)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: request.monitoringPollRequestCurrent ? "ready" : "blocked",
								children: request.monitoringPollRequestCurrent ? "Requested" : "Blocked"
							}),
							!request.monitoringPollRequestCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: request.blockers.join(" · ").replaceAll("_", " ") })
						] }, request.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerReset, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No first-poll permit requests" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A request appears only after the registration owner selects a supported exact collector claim." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "INDEPENDENT FIRST-POLL DECISION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Approve or block the exact 15-minute request" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A different operator recomputes the SHA-256 digest, revalidates the collector claim and confirms the four-operation SNMP GET boundary before recording a decision." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Independent-decision-eligible first-poll request" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: monitoringPollDecisionForm.monitoringPollRequestId,
								onChange: (event) => setMonitoringPollDecisionForm((current) => ({
									...current,
									monitoringPollRequestId: event.target.value
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select another operator’s current request"
								}), evidence?.monitoringPollRequests.filter((request) => request.monitoringPollDecisionEligible).map((request) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: request.id,
									children: [
										request.deviceId,
										" · ",
										request.collectorId,
										" · ",
										request.collectorClaimDigest.slice(0, 12),
										" · ",
										request.requestedBy
									]
								}, request.id))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Decision reason" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: monitoringPollDecisionForm.reason,
								onChange: (event) => setMonitoringPollDecisionForm((current) => ({
									...current,
									reason: event.target.value
								})),
								placeholder: "Explain why this exact bounded first poll is approved or blocked"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "intake-runtime-policy",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Decision boundary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Decision owner differs from requester"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Exact request digest recomputed"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Approval is evidence for a later step"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "No poll, credential or device contact execution"] })
								]
							})
						]
					}),
					monitoringPollDecisionError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), monitoringPollDecisionError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Approval does not start polling or contact the device. SNMP SET, probes and network writes remain prohibited."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !monitoringPollDecisionForm.monitoringPollRequestId || monitoringPollDecisionForm.reason.trim().length < 12 || decidingMonitoringPoll,
						onClick: () => void decideMonitoringPoll("blocked"),
						children: "Block first poll"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !monitoringPollDecisionForm.monitoringPollRequestId || monitoringPollDecisionForm.reason.trim().length < 12 || decidingMonitoringPoll,
						onClick: () => void decideMonitoringPoll("approved"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), decidingMonitoringPoll ? "Recording…" : "Approve later first poll"]
					})] })] }),
					evidence?.monitoringPollDecisions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringPollDecisions.map((item) => {
							const request = evidence.monitoringPollRequests.find((candidate) => candidate.id === item.monitoringPollRequestId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.decision }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									request?.deviceId ?? item.monitoringPollRequestId,
									" · ",
									evidenceTime(item.decidedAt)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.decidedBy }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									item.pollRequestDigest.slice(0, 16),
									"… · ",
									item.reason
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: item.decisionCurrent && item.decision === "approved" ? "ready" : "blocked",
									children: item.decisionCurrent ? item.decision : "Historical"
								}),
								!item.decisionSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
							] }, item.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No independent first-poll decisions" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A decision appears only after a different operator verifies an unexpired, exact request and its evidence chain." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "RECOVERABLE FIRST-POLL PERMIT ISSUANCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Issue the approved permit once" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The independent decision owner may issue an idempotent permit whose validity ends with the original request window. The exact collector and four read-only operations remain locked." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Owner-approved first-poll decision" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: monitoringPollPermitDecisionId,
							onChange: (event) => setMonitoringPollPermitDecisionId(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select your current approval"
							}), evidence?.monitoringPollDecisions.filter((item) => item.decision === "approved" && item.decisionCurrent && item.boundedPollAuthorized && item.decidedBy.toLowerCase() === evidence.viewer.email.toLowerCase() && !evidence.monitoringPollPermits.some((permit) => permit.monitoringPollDecisionId === item.id)).map((item) => {
								const request = evidence.monitoringPollRequests.find((candidate) => candidate.id === item.monitoringPollRequestId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: item.id,
									children: [
										request?.deviceId ?? item.monitoringPollRequestId,
										" · ",
										item.pollRequestDigest.slice(0, 12),
										" · ends ",
										request ? evidenceTime(request.proposedEnd) : "unresolved"
									]
								}, item.id);
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-runtime-policy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Issuance boundary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Approved decision digest locked"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Original expiry preserved"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Idempotent one-per-decision record"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "No poll, device contact or credential execution"] })
							]
						})]
					}),
					monitoringPollPermitError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), monitoringPollPermitError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Issuance creates only an expiring authorization record. It does not contact the collector or device, expose credential values, start polling, enable probes, perform SNMP SET or write to the network."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !monitoringPollPermitDecisionId || issuingMonitoringPollPermit,
						onClick: () => void issueMonitoringPollPermit(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { size: 14 }), issuingMonitoringPollPermit ? "Issuing…" : "Issue first-poll permit"]
					})] }),
					evidence?.monitoringPollPermits.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringPollPermits.map((permit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: permit.deviceId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								permit.allowedOperations.length,
								" SNMP GET operations · ",
								evidenceTime(permit.issuedAt)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: permit.collectorId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								evidenceTime(permit.validFrom),
								" → ",
								evidenceTime(permit.validUntil)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: permit.permitCurrent ? "ready" : "blocked",
								children: permit.permitCurrent ? "Issued" : "Expired / blocked"
							}),
							!permit.permitCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: permit.blockers.join(" · ").replaceAll("_", " ") })
						] }, permit.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No first-poll permits" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A permit appears only after the independent approval owner issues an unexpired exact decision." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "AUTHENTICATED COLLECTOR PERMIT FEED"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Deliver only current permits to the exact collector" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The collector boundary requires bearer authentication and its exact collector identity, then recomputes every registration, claim, request, decision and permit digest before returning the safe target reference." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-runtime-policy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Collector-feed boundary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Exact collector assignment enforced"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Unexpired permit digest recomputed"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Credential reference only—never its value"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "GET performs no polling or device contact"] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "The feed is read-only. It does not acknowledge, consume or execute the permit, contact the device, use a credential, enable probes, perform SNMP SET or write to the network."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "intake-evidence-badge",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "Fail closed"]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "COLLECTOR PERMIT ACKNOWLEDGEMENT REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Prove receipt without requesting execution" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The authenticated assigned collector returns the exact permit digest. A supported receipt confirms only delivery of the immutable authorization record." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-runtime-policy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Acknowledgement boundary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Exact permit digest required"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "One idempotent receipt per permit"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Collector authentication retained"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Execution requested remains false"] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "An acknowledgement does not consume the permit, start polling, contact the device, execute credentials, enable probes, perform SNMP SET or write to the network."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "intake-evidence-badge",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "Append-only"]
					})] }),
					evidence?.monitoringPollPermitAcknowledgements.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringPollPermitAcknowledgements.map((item) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: evidence.monitoringPollPermits.find((candidate) => candidate.id === item.monitoringPollPermitId)?.deviceId ?? item.monitoringPollPermitId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									evidenceTime(item.acknowledgedAt),
									" · authenticated ",
									String(item.collectorAuthenticated)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.collectorId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									item.permitDigest.slice(0, 16),
									"… · execution requested ",
									String(item.executionRequested)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: item.acknowledgementSupported ? "ready" : "blocked",
									children: item.acknowledgementSupported ? "Acknowledged" : "Blocked"
								}),
								!item.acknowledgementSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
							] }, item.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No collector permit acknowledgements" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A receipt appears only when the exact assigned collector authenticates and returns a current permit digest." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "COLLECTOR ZERO-CONTACT PREFLIGHT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Attest local execution readiness" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The authenticated collector binds its current version and exact acknowledgement digest to three explicit local checks: target route present, credential reference resolvable and SNMP client ready." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-runtime-policy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Preflight boundary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "WireGuard transport required"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Collector version snapshot locked"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "All three local checks explicit"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "No device packet or credential use"] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "This collector-reported preflight does not request or execute a poll, contact the device, reveal or execute a credential, enable probes, perform SNMP SET or write to the network."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "intake-evidence-badge",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "Collector-reported"]
					})] }),
					evidence?.monitoringPollPreflightAttestations.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringPollPreflightAttestations.map((item) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: evidence.monitoringPollPermits.find((candidate) => candidate.id === item.monitoringPollPermitId)?.deviceId ?? item.monitoringPollPermitId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									item.transport,
									" · collector ",
									item.collectorVersion,
									" · ",
									evidenceTime(item.attestedAt)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.collectorId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									"route ",
									String(item.targetRoutePresent),
									" · credential ref ",
									String(item.credentialReferenceResolvable),
									" · SNMP client ",
									String(item.snmpClientReady)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: item.preflightSupported ? "ready" : "blocked",
									children: item.preflightSupported ? "Ready" : "Blocked"
								}),
								!item.preflightSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
							] }, item.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No collector preflight attestations" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A preflight appears only when the assigned collector authenticates and binds explicit local readiness states to the exact acknowledgement." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "COLLECTOR FIRST-POLL EXECUTION INTENT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Request a later independent authorization" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The authenticated collector binds a current successful preflight digest to an immutable execution-intent receipt. A separate human decision is required before any permit can be consumed." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-runtime-policy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Execution-intent boundary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Supported preflight digest required"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Exact assigned collector required"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Intent is append-only and idempotent"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Polling authorized remains false"] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "This intent does not authorize or start polling, contact the device, execute credentials, enable probes, perform SNMP SET or write to the network."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "intake-evidence-badge",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "Awaiting decision"]
					})] }),
					evidence?.monitoringPollExecutionRequests.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringPollExecutionRequests.map((item) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: evidence.monitoringPollPermits.find((candidate) => candidate.id === item.monitoringPollPermitId)?.deviceId ?? item.monitoringPollPermitId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									evidenceTime(item.requestedAt),
									" · SNMP GET only ",
									String(item.snmpGetOnly)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.collectorId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									item.preflightDigest.slice(0, 16),
									"… · polling authorized ",
									String(item.pollingAuthorized)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: item.executionRequestSupported ? "ready" : "blocked",
									children: item.executionRequestSupported ? "Requested" : "Blocked"
								}),
								!item.executionRequestSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
							] }, item.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No first-poll execution intents" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "An intent appears only when the assigned collector authenticates and binds a current supported preflight digest." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "INDEPENDENT FIRST-POLL EXECUTION DECISION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Approve permit consumption without starting a poll" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A second human who did not issue the permit recomputes the exact execution-intent digest and records one immutable approve or block decision." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Second-human-decision-eligible execution intent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: monitoringPollExecutionDecisionForm.monitoringPollExecutionRequestId,
								onChange: (event) => setMonitoringPollExecutionDecisionForm((current) => ({
									...current,
									monitoringPollExecutionRequestId: event.target.value
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select a current execution intent"
								}), evidence?.monitoringPollExecutionRequests.filter((item) => item.executionDecisionEligible).map((item) => {
									const permit = evidence.monitoringPollPermits.find((candidate) => candidate.id === item.monitoringPollPermitId);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: item.id,
										children: [
											permit?.deviceId ?? item.monitoringPollPermitId,
											" · ",
											item.collectorId,
											" · ",
											item.preflightDigest.slice(0, 12)
										]
									}, item.id);
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Decision reason" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: monitoringPollExecutionDecisionForm.reason,
								onChange: (event) => setMonitoringPollExecutionDecisionForm((current) => ({
									...current,
									reason: event.target.value
								})),
								placeholder: "Explain why this exact collector execution intent may consume the permit or must be blocked"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "intake-runtime-policy",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Execution-decision boundary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Permit issuer cannot decide"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Exact intent digest recomputed"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Approval authorizes only later consumption"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Polling and device contact remain false"] })
								]
							})
						]
					}),
					monitoringPollExecutionDecisionError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), monitoringPollExecutionDecisionError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "This decision cannot start polling, contact the device, execute credentials, enable probes, perform SNMP SET or write to the network."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !monitoringPollExecutionDecisionForm.monitoringPollExecutionRequestId || monitoringPollExecutionDecisionForm.reason.trim().length < 12 || decidingMonitoringPollExecution,
						onClick: () => void decideMonitoringPollExecution("blocked"),
						children: "Block execution intent"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !monitoringPollExecutionDecisionForm.monitoringPollExecutionRequestId || monitoringPollExecutionDecisionForm.reason.trim().length < 12 || decidingMonitoringPollExecution,
						onClick: () => void decideMonitoringPollExecution("approved"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), decidingMonitoringPollExecution ? "Recording…" : "Approve permit consumption"]
					})] })] }),
					evidence?.monitoringPollExecutionDecisions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringPollExecutionDecisions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.decision === "approved" ? "Permit consumption approved" : "Execution blocked" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								evidenceTime(item.decidedAt),
								" · ",
								item.decidedBy
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.monitoringPollExecutionRequestId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								item.executionRequestDigest.slice(0, 16),
								"… · polling started ",
								String(item.pollingStarted)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: item.executionDecisionCurrent ? "ready" : "blocked",
								children: item.executionDecisionCurrent ? item.decision : "Invalid"
							}),
							!item.executionDecisionCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
						] }, item.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No independent execution decisions" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A decision appears only when a second human approves or blocks a current digest-bound execution intent." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "AUTHENTICATED PERMIT CONSUMPTION REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Bind the collector to one approved execution decision" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The assigned collector submits the exact execution-decision digest. A supported receipt proves the permit was consumed once while every execution-state flag remains false." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-runtime-policy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Consumption boundary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Collector authentication required"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Approved decision digest required"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "One idempotent receipt per permit"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Polling started remains false"] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Permit consumption does not contact the device, execute credentials, start polling, enable probes, perform SNMP SET or write to the network."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "intake-evidence-badge",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "Collector-reported"]
					})] }),
					evidence?.monitoringPollPermitConsumptions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringPollPermitConsumptions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.monitoringPollPermitId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								evidenceTime(item.consumedAt),
								" · permit consumed ",
								String(item.permitConsumed)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.collectorId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								item.executionDecisionDigest.slice(0, 16),
								"… · polling started ",
								String(item.pollingStarted)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: item.consumptionSupported ? "ready" : "blocked",
								children: item.consumptionSupported ? "Consumed" : "Blocked"
							}),
							!item.consumptionSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
						] }, item.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No permit-consumption receipts" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A receipt appears only when the exact assigned collector authenticates and binds a current approved execution-decision digest." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "BOUNDED FIRST-POLL EXECUTION START REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Record an attempt without inventing an outcome" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The authenticated collector binds the exact permit-consumption digest when the SNMP GET-only execution begins. The receipt reports device-contact and credential-use attempts, while outcome remains explicitly unknown." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-runtime-policy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Execution-start boundary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Current consumed permit required"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Assigned collector authentication required"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Attempt state is collector-reported"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "No success or response inferred"] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "This evidence allows only the four bounded SNMP GET operations. SNMP SET, probes and network configuration writes remain prohibited."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "intake-evidence-badge",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "Outcome unknown"]
					})] }),
					evidence?.monitoringPollExecutionStarts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringPollExecutionStarts.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.monitoringPollPermitId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								evidenceTime(item.startedAt),
								" · execution started ",
								String(item.executionStarted)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.collectorId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								"contact attempted ",
								String(item.deviceContactAttempted),
								" · outcome known ",
								String(item.outcomeKnown)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: item.executionStartSupported ? "ready" : "blocked",
								children: item.executionStartSupported ? "Started" : "Blocked"
							}),
							!item.executionStartSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
						] }, item.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No bounded execution starts" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A start appears only when the assigned collector authenticates and binds a current permit-consumption digest." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "FOUR-OPERATION RESULT RECEIPT REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Persist outcomes without storing SNMP responses" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Each supported execution may submit one receipt for system identity, system uptime, interface inventory and interface counters. Only outcome, evidence hash and value count are retained." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-runtime-policy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Result boundary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Exactly four operation keys supported"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Succeeded or failed is explicit"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Evidence SHA-256 required"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Raw payloads and secrets rejected"] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Receipts never store raw SNMP payloads, community strings or credentials. SNMP SET, probes and network writes remain prohibited."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "intake-evidence-badge",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "Digest-only"]
					})] }),
					evidence?.monitoringPollOperationReceipts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringPollOperationReceipts.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.operationKey.replaceAll("_", " ") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								evidenceTime(item.observedAt),
								" · ",
								item.valueCount,
								" values"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.collectorId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								item.evidenceDigest.slice(0, 16),
								"… · raw stored ",
								String(item.rawPayloadStored)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: item.operationReceiptSupported && item.outcome === "succeeded" ? "ready" : "blocked",
								children: item.operationReceiptSupported ? item.outcome : "Invalid"
							}),
							!item.operationReceiptSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
						] }, item.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No operation result receipts" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Receipts appear only when the authenticated collector binds digest-only outcomes to a current bounded execution start." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "INDEPENDENT FIRST-POLL COMPLETION REVIEW"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Approve or block the exact four-receipt package" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The reviewer must differ from both the permit issuer and the execution-decision owner. Approval requires all four supported outcomes to have succeeded." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Independent-review-eligible completion package" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: monitoringPollCompletionDecisionForm.monitoringPollExecutionStartId,
								onChange: (event) => setMonitoringPollCompletionDecisionForm((current) => ({
									...current,
									monitoringPollExecutionStartId: event.target.value
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select a complete first-poll package"
								}), evidence?.monitoringPollCompletionPackages.filter((item) => item.completionDecisionEligible).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: item.monitoringPollExecutionStartId,
									children: [
										item.monitoringPollPermitId,
										" · ",
										item.allSucceeded ? "4 succeeded" : `${item.failedOperations.length} failed`,
										" · ",
										item.evidenceDigest?.slice(0, 12)
									]
								}, item.monitoringPollExecutionStartId))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Completion-review reason" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: monitoringPollCompletionDecisionForm.reason,
								onChange: (event) => setMonitoringPollCompletionDecisionForm((current) => ({
									...current,
									reason: event.target.value
								})),
								placeholder: "Explain why this exact four-operation first poll is approved or blocked"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "intake-runtime-policy",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Completion boundary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Exactly four current receipts required"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Approval requires four successes"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Independent reviewer required"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "No recurring monitoring or alerts activated"] })
								]
							})
						]
					}),
					monitoringPollCompletionDecisionError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), monitoringPollCompletionDecisionError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Approval is a recommendation for a later controlled step. It does not activate recurring monitoring, alerts, probes, SNMP SET or network writes."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !monitoringPollCompletionDecisionForm.monitoringPollExecutionStartId || monitoringPollCompletionDecisionForm.reason.trim().length < 12 || decidingMonitoringPollCompletion,
						onClick: () => void decideMonitoringPollCompletion("blocked"),
						children: "Block completion"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !monitoringPollCompletionDecisionForm.monitoringPollExecutionStartId || monitoringPollCompletionDecisionForm.reason.trim().length < 12 || decidingMonitoringPollCompletion,
						onClick: () => void decideMonitoringPollCompletion("approved"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), decidingMonitoringPollCompletion ? "Recording…" : "Approve first poll"]
					})] })] }),
					evidence?.monitoringPollCompletionDecisions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.monitoringPollCompletionDecisions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.monitoringPollPermitId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								evidenceTime(item.decidedAt),
								" · ",
								item.decidedBy
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [item.operationReceiptIds.length, " receipts"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								item.evidenceDigest.slice(0, 16),
								"… · activated ",
								String(item.recurringMonitoringActivated)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: item.completionDecisionSupported && item.decision === "approved" ? "ready" : "blocked",
								children: item.completionDecisionSupported ? item.decision : "Invalid"
							}),
							!item.completionDecisionSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
						] }, item.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No first-poll completion decisions" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A decision appears only after an independent reviewer receives an exact four-receipt package." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "RECURRING MONITORING ACTIVATION REQUEST"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Bind the approved first poll to a safe recurring profile" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The completion owner may request an exact 60-second schedule for the same collector and four successful SNMP GET operations. A later independent review is still required." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerReset, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your current approved first-poll completion" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: recurringMonitoringCompletionDecisionId,
							onChange: (event) => setRecurringMonitoringCompletionDecisionId(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select your approved completion"
							}), evidence?.monitoringPollCompletionDecisions.filter((item) => item.decision === "approved" && item.completionDecisionSupported && item.recurringMonitoringRecommended && item.decidedBy.toLowerCase() === evidence.viewer.email.toLowerCase() && !evidence.recurringMonitoringActivationRequests.some((request) => request.monitoringPollCompletionDecisionId === item.id)).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: item.id,
								children: [
									item.monitoringPollPermitId,
									" · ",
									item.evidenceDigest.slice(0, 12),
									" · ",
									item.operationReceiptIds.length,
									" receipts"
								]
							}, item.id))]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-runtime-policy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Request boundary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Completion decision digest locked"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "60-second interval fixed"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Four SNMP GET operations only"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "No polling or alerts activated"] })
							]
						})]
					}),
					recurringMonitoringActivationError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), recurringMonitoringActivationError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "This append-only request grants no recurring authority. Polling, alerts, probes, SNMP SET and network writes remain disabled."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !recurringMonitoringCompletionDecisionId || requestingRecurringMonitoringActivation,
						onClick: () => void requestRecurringMonitoringActivation(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerReset, { size: 14 }), requestingRecurringMonitoringActivation ? "Requesting…" : "Request recurring monitoring"]
					})] }),
					evidence?.recurringMonitoringActivationRequests.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.recurringMonitoringActivationRequests.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.deviceId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								evidenceTime(item.requestedAt),
								" · ",
								item.requestedBy
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [item.pollIntervalSeconds, "-second profile"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								item.allowedOperations.length,
								" operations · alerts ",
								String(item.alertsEnabled)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: item.activationRequestCurrent ? "ready" : "blocked",
								children: item.activationRequestCurrent ? "Requested" : "Invalid"
							}),
							!item.activationRequestCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
						] }, item.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerReset, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No recurring-monitoring activation requests" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A request appears only when the approved first-poll completion owner binds the exact successful evidence chain." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "INDEPENDENT RECURRING ACTIVATION REVIEW"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Clear or block the digest-bound profile" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The reviewer must differ from the requester. The review revalidates the successful first poll, exact collector, 60-second interval and four SNMP GET operations." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Independent-review-eligible request" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: recurringMonitoringActivationReviewForm.recurringMonitoringActivationRequestId,
								onChange: (event) => setRecurringMonitoringActivationReviewForm((current) => ({
									...current,
									recurringMonitoringActivationRequestId: event.target.value
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select another operator’s current request"
								}), evidence?.recurringMonitoringActivationRequests.filter((item) => item.activationReviewEligible).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: item.id,
									children: [
										item.deviceId,
										" · ",
										item.pollIntervalSeconds,
										"s · ",
										item.completionDecisionDigest.slice(0, 12),
										" · ",
										item.requestedBy
									]
								}, item.id))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Independent-review reason" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: recurringMonitoringActivationReviewForm.reason,
								onChange: (event) => setRecurringMonitoringActivationReviewForm((current) => ({
									...current,
									reason: event.target.value
								})),
								placeholder: "Explain why this exact recurring profile is cleared or blocked"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "intake-runtime-policy",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Review boundary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Reviewer differs from requester"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Request SHA-256 digest recomputed"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Read-only profile revalidated"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "No recurring authority or alerts"] })
								]
							})
						]
					}),
					recurringMonitoringActivationReviewError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), recurringMonitoringActivationReviewError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Clearance is evidence for a later authorization step. It cannot start polling, enable alerts or grant probe, SNMP SET or network-write authority."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !recurringMonitoringActivationReviewForm.recurringMonitoringActivationRequestId || recurringMonitoringActivationReviewForm.reason.trim().length < 12 || reviewingRecurringMonitoringActivation,
						onClick: () => void reviewRecurringMonitoringActivation("blocked"),
						children: "Block recurring request"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !recurringMonitoringActivationReviewForm.recurringMonitoringActivationRequestId || recurringMonitoringActivationReviewForm.reason.trim().length < 12 || reviewingRecurringMonitoringActivation,
						onClick: () => void reviewRecurringMonitoringActivation("cleared"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), reviewingRecurringMonitoringActivation ? "Recording…" : "Clear recurring request"]
					})] })] }),
					evidence?.recurringMonitoringActivationReviews.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.recurringMonitoringActivationReviews.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.decision }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								evidenceTime(item.reviewedAt),
								" · ",
								item.reviewedBy
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.recurringMonitoringActivationRequestId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								item.activationRequestDigest.slice(0, 16),
								"… · authorized ",
								String(item.recurringMonitoringAuthorized)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: item.reviewCurrent && item.decision === "cleared" ? "ready" : "blocked",
								children: item.reviewCurrent ? item.decision : "Invalid"
							}),
							!item.reviewCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
						] }, item.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No independent recurring-activation reviews" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A review appears only when a different operator verifies the current digest-bound request." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "THIRD-OPERATOR RECURRING AUTHORIZATION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Authorize scheduling without starting execution" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The decision owner must differ from both the request owner and independent reviewer. Approval authorizes only a later recoverable schedule-registration step." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Third-operator-eligible cleared review" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: recurringMonitoringActivationDecisionForm.recurringMonitoringActivationReviewId,
								onChange: (event) => setRecurringMonitoringActivationDecisionForm((current) => ({
									...current,
									recurringMonitoringActivationReviewId: event.target.value
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select a current cleared review"
								}), evidence?.recurringMonitoringActivationReviews.filter((item) => item.activationDecisionEligible).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: item.id,
									children: [
										item.recurringMonitoringActivationRequestId,
										" · ",
										item.activationRequestDigest.slice(0, 12),
										" · ",
										item.reviewedBy
									]
								}, item.id))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Authorization-decision reason" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: recurringMonitoringActivationDecisionForm.reason,
								onChange: (event) => setRecurringMonitoringActivationDecisionForm((current) => ({
									...current,
									reason: event.target.value
								})),
								placeholder: "Explain why this cleared recurring profile is approved or blocked"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "intake-runtime-policy",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Authorization boundary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Third operator required"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Review digest recomputed"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Approval authorizes later registration only"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "No schedule, polling or alerts created"] })
								]
							})
						]
					}),
					recurringMonitoringActivationDecisionError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), recurringMonitoringActivationDecisionError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Even approval cannot contact a collector or device, execute credentials, start polling, enable alerts, probe, perform SNMP SET or write to the network."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !recurringMonitoringActivationDecisionForm.recurringMonitoringActivationReviewId || recurringMonitoringActivationDecisionForm.reason.trim().length < 12 || decidingRecurringMonitoringActivation,
						onClick: () => void decideRecurringMonitoringActivation("blocked"),
						children: "Block recurring activation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !recurringMonitoringActivationDecisionForm.recurringMonitoringActivationReviewId || recurringMonitoringActivationDecisionForm.reason.trim().length < 12 || decidingRecurringMonitoringActivation,
						onClick: () => void decideRecurringMonitoringActivation("approved"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { size: 14 }), decidingRecurringMonitoringActivation ? "Recording…" : "Authorize recurring profile"]
					})] })] }),
					evidence?.recurringMonitoringActivationDecisions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.recurringMonitoringActivationDecisions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.decision }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								evidenceTime(item.decidedAt),
								" · ",
								item.decidedBy
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.recurringMonitoringActivationReviewId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								item.activationReviewDigest.slice(0, 16),
								"… · authorized ",
								String(item.recurringMonitoringAuthorized)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: item.decisionCurrent && item.decision === "approved" ? "ready" : "blocked",
								children: item.decisionCurrent ? item.decision : "Invalid"
							}),
							!item.decisionCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
						] }, item.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No recurring-monitoring authorization decisions" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A decision appears only when a third operator verifies a current cleared review." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "RECURRING SCHEDULE REGISTRATION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Register the authorized profile without starting polling" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The decision owner can create one recoverable 60-second SNMP GET-only schedule for the exact device and collector. Registration is idempotent and execution remains stopped." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerReset, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your approved recurring authorization" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: recurringMonitoringActivationDecisionId,
							onChange: (event) => setRecurringMonitoringActivationDecisionId(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select an approved decision"
							}), evidence?.recurringMonitoringActivationDecisions.filter((item) => item.scheduleRegistrationEligible).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: item.id,
								children: [
									item.recurringMonitoringActivationRequestId,
									" · ",
									item.activationReviewDigest.slice(0, 12)
								]
							}, item.id))]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-runtime-policy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Registration boundary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "One schedule per device"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "60-second interval locked"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Four SNMP GET operations only"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Polling and alerts remain stopped"] })
							]
						})]
					}),
					recurringMonitoringScheduleError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), recurringMonitoringScheduleError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Registration grants no collector execution, credential use, alerting, probes, SNMP SET or network writes."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !recurringMonitoringActivationDecisionId || registeringRecurringMonitoringSchedule,
						onClick: () => void registerRecurringMonitoringSchedule(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerReset, { size: 14 }), registeringRecurringMonitoringSchedule ? "Registering…" : "Register safe schedule"]
					})] }),
					evidence?.recurringMonitoringSchedules.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.recurringMonitoringSchedules.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.deviceId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								evidenceTime(item.registeredAt),
								" · ",
								item.registeredBy
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [item.pollIntervalSeconds, "-second profile"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								item.collectorId,
								" · polling ",
								String(item.pollingStarted),
								" · alerts ",
								String(item.alertsEnabled)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: item.scheduleCurrent ? "ready" : "blocked",
								children: item.scheduleCurrent ? "Registered" : "Invalid"
							}),
							!item.scheduleCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blockers.join(" · ").replaceAll("_", " ") })
						] }, item.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerReset, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No recurring schedules registered" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A schedule appears only after the approved third-operator decision owner registers the exact read-only profile." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-runtime-permit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "ORDERED PRODUCTION ASSURANCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Advance every remaining gate with independent, digest-bound evidence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The program enforces all 35 remaining milestones in exact order. Consecutive gates require different operators and every record remains evidence-only until separately commissioned runtime authority exists." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-summary nocx-summary-grid",
						"aria-label": "Version 269 recurring assurance portfolio readiness",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								tone: "blue",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {}),
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Programs" }),
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: evidence?.summary.recurringMonitoringPrograms ?? "—" }),
								detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Claim-scoped chains" }) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								tone: "blue",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}),
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Completed" }),
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: evidence?.summary.completedRecurringMonitoringPrograms ?? "—" }),
								detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "35/35 accepted gates" }) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								tone: "blue",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Actionable now" }),
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: evidence?.summary.actionableRecurringMonitoringPrograms ?? "—" }),
								detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Current operator eligible" }) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								tone: "blue",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}),
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Operator blocked" }),
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: evidence?.summary.operatorBlockedRecurringMonitoringPrograms ?? "—" }),
								detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Independent operator required" }) })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-evidence-note",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							"Fleet gate coverage: ",
							evidence?.summary.recurringMonitoringProgramGateCoveragePercent ?? 0,
							"%."
						] }), " This is accepted evidence coverage only; it is never a monitoring-activation or production-readiness claim."] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-runtime-policy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "OPERATOR ACTION QUEUE" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Act-now claims first"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Independent handoffs second"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {}), "Completed chains retained"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Priority grants no authority"] })
						]
					}),
					evidence?.recurringMonitoringProgramQueue.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.recurringMonitoringProgramQueue.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
								"#",
								item.queuePosition,
								" · ",
								item.claim.deviceId
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								item.claim.collectorId,
								" · ",
								item.acceptedCount,
								"/",
								item.requiredCount,
								" accepted"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.completed ? "Assurance chain complete" : `Version ${item.nextVersion} · ${item.nextGateKey?.replaceAll("_", " ")}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.queueState === "act_now" ? "Current operator may record evidence" : item.queueState === "handoff_required" ? "Assign a different authorized operator" : "Retained for audit" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: item.completed || item.recordEligible ? "ready" : "blocked",
								children: item.queueState.replaceAll("_", " ")
							})
						] }, `queue-${item.claim.id}`))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No assurance actions queued" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The queue remains empty until a collector safely claims a recurring schedule." })
						]
					}),
					evidence?.recurringMonitoringProgram.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence.recurringMonitoringProgram.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.claim.deviceId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								item.claim.collectorId,
								" · claim ",
								item.claim.id.slice(-12)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
								item.acceptedCount,
								"/",
								item.requiredCount,
								" gates · ",
								item.completionPercent,
								"%"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.completed ? "All assurance evidence accepted" : `Next: V${item.nextVersion} ${item.nextGateKey?.replaceAll("_", " ")}` })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: item.completed ? "ready" : "blocked",
								children: item.completed ? "Complete" : item.recordEligible ? "Actionable" : "Independent operator"
							}),
							item.blocker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.blocker.replaceAll("_", " ") })
						] }, item.claim.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No recurring assurance programs" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A progress record appears only after an authenticated collector safely claims a registered recurring schedule." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Eligible recurring-monitoring program" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: recurringProgramForm.recurringMonitoringScheduleClaimId,
								onChange: (event) => {
									const program = evidence?.recurringMonitoringProgram.find((item) => item.claim.id === event.target.value);
									setRecurringProgramForm((current) => ({
										...current,
										recurringMonitoringScheduleClaimId: event.target.value,
										version: program?.nextVersion ?? 266
									}));
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select an eligible claimed schedule"
								}), evidence?.recurringMonitoringProgram.filter((item) => item.recordEligible && !item.completed).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: item.claim.id,
									children: [
										item.claim.deviceId,
										" · V",
										item.nextVersion,
										" · ",
										item.nextGateKey?.replaceAll("_", " ")
									]
								}, item.claim.id))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Evidence reason for Version ", recurringProgramForm.version] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: recurringProgramForm.reason,
								onChange: (event) => setRecurringProgramForm((current) => ({
									...current,
									reason: event.target.value
								})),
								placeholder: "Describe the evidence supporting this exact ordered gate"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "intake-runtime-policy",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Program boundary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Versions 266–300 strictly ordered"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Alternating independent operators"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "SHA-256 parent chain"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "No runtime authority granted"] })
								]
							})
						]
					}),
					recurringProgramError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), recurringProgramError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Recording a milestone never starts polling, enables alerts, stores credentials, probes, permits SNMP SET or writes to the network."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: !recurringProgramForm.recurringMonitoringScheduleClaimId || recurringProgramForm.reason.trim().length < 12 || recordingRecurringProgram,
						onClick: () => void recordRecurringProgramGate(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), recordingRecurringProgram ? "Recording…" : `Record Version ${recurringProgramForm.version}`]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CLAIM-SCOPED ASSURANCE REGISTER" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: selectedRecurringProgram?.claim.id ?? "",
							onChange: (event) => setSelectedRecurringProgramClaimId(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select a claimed schedule"
							}), evidence?.recurringMonitoringProgram.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: item.claim.id,
								children: [
									item.claim.deviceId,
									" · ",
									item.claim.collectorId,
									" · ",
									item.acceptedCount,
									"/",
									item.requiredCount
								]
							}, item.claim.id))]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-runtime-policy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Selected evidence scope" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), selectedRecurringProgram ? selectedRecurringProgram.claim.deviceId : "No device selected"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), selectedRecurringProgram ? selectedRecurringProgram.claim.collectorId : "No collector selected"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "One immutable claim chain"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Cross-claim evidence excluded"] })
							]
						})]
					}),
					selectedRecurringProgram ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-runtime-permit-register",
						children: evidence?.recurringProgramStages.map((stage) => {
							const record = selectedRecurringProgram.acceptedEvidence.find((item) => item.version === stage.version);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["Version ", stage.version] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: stage.gateKey.replaceAll("_", " ") })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: record ? record.actorEmail : "Evidence pending" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: record ? `${evidenceTime(record.recordedAt)} · ${record.inputDigest.slice(0, 16)}…` : "Fail-closed for this exact claim" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: record ? "ready" : "blocked",
									children: record ? "Accepted" : "Blocked"
								})
							] }, `${selectedRecurringProgram.claim.id}-${stage.version}`);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No claim selected" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The stage register remains empty so evidence from different devices or collectors can never be combined." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-permit-revocation",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "FAIL-CLOSED PERMIT REVOCATION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Withdraw a request or approval immediately" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Any authorized administrator can append a digest-bound revocation while the proposed timebox is still open. The original records remain immutable and the revoked chain is excluded from current eligibility." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-validation-fields",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open unrevoked permit request" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: permitRevocationForm.permitRequestId,
							onChange: (event) => setPermitRevocationForm((current) => ({
								...current,
								permitRequestId: event.target.value
							})),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select a permit request"
							}), evidence?.permitRequests.filter((permitRequest) => Date.parse(permitRequest.proposedEnd) > Date.parse(evidence.checkedAt) && !evidence.permitRevocations.some((revocation) => revocation.permitRequestId === permitRequest.id && revocation.revocationSupported)).map((permitRequest) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: permitRequest.id,
								children: [
									permitRequest.executor?.displayName ?? "Executor unresolved",
									" · ",
									permitRequest.scopeCandidateIds.length,
									" devices · ends ",
									evidenceTime(permitRequest.proposedEnd)
								]
							}, permitRequest.id))]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Revocation reason" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: permitRevocationForm.reason,
							onChange: (event) => setPermitRevocationForm((current) => ({
								...current,
								reason: event.target.value
							})),
							placeholder: "State why this exact permit request or approval must be withdrawn"
						})] })]
					}),
					permitRevocationError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-manifest-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), permitRevocationError]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Revocation is append-only, immediate and fail-closed; it cannot grant any runtime capability."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						disabled: !evidence?.viewer.canAdmin || !permitRevocationForm.permitRequestId || permitRevocationForm.reason.trim().length < 12 || revokingPermit,
						onClick: () => void revokeExecutionPermit(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { size: 14 }), revokingPermit ? "Revoking…" : "Revoke permit chain"]
					})] }),
					evidence?.permitRevocations.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-permit-revocation-register",
						children: evidence.permitRevocations.map((revocation) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Revoked" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								evidenceTime(revocation.revokedAt),
								" · ",
								revocation.permitRequestDigest.slice(0, 16),
								"…"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: revocation.revokedBy }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: revocation.reason })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: revocation.revocationSupported ? "ready" : "blocked",
								children: revocation.revocationSupported ? "Enforced" : "Invalid"
							}),
							!revocation.revocationSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: revocation.blockers.join(" · ").replaceAll("_", " ") })
						] }, revocation.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No permit revocations" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Open requests and administrative approvals can be withdrawn before any future issuance step." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "intake-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel intake-templates",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "PERSISTENT BATCH REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Recorded intake batches" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Selection reflects the protected intake API." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {})] }), evidenceError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Evidence unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: evidenceError }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button",
								onClick: () => void loadEvidence(),
								children: "Retry"
							})
						]
					}) : evidence?.batches.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "intake-template-list",
						children: evidence.batches.map((batch) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: batch.id === selectedBatch?.id ? "active" : "",
							onClick: () => setSelectedBatchId(batch.id),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: batch.fileName }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									batch.status,
									" · ",
									batch.acceptedCount,
									" accepted"
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: evidenceTime(batch.createdAt) })
							]
						}, batch.id))
					}), selectedBatch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "intake-template-detail",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Recorded batch state" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedBatch.status })] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								selectedBatch.acceptedCount,
								" accepted · ",
								selectedBatch.rejectedCount,
								" rejected · ",
								selectedBatch.rowCount,
								" submitted"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}),
								"Submitted by ",
								selectedBatch.submittedBy
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}),
								selectedBatch.candidates.length,
								" linked candidate records"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
								"Probe flag ",
								String(selectedBatch.probesEnabled),
								" · network-write flag ",
								String(selectedBatch.networkWritesEnabled)
							] })
						]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No persistent intake batches" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The register will remain empty until an authorized operator stages validated candidate metadata." })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel intake-upload",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "CSV CONTRACT VALIDATION"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: fileName || "No CSV selected" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Blank template · maximum ",
								evidence?.contract.maxRows ?? 10,
								" exact candidate records per wave."
							] })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {})] }),
						!fileName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Use the blank intake contract" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Enter only verified model, serial, site, exact address, collector, credential reference and owner data. Secret values are rejected." })
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-validation",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: errors.length ? "blocked" : "passed",
								children: [errors.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: errors.length ? "Validation blocked" : "Ready to stage metadata" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [rows.length, " candidate rows inspected"] })] })]
							}), errors.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: errors.slice(0, 6).map((error) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: error }, error)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "All required fields are present." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Vendor, read-only SNMP mode and exact-address rules pass." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No duplicate vendor and serial pair exists in this file." })
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary-button",
							onClick: () => fileInput.current?.click(),
							children: "Choose another file"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							disabled: !rows.length || errors.length > 0 || submitting,
							onClick: () => void stageDraft(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 14 }), submitting ? "Staging…" : "Stage metadata as draft"]
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-candidates",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "PERSISTENT CANDIDATE REGISTER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Recorded candidate evidence" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Collector and credential references are metadata only; credential values are never returned." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {})] }), evidence?.candidates.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "intake-candidate-grid",
					children: evidence.candidates.map((candidate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: candidate.hostname }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								candidate.vendor,
								" · ",
								candidate.model
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: candidate.waveEligible ? "wave-ready" : "wave-blocked",
								children: candidate.waveEligible ? "Wave eligible" : "Blocked"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "State" }), candidate.status] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Site" }), candidate.site] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Address" }), candidate.managementAddress] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Collector" }), candidate.collector ? `${candidate.collector.name} · v${candidate.collector.version ?? "unrecorded"} · stored ${candidate.collector.status} · current ${candidate.collector.operationalStatus}` : "Reference unresolved · current unknown"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Credential" }), candidate.credentialReference ? `${candidate.credentialReference.label} · ${candidate.credentialReference.status}` : "Reference unresolved"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Safety" }),
							"probe ",
							String(candidate.probesEnabled),
							" · write ",
							String(candidate.networkWritesEnabled)
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Wave gate" }), candidate.waveEligible ? "All gates passed" : candidate.waveBlockers.join(" · ").replaceAll("_", " ")] })
					] }, candidate.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "intake-empty",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No persistent candidate evidence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No candidate device, site, owner, address or availability is inferred." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel intake-safeguards",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "FAIL-CLOSED INTAKE BOUNDARY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "A staged metadata record is not a commissioned device" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Duplicate hostnames, serials and management addresses are rejected."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Secret, password, token and SNMP community values are rejected and never returned."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "CIDR ranges, wildcards and broad scan targets are not accepted."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Each wave is limited to 10 exact devices with a current versioned collector."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Sealed manifests preserve exact candidate, collector-version and credential-reference evidence."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Commissioning windows require a current manifest, active lead, mandatory checks and abort criteria."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Every preflight record is digest-bound and requires validation by a different operator."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Acceptance or rejection records the validator and reason without granting release authority."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "A separate decision owner may approve only an evidence-complete read-only handoff."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Activation requests lock the approved release, exact candidate scope, rollback evidence and expiry."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "An independent reviewer may clear or block the digest-bound request without issuing an execution permit."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Permit requests bind one active executor to the exact cleared scope and a 15-to-60-minute timebox."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "A fully separate decision owner may approve the exact permit request for a later issuance step."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Runtime permits allow only exact-scope WireGuard transport and four SNMP GET operations."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Collector permit fetches require a bearer token, exact collector identity, fresh version evidence and assigned candidate scope."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Every successful fetch writes one digest-bound consumption receipt without exposing secret values."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Execution evidence accepts only the four approved SNMP GET operations, outcome metadata and SHA-256 response digests."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Unknown or raw-response fields are rejected before storage; idempotency is enforced per collector."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Per-device verification requires identity, uptime, interface inventory and interface counters from the same current permit."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Independent verification decisions are bound to the exact four receipt IDs and their deterministic evidence digest."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "The decision owner must be separate from permit request, execution, approval and issuance participants."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Enrollment requests preserve an exact candidate snapshot, approved evidence digest and SNMP read-only profile."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "An enrollment request cannot create an inventory device or telemetry target."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Independent enrollment reviews are bound to the recomputed request digest and reject the original requester."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Enrollment clearance cannot create a device, activate monitoring, enable probes or authorize network writes."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Creation-authorization requests bind the exact enrollment and independent-review digests."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "A creation-authorization request is evidence only and cannot create a device or activate monitoring."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "A separate decision owner must approve the exact creation-request digest before any device record can exist."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Creation authorization never grants monitoring, probe, credential-execution, SNMP SET or network-write authority."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Inventory creation is idempotent, conflict-checked and recoverable from a completed execution receipt."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Every created device starts unknown with no last-seen claim, probe or monitoring activation."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Monitoring requests require the exact creation receipt, current collector and active credential reference."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "A monitoring request cannot contact a device, execute credentials, start polling or activate probes."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "A completed read-only profile cannot activate monitoring, enable probes, create a device record or authorize writes."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Any open permit request or approval can be revoked with an append-only digest-bound record."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "MikroTik and Ubiquiti onboarding remains SNMP GET-only; SNMP SET is not allowed."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "NOCX permit consumption and evidence ingestion never start polling or initiate device contact."] })
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
export { DeviceIntake as default };
