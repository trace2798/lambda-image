import { ImageUploader } from "@/components/image-uploader";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    toast.error("Oops...");
  }
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
        <Table>
          <TableCaption>A list of your recent images.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Image</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Public Id</TableHead>
              <TableHead className="">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <div className="size-[80px] border flex items-center justify-center">
                  A
                </div>
              </TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WorkspaceIdIdPage;
