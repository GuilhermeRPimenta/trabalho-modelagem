import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/global/Button";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "../../../components/global/useAuth";
import ImageInput from "../../../components/global/ImageInput";
import { animals, shelters } from "../../../assets/exampleData";
import { Species } from "../../../types/animal";

const ShelterEditAnimal = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const { shelterId } = useParams<{ shelterId: string }>();
  const [isCustomSpecies, setIsCustomSpecies] = useState(false);
  const [mainImage, setMainImage] = useState<File | string>();
  const [extraImages, setExtraImages] = useState<{
    newImgs: File[];
    oldImgs: string[];
  }>({ newImgs: [], oldImgs: [] });
  const { animalId } = useParams<{ animalId: string }>();
  const animal = animals.find((animal) => animal.id === Number(animalId));
  const shelter = shelters.find((shelter) => shelter.id === Number(shelterId));
  useEffect(() => {
    if (!animal) return;
    setIsCustomSpecies(animal.customSpecies ? true : false);
    setMainImage(animal.imgUrls[0]);
    setExtraImages({ newImgs: [], oldImgs: animal.imgUrls.slice(1) });
  }, [animal]);
  if (!authContext?.auth)
    return <h1 className="text-red-700 text-3xl">Acesso negado!</h1>;
  if (
    !shelter ||
    !shelter.users.find((user) => user.user.id === authContext.auth?.id)
  )
    return <h1 className="text-red-700 text-3xl">Acesso negado!</h1>;
  if (!animal)
    return (
      <h1 className="font-dynapuff text-3xl text-blue-500">
        Animal não encontrado
      </h1>
    );

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
    if (selectedFiles.length + extraImages.newImgs.length > 9) {
      alert("Você pode enviar no máximo 10 fotos.");
      return;
    }
    setExtraImages((prevImages) => ({
      ...prevImages,
      newImgs: [...prevImages.newImgs, ...selectedFiles],
    }));
  };
  const removeExtraImage = (index: number, isOld: boolean) => {
    setExtraImages((prev) => {
      if (isOld) {
        return { ...prev, oldImgs: prev.oldImgs.filter((_, i) => i !== index) };
      } else {
        return { ...prev, newImgs: prev.newImgs.filter((_, i) => i !== index) };
      }
    });
  };
  if (!authContext?.auth)
    return <h1 className="text-red-700 text-3xl">Acesso negado!</h1>;
  if (!animal) {
    return <h1 className="text-red-700 text-3xl">Animal não encontrado!</h1>;
  }
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-center text-3xl font-dynapuff">
        Editar anúncio de doação
      </h1>
      <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
        <div className="flex flex-col gap-2 items-center">
          <h2>
            {`Editando anúncio de doação por `}
            <span className="font-bold">{shelter.name}</span>
          </h2>
          <p>CNPJ: {shelter.cnpj}</p>
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
            defaultValue={animal.species as Species}
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
                defaultValue={animal.customSpecies ? animal.customSpecies : ""}
              />
            </>
          )}
          <label className="font-semibold" htmlFor="breed">
            Raça
          </label>
          <input
            className="w-full"
            type="text"
            name="breed"
            id="breed"
            defaultValue={animal.breed ? animal.breed : ""}
          />
          <label className="font-semibold" htmlFor="name">
            Nome
          </label>
          <input
            className="w-full"
            type="text"
            id="name"
            defaultValue={animal.name ? animal.name : ""}
          />
          <label className="font-semibold" htmlFor="gender">
            Sexo
          </label>
          <select
            className="w-full"
            name="gender"
            id="gender"
            defaultValue={animal.gender}
          >
            <option value="FEMEA">Fêmea</option>
            <option value="MACHO">Macho</option>
          </select>
          <label className="font-semibold" htmlFor="birthdate">
            Data de nascimento
          </label>
          <input
            className="w-full"
            id="birthdate"
            type="date"
            defaultValue={
              animal.birthDate
                ? animal.birthDate.toISOString().split("T")[0]
                : ""
            }
          />
          <label className="font-semibold" htmlFor="age">
            Idade
          </label>
          <input
            className="w-full"
            type="number"
            defaultValue={animal.age ? animal.age : ""}
          />
          <label className="font-semibold" htmlFor="description">
            Descrição
          </label>
          <textarea
            className="w-full"
            rows={3}
            name="description"
            id="description"
            defaultValue={animal.description ? animal.description : ""}
          ></textarea>
          <label className="font-semibold" htmlFor="healthCondition">
            Saúde (vacinas, doenças, etc.)
          </label>
          <textarea
            className="w-full"
            id="healthCondition"
            rows={3}
            defaultValue={animal.healthCondition ? animal.healthCondition : ""}
          />
          <label className="font-semibold" htmlFor="weight">
            Peso
          </label>
          <input
            className="w-full"
            type="number"
            step={0.01}
            id="weight"
            defaultValue={animal.weight ? animal.weight : ""}
          />
          <label className="font-semibold" htmlFor="mainImage">
            Foto principal*
          </label>
          <ImageInput id="5" onChange={handleMainImageChange} />
          {mainImage && (
            <div className="w-full flex flex-col items-center">
              <h3>Foto principal selecionada:</h3>
              <div className="relative">
                <img
                  src={
                    typeof mainImage === "string"
                      ? mainImage
                      : URL.createObjectURL(mainImage)
                  }
                  alt={`Imagem principal`}
                  className="w-full max-w-64 object-cover rounded-lg"
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
          {(extraImages.oldImgs.length > 0 ||
            extraImages.newImgs.length > 0) && (
            <div className="w-full">
              <h3>Fotos extras selecionadas:</h3>
              <ul className="flex flex-wrap gap-2">
                {extraImages.oldImgs.map((img, index) => (
                  <li key={`old-${index}`} className="relative">
                    <img
                      src={img}
                      alt={`Imagem extra ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeExtraImage(index, true)}
                      className="absolute top-0 right-0 bg-red-500 text-white py-1 px-3 rounded-full"
                    >
                      X
                    </button>
                  </li>
                ))}
                {extraImages.newImgs.map((file, index) => (
                  <li key={`new-${index}`} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Imagem extra nova ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeExtraImage(index, false)}
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
            Editar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShelterEditAnimal;
