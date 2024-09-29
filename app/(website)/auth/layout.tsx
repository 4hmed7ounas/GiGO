import { IMAGES } from '@/share/assets';
import React from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-white">
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img src={IMAGES.authImage} alt="Auth Image" className="w-full h-screen object-cover" />
      </div>
      <div className="w-full md:w-1/2">
        {children}
      </div>
    </div>
  );
}
