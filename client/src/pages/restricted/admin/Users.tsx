import { ChangeEvent, useEffect, useState } from "react";
import { BrazilianState, brazilianStates } from "../../../types/states";
import { UserType } from "../../../types/user";
import { users } from "../../../assets/exampleData";
import NavLink from "../../../components/global/NavLink";

const Users = () => {
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
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
    setFilteredUsers(
      users.filter(
        (user) =>
          user.state === filter.state &&
          (filter.city === null || user.city === filter.city)
      )
    );
  }, [filter]);
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">
        Administrar usuários
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

      <div className="flex flex-col w-fit items-center gap-2">
        <input
          type="text"
          className="outline outline-1 outline-blue-700 rounded-lg p-2 w-full"
          placeholder="Pesquisar nome..."
        />
        {filteredUsers.length > 0 ? (
          <ul
            className="w-fit flex flex-col gap-1 p-2"
            style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.45)" }}
          >
            {filteredUsers.map((user, index) => (
              <li key={index} className="bg-blue-100 flex justify-center p-2">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="font-semibold">{user.name}</h2>
                    <p>Id: {user.id}</p>
                    <p>
                      {user.neighborhood}, {user.city}, {user.state}
                    </p>
                    <p>Animais cadastrados: {user.animals.length}</p>
                    <p>Animais adotados: {user.adoptedAnimals.length}</p>
                    <p>
                      Registro em:{" "}
                      {user.createdAt.toLocaleString("pt-BR", {
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
          <p className="text-red-500 text-2xl">Nenhum usuário encontrado!</p>
        )}
      </div>
    </div>
  );
};

export default Users;
