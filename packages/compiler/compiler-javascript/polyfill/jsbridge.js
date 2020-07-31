/**
 * __JSB 由原生注入的对象
 */

import { createSessionId, noop } from "./util";

const jsbridge = () => __JSB;

const cbs = new Map();

function keepCbs(sessionId, options) {
  cbs.set(sessionId, {
    success: options.success ?? noop,
    fail: options.fail ?? noop,
    compalte: options.compalte ?? noop,
  });
}

/**
 * 调用原生的功能
 */
export const invoke = (method, sync, webviewId, option) => {
  const sessionId = createSessionId();
  keepCbs(sessionId, option);

  return jsbridge()?.invoke(JSON.stringify({
    sessionId,
    sync,
    method,
    webviewId,
    payload: option,
  }));
};

/**
 * 原生去调用该方法
 */
export const callCbs = ({ sessionId, status, payload }) => {
  const statusGroupCallback = cbs.get(sessionId);
  statusGroupCallback[status](payload);
  statusGroupCallback.compalte(payload);

  cbs.delete(sessionId)
};
