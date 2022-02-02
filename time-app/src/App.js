import { useEffect, useState } from "react";
import cityTimeZone from "city-timezones";
import axios from "axios";
import Select from "react-select";

const defaultInput = {
  city: ""
};

export default function App() {
  let myCity = "delhi";
  // let myCity = value from onChange.split(' - ')[0]?
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
  //   const flatCityMap = (arr) => {
  //     const flatObject = {};
  //     for (let i = 0; i < arr.length; i++) {
  //       for (const property in arr[i]) {
  //         flatObject[`${property}_${i}`] = arr[i][property];
  //       }
  //     }
  //     return flatObject;
  //   };
  //   console.log(cityMapping);
  //   console.log(flatCityMap(cityMapping));

  //   const options = [
  //     { value: "London", label: "GMT - GMT" },
  //     { value: "Warsaw", label: "ECT - GMT+1:00" },
  //     { value: "Aleppo", label: "EET - GMT+2:00" },
  //     { value: "Cairo", label: "ART - GMT+2:00" },
  //     { value: "Nairobi", label: "EAT - GMT+3:00" },
  //     { value: "", label: "MET - GMT+3:30" },
  //     { value: "", label: "NET - GMT+4:00" },
  //     { value: "", label: "PLT - GMT+5:00" },
  //     { value: "", label: "IST - GMT+5:30" },
  //     { value: "", label: "BST - GMT+6:00" },
  //     { value: "", label: "VST - GMT+7:00" },
  //     { value: "", label: "CTT - GMT+8:00" },
  //     { value: "", label: "JST - GMT+9:00" },
  //     { value: "", label: "ACT - GMT+9:30" },
  //     { value: "", label: "AET - GMT+10:00" },
  //     { value: "", label: "SST - GMT+11:00" },
  //     { value: "", label: "NST - GMT+12:00" },
  //     { value: "", label: "MIT - GMT-11:00" },
  //     { value: "", label: "HST - GMT-10:00" },
  //     { value: "", label: "AST - GMT-9:00" },
  //     { value: "", label: "PST - GMT-8:00" },
  //     { value: "Los Angeles", label: "PNT - GMT-7:00" },
  //     { value: "Boulder", label: "MST - GMT-7:00" },
  //     { value: "Dallas", label: "CST - GMT-6:00" },
  //     { value: "New York", label: "EST - GMT-5:00" },
  //     { value: "", label: "IET - GMT-5:00" },
  //     { value: "", label: "PRT - GMT-4:00" },
  //     { value: "", label: "CNT - GMT-3:00" },
  //     { value: "", label: "AGT - GMT-3:00" },
  //     { value: "", label: "BET - GMT-3:00" },
  //     { value: "", label: "CAT - GMT-1:00" }
  //   ];

  //   const options2 = [
  //     { value: "Alofi", label: "Alofi" },
  //     { value: "Honolulu", label: "Honolulu" },
  //     { value: "Taiohae", label: "Taiohae" },
  //     { value: "Juneau", label: "Juneau" },
  //     { value: "Los Angeles", label: "Los Angeles" },
  //     { value: "Idaho Falls", label: "Idaho Falls - MST" },
  //     { value: "NYC", label: "NYC - EST" },
  //     { value: "London", label: "London - GMT" },
  //     { value: "Moscow", label: "Moscow" },
  //     { value: "Delhi", label: "Delhi" }
  //   ];

  //   const handleChange = (e) => {
  //     setTextInput({
  //       ...textInput,
  //       [e.target.name]: e.target.value
  //     });
  //   };

  const findRangeIntersection = (arr1 = [], arr2 = []) => {
    const [el11, el12] = arr1;
    const [el21, el22] = arr2;
    const leftLimit = Math.max(el11, el21);
    const rightLimit = Math.min(el12, el22);
    return [leftLimit, rightLimit];
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
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
      <div>
        <Select options={options} />
      </div>

      {/* <main>
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
      </main> */}
      <div>
        my start time
        <input type='time' onChange={(e) => setMyStartTime(e.target.value)} />
      </div>
      <div>
        my end time
        <input type='time' onChange={(e) => setMyEndTime(e.target.value)} />
      </div>
      <div>
        <Select options={options2} />
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
