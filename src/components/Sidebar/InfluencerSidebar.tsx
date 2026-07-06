import {
  FaHome,
  FaSearch,
  FaClipboardList,
  FaEnvelope,
  FaBell,
  FaBookmark,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";

const menus = [
  {
    name: "Dashboard",
    path: "/influencer",
    icon: <FaHome />,
  },
  {
    name: "Discover Campaigns",
    path: "/influencer/discover",
    icon: <FaSearch />,
  },
  {
    name: "My Applications",
    path: "/influencer/applications",
    icon: <FaClipboardList />,
  },
  {
    name: "Messages",
    path: "/influencer/messages",
    icon: <FaEnvelope />,
  },
  {
    name: "Invites",
    path: "/influencer/invitations",
    icon: <FaPaperPlane />,
 },
  {
    name: "Notifications",
    path: "/influencer/notifications",
    icon: <FaBell />,
  },
  {
    name: "Bookmarks",
    path: "/influencer/bookmarks",
    icon: <FaBookmark />,
  },
  {
    name: "Profile",
    path: "/influencer/profile",
    icon: <FaUserCircle />,
  },
  {
    name: "Settings",
    path: "/influencer/settings",
    icon: <FaCog />,
  },
];

export default function InfluencerSidebar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };    

  return (
<aside className="fixed left-0 top-0 w-64 h-screen bg-white border-r shadow-sm flex flex-col overflow-hidden">

  <div className="text-3xl font-bold text-indigo-600 p-8 border-b">
    BrandBridge
  </div>

  <nav className="flex-1 overflow-y-auto px-4 py-4">
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

  <div className="border-t p-4 bg-white">
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-red-600 hover:bg-red-50"
    >
      <FaSignOutAlt />
      Logout
    </button>
  </div>

</aside>
  );
}