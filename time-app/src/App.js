import { useState } from "react";
import Select, { createFilter } from "react-select";

import data from "./data.json";
import CustomOption from "./components/CustomOption";
import CustomMenuList from "./components/CustomMenuList";

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
    <div className="color-primary font-base">
      <main>
        <article className="wrapper">
          {result ? (
            <div className="key-header splitter gap-top-700">
              <h2 className="text-700">
                Your common working hours:
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
                  <span className="form__field__label" for="time">
                    My timezone
                  </span>
                  <Select
                    onChange={(obj) => setMyCity(obj.value)}
                    options={options}
                    filterOption={createFilter({ ignoreAccents: false })}
                    components={{ Option: CustomOption, MenuList: CustomMenuList }}
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
                  <span className="form__field__label" for="time">
                    Teammate's timezone
                  </span>
                  <Select
                    onChange={(obj) => setColleaguesCity(obj.value)}
                    options={options}
                    filterOption={createFilter({ ignoreAccents: false })}
                    components={{ Option: CustomOption, MenuList: CustomMenuList }}
                    className="form__field__input1"
                  />
                </div>
                <div className="form__field">
                  <label className="form__field__label" for="time">
                    Teammate's start time
                  </label>
                  <input
                    className="form__field__input"
                    type="time"
                    onChange={(e) => setColleaguesStartTime(e.target.value)}
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
                    onChange={(e) => setColleaguesEndTime(e.target.value)}
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
