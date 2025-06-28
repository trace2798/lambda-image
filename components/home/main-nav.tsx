"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";

export function NavigationMenuMain() {
  return (
    <>
      <div className="hidden md:flex z-[100]  items-center space-x-5">
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
