'use client';

import React, { useState } from 'react';
import InputField from '@/app/components/input';
import Button from '@/app/components/button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add login logic here
    console.log('Logging in:', { email, password });
  };

  const handleGoogleLogin = () => {
    // Add Google login logic here
    console.log('Logging in with Google');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-80">
        <h2 className="text-3xl text-center mb-4">Login</h2>

        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-1 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-sm"
        />

        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-1 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-sm"
        />

        <Button text="Login" onClick={handleLogin} color="green" className="py-1 mb-2" />

        <Button text="Login with Google" onClick={handleGoogleLogin} color="red" className="py-1" />
      </div>
    </div>
  );
};

export default Login;
