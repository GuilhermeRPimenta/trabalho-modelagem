import { AnimalType } from "./animal";
import { ShelterType } from "./shelter";

interface UserType {
  id: string;
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
  state: string;
  postalCode: string;
  imgUrl: string | null;
  shelters: ShelterType[];
  animals: AnimalType[];
}

interface UserPublicData {
  id: string;
  name: string;
  address: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

export { type UserType, type UserPublicData };
