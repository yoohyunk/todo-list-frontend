import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const request = async (
  path: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  json: object | undefined = undefined,
  isPublicService = false
) => {
  const urlDev = process.env.NEXT_PUBLIC_API_URL;

  let jwt = "";
  if (isPublicService === false) {
    const cookieStore = await cookies();
    jwt = cookieStore.get("auth")?.value || "";

    if (!jwt) {
      redirect("/auth");
      throw new Error("Unauthorized");
    }
  }
  const requestOptions: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(jwt && { Authorization: jwt }),
    },
  };

  if (json) {
    requestOptions.body = JSON.stringify(json);
  }

  try {
    const response = await fetch(urlDev + path, requestOptions);
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.log("Network request failed:", error);
    throw error;
  }
};
