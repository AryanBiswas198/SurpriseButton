"use client";
import { useEffect, useRef, useState } from "react";

export default function BlackHoleEffect() {
  const [isActive, setIsActive] = useState(false);
  const affectedElementsRef = useRef<HTMLElement[]>([]);
  const originalStylesRef = useRef<Map<HTMLElement, Record<string, string>>>(new Map());

  useEffect(() => {
    setIsActive(true);
    const allElements = Array.from(
      document.querySelectorAll("button, img, p, div, span")
    ) as HTMLElement[];

    affectedElementsRef.current = [];

    allElements.forEach((el) => {
      if (Math.random() > 0.5) {
        affectedElementsRef.current.push(el);
        storeOriginalStyles(el);
        suckElement(el);
      }
    });

    // Restore elements after 7 seconds
    setTimeout(() => {
      restoreElements();
      setIsActive(false);
    }, 7000);
  }, []);

  const storeOriginalStyles = (el: HTMLElement) => {
    if (!originalStylesRef.current.has(el)) {
      originalStylesRef.current.set(el, {
        transform: el.style.transform || "none",
        opacity: el.style.opacity || "1",
        pointerEvents: el.style.pointerEvents || "auto",
        display: el.style.display || "block",
      });
    }
  };

  const suckElement = (el: HTMLElement) => {
    const blackHoleCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const rect = el.getBoundingClientRect();
    const deltaX = blackHoleCenter.x - (rect.left + rect.width / 2);
    const deltaY = blackHoleCenter.y - (rect.top + rect.height / 2);

    el.style.transition = "transform 3s ease-in-out, opacity 3s ease-in-out";
    el.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0)`;
    el.style.opacity = "0";
    el.style.pointerEvents = "none";
  };

  const restoreElements = () => {
    affectedElementsRef.current.forEach((el) => {
      const originalStyles = originalStylesRef.current.get(el);
      if (originalStyles) {
        el.style.transition = "transform 1s ease-in-out, opacity 1s ease-in-out";
        el.style.transform = originalStyles.transform;
        el.style.opacity = originalStyles.opacity;
        el.style.pointerEvents = originalStyles.pointerEvents;
        el.style.display = originalStyles.display;
      }
    });

    affectedElementsRef.current = []; // Clear affected elements list
  };

  return isActive ? (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="w-64 h-64 bg-black rounded-full shadow-lg animate-pulse border-8 border-gray-800"
        style={{ boxShadow: "0 0 50px rgba(0,0,0,0.9)" }}
      />
    </div>
  ) : null;
}
