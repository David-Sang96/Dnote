/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface UserType {
  user: {
    name: string;
    email: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}

interface AuthContextType {
  authUser: UserType | null;
  setAuthUser: (val: UserType | null) => void;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: Props) => {
  const [authUser, setAuthUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [authUser]);

  const contextValue: AuthContextType = {
    authUser,
    setAuthUser,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside AuthContextProvider");
  }
  return context;
};
