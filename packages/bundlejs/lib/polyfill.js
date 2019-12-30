/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { $$appConfig, $$projectConfig } from "./api";

const $$util = {
  parsePath(path = "") {
    const [ domain, search ] = path.split("?");

    let option;
    if (search) {
      option = search.split("&").reduce((pre, cur) => {
        const [ key, value ] = cur.split("=");
        return { ...pre, [key]: value };
      }, {});
    }
    return {
      path: domain.startsWith("/") ? domain : `/${domain}`,
      option,
    };
  },
};

const $$private = {
  lifecycle: {
    data: {},
    onLoad() {},
    onShow() {},
    onReady() {},
    onHide() {},
    onUnload() {},
    onPullDownRefresh() {},
    onReachBottom() {},
    onShareAppMessage() {},
    onPageScroll() {},
    onResize() {},
    onTabItemTap() {},
  },

  bundle: {
    app: {
      onLaunch() {},
      onShow() {},
      onHide() {},
      onError() {},
      onPageNotFound() {},
    },
    pages: {},
  },

  // nat(init) -> jsc(init) -> webview(init)
  // webview(push) -> nat(push) -> jsc(init) -> webview(init)
  routeStacks: [],

  getCurrentRoute() {
    return this.routeStacks[this.routeStacks.length - 1];
  },

  getRoute(webviewId) {
    return this.routeStacks.find((v) => v.instance.webviewId === webviewId);
  },

  getInitData(webviewId) {
    return this.getRoute(webviewId).instance.data;
  },

  pushRoute(webviewId, path) {
    const pathInfo = $$util.parsePath(path ? path : $$appConfig.pages[0]);
    const PageClass = this.bundle.pages[pathInfo.path];

    pathInfo.instance = new PageClass(webviewId);
    this.routeStacks.push(pathInfo);
  },

  popRoute() {
    this.routeStacks.pop();
  },

  callLifecycle(webviewId, lifecycle) {
    const pageInfo = this.getRoute(webviewId);
    return pageInfo.instance[lifecycle](pageInfo.option);
  },

  callMethod(webviewId, event) {
    return this.getRoute(webviewId).instance[event.eventHandler](event.event);
  },
};

function getApp() {
  return $$private.bundle.app;
}

function App(option) {
  $$private.bundle.app = Object.assign({}, $$private.bundle.app, option);
}

function Page(option) {
  const pageOption = Object.assign({}, $$private.lifecycle, option);
  const lifecycleKey = Object.keys($$private.lifecycle);
  $$private.bundle.pages[Page.__path__] = class PageController {
    constructor(webviewId) {
      this.webviewId = webviewId;
      this.data = { ...option.data };

      // 把其余方法&属性挂在 `this` 上
      Object.keys(option).forEach((key) => {
        if (lifecycleKey.includes(key)) return;
        this[key] = option[key];
      });
    }

    setData(data) {
      this.data = { ...this.data, ...data };
      jsBridge.setData(this.webviewId, $$projectConfig.appid, this.data);
    }

    onLoad(option) {
      pageOption.onLoad.call(this, option);
    }
    onShow(option) {
      pageOption.onShow.call(this, option);
    }
    onReady(option) {
      pageOption.onReady.call(this, option);
    }
    onHide(option) {
      pageOption.onHide.call(this, option);
    }
    onUnload() {
      pageOption.onUnload.call(this);
    }
    onPullDownRefresh() {
      pageOption.onPullDownRefresh.call(this);
    }
    onReachBottom() {
      pageOption.onReachBottom.call(this);
    }
    onShareAppMessage() {
      pageOption.onShareAppMessage.call(this);
    }
    onPageScroll() {
      pageOption.onPageScroll.call(this);
    }
    onResize() {
      pageOption.onResize.call(this);
    }
    onTabItemTap() {
      pageOption.onTabItemTap.call(this);
    }
  };

  // $$private.bundle.pages[Page.__path__].__path = __path__;
}
