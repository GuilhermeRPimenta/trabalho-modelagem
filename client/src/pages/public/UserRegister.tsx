import { useNavigate } from "react-router-dom";
import Button from "../../components/global/Button";
import ImageInput from "../../components/global/ImageInput";
import { ChangeEvent, useEffect, useState } from "react";
import { BrazilianState, brazilianStates } from "../../types/states";

const UserRegister = () => {
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState<File>();
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
  const handleUserImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) setUserImage(file);
  };
  const removeUserImage = () => {
    setUserImage(undefined);
  };
  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    void fetchStateCities(e.target.value as BrazilianState);
  };
  useEffect(() => {
    void fetchStateCities("AC");
  }, []);
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">Cadastrar</h1>
      <div className="flex justify-center flex-col bg-blue-100 w-full max-w-96 p-4 rounded-lg gap-4">
        <div className="flex flex-col gap-2 items-center">
          {/*Substituir div acima por form*/}
          <label className="font-semibold" htmlFor="name">
            Nome completo*
          </label>
          <input className="w-full" type="text" id="name" name="name" />
          <label className="font-semibold" htmlFor="birthdate">
            Data de nascimento*
          </label>
          <input
            className="w-full"
            id="birthdate"
            type="date"
            name="birthdate"
          />
          <label className="font-semibold" htmlFor="cpf">
            CPF*
          </label>
          <input
            className="w-full"
            type="numeric"
            id="cpf"
            name="cpf"
            style={{ MozAppearance: "textfield" }}
          />
          <label className="font-semibold" htmlFor="email">
            E-mail*
          </label>
          <input className="w-full" type="email" id="email" name="email" />
          <label className="font-semibold" htmlFor="phone">
            Telefone*
          </label>
          <input className="w-full" type="text" id="phone" name="phone" />
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
          <label className="font-semibold" htmlFor="city">
            Cidade*
          </label>
          <select className="w-full bg-white" id="city" name="city">
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <label className="font-semibold" htmlFor="street">
            Logradouro*
          </label>
          <input className="w-full" type="text" id="street" name="street" />
          <label className="font-semibold" htmlFor="number">
            Número*
          </label>
          <input
            className="w-full"
            style={{ MozAppearance: "textfield" }}
            type="number"
            id="number"
            name="number"
          />
          <label className="font-semibold" htmlFor="complement">
            Complemento
          </label>
          <input
            className="w-full"
            type="text"
            id="complement"
            name="complement"
          />
          <label className="font-semibold" htmlFor="addressNeighborhood">
            Bairro*
          </label>
          <input
            className="w-full"
            type="text"
            id="neighborhood"
            name="neighborhood"
          />

          <label className="font-semibold" htmlFor="postalCode">
            CEP*
          </label>
          <input
            className="w-full"
            type="text"
            id="postalCode"
            name="postalCode"
          />
          <label className="font-semibold" htmlFor="userImage">
            Foto
          </label>
          <ImageInput
            id="image"
            name="image"
            onChange={handleUserImageChange}
          />
          {userImage && (
            <div className="w-full flex flex-col items-center">
              <h3>Foto de perfil selecionada:</h3>
              <div className="relative">
                <img
                  src={URL.createObjectURL(userImage)}
                  alt={`Imagem principal`}
                  className="w-full max-w-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeUserImage}
                  className="absolute top-0 right-0 bg-red-500 text-white py-1 px-3 rounded-full"
                >
                  X
                </button>
              </div>
            </div>
          )}
          <label className="font-semibold" htmlFor="password">
            Senha*
          </label>
          <input
            className="w-full"
            type="password"
            id="password"
            name="password"
          />
          <label className="font-semibold" htmlFor="passwordConfirm">
            Confirme a senha*
          </label>
          <input
            className="w-full"
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
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

export default UserRegister;
