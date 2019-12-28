const propertiesTransform = require("./properties-transform");
const eventsTransform = require("./events-transform");

module.exports = function transformAttr(originalNode) {
  if (!originalNode.attrs) return originalNode;
  let node = { ...originalNode };
  Object.keys(node.attrs).forEach((key) => {
    const eventMatch = key.match(/^(bind|catch|capture-bind|capture-catch):*(.*)$/);
    if (!eventMatch) {
      node = propertiesTransform(node, key);
      return;
    }
    node = eventsTransform(node, key, eventMatch[2], eventsTransform[1]);
  });
  return node;
};
