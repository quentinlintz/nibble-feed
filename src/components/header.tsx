"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
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

export default function Header() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  let authContent: React.ReactNode;
  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild aria-expanded={open}>
          <div className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-full">
            <span className="mr-2 font-bold text-blue-500">
              {session.data.user.credits}
            </span>
            <ReactAvatar>
              <AvatarImage
                src={session.data.user.image || ""}
                className="w-10 h-10 rounded-full"
              />
              <AvatarFallback>NF</AvatarFallback>
            </ReactAvatar>
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" className="m-4 p-4">
          <div className="flex flex-col gap-2 items-center bg-white rounded-lg shadow-lg p-4">
            <div className="font-bold text-lg tracking-tight text-gray-700">
              {session.data.user.name || session.data.user.email}
            </div>

            <div className="text-gray-500">
              Credits:{" "}
              <span className="font-bold text-blue-500">
                {session.data.user.credits}
              </span>
            </div>
            <Link href="/nibbles">
              <Button
                onClick={() => setOpen(false)}
                size="sm"
                variant="outline"
                className="mt-4"
              >
                Nibbles
              </Button>
            </Link>
            <form action={actions.signOut}>
              <Button size="sm" variant="destructive" className="mt-2">
                Sign Out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <form action={actions.signIn}>
        <Button size="sm" variant="outline">
          Sign In
        </Button>
      </form>
    );
  }

  <header className="fixed inset-x-0 top-0 h-16 z-50 flex items-center px-4 sm:px-6 lg:px-8 bg-opacity-90 backdrop-blur-sm border-b border-gray-200 backdrop-filter dark:border-gray-800 dark:bg-gray-950/90">
    <nav className="flex-1 flex items-center justify-between">
      <Link className="flex items-center" href="/">
        <span className="ml-2 font-extrabold text-xl tracking-tight">
          Nibble Feed
        </span>
      </Link>
      <div className="flex flex-1 justify-end items-center space-x-4">
        {authContent}
      </div>
    </nav>
  </header>;

  return (
    <header className="fixed inset-x-0 top-0 h-16 z-50 flex items-center px-4 sm:px-6 lg:px-8 bg-opacity-90 backdrop-blur-sm border-b border-gray-200 backdrop-filter dark:border-gray-800 dark:bg-gray-950/90">
      <nav className="flex-1 flex items-center justify-between">
        <Link className="flex items-center" href="/">
          <span className="ml-2 font-extrabold text-3xl tracking-tight">
            Nibble Feed
          </span>
        </Link>
        <div className="flex items-center justify-end space-x-4">
          {authContent}
        </div>
      </nav>
    </header>
  );
}
