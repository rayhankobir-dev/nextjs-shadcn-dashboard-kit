import Disclaimer from "@/components/auth/disclaimer";
import Heading from "@/components/auth/heading";
import ResetPasswordForm from "@/components/auth/reset-password-form";

const title = "Change Your Password";
const description = "Enter your email to reset your password. We will send you a link to reset your password.";

function ResetPasswordPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-12 sm:w-[350px]">
      <Heading title={title} description={description} />
      <ResetPasswordForm />
      <Disclaimer />
    </div>
  );
}

export default ResetPasswordPage;
