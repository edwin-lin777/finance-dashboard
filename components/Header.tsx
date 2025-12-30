"use client"
import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import discordlogo from "@/app/assets/discordtrading-removebg-preview.png";
const Header = ({ user }: { user?: User }) => { 
    console.log("user from header page", user?.name)
    const tempUser = user?.id
    const router = useRouter();
    const goLogin = () => {
      router.push('/sign-in');
    }
    return (
       <header className="sticky top-0 z-50 bg-gray-900">
  <div className="container grid grid-cols-3 items-center h-16">
    
    {/* LEFT */}
    <div className="flex items-center">
      <Link href="/">
        <Image
          src={discordlogo}
          alt="burgerlogo"
          width={96}
          height={96}
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
      {tempUser ? (
        <UserDropdown user={user} />
      ) : (
       <button className="w-24 h-8 rounded-10 hover:cursor-pointer font-arial" onClick={() => goLogin()}>Login </button>
        
      )}
    </div>
 
  </div>
</header>

    )
}
export default Header