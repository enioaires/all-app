import getCurrentUser from "@/app/actions/getCurrentUser";
import getSkills from "@/app/actions/getSkills";
import Sidebar from "@/app/components/sidebar/Sidebar";
import SkillList from "@/app/components/skills/SkillList";

interface layoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: layoutProps) => {
  const skills = await getSkills();
  const currentUser = await getCurrentUser();
  const isAdmin = currentUser?.role === "admin";
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <SkillList items={skills} isAdmin={isAdmin} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default layout;
