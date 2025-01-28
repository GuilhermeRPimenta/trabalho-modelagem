import { CiLogout } from "react-icons/ci";
import Button from "../../../components/global/Button";
import NavLink from "../../../components/global/NavLink";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-center text-3xl font-dynapuff">
        Administração do sistema
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
          <div className="flex sm:flex-row flex-col text-center gap-2">
            <NavLink to="users" className="w-full">
              Usuários
            </NavLink>
            <NavLink to="animals" className="w-full">
              Animais
            </NavLink>

            <NavLink to="shelters" className="w-full">
              Instituições
            </NavLink>
          </div>
        </div>

        <div className="justify-center flex">
          <Button
            onClick={() => {
              navigate("/adminLogin");
            }}
            variant="desctructive"
            className="w-32"
          >
            <CiLogout />
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
