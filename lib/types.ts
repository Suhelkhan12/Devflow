export type NavLinkProps = {
  _id: string;
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

export type LocalSearchProps = {
  route: string;
  placeholder: string;
  otherProps?: string;
};

type Tag = {
  _id: string;
  name: string;
};

type Author = {
  _id: string;
  name: string;
  image: string;
};

export type Question = {
  _id: string;
  title: string;
  description?: string;
  tags: Tag[];
  author: Author;
  createdAt: string;
  upvotes: number;
  answers: number;
  views: number;
};

export type MetricProps = {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string; // for user only
  textStyles?: string;
  imgStyles?: string;
  isAuthor?: boolean;
  titleStyles?: string;
};
