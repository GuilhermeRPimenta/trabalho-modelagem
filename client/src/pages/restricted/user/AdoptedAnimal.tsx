import { useParams } from "react-router-dom";
import { animals } from "../../../assets/exampleData";
import AnimalInfo from "../../../components/global/AnimalInfo";

const AdoptedAnimal = () => {
  const { adoptedAnimalId } = useParams<{ adoptedAnimalId: string }>();
  const animal = animals.find(
    (animal) => animal.id === Number(adoptedAnimalId)
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
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Doador:</h2>
          {animal.donator.name}
          <h3 className="font-semibold">Endereço</h3>
          {`${animal.donator.address}, ${animal.donator.number}, ${animal.donator.neighborhood}, ${animal.donator.city} - ${animal.donator.state}`}
          <h3 className="font-semibold">Contato</h3>
          <p>Telefone: {`${animal.donator.phone}`}</p>
          <span>E-mail: {`${animal.donator.email}`}</span>
        </div>
      </AnimalInfo>
    </div>
  );
};

export default AdoptedAnimal;
