"use client";
import { FC } from "react";
import Modal from "./Modal";
import Image from "next/image";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image src={src || ""} alt="image" fill className="object-cover" />
      </div>
    </Modal>
  );
};

export default ImageModal;
