import { useState } from 'react';
import cityTimeZone from 'city-timezones';
import Select, { createFilter } from 'react-select';

import data from './data.json';
import CustomOption from './components/CustomOption';
import CustomMenuList from './components/CustomMenuList';

import { getTimezoneDifference, findRangeIntersection } from './helpers';

export default function App() {
	const { options } = data;

	const [myStartTime, setMyStartTime] = useState('');
	const [myEndTime, setMyEndTime] = useState('');
	const [colleaguesStartTime, setColleaguesStartTime] = useState('');
	const [colleaguesEndTime, setColleaguesEndTime] = useState('');
	const [result, setResult] = useState(null);
	const [myCity, setMyCity] = useState('');
	const [myColleaguesCity, setColleaguesCity] = useState('');

	const handleSubmit = async () => {
		let [myTimezone = {}] = cityTimeZone.lookupViaCity(myCity);
		let [colleagueTimezone = {}] = cityTimeZone.lookupViaCity(myColleaguesCity);

		let offset = await getTimezoneDifference(
			colleagueTimezone.timezone,
			myTimezone.timezone
		);

		let localColleagueStartTime =
			Number(colleaguesStartTime.split(':')[0]) + offset;
		let localColleagueEndTime =
			Number(colleaguesEndTime.split(':')[0]) + offset;

		let resultString = ``;

		const result = findRangeIntersection(
			[Number(myStartTime.split(':')[0]), Number(myEndTime.split(':')[0])],
			[localColleagueStartTime, localColleagueEndTime]
		);

		resultString = `${result[0]} hours - ${result[1]} hours`;
		setResult(resultString);
	};

	return (
		<div className='App'>
			<div>
				<Select
					onChange={(obj) => setMyCity(obj.value)}
					options={options}
					filterOption={createFilter({ ignoreAccents: false })}
					components={{ Option: CustomOption, MenuList: CustomMenuList }}
				/>
			</div>
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
					onChange={(obj) => setColleaguesCity(obj.value)}
					options={options}
					filterOption={createFilter({ ignoreAccents: false })}
					components={{ Option: CustomOption, MenuList: CustomMenuList }}
				/>
			</div>
			<div>
				colleague start time
				<input
					type='time'
					onChange={(e) => setColleaguesStartTime(e.target.value)}
				/>
			</div>
			<div>
				colleague end time
				<input
					type='time'
					onChange={(e) => setColleaguesEndTime(e.target.value)}
				/>
			</div>
			<button type='button' onClick={handleSubmit}>
				Get Over lapping hours
			</button>
			<div>{result && result}</div>
		</div>
	);
}
