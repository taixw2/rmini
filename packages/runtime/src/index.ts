import Vue from "vue";

export * from "./components";

function def(target: any, key: string, value: any) {
  Reflect.set(target, key, value);
}

const data = {};

def(window, "__Def", (key: string, value: any) => {
  data[key] = value;
});

def(window, "def", def);

// 实例化 webview 后设置 webviewId
def(window, "__webviewId", "");

document.addEventListener("DOMContentLoaded", function() {
  new Vue({ el: document.getElementById("app"), data: data });
});
