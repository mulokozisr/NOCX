//#region lib/operational-evidence.ts
function csvCell(value) {
	const text = String(value ?? "");
	return `"${(/^[\s]*[=+@-]|^[\t\r\n]/.test(text) ? `'${text}` : text).replaceAll("\"", "\"\"")}"`;
}
//#endregion
export { csvCell as t };
