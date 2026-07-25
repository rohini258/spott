import React from 'react'
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return(
     <>
  <nav className="fixed top-0  left-0 right-0 bg-neutral-950/80 backdrop-blur-xl z-20">
    <div className=" max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"} className=" ">
         <Image
         src="/spott.png"
           alt="spott logo"
           width={100}
           height={10}
           className="h-11 w-auto object-contain"
           priority
           />
           
        {/* pro badge */}
        </Link>

        {/* Search and location for the desktop */}
          {/* Right side actions */}
    </div>
     {/* Mobile search and location-below header */}
  </nav>
  {/* Modals */}
  </>
    
    
  );
};

export default Header
