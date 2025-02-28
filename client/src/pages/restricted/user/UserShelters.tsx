import SheltersCardList from "../../../components/global/SheltersCardList";
import { useAuth } from "../../../components/global/useAuth";
import { useEffect, useState } from "react";
import apiBaseUrl from "../../../apiBaseUrl";
import LoadingIcon from "../../../components/global/LoadingIcon";

const UserShelters = () => {
  const authContext = useAuth();
  const [pageState, setPageState] = useState<"LOADING" | "SUCCESS" | "ERROR">(
    "LOADING"
  );
  const [institutions, setInstitutions] = useState<
    {
      id: number;
      name: string;
      neighborhood: string;
      city: string;
      state: string;
      imgUrl: string;
      userInstitution: {
        role: string;
      }[];
    }[]
  >([]);
  const fetchInsitutions = async () => {
    setPageState("LOADING");
    try {
      const response = await fetch(`${apiBaseUrl}/user/fetchInstitutions`, {
        method: "GET",
        credentials: "include",
      });
      const institutions = await response.json();
      setInstitutions(institutions);
      setPageState("SUCCESS");
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  };
  useEffect(() => {
    void fetchInsitutions();
  }, []);
  if (!authContext.auth.user) {
    return <h1>Acesso negado!</h1>;
  }
  return (
    <div className="flex flex-col w-full items-center gap-2 ">
      <h1 className="text-blue-700 font-dynapuff text-3xl">
        {`Abrigos de ${authContext.auth.user.name}`}
      </h1>
      {pageState === "SUCCESS" && (
        <SheltersCardList
          institutions={institutions}
          customBaseUrl="/shelters"
          showUserAdminRole
        />
      )}
      {pageState === "LOADING" && <LoadingIcon className="w-32 h-32" />}
      {pageState === "ERROR" && (
        <div className="flex flex-col gap-3 items-center">
          <h4 className="text-red-500 text-xl">Erro ao buscar instituições!</h4>
        </div>
      )}
    </div>
  );
};

export default UserShelters;
