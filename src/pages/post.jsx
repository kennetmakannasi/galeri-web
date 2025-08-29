import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import OrgGanteng from "../assets/OrgGanteng.jpg";
import Dropdown from "../components/dropdown";
import { Form, useFetcher, useNavigate, useParams } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import ReportModal from "../components/reportModal";
import { MenuItem } from "@headlessui/react";
import Comment from "../components/comment";

export async function handleComment({request,params}) {
  const token = Cookies.get("token")
  const formData = await request.formData();
  const post_id = params.id
  const comment = formData.get("comment")
  const data = {
    post_id : post_id,
    comment : comment,
  }
    
  await axios.post('http://127.0.0.1:8000/api/comment', data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return null
}

export default function PostPage() {

  const fetcher = useFetcher();
  const [data , setData] = useState();
  const token = Cookies.get("token")
  const navigate = useNavigate()
  const {id} = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  async function fetchData() {
    const res = await axios.get(`http://127.0.0.1:8000/api/post/${id}`
      ,
    {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    setData(res.data.content)
  }

  useEffect(()=>{
    fetchData()
  },[])

  console.log(data)

  async function handleLike() {
    await axios.post(`http://127.0.0.1:8000/api/like/${data.post.id}`
      ,{},
    {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  async function handleSave() {
    await axios.post(`http://127.0.0.1:8000/api/save`
      ,{
        'post_id': data.post.id
      },
    {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  useEffect(() => {
  if (fetcher.state === "idle" && fetcher.data == null) {
    fetchData();
  }
}, [fetcher.state]);

  return(
    <div className="min-h-screen bg-background-light-black text-white px-4 lg:px-20 py-6">
      <div className="max-w-3xl mx-auto">
        {/* post card */}
        <div className="bg-[#0b0b0b] rounded-lg p-4 shadow-md border border-[#1f1f1f]">
          {/* header */}
          <div className="flex items-start gap-3">
            <img
              src={data?.post?.user?.profile_picture}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#2b2b2b]"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{data?.post?.user?.username}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Dropdown
                    buttonContent={<Icon icon={"bi:three-dots"} height={18} />}
                    dropdownContent={
                      <MenuItem>
                        <div className="flex flex-col">
                          <button
                              type="button"
                              className="text-left px-3 py-2 hover:bg-gray-700 rounded"
                              onClick={() => setIsDialogOpen(!isDialogOpen)}
                          >
                              Report
                          </button>
                        </div>
                      </MenuItem>
                    }
                  />
                </div>
                <ReportModal open={isDialogOpen} 
                onClose={()=>setIsDialogOpen(false)} 
                triggerClose={()=>setIsDialogOpen(false)}
                repObj={"post"}
                repId={data?.post?.id}/>
              </div>

              {/* caption */}
              <p className="mt-3 text-sm leading-relaxed">
                {data?.post?.description}
              </p>
            </div>
          </div>

          {/* image */}
          <div className="mt-4">
            <img
              src={data?.post?.image_url}
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
                <span>{data?.Comment_count}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <button onClick={()=> {handleLike(); fetchData();}} type="button">
                  {/* 👍 */}
                  <Icon icon={data?.liked ? "material-symbols:favorite-rounded":"material-symbols:favorite-outline-rounded"} />  
                </button>
                
                <span>{data?.Likes}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <button onClick={()=>{handleSave(); fetchData();}} type="button">
                <Icon icon={data?.saved ?"material-symbols-light:bookmarks" : "material-symbols-light:bookmarks-outline"} />  
                {/* 🔖 */}
                </button>
                
                <span>{data?.Saves}</span>
              </div>
            </div>
          </div>

          {/* reply input (sesuai request: "Post your reply") */}
          <div className="mt-4">
            <div className="flex items-center gap-3">
              <img
                src={OrgGanteng}
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover"
              />
              <fetcher.Form method="post">
                <input
                  name="comment"
                  type="text"
                  className="flex-1 bg-[#0b0b0b] border border-[#222] rounded-full px-4 py-2 text-sm outline-none focus:ring-0"
                />
                <button
                  type="submit"
                  className="ml-2 px-3 py-1 rounded-md bg-gradient-to-b from-gray-600 to-gray-700 border border-gray-500 text-sm"
                >
                  Reply
                </button>   
              </fetcher.Form>

            </div>
          </div>

          {/* separator */}
          <div className="h-px bg-[#1f1f1f] my-4" />

          {/* comments list - COMMENT AJA, sesuai permintaan */}
          <div className="space-y-4">
            {data?.post?.comments?.map((c) => (
              <Comment
                id={c.id}
                profilePicture={c.user.profile_picture}
                username={c.user.username}
                date={c.created_at}
                comment={c.comment}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}