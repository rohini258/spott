'use client'
import { Badge } from "@/components/ui/badge";
import { Crown} from "lucide-react";
import React, { useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import UpgradeModal from "@/components/upgrade-modal";
import { Button } from "@/components/ui/button";
import {SignInButton,useAuth,UserButton } from '@clerk/nextjs'
import { Authenticated, Unauthenticated } from 'convex/react';
import {BarLoader} from "react-spinners";
import { useStoreUser } from '@/hooks/use-store-user';
import { Plus, Tickets,Building} from 'lucide-react';
import { useOnboarding } from '@/hooks/use-onboarding';
import OnboardingModal from './onboarding-modal';
import SearchLocationBar from './search-location-bar';
const Header = () => {
 const{isLoading}= useStoreUser();
  const [showUpgradeModal,setshowUpgradeModal]= useState(false);
  const{showOnboarding,handleOnboardingComplete,handleOnboardingSkip}=useOnboarding();
  const { has, isLoaded } = useAuth();

const hasPro = isLoaded && has({ plan: "pro" });
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
        {hasPro && (
          <Badge className="bg-linear-to-r from-pink-500 to-orange-500 gap-1 text-white ml-3">
            <Crown className="w-3 h-3" />
            Pro
          </Badge>
        )}
        </Link>

        {/* Search and location for the desktop */}
        <div className="hidden md:flex flex-1 justify-center">
          <SearchLocationBar />

        </div>
       

          {/* Right side actions */}
          <div className=" flex items-center">
         <Unauthenticated when="signed-out">
              <SignInButton mode="modal">
               <Button size="sm">Sign In </Button>
               </SignInButton> 
            </Unauthenticated>
            <Button variant={"ghost"} size="sm" 
            onClick={()=>setshowUpgradeModal(true)}>
                Pricing
              </Button>
            
              <Button variant="ghost" size="sm"className={"mr-2"}>
               <Link href="explore">Explore</Link>
              </Button>
            <Authenticated when="signed-in">
              <Button size="sm"className={"flex gap-2 mr-4"}>
                <Link href="/create-event">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create Event</span>
                </Link>

              </Button>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                  label="My Tickets"
                  labelIcon={<Tickets size={16} />}
                  href="/my-tickets"
                  />
                  <UserButton.Link
                  label="My Events"
                  labelIcon={<Building size={16} />}
                  href="/my-events"
                  />
                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
            </Authenticated>
          </div>
    </div>
     {/* Mobile search and location-below header */}
     <div className="md:hidden border-t px-3 py-3">
          <SearchLocationBar />

        </div>
     {/* loader */}
     {isLoading && (
      <div className="absolute bottom-0 left-0 w-full"> 
      <BarLoader width={'100%'}  color="#a85557"/>
     </div>
     )}
  </nav>
  {/* Modals */}
  <OnboardingModal 
  isOpen={showOnboarding}
  onClose={handleOnboardingSkip}
  onComplete={handleOnboardingComplete}
  />
  <UpgradeModal
  isOpen={showUpgradeModal}
  onClose={()=>setshowUpgradeModal(false)}
  trigger="header"
  />
  </>
    
    
  );
};

export default Header
