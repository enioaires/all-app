"use client";
import { usePathname } from "next/navigation";
import useConversation from "./useConversation";
import { useMemo } from "react";
import {
  Atom,
  LogOut,
  MessageSquare,
  ScrollText,
  Users,
  Flame,
  Swords,
} from "lucide-react";
import { signOut } from "next-auth/react";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Usuários",
        href: "/users",
        icon: Users,
        active: pathname === "/users",
      },
      // {
      //   label: "Chat",
      //   href: "/conversations",
      //   icon: MessageSquare,
      //   active: pathname === "/conversations" || !!conversationId,
      // },
      {
        label: "Classes",
        href: "/classes",
        icon: ScrollText,
        active: pathname === "/classes",
      },
      {
        label: "Raças",
        href: "/races",
        icon: Atom,
        active: pathname === "/races",
      },
      {
        label: "Magias",
        href: "/spells",
        icon: Flame,
        active: pathname === "/spells",
      },
      {
        label: "Talentos",
        href: "/skills",
        icon: Swords,
        active: pathname === "/skills",
      },
      {
        label: "Sair",
        href: "#",
        icon: LogOut,
        onCLick: () => signOut(),
      },
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
