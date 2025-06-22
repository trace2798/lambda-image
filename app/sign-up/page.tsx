import { auth } from "@/lib/auth";
import SignUpForm from "./_components/sign-up-form";

const Page = async ({}) => {
  const disableSignUp = auth.options.emailAndPassword.disableSignUp;
  console.log("Validation", disableSignUp);
  return (
    <>
      <div className="w-full  h-screen flex justify-center items-center">
        <SignUpForm signUpDisabled={disableSignUp} />
      </div>
    </>
  );
};

export default Page;