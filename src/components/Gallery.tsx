"use client";
import { useState } from "react";

interface Props {
  images: string[];
  alt: string;
}

export default function Gallery({ images, alt }: Props) {
  const [selected, setSelected] = useState(0);

  if (!images.length) return null;

  return (
    <div>
      <div className="aspect-square bg-neutral-100 rounded-xl overflow-hidden mb-3">
        <img
          src={images[selected]}
          alt={`${alt} - foto ${selected + 1}`}
          className="w-full h-full object-contain"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-colors ${
                i === selected ? "border-accent" : "border-neutral-200"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
