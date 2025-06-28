"use client";

import { useState } from "react";
import { Badge } from "./ui/badge";

export const Slider = ({
  originalImage,
  optimizedImage,
}: {
  originalImage: string;
  optimizedImage: string;
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const raw = e.clientX - left;
    const clamped = Math.max(0, Math.min(raw, width));
    const pct = Math.round((clamped / width) * 100);
    setSliderPosition(pct);
  };

  const showCompressed = sliderPosition > 1;
  const showOriginal = sliderPosition < 99;

  return (
    <div
      className="w-full relative"
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      <div
        className="relative w-full max-w-3xl aspect-[70/45] m-auto overflow-hidden select-none"
        onMouseMove={handleMove}
        onMouseDown={() => setIsDragging(true)}
      >
        <img
          src={originalImage}
          alt="Original"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={optimizedImage}
            alt="Optimized"
            className="w-full h-full object-cover"
          />
        </div>

        {showCompressed && (
          <div className="absolute top-2 left-2 text-xs pointer-events-none">
            <Badge variant="secondary">Optimized</Badge>
          </div>
        )}
        {showOriginal && (
          <div className="absolute top-2 right-2 text-xs pointer-events-none">
            <Badge variant="secondary">Original</Badge>
          </div>
        )}

        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `calc(${sliderPosition}% - 0.5px)` }}
        >
          <div className="absolute -left-1 top-1/2 h-3 w-3 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
};
