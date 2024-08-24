import React from "react";
import { declineReq } from "~/server/action";
const DeclineRequest = ({ id }: { id: number }) => {
  const declineWithId = declineReq.bind(null, id);
  return (
    <form action={declineWithId}>
      <button className="btn btn-error btn-sm" type="submit">
        Decline
      </button>
    </form>
  );
};

export default DeclineRequest;
