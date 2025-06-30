"use client";

import { HouseIcon, LayoutDashboardIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import Link from "next/link";

const SidebarHomeButton = ({}) => {
  const params = useParams();
  return (
    <>
      <Link href={`/${params.workspaceId}`} className="w-full">
        <Button variant={"outline"} className="h-8 w-full">
          <LayoutDashboardIcon /> Dashboard
        </Button>
      </Link>
    </>
  );
};

export default SidebarHomeButton;
