"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NavigationMenuMain() {
  return (
    <>
      <div className="hidden md:flex z-[100]  items-center space-x-5">
        {/* <Link href={"/about"}>
          <Button variant={"ghost"} className="flex items-center">
            What it does
          </Button>
        </Link> */}
        <Link href={"/optimize"}>
          <Button variant={"ghost"} className="flex items-center">
            Optimize <span className="text-xs">(Free)</span>
          </Button>
        </Link>
        <Link href="/login">
          <Button variant={"outline"} className="">
            Login
          </Button>
        </Link>
      </div>
    </>
  );
}
