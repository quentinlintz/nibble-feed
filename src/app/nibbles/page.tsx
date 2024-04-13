import NibbleList from "@/components/nibble-list";
import { columns } from "./columns";
import { Nibble } from "@/db/schema";
import * as actions from "@/actions";

export default async function NibbleListPage() {
  const data = await actions.getNibbles();

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
