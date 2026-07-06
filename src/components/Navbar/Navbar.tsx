import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-6">

        {/* Notifications */}
        <Link to="/dashboard/notifications">
          <button
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FaBell size={22} />

            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              3
            </span>
          </button>
        </Link>

        {/* Profile */}
        <Link to="/dashboard/profile">
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="w-12 h-12 rounded-full cursor-pointer hover:ring-2 hover:ring-indigo-500 transition"
          />
        </Link>

      </div>
    </header>
  );
}