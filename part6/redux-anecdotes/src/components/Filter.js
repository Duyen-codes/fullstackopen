import React from "react";
import { useDispatch } from "react-redux";
import { handleFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = (props) => {
  // const dispatch = useDispatch();
  return (
    <div>
      filter{" "}
      <input type="text" onChange={(e) => props.handleFilter(e.target.value)} />
    </div>
  );
};

const mapDispatchToProps = {
  handleFilter,
};

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);
export default ConnectedFilter;
// export default Filter;
