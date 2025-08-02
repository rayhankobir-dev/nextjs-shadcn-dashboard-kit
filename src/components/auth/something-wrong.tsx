import Link from "next/link";

import { Home, Lock } from "lucide-react";

function SomethingWrong() {
  return (
    <div className="bg-background flex h-full w-full flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <Lock className="text-primary mx-auto size-12" />
        <h1 className="text-foreground mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Ops! Something went wrong
        </h1>
        <p className="text-muted-foreground mt-4">
          You do not have permission to view the requested content. Please contact the site administrator{" "}
          <Link href="/support" className="text-primary hover:text-secondary-foreground font-medium duration-300">
            Support
          </Link>
        </p>
        <div className="mt-6">
          <Link
            href="/dashboard"
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium shadow-xs transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
            prefetch={false}
          >
            <Home size={16} />
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SomethingWrong;
