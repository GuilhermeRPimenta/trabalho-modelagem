import { createContext, useEffect, useState } from "react";

type AuthUser = { id: number; name: string; cpf: string } | null;
type AuthAdmin = { id: number; name: string } | null;

interface Auth {
  user: AuthUser;
  admin: AuthAdmin;
}

type SetAuth = React.Dispatch<
  React.SetStateAction<{
    user: AuthUser;
    admin: AuthAdmin;
  }>
>;

const AuthContext = createContext<{
  auth: Auth;
  setAuth: SetAuth;
  authUserUpdate: () => void;
  authAdminUpdate: () => void;
}>({
  auth: { user: null, admin: null },
  setAuth: () => {},
  authUserUpdate: () => {},
  authAdminUpdate: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth>({ user: null, admin: null });
  const authUserUpdate = async () => {
    console.log("ddd");
    try {
      const response = await fetch("http://localhost:7000/user/get", {
        method: "GET",
        credentials: "include", // Incluindo cookies na requisição
      });

      if (response.ok) {
        const user = await response.json();
        console.log(user);
        setAuth((prev) => ({
          admin: prev?.admin ?? null,
          user: user?.id
            ? { id: user.id, name: user.name, cpf: user.cpf }
            : null,
        }));
      } else {
        setAuth((prev) => ({ admin: prev?.admin ?? null, user: null }));
      }
    } catch (error) {
      console.error("Erro ao verificar token:", error);
      setAuth((prev) => ({ admin: prev?.admin ?? null, user: null }));
    }
  };

  const authAdminUpdate = async () => {
    try {
      const response = await fetch("http://localhost:7000/admin/get", {
        method: "GET",
        credentials: "include", // Incluindo cookies na requisição
      });

      if (response.ok) {
        const admin = await response.json();
        console.log(admin);
        setAuth((prev) => ({
          user: prev.user ?? null,
          admin: admin?.id ? { id: admin.id, name: admin.name } : null,
        }));
      } else {
        setAuth((prev) => ({ admin: null, user: prev.user ?? null }));
      }
    } catch (error) {
      console.error("Erro ao verificar token:", error);
      setAuth((prev) => ({ admin: null, user: prev.user ?? null }));
    }
  };

  useEffect(() => {
    authUserUpdate();
    authAdminUpdate();
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, authUserUpdate, authAdminUpdate }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
export { type AuthUser, type AuthAdmin, type Auth, type SetAuth };
