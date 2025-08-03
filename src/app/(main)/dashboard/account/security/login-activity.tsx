"use client";
import { authClient } from "@/lib/auth-client";
import { Shield } from "lucide-react";
import React from "react";
import SessionCard from "./session-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginActivity() {
  const [isSessionFetching, setIsSessionFetching] = React.useState(true);
  const [sessions, setSessions] = React.useState<any>([]);

  const getSessionList = React.useCallback(async () => {
    const { data, error } = await authClient.listSessions();
    if (error) return;
    setSessions(data || []);
    setIsSessionFetching(false);
  }, []);

  React.useEffect(() => {
    getSessionList();
  }, []);

  return (
    <div className="grid gap-8">
      <div className="grid gap-3">
        <div>
          <h2 className="text-xl font-semibold">Login Activity</h2>
          <p className="max-w-2xl text-sm">
            Current login activity is recorded for the last 90 days. You can view the full history in your account
            settings. You can also view the login history for your team members.
          </p>
        </div>

        <div className="dark:bg-muted dark:border-accent flex gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm text-wrap text-orange-500 dark:text-orange-500">
          <Shield className="shrink-0" />
          If you notice any suspicious activity or unrecognized devices, revoke those sessions immediately and consider
          changing your password.
        </div>
      </div>

      {isSessionFetching && <SessionGridSkeleton />}
      {!isSessionFetching && (
        <div className="grid divide-y rounded-2xl border">
          {sessions.map((session: any, index: number) => (
            <SessionCard key={index} {...session} />
          ))}
        </div>
      )}
    </div>
  );
}

function SessionGridSkeleton() {
  return (
    <div className="grid divide-y rounded-2xl border">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="group flex gap-4 p-4">
          <div className="bg-muted mt-0.5 flex size-12 shrink-0 items-center justify-center rounded-md">
            <Skeleton className="size-5" />
          </div>

          <div className="grid flex-1 gap-3">
            <Skeleton className="h-4 w-64" />

            <div className="flex max-w-md flex-wrap gap-x-4 gap-y-2">
              <div className="inline-flex items-center gap-3">
                <Skeleton className="size-3" />
                <Skeleton className="h-3.5 w-24" />
              </div>

              <div className="inline-flex items-center gap-3">
                <Skeleton className="size-3" />
                <Skeleton className="h-3.5 w-24" />
              </div>

              <div className="inline-flex items-center gap-3">
                <Skeleton className="size-3" />
                <Skeleton className="h-3.5 w-24" />
              </div>

              <div className="inline-flex items-center gap-3">
                <Skeleton className="size-3" />
                <Skeleton className="h-3.5 w-24" />
              </div>
            </div>
          </div>

          <div className="flex h-fit flex-1 flex-col items-end">
            <Skeleton className="size-8" />
          </div>
        </div>
      ))}
    </div>
  );
}
