import Disclaimer from "@/components/auth/disclaimer";
import Heading from "@/components/auth/heading";
import { LoginForm } from "@/components/auth/login-form";

const title = "Login to Your Account";
const description = "Enter your email and password to log in to your account.";

export default function page() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-12 sm:w-[350px]">
      <Heading title={title} description={description} />
      <LoginForm />
      <Disclaimer />
    </div>
  );
}
