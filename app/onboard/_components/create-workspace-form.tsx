"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { generate, count } from "random-words";
import { createWorkspace } from "@/app/actions";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Workspace Name mush be 3 characters long",
  }),
});

export default function CreateWorkspaceForm({
  currentUserId,
}: {
  currentUserId: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });
  const handleSignUp = async (e: React.FormEvent) => {
    setSubmitting(true);
    e.preventDefault();
    const response = await createWorkspace(
      currentUserId,
      form.getValues("title")
    );
    if (response.status === 200) {
      console.log("RESPONSE ID", response);
      console.log("Data:");
      toast.success("Workspace Created");
      setSubmitting(true);
      router.push(`/${response.id}`);
    }
  };

  const handleAutoWork = () => {
    const word = generate();
    form.setValue("title", word as string);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Create Workspace</CardTitle>
        <CardDescription>
          Create a workspace to easily group your images
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                disabled={submitting}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="vacation" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your desired workspace name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                onClick={() => handleAutoWork()}
                variant={"outline"}
                disabled={submitting}
                type="button"
                className="w-full hover:cursor-pointer"
              >
                Get Random Word
              </Button>
              <Button
                disabled={submitting}
                type="submit"
                className="w-full hover:cursor-pointer"
              >
                Create Workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
