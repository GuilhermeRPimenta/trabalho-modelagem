import { CiLogout } from "react-icons/ci";
import Button from "../../../components/global/Button";
import NavLink from "../../../components/global/NavLink";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../components/global/useAuth";

const AdminHome = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:7000/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        authContext.setAuth((prev) => ({
          admin: null,
          user: prev.user ?? null,
        }));
        navigate("/adminLogin");
      } else {
        console.log("Error ao deslogar");
      }
    } catch (e) {
      console.log(e);
    }
  };
  if (!authContext.auth.admin) {
    navigate("/adminLogin");
    return;
  }
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-center text-3xl font-dynapuff">
        Administração do sistema
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
          <h2 className="font-semibold text-xl">
            {authContext.auth.admin.name}
          </h2>
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
            onClick={handleLogout}
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
