"use client";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const emailSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

function ForgotPasswordForm({ className, ...props }: React.ComponentProps<"form">) {
  const [isEmailSending, setIsEmailSending] = React.useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: async ({ email }) => {
      await authClient.forgetPassword.emailOtp(
        {
          email,
        },
        {
          onRequest() {
            setIsEmailSending(true);
          },
          onSuccess() {
            setIsEmailSending(false);
            toast.success("Email sent successfully", {
              description: "We have sent you an email with reset password code.",
            });

            router.push("/auth/reset-password?email=" + encodeURIComponent(email));
          },
          onError(ctx) {
            setIsEmailSending(false);
            toast.error("Failed to send email", {
              description: ctx.error.message,
            });
          },
        },
      );
    },
  });
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              disabled={isEmailSending}
              hasError={!!formik.errors.email && formik.touched.email}
              {...formik.getFieldProps("email")}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isEmailSending} isLoading={isEmailSending}>
            Reset Password
            <Lock />
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
}

export default ForgotPasswordForm;
