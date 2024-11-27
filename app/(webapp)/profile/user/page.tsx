"use client";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { auth } from "../../../firebase/config";
import ProfileCard from "../Components/ProfileCard";
import DescCard from "../Components/descCard";
import EditProfile from "../Components/editProfile";
import { IMAGES } from "../../../../share/assets";

const db = getFirestore(auth.app);

interface UserData {
  name: string;
  username: string;
  role: string;
  phone?: string;
  bio?: string;
  description?: string;
}

const FreelancerProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    name: "",
    username: "",
    role: "",
    bio: "",
    description: "",
  });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        setUserId(userId);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    if (userId) {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        ...formData,
        phone: formData.phone || "",
        description: formData.description || "",
      });
      setUserData({ ...userData, ...formData });
      setIsEditing(false);

      if (formData.role.toLowerCase() === "buyer") {
        router.push("/profile/user");
      } else if (formData.role.toLowerCase() === "freelancer") {
        router.push("/profile/freelancer");
      } else {
        console.error(
          "Invalid role provided. Role must be 'buyer' or 'freelancer'."
        );
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(userData as UserData);
  };

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="flex justify-center w-full">
      <div className="mt-20 p-8 h-auto w-full">
        <div className="flex flex-wrap gap-10 justify-between items-center">
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
          <div>
            {isEditing ? (
              <EditProfile
                formData={formData}
                onChange={handleChange}
                onSave={handleUpdate}
                onCancel={handleCancel}
              />
            ) : (
              <div className="flex justify-between gap-5 w-full">
                <div className="w-[30%]">
                  <ProfileCard
                    name={userData.name}
                    username={userData.username}
                    profileImage={IMAGES.profile.src}
                    bio={userData.bio || ""}
                  />
                </div>
                <div className="flex flex-col gap-4 w-[65%]">
                  <div>
                    <DescCard
                      description={
                        userData.description || "No description provided"
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-red-500">No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfile;
