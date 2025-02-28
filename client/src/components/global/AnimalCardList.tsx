import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const AnimalCardList = ({
  animals,
  showDonatorAddress,
  showDonationStatus,
  showRequestsInfo,
  customBaseUrl,
}: {
  animals: {
    id: number;
    name: string;
    species: string | null;
    customSpecies: string | null;
    gender: string;
    imgUrls: string[];
    donator?: {
      neighborhood: string;
      city: string;
      state: string;
    };
    adopter?: {
      id: number;
    };
    adoptionRequests?: {
      id: number;
      notes: string;
      userId: number | null;
      institutionId: number | null;
    }[];
  }[];
  showDonatorAddress?: boolean;
  customBaseUrl?: string;
  showDonationStatus?: boolean;
  showRequestsInfo?: boolean;
}) => {
  return (
    <div className="flex flex-wrap w-full gap-2 justify-center">
      {animals.map((animal) => (
        <NavLink
          to={`${customBaseUrl ? customBaseUrl + "/" + animal.id : animal.id}`}
          key={animal.id}
          style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.45)" }}
          className="flex flex-col gap-2 items-center text-center p-1 rounded-sm transition-all duration-75 hover:bg-blue-100 hover:cursor-pointer w-full max-w-64 group"
        >
          <h2 className="font-semibold text-xl group-hover:underline">
            {animal.name}
          </h2>

          <img
            className="w-full object-cover aspect-square  rounded-md"
            src={animal.imgUrls[0]}
          />
          <p>{animal.species ? animal.species : animal.customSpecies}</p>
          <div className="flex flex-row">
            {animal.gender === "MACHO" ? (
              <>
                <BsGenderMale size={24} />
                <p>Macho</p>
              </>
            ) : (
              <>
                <BsGenderFemale size={24} />
                <p>Fêmea</p>
              </>
            )}
          </div>
          {showDonatorAddress && (
            <p>
              {animal.donator?.neighborhood}, {animal.donator?.city} -
              {animal.donator?.state}
            </p>
          )}
          {showDonationStatus && (
            <p className="mt-auto flex items-center text-green-600">
              {animal.adopter && (
                <>
                  <FaCheckCircle />
                  ADOTADO!
                </>
              )}
            </p>
          )}
          {showRequestsInfo &&
            animal.adoptionRequests &&
            animal.adoptionRequests.length > 0 && (
              <p className="mt-auto flex items-center text-green-600">
                <strong>Há solicitações!</strong>
              </p>
            )}
        </NavLink>
      ))}
    </div>
  );
};

export default AnimalCardList;
