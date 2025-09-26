import ScrollGrid from "../components/scrollGrid";

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
    <div className="w-full px-4 md:px-12 py-6">
      <h2 className="text-xl font-bold mb-4 text-bright-yellow">
        Tren<span className="text-white">ding</span>
      </h2>
      {/* Scroll horizontal gambar */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 w-full gap-6">
        {images.map((src, index) => (
            <img
              src={src}
              alt={`Gambar ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
        ))}
      </div>

      <div className="my-10">
        <div>
          <h2 className="text-xl font-bold mb-4 text-white">
            See What's <span className="text-bright-yellow">New</span> on
          </h2>
        </div>
        <ScrollGrid endpoint={'post'}/>
      </div>
    </div>
  );
}
