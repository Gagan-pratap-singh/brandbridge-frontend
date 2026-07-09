import { useEffect, useState } from "react";
import {
  FaBell,
  FaCheckCircle,
  FaEnvelope,
  FaBullhorn,
} from "react-icons/fa";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../../services/notifications";

interface Notification {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  async function loadNotifications() {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRead(id: number) {
    try {
      await markAsRead(id);

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id
            ? { ...n, is_read: true }
            : n
        )
      );

      // Refresh Navbar badge
      window.dispatchEvent(
        new Event("notificationUpdated")
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function handleReadAll() {
    try {
      await markAllAsRead();

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          is_read: true,
        }))
      );

      // Refresh Navbar badge
      window.dispatchEvent(
        new Event("notificationUpdated")
      );
    } catch (err) {
      console.error(err);
    }
  }

  function getIcon(title: string) {
    const text = title.toLowerCase();

    if (text.includes("message")) {
      return (
        <FaEnvelope className="text-indigo-600" />
      );
    }

    if (
      text.includes("accepted") ||
      text.includes("success")
    ) {
      return (
        <FaCheckCircle className="text-green-600" />
      );
    }

    if (
      text.includes("campaign") ||
      text.includes("invitation")
    ) {
      return (
        <FaBullhorn className="text-orange-600" />
      );
    }

    return (
      <FaBell className="text-blue-600" />
    );
  }

  const unreadCount = notifications.filter(
    (n) => !n.is_read
  ).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Notifications
          </h1>

          <p className="text-gray-500">
            Stay updated with your campaigns
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleReadAll}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl"
          >
            Mark All Read
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border shadow-sm">
        {loading ? (
          <div className="p-6 text-center">
            Loading...
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No notifications yet.
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-5 p-6 border-b hover:bg-gray-50 ${
                !item.is_read
                  ? "bg-indigo-50"
                  : ""
              }`}
            >
              <div className="text-2xl">
                {getIcon(item.title)}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-1">
                  {item.message}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </p>
              </div>

              {!item.is_read && (
                <button
                  onClick={() =>
                    handleRead(item.id)
                  }
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
                >
                  Mark Read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}