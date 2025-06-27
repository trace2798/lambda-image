"use client";

import { HouseIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import Link from "next/link";

const SidebarHomeButton = ({}) => {
  const params = useParams();
  return (
    <>
      <Link href={`/${params.workspaceId}`}>
        <Button variant={"outline"} className="h-6 max-w-[100px]">
          <HouseIcon /> Home
        </Button>
      </Link>
    </>
  );
};

export default SidebarHomeButton;
