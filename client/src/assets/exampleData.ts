import { AnimalType } from "../types/animal";
import { ShelterType } from "../types/shelter";
import { UserType } from "../types/user";

const users: UserType[] = [
  {
    id: 1,
    name: "Guilherme Pimenta",
    birthDate: "1999-01-01",
    email: "example@gmail.com",
    password: "123456",
    cpf: "123.456.789-00",
    phone: "(11) 99999-9999",
    address: "Rua das Margaridas",
    complement: null,
    number: "123",
    neighborhood: "Jardim das Flores",
    city: "São Paulo",
    state: "SP",
    postalCode: "12345-678",
    imgUrl:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    shelters: [],
    animals: [],
  },
];

const animals: AnimalType[] = [
  {
    user: users[0],
    id: 1,
    name: "Nick",
    gender: "MACHO",
    description: "Cachorro muito brincalhão",
    birthDate: new Date("2019-01-01"),
    age: null,
    species: "CACHORRO",
    customSpecies: null,
    breed: null,
    healthCondition: "Vacinado contra raiva",
    weight: 10,
    imgUrl:
      "https://images.dog.ceo/breeds/havanese/00100trPORTRAIT_00100_BURST20191112123933390_COVER.jpg",
  },
  {
    user: users[0],
    id: 2,
    name: "Lucy",
    gender: "FEMEA",
    description: "Amorosa e brincalhona",
    birthDate: new Date("2021-01-08"),
    age: null,
    species: "CACHORRO",
    customSpecies: null,
    breed: null,
    healthCondition: "Vacinada",
    weight: null,
    imgUrl: "https://images.dog.ceo/breeds/puggle/IMG_090821.jpg",
  },
  {
    user: users[0],
    id: 3,
    name: "Thor",
    gender: "MACHO",
    description: null,
    birthDate: null,
    age: null,
    species: "GATO",
    customSpecies: null,
    breed: null,
    healthCondition: "",
    weight: null,
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1667030474693-6d0632f97029?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    user: users[0],
    id: 4,
    name: "Mel",
    gender: "FEMEA",
    description: "Idosa",
    birthDate: new Date("2010-07-15"),
    age: null,
    species: "GATO",
    customSpecies: null,
    breed: null,
    healthCondition: "",
    weight: 1.5,
    imgUrl:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1443&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const shelters: ShelterType[] = [
  {
    id: 1,
    name: "Abrigo Casa do Pelo",
    cnpj: "12. 345. 678/0001-09",
    phone: "(12)93456-7890",
    address: "Rua do mato",
    complement: "Galpão 1",
    number: "999",
    neighborhood: "Parque das Gaivotas",
    city: "São Paulo",
    state: "São Paulo",
    postalCode: "12345-67",
    imgUrl: null,
    users: [],
  },
];

shelters[0].users.push(users[0]);
users[0].shelters.push(shelters[0]);

export { animals, users, shelters };
