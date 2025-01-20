import { animals } from "../../assets/exampleData";
import AnimalCardList from "../../components/global/AnimalCardList";

const Animals = () => {
  const unadoptedAnimals = animals.filter((animal) => !animal.adopter);

  return (
    <div className="flex flex-col w-full items-center gap-2 ">
      <h1 className="text-blue-700 font-dynapuff text-3xl">Animais</h1>
      <AnimalCardList animals={unadoptedAnimals} showDonatorAddress />
    </div>
  );
};

export default Animals;
