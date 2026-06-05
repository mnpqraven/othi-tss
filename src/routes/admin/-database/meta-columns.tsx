import { createColumnHelper } from "@tanstack/react-table";
import type { BlogMeta } from "@/bindings";

const col = createColumnHelper<BlogMeta>();

export const metaColumns = [
  col.accessor("id", { id: "id", header: "id" }),
  col.accessor("isPublish", { id: "isPublish", header: "isPublish" }),
  col.accessor("title", { id: "title", header: "title" }),
  col.accessor("createdAt", {
    id: "createdAt",
    header: "createdAt",
    cell: ({ getValue }) => new Date(getValue()).toLocaleString(),
  }),
  col.accessor("updatedAt", {
    id: "updatedAt",
    header: "updatedAt",
    cell: ({ getValue }) => new Date(getValue()).toLocaleString(),
  }),
];
