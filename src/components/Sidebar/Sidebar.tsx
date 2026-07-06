import {
  FaHome,
  FaBullhorn,
  FaFileAlt,
  FaEnvelope,
  FaBell,
  FaUserCircle,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { FaSearch,} from "react-icons/fa";

const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaHome />,
  },
  {
    name: "Campaigns",
    path: "/dashboard/campaigns",
    icon: <FaBullhorn />,
  },
  {
    name: "Influencers",
    path: "/dashboard/influencers",
    icon: <FaSearch />,
  },
  {
    name: "Applications",
    path: "/dashboard/applications",
    icon: <FaFileAlt />,
  },
  {
    name: "Messages",
    path: "/dashboard/messages",
    icon: <FaEnvelope />,
  },
  {
  name: "Invitations",
  path: "/dashboard/invitations",
  icon: <FaPaperPlane />,
  },
  {
    name: "Notifications",
    path: "/dashboard/notifications",
    icon: <FaBell />,
  },
  {
    name: "Analytics",
    path: "/dashboard/analytics",
    icon: <FaChartBar />,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: <FaUserCircle />,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <FaCog />,
  },
];

export default function Sidebar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="text-3xl font-bold text-indigo-600 p-8">
        BrandBridge
      </div>

      {/* Menu */}
      <nav className="px-4 flex-1 overflow-y-auto">
        {menus.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl mb-2 transition-all ${
              location.pathname === item.path
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-indigo-50"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-red-600 hover:bg-red-50 transition-all"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}