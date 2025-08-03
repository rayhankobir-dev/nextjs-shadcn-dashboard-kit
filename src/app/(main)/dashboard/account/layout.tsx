import { NextLink } from "@/components/custom/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BellDotIcon, DollarSign, Fingerprint, Settings, User } from "lucide-react";

function AccountLayout({ children }: { children: React.ReactNode }) {
  const baseClass =
    "text-sm border-buted flex items-center gap-2.5 lg:border-r-2 px-4.5 py-3 font-medium hover:bg-primary-foreground dark:hover:bg-background hover:text-primary hover:border-r-2 hover:border-primary duration-300";
  const activeClass = "text-primary lg:border-r-2 border-primary bg-primary-foreground";
  return (
    <main className="p-4 md:p-6">
      <Card className="overflow-hidden py-0">
        <div className="flex flex-col lg:flex-row lg:gap-5">
          <ul className="flex h-fit w-full border-b-2 bg-transparent lg:max-w-[250px] lg:flex-col lg:border-0">
            <NextLink activeClass={activeClass} className={cn(baseClass)} href="/dashboard/account">
              <User className="size-5" />
              Profile
            </NextLink>
            <NextLink activeClass={activeClass} className={cn(baseClass)} href="/dashboard/account/security">
              <Fingerprint className="size-5" />
              Security
            </NextLink>
            <NextLink activeClass={activeClass} className={cn(baseClass)} href="/dashboard/account/notifications">
              <BellDotIcon className="size-5" />
              Notifications
            </NextLink>

            <NextLink activeClass={activeClass} className={cn(baseClass)} href="/dashboard/account/billing">
              <DollarSign className="size-5" />
              Billing
            </NextLink>

            <NextLink activeClass={activeClass} className={cn(baseClass)} href="/dashboard/account/settings">
              <Settings className="size-5" />
              Settings
            </NextLink>
          </ul>

          <CardContent className="w-full py-6">{children}</CardContent>
        </div>
      </Card>
    </main>
  );
}

export default AccountLayout;
