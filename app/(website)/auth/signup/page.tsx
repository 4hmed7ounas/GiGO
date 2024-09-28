'use client';

import React, { useState } from 'react';
import InputField from '@/app/components/input';
import Button from '@/app/components/button';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = () => {
    // Add signup logic here
    console.log('Signing up:', { email, username, password, confirmPassword, phone });
  };

  const handleGoogleSignup = () => {
    // Add Google signup logic here
    console.log('Signing up with Google');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-80">
        <h2 className="text-3xl text-center mb-4">Create New Account</h2>

        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-1 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-sm"
        />

        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-1 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-sm"
        />

        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-1 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-sm"
        />

        <InputField
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-1 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-sm"
        />

        <InputField
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-1 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-sm"
        />

        <div className="h-12 py-1 mb-2">
          <Button text="Signup" onClick={handleSignup} color="green" className="py-1" />
        </div>

        <div className="h-12 py-1">
          <Button text="Signup with Google" onClick={handleGoogleSignup} color="red" className="py-1" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
