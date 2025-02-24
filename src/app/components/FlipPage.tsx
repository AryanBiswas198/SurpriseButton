"use client";
import { useEffect, useState } from "react";

export default function FlipEffectWithDialogs() {
  const [showDialogs, setShowDialogs] = useState(false);
  const [dialogPositions, setDialogPositions] = useState<{ top: string; left: string }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const alertSound = new Audio("/sounds/erro.mp3");

  useEffect(() => {
    const handleUserInteraction = () => {
      startDialogEffect();
      document.removeEventListener("click", handleUserInteraction); 
    };

    document.addEventListener("click", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  const enterFullscreen = async () => {
    const elem = document.documentElement as HTMLElement & {
      mozRequestFullScreen?: () => Promise<void>;
      webkitRequestFullscreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };

    try {
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        await elem.mozRequestFullScreen(); 
      } else if (elem.webkitRequestFullscreen) {
        await elem.webkitRequestFullscreen(); 
      } else if (elem.msRequestFullscreen) {
        await elem.msRequestFullscreen(); 
      }
    } catch (error) {
      console.error("Failed to enter fullscreen:", error);
    }
  };

  const startDialogEffect = async () => {
    await enterFullscreen();

    document.body.style.transform = "rotate(180deg)";
    document.body.style.transition = "transform 0.1s linear";

    const numDialogs = 150; 
    const positions = Array.from({ length: numDialogs }, () => ({
      top: `${Math.random() * 95}vh`,
      left: `${Math.random() * 95}vw`,
    }));

    setDialogPositions(positions);
    setShowDialogs(true);

    if (!isPlaying) {
      alertSound.loop = true;
      alertSound.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => console.error("Audio play failed:", error));
    }

    const timeoutId = setTimeout(() => {
      document.body.style.transform = "rotate(0deg)";
      setShowDialogs(false);
      alertSound.pause();
      alertSound.currentTime = 0;
      setIsPlaying(false);

      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }, 6000);

    return () => clearTimeout(timeoutId);
  };

  return showDialogs ? (
    <div className="fixed inset-0 bg-black bg-opacity-50">
      {dialogPositions.map((pos, index) => (
        <div
          key={index}
          className="absolute bg-white text-black p-4 rounded-md shadow-lg w-52 text-center border border-gray-500"
          style={{
            top: pos.top,
            left: pos.left,
            transform: `rotate(${Math.random() * 10 - 5}deg)`,
          }}
        >
          <h2 className="text-md font-bold text-red-600">❌ System Error</h2>
          <p className="mt-1 text-xs">Deleting System Files</p>
        </div>
      ))}
    </div>
  ) : null;
}
