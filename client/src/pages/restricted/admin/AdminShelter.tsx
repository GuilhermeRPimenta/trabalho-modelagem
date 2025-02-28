import { useParams } from "react-router-dom";
import { animals, shelters } from "../../../assets/exampleData";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import AnimalCardList from "../../../components/global/AnimalCardList";
import Button from "../../../components/global/Button";
import NavLink from "../../../components/global/NavLink";

const AdminShelter = () => {
  const { shelterId } = useParams<{ shelterId: string }>();
  const shelter = shelters.find((shelter) => shelter.id === Number(shelterId));

  if (!shelter) {
    return (
      <div className="flex flex-col w-full  justify-center items-center gap-2">
        <h1 className="text-blue-700 text-3xl font-dynapuff">
          Administrar instituições
        </h1>
        <h2>Instituição não encontrada!</h2>
      </div>
    );
  }
  const animalsInDonation = animals.filter(
    (animal) =>
      animal.donator?.id === shelter?.id &&
      !animal.adopter &&
      animal.donatorType === "SHELTER"
  );

  const adoptedAnimals = animals.filter(
    (animal) =>
      animal.adopter?.id === shelter.id && animal.adopterType === "SHELTER"
  );

  const donatedAnimals = animals.filter(
    (animal) =>
      animal.donator.id === shelter.id &&
      animal.adopter &&
      animal.donatorType === "SHELTER"
  );

  return (
    <div className="flex flex-col w-full  items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">
        Administrar instituições
      </h1>
      <div className="flex flex-col lg:flex-row gap-2 lg:items-start items-center">
        <img
          src={`${shelter.imgUrl}`}
          alt="Imagem da instituição"
          className=" aspect-square h-full max-h-[300px] object-cover rounded-lg"
        />

        <div>
          <h2 className="text-3xl font-semibold">{shelter.name}</h2>
          <p className="flex items-center text-lg">Id: {shelter.id}</p>
          <p className="flex items-start text-lg">
            <span className="flex items-center mt-1 mr-1">
              <CiLocationOn />
            </span>
            {shelter.address}, {shelter.number}
            {shelter.complement && " | " + `${shelter.complement}`},{" "}
            {shelter.neighborhood}, {shelter.city} - {shelter.state}
          </p>
          <p className="flex items-center text-lg">CEP: {shelter.postalCode}</p>
          <p className="flex items-center text-lg">CNPJ: {shelter.cnpj}</p>
          <p className="flex items-center text-lg">
            <span className="flex items-start mt-1 mr-1">
              <MdOutlineMail />
            </span>
            {shelter.email}
          </p>

          <p className="flex items-start text-lg">
            <span className="flex items-center mt-1 mr-1">
              <FaWhatsapp />
            </span>
            {shelter.phone}
          </p>
          <p className="flex items-start text-lg">
            Data de fundação:{" "}
            {shelter.foundationDate.toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
          <p className="flex items-start text-lg">
            Registrado em:{" "}
            {shelter.createdAt.toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
          <div className="flex justify-center lg:justify-start">
            <Button variant="desctructive">Exluir instituição</Button>
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-semibold">Colaboradores:</h3>
      <ul
        className="w-fit flex flex-col gap-1 p-2"
        style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.45)" }}
      >
        {shelter.users
          .filter((user) => user.role === "ADMINISTRATOR")
          .map((u, index) => {
            const user = u.user;
            return (
              <li key={index} className="bg-yellow-100 flex justify-center p-2">
                <div className="flex flex-col w-full sm:flex-row gap-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="font-semibold">{user.name}</h2>
                    <p>Id: {user.id}</p>
                    <p>
                      {user.neighborhood}, {user.city}, {user.state}
                    </p>
                    <strong className="text-red-500"> RESPONSÁVEL</strong>
                  </div>
                  <div className="flex items-center ml-auto justify-center">
                    <NavLink to={`/admin/users/${user.id}`}>Ver mais</NavLink>
                  </div>
                </div>
              </li>
            );
          })}
        {shelter.users
          .filter((user) => user.role === "COLLABORATOR")
          .map((u, index) => {
            const user = u.user;
            return (
              <li key={index} className="bg-blue-100 flex justify-center p-2">
                <div className="flex flex-col w-full sm:flex-row gap-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="font-semibold">{user.name}</h2>
                    <p>Id: {user.id}</p>
                    <p>
                      {user.neighborhood}, {user.city}, {user.state}
                    </p>
                  </div>
                  <div className="flex items-center ml-auto justify-center ">
                    <NavLink to={`/admin/users/${user.id}`}>Ver mais</NavLink>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>

      {animalsInDonation.length > 0 && (
        <>
          <h3 className="text-2xl font-semibold">Animais em adoção: </h3>
          <AnimalCardList
            customBaseUrl="/admin/animals"
            animals={animalsInDonation}
          />
        </>
      )}
      {donatedAnimals.length > 0 && (
        <>
          <h3 className="text-2xl font-semibold">Animais doados:</h3>
          <AnimalCardList
            customBaseUrl="/admin/animals"
            animals={donatedAnimals}
          />
        </>
      )}
      {adoptedAnimals.length > 0 && (
        <>
          <h3 className="text-2xl font-semibold">Animais adotados:</h3>
          <AnimalCardList
            customBaseUrl="/admin/animals"
            animals={adoptedAnimals}
          />
        </>
      )}
    </div>
  );
};

export default AdminShelter;
