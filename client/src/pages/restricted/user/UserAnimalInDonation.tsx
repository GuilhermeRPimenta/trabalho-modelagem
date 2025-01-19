import { useParams } from "react-router-dom";
import { animals } from "../../../assets/exampleData";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import NavLink from "../../../components/global/NavLink";
import Button from "../../../components/global/Button";

const calculateAge = (birthDate: Date) => {
  const currentDate = new Date();
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  return `${years} anos e ${months} meses`;
};

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
      <div className="bg-blue-100 flex flex-col gap-2 items-center text-center p-4 rounded-sm w-full">
        <h1 className="font-semibold text-xl">{animal?.name}</h1>
        <img className="w-64 aspect-square rounded-md" src={animal?.imgUrl} />
        <p>{animal.species ? animal.species : animal.customSpecies}</p>
        <div className="flex flex-row">
          {animal?.gender === "MACHO" ? (
            <>
              <BsGenderMale size={24} />
              <p>Macho</p>
            </>
          ) : (
            <>
              <BsGenderFemale size={24} />
              <p>Fêmea</p>
            </>
          )}
        </div>
        <p>{animal?.description}</p>
        {animal.breed && (
          <>
            <h2 className="font-semibold">Raça: </h2>
            <p>{animal.breed}</p>
          </>
        )}
        {animal.birthDate && (
          <>
            <h2 className="font-semibold">Nascimento: </h2>
            <p>
              {animal.birthDate?.toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </p>
          </>
        )}
        {(animal.birthDate || animal.age) && (
          <>
            <h2 className="font-semibold">Idade: </h2>
            <p>
              {animal?.birthDate
                ? calculateAge(animal.birthDate)
                : animal?.age + " anos (no momento de registro)"}
            </p>
          </>
        )}
        {animal.healthCondition && (
          <>
            <h2 className="font-semibold">Condição de saúde: </h2>
            <p>{animal.healthCondition}</p>
          </>
        )}
        {animal.weight && (
          <>
            <h2 className="font-semibold">Peso: </h2>
            <p>{animal.weight} kg</p>
          </>
        )}
        <div className="flex flex-wrap gap-1">
          <NavLink to="edit">Editar</NavLink>
          <Button variant="desctructive">Excluir</Button>
        </div>
      </div>
    </div>
  );
};

export default UserAnimalInDonation;
