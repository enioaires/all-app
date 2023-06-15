"use client";
import { Class } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";

interface BodyProps {
  currentClass: Class | null;
}

const Body: FC<BodyProps> = ({ currentClass }) => {
  return (
    <div className="flex-1 overflow-y-auto p-8 gap-10 flex flex-col">
      <h2 className="font-medium text-xl text-gray-900">Detalhes:</h2>
      <div className="inline-flex gap-8">
        {currentClass?.image && (
          <Image
            height={255}
            width={355}
            alt="currentClass"
            src={currentClass.image}
            className="rounded-sm"
          />
        )}
        <h2 className="mt-12 font-medium text-md text-gray-700">
          {currentClass?.description}
        </h2>
      </div>
    </div>
  );
};

export default Body;
