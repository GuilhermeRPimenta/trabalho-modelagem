import { useParams } from "react-router-dom";
import Button from "../../components/global/Button";
import AnimalInfo from "../../components/global/AnimalInfo";
import { useCallback, useEffect, useState } from "react";
import UserInterestModal from "../../components/user/UserInterestModal";
import { NavLink } from "react-router-dom";
import apiBaseUrl from "../../apiBaseUrl";
import LoadingIcon from "../../components/global/LoadingIcon";

const Animal = () => {
  const { animalId } = useParams<{ animalId: string }>();
  const [pageState, setPageState] = useState<"LOADING" | "SUCCESS" | "ERROR">(
    "LOADING"
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [animal, setAnimal] = useState<{
    id: number;
    name: string | null;
    species: string;
    customSpecies: string | null;
    breed: string | null;
    gender: string;
    birthdate: string | null;
    age: number | null;
    description: string | null;
    healthCondition: string | null;
    weight: number | null;
    imgUrls: string[];
    donatorType: string;
    donator: {
      id: number;
      name: string;
      neighborhood: string;
      city: string;
      state: string;
    };
  } | null>(null);
  console.log(animalId);
  const fetchAnimal = useCallback(async () => {
    setPageState("LOADING");
    try {
      const response = await fetch(
        `${apiBaseUrl}/animal/fetchPublic/${animalId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        setPageState("ERROR");
        return;
      }
      const animal = await response.json();
      setAnimal(animal);
      setPageState("SUCCESS");
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  }, [animalId]);
  console.log(animal);
  useEffect(() => {
    void fetchAnimal();
  }, [fetchAnimal]);
  console.log(animal);
  if (pageState === "SUCCESS" && animal) {
    return (
      <div className="flex flex-col w-full items-center gap-2">
        <AnimalInfo animal={animal}>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Doador:</h2>
            <NavLink
              to={
                animal.donatorType === "USER"
                  ? `/users/${animal.donator.id}`
                  : `/sheltersProfiles/${animal.donator.id}`
              }
              className={"underline text-blue-500"}
            >
              {animal.donator.name}
            </NavLink>

            <h3 className="font-semibold">Endereço</h3>
            {`${animal.donator.neighborhood}, ${animal.donator.city} - ${animal.donator.state}`}
          </div>

          <Button onClick={() => setModalIsOpen(true)}>Tenho interesse</Button>
        </AnimalInfo>
        <UserInterestModal
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          animalId={animal.id}
        />
      </div>
    );
  } else if (pageState === "LOADING")
    return <LoadingIcon className="h-32 w-32" />;
  else if (pageState === "ERROR")
    return <h1 className="text-red-500 text-xl font-semibold">Erro!</h1>;
};

export default Animal;
