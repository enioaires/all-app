"use client";
import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  required: boolean;
  placeholder: string;
  type?: string;
}

const MessageInput: FC<MessageInputProps> = ({
  id,
  register,
  errors,
  required,
  placeholder,
  type = "text",
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        {...register(id, { required })}
        placeholder={placeholder}
        autoComplete={id}
        type={type}
        className="
          text-black
          font-light
          py-3
          px-4
          bg-neutral-100 
          w-full 
          rounded
          focus:outline-none
        "
      />
    </div>
  );
};

export default MessageInput;
