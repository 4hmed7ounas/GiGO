"use client"; // Ensure this is the first line

import Image from "next/image";
import React from "react";

interface Message {
  id: number;
  text: string;
  sender: string;
}

interface User {
  id: number;
  sender: string;
  avatarUrl?: string; // Optional avatar URL
  messages: Message[]; // Add messages property here
}

interface SidebarProps {
  users: User[];
  onUserClick: (user: User) => void; // Prop for handling user clicks
}

const Sidebar: React.FC<SidebarProps> = ({ users, onUserClick }) => {
  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength
      ? `${title.substring(0, maxLength)}...`
      : title;
  };

  return (
    <div className="w-1/2 bg-gray-100 border-r border-gray-300 h-screen p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">All Messages</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors duration-200 ease-in-out"
            onClick={() => onUserClick(user)}
          >
            <Image
              src={user.avatarUrl || "/default-avatar.jpg"}
              alt={user.sender}
              width={40} // Corrected image dimensions for better rendering
              height={40}
              className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-700">{user.sender}</h3>
              <p className="text-sm text-gray-500 truncate">
                {truncateTitle(user.messages[0]?.text, 30) || "No messages"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
