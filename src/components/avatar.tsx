"use client";

import {
  Avatar as ReactAvatar,
  AvatarImage,
  AvatarFallback,
} from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import * as actions from "@/actions";

export default function Avatar(params: { src: string }) {
  return (
    <Popover>
      <PopoverTrigger>
        <ReactAvatar>
          <AvatarImage src={params.src} className="w-10 h-10 rounded-full" />
          <AvatarFallback>NF</AvatarFallback>
        </ReactAvatar>
      </PopoverTrigger>
      <PopoverContent className="m-8">
        <form action={actions.signOut}>
          <Button size="sm" variant="destructive">
            Sign Out
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
