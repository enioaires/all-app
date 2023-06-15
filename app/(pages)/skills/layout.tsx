import getSkills from "@/app/actions/getSkills";
import Sidebar from "@/app/components/sidebar/Sidebar";
import SkillList from "@/app/components/skills/SkillList";

interface layoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: layoutProps) => {
  const skills = await getSkills();
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <SkillList items={skills} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default layout;
