import { useEffect, useState } from "react";
import cityTimeZone from "city-timezones";
import axios from "axios";

const defaultInput = {
  city: ""
};

export default function App() {
  let myCity = "delhi";
  let myColleguesCity = "moscow";

  const api_key = "FAJIO7OXE21N";
  const [offset, setOffset] = useState(1);
  const [myStartTime, setMyStartTime] = useState("");
  const [myEndTime, setMyEndTime] = useState("");
  const [colleguesStartTime, setColleguesStartTime] = useState("");
  const [ColleguesEndTime, setColleguesEndTime] = useState("");
  const [result, setResult] = useState(null);
  // timeZone

  const [textInput, setTextInput] = useState(defaultInput);
  const cityMapping = cityTimeZone.cityMapping;
  console.log(cityMapping);

  const handleChange = (e) => {
    setTextInput({
      ...textInput,
      [e.target.name]: e.target.value
    });
  };

  const findRangeIntersection = (arr1 = [], arr2 = []) => {
    const [el11, el12] = arr1;
    const [el21, el22] = arr2;
    const leftLimit = Math.max(el11, el21);
    const rightLimit = Math.min(el12, el22);
    return [leftLimit, rightLimit];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adding offset to the collegues time, as it will convert collegues time to local time
    let localCollegueStartTime =
      Number(colleguesStartTime.split(":")[0]) + offset;
    let localCollegueEndTime = Number(ColleguesEndTime.split(":")[0]) + offset;

    let resultString = ``;

    // To find the time overlapping
    const result = findRangeIntersection(
      [Number(myStartTime.split(":")[0]), Number(myEndTime.split(":")[0])],
      [localCollegueStartTime, localCollegueEndTime]
    );

    resultString = `${result[0]} - ${result[1]}`;
    setResult(resultString);
  };

  const getTimezoneDifference = async (from, to) => {
    try {
      const res = await axios.get(
        "http://api.timezonedb.com/v2.1/convert-time-zone",
        { params: { key: api_key, from, to, format: "json" } }
      );

      // This will give us timestamp difference between two cities
      console.log(res.data);
      let offset = res.data.offset / 3600; // We are dividing by 3600 to get hours

      setOffset(offset);
    } catch (error) {
      console.log(error.message);
    }
  };

  // START HERE:
  useEffect(() => {
    let [myTimezone = {}] = cityTimeZone.lookupViaCity(myCity);
    let [collegueTimezone = {}] = cityTimeZone.lookupViaCity(myColleguesCity);

    // SET TIMEZONE DIFFERENCE: We are setting offset here, offset is the difference between two cities.
    getTimezoneDifference(collegueTimezone.timezone, myTimezone.timezone);
  }, []);

  return (
    <div className='App'>
      {/* THE API FOR CITIES */}
      <main>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='city'>Select your City</label>
            <div className='form-field select'>
              <select
                id='city'
                name='city'
                onChange={handleChange}
                value={textInput.city}
              >
                <option value=''>None Selected</option>
                <option value='moscow'>Moscow</option>
                <option value='delhi'>Delhi</option>
              </select>
              <span className='focus'></span>
            </div>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </main>
      <div>
        my start time
        <input type='time' onChange={(e) => setMyStartTime(e.target.value)} />
      </div>
      <div>
        my end time
        <input type='time' onChange={(e) => setMyEndTime(e.target.value)} />
      </div>
      <div>
        collegue start time
        <input
          type='time'
          onChange={(e) => setColleguesStartTime(e.target.value)}
        />
      </div>
      <div>
        collegue end time
        <input
          type='time'
          onChange={(e) => setColleguesEndTime(e.target.value)}
        />
      </div>
      <button type='button' onClick={handleSubmit}>
        Get Over lapping hours
      </button>
      <div>{result && result}</div>
    </div>
  );
}
