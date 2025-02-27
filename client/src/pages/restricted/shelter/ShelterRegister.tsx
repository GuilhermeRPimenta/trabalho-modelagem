import Button from "../../../components/global/Button";
import { useAuth } from "../../../components/global/useAuth";
import { ChangeEvent, useEffect, useState } from "react";
import { BrazilianState, brazilianStates } from "../../../types/states";
import apiBaseUrl from "../../../apiBaseUrl";
import ImageInput from "../../../components/global/ImageInput";
import LoadingIcon from "../../../components/global/LoadingIcon";
import { FaCheckCircle } from "react-icons/fa";
import NavLink from "../../../components/global/NavLink";

const ShelterRegister = () => {
  const [pageState, setPageState] = useState<
    "FORM" | "LOADING" | "SUCCESS" | "ERROR"
  >("FORM");
  const authContext = useAuth();
  const [cities, setCities] = useState<string[]>([]);
  const [image, setImage] = useState<File>();
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
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) setImage(file);
  };
  const removeImage = () => {
    setImage(undefined);
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
    if (image) {
      formData.append("saveImage", "true");
      formData.append("image", image);
    }

    try {
      setPageState("LOADING");
      const response = await fetch(`${apiBaseUrl}/institution/register`, {
        method: "POST",
        credentials: "include",
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
  if (!authContext.auth.user)
    return <h1 className="text-red-700 text-3xl">Acesso negado!</h1>;

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    void fetchStateCities(e.target.value as BrazilianState);
  };

  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">
        Cadastro de abrigo
      </h1>
      {pageState === "FORM" && (
        <div className="flex justify-center text-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
          <form
            className="flex flex-col gap-2 items-center"
            encType="multipart/form-data"
            onSubmit={handleFormPost}
          >
            <h2>
              {`Cadastrando abrigo supervisionado por `}
              <span className="font-bold">{authContext.auth.user.name}</span>
            </h2>
            <input
              type="hidden"
              id="category"
              name="category"
              value={"institution"}
            />
            <p>CPF: {authContext.auth.user.cpf}</p>
            <label htmlFor="name">Nome*</label>
            <input type="text" id="name" name="name" className="w-full" />
            <label htmlFor="cnpj">CNPJ*</label>
            <input type="text" id="cnpj" name="cnpj" className="w-full" />
            <label htmlFor="email">E-mail*</label>
            <input className="w-full" type="email" id="email" name="email" />
            <label htmlFor="phone">Telefone*</label>
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
            <label htmlFor="street">Logradouro*</label>
            <input className="w-full" type="text" id="street" name="street" />
            <label htmlFor="addressNumber">Número*</label>
            <input
              className="w-full"
              style={{ MozAppearance: "textfield" }}
              type="number"
              id="number"
              name="number"
            />
            <label htmlFor="addressComplement">Complemento</label>
            <input
              className="w-full"
              type="text"
              id="complement"
              name="complement"
            />
            <label htmlFor="addressNeighborhood">Bairro*</label>
            <input
              className="w-full"
              type="text"
              id="neighborhood"
              name="neighborhood"
            />
            <label htmlFor="postalCode">CEP*</label>
            <input
              className="w-full"
              type="text"
              id="postalCode"
              name="postalCode"
            />
            <label htmlFor="foundationDate">Data de fundação</label>
            <input type="date" id="foundationDate" name="foundationDate" />
            <label htmlFor="image">Foto</label>
            <ImageInput id="image" name="image" onChange={handleImageChange} />
            {image && (
              <div className="w-full flex flex-col items-center">
                <h3>Foto de perfil selecionada:</h3>
                <div className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Imagem principal`}
                    className="w-full max-w-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-0 right-0 bg-red-500 text-white py-1 px-3 rounded-full"
                  >
                    X
                  </button>
                </div>
              </div>
            )}
            <Button variant="constructive">Cadastrar</Button>
          </form>
        </div>
      )}
      {pageState === "LOADING" && <LoadingIcon className="w-32 h-32" />}
      {pageState === "ERROR" && (
        <div className="flex flex-col gap-3 items-center">
          <h4 className="text-red-500 text-xl">Erro ao criar instituição!</h4>
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
          <h4 className="text-green-500 text-xl">Instituição cadastrada!</h4>
          <div className="text-green-500">
            <FaCheckCircle size={68} />
          </div>

          <NavLink to="/user">Voltar</NavLink>
        </div>
      )}
    </div>
  );
};

export default ShelterRegister;
