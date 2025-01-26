import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Button from "../global/Button";
import { VscError } from "react-icons/vsc";
import LoadingIcon from "../global/LoadingIcon";
import { FaRegCheckCircle } from "react-icons/fa";
import { useAuth } from "../global/useAuth";
import { NavLink } from "react-router-dom";
import { users } from "../../assets/exampleData";

const UserInterestModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const authContext = useAuth();
  const [pageState, setPageState] = useState<
    "FORM" | "LOADING" | "ERROR" | "SUCCESS" | "LOGIN"
  >(authContext?.auth ? "FORM" : "LOGIN");
  const [person, setPerson] = useState("%USER");

  const resetModal = () => {
    setPageState("FORM");
  };

  useEffect(() => {
    setPageState(authContext?.auth ? "FORM" : "LOGIN");
  }, [authContext?.auth]);

  const handlePersonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerson(e.target.value);
  };

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
                    authContext?.setAuth(users[0]);
                  }}
                >
                  Entrar
                </Button>
              </div>
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
              <form className="flex px-1 overflow-auto items-center flex-col gap-1">
                {authContext &&
                  authContext.auth &&
                  authContext.auth.shelters.length > 0 && (
                    <div className="flex flex-col gap-1">
                      <label htmlFor="person">Pedir como:</label>
                      <select
                        id="person"
                        name="person"
                        className="p-2 text-lg bg-white outline outline-blue-500 outline-1 rounded-lg"
                        onChange={handlePersonChange}
                      >
                        <option value="%USER">{authContext.auth.name}</option>
                        {authContext.auth.shelters.map((shelter) => {
                          return (
                            <option value={`${shelter.id}`}>
                              {shelter.name}
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
                  name="justification"
                  id="justification"
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
                <p className="font-bold text-2xl">Foto de perfil atualizada!</p>
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
          </>
        )}
      </div>
    </div>
  );
};

export default UserInterestModal;
