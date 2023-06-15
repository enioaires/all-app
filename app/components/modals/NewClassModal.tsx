"use client";
import { FC, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "../Button";
import Input from "../inputs/Input";
import Select from "../inputs/Select";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import toast from "react-hot-toast";
import { Class } from "@prisma/client";

interface NewClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentClass?: Class;
}

const NewClassModal: FC<NewClassModalProps> = ({
  isOpen,
  onClose,
  currentClass,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentClass?.name || "",
      description: currentClass?.description || "",
      image: currentClass?.image || "",
      image2: currentClass?.image2 || "",
      image3: currentClass?.image3 || "",
    },
  });

  const image = watch("image");
  const image2 = watch("image2");
  const image3 = watch("image3");

  const handleUploadImage = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const handleUploadImage2 = (result: any) => {
    setValue("image2", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const handleUploadImage3 = (result: any) => {
    setValue("image3", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const cleanForm = () => {
    setValue("name", "");
    setValue("description", "");
    setValue("image", "");
    setValue("image2", "");
    setValue("image3", "");
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (currentClass) {
      axios
        .put("/api/classes", {
          ...data,
          id: currentClass.id,
        })
        .then(() => {
          router.refresh();
          onClose();
          toast.success("Classe editada com sucesso!");
          cleanForm();
        })
        .catch(() => {
          toast.error("Erro ao editar a classe!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .post("/api/classes", data)
        .then(() => {
          router.refresh();
          onClose();
          toast.success("Classe criada com sucesso!");
          cleanForm();
        })
        .catch(() => {
          toast.error("Erro ao criar a classe!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleOnCancel = () => {
    onClose();
    setValue("image", "");
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {currentClass ? "Editar classe" : "Adicionar uma classe"}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {currentClass
                ? "Preencha os campos abaixo para editar a classe."
                : "Preencha os campos abaixo para criar uma nova classe."}
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                label="Nome"
                id="name"
                required
                errors={errors}
              />
              <Input
                register={register}
                label="Descrição"
                id="description"
                required
                errors={errors}
                type="textarea"
              />
              <div className="flex flex-col items-center">
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onUpload={handleUploadImage}
                  uploadPreset="ee2vxejr"
                >
                  <Button disabled={isLoading} variant={"ghost"} type="button">
                    Definir imagem
                  </Button>
                </CldUploadButton>
                {image && (
                  <Image width={148} height={148} src={image} alt={"Image"} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-x-6">
          <Button variant={"cancel"} type="button" onClick={handleOnCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {currentClass ? "Editar" : "Adicionar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewClassModal;
