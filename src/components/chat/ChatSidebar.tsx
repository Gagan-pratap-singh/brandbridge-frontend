import { useEffect, useState } from "react";
import { getConversations } from "../../services/messages";

interface Conversation {
  user_id: number;
  name: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
}

interface Props {
  selectedUser?: number;
  onSelectUser: (id: number) => void;
}

export default function ChatSidebar({
  selectedUser,
  onSelectUser,
}: Props) {
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [conversations, setConversations] = useState<
    Conversation[]
  >([]);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadConversations(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  async function loadConversations(
    keyword = ""
  ) {
    try {
      setLoading(true);

      const data =
        await getConversations(keyword);

      setConversations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-80 border-r bg-white flex flex-col">

      <div className="p-5 border-b">

        <h2 className="text-2xl font-bold">
          Messages
        </h2>

        <input
          placeholder="Search users..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="mt-4 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />

      </div>

      <div className="flex-1 overflow-y-auto">

        {loading ? (
          <p className="p-5 text-gray-500">
            Loading...
          </p>
        ) : conversations.length === 0 ? (
          <p className="p-5 text-gray-500">
            No conversations found
          </p>
        ) : (
          conversations.map((chat) => (
            <div
              key={chat.user_id}
              onClick={() =>
                onSelectUser(chat.user_id)
              }
              className={`flex items-center gap-4 p-5 cursor-pointer border-b hover:bg-gray-100 transition

                ${
                  selectedUser === chat.user_id
                    ? "bg-indigo-50"
                    : ""
                }
              `}
            >
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                {chat.name.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 overflow-hidden">

                <h3 className="font-semibold">
                  {chat.name}
                </h3>

                <p className="text-sm text-gray-500 truncate">
                  {chat.last_message}
                </p>

              </div>

              <div className="flex flex-col items-end">

                <span className="text-xs text-gray-400">
                  {new Date(
                    chat.last_message_time
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                {chat.unread_count > 0 && (
                  <span className="mt-2 bg-indigo-600 text-white text-xs rounded-full px-2 py-1">
                    {chat.unread_count}
                  </span>
                )}

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}