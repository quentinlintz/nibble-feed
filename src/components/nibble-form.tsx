"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { Loader2 } from "lucide-react";

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
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

const NibbleFormSchema = z.object({
  topic: z
    .string()
    .min(2, { message: "Topic must be at least 2 characters." })
    .max(50, { message: "Topic must not exceed 50 characters." }),
});

export function NibbleForm() {
  const [isLoading, setIsLoading] = useState(false);

  const session = useSession();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof NibbleFormSchema>>({
    resolver: zodResolver(NibbleFormSchema),
    defaultValues: {
      topic: "",
    },
  });

  function onSubmit(data: z.infer<typeof NibbleFormSchema>) {
    if (!session.data) {
      toast({
        title: "Please sign in. 🙏",
        description:
          "New users get free credits, but you need to sign in to use them.",
      });
      return;
    }
    setIsLoading(true);
    actions.createNibble({ topic: data.topic });
    setIsLoading(false);
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
            <div>
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
