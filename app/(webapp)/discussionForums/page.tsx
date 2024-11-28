"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  getDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import ClientNavbar from "../../components/header/clientnavbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

interface Message {
  id: string;
  text: string;
  createdAt?: Timestamp | null;
  uid: string;
  displayName: string;
}

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userNames, setUserNames] = useState<{ [uid: string]: string }>({});
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch all messages
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(fetchedMessages);
    });
    return unsubscribe;
  }, []);

  // Fetch user's name from Firestore based on uid
  useEffect(() => {
    const fetchUserName = async (uid: string) => {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData?.name) {
          setUserNames((prevNames) => ({
            ...prevNames,
            [uid]: userData.name, // Save the user's name in the state
          }));
        }
      }
    };

    // Load names for all users
    messages.forEach((msg) => {
      if (!userNames[msg.uid]) {
        fetchUserName(msg.uid);
      }
    });
  }, [messages, userNames]);

  // Send a message and store the correct display name
  const sendMessage = async () => {
    if (newMessage.trim() && auth.currentUser) {
      const displayName =
        userNames[auth.currentUser.uid] ||
        auth.currentUser.displayName ||
        "Anonymous";
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        createdAt: serverTimestamp(),
        uid: auth.currentUser.uid,
        displayName, // Store the correct display name
      });
      setNewMessage("");
    }
  };

  const [user] = useAuthState(auth);
  const router = useRouter();

  if (typeof window !== "undefined") {
    const userSession = sessionStorage.getItem("user");
    if (!user && !userSession) {
      router.push("/");
    }
  }

  const handleSignOut = async () => {
    signOut(auth);
    sessionStorage.removeItem("user");
  };

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ClientNavbar onSignOut={handleSignOut} />

      <header className="bg-primary-600 mt-16 text-white py-4 px-6 shadow-md">
        <h2 className="text-xl font-bold">Discussion Room</h2>
      </header>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto px-4 py-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.uid === auth.currentUser?.uid
                ? "justify-end"
                : "justify-start"
            } mb-4`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-xs ${
                msg.uid === auth.currentUser?.uid
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p className="">{msg.displayName}</p>
              <p className="text-lg">{msg.text}</p>
            </div>
          </div>
        ))}
        {/* Empty div to scroll to the end */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="bg-white border-t p-4 flex items-center space-x-4">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          onClick={sendMessage}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
