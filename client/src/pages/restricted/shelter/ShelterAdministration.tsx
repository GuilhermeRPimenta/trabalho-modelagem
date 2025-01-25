import { useParams } from "react-router-dom";
import { shelters } from "../../../assets/exampleData";
import Button from "../../../components/global/Button";
import AddCollaboratorModal from "./AddCollaboratorModal";
import { useState } from "react";

const ShelterAdministration = () => {
  const { shelterId } = useParams<{ shelterId: string }>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const shelter = shelters.find((shelter) => shelter.id === Number(shelterId));
  if (!shelter) {
    return (
      <div className="flex flex-col w-full  justify-center items-center gap-2">
        <h1 className="text-blue-700 text-3xl font-dynapuff">
          Administrar abrigos
        </h1>
        <h2>Abrigo não encontrado!</h2>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full items-center gap-2 ">
      <h1 className="text-blue-700 font-dynapuff text-3xl">
        Área administrativa
      </h1>
      <h2 className="text-blue-700 font-dynapuff text-3xl">{shelter.name}</h2>
      <Button variant="constructive" onClick={() => setModalIsOpen(true)}>
        Adicionar colaborador
      </Button>
      <ul
        className="w-fit flex flex-col gap-1 p-2"
        style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.45)" }}
      >
        {shelter.users
          .filter((user) => user.role === "COLLABORATOR")
          .map((user, index) => {
            return (
              <li key={index} className="bg-blue-100 flex justify-center p-2">
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">{user.user.name}</h3>
                  <p>CPF: {user.user.cpf}</p>
                  <p>
                    Adicionado em:{" "}
                    {user.addedAt.toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </p>
                  <div className="flex justify-center">
                    <Button variant="desctructive">Remover</Button>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      <AddCollaboratorModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
    </div>
  );
};

export default ShelterAdministration;
