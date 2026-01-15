export const ROUTES = {
  HOME: "/",
  COLLECTIONS: "/collection",
  JOBS: "/jobs",
  TAGS: "/tags",
  COMMUNITIES: "/communities",
  ASK_QUESTION: "/ask-question",
  SING_UP: "/signup",
  LOGIN: "/login",
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTION: (id: string) => `/questions/${id}`,
  QUESTIONEDIT: (id: string) => `/questions/${id}/edit`,
  TAG: (tag: string) => `/tag/${tag}`,
  USER: (id: string) => `/profile/${id}`,
};

/**
 * List of routes that do NOT require authentication.
 * Users can access these paths without being logged in.
 * @type {string[]}
 */
export const PUBLICROUTES = [
  "/",
  "/questions/:id",
  "/tags",
  "/collection",
  "/communities",
  "/jobs",
  "/auth/new-verification",
  "/auth/reset-password",
];

/**
 * List of routes that will take user to home page.
 * @type {string[]}
 */
export const AUTHROUTES = ["/auth/log-in", "/auth/sign-up", "/auth/reset"];

/**
 * The prefix for api authencation routes
 * Routes that start with this prefix are used for api authentication purposes
 * @type {string}
 */
export const APIAuthPrefix = "/api/auth";

/**
 * This route will be the one where a user will be redirected to by default when they login/signup
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
