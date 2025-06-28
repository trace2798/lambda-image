// "use client";
// const OptimizeForm = ({}) => {
//   return (
//     <>
//       <div className="flex justify-center items-center px-[5vw] w-full max-w-6xl mx-auto">
//         OptimizeForm
//       </div>
//     </>
//   );
// };

// export default OptimizeForm;
"use client";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(50).optional(),
  userId: z.string(),
  content: z.string().optional(),
});

const OptimizeForm = ({ userId }: { userId: string }) => {
  // const router = useTransitionRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      userId: userId,
      content: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {}
  const isLoading = form.formState.isSubmitting;
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-6xl"
        >
          <div className="flex flex-col space-y-2">
            <Label className="text-2xl font-bold uppercase">
              Optimize Image
            </Label>
            <Label className="text-sm text-primary/80">
              Test the optimization functionality for free
            </Label>
            <Separator/>
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between">
                      <span>Name</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ed Sheeran 2025" {...field} />
                    </FormControl>
                    <FormDescription className="flex justify-between">
                      <span>This is your public title of the article</span>
                      <span className="text-primary/80">
                        {field.value.length}
                      </span>
                    </FormDescription>
                    <FormMessage className="text-red-600 p-1 border border-red-600 rounded-md text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="11th Feb - 13th Feb 2025 at Meghalaya"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Description of the article. This is optional for now.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button disabled={isLoading} type="submit">
            Create Post
          </Button>
        </form>
      </Form>
    </>
  );
};

export default OptimizeForm;
