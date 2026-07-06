import { useState } from "react";

import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatWindow from "../../components/chat/ChatWindow";
import MessageInput from "../../components/chat/MessageInput";

export default function Messages() {
  const [selectedUser, setSelectedUser] =
    useState<number>();

  return (
    <div className="h-[calc(100vh-120px)] bg-white rounded-2xl shadow-sm border flex overflow-hidden">

      <ChatSidebar
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />

      <div className="flex-1 flex flex-col">

        <ChatWindow
          selectedUser={selectedUser}
        />

        <MessageInput
          selectedUser={selectedUser}
        />

      </div>

    </div>
  );
}