import { callHook } from "./util";
import { invoke } from "./jsbridge";

function defineProperty(target, key, source) {
  const descriptor = {
    get() {
      return source[key];
    },

    set() {
      // no allow set
    },
  };

  Object.defineProperty(target, key, descriptor);
}

export const initPage = function(pageOption) {
  return class PageController {
    /**
     * 在进入到 webview 之后，会实例化这个 PageController
     * @param {string} webviewId 当前页面
     */
    constructor(webviewId) {
      this.webviewId = webviewId;
      this.data = pageOption.data ?? {};

      // 把方法挂载 this 上
      Reflect.ownKeys(pageOption).forEach((key) => {
        if (this[key]) return;
        defineProperty(this, key, pageOption);
      });

      // 把初始化的 data 传给 webview
      this.setData(this.data);
    }

    // JSCore 调用 setData 后，传递给原生
    // 原生再将 setData 传给 对应的 webview
    setData(data) {
      this.data = { ...this.data, ...data }
      invoke("setData", false, this.webviewId, this.data);
    }

    /**
     * Page 的生命周期
     * 这些生命周期在特定时机被原生调用
     */
    onLoad(...args) {
      callHook(pageOption, "onLoad", this, ...args);
    }
    onShow(...args) {
      callHook(pageOption, "onShow", this, ...args);
    }
    onReady(...args) {
      callHook(pageOption, "onReady", this, ...args);
    }
    onHide(...args) {
      callHook(pageOption, "onHide", this, ...args);
    }
    onUnload() {
      callHook(pageOption, "onUnload", this);
    }
    onPullDownRefresh() {
      callHook(pageOption, "onPullDownRefresh", this);
    }
    onReachBottom() {
      callHook(pageOption, "onReachBottom", this);
    }
    onShareAppMessage() {
      callHook(pageOption, "onShareAppMessage");
    }
    onPageScroll() {
      callHook(pageOption, "onPageScroll");
    }
    onResize() {
      callHook(pageOption, "onResize");
    }
    onTabItemTap() {
      callHook(pageOption, "onTabItemTap");
    }
  };
};
