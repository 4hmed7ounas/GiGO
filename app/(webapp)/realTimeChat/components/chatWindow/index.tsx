"use client";

import Image from "next/image";
import React, { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: string;
}

interface ChatWindowProps {
  messages: Message[];
  sender: string;
  onSendMessage: (message: Message) => void;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  sender,
  onSendMessage,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: "Me",
      };

      onSendMessage(newMessage);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[90vh] w-screen">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{sender}</h3>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start ${
              message.sender === "Me" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender !== "Me" && (
              <Image
                src="/karan.jpg"
                alt={message.sender}
                className="w-8 h-8 rounded-full mx-2"
                width={8}
                height={8}
              />
            )}
            <div
              className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                message.sender === "Me"
                  ? "bg-primary-700 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.sender === "Me" ? "You" : message.sender}
              </p>
            </div>
            {message.sender === "Me" && (
              <Image
                src="/me.jpg"
                alt="Me"
                className="w-8 h-8 rounded-full mx-2"
                width={8}
                height={8}
              />
            )}
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Send message..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200 ease-in-out"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200 ease-in-out"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
