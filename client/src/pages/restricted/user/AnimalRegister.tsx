import { useNavigate } from "react-router-dom";
import Button from "../../../components/global/Button";
import { ChangeEvent, useState } from "react";
import { useAuth } from "../../../components/global/useAuth";
import ImageInput from "../../../components/global/ImageInput";

const AnimalRegister = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
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
  if (!authContext?.auth)
    return <h1 className="text-red-700 text-3xl">Acesso negado!</h1>;
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-center text-3xl font-dynapuff">
        Criar anúncio de doação
      </h1>
      <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
        <div className="flex flex-col gap-2 items-center">
          <h2>
            {`Criando anúncio de doação por `}
            <span className="font-bold">{authContext.auth.name}</span>
          </h2>
          <div className="inline">
            <span>CPF: </span>
            <span className="font-semibold">{authContext.auth.cpf}</span>
          </div>

          <h2 className="text-2xl font-semibold">Dados do animal</h2>
          {/*Substituir div acima por form*/}
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
          <input className="w-full" type="text" id="name" />
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
          <input className="w-full" id="birthdate" type="date" />
          <label className="font-semibold" htmlFor="age">
            Idade
          </label>
          <input className="w-full" type="number" />
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
          <textarea className="w-full" id="healthCondition" rows={3} />
          <label className="font-semibold" htmlFor="weight">
            Peso
          </label>
          <input className="w-full" type="number" step={0.01} id="weight" />
          <label className="font-semibold" htmlFor="mainImage">
            Foto principal*
          </label>
          <ImageInput id="5" onChange={handleMainImageChange} />
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
          <Button
            variant="constructive"
            onClick={() => {
              navigate("/user");
            }}
          >
            Cadastrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnimalRegister;
