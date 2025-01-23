import { ChangeEvent, useEffect, useState } from "react";
import { AnimalType } from "../../../types/animal";
import { BrazilianState, brazilianStates } from "../../../types/states";
import { animals } from "../../../assets/exampleData";
import AnimalCardList from "../../../components/global/AnimalCardList";

type AdoptionState = "ADOTATOS" | "NAO_ADOTADOS" | "TODOS";

const AdminAnimals = () => {
  const [unadoptedAnimals, setUnadoptedAnimals] = useState<AnimalType[]>([]);
  const [adoptedAnimals, setAdoptedAnimals] = useState<AnimalType[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [filter, setFilter] = useState<{
    species: string;
    adoptionState: AdoptionState;
    state: BrazilianState | null;
    city: string | null;
  }>({ species: "TODAS", adoptionState: "TODOS", state: null, city: null });

  const fetchStateCities = async (state: BrazilianState) => {
    try {
      const fetchedCities = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
        { method: "GET" }
      );
      const citiesData: { nome: string }[] = await fetchedCities.json();
      const filteredCities = citiesData.filter((city) =>
        animals.some((animal) => animal.donator.city === city.nome)
      );
      setCities(filteredCities.map((city) => city.nome));
      setFilter((prev) => ({
        ...prev,
        state: state,
        city: filteredCities[0]?.nome || null,
      }));
    } catch (e) {
      console.log(e);
    }
  };
  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    void fetchStateCities(e.target.value as BrazilianState);
  };
  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({ ...prev, city: e.target.value }));
  };
  const handleSpeciesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({ ...prev, species: e.target.value }));
  };
  const handleAdoptionStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({
      ...prev,
      adoptionState: e.target.value as AdoptionState,
    }));
  };
  useEffect(() => {
    fetchStateCities("SP");
  }, []);
  useEffect(() => {
    setUnadoptedAnimals(
      animals.filter(
        (animal) =>
          !animal.adopter &&
          (filter.species === "OUTRO"
            ? !animal.species
            : filter.species === "TODAS"
            ? true
            : filter.species === animal.species) &&
          animal.donator.state === filter.state &&
          animal.donator.city === filter.city
      )
    );
    setAdoptedAnimals(
      animals.filter(
        (animal) =>
          animal.adopter &&
          (filter.species === "OUTRO"
            ? !animal.species
            : filter.species === "TODAS"
            ? true
            : filter.species === animal.species) &&
          animal.donator.state === filter.state &&
          animal.donator.city === filter.city
      )
    );
  }, [filter]);
  return (
    <div className="flex flex-col w-full items-center gap-2 ">
      <h1 className="text-blue-700 font-dynapuff text-3xl">
        Administrar animais
      </h1>
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
          name="adoptionState"
          id="adoptionState"
          className="p-2 text-lg bg-white outline outline-blue-500 outline-1 rounded-lg"
          onChange={handleAdoptionStateChange}
        >
          <option value="TODOS">Todos os animais</option>
          <option value="ADOTATOS">Adotados</option>
          <option value="NAO_ADOTADOS">Não adotados</option>
        </select>
        <select
          name="state"
          id="state"
          defaultValue={"SP"}
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
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <AnimalCardList
        animals={
          filter.adoptionState === "TODOS"
            ? unadoptedAnimals.concat(adoptedAnimals)
            : filter.adoptionState === "ADOTATOS"
            ? adoptedAnimals
            : unadoptedAnimals
        }
        showDonatorAddress
      />
    </div>
  );
};

export default AdminAnimals;
