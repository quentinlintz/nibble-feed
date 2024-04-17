import { NibbleForm } from "@/components/nibble-form";

export default function Home() {
  return (
    <div className="animated-bg flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white bg-opacity-70 rounded-lg shadow-lg px-8 py-16">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-center mb-2">
            Self study starts here
          </h1>
          <h4 className="text-sm sm:text-base md:text-lg text-center tracking-tight mb-8">
            &quot;I hear and I forget, I see and I remember, I do and I
            understand.&quot; - Confucius
          </h4>
        </div>
        <div className="flex items-center justify-center">
          <NibbleForm />
        </div>
      </div>
    </div>
  );
}
