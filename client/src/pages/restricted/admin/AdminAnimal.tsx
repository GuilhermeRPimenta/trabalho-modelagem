import { useParams } from "react-router-dom";
import { animals } from "../../../assets/exampleData";
import AnimalInfo from "../../../components/global/AnimalInfo";
import { personTranslationMap } from "../../../translations/PersonTranslation";
import Button from "../../../components/global/Button";

const AdminAnimal = () => {
  const { animalId } = useParams<{ animalId: string }>();
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
          <p>Tipo: {personTranslationMap.get(animal.donatorType)}</p>
          {animal.donator.name}
          <p>{"Id: " + animal.donator.id}</p>

          <h3 className="font-semibold">Endereço</h3>
          {`${animal.donator.address}, ${animal.donator.number}, ${animal.donator.neighborhood}, ${animal.donator.city} - ${animal.donator.state}`}
          <h3 className="font-semibold">Contato</h3>
          <p>Telefone: {`${animal.donator.phone}`}</p>
          <span>E-mail: {`${animal.donator.email}`}</span>
          {animal.adopter && (
            <>
              <h2 className="text-xl font-semibold">Adotante:</h2>
              <p>
                Tipo:{" "}
                {animal.adopterType &&
                  personTranslationMap.get(animal.adopterType)}
              </p>
              {animal.adopter.name}
              <p>{"Id: " + animal.adopter.id}</p>
              <h3 className="font-semibold">Endereço</h3>
              {`${animal.adopter.neighborhood}, ${animal.adopter.city} - ${animal.adopter.state}`}
            </>
          )}
        </div>
        <div className="flex justify-center">
          <Button variant="desctructive">Excluir registro</Button>
        </div>
      </AnimalInfo>
    </div>
  );
};

export default AdminAnimal;
