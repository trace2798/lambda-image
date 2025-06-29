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
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { CircleQuestionMarkIcon } from "lucide-react";

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
            {/* <div className="flex flex-col">
              <Label className="text-primary/80 text-sm">Dimension</Label>
              {`${image?.originalWidth}×${image?.originalHeight}`}
            </div> */}
            <Separator />
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col truncate">
                <Label className="text-primary/80 text-sm">
                  Original Image{" "}
                </Label>{" "}
                <p className="text-sm hover:cursor-pointer hover:text-indigo-400">
                  <a href={originalImg} target="_blank">
                    {originalImg}
                  </a>
                </p>
              </div>
              <div className="flex flex-col truncate">
                <Label className="text-primary/80 text-sm">
                  Compressed Url{" "}
                </Label>{" "}
                <p className="text-sm hover:cursor-pointer hover:text-indigo-400">
                  <a href={onFlyUrl} target="_blank">
                    {onFlyUrl}
                  </a>
                </p>
              </div>
              <div className="flex flex-col">
                <Label className="text-primary/80 text-sm">
                  Transformation Url{" "}
                  <HoverCard>
                    <HoverCardTrigger>
                      <CircleQuestionMarkIcon className="size-4" />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-full max-w-sm">
                      <h4 className="font-semibold mb-2">
                        Transform Parameters
                      </h4>
                      <em>
                        Separate multiple operations with a comma <code>,</code>{" "}
                        or ampersand <code>&amp;</code>
                      </em>
                      <ul className="list-disc pl-4 space-y-1 text-sm">
                        <li>
                          <code>grayscale</code> — apply grayscale filter
                        </li>
                        <li>
                          <code>format=&lt;avif|webp|jpg|jpeg|png&gt;</code>
                        </li>
                        <li>
                          <code>w=&lt;number&gt;</code> or{" "}
                          <code>width=&lt;number&gt;</code> — set width
                        </li>
                        <li>
                          <code>h=&lt;number&gt;</code> or{" "}
                          <code>height=&lt;number&gt;</code> — set height
                        </li>
                        <li>
                          <code>
                            crop=&lt;cover|contain|fill|inside|outside&gt;
                          </code>
                        </li>
                        <li>
                          <code>
                            gravity=&lt;north|northeast|east|southeast|south|southwest|west|northwest|center|centre&gt;
                          </code>
                        </li>
                        <li>
                          <code>blur=&lt;sigma&gt;</code> — Gaussian blur
                        </li>
                        <li>
                          <code>sharpen=&lt;sigma&gt;</code>
                        </li>
                      </ul>

                      <h5 className="font-semibold mt-4 mb-1">Examples</h5>
                      <ul className="list-decimal pl-4 space-y-1 text-sm">
                        <li>
                          <code>compressedUrl/w=300,h=200,format=webp</code>
                          <br />
                          Resize to 300×200px and output as WebP.
                        </li>
                        <li>
                          <code>
                            compressedUrl/crop=cover&amp;gravity=center&amp;format=jpg
                          </code>
                          <br />
                          Crop to fill container, center focus, JPEG format.
                        </li>
                        <li>
                          <code>
                            compressedUrl/grayscale,blur=2.5,sharpen=1.0
                          </code>
                          <br />
                          Apply grayscale, blur with σ=2.5, then sharpen with
                          σ=1.0.
                        </li>
                      </ul>
                    </HoverCardContent>
                  </HoverCard>
                </Label>{" "}
                <p className="text-sm">
                  <span>Compressed url mentioned above</span>
                  <span> + {"/transformation parameter"}</span>
                </p>
              </div>
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
      {/* <img
        src={
          "http://localhost:3001/image/qgGrRlgAtNYML3DLuez08/LFxLWRpo8CSp39hcp5nlJ/format_avif,width=300&height=300,sharpen=2,grayscale"
        }
      /> */}
    </div>
  );
};

export default ImagePublicIdPage;
