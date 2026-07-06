import { useEffect, useState } from "react";
import websocket from "../services/websocket";

const API = "http://127.0.0.1:8000";

export default function useChat(userId: number) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // -------------------------
  // Load old chat
  // -------------------------
  useEffect(() => {
    if (!userId) return;

    loadMessages();

    const myId = Number(localStorage.getItem("user_id"));

    websocket.connect(myId, (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => websocket.disconnect();

  }, [userId]);

  // -------------------------
  // Load history
  // -------------------------
  async function loadMessages() {

    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API}/messages/chat/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setMessages(data);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);

  }

  // -------------------------
  // Send
  // -------------------------
  async function sendMessage(text: string) {

    const token = localStorage.getItem("token");

    await fetch(`${API}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        receiver_id: userId,
        message: text,
      }),
    });

    websocket.send({
      receiver_id: userId,
      sender_id: Number(localStorage.getItem("user_id")),
      message: text,
      created_at: new Date(),
    });

  }

  return {

    messages,

    loading,

    sendMessage,

    reload: loadMessages,

  };

}