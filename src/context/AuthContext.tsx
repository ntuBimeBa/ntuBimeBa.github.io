import { UserData } from "@/lib/Structures";
import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  verifyToken: (token?: string) => Promise<boolean>;
  getUserData: () => Promise<UserData>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokenState(storedToken);
    }
    setLoading(false);
  }, []);

  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    setTokenState(token);
  };

  const verifyToken = async (currentToken?: string) => {
    const useToken = currentToken ?? token;  // 優先用傳入的
    if (useToken) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user_entry`, {
          headers: {
            Authorization: `Bearer ${useToken}`,
          },
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error);
        }

        console.log("驗證成功");
        return true;
      } catch (error) {
        console.error("驗證失敗:", error);
        return false;
      }
    } else {
      console.warn("缺少 token");
      return false;
    }
  };

  const getUserData = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/user_information`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }

    const data = await res.json();
    const user_data: UserData = {
      uid: data.uid,
      username: data.username,
      real_name: data.real_name,
      stu_id: data.stu_id,
      profile_img: data.profile_img,
      sa_fee: data.sa_fee,
      access_maker_space_reservation: data.access_maker_space_reservation,
      email: data.email,
      tel: data.tel,
      discord: data.discord,
      address: data.address,
      note: data.note
    }
    return user_data;
  }

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout, verifyToken, getUserData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth 必須包在 <AuthProvider>");
  return context;
};
