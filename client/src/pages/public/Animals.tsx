import { animals } from "../../assets/exampleData";
import { BsGenderFemale } from "react-icons/bs";
import { BsGenderMale } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Animals = () => {
  const unadoptedAnimals = animals.filter((animal) => !animal.adopter);

  return (
    <div className="flex flex-col w-full items-center gap-2 ">
      <h1 className="text-blue-700 font-dynapuff text-3xl">Animais</h1>
      <div className="flex flex-wrap gap-2 justify-center">
        {unadoptedAnimals.map((animal) => (
          <NavLink
            to={`${animal.id}`}
            key={animal.id}
            className="bg-blue-100 flex flex-col gap-2 shadow-lg items-center text-center p-4 rounded-sm hover:bg-blue-200 hover:cursor-pointer w-full max-w-96 group"
          >
            <h2 className="font-semibold text-xl group-hover:underline">
              {animal.name}
            </h2>

            <img
              className="w-64 aspect-square  rounded-md"
              src={animal.imgUrls[0]}
            />
            <p>{animal.species ? animal.species : animal.customSpecies}</p>
            <div className="flex flex-row">
              {animal.gender === "MACHO" ? (
                <>
                  <BsGenderMale size={24} />
                  <p>Macho</p>
                </>
              ) : (
                <>
                  <BsGenderFemale size={24} />
                  <p>Fêmea</p>
                </>
              )}
            </div>
            <p>{animal.description}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Animals;
