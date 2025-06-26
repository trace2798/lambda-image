"use client";

import { addAltToImage } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { SparkleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const GenerateAltButton = ({ imagePublicId }: { imagePublicId: string }) => {
  const router = useRouter();
  const [altText, setAltText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleClick = async () => {
    setError("");
    setLoading(true);
    setAltText("");

    try {
      const res = await fetch("http://localhost:3001/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagePublicId }),
      });
      if (!res.ok || !res.body) {
        throw new Error(`API returned ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        if (!value) continue;
        const chunkText = decoder.decode(value, { stream: true });
        for (const line of chunkText.split(/\r?\n/)) {
          if (line.startsWith("data:")) {
            const textPiece = line.slice(6).trimEnd();
            setAltText((prev) => prev + textPiece);
          }
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAlt = async () => {
    const response = await addAltToImage(imagePublicId, altText);
    console.log("Response DB", response);
    router.refresh();
  };

  return (
    <>
      <div className="space-y-2 flex flex-col justify-center items-center">
        <Button
          variant="secondary"
          className="w-full max-w-[200px]"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            "Generating…"
          ) : (
            <>
              <SparkleIcon /> Generate Alt with AI
            </>
          )}
        </Button>

        {error && <p className="text-sm text-red-600">Error: {error}</p>}

        {altText && (
          <div className="flex flex-col justify-center space-y-3">
            <p className="mt-2 p-2 text-sm rounded border w-full max-w-4xl mx-auto ">
              {altText}
            </p>
            <Button
              variant={"outline"}
              className="w-full max-w-[200px]"
              onClick={() => handleSaveAlt()}
            >
              Save Alt
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default GenerateAltButton;
