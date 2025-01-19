import { ChangeEvent } from "react";

const ImageInput = ({
  id,
  name,
  className,
  multiple,
  onChange,
}: {
  id: string;
  name?: string;
  className?: string;
  multiple?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={` ${className}`}>
      <label
        htmlFor={id}
        className="bg-blue-700 text-white py-2 px-4 rounded cursor-pointer transition hover:bg-blue-900"
      >
        {`${multiple ? "Selecionar imagens" : "Selecionar imagem"}`}
      </label>

      <input
        id={id}
        name={name}
        multiple={multiple}
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
};

export default ImageInput;
