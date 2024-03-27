import { NibbleForm } from "@/components/nibble-form";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-500 sm:text-5xl">
        Nibble Feed
      </h1>
      <div className="flex items-center justify-center">
        <NibbleForm />
      </div>
    </div>
  );
}
