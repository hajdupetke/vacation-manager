import React from "react";
import { acceptRequest } from "~/server/action";

const AcceptRequest = ({ id }: { id: number }) => {
  const acceptWithId = acceptRequest.bind(null, id);
  return (
    <form action={acceptWithId}>
      <button className="btn btn-success btn-sm" type="submit">
        Accept
      </button>
    </form>
  );
};

export default AcceptRequest;
