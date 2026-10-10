export function collectorAuthenticated(request: Request) {
  const expected = process.env.NOCX_COLLECTOR_TOKEN;
  const supplied = request.headers
    .get("authorization")
    ?.replace(/^Bearer\s+/i, "");
  if (!expected || !supplied || expected.length !== supplied.length)
    return false;
  let difference = 0;
  for (let i = 0; i < expected.length; i++)
    difference |= expected.charCodeAt(i) ^ supplied.charCodeAt(i);
  return difference === 0;
}
