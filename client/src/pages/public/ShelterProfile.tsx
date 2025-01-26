import { CiLocationOn } from "react-icons/ci";
import AnimalCardList from "../../components/global/AnimalCardList";
import { animals, shelters } from "../../assets/exampleData";
import { useParams } from "react-router-dom";
import brokenImage from "../../assets/brokenImage.png";

const ShelterProfile = () => {
  const { shelterId } = useParams<{ shelterId: string }>();
  const shelter = shelters.find((shelter) => shelter.id === Number(shelterId));
  if (!shelter) {
    return (
      <h1 className="font-dynapuff text-3xl text-blue-500">
        Abrigo não encontrado
      </h1>
    );
  }
  const animalsInDonation = animals.filter(
    (animal) =>
      animal.donator?.id === shelter?.id &&
      !animal.adopter &&
      animal.donatorType === "SHELTER"
  );
  return (
    <div className="flex flex-col w-full  items-center gap-2">
      <div className="flex flex-col lg:flex-row gap-2 lg:items-start items-center">
        <img
          src={`${shelter.imgUrl || brokenImage}`}
          alt="Imagem do abrigo"
          className=" aspect-square h-full max-h-[300px] object-cover rounded-lg"
        />

        <div>
          <h2 className="text-3xl font-semibold">{shelter.name}</h2>
          <p>Instituição</p>
          <p className="flex items-start text-lg">
            <span className="flex items-center mt-1 mr-1">
              <CiLocationOn />
            </span>
            {shelter.address}, {shelter.number}
            {shelter.complement && " | " + `${shelter.complement}`},{" "}
            {shelter.neighborhood}, {shelter.city} - {shelter.state}
          </p>
          <p className="flex items-center text-lg">CEP: {shelter.postalCode}</p>
          <p className="flex items-center text-lg">CNPJ: {shelter.cnpj}</p>
        </div>
      </div>
      {animalsInDonation.length > 0 && (
        <>
          <h3 className="text-2xl font-semibold">Animais em adoção: </h3>
          <AnimalCardList
            customBaseUrl="/animals"
            animals={animalsInDonation}
          />
        </>
      )}
    </div>
  );
};

export default ShelterProfile;
