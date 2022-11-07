import React from "react";
import { useDispatch } from "react-redux";
import { handleFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  return (
    <div>
      filter{" "}
      <input
        type="text"
        onChange={(e) => dispatch(handleFilter(e.target.value))}
      />
    </div>
  );
};

export default Filter;
