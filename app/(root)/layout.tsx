import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar/Navbar";
import LeftSidebar from "@/components/sidebars/leftsidebar/left-sidebar";
import RightSidebar from "@/components/sidebars/rightsidebar/right-sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="font-inter flex justify-between">
      <div className="bg-primary-100 pointer-events-none fixed left-0 h-[80vh] w-[30vw] rounded-full blur-[250px] dark:bg-[#1A1A34]"></div>
      <div className="bg-primary-100 pointer-events-none fixed right-0 bottom-0 h-[40vh] w-[50vw] rounded-full blur-[250px] dark:bg-[#1A1A34]"></div>
      <SessionProvider>
        <Navbar />
      </SessionProvider>
      <LeftSidebar />
      <main className="relative z-10 mx-auto min-h-screen max-w-6xl flex-1 px-4 pt-24 pb-10 md:px-8 lg:px-10 lg:pt-32">
        {children}
      </main>
      <RightSidebar />
    </div>
  );
};

export default layout;
