import { ReactNode } from "react";

import Image from "next/image";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main>
      <div className="relative container h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="bg-primary relative hidden h-full flex-col p-10 lg:flex">
          <div className="absolute inset-0" />

          <div className="relative z-20 flex h-full w-full flex-col justify-between text-white">
            <Image
              className="mx-auto h-auto w-full"
              src="https://ecme-next.themenate.net/img/others/auth-split-img.png"
              alt="Auth Split"
              height={1024}
              width={1024}
            />

            <div className="flex flex-col gap-4">
              <h1 className="text-center text-3xl font-semibold tracking-tight">
                The easiest way to build your admin app
              </h1>
              <blockquote className="space-y-2">
                <p className="text-center text-base opacity-80">
                  &ldquo;This library has saved me countless hours of work and helped me deliver stunning designs to my
                  clients faster than ever before.&rdquo;
                </p>
              </blockquote>
            </div>
          </div>
        </div>
        <div className="flex h-full px-6 py-4 lg:p-8">{children}</div>
      </div>
    </main>
  );
}
