import SolicitationsList from "../../../components/global/SolicitationsList";
import { useAuth } from "../../../components/global/useAuth";

const UserRequests = () => {
  const authContext = useAuth();
  if (!authContext?.auth) {
    return <h1>Acesso negado!</h1>;
  }
  return (
    <div className="flex flex-col w-full items-center gap-2 ">
      <h1 className="text-blue-700 font-dynapuff text-3xl">
        {`Solicitações de ${authContext.auth.name}`}
      </h1>
      <SolicitationsList person={authContext.auth} />
    </div>
  );
};

export default UserRequests;
