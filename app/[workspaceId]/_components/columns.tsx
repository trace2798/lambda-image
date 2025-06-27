"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type Image = {
  id: string;
  publicId: string;
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
    cell: ({ row, getValue }) => {
      // getValue() === compressImageKey
      const key = getValue() as string;
      const { workspacePublicId, publicId } = row.original;

      const src = `https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/${workspacePublicId}/${publicId}/width=80,height=80`;

      // `https://upload-lambda-compress.s3.ap-south-1.amazonaws.com/${key}`;
      // https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/${workspacePublicId}/${image.publicId}/width=80,height=80
      // const url = `http://localhost:3001/image/qgGrRlgAtNYML3DLuez08/XxDAIvQzTZYvvQwkaqr1g/`
      return (
        <img
          src={src}
          alt="thumb"
          className="size-[80px] object-cover rounded"
        />
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
