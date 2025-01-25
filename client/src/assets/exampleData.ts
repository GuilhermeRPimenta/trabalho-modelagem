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
    adoptedAnimals: [],
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Rapahel Sotto-Maior",
    birthDate: "1990-06-08",
    email: "example2@gmail.com",
    password: "123456",
    cpf: "456.456.789-99",
    phone: "(11) 90000-9999",
    address: "Rua das Gaivotas",
    complement: null,
    number: "954",
    neighborhood: "Parque Ensolarado",
    city: "São Paulo",
    state: "SP",
    postalCode: "48951-678",
    imgUrl:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    shelters: [],
    animals: [],
    adoptedAnimals: [],
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Bruno Edson",
    birthDate: "1995-09-10",
    email: "example3@gmail.com",
    password: "123456",
    cpf: "534.456.476-99",
    phone: "(11) 91111-7777",
    address: "Rua dos Pinheiros",
    complement: "Apartamento 201, bloco 3",
    number: "546",
    neighborhood: "São Marcos",
    city: "São Paulo",
    state: "SP",
    postalCode: "98517-824",
    imgUrl:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    shelters: [],
    animals: [],
    adoptedAnimals: [],
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "Francisco de Santa",
    birthDate: "1975-10-10",
    email: "example4@gmail.com",
    password: "123456",
    cpf: "534.545.476-99",
    phone: "(11) 92222-7777",
    address: "Rua Água Rasa",
    complement: "Apartamento 205, bloco 1",
    number: "1005",
    neighborhood: "São Caetano",
    city: "São Paulo",
    state: "SP",
    postalCode: "12478-824",
    imgUrl: null,
    shelters: [],
    animals: [],
    adoptedAnimals: [],
    createdAt: new Date(),
  },
  {
    id: 5,
    name: "Walter Santos",
    birthDate: "1984-12-09",
    email: "example5@gmail.com",
    password: "123456",
    cpf: "821.781.151-77",
    phone: "(11) 92222-1110",
    address: "Rua Dom Pedro",
    complement: null,
    number: "14",
    neighborhood: "São João",
    city: "São Paulo",
    state: "SP",
    postalCode: "54269-824",
    imgUrl:
      "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=400",
    shelters: [],
    animals: [],
    adoptedAnimals: [],
    createdAt: new Date(),
  },
];

const shelters: ShelterType[] = [
  {
    id: 1,
    name: "Abrigo Casa do Pelo",
    cnpj: "12.345.678/0001-09",
    phone: "(12)93456-7890",
    email: "contato@casadopelo.com",
    address: "Rua do mato",
    complement: "Galpão 1",
    number: "999",
    neighborhood: "Parque das Gaivotas",
    city: "São Paulo",
    state: "SP",
    postalCode: "12345-67",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/8454/8454352.png",
    users: [],
    foundationDate: new Date(953799656368),
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Instituto Atacauda",
    cnpj: "78.345.475/0001-09",
    phone: "(12)75555-7890",
    email: "contato@institutoatacauda.com",
    address: "Rua Barbosa",
    complement: null,
    number: "584",
    neighborhood: "Parque Solar",
    city: "São Paulo",
    state: "SP",
    postalCode: "12845-67",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/1491/1491099.png",
    users: [],
    foundationDate: new Date(753799646368),
    createdAt: new Date(),
  },
];

const animals: AnimalType[] = [
  {
    donator: users[1],
    adopter: null,
    donatorType: "USER",
    adopterType: null,
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
    userRequests: [],
    shelterRequests: [],
    imgUrls: [
      "https://images.dog.ceo/breeds/havanese/00100trPORTRAIT_00100_BURST20191112123933390_COVER.jpg",
    ],
  },
  {
    donator: users[1],
    adopter: null,
    donatorType: "USER",
    adopterType: null,
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
    userRequests: [],
    shelterRequests: [],
    imgUrls: ["https://images.dog.ceo/breeds/puggle/IMG_090821.jpg"],
  },
  {
    donator: users[2],
    adopter: null,
    donatorType: "USER",
    adopterType: null,
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
    userRequests: [],
    shelterRequests: [],
    imgUrls: [
      "https://plus.unsplash.com/premium_photo-1667030474693-6d0632f97029?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    donator: users[2],
    adopter: users[0],
    donatorType: "USER",
    adopterType: "USER",
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
    userRequests: [],
    shelterRequests: [],
    imgUrls: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1443&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    donator: users[0],
    adopter: users[1],
    donatorType: "USER",
    adopterType: "USER",
    id: 5,
    name: "Dauda",
    gender: "MACHO",
    description: "Dorminhoco",
    birthDate: null,
    age: 3,
    species: "GATO",
    customSpecies: null,
    breed: null,
    healthCondition: "",
    weight: 1.5,
    userRequests: [],
    shelterRequests: [],
    imgUrls: [
      "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  },
  {
    donator: users[0],
    adopter: null,
    donatorType: "USER",
    adopterType: null,
    id: 6,
    name: "Bishop",
    gender: "MACHO",
    description: "Muito esperto",
    birthDate: null,
    age: 1,
    species: "GATO",
    customSpecies: null,
    breed: null,
    healthCondition: "Tomou antirrábica",
    weight: 1,
    userRequests: [],
    shelterRequests: [],
    imgUrls: [
      "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  },
  {
    donator: users[0],
    adopter: null,
    donatorType: "USER",
    adopterType: null,
    id: 7,
    name: "Hackett",
    gender: "MACHO",
    description:
      "Laranja! At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat",
    birthDate: null,
    age: 3,
    species: "GATO",
    customSpecies: null,
    breed: null,
    healthCondition:
      "Tomou antirrábica Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
    weight: 1,
    userRequests: [],
    shelterRequests: [],
    imgUrls: [
      "https://images.pexels.com/photos/30247441/pexels-photo-30247441/free-photo-of-curious-orange-cat-sitting-in-istanbul.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/30247442/pexels-photo-30247442/free-photo-of-serene-orange-cat-resting-outdoors-in-istanbul.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/30237000/pexels-photo-30237000/free-photo-of-portrait-of-a-ginger-cat-outdoors.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1552613/pexels-photo-1552613.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  },
  {
    donator: users[0],
    adopter: null,
    donatorType: "USER",
    adopterType: null,
    id: 8,
    name: "Rambo",
    gender: "MACHO",
    description: "Canta muito bem",
    birthDate: null,
    age: 3,
    species: null,
    customSpecies: "GALO",
    breed: null,
    healthCondition: null,
    weight: 3,
    userRequests: [],
    shelterRequests: [],
    imgUrls: [
      "https://cdn.pixabay.com/photo/2016/07/10/17/15/cock-1508032_640.jpg",
      "https://cdn.pixabay.com/photo/2017/02/24/07/18/chicken-2094115_640.jpg",
    ],
  },
  {
    donator: users[0],
    adopter: shelters[0],
    donatorType: "USER",
    adopterType: "SHELTER",
    id: 9,
    name: "Doge",
    gender: "MACHO",
    description: "",
    birthDate: null,
    age: 5,
    species: "CACHORRO",
    customSpecies: null,
    breed: "Shiba Inu",
    healthCondition: "Tomou antirrábica",
    weight: 9,
    userRequests: [],
    shelterRequests: [],
    imgUrls: [
      "https://images.pexels.com/photos/8528933/pexels-photo-8528933.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/6588925/pexels-photo-6588925.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  },
  {
    donator: shelters[0],
    adopter: users[2],
    donatorType: "SHELTER",
    adopterType: "USER",
    id: 10,
    name: "Ulf",
    gender: "MACHO",
    description: "Se dá muito bem com crianças",
    birthDate: null,
    age: 6,
    species: "CACHORRO",
    customSpecies: null,
    breed: null,
    healthCondition: "Tomou antirrábica",
    weight: 8.5,
    userRequests: [],
    shelterRequests: [],
    imgUrls: [
      "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  },
  {
    donator: shelters[0],
    adopter: null,
    donatorType: "SHELTER",
    adopterType: null,
    id: 11,
    name: "Joy",
    gender: "FEMEA",
    description: "Ótima companhia para a família!",
    birthDate: null,
    age: 8,
    species: "CACHORRO",
    customSpecies: null,
    breed: null,
    healthCondition: "Tomou antirrábica",
    weight: 7.8,
    userRequests: [],
    shelterRequests: [],
    imgUrls: [
      "https://images.pexels.com/photos/1189673/pexels-photo-1189673.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  },
];

shelters[0].users.push({
  user: users[0],
  role: "ADMINISTRATOR",
  addedAt: new Date(1676484730000),
});
shelters[0].users.push({
  user: users[3],
  role: "COLLABORATOR",
  addedAt: new Date(1685034107000),
});
shelters[1].users.push({
  user: users[4],
  role: "ADMINISTRATOR",
  addedAt: new Date(1730231111000),
});
users[0].shelters.push(shelters[0]);
users[3].shelters.push(shelters[0]);
users[4].shelters.push(shelters[1]);

export { animals, users, shelters };
