import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://127.0.0.1:5000/api/openapi-swagger.json",
  output: "src/bindings",
  plugins: [
    {
      name: "@hey-api/client-ky",
      runtimeConfigPath: "../lib/codegen-config.ts",
    },
    "arktype",
    "@tanstack/react-query",
  ],
});
