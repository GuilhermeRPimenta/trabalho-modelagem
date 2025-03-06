import { useParams } from "react-router-dom";
import Button from "../../../components/global/Button";
import AddCollaboratorModal from "./AddCollaboratorModal";
import { useCallback, useEffect, useState } from "react";
import apiBaseUrl from "../../../apiBaseUrl";
import LoadingIcon from "../../../components/global/LoadingIcon";
import RemoveCollaboratorModal from "./RemoveCollaboratorModal";

const ShelterAdministration = () => {
  const [pageState, setPageState] = useState<"LOADING" | "SUCCESS" | "ERROR">(
    "LOADING"
  );
  const [institution, setInstitution] = useState<{
    id: number;
    name: string;
    userInstitution: {
      role: string;
      addedAt: Date;
      user: {
        id: number;
        name: string;
        cpf: string;
      };
    }[];
  } | null>(null);
  const { institutionId } = useParams<{ institutionId: string }>();
  const [userToRemove, setUserToRemove] = useState({ id: -1, name: "" });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

  const fetchInstitution = useCallback(async () => {
    try {
      setPageState("LOADING");
      const response = await fetch(
        `${apiBaseUrl}/institution/fetchForInstitutionAdmin/${institutionId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        console.log(response);
        setPageState("ERROR");
        return;
      }
      const institution = await response.json();
      console.log(institution);
      setInstitution(institution);
      setPageState("SUCCESS");
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  }, [institutionId]);

  const handleCollaboratorUpdate = () => {
    void fetchInstitution();
  };

  useEffect(() => {
    void fetchInstitution();
  }, [fetchInstitution]);
  console.log(institution?.userInstitution);
  if (pageState === "SUCCESS" && institution)
    return (
      <div className="flex flex-col w-full items-center gap-2 ">
        <h1 className="text-blue-700 font-dynapuff text-3xl">
          Área administrativa
        </h1>
        <h2 className="text-blue-700 font-dynapuff text-3xl">
          {institution?.name}
        </h2>
        <Button variant="constructive" onClick={() => setModalIsOpen(true)}>
          Adicionar colaborador
        </Button>
        <ul
          className="w-fit flex flex-col gap-1 p-2"
          style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.45)" }}
        >
          {institution?.userInstitution
            .filter((user) => user.role === "COLLABORATOR")
            .map((user, index) => {
              return (
                <li key={index} className="bg-blue-100 flex justify-center p-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">{user.user.name}</h3>
                    <p>CPF: {user.user.cpf}</p>
                    <p>
                      Adicionado em:{" "}
                      {new Date(user.addedAt).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </p>
                    <div className="flex justify-center">
                      <Button
                        onClick={() => {
                          setUserToRemove({
                            id: user.user.id,
                            name: user.user.name,
                          });
                          setModalDeleteIsOpen(true);
                        }}
                        variant="desctructive"
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
        <AddCollaboratorModal
          institutionId={institution.id}
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          handleCollaboratorUpdate={handleCollaboratorUpdate}
        />
        <RemoveCollaboratorModal
          isOpen={modalDeleteIsOpen}
          setIsOpen={setModalDeleteIsOpen}
          institutionId={institution.id}
          userId={userToRemove.id}
          userName={userToRemove.name}
          handleCollaboratorUpdate={handleCollaboratorUpdate}
        />
      </div>
    );
  else if (pageState === "LOADING")
    return <LoadingIcon className="h-32 w-32" />;
  else if (pageState === "ERROR")
    return <h1 className="text-red-500 text-xl font-semibold">Erro!</h1>;
};

export default ShelterAdministration;
