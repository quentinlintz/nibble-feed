"use client";

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

  let authContent: React.ReactNode;
  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover>
        <PopoverTrigger>
          <ReactAvatar>
            <AvatarImage
              src={session.data?.user.image || ""}
              className="w-10 h-10 rounded-full"
            />
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
        <span className="ml-2 font-semibold sm:text-base lg:text-lg">
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
          <span className="ml-2 font-semibold sm:text-base lg:text-lg">
            Nibble Feed
          </span>
        </Link>
        <div className="flex flex-1 justify-end items-center space-x-4">
          {authContent}
        </div>
      </nav>
    </header>
  );
}
