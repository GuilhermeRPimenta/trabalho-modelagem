import { useParams } from "react-router-dom";
import { animals } from "../../../assets/exampleData";
import NavLink from "../../../components/global/NavLink";
import Button from "../../../components/global/Button";
import AnimalInfo from "../../../components/global/AnimalInfo";
import AdoptionRequestsModal from "./AdoptionRequestsModal";
import { useState } from "react";
import { LuMessageCircleWarning } from "react-icons/lu";

const UserAnimalInDonation = () => {
  const { animalInDonationId } = useParams<{ animalInDonationId: string }>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const animal = animals.find(
    (animal) => animal.id === Number(animalInDonationId)
  );
  if (!animal)
    return (
      <h1 className="font-dynapuff text-3xl text-blue-500">
        Animal não encontrado
      </h1>
    );
  return (
    <div className="flex flex-col w-full items-center gap-2">
      <AnimalInfo animal={animal}>
        <div className="flex flex-wrap justify-center gap-1">
          <Button onClick={() => setModalIsOpen(true)}>
            Solicitações
            {(animal.userRequests.length > 0 ||
              animal.shelterRequests.length > 0) && (
              <LuMessageCircleWarning className="text-yellow-400" />
            )}
          </Button>
          <NavLink to="edit">Editar</NavLink>
          <Button variant="desctructive">Excluir</Button>
        </div>
      </AnimalInfo>
      <AdoptionRequestsModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        animal={animal}
      />
    </div>
  );
};

export default UserAnimalInDonation;
