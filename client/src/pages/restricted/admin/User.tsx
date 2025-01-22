import { useParams } from "react-router-dom";
import { animals, users } from "../../../assets/exampleData";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import AnimalCardList from "../../../components/global/AnimalCardList";
import Button from "../../../components/global/Button";
import { NavLink } from "react-router-dom";
import brokenImage from "../../../assets/brokenImage.png";

const User = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = users.find((user) => user.id === Number(userId));

  if (!user) {
    return (
      <div className="flex flex-col w-full  justify-center items-center gap-2">
        <h1 className="text-blue-700 text-3xl font-dynapuff">
          Administrar usuários
        </h1>
        <h2>Usuário não encontrado!</h2>
      </div>
    );
  }
  const animalsInDonation = animals.filter(
    (animal) =>
      animal.donator?.id === user?.id &&
      !animal.adopter &&
      animal.donatorType === "USER"
  );

  const adoptedAnimals = animals.filter(
    (animal) => animal.adopter?.id === user.id && animal.adopterType === "USER"
  );

  const donatedAnimals = animals.filter(
    (animal) =>
      animal.donator.id === user.id &&
      animal.adopter &&
      animal.donatorType === "USER"
  );

  return (
    <div className="flex flex-col w-full  items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">
        Administrar usuários
      </h1>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-start items-center">
        <img
          src={`${user.imgUrl}`}
          alt="Imagem do usuário"
          className=" aspect-square h-full max-h-[204px] object-cover rounded-lg"
        />

        <div>
          <h2 className="text-3xl font-semibold">{user.name}</h2>
          <p className="flex items-center text-lg">
            <CiLocationOn />
            {user.address}, {user.number}
            {user.complement && " | " + `${user.complement}`},{" "}
            {user.neighborhood}, {user.city} - {user.state}
          </p>
          <p className="flex items-center text-lg">CEP: {user.postalCode}</p>
          <p className="flex items-center text-lg">CPF: {user.cpf}</p>
          <p className="flex items-center text-lg">
            <MdOutlineMail />
            {user.email}
          </p>

          <p className="flex items-center text-lg">
            <FaWhatsapp />
            {user.phone}
          </p>
          <p className="flex items-center text-lg">
            Data de nascimento: {user.birthDate}
          </p>
          <p className="flex items-center text-lg">
            Registrado em:{" "}
            {user.createdAt.toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
          <div className="flex justify-center sm:justify-start">
            <Button variant="desctructive">Exluir usuário</Button>
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-semibold">Animais em adoção: </h3>
      <AnimalCardList
        customBaseUrl="/admin/animals"
        animals={animalsInDonation}
      />
      <h3 className="text-2xl font-semibold">Animais doados:</h3>
      <AnimalCardList customBaseUrl="/admin/animals" animals={donatedAnimals} />
      <h3 className="text-2xl font-semibold">Animais adotados:</h3>
      <AnimalCardList customBaseUrl="/admin/animals" animals={adoptedAnimals} />

      <h3 className="text-2xl font-semibold">Abrigos: </h3>
      {user.shelters.map((shelter) => (
        <NavLink
          to={`/admin/shelters/${shelter.id}`}
          key={shelter.id}
          style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.45)" }}
          className="flex flex-col gap-2 items-center text-center p-1 rounded-sm transition-all duration-75 hover:bg-blue-100 hover:cursor-pointer w-full max-w-64 group"
        >
          <h4 className="font-semibold text-xl group-hover:underline">
            {shelter.name}
          </h4>
          <img
            className="w-full object-cover aspect-square  rounded-md"
            src={shelter.imgUrl ? shelter.imgUrl : brokenImage}
          />
          <p>
            {shelter.address}, {shelter.number}
            {shelter.complement && " | " + `${shelter.complement}`},{" "}
            {shelter.neighborhood}, {shelter.city} - {shelter.state}
          </p>
        </NavLink>
      ))}
    </div>
  );
};

export default User;
