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
      sender: "Hadeed Ahmed",
      avatarUrl: "/hadeed.jpg",
      messages: [
        {
          id: 1,
          text: "Hi there! I found your profile, and I’m looking for someone to help build a website. Are you available for new projects?",
          sender: "Me",
        },
        {
          id: 2,
          text: "Hello! Thanks for reaching out. I’d be happy to discuss your project. Could you tell me more about what you're looking for?",
          sender: "Hadeed",
        },
        {
          id: 3,
          text: "Sure! I need a modern, responsive website for my business. ",
          sender: "Me",
        },
        {
          id: 4,
          text: "I’d like it to have a homepage, a few service pages, and a contact form.",
          sender: "Me",
        },
        {
          id: 5,
          text: "It would be great if we could integrate social media feeds too. Do you have experience with that?",
          sender: "Me",
        },
      ],
    },
    {
      id: 2,
      sender: "Zaid Shabbir",
      avatarUrl: "/Zaid.jpg",
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
