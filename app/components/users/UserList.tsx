"use client";
import { User } from "@prisma/client";
import { FC, useState } from "react";
import UserBox from "./UserBox";
import { Plus } from "lucide-react";
import AddUserModal from "../modals/AddUserModal";

interface UserListProps {
  items: User[];
  isAdmin: boolean;
}

const UserList: FC<UserListProps> = ({ items, isAdmin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
        <div className="px-5">
          <div className="flex justify-between items-center mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Usuários</div>
            {isAdmin && (
              <div
                onClick={() => setIsModalOpen(true)}
                className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
              >
                <Plus size={24} />
              </div>
            )}
          </div>
          <div className="mt-4">
            {items.map((item) => (
              <UserBox key={item.id} data={item} isAdmin={isAdmin} />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default UserList;
