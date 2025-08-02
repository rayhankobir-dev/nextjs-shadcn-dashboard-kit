import Link from "next/link";

function Disclaimer() {
  return (
    <p className="text-muted-foreground text-center text-sm">
      Are you are experiencing any issues, please contact to{" "}
      <Link href="/support" className="text-primary hover:text-primary-foreground duration-300">
        Support
      </Link>{" "}
      and check our{" "}
      <Link href="/privacy" className="text-primary hover:text-primary-foreground duration-300">
        Privacy Policy
      </Link>
      .
    </p>
  );
}

export default Disclaimer;
