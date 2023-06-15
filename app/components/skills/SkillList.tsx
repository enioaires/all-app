"use client";
import { Skill } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import SkillBox from "./SkillBox";
import NewSkillModal from "../modals/NewSkillModal";
import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../Button";

interface SkillListProps {
  items: Skill[];
}

const SkillList: FC<SkillListProps> = ({ items }) => {
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
      <NewSkillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
        <div className="px-5">
          <div className="flex justify-between items-center mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Talentos</div>
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
              <SkillBox key={item.id} data={item} />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SkillList;
