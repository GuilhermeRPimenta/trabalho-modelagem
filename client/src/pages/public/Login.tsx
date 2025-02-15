import { useEffect, useState } from "react";
import Button from "../../components/global/Button";
import { useAuth } from "../../components/global/useAuth";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import apiBaseUrl from "../../apiBaseUrl";
import LoadingIcon from "../../components/global/LoadingIcon";
import { FaCheckCircle } from "react-icons/fa";

const Login = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ cpf: "", password: "" });
  const [pageState, setPageState] = useState<
    "FORM" | "LOADING" | "SUCCESS" | "ERROR"
  >("FORM");

  const handleFormPost = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setPageState("LOADING");
      const response = await fetch(`${apiBaseUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setPageState("SUCCESS");
        authContext?.authUpdate();
      } else {
        setPageState("ERROR");
      }
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  };

  useEffect(() => {
    if (authContext?.auth) navigate("/user");
  }, [authContext?.auth, navigate]);
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">Login</h1>
      {pageState === "FORM" && (
        <>
          <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
            <form
              className="flex flex-col gap-2 items-center"
              onSubmit={handleFormPost}
            >
              <label htmlFor="cpf">CPF</label>
              <input
                type="numeric"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                style={{ MozAppearance: "textfield" }}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, cpf: e.target.value }));
                }}
              />
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
              <Button variant="primary">Entrar</Button>
            </form>
          </div>
          <div className="flex sm:flex-row flex-col items-center">
            <p>Não possui uma conta?</p>
            <NavLink
              to="/register"
              className="bg-transparent text-blue-700 flex items-center justify-center p-2 rounded-md font-semibold hover:bg-gray-200"
            >
              Cadastre-se
            </NavLink>
          </div>
        </>
      )}
      {pageState === "LOADING" && <LoadingIcon className="w-32 h-32" />}
      {pageState === "ERROR" && (
        <div className="flex flex-col gap-3 items-center">
          <h4 className="text-red-500 text-xl">Credenciais incorretas!</h4>
          <Button
            onClick={() => {
              setPageState("FORM");
            }}
          >
            Tentar novamente
          </Button>
        </div>
      )}
      {pageState === "SUCCESS" && (
        <div className="flex flex-col gap-3 items-center">
          <h4 className="text-green-500 text-xl">Login realizado!</h4>
          <div className="text-green-500">
            <FaCheckCircle size={68} />
          </div>

          <NavLink to="/login">Login</NavLink>
        </div>
      )}
    </div>
  );
};

export default Login;
