(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.__ployfill__ = {}));
}(this, (function (exports) { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var store = {
    /**
     * 这两个属性用 rollup 注入
     */
    appConfig: {
      "pages": ["pages/index/index", "pages/logs/logs"],
      "window": {
        "backgroundTextStyle": "light",
        "navigationBarBackgroundColor": "#fff",
        "navigationBarTitleText": "WeChat",
        "navigationBarTextStyle": "black"
      },
      "style": "v2",
      "sitemapLocation": "sitemap.json"
    },
    pageConfig: {
      "description": "项目配置文件",
      "packOptions": {
        "ignore": []
      },
      "setting": {
        "urlCheck": true,
        "es6": true,
        "enhance": false,
        "postcss": true,
        "preloadBackgroundData": false,
        "minified": true,
        "newFeature": false,
        "coverView": true,
        "nodeModules": false,
        "autoAudits": false,
        "showShadowRootInWxmlPanel": true,
        "scopeDataCheck": false,
        "uglifyFileName": false,
        "checkInvalidKey": true,
        "checkSiteMap": true,
        "uploadWithSourceMap": true,
        "compileHotReLoad": false,
        "babelSetting": {
          "ignore": [],
          "disablePlugins": [],
          "outputPath": ""
        },
        "useIsolateContext": true,
        "useCompilerModule": false,
        "userConfirmedUseCompilerModuleSwitch": false
      },
      "compileType": "miniprogram",
      "libVersion": "2.0.4",
      "appid": "wxa2feca6b7cce2b49",
      "projectname": "miniprogram-project",
      "debugOptions": {
        "hidedInDevtools": []
      },
      "scripts": {},
      "isGameTourist": false,
      "simulatorType": "wechat",
      "simulatorPluginLibVersion": {},
      "condition": {
        "search": {
          "current": -1,
          "list": []
        },
        "conversation": {
          "current": -1,
          "list": []
        },
        "game": {
          "current": -1,
          "list": []
        },
        "plugin": {
          "current": -1,
          "list": []
        },
        "gamePlugin": {
          "current": -1,
          "list": []
        },
        "miniprogram": {
          "current": -1,
          "list": []
        }
      }
    },
    app: {},
    pages: {},
    routeStacks: [],
    currentWebviewId: ""
  };
  /**
   * export
   */

  var createApp = app => {
    store.app = app;
  };
  var createPage = (page, instance) => {
    store.pages[page] = instance;
  };
  var getApp = () => store.app;
  var getCurrentWebviewId = () => store.currentWebviewId;

  var noop = () => void 0;
  var createSessionId = () => Math.random().toString();
  var callHook = function callHook(target, hook, context) {
    var _Reflect$get, _Reflect$get$apply;

    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    return (_Reflect$get = Reflect.get(target || {}, hook)) === null || _Reflect$get === void 0 ? void 0 : (_Reflect$get$apply = _Reflect$get.apply) === null || _Reflect$get$apply === void 0 ? void 0 : _Reflect$get$apply.call(_Reflect$get, context, args);
  };

  /**
   * __JSB 由原生注入的对象
   */

  var jsbridge = () => __JSB;

  var cbs = new Map();

  function keepCbs(sessionId, options) {
    var _options$success, _options$fail, _options$compalte;

    cbs.set(sessionId, {
      success: (_options$success = options.success) !== null && _options$success !== void 0 ? _options$success : noop,
      fail: (_options$fail = options.fail) !== null && _options$fail !== void 0 ? _options$fail : noop,
      compalte: (_options$compalte = options.compalte) !== null && _options$compalte !== void 0 ? _options$compalte : noop
    });
  }
  /**
   * 调用原生的功能
   */


  var invoke = (method, sync, webviewId, option) => {
    var _jsbridge;

    var sessionId = createSessionId();
    keepCbs(sessionId, option);
    return (_jsbridge = jsbridge()) === null || _jsbridge === void 0 ? void 0 : _jsbridge.invoke({
      sessionId,
      sync,
      method,
      webviewId,
      payload: option
    });
  };

  var initPage = function initPage(pageOption) {
    return class PageController {
      /**
       * 在进入到 webview 之后，会实例化这个 PageController
       * @param {string} webviewId 当前页面
       */
      constructor(webviewId) {
        var _pageOption$data;

        this.webviewId = webviewId;
        this.data = (_pageOption$data = pageOption.data) !== null && _pageOption$data !== void 0 ? _pageOption$data : {};
        Reflect.ownKeys(pageOption).forEach(key => {
          if (this[key]) return;
          this[key] = pageOption[key];
        });
      } // JSCore 调用 setData 后，传递给原生
      // 原生再将 setData 传给 对应的 webview


      setData(data) {
        invoke("setData", this.webviewId, data);
      }
      /**
       * Page 的生命周期
       * 这些生命周期在特定时机被原生调用
       */


      onLoad() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        callHook(pageOption, "onLoad", this, ...args);
      }

      onShow() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        callHook(pageOption, "onShow", this, ...args);
      }

      onReady() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        callHook(pageOption, "onReady", this, ...args);
      }

      onHide() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

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

  var wechatApiList = ["drawCanvas", "createContext", "createCanvasContext", "canvasToTempFilePath", "canvasGetImageData", "canvasPutImageData", "createOffscreenCanvas", "getAccountInfoSync", "getShareInfo", "pageScrollTo", "chooseInvoiceTitle", "chooseInvoice", "arrayBufferToBase64", "base64ToArrayBuffer", "openSetting", "getExtConfig", "chooseMedia", "chooseMultiMedia", "chooseMessageFile", "chooseWeChatContact", "uploadEncryptedFileToCDN", "onUploadEncryptedFileToCDNProgress", "getExtConfigSync", "showShareMenu", "hideShareMenu", "updateShareMenu", "shareAppMessageForFakeNative", "openUrl", "setNavigationBarColor", "setNavigationBarAlpha", "vibrateShort", "vibrateLong", "getSetting", "checkIsSupportFacialRecognition", "startFacialRecognitionVerify", "startFacialRecognitionVerifyAndUploadVideo", "startCustomFacialRecognitionVerify", "startCustomFacialRecognitionVerifyAndUploadVideo", "sendBizRedPacket", "sendGoldenRedPacket", "openGoldenRedPacketDetail", "addPhoneContact", "setScreenBrightness", "getScreenBrightness", "getWeRunData", "uploadWeRunData", "addWeRunData", "canIUse", "setPageStyle", "triggerGettingWidgetData", "navigateToMiniProgram", "navigateToMiniProgramDirectly", "navigateToDevMiniProgram", "navigateBackMiniProgram", "launchMiniProgram", "launchApplicationDirectly", "launchApplicationForNative", "setNavigationBarRightButton", "onTapNavigationBarRightButton", "setTopBarText", "setTabBarBadge", "removeTabBarBadge", "showTabBarRedDot", "hideTabBarRedDot", "showTabBar", "hideTabBar", "setTabBarStyle", "setTabBarItem", "setBackgroundColor", "setBackgroundTextStyle", "setEnableDebug", "captureScreen", "onUserCaptureScreen", "offUserCaptureScreen", "setKeepScreenOn", "checkIsSupportSoterAuthentication", "startSoterAuthentication", "checkIsSoterEnrolledInDevice", "openDeliveryList", "navigateBackH5", "openBusinessView", "navigateBackApplication", "navigateBackNative", "reportIDKey", "reportKeyValue", "setNavigationBarTitle", "showNavigationBarLoading", "hideNavigationBarLoading", "hideHomeButton", "startPullDownRefresh", "stopPullDownRefresh", "operateWXData", "getOpenDeviceId", "getMenuButtonBoundingClientRect", "getSelectedTextRange", "openBluetoothAdapter", "closeBluetoothAdapter", "getBluetoothAdapterState", "onBluetoothAdapterStateChange", "startBluetoothDevicesDiscovery", "stopBluetoothDevicesDiscovery", "getBluetoothDevices", "getConnectedBluetoothDevices", "createBLEConnection", "closeBLEConnection", "getBLEDeviceServices", "getBLEDeviceCharacteristics", "notifyBLECharacteristicValueChanged", "notifyBLECharacteristicValueChange", "readBLECharacteristicValue", "writeBLECharacteristicValue", "onBluetoothDeviceFound", "onBLEConnectionStateChanged", "onBLEConnectionStateChange", "onBLECharacteristicValueChange", "startBeaconDiscovery", "stopBeaconDiscovery", "getBeacons", "onBeaconUpdate", "offBeaconUpdate", "onBeaconServiceChange", "offBeaconServiceChange", "startWifi", "stopWifi", "getWifiList", "getConnectedWifi", "connectWifi", "presetWifiList", "setWifiList", "onGetWifiList", "onWifiConnected", "onEvaluateWifi", "getHCEState", "startHCE", "stopHCE", "sendHCEMessage", "onHCEMessage", "offHCEMessage", "startLocalServiceDiscovery", "stopLocalServiceDiscovery", "onLocalServiceFound", "offLocalServiceFound", "onLocalServiceLost", "offLocalServiceLost", "onLocalServiceDiscoveryStop", "offLocalServiceDiscoveryStop", "onLocalServiceResolveFail", "offLocalServiceResolveFail", "redirectTo", "reLaunch", "navigateTo", "switchTab", "navigateBack", "onAppShow", "offAppShow", "onAppHide", "offAppHide", "onError", "offError", "getLaunchOptionsSync", "onWindowResize", "offWindowResize", "getStorage", "getStorageSync", "setStorage", "setStorageSync", "removeStorage", "removeStorageSync", "clearStorage", "clearStorageSync", "getStorageInfo", "getStorageInfoSync", "getBackgroundFetchData", "onBackgroundFetchData", "setBackgroundFetchToken", "getBackgroundFetchToken", "request", "connectSocket", "closeSocket", "sendSocketMessage", "onSocketOpen", "onSocketClose", "onSocketMessage", "onSocketError", "uploadFile", "downloadFile", "addNativeDownloadTask", "downloadApp", "installDownloadApp", "getAppInstallState", "queryDownloadAppTask", "cancelDownloadAppTask", "resumeDownloadAppTask", "pauseDownloadAppTask", "onDownloadAppStateChange", "downloadAppForIOS", "calRqt", "secureTunnel", "chooseImage", "previewImage", "getImageInfo", "saveImageToPhotosAlbum", "compressImage", "startRecord", "stopRecord", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "chooseVideo", "saveVideoToPhotosAlbum", "loadFontFace", "getLocation", "openLocation", "chooseLocation", "onLocationChange", "offLocationChange", "startLocationUpdateBackground", "startLocationUpdate", "stopLocationUpdate", "getNetworkType", "onNetworkStatusChange", "offNetworkStatusChange", "getSystemInfo", "getSystemInfoSync", "getBatteryInfo", "getBatteryInfoSync", "startAccelerometer", "stopAccelerometer", "onAccelerometerChange", "offAccelerometerChange", "startCompass", "stopCompass", "onCompassChange", "offCompassChange", "startDeviceMotionListening", "stopDeviceMotionListening", "onDeviceMotionChange", "offDeviceMotionChange", "startGyroscope", "stopGyroscope", "onGyroscopeChange", "offGyroscopeChange", "reportAction", "getBackgroundAudioManager", "getRecorderManager", "getBackgroundAudioPlayerState", "playBackgroundAudio", "pauseBackgroundAudio", "seekBackgroundAudio", "stopBackgroundAudio", "onBackgroundAudioPlay", "onBackgroundAudioPause", "onBackgroundAudioStop", "joinVoIPChat", "exitVoIPChat", "updateVoIPChatMuteConfig", "onVoIPChatMembersChanged", "onVoIPChatSpeakersChanged", "onVoIPChatInterrupted", "requestSubscribeMessage", "login", "checkSession", "authorize", "getUserInfo", "requestPayment", "verifyPaymentPassword", "bindPaymentCard", "requestPaymentToBank", "requestVirtualPayment", "openOfflinePayView", "openWCPayCardList", "requestMallPayment", "setCurrentPaySpeech", "loadPaySpeechDialectConfig", "faceVerifyForPay", "openOfficialAccountProfile", "openUserProfile", "openMiniProgramProfile", "openMiniProgramSearch", "openMiniProgramHistoryList", "openMiniProgramStarList", "batchGetContactDirectly", "preventApplePayUI", "getWxSecData", "addCard", "openCard", "scanCode", "openQRCode", "chooseAddress", "saveFile", "openDocument", "getSavedFileList", "getSavedFileInfo", "getFileInfo", "removeSavedFile", "getFileSystemManager", "getABTestConfig", "chooseContact", "removeUserCloudStorage", "setUserCloudStorage", "makePhoneCall", "makeVoIPCall", "onAppRoute", "onAppRouteDone", "onAppEnterBackground", "onAppEnterForeground", "onAppUnhang", "onPageReload", "onPageNotFound", "offPageNotFound", "createAnimation", "createInnerAudioContext", "getAvailableAudioSources", "onAudioInterruptionBegin", "offAudioInterruptionBegin", "onAudioInterruptionEnd", "offAudioInterruptionEnd", "setInnerAudioOption", "createAudioContext", "createVideoContext", "createMapContext", "createCameraContext", "createLivePlayerContext", "createLivePusherContext", "onWebviewEvent", "onNativeEvent", "hideKeyboard", "onKeyboardHeightChange", "getPublicLibVersion", "showModal", "showToast", "hideToast", "showLoading", "hideLoading", "showActionSheet", "showShareActionSheet", "reportAnalytics", "reportMonitor", "getClipboardData", "setClipboardData", "createSelectorQuery", "createIntersectionObserver", "nextTick", "updatePerfData", "traceEvent", "onMemoryWarning", "getUpdateManager", "createWorker", "voiceSplitJoint", "uploadSilkVoice", "downloadSilkVoice", "getResPath", "setResPath", "setCookies", "getCookies", "getLabInfo", "setLabInfo", "createUDPSocket", "env", "error", "isSystemError", "isSDKError", "isThirdError", "createRewardedVideoAd", "createInterstitialAd", "getLogManager", "getRealtimeLogManager", "cloud", "version", "chooseShareGroup", "enterContact", "getBaseMethods"];

  /**
   * 直接返回在 store 中初始化的 app， 通常会用来做 store
   */

  function getApp$1() {
    return getApp();
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

  function App(option) {
    createApp(_objectSpread2({
      onLaunch() {},

      onShow() {},

      onHide() {},

      onError() {},

      onPageNotFound() {}

    }, option));
  }
  function Page(option) {
    var pageClass = initPage(option);
    createPage(Reflect.get(Page, "__pageId"), pageClass);
  }
  var wx = {};
  wechatApiList.forEach(key => {
    wx[key] = function (option) {
      var sync = key.endsWith("Sync");
      var method = sync ? key.substr(0, key.length - 4) : key;
      return invoke(method, sync, getCurrentWebviewId(), option);
    };
  });

  /**
   * 导出给小程序使用的方法
   */
  /**
   * global
   */

  var global = {};

  exports.App = App;
  exports.Page = Page;
  exports.getApp = getApp$1;
  exports.global = global;
  exports.wx = wx;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
!function(){"use strict";const{getApp:t,wx:a,App:o,Page:n,global:e}=__polyfill;n.__pageId="/pages/index/index";t();n({data:{motto:"Hello World",userInfo:{nickName:"1874",avatarUrl:"http://pic.sc.chinaz.com/files/pic/pic9/202007/bpic20762.jpg"},count:""},bindViewTap:function(){a.navigateTo({url:"../logs/logs"})},onLoad:function(){this.setData({count:0})},add:function(){this.setData({count:this.data.count+1})},reduce:function(){this.setData({count:this.data.count-1})}});var i=t=>(t=t.toString())[1]?t:"0"+t,s=t=>{var a=t.getFullYear(),o=t.getMonth()+1,n=t.getDate(),e=t.getHours(),s=t.getMinutes(),c=t.getSeconds();return[a,o,n].map(i).join("/")+" "+[e,s,c].map(i).join(":")};n.__pageId="/pages/logs/logs";t();n({data:{logs:[]},onLoad:function(){this.setData({logs:(a.getStorageSync("logs")||[]).map(t=>s(new Date(t)))})}})}();
