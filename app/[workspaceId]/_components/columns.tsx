"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export type Image = {
  id: string;
  publicId: string;
  alt: string | null;
  originalImageKey: string;
  compressImageKey: string;
  originalWidth: number;
  originalHeight: number;
  originalSize: number;
  compressedSize: number;
  createdAt: string;
  workspacePublicId: string;
};

export const columns: ColumnDef<Image>[] = [
  {
    id: "thumbnail",
    header: "Thumbnail",
    accessorKey: "compressImageKey",
    cell: ({ row }) => {
      const { workspacePublicId, publicId, alt } = row.original;
      const src = `https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/${workspacePublicId}/${publicId}/width=80,height=80`;
      const hoverSrc = `https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/${workspacePublicId}/${publicId}/width=200,height=200`;
      return (
        <HoverCard>
          <HoverCardTrigger>
            {" "}
            <img
              src={src}
              alt={alt || ""}
              className="size-[80px] object-cover rounded"
            />
          </HoverCardTrigger>
          <HoverCardContent className="p-0 size-[200px]">
            <img src={hoverSrc} alt={alt || "alt not generated until now"} />
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    id: "publicId",
    accessorKey: "publicId",
    header: "Public ID",
  },
  {
    id: "metadata",
    header: "Metadata",
    cell: ({ row }) => {
      const image = row.original;
      const toMB = (bytes: number) => (bytes / 1_000_000).toFixed(2);
      return (
        <div className="space-y-1 text-sm">
          <div>
            <span className="text-xs text-primary/80">Dimensions:</span>{" "}
            {image.originalWidth}×{image.originalHeight}
          </div>
          <div>
            <span className="text-xs text-primary/80">Original:</span>{" "}
            {toMB(image.originalSize)} MB
          </div>
          <div>
            <span className="text-xs text-primary/80">Compressed:</span>{" "}
            {toMB(image.compressedSize)} MB
          </div>
        </div>
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Uploaded On",
    cell: ({ getValue }) => {
      const raw = getValue() as string;
      const dt = new Date(raw);
      return format(dt, "MMMM d, yyyy");
    },
  },
];
