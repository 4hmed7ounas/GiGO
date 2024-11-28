"use client";
import React, { useState, useEffect } from "react";
import ClientNavbar from "../../components/header/clientnavbar";
import { auth, db } from "../../firebase/config"; // Assuming db is for Firestore
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

const PaymentMethod: React.FC = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    holderName: "",
    csv: "",
    amount: "",
  });
  const [user] = useAuthState(auth);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const fetchRole = async () => {
        const userRef = doc(db, "users", user.uid); // Assuming "users" is the collection
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setRole(userData.role); // Assuming role is a field in the user document
        } else {
          console.error("No such document!");
        }
      };

      fetchRole();
    } else {
      const userSession = sessionStorage.getItem("user");
      if (!userSession) {
        router.push("/");
      }
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment Details Submitted: ", formData);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    sessionStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ClientNavbar onSignOut={handleSignOut} />
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Payment Methods</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              maxLength={16}
              placeholder="1234 5678 9101 1121"
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="holderName" className="block text-sm font-medium">
              Card Holder Name
            </label>
            <input
              type="text"
              id="holderName"
              name="holderName"
              value={formData.holderName}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="csv" className="block text-sm font-medium">
              CVV
            </label>
            <input
              type="password"
              id="csv"
              name="csv"
              value={formData.csv}
              onChange={handleChange}
              maxLength={3}
              placeholder="123"
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>

          {role === "buyer" && (
            <div>
              <label htmlFor="amount" className="block text-sm font-medium">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="1000"
                className="mt-1 block w-full p-2 border rounded-md"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-secondary-500 text-white py-2 px-4 rounded-md hover:bg-secondary-600 transition"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethod;
