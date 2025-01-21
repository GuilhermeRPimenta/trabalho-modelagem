import { useParams } from "react-router-dom";
import { useAuth } from "../../../components/global/useAuth";
import { animals, shelters } from "../../../assets/exampleData";
import AnimalInfo from "../../../components/global/AnimalInfo";
import Button from "../../../components/global/Button";
import NavLink from "../../../components/global/NavLink";

const ShelterAnimalInDonation = () => {
  const authContext = useAuth();
  const { shelterId } = useParams<{ shelterId: string }>();
  const { animalInDonationId } = useParams<{ animalInDonationId: string }>();
  const animal = animals.find(
    (animal) => animal.id === Number(animalInDonationId)
  );

  if (!authContext?.auth)
    return <h1 className="text-red-700 text-3xl">Acesso negado!</h1>;
  const shelter = shelters.find((shelter) => shelter.id === Number(shelterId));
  if (
    !shelter ||
    !shelter.users.find((user) => user.id === authContext.auth?.id)
  )
    return (
      <h1 className="font-dynapuff text-3xl text-blue-500">
        Abrigo não encontrado
      </h1>
    );
  if (!animal)
    return (
      <h1 className="font-dynapuff text-3xl text-blue-500">
        Animal não encontrado
      </h1>
    );

  return (
    <div className="flex flex-col w-full items-center gap-2">
      <h1 className="text-blue-700 text-center text-3xl font-dynapuff">
        {shelter.name}
      </h1>
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

export default ShelterAnimalInDonation;
