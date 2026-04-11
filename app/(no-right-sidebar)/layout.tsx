import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar/Navbar";
import LeftSidebar from "@/components/sidebars/leftsidebar/left-sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="font-inter flex justify-between">
      <div className="pointer-events-none fixed left-0 h-[80vh] w-[30vw] rounded-full blur-[250px] dark:bg-[#1A1A34]"></div>
      <div className="pointer-events-none fixed right-0 bottom-0 h-[40vh] w-[50vw] rounded-full blur-[250px] dark:bg-[#1A1A34]"></div>
      <SessionProvider>
        <Navbar />
      </SessionProvider>
      <LeftSidebar />
      <main className="relative z-10 mx-auto min-h-screen flex-1 px-4 pt-24 pb-10 lg:pt-32">{children}</main>
    </div>
  );
};

export default layout;
