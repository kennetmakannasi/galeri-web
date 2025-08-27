import sawah from "../assets/sawah.jpeg";

function CategoryCard({ title, image }) {
  return (
    <div className="w-full relative rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
}

export default function Categories() {
  return (
    <section className="py-8">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">
        <span className="text-bright-yellow">Cate</span>gories
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        <CategoryCard title="Food & drinks" image = {sawah} />
        <CategoryCard title="Art" image = {sawah} />
        <CategoryCard title="Transportation" image = {sawah} />
        <CategoryCard title="Animal" image = {sawah} />
        <CategoryCard title="Place" image = {sawah} />
        <CategoryCard title="Biography" image =   {sawah} />
      </div>
    </section>
  );
}
