import getRaceById from "@/app/actions/getRaceById";
import EmptyState from "@/app/components/EmptyState";
import Body from "@/app/components/races/Body";
import Header from "@/app/components/races/Header";
import { FC } from "react";

interface IParams {
  raceId: string;
}

const RaceId = async ({ params }: { params: IParams }) => {
  const { raceId } = params;

  const race = await getRaceById(raceId);

  if (!raceId) {
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
        <Header race={race} />
        <Body race={race} />
      </div>
    </div>
  );
};

export default RaceId;
