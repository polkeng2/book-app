import { cookies } from "next/headers";
import LoginForm from "./loginForm";

export default function Login() {
  const setToken = async (token: string) => {
    "use server";
    cookies().set("token", token, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  };
  return <LoginForm setToken={setToken} />;
}
