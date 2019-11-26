import wx from './api';

let $$appConfig = /**/ {} /**/;

function $$setData(data) {
  this.data = data;
  runtime.postMessage(this.__path, { data });
}

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
};

function getApp() {
  return $$private.bundle.app;
}

function App(option) {
  $$private.bundle.app = Object.assign({}, $$private.bundle.app, option);
}

function Page(option) {
  $$private.bundle.pages[Page.__path__] = Object.assign({}, $$private.lifecycle, option);
  $$private.bundle.pages[Page.__path__].__path = Page.__path__;
  $$private.bundle.pages[Page.__path__].setData = $$setData;
}
