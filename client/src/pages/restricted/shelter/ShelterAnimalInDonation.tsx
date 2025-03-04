import { useParams } from "react-router-dom";
import NavLink from "../../../components/global/NavLink";
import Button from "../../../components/global/Button";
import AnimalInfo from "../../../components/global/AnimalInfo";
import AdoptionRequestsModal from "../../../components/global/AdoptionRequestsModal";
import { useCallback, useEffect, useState } from "react";
import { LuMessageCircleWarning } from "react-icons/lu";
import apiBaseUrl from "../../../apiBaseUrl";
import LoadingIcon from "../../../components/global/LoadingIcon";

const ShelterAnimalInDonation = () => {
  const { animalInDonationId } = useParams<{ animalInDonationId: string }>();
  const [pageState, setPageState] = useState<"LOADING" | "SUCCESS" | "ERROR">(
    "LOADING"
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [animal, setAnimal] = useState();
  const fetchAnimal = useCallback(async () => {
    setPageState("LOADING");
    try {
      const response = await fetch(
        `${apiBaseUrl}/animal/fetchForAnimalInDonationPage/${animalInDonationId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        setPageState("ERROR");
        return;
      }
      const animal = await response.json();
      setAnimal(animal);
      setPageState("SUCCESS");
    } catch (e) {
      console.log(e);
      setPageState("ERROR");
    }
  }, [animalInDonationId]);
  console.log(animal);
  useEffect(() => {
    void fetchAnimal();
  }, [fetchAnimal]);
  if (pageState === "SUCCESS" && animal)
    return (
      <div className="flex flex-col w-full items-center gap-2">
        <AnimalInfo animal={animal}>
          <div className="flex flex-wrap justify-center gap-1">
            <Button onClick={() => setModalIsOpen(true)}>
              Solicitações
              {animal.adoptionRequests.length > 0 && (
                <LuMessageCircleWarning className="text-yellow-400" />
              )}
            </Button>
            <NavLink to="edit">Editar</NavLink>
            <Button variant="desctructive">Excluir</Button>
          </div>
        </AnimalInfo>
        <AdoptionRequestsModal
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          animal={animal}
        />
      </div>
    );
  if (pageState === "LOADING") return <LoadingIcon className="h-32 w-32" />;
  if (pageState === "ERROR")
    return <h2 className="text-red-500 font-semibold text-xl">Erro!</h2>;
};

export default ShelterAnimalInDonation;
