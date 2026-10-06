import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In | LinkCraft",
  description: "Sign in to your LinkCraft account to manage and track shortened URLs.",
};

export default function LoginPage() {
  return <LoginForm />;
}
