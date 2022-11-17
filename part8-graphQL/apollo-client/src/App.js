import { gql, useQuery } from "@apollo/client";
import Persons from "./components/Persons";

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

const App = () => {
  const result = useQuery(ALL_PERSONS);
  console.log("result", result);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return <Persons persons={result.data.allPersons} />;
};

export default App;
