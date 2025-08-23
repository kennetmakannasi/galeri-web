import React from "react";
import OrgGanteng from "../assets/OrgGanteng.jpg";
import HomeGalery from "../components/HomeGalery";
import { useNavigate } from "react-router";
import Dropdown from "../components/dropdown";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router";

const SelfProfile = () => {
   const navigate = useNavigate(); // Tidak dipakai, boleh dihapus

  return (
    <div className="min-h-screen text-white px-4 md:px-12">
      {/* Header Cover */}
        <img
          src='https://img.freepik.com/foto-gratis/indah_1203-2633.jpg?semt=ais_hybrid&w=740&q=80'
          alt="hero"
          className="w-full h-80 mt-8 object-cover rounded-4xl"
        />
        <img
          src={OrgGanteng}
          alt="Profile"
          className="w-40 h-40 rounded-full border-4 border-black object-cover absolute top-64 ml-10  "
        />

          {/* Nama & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 pt-14">
          <div className="mt-5 col-span-2 relative w-full">
            <div>
              <h1 className="text-xl font-semibold max-w-72">Aryo Tehillah Nathanael</h1>
              <p className="text-gray-400 text-sm">@_madeby.nath</p>  
            </div>
            <div className=" absolute right-3 top-0">
              <Dropdown
                buttonContent={<Icon height={30} icon={"bi:three-dots"} />}
                dropdownContent={
                  <div className="flex flex-col gap-3">
                    <Link to="/profile/edit">
                      <button
                      type="button"
                      className="text-left px-3 py-2 hover:bg-gray-700 rounded"
                      >
                      Edit Profile
                      </button>
                    </Link>
                  </div>
                  }
                />   
            </div>

          </div>
          <div className="w-full relative flex items-center md:col-start-2 h-36">
            <div className="md:absolute md:right-3">
              <div>
                <span className="text-white font-semibold">1.8M</span>
                <span className="text-gray-400 ml-1">followers</span>
              </div>
              <div>
                <span className="text-white font-semibold">256</span>
                <span className="text-gray-400 ml-1.5">following</span>
              </div>
        {/* <p className="text-gray-400 text-sm mt-full">
          followed by <span className="text-white">aryo.pplg²_</span> + 10 more
        </p> */}
            </div>
          </div>
      </div>

      {/* Bagian bawah */}
      <div className="w-full relative ">
      </div>
      <div>
        <div className="mx-auto w-full h-[2px] bg-bright-yellow mt-6 mb-12"></div>
        <HomeGalery /> 
      </div>

    </div>
  );
};

export default SelfProfile;