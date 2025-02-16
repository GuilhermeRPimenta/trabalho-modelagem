import Button from "../../../components/global/Button";
import { ChangeEvent, useState } from "react";
import { useAuth } from "../../../components/global/useAuth";
import ImageInput from "../../../components/global/ImageInput";
import apiBaseUrl from "../../../apiBaseUrl";
import LoadingIcon from "../../../components/global/LoadingIcon";
import { FaCheckCircle } from "react-icons/fa";
import NavLink from "../../../components/global/NavLink";

const AnimalRegister = () => {
  const authContext = useAuth();
  const [pageState, setPageState] = useState<
    "FORM" | "LOADING" | "SUCCESS" | "ERROR"
  >("FORM");
  const [isCustomSpecies, setIsCustomSpecies] = useState(false);
  const [mainImage, setMainImage] = useState<File>();
  const [extraImages, setExtraImages] = useState<File[]>([]);
  const handleSpeciesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "OUTRO") setIsCustomSpecies(true);
    else setIsCustomSpecies(false);
  };
  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) setMainImage(file);
  };
  const removeMainImage = () => {
    setMainImage(undefined);
  };
  const handleExtraImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? e.target.files : [];
    if (selectedFiles.length + extraImages.length > 9) {
      alert("Você pode enviar no máximo 10 fotos.");
      return;
    }
    setExtraImages((prevImages) => [...prevImages, ...selectedFiles]);
  };
  const removeExtraImage = (index: number) => {
    setExtraImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
    if (mainImage) {
      formData.append("images", mainImage);
    }
    if (extraImages.length > 0) {
      extraImages.forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      setPageState("LOADING");
      const response = await fetch(`${apiBaseUrl}/animal/register`, {
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

  if (!authContext?.auth.user)
    return <h1 className="text-red-700 text-3xl">Acesso negado!</h1>;
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-center text-3xl font-dynapuff">
        Criar anúncio de doação
      </h1>
      {pageState === "FORM" && (
        <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
          <form
            className="flex flex-col gap-2 items-center"
            encType="multipart/form-data"
            onSubmit={handleFormPost}
          >
            <h2>
              {`Criando anúncio de doação por `}
              <span className="font-bold">{authContext.auth.user?.name}</span>
            </h2>
            <div className="inline">
              <span>CPF: </span>
              <span className="font-semibold">
                {authContext.auth.user?.cpf}
              </span>
            </div>

            <h2 className="text-2xl font-semibold">Dados do animal</h2>
            <input
              type="hidden"
              id="category"
              name="category"
              value={"animal"}
            />
            <input
              type="hidden"
              id="userId"
              name="userId"
              value={authContext.auth.user?.id}
            />
            <label className="font-semibold" htmlFor="species">
              Espécie*
            </label>
            <select
              onChange={handleSpeciesChange}
              className="w-full"
              name="species"
              id="species"
            >
              <option value="CACHORRO">Cachorro</option>
              <option value="GATO">Gato</option>
              <option value="OUTRO">Outro</option>
            </select>
            {isCustomSpecies && (
              <>
                <label className="font-semibold" htmlFor="customSpecies">
                  Especifique a espécie*
                </label>
                <input
                  className="w-full"
                  type="text"
                  name="customSpecies"
                  id="customSpecies"
                />
              </>
            )}
            <label className="font-semibold" htmlFor="breed">
              Raça
            </label>
            <input className="w-full" type="text" name="breed" id="breed" />
            <label className="font-semibold" htmlFor="name">
              Nome
            </label>
            <input className="w-full" type="text" name="name" id="name" />
            <label className="font-semibold" htmlFor="gender">
              Sexo
            </label>
            <select className="w-full" name="gender" id="gender">
              <option value="FEMEA">Fêmea</option>
              <option value="MACHO">Macho</option>
            </select>
            <label className="font-semibold" htmlFor="birthdate">
              Data de nascimento
            </label>
            <input
              className="w-full"
              id="birthdate"
              name="birthdate"
              type="date"
            />
            <label className="font-semibold" htmlFor="age">
              Idade
            </label>
            <input className="w-full" type="number" id="age" name="age" />
            <label className="font-semibold" htmlFor="description">
              Descrição
            </label>
            <textarea
              className="w-full"
              rows={3}
              name="description"
              id="description"
            ></textarea>
            <label className="font-semibold" htmlFor="healthCondition">
              Saúde (vacinas, doenças, etc.)
            </label>
            <textarea
              className="w-full"
              id="healthCondition"
              name="healthCondition"
              rows={3}
            />
            <label className="font-semibold" htmlFor="weight">
              Peso
            </label>
            <input
              className="w-full"
              type="number"
              step={0.01}
              id="weight"
              name="weight"
            />
            <label className="font-semibold" htmlFor="mainImage">
              Foto principal*
            </label>
            <ImageInput
              id="mainImage"
              name="mainImage"
              onChange={handleMainImageChange}
            />
            {mainImage && (
              <div className="w-full flex flex-col items-center">
                <h3>Foto principal selecionada:</h3>
                <div className="relative">
                  <img
                    src={URL.createObjectURL(mainImage)}
                    alt={`Imagem principal`}
                    className="w-full max-w-64 object-cover aspect-square rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeMainImage}
                    className="absolute top-0 right-0 bg-red-500 text-white py-1 px-3 rounded-full"
                  >
                    X
                  </button>
                </div>
              </div>
            )}
            <label className="font-semibold" htmlFor="extraImages">
              Fotos extras
            </label>
            <ImageInput
              id="extraImages"
              multiple
              onChange={handleExtraImageChange}
            />
            {extraImages.length > 0 && (
              <div className="w-full">
                <h3>Fotos extras selecionadas:</h3>
                <ul className="flex flex-wrap gap-2">
                  {extraImages.map((image, index) => (
                    <li key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Imagem extra ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeExtraImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white py-1 px-3 rounded-full"
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Button variant="constructive">Cadastrar</Button>
          </form>
        </div>
      )}
      {pageState === "LOADING" && <LoadingIcon className="h-32 w-32" />}
      {pageState === "ERROR" && (
        <h2 className="text-red-500 font-semibold text-xl">
          Erro ao cadastrar animal!
        </h2>
      )}
      {pageState === "SUCCESS" && (
        <>
          <h2 className="text-green-500 font-semibold text-xl">
            Animal Cadastrado!
          </h2>
          <div className="text-green-500">
            <FaCheckCircle size={68} />
          </div>

          <NavLink to="/user">Voltar</NavLink>
        </>
      )}
    </div>
  );
};

export default AnimalRegister;
