import { useNavigate } from "react-router-dom";
import Button from "../../components/global/Button";

const UserRegister = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">Cadastrar</h1>
      <div className="flex justify-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
        <div className="flex flex-col gap-2 items-center">
          {/*Substituir div acima por form*/}
          <label htmlFor="name">Nome completo*</label>
          <input className="w-full" type="text" id="name" />
          <label htmlFor="birthdate">Data de nascimento*</label>
          <input className="w-full" id="birthdate" type="date" />
          <label htmlFor="cpf">CPF*</label>
          <input
            className="w-full"
            type="numeric"
            id="cpf"
            style={{ MozAppearance: "textfield" }}
          />
          <label htmlFor="email">E-mail*</label>
          <input className="w-full" type="email" id="email" />
          <label htmlFor="phone">Telefone*</label>
          <input className="w-full" type="text" id="phone" />
          <label htmlFor="address">Logradouro*</label>
          <input className="w-full" type="text" id="address" />
          <label htmlFor="addressNumber">Número*</label>
          <input
            className="w-full"
            style={{ MozAppearance: "textfield" }}
            type="number"
            id="address"
          />
          <label htmlFor="addressComplement">Complemento</label>
          <input className="w-full" type="text" id="addressComplement" />
          <label htmlFor="addressNeighborhood">Bairro*</label>
          <input className="w-full" type="text" id="addressNeighborhood" />
          <label htmlFor="addressCity">Cidade*</label>
          <input className="w-full" type="text" id="addressCity" />
          <label htmlFor="addressState">Estado*</label>
          <input className="w-full" type="text" id="addressState" />
          <label htmlFor="addressPostalCode">CEP*</label>
          <input className="w-full" type="text" id="addressPostalCode" />
          <label htmlFor="userImage">Foto</label>
          <input
            className="w-full"
            type="file"
            accept="image/png, image/jpeg"
            id="userImage"
          />
          <label htmlFor="password">Senha*</label>
          <input className="w-full" type="password" id="password" />
          <label htmlFor="passwordConfirm">Confirme a senha*</label>
          <input className="w-full" type="password" id="passwordConfirm" />
          <Button
            variant="constructive"
            onClick={() => {
              navigate("/login");
            }}
          >
            Cadastrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
