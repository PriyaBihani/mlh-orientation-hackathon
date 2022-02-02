import { useEffect, useState } from "react";
import cityTimeZone from "city-timezones";
import axios from "axios";
import Select from "react-select";

// const defaultInput = {
//   city: "",
//   city2: ""
// };

export default function App() {
  let myCity = "delhi";
  // let myCity = value grabbed from the dropdown menu
  // let myCityLookup = cityTimezones.lookupViaCity(myCity)
  let myColleguesCity = "moscow";

  const api_key = "FAJIO7OXE21N";
  const [offset, setOffset] = useState(1);
  const [myStartTime, setMyStartTime] = useState("");
  const [myEndTime, setMyEndTime] = useState("");
  const [colleguesStartTime, setColleguesStartTime] = useState("");
  const [ColleguesEndTime, setColleguesEndTime] = useState("");
  const [result, setResult] = useState(null);

  // timeZone
  //   const [textInput, setTextInput] = useState(defaultInput);

  const options = [
    { value: "Taulaga", label: "UTC-11" },
    { value: "Avarua", label: "UTC-10" },
    { value: "Taiohae", label: "UTC-9:30" },
    { value: "Juneau", label: "UTC-9:00" },
    { value: "Los Angeles", label: "UTC-8:00" },
    { value: "Boise", label: "UTC-7:00" },
    { value: "Dangriga", label: "UTC-6:00" },
    { value: "Toronto", label: "UTC-5:00" },
    { value: "Holetown", label: "UTC-4:00" },
    { value: "Conception Bay South", label: "UTC-3:30" },
    { value: "Buenos Aires", label: "UTC-3:00" },
    { value: "Grytviken", label: "UTC-2:00" },
    { value: "Praia", label: "UTC-1:00" },
    { value: "London", label: "UTC-0:00" },
    { value: "Algiers", label: "UTC+1:00" },
    { value: "Cairo", label: "UTC+2:00" },
    { value: "Asmara", label: "UTC+3:00" },
    { value: "Tehran", label: "UTC+3:30" },
    { value: "Muscat", label: "UTC+4:00" },
    { value: "Kabul", label: "UTC+4:30" },
    { value: "Salqar", label: "UTC+5:00" },
    { value: "Negombo", label: "UTC+5:30" },
    { value: "Kathmandu", label: "UTC+5:45" },
    { value: "Karagandy", label: "UTC+6:00" },
    { value: "Yangon", label: "UTC+6:30" },
    { value: "Bangkok", label: "UTC+7:00" },
    { value: "Hong Kong", label: "UTC+8:00" },
    { value: "Caiguna", label: "UTC+8:45" },
    { value: "Seoul", label: "UTC+9:00" },
    { value: "Darwin", label: "UTC+9:30" },
    { value: "Vladivostok", label: "UTC+10:00" },
    { value: "Adelaide", label: "UTC+10:30" },
    { value: "Buka", label: "UTC+11:00" },
    { value: "Bilibino", label: "UTC+12:00" },
    { value: "Waitangi", label: "UTC+12:45" },
    { value: "Apia", label: "UTC+13:00" },
    { value: "Tarawa", label: "UTC+14:00" }
  ];

  const options2 = [
    { value: "Taulaga", label: "UTC-11" },
    { value: "Avarua", label: "UTC-10" },
    { value: "Taiohae", label: "UTC-9:30" },
    { value: "Juneau", label: "UTC-9:00" },
    { value: "Los Angeles", label: "UTC-8:00" },
    { value: "Boise", label: "UTC-7:00" },
    { value: "Dangriga", label: "UTC-6:00" },
    { value: "Toronto", label: "UTC-5:00" },
    { value: "Holetown", label: "UTC-4:00" },
    { value: "Conception Bay South", label: "UTC-3:30" },
    { value: "Buenos Aires", label: "UTC-3:00" },
    { value: "Grytviken", label: "UTC-2:00" },
    { value: "Praia", label: "UTC-1:00" },
    { value: "London", label: "UTC-0:00" },
    { value: "Algiers", label: "UTC+1:00" },
    { value: "Cairo", label: "UTC+2:00" },
    { value: "Asmara", label: "UTC+3:00" },
    { value: "Tehran", label: "UTC+3:30" },
    { value: "Muscat", label: "UTC+4:00" },
    { value: "Kabul", label: "UTC+4:30" },
    { value: "Salqar", label: "UTC+5:00" },
    { value: "Negombo", label: "UTC+5:30" },
    { value: "Kathmandu", label: "UTC+5:45" },
    { value: "Karagandy", label: "UTC+6:00" },
    { value: "Yangon", label: "UTC+6:30" },
    { value: "Bangkok", label: "UTC+7:00" },
    { value: "Hong Kong", label: "UTC+8:00" },
    { value: "Caiguna", label: "UTC+8:45" },
    { value: "Seoul", label: "UTC+9:00" },
    { value: "Darwin", label: "UTC+9:30" },
    { value: "Vladivostok", label: "UTC+10:00" },
    { value: "Adelaide", label: "UTC+10:30" },
    { value: "Buka", label: "UTC+11:00" },
    { value: "Bilibino", label: "UTC+12:00" },
    { value: "Waitangi", label: "UTC+12:45" },
    { value: "Apia", label: "UTC+13:00" },
    { value: "Tarawa", label: "UTC+14:00" }
  ];

  // set state for dropdown
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (obj) => {
    setSelectedValue(obj);
    console.log(obj.value);
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
    // console.log(options2);
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

  // handling change from drop down
  //   const handleSelect = (e) => {
  //     e.preventDefault();
  //     console.log(e);
  //   };

  return (
    <div className='App'>
      {/* THE API FOR CITIES */}
      <div>
        <Select
          value={selectedValue}
          options={options}
          onChange={handleChange}
        />
      </div>

      <br />
      <b>Selected Time Zone:</b>
      <pre>{JSON.stringify(selectedValue, null, 2)}</pre>

      <div>
        my start time
        <input type='time' onChange={(e) => setMyStartTime(e.target.value)} />
      </div>
      <div>
        my end time
        <input type='time' onChange={(e) => setMyEndTime(e.target.value)} />
      </div>

      <div>
        <Select
          value={selectedValue}
          options={options2}
          onChange={handleChange}
        />
      </div>

      <br />
      <b>Selected Time Zone:</b>
      <pre>{JSON.stringify(selectedValue, null, 2)}</pre>

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

////////////
//   <main>
//     <form className='form' onSubmit={handleSubmit}>
//       <div className='form-group'>
//         <label htmlFor='city'>Select your Time Zone</label>
//         <div className='form-field select'>
//           <select
//             id='city'
//             name='city'
//             onChange={handleChange}
//             value={textInput.city}
//           >
//             <option value=''>None Selected</option>
//             <option value='Taulaga'>UTC-11</option>
//             <option value='Avarua'>UTC-10</option>
//             <option value='Taiohae'>UTC-9:30</option>
//             <option value='Juneau'>UTC-9:00</option>
//             <option value='Los Angeles'>UTC-8:00</option>
//             <option value='Boise'>"UTC-7:00</option>
//             <option value='Dangriga'>UTC-6:00</option>
//             <option value='Toronto'>UTC-5:00</option>
//             <option value='Holetown'>UTC-4:00</option>
//             <option value='Conception Bay South'>UTC-3:30</option>
//             <option value='Buenos Aires'>UTC-3:00</option>
//             <option value='Grytviken'>UTC-2:00</option>
//             <option value='Praia'>UTC-1:00</option>
//             <option value='London'>UTC-0:00</option>
//             <option value='Algiers'>UTC+1:00</option>
//             <option value='Cairo'>>UTC+2:00</option>
//             <option value='Asmara'>UTC+3:00</option>
//             <option value='Tehran'>UTC+3:30</option>
//             <option value='Muscat'>UTC+4:00</option>
//             <option value='Kabul'>UTC+4:30</option>
//             <option value='Salqar'>UTC+5:00</option>
//             <option value='Negombo'>UTC+5:30</option>
//             <option value='Kathmandu'>UTC+5:45</option>
//             <option value='Karagandy'>UTC+6:00</option>
//             <option value='Yangon'>UTC+6:30</option>
//             <option value='Bangkok'>UTC+7:00</option>
//             <option value='Hong Kong'>UTC+8:00</option>
//             <option value='Caiguna'>UTC+8:45</option>
//             <option value='Seoul'>UTC+9:00</option>
//             <option value='Darwin'>UTC+9:30</option>
//             <option value='Vladivostok'>UTC+10:00</option>
//             <option value='Adelaide'>UTC+10:30</option>
//             <option value='Buka'>UTC+11:00</option>
//             <option value='Bilibino'>UTC+12:00</option>
//             <option value='Waitangi'>UTC+12:45</option>
//             <option value='Apia'>UTC+13:00</option>
//             <option value='Tarawa'>UTC+14:00</option>
//           </select>
//           <span className='focus'></span>
//         </div>
//       </div>
//       <button type='submit'>Submit</button>
//     </form>
//   </main>;
