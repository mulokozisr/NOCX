import { authorizeRequest } from "../../../../lib/access-control";

export async function GET(request:Request){
  const decision=await authorizeRequest(request,"platform.read");
  if(!decision.ok)return decision.response;
  return Response.json({authenticated:true,identity:decision.identity,session:{source:"chatgpt",idleTimeoutMinutes:30},networkWrites:false});
}
