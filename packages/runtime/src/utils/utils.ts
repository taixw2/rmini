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
 * 将事件发送给原生
 * @param bindFunctionName
 * @param data
 */
export function eventToNative(bindFunctionName, payload) {
  const webkit = Reflect.get(window, "webkit");
  webkit.messageHandlers.triggerEvent.postMessage(
    JSON.stringify({
      method: bindFunctionName,
      webviewId: Reflect.get(window, "__webviewId"),
      payload
    })
  );
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
