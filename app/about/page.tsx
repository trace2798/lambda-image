import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";

export default function About() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen justify-between px-[5vw]">
      <Navbar />
      <div className="w-full max-w-6xl mx-auto flex flex-col justify-center">
        <h1 className="text-6xl font-semibold">About</h1>
      </div>
      <Footer />
    </div>
  );
}
