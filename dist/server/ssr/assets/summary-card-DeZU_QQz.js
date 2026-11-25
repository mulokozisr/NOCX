import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { f as ChartNoAxesCombined } from "./settings-BHhlqS1D.js";
//#region app/summary-card.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function plainText(node) {
	return import_react.Children.toArray(node).map((child) => typeof child === "string" || typeof child === "number" ? String(child) : (0, import_react.isValidElement)(child) ? plainText(child.props.children) : "").join("");
}
function SummaryCard({ icon, label, value, detail, tone = "blue", href, disabled, valueClassName, className = "", ...props }) {
	const id = (0, import_react.useId)();
	const valueText = plainText(value), textual = !/[0-9—…]/.test(valueText);
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "nocx-summary-icon tone-" + tone,
			"aria-hidden": "true",
			children: icon ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesCombined, { size: 18 })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "nocx-summary-label",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: "nocx-summary-value " + (textual ? "is-text-value " : "") + (valueText.length > 7 ? "is-long-value " : "") + (valueClassName ?? ""),
			children: value
		}),
		detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "nocx-summary-detail",
			id,
			children: detail
		})
	] });
	const shared = {
		...props,
		title: props.title ?? (detail ? plainText(detail) : void 0),
		className: "nocx-summary-card " + (plainText(label).length > 13 ? "has-long-label " : "") + className,
		"aria-describedby": detail ? id : props["aria-describedby"]
	};
	if (href) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		...shared,
		href,
		children: content
	});
	if (props.onClick || props["aria-pressed"] !== void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...shared,
		type: "button",
		disabled,
		children: content
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		...shared,
		children: content
	});
}
//#endregion
export { SummaryCard as t };
