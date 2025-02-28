import { useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import AnimalCardList from "../../components/global/AnimalCardList";
import brokenImage from "../../assets/brokenImage.png";
import { useCallback, useEffect, useState } from "react";
import apiBaseUrl from "../../apiBaseUrl";
import LoadingIcon from "../../components/global/LoadingIcon";

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [pageState, setPageState] = useState<"SUCCESS" | "ERROR" | "LOADING">(
    "LOADING"
  );
  const [user, setUser] = useState<{
    name: string;
    neighborhood: string;
    city: string;
    state: string;
    imgUrl: string;
    donationAnimals: {
      id: number;
      name: string;
      species: string;
      customSpecies: string;
      gender: string;
      imgUrls: string[];
    }[];
  }>();

  const fetchUser = useCallback(async () => {
    setPageState("LOADING");
    try {
      const response = await fetch(
        `${apiBaseUrl}/user/fetchForPublicProfile/${userId}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        setPageState("ERROR");
        return;
      }
      const user = await response.json();
      setUser(user);
      setPageState("SUCCESS");
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  }, [userId]);
  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);
  console.log(user);
  if (pageState === "ERROR" || !user) {
    return (
      <h1 className="font-dynapuff text-3xl text-blue-500">
        Usuário não encontrado
      </h1>
    );
  } else if (pageState === "LOADING") {
    <LoadingIcon className="h-32 w-32" />;
  } else {
    return (
      <div className="flex flex-col w-full  items-center gap-2">
        <div className="flex flex-col lg:flex-row gap-2 lg:items-start items-center">
          <img
            src={`${user.imgUrl || brokenImage}`}
            alt="Imagem do usuário"
            className=" aspect-square h-full max-h-[300px] object-cover rounded-lg"
          />

          <div>
            <h2 className="text-3xl font-semibold">{user.name}</h2>
            <p>Pessoa física</p>
            <p className="flex items-start text-lg">
              <span className="flex items-center mt-1 mr-1">
                <CiLocationOn />
              </span>
              {user.neighborhood}, {user.city} - {user.state}
            </p>
          </div>
        </div>
        {user.donationAnimals.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold">Animais em adoção: </h3>
            <AnimalCardList
              customBaseUrl="/animals"
              animals={user.donationAnimals}
            />
          </>
        )}
      </div>
    );
  }
};

export default UserProfile;
