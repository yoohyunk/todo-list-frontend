export const signIn = async (email: string, password: string) => {
  try {
    const response = await fetch(
      "https://flask-server-6y1b.onrender.com/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    localStorage.setItem("token", data.jwt);

    return data.jwt;
  } catch (error) {
    console.log("Error logging in", error);
    throw error;
  }
};
