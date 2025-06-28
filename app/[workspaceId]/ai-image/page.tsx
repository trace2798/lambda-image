import { ImageTabs } from "./_components/image-tabs";

const Page = async ({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) => {
  const { workspaceId } = await params;
  return (
    <>
      <div className="flex flex-col w-full h-full space-y-10 max-w-5xl mx-auto px-[5vw]">
        <ImageTabs workspaceId={workspaceId} />
      </div>
    </>
  );
};

export default Page;
