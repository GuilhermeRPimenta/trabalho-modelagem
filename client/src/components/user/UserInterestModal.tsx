import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IoIosClose } from "react-icons/io";
import Button from "../global/Button";
import { VscError } from "react-icons/vsc";
import LoadingIcon from "../global/LoadingIcon";
import { FaRegCheckCircle } from "react-icons/fa";
import { useAuth } from "../global/useAuth";
import { NavLink } from "react-router-dom";
import apiBaseUrl from "../../apiBaseUrl";

const UserInterestModal = ({
  isOpen,
  animalId,
  setIsOpen,
}: {
  isOpen: boolean;
  animalId: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loginFormData, setLoginFormData] = useState({ cpf: "", password: "" });
  const authContext = useAuth();
  const [pageState, setPageState] = useState<
    | "FORM"
    | "LOADING"
    | "ERROR"
    | "SUCCESS"
    | "LOGIN"
    | "UNIQUE_CONSTRAINT_FAIL"
  >(authContext?.auth.user ? "FORM" : "LOGIN");
  const [institutions, setInstitutions] = useState<
    { id: number; name: string }[]
  >([]);
  const [person, setPerson] = useState("%USER");

  const resetModal = () => {
    setPageState(authContext?.auth.user ? "FORM" : "LOGIN");
  };

  useEffect(() => {
    setPageState(authContext?.auth.user ? "FORM" : "LOGIN");
  }, [authContext?.auth.user]);

  const handlePersonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerson(e.target.value);
  };

  const fetchUserInstitutions = useCallback(async () => {
    if (authContext.auth.user) {
      try {
        setPageState("LOADING");
        const response = await fetch(`${apiBaseUrl}/user/fetchInstitutions`, {
          method: "GET",
          credentials: "include",
        });
        const institutions = await response.json();
        setInstitutions(institutions);
        setPageState("FORM");
      } catch (e) {
        console.log(e);
        setPageState("ERROR");
      }
    }
  }, [authContext.auth.user]);

  const handleFormPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData: { [key: string]: string } = {};

    for (let i = 0; i < form.elements.length; i++) {
      const field = form.elements[i] as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement;
      if (field.name) {
        formData[field.name] = field.value;
      }
    }

    console.log(formData);

    try {
      setPageState("LOADING");
      const response = await fetch(
        `${apiBaseUrl}/animal/createAdoptionRequest`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setPageState("SUCCESS");
      } else {
        if (response.status === 409) {
          setPageState("UNIQUE_CONSTRAINT_FAIL");
        } else {
          setPageState("ERROR");
        }
      }
    } catch (e) {
      setPageState("ERROR");
      console.log(e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setPageState("LOADING");
      const response = await fetch(`${apiBaseUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginFormData),
      });
      if (response.ok) {
        setPageState("FORM");
        authContext?.authUserUpdate();
      } else {
        setPageState("ERROR");
      }
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  };

  useEffect(() => {
    void fetchUserInstitutions();
  }, [fetchUserInstitutions]);
  return (
    <div
      className={`bg-black/70 fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center ${
        !isOpen && "hidden"
      }`}
    >
      <div className=" flex flex-col bg-white gap-4 rounded-lg max-h-[90vh] p-5">
        <div className="flex items-center  w-full">
          <h1 className="font-dynapuff  text-blue-700 text-xl">
            Sinalizar interesse
          </h1>
          {pageState !== "SUCCESS" && (
            <Button
              onClick={() => setIsOpen(false)}
              className="ml-auto h-12 w-12 p-0"
              variant="ghost"
            >
              <IoIosClose className="h-32 w-32" />
            </Button>
          )}
        </div>

        {pageState === "LOGIN" ? (
          <div className="flex flex-col w-full overflow-auto  justify-center items-center gap-2">
            <h1 className="text-blue-700 text-3xl font-dynapuff">Login</h1>
            <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
              <form
                className="flex flex-col gap-2 items-center"
                onSubmit={handleLogin}
              >
                <label htmlFor="cpf">CPF</label>
                <input
                  type="numeric"
                  id="cpf"
                  name="cpf"
                  value={loginFormData.cpf}
                  style={{ MozAppearance: "textfield" }}
                  onChange={(e) => {
                    setLoginFormData((prev) => ({
                      ...prev,
                      cpf: e.target.value,
                    }));
                  }}
                />
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginFormData.password}
                  onChange={(e) => {
                    setLoginFormData((prev) => ({
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
          </div>
        ) : (
          <>
            {pageState === "FORM" && (
              <form
                onSubmit={handleFormPost}
                className="flex px-1 overflow-auto items-center flex-col gap-1"
              >
                Trocar div acima por form
                {institutions.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <input
                      type="hidden"
                      name="animalId"
                      id="animalId"
                      value={animalId}
                    />
                    <label htmlFor="person">Pedir como:</label>
                    <select
                      id="person"
                      name="person"
                      className="p-2 text-lg bg-white outline outline-blue-500 outline-1 rounded-lg"
                      onChange={handlePersonChange}
                    >
                      <option value="%USER">
                        {authContext.auth.user?.name}
                      </option>
                      {institutions.map((institution) => {
                        return (
                          <option value={`${institution.id}`}>
                            {institution.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
                <label htmlFor="justification">
                  Texto a enviar ao doador (opcional)
                </label>
                <textarea
                  className="w-full outline outline-1 outline-blue-700"
                  name="notes"
                  id="notes"
                  rows={3}
                ></textarea>
                <p className="font-semibold">Atenção:</p>
                {person === "%USER" ? (
                  <p>
                    Será compartilhado com o doador <strong>seus</strong>{" "}
                    seguintes dados: Número de telefone, e-mail, bairro, cidade
                    e estado.
                  </p>
                ) : (
                  <p>
                    Será compartilhado com o doador os seguintes dados{" "}
                    <strong>da instituição</strong>: Número de telefone, e-mail,
                    bairro, cidade e estado.
                  </p>
                )}
                <Button variant="constructive" className="mt-3">
                  Enviar
                </Button>
              </form>
            )}
            {pageState === "LOADING" && (
              <LoadingIcon className="text-7xl w-full" />
            )}
            {pageState === "SUCCESS" && (
              <div className="flex flex-col overflow-auto">
                <FaRegCheckCircle className="text-7xl w-full text-green-300 mb-5" />
                <p className="font-bold text-2xl">Pedido realizado!</p>
                <Button className="mt-2" onClick={resetModal}>
                  Fechar
                </Button>
              </div>
            )}
            {pageState === "ERROR" && (
              <div className="flex flex-col text-center overflow-auto">
                <VscError className="text-7xl w-full text-red-500 mb-5" />
                Algo deu errado!
                <div className="flex justify-center">
                  <Button className="mt-5" onClick={resetModal}>
                    Voltar
                  </Button>
                </div>
              </div>
            )}
            {pageState === "UNIQUE_CONSTRAINT_FAIL" && (
              <div className="flex flex-col text-center overflow-auto">
                <VscError className="text-7xl w-full text-red-500 mb-5" />
                Este animal já foi solicitado para este usuário ou instituição!
                <div className="flex justify-center">
                  <Button className="mt-5" onClick={resetModal}>
                    Voltar
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserInterestModal;
