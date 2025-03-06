import { ChangeEvent, useCallback, useEffect, useState } from "react";
import SheltersCardList from "../../../components/global/SheltersCardList";
import LoadingIcon from "../../../components/global/LoadingIcon";
import apiBaseUrl from "../../../apiBaseUrl";
import { BrazilianState, brazilianStates } from "../../../types/states";

const AdminShelters = () => {
  const [pageState, setPageState] = useState<"LOADING" | "SUCCESS" | "ERROR">(
    "LOADING"
  );
  const [institutions, setInstitutions] = useState<
    {
      id: number;
      name: string;
      neighborhood: string;
      city: string;
      state: string;
      imgUrl: string;
      userInstitution: {
        role: string;
      }[];
    }[]
  >([]);
  const [displayedInstitutions, setDisplayedInstitutions] = useState<
    {
      id: number;
      name: string;
      neighborhood: string;
      city: string;
      state: string;
      imgUrl: string;
      userInstitution: {
        role: string;
      }[];
    }[]
  >([]);
  const [searchName, setSearchName] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [filter, setFilter] = useState<{
    state: BrazilianState | null;
    city: string | null;
  }>({ state: null, city: null });
  const fetchInsitutions = useCallback(async () => {
    setPageState("LOADING");
    try {
      const response = await fetch(
        `${apiBaseUrl}/institution/fetch?${
          filter.state ? "&state=" + filter.state : ""
        }${filter.city ? "&city=" + filter.city : ""}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const institutions = await response.json();
      setInstitutions(institutions);
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
  useEffect(() => {
    fetchStateCities("MG");
  }, []);
  useEffect(() => {
    void fetchInsitutions();
  }, [fetchInsitutions]);
  useEffect(() => {
    const name = searchName.toLowerCase();
    if (name === "") {
      setDisplayedInstitutions(institutions);
    } else {
      const filtered = institutions.filter((institution) =>
        institution.name.toLowerCase().includes(name)
      );
      setDisplayedInstitutions(filtered);
    }
  }, [institutions, searchName]);
  return (
    <div className="flex flex-col w-full items-center gap-2 ">
      <h1 className="text-blue-700 font-dynapuff text-3xl">
        {`Administrar instituições`}
      </h1>
      <div className="flex flex-wrap justify-center gap-2">
        <select
          name="state"
          id="state"
          defaultValue={"MG"}
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
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
          value={searchName}
          className="outline outline-1 outline-blue-700 rounded-lg p-2"
          placeholder="Pesquisar nome..."
        />
      </div>
      {pageState === "SUCCESS" && (
        <div className="flex flex-col gap-1">
          <SheltersCardList institutions={displayedInstitutions} />
        </div>
      )}
      {pageState === "LOADING" && <LoadingIcon className="w-32 h-32" />}
      {pageState === "ERROR" && (
        <div className="flex flex-col gap-3 items-center">
          <h4 className="text-red-500 text-xl">Erro ao buscar instituições!</h4>
        </div>
      )}
    </div>
  );
};

export default AdminShelters;
