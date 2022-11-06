import React from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { handleFilter } from "../reducers/filterReducer";

// the connect function can be used for transforming regular React components so that the state of the Redux store can be mapped into the component's props

const Filter = (props) => {
  // const dispatch = useDispatch();
  const handleChange = (event) => {
    // dispatch(handleFilter(event.target.value));
    props.handleFilter(event.target.value);
  };

  const style = {
    marginBottom: 10,
  };
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  handleFilter,
};

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);

export default ConnectedFilter;
