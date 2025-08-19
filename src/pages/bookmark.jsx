import OrgGanteng from "../assets/OrgGanteng.jpg";
import yard from "../assets/yard.jpeg";
import Categories from "../components/Category";


function ProfileHeader({ coverImage, profileImage, username }) {
  return (
    <div className="relative">
      {/* Cover */}
      <img
        src ={yard}
        alt ="cover"
        className="w-full h-80 object-cover rounded-4xl"
      />

      {/* Foto Profil */}
      <div className="absolute bottom-[-30px] right-9 mb-0.5">
        <img
          src={OrgGanteng}
          alt="profile"
          className="w-40 h-40 rounded-full border-4 border-black object-cover"
        />
      </div>

      {/* Username */}
      <div className="absolute mt-16 ml-[1080px]  text-gray-410 text">
        {username}
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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-16">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`img-${idx}`}
          className="w-full h-40 object-cover rounded-lg"
        />
      ))}
    </div>
  );
}

// Page.jsx
export default function ProfilePage() {
  const images = [
    "/src/assets/fogmountain.jpeg",
    "/src/assets/fogmountain.jpeg",
    "/src/assets/fogmountain.jpeg",
    "/src/assets/fogmountain.jpeg",
    "/src/assets/fogmountain.jpeg",
    "/src/assets/fogmountain.jpeg",
    "/src/assets/fogmountain.jpeg",
    "/src/assets/fogmountain.jpeg",
 
  ];

  return (
    <div className="p-15 min-h-screen text-white">
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
