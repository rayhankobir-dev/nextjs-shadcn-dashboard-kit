"use client";

import SomethingWrong from "@/components/auth/something-wrong";

function GlobalErrorBoundary() {
  return (
    <main className="h-screen w-screen">
      <SomethingWrong />
    </main>
  );
}

export default GlobalErrorBoundary;
