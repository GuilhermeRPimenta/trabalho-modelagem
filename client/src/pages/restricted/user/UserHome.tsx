import Button from "../../../components/global/Button";
import { useAuth } from "../../../components/global/useAuth";

const UserHome = () => {
  const authContext = useAuth();
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
            <Button className="w-full">Criar anuncio</Button>
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
      </div>
    </div>
  );
};

export default UserHome;
