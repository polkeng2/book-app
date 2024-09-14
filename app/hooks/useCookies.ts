import { cookies } from "next/headers";

const cookieStore = cookies();

export const getToken = () => {
  const token = cookieStore.get("token");
  return token;
};

export const setToken = (token: string) => {
  cookieStore.set("token", token);
};
