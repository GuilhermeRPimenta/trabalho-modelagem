import { createContext, useState } from "react";

const AuthContext = createContext<{
  auth: {
    id: number;
    name: string;
  } | null;
  setAuth: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
    } | null>
  >;
} | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<{ id: number; name: string } | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
