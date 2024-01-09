import icons from "./icons";

/**
 * Convert string to title case
 * @param {string} str
 */
export const titleCase = (str) => {
  return str
    .split(" ")
    .map((each) => each[0].toUpperCase() + each.slice(1))
    .join(" ");
};

/**
 * Return icon path based on iconCode
 * @param {string} iconCode
 * @returns
 */
export const chooseIcon = (iconCode) => {
  return icons[iconCode];
};

export const shortenTxt = (txt) => {
  return txt.length > 14 ? txt.slice(0, 14).trim() + "..." : txt;
};

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
/**
 * Return day of the week (as string)
 */
export const getDay = (date) => {
  return daysOfWeek[date.getDay()];
};
