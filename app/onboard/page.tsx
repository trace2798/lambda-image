import { auth } from "@/lib/auth";
import CreateWorkspaceForm from "./_components/create-workspace-form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async ({}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <div className="absolute inset-0 flex flex-1 flex-col w-full min-h-screen max-h-[100dvh] bg-zinc-800 items-center justify-center space-y-5">
        <CreateWorkspaceForm currentUserId={session.user.id} />
      </div>
    </>
  );
};

export default Page;
