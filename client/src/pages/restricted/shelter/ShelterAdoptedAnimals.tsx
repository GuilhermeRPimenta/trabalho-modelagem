import { useParams } from "react-router-dom";
import { useAuth } from "../../../components/global/useAuth";
import { animals, shelters } from "../../../assets/exampleData";
import AnimalCardList from "../../../components/global/AnimalCardList";

const ShelterAdoptedAnimals = () => {
  const authContext = useAuth();
  const { shelterId } = useParams<{ shelterId: string }>();
  const adoptedAnimals = animals.filter(
    (animal) =>
      animal.adopter?.id === Number(shelterId) &&
      animal.adopterType === "SHELTER"
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

  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-center text-3xl font-dynapuff">
        {shelter.name}
      </h1>
      <h2 className="text-blue-700 text-center text-3xl font-dynapuff">
        Animais adotados
      </h2>
      <AnimalCardList animals={adoptedAnimals} />
    </div>
  );
};

export default ShelterAdoptedAnimals;
