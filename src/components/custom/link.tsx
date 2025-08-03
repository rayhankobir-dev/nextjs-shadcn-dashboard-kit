"use client";

import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface ActiveLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  activeClass?: string;
  strict?: boolean;
}

export function NextLink({ href, children, className, activeClass = "", strict = true, ...props }: ActiveLinkProps) {
  const pathname = usePathname();
  const hrefString = typeof href === "string" ? href : href.toString();
  const matched = strict ? pathname === hrefString : pathname.startsWith(hrefString);
  return (
    <Link href={href} className={cn(className, matched && activeClass)} {...props}>
      {children}
    </Link>
  );
}
