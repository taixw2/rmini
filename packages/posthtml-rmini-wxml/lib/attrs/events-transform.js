
module.exports = function (originalNode, originalKey, event, bindType) {
  const node = { ...originalNode }
  const attrs = node.attrs;

  switch (event) {
    case 'touchstart':
    case 'touchmove':
    case 'touchcancel':
    case 'touchend':
    case 'animationstart':
    case 'animationiteration':
    case 'animationend':
    case 'touchforcechange':
    case 'transitionend':
      node.attrs = triggerEvent(attrs, originalKey, event, bindType)
      break;
    case 'tap':
        node.attrs = triggerEvent(attrs, originalKey, 'click', bindType)
      break;
    
    // TODO: 模拟这两种事件
    case 'longpress':
      break;
    case 'longtap':
      break;
    default:
      console.warn('不支持的事件: ', event)
      break;
  }
  return node;
}

function triggerEvent(originalAttrs, originalKey, event, bindType) {
  const attrs = { ...originalAttrs }
  const bindFunction = attrs[originalKey]

  const evnentName = event;
  if (bindType === 'catch') {
    evnentName += '.stop'
  }

  Reflect.deleteProperty(attrs, originalKey)
  // 所有的事件都触发 triggerEvent
  // 通过钩子把事件传递给原始的 JSC 执行
  attrs[`v-on:${evnentName}`] = `triggerEvent('${bindFunction}', $event)`
  return attrs
}
