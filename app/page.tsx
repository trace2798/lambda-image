import BgImage from "@/components/home/bg-image";
import Footer from "@/components/home/footer";
import HeroMessage from "@/components/home/hero-message";
import Navbar from "@/components/home/navbar";

export default async function Home() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen justify-between">
      <div className="absolute inset-0 -z-10 ">
        <BgImage />
      </div>
      <Navbar />
      <HeroMessage />
      <Footer />
    </div>
  );
}

// aws logs tail "/aws/amplify/d2k7qje6c3xraz" --log-stream-name-prefix "master" --since 5m --follow --region ap-south-1
