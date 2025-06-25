"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

const SignOutButton = ({}) => {
  const router = useRouter();
  const handleSignOut = async () => {
    const loadingToastId = toast.loading("Signing out...");
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          // toast.loading("Signing out...");
        },
        onSuccess: () => {
          toast.dismiss(loadingToastId);
          toast.success("Signed out successfully");
          router.push("/");
        },
        onError: () => {
          toast.dismiss(loadingToastId);
          toast.error("Something went wrong. Try Again");
        },
      },
    });
  };
  return (
    <>
      <div>
        <Button
          size={"sm"}
          variant={"secondary"}
          onClick={() => handleSignOut()}
          className="w-full"
        >
          <LogOutIcon /> Sign Out
        </Button>
      </div>
    </>
  );
};

export default SignOutButton;
