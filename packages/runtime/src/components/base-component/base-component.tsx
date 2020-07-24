import { Component, Host, Prop, h, Listen } from "@stencil/core";

/**
 * 将事件发送给原生
 * @param bindFunctionName
 * @param data
 */
function eventToNative(bindFunctionName, payload) {
  const webkit = Reflect.get(window, "webkit");
  webkit.messageHandlers.triggerEvent.postMessage(
    JSON.stringify({
      method: bindFunctionName,
      payload
    })
  );
}

function getTouchs(touchs: TouchList) {
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
function createEvent(event: TouchTargetEvent) {
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

type TouchTargetEvent = { target: HTMLElement } & TouchEvent;

@Component({
  tag: "base-component",
  styleUrl: "base-component.css",
  shadow: true
})
export class BaseComponent {
  touchStartInfo: null | { target: HTMLElement; time: number };

  @Prop() bindTouchstart: string;

  @Prop() bindTouchmove: string;

  @Prop() bindTouchcancel: string;

  @Prop() bindTouchend: string;

  @Prop() bindTap: string;

  @Prop() bindLongpress: string;

  @Prop() bindLongtap: string;

  @Prop() catchTouchstart: string;

  @Prop() catchTouchmove: string;

  @Prop() catchTouchcancel: string;

  @Prop() catchTouchend: string;

  @Prop() catchTap: string;

  @Prop() catchLongpress: string;

  @Prop() catchLongtap: string;

  @Listen("touchstart")
  handlerTouchstart(event: TouchTargetEvent) {
    this.touchStartInfo = { target: event.target, time: Date.now() };
    if (this.catchTouchstart) {
      event.stopPropagation();
      eventToNative(this.catchTouchstart, createEvent(event));
    }
    if (this.bindTouchstart) {
      eventToNative(this.bindTouchstart, createEvent(event));
    }
  }

  @Listen("touchmove")
  handlerTouchmove(event: TouchTargetEvent) {
    if (this.catchTouchmove) {
      event.stopPropagation();
      eventToNative(this.catchTouchmove, createEvent(event));
    }
    if (this.bindTouchmove) {
      eventToNative(this.bindTouchmove, createEvent(event));
    }
  }

  @Listen("touchcancel")
  handlerTouchcancel(event: TouchTargetEvent) {
    if (this.catchTouchcancel) {
      event.stopPropagation();
      eventToNative(this.catchTouchcancel, createEvent(event));
    }
    if (this.bindTouchcancel) {
      eventToNative(this.bindTouchcancel, createEvent(event));
    }
  }

  @Listen("touchend")
  handlerTouchend(event: TouchTargetEvent) {
    if (this.catchTouchend) {
      event.stopPropagation();
      eventToNative(this.catchTouchend, createEvent(event));
    }
    if (this.bindTouchend) {
      eventToNative(this.bindTouchend, createEvent(event));
    }

    const startInfo = this.touchStartInfo ?? { target: null, time: 0 };
    const isLongTap =
      startInfo.target === event.target && Date.now() > startInfo.time + 350;

    if (isLongTap) {
      if (this.catchLongpress) {
        event.stopPropagation();
        eventToNative(this.catchLongpress, createEvent(event));
      }
      if (this.bindLongpress) {
        event.stopPropagation();
        eventToNative(this.bindLongpress, createEvent(event));
      }
    }
  }

  @Listen("click")
  handlerTap(event: TouchTargetEvent) {
    console.log("BaseComponent -> handlerTap -> event", event)
    if (this.catchTap) {
      event.stopPropagation();
      eventToNative(this.catchTap, createEvent(event));
    }
    if (this.bindTap) {
      eventToNative(this.bindTap, createEvent(event));
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
