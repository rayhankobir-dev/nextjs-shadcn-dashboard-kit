import Disclaimer from "@/components/auth/disclaimer";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import Heading from "@/components/auth/heading";

const title = "Forgot Your Password";
const description = "Enter your email to reset your password. We will send you a link to reset your password.";

function ForgotPasswordPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-12 sm:w-[350px]">
      <Heading title={title} description={description} />
      <ForgotPasswordForm />
      <Disclaimer />
    </div>
  );
}

export default ForgotPasswordPage;
