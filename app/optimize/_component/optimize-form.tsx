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
import { ImageUploaderFree } from "./upload-free";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { FileWithPath } from "react-dropzone";
import { toast } from "sonner";

const formSchema = z.object({
  grayscale: z.boolean(),
  format: z.enum(["avif", "webp"]),
  crop: z.enum(["cover", "contain", "fill", "inside", "outside"]).optional(),
  gravity: z
    .enum([
      "north",
      "northeast",
      "east",
      "southeast",
      "south",
      "southwest",
      "west",
      "northwest",
      "center",
    ])
    .optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  blur: z
    .number()
    .min(0.3, "Blur sigma must be ≥ 0.3")
    .max(1000, "Blur sigma must be ≤ 1000")
    .optional(),
  sharpen: z
    .number()
    .min(0.000001, "Sharpen sigma must be ≥ 0.000001")
    .max(10, "Sharpen sigma must be ≤ 10")
    .optional(),
});
interface FileWithPreview extends FileWithPath {
  preview: string;
}

const OptimizeForm = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  // const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grayscale: false,
      format: "webp",
      crop: undefined,
      gravity: undefined,
      width: undefined,
      height: undefined,
      blur: undefined,
      sharpen: undefined,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (files.length === 0) {
      toast.error("Please select at least one image");
      return;
    }
  }
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
            <Separator />
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-5">
              <ImageUploaderFree files={files} onFilesChange={setFiles} />
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex justify-end hover:cursor-pointer">
                    Advance Options
                  </AccordionTrigger>
                  <AccordionContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <FormField
                      control={form.control}
                      name="width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width (px)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              {...field}
                              value={field.value ?? ""}
                              className="w-full max-w-[200px]"
                            />
                          </FormControl>
                          <FormDescription>
                            Desired width in pixels
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (px)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              {...field}
                              value={field.value ?? ""}
                              className="w-full max-w-[200px]"
                            />
                          </FormControl>
                          <FormDescription>
                            Desired height in pixels
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="grayscale"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-1 w-full max-w-[200px] items-start">
                          <FormLabel>Grayscale</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormDescription>
                            Render the image in grayscale
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="format"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Format</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full max-w-[200px]">
                                <SelectValue
                                  placeholder="Select a format"
                                  {...field}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="webp">webp</SelectItem>
                              <SelectItem value="avif">avif</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Format of the optimized image
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="crop"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Crop Mode</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full max-w-[200px]">
                                <SelectValue placeholder="Select crop mode" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cover">cover</SelectItem>
                                <SelectItem value="contain">contain</SelectItem>
                                <SelectItem value="fill">fill</SelectItem>
                                <SelectItem value="inside">inside</SelectItem>
                                <SelectItem value="outside">outside</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            How the image should be cropped
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gravity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gravity</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full max-w-[200px]">
                                <SelectValue placeholder="Select gravity" />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  "north",
                                  "northeast",
                                  "east",
                                  "southeast",
                                  "south",
                                  "southwest",
                                  "west",
                                  "northwest",
                                  "center",
                                ].map((g) => (
                                  <SelectItem key={g} value={g}>
                                    {g}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            Position for crop/gravity
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="blur"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blur Sigma</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              min={0.3}
                              max={1000}
                              {...field}
                              value={field.value ?? ""}
                              className="w-full max-w-[200px]"
                            />
                          </FormControl>
                          <FormDescription>
                            Sigma value (0.3–1000)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sharpen"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sharpen Sigma</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.000001"
                              min={0.000001}
                              max={10}
                              {...field}
                              value={field.value ?? ""}
                              className="w-full max-w-[200px]"
                            />
                          </FormControl>
                          <FormDescription>
                            Sigma value (0.000001–10)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <Button disabled={isLoading} type="submit">
            Optimize Image
          </Button>
        </form>
      </Form>
    </>
  );
};

export default OptimizeForm;
