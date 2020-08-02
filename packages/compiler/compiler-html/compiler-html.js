const posthtml = require("posthtml");
const { builtInComponents } = require("../utils/constants");
const { delProp } = require("../utils/utils");
const COMP_VAL_REG = /\{\{(.*?)\}\}/;

/**
 * 获取插值表达式
 * @param {string} value
 */
function getInterpolationExpression(value) {
  if (!COMP_VAL_REG.test(value)) return value;
  return `'${value.replace(/\{\{(.*?)\}\}/g, `' + $1 + '`)}'`;
}

/**
 * 获取插值表达式
 * @param {string} value
 */
function getInterpolationExpressionWithFor(value) {
  if (!COMP_VAL_REG.test(value)) return value;
  return value.replace(/\{\{(.*?)\}\}/g, '$1');
}

/**
 * 替换属性
 *
 * @param {{ [key:string]: string }} attrs
 * @param {string} oldAttr
 * @param {string} newAttr
 */
function replaceAttr(attrs, oldAttr, newAttr, newValue) {
  if (!Reflect.has(attrs, oldAttr)) return;
  const oldValue = attrs[oldAttr];
  if (newAttr) {
    attrs[newAttr] = newValue || oldValue;
  }
  delProp(attrs, oldAttr);
}

/**
 * 替换所有wx 指令到 Vue 指令
 */
function compilerAttributeName(attributes) {
  replaceAttr(attributes, "wx:if", "v-if");
  replaceAttr(attributes, "wx:elif", "v-else-if");
  replaceAttr(attributes, "wx:else", "v-else");
  replaceAttr(attributes, "hidden", "v-show", `!(${attributes["v-show"]})`);

  /**
   * for 需要用到 item 以及 index
   */
  const forValue = getInterpolationExpressionWithFor(attributes["wx:for"]);
  const forItemKeyName = attributes["wx:for-item"] || "item";
  const forIndexKeyName = attributes["wx:for-index"] || "index";
  replaceAttr(attributes, "wx:for", "v-for", `(${forItemKeyName}, ${forIndexKeyName}) in ${forValue}`);
  replaceAttr(attributes, "wx:key", "v-bind:key");
  replaceAttr(attributes, "wx:for-item");
  replaceAttr(attributes, "wx:for-index");
}

/**
 * 编译属性插值表达式
 * 提取出插值表达式
 * 对非 v- 开头的属性加上 v-bind: 指令
 *
 * @param {{ [key:string]: string }} attributes
 */
function compilerAttributeValue(attributes) {
  Reflect.ownKeys(attributes).forEach((key) => {
    const value = attributes[key];
    /**
     * value 没有插值表达式
     */
    if (!COMP_VAL_REG.test(value)) return;

    /**
     * 对没有 v- 开头的添加 v-bind
     */
    let newKey = key.startsWith("v-") ? key : "v-bind:" + key;
    replaceAttr(attributes, key, newKey, getInterpolationExpression(value));
  });
}

/**
 * posthtml plugin
 *
 * 编译 wxml， 把 wxml 转换成 template
 * 1. 事件在组件内部实现
 * 3. 编译属性，对 wxml 到 vue 之间的映射
 * 4. 编译属性值，值中包含插值表达式, 编译成 Vue 格式
 *
 * @param {import('posthtml').Node} htmlTree
 */
function postwxml(htmlTree) {
  builtInComponents.forEach((componentName) => {
    htmlTree.match({ tag: componentName }, (matchNode) => {
      matchNode.tag = matchNode.tag !== "block" ? "wx-" + matchNode.tag : "template";
      if (!matchNode.attrs) return matchNode;
      compilerAttributeName(matchNode.attrs);
      compilerAttributeValue(matchNode.attrs);
      // TODO: 事件
      return matchNode;
    });
  });
}

exports.compilerHtml = async function(wxmlContent) {
  const { html } = await posthtml([postwxml]).process(wxmlContent);

  // TODO: 用 Vue Template Compiler 编译成 render 函数
  return html;
};
