export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import star from "../assets/starr.png";
import icon from "../assets/discordtrading-removebg-preview.png";
import chart from "../assets/Screenshot 2025-11-20 110411.png"
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/better-auth/auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {

  let session;
  
  try{
    session = await auth.api.getSession({headers: await headers()});
  } catch (e){
    console.log("Error fetching session", e);
  }
   if (session?.user) {
    redirect("/sign-up"); 
  }

  return (
    <main className="auth-layout ">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
          <Image
            placeholder="blur"
            src={icon}
            alt="Buy-Side-Liquidity"
            width={140}
            height={32}
            className="h-8 w-auto"
          />
        </Link>

        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>

      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote>
            This app really turned my trading into reality and really helped me
            take better trades.
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className="auth-testimonial-author">- HBBCM Tester</cite>
              <p className="max-md:text-xs text-gray-500"> Retail Investor </p>
            </div>
          <div className="flex items-center gap-1 mt-0.5">
            {[1, 2, 3, 4, 5].map((index, key) => (
              <Image src={star} key={key} alt="star" height={20} width={20} className="w-5 h-5"/>
            ))}
          </div>
          </div>
        </div>
            <div className="flex-1 relative"></div>
            <Image src={chart} alt="dashboard-preview" width={1440} height={1150} className="auth-dashboard absoutle top-0" /> 
      </section>
    </main>
  );
};
export default Layout;
