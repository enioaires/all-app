import getSkillById from "@/app/actions/getSkillById";
import EmptyState from "@/app/components/EmptyState";
import Body from "@/app/components/skills/Body";
import Header from "@/app/components/skills/Header";

interface IParams {
  skillId: string;
}

const SkillId = async ({ params }: { params: IParams }) => {
  const { skillId } = params;

  const skill = await getSkillById(skillId);

  if (!skillId) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header skill={skill} />
        <Body skill={skill} />
      </div>
    </div>
  );
};

export default SkillId;
