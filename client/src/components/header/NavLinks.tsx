import { FaRegHeart, FaUserAlt } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { TbDog } from "react-icons/tb";
import { Location, NavLink } from "react-router-dom";
import { UserType } from "../../types/user";
import { BiInfoCircle } from "react-icons/bi";

const NavLinks = ({
  className,
  authContext,
  location,
  handleNavLinkClick,
}: {
  className?: string;
  authContext: {
    auth: UserType | null;
    setAuth: React.Dispatch<React.SetStateAction<UserType | null>>;
  } | null;
  location: Location;
  handleNavLinkClick?: () => void;
}) => {
  const baseStyle = `${className} flex items-center justify-center p-2 rounded-md font-semibold hover:bg-gray-200 hover:text-primary`;
  return (
    <>
      <NavLink
        onClick={handleNavLinkClick}
        to="/animals"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? "text-blue-700" : "text-black"}`
        }
      >
        <TbDog />
        Animais
      </NavLink>
      <NavLink
        onClick={handleNavLinkClick}
        to={"/login"}
        className={`${baseStyle} ${
          location.pathname === "/login" ||
          location.pathname.startsWith("/user")
            ? "text-blue-700"
            : "text-black"
        }`}
      >
        <FaUserAlt />
        {authContext?.auth ? authContext.auth.name.split(" ")[0] : "Entrar"}
      </NavLink>
      <NavLink
        onClick={handleNavLinkClick}
        to="/donations"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? "text-blue-700" : "text-black"}`
        }
      >
        <FaRegHeart />
        Doe
      </NavLink>
      <NavLink
        onClick={handleNavLinkClick}
        to="/about"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? "text-blue-700" : "text-black"}`
        }
      >
        <BiInfoCircle />
        Sobre
      </NavLink>
      <NavLink
        onClick={handleNavLinkClick}
        to={"/admin"}
        className={({ isActive }) =>
          `${baseStyle} ${baseStyle} ${
            isActive ? "text-blue-700" : "text-black"
          }`
        }
      >
        <GrUserAdmin />
        Admin
      </NavLink>
    </>
  );
};

export default NavLinks;
