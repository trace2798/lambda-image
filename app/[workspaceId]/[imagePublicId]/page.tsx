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
  console.log("IMAGESSSSS", image);
  const originalImg = `https://upload-lambda-compress.s3.ap-south-1.amazonaws.com/${image?.originalImageKey}`;
  const compressedImg = `https://upload-lambda-compress.s3.ap-south-1.amazonaws.com/${image?.compressImageKey}`;
  const toMB = (bytes: number) => (bytes / 1_000_000).toFixed(2);
  return (
    <div className="flex flex-col w-full h-full space-y-10 max-w-5xl mx-auto">
      <div className="flex flex-col space-y-10">
        <div className="flex flex-col space-y-5">
          <Label className="text-2xl">Image Information</Label>
          <Separator />
        </div>
        <div className="grid grid-cols-3 gap-10">
          <Card>
            <CardHeader>
              <CardTitle>{toMB(image?.originalSize as number)} mb</CardTitle>
              <CardDescription>Original Image Size</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{toMB(image?.compressedSize as number)} mb</CardTitle>
              <CardDescription>Compressed Image Size</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                {`${image?.originalWidth}×${image?.originalHeight}`}
              </CardTitle>
              <CardDescription>Dimensions</CardDescription>
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
    </div>
  );
};

export default ImagePublicIdPage;
