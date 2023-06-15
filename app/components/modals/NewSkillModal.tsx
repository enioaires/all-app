"use client";
import { FC, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "../Button";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import { Skill } from "@prisma/client";

interface NewSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill?: Skill;
}

const NewSkillModal: FC<NewSkillModalProps> = ({ isOpen, onClose, skill }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: skill?.name || "",
      description: skill?.description || "",
      level: skill?.level || 0,
    },
  });

  const cleanForm = () => {
    setValue("name", "");
    setValue("description", "");
    setValue("level", 0);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (skill) {
      axios
        .put(`/api/skills`, {
          id: skill.id,
          ...data,
          level: Number(data.level),
        })
        .then(() => {
          router.refresh();
          onClose();
          toast.success("Talento editado com sucesso!");
        })
        .catch(() => {
          toast.error("Erro ao editar o talento!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .post("/api/skills", {
          ...data,
          level: Number(data.level),
        })
        .then(() => {
          router.refresh();
          onClose();
          toast.success("Talento adicionado com sucesso!");
          cleanForm();
        })
        .catch(() => {
          toast.error("Erro ao adicionar o talento!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleOnCancel = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Adicionar um novo talento
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Preencha os campos abaixo para adicionar um novo talento.
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
                label="Nível do talento"
                id="level"
                required
                errors={errors}
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-x-6">
          <Button variant={"cancel"} type="button" onClick={handleOnCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {skill ? "Editar" : "Adicionar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewSkillModal;
