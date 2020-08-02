import { console as _console } from "./console";

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

export const console = _console
