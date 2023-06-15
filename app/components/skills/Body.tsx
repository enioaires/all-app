"use client";
import { Skill } from "@prisma/client";
import { FC } from "react";

interface BodyProps {
  skill: Skill | null;
}

const Body: FC<BodyProps> = ({ skill }) => {
  return (
    <div className="flex-1 overflow-y-auto p-8 flex flex-col">
      <h2 className="font-medium text-xl text-gray-900">
        Descriçao do talento:
      </h2>
      <div className="inline-flex gap-8">
        <h2 className="mt-12 font-medium text-md text-gray-700">
          {skill?.description}
        </h2>
      </div>
    </div>
  );
};

export default Body;
