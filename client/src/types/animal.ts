import { ShelterType } from "./shelter";
import { UserType } from "./user";

type Species = "CACHORRO" | "GATO" | "OUTRO";
type AnimalGender = "MACHO" | "FEMEA";

interface AnimalType {
  id: number;
  name: string | null;
  gender: AnimalGender;
  description: string | null;
  birthDate: Date | null;
  age: number | null;
  species: Species | null;
  customSpecies: string | null;
  breed: string | null;
  healthCondition: string | null;
  weight: number | null;
  donator: UserType | ShelterType;
  adopter: UserType | ShelterType | null;
  imgUrls: string[];
}

export { type AnimalType, type Species };
