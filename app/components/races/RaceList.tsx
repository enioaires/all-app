"use client";
import { Race } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import RaceBox from "./RaceBox";
import { Plus } from "lucide-react";
import NewRaceModal from "../modals/NewRaceModal";
import Input from "../inputs/Input";
import { useForm, FieldValues } from "react-hook-form";

interface RaceListProps {
  items: Race[];
}

const RaceList: FC<RaceListProps> = ({ items }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);

  const {
    register,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      search: "",
    },
  });

  const search = watch("search");

  useEffect(() => {
    if (search) {
      setFilteredItems(
        items.filter((item) =>
          item.name!.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredItems(items);
    }
  }, [search, items]);

  return (
    <>
      <NewRaceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
        <div className="px-5">
          <div className="flex justify-between items-center mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Raças</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
            >
              <Plus size={24} />
            </div>
          </div>
          <Input
            label=""
            id="search"
            register={register}
            errors={errors}
            placeholder={"Buscar"}
          />
          <div className="mt-4">
            {filteredItems.map((item) => (
              <RaceBox key={item.id} data={item} />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default RaceList;
