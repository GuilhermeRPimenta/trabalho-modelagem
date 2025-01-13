import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Nav from "./Nav";
import NavLinks from "./NavLinks";
import pawLogo from "../../assets/paw-logo.png";
import { useAuth } from "../global/useAuth";

const Header = () => {
  const authContext = useAuth();
  const location = useLocation();
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);

  const handleMobileNavIsOpenChange = () => {
    setMobileNavIsOpen(!mobileNavIsOpen);
  };

  const handleNavLinkClick = () => {
    setMobileNavIsOpen(false);
  };

  return (
    <header className="bg-gray-100 sticky top-0 z-[10]">
      <div className="p-1 sm:px-6 justify-between shadow-lg flex items-center  ">
        <NavLink to={"/"} className="flex items-center mb-auto">
          <img src={pawLogo} alt="" className="w-12" />
          <h1 className="text-3xl font-dynapuff text-blue-700">Adote Aqui</h1>
        </NavLink>

        <div className="flex items-center justify-center">
          <Nav
            authContext={authContext}
            mobileNavIsOpen={mobileNavIsOpen}
            handleMobileNavIsOpenChange={handleMobileNavIsOpenChange}
            location={location}
          />
        </div>
      </div>
      {mobileNavIsOpen && (
        <div className="sm:hidden bg-gray-100 shadow-md">
          <NavLinks
            className="text-xl"
            authContext={authContext}
            handleNavLinkClick={handleNavLinkClick}
            location={location}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
