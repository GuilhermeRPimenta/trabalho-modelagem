import { AnimalType } from "./animal";
import { ShelterType } from "./shelter";
import { BrazilianState } from "./states";

interface UserType {
  id: number;
  name: string;
  birthDate: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  address: string;
  complement: string | null;
  number: string;
  neighborhood: string;
  city: string;
  state: BrazilianState;
  postalCode: string;
  imgUrl: string | null;
  shelters: ShelterType[];
  animals: AnimalType[];
  adoptedAnimals: AnimalType[];
  adoptionRequests: {
    createdAt: Date;
    justification: string | null;
    animal: AnimalType;
  }[];
  createdAt: Date;
}

interface UserPublicData {
  id: string;
  name: string;
  address: string;
  number: string;
  neighborhood: string;
  city: string;
  state: BrazilianState;
}

export { type UserType, type UserPublicData };
