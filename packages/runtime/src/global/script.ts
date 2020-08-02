import Vue from "vue/dist/vue";
import { log, invokeNative, InvokeNativeType } from "../utils/utils";

/**
 * stencil 会动态引入
 * 导致这是异步执行的
 */
export default function() {
  Vue.config.ignoredElements.push(/^wx-/);

  function def(target: any, key: string, value: any) {
    Reflect.set(target, key, value);
  }

  // 实例化 webview 后设置 webviewId
  // def(window, "__webviewId", "");
  const vm = new Vue({
    el: document.getElementById("app"),
    data: Reflect.get(window, "__DATA__") || {}
  });

  def(window, "__setData", function(values: { [key: string]: any }) {
    log(values);
    Reflect.ownKeys(values).forEach((key: string) => {
      vm[key] = values[key];
    });
  });

  invokeNative(InvokeNativeType.lifecycle, "ready")

  window.onerror = function(e) {
    document.write(`<h1>${String(e)}</h1><p>${(e as any).stack}</p>`);
  };
}
