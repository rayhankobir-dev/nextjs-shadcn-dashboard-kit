import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function ResetPasswordForm({ className, ...props }: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="password">New Password</Label>
          <Input id="password" type="password" placeholder="******" required />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Re-type Password</Label>
          <Input id="confirmPassword" type="confirmPassword" placeholder="******" required />
        </div>

        <Button type="submit" className="w-full">
          Change Password
          <Lock />
        </Button>
      </div>
    </form>
  );
}

export default ResetPasswordForm;
