import Button from "../../../components/global/Button";
import brokenImage from "../../../assets/brokenImage.png";
import EditPhotoModal from "../../../components/user/EditPhotoModal";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { BrazilianState, brazilianStates } from "../../../types/states";
import { useAuth } from "../../../components/global/useAuth";
import NavLink from "../../../components/global/NavLink";
import LoadingIcon from "../../../components/global/LoadingIcon";
import apiBaseUrl from "../../../apiBaseUrl";

const UserEdit = () => {
  const authContext = useAuth();
  const userId = authContext.auth.user?.id;
  const [pageState, setPageState] = useState<
    "FORM" | "LOADING" | "SUCCESS" | "ERROR"
  >("LOADING");

  const [changePassword, setChangePassword] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    cpf: string;
    birthdate: string;
    email: string;
    phone: string;
    street: string;
    complement: string;
    number: number;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    imgUrl: string | null;
  } | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updatedImage, setUpdatedImage] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fetchImageAsFile = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });
      setImageFile(file);
    } catch (error) {
      console.log(error);
    }
  };
  const [cities, setCities] = useState<string[]>([]);
  const fetchUser = useCallback(async () => {
    try {
      setPageState("LOADING");
      const fetchedUser = await fetch(
        `http://localhost:7000/user/fetchForEdit/${userId}`,
        { method: "GET", credentials: "include" }
      );
      const userData = await fetchedUser.json();
      setUser(userData);
      setPageState("FORM");
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  }, [userId]);
  const fetchStateCities = async (state: string) => {
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
  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    void fetchStateCities(e.target.value as BrazilianState);
  };
  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
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
      console.log(field);
      if (field.name) {
        formData.append(field.name, field.value);
      }
    }
    formData.append("id", userId?.toString() ?? "");

    formData.append("changeImage", updatedImage.toString());
    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (changePassword) {
      console.log(changePassword);
      formData.append("changePassword", changePassword ? "true" : "false");
    }
    try {
      setPageState("LOADING");
      const response = await fetch(`${apiBaseUrl}/user/update`, {
        method: "PUT",
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
    void fetchStateCities(user?.state ?? "");
  }, [user?.state]);
  useEffect(() => {
    if (user)
      setSelectedCity(cities.includes(user.city) ? user.city : cities[0]);
  }, [user?.city, cities, user]);
  useEffect(() => {
    if (user?.imgUrl) fetchImageAsFile(user.imgUrl);
  }, [user?.imgUrl]);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">Editar cadastro</h1>
      {pageState === "LOADING" && <LoadingIcon className="w-32 h-32" />}
      {pageState === "ERROR" && (
        <h4 className="text-red-500 text-xl font-semibold">Ocorreu um erro!</h4>
      )}
      {pageState === "SUCCESS" && (
        <div className="flex flex-col gap-3 items-center">
          <h4 className="text-green-500 text-xl">Registro editado!</h4>
          <div className="text-green-500">
            <FaCheckCircle size={68} />
          </div>

          <NavLink to="/user">Voltar</NavLink>
        </div>
      )}
      {pageState === "FORM" && (
        <>
          <form
            className="flex justify-center max-w-full w-96 flex-col bg-blue-100 p-4 rounded-lg gap-4"
            encType="multipart/form-data"
            onSubmit={handleFormPost}
          >
            <div className="flex flex-col gap-2 items-center">
              <div className="relative group">
                <button type="button" onClick={() => setModalIsOpen(true)}>
                  <img
                    className="w-32 object-cover h-32 rounded-md transition-all duration-300 group-hover:brightness-50"
                    src={
                      imageFile ? URL.createObjectURL(imageFile) : brokenImage
                    }
                    alt={brokenImage}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaRegEdit className="text-white text-3xl" />
                  </div>
                </button>
              </div>

              <label htmlFor="name">Nome completo*</label>
              <input
                defaultValue={user?.name}
                className="w-full"
                type="text"
                name="name"
                id="name"
              />
              <label htmlFor="birthdate">Data de nascimento*</label>
              <input
                defaultValue={user?.birthdate.split("T")[0]}
                className="w-full"
                id="birthdate"
                name="birthdate"
                type="date"
              />
              <label htmlFor="cpf">CPF*</label>
              <input
                defaultValue={user?.cpf}
                className="w-full"
                type="numeric"
                id="cpf"
                name="cpf"
                style={{ MozAppearance: "textfield" }}
              />
              <label htmlFor="email">E-mail*</label>
              <input
                defaultValue={user?.email}
                className="w-full"
                type="email"
                id="email"
                name="email"
              />
              <label htmlFor="phone">Telefone*</label>
              <input
                defaultValue={user?.phone}
                className="w-full"
                type="text"
                id="phone"
                name="phone"
              />
              <label htmlFor="addressState">Estado*</label>
              <select
                onChange={handleStateChange}
                defaultValue={user?.state}
                className="w-full bg-white"
                name="state"
                id="state"
              >
                {brazilianStates.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <label htmlFor="addressCity">Cidade*</label>
              <select
                onChange={handleCityChange}
                value={selectedCity}
                className="w-full bg-white"
                id="city"
                name="city"
              >
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <label htmlFor="address">Logradouro*</label>
              <input
                defaultValue={user?.street}
                className="w-full"
                type="text"
                id="street"
                name="street"
              />
              <label htmlFor="addressNumber">Número*</label>
              <input
                defaultValue={user?.number}
                className="w-full"
                style={{ MozAppearance: "textfield" }}
                type="number"
                id="number"
                name="number"
              />
              <label htmlFor="addressComplement">Complemento</label>
              <input
                defaultValue={user?.complement}
                className="w-full"
                type="text"
                id="complement"
                name="complement"
              />
              <label htmlFor="addressNeighborhood">Bairro*</label>
              <input
                defaultValue={user?.neighborhood}
                className="w-full"
                type="text"
                id="neighborhood"
                name="neighborhood"
              />

              <label htmlFor="addressPostalCode">CEP*</label>
              <input
                defaultValue={user?.postalCode}
                className="w-full"
                type="text"
                id="postalCode"
                name="postalCode"
              />
              <label htmlFor="changePassword">Alterar senha</label>
              <input
                type="checkbox"
                id="changePassword"
                onChange={(e) => {
                  setChangePassword(e.target.checked);
                }}
              />
              {changePassword && (
                <>
                  <label htmlFor="password">Nova senha*</label>
                  <input
                    className="w-full"
                    type="password"
                    id="password"
                    name="password"
                  />
                  <label htmlFor="passwordConfirm">Confirme a senha*</label>
                  <input
                    className="w-full"
                    type="password"
                    id="passwordConfirm"
                  />
                </>
              )}

              <Button type="submit" variant="constructive">
                Editar
              </Button>
            </div>
          </form>
          <EditPhotoModal
            initialImage={imageFile}
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
            setUpdatedImage={setUpdatedImage}
            setImageFile={setImageFile}
          />
        </>
      )}
    </div>
  );
};

export default UserEdit;
