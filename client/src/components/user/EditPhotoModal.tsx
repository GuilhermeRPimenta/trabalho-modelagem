import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Button from "../global/Button";
import { VscError } from "react-icons/vsc";
import LoadingIcon from "../global/LoadingIcon";
import { FaRegCheckCircle } from "react-icons/fa";
import ImageInput from "../global/ImageInput";

const EditPhotoModal = ({
  isOpen,
  initialImage,
  setIsOpen,
}: {
  isOpen: boolean;
  initialImage: File | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [pageState, setPageState] = useState<
    "FORM" | "LOADING" | "ERROR" | "SUCCESS"
  >("FORM");

  const resetModal = () => {
    setPageState("FORM");
  };

  const [userImage, setUserImage] = useState<File | undefined>(
    initialImage ? initialImage : undefined
  );
  const handleUserImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) setUserImage(file);
  };
  const removeUserImage = () => {
    setUserImage(undefined);
  };

  return (
    <div
      className={`bg-black/70 fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center ${
        !isOpen && "hidden"
      }`}
    >
      <div className=" flex flex-col bg-white gap-4 max-h-[90vh] rounded-lg p-5">
        <div className="flex items-center  w-full">
          <h1 className="font-dynapuff  text-blue-700 text-xl">
            Atualizar foto
          </h1>
          {pageState !== "SUCCESS" && (
            <Button
              onClick={() => setIsOpen(false)}
              className="ml-auto h-12 w-12 p-0"
              variant="ghost"
            >
              <IoIosClose className="h-32 w-32" />
            </Button>
          )}
        </div>

        {pageState === "FORM" && (
          <form className="flex overflow-auto items-center flex-col gap-1">
            {userImage && (
              <div className="w-full flex flex-col items-center py-2">
                <h3>Foto de perfil selecionada:</h3>
                <div className="relative">
                  <img
                    src={URL.createObjectURL(userImage)}
                    alt={`Imagem principal`}
                    className="w-64 h-64  object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeUserImage}
                    className="absolute top-0 right-0 bg-red-500 text-white py-1 px-3 rounded-full"
                  >
                    X
                  </button>
                </div>
              </div>
            )}
            <ImageInput id="userImage" onChange={handleUserImageChange} />
            <Button variant="constructive" className="mt-3">
              Atualizar
            </Button>
          </form>
        )}
        {pageState === "LOADING" && <LoadingIcon className="text-7xl w-full" />}
        {pageState === "SUCCESS" && (
          <div className="flex flex-col overflow-auto">
            <FaRegCheckCircle className="text-7xl w-full text-green-300 mb-5" />
            <p className="font-bold text-2xl">Foto de perfil atualizada!</p>
            <Button className="mt-2" onClick={resetModal}>
              Fechar
            </Button>
          </div>
        )}
        {pageState === "ERROR" && (
          <div className="flex flex-col text-center overflow-auto">
            <VscError className="text-7xl w-full text-red-500 mb-5" />
            Algo deu errado!
            <div className="flex justify-center">
              <Button className="mt-5" onClick={resetModal}>
                Voltar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPhotoModal;
