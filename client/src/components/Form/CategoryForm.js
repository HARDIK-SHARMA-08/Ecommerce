import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center px-1.5 pointer-events-none">
              <AddIcon color="action" fontSize="large" />
            </div>
            <input
              type="text"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-[var(--black-color)] rounded-lg bg-white focus:ring-[var(--black-color)] focus:border-[var(--black-color)] "
              placeholder="Create new Category..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-[var(--red-color)] hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
