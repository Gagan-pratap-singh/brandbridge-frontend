import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

export default function DashboardLayout() {
  return (
    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="ml-64 flex-1">

        <Navbar />

        <main className="p-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
}