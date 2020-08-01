import { invoke } from "./jsbridge";

/**
 * 导出给小程序使用的方法
 */
export { getApp, wx, App, Page } from "./polyfill";

/**
 * native invoke
 */
export { nativeInvoke } from "./export-native";

/**
 * global
 */
export const global = {};

export const console = {
  info(...msg) {
    invoke("console", false, "", ["info:", ...msg]);
  },
  log(...msg) {
    invoke("console", false, "", msg);
  },
  error(...msg) {
    invoke("console", false, "", ["error: ", ...msg]);
  },
};
