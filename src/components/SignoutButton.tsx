"use client";
import { signOut } from "@/actions/auth";
import { sign } from "crypto";
import { redirect } from "next/navigation";
import { LuLogOut } from "react-icons/lu";

export const SignoutButton = () => {
  const redirectToAuth = () => {
    signOut();
    redirect("/auth");
  };
  return (
    <button
      onClick={redirectToAuth}
      className="border-solid p-2 w-full flex flex-row items-center justify-end"
    >
      <LuLogOut />
      Sign out
    </button>
  );
};
