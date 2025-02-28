import { useParams } from "react-router-dom";
import SolicitationsList from "../../../components/global/SolicitationsList";
import { shelters } from "../../../assets/exampleData";

const ShelterRequests = () => {
  const { shelterId } = useParams<{ shelterId: string }>();
  const shelter = shelters.find((shelter) => shelter.id === Number(shelterId));
  if (!shelter) {
    return <h1>Instituição não encontrado!</h1>;
  }
  return (
    <div className="flex flex-col w-full items-center gap-2 ">
      <h1 className="text-blue-700 font-dynapuff text-3xl">
        {`Solicitações de ${shelter?.name}`}
      </h1>
      <SolicitationsList person={shelter} />
    </div>
  );
};

export default ShelterRequests;
