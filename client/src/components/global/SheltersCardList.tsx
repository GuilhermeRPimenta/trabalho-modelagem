import { NavLink } from "react-router-dom";
import brokenImage from "../../assets/brokenImage.png";
import { ShelterType } from "../../types/shelter";
import { UserType } from "../../types/user";

const SheltersCardList = ({
  shelters,
  customBaseUrl,
  showUserAdminRole,
  user,
}: {
  shelters: ShelterType[];
  customBaseUrl?: string;
  showUserAdminRole?: boolean;
  user?: UserType;
}) => {
  return (
    <div className="flex flex-wrap w-full gap-2 justify-center">
      {shelters.map((shelter) => (
        <NavLink
          to={`${
            customBaseUrl ? customBaseUrl + "/" + shelter.id : shelter.id
          }`}
          key={shelter.id}
          style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.45)" }}
          className="flex flex-col gap-2 items-center text-center p-1 rounded-sm transition-all duration-75 hover:bg-blue-100 hover:cursor-pointer w-full max-w-64 group"
        >
          <h2 className="font-semibold text-xl group-hover:underline">
            {shelter.name}
          </h2>

          <img
            className="w-full object-cover aspect-square  rounded-md"
            src={shelter.imgUrl ? shelter.imgUrl : brokenImage}
          />

          <p>
            {shelter.neighborhood}, {shelter.city} -{shelter.state}
          </p>
          {showUserAdminRole &&
            shelter.users.find((user) => user.role === "ADMINISTRATOR")?.user
              .id === user?.id && (
              <p className="text-yellow-600">Administrador</p>
            )}
        </NavLink>
      ))}
    </div>
  );
};

export default SheltersCardList;
