import { Icon } from "@iconify/react/dist/iconify.js"
import Dropdown from "./dropdown"
import { MenuItem } from "@headlessui/react"
import { useState } from "react"
import ReportModal from "./reportModal"

export default function Comment ({id, profilePicture, username, date, comment}){

    const [isDialogOpen , setIsDialogOpen] = useState(false)

    return(
        <div key={id} className="flex items-start gap-3">
            <img
              src={`http://127.0.0.1:8000/storage/${profilePicture}`}
              alt="c-avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
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
              <p className="mt-1 text-sm text-gray-200">{comment}</p>
            </div>
            <ReportModal open={isDialogOpen} 
                onClose={()=>setIsDialogOpen(false)} 
                triggerClose={()=>setIsDialogOpen(false)}
                repObj={"comment"}
                repId={id}
            />
        </div>
    )
}