"use client";
import { Race } from "@prisma/client";
import Image from "next/image";
import { FC, useState } from "react";
import ImageModal from "../modals/ImageModal";

interface BodyProps {
  race: Race | null;
}

const Body: FC<BodyProps> = ({ race }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <ImageModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        src={race?.image}
      />
      <div className="flex-1 overflow-y-auto p-8 gap-10 flex flex-col">
        <h2 className="font-medium text-xl text-gray-900">Detalhes:</h2>
        <div className="inline-flex gap-8">
          {race?.image && (
            <Image
              height={255}
              width={355}
              alt="race"
              src={race.image}
              className="rounded-sm"
            />
          )}
          <h2 className="mt-12 font-medium text-md text-gray-700">
            {race?.description}
          </h2>
        </div>
        <h2 className="mt-8 font-medium text-xl text-gray-900">
          Habilidade Racial:
        </h2>

        <div className="flex flex-col gap-6 font-medium text-md text-gray-700">
          <b>{race?.uniqueSkillName}</b>
          {race?.uniqueSkillDescription}
        </div>
      </div>
    </>
  );
};

export default Body;
