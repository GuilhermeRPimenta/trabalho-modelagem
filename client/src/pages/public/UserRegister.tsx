import Button from "../../components/global/Button";
import ImageInput from "../../components/global/ImageInput";
import { ChangeEvent, useEffect, useState } from "react";
import { BrazilianState, brazilianStates } from "../../types/states";
import apiBaseUrl from "../../apiBaseUrl";
import LoadingIcon from "../../components/global/LoadingIcon";
import NavLink from "../../components/global/NavLink";
import { FaCheckCircle } from "react-icons/fa";

const UserRegister = () => {
  const [pageState, setPageState] = useState<
    "FORM" | "LOADING" | "SUCCESS" | "ERROR"
  >("LOADING");
  const [userImage, setUserImage] = useState<File>();
  const [cities, setCities] = useState<string[]>([]);
  const fetchStateCities = async (state: BrazilianState) => {
    try {
      setPageState("LOADING");
      const fetchedCities = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
        { method: "GET" }
      );
      const citiesData: { nome: string }[] = await fetchedCities.json();

      setCities(citiesData.map((city) => city.nome));
      setPageState("FORM");
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
  const handleFormPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    const form = e.target as HTMLFormElement;
    for (let i = 0; i < form.elements.length; i++) {
      const field = form.elements[i] as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement;

      if (field.name) {
        formData.append(field.name, field.value);
      }
    }
    if (userImage) {
      formData.append("image", userImage);
    }

    try {
      setPageState("LOADING");
      const response = await fetch(`${apiBaseUrl}/user/userRegister`, {
        method: "POST",

        body: formData,
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.ok) {
        setPageState("SUCCESS");
      } else {
        setPageState("ERROR");
      }
    } catch (e) {
      setPageState("ERROR");
      console.log(e);
    }
  };
  useEffect(() => {
    void fetchStateCities("AC");
  }, []);
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">Cadastrar</h1>
      {pageState === "FORM" && (
        <div className="flex justify-center flex-col bg-blue-100 w-full max-w-96 p-4 rounded-lg gap-4">
          <form
            className="flex flex-col gap-2 items-center"
            encType="multipart/form-data"
            onSubmit={handleFormPost}
          >
            <label className="font-semibold" htmlFor="name">
              Nome completo*
            </label>
            <input
              required
              className="w-full"
              type="text"
              id="name"
              name="name"
            />
            <label className="font-semibold" htmlFor="birthdate">
              Data de nascimento*
            </label>
            <input
              required
              className="w-full"
              id="birthdate"
              type="date"
              name="birthdate"
            />
            <label className="font-semibold" htmlFor="cpf">
              CPF*
            </label>
            <input
              required
              className="w-full"
              type="numeric"
              id="cpf"
              name="cpf"
              style={{ MozAppearance: "textfield" }}
            />
            <label className="font-semibold" htmlFor="email">
              E-mail*
            </label>
            <input
              required
              className="w-full"
              type="email"
              id="email"
              name="email"
            />
            <label className="font-semibold" htmlFor="phone">
              Telefone*
            </label>
            <input
              required
              className="w-full"
              type="text"
              id="phone"
              name="phone"
            />
            <label className="font-semibold" htmlFor="addressState">
              Estado*
            </label>
            <select
              required
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
            <select required className="w-full bg-white" id="city" name="city">
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <label className="font-semibold" htmlFor="street">
              Logradouro*
            </label>
            <input
              required
              className="w-full"
              type="text"
              id="street"
              name="street"
            />
            <label className="font-semibold" htmlFor="number">
              Número*
            </label>
            <input
              required
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
              required
              className="w-full"
              type="text"
              id="neighborhood"
              name="neighborhood"
            />

            <label className="font-semibold" htmlFor="postalCode">
              CEP*
            </label>
            <input
              required
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
              required
              className="w-full"
              type="password"
              id="password"
              name="password"
            />
            <label className="font-semibold" htmlFor="passwordConfirm">
              Confirme a senha*
            </label>
            <input
              required
              className="w-full"
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
            />
            <Button variant="constructive">Cadastrar</Button>
          </form>
        </div>
      )}
      {pageState === "LOADING" && <LoadingIcon className="w-32 h-32" />}
      {pageState === "ERROR" && (
        <div className="flex flex-col gap-3 items-center">
          <h4 className="text-red-500 text-xl">Erro ao criar usuário!</h4>
          <Button
            onClick={() => {
              setPageState("FORM");
            }}
          >
            Tentar novamente
          </Button>
        </div>
      )}
      {pageState === "SUCCESS" && (
        <div className="flex flex-col gap-3 items-center">
          <h4 className="text-green-500 text-xl">Usuário cadastrado!</h4>
          <div className="text-green-500">
            <FaCheckCircle size={68} />
          </div>

          <NavLink to="/login">Login</NavLink>
        </div>
      )}
    </div>
  );
};

export default UserRegister;
