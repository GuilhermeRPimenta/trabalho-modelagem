import { BrazilianState } from "./states";
import { UserType } from "./user";

interface ShelterType {
  id: number;
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  address: string;
  complement: string | null;
  number: string;
  neighborhood: string;
  city: string;
  state: BrazilianState;
  postalCode: string;
  imgUrl: string | null;
  users: UserType[];
}

export { type ShelterType };
