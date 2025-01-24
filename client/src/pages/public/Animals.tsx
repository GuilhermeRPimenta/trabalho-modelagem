import { ChangeEvent, useEffect, useState } from "react";
import { animals } from "../../assets/exampleData";
import AnimalCardList from "../../components/global/AnimalCardList";
import { BrazilianState, brazilianStates } from "../../types/states";
import { AnimalType } from "../../types/animal";

const Animals = () => {
  const [unadoptedAnimals, setUnadoptedAnimals] = useState<AnimalType[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [filter, setFilter] = useState<{
    species: string;
    state: BrazilianState | null;
    city: string | null;
  }>({ species: "TODAS", state: null, city: null });
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
          (filter.city === null || animal.donator.city === filter.city)
      )
    );
  }, [filter]);
  return (
    <div className="flex flex-col w-full items-center gap-2 ">
      <h1 className="text-blue-700 font-dynapuff text-3xl">Animais</h1>
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

      <AnimalCardList animals={unadoptedAnimals} showDonatorAddress />
    </div>
  );
};

export default Animals;
