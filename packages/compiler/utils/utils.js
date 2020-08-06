exports.createTempAppId = function() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    "wx" +
    Array.from({ length: 4 })
      .map(S4)
      .join("")
  );
};

exports.delProp = (target, key) => {
  Reflect.deleteProperty(target, key);
};
