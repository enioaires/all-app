import getCurrentUser from "@/app/actions/getCurrentUser";
import getUsers from "@/app/actions/getUsers";
import Sidebar from "@/app/components/sidebar/Sidebar";
import UserList from "@/app/components/users/UserList";

interface layoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: layoutProps) => {
  const users = await getUsers();
  const currentUser = await getCurrentUser();

  const isAdmin = currentUser?.role === "admin";

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <UserList items={users} isAdmin={isAdmin} />
        {children}
      </div>
    </Sidebar>
  );
};

export default layout;
