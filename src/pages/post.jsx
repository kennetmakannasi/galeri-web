import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import OrgGanteng from "../assets/OrgGanteng.jpg";
import Foto from "../assets/sunset.jpeg"

export default function AddPostModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // <div style={{ minHeight: "100vh", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
    //   {/* Tombol buka modal */}
    //   <button
    //     onClick={() => setIsOpen(true)}
    //     style={{
    //       padding: "10px 20px",
    //       background: "#2563eb",
    //       color: "#fff",
    //       borderRadius: "8px",
    //       border: "none",
    //       cursor: "pointer"
    //     }}
    //   >
    //     Add Post
    //   </button>

    //   {/* Modal */}
    //   {isOpen && (
    //     <div style={{
    //       position: "fixed",
    //       inset: 0,
    //       background: "rgba(0,0,0,0.5)",
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "center",
    //       zIndex: 50
    //     }}>
    //       <div style={{
    //         background: "#2c2c2c",
    //         padding: "20px",
    //         borderRadius: "16px",
    //         maxWidth: "800px",
    //         width: "100%",
    //         display: "flex",
    //         gap: "16px",
    //         position: "relative"
    //       }}>
    //         {/* Upload Box */}
    //         <div style={{
    //           flex: 1,
    //           background: "#3b3b3b",
    //           borderRadius: "12px",
    //           display: "flex",
    //           flexDirection: "column",
    //           alignItems: "center",
    //           justifyContent: "center",
    //           padding: "20px",
    //           color: "white"
    //         }}>
    //           <div style={{ fontSize: "40px" }}>⬆️</div>
    //           <p>Select a file or drag and drop it here</p>
    //           <small style={{ opacity: 0.7 }}>
    //             Use high-quality .jpg files &lt; 20MB or .mp4 files &lt; 200MB.
    //           </small>
    //         </div>

    //         {/* Form */}
    //         <div style={{
    //           flex: 1,
    //           background: "#4b4b4b",
    //           borderRadius: "12px",
    //           padding: "10px",
    //           display: "flex",
    //           flexDirection: "column",
    //           gap: "10px",
    //           color: "white"
    //         }}>
    //           <input
    //             type="text"
    //             placeholder="Add Title"
    //             style={{
    //               background: "transparent",
    //               border: "1px solid gray",
    //               borderRadius: "8px",
    //               padding: "8px",
    //               color: "white"
    //             }}
    //           />
    //           <textarea
    //             placeholder="Add caption"
    //             style={{
    //               background: "transparent",
    //               border: "1px solid gray",
    //               borderRadius: "8px",
    //               padding: "8px",
    //               color: "white",
    //               height: "100px"
    //             }}
    //           ></textarea>
    //           <button style={{
    //             padding: "8px",
    //             background: "#2563eb",
    //             borderRadius: "8px",
    //             color: "white",
    //             border: "none"
    //           }}>
    //             Post
    //           </button>
    //         </div>

    //         {/* Close Button */}
    //         <button
    //           onClick={() => setIsOpen(false)}
    //           style={{
    //             position: "absolute",
    //             top: "10px",
    //             right: "10px",
    //             fontSize: "20px",
    //             background: "transparent",
    //             border: "none",
    //             color: "white",
    //             cursor: "pointer"
    //           }}
    //         >
    //           ✖
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </div>
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
          <div className="flex items-center text-text-gray w-full m-4">
            <Icon height={20} icon={"uil:comment-lines"}/>
            <p className="ml-3">200</p>
          </div>
          <div className="flex items-center text-text-gray w-full m-4">
            <Icon height={20} icon={"material-symbols:favorite-outline-rounded"}/>
            <p className="ml-3">200</p>
          </div>
          <div className="flex items-center text-text-gray w-full m-4">
            <Icon height={20} icon={"material-symbols-light:bookmarks"}/>
            <p className="ml-3">200</p>
          </div>
        <div className="h-0.5 bg-dark-gray"></div>
        </div>
      </div>
    </div>

  );
}
