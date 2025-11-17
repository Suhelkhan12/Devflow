import Navbar from "@/components/navbar/Navbar";
import LeftSidebar from "@/components/sidebars/leftsidebar/left-sidebar";
import RightSidebar from "@/components/sidebars/rightsidebar/right-sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex justify-between">
      <Navbar />
      <LeftSidebar />
      <section className="background-light850_dark100 mx-auto h-[11232px] min-h-screen max-w-5xl flex-1 px-10 pt-32">
        {children}
      </section>
      <RightSidebar />
    </main>
  );
};

export default layout;
