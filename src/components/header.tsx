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
import { Plus, List, LogOut } from "lucide-react";
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
          <div className="flex items-center px-3 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition duration-150 ease-in-out cursor-pointer">
            <span className="mr-2 font-semibold text-blue-600">
              {session.data.user.credits}
            </span>
            <ReactAvatar>
              <AvatarImage
                src={session.data.user.image || ""}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <AvatarFallback className="flex items-center justify-center bg-gray-300 text-white text-sm font-medium rounded-full w-8 h-8">
                {session.data.user.name
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")}
              </AvatarFallback>
            </ReactAvatar>
          </div>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="end"
          className="w-42 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden mt-1"
        >
          <div className="flex flex-col items-center p-4 text-gray-700">
            <div className="text-lg font-bold tracking-tight text-center">
              {session.data.user.name || session.data.user.email}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Credits:{" "}
              <span className="font-semibold text-blue-600">
                {session.data.user.credits}
              </span>
            </div>
            <div className="w-full mt-4">
              <Link href="/" passHref>
                <Button
                  onClick={() => setOpen(false)}
                  size="sm"
                  variant="outline"
                  className="w-full flex items-center justify-center py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <Plus className="mr-2" size={16} /> New Nibble
                </Button>
              </Link>
              <Link href="/nibbles" passHref>
                <Button
                  onClick={() => setOpen(false)}
                  size="sm"
                  variant="outline"
                  className="w-full flex items-center justify-center py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md mt-2"
                >
                  <List className="mr-2" size={16} /> My Nibbles
                </Button>
              </Link>
              <form method="post" action="/api/auth/signout">
                <Button
                  type="submit"
                  size="sm"
                  variant="destructive"
                  className="w-full flex items-center justify-center py-2 text-white bg-red-600 hover:bg-red-700 rounded-md mt-2"
                >
                  <LogOut className="mr-2" size={16} /> Sign Out
                </Button>
              </form>
            </div>
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
