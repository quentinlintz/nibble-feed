import NibbleList from "@/components/nibble-list";
import { Nibble, columns } from "./columns";

async function getData(): Promise<Nibble[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      topic: "Housing Market",
      status: "new",
    },
    {
      id: "f7c0a2f9",
      topic: "Climate Change",
      status: "in progress",
    },
    {
      id: "d8c7f6b4",
      topic: "Remote Work",
      status: "completed",
    },
  ];
}

export default async function NibblesPage() {
  const data = await getData();

  return (
    <div className="p-8">
      <h1 className="m-8 text-4xl font-extrabold tracking-tight text-center sm:text-5xl">
        Your Nibbles
      </h1>
      <div className="mx-auto max-w-lg">
        <NibbleList columns={columns} data={data} />
      </div>
    </div>
  );
}
