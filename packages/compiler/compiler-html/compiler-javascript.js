const reg = /\{\{([.|\w|\d]+?)\}\}/g;

/**
 * pre script
 *
 * 在 Vue 中会获取该 __data__ 作为响应式对象
 */
const prefixScript = `
window.__DATA__ = {}
window.__Def = function (key, value) {
  if (typeof window.__DATA__[key] === 'object') {
    window.__DATA__[key] = {...window.__DATA__[key], ...value}
  }
  window.__DATA__[key] = value
};
`;

/**
 *
 *
 * @param {*} interpolationExpression
 */
function recombinObject(interpolationExpression) {
  let current;
  let root = (current = {});
  const keys = interpolationExpression.split(".");
  const len = keys.length;
  for (let index = 0; index < len; index++) {
    const key = keys[index];
    current[key] = len === index + 1 ? "" : {};
    current = current[key];
  }
  return [keys[0], root[keys[0]]];
}

/**
 * 提取所有插值表达式中用到的响应式属性
 * 通过 __Def 传给 runtime 中的 Vue 实例
 * @param {*} wxmlContent
 */
exports.compilerJavascript = function(wxmlContent) {
  let script = prefixScript;

  while (true) {
    const result = reg.exec(wxmlContent);
    if (!result) break;
    const [key, value] = recombinObject(result[1]);
    script += `__Def(${JSON.stringify(key)}, ${JSON.stringify(value)});`;
  }
  return script;
};
