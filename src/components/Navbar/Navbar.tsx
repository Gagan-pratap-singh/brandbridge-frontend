import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { getUnreadCount } from "../../services/notifications";

export default function Navbar() {
  const [unread, setUnread] = useState(0);

  const location = useLocation();

  const isInfluencer = location.pathname.startsWith("/influencer");

  const notificationLink = isInfluencer
    ? "/influencer/notifications"
    : "/dashboard/notifications";

  const profileLink = isInfluencer
    ? "/influencer/profile"
    : "/dashboard/profile";

  const loadUnreadCount = async () => {
    try {
      const data = await getUnreadCount();
      setUnread(data.unread);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUnreadCount();

    // Refresh every 5 seconds
    const interval = setInterval(() => {
      loadUnreadCount();
    }, 5000);

    // Refresh instantly when notifications change
    const refresh = () => {
      loadUnreadCount();
    };

    window.addEventListener(
      "notificationUpdated",
      refresh
    );

    return () => {
      clearInterval(interval);
      window.removeEventListener(
        "notificationUpdated",
        refresh
      );
    };
  }, []);

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
        <Link to={notificationLink}>
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <FaBell size={22} />

            {unread > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>
        </Link>

        {/* Profile */}
        <Link to={profileLink}>
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