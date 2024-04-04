import { Button } from "@/components/ui/button";
import Link from "next/link";
import paths from "@/paths";

export default function NibbleNotFound() {
  return (
    <div className="p-8">
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-center sm:text-5xl">
        Nibble Not Found!
      </h1>
      <h4 className="text-sm sm:text-base md:text-lg text-center text-gray-400 tracking-tight mb-8">
        The Nibble you are looking for isn&apos;t here.
      </h4>
      <div className="text-center">
        <Link href={paths.nibblesList()}>
          <Button className="mx-auto">Your Nibbles</Button>
        </Link>
      </div>
    </div>
  );
}
