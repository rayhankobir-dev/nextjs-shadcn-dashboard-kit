"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormikProvider, ErrorMessage, useFormik } from "formik";
import { Check, CheckCircle2, Eye, EyeOff, XCircle } from "lucide-react";
import React from "react";
import * as Yup from "yup";

const changePasswordSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter (a-z)")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
    .matches(/\d/, "Password must contain at least one number (0-9)")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character (e.g. !@#$%)"),
  confirmPassword: Yup.string()
    .required("Re-type your password")
    .oneOf([Yup.ref("newPassword")], "Passwords doesn't match!"),
});

interface PasswordRequirement {
  id: string;
  text: string;
  regex: RegExp;
  met: boolean;
}

function ChangePasswordForm() {
  const [isPasswordUpdating, setIsPasswordUpdating] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);
  const [requirements, setRequirements] = React.useState<PasswordRequirement[]>([
    {
      id: "length",
      text: "At least 8 characters",
      regex: /.{8,}/,
      met: false,
    },
    {
      id: "lowercase",
      text: "At least 1 lower letter (a-z)",
      regex: /[a-z]/,
      met: false,
    },
    {
      id: "uppercase",
      text: "At least 1 uppercase letter (A-Z)",
      regex: /[A-Z]/,
      met: false,
    },
    {
      id: "number",
      text: "At least 1 number (0-9)",
      regex: /[0-9]/,
      met: false,
    },
    {
      id: "special",
      text: "At least 1 special characters",
      regex: /[!@#$%^&*(),.?":{}|<>]/,
      met: false,
    },
  ]);

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  React.useEffect(() => {
    setRequirements((prev) =>
      prev.map((req) => ({
        ...req,
        met: req.regex.test(formik.values.newPassword),
      })),
    );
  }, [formik.values.newPassword]);

  return (
    <FormikProvider value={formik}>
      <section className="grid max-w-3xl grid-cols-2 gap-10">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4.5">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="***********"
                disabled={isPasswordUpdating}
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
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={isNewPasswordVisible ? "text" : "password"}
                placeholder="***********"
                disabled={isPasswordUpdating}
                hasError={!!formik.errors.newPassword && formik.touched.newPassword}
                {...formik.getFieldProps("newPassword")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setIsNewPasswordVisible((prev) => !prev)}
              >
                {isNewPasswordVisible ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            <ErrorMessage name="newPassword" component="p" className="text-destructive text-xs" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="***********"
                disabled={isPasswordUpdating}
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
          <div className="flex items-center justify-start gap-4">
            <Button type="button" variant="outline" disabled={isPasswordUpdating} onClick={() => formik.resetForm()}>
              <XCircle />
              Cancel
            </Button>
            <Button type="submit" disabled={isPasswordUpdating} isLoading={isPasswordUpdating}>
              <CheckCircle2 /> Update Password
            </Button>
          </div>
        </form>

        <div className="mt-4 grid h-fit gap-3">
          <h2 className="text-lg font-medium">Password must contain:</h2>

          <div className="grid divide-y text-sm">
            {requirements.map((requirement) => (
              <div key={requirement.id} className="inline-flex items-center gap-3 px-1.5 py-3.5">
                <span>{requirement.met ? <Check className="size-4 text-green-500" /> : "-"}</span> {requirement.text}
              </div>
            ))}
          </div>
        </div>
      </section>
    </FormikProvider>
  );
}

export default ChangePasswordForm;
