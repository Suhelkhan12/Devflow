export type NavLinkProps = {
  id: string;
  href: string;
  label: string;
  icon: string;
  isMobile?: boolean;
};

export type SidebarProps = {
  children: React.ReactNode;
  side: "left" | "right";
};

export type HotNetworkLinkProps = {
  id: string;
  href: string;
  text: string;
};

export type LoginActionTypes = {
  responsetype: "error" | "success";
  message: string;
};
