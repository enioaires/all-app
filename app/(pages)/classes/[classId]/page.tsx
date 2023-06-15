import getClassById from "@/app/actions/getClassById";
import EmptyState from "@/app/components/EmptyState";
import Body from "@/app/components/classes/Body";
import Header from "@/app/components/classes/Header";
import { FC } from "react";

interface IParams {
  classId: string;
}

const ClassId = async ({ params }: { params: IParams }) => {
  const { classId } = params;

  const currentClass = await getClassById(classId);

  if (!classId) {
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
        <Header currentClass={currentClass} />
        <Body currentClass={currentClass} />
      </div>
    </div>
  );
};

export default ClassId;
