"use client";

import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import ChatWindow from "./components/chatWindow";

interface Message {
  id: number;
  text: string;
  sender: string;
}

interface User {
  id: number;
  sender: string;
  avatarUrl?: string;
  messages: Message[];
}

const App: React.FC = () => {
  const users: User[] = [
    {
      id: 1,
      sender: "Karan",
      avatarUrl: "/karan.jpg",
      messages: [
        {
          id: 1,
          text: "understand Thanks, will do it myself",
          sender: "Karan",
        },
        { id: 2, text: "Okay bro! Thanks for coming", sender: "Me" },
      ],
    },
    {
      id: 2,
      sender: "Alex",
      avatarUrl: "/alex.jpg",
      messages: [
        { id: 3, text: "Looking forward to our meeting", sender: "Alex" },
      ],
    },
  ];

  const [activeUser, setActiveUser] = useState<User | null>(users[0]);

  const handleUserClick = (user: User) => {
    setActiveUser(user);
  };

  const handleSendMessage = (newMessage: Message) => {
    if (activeUser) {
      setActiveUser((prevUser) => {
        if (prevUser) {
          return {
            ...prevUser,
            messages: [...prevUser.messages, newMessage], // Append new message
          };
        }
        return prevUser;
      });
    }
  };

  return (
    <div className="flex">
      <Sidebar users={users} onUserClick={handleUserClick} />
      {activeUser && (
        <ChatWindow
          messages={activeUser.messages}
          sender={activeUser.sender}
          onSendMessage={handleSendMessage}
          onClose={() => setActiveUser(null)}
        />
      )}
    </div>
  );
};

export default App;
