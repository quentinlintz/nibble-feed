import NibbleList from "@/components/nibble-list";
import * as actions from "@/actions";

export default async function NibbleListPage() {
  const data = await actions.getNibbles();

  return (
    <div>
      <h1 className="m-8 text-4xl font-extrabold tracking-tight text-center sm:text-5xl">
        Your Nibbles
      </h1>
      <div className="mx-auto max-w-xl">
        <NibbleList data={data} />
      </div>
    </div>
  );
}
