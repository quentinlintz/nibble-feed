import { Button } from "@/components/ui/button";
import { Nibble } from "@/types/nibble";
import { notFound } from "next/navigation";

async function getData(): Promise<Nibble> {
  // Fetch data from your API here.
  return {
    uuid: "d8c7f6b4",
    topic: "Remote Work",
    status: "completed",
  };
}

export default async function NibbleShowPage() {
  const data = await getData();

  // return notFound();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl">
        {data.topic}
      </h1>
    </div>
  );
}
