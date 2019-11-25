
const COMP_VAL_REG = /^\{\{(.*)\}\}$/;

module.exports = function (originalNode, key) {
  const node = { ...originalNode }

  switch (key) {
    case 'wx:if':
      transform(node, key, 'v-if');
      break;
    case 'wx:elif':
      transform(node, key, 'v-else-if');
      break;
    case 'wx:else':
      transform(node, key, 'v-else');
      break;
    case 'hidden':
      console.log("TCL: key", key)
      transform(node, key, 'v-show');
      node['v-show'] = `!(${node['v-show']})`;
      break;
    case 'wx:for':
      transformFor(node);
      break;
    // 以下几个属性依赖 wx:for
    // case 'wx:for-item': break;
    // case 'wx:for-index': break;
    // case 'wx:key': break;
    default:
      // 忽略其他属性
      break;
  }

  transformComputeValue(node)
  return node
}


/**
 * 去除属性括号
 * @param {*} value 
 */
function removeParentheses(value) {
  return value ? value.replace(COMP_VAL_REG, '$1') : value
}

/**
 * 转换成 vue 支持的属性
 */
function transform(node, key, replaceKey) {
  const attrs = { ...node.attrs };
  const value = attrs[key]
  Reflect.deleteProperty(attrs, key)

  attrs[replaceKey] = removeParentheses(value)
  node.attrs = attrs
}

/**
 * 转换 for
 */
function transformFor(node) {
  let attrs = { ...node.attrs }
  const item = attrs['wx:for-item'] || 'item'
  const index = attrs['wx:for-index'] || 'index'
  const originalValue = removeParentheses(attrs['wx:for'])
  attrs['v-for'] = `(${item}, ${index}) in (${originalValue})`

  const key = attrs['wx:key'] || 'id'
  const bindKey = key === '*this' ? 'item' : `${attrs.__item__}.${key}`
  attrs['v-bind:key'] = bindKey

  Reflect.deleteProperty(attrs, 'wx:for')
  Reflect.deleteProperty(attrs, 'wx:for-item')
  Reflect.deleteProperty(attrs, 'wx:for-index')
  Reflect.deleteProperty(attrs, 'wx:key')
  node.attrs = attrs
}

function transformComputeValue(node) {
  let attrs = { ...node.attrs }
  node.attrs = Object.keys(attrs).reduce((previous, current) => {
    let key = current;
    let value = attrs[key];
    if (!COMP_VAL_REG.test(value)) return previous;

    value = removeParentheses(value)
    if (!key.startsWith('v-')) {
      key = `v-bind:${key}`
    }

    previous[key] = value;
    return previous;
  }, {})
}
