// "use client";

// import { Markdown } from "@/components/markdown";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Textarea } from "@/components/ui/textarea";
// import { sanitizeText } from "@/lib/utils";
// import { useState } from "react";

// const AskAI = ({
//   baseUrl,
//   dimensions,
// }: {
//   baseUrl: string;
//   dimensions: string;
// }) => {
//   const [query, setQuery] = useState("");
//   const [aiResponse, setAIResponse] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const handleGenerate = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await fetch(
//         "https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/generate-url",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ query, baseUrl, dimensions }),
//         }
//       );
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();
//       console.log("AI URL RESPONSE data:", data);
//       setAIResponse(data.aiResponse);
//     } catch (err: any) {
//       setError(err.message || "Unknown error");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <>
//       <div>
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button variant={"outline"} size={"sm"} className="">
//               Generate url with AI
//             </Button>
//           </SheetTrigger>
//           <SheetContent className="w-[50vh]">
//             <SheetHeader>
//               <SheetTitle>Ask AI</SheetTitle>
//               <SheetDescription>
//                 Generate transformation url using AI
//               </SheetDescription>
//             </SheetHeader>
//             <div className="px-4 py-2 space-y-2">
//               <ScrollArea className="h-[70vh] w-[350px] rounded-md border p-4">
//                 <div>
//                   <p>
//                     <span className="text-sm text-primary/80">
//                       Your Query:{" "}
//                     </span>
//                     {query || (
//                       "<em>(nothing yet)</em>}"
//                     )}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="mt-2">
//                     <span className="text-sm text-primary/80">
//                       AI Response{" "}
//                     </span>
//                     {loading ? (
//    <div className="flex flex-col text-center">
//     <Skeleton className="w-full h-5" />
//     <p className="animate-pulse py-1">Generating answer</p>
//     <Skeleton className="w-full h-5" />
//   </div>
//                     ) : error ? (
//                       `Something went wrong sorry. Try again.`
//                     ) : (
//                       aiResponse && (
//                         <Markdown>{sanitizeText(aiResponse)}</Markdown>
//                       )
//                     )}
//                   </p>
//                 </div>
//               </ScrollArea>
//             </div>
//             {/* <div className="px-4 py-2 space-y-2">

//             </div> */}
//             <SheetFooter>
//               <Textarea
//                 placeholder="Explain your expected transformation"
//                 value={query}
//                 onChange={(e) => setQuery(e.currentTarget.value)}
//               />
//               <Button
//                 variant={"outline"}
//                 type="submit"
//                 onClick={handleGenerate}
//               >
//                 Ask AI
//               </Button>
//             </SheetFooter>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </>
//   );
// };

// export default AskAI;
"use client";

import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sanitizeText } from "@/lib/utils";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const AskAI = ({
  baseUrl,
  dimensions,
}: {
  baseUrl: string;
  dimensions: string;
}) => {
  const [userInput, setUserInput] = useState("");
  const [query, setQuery] = useState("");
  const [aiResponse, setAIResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setQuery(userInput);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/generate-url",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, baseUrl, dimensions }),
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAIResponse(data.aiResponse);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) {
          setQuery("");
          setAIResponse(null);
        }
      }}
    >
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          Generate url with AI
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[50vh]">
        <SheetHeader>
          <SheetTitle>Ask AI</SheetTitle>
          <SheetDescription>
            Generate a transformation URL using AI
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 py-2 space-y-4">
          <ScrollArea className="h-[60vh] w-[350px] rounded-md border p-4">
            {!query && (
              <div className="flex flex-col space-y-3 justify-center h-fill">
                <p>
                  Hello, I am an AI helper to help you generate transformation
                  url so that image can be optimized on the fly.
                </p>
                <p>
                  To get the best results, describe what you want in plain
                  language—​for example “grayscale, width 300, crop to cover.”
                  You can also say things like “make a mobile‐friendly
                  thumbnail” and I’ll pick the right settings for you. No need
                  to know the exact syntax—I’ll normalize and validate
                  everything, and warn you if you ask for something unsupported.
                </p>
              </div>
            )}
            <div>
              {query && (
                <p>
                  <span className="text-sm text-primary/80">Your Query: </span>
                  {query}
                </p>
              )}
            </div>
            <div className="mt-4">
              {loading && (
                <div>
                  <span className="text-sm text-primary/80">AI Response: </span>
                  <div className="flex flex-col text-center">
                    <Skeleton className="w-full h-5" />
                    <p className="animate-pulse py-1">Generating answer</p>
                    <Skeleton className="w-full h-5" />
                  </div>
                </div>
              )}
              {aiResponse && <Markdown>{sanitizeText(aiResponse)}</Markdown>}
            </div>
          </ScrollArea>
        </div>

        <SheetFooter className="flex-col space-y-2">
          <Textarea
            placeholder="Explain your expected transformation"
            value={userInput}
            onChange={(e) => setUserInput(e.currentTarget.value)}
          />
          <Button
            variant="outline"
            onClick={handleGenerate}
            disabled={loading || !query.trim()}
          >
            Ask AI
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AskAI;
