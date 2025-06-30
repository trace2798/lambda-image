"use client";
import { useState } from "react";
import { SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

export function ImageTabs({ workspaceId }: { workspaceId: string }) {
  const [query, setQuery] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, workspaceId }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const { images } = await res.json();
      const base64 = images[0];
      setImageData(`data:image/png;base64,${base64}`);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="text-to-image">
        <TabsList>
          <TabsTrigger value="text-to-image" className="hover:cursor-pointer">
            Text to Image
          </TabsTrigger>
          <TabsTrigger value="image-to-image" className="hover:cursor-pointer">
            Image to Image
          </TabsTrigger>
        </TabsList>
        <TabsContent value="text-to-image" className="px-0">
          <Card className="bg-transparent border-none">
            <CardHeader className="p-0">
              <CardTitle>Text to Image Generate</CardTitle>
              <CardDescription>
                Generate Image by using text prompt
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 p-0">
              <div className="grid gap-3">
                <Textarea
                  placeholder="Type your prompt here."
                  value={query}
                  onChange={(e) => setQuery(e.currentTarget.value)}
                  disabled={loading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end p-0">
              <Button
                variant={"secondary"}
                onClick={handleGenerate}
                disabled={loading}
              >
                <SparklesIcon />
                Generate Image
              </Button>
              {error && <p className="text-sm text-red-600">Error: {error}</p>}
            </CardFooter>
          </Card>
          <div className="w-full flex justify-center items-center">
            {loading && (
              <div className="flex flex-col space-y-3">
                <div className="text-center animate-pulse">
                  Image Generating
                </div>
                <Skeleton className="size-86" />
              </div>
            )}

            {imageData && (
              <img
                src={imageData}
                alt="Generated result"
                style={{ maxWidth: "100%", borderRadius: 8 }}
              />
            )}
          </div>
        </TabsContent>
        <TabsContent value="image-to-image">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
