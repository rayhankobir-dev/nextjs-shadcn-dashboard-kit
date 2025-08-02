import { Fingerprint } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function OtpVerificationForm({ className, ...props }: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="password">OTP (One-time-password)</Label>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot className="h-11 w-16" index={0} />
              <InputOTPSlot className="h-11 w-16" index={1} />
              <InputOTPSlot className="h-11 w-16" index={2} />
              <InputOTPSlot className="h-11 w-16" index={3} />
              <InputOTPSlot className="h-11 w-16" index={4} />
              <InputOTPSlot className="h-11 w-16" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="grid gap-1">
          <Button type="submit" className="w-full">
            Verify OTP
            <Fingerprint />
          </Button>

          <div className="text-muted-foreground text-sm">
            You didn&apos;t receive the code?{" "}
            <Button className="px-1 py-0 hover:no-underline" type="button" variant="link">
              Resend Code
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default OtpVerificationForm;
