import { LeaveState } from "@prisma/client";
import React from "react";

const StatusBadge = ({ status }: { status: LeaveState }) => {
  if (status == LeaveState.ACCEPTED) {
    return <div className="badge badge-success">Accepted</div>;
  } else if (status == LeaveState.PENDING) {
    return <div className="badge badge-warning">Pending</div>;
  } else {
    return <div className="badge badge-error">Declined</div>;
  }
};

export default StatusBadge;
