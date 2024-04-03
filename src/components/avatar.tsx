"use client";

import {
  Avatar as ReactAvatar,
  AvatarImage,
  AvatarFallback,
} from "@radix-ui/react-avatar";

export default function Avatar(params: { src: string }) {
  return (
    <ReactAvatar>
      <AvatarImage src={params.src} className="w-10 h-10 rounded-full" />
      <AvatarFallback>NF</AvatarFallback>
    </ReactAvatar>
  );
}
