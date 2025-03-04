import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../components/global/useAuth";
import AnimalCardList from "../../../components/global/AnimalCardList";
import { useCallback, useEffect, useState } from "react";
import apiBaseUrl from "../../../apiBaseUrl";

const ShelterDonatedAnimals = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const { institutionId } = useParams<{ institutionId: string }>();
  const [searchName, setSearchName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [animals, setAnimals] = useState<
    {
      id: number;
      name: string;
      species: string;
      customSpecies: string;
      gender: string;
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
      imgUrls: string[];
    }[]
  >([]);
  const [pageState, setPageState] = useState<"LOADING" | "SUCCESS" | "ERROR">(
    "LOADING"
  );
  const fetchAnimals = useCallback(async () => {
    try {
      const fetchedAnimals = await fetch(
        `${apiBaseUrl}/animal/fetch?institutionDonatorId=${institutionId}&donated=true`,
        { method: "GET" }
      );
      const animalsData = await fetchedAnimals.json();
      console.log(animalsData);
      setAnimals(animalsData);
      setPageState("SUCCESS");
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  }, [institutionId]);
  const fetchInstitutionName = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/institution/fetchForInstitutionHome/${institutionId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        console.log(response);
        setInstitutionName("[ERRO!]");
        return;
      }
      const institution = await response.json();
      setInstitutionName(institution.name);
    } catch (e) {
      console.log(e);
    }
  }, [institutionId]);
  useEffect(() => {
    void fetchInstitutionName();
    void fetchAnimals();
  }, [fetchAnimals, fetchInstitutionName]);
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
  if (!authContext.auth.user) {
    navigate("/login");
  }
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-center text-3xl font-dynapuff">
        {institutionName}
      </h1>
      <h2 className="text-blue-700 text-center text-3xl font-dynapuff">
        Animais doados
      </h2>
      {pageState === "SUCCESS" && (
        <>
          <input
            type="text"
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
            value={searchName}
            className="outline outline-1 outline-blue-700 rounded-lg p-2"
            placeholder="Pesquisar nome..."
          />
          <AnimalCardList animals={displayedAnimals} />
        </>
      )}
    </div>
  );
};

export default ShelterDonatedAnimals;
