import getClasses from "@/app/actions/getClasses";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClassList from "@/app/components/classes/ClassList";
import Sidebar from "@/app/components/sidebar/Sidebar";

interface layoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: layoutProps) => {
  const classes = await getClasses();
  const currentUser = await getCurrentUser();

  const isAdmin = currentUser?.role === "admin";
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <ClassList items={classes} isAdmin={isAdmin} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default layout;
