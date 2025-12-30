// VantaBackground.tsx
import { useEffect, useRef } from "react";

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initVanta = async () => {
      try {
        // @ts-ignore - Vanta doesn't have TypeScript definitions
        const GLOBE = (await import("vanta/dist/vanta.globe.min")).default;
        
        if (!vantaEffect.current && vantaRef.current) {
          // @ts-ignore
          vantaEffect.current = GLOBE({
            el: vantaRef.current,
            THREE: await import("three"),
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x8ea6e1,
            backgroundColor: 0x2f2f2f,
            size: 1.50
          });
        }
      } catch (error) {
        console.error("Vanta.js initialization error:", error);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect.current?.destroy) {
        vantaEffect.current.destroy();
      }
      vantaEffect.current = null;
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
}