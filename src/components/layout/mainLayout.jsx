import Sidebar from "../sidebar"
import { Outlet } from "react-router"

export default function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:pl-56 relative">
        <Outlet />
      </div>
    </div>
  );
}
