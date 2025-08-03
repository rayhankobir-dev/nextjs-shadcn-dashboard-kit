"use client";
import LoadingScreen from "@/components/loaders/loading-screen";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function VerifyEmailPage() {
  const [isVerifying, setIsVerifying] = React.useState(true);
  const params = useSearchParams();
  const token = params.get("token") || "";

  authClient.verifyEmail(
    {
      query: {
        token,
        callbackURL: "http://localhost:3000/dashboard",
      },
    },
    {
      onSuccess() {
        setIsVerifying(false);
        toast.success("Verification successful");
      },
      onError(ctx) {
        setIsVerifying(false);
        toast.error("Verification failed", {
          description: ctx.error.message,
        });
      },
    },
  );

  if (isVerifying) return <LoadingScreen />;
  return null;
}

export default VerifyEmailPage;
