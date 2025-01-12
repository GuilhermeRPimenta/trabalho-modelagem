import { useNavigate } from "react-router-dom";
import Button from "../../../components/global/Button";
import { ChangeEvent, useState } from "react";

const AnimalRegister = () => {
  const navigate = useNavigate();
  const [isCustomSpecies, setIsCustomSpecies] = useState(false);
  const handleSpeciesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "OUTRO") setIsCustomSpecies(true);
    else setIsCustomSpecies(false);
  };
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-center text-3xl font-dynapuff">
        Criar anúncio de doação
      </h1>
      <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-2xl font-semibold">Dados do animal</h2>
          {/*Substituir div acima por form*/}
          <label htmlFor="species">Espécie*</label>
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
              <label htmlFor="customSpecies">Especifique a espécie*</label>
              <input
                className="w-full"
                type="text"
                name="customSpecies"
                id="customSpecies"
              />
            </>
          )}
          <label htmlFor="breed">Raça</label>
          <input className="w-full" type="text" name="breed" id="breed" />
          <label htmlFor="name">Nome</label>
          <input className="w-full" type="text" id="name" />
          <label htmlFor="gender">Sexo</label>
          <select className="w-full" name="gender" id="gender">
            <option value="FEMEA">Fêmea</option>
            <option value="MACHO">Macho</option>
          </select>
          <label htmlFor="birthdate">Data de nascimento</label>
          <input className="w-full" id="birthdate" type="date" />
          <label htmlFor="age">Idade</label>
          <input className="w-full" type="number" />
          <label htmlFor="description">Descrição</label>
          <textarea rows={3} name="description" id="description"></textarea>
          <label htmlFor="healthCondition">
            Saúde (vacinas, doenças, etc.)
          </label>
          <textarea className="w-full" id="healthCondition" rows={3} />
          <label htmlFor="weight">Peso</label>
          <input type="number" step={0.01} id="weight" />
          <label htmlFor="userImage">Foto*</label>
          <input
            className="w-full"
            type="file"
            accept="image/png, image/jpeg"
            id="userImage"
          />
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
