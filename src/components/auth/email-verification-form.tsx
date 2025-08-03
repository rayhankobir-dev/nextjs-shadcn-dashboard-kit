"use client";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import * as Yup from "yup";
import { authClient } from "@/lib/auth-client";
import { FormikProvider, ErrorMessage, useFormik } from "formik";
import React from "react";
import { toast } from "sonner";

const emailSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

function EmailVerificationForm({ className, ...props }: React.ComponentProps<"form">) {
  const [isEmailSending, setIsEmailSending] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: async ({ email }) => {
      await authClient.sendVerificationEmail(
        {
          email,
          callbackURL: "http://localhost:3000/auth/verify-email",
        },
        {
          onRequest() {
            setIsEmailSending(true);
          },
          onSuccess() {
            setIsEmailSending(false);
            toast.success("Verification email sent");
          },
          onError(ctx) {
            setIsEmailSending(false);
            toast.error("Failed to send verification email", {
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
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              hasError={!!formik.errors.email && formik.touched.email}
              {...formik.getFieldProps("email")}
            />
            <ErrorMessage name="email" component="p" className="text-destructive text-xs" />
          </div>

          <Button type="submit" className="w-full" disabled={isEmailSending} isLoading={isEmailSending}>
            Send Verification Email
            <Mail />
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
}

export default EmailVerificationForm;
