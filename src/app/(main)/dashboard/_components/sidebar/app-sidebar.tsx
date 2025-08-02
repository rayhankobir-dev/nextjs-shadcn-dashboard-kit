"use client";

import Link from "next/link";

import Logo from "@/components/icon/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/config/app-config";
import { rootUser } from "@/data/users";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex h-16 w-full flex-row items-center justify-start border-b border-dashed group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
        <SidebarMenu className="duration-200 group-data-[collapsible=icon]:w-fit">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="w-fit overflow-hidden hover:bg-transparent data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/" className="flex items-center gap-1.5 overflow-hidden">
                <Logo className="size-6!" />
                <span className="text-xl font-semibold">{APP_CONFIG.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="w-full">
        <NavMain items={sidebarItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={rootUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
