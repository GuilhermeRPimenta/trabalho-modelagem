import { useNavigate, useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import AnimalCardList from "../../../components/global/AnimalCardList";
import Button from "../../../components/global/Button";
import { NavLink } from "react-router-dom";
import brokenImage from "../../../assets/brokenImage.png";
import { useCallback, useEffect, useState } from "react";
import LoadingIcon from "../../../components/global/LoadingIcon";
import apiBaseUrl from "../../../apiBaseUrl";

const User = () => {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState<"LOADING" | "SUCCESS" | "ERROR">(
    "LOADING"
  );
  const [user, setUser] = useState<{
    id: string;
    name: string;
    cpf: string;
    birthdate: string;
    email: string;
    phone: string;
    street: string;
    complement: string;
    number: number;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    imgUrl: string | null;
    createdAt: string;
    donationAnimals: {
      id: number;
      name: string;
      species: string | null;
      customSpecies: string | null;
      gender: string;
      userAdopterId: number | null;
      institutionAdopterId: number | null;
      imgUrls: string[];
    }[];
    adoptedAnimals: {
      id: number;
      name: string;
      species: string | null;
      customSpecies: string | null;
      gender: string;
      imgUrls: string[];
    }[];
    userInstitutions: {
      id: string;
      role: string;
      institutionId: string;
      userId: string;
      institution: {
        id: string;
        name: string;
        imgUrl: string;
        street: string;
        number: number;
        neighborhood: string;
        complement: string;
        city: string;
        state: string;
      };
    }[];
  } | null>(null);

  const [donationAnimals, setDonationAnimals] = useState<{
    inDonation: {
      id: number;
      name: string;
      species: string | null;
      customSpecies: string | null;
      gender: string;
      imgUrls: string[];
    }[];
    donated: {
      id: number;
      name: string;
      species: string | null;
      customSpecies: string | null;
      gender: string;
      imgUrls: string[];
    }[];
  }>({ inDonation: [], donated: [] });
  const { userId } = useParams<{ userId: string }>();
  console.log(user?.imgUrl);
  const fetchUser = useCallback(async () => {
    try {
      setPageState("LOADING");
      const fetchedUser = await fetch(
        `http://localhost:7000/user/adminFetchUnique/${userId}`,
        { method: "GET", credentials: "include" }
      );
      if (!fetchedUser.ok) {
        setPageState("ERROR");
      }
      const userData = await fetchedUser.json();
      setUser(userData);

      setPageState("SUCCESS");
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  }, [userId]);

  const handleDeleteUser = async () => {
    try {
      setPageState("LOADING");
      const response = await fetch(`${apiBaseUrl}/user/adminDelete/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        setPageState("ERROR");
      }
      navigate("/admin/users");
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  };

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    setDonationAnimals({
      inDonation:
        user?.donationAnimals.filter(
          (animal) => !animal.userAdopterId && !animal.institutionAdopterId
        ) || [],
      donated:
        user?.donationAnimals.filter(
          (animal) => animal.userAdopterId || animal.institutionAdopterId
        ) || [],
    });
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col w-full  justify-center items-center gap-2">
        <h1 className="text-blue-700 text-3xl font-dynapuff">
          Administrar usuários
        </h1>
        <h2>Usuário não encontrado!</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full  items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">
        Administrar usuários
      </h1>
      {pageState === "LOADING" && <LoadingIcon className="h-32 w-32" />}
      {pageState === "SUCCESS" && (
        <>
          <div className="flex flex-col lg:flex-row gap-2 lg:items-start items-center">
            <img
              src={`${user.imgUrl || brokenImage}`}
              alt="Imagem do usuário"
              className=" aspect-square h-full max-h-[300px] object-cover rounded-lg"
            />

            <div>
              <h2 className="text-3xl font-semibold">{user.name}</h2>
              <p className="flex items-center text-lg">Id: {user.id}</p>
              <p className="flex items-start text-lg">
                <span className="flex items-center mt-1 mr-1">
                  <CiLocationOn />
                </span>
                {user.street}, {user.number}
                {user.complement && " | " + `${user.complement}`},{" "}
                {user.neighborhood}, {user.city} - {user.state}
              </p>
              <p className="flex items-center text-lg">
                CEP: {user.postalCode}
              </p>
              <p className="flex items-center text-lg">CPF: {user.cpf}</p>
              <p className="flex items-center text-lg">
                <span className="flex items-start mt-1 mr-1">
                  <MdOutlineMail />
                </span>
                {user.email}
              </p>

              <p className="flex items-start text-lg">
                <span className="flex items-center mt-1 mr-1">
                  <FaWhatsapp />
                </span>
                {user.phone}
              </p>
              <p className="flex items-start text-lg">
                Data de nascimento:{" "}
                {new Date(user.birthdate).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p className="flex items-start text-lg">
                Registrado em:{" "}
                {new Date(user.createdAt).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
              <div className="flex justify-center lg:justify-start">
                <Button variant="desctructive" onClick={handleDeleteUser}>
                  Excluir usuário
                </Button>
              </div>
            </div>
          </div>
          {donationAnimals.inDonation.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold">Animais em adoção: </h3>
              <AnimalCardList
                customBaseUrl="/admin/animals"
                animals={donationAnimals.inDonation}
              />
            </>
          )}
          {donationAnimals.donated.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold">Animais doados:</h3>
              <AnimalCardList
                customBaseUrl="/admin/animals"
                animals={donationAnimals.donated}
              />
            </>
          )}
          {user.adoptedAnimals.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold">Animais adotados:</h3>
              <AnimalCardList
                customBaseUrl="/admin/animals"
                animals={user.adoptedAnimals}
              />
            </>
          )}
          {user.userInstitutions.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold">Abrigos: </h3>
              <div className="flex flex-wrap w-full gap-2 justify-center">
                {user.userInstitutions.map((userInstitution) => (
                  <NavLink
                    to={`/admin/shelters/${userInstitution.institution.id}`}
                    key={userInstitution.institution.id}
                    style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.45)" }}
                    className="flex flex-col gap-2 items-center text-center p-1 rounded-sm transition-all duration-75 hover:bg-blue-100 hover:cursor-pointer w-full max-w-64 group"
                  >
                    <h4 className="font-semibold text-xl group-hover:underline">
                      {userInstitution.institution.name}
                    </h4>
                    <img
                      className="w-full object-cover aspect-square  rounded-md"
                      src={
                        userInstitution.institution.imgUrl
                          ? userInstitution.institution.imgUrl
                          : brokenImage
                      }
                    />
                    <p>
                      {userInstitution.institution.street},{" "}
                      {userInstitution.institution.number}
                      {userInstitution.institution.complement &&
                        " | " + `${userInstitution.institution.complement}`}
                      , {userInstitution.institution.neighborhood},{" "}
                      {userInstitution.institution.city} -{" "}
                      {userInstitution.institution.state}
                    </p>
                    {userInstitution.role === "ADMIN" && (
                      <p className="text-yellow-600">Administrador</p>
                    )}
                  </NavLink>
                ))}
              </div>
            </>
          )}
        </>
      )}
      {pageState === "ERROR" && (
        <h3 className="text-red-500 text-xl font-semibold">
          Erro ao buscar dados do usuário
        </h3>
      )}
    </div>
  );
};

export default User;
