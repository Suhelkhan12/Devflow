export const ROUTES = {
  HOME: "/",
  COLLECTIONS: "/collections",
  JOBS: "/jobs",
  TAGS: "/tags",
  COMMUNITIES: "/community",
  ASK_QUESTION: "/ask-question",
  SING_UP: "/signup",
  LOGIN: "/login",
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTION: (id: string) => `/questions/${id}`,
  TAG: (tag: string) => `/tags/${tag}`,
  USER: (id: string) => `/profile/${id}`,
};
