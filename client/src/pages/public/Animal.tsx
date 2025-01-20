import { useParams } from "react-router-dom";
import { animals } from "../../assets/exampleData";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import Button from "../../components/global/Button";
import { useState } from "react";

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

const Animal = () => {
  const { animalId } = useParams<{ animalId: string }>();
  const animal = animals.find((animal) => animal.id === Number(animalId));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  if (!animal)
    return (
      <h1 className="font-dynapuff text-3xl text-blue-500">
        Animal não encontrado
      </h1>
    );

  return (
    <div className="flex flex-col w-full items-center gap-2">
      <div className=" h-full flex flex-col gap-2 items-center text-center p-4 rounded-sm w-full">
        <div className="flex flex-col w-full xl:flex-row gap-5">
          <div className="flex flex-col xl:basis-1/2 basis-auto gap-1">
            <div className="flex justify-center">
              <img
                className="w-full max-w-[30rem] aspect-square xl:w-[60vh] xl:h-[60vh] object-cover rounded-lg"
                src={animal?.imgUrls[currentImageIndex]}
                alt={`Imagem ${currentImageIndex + 1}`}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {animal.imgUrls.map((img, index) => {
                return (
                  <img
                    key={img}
                    src={img}
                    alt={`Miniatura ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                      currentImageIndex === index
                        ? "border-4 border-blue-500"
                        : "border"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  ></img>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col xl:basis-1/2 basis-auto justify-evenly gap-1 min-h-[60vh]">
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-xl">{animal?.name}</h1>
              <p>{animal.species ? animal.species : animal.customSpecies}</p>
              <div className="flex  justify-center flex-row">
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
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">Doador:</h2>
              {animal.donator.name}
              <h3 className="font-semibold">Endereço</h3>
              {`${animal.donator.address}, ${animal.donator.number}, ${animal.donator.neighborhood}, ${animal.donator.city} - ${animal.donator.state}`}
            </div>

            <Button>Tenho interesse</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animal;
