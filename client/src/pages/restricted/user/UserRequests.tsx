import { useEffect, useState } from "react";
import SolicitationsList from "../../../components/global/SolicitationsList";
import { useAuth } from "../../../components/global/useAuth";
import LoadingIcon from "../../../components/global/LoadingIcon";
import apiBaseUrl from "../../../apiBaseUrl";

const UserRequests = () => {
  const authContext = useAuth();
  const [pageState, setPageState] = useState<"LOADING" | "SUCCESS" | "ERROR">(
    "LOADING"
  );
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const fetchAdoptionRequests = async () => {
    setPageState("LOADING");
    try {
      console.log("ENTROU");
      const response = await fetch(`${apiBaseUrl}/user/fetchRequests`, {
        method: "GET",
        credentials: "include",
      });
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
  };

  useEffect(() => {
    void fetchAdoptionRequests();
  }, []);
  if (pageState === "SUCCESS")
    return (
      <div className="flex flex-col w-full items-center gap-2 ">
        <h1 className="text-blue-700 font-dynapuff text-3xl">
          {`Solicitações de ${authContext.auth.user?.name}`}
        </h1>
        <SolicitationsList adoptionRequests={adoptionRequests} />
      </div>
    );
  else if (pageState === "LOADING")
    return <LoadingIcon className="h-32 w-32" />;
  else if (pageState === "ERROR")
    return <h1 className="text-red-500 text-xl font-semibold">Erro!</h1>;
};

export default UserRequests;
