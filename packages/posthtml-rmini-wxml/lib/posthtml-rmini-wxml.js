"use strict";
const propertiesTransform = require("./attrs/index");

module.exports = posthtmlRminiWxml;

function posthtmlRminiWxml(tree) {
  const supportComponents = [
    // 容器
    "scroll-view",
    "swiper",
    "swiper-item",
    "view",
    // 基础
    "icon",
    "progress",
    "text",
    // 表单
    "button",
    "checkbox",
    "checkbox-group",
    "form",
    "input",
    "label",
    "picker",
    "picker-view",
    "picker-view-column",
    "radio",
    "radio-group",
    "slider",
    "switch",
    "textarea",
    // 导航
    "navigator",
    // 媒体
    "audio",
    "image",
    "video",
    // 其他暂不支持: canvas, map, live-pusher, live-player, camera, cover-image, cover-view, movable-area, movable-view, rich-text, editor
  ];

  supportComponents.forEach((tag) =>
    tree.match({ tag }, (node) => {
      node.tag = `rmini-${tag}`;
      return propertiesTransform(node);
    }),
  );
}
