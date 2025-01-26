import { useParams } from "react-router-dom";
import { useAuth } from "../../../components/global/useAuth";
import { shelters } from "../../../assets/exampleData";
import NavLink from "../../../components/global/NavLink";

const ShelterHome = () => {
  const authContext = useAuth();
  const { shelterId } = useParams<{ shelterId: string }>();
  if (!authContext?.auth)
    return <h1 className="text-red-700 text-3xl">Acesso negado!</h1>;

  const shelter = shelters.find((shelter) => shelter.id === Number(shelterId));
  if (
    !shelter ||
    !shelter.users.find((user) => user.user.id === authContext.auth?.id)
  )
    return <h1 className="text-red-700 text-3xl">Acesso negado!</h1>;
  return (
    <div className="flex flex-col w-full   justify-center items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">
        {`${shelter.name}`}
      </h1>
      <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
        <div className="flex flex-col gap-2 items-center">
          {/*Substituir div acima por form*/}
          <h2 className="text-2xl font-semibold">Animais do abrigo</h2>
          <div className="flex sm:flex-row flex-col text-center gap-2 w-full">
            <NavLink to="adoptedAnimals" className="w-full">
              Adotados
            </NavLink>
            <NavLink to="donatedAnimals" className="w-full">
              Doados
            </NavLink>
            <NavLink to="animalsInDonation" className="w-full">
              Em adoção
            </NavLink>
            <NavLink to="adoptionRequests" className="w-full">
              Solicitações do abrigo
            </NavLink>
            <NavLink
              to={`/shelters/${shelterId}/animalRegister`}
              variant="constructive"
              className="w-full"
            >
              Criar anuncio
            </NavLink>
          </div>
        </div>
      </div>
      {shelter.users.find((user) => user.role === "ADMINISTRATOR")?.user.id ===
        authContext.auth.id && (
        <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
          <h2 className="text-2xl font-semibold">Área de administrador</h2>
          <NavLink to={`/shelters/${shelterId}/admin`}>Admin</NavLink>
        </div>
      )}
    </div>
  );
};

export default ShelterHome;
