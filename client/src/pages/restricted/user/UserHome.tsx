import { CiLogout } from "react-icons/ci";
import Button from "../../../components/global/Button";
import { useAuth } from "../../../components/global/useAuth";
import { useNavigate } from "react-router-dom";
import NavLink from "../../../components/global/NavLink";

const UserHome = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:7000/user/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        authContext?.setAuth(null);
        navigate("/login");
      } else {
        console.log("Error ao deslogar");
      }
    } catch (e) {
      console.log(e);
    }
  };
  if (!authContext?.auth)
    return (
      <h1 className="text-blue-red text-center text-3xl font-dynapuff">
        Acesso negado
      </h1>
    );
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-center text-3xl font-dynapuff">
        Bem vindo(a), {authContext.auth.name}
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
          <h2 className="text-center text-2xl font-semibold">Meus animais</h2>
          <div className="flex sm:flex-row flex-col text-center gap-2">
            <NavLink to="/user/adoptedAnimals" className="w-full">
              Adotados
            </NavLink>
            <NavLink to="/user/donatedAnimals" className="w-full">
              Doados
            </NavLink>
            <NavLink to="/user/animalsInDonation" className="w-full">
              Em adoção
            </NavLink>
            <NavLink to="adoptionRequests" className="w-full">
              Minhas solicitações
            </NavLink>
            <NavLink
              to="/user/animalRegister"
              variant="constructive"
              className="w-full"
            >
              Criar anuncio
            </NavLink>
          </div>
        </div>
        <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
          <h2 className="text-center text-2xl font-semibold">Abrigos</h2>
          <div className="flex sm:flex-row flex-col gap-2 text-center">
            <NavLink to={`shelters`} className="w-full">
              Meus abrigos
            </NavLink>

            <NavLink to="/shelterRegister" variant="constructive">
              Cadastrar abrigo
            </NavLink>
          </div>
        </div>
        <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
          <h2 className="text-center text-2xl font-semibold">Cadastro</h2>
          <div className="flex sm:flex-row flex-col gap-2">
            <NavLink to="/user/edit" className="w-full">
              Editar
            </NavLink>
          </div>
        </div>
        <div className="justify-center flex">
          <Button
            variant="desctructive"
            className="w-32"
            onClick={handleLogout}
          >
            <CiLogout />
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
