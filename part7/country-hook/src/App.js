import { useState, useEffect } from "react";
import axios from "axios";

// useField custom hook
const useField = (type) => {
  console.log("TYPE inside useField: ", type);
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  console.log("VALUE inside useField: ", value);
  return {
    type,
    value,
    onChange,
  };
}; // end of useField custom hook

// useCountry custom hook
const useCountry = (name) => {
  console.log("NAME: ", name);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      const fetchCountry = async () => {
        {
          try {
            const response = await axios.get(
              `https://restcountries.com/v3.1/name/${name}?fullText=true`
            );

            console.log("RESPONSE: ", response.data);
            setCountry(response.data);
          } catch (error) {
            console.log(error);
            setCountry(null);
          }
        }
      };
      fetchCountry();
    }
  }, [name]);
  console.log("COUNTRY inside useCountry: ", country);

  return country;
}; // end of useCountry custom hook

const Country = ({ country }) => {
  console.log("COUNTRY inside country component: ", country);
  console.log("TYPEOF COUNTRY: ", typeof country);
  if (!country) {
    return null;
  }

  if (!country.found) {
    <div>not found...</div>;
  }
  return (
    <div>
      <h3>{country?.name?.common}</h3>
      <div>population {country.population}</div>
      <div>capital {country.capital}</div>
      <img
        src={country?.flags?.png}
        height="100"
        alt={`flag of ${country?.name?.common}`}
      />
    </div>
  );
}; // end of Country component

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);
  console.log("COUNTRY in APP: ", country);
  console.log("COUNTRY custom hook from APP.js: ", country);
  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
    console.log("find clicked");
    console.log("nameInput.value: ", nameInput.value);
    console.log("NAME STATE inside APP: ", name);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
