import Navbar from "@/components/navbar/Navbar";
import LeftSidebar from "@/components/sidebars/leftsidebar/left-sidebar";
import RightSidebar from "@/components/sidebars/rightsidebar/right-sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Navbar />
      <LeftSidebar />
      <div className="background-light850_dark100 min-h-screen">{children}</div>
      <RightSidebar />
    </main>
  );
};

export default layout;
