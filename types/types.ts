export interface NavLinkProps {
  _id: string;
  href: string;
  label: string;
  icon: string;
  isMobile?: boolean;
}

export interface SidebarProps {
  children: React.ReactNode;
  side: "left" | "right";
  additionalClasses?: string;
}

export interface HotNetworkLinkProps {
  id: string;
  href: string;
  text: string;
}

export interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backBtnLabel: string;
  backBtnHref: string;
  socialsDisabled: boolean;
  showSocials?: boolean;
}

export interface LocalSearchProps {
  route: string;
  placeholder: string;
  otherProps?: string;
}

export interface Tag {
  _id: string;
  name: string;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

export interface Question {
  _id: string;
  title: string;
  description?: string;
  tags: Tag[];
  author: Author;
  createdAt: string;
  upvotes: number;
  answers: number;
  views: number;
}

export interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string; // for user only
  textStyles?: string;
  imgStyles?: string;
  isAuthor?: boolean;
  titleStyles?: string;
}

export interface TagCardProps {
  _id: string;
  name: string;
  numberOfQuestions?: number;
  showCount?: boolean;
  compact?: boolean;
  removeTag?: boolean;
  isButton?: boolean;
  handleRemove?: (_id: string) => void;
}
