import { auth } from "@/lib/auth";
import SignUpForm from "./_components/sign-up-form";
import BgAuth from "../login/_components/bg-auth";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";

const Page = async ({}) => {
  const disableSignUp = auth.options.emailAndPassword.disableSignUp;
  //console.log("Validation", disableSignUp);
  return (
    <>
      <div className="flex flex-col w-full h-full min-h-screen justify-between items-center">
        <div className="absolute inset-0 -z-10 ">
          <BgAuth />
        </div>
        <div className="w-full">
          <Navbar />
        </div>
        <SignUpForm signUpDisabled={disableSignUp} />
        <Footer />
      </div>
    </>
  );
};

export default Page;
