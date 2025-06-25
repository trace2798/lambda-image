import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface WorkspaceIdIdPageProps {
  params: Promise<{ workspaceId: string }>;
}

const WorkspaceIdIdPage = async ({ params }: WorkspaceIdIdPageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  const { workspaceId } = await params;
  const workspaceInfo = await db.query.workspace.findFirst({
    where: (w, { eq }) => eq(w.id, workspaceId),
  });
  if (workspaceInfo?.userId !== session.user.id) {
    toast.error("Oops...");
  }
  return <div>{workspaceId} page</div>;
};

export default WorkspaceIdIdPage;
