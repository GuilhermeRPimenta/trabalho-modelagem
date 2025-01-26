import { Dispatch, SetStateAction, useState } from "react";
import { IoIosClose } from "react-icons/io";

import { VscError } from "react-icons/vsc";

import { FaRegCheckCircle } from "react-icons/fa";
import Button from "./Button";
import LoadingIcon from "./LoadingIcon";
import { AnimalType, RequestType } from "../../types/animal";
import { personTranslationMap } from "../../translations/PersonTranslation";

const AdoptionRequestsModal = ({
  isOpen,
  setIsOpen,
  animal,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  animal: AnimalType;
}) => {
  const [pageState, setPageState] = useState<
    "FORM" | "LOADING" | "ERROR" | "SUCCESS"
  >("FORM");

  const resetModal = () => {
    setPageState("FORM");
  };

  const shelterRequests = animal.shelterRequests.reduce((acc, req) => {
    acc.push({
      personType: "SHELTER",
      name: req.shelter.name,
      phone: req.shelter.phone,
      email: req.shelter.email,
      neighborhood: req.shelter.neighborhood,
      city: req.shelter.city,
      state: req.shelter.state,
      createdAt: req.createdAt,
      justification: req.justification,
    });

    return acc;
  }, [] as RequestType[]);
  const userRequests = animal.userRequests.reduce((acc, req) => {
    acc.push({
      personType: "USER",
      name: req.user.name,
      phone: req.user.phone,
      email: req.user.email,
      neighborhood: req.user.neighborhood,
      city: req.user.city,
      state: req.user.state,
      createdAt: req.createdAt,
      justification: req.justification,
    });

    return acc;
  }, [] as RequestType[]);

  const totalRequests = shelterRequests
    .concat(userRequests)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  return (
    <div
      className={`bg-black/70 fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center ${
        !isOpen && "hidden"
      }`}
    >
      <div className=" flex flex-col bg-white gap-4 max-h-[90vh] rounded-lg p-5">
        <div className="flex items-center  w-full">
          <h1 className="font-dynapuff  text-blue-700 text-xl">
            Solicitações de adoção
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
          <div className="flex   flex-col overflow-auto gap-3">
            {totalRequests.length === 0 && <p>Nenhuma solicitação!</p>}
            {totalRequests.map((req) => {
              return (
                <div className="flex flex-col bg-blue-100 rounded-md p-2">
                  <p className="font-semibold">{req.name}</p>
                  <p>{personTranslationMap.get(req.personType)}</p>
                  <p>{req.email}</p>
                  <p>{req.phone}</p>
                  <p>
                    {req.createdAt.toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </p>
                  <p>
                    {req.neighborhood} - {req.city} - {req.state}
                  </p>
                  <p className="py-3">{req.justification}</p>
                  <div className="flex justify-center">
                    <Button variant="constructive">Confirmar doação</Button>
                  </div>
                </div>
              );
            })}
          </div>
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

export default AdoptionRequestsModal;
