"use client";
import { FC, useCallback, useState } from "react";
import Modal from "../modals/Modal";
import { Button } from "../Button";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import toast from "react-hot-toast";
import { AlertTriangle } from "lucide-react";
import { Dialog } from "@headlessui/react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => {
        toast.error("Erro ao deletar conversa");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [conversationId, onClose, router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Excluir chat
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Tem certeza que deseja excluir essa conversa? Essa ação não pode
              ser desfeita.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 sm:mt-6 sm:flex sm: flex-row-reverse">
        <Button
          variant={"cancel"}
          size={"mini"}
          disabled={isLoading}
          onClick={onDelete}
        >
          Confirmar
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
