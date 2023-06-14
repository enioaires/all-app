"use client";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { ArrowBigRight, Image as Imagem } from "lucide-react";
import { FC } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";

const Form: FC = () => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios
      .post(`/api/messages`, {
        ...data,
        conversationId,
      })
      .then(() => {
        router.refresh();
      });
  };

  const handleUpload = (result: any) => {
    axios.post(`/api/messages`, {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="ee2vxejr"
      >
        <Imagem
          size={30}
          className="text-sky-500 cursor-pointer hover:text-sky-600"
        />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Insira sua mensagem aqui..."
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
        >
          <ArrowBigRight size={18} className="text-white" fill="white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
