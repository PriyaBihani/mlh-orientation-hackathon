import { useState } from "react";
import { createFilter } from "react-select";

import data from "./data.json";
import CustomOption from "./components/CustomOption";
import CustomMenuList from "./components/CustomMenuList";
import Header from "./components/Header";
import AppWrapper from "./components/AppWrapper";
import FormField from "./components/FormField";
import SelectField from "./components/SelectField";
import Button from "./components/Button";
import Form from "./components/Form";

import { getTimezoneDifference, findRangeIntersection } from "./helpers";

const { options } = data;

export default function App() {
  const [myStartTime, setMyStartTime] = useState("");
  const [myEndTime, setMyEndTime] = useState("");
  const [colleaguesStartTime, setColleaguesStartTime] = useState("");
  const [colleaguesEndTime, setColleaguesEndTime] = useState("");
  const [result, setResult] = useState(null);
  const [myCity, setMyCity] = useState("");
  const [myColleaguesCity, setColleaguesCity] = useState("");

  const handleSubmit = async () => {
    if (!myStartTime || !myEndTime || !colleaguesStartTime || !colleaguesEndTime || !myCity || !myColleaguesCity) {
      window.alert("Please fill all the fields");
    }

    let offset = await getTimezoneDifference(myColleaguesCity, myCity);
    let localColleagueStartTime = Number(colleaguesStartTime.split(":")[0]) + offset;
    let localColleagueEndTime = Number(colleaguesEndTime.split(":")[0]) + offset;

    let resultString = ``;

    const result = findRangeIntersection(
      [Number(myStartTime.split(":")[0]), Number(myEndTime.split(":")[0])],
      [localColleagueStartTime, localColleagueEndTime]
    );

    resultString = `${result[0]}:00 - ${result[1]}:00 `;
    setResult(resultString);
  };

  return (
    <AppWrapper>
      {result ? (
        <Header title="Your shared working hours:">
          <span>{result}</span>
        </Header>
      ) : (
        <Header title="Find your shared working hours" />
      )}

      <div className="splitter gap-top-600">
        <Form>
          <SelectField
            onChange={(obj) => setMyCity(obj.value)}
            options={options}
            filterOption={createFilter({ ignoreAccents: false })}
            components={{ Option: CustomOption, MenuList: CustomMenuList }}
            title="My location"
          />
          <FormField onChange={(e) => setMyStartTime(e.target.value)} label="My start time" />
          <FormField onChange={(e) => setMyEndTime(e.target.value)} label="My end time" />
        </Form>
        <Form>
          <SelectField
            onChange={(obj) => setColleaguesCity(obj.value)}
            options={options}
            filterOption={createFilter({ ignoreAccents: false })}
            components={{ Option: CustomOption, MenuList: CustomMenuList }}
            title="Teammate's location"
          />
          <FormField onChange={(e) => setColleaguesStartTime(e.target.value)} label="Teammate's start time" />
          <FormField onChange={(e) => setColleaguesEndTime(e.target.value)} label="Teammate's end time" />
        </Form>
      </div>
      <Button onClick={handleSubmit} />
    </AppWrapper>
  );
}
