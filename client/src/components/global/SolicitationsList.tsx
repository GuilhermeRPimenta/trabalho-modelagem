import { NavLink } from "react-router-dom";
import { ShelterType } from "../../types/shelter";
import { UserType } from "../../types/user";
import Button from "./Button";

const SolicitationsList = ({ person }: { person: UserType | ShelterType }) => {
  if (person.adoptionRequests.length === 0) {
    return <h2 className="text-xl font-semibold">Nenhuma solicitação</h2>;
  }

  return (
    <ul
      className="w-fit flex flex-col gap-1 p-2"
      style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.45)" }}
    >
      {person.adoptionRequests.map((req, index) => {
        return (
          <div
            key={index}
            className="bg-blue-100 flex flex-col items-center gap-1 justify-center p-2 "
          >
            <NavLink
              to={`/animals/${req.animal.id}`}
              className="group items-center flex flex-col"
            >
              <h4 className="font-semibold text-xl group-hover:underline">
                {req.animal.name}
              </h4>
              <img
                src={`${req.animal.imgUrls[0]}`}
                alt=""
                className="max-w-32 max-h-32"
              />
              <p>
                {req.createdAt.toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
              <p>{req.justification}</p>
            </NavLink>

            <Button variant="desctructive">Cancelar</Button>
          </div>
        );
      })}
    </ul>
  );
};

export default SolicitationsList;
