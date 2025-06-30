import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreateWorkspaceDialog } from "./_components/create-workspace-dialog";

const Page = async ({}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  const workspaces = await db.query.workspace.findMany({
    where: (w, { eq }) => eq(w.userId, session.user.id),
    orderBy: (w, { asc }) => asc(w.createdAt),
  });
  //console.log("WORKSPACE:", workspaces);
  if (workspaces.length === 0) {
    redirect("/onboard");
  }
  return (
    <>
      <div className="absolute inset-0 flex flex-1 flex-col w-full min-h-screen max-h-[100dvh] bg-zinc-800 items-center justify-center space-y-5">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Your Workspaces</CardTitle>
            <CardDescription>
              List of workspaces you have created
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 hover:cursor-pointer ">
            {workspaces.map((workspace) => (
              <a
                key={workspace.id}
                href={`/${workspace.id}`}
                className="flex flex-col border p-3 rounded-md hover:bg-accent"
              >
                <div className="">
                  <div className="">{workspace.title}</div>
                </div>
              </a>
            ))}
          </CardContent>
          <CardFooter className="w-full flex justify-center">
            <CreateWorkspaceDialog currentUserId={session.user.id} />
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Page;
