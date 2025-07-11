import { UserData } from "@/lib/Structures";
import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  verifyToken: (token?: string) => Promise<boolean>;
  getUserData: () => Promise<UserData>;
  loading: boolean;
  referrer: string;
  setReferrer: (ref?: string | null) => void;
  userStatusCode: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [ userStatusCode, setUserStatusCode] = useState<number | null>(null);
  const [referrer, setReferrerState] = useState("/");

  useEffect(() => {
    setLoading(true);
    const storedToken = localStorage.getItem("token");
    const storedReferrer = localStorage.getItem("referrer")
    if (storedToken) {
      setTokenState(storedToken);
    }
    if (storedReferrer) {
      setReferrerState(storedReferrer);
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

  const setReferrer = (ref: string | null = "/") => {
    if (ref) {
      localStorage.setItem("referrer", ref);
      setReferrerState(ref);
    } else {
      localStorage.setItem("/", ref);
      setReferrerState("/");
    }
  }

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
          throw err;
        }

        console.log("驗證成功");
        setUserStatusCode(0);
        return true;
      } catch (err) {
        console.error("驗證失敗:", err.error);
        setUserStatusCode(err.status);
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
    <AuthContext.Provider value={{ token, setToken, logout, verifyToken, getUserData, loading, referrer, setReferrer, userStatusCode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth 必須包在 <AuthProvider>");
  return context;
};
