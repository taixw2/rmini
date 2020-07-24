import {
  Component,
  ComponentInterface,
  Host,
  h,
  Prop,
  Listen
} from "@stencil/core";

import {
  createEvent,
  TouchTargetEvent,
  eventToNative
} from "../../utils/utils";

@Component({
  tag: "wx-text",
  styleUrl: "wx-text.css",
  shadow: true
})
export class WxText implements ComponentInterface {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  /**
   * 通用事件
   */
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
    if (this.catchTap) {
      event.stopPropagation();
      eventToNative(this.catchTap, createEvent(event));
    }
    if (this.bindTap) {
      eventToNative(this.bindTap, createEvent(event));
    }
  }
}
