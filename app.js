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
const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");
//每次打开网页都会重新计10天，倒计时永不过时
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
// const futureDate = new Date(2033, 5, 26, 19, 30, 0);
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 19, 30, 0);
const weekday = weekdays[futureDate.getDay()];
const date = futureDate.getDate();
const month = months[futureDate.getMonth()];
const year = futureDate.getFullYear();
const hour = futureDate.getHours();
const min = futureDate.getMinutes();
if (hour >= 12) {
  giveaway.textContent = `giveaway ends on ${weekday}, ${format(
    date
  )} ${month} ${year} ${format(hour - 12)}:${format(min)}pm`;
} else {
  giveaway.textContent = `giveaway ends on ${weekday}, ${format(
    date
  )} ${month} ${year} ${format(hour)}:${format(min)}am`;
}

//future time in ms
const futureTime = futureDate.getTime();
// console.log(futureTime);
//让item保持两位数：
function format(item) {
  if (item < 10) {
    return (item = `0${item}`);
  }
  return item;
}
function getRemainingTime() {
  const today = new Date().getTime();
  // console.log(today);
  const t = futureTime - today;
  // console.log(t);
  // 1s = 1000ms
  // 1min = 60s
  // 1hr = 60min
  // 1d = 24hr
  //values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;
  //calculate
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMin);
  let seconds = Math.floor((t % oneMin) / 1000);

  //用forEach比一个一个设置方便
  const values = [days, hours, minutes, seconds];
  items.forEach(function (items, index) {
    items.textContent = format(values[index]);
  });
  //倒计时结束
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
  }
}
//countdown
let countdown = setInterval(getRemainingTime, 1000);
