import { createFileRoute } from "@tanstack/react-router";
import { listBlogMeta, listTag } from "@/bindings/sdk.gen";
import { ThemeSelector } from "@/components/ThemeSelector";

export const Route = createFileRoute("/blog/")({
  component: RouteComponent,
  loader: async () => {
    const { data } = await listTag({
      path: { all: true, pageIndex: 0, pageSize: 10, search: null },
    });
    const { data: metas } = await listBlogMeta({
      path: { all: true, pageIndex: 0, pageSize: 10, search: null },
    });

    return { data, metas };
  },
});

function RouteComponent() {
  const { data, metas } = Route.useLoaderData();
  return (
    <div>
      Hello "/blog/"!
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(metas, null, 2)}</pre>
      <ThemeSelector />
    </div>
  );
}
