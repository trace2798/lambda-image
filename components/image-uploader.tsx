"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trash, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { toast } from "sonner";

interface FileWithPreview extends FileWithPath {
  preview: string;
}

interface InitialImageUploadProps {
  workspaceId: string;
  collectionId: string;
  userId: string;
}

export function ImageUploader({
  workspaceId,
  collectionId,
  userId,
}: InitialImageUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(5);
  const [uploadProgressIndex, setUploadProgressIndex] = useState<number>(1);
  const router = useRouter();
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const removeFile = (file: File) => () => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
  };

  const uploadFiles = async () => {
    setUploading(true);
    setUploadProgress(10);

    for (const [index, file] of files.entries()) {
      console.log("FIle", file);
      setUploadProgressIndex(index);
      setUploadProgress(20);
      try {
        let dimensions = "";
        if (file.type.startsWith("image/")) {
          dimensions = await new Promise<string>((resolve) => {
            const imageUrl = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
              const dims = `${img.naturalWidth}x${img.naturalHeight}`;
              console.log(
                "Width:",
                img.naturalWidth,
                "Height:",
                img.naturalHeight
              );
              URL.revokeObjectURL(imageUrl);
              resolve(dims);
            };
            img.onerror = () => {
              URL.revokeObjectURL(imageUrl);
              resolve("");
            };
            img.src = imageUrl;
          });
        }
        setUploadProgress(35);
        const res = await fetch(
          "https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/upload",
          {
            method: "POST",
            headers: { "Content-Type": file.type },
            body: file,
          }
        );
        if (!res.ok) throw new Error("Upload failed");
        const { url, key } = await res.json();
        console.log("Uploaded:", "Url:", url, "Key:", key);
        toast.success(`Successfully uploaded ${file.name}`);
      } catch (error) {
        console.error("Upload error: ", error);
        toast.error(`Failed to upload ${file.name}`);
        console.error("Upload error: ", error);
      }
    }
    setFiles([]);
    setUploading(false);
    router.refresh();
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024,
    accept: {
      "image/*": [
        ".png",
        ".gif",
        ".jpeg",
        ".jpg",
        ".webp",
        ".svg",
        ".heic",
        ".heif",
      ],
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name} className={`w-full`}>
      <div className="flex justify-evenly">
        <img
          className="size-32 object-cover"
          src={file.preview}
          alt={file.name}
        />
        <button onClick={removeFile(file)} className="text-red-400 size-5">
          <Trash className="size-5" />
        </button>
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  return (
    <>
      <Card
        className="w-full h-32 flex flex-col items-center justify-center hover:cursor-pointer"
        {...(!uploading && getRootProps())}
      >
        <>
          {uploading ? (
            <>
              <div className="w-full flex flex-col justify-center items-center space-y-3 max-w-6xl">
                <h1 className="text-sm">
                  {" "}
                  <UploadCloud className="animate-bounce size-8" />
                </h1>
                <h2 className="text-sm text-slate-500">
                  {" "}
                  {`${
                    uploadProgressIndex !== null ? uploadProgressIndex + 1 : 0
                  }/${files.length}`}
                </h2>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            </>
          ) : (
            <>
              <input {...getInputProps()} typeof="image" />
              <div className="flex flex-col items-center justify-center">
                <p className="text-base lg:text-lg ">
                  Drag &apos;n&apos; drop image here
                </p>
                <Button variant="outline" className="mt-3">
                  Or click to select files
                </Button>
              </div>
            </>
          )}
        </>
      </Card>
      {files && files.length > 0 && !uploading && (
        <>
          <Card className="w-full h-fit mt-3 flex p-5 items-center justify-between">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {thumbs}
            </div>
          </Card>
          <Button
            variant="default"
            onClick={uploadFiles}
            className="mt-5 hover:cursor-pointer"
            disabled={uploading}
          >
            Confirm and Upload Files
          </Button>
        </>
      )}
    </>
  );
}
