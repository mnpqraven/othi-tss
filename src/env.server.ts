import { createEnv } from "@t3-oss/env-core";
import { type } from "arktype";

export const serverEnv = createEnv({
  server: {
    API_URL: type("string>=1"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
