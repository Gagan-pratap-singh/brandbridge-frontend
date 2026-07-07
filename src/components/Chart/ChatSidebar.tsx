import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getConversations } from "../../services/messages";

interface Props {
  selectedUser?: number;
  onSelectUser: (id: number) => void;
}

export default function ChatSidebar({
  selectedUser,
  onSelectUser,
}: Props) {
  const navigate = useNavigate();

  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();

    const interval = setInterval(() => {
      loadConversations();
    }, 2000);

    return () => clearInterval(interval)
  }, []);

  async function loadConversations() {
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="w-80 border-r bg-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-80 border-r bg-white flex flex-col">
      <div className="p-5 border-b">
        <h2 className="font-bold text-xl">
          Messages
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-6 text-gray-500">
            No conversations yet.
          </div>
        ) : (
          conversations.map((chat) => (
            <button
              key={chat.conversation_id}
              onClick={() => {
                onSelectUser(chat.user_id);
                navigate(
                  `/dashboard/messages/${chat.user_id}`
                );
              }}
              className={`w-full p-4 text-left border-b hover:bg-gray-50 ${
                selectedUser === chat.user_id
                  ? "bg-indigo-50"
                  : ""
              }`}
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">
                  {chat.name}
                </h3>

                {chat.unread_count > 0 && (
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                )}
              </div>

              <p className="text-gray-500 text-sm truncate mt-1">
                {chat.last_message}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}