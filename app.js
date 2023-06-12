const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveAway = document.querySelector(".giveaway");
const deadlineItems = document.querySelectorAll(".deadline-format h4");
const deadline = document.querySelector(".deadline");

const dummyGiveAwayDate = new Date();
console.log(dummyGiveAwayDate);
const futureDate = new Date(
  dummyGiveAwayDate.getFullYear(),
  dummyGiveAwayDate.getMonth(),
  dummyGiveAwayDate.getDate() + 10,
  11,
  30,
  0
);

const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

giveAway.innerHTML = `Ends on ${weekday}, ${date} ${month} ${year}, ${hours}:${minutes}`;

function remainingTime() {
  // remaining time in milli seconds
  const currentTime = new Date().getTime();
  const futureTime = futureDate.getTime();
  const remainingTime = futureTime - currentTime;

  // ms conversion
  const dayInMs = 24 * 60 * 60 * 1000;
  const hourInMs = 60 * 60 * 1000;
  const minuteInMs = 60 * 1000;

  // display value calculation
  const displayDays = Math.floor(remainingTime / dayInMs);
  const displayHours = Math.floor((remainingTime % dayInMs) / hourInMs);
  const displayMins = Math.floor((remainingTime % hourInMs) / minuteInMs);
  const displaySecss = Math.floor((remainingTime % minuteInMs) / 1000);

  const displayArray = [displayDays, displayHours, displayMins, displaySecss];

  function format(item) {
    if (item < 10) {
      return `0${item}`;
    } else {
      return item;
    }
  }

  deadlineItems.forEach(function (item, index) {
    item.textContent = format(displayArray[index]);
  });

  if (remainingTime < 0) {
    clearInterval(remainingTime);
    deadline.innerHTML = `<h4 class="expired">Sorry, This giveaway has expired<h4>`;
  }
}
let countDown = setInterval(remainingTime, 1000);
remainingTime();
