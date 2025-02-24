"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GhostJumpScare() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), Math.random() * 3000);
    setTimeout(() => setShow(false), 2000);
  }, []);

  return show ? <Image src="/scary-face.png" alt="scaryFace" className="fixed inset-0 w-full h-full" /> : null;
}
