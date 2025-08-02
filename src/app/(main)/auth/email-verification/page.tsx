import Disclaimer from "@/components/auth/disclaimer";
import EmailVerificationForm from "@/components/auth/email-verification-form";
import Heading from "@/components/auth/heading";

const title = "Verify Your Email Address";
const description =
  "We will send you a link to verify your email address. Check your email address to find verification link.";

function EmailVerificationPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-12 sm:w-[350px]">
      <Heading title={title} description={description} />
      <EmailVerificationForm />
      <Disclaimer />
    </div>
  );
}

export default EmailVerificationPage;
