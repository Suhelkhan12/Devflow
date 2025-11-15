import { Separator } from "@/components/ui/separator";
import SidebarWrapper from "../sidebar-wrapper";
import HotNetwork from "./hot-network";
import PopularTags from "./popular-tags";

const RightSidebar = () => {
  return (
    <SidebarWrapper side="right">
      <HotNetwork />
      <Separator />
      <PopularTags />
    </SidebarWrapper>
  );
};

export default RightSidebar;
