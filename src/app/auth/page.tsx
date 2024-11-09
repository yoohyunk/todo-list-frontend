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
import { signIn, signUp } from "@/actions/auth";
import React, { useState } from "react";

export default function page() {
  const [error, setError] = useState<string | null>(null);
  const [currentForm, setCurrentForm] = useState<"login" | "signup">("login");
  const toggleForm = () => {
    setCurrentForm(currentForm === "login" ? "signup" : "login");
    setError(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const target = e.target as HTMLFormElement;
          try {
            if (currentForm === "signup") {
              await signUp(
                (target.elements.namedItem("email") as HTMLInputElement).value,
                (target.elements.namedItem("password") as HTMLInputElement)
                  .value,
                (
                  target.elements.namedItem(
                    "confirmPassword"
                  ) as HTMLInputElement
                ).value
              );
            } else {
              await signIn(
                (target.elements.namedItem("email") as HTMLInputElement).value,
                (target.elements.namedItem("password") as HTMLInputElement)
                  .value
              );
            }
          } catch (error) {
            if (error instanceof Error) {
              if (error.message === "email or password incorrect") {
                setError("Email or password is incorrect");
              } else if (error.message === "Passwords do not match") {
                setError("Passwords do not match");
              } else if (error.message === "email already exists") {
                setError("Email already exists");
              } else {
                setError("An error occurred. Please try again later.");
              }
            } else {
              setError("An unknown error occurred.");
            }
            console.log("Error logging in", error);
          }
        }}
        className="flex items-center justify-center w-2/5"
      >
        <Card className="flex-col items-center size-2/4 gap-y-8">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              {currentForm === "login" ? "Sign in" : "Sign up"}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div>
              <Input type="email" id="email" placeholder="Email" className="" />
            </div>
            <div>
              <Input type="password" id="password" placeholder="Password" />
            </div>
            {currentForm === "signup" && (
              <div>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              variant="outline"
              className="bg-black text-slate-50"
            >
              {currentForm === "login" ? "Sign in" : "Sign up"}
            </Button>
            {error && (
              <CardDescription className="text-xs text-red-600">
                {error}
              </CardDescription>
            )}
            {currentForm === "login" ? (
              <CardDescription className="text-xs">
                Don't have account?{" "}
                <span onClick={toggleForm} className="text-blue-500 underline">
                  Sign up
                </span>
              </CardDescription>
            ) : (
              <CardDescription className="text-xs">
                Already have account?{" "}
                <span onClick={toggleForm} className="text-blue-500 underline">
                  Sign in
                </span>
              </CardDescription>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
