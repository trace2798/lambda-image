"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";

export type Workspace = {
  id: string;
  publicId: string;
  title: string;
  userId: string;
};
export function SelectWorkspace({ workspaces }: { workspaces: Workspace[] }) {
  const params = useParams();
  const router = useRouter();
  const [value, setValue] = React.useState(params.workspaceId ?? "");
  //console.log("PARAMS", params.workspaceId);
  return (
    <Select
      value={value as string}
      onValueChange={(val) => {
        setValue(val);
        router.push(`/${val}`);
      }}
    >
      <SelectTrigger className="w-full h-6 hover:cursor-pointer">
        <SelectValue placeholder="Select workspace" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Your Workspaces</SelectLabel>
          {workspaces.map((workspace) => (
            <SelectItem
              key={workspace.id}
              value={workspace.id}
              className="hover:cursor-pointer"
            >
              {workspace.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
