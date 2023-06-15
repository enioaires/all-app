"use client";
import { FC, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "../Button";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import { Spell } from "@prisma/client";

interface NewSpellModalProps {
  isOpen: boolean;
  onClose: () => void;
  spell?: Spell;
}

const NewSpellModal: FC<NewSpellModalProps> = ({ isOpen, onClose, spell }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: spell?.name || "",
      description: spell?.description || "",
      level: spell?.level || 0,
    },
  });

  const cleanForm = () => {
    setValue("name", "");
    setValue("description", "");
    setValue("level", 0);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (spell) {
      axios
        .put(`/api/spells`, {
          id: spell.id,
          ...data,
          level: Number(data.level),
        })
        .then(() => {
          router.refresh();
          onClose();
          toast.success("Magia editada com sucesso!");
        })
        .catch(() => {
          toast.error("Erro ao editar a magia!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .post("/api/spells", {
          ...data,
          level: Number(data.level),
        })
        .then(() => {
          router.refresh();
          onClose();
          toast.success("Magia adicionada com sucesso!");
          cleanForm();
        })
        .catch(() => {
          toast.error("Erro ao adicionar a magia!");
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
              Adicionar uma nova magia
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Preencha os campos abaixo para adicionar uma nova magia.
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
                label="Nível da magia"
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
            {spell ? "Editar" : "Adicionar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewSpellModal;
