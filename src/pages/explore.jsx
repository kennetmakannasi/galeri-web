import React from "react";
import GradientLine from "../components/GradientLine";
import NewGallery from "../components/NewGalery";
import Categories from "../components/Category";
import HomeGalery from "../components/HomeGalery";

export default function ImageScrollSection() {
  const images = [
    "https://picsum.photos/id/1015/400/300",
    "https://picsum.photos/id/1016/400/300",
    "https://picsum.photos/id/1018/400/300",
    "https://picsum.photos/id/1018/400/300",
    "https://picsum.photos/id/1018/400/300",
    "https://picsum.photos/id/1020/400/300",
  ];

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-lg font-bold mb-4 text-yellow-400">
        Tren<span className="text-white">ding</span>
      </h2>

      {/* Scroll horizontal gambar */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {images.map((src, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[250px] h-[180px] rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={src}
              alt={`Gambar ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="my-4">
        <Categories />
      </div>

      <div className="my-4">
        <NewGallery />
      </div>
    </div>
  );
}
