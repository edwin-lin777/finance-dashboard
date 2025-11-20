import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import TradingLogo from "@publi";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth-layout ">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
          <Image
            placeholder="blur"
            src="/assets/icons/discordtrading.png"
            alt="Buy-Side-Liquidity"
            width={140}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
      </section>
    </main>
  );
};
export default Layout;
