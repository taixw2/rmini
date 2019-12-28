/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import wx from "./api";

let $$appConfig = /*appconfig*/ {} /**/;
let $$projectConfig = /*projectconfig*/ {} /**/;

function $$setData(data) {
  this.data = data;
  jsBridge.postMessage(this.__path, $$projectConfig.appid, { data });
}

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
      path: "/" + domain,
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

  getInitData(path) {
    const pathInfo = $$util.parsePath(path);
    return this.bundle.pages[pathInfo.path].data;
  },

  pushRoute(webviewId, path = $$appConfig.pages[0]) {
    const pathInfo = $$util.parsePath(path);
    const PageClass = this.bundle.pages[pathInfo.path];

    pathInfo.webviewId = webviewId;
    pathInfo.instance = new PageClass();
    this.routeStacks.push(pathInfo);
  },

  popRoute() {
    this.routeStacks.pop();
  },

  callLifecycle(webviewId, lifecycle) {
    const pageInfo = this.routeStacks.find((v) => v.webviewId === webviewId);
    pageInfo.instance[lifecycle](pageInfo.option);
  },

  callMethod(webviewId, event) {
    const pageInfo = this.routeStacks.find((v) => v.webviewId === webviewId);
    pageInfo.instance[event.eventHandler](event.event);
  },
};

function getApp() {
  return $$private.bundle.app;
}

function App(option) {
  $$private.bundle.app = Object.assign({}, $$private.bundle.app, option);
}

function Page(option) {
  $$private.bundle.pages[Page.__path__].__path = Page.__path__;

  const pageOption = Object.assign({}, $$private.lifecycle, option);

  $$private.bundle.pages[Page.__path__] = class PageController {
    static __path = Page.__path__;

    data = { ...option.data };

    setData(data) {
      this.data = { ...this.data, ...data };
      jsBridge.postMessage(this.__path, $$projectConfig.appid, { data: this.data });
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
}
