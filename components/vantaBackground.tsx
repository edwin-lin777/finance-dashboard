// VantaBackground.tsx
"use client"; // ensures this only runs on the client

import { useEffect, useRef } from "react";
import * as THREE from "three";
import dynamic from "next/dynamic";

// We will dynamically import VANTA to avoid SSR issues
const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isMounted = true;

    const initVanta = async () => {
      const GLOBE = (await import("vanta/dist/vanta.globe.min")).default;

      if (isMounted && !vantaEffect.current && vantaRef.current) {
        vantaEffect.current = GLOBE({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x8ea6e1,
          backgroundColor: 0x2f2f2f,
          size: 1.5,
        });
      }
    };

    initVanta();

    return () => {
      isMounted = false;
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default VantaBackground;
