import { Dispatch, SetStateAction, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { VscError } from "react-icons/vsc";
import { FaRegCheckCircle } from "react-icons/fa";
import Button from "../../../components/global/Button";
import LoadingIcon from "../../../components/global/LoadingIcon";

const AddCollaboratorModal = ({
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
      <div className=" flex flex-col bg-white gap-4 max-h-[90vh] rounded-lg p-5">
        <div className="flex items-center  w-full">
          <h1 className="font-dynapuff  text-blue-700 text-xl">
            Adicionar colaborador
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
          <form className="flex overflow-auto items-center flex-col gap-1">
            <label htmlFor="justification">CPF do colaborador</label>
            <input
              className="w-full outline outline-1 outline-blue-700"
              name="cpf"
              id="cpf"
            ></input>
            <p>
              {" "}
              <strong>Atenção: </strong>
              Certifique-se que o colaborador já está cadastrado no sistema
            </p>
            <Button variant="constructive" className="mt-3">
              Adicionar
            </Button>
          </form>
        )}
        {pageState === "LOADING" && <LoadingIcon className="text-7xl w-full" />}
        {pageState === "SUCCESS" && (
          <div className="flex flex-col overflow-auto">
            <FaRegCheckCircle className="text-7xl w-full text-green-300 mb-5" />
            <p className="font-bold text-2xl">Colaborador adicionado!</p>
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
      </div>
    </div>
  );
};

export default AddCollaboratorModal;
