import { useNavigate } from "react-router-dom";
import Button from "../../../components/global/Button";
import brokenImage from "../../../assets/brokenImage.png";
import EditPhotoModal from "../../../components/user/EditPhotoModal";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { users } from "../../../assets/exampleData";
import { useAuth } from "../../../components/global/useAuth";

const UserEdit = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const imageUrl = authContext?.auth?.imgUrl;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fetchImageAsFile = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });
      setImageFile(file);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(imageFile);
  useEffect(() => {
    if (imageUrl) fetchImageAsFile(imageUrl);
  }, [imageUrl]);
  const user = users[0];
  return (
    <div className="flex flex-col w-full  justify-center items-center gap-2">
      <h1 className="text-blue-700 text-3xl font-dynapuff">Editar cadastro</h1>
      <div className="flex justify-center max-w-full w-96 flex-col bg-blue-100 p-4 rounded-lg gap-4">
        <div className="flex flex-col gap-2 items-center">
          {/*Substituir div acima por form*/}
          <div className="relative group">
            <button onClick={() => setModalIsOpen(true)}>
              <img
                className="w-32 object-cover h-32 rounded-md transition-all duration-300 group-hover:brightness-50"
                src={user.imgUrl || brokenImage}
                alt={brokenImage}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaRegEdit className="text-white text-3xl" />
              </div>
            </button>
          </div>

          <label htmlFor="name">Nome completo*</label>
          <input
            defaultValue={user.name}
            className="w-full"
            type="text"
            id="name"
          />
          <label htmlFor="birthdate">Data de nascimento*</label>
          <input
            defaultValue={user.birthDate}
            className="w-full"
            id="birthdate"
            type="date"
          />
          <label htmlFor="cpf">CPF*</label>
          <input
            defaultValue={user.cpf}
            className="w-full"
            type="numeric"
            id="cpf"
            style={{ MozAppearance: "textfield" }}
          />
          <label htmlFor="email">E-mail*</label>
          <input
            defaultValue={user.email}
            className="w-full"
            type="email"
            id="email"
          />
          <label htmlFor="phone">Telefone*</label>
          <input
            defaultValue={user.phone}
            className="w-full"
            type="text"
            id="phone"
          />
          <label htmlFor="address">Logradouro*</label>
          <input
            defaultValue={user.address}
            className="w-full"
            type="text"
            id="address"
          />
          <label htmlFor="addressNumber">Número*</label>
          <input
            defaultValue={user.number}
            className="w-full"
            style={{ MozAppearance: "textfield" }}
            type="number"
            id="address"
          />
          <label htmlFor="addressComplement">Complemento</label>
          <input
            defaultValue={user.complement || ""}
            className="w-full"
            type="text"
            id="addressComplement"
          />
          <label htmlFor="addressNeighborhood">Bairro*</label>
          <input
            defaultValue={user.neighborhood}
            className="w-full"
            type="text"
            id="addressNeighborhood"
          />
          <label htmlFor="addressCity">Cidade*</label>
          <input
            defaultValue={user.city}
            className="w-full"
            type="text"
            id="addressCity"
          />
          <label htmlFor="addressState">Estado*</label>
          <input
            defaultValue={user.state}
            className="w-full"
            type="text"
            id="addressState"
          />
          <label htmlFor="addressPostalCode">CEP*</label>
          <input
            defaultValue={user.postalCode}
            className="w-full"
            type="text"
            id="addressPostalCode"
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
            Editar
          </Button>
        </div>
      </div>
      <EditPhotoModal
        initialImage={imageFile}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      />
    </div>
  );
};

export default UserEdit;
