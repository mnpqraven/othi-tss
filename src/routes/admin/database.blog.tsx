import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/database/blog')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/database/blog"!</div>
}
