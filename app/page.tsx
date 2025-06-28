import HeroMessage from "@/components/home/hero-message";
import Navbar from "@/components/home/navbar";

export default async function Home() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen justify-between">
      <div className="absolute inset-0 -z-10 ">
         <img
          // src="https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/qgGrRlgAtNYML3DLuez08/PRUCIodOQTxtF0_CnNCGA"
          src="https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/qgGrRlgAtNYML3DLuez08/AO8uzgsAOttsUxZS5qTTX/w=400"
          className="w-full h-full flex md:hidden"
        />
        <img
          // src="https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/qgGrRlgAtNYML3DLuez08/PRUCIodOQTxtF0_CnNCGA"
          src="https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/qgGrRlgAtNYML3DLuez08/AO8uzgsAOttsUxZS5qTTX"
          className="w-full h-full hidden md:flex"
        />
      </div>
      <Navbar />
      <HeroMessage />
      <footer className="flex flex-col space-y-5 md:flex-row md:space-y-0 justify-between px-[5vw] py-3 items-center">
        <div className="flex flex-col text-primary/70">
          <p>Lambda Images is my submission for Aws Lambda Hackathon, 2025</p>
          <p>Hosted on Devpost</p>
        </div>
        <div>Github</div>
      </footer>
    </div>
  );
}

// aws logs tail "/aws/amplify/d2k7qje6c3xraz" --log-stream-name-prefix "master" --since 5m --follow --region ap-south-1
