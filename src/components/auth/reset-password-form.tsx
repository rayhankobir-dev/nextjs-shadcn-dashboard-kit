"use client";
import { Eye, EyeOff, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import * as Yup from "yup";
import { ErrorMessage, FormikProvider, useFormik } from "formik";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter (a-z)")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
    .matches(/\d/, "Password must contain at least one number (0-9)")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character (e.g. !@#$%)"),
  confirmPassword: Yup.string()
    .required("Re-type your password")
    .oneOf([Yup.ref("password")], "Passwords doesn't match!"),
  otp: Yup.string().required("OTP is required").length(6, "OTP must be 6 digits"),
});

function ResetPasswordForm({ className, ...props }: React.ComponentProps<"form">) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);
  const [isPasswordResetting, setIsPasswordResetting] = React.useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email") || "";

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      otp: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async ({ password, otp }) => {
      setIsPasswordResetting(true);
      const { data, error } = await authClient.emailOtp.resetPassword({
        email,
        password,
        otp,
      });

      setIsPasswordResetting(false);
      if (error && error.code === "USER_NOT_FOUND") {
        toast.error("Invalid email address", {
          description: error.message,
        });
        router.push("/auth/forgot-password");
      }
      if (error && error.code === "INVALID_OTP") {
        toast.error("Invalid OTP", {
          description: error.message,
        });
      }
      if (!error && data) {
        toast.success("Password reset successfully");
        router.push("/auth/login");
      }
    },
  });

  console.log(formik.errors);
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="******"
                disabled={isPasswordResetting}
                hasError={!!formik.errors.password && formik.touched.password}
                {...formik.getFieldProps("password")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                {isPasswordVisible ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            <ErrorMessage name="password" component="p" className="text-destructive text-xs" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Re-type Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="******"
                disabled={isPasswordResetting}
                hasError={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
                {...formik.getFieldProps("confirmPassword")}
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
              >
                {isConfirmPasswordVisible ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            <ErrorMessage name="confirmPassword" component="p" className="text-destructive text-xs" />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="otp">OTP (One-time-password)</Label>
            <InputOTP
              id="otp"
              maxLength={6}
              disabled={isPasswordResetting}
              {...formik.getFieldProps("otp")}
              onChange={(val) => formik.setFieldValue("otp", val)}
            >
              <InputOTPGroup>
                <InputOTPSlot className="h-11 w-16" index={0} />
                <InputOTPSlot className="h-11 w-16" index={1} />
                <InputOTPSlot className="h-11 w-16" index={2} />
                <InputOTPSlot className="h-11 w-16" index={3} />
                <InputOTPSlot className="h-11 w-16" index={4} />
                <InputOTPSlot className="h-11 w-16" index={5} />
              </InputOTPGroup>
            </InputOTP>

            <ErrorMessage name="otp" component="p" className="text-destructive text-xs" />
          </div>

          <Button type="submit" className="w-full" disabled={isPasswordResetting} isLoading={isPasswordResetting}>
            Change Password
            <Lock />
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
}

export default ResetPasswordForm;
