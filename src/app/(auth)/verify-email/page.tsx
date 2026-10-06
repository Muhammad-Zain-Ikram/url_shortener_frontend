import { Suspense } from "react";
import type { Metadata } from "next";
import { VerifyEmailForm } from "@/features/auth/components/VerifyEmailForm";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Verify Email | LinkCraft",
  description: "Verify your email address to complete your LinkCraft registration.",
};

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 w-full items-center justify-center">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  );
}
