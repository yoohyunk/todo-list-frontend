"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import { use } from "react";

export const signIn = async (email: string, password: string) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    const cookieStore = await cookies();
    cookieStore.set("auth", data.jwt, {
      path: "/",
      secure: true,
      sameSite: "strict",
    });

    return redirect("/");
  } catch (error) {
    console.log("Error logging in", error);
    throw error;
  }
};

export const signUp = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
  try {
    const response = await fetch("http://127.0.0.1:5000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    const cookieStore = await cookies();
    cookieStore.set("auth", data.jwt, {
      path: "/",
      secure: true,
      sameSite: "strict",
    });

    return redirect("/");
  } catch (error) {
    console.log("Error signing up", error);
    throw error;
  }
};

export const signOut = async () => {
  (await cookies()).delete("auth");
};

export const getUsersLists = async () => {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("auth")?.value;
    if (!jwt) {
      return redirect("/auth");
    }

    const response = await fetch("http://127.0.0.1:5000/users/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return [];
    }
    return data;
  } catch (error) {
    console.log("Error fetching lists:", error);
    throw error;
  }
};
