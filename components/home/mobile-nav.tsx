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
                key={"home"}
                href={"/"}
                onOpenChange={setOpen}
                title="link to home page"
              >
                Home
              </MobileLink>
              <MobileLink
                key={"about"}
                href={"/about"}
                onOpenChange={setOpen}
                title="link to about page"
              >
                About
              </MobileLink>

              <MobileLink
                key={"team"}
                href={"/team"}
                onOpenChange={setOpen}
                title="link to team page"
              >
                Team
              </MobileLink>
              <MobileLink
                key={"publication"}
                href={"/publications"}
                onOpenChange={setOpen}
                title="link to publication page"
              >
                Publication
              </MobileLink>
              {/* <MobileLink
                key={"gallery"}
                href={"/gallery"}
                onOpenChange={setOpen}
              >
                Gallery
              </MobileLink> */}
              <MobileLink
                key={"news"}
                href={"/news"}
                onOpenChange={setOpen}
                title="link to news page"
              >
                News
              </MobileLink>
              {/* <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="p-0 border-none">
                    <Button variant={"ghost"}>Centers</Button>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-0 flex flex-col">
                    {centerOptions.map((item) => (
                      <MobileLink
                        key={item.title}
                        href={item.href}
                        onOpenChange={setOpen}
                      >
                        {item.title}
                      </MobileLink>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion> */}

              <MobileLink
                key={"contact"}
                href={"/contact"}
                onOpenChange={setOpen}
                title="link to contact us page"
              >
                Contact Us
              </MobileLink>
              <a href="https://www.kavikrishnalab.org/" target="_blank">
                <Button variant={"secondary"}>India Chapter</Button>
              </a>
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
