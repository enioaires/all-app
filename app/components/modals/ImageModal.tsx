"use client";
import { FC } from "react";
import Modal from "./Modal";
import InnerImageZoom from "react-inner-image-zoom";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-auto">
        <InnerImageZoom src={src || ""} zoomSrc={src || ""} hideCloseButton />
      </div>
    </Modal>
  );
};

export default ImageModal;
