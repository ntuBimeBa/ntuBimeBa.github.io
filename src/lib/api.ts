import { useAuth } from "@/context/AuthContext";

export const api = async (
  path: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = localStorage.getItem("token"); // 如果你用 Context 也可傳入 token

  const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    console.warn("未授權，請重新登入");
    // 可加跳轉、登出處理
  }

  return response;
};
