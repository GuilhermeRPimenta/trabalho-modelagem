import { useParams } from "react-router-dom";
import { useAuth } from "../../../components/global/useAuth";
import { animals, shelters } from "../../../assets/exampleData";
import AnimalCardList from "../../../components/global/AnimalCardList";

const ShelterAnimalsInDonation = () => {
  const authContext = useAuth();
  const { shelterId } = useParams<{ shelterId: string }>();
  const adoptedAnimals = animals.filter(
    (animal) =>
      !animal.adopter &&
      animal.donator?.id === Number(shelterId) &&
      animal.donatorType === "SHELTER"
  );
  if (!authContext?.auth)
    return <h1 className="text-red-700 text-3xl">Acesso negado!</h1>;
  const shelter = shelters.find((shelter) => shelter.id === Number(shelterId));
  if (
    !shelter ||
    !shelter.users.find((user) => user.user.id === authContext.auth?.id)
  )
    return <h1 className="text-red-700 text-3xl">Acesso negado!</h1>;

  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-center text-3xl font-dynapuff">
        {shelter.name}
      </h1>
      <h2 className="text-blue-700 text-center text-3xl font-dynapuff">
        Animais em adoção
      </h2>
      <AnimalCardList animals={adoptedAnimals} showRequestsInfo />
    </div>
  );
};

export default ShelterAnimalsInDonation;
