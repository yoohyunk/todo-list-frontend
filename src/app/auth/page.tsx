"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/actions/auth";
import React, { useState } from "react";

export default function page() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const target = e.target as HTMLFormElement;
          try {
            await signIn(
              (target.elements.namedItem("email") as HTMLInputElement).value,
              (target.elements.namedItem("password") as HTMLInputElement).value
            );
          } catch (error) {
            if (error.message === "email or password incorrect") {
              setError("Email or password is incorrect");
            } else {
              setError("An error occurred. Please try again later.");
            }
            console.error("Error logging in", error);
          }
        }}
        className="flex items-center justify-center w-2/5"
      >
        <Card className="flex-col items-center size-2/4 gap-y-8">
          <CardHeader>
            <CardTitle className="text-xl text-center">Sign in</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div>
              <Input type="email" id="email" placeholder="Email" className="" />
            </div>
            <div>
              <Input type="password" id="password" placeholder="Password" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              variant="outline"
              className="bg-black text-slate-50"
            >
              Sign In
            </Button>
            {error && (
              <CardDescription className="text-xs text-red-600">
                {error}
              </CardDescription>
            )}
            <CardDescription className="text-xs">
              Don't have account? Sign up
            </CardDescription>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
