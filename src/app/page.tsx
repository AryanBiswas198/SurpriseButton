'use client'
import SurpriseButton from "./components/SurpriseButton";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-screen bg-gray-950 text-white text-center overflow-hidden">
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-6">Surprise Me! 🎉</h1>
        <SurpriseButton />
      </div>
      <Footer />
    </main>
  );
}
