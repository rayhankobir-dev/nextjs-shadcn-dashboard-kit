"use client";
import React from "react";

import Link from "next/link";

import { ErrorMessage, FormikProvider, useFormik } from "formik";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async ({ email, password }) => {
      authClient.signIn.email(
        {
          email,
          password,
          callbackURL: DEFAULT_LOGIN_REDIRECT,
          rememberMe: true,
        },
        {
          onRequest() {
            setIsAuthenticating(true);
          },
          onSuccess() {
            setIsAuthenticating(false);
            toast.success("Authenticated", {
              description: "You can now close this window",
            });
          },
          onError(ctx) {
            setIsAuthenticating(false);
            toast.error("Authentication failed", {
              description: ctx.error.message,
            });
          },
        },
      );
    },
  });
  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className={cn("flex flex-col gap-6 transition-all duration-500", className)}
        {...props}
      >
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              disabled={isAuthenticating}
              hasError={!!formik.errors.email && formik.touched.email}
              {...formik.getFieldProps("email")}
            />
            <ErrorMessage name="email" component="p" className="text-destructive text-xs" />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="/auth/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="******"
              disabled={isAuthenticating}
              hasError={!!formik.errors.password && formik.touched.password}
              {...formik.getFieldProps("password")}
            />
            <ErrorMessage name="password" component="p" className="text-destructive text-xs" />
          </div>
          <Button type="submit" className="w-full" isLoading={isAuthenticating}>
            Login
            <LogIn />
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
}
