import { GiHamburgerMenu } from "react-icons/gi";
import Button from "../global/Button";
import NavLinks from "./NavLinks";

const Nav = ({
  mobileNavIsOpen,
  handleMobileNavIsOpenChange,
  authContext,
}: {
  mobileNavIsOpen: boolean;
  authContext: {
    auth: {
      id: number;
      name: string;
    } | null;
    setAuth: React.Dispatch<
      React.SetStateAction<{
        id: number;
        name: string;
      } | null>
    >;
  } | null;
  handleMobileNavIsOpenChange: () => void;
}) => {
  return (
    <nav className="flex items-center flex-col">
      <div className="hidden gap-2 sm:flex sm:items-center sm:justify-center">
        <NavLinks authContext={authContext} />
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
