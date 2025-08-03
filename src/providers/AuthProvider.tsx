"use client";
import LoadingScreen from "@/components/loaders/loading-screen";
import { authClient } from "@/lib/auth-client";
import React, { createContext, useContext } from "react";

type SessionContextType = {
  session: any | null;
  isPending: boolean;
  error: Error | null;
  refetch: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const SessionProvider = ({ children }: Props) => {
  const { isPending, data: session, error, refetch } = authClient.useSession();
  if (isPending) return <LoadingScreen />;
  if (!session) return <LoadingScreen />;

  return (
    <SessionContext.Provider
      value={{
        session,
        isPending,
        error,
        refetch,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useAuth must be used within a SessionProvider");
  }
  return context;
};
