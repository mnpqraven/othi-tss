import {
  createFileRoute,
  Link,
  type LinkOptions,
} from "@tanstack/react-router";
import { clientEnv } from "@/env.client";
import { tv } from "@/lib/utils";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

const OPENAPI_DOCS = ["swagger", "rapidoc", "redoc"];

const itemVariant = tv({
  base: "flex flex-col gap-2 rounded-md border p-6 underline hover:no-underline",
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-2 p-8">
      <div className="font-semibold text-3xl">API server</div>
      <APIBlock />

      <div className="font-semibold text-3xl">Service</div>
      <ServiceBlock />

      <div className="font-semibold text-3xl">Database</div>
    </div>
  );
}

function APIBlock() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {OPENAPI_DOCS.map((suffix) => (
        <a
          href={`${clientEnv.VITE_API_URL}/${suffix}`}
          className={itemVariant()}
          target="_blank"
          key={suffix}
        >
          {suffix}
        </a>
      ))}
      <a
        href={`${clientEnv.VITE_API_URL}/api/openapi-swagger.json`}
        className="flex flex-col gap-2 rounded-md border p-6 underline hover:no-underline"
        target="_blank"
      >
        <pre>openapi.json</pre>
      </a>
    </div>
  );
}

function ServiceBlock() {
  const links: { to: LinkOptions["to"]; label: string }[] = [
    { to: "/admin/health", label: "Health" },
  ];
  return (
    <div className="grid grid-cols-4 gap-4">
      {links.map(({ label, to }) => (
        <Link className={itemVariant()} to={to} key={to}>
          {label}
        </Link>
      ))}
    </div>
  );
}
