import React from "react";

const Filter = ({ searchFilter, handleSearchFilter }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={searchFilter} onChange={handleSearchFilter} />
    </div>
  );
};

export default Filter;
