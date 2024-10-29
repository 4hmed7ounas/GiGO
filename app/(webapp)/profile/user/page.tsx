"use client";
import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { FaPencil } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const db = getFirestore(auth.app);

interface UserData {
  name: string;
  email: string;
  username: string;
  role: string;
  phone?: string;
}

const ClientProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    username: "",
    role: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data() as UserData;
          setUserData(data);
          setFormData(data);
        } else {
          console.error("No such document!");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { ...formData, phone: formData.phone || "" }); // Ensure phone is updated
      setUserData({ ...userData, ...formData }); // Update userData with new formData
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(userData as UserData); // Reset form data to original user data
  };

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="mt-20 p-8 bg-gray-100 rounded-lg shadow-lg w-96 h-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 text-primary-800">Profile</h1>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="bg-primary-500 p-3 text-white rounded-full hover:bg-primary-600 transition duration-200"
          >
            <FaPencil />
          </button>
        ) : (
          <button
            onClick={handleCancel}
            className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition duration-200"
          >
            <RxCross2 />
          </button>
        )}
      </div>
      {userData ? (
        <div className="space-y-4">
          {isEditing ? (
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username"
              />
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Role"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Phone"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleUpdate}
                  className="bg-primary-600 text-white p-3 rounded-lg hover:bg-primary-700 transition duration-200"
                >
                  Update
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Name:</span> {userData.name}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Email:</span> {userData.email}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Username:</span>{" "}
                {userData.username}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Role:</span> {userData.role}
              </p>
              {userData.phone && (
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Phone:</span> {userData.phone}
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="text-red-500">No user data found.</p>
      )}
    </div>
  );
};

export default ClientProfile;
