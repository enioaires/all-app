import getSpellById from "@/app/actions/getSpellById";
import EmptyState from "@/app/components/EmptyState";
import Body from "@/app/components/spells/Body";
import Header from "@/app/components/spells/Header";

interface IParams {
  spellId: string;
}

const SpellId = async ({ params }: { params: IParams }) => {
  const { spellId } = params;

  const spell = await getSpellById(spellId);

  if (!spellId) {
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
        <Header spell={spell} />
        <Body spell={spell} />
      </div>
    </div>
  );
};

export default SpellId;
