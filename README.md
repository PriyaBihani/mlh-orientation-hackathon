# MLH Orientation Hackathon - Time Scheduling App ⏰

## Project Description

Time Scheduling App is a React App, built with React, JavaScript, HTML and CSS. It uses several npm packages and libraries: [repo-report](https://github.com/ljharb/repo-report), [city-timezones](https://www.npmjs.com/package/city-timezones), [react-select](https://react-select.com/home), [timezonezb API](https://timezonedb.com/api), [axios API](https://axios-http.com/docs/intro), [react-tiny-virtual-list](https://www.npmjs.com/package/react-tiny-virtual-list). It is meant to help students in the MLH Fellowship find a better way of working across the world, and in different time zones than their fellow students. It helps students find what hours of their working day, overlap with their teammates in order to facilitate synchronous work.

## Instructions

1. Clone this repository to your computer. ✔️
2. CD into `mlh-orientation-hackathon`. ✔️
3. CD into `time-app`. ✔️
4. Run `npm install` to install all modules listed on the `package.json` file and their dependencies. ✔️
5. Go to [timezonedb API](https://timezonedb.com/api). Register for a free account, in order to generate an API key. ✔️
6. Create a `.env` file. In the `.env` file, paste this code `REACT_APP_API_KEY=<YOUR API KEY>`. ✔️
7. Generate a personal access github token in order to run `repo-report`. Follow the instructions [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token). Allow the `repo` scope for proper access. Paste `GH_TOKEN=<the personal access token generated>` into the `.env` file. ✔️
8. On the terminal run export `GH_TOKEN=<the personal access token generated>`. ✔️
9. Run `npx repo-report` if you would like to see what repositories you have access to. ✔️
10. Run `npm start`. ✔️
11. Your browswer should open to `localhost:3000`. ✔️
12. Once there, you can search for your city from the dropdown menu. Input your start time and end time. Do the same for your podmate. The app will calculate what hours overlap and let you know what times during your working day, your podmate is available. ✔️

<img width="807" alt="Screen Shot 2022-02-04 at 9 08 18 AM" src="https://user-images.githubusercontent.com/26771302/152543425-c9bcbddd-b76f-4e58-ae72-25c54ea2eb16.png">

<img width="830" alt="Screen Shot 2022-02-04 at 9 08 52 AM" src="https://user-images.githubusercontent.com/26771302/152543449-34b805a0-7243-4369-8710-3563cdb75d99.png">

## Test Drive Time Scheduling App on Netlify
[Project Deployment](https://flamboyant-borg-7d61af.netlify.app/)

## Contributors

- [Katia Utochkina](https://github.com/katia-utochkina)
- [Priya Bihani](https://github.com/PriyaBihani)
- [Dani Schuhman](https://github.com/dani8439)

---

## License & Copyright

GPL-3.0-or-later
