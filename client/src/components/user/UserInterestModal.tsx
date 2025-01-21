import { Dispatch, SetStateAction, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Button from "../global/Button";
import { VscError } from "react-icons/vsc";
import LoadingIcon from "../global/LoadingIcon";
import { FaRegCheckCircle } from "react-icons/fa";

const UserInterestModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [pageState, setPageState] = useState<
    "FORM" | "LOADING" | "ERROR" | "SUCCESS"
  >("FORM");

  const resetModal = () => {
    setPageState("FORM");
  };

  return (
    <div
      className={`bg-black/70 fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center ${
        !isOpen && "hidden"
      }`}
    >
      <div className=" flex flex-col bg-white gap-4 rounded-lg p-5">
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

        {pageState === "FORM" && (
          <form className="flex justify-center items-center flex-col gap-1">
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
            <p>
              Será compartilhado com o doador seus seguintes dados: Número de
              telefone, e-mail, bairro, cidade e estado.
            </p>
            <Button variant="constructive" className="mt-3">
              Enviar
            </Button>
          </form>
        )}
        {pageState === "LOADING" && <LoadingIcon className="text-7xl w-full" />}
        {pageState === "SUCCESS" && (
          <div className="flex flex-col justify-center">
            <FaRegCheckCircle className="text-7xl w-full text-green-300 mb-5" />
            <p className="font-bold text-2xl">Foto de perfil atualizada!</p>
            <Button className="mt-2" onClick={resetModal}>
              Fechar
            </Button>
          </div>
        )}
        {pageState === "ERROR" && (
          <div className="flex flex-col text-center justify-center">
            <VscError className="text-7xl w-full text-red-500 mb-5" />
            Algo deu errado!
            <div className="flex justify-center">
              <Button className="mt-5" onClick={resetModal}>
                Voltar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInterestModal;
