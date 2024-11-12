"use client";
import { signOut } from "@/actions/auth";
import { sign } from "crypto";
import { redirect } from "next/navigation";

export const SignoutButton = () => {
  const redirectToAuth = () => {
    signOut();
    redirect("/auth");
  };
  return (
    <button
      onClick={redirectToAuth}
      className="border-solid p-2 w-full text-end"
    >
      Sign out
    </button>
  );
};
