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
      avatarUrl: "/zaid.jpg",
      messages: [
        { id: 3, text: "Looking forward to our meeting", sender: "Zaid" },
      ],
    },
    {
      id: 3,
      sender: "Ahmed Younas",
      avatarUrl: "/ahmed.jpg",
      messages: [
        { id: 1, text: "Hey, can you share the project files?", sender: "Ahmed" },
        { id: 2, text: "Sure, I'll send them shortly!", sender: "Me" },
      ],
    },
    {
      id: 4,
      sender: "Sana Khan",
      avatarUrl: "/sana.jpg",
      messages: [
        {
          id: 1,
          text: "Could you help me understand this module?",
          sender: "Sana",
        },
        {
          id: 2,
          text: "Yes, let me explain it to you in detail.",
          sender: "Me",
        },
      ],
    },
    {
      id: 5,
      sender: "Ali Raza",
      avatarUrl: "/ali.jpg",
      messages: [
        {
          id: 1,
          text: "Do you have time for a quick catch-up call?",
          sender: "Ali",
        },
        {
          id: 2,
          text: "Sure, let me know the time!",
          sender: "Me",
        },
      ],
    },
    {
      id: 5,
      sender: "Ali Raza",
      avatarUrl: "/ali.jpg",
      messages: [
        {
          id: 1,
          text: "Do you have time for a quick catch-up call?",
          sender: "Ali",
        },
        {
          id: 2,
          text: "Sure, let me know the time!",
          sender: "Me",
        },
      ],
    },
    {
      id: 5,
      sender: "Ali Raza",
      avatarUrl: "/ali.jpg",
      messages: [
        {
          id: 1,
          text: "Do you have time for a quick catch-up call?",
          sender: "Ali",
        },
        {
          id: 2,
          text: "Sure, let me know the time!",
          sender: "Me",
        },
      ],
    },
    {
      id: 5,
      sender: "Ali Raza",
      avatarUrl: "/ali.jpg",
      messages: [
        {
          id: 1,
          text: "Do you have time for a quick catch-up call?",
          sender: "Ali",
        },
        {
          id: 2,
          text: "Sure, let me know the time!",
          sender: "Me",
        },
      ],
    },
    {
      id: 5,
      sender: "Ali Raza",
      avatarUrl: "/ali.jpg",
      messages: [
        {
          id: 1,
          text: "Do you have time for a quick catch-up call?",
          sender: "Ali",
        },
        {
          id: 2,
          text: "Sure, let me know the time!",
          sender: "Me",
        },
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
            messages: [...prevUser.messages, newMessage],
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
