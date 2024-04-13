import * as actions from "@/actions";

interface NibbleShowPageProps {
  params: {
    id: string;
  };
}

export default async function NibbleShowPage(props: NibbleShowPageProps) {
  const data = await actions.getNibble(props.params.id);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl">
        {data.topic}
      </h1>
    </div>
  );
}
