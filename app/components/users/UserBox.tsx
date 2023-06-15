import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import Avatar from "../Avatar";
import LoadingModal from "../modals/LoadingModal";
import { Trash } from "lucide-react";

interface UserBoxProps {
  data: User;
  isAdmin: boolean;
}

const UserBox: FC<UserBoxProps> = ({ data, isAdmin }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((response) => {
        router.push(`/conversations/${response.data.id}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [data.id, router]);

  const handleDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .post(`/api/users`, {
        id: data.id,
      })
      .then(() => {
        router.refresh();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [data.id, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div className="inline-flex items-center justify-between w-full gap-2">
        <div
          onClick={handleClick}
          className="w-full relative flex items-center space-x-3 bg-white p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
        >
          <Avatar user={data} />
          <div className="flex-1 min-w-0">
            <div className="focus:outline-none">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-gray-900">{data.name}</p>
              </div>
            </div>
          </div>
        </div>
        {isAdmin && (
          <div
            className="rounded-full text-red-400 bg-red-100 cursor-pointer p-2 hover:bg-red-200 hover:text-red-500"
            onClick={handleDelete}
          >
            <Trash size={16} />
          </div>
        )}
      </div>
    </>
  );
};

export default UserBox;
