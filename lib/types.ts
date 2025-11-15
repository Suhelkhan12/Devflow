export type NavLinkProps = {
  id: string;
  href: string;
  label: string;
  icon: string;
};

export type LoginActionTypes = {
  responsetype: "error" | "success";
  message: string;
};
