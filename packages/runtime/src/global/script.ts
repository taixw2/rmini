import Vue from "vue/dist/vue";

/**
 * stencil 会动态引入
 * 导致这是异步执行的
 */
export default function() {
  function def(target: any, key: string, value: any) {
    Reflect.set(target, key, value);
  }

  // 实例化 webview 后设置 webviewId
  def(window, "__webviewId", "");
  new Vue({
    el: document.getElementById("app"),
    data: Reflect.get(window, "__DATA__")
  });
}
