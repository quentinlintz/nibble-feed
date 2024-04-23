import * as actions from "@/actions";
import StepQuiz from "@/components/step-quiz";
import StepText from "@/components/step-text";

interface NibbleShowPageProps {
  params: {
    id: string;
  };
}

export default async function NibbleShowPage(props: NibbleShowPageProps) {
  const nibble = await actions.getNibble(props.params.id);
  const steps = await actions.getStepsForNibble(props.params.id);

  const textContent = JSON.parse(steps[0].content as string);
  const quizContent = JSON.parse(steps[1].content as string);

  return (
    <div className="md:container pt-8 pb-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl">
        {nibble.topic}
      </h1>
      <StepText {...textContent} />
      <StepQuiz {...quizContent} />
    </div>
  );
}
