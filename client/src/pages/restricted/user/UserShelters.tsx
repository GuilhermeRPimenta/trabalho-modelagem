import SheltersCardList from "../../../components/global/SheltersCardList";
import { shelters } from "../../../assets/exampleData";
import { useAuth } from "../../../components/global/useAuth";

const UserShelters = () => {
  const authContext = useAuth();
  const filteredShelters = shelters.filter((shelter) =>
    shelter.users.some((user) => user.user.id === authContext?.auth?.id)
  );
  if (!authContext?.auth) {
    return <h1>Acesso negado!</h1>;
  }
  return (
    <div className="flex flex-col w-full items-center gap-2 ">
      <h1 className="text-blue-700 font-dynapuff text-3xl">
        {`Abrigos de ${authContext?.auth?.name}`}
      </h1>

      <SheltersCardList
        shelters={filteredShelters}
        customBaseUrl="/shelters"
        showUserAdminRole
        user={authContext.auth}
      />
    </div>
  );
};

export default UserShelters;
