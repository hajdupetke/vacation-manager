import React from "react";
import { deleteCategory } from "~/server/action";

export const DeleteCategory = ({ id }: { id: number }) => {
  const deleteCategoryWithId = deleteCategory.bind(null, id);

  return (
    <form action={deleteCategoryWithId}>
      <button className="btn btn-error" type="submit">
        Delete
      </button>
    </form>
  );
};
