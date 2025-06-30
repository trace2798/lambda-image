"use client";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { FC, useState } from "react";
import { NavigationMenuMain } from "./main-nav";
import MobileNavigation from "./mobile-nav";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous && latest > previous && latest > 0) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="sticky top-0 z-50 px-[4vw] py-3 flex items-center justify-between border-b border-muted/20 backdrop-blur-2xl"
      >
        <div className="flex items-center">
          <Link href={"/"} className="hover:text-indigo-400">
            <div className=" ml-3 flex flex-col font-satoshiBold">
              <p className="text-xl  max-[1400px]:text-[21px] min-[1400px]:text-3xl">
                Lambda Images
              </p>
            </div>
          </Link>
        </div>
        <div className="flex">
          <NavigationMenuMain />
        </div>
        <MobileNavigation />
      </motion.nav>
    </>
  );
};

export default Navbar;
