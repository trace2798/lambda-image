import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <>
      <footer className="flex flex-col space-y-5 md:flex-row md:space-y-0 justify-between px-[5vw] py-3 items-center border-t">
        <div className="flex flex-col text-primary/70">
          <p>Lambda Images is my submission for Aws Lambda Hackathon, 2025</p>
          <p>Hosted on Devpost</p>
        </div>
        <div className="hover:cursor-pointer hover:text-indigo-400">
          <a href="https://github.com/trace2798/lambda-image" target="_blank">
            Github
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
