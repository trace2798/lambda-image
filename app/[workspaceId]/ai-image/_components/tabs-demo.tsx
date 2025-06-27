import { AppWindowIcon, CodeIcon, SparklesIcon } from "lucide-react";

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

export function TabsDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="text-to-image" className="hover:cursor-pointer">
            Text to Image
          </TabsTrigger>
          <TabsTrigger value="image-to-image" className="hover:cursor-pointer">
            Image to Image
          </TabsTrigger>
        </TabsList>
        <TabsContent value="text-to-image">
          <Card>
            <CardHeader>
              <CardTitle>Text to Image Generate</CardTitle>
              <CardDescription>
                Generate Image by using text prompt
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Textarea placeholder="Type your prompt here." />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant={"secondary"}>
                <SparklesIcon />
                Generate Image
              </Button>
            </CardFooter>
          </Card>
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
