import { useEffect, useState } from "react";
import API_BASE_URL from "../../services/api";

interface Conversation {
  conversation_id: number;
  user_id: number;
  name: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
}

export default function MessageList() {
  const [messages, setMessages] = useState<Conversation[]>([]);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      const data = await res.json();
      setMessages(data.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  }

  function timeAgo(date: string) {
    const now = new Date();
    const created = new Date(date);

    const diff = Math.floor(
      (now.getTime() - created.getTime()) / 1000
    );

    if (diff < 60) return `${diff}s ago`;

    const minutes = Math.floor(diff / 60);

    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24) return `${hours} hr ago`;

    const days = Math.floor(hours / 24);

    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="text-xl font-bold mb-6">
        Recent Messages
      </h2>

      {messages.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No conversations yet.
        </div>
      ) : (
        <div className="space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.conversation_id}
              className="flex items-start gap-4 border-b pb-4 last:border-none hover:bg-gray-50 rounded-xl p-2 transition cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                {msg.name.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">
                  {msg.name}
                </h3>

                <p className="text-gray-500 text-sm truncate">
                  {msg.last_message}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-400">
                  {timeAgo(msg.last_message_time)}
                </span>

                {msg.unread_count > 0 && (
                  <div className="mt-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center ml-auto">
                    {msg.unread_count}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}