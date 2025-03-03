import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../components/global/useAuth";
import AnimalCardList from "../../../components/global/AnimalCardList";
import { useCallback, useEffect, useState } from "react";
import apiBaseUrl from "../../../apiBaseUrl";

const ShelterAnimalsInDonation = () => {
  const { institutionId } = useParams<{ institutionId: string }>();
  const [searchName, setSearchName] = useState("");
  const [animals, setAnimals] = useState<
    {
      id: number;
      name: string;
      species: string;
      customSpecies: string;
      gender: string;
      adoptionRequests: {
        id: number;
        notes: string;
        userId: number | null;
        institutionId: number | null;
      }[];
      imgUrls: string[];
    }[]
  >([]);
  const [displayedAnimals, setDisplayedAnimals] = useState<
    {
      id: number;
      name: string;
      species: string;
      customSpecies: string;
      gender: string;
      adoptionRequests: {
        id: number;
        notes: string;
        userId: number | null;
        institutionId: number | null;
      }[];
      imgUrls: string[];
    }[]
  >([]);
  console.log(displayedAnimals);
  const [pageState, setPageState] = useState<"LOADING" | "SUCCESS" | "ERROR">(
    "LOADING"
  );
  const fetchAnimals = useCallback(async () => {
    try {
      const fetchedAnimals = await fetch(
        `${apiBaseUrl}/animal/fetchInstitutionAnimalsInDonation/${institutionId}`,
        { method: "GET", credentials: "include" }
      );
      const animalsData = await fetchedAnimals.json();
      setAnimals(animalsData);
      setPageState("SUCCESS");
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  }, [institutionId]);
  useEffect(() => {
    void fetchAnimals();
  }, [fetchAnimals]);
  useEffect(() => {
    const name = searchName.toLowerCase();
    if (name === "") {
      setDisplayedAnimals(animals);
    } else {
      const filtered = animals.filter((animal) =>
        animal.name.toLowerCase().includes(name)
      );
      setDisplayedAnimals(filtered);
    }
  }, [animals, searchName]);

  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-center text-3xl font-dynapuff">
        {"NOME"}
      </h1>
      <h2 className="text-blue-700 text-center text-3xl font-dynapuff">
        Animais em adoção
      </h2>
      {pageState === "SUCCESS" && (
        <>
          <input
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
            type="text"
            className="outline outline-1 outline-blue-700 rounded-lg p-2"
            placeholder="Pesquisar nome..."
          />
          <AnimalCardList animals={displayedAnimals} showRequestsInfo />
        </>
      )}
    </div>
  );
};

export default ShelterAnimalsInDonation;
