import { useRef, useState } from "react";
import {
  FaPaperclip,
  FaSmile,
  FaPaperPlane,
} from "react-icons/fa";

import {
  sendMessage,
  uploadMessageFile,
  getSocket,
} from "../../services/messages";

interface Props {
  selectedUser?: number;
  onMessageSent?: () => void;
}

const EMOJIS = [
  "😀", "😂", "😍", "😊", "😉", "😎", "🤔", "😢",
  "😭", "😡", "👍", "👎", "👏", "🙏", "🔥", "🎉",
  "❤️", "💯", "✅", "❌", "🚀", "👀", "💡", "😴",
];

export default function MessageInput({
  selectedUser,
  onMessageSent,
}: Props) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function broadcast(saved: any) {
    const socket = getSocket();

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          ...saved,
          receiver_id: selectedUser,
        })
      );
    }
  }

  async function handleSend() {
    if (!selectedUser) return;
    if (!message.trim()) return;

    try {
      setSending(true);

      const saved = await sendMessage(selectedUser, message);

      setMessage("");
      setShowEmojis(false);

      broadcast(saved);

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

  function handleEmojiClick(emoji: string) {
    setMessage((prev) => prev + emoji);
  }

  function handleAttachClick() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow picking the same file again later

    if (!file || !selectedUser) return;

    try {
      setSending(true);

      const saved = await uploadMessageFile(selectedUser, file);

      broadcast(saved);

      onMessageSent?.();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSending(false);
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
    <div className="bg-white border-t p-5 relative">
      {showEmojis && (
        <div className="absolute bottom-20 left-5 bg-white border rounded-xl shadow-lg p-3 grid grid-cols-8 gap-2 z-10">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => handleEmojiClick(emoji)}
              className="text-xl hover:scale-125 transition"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4">

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={handleAttachClick}
          disabled={sending}
          className="text-gray-500 hover:text-indigo-600 text-xl disabled:opacity-50"
        >
          <FaPaperclip />
        </button>

        <button
          type="button"
          onClick={() => setShowEmojis((prev) => !prev)}
          className="text-gray-500 hover:text-indigo-600 text-xl"
        >
          <FaSmile />
        </button>

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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