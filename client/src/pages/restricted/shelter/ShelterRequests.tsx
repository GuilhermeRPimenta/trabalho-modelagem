import { useParams } from "react-router-dom";
import SolicitationsList from "../../../components/global/SolicitationsList";
import { useCallback, useEffect, useState } from "react";
import LoadingIcon from "../../../components/global/LoadingIcon";
import apiBaseUrl from "../../../apiBaseUrl";

const ShelterRequests = () => {
  const { institutionId } = useParams<{ institutionId: string }>();
  const [pageState, setPageState] = useState<"LOADING" | "SUCCESS" | "ERROR">(
    "LOADING"
  );
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [institutionName, setInstitutionName] = useState("");
  const fetchInstitutionName = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/institution/fetchForInstitutionHome/${institutionId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        console.log(response);
        setInstitutionName("[ERRO!]");
        return;
      }
      const institution = await response.json();
      setInstitutionName(institution.name);
    } catch (e) {
      console.log(e);
    }
  }, [institutionId]);
  const fetchAdoptionRequests = useCallback(async () => {
    setPageState("LOADING");
    try {
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
    void fetchInstitutionName();
    void fetchAdoptionRequests();
  }, [fetchAdoptionRequests, fetchInstitutionName]);
  if (pageState === "SUCCESS")
    return (
      <div className="flex flex-col w-full items-center gap-2 ">
        <h1 className="text-blue-700 font-dynapuff text-3xl">
          {`Solicitações de ${institutionName}`}
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
