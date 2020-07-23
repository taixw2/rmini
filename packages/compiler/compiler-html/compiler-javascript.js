const reg = /\{\{([\.|\w|\d]+?)\}\}/g;

function recombinObject(interpolationExpression) {
  const list = [];
  let prekey = null;
  interpolationExpression.split(".").forEach((item) => {
    if (!list.length) {
      prekey = item;
      list.push({ [item]: {} });
      return;
    }
    const top = list[list.length - 1];
    top[prekey][item] = {};
    return;
  });
  return list[0];
}

exports.compilerJavascript = function(wxmlContent) {
  const data = {};
  while (true) {
    const result = reg.exec(wxmlContent);
    if (!result) break;
    Object.assign(data, recombinObject(result[1]))
  }

  return `${Reflect.ownKeys(data).map(key => `__Def(${JSON.stringify(key)}, ${JSON.stringify(data[key])});`).join('\n')}`
};
