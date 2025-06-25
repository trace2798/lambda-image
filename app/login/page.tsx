import { auth } from "@/lib/auth";
import LoginForm from "./_components/login-form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async ({}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if(session){
    redirect("/dashboard")
  }
  return (
    <>
      <div className="w-full flex h-screen justify-center items-center">
        <LoginForm />
      </div>
    </>
  );
};

export default Page;
