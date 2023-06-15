"use client";
import { FC, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "../Button";
import Input from "../inputs/Input";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import toast from "react-hot-toast";
import { Race } from "@prisma/client";

interface NewRaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  race?: Race;
}

const NewRaceModal: FC<NewRaceModalProps> = ({ isOpen, onClose, race }) => {
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
      name: race?.name || "",
      description: race?.description || "",
      image: race?.image || "",
      uniqueSkillName: race?.uniqueSkillName || "",
      uniqueSkillDescription: race?.uniqueSkillDescription || "",
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const cleanForm = () => {
    setValue("name", "");
    setValue("description", "");
    setValue("image", "");
    setValue("uniqueSkillName", "");
    setValue("uniqueSkillDescription", "");
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (race) {
      axios
        .put("/api/races", {
          ...data,
          id: race.id,
        })
        .then(() => {
          router.refresh();
          onClose();
          toast.success("Raça editada com sucesso!");
          cleanForm();
        })
        .catch(() => {
          toast.error("Erro ao editar a raça!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .post("/api/races", data)
        .then(() => {
          router.refresh();
          onClose();
          toast.success("Raça criada com sucesso!");
          cleanForm();
        })
        .catch(() => {
          toast.error("Erro ao criar a raça!");
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
              {race ? "Editar" : "Adicionar nova raça"}
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {race ? "Edite os dados da raça" : "Adicione uma nova raça."}
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
              <Input
                register={register}
                label="Habilidade Racial"
                id="uniqueSkillName"
                required
                errors={errors}
              />
              <Input
                register={register}
                label="Descrição da Habilidade Racial"
                id="uniqueSkillDescription"
                required
                errors={errors}
                type="textarea"
              />
              <div className="flex flex-col items-center">
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onUpload={handleUpload}
                  uploadPreset="ee2vxejr"
                >
                  <Button disabled={isLoading} variant={"ghost"}>
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
            {race ? "Editar" : "Adicionar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewRaceModal;
