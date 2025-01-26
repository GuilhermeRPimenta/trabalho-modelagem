import { animals } from "../../../assets/exampleData";
import { useAuth } from "../../../components/global/useAuth";
import AnimalCardList from "../../../components/global/AnimalCardList";

const UserAnimalsInDonation = () => {
  const authContext = useAuth();
  const animalsInDonation = animals.filter(
    (animal) =>
      animal.donator?.id === authContext?.auth?.id &&
      !animal.adopter &&
      animal.donatorType === "USER"
  );
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-center text-3xl font-dynapuff">
        Animais em adoção
      </h1>
      <input
        type="text"
        className="outline outline-1 outline-blue-700 rounded-lg p-2"
        placeholder="Pesquisar nome..."
      />
      <AnimalCardList animals={animalsInDonation} showRequestsInfo />
    </div>
  );
};

export default UserAnimalsInDonation;
