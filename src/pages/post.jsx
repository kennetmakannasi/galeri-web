import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import OrgGanteng from "../assets/OrgGanteng.jpg";
import yard from "../assets/yard.jpeg";
import Dropdown from "../components/dropdown";
import { useLoaderData } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";

export async function PostLoader({params}){
  const token = Cookies.get("token")
  const res = await axios.get(`http://127.0.0.1:8000/api/post/${params.id}`,
    {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
  )
  return res.data.content
}

export default function PostPage() {
  const data = useLoaderData();
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "madeby.nath",
      handle: "@_madeby.nath",
      time: "July 30",
      text: "Bismillah UI #AssalamualaikumUI",
      avatar: OrgGanteng,
    },
    {
      id: 2,
      name: "madeby.nath",
      handle: "@_madeby.nath",
      time: "July 30",
      text: "—",
      avatar: OrgGanteng,
    },
  ]);

  const [reply, setReply] = useState("");

  const addComment = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    const newComment = {
      id: Date.now(),
      name: "You",
      handle: "@you",
      time: "Just now",
      text: reply.trim(),
      avatar: OrgGanteng,
    };
    setComments((c) => [newComment, ...c]);
    setReply("");
  };

  return (
    <div className="min-h-screen bg-background-light-black text-white px-4 lg:px-20 py-6">
      <div className="max-w-3xl mx-auto">
        {/* post card */}
        <div className="bg-[#0b0b0b] rounded-lg p-4 shadow-md border border-[#1f1f1f]">
          {/* header */}
          <div className="flex items-start gap-3">
            <img
              src={data.post.user.profile_picture}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#2b2b2b]"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{data.post.user.username}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Dropdown
                    buttonContent={<Icon icon={"bi:three-dots"} height={18} />}
                    dropdownContent={
                      <div className="flex flex-col">
                        <button
                          type="button"
                          className="text-left px-3 py-2 hover:bg-gray-700 rounded"
                          onClick={() => console.log("report clicked")}
                        >
                          Report
                        </button>
                      </div>
                    }
                  />
                </div>
              </div>

              {/* caption */}
              <p className="mt-3 text-sm leading-relaxed">
                {data.post.description}
              </p>
            </div>
          </div>

          {/* image */}
          <div className="mt-4">
            <img
              src={data.post.image_url}
              alt="post"
              className="w-full rounded-lg object-cover border border-[#222] max-h-[640px]"
            />
          </div>

          {/* meta */}
          <div className="mt-3 text-xs text-gray-400">
            00.26 AM · July 30, 2025 · 92.5K Views
          </div>

          {/* actions row */}
          <div className="mt-3 flex items-center justify-between text-gray-300">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Icon icon={"uil:comment-lines"} />
                <span>{data.Comment_count}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon icon={"material-symbols:favorite-outline-rounded"} />
                <span>{data.Likes}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon icon={"material-symbols-light:bookmarks"} />
                <span>{data.Saves}</span>
              </div>
            </div>
          </div>

          {/* reply input (sesuai request: "Post your reply") */}
          <form onSubmit={addComment} className="mt-4">
            <div className="flex items-center gap-3">
              <img
                src={OrgGanteng}
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover"
              />
              <input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Post your reply"
                className="flex-1 bg-[#0b0b0b] border border-[#222] rounded-full px-4 py-2 text-sm outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="ml-2 px-3 py-1 rounded-md bg-gradient-to-b from-gray-600 to-gray-700 border border-gray-500 text-sm"
              >
                Reply
              </button>
            </div>
          </form>

          {/* separator */}
          <div className="h-px bg-[#1f1f1f] my-4" />

          {/* comments list - COMMENT AJA, sesuai permintaan */}
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="flex items-start gap-3">
                <img
                  src={c.avatar}
                  alt="c-avatar"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.handle} · {c.time}</p>
                    </div>
                    <Icon icon={"bi:three-dots"} height={16} />
                  </div>
                  <p className="mt-1 text-sm text-gray-200">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}