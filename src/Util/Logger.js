const getTime = () => {
  var currentdate = new Date();
  var time =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return time;
};

module.exports = {
  error: (s) => {
    console.log(`\u001b[31m[${getTime()} - Error] ||\u001b[39m ${s}`);
  },
  info: (s) => {
    console.log(`\u001b[36m[${getTime()} - Info]  ||\u001b[39m ${s}`);
  },
  debug: (s) => {
    console.log(`\u001b[33m[${getTime()} - Debug] ||\u001b[39m ${s}`);
  },
};
