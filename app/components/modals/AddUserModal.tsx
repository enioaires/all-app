"use client";
import { FC, useState } from "react";
import Modal from "./Modal";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "../Button";
import Input from "../inputs/Input";
import Select from "../inputs/Select";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal: FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const options = [
    { value: "admin", label: "Administrador" },
    { value: "user", label: "Usuário" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
  });

  const role = watch("role");

  const handleClean = () => {
    setValue("name", "");
    setValue("email", "");
    setValue("role", "");
  };

  const handleClose = () => {
    onClose();
    handleClean();
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", {
        ...data,
        role: data.role.value,
        password: `123456`,
      })
      .then((res) => {
        router.refresh();
        handleClose();
        toast.success(`Usuário ${res.data.name} criado com sucesso`);
      })
      .catch(() => {
        handleClose();
        toast.error("Erro ao criar novo usuário");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Criar um novo usuário
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Preencha os campos abaixo para criar um novo usuário.
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
                label="Email"
                id="email"
                required
                errors={errors}
              />
              <Select
                disabled={isLoading}
                label="Função"
                options={options.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
                onChange={(value) =>
                  setValue("role", value, {
                    shouldValidate: true,
                  })
                }
                value={role}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-x-6">
          <Button variant={"cancel"} type="button" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            Criar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUserModal;
