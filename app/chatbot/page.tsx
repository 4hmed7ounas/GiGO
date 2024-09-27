"use client";
import { useState, useEffect } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  ChatSession,
  Content,
} from "@google/generative-ai";
import customQuestions from './data.json';

interface Message {
  text: string;
  role: string;
  timeStamp: Date;
}

interface CustomQuestion {
  question: string;
  answer: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState<ChatSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState<CustomQuestion[]>([]);

  const API_KEY = process.env.GOOGLE_API_KEY;
  const MODEL_NAME = "gemini-1.0-pro-001";

  const genAI = new GoogleGenerativeAI(API_KEY || '');

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAI
          .getGenerativeModel({ model: MODEL_NAME })
          .startChat({
            generationConfig,
            safetySettings,
            history: messages.map((msg) => ({
              parts: [{ text: msg.text }],
              role: msg.role,
            })) as Content[],
          });
        setChat(newChat);
      } catch (error) {
        setError("Failed to initialize chat. Please try again");
      }
    };

    initChat();
  }, []);

  useEffect(() => {
    const getRandomQuestions = () => {
      const shuffled = [...customQuestions].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    };

    setRandomQuestions(getRandomQuestions());

    const interval = setInterval(() => {
      setRandomQuestions(getRandomQuestions());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const checkCustomQuestions = (input: string): string | null => {
    const lowercaseInput = input.toLowerCase();
    for (const qa of customQuestions) {
      if (lowercaseInput.includes(qa.question.toLowerCase()) || 
          qa.question.toLowerCase().includes(lowercaseInput)) {
        return qa.answer;
      }
    }
    return null;
  };

  const handleSendMessage = async (input: string = userInput) => {
    if (!input.trim()) return;

    try {
      setIsLoading(true);
      const userMessage: Message = {
        text: input,
        role: "user",
        timeStamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");

      const customAnswer = checkCustomQuestions(input);
      if (customAnswer) {
        const botMessage: Message = {
          text: customAnswer,
          role: "bot",
          timeStamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else if (chat) {
        const result = await chat.sendMessage(input);
        const botMessage: Message = {
          text: result.response.text(),
          role: "bot",
          timeStamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col w-[25%] h-[85%] bg-gray-100 absolute bottom-0 right-4 rounded-lg shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">GiGO Chat</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className="text-xs mt-2 opacity-70">
                {msg.role === "bot" ? "GiGO" : "You"} -{" "}
                {msg.timeStamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 animate-pulse">
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex flex-wrap gap-2 mb-3">
          {randomQuestions.map((q, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(q.question)}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full hover:bg-blue-200 transition-colors duration-200 ease-in-out"
            >
              {q.question}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200 ease-in-out"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSendMessage()}
            className={`p-2 rounded-md text-white font-semibold text-sm transition-colors duration-200 ease-in-out ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}