import { BrazilianState } from "./states";
import { UserType } from "./user";

type UserRoleInShelter = "ADMINISTRATOR" | "COLLABORATOR";

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
  users: { user: UserType; role: UserRoleInShelter; addedAt: Date }[];
  foundationDate: Date;
  createdAt: Date;
}

export { type ShelterType };
