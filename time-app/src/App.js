import { useState } from 'react';
import cityTimeZone from 'city-timezones';
import axios from 'axios';
import Select, { createFilter } from 'react-select';
import data from './data.json';
import CustomOption from './CustomOption';
import CustomMenuList from './CustomMenuList';

export default function App() {
	const api_key = 'FAJIO7OXE21N';
	const { options } = data;

	const [myStartTime, setMyStartTime] = useState('');
	const [myEndTime, setMyEndTime] = useState('');
	const [colleaguesStartTime, setColleaguesStartTime] = useState('');
	const [colleaguesEndTime, setColleaguesEndTime] = useState('');
	const [result, setResult] = useState(null);
	const [myCity, setMyCity] = useState('');
	const [myColleaguesCity, setColleaguesCity] = useState('');

	const findRangeIntersection = (arr1 = [], arr2 = []) => {
		const [el11, el12] = arr1;
		const [el21, el22] = arr2;
		const leftLimit = Math.max(el11, el21);
		const rightLimit = Math.min(el12, el22);
		return [leftLimit, rightLimit];
	};

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

	const getTimezoneDifference = async (from, to) => {
		try {
			const res = await axios.get(
				'http://api.timezonedb.com/v2.1/convert-time-zone',
				{ params: { key: api_key, from, to, format: 'json' } }
			);

			let offset = res.data.offset / 3600;
			return offset;
		} catch (error) {
			console.log(error.message);
		}
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
