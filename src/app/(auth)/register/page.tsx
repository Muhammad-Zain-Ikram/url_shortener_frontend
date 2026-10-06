import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | LinkCraft",
  description: "Create a new LinkCraft account to start creating fast, trackable short URLs.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
