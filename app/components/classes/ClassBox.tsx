import { Class } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import LoadingModal from "../modals/LoadingModal";
import { Trash } from "lucide-react";
import axios from "axios";

interface ClassBoxProps {
  data: Class;
}

const ClassBox: FC<ClassBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    router.push(`classes/${data.id}`);
  }, [data.id, router]);

  const handleDelete = useCallback(() => {
    axios.post("api/classes/delete", { id: data.id }).then(() => {
      router.refresh();
    });
  }, [data.id, router]);

  return (
    <div className="flex items-center justify-between gap-2">
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="w-full relative flex items-center space-x-3 bg-white p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="rounded-full text-red-400 bg-red-100 cursor-pointer p-2 hover:bg-red-200 hover:text-red-500"
        onClick={handleDelete}
      >
        <Trash size={16} />
      </div>
    </div>
  );
};

export default ClassBox;
