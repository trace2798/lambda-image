interface WorkspaceIdIdPageProps {
  params: Promise<{ workspaceId: string }>;
}

const WorkspaceIdIdPage = async ({ params }: WorkspaceIdIdPageProps) => {
  const { workspaceId } = await params;
  return <div>{workspaceId} page</div>;
};

export default WorkspaceIdIdPage;
