import { ChangeEvent, useEffect, useState } from "react";
import SheltersCardList from "../../../components/global/SheltersCardList";
import { BrazilianState, brazilianStates } from "../../../types/states";
import { shelters } from "../../../assets/exampleData";
import { ShelterType } from "../../../types/shelter";

const AdminShelters = () => {
  const [filteredShelters, setFilteredShelters] = useState<ShelterType[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [filter, setFilter] = useState<{
    state: BrazilianState | null;
    city: string | null;
  }>({ state: null, city: null });
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
  useEffect(() => {
    fetchStateCities("SP");
  }, []);
  useEffect(() => {
    setFilteredShelters(
      shelters.filter(
        (shelter) =>
          shelter.state === filter.state &&
          (filter.city === null || shelter.city === filter.city)
      )
    );
  }, [filter]);
  return (
    <div className="flex flex-col w-full items-center gap-2 ">
      <h1 className="text-blue-700 font-dynapuff text-3xl">
        Administrar instituições
      </h1>
      <div className="flex flex-wrap justify-center gap-2">
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

      <SheltersCardList shelters={filteredShelters} />
    </div>
  );
};

export default AdminShelters;
