"use client";

import { useState } from "react";

export const Slider = ({
  originalImage,
  optimizedImage,
}: {
  originalImage: string;
  optimizedImage: string;
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full relative" onMouseUp={handleMouseUp}>
      <div
        className="relative w-full max-w-[700px] aspect-[70/45] m-auto overflow-hidden select-none"
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
      >
        <img src=" https://upload-lambda-compress.s3.ap-south-1.amazonaws.com/a058047f-0d07-492c-b67d-4bdcd7fb0edb/original/1750936228439-629b40b7-95e9-4a7d-8eb1-c49bfe1dbc76.jpeg" />

        <div
          className="absolute top-0 left-0 right-0 w-full max-w-[700px] aspect-[70/45] m-auto overflow-hidden select-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            alt=""
            src=" https://upload-lambda-compress.s3.ap-south-1.amazonaws.com/a058047f-0d07-492c-b67d-4bdcd7fb0edb/original/1750936228439-629b40b7-95e9-4a7d-8eb1-c49bfe1dbc76.webp"
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
        >
          <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)]" />
        </div>
      </div>
    </div>
  );
};
