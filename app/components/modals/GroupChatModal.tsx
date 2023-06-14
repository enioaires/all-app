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

interface GroupChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then((res) => {
        router.refresh();
        onClose();
      })
      .catch(() => {
        "Erro ao criar grupo";
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
              Criar um grupo
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Grupos são conversas privadas entre você e outros membros.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                label="Nome do grupo"
                id="name"
                required
                errors={errors}
              />
              <Select
                disabled={isLoading}
                label="members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-x-6">
          <Button variant={"cancel"} type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Criar</Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
