/**
 * An array of routes that are public (not protected by auth).
 * @type {string[]}
 */
export const publicRoutes: string[] = [];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/reset-password",
  "/auth/email-verification",
  "/auth/verify-email",
  "/auth/forgot-password",
  "/auth/reset-password",
];

/**
 * An array of routes that are protected by auth and are public.
 * @type {string[]}
 */
export const protectedRoutes = ["/", "/dashboard"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`;
