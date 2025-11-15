import NavLink from "@/components/navbar/NavLink";
import { Navlinks } from "@/lib/data-object";
import SidebarWrapper from "../sidebar-wrapper";
import LeftSidebarButton from "./leftsidebar-button";

const LeftSidebar = () => {
  return (
    <SidebarWrapper side="left">
      <div className="flex flex-col gap-4">
        {Navlinks.map((l) => (
          <NavLink key={l.id} {...l} />
        ))}
      </div>

      <LeftSidebarButton />
    </SidebarWrapper>
  );
};

export default LeftSidebar;
