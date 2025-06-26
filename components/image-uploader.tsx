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
  userId: string;
  workspaceId: string;
}

export function ImageUploader({
  userId,
  workspaceId,
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
        // let dimensions = "";
        // if (file.type.startsWith("image/")) {
        //   dimensions = await new Promise<string>((resolve) => {
        //     const imageUrl = URL.createObjectURL(file);
        //     const img = new Image();
        //     img.onload = () => {
        //       const dims = `${img.naturalWidth}x${img.naturalHeight}`;
        //       console.log(
        //         "Width:",
        //         img.naturalWidth,
        //         "Height:",
        //         img.naturalHeight
        //       );
        //       URL.revokeObjectURL(imageUrl);
        //       resolve(dims);
        //     };
        //     img.onerror = () => {
        //       URL.revokeObjectURL(imageUrl);
        //       resolve("");
        //     };
        //     img.src = imageUrl;
        //   });
        // }
        setUploadProgress(35);
        const presignRes = await fetch(
          "https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/presign",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              filename: file.name,
              contentType: file.type,
              userId,
              workspaceId,
            }),
          }
        );
        console.log("Presifned call done")
        if (!presignRes.ok) throw new Error("Failed to get presigned URL");
        const { url: uploadUrl, key } = (await presignRes.json()) as {
          url: string;
          key: string;
        };
        console.log("GOT PREDEFINED URL");
        setUploadProgress(50);
        const uploadRes = await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });
        if (!uploadRes.ok) throw new Error("S3 upload failed");

        const publicUrl = `https://upload-lambda-compress.s3.ap-south-1.amazonaws.com/${key}`;
        console.log("✅ Uploaded:", publicUrl);
        console.log("KEY", key);

        const compressRes = await fetch(
          "https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/compress",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              key,
              workspaceId,
            }),
          }
        );
        console.log("Compress Res", compressRes);
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
    maxFiles: 5,
    maxSize: 100 * 1024 * 1024,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".webp"],
    },
  });

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

// "use client";

// import { useCallback, useEffect, useState } from "react";
// import { useDropzone, FileWithPath } from "react-dropzone";
// import { toast } from "sonner";

// interface UploadResponse {
//   key: string;
//   url: string;
// }

// export function ImageUploader() {
//   const [file, setFile] = useState<FileWithPath | null>(null);
//   const [originalUrl, setOriginalUrl] = useState<string | null>(null);
//   const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [compressing, setCompressing] = useState(false);

//   const onDrop = useCallback((files: FileWithPath[]) => {
//     if (files.length > 0) {
//       setFile(files[0]);
//       setOriginalUrl(null);
//       setCompressedUrl(null);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "image/*": [] },
//     maxFiles: 1,
//   });

//   useEffect(() => {
//     if (!file) return;

//     (async () => {
//       setUploading(true);
//       try {
//         // 1) Build FormData
//         const formData = new FormData();
//         formData.append("file", file);

//         const presignRes = await fetch(
//           "https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/presign",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               filename: file.name,
//               contentType: file.type,
//             }),
//           }
//         );
//         console.log("GOT PRESIGN URL");
//         if (!presignRes.ok) {
//           throw new Error(`Presign failed: ${presignRes.status}`);
//         }
//         const { key, url } = (await presignRes.json()) as any;
//         console.log("pre sign url:", url);
//         console.log("WILL START UPLOADING");
//         const uploadRes = await fetch(url, {
//           method: "PUT",
//           headers: {
//             "Content-Type": file.type,
//           },
//           body: file,
//         });
//         console.log("UPLOAD DONE");
//         if (!uploadRes.ok) {
//           throw new Error(`S3 PUT failed: ${uploadRes.status}`);
//         }
//         const publicUrl = `https://upload-lambda-compress.s3.ap-south-1.amazonaws.com/${key}`;
//         console.log("PUBLIC URL:", publicUrl);
//         setOriginalUrl(publicUrl);
//         toast.success("Image uploaded!");
//       } catch (err: any) {
//         console.error(err);
//         toast.error(err.message || "Something went wrong");
//       } finally {
//         setUploading(false);
//         setCompressing(false);
//       }
//     })();
//   }, [file]);

//   return (
//     <div className="space-y-6">
//       {/* Dropzone */}
//       <div
//         {...getRootProps()}
//         className={`p-8 border-2 border-dashed rounded-md text-center cursor-pointer
//           ${isDragActive ? "border-blue-500" : "border-gray-300"}
//           ${uploading || compressing ? "opacity-50 pointer-events-none" : ""}`}
//       >
//         <input {...getInputProps()} />
//         {file ? (
//           <p>Selected: {file.name}</p>
//         ) : (
//           <p>Drag & drop an image here, or click to select one</p>
//         )}
//       </div>

//       {/* Previews */}
//       {(originalUrl || compressedUrl) && (
//         <div className="grid grid-cols-2 gap-4">
//           {/* Original */}
//           <div className="flex flex-col items-center">
//             <h3 className="mb-2 font-semibold">Original</h3>
//             {originalUrl ? (
//               <img
//                 src={originalUrl}
//                 alt="Original"
//                 className="max-w-full max-h-64 object-contain rounded"
//               />
//             ) : (
//               <p className="text-sm text-gray-500">
//                 {uploading ? "Uploading…" : "Ready"}
//               </p>
//             )}
//           </div>

//           {/* Compressed */}
//           <div className="flex flex-col items-center">
//             <h3 className="mb-2 font-semibold">Compressed</h3>
//             {compressing ? (
//               <p className="text-sm text-gray-500">Compressing…</p>
//             ) : compressedUrl ? (
//               <img
//                 src={compressedUrl}
//                 alt="Compressed"
//                 className="max-w-full max-h-64 object-contain rounded"
//               />
//             ) : (
//               <p className="text-sm text-gray-500">Pending</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
