"use client";
import { useEffect } from "react";

export default function Earthquake() {
  useEffect(() => {
    const startEarthquake = () => {
      const intensityBody = 100; 
      const intensityElements = 50; 
      const duration = 5000; 

      document.body.style.transform = "translate(0,0) rotate(0)";
      document.querySelectorAll("*").forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.transform = "translate(0,0) rotate(0)";
        }
      });

      let interval = setInterval(() => {
        const xBody = (Math.random() - 0.5) * intensityBody * 2;
        const yBody = (Math.random() - 0.5) * intensityBody * 2;
        const rotateBody = (Math.random() - 0.5) * 20;

        document.body.style.transform = `translate(${xBody}px, ${yBody}px) rotate(${rotateBody}deg)`;

        document.querySelectorAll("*").forEach((el) => {
          if (el instanceof HTMLElement) {
            const xEl = (Math.random() - 0.5) * intensityElements * 2;
            const yEl = (Math.random() - 0.5) * intensityElements * 2;
            const rotateEl = (Math.random() - 0.5) * 20;

            el.style.transform = `translate(${xEl}px, ${yEl}px) rotate(${rotateEl}deg)`;
          }
        });
      }, 15); 

      setTimeout(() => {
        clearInterval(interval);
        document.body.style.transform = "translate(0,0) rotate(0)";
        document.querySelectorAll("*").forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.transform = "translate(0,0) rotate(0)";
          }
        });
      }, duration);
    };

    window.addEventListener("startEarthquake", startEarthquake);

    return () => {
      window.removeEventListener("startEarthquake", startEarthquake);
    };
  }, []);

  return null;
}
