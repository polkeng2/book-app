import { cookies } from "next/headers";
import LoginForm from "./loginForm";
import { redirect } from "next/navigation";

export default function Login() {
  const setToken = async (token: string) => {
    "use server";
    cookies().set("token", token, {
      maxAge: 60 * 60 * 24, // one day in seconds
      httpOnly: true, // prevent client-side access
    });
    redirect("/");
  };
  return <LoginForm setToken={setToken} />;
}
