export function format(first: string, middle: string, last: string): string {
  return (
    (first || "") + (middle ? ` ${middle}` : "") + (last ? ` ${last}` : "")
  );
}

export type TouchTargetEvent = { target: HTMLElement } & TouchEvent;

export function same<T>(props: T, value: any): value is T {
  return props === value;
}

/**
 * 调用原生的方法，与原生定义一致
 */
export const enum InvokeNativeType {
  log = 0,
  lifecycle = 1,
  event = 2
}

/**
 * 
 * @param type 
 * @param payload 
 */
export function invokeNative(type: InvokeNativeType, payload: any) {
  const webkit = Reflect.get(window, "webkit");
  
  if (!webkit) {
    return
  }
  webkit.messageHandlers.trigger.postMessage(
    JSON.stringify({
      type,
      payload
    })
  );
}

export function log(...messages: any[]) {
  invokeNative(InvokeNativeType.log, messages);
  if (typeof console !== "undefined") {
    console.log(...messages)
  }
}

/**
 * 将事件发送给原生
 * @param bindFunctionName
 * @param data
 */
export function eventToNative(bindFunctionName, payload) {
  invokeNative(InvokeNativeType.event, {
    method: bindFunctionName,
    payload
  });
}

export function getTouchs(touchs: TouchList) {
  return Array.from(touchs ?? []).map(item => ({
    clientX: item.clientX,
    clientY: item.clientY,
    force: item.force,
    identifier: item.identifier,
    pageX: item.pageX,
    pageY: item.pageY
  }));
}

/**
 * 同步小程序事件参数
 * @param event
 */
export function createEvent(event: TouchTargetEvent) {
  const touches = getTouchs(event.touches);
  const changedTouches = getTouchs(event.changedTouches);

  const target = {
    offsetLeft: event.target?.offsetLeft,
    offsetTop: event.target?.offsetTop,
    dataset: { ...event.target?.dataset }
  };

  return {
    type: event.type,
    timeStamp: Date.now(),
    detail: {
      x: touches[0]?.pageX,
      y: touches[0]?.pageY
    },
    target,
    currentTarget: target,
    changedTouches,
    touches,
    _requireActive: true
  };
}
