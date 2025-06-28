import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import OptimizeForm from "./_component/optimize-form";

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen justify-between">
      <Navbar />
      <div className="flex w-full justify-center h-full min-h-[80vh]  px-[5vw]">
        <OptimizeForm />
      </div>
      <Footer />
    </div>
  );
}
