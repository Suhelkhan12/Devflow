import { Separator } from "@/components/ui/separator";
import SidebarWrapper from "../sidebar-wrapper";
import HotNetwork from "./hot-network";
import PopularTags from "./popular-tags";

const RightSidebar = () => {
  return (
    <SidebarWrapper side={"right"}>
      <HotNetwork />
      <Separator className="background-light700_dark400 my-6" />
      <PopularTags />
    </SidebarWrapper>
  );
};

export default RightSidebar;
