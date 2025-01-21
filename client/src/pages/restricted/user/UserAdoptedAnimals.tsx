import { animals } from "../../../assets/exampleData";
import { useAuth } from "../../../components/global/useAuth";
import AnimalCardList from "../../../components/global/AnimalCardList";

const UserAdoptedAnimals = () => {
  const authContext = useAuth();
  const adoptedAnimals = animals.filter(
    (animal) =>
      animal.adopter?.id === authContext?.auth?.id &&
      animal.adopterType === "USER"
  );

  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-center text-3xl font-dynapuff">
        Animais adotados
      </h1>
      <AnimalCardList animals={adoptedAnimals} />
    </div>
  );
};

export default UserAdoptedAnimals;
