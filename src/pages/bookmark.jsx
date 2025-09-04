import axios from "axios";
import OrgGanteng from "../assets/OrgGanteng.jpg";
import yard from "../assets/yard.jpeg";
import Categories from "../components/Category";
import Masonry from "react-layout-masonry";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import ScrollGrid from "../components/scrollGrid";

function ProfileHeader({ coverImage, profileImage, username }) {
  return (
    <div className="relative">
      {/* Cover */}
      {coverImage? (
        <img
          src ={coverImage}
          alt ="cover"
          className="w-full h-80 object-cover rounded-4xl mt-8"
        />  
      ):(
        <div className="w-full h-80 rounded-4xl mt-8 bg-dark-gray"></div>
      )}


      {/* Foto Profil */}
      <div className="absolute bottom-[-30px] right-9 mb-0.5">
        <img
          src={profileImage}
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

// Page.jsx
export default function ProfilePage() {

  const [selfData, setSelfData] = useState()

  const token = Cookies.get("token")

  async function fetchSelfData() {
    const res = await axios.get('http://127.0.0.1:8000/api/auth/self',{
       headers: {
          Authorization: `Bearer ${token}`
        }
    })

    setSelfData(res.data.content)
  }

  useEffect(()=>{
    fetchSelfData()
  },[])

  console.log(selfData)

  return (
    <div className="px-4 md:px-12 min-h-screen text-white">
      <ProfileHeader
        coverImage={selfData?.profile_banner}
        profileImage={selfData?.profile_picture}
      />

      <TitleSection title={"Save it for later."} />

      <ScrollGrid endpoint={'save'}/>
    </div>
  );
}
