import React, { useState } from "react";
import { Select } from "./components/select/select";
import { countries } from "./mock/countries";
import "./App.css";
import { Strings } from "./constants";

function App() {
  const [list, setList] = useState([]);

  const alertList = () => alert(list.map((item) => item.label).join(", "));

  return (
    <div className="app">
      <div>
        <Select
          options={countries}
          placeholder={Strings.SELECT}
          onChange={setList}
          multiple
        />

        {!!list.length && <button onClick={alertList}>Alert list!</button>}
      </div>
    </div>
  );
}

export default App;
