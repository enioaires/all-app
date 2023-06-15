"use client";
import { Spell } from "@prisma/client";
import { ChevronLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";
import NewSpellModal from "../modals/NewSpellModal";

interface HeaderProps {
  spell: Spell | null;
}

const Header: FC<HeaderProps> = ({ spell }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <NewSpellModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        spell={spell!}
      />
      <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/spells"
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          >
            <ChevronLeft size={32} />
          </Link>

          <div className="flex gap-4 items-center">
            <div>{spell?.name}</div>
            <div>Nv.{spell?.level}</div>
            <div
              className="bg-gray-100 rounded-full p-2 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => setIsModalOpen(true)}
            >
              <Pencil size={20} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
