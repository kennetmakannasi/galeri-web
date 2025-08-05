import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react";
import { Link, useLocation } from "react-router"

export default function Sidebar(){
    const location = useLocation();
    const path = location.pathname;
    const [isOpened , setIsOpened] = useState(true);

    console.log(isOpened)
    
    return(
        <div className="absolute md:relative h-screen flex items-center">
        <div className={`w-56 h-screen border-r-2 bg-background-light-black border-dark-gray px-5 relative transition-all duration-150 md:translate-x-0 ${isOpened ? 'translate-x-0 z-30': '-translate-x-full'}`}>
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
                <li className="relative h-8 flex items-center">
                    <Icon className="absolute ml-3 text-gray-400" height={16} icon={'la:search'}/>
                    <input className="bg-dark-gray h-full px-9 w-full rounded-lg" type="text" placeholder="Search"/>
                </li>
                <li className="my-5">
                    <Link className="flex" to={''}>
                        <Icon height={20} icon={'basil:add-outline'}/>
                        <div className="relative">
                            <p className='ml-3 after:absolute after:h-0.5 after:bottom-0 after:w-0 after:left-0 after:bg-white after:ml-3 hover:after:w-full after:duration-150 after:transition-all'>Add Post</p>
                        </div>
                    </Link>
                </li>
            </ul>
            <div className="my-5 w-full absolute bottom-3">
                <div className="w-full flex relative h-full items-center">
                    <Link className="flex" to={'/profile'}>
                        <Icon height={20} icon={'iconamoon:profile-circle-fill'}/>
                        <div className="relative">
                            <p className={`ml-3 after:absolute after:h-0.5 after:bottom-0 after:w-0 after:left-0 after:bg-white after:ml-3 hover:after:w-full after:duration-150 after:transition-all
                                ${path === '/profile' ? 'after:absolute after:h-0.5 after:bottom-0 after:w-full after:left-0 after:bg-gradient-to-r after:from-bright-yellow after:to-white after:ml-3 after:duration-150 after:transition-all':''}`}>Profile</p>     
                        </div>
                    </Link>
                    <Link className="right-10 absolute rounded-full p-1 hover:bg-dark-gray transition-all duration-150" to={'/'}>
                        <Icon height={20} icon={'mdi-light:logout'}/>
                    </Link>
                </div>    
            </div>
        </div>    
            <button className={`md:hidden bg-dark-gray rounded-r-full hover:bg-dark-gray transition-all duration-150 ${isOpened ? '': 'absolute'}`} type="button" onClick={()=> setIsOpened(!isOpened)}>
                {isOpened ? <Icon height={25} icon={'ic:round-chevron-left'}/>: <Icon height={25} icon={'ic:round-chevron-right'}/>}
            </button>
        </div>
        
    )
}