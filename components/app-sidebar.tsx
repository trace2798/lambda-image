import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { ImageIcon } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import * as React from "react";
import { SelectWorkspace, Workspace } from "./select-workspace";
import SidebarAIImageButton from "./sidebar-ai-image-button";
import SidebarHomeButton from "./sidebar-home-button";
import SidebarImages from "./sidebar-images";
import SignOutButton from "./sign-out-button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import UserAccountNav from "./user-account-nav";
import Link from "next/link";
import { Button } from "./ui/button";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
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
  //console.log(workspaces);
  if (!workspaces) {
    redirect("/onboard");
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-col">
        <Link
          href={"/"}
          prefetch={false}
          className="hover:cursor-pointer hover:underline"
        >
          <div className="flex justify-center space-x-2 items-center">
            <div className="mt-1">
              <ImageIcon className="size-5" />
            </div>
            <p className="text-2xl ">Lambda Image</p>
          </div>
        </Link>

        <Separator />
        <Label className="text-primary/80">Current Workspace</Label>
        <SelectWorkspace workspaces={workspaces as Workspace[]} />
        <Button
          variant={"ghost"}
          size={"sm"}
          className="border text-primary/80 hover:text-primary"
        >
          <Link href={"/dashboard"}> + Create new Workspace</Link>
        </Button>
        <Separator />
      </SidebarHeader>
      <SidebarContent className="flex flex-col items-center pt-3 px-[1vw]">
        <SidebarHomeButton />
        <SidebarAIImageButton />
        <SidebarImages />
      </SidebarContent>
      <SidebarFooter>
        <UserAccountNav
          email={session.user.email}
          imageUrl={session.user.image as string}
          name={session.user.name}
        />
        <SignOutButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
