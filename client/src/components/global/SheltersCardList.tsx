import { NavLink } from "react-router-dom";
import brokenImage from "../../assets/brokenImage.png";

const SheltersCardList = ({
  institutions,
  customBaseUrl,
  showUserAdminRole,
}: {
  institutions: {
    id: number;
    name: string;
    neighborhood: string;
    city: string;
    state: string;
    imgUrl: string;
    userInstitution: {
      role: string;
    }[];
  }[];
  customBaseUrl?: string;
  showUserAdminRole?: boolean;
}) => {
  return (
    <div className="flex flex-wrap w-full gap-2 justify-center">
      {institutions.map((institution) => (
        <NavLink
          to={`${
            customBaseUrl
              ? customBaseUrl + "/" + institution.id
              : institution.id
          }`}
          key={institution.id}
          style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.45)" }}
          className="flex flex-col gap-2 items-center text-center p-1 rounded-sm transition-all duration-75 hover:bg-blue-100 hover:cursor-pointer w-full max-w-64 group"
        >
          <h2 className="font-semibold text-xl group-hover:underline">
            {institution.name}
          </h2>

          <img
            className="w-full object-cover aspect-square  rounded-md"
            src={institution.imgUrl ? institution.imgUrl : brokenImage}
          />

          <p>
            {institution.neighborhood}, {institution.city} -{institution.state}
          </p>
          {showUserAdminRole &&
            institution.userInstitution[0].role === "ADMIN" && (
              <p className="text-yellow-600">Administrador</p>
            )}
        </NavLink>
      ))}
    </div>
  );
};

export default SheltersCardList;
