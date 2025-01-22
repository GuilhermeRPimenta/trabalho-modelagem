import NavLink from "../../components/global/NavLink";

const AdminLogin = () => {
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">
        Login de administrador
      </h1>
      <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
        <div className="flex flex-col gap-2 items-center">
          {/*Substituir div acima por form*/}
          <label htmlFor="cpf">CPF</label>
          <input
            type="numeric"
            id="cpf"
            style={{ MozAppearance: "textfield" }}
          />
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" />
          <NavLink to="/admin">Entrar</NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
