import getClasses from "@/app/actions/getClasses";
import ClassList from "@/app/components/classes/ClassList";
import Sidebar from "@/app/components/sidebar/Sidebar";

interface layoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: layoutProps) => {
  const classes = await getClasses();
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <ClassList items={classes} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default layout;
