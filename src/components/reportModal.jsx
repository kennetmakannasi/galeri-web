import { Dialog , DialogPanel } from "@headlessui/react"
import { Icon } from "@iconify/react/dist/iconify.js"
import axios from "axios"
import { UseToken } from "../helpers/useToken"
import ModalLayout from "./layout/modalLayout";

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
        <ModalLayout open={open} onClose={onClose} content={
            <>
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
            </>
        }/>
    )
}