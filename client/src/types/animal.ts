import { Person } from "./person";
import { ShelterType } from "./shelter";
import { BrazilianState } from "./states";
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
  donatorType: Person;
  adopterType: Person | null;
  userRequests: {
    createdAt: Date;
    justification: string | null;
    user: UserType;
  }[];
  shelterRequests: {
    createdAt: Date;
    justification: string | null;
    shelter: ShelterType;
  }[];
  imgUrls: string[];
}

interface RequestType {
  name: string;
  personType: Person;
  phone: string;
  email: string;
  neighborhood: string;
  city: string;
  state: BrazilianState;
  createdAt: Date;
  justification: string | null;
}

export { type AnimalType, type Species, type RequestType };
