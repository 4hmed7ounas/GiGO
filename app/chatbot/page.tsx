"use client";
import React, {useState, useEffect, useMemo } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  ChatSession,
  Content,
} from "@google/generative-ai";
import customQuestions from "./data.json";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

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
  const [isClient, setIsClient] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const API_KEY = "AIzaSyCosWGsutNBUDJNpdJEU0Lqf39jsAmFo-E";
  const MODEL_NAME = "gemini-1.0-pro-001";

  const genAI = useMemo(() => new GoogleGenerativeAI(API_KEY || ""), [API_KEY]);

  const generationConfig = useMemo(
    () => ({
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    }),
    []
  );

  const safetySettings = useMemo(
    () => [
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
    ],
    []
  );

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
              role: msg.role === "bot" ? "model" : msg.role,
            })) as Content[],
          });
        setChat(newChat);
      } catch (err) {
        console.error("Failed to initialize chat:", err);
      }
    };

    initChat();
  }, [genAI, generationConfig, messages, safetySettings]);

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
      if (
        lowercaseInput.includes(qa.question.toLowerCase()) ||
        qa.question.toLowerCase().includes(lowercaseInput)
      ) {
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
          role: "model", // Changed from 'bot' to 'model'
          timeStamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else if (chat) {
        const result = await chat.sendMessage(input);
        const botMessage: Message = {
          text: result.response.text(),
          role: "model", // Changed from 'bot' to 'model'
          timeStamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div
      className={`flex flex-col ${
        !isExpanded ? "w-[90%] h-[85%] md:w-[30%]" : "w-[90%] h-[50px] md:w-[20%]"
      } bg-gray-100 fixed bottom-0 right-4 shadow-xl overflow-hidden transition-all duration-300 md:bottom-0 md:right-6 z-10`}
    >
      <div className="bg-gradient-to-r from-primary-800 to-primary-900 text-secondary-300 p-4 shadow-md flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold">GiGO. Chat</h1>
        <button onClick={toggleExpand} className="text-white focus:outline-none">
          {!isExpanded ? <IoIosArrowDropdown /> : <IoIosArrowDropup />}
        </button>
      </div>
      {!isExpanded && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-primary-100">
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
                      ? "bg-primary-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className="text-xs mt-2 opacity-70">
                    {msg.role === "model" ? "GiGO" : "You"} -{" "}
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
                  className="px-3 py-1 bg-primary-100 text-primary-800 text-xs rounded-full hover:bg-primary-200 transition-colors duration-200 ease-in-out"
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
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm transition-all duration-200 ease-in-out"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage()}
                className={`p-2 rounded-md text-white font-semibold text-sm transition-colors duration-200 ease-in-out ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
