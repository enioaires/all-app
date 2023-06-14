"use client";
import { usePathname } from "next/navigation";
import useConversation from "./useConversation";
import { useMemo } from "react";
import { LogOut, MessageSquare, Users } from "lucide-react";
import { signOut } from "next-auth/react";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: MessageSquare,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Usuários",
        href: "/users",
        icon: Users,
        active: pathname === "/users",
      },
      {
        label: "Sair",
        href: "#",
        icon: LogOut,
        onCLick: () => signOut(),
      },
    ],
    [conversationId, pathname]
  );

  return routes;
};

export default useRoutes;
