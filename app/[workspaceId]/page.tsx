import { ImageUploader } from "@/components/image-uploader";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { image } from "@/db/schema";
import { auth } from "@/lib/auth";
import { desc } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { columns, Image } from "./_components/columns";
import { DataTable } from "./_components/data-table";

interface WorkspaceIdIdPageProps {
  params: Promise<{ workspaceId: string }>;
}

const WorkspaceIdIdPage = async ({ params }: WorkspaceIdIdPageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  const { workspaceId } = await params;
  const workspaceInfo = await db.query.workspace.findFirst({
    where: (w, { eq }) => eq(w.id, workspaceId),
  });
  if (workspaceInfo?.userId !== session.user.id) {
    redirect("/login");
  }

  const rawImages = await db.query.image.findMany({
    where: (img, { eq }) => eq(img.workspaceId, workspaceId),
    orderBy: [desc(image?.createdAt)],
  });

  const images: Image[] = rawImages.map((row) => ({
    id: row.id,
    publicId: row.publicId,
    originalImageKey: row.originalImageKey!,
    compressImageKey: row.compressImageKey!,
    originalWidth: row.originalWidth!,
    originalHeight: row.originalHeight!,
    originalSize: row.originalSize!,
    compressedSize: row.compressedSize!,
    createdAt: row.createdAt.toISOString(),
    workspacePublicId: workspaceInfo.publicId,
  }));
  return (
    <div className="flex flex-col w-full h-full space-y-10 max-w-6xl mx-auto">
      <div className=" flex flex-col space-y-5">
        <Label className="text-primary/80">Add Images to this workspace</Label>
        <ImageUploader userId={session.user.id} workspaceId={workspaceId} />
        <Separator />
      </div>
      <div className="flex flex-col space-y-5">
        <Label>Images</Label>
        <div>
          <div className="flex flex-row space-x-10"></div>
        </div>
        <DataTable columns={columns} data={images as Image[]} />
      </div>
    </div>
  );
};

export default WorkspaceIdIdPage;

// https://upload-lambda-compress.s3.ap-south-1.amazonaws.com/a058047f-0d07-492c-b67d-4bdcd7fb0edb/1750930473134-9a4dab1c-71c6-4379-b21a-112d1670550a.webp

{
  /* <img
          src={
            "https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_200,w_200/r_max/f_auto/woman-blackdress-stairs.png"
          }
        /> */
}
