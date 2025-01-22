import { users } from "../../../assets/exampleData";
import NavLink from "../../../components/global/NavLink";

const Users = () => {
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">
        Administrar usuários
      </h1>

      <div className="flex flex-col w-fit items-center gap-2">
        <input
          type="text"
          className="outline outline-1 outline-blue-700 rounded-lg p-2 w-full"
          placeholder="Pesquisar nome..."
        />
        <ul
          className="w-fit flex flex-col gap-1 p-2"
          style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.45)" }}
        >
          {users.map((user, index) => (
            <li key={index} className="bg-blue-100 flex justify-center p-2">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="font-semibold">{user.name}</h2>
                  <p>Id: {user.id}</p>
                  <p>
                    {user.neighborhood}, {user.city}, {user.state}
                  </p>
                  <p>Animais cadastrados: {user.animals.length}</p>
                  <p>Animais adotados: {user.adoptedAnimals.length}</p>
                  <p>
                    Registro em:{" "}
                    {user.createdAt.toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <NavLink to={`${user.id}`}>Ver mais</NavLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
