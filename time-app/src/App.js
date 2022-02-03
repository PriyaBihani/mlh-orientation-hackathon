import { useEffect, useState } from "react";
import cityTimeZone from "city-timezones";
import axios from "axios";
import Select from "react-select";

export default function App() {
  const api_key = "FAJIO7OXE21N";
  const [offset, setOffset] = useState(1);
  const [myStartTime, setMyStartTime] = useState("");
  const [myEndTime, setMyEndTime] = useState("");
  const [colleguesStartTime, setColleguesStartTime] = useState("");
  const [ColleguesEndTime, setColleguesEndTime] = useState("");
  const [result, setResult] = useState(null);

  // set state for dropdown
  const [myCity, setSelectedValueCity1] = useState("");
  const [myColleguesCity, setSelectedValueCity2] = useState("");

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
    { value: "Tarawa", label: "UTC+14:00" },
  ];

  const handleChangeCity1 = (obj) => {
    setSelectedValueCity1(obj);
    // console.log(obj.value);
    const myCity = obj.value;
    console.log(myCity);
  };

  const handleChangeCity2 = (obj) => {
    setSelectedValueCity2(obj);
    // console.log(obj.value);
    const myCity = obj.value;
    console.log(myCity);
  };

  const findRangeIntersection = (arr1 = [], arr2 = []) => {
    const [el11, el12] = arr1;
    const [el21, el22] = arr2;
    const leftLimit = Math.max(el11, el21);
    const rightLimit = Math.min(el12, el22);
    return [leftLimit, rightLimit];
  };

  const handleSubmit = () => {
    // Adding offset to the collegues time, as it will convert collegues time to local time
    let localCollegueStartTime = Number(colleguesStartTime.split(":")[0]) + offset;
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
      const res = await axios.get("http://api.timezonedb.com/v2.1/convert-time-zone", {
        params: { key: api_key, from, to, format: "json" },
      });

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
    <div className="color-primary font-base">
      <main>
        <article className="wrapper">
          {result ? (
            <div className="key-header splitter gap-top-700">
              <h2 className="text-700">
                Your common working hours
                <span>{result}</span>
              </h2>
            </div>
          ) : (
            <div className="key-header splitter gap-top-700">
              <h2 className="text-700">Find your common working hours</h2>
            </div>
          )}

          <div className="splitter gap-top-600">
            <section class="flow">
              <form className="form">
                <div className="form__field">
                  <label className="form__field__label" for="time">
                    My timezone
                  </label>
                  <Select
                    value={myCity}
                    options={options}
                    onChange={handleChangeCity1}
                    className="form__field__input1"
                  />
                </div>

                <div className="form__field">
                  <label className="form__field__label" for="time">
                    My start time:
                  </label>
                  <input
                    className="form__field__input"
                    type="time"
                    onChange={(e) => setMyStartTime(e.target.value)}
                    required
                  />
                </div>

                <div className="form__field">
                  <label className="form__field__label" for="time">
                    My end time:
                  </label>
                  <input
                    className="form__field__input"
                    type="time"
                    onChange={(e) => setMyEndTime(e.target.value)}
                    required
                  />
                </div>
              </form>
            </section>

            <section>
              <form className="form">
                <div className="form__field">
                  <label className="form__field__label" for="time">
                    Teammate's timezone
                  </label>
                  <Select
                    className="form__field__input1"
                    value={myColleguesCity}
                    options={options}
                    onChange={handleChangeCity2}
                  />
                </div>

                <div className="form__field">
                  <label className="form__field__label" for="time">
                    Teammate's start time
                  </label>
                  <input
                    className="form__field__input"
                    type="time"
                    onChange={(e) => setColleguesStartTime(e.target.value)}
                    required
                  />
                </div>

                <div className="form__field">
                  <label className="form__field__label" for="time">
                    Teammate's end time
                  </label>
                  <input
                    className="form__field__input"
                    type="time"
                    onChange={(e) => setColleguesEndTime(e.target.value)}
                    required
                  />
                </div>
              </form>
            </section>
          </div>
          <div class="btn-container">
            <button type="button" onClick={handleSubmit} className="button radius">
              Get overlapping hours
            </button>
          </div>
        </article>
      </main>
    </div>
  );
}
