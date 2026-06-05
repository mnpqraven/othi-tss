import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { type } from "arktype";
import { useMemo } from "react";
import { listBlogMetaOptions } from "@/bindings/@tanstack/react-query.gen";
import { TanstackTable, useTable } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { metaColumns } from "./-database/meta-columns";

const params = type({
  cat: type("'blog' | 'system'").default("blog"),
});

export const Route = createFileRoute("/admin/database")({
  component: RouteComponent,
  validateSearch: params,
});

const linkStyle = cn("rounded-md border p-4 underline hover:no-underline");

function RouteComponent() {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2">
        {(["blog", "system"] as const).map((cat) => (
          <Link className={linkStyle} key={cat} to="." search={{ cat }}>
            {cat}
          </Link>
        ))}
      </div>

      <ContentByTab />
    </div>
  );
}

function ContentByTab() {
  const params = Route.useSearch();

  switch (params.cat) {
    case "blog":
      return <BlogTab />;
    case "system":
      return "System tab";
  }
}

function BlogTab() {
  const query = useQuery(
    listBlogMetaOptions({
      path: { all: true, pageIndex: 0, pageSize: 25, search: "" },
    }),
  );
  const data = useMemo(() => query.data?.data || [], [query.data]);
  const table = useTable({
    data,
    columns: metaColumns,
  });

  return <TanstackTable table={table} />;
}
