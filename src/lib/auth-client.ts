import { magicLinkClient, emailOTPClient, multiSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3005",
  plugins: [multiSessionClient(), magicLinkClient(), emailOTPClient()],
});
