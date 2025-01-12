import { useEffect } from "react";
import Button from "../../components/global/Button";
import { useAuth } from "../../components/global/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext?.auth) navigate("/user");
  }, [authContext?.auth, navigate]);
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <>
        <h1 className="text-blue-700 text-3xl font-dynapuff">Login</h1>
        <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
          <div className="flex flex-col gap-2 items-center">
            {/*Substituir div acima por form*/}
            <label htmlFor="cpf">CPF</label>
            <input
              type="numeric"
              id="cpf"
              style={{ MozAppearance: "textfield" }}
            />
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" />
            <Button
              variant="primary"
              onClick={() => {
                authContext?.setAuth({ id: 1, name: "Guilherme Pimenta" });
              }}
            >
              Entrar
            </Button>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col items-center">
          <p>Não possui uma conta?</p>
          <Button variant="ghost" className="text-blue-700">
            Cadastre-se
          </Button>
        </div>
      </>
    </div>
  );
};

export default Login;
