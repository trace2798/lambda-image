import { Slider } from "@/components/slider";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import GenerateAltButton from "./_components/generate-alt-button";
import RegenerateAltButton from "./_components/regenerate -alt-button";
import { Button } from "@/components/ui/button";

interface ImagePublicIdPageProps {
  params: Promise<{ workspaceId: string; imagePublicId: string }>;
}

const ImagePublicIdPage = async ({ params }: ImagePublicIdPageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  const { workspaceId, imagePublicId } = await params;
  const workspaceInfo = await db.query.workspace.findFirst({
    where: (w, { eq }) => eq(w.id, workspaceId),
  });
  if (workspaceInfo?.userId !== session.user.id) {
    redirect("/login");
  }

  const image = await db.query.image.findFirst({
    where: (img, { eq }) => eq(img.publicId, imagePublicId),
  });
  if (!image || image === null) {
    redirect(`/${workspaceId}`);
  }
  console.log("IMAGESSSSS", image);
  const originalImg = `https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/${workspaceInfo.publicId}/${image.publicId}/og`;
  const compressedImg = `https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/${workspaceInfo.publicId}/${image.publicId}`;
  const toMB = (bytes: number) => (bytes / 1_000_000).toFixed(2);
  const savedBytes = image.originalSize! - image.compressedSize!;
  const savedPercent = ((savedBytes / image.originalSize!) * 100).toFixed(1);
  const onFlyUrl = `https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/${workspaceInfo.publicId}/${image.publicId}`;
  // const onFlyUrlLocal = `http://localhost:3001/image/${workspaceInfo.publicId}/${image.publicId}`;
  return (
    <div className="flex flex-col w-full h-full space-y-10 max-w-5xl mx-auto px-[5vw]">
      <div className="flex flex-col space-y-10">
        <div className="flex flex-col space-y-5">
          <Label className="text-2xl">Image Information</Label>
          <Separator />
          <div className="flex flex-col space-y-1">
            <div className="flex flex-col">
              <Label className="text-primary/80 text-sm">Dimension</Label>
              {`${image?.originalWidth}×${image?.originalHeight}`}
            </div>
            <Separator />
            <div className="flex flex-col truncate">
              <Label className="text-primary/80 text-sm">Original Image </Label>{" "}
              <p className="text-sm hover:cursor-pointer hover:text-indigo-400">
                <a href={originalImg} target="_blank">
                  {originalImg}
                </a>
              </p>
            </div>
            <div className="flex flex-col truncate">
              <Label className="text-primary/80 text-sm">Compressed Url </Label>{" "}
              <p className="text-sm hover:cursor-pointer hover:text-indigo-400">
                <a href={onFlyUrl} target="_blank">
                  {onFlyUrl}
                </a>
              </p>
            </div>
            <div className="flex flex-col">
              <Label className="text-primary/80 text-sm">
                Transformation Url{" "}
              </Label>{" "}
              <p className="text-sm hover:cursor-pointer hover:text-indigo-400">
                <span>Compressed url mentioned above</span>
                <span> + {"/transformation parameter"}</span>
              </p>
            </div>
            <div className="mt-3">
              <Button variant={"outline"} size={"sm"} className="">
                Generate url with AI
              </Button>
            </div>
          </div>
          <Separator />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <Card>
            <CardHeader>
              <CardTitle>{toMB(image?.originalSize as number)} mb</CardTitle>
              <CardDescription>Original Image Size</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                {toMB(savedBytes)} MB&nbsp;
                <span className="text-sm font-medium text-green-600">
                  ({savedPercent}%)
                </span>
              </CardTitle>
              <CardDescription>Size Reduction</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{toMB(image?.compressedSize as number)} mb</CardTitle>
              <CardDescription>Compressed Image Size</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="flex flex-col space-y-3 w-full max-w-4xl mx-auto pb-24">
          <Slider originalImage={originalImg} optimizedImage={compressedImg} />

          <div className="flex flex-col space-y-3 justify-center items-center">
            <p className="text-sm text-primary/70">
              {image?.alt || "You don't have alternate text for this image"}
            </p>

            {!image?.alt ? (
              <GenerateAltButton imagePublicId={imagePublicId} />
            ) : (
              <RegenerateAltButton
                imagePublicId={imagePublicId}
                currentAlt={image.alt}
              />
            )}
          </div>
        </div>
      </div>
      <img
        src={
          "http://localhost:3001/image/qgGrRlgAtNYML3DLuez08/XxDAIvQzTZYvvQwkaqr1g/format_avif,width=300&height=300,sharpen=2,grayscale"
        }
      />
    </div>
  );
};

export default ImagePublicIdPage;
