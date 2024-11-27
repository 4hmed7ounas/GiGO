"use client";

import Image from "next/image";
import React from "react";
import { IMAGES } from "../../../../../share/assets";

interface User {
  id: string;
  name: string;
}

interface SidebarProps {
  users: User[];
  //onUserClick: (user: User) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ users}) => {
  // const truncateTitle = (title: string, maxLength: number) => {
  //   return title.length > maxLength
  //     ? `${title.substring(0, maxLength)}...`
  //     : title;
  // };

  return (
    <div className="w-1/2 bg-gray-100 border-r border-gray-300 h-screen p-4 overflow-y-auto mt-16">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">All Messages</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors duration-200 ease-in-out"
            // onClick={() => onUserClick(user)}
          >
            <Image
              src={IMAGES.profile}
              alt="profile"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-700">{user.name}</h3>
              <p>{user.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
