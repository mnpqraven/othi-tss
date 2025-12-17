import type { CreateClientConfig } from "@/bindings/client";
import { clientEnv } from "@/env.client";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: clientEnv.VITE_API_URL,
});
