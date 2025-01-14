import { useNavigate } from "react-router-dom";
import Button from "../../../components/global/Button";
import { useAuth } from "../../../components/global/useAuth";

const ShelterRegister = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  if (!authContext?.auth)
    return <h1 className="text-red-700 text-3xl">Acesso negado!</h1>;
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">
        Cadastro de abrigo
      </h1>
      <div className="flex justify-center text-center flex-col bg-blue-100 p-4 rounded-lg gap-4">
        <div className="flex flex-col gap-2 items-center">
          {/*Substituir div acima por form*/}
          <h2>
            {`Cadastrando abrigo supervisionado por `}
            <span className="font-bold">{authContext.auth.name}</span>
          </h2>
          <p>CPF: {authContext.auth.cpf}</p>
          <label htmlFor="name">Nome*</label>
          <input type="text" id="name" className="w-full" />
          <label htmlFor="cnpj">CNPJ*</label>
          <input type="text" id="cnpj" className="w-full" />
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

export default ShelterRegister;
