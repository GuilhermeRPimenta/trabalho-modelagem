import { FaRegHeart, FaUserAlt } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { TbDog } from "react-icons/tb";
import { Location, NavLink } from "react-router-dom";
import { BiInfoCircle } from "react-icons/bi";
import { AuthUser } from "../global/AuthProvider";

const NavLinks = ({
  className,
  authUser,
  location,
  handleNavLinkClick,
}: {
  className?: string;
  authUser: AuthUser;
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
          location.pathname.startsWith("/user") ||
          location.pathname.startsWith("/shelters")
            ? "text-blue-700"
            : "text-black"
        }`}
      >
        <FaUserAlt />
        {authUser ? authUser.name.split(" ")[0] : "Entrar"}
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
        to={"/adminLogin"}
        className={({ isActive }) =>
          `${baseStyle} ${baseStyle} ${
            isActive || location.pathname.startsWith("/admin")
              ? "text-blue-700"
              : "text-black"
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
