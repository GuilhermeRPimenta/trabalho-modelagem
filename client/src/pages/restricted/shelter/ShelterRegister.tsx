import { useNavigate } from "react-router-dom";
import Button from "../../../components/global/Button";
import { useAuth } from "../../../components/global/useAuth";
import { ChangeEvent, useEffect, useState } from "react";
import { BrazilianState, brazilianStates } from "../../../types/states";

const ShelterRegister = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const [cities, setCities] = useState<string[]>([]);
  const fetchStateCities = async (state: BrazilianState) => {
    try {
      const fetchedCities = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
        { method: "GET" }
      );
      const citiesData: { nome: string }[] = await fetchedCities.json();

      setCities(citiesData.map((city) => city.nome));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    void fetchStateCities("AC");
  }, []);
  if (!authContext?.auth)
    return <h1 className="text-red-700 text-3xl">Acesso negado!</h1>;

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    void fetchStateCities(e.target.value as BrazilianState);
  };

  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">
        Cadastro de abrigo
      </h1>
      <div className="flex justify-center text-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
        <div className="flex flex-col gap-2 items-center">
          {/*Substituir div acima por form*/}
          <h2>
            {`Cadastrando abrigo supervisionado por `}
            <span className="font-bold">{authContext.auth.name}</span>
          </h2>
          <p>CPF: {authContext.auth.cpf}</p>
          <label htmlFor="name">Nome*</label>
          <input type="text" id="name" className="w-full" />
          <label htmlFor="cnpj">CNPJ*</label>
          <input type="text" id="cnpj" className="w-full" />
          <label htmlFor="email">E-mail*</label>
          <input className="w-full" type="email" id="email" />
          <label htmlFor="phone">Telefone*</label>
          <input className="w-full" type="text" id="phone" />
          <label className="font-semibold" htmlFor="addressState">
            Estado*
          </label>
          <select
            className="w-full bg-white"
            onChange={handleStateChange}
            name="state"
            id="state"
          >
            {brazilianStates.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
          <label className="font-semibold" htmlFor="addressCity">
            Cidade*
          </label>
          <select className="w-full bg-white" id="addressCity">
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <label htmlFor="address">Logradouro*</label>
          <input className="w-full" type="text" id="address" />
          <label htmlFor="addressNumber">Número*</label>
          <input
            className="w-full"
            style={{ MozAppearance: "textfield" }}
            type="number"
            id="address"
          />
          <label htmlFor="addressComplement">Complemento</label>
          <input className="w-full" type="text" id="addressComplement" />
          <label htmlFor="addressNeighborhood">Bairro*</label>
          <input className="w-full" type="text" id="addressNeighborhood" />
          <label htmlFor="addressPostalCode">CEP*</label>
          <input className="w-full" type="text" id="addressPostalCode" />
          <label htmlFor="userImage">Foto</label>
          <input
            className="w-full"
            type="file"
            accept="image/png, image/jpeg"
            id="userImage"
          />
          <Button
            variant="constructive"
            onClick={() => {
              navigate("/login");
            }}
          >
            Cadastrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShelterRegister;
