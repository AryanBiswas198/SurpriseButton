"use client";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import ConfettiEffect from "./ConfettiEffect";
import FlipPage from "./FlipPage";
import Image from "next/image";

const effects: React.ReactElement[] = [
//   <BlackHoleEffect key="blackhole" />,
  <ConfettiEffect key="confetti" />,
  <FlipPage key="flipPage" />,
//   <Earthquake key="earthquake" />
];

export default function SurpriseButton() {
  const [selectedEffect, setSelectedEffect] = useState<React.ReactElement | null>(null);
  const [isGhostVisible, setIsGhostVisible] = useState(false);
  const [ghostPosition, setGhostPosition] = useState({ x: 0, y: 0 });
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
    const randomInterval = () => Math.floor(Math.random() * 3000) + 4000; 

    const showGhost = () => {
      setGhostPosition({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      });

      setIsGhostVisible(true);

      if (Math.random() < 0.5) {
        setAudioUrl("https://www.youtube.com/watch?v=KqidTvZ6Tnw"); 
      }

      setTimeout(() => setIsGhostVisible(false), 500);

      setTimeout(showGhost, randomInterval());
    };

    const initialTimeout = setTimeout(showGhost, randomInterval());

    return () => {
      clearTimeout(initialTimeout);
    };
  }, []);

  const triggerEffect = () => {
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    setSelectedEffect(randomEffect);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={triggerEffect}
        className="px-6 py-3 text-lg font-semibold bg-pink-500 hover:bg-pink-700 transition-all rounded-lg shadow-lg"
      >
        Surprise Me!
      </button>

      {selectedEffect}

      {isGhostVisible && (
        <div
          className="fixed w-40 h-40 flex items-center justify-center"
          style={{
            left: `${ghostPosition.x}px`,
            top: `${ghostPosition.y}px`,
            transform: "translate(-50%, -50%)",
            transition: "opacity 0.1s ease-in-out",
          }}
        >
          <Image
            width={500}
            height={600}
            src="https://spng.hippopng.com/20180920/ytr/kisspng-the-nun-demon-nun-valac-painting-the-conjuring-5ba3aefdebcca6.8856533715374538219658.jpg"
            alt="Ghost"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      )}

      {audioUrl && (
        <ReactPlayer
          url={audioUrl}
          playing
          muted={false} 
          loop={false}
          controls={false}
          width="0"
          height="0"
          onEnded={() => setAudioUrl("")} 
        />
      )}
    </div>
  );
}



