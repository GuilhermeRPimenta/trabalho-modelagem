import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { BrazilianState, brazilianStates } from "../../../types/states";
import NavLink from "../../../components/global/NavLink";
import LoadingIcon from "../../../components/global/LoadingIcon";
import apiBaseUrl from "../../../apiBaseUrl";

const Users = () => {
  const [pageState, setPageState] = useState<"LOADING" | "SUCCESS" | "ERROR">(
    "LOADING"
  );
  const [filteredUsers, setFilteredUsers] = useState<
    {
      id: number;
      name: string;
      neighborhood: string;
      city: string;
      state: string;
      createdAt: string;
      _count: {
        adoptedAnimals: number;
        donationAnimals: number;
      };
    }[]
  >([]);
  const [cities, setCities] = useState<string[]>([]);
  const [filter, setFilter] = useState<{
    state: BrazilianState;
    city: string | null;
  }>({ state: "SP", city: null });
  const [searchName, setSearchName] = useState("");
  const [displayedUsers, setDisplayedUsers] = useState(filteredUsers);

  const fetchUsers = useCallback(async () => {
    try {
      setPageState("LOADING");
      const fetchedUsers = await fetch(
        `${apiBaseUrl}/user/adminFetch?${
          filter.state ? "state=" + filter.state : ""
        }${filter.city ? "&city=" + filter.city : ""}`,
        { method: "GET", credentials: "include" }
      );
      const usersData = await fetchedUsers.json();
      setFilteredUsers(usersData);
      setPageState("SUCCESS");
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  }, [filter.city, filter.state]);
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
    void fetchUsers();
  }, [filter, fetchUsers]);
  useEffect(() => {
    const name = searchName.toLowerCase();
    if (name === "") {
      setDisplayedUsers(filteredUsers);
    } else {
      const filtered = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(name)
      );
      setDisplayedUsers(filtered);
    }
  }, [filteredUsers, searchName]);
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">
        Administrar usuários
      </h1>
      {pageState === "LOADING" && <LoadingIcon className="h-32 w-32" />}
      {pageState === "SUCCESS" && (
        <>
          <div className="flex flex-wrap justify-center gap-2">
            <select
              name="state"
              id="state"
              value={filter.state as BrazilianState}
              className="p-2 text-lg bg-white outline outline-blue-500 outline-1 rounded-lg"
              onChange={handleStateChange}
            >
              {brazilianStates.map((state, index) => (
                <option key={index}>{state}</option>
              ))}
            </select>
            <select
              onChange={handleCityChange}
              value={filter.city ?? "%ALL"}
              name="city"
              id="city"
              className="p-2 text-lg bg-white outline outline-blue-500 outline-1 rounded-lg"
            >
              <option value={"%ALL"}>Todas as cidades</option>
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

          <div className="flex flex-col w-fit items-center gap-2">
            {displayedUsers.length > 0 ? (
              <ul
                className="w-fit flex flex-col gap-1 p-2"
                style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.45)" }}
              >
                {displayedUsers.map((user, index) => (
                  <li
                    key={index}
                    className="bg-blue-100 flex justify-center p-2"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex flex-col gap-1">
                        <h2 className="font-semibold">{user.name}</h2>
                        <p>Id: {user.id}</p>
                        <p>
                          {user.neighborhood}, {user.city}, {user.state}
                        </p>
                        <p>
                          Animais cadastrados: {user._count.donationAnimals}
                        </p>
                        <p>Animais adotados: {user._count.adoptedAnimals}</p>
                        <p>
                          Registro em:{" "}
                          {new Date(user.createdAt).toLocaleString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <NavLink to={`${user.id}`}>Ver mais</NavLink>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-500 text-2xl">
                Nenhum usuário encontrado!
              </p>
            )}
          </div>
        </>
      )}
      {pageState === "ERROR" && (
        <h3 className="text-red-500 text-2xl">Erro ao buscar usuários!</h3>
      )}
    </div>
  );
};

export default Users;
