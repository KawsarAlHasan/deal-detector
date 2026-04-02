import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-4 lg:mx-auto">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center min-h-screen md:max-w-6xl mx-auto md:py-8">
        {/* Left: Auth form */}
        <div className="w-full">{children}</div>

        {/* Right: Illustration — shared across sign-in, sign-up, forgot-password, etc. */}
        <div className="hidden md:flex items-center justify-center">
          <Image
            src="/static/images/auth_images.svg"
            width={500}
            height={500}
            alt="Auth illustration"
            priority
          />
        </div>
      </section>
    </div>
  );
}
