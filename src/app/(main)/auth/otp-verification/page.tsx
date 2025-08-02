import Disclaimer from "@/components/auth/disclaimer";
import Heading from "@/components/auth/heading";
import OtpVerificationForm from "@/components/auth/otp-verification-form";

const title = "Verify Your Account";
const description =
  "We have successfully sent you an email with a verification code. Please enter it below to verify your account.";

function OtpVerificationPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center gap-12 sm:w-[350px]">
      <Heading title={title} description={description} />
      <OtpVerificationForm />
      <Disclaimer />
    </div>
  );
}

export default OtpVerificationPage;
