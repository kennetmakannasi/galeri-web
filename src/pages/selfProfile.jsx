import React from "react";
import OrgGanteng from "../assets/OrgGanteng.jpg";
import yard from "../assets/yard.jpeg";
import HomeGalery from "../components/HomeGalery";
import { useNavigate } from "react-router";


const SelfProfile = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <div className="min-h-screen text-white">
      {/* Header Cover */}
      <div className="relative">
        <img
          src={yard}
          alt="hero"
          className="w-319 h-80 ml-15 mt-15 object-cover rounded-4xl"
        />

        {/* Foto Profil */}
        <div className="absolute bottom-[-110px] left-18 flex flex-col items-center">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border-4 border-black overflow-hidden">
              <img
                src={OrgGanteng}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-2 right-5 w-6.5 h-6.5 bg-green-500 rounded-full border-2 border-black"></div>
          </div>

          {/* Nama & Status */}
          <div>
            <div className="flex items-center gap-2 mt-5">
              <h1 className="text-xl font-semibold">Aryo Tehillah Nathanael</h1>
              <span className="px-2 py-1 bg-green-600 text-xs rounded-full ">
                Active
              </span>
            </div>
            <p className="text-gray-400 text-sm">@_madeby.nath</p>
          </div>
        </div>

        {/* Tombol Aksi + Dropdown */}
        <div className="absolute bottom-[-60px] right-10 flex items-center gap-3">
          {/* Icon tiga titik */}
          <div className="relative">
            <div
              className="w-6 h-6 flex items-center justify-center text-white cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-4 mt-full w-32 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                <button   onClick={() => navigate('/profile/edit')}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-t-lg">
                  Edit
                </button>
                <button className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded-b-lg">
                  Report
                </button>
              </div>
            )}
          </div>

          <button className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors">
            Follow
          </button>
        </div>
      </div>

      {/* Bagian bawah */}
      <div className="mt-20 px-10">
        {/* Stats */}
        <div className="right-10 text-right">
          <div className="relative top-7">
            <span className="text-white font-semibold">1.8M</span>
            <span className="text-gray-400 ml-1">followers</span>
          </div>
          <div className="relative top-7">
            <span className="text-white font-semibold">256</span>
            <span className="text-gray-400 ml-1.5">following</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm mt-full ml-8.5">
          followed by <span className="text-white">aryo.pplg²_</span> + 10 more
        </p>

        {/*garis*/}
        <div className="mx-auto w-[1240px] h-[2px] bg-yellow-400 mt-6 mb-15"></div>

        {/* Gallery */}
        <HomeGalery />
      </div>
    </div>
  );
};

export default SelfProfile;
