import { useParams } from "react-router-dom";
import { animals } from "../../../assets/exampleData";
import NavLink from "../../../components/global/NavLink";
import Button from "../../../components/global/Button";
import AnimalInfo from "../../../components/global/AnimalInfo";

const UserAnimalInDonation = () => {
  const { animalInDonationId } = useParams<{ animalInDonationId: string }>();
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
          <NavLink to="requests">Solicitações</NavLink>
          <NavLink to="edit">Editar</NavLink>
          <Button variant="desctructive">Excluir</Button>
        </div>
      </AnimalInfo>
    </div>
  );
};

export default UserAnimalInDonation;
