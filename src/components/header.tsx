import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 h-16 z-50 flex items-center px-4 sm:px-6 lg:px-8 bg-opacity-90 backdrop-blur-sm border-b border-gray-200 backdrop-filter dark:border-gray-800 dark:bg-gray-950/90">
      <nav className="flex-1 flex items-center justify-between">
        <Link className="flex items-center" href="/">
          <span className="ml-2 font-semibold sm:text-base lg:text-lg">
            Nibble Feed
          </span>
        </Link>
        <div className="hidden sm:flex flex-1 justify-end items-center space-x-4">
          <Button size="sm" variant="outline">
            Sign In
          </Button>
        </div>
        <div className="sm:hidden flex items-center">
          <Button size="sm" variant="outline">
            Sign In
          </Button>
        </div>
      </nav>
    </header>
  );
}
