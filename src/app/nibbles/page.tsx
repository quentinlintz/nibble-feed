import NibbleList from "@/components/nibble-list";
import { columns } from "./columns";
import { Nibble } from "@/types/nibble";

async function getData(): Promise<Nibble[]> {
  // Fetch data from your API here.
  return [
    {
      uuid: "728ed52f",
      topic: "Housing Market",
      status: "new",
    },
    {
      uuid: "f7c0a2f9",
      topic: "Climate Change",
      status: "in progress",
    },
    {
      uuid: "d8c7f6b4",
      topic: "Remote Work",
      status: "completed",
    },
  ];
}

export default async function NibbleListPage() {
  const data = await getData();

  return (
    <div>
      <h1 className="m-8 text-4xl font-extrabold tracking-tight text-center sm:text-5xl">
        Your Nibbles
      </h1>
      <div className="mx-auto max-w-lg">
        <NibbleList columns={columns} data={data} />
      </div>
    </div>
  );
}
