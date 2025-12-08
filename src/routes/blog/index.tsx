import { createFileRoute } from "@tanstack/react-router";
import { listTag } from "@/bindings/sdk.gen";
import { ThemeSelector } from "@/components/ThemeSelector";

export const Route = createFileRoute("/blog/")({
  component: RouteComponent,
  loader: async () => {
    const { data } = await listTag({
      path: { all: true, pageIndex: 0, pageSize: 10, search: null },
    });

    return { data };
  },
});

function RouteComponent() {
  const { data } = Route.useLoaderData();
  return (
    <div>
      Hello "/blog/"!
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <ThemeSelector />
    </div>
  );
}
