import { createContext, useState } from "react";
import { UserType } from "../../types/user";

const AuthContext = createContext<{
  auth: UserType | null;
  setAuth: React.Dispatch<React.SetStateAction<UserType | null>>;
} | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<UserType | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
