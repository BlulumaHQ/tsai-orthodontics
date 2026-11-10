import { AsyncLocalStorage } from "node:async_hooks";

type Bindings = Record<string, unknown>;
type WorkerRequest = Request & { runtime?: { cloudflare?: { env?: Bindings } } };
const bindingsContext = new AsyncLocalStorage<Bindings>();

export function withWorkerBindings<T>(request: Request, env: unknown, callback: () => T): T {
  const native = (request as WorkerRequest).runtime?.cloudflare?.env;
  const bindings = native ?? (env && typeof env === "object" ? (env as Bindings) : {});
  return bindingsContext.run(bindings, callback);
}

export function getWorkerSecret(request: Request, name: string): string | undefined {
  const bindings =
    (request as WorkerRequest).runtime?.cloudflare?.env ?? bindingsContext.getStore();
  const value = bindings?.[name];
  return typeof value === "string" && value ? value : undefined;
}
