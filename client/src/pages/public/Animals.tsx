import { ChangeEvent, useCallback, useEffect, useState } from "react";
import AnimalCardList from "../../components/global/AnimalCardList";
import { BrazilianState, brazilianStates } from "../../types/states";
import apiBaseUrl from "../../apiBaseUrl";
import LoadingIcon from "../../components/global/LoadingIcon";

const Animals = () => {
  const [pageState, setPageState] = useState<"LOADING" | "SUCCESS" | "ERROR">(
    "LOADING"
  );
  const [animals, setAnimals] = useState<
    {
      id: number;
      name: string;
      species: string | null;
      customSpecies: string | null;
      gender: string;
      userAdopterId: number | null;
      institutionAdopterId: number | null;
      imgUrls: string[];
      userDonator: {
        id: number;
        neighborhood: string;
        city: string;
        state: string;
      } | null;
      institutionDonator: {
        id: number;
        neighborhood: string;
        city: string;
        state: string;
      } | null;
    }[]
  >([]);
  const [cities, setCities] = useState<string[]>([]);
  const [filter, setFilter] = useState<{
    species: string;
    state: BrazilianState | null;
    city: string | null;
  }>({ species: "TODAS", state: null, city: null });

  const fetchAnimals = useCallback(async () => {
    try {
      const fetchedAnimals = await fetch(
        `${apiBaseUrl}/animal/fetch?${
          filter.state ? "state=" + filter.state : ""
        }${filter.city ? "&city=" + filter.city : ""}${
          filter.species !== "TODAS" ? "&species=" + filter.species : ""
        }`
      );
      const animalsData = await fetchedAnimals.json();
      setAnimals(animalsData);
      setPageState("SUCCESS");
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  }, [filter]);

  const fetchStateCities = async (state: BrazilianState) => {
    try {
      const fetchedCities = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
        { method: "GET" }
      );
      const citiesData: { nome: string }[] = await fetchedCities.json();

      setCities(citiesData.map((city) => city.nome));
      setFilter((prev) => ({
        ...prev,
        state: state,
        city: null,
      }));
    } catch (e) {
      console.log(e);
    }
  };
  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    void fetchStateCities(e.target.value as BrazilianState);
  };
  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFilter((prev) => ({
      ...prev,
      city: val === "%ALL" ? null : e.target.value,
    }));
  };
  const handleSpeciesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({ ...prev, species: e.target.value }));
  };
  useEffect(() => {
    fetchStateCities("AC");
  }, []);
  useEffect(() => {
    void fetchAnimals();
  }, [fetchAnimals]);
  console.log(animals);
  return (
    <div className="flex flex-col w-full items-center gap-2 ">
      <h1 className="text-blue-700 font-dynapuff text-3xl">Animais</h1>
      {pageState === "LOADING" && <LoadingIcon className="w-32 h-32" />}
      {pageState === "SUCCESS" && (
        <div className="flex flex-wrap justify-center gap-2">
          <select
            onChange={handleSpeciesChange}
            name="species"
            id="species"
            className="p-2 text-lg bg-white outline outline-blue-500 outline-1 rounded-lg"
          >
            <option value="TODAS">Todas as espécies</option>
            <option value="CACHORRO">Cachorros</option>
            <option value="GATO">Gatos</option>
            <option value="OUTRO">Outros</option>
          </select>
          <select
            name="state"
            id="state"
            defaultValue={"AC"}
            className="p-2 text-lg bg-white outline outline-blue-500 outline-1 rounded-lg"
            onChange={handleStateChange}
          >
            {brazilianStates.map((state, index) => (
              <option key={index}>{state}</option>
            ))}
          </select>
          <select
            onChange={handleCityChange}
            name="city"
            id="city"
            className="p-2 text-lg bg-white outline outline-blue-500 outline-1 rounded-lg"
          >
            <option value="%ALL">Todas as cidades</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="outline outline-1 outline-blue-700 rounded-lg p-2"
            placeholder="Pesquisar nome..."
          />
        </div>
      )}
      {pageState === "ERROR" && (
        <h2 className="text-red-500 text-xl font-semibold">
          Erro ao buscar animais!
        </h2>
      )}

      <AnimalCardList animals={animals} showDonatorAddress />
    </div>
  );
};

export default Animals;
