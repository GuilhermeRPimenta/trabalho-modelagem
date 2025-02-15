import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<{
  auth: { id: number; name: string } | null;
  setAuth: React.Dispatch<
    React.SetStateAction<{ id: number; name: string } | null>
  >;
  authUpdate: () => void;
} | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<{ id: number; name: string } | null>(null);
  const authUpdate = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:7000/user/get", {
        method: "GET",
        credentials: "include", // Certifique-se de incluir cookies na requisição
      });

      if (response.ok) {
        const user = await response.json();
        console.log(user);
        setAuth({ id: user.id, name: user.name ?? "placeholder" });
      } else {
        setAuth(null); // Caso não consiga obter o usuário, loga o usuário
        navigate("/login"); // Redireciona para a página de login
      }
    } catch (error) {
      console.error("Erro ao verificar token:", error);
      setAuth(null);
    }
  }, [navigate]);

  useEffect(() => {
    authUpdate();
  }, [authUpdate]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, authUpdate }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
