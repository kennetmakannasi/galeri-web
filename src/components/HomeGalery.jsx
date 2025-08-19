import Masonry from "react-layout-masonry";

const galleryImages = [
  "/src/assets/gunung.jpeg",
  "/src/assets/a.jpeg",
  "/src/assets/mall.jpeg",
  "/src/assets/sawah.jpeg",
  "/src/assets/mount2.jpeg",
  "/src/assets/sunset.jpeg",
  "/src/assets/hmblng.jpeg",
  "/src/assets/mall.jpeg",
  "/src/assets/mall.jpeg",
  "/src/assets/mall.jpeg",
  "/src/assets/kabut gng.jpeg",  
];

export default function HomeGalery() {
  return (
    <div className="mt-8">
      <Masonry columns={{ 640: 2, 1024: 3, 1280: 5 }} gap={16}>
      {galleryImages.map((src, idx) => (
        <div key={idx} className="mb-3 break-inside-avoid rounded-xl overflow-hidden">
          <img
            src={src}
            alt={`Gallery image ${idx + 1}`}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
      </Masonry>
    </div>
  );
}
