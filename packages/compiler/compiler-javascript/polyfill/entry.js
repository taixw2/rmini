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

const _console = window.console;
const proxyConsole = Reflect.ownKeys(_console).reduce((p, k) => {
  p[key] = function proxyConsole(...msg) {
    window.console[key](...msg);
    invoke("console", false, "", msg);
  };
}, {});

export const console = proxyConsole;
