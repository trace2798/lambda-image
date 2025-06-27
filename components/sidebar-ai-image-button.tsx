"use client";

import { ImageUpIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";

const SidebarAIImageButton = ({}) => {
  const params = useParams();
  return (
    <>
      <Link href={`/${params.workspaceId}/ai-image`} className="w-full">
        <Button variant={"outline"} className="h-8 w-full">
          <ImageUpIcon /> AI Image
        </Button>
      </Link>
    </>
  );
};

export default SidebarAIImageButton;
