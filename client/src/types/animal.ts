type Species = "CACHORRO" | "GATO" | "OUTRO";
type AnimalGender = "MACHO" | "FEMEA";

interface AnimalType {
  id: string;
  name: string | null;
  gender: AnimalGender;
  description: string | null;
  birthDate: Date | null;
  age: number | null;
  species: Species;
  customSpecies: string | null;
  breed: string | null;
  healthCondition: string | null;
  weight: number | null;
  imgUrl: string;
}

export { type AnimalType, type Species };
