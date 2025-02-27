import { useParams } from "react-router-dom";
import { useAuth } from "../../../components/global/useAuth";
import { shelters } from "../../../assets/exampleData";
import NavLink from "../../../components/global/NavLink";
import { useCallback, useEffect, useState } from "react";
import apiBaseUrl from "../../../apiBaseUrl";
import LoadingIcon from "../../../components/global/LoadingIcon";

const ShelterHome = () => {
  const [pageState, setPageState] = useState<"LOADING" | "SUCCESS" | "ERROR">(
    "LOADING"
  );
  const [institution, setInstitution] = useState<{
    id: number;
    name: string;
    userInstitution: {
      role: string;
    }[];
  } | null>(null);
  const authContext = useAuth();
  const { institutionId } = useParams<{ institutionId: string }>();
  const fetchInstitution = useCallback(async () => {
    try {
      setPageState("LOADING");
      const response = await fetch(
        `${apiBaseUrl}/institution/fetchForInstitutionHome/${institutionId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        console.log(response);
        setPageState("ERROR");
        return;
      }
      const institution = await response.json();
      setInstitution(institution);
      setPageState("SUCCESS");
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  }, [institutionId]);

  useEffect(() => {
    void fetchInstitution();
  }, [fetchInstitution]);
  if (!authContext?.auth.user)
    return <h1 className="text-red-700 text-3xl">Acesso negado!</h1>;
  if (pageState === "SUCCESS")
    return (
      <div className="flex flex-col w-full   justify-center items-center gap-2">
        <h1 className="text-blue-700 text-3xl font-dynapuff">
          {`${institution?.name}`}
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
                to={`/shelters/${institutionId}/animalRegister`}
                variant="constructive"
                className="w-full"
              >
                Criar anuncio
              </NavLink>
            </div>
          </div>
        </div>
        {institution?.userInstitution.find((user) => user.role === "ADMIN") && (
          <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
            <h2 className="text-2xl font-semibold">Área de administrador</h2>
            <NavLink to={`/shelters/${institutionId}/admin`}>Admin</NavLink>
          </div>
        )}
      </div>
    );
  else if (pageState === "LOADING")
    return <LoadingIcon className="h-32 w-32" />;
  else if (pageState === "ERROR")
    return <h1 className="text-red-500 text-xl font-semibold">Erro!</h1>;
};

export default ShelterHome;
