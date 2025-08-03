"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, formatDistanceToNowStrict, parseISO, isValid } from "date-fns";
import { Clock, ClockArrowUpIcon, Globe, MapPin, MonitorIcon, Shield, Smartphone, Tablet, Trash2 } from "lucide-react";
import { UAParser } from "ua-parser-js";
import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

function safeParseISO(value: unknown): Date | null {
  if (value instanceof Date) return isValid(value) ? value : null;
  if (typeof value === "string" && value.length > 0) {
    const parsed = parseISO(value);
    return isValid(parsed) ? parsed : null;
  }
  return null;
}

function SessionCard({ id, createdAt, updatedAt, userAgent, ipAddress, token }: any) {
  const [isSessionRevoking, setIsSessionRevoking] = React.useState(false);
  const parser = new UAParser(userAgent);
  const { device, os, browser } = parser.getResult();
  const parsedUpdatedAt = safeParseISO(updatedAt);
  const parsedCreatedAt = safeParseISO(createdAt);
  const lastActive = parsedUpdatedAt ? formatDistanceToNowStrict(parsedUpdatedAt, { addSuffix: true }) : "Unknown";
  const loggedInAt = parsedCreatedAt ? format(parsedCreatedAt, "MMM dd, yyyy, hh:mm a") : "Unknown";

  const { session } = useAuth();
  const isCurrentSession = session.session.id === id;

  const handleSessionRevoke = async () => {
    if (isCurrentSession) return;
    await authClient.revokeSession(
      {
        token,
      },
      {
        onRequest() {
          setIsSessionRevoking(true);
        },
        onSuccess() {
          setIsSessionRevoking(false);
          toast.success("Session revoked");
        },
        onError(ctx) {
          setIsSessionRevoking(false);
          toast.error("Failed to revoke session", {
            description: ctx.error.message,
          });
        },
      },
    );
  };

  return (
    <div className="group flex gap-4 p-4">
      <Badge className="mt-0.5 size-12 shrink-0 p-2" variant="secondary">
        {device.type === "mobile" && <Smartphone className="size-5!" />}
        {device.type === "tablet" && <Tablet className="size-5!" />}
        {device.type === "smarttv" && <MonitorIcon className="size-5!" />}
        {device.type === "xr" && <MonitorIcon className="size-5!" />}
        {!device.type && <MonitorIcon className="size-5!" />}
      </Badge>

      <div className="grid gap-2">
        <h2 className="text-base font-medium capitalize">
          {os.name} {device.model} - {browser.name} {browser.version}
        </h2>
        <div className="text-muted-foreground flex max-w-3/4 flex-wrap justify-between gap-x-4 gap-y-1">
          <div className="inline-flex items-center gap-1 text-sm font-light text-nowrap">
            <MapPin className="size-4!" />
            <span className="font-medium">Location</span> New York
          </div>
          <div className="inline-flex items-center gap-1 text-sm font-light text-nowrap">
            <Globe className="size-4!" /> <span className="font-medium">IP Adress:</span> {ipAddress || "Unknown"}
          </div>
          <div className="inline-flex items-center gap-1 text-sm font-light text-nowrap">
            <Clock className="size-4!" /> <span className="font-medium">Last active:</span> {lastActive}
          </div>
          <div className="inline-flex items-center gap-1 text-sm font-light text-nowrap">
            <ClockArrowUpIcon className="size-4!" /> <span className="font-medium">Signed in:</span> {loggedInAt}
          </div>
        </div>
      </div>

      <div className="flex h-fit flex-1 flex-col items-end">
        {isCurrentSession && (
          <Badge className="h-fit w-fit" variant="success">
            <Shield className="shrink-0" />
            <span className="ml-0.5">Current</span>
          </Badge>
        )}
        {!isCurrentSession && (
          <Button
            size="icon"
            variant="destructive"
            disabled={isSessionRevoking}
            isLoading={isSessionRevoking}
            onClick={handleSessionRevoke}
          >
            <Trash2 />
          </Button>
        )}
      </div>
    </div>
  );
}

export default SessionCard;
