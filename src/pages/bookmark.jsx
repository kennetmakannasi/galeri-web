import OrgGanteng from "../assets/OrgGanteng.jpg";
import yard from "../assets/yard.jpeg";
import Categories from "../components/Category";
import Masonry from "react-layout-masonry";


function ProfileHeader({ coverImage, profileImage, username }) {
  return (
    <div className="relative">
      {/* Cover */}
      <img
        src ={yard}
        alt ="cover"
        className="w-full h-80 object-cover rounded-4xl mt-8"
      />

      {/* Foto Profil */}
      <div className="absolute bottom-[-30px] right-9 mb-0.5">
        <img
          src={OrgGanteng}
          alt="profile"
          className="w-40 h-40 rounded-full border-4 border-black object-cover"
        />
      </div>
    </div>
  );
}

// TitleSection.jsx
function TitleSection({ title }) {
  return (
    <div className="mt-16">
      <h2 className="text-xl font-medium leading-tight text-white">{title}</h2>
      <hr className="border-gray-700 mt-4" />
    </div>
  );
}

// ImageGrid.jsx
function ImageGrid({ images }) {
  return (
    <Masonry columns={{ 640: 2, 1024: 3, 1440: 4 }} gap={17}>
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`img-${idx}`}
          className="w-full h-full object-cover rounded-lg"
        />
      ))}
    </Masonry>
  );
}

// Page.jsx
export default function ProfilePage() {
  const images = [
  "/src/assets/gunung.jpeg",
  "/src/assets/a.jpeg",
  "/src/assets/mall.jpeg",
  "/src/assets/sawah.jpeg",
  "/src/assets/mount2.jpeg",
  "/src/assets/hmblng.jpeg",
  "/src/assets/hmblng.jpeg",
  "/src/assets/mall.jpeg",
  "/src/assets/mall.jpeg",
  "/src/assets/mall.jpeg",
  "/src/assets/yard.jpeg",
  "/src/assets/yard.jpeg",
  "/src/assets/yard.jpeg",
  ];

  return (
    <div className="px-4 md:px-12 min-h-screen text-white">
      <ProfileHeader
        coverImage="/src/assets/cover.jpg"
        profileImage="/src/assets/profile.jpg"
        username="@_madeby.nath"
      />

      <TitleSection title={"Save it for later."} />

      <ImageGrid images={images} />
    </div>
  );
}
