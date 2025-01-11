import Button from "../../components/global/Button";
import { useState } from "react";
import UserHome from "../restricted/user/UserHome";

const Login = () => {
  const [auth, setAuth] = useState(false);
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      {!auth ? (
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
              <Button variant="primary" onClick={() => setAuth(true)}>
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
      ) : (
        <UserHome />
      )}
    </div>
  );
};

export default Login;
