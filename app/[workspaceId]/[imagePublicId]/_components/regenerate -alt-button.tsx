"use client";

import { addAltToImage } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SparkleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegenerateAltButton = ({
  imagePublicId,
  currentAlt,
}: {
  imagePublicId: string;
  currentAlt: string;
}) => {
  const router = useRouter();
  const [altText, setAltText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [instruction, setInstruction] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const handleRegenerateClick = () => {
    setError("");
    setAltText("");
    setInstruction("");
    setShowInput(true);
  };
  const handleSend = async () => {
    if (!instruction.trim()) {
      setError("Please enter an instruction");
      return;
    }
    setError("");
    setLoading(true);
    setAltText("");

    try {
      // const res = await fetch(
      //   "https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/generate-instruction",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ imagePublicId, instruction }),
      //   }
      // );
      //   if (!res.ok || !res.body) {
      //     throw new Error(`API returned ${res.status}`);
      //   }
      //   const reader = res.body.getReader();
      //   const decoder = new TextDecoder();
      //   let done = false;
      //   while (!done) {
      //     const { value, done: streamDone } = await reader.read();
      //     done = streamDone;
      //     if (!value) continue;
      //     const chunkText = decoder.decode(value, { stream: true });
      //     for (const line of chunkText.split(/\r?\n/)) {
      //       if (line.startsWith("data:")) {
      //         const textPiece = line.slice(6).trimEnd();
      //         setAltText((prev) => prev + textPiece);
      //       }
      //     }
      //   }
      const res = await fetch(
        "https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/generate-instruction",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imagePublicId, instruction }),
        }
      );

      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }
      const data = (await res.json()) as { altText?: string; error?: string };
      if (data.error) {
        setError(data.error);
      } else if (data.altText) {
        setAltText(data.altText);
      } else {
        setError("No alt text returned");
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
    setError("");
    setAltText("");
    setInstruction("");
    setShowInput(false);
  };

  return (
    <>
      <div className="space-y-2 flex flex-col justify-center items-center w-full">
        {!showInput && (
          <Button
            variant="secondary"
            className="w-full max-w-[200px]"
            onClick={handleRegenerateClick}
            disabled={loading}
          >
            {loading ? (
              "Generating…"
            ) : (
              <>
                <SparkleIcon /> Regenerate Alt
              </>
            )}
          </Button>
        )}

        {showInput && (
          <div className="w-full max-w-2xl mx-auto space-y-2 mt-10">
            <Textarea
              className="w-full border rounded p-2 h-24"
              placeholder="Enter instructions for the alt-text generation…"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              disabled={loading}
            />
            <Button
              variant="default"
              className="w-full max-w-[200px]"
              onClick={handleSend}
              disabled={loading}
            >
              {loading ? "Sending…" : "Send"}
            </Button>
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        {altText && (
          <div className="flex flex-col items-center space-y-3 w-full max-w-2xl">
            <p className="mt-2 p-2 text-sm rounded border w-full">{altText}</p>
            <Button
              variant="outline"
              className="w-full max-w-[200px]"
              onClick={handleSaveAlt}
            >
              Save Alt
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default RegenerateAltButton;
