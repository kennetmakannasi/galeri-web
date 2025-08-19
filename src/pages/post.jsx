import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import OrgGanteng from "../assets/OrgGanteng.jpg";
import Foto from "../assets/sunset.jpeg"
import PostButton from "../components/postButton";

export default function AddPostModal() {

  return (
    <div className="w-full px-5 xl:px-48">
      <div className="w-full h-full border-x-2 border-white px-5 lg:px-10">
        <div className="flex items-center pt-4">
          <Icon height={30} icon={"ion:arrow-back"}/>
          <p className="ml-7">Post</p>
        </div>
        <div className="w-full flex relative mt-6">
          <img className="size-16 object-cover rounded-full" src={OrgGanteng} alt="" />  
          <div className="ml-5">
            <p>Aryo Orang Ganteng</p>
            <p className="text-text-gray">@gantengmenn123</p>
            <p className=" pr-10 lg:pr-30">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Quae ea inventore nesciunt eaque, quos eum laboriosam commodi ad sint doloremque unde itaque eius fugit quaerat atque officia sit dicta assumenda.
            </p>
          </div>
          <div className="right-0 absolute">
            <Icon height={30} icon={"bi:three-dots"}/>  
          </div>
        </div>
        <div className="mt-8">
          <img className="rounded-lg" src={Foto} alt="" />
        </div>
        <p className="text-text-gray my-4 ">00.26 AM . July 30, 2025 . 92.5K Views</p>
        <div className="h-0.5 bg-dark-gray"></div>
        <div className="grid grid-cols-3 w-full">
          <PostButton icon={"uil:comment-lines"} text={200}/>
          <PostButton icon={"material-symbols:favorite-outline-rounded"} text={200}/>
          <PostButton icon={"material-symbols-light:bookmarks"} text={200}/>
        <div className="h-0.5 bg-dark-gray"></div>
        </div>
      </div>
    </div>

  );
}
