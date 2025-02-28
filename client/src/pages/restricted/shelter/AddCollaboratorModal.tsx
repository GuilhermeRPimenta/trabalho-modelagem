import { Dispatch, SetStateAction, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { VscError } from "react-icons/vsc";
import { FaRegCheckCircle } from "react-icons/fa";
import Button from "../../../components/global/Button";
import LoadingIcon from "../../../components/global/LoadingIcon";
import apiBaseUrl from "../../../apiBaseUrl";

const AddCollaboratorModal = ({
  isOpen,
  institutionId,
  setIsOpen,
  handleCollaboratorUpdate,
}: {
  isOpen: boolean;
  institutionId: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleCollaboratorUpdate: () => void;
}) => {
  const [pageState, setPageState] = useState<
    "FORM" | "LOADING" | "ERROR" | "SUCCESS"
  >("FORM");
  const [user, setUser] = useState<{ name: string } | null>(null);

  const handleFormPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData: { [key: string]: string } = {
      institutionId: institutionId.toString(),
    };

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
        `${apiBaseUrl}/institution/addCollaborator/${institutionId}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const user = await response.json();
      setUser(user);
      if (response.ok) {
        setPageState("SUCCESS");
      } else {
        setPageState("ERROR");
      }
    } catch (e) {
      setPageState("ERROR");
      console.log(e);
    }
  };

  const resetModal = () => {
    setPageState("FORM");
    handleCollaboratorUpdate();
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
              onClick={() => {
                setIsOpen(false);
              }}
              className="ml-auto h-12 w-12 p-0"
              variant="ghost"
            >
              <IoIosClose className="h-32 w-32" />
            </Button>
          )}
        </div>

        {pageState === "FORM" && (
          <form
            onSubmit={handleFormPost}
            className="flex overflow-auto items-center flex-col px-1 gap-1"
          >
            {/*Trocar div acima por form*/}
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
            <p>{user?.name}</p>
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
