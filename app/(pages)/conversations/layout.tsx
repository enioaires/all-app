import getCoversations from "@/app/actions/getConversations";
import getUsers from "@/app/actions/getUsers";
import ConversationList from "@/app/components/conversations/ConversationList";
import Sidebar from "@/app/components/sidebar/Sidebar";
import { ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout = async ({ children }: layoutProps) => {
  const conversations = await getCoversations();
  const users = await getUsers();
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList users={users} initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default layout;
