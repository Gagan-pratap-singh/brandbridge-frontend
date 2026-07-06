import { useState } from "react";
import {
  FaPaperclip,
  FaSmile,
  FaPaperPlane,
} from "react-icons/fa";

import { sendMessage } from "../../services/messages";

interface Props {
  selectedUser?: number;
  onMessageSent?: () => void;
}

export default function MessageInput({
  selectedUser,
  onMessageSent,
}: Props) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend() {
    if (!selectedUser) return;

    if (!message.trim()) return;

    try {
      setSending(true);

      await sendMessage(
        selectedUser,
        message
      );

      setMessage("");

      onMessageSent?.();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  if (!selectedUser) {
    return (
      <div className="border-t bg-white p-5 text-center text-gray-500">
        Select a conversation to start chatting
      </div>
    );
  }

  return (
    <div className="bg-white border-t p-5">
      <div className="flex items-center gap-4">

        <button className="text-gray-500 hover:text-indigo-600 text-xl">
          <FaPaperclip />
        </button>

        <button className="text-gray-500 hover:text-indigo-600 text-xl">
          <FaSmile />
        </button>

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleSend}
          disabled={sending}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl disabled:opacity-50"
        >
          <FaPaperPlane />
        </button>

      </div>
    </div>
  );
}