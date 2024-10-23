import { IMAGES } from '../../../share/assets';
import Image from 'next/image';
import React from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-primary-50">
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <Image src={IMAGES.authImage} alt="Auth Image" className="w-full h-screen object-cover" />
      </div>
      <div className="w-full md:w-1/2">
        {children}
      </div>
    </div>
  );
}
