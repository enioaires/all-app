import EmptyState from "@/app/components/EmptyState";
import { FC } from "react";

const Users: FC = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div>
  );
};

export default Users;
