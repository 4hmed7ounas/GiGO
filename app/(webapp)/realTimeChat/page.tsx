"use client";
import { signOut } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ClientNavbar from "../../components/header/clientnavbar";
import { auth } from "../../firebase/config";
import Sidebar from "./components/sidebar";


interface User {
  id: string;
  name: string;
}

const RealTimeChat: React.FC = () => {
  const [user] = useAuthState(auth); // Get the current user from Firebase Authentication
  const [users, setUsers] = useState<User[]>([]); // Store the users
  const router = useRouter();
  const db = getFirestore(); // Initialize Firestore

  // Redirect user to login page if not authenticated
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userSession = sessionStorage.getItem("user");
      if (!user && !userSession) {
        router.push("/"); // Redirect to login page if user is not authenticated
      }
    }
  }, [user, router]);

  

 useEffect(() => {
  if (user) {
    const fetchUsers = async () => {
      try {
        const fetchUserName = async (uid: string): Promise<string> => {
          try {
            const userDoc = doc(db, "users", uid);
            const userSnapshot = await getDoc(userDoc);
            if (userSnapshot.exists()) {
              const userData = userSnapshot.data();
              return userData?.name || "Unknown User";
            } else {
              return "User not found";
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            return "Error fetching name";
          }
        };

        const response = await fetch(`/api/conversation?userId=${user.uid}`);
        if (response.ok) {
          const data = await response.json();
          const otherUsers = await Promise.all(
            data.map(async (uid: string) => {
              const name = await fetchUserName(uid);
              return { id: uid, name };
            })
          );
          setUsers(otherUsers);
        }
      } catch (error) {
        console.error("Error fetching conversation data:", error);
      }
    };

    fetchUsers();
  }
}, [user, db]);


  // Handle user sign out
  const handleSignOut = async () => {
    await signOut(auth);
    sessionStorage.removeItem("user");
  };

  // const [activeUser, setActiveUser] = useState<User | null>(users[0]);

  // const handleUserClick = (user: User) => {
  //   setActiveUser(user);
  // };

  // const handleSendMessage = (newMessage: Message) => {
  //   if (activeUser) {
  //     setActiveUser((prevUser) => {
  //       if (prevUser) {
  //         return {
  //           ...prevUser,
  //           messages: [...prevUser.messages, newMessage],
  //         };
  //       }
  //       return prevUser;
  //     });
  //   }
  // };


  return (
    <div>
      <ClientNavbar onSignOut={handleSignOut} />

      {/* Check if user is logged in and display their name */}
      <div className="text-center mt-16">
        {user ? (
          <h2 className="text-2xl font-semibold">
            Welcome, {user.displayName || "User"}!<h1>{user.uid}</h1>
          </h2>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>

      {/* Display sidebar with users */}
      <Sidebar users={users}  />
      {/* {activeUser && (
        <ChatWindow
          messages={activeUser.messages}
          sender={activeUser.sender}
          onSendMessage={handleSendMessage}
          onClose={() => setActiveUser(null)}
        />
      )} */}

    </div>
  );
};

export default RealTimeChat;
