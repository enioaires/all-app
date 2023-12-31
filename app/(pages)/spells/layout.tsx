import getCurrentUser from "@/app/actions/getCurrentUser";
import getSpells from "@/app/actions/getSpells";
import Sidebar from "@/app/components/sidebar/Sidebar";
import SpellList from "@/app/components/spells/SpellList";

interface layoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: layoutProps) => {
  const spells = await getSpells();
  const currentUser = await getCurrentUser();

  const isAdmin = currentUser?.role === "admin";
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <SpellList items={spells} isAdmin={isAdmin} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default layout;
