import { FC } from "react";
import { TabsDemo } from "./_components/tabs-demo";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <>
      <div className="flex flex-col w-full h-full space-y-10 max-w-5xl mx-auto px-[5vw]">
        <TabsDemo/>
      </div>
    </>
  );
};

export default Page;
