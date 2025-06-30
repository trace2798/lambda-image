"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { useCallback, useEffect } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
interface FileWithPreview extends FileWithPath {
  preview: string;
}

export function ImageUploaderFree({
  files,
  onFilesChange,
}: {
  files: FileWithPreview[];
  onFilesChange: (files: FileWithPreview[]) => void;
}) {
  const onDrop = useCallback(
    (accepted: FileWithPath[]) => {
      const withPreview = accepted.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      onFilesChange(withPreview);
    },
    [onFilesChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024,
    accept: { "image/*": [".png", ".jpeg", ".jpg", ".webp"] },
  });
  const removeFile = (fileToRemove: FileWithPreview) => () => {
    onFilesChange(files.filter((f) => f !== fileToRemove));
  };

  const thumbs = files.map((file) => (
    <div key={file.name} className={`w-full`}>
      <div className="flex justify-evenly">
        <img
          className="size-[100px] object-cover"
          src={file.preview}
          alt={file.name}
        />
        <button onClick={removeFile(file)} className="text-red-400 size-5">
          <Trash className="size-5" />
        </button>
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((f) => URL.revokeObjectURL(f.preview));
  }, [files]);
  return (
    <Card
      {...getRootProps()}
      className="w-full h-32 flex items-center justify-center"
    >
      {files.length === 0 && (
        <>
          <input {...getInputProps()} typeof="image" />
          <div className="flex flex-col items-center justify-center">
            <p className="text-base lg:text-lg ">
              Drag &apos;n&apos; drop image here
            </p>
            <Button type="button" variant="outline" className="mt-3">
              Or click to select files
            </Button>
          </div>
        </>
      )}

      {files.length > 0 && (
        <>
          <Card className="w-full h-fit mt-3 flex p-5 items-center justify-between">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {thumbs}
            </div>
          </Card>
        </>
      )}
    </Card>
  );
}
