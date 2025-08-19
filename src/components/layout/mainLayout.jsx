import Sidebar from "../sidebar"
import { Outlet } from "react-router"

export default function MainLayout(){
    return(
        <div className="flex">
            <Sidebar/>
            <div className="m-6 absolute md:relative w-full">
                <Outlet/>    
            </div>
        </div>
    )
}