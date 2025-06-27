import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { HouseIcon, ImageIcon } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import * as React from "react";
import { SelectWorkspace, Workspace } from "./select-workspace";
import SignOutButton from "./sign-out-button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import UserAccountNav from "./user-account-nav";
import { Button } from "./ui/button";
import SidebarHomeButton from "./sidebar-home-button";

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
  console.log(workspaces);
  if (!workspaces) {
    redirect("/onboard");
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-col">
        <div className="flex justify-center space-x-2 items-center">
          <ImageIcon className="size-5" />
          <p className="text-2xl ">Lambda Image</p>
        </div>
        <Separator />
        <Label className="text-primary/80">Current Workspace</Label>
        <SelectWorkspace workspaces={workspaces as Workspace[]} />
        <Separator />
      </SidebarHeader>
      <SidebarContent className="flex flex-col items-center">
        <SidebarHomeButton />
        {/* {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))} */}
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
