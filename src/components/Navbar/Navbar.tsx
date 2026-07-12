import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import API_BASE_URL from "../../services/api";
import { getUnreadCount } from "../../services/notifications";

export default function Navbar() {
  const [profile, setProfile] = useState<any>(null);
  const [unread, setUnread] = useState(0);

  const location = useLocation();

  const isInfluencer = location.pathname.startsWith("/influencer");

  const notificationLink = isInfluencer
    ? "/influencer/notifications"
    : "/dashboard/notifications";

  const profileLink = isInfluencer
    ? "/influencer/profile"
    : "/dashboard/profile";

  const defaultAvatar = "https://i.pravatar.cc/150?img=12";

  // Load profile
  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const endpoint = isInfluencer
        ? `${API_BASE_URL}/influencers/profile/me`
        : `${API_BASE_URL}/brands/profile`;

      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Load unread notifications
  const loadUnreadCount = async () => {
    try {
      const data = await getUnreadCount();
      setUnread(data.unread);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProfile();
    loadUnreadCount();

    const interval = setInterval(() => {
      loadUnreadCount();
    }, 5000);

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
  }, [isInfluencer]);

  return (
    <header className="h-20 bg-white shadow-sm border-b flex items-center justify-between px-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>
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
            src={
              profile?.logo_url
                ? `${API_BASE_URL}${profile.logo_url}`
                : profile?.profile_picture
                ? `${API_BASE_URL}${profile.profile_picture}`
                : defaultAvatar
            }
            alt="Profile"
            onError={(e) => {
              e.currentTarget.src = defaultAvatar;
            }}
            className="w-12 h-12 rounded-full object-cover cursor-pointer border-2 border-gray-200 hover:ring-2 hover:ring-indigo-500 transition"
          />
        </Link>

      </div>
    </header>
  );
}