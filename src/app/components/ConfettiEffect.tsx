"use client";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function ConfettiRickRoll() {
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    const duration = 8000;
    const end = Date.now() + duration;

    const shootConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 160,
        startVelocity: 50,
        origin: { x: Math.random(), y: Math.random() }, 
      });

      if (Date.now() < end) {
        requestAnimationFrame(shootConfetti);
      }
    };

    shootConfetti();

    const timer = setTimeout(() => setShowCloseButton(true), 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50">
      <h1 className="text-white text-3xl font-bold mb-4">{`You have been blessed by the LORDD 😉`}</h1>

      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/bN1shALfJqg?autoplay=1&start=4"
        title="OOIIAA"
        allow="autoplay"
      ></iframe>

      {showCloseButton && (
        <button
          className="absolute top-4 right-4 text-white text-2xl font-bold bg-black p-2 rounded-full"
          onClick={() => window.location.reload()}
        >
          ✖
        </button>
      )}
    </div>
  );
}
