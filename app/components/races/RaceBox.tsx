import { Race } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import LoadingModal from "../modals/LoadingModal";

interface RaceBoxProps {
  data: Race;
}

const RaceBox: FC<RaceBoxProps> = ({ data }) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`races/${data.id}`);
  }, [data.id, router]);

  return (
    <div
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 bg-white p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceBox;
