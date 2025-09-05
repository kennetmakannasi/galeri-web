import { Icon } from "@iconify/react/dist/iconify.js"
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router"
import Cookies from "js-cookie";
import { UseToken } from "../helpers/useToken";
import axios from "axios";
import UploadModal from "./AddPost";
import { SessionData } from "./layout/mainLayout";
import SearchBar from "./searchbar";

export default function Sidebar(){
    const baseUrl = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const path = location.pathname;
    const [isOpened , setIsOpened] = useState(true);
    const sessionData = useContext(SessionData);
    const navigate = useNavigate()

    async function handleLogOut(){
        await axios.get(`${baseUrl}/api/auth/logout`,{
            headers: {
                Authorization: `Bearer ${UseToken()}`
            }
        })
        Cookies.remove("token")
        Cookies.remove("uId")
        navigate('/auth/login')
    }

    return(
        <div>
        <div className={`fixed top-0 left-0 md:translate-x-0 h-screen w-56 border-r-2 bg-background-light-black border-dark-gray px-5 transition-all duration-150 z-30
          ${isOpened ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="py-7">
                <h1 className="ml-1">Gallery Photo</h1>
                <div className="w-full mt-4 h-0.5 bg-gradient-to-r from-bright-yellow  to-white"></div>
            </div>
            <ul>
                <li className="my-5">
                    <Link className="flex" to={'/'}>
                        <Icon height={20} icon={'iconamoon:home'}/>
                        <div className="relative">
                            <p className={`ml-3 after:absolute after:h-0.5 after:bottom-0 after:w-0 after:left-0 after:bg-white after:ml-3 hover:after:w-full after:duration-150 after:transition-all
                                ${path === '/' ? 'after:absolute after:h-0.5 after:bottom-0 after:w-full after:left-0 after:bg-gradient-to-r after:from-bright-yellow after:to-white after:ml-3 after:duration-150 after:transition-all':''}`}>Home</p>    
                        </div>
                    </Link>
                </li>
                <li className="my-5">
                    <Link className="flex" to={'/explore'}>
                        <Icon height={20} icon={'material-symbols:explore-rounded'}/>
                        <div className="relative">
                            <p className={`ml-3 after:absolute after:h-0.5 after:bottom-0 after:w-0 after:left-0 after:bg-white after:ml-3 hover:after:w-full after:duration-150 after:transition-all
                                ${path === '/explore' ? 'after:absolute after:h-0.5 after:bottom-0 after:w-full after:left-0 after:bg-gradient-to-r after:from-bright-yellow after:to-white after:ml-3 after:duration-150 after:transition-all':''}`}>Explore</p>
                        </div>
                    </Link>
                </li>
                <li className="my-5">
                    <Link className="flex" to={'/bookmark'}>
                        <Icon height={20} icon={'material-symbols-light:bookmarks'}/>
                        <div className="relative">
                            <p className={`ml-3 after:absolute after:h-0.5 after:bottom-0 after:w-0 after:left-0 after:bg-white after:ml-3 hover:after:w-full after:duration-150 after:transition-all
                                ${path === '/bookmark' ? 'after:absolute after:h-0.5 after:bottom-0 after:w-full after:left-0 after:bg-gradient-to-r after:from-bright-yellow after:to-white after:ml-3 after:duration-150 after:transition-all':''}`}>Bookmark</p>    
                        </div>
                    </Link>
                </li>
                <li>
                    <SearchBar/>
                </li>
                <li className="my-5">
                    <UploadModal/>
                </li>
            </ul>
            <div className="my-5 w-full absolute bottom-3">
                <div className="w-full flex relative h-full items-center">
                    <Link className="flex" to={`/profile/${sessionData?.username}`}>
                        <Icon height={20} icon={'iconamoon:profile-circle-fill'}/>
                        <div className="relative">
                            <p className={`ml-3 after:absolute after:h-0.5 after:bottom-0 after:w-0 after:left-0 after:bg-white after:ml-3 hover:after:w-full after:duration-150 after:transition-all
                                ${path === '/profile' ? 'after:absolute after:h-0.5 after:bottom-0 after:w-full after:left-0 after:bg-gradient-to-r after:from-bright-yellow after:to-white after:ml-3 after:duration-150 after:transition-all':''}`}>Profile</p>     
                        </div>
                    </Link>
                    <button type="button" onClick={handleLogOut} className="right-10 absolute rounded-full p-1 hover:bg-dark-gray transition-all duration-150" to={'/'}>
                        <Icon height={20} icon={'mdi-light:logout'}/>
                    </button>
                </div>    
            </div>
        </div>    
        <button className={`md:hidden fixed top-20 left-0 bg-dark-gray rounded-r-full hover:bg-dark-gray transition-all w-2 h-20 z-40 duration-150 ${
            isOpened ? 'ml-56' : 'left-0'
        }`}
        type="button"
        onClick={() => setIsOpened(!isOpened)}
      ></button>
        </div>
        
    )
}