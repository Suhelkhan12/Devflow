export interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

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
  socialsDisabled?: boolean;
  showSocials?: boolean;
}

export interface LocalSearchProps {
  route: string;
  placeholder: string;
  otherProps?: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface TagWithCountAndDescription extends Tag {
  totalQuestion: number;
  description: string;
}

export interface TagList {
  tags: TagWithCountAndDescription[];
}

interface Author {
  id: string;
  name: string | null;
  image: string | null;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  totalAnswers: number;
  views: number;
  createdAt: Date;
  author: Author;
  tags: { tag: Tag }[];
}

export interface Answer {
  id: string;
  author: Author;
  content: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
}

export interface MetricProps {
  imgUrl: string;
  alt: string;
  value?: string | number;
  title?: string;
  href?: string; // for user only
  textStyles?: string;
  imgStyles?: string;
  isAuthor?: boolean;
  titleStyles?: string;
}

export interface TagCardProps {
  id: string;
  name: string;
  description?: string;
  numberOfQuestions?: number;
  isRemoveDisabled?: boolean;
  showCount?: boolean;
  compact?: boolean;
  removeTag?: boolean;
  isButton?: boolean;
  handleRemove?: (_id: string) => void;
}

export interface FilterParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export interface TagFilterParams {
  query?: string;
  filter?: string;
}

export interface TrackQuestionViewsParams {
  userId: string;
  questionId: string;
}

export interface AnswerFilterParams extends FilterParams {
  questionId: string;
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}
