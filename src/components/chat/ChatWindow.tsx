import { useEffect, useRef, useState } from "react";
import { getChat } from "../../services/messages";

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

  const bottomRef = useRef<HTMLDivElement>(null);

  const myId = Number(localStorage.getItem("user_id"));

  useEffect(() => {
    if (!selectedUser) return;

    // Load messages immediately
    loadMessages();

    // Refresh every 2 seconds
    const interval = setInterval(() => {
      loadMessages();
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedUser]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function loadMessages() {
    if (!selectedUser) return;

    try {
      const data = await getChat(selectedUser);

      setMessages((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(data)) {
          return data;
        }
        return prev;
      });
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
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <h2 className="font-bold text-xl">
          Chat
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">
            No messages yet.
          </p>
        ) : (
          messages.map((msg) => {
            const mine = msg.sender_id === myId;

            return (
              <div
                key={msg.id}
                className={`flex ${
                  mine ? "justify-end" : "justify-start"
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