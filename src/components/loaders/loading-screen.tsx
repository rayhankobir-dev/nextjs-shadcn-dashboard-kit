import { Loader2 } from "lucide-react";
import React from "react";

function LoadingScreen() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Loader2 className="text-primary-500 animate-spin" />
    </main>
  );
}

export default LoadingScreen;
