import { useParams } from "react-router-dom";
import { animals, users } from "../../assets/exampleData";
import { CiLocationOn } from "react-icons/ci";
import AnimalCardList from "../../components/global/AnimalCardList";
import brokenImage from "../../assets/brokenImage.png";

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = users.find((user) => user.id === Number(userId));
  if (!user) {
    return (
      <h1 className="font-dynapuff text-3xl text-blue-500">
        Usuário não encontrado
      </h1>
    );
  }
  const animalsInDonation = animals.filter(
    (animal) =>
      animal.donator?.id === user?.id &&
      !animal.adopter &&
      animal.donatorType === "USER"
  );
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
      {animalsInDonation.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold">Animais em adoção: </h3>
          <AnimalCardList
            customBaseUrl="/animals"
            animals={animalsInDonation}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
