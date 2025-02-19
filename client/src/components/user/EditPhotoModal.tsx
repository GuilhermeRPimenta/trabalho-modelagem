import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IoIosClose } from "react-icons/io";
import Button from "../global/Button";
import ImageInput from "../global/ImageInput";

const EditPhotoModal = ({
  isOpen,
  initialImage,
  setIsOpen,
  setUpdatedImage,
  setImageFile,
}: {
  isOpen: boolean;
  initialImage: File | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setUpdatedImage: Dispatch<SetStateAction<boolean>>;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}) => {
  const resetModal = () => {
    setUserImage(initialImage ?? undefined);
    setIsOpen(false);
  };

  const [userImage, setUserImage] = useState<File | undefined>(
    initialImage ? initialImage : undefined
  );
  const handleUserImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setUserImage(file);
      setUpdatedImage(true);
    }
  };
  const removeUserImage = () => {
    setUserImage(undefined);
  };

  const handleUpdate = () => {
    setImageFile(userImage ?? null);
    setIsOpen(false);
  };
  useEffect(() => {
    setUserImage(initialImage ?? undefined);
  }, [initialImage]);
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
          <Button
            onClick={resetModal}
            className="ml-auto h-12 w-12 p-0"
            variant="ghost"
          >
            <IoIosClose className="h-32 w-32" />
          </Button>
        </div>

        <div className="flex overflow-auto items-center flex-col gap-1">
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
          <Button
            variant="constructive"
            className="mt-3"
            onClick={handleUpdate}
          >
            Atualizar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditPhotoModal;
