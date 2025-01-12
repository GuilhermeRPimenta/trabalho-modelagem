import { AnimalType } from "../types/animal";

const animals: AnimalType[] = [
  {
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

export { animals };
