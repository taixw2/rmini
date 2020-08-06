import * as store from "./store";
import { initPage } from "./page-controller";
import { wechatApiList } from "./wechat-api";
import { invoke } from "./jsbridge";

/**
 * 直接返回在 store 中初始化的 app， 通常会用来做 store
 */
export function getApp() {
  return store.getApp();
}

/**
 * 缓存 App 的生命周期
 * 等到合适的时机再调用
 * 1. onLaunch (小程序的 JS 代码被原生的 JSCore 执行后，立即调用这个生命周期)
 * 2. onShow (实例化原生 Webview 之后调用, 实际上可能 DOM 还没有加载完)
 * 3. onHide 隐藏小程序，或者切换到后台前调用
 * 4. onPageNotFound 进入到没有找到的 page, 这个在 JSCore 中触发，不需要通过原生
 *
 * @param {*} option
 */
export function App(option) {
  store.createApp({
    onLaunch() {},
    onShow() {},
    onHide() {},
    onError() {},
    onPageNotFound() {},
    ...option,
  });
}

export function Page(option) {
  const pageClass = initPage(option);
  store.createPage(Reflect.get(Page, "__pageId"), pageClass);
}

export const wx = {};

wechatApiList.forEach((key) => {
  wx[key] = function(...payload) {
    const sync = key.endsWith("Sync");
    const method = sync ? key.substr(0, key.length - 4) : key;
    return invoke(method, sync, store.getCurrentWebviewId(), payload);
  };
});
