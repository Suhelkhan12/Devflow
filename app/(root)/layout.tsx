import Navbar from "@/components/navbar/Navbar";
import LeftSidebar from "@/components/sidebars/leftsidebar/left-sidebar";
import RightSidebar from "@/components/sidebars/rightsidebar/right-sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="font-inter flex justify-between">
      <Navbar />
      <LeftSidebar />
      <section className="background-light850_dark100 mx-auto min-h-screen max-w-5xl flex-1 px-4 pt-24 pb-10 md:px-8 lg:px-10 lg:pt-32">
        {children}
      </section>
      <RightSidebar />
    </main>
  );
};

export default layout;
