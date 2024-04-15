"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
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
import * as actions from "@/actions";
import paths from "@/paths";
import { Nibble } from "@/db/schema";

const NibbleFormSchema = z.object({
  topic: z
    .string()
    .min(2, { message: "Topic must be at least 2 characters." })
    .max(50, { message: "Topic must not exceed 50 characters." }),
});

export function NibbleForm() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const session = useSession();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof NibbleFormSchema>>({
    resolver: zodResolver(NibbleFormSchema),
    defaultValues: {
      topic: "",
    },
  });

  async function onSubmit(data: z.infer<typeof NibbleFormSchema>) {
    if (!session.data) {
      toast({
        title: "Please sign in.",
        description: "You need to be signed in to create a Nibble.",
      });
      return;
    }

    setIsLoading(true);
    let nibble: Nibble;
    try {
      nibble = await actions.createNibble({ topic: data.topic });

      toast({
        title: "Nibble Created 👍",
        description: `Your Nibble: "${nibble.topic}" has been successfully created!`,
      });
    } catch (error) {
      toast({
        title: "Error 😞",
        description: (error as Error).message || "Failed to create Nibble.",
      });
      return;
    }

    router.push(paths.nibblesShow(nibble.id));
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="flex flex-row gap-2">
              <Loader2 className="animate-spin" />
              Creating Nibble
            </div>
          ) : (
            "Generate Study Guide"
          )}
        </Button>
      </form>
      <Toaster />
    </Form>
  );
}
