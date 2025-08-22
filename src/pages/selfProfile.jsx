import React from "react";
import OrgGanteng from "../assets/OrgGanteng.jpg";
import yard from "../assets/yard.jpeg";
import HomeGalery from "../components/HomeGalery";
import { useNavigate } from "react-router";
import Dropdown from "../components/dropdown";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router";

const SelfProfile = () => {
   const navigate = useNavigate(); // Tidak dipakai, boleh dihapus

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

        {/* Dropdown di atas kanan tapi nggak pojok banget + Follow button */}
        <div className="absolute top-84 right-23 z-50 flex items-center gap-4">
          <Dropdown
            buttonContent={<Icon height={30} icon={"bi:three-dots"} />}
            dropdownContent={
              <div className="flex flex-col gap-3 mr-10">
                 <Link to="/profile/edit">
                                 <button
                  type="button"
                  className="text-left px-3 py-2 hover:bg-gray-700 rounded"
                  >
                  Edit Profile
                  </button>
                 </Link>

                  <button
                    type="button"
                    className="text-left px-3 py-2 hover:bg-gray-700 rounded"
                    onClick={() => navigate("/")}
                    >
                      Report
                    </button>
              </div>
            }
          />

          <button
            type="button"
            className="px-5 py-2 rounded-md text-sm bg-gradient-to-b from-gray-600 to-gray-700 border border-gray-500 hover:from-gray-500 hover:to-gray-600 transition-shadow shadow-sm"
          >
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
        <div className="mx-auto w-[1200px] h-[2px] bg-yellow-400 mt-6 mb-12"></div>

        {/* Gallery */}
        <HomeGalery />
      </div>
    </div>
  );
};

export default SelfProfile;