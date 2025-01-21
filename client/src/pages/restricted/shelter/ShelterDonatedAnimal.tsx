import { useParams } from "react-router-dom";
import { useAuth } from "../../../components/global/useAuth";
import { animals, shelters } from "../../../assets/exampleData";
import AnimalInfo from "../../../components/global/AnimalInfo";

const ShelterDonatedAnimal = () => {
  const authContext = useAuth();
  const { shelterId } = useParams<{ shelterId: string }>();
  const { donatedAnimalId } = useParams<{ donatedAnimalId: string }>();
  const animal = animals.find(
    (animal) => animal.id === Number(donatedAnimalId)
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
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Adotante:</h2>
          {animal.adopter?.name}
          <h3 className="font-semibold">Endereço</h3>
          {`${animal.adopter?.address}, ${animal.adopter?.number}, ${animal.adopter?.neighborhood}, ${animal.adopter?.city} - ${animal.adopter?.state}`}
          <h3 className="font-semibold">Contato</h3>
          <p>Telefone: {`${animal.adopter?.phone}`}</p>
          <span>E-mail: {`${animal.adopter?.email}`}</span>
        </div>
      </AnimalInfo>
    </div>
  );
};

export default ShelterDonatedAnimal;
