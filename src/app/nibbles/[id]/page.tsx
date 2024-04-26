import * as actions from "@/actions";
import StepList from "@/components/step-list";

interface NibbleShowPageProps {
  params: {
    id: string;
  };
}

export default async function NibbleShowPage(props: NibbleShowPageProps) {
  const nibble = await actions.getNibble(props.params.id);

  return (
    <div className="md:container pt-8 pb-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl mb-8">
        {nibble.topic}
      </h1>
      <StepList nibbleId={props.params.id} />
    </div>
  );
}
