import { Icon } from "@iconify/react/dist/iconify.js"
import Dropdown from "./dropdown"
import { MenuItem } from "@headlessui/react"
import { useContext, useState } from "react"
import ReportModal from "./reportModal"
import { Link, useNavigate } from "react-router"
import Cookies from "js-cookie"
import EditComment from "./editComment"
import axios from "axios"
import { SessionData } from "./layout/mainLayout"

export default function Comment ({id, profilePicture, username, date, comment, profileLink}){

    const [isDialogOpen , setIsDialogOpen] = useState(false);
    const [isEditDialog, setIsEditDialog] = useState(false);
    const token = Cookies.get('token');
    const navigate = useNavigate();
    const sessionData = useContext(SessionData);

    async function handleDelete() {
      await axios.delete(`http://127.0.0.1:8000/api/comment/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

    navigate(0)
  }

    return(
        <div key={id} className="flex items-start gap-3">
          <Link to={`/profile/${profileLink}`}>
            <img
              src={`http://127.0.0.1:8000/storage/${profilePicture}`}
              alt="c-avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
          </Link>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{username}</p>
                  <p className="text-xs text-gray-400">{date}</p>
                </div>
                <Dropdown
                buttonContent={<Icon icon={"bi:three-dots"} height={18} />}
                dropdownContent={
                  <MenuItem>
                    <div className="flex flex-col">
                      {profileLink == sessionData?.username ? (
                        <>
                          <button onClick={()=>setIsEditDialog(!isEditDialog)} className="text-left px-3 py-2 hover:bg-gray-700 rounded">
                            Edit
                          </button>
                          <button onClick={handleDelete} className="text-left px-3 py-2 hover:bg-gray-700 rounded">
                            Delete Comment
                          </button>
                        </>
                      ):(
                                        <button
                        type="button"
                        className="text-left px-3 py-2 hover:bg-gray-700 rounded"
                          onClick={() => setIsDialogOpen(!isDialogOpen)}
                    >
                        Report
                    </button>    
                      )}

                    </div>
                  </MenuItem>
                }
              />
              </div>
              <p className="mt-1 text-sm text-gray-200">{comment}</p>
            </div>
            <ReportModal open={isDialogOpen} 
                onClose={()=>setIsDialogOpen(false)} 
                triggerClose={()=>setIsDialogOpen(false)}
                repObj={"comment"}
                repId={id}
            />
            <EditComment open={isEditDialog}
            onClose={()=>setIsEditDialog(false)} 
            commentId={id}
            />
        </div>
    )
}