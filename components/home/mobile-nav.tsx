"use client";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MobileNavigationProps {}

const MobileNavigation: FC<MobileNavigationProps> = ({}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger aria-label="Menu Open Button" className="flex md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent side="right" className="w-[90vw] p-5">
          <div className="flex flex-col items-start mt-5">
            <Link
              title="link to home page"
              aria-label="link to home page"
              href={"/"}
              className="hover:text-indigo-400"
            >
              <div className=" text-lg flex flex-col">
                <p className="text-xl">Lambda Images</p>
              </div>
            </Link>
          </div>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
            <div className="flex flex-col space-y-3">
              <MobileLink
                key={"optimize"}
                href={"/optimize"}
                onOpenChange={setOpen}
                title="link to free optimize page"
              >
                Optimize <span className="text-xs">(Free)</span>
              </MobileLink>
              <MobileLink
                key={"login"}
                href={"/login"}
                onOpenChange={setOpen}
                title="link to login page"
              >
                Login
              </MobileLink>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNavigation;

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  title: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  title,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      title={title}
      aria-label={title}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      <Button variant="ghost">{children}</Button>
    </Link>
  );
}
