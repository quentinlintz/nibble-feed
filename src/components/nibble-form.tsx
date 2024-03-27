"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { toast } from "@/components/ui/use-toast";

const NibbleFormSchema = z.object({
  topic: z
    .string()
    .min(2, { message: "Topic must be at least 2 characters." })
    .max(50, { message: "Topic must not exceed 50 characters." }),
});

export function NibbleForm() {
  const form = useForm<z.infer<typeof NibbleFormSchema>>({
    resolver: zodResolver(NibbleFormSchema),
    defaultValues: {
      topic: "",
    },
  });

  function onSubmit(data: z.infer<typeof NibbleFormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create Your AI Study Guide</FormLabel>
              <FormControl>
                <Input placeholder="Enter your topic here" {...field} />
              </FormControl>
              <FormDescription>
                Input a topic you&apos;re interested in and let our AI generate
                a personalized study guide for you.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate Study Guide</Button>
      </form>
    </Form>
  );
}
