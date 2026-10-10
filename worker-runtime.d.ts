import type {
  D1Database as WorkerD1Database,
  D1Result as WorkerD1Result,
  ScheduledController as WorkerScheduledController,
} from "@cloudflare/workers-types";
// Expose only the runtime bindings used by the server. Keep browser DOM types intact.
declare global {
  type D1Database = WorkerD1Database;
  type D1Result<T = unknown> = WorkerD1Result<T>;
  type ScheduledController = WorkerScheduledController;
}
