"use client";
import { useEffect, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { useCopyToClipboard } from "@uidotdev/usehooks";
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
  width: z.coerce.number().int().positive().optional(),
  height: z.coerce.number().int().positive().optional(),
  blur: z.coerce
    .number()
    .min(0.3, "Blur sigma must be ≥ 0.3")
    .max(1000)
    .optional(),
  sharpen: z.coerce
    .number()
    .min(0.000001, "Sharpen σ ≥ 0.000001")
    .max(10)
    .optional(),
});

interface UrlHelperProps {
  baseUrl: string;
  originalWidth: number;
  originalHeight: number;
}

const UrlHelper = ({
  baseUrl,
  originalWidth,
  originalHeight,
}: UrlHelperProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      format: "webp",
      crop: undefined,
      gravity: undefined,
      width: undefined,
      height: undefined,
      blur: undefined,
      sharpen: undefined,
      grayscale: false,
    },
  });

  const values = form.watch();
  const generatedUrl = useMemo(() => {
    const segments: string[] = [];
    segments.push(`format=${values.format}`);
    if (values.width) segments.push(`w=${values.width}`);
    if (values.height) segments.push(`h=${values.height}`);
    if (values.gravity) segments.push(`gravity=${values.gravity}`);
    if (values.crop) segments.push(`crop=${values.crop}`);
    if (values.blur !== undefined && values.blur >= 0.3 && values.blur < 1000)
      segments.push(`blur=${values.blur}`);
    if (
      values.sharpen !== undefined &&
      values.sharpen >= 0.000001 &&
      values.sharpen < 1000
    )
      segments.push(`sharpen=${values.sharpen}`);
    if (values.grayscale) segments.push(`grayscale=true`);
    const path = segments.join(",");
    return path ? `${baseUrl}/${path}` : baseUrl;
  }, [baseUrl, values]);

  const [copiedText, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    if (values.width && values.width > originalWidth) {
      toast.error("Not recommended to upscale the image");
    }
  }, [values.width, originalWidth]);

  useEffect(() => {
    if (values.height && values.height > originalHeight) {
      toast.error("Not recommended to upscale the image");
    }
  }, [values.height, originalHeight]);

  useEffect(() => {
    if (
      values.blur !== undefined &&
      (values.blur < 0.3 || values.blur > 1000)
    ) {
      toast.error("Blur must be between 0.3 and 1000");
    }
  }, [values.blur]);

  useEffect(() => {
    if (
      values.sharpen !== undefined &&
      (values.sharpen < 0.000001 || values.sharpen > 10)
    ) {
      toast.error("Sharpen sigma must be between 0.000001 and 10");
    }
  }, [values.sharpen]);

  return (
    <div className="flex flex-col space-y-10 w-full max-w-6xl">
      <Form {...form}>
        <form className="w-full max-w-6xl">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-2 flex justify-end hover:cursor-pointer">
                Transform Url Helper
              </AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  <FormField
                    control={form.control}
                    name="width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-primary/90">
                          Width (px)
                        </FormLabel>
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
                          Desired width in pixels.
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
                        <FormLabel className="text-sm text-primary/90">
                          Height (px)
                        </FormLabel>
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
                          Desired height in pixels.
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
                        <FormLabel className="text-sm text-primary/90">
                          Format
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full max-w-[200px]">
                              <SelectValue placeholder="Select a format" />
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
                        <FormLabel className="text-sm text-primary/90">
                          Crop Mode
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full max-w-[200px]">
                                <SelectValue placeholder="Select crop mode" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="cover">cover</SelectItem>
                              <SelectItem value="contain">contain</SelectItem>
                              <SelectItem value="fill">fill</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>crop options</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gravity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-primary/90">
                          Gravity
                        </FormLabel>
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
                        <FormLabel className="text-sm text-primary/90">
                          Blur Sigma
                        </FormLabel>
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
                        <FormLabel className="text-sm text-primary/90">
                          Sharpen Sigma
                        </FormLabel>
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
                  <FormField
                    control={form.control}
                    name="grayscale"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-1 items-start justify-between">
                        <FormLabel className="text-sm text-primary/90">
                          Grayscale
                        </FormLabel>
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
                </div>
                <Separator />
                <div className="text-sm mt-3 flex flex-col space-y-1">
                  <Label className="text-primary/80 text-sm">
                    Generated URL{" "}
                    <span className="text-xs">(Click link to Copy)</span>
                  </Label>
                  <div
                    role="button"
                    tabIndex={0}
                    className="break-all text-sm hover:cursor-pointer hover:text-indigo-400"
                    onClick={() => {
                      copyToClipboard(generatedUrl);
                      toast.success("URL Copied!");
                    }}
                  >
                    {generatedUrl}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
      </Form>
    </div>
  );
};

export default UrlHelper;
