import { useParams } from "react-router-dom";
import { animals } from "../../assets/exampleData";
import Button from "../../components/global/Button";
import AnimalInfo from "../../components/global/AnimalInfo";
import { useState } from "react";
import UserInterestModal from "../../components/user/UserInterestModal";
import { NavLink } from "react-router-dom";

const Animal = () => {
  const { animalId } = useParams<{ animalId: string }>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const animal = animals.find((animal) => animal.id === Number(animalId));
  if (!animal)
    return (
      <h1 className="font-dynapuff text-3xl text-blue-500">
        Animal não encontrado
      </h1>
    );

  return (
    <div className="flex flex-col w-full items-center gap-2">
      <AnimalInfo animal={animal}>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Doador:</h2>
          <NavLink
            to={
              animal.donatorType === "USER"
                ? `/users/${animal.donator.id}`
                : `/sheltersProfiles/${animal.donator.id}`
            }
            className={"underline text-blue-500"}
          >
            {animal.donator.name}
          </NavLink>

          <h3 className="font-semibold">Endereço</h3>
          {`${animal.donator.neighborhood}, ${animal.donator.city} - ${animal.donator.state}`}
        </div>

        <Button onClick={() => setModalIsOpen(true)}>Tenho interesse</Button>
      </AnimalInfo>
      <UserInterestModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
    </div>
  );
};

export default Animal;
