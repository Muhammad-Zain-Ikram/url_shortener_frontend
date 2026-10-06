"use client";

import React, { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, KeyRound, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

import { verifyEmailSchema, type VerifyEmailInput } from "../schemas/verify-email.schema";
import { useVerifyEmail } from "../api/use-verify-email";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("token") || "";
  const hasTriggeredRef = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      token: tokenFromUrl,
    },
  });

  const {
    mutate: verifyToken,
    isPending: isVerifying,
    isSuccess: isVerified,
    error: verificationError,
  } = useVerifyEmail();

  const handleVerify = (data: VerifyEmailInput) => {
    verifyToken(data, {
      onSuccess: () => {
        toast.success("Email verified successfully! You can now log in.");
      },
      onError: (err) => {
        const msg = err instanceof Error ? err.message : "Verification failed";
        toast.error(msg);
      },
    });
  };

  useEffect(() => {
    if (tokenFromUrl && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      setValue("token", tokenFromUrl);
      verifyToken(
        { token: tokenFromUrl },
        {
          onSuccess: () => {
            toast.success("Email verified successfully! You can now log in.");
          },
          onError: (err) => {
            const msg = err instanceof Error ? err.message : "Verification failed";
            toast.error(msg);
          },
        }
      );
    }
  }, [tokenFromUrl, setValue, verifyToken]);

  const errorMessage = verificationError
    ? verificationError instanceof Error
      ? verificationError.message
      : "Verification failed. Token may be expired or invalid."
    : null;

  if (isVerified) {
    return (
      <Card className="w-full max-w-md border-border/80 shadow-lg text-center">
        <CardHeader className="space-y-2">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-6" />
          </div>
          <CardTitle className="text-2xl font-bold">Email Verified!</CardTitle>
          <CardDescription>
            Your email has been confirmed. You now have full access to LinkCraft.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            onClick={() => router.push("/login")}
          >
            Continue to Login
            <ArrowRight className="size-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md border-border/80 shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Verify Your Email</CardTitle>
        <CardDescription>
          Enter the verification code sent to your registered email address
        </CardDescription>
      </CardHeader>

      <CardContent>
        {errorMessage && (
          <div
            role="alert"
            className="mb-4 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
          >
            <AlertCircle className="size-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(handleVerify)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token">Verification Code or Token</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <Input
                id="token"
                placeholder="Enter verification code"
                disabled={isVerifying}
                className="pl-9 font-mono"
                {...register("token")}
              />
            </div>
            {errors.token && (
              <p className="text-xs font-medium text-destructive">
                {errors.token.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full font-semibold"
            disabled={isVerifying}
          >
            {isVerifying ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Confirm Verification"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t border-border/50 py-4 text-sm text-muted-foreground">
        <p>
          Need to sign in?{" "}
          <Link
            href="/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Back to login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
