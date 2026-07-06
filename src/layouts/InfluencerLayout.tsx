import { Outlet } from "react-router-dom";
import InfluencerSidebar from "../components/Sidebar/InfluencerSidebar";
import Navbar from "../components/Navbar/Navbar";

export default function InfluencerLayout() {
  return (
    <div className="flex bg-gray-100">
      <InfluencerSidebar />

      <div className="ml-64 flex-1">
        <Navbar />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}