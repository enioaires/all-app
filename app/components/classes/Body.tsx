"use client";
import { Class } from "@prisma/client";
import Image from "next/image";
import { FC, useState } from "react";
import ImageModal from "../modals/ImageModal";

interface BodyProps {
  currentClass: Class | null;
}

const Body: FC<BodyProps> = ({ currentClass }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <ImageModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        src={currentClass?.image}
      />
      <div className="flex-1 overflow-y-auto p-8 gap-10 flex flex-col">
        <div className="inline-flex gap-8">
          {currentClass?.image && (
            <Image
              height={255}
              width={355}
              alt="image"
              src={currentClass.image}
              className="rounded-sm cursor-pointer"
              onClick={() => setModalIsOpen(true)}
            />
          )}
          <h2 className="mt-12 font-medium text-md text-gray-700">
            {currentClass?.description}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Body;
