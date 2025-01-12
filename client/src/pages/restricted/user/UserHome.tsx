import { CiLogout } from "react-icons/ci";
import Button from "../../../components/global/Button";
import { useAuth } from "../../../components/global/useAuth";
import { useNavigate } from "react-router-dom";
import NavLink from "../../../components/global/NavLink";

const UserHome = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-center text-3xl font-dynapuff">
        Bem vindo(a), {authContext?.auth?.name}
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
          <h2 className="text-center text-2xl font-semibold">Meus animais</h2>
          <div className="flex sm:flex-row flex-col gap-2">
            <Button className="w-full">Adotados</Button>
            <Button className="w-full">Doados</Button>
            <Button className="w-full">Em adoção</Button>
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
          <h2 className="text-center text-2xl font-semibold">Meus abrigos</h2>
          <div className="flex sm:flex-row flex-col gap-2">
            <Button className="w-full">Abrigo dogs</Button>
            <Button className="w-full">Abrigo placeholder</Button>
          </div>
        </div>
        <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
          <h2 className="text-center text-2xl font-semibold">Cadastro</h2>
          <div className="flex sm:flex-row flex-col gap-2">
            <Button className="w-full">Editar</Button>
          </div>
        </div>
        <div className="justify-center flex">
          <Button
            onClick={() => {
              authContext?.setAuth(null);
              navigate("/login");
            }}
            variant="desctructive"
            className="w-32"
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
