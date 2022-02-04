import axios from "axios";

export const getTimezoneDifference = async (from, to) => {
  try {
    const res = await axios.get("https://api.timezonedb.com/v2.1/convert-time-zone", {
      params: {
        key: process.env.REACT_APP_API_KEY,
        from,
        to,
        format: "json",
      },
    });

    let offset = res.data.offset / 3600;
    return offset;
  } catch (error) {
    console.log(error.message);
  }
};

export const findRangeIntersection = (arr1 = [], arr2 = []) => {
  const [el11, el12] = arr1;
  const [el21, el22] = arr2;
  const leftLimit = Math.max(el11, el21);
  const rightLimit = Math.min(el12, el22);
  return [leftLimit, rightLimit];
};
