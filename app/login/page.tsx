import { auth } from "@/lib/auth";
import LoginForm from "./_components/login-form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BgAuth from "./_components/bg-auth";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";

const Page = async ({}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <div className="flex flex-col w-full h-full min-h-screen justify-between items-center">
        <div className="absolute inset-0 -z-10 ">
          <BgAuth />
        </div>
        <div className="w-full">
          <Navbar />
        </div>
        <LoginForm />
        <Footer />
      </div>
    </>
  );
};

export default Page;
