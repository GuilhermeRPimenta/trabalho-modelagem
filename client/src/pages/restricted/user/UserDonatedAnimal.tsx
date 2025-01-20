import { useParams } from "react-router-dom";
import { animals } from "../../../assets/exampleData";
import AnimalInfo from "../../../components/global/AnimalInfo";

const UserDonatedAnimal = () => {
  const { donatedAnimalId } = useParams<{ donatedAnimalId: string }>();
  const animal = animals.find(
    (animal) => animal.id === Number(donatedAnimalId)
  );

  if (!animal || !animal.adopter)
    return (
      <h1 className="font-dynapuff text-3xl text-blue-500">
        Animal não encontrado
      </h1>
    );
  return (
    <div className="flex flex-col w-full items-center gap-2">
      <AnimalInfo animal={animal}>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Adotante:</h2>
          {animal.adopter.name}
          <h3 className="font-semibold">Endereço</h3>
          {`${animal.adopter.neighborhood}, ${animal.adopter.city} - ${animal.adopter.state}`}
        </div>
      </AnimalInfo>
    </div>
  );
};

export default UserDonatedAnimal;
