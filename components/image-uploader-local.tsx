"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { toast } from "sonner";

interface UploadResponse {
  key: string;
  url: string;
}

export function ImageUploaderLocal() {
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [compressing, setCompressing] = useState(false);

  const onDrop = useCallback((files: FileWithPath[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setOriginalUrl(null);
      setCompressedUrl(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  useEffect(() => {
    if (!file) return;

    (async () => {
      setUploading(true);
      try {
        // 1) Build FormData
        const formData = new FormData();
        formData.append("file", file);

        // const res = await fetch("http://localhost:3000/upload", {
        //   method: "POST",
        //   body: formData,
        // });
        const presignRes = await fetch("http://localhost:3000/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
          }),
        });
        console.log("GOT PRESIGN URL");
        if (!presignRes.ok) {
          throw new Error(`Presign failed: ${presignRes.status}`);
        }
        const { key, url } = (await presignRes.json()) as any;
        console.log("pre sign url:", url);
        console.log("WILL START UPLOADING");
        const uploadRes = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });
        console.log("UPLOAD DONE");
        if (!uploadRes.ok) {
          throw new Error(`S3 PUT failed: ${uploadRes.status}`);
        }
        const publicUrl = `https://upload-lambda-compress.s3.ap-south-1.amazonaws.com/${key}`;
        console.log("PUBLIC URL:", publicUrl);
        setOriginalUrl(publicUrl);
        toast.success("Image uploaded!");
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || "Something went wrong");
      } finally {
        setUploading(false);
        setCompressing(false);
      }
    })();
  }, [file]);

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-md text-center cursor-pointer
          ${isDragActive ? "border-blue-500" : "border-gray-300"}
          ${uploading || compressing ? "opacity-50 pointer-events-none" : ""}`}
      >
        <input {...getInputProps()} />
        {file ? (
          <p>Selected: {file.name}</p>
        ) : (
          <p>Drag & drop an image here, or click to select one</p>
        )}
      </div>

      {(originalUrl || compressedUrl) && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <h3 className="mb-2 font-semibold">Original</h3>
            {originalUrl ? (
              <img
                src={originalUrl}
                alt="Original"
                className="max-w-full max-h-64 object-contain rounded"
              />
            ) : (
              <p className="text-sm text-gray-500">
                {uploading ? "Uploading…" : "Ready"}
              </p>
            )}
          </div>

          {/* Compressed */}
          <div className="flex flex-col items-center">
            <h3 className="mb-2 font-semibold">Compressed</h3>
            {compressing ? (
              <p className="text-sm text-gray-500">Compressing…</p>
            ) : compressedUrl ? (
              <img
                src={compressedUrl}
                alt="Compressed"
                className="max-w-full max-h-64 object-contain rounded"
              />
            ) : (
              <p className="text-sm text-gray-500">Pending</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
