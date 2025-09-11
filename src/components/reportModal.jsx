import { Dialog , DialogPanel } from "@headlessui/react"
import { Icon } from "@iconify/react/dist/iconify.js"
import axios from "axios"
import { UseToken } from "../helpers/useToken"

export default function ReportModal({open, onClose, repObj, triggerClose, repId}){
    const baseUrl = import.meta.env.VITE_API_URL;

    async function handleReport(msg) {
        const payload =
        {
            reporter_obj: repObj,
            object_id: repId,
            reporter_msg: msg
        }

        await axios.post(`${baseUrl}/api/report`
        ,payload,
        {
            headers: {
            Authorization: `Bearer ${UseToken()}`
            }
        }
        )
    }

    return(
        <>
        <Dialog open={open} className="fixed z-60 inset-0 flex size-full justify-center items-center bg-black/50" onClose={onClose}>
            <DialogPanel
                transition 
                className="duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 flex size-full items-center "
            >
                <div className="size-full flex justify-center items-center px-4">
                    <div className="bg-dark-gray rounded-xl flex items-center justify-center">
                        <div className="w-full p-5">
                            <div className="flex items-center">
                                <button onClick={triggerClose}>
                                    <Icon height={30} icon={'iconoir:cancel'}/>
                                </button>
                                <p className="text-xl ml-3">Why are you Reporting?</p>    
                            </div>
                            <ul className="mt-3">
                                <li>
                                    <button className="ml-4 py-2" onClick={()=>handleReport('option1')}>Option1</button>
                                </li>
                                <li>
                                    <button className="ml-4 py-2" onClick={()=>handleReport('option2')}>Option2</button>
                                </li>
                                <li>
                                    <button className="ml-4 py-2" onClick={()=>handleReport('option3')}>Option3</button>
                                </li>
                                <li>
                                    <button className="ml-4 py-2" onClick={()=>handleReport('option4')}>Option4</button>
                                </li>
                                <li>
                                    <button className="ml-4 py-2" onClick={()=>handleReport('option5')}>Option5</button>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
        </>
    )
}