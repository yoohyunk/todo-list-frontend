"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { request } from "@/utils/request";

export const signIn = async (email: string, password: string) => {
  try {
    const response = await request(
      "/users/login",
      "POST",
      {
        email,
        password,
      },
      true
    );

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
    const response = await request(
      "/users/signup",
      "POST",
      { email, password },
      true
    );

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
    const response = await request("/users", "GET");
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
