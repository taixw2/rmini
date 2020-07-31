import * as store from "./store";
import * as jsbridge from "./jsbridge";
import { callHook } from "./util";

/**
 * 原生用来调用 JS 的入口
 *
 * 场景
 * 1. 调用 Page 的生命周期
 * 2. 调用 App 的生命周期
 * 3. 调用回调函数
 * 4. 进入/退出路由
 * 5. 初始化 Page
 * @param {{ type: number, payload: any }} option
 */
export function nativeInvoke(option) {
  option.type === 1
    ? callPageLifecycle(option.payload)
    : option.type === 2
    ? callAppLifecycle(option.payload)
    : option.type === 3
    ? callCbs(option.payload)
    : option.type === 4
    ? pushRouter(option.payload)
    : option.type === 5
    ? popRouter()
    : option.type === 6
    ? init(option.payload)
    : null;
}

/**
 * 调用某个 Page 的生命周期
 * @param {{ lifecycle: string, payload: any, webviewId: string }} option
 */
function callPageLifecycle(option) {
  const pageController = store.getRouteByWebviewId(option.webviewId) || {};
  callHook(pageController, option.lifecycle, pageController, option.payload);
}

/**
 * 调用 APP 生命周期方法
 *
 * @param {{ lifecycle: string, payload: any }} option
 */
function callAppLifecycle(option) {
  const app = store.getApp();
  callHook(app, option.lifecycle, app, option.payload);
}

/**
 * JS 调用时原生后， 原生回调的方法
 * @param {{ sessionId: string, status: string, payload: any }} option
 */
function callCbs(option) {
  jsbridge.callCbs(option);
}

/**
 * JSCore 实例化完 webview 后，实例化对应的 Page
 * pageId Page 定义时的文件名
 * @param {{ webviewId: string, pageId: string }} option
 */
function pushRouter(option) {
  const PageClass = store.getPage(option.pageId);
  /**
   * 一个页面可以只定义 wxml， 不定义 js
   */
  if (!PageClass) {
    return;
  }
  store.pushRouter(new PageClass(option.webviewId));
}

/**
 * 原生退出某个页面后调用
 */
function popRouter() {
  store.popRouter();
}

/**
 * webview 中所有资源都准备好了
 * 准备开始渲染
 */
function init() {
  callAppLifecycle({ lifecycle: "onLaunch" });
  //   设置当前 appConfig.pages[0] 作为当前进栈的路由
  const config = store.getAppConfig();
  jsbridge.invoke("launch", false, "", { url: config.pages[0] });
}
