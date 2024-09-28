import React from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="w-1/2 flex items-center justify-center">
        <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="Auth Image" className="max-w-full h-auto" />
      </div>
      <div className="w-1/2 p-8">
        {children}
      </div>
    </div>
  );
}
