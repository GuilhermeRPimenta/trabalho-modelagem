import { useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import AnimalCardList from "../../../components/global/AnimalCardList";
import Button from "../../../components/global/Button";
import NavLink from "../../../components/global/NavLink";
import { useCallback, useEffect, useState } from "react";
import LoadingIcon from "../../../components/global/LoadingIcon";

const AdminShelter = () => {
  const { institutionId } = useParams<{ institutionId: string }>();

  const [pageState, setPageState] = useState<"LOADING" | "SUCCESS" | "ERROR">(
    "LOADING"
  );
  const [institution, setInstitution] = useState();

  const fetchInstitution = useCallback(async () => {
    try {
      setPageState("LOADING");
      const fetchedInstitution = await fetch(
        `http://localhost:7000/institution/adminFetchUnique/${institutionId}`,
        { method: "GET", credentials: "include" }
      );
      if (!fetchedInstitution.ok) {
        setPageState("ERROR");
      }
      const institutionData = await fetchedInstitution.json();
      setInstitution(institutionData);

      setPageState("SUCCESS");
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  }, [institutionId]);

  useEffect(() => {
    void fetchInstitution();
  }, [fetchInstitution]);
  if (pageState === "SUCCESS" && institution)
    return (
      <div className="flex flex-col w-full  items-center gap-2">
        <h1 className="text-blue-700 text-3xl font-dynapuff">
          Administrar instituições
        </h1>
        <div className="flex flex-col lg:flex-row gap-2 lg:items-start items-center">
          <img
            src={`${institution.imgUrl}`}
            alt="Imagem da instituição"
            className=" aspect-square h-full max-h-[300px] object-cover rounded-lg"
          />

          <div>
            <h2 className="text-3xl font-semibold">{institution.name}</h2>
            <p className="flex items-center text-lg">Id: {institution.id}</p>
            <p className="flex items-start text-lg">
              <span className="flex items-center mt-1 mr-1">
                <CiLocationOn />
              </span>
              {institution.street}, {institution.number}
              {institution.complement &&
                " | " + `${institution.complement}`}, {institution.neighborhood}
              , {institution.city} - {institution.state}
            </p>
            <p className="flex items-center text-lg">
              CEP: {institution.postalCode}
            </p>
            <p className="flex items-center text-lg">
              CNPJ: {institution.cnpj}
            </p>
            <p className="flex items-center text-lg">
              <span className="flex items-start mt-1 mr-1">
                <MdOutlineMail />
              </span>
              {institution.email}
            </p>

            <p className="flex items-start text-lg">
              <span className="flex items-center mt-1 mr-1">
                <FaWhatsapp />
              </span>
              {institution.phone}
            </p>
            <p className="flex items-start text-lg">
              Data de fundação:{" "}
              {new Date(institution.foundationDate).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <p className="flex items-start text-lg">
              Registrado em:{" "}
              {new Date(institution.createdAt).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button variant="desctructive">Exluir instituição</Button>
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-semibold">Colaboradores:</h3>
        <ul
          className="w-fit flex flex-col gap-1 p-2"
          style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.45)" }}
        >
          {institution.userInstitution
            .filter((ui) => ui.role === "ADMIN")
            .map((u, index) => {
              const user = u.user;
              return (
                <li
                  key={index}
                  className="bg-yellow-100 flex justify-center p-2"
                >
                  <div className="flex flex-col w-full sm:flex-row gap-4">
                    <div className="flex flex-col gap-1">
                      <h2 className="font-semibold">{user.name}</h2>
                      <p>Id: {user.id}</p>
                      <p>
                        {user.neighborhood}, {user.city}, {user.state}
                      </p>
                      <strong className="text-red-500"> RESPONSÁVEL</strong>
                    </div>
                    <div className="flex items-center ml-auto justify-center">
                      <NavLink to={`/admin/users/${user.id}`}>Ver mais</NavLink>
                    </div>
                  </div>
                </li>
              );
            })}
          {institution.userInstitution
            .filter((ui) => ui.role === "COLLABORATOR")
            .map((u, index) => {
              const user = u.user;
              return (
                <li key={index} className="bg-blue-100 flex justify-center p-2">
                  <div className="flex flex-col w-full sm:flex-row gap-4">
                    <div className="flex flex-col gap-1">
                      <h2 className="font-semibold">{user.name}</h2>
                      <p>Id: {user.id}</p>
                      <p>
                        {user.neighborhood}, {user.city}, {user.state}
                      </p>
                    </div>
                    <div className="flex items-center ml-auto justify-center ">
                      <NavLink to={`/admin/users/${user.id}`}>Ver mais</NavLink>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>

        {institution.donationAnimals.filter(
          (da) => !da.userAdopterId && !da.institutionAdopterId
        ).length > 0 && (
          <>
            <h3 className="text-2xl font-semibold">Animais em adoção: </h3>
            <AnimalCardList
              customBaseUrl="/admin/animals"
              animals={institution.donationAnimals.filter(
                (da) => !da.userAdopterId && !da.institutionAdopterId
              )}
            />
          </>
        )}
        {institution.donationAnimals.filter(
          (da) => da.userAdopterId || da.institutionAdopterId
        ).length > 0 && (
          <>
            <h3 className="text-2xl font-semibold">Animais doados:</h3>
            <AnimalCardList
              customBaseUrl="/admin/animals"
              animals={institution.donationAnimals.filter(
                (da) => da.userAdopterId || da.institutionAdopterId
              )}
            />
          </>
        )}
        {institution.adopterAnimals.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold">Animais adotados:</h3>
            <AnimalCardList
              customBaseUrl="/admin/animals"
              animals={institution.adopterAnimals}
            />
          </>
        )}
      </div>
    );
  else if (pageState === "SUCCESS" && !institution)
    return (
      <div className="flex flex-col w-full  items-center gap-2">
        <h1 className="text-blue-700 text-3xl font-dynapuff">
          Administrar instituições
        </h1>
        <h2>Instituição não encontrada!</h2>
      </div>
    );
  else if (pageState === "LOADING")
    return <LoadingIcon className="h-32 w-32" />;
  else if (pageState === "ERROR")
    return (
      <div className="flex flex-col w-full  items-center gap-2">
        <h1 className="text-blue-700 text-3xl font-dynapuff">
          Administrar instituições
        </h1>
        <h2>Erro ao carregar a instituição!</h2>
      </div>
    );
};

export default AdminShelter;
