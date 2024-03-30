import { NibbleForm } from "@/components/nibble-form";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-center mb-2">
          Nibble Feed
        </h1>
        <h4 className="text-sm sm:text-base md:text-lg text-center text-gray-400 tracking-tight mb-8">
          &quot;I hear and I forget, I see and I remember, I do and I
          understand.&quot; - Confucius
        </h4>
      </div>
      <div className="flex items-center justify-center">
        <NibbleForm />
      </div>
    </div>
  );
}
