module.exports = (time) => {
  const methods = [
    { name: "d", count: 86400 * 1000 },
    { name: "h", count: 3600 * 1000 },
    { name: "m", count: 60 * 1000 },
    { name: "s", count: 1 * 1000 },
  ];
  const timeStr = [
    Math.floor(time / methods[0].count).toString() + methods[0].name,
  ];
  for (let i = 0; i < 3; i++) {
    timeStr.push(
      Math.floor((time % methods[i].count) / methods[i + 1].count).toString() +
        methods[i + 1].name
    );
  }
  return timeStr.filter((f) => !f.startsWith("0")).join(", ");
};
