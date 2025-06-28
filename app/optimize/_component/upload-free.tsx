"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { useCallback, useEffect } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Trash, UploadCloud } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useCallback, useEffect, useState } from "react";
// import { FileWithPath, useDropzone } from "react-dropzone";
// import { toast } from "sonner";

// interface FileWithPreview extends FileWithPath {
//   preview: string;
// }

// interface InitialImageUploadProps {}

// export function ImageUploaderFree({}: InitialImageUploadProps) {
//   const [files, setFiles] = useState<FileWithPreview[]>([]);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(5);
//   const [uploadProgressIndex, setUploadProgressIndex] = useState<number>(1);
//   const router = useRouter();
//   const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
//     setFiles(
//       acceptedFiles.map((file) =>
//         Object.assign(file, {
//           preview: URL.createObjectURL(file),
//         })
//       )
//     );
//   }, []);

//   const removeFile = (file: File) => () => {
//     const newFiles = files.filter((f) => f !== file);
//     setFiles(newFiles);
//   };

//   const uploadFiles = async () => {
//     setUploading(true);
//     setUploadProgress(10);

//     for (const [index, file] of files.entries()) {
//       console.log("FIle", file);
//       setUploadProgressIndex(index);
//       setUploadProgress(20);
//       try {
//         setUploadProgress(35);
//         const presignRes = await fetch(
//           "https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/presign-free",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               filename: file.name,
//               contentType: file.type,
//             }),
//           }
//         );
//         console.log("Predefined call done");
//         if (!presignRes.ok) throw new Error("Failed to get presigned URL");
//         const { url: uploadUrl, key } = (await presignRes.json()) as {
//           url: string;
//           key: string;
//         };
//         console.log("GOT PREDEFINED URL");
//         setUploadProgress(50);
//         const uploadRes = await fetch(uploadUrl, {
//           method: "PUT",
//           headers: {
//             "Content-Type": file.type,
//           },
//           body: file,
//         });
//         if (!uploadRes.ok) throw new Error("S3 upload failed");

//         const publicUrl = `https://upload-lambda-compress.s3.ap-south-1.amazonaws.com/${key}`;
//         console.log("✅ Uploaded:", publicUrl);
//         console.log("KEY", key);

//         const compressRes = await fetch(
//           "https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/compress-free",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               key,
//             }),
//           }
//         );
//         console.log("Compress Res", compressRes);
//         toast.success(`Successfully uploaded ${file.name}`);
//       } catch (error) {
//         console.error("Upload error: ", error);
//         toast.error(`Failed to upload ${file.name}`);
//         console.error("Upload error: ", error);
//       }
//     }
//     setFiles([]);
//     setUploading(false);
//     router.refresh();
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     maxFiles: 2,
//     maxSize: 20 * 1024 * 1024,
//     accept: {
//       "image/*": [".png", ".jpeg", ".jpg", ".webp"],
//     },
//   });

//   const thumbs = files.map((file) => (
//     <div key={file.name} className={`w-full`}>
//       <div className="flex justify-evenly">
//         <img
//           className="size-[100px] object-cover"
//           src={file.preview}
//           alt={file.name}
//         />
//         <button onClick={removeFile(file)} className="text-red-400 size-5">
//           <Trash className="size-5" />
//         </button>
//       </div>
//     </div>
//   ));

//   useEffect(
//     () => () => {
//       files.forEach((file) => URL.revokeObjectURL(file.preview));
//     },
//     [files]
//   );
//   return (
//     <>
//       <Card
//         className="w-full h-32 flex flex-col items-center justify-center hover:cursor-pointer"
//         {...(!uploading && getRootProps())}
//       >
//         <>
//           {uploading ? (
//             <>
//               <div className="w-full flex flex-col justify-center items-center space-y-3 max-w-6xl">
//                 <h1 className="text-sm">
//                   {" "}
//                   <UploadCloud className="animate-bounce size-8" />
//                 </h1>
//                 <h2 className="text-sm text-slate-500">
//                   {" "}
//                   {`${
//                     uploadProgressIndex !== null ? uploadProgressIndex + 1 : 0
//                   }/${files.length}`}
//                 </h2>
//                 <Progress value={uploadProgress} className="w-full" />
//               </div>
//             </>
//           ) : (
//             <>
//               <input {...getInputProps()} typeof="image" />
//               <div className="flex flex-col items-center justify-center">
//                 <p className="text-base lg:text-lg ">
//                   Drag &apos;n&apos; drop image here
//                 </p>
//                 <Button variant="outline" className="mt-3">
//                   Or click to select files
//                 </Button>
//               </div>
//             </>
//           )}
//         </>
//       </Card>
//   {files && files.length > 0 && !uploading && (
//     <>
//       <Card className="w-full h-fit mt-3 flex p-5 items-center justify-between">
//         <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
//           {thumbs}
//         </div>
//       </Card>
//       <Button
//         variant="default"
//         onClick={uploadFiles}
//         className="mt-5 hover:cursor-pointer"
//         disabled={uploading}
//       >
//         Confirm and Upload Files
//       </Button>
//     </>
//   )}
//     </>
//   );
// }

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
    maxFiles: 2,
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
            <Button variant="outline" className="mt-3">
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
