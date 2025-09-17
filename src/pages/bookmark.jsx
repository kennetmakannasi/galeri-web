import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ScrollGrid from "../components/scrollGrid";
import { UseToken } from "../helpers/useToken";
import { SessionData } from "../components/layout/mainLayout";

function ProfileHeader({ coverImage, profileImage, username }) {
  return (
    <div className="w-full h-full relative mb-22">
      {coverImage? (
        <img
          src ={coverImage}
          alt ="cover"
          className="w-full h-72 object-cover rounded-4xl mt-8"
        />  
      ):(
        <div className="w-full h-72 rounded-4xl mt-8 bg-dark-gray"></div>
      )}

      <div className="absolute -bottom-18 right-3">
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
  const baseUrl = import.meta.env.VITE_API_URL;
  const data = useContext(SessionData);

  return (
    <div className="px-4 md:px-12 min-h-screen text-white">
      <ProfileHeader
        coverImage={baseUrl + data?.profile_banner}
        profileImage={baseUrl + data?.profile_picture}
      />

      <TitleSection title={"Save it for later."} />

      <ScrollGrid endpoint={'save'}/>
    </div>
  );
}
