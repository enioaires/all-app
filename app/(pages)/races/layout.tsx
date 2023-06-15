import getRaces from "@/app/actions/getRaces";
import RaceList from "@/app/components/races/RaceList";
import Sidebar from "@/app/components/sidebar/Sidebar";

interface layoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: layoutProps) => {
  const races = await getRaces();
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <RaceList items={races} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default layout;
