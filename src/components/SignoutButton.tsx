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
    <button onClick={redirectToAuth} className="border-solid border-2 p-2">
      log out
    </button>
  );
};
