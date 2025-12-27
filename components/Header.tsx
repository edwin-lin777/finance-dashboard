import React from 'react'
import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";
import burger from "@/assets/burger.jpg"
const Header = ({ user }: { user?: User }) => { 
    console.log("user from header page", user?.name)
    return (
       <header className="sticky top-0 z-50 bg-gray-900">
  <div className="container grid grid-cols-3 items-center h-16">
    
    {/* LEFT */}
    <div className="flex items-center">
      <Link href="/">
        <Image
          src={burger}
          alt="burgerlogo"
          width={64}
          height={64}
          className="h-8 w-auto cursor-pointer"
        />
      </Link>
    </div>

    {/* CENTER */}
    <nav className="hidden sm:flex justify-center">
      <NavItems />
    </nav>

    {/* RIGHT */}
    <div className="flex justify-end">
      {user ? (
        <UserDropdown user={user} />
      ) : (
        <div className="w-24 h-8" /> // exact same width as dropdown
      )}
    </div>

  </div>
</header>

    )
}
export default Header