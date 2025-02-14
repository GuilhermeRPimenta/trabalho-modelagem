import { GiHamburgerMenu } from "react-icons/gi";
import Button from "../global/Button";
import NavLinks from "./NavLinks";
import { Location } from "react-router-dom";
import { UserType } from "../../types/user";

const Nav = ({
  mobileNavIsOpen,
  handleMobileNavIsOpenChange,
  authContext,
  location,
}: {
  mobileNavIsOpen: boolean;
  authContext: {
    auth: UserType | null;
    setAuth: React.Dispatch<React.SetStateAction<UserType | null>>;
  } | null;
  location: Location;
  handleMobileNavIsOpenChange: () => void;
}) => {
  return (
    <nav className="flex items-center flex-col">
      <div className="hidden gap-2 sm:flex sm:items-center sm:justify-center">
        <NavLinks location={location} authContext={authContext} />
      </div>
      <Button
        className={"sm:hidden"}
        onClick={handleMobileNavIsOpenChange}
        variant="ghost"
      >
        <GiHamburgerMenu
          className={`sm:hidden text-3xl ${
            mobileNavIsOpen ? "text-primary" : "text-black"
          }`}
        />
      </Button>
    </nav>
  );
};

export default Nav;
