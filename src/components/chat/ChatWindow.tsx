import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { getChat, connectSocket } from "../../services/messages";
import { getInfluencer } from "../../services/influencerService";
import API_BASE_URL from "../../services/api";

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: string;
}

interface Props {
  selectedUser?: number;
}

export default function ChatWindow({
  selectedUser,
}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<any>(null);
  const [online, setOnline] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const myId = Number(localStorage.getItem("user_id"));

  useEffect(() => {
    if (!selectedUser) return;

    loadMessages();
  }, [selectedUser]);

  useEffect(() => {
    async function loadUser() {
      if (!selectedUser) return;

      try {
        const data = await getInfluencer(selectedUser);
        setUser(data);

        const res = await fetch(
          `${API_BASE_URL}/users/${selectedUser}/status`
        );

        const status = await res.json();
        setOnline(status.online);
      } catch (err) {
        console.error(err);
      }
    }

    loadUser();
  }, [selectedUser]);

  useEffect(() => {
    if (!myId) return;

    const socket = connectSocket(myId);

    const handleIncoming = (event: MessageEvent) => {
      try {
        const incoming: Message = JSON.parse(event.data);

        const belongsToThisChat =
          incoming.sender_id === selectedUser ||
          incoming.sender_id === myId;

        if (!belongsToThisChat) return;

        setMessages((prev) => {
          if (prev.some((m) => m.id === incoming.id)) {
            return prev;
          }

          return [...prev, incoming];
        });
      } catch {
        // Ignore invalid websocket payloads
      }
    };

    socket.addEventListener("message", handleIncoming);

    return () => {
      socket.removeEventListener("message", handleIncoming);
    };
  }, [selectedUser, myId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function loadMessages() {
    if (!selectedUser) return;

    try {
      const data = await getChat(selectedUser);
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a conversation
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-0">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={
              user?.profile_image
                ? `${API_BASE_URL}${user.profile_image}`
                : "https://i.pravatar.cc/150"
            }
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover border"
          />

          <div>
            <h2 className="font-bold text-xl">
              {user?.name || "Loading..."}
            </h2>

            <p
              className={`text-sm ${
                online
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {online ? "🟢 Online" : "⚪ Offline"}
            </p>
          </div>
        </div>

        <Link
          to={`/dashboard/influencers/${selectedUser}`}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
        >
          View Profile
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">
            No messages yet.
          </p>
        ) : (
          messages.map((msg) => {
            const mine = msg.sender_id === myId;

            return (
              <div
                key={msg.id}
                className={`flex ${
                  mine
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md rounded-2xl px-4 py-3 shadow ${
                    mine
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <p>{msg.message}</p>

                  <p className="text-xs mt-2 opacity-70 text-right">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}