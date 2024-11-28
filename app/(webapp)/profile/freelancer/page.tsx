"use client";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { IMAGES } from "../../../../share/assets";
import { auth } from "../../../firebase/config";
import ProfileCard from "../Components/ProfileCard";
import CreateGigCard from "../Components/createGigCard";
import DescCard from "../Components/descCard";
import EditProfile from "../Components/editProfile";
import GigCard from "../Components/gigCard";

const db = getFirestore(auth.app);

interface UserData {
  name: string;
  username: string;
  role: string;
  phone?: string;
  bio?: string;
  description?: string;
}

interface Gig {
  _id: string;
  title: string;
  keywords: string[];
  description: string;
  tier: object;
  imageURL: string;
  userId: string;
  username: string;
}

const FreelancerProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [gigs, setGigs] = useState<Gig[]>([]); // Store gigs in state
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

        // Fetch gigs for the user after authentication
        try {
          const response = await fetch(`/api/myGigs`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
          });

          if (response.ok) {
            const data = await response.json();
            setGigs(data); // Store gigs in state
          } else {
            console.error("Error fetching gigs:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching gigs:", error);
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
        description: formData.description || "", // Ensure description is updated
      });
      setUserData({ ...userData, ...formData });
      setIsEditing(false);

      // Navigate based on the role
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

  const handleCreateGig = () => {
    if (userId && userData?.username) {
      router.push(`/createGig?userId=${userId}&username=${userData.name}`);
    }
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
                  <div className="flex gap-4">
                    <div onClick={handleCreateGig}>
                      <CreateGigCard title="CREATE A GIG" icon={FaPlus} />
                    </div>
                    {gigs.map((gig) => (
                      <div key={gig._id}>
                        <GigCard
                          image={gig.imageURL}
                          title={gig.title}
                          price={"120"} // Add actual pricing logic if needed
                          gigId={gig._id}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <DescCard
                      description={userData.description || "No description provided"}
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
