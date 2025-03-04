import { useParams } from "react-router-dom";
import SolicitationsList from "../../../components/global/SolicitationsList";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../components/global/useAuth";
import LoadingIcon from "../../../components/global/LoadingIcon";
import apiBaseUrl from "../../../apiBaseUrl";

const ShelterRequests = () => {
  const { institutionId } = useParams<{ institutionId: string }>();
  const authContext = useAuth();
  const [pageState, setPageState] = useState<"LOADING" | "SUCCESS" | "ERROR">(
    "LOADING"
  );
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const fetchAdoptionRequests = useCallback(async () => {
    setPageState("LOADING");
    try {
      console.log("ENTROU");
      const response = await fetch(
        `${apiBaseUrl}/institution/${institutionId}/fetchRequests`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        setPageState("ERROR");
        return;
      }
      const adoptionRequests = await response.json();
      setAdoptionRequests(adoptionRequests);
      setPageState("SUCCESS");
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  }, [institutionId]);

  useEffect(() => {
    void fetchAdoptionRequests();
  }, [fetchAdoptionRequests]);
  if (pageState === "SUCCESS")
    return (
      <div className="flex flex-col w-full items-center gap-2 ">
        <h1 className="text-blue-700 font-dynapuff text-3xl">
          {`Solicitações de ${authContext.auth.user?.name}`}
        </h1>
        <SolicitationsList
          fetchAdoptionRequests={fetchAdoptionRequests}
          adoptionRequests={adoptionRequests}
        />
      </div>
    );
  else if (pageState === "LOADING")
    return <LoadingIcon className="h-32 w-32" />;
  else if (pageState === "ERROR")
    return <h1 className="text-red-500 text-xl font-semibold">Erro!</h1>;
};

export default ShelterRequests;
