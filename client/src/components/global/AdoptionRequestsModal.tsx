import { Dispatch, SetStateAction, useState } from "react";
import { IoIosClose } from "react-icons/io";

import { VscError } from "react-icons/vsc";

import { FaRegCheckCircle } from "react-icons/fa";
import Button from "./Button";
import LoadingIcon from "./LoadingIcon";
import { AnimalType, RequestType } from "../../types/animal";
import { personTranslationMap } from "../../translations/PersonTranslation";
import apiBaseUrl from "../../apiBaseUrl";
import { useNavigate } from "react-router-dom";

const AdoptionRequestsModal = ({
  isOpen,
  setIsOpen,
  animal,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  animal: any;
}) => {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState<
    "FORM" | "LOADING" | "ERROR" | "SUCCESS"
  >("FORM");

  const resetModal = () => {
    setPageState("FORM");
  };

  const handleDonationConfirm = async (personType: string, personId) => {
    try {
      const body = {
        animalId: animal.id,
        userId: personType === "USER" ? personId : null,
        institutionId: personType === "INSTITUTION" ? personId : null,
      };
      const response = await fetch(`${apiBaseUrl}/animal/confirmDonation`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        setPageState("ERROR");
        return;
      }
      setPageState("SUCCESS");
      setTimeout(() => {
        navigate("/user");
      }, 1000);
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
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
            {animal.adoptionRequests.length === 0 && (
              <p>Nenhuma solicitação!</p>
            )}
            {animal.adoptionRequests.map((req, index) => {
              if (req.user) {
                return (
                  <div
                    key={index}
                    className="flex flex-col bg-blue-100 rounded-md p-2"
                  >
                    <p className="font-semibold">{req.user.name}</p>
                    <p>Pessoa física</p>
                    <p>{req.user.email}</p>
                    <p>{req.user.phone}</p>
                    <p>
                      {req.user.neighborhood} - {req.user.city} -{" "}
                      {req.user.state}
                    </p>
                    <p className="py-3">{req.notes}</p>
                    <div className="flex justify-center">
                      <Button
                        onClick={() => {
                          handleDonationConfirm("USER", req.user.id);
                        }}
                        variant="constructive"
                      >
                        Confirmar doação
                      </Button>
                    </div>
                  </div>
                );
              } else if (req.institution) {
                <div className="flex flex-col bg-blue-100 rounded-md p-2">
                  <p className="font-semibold">{req.user.name}</p>
                  <p>Instituição</p>
                  <p>{req.user.email}</p>
                  <p>{req.user.phone}</p>
                  <p>
                    {req.user.neighborhood} - {req.user.city} - {req.user.state}
                  </p>
                  <p className="py-3">{req.notes}</p>
                  <div className="flex justify-center">
                    <Button
                      onClick={() => {
                        handleDonationConfirm("INSTITUTION", req.user.id);
                      }}
                      variant="constructive"
                    >
                      Confirmar doação
                    </Button>
                  </div>
                </div>;
              }
            })}
          </div>
        )}
        {pageState === "LOADING" && <LoadingIcon className="text-7xl w-full" />}
        {pageState === "SUCCESS" && (
          <div className="flex flex-col justify-center">
            <FaRegCheckCircle className="text-7xl w-full text-green-300 mb-5" />
            <p className="font-bold text-2xl">Doação confirmada!</p>
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
