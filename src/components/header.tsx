import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import Avatar from "./avatar";
import * as actions from "@/actions";

export default async function Header() {
  const session = await auth();

  let authContent: React.ReactNode;
  if (session?.user) {
    authContent = <Avatar src={session.user.image ?? ""} />;
  } else {
    authContent = (
      <form action={actions.signIn}>
        <Button size="sm" variant="outline">
          Sign In
        </Button>
      </form>
    );
  }

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
