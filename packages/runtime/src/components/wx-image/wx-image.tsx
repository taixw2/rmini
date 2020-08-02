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
  eventToNative,
  same
} from "../../utils/utils";

const modes = [
  "scaleToFill",
  "aspectFit",
  "aspectFill",
  "top",
  "bottom",
  "left",
  "center",
  "right",
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight"
];

@Component({
  tag: "wx-image",
  styleUrl: "wx-image.css",
  shadow: true
})
export class WxImage implements ComponentInterface {
  @Prop() src: string;

  @Prop() mode:
    | "scaleToFill"
    | "aspectFit"
    | "aspectFill"
    | "top"
    | "bottom"
    | "left"
    | "center"
    | "right"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight" = "aspectFill";

  render() {
    const classList = modes.reduce(
      (p, c) => ((p[c] = same(this.mode, c)), p),
      {}
    );
    return (
      <Host>
        <img
          class={{
            image: true,
            ...classList
          }}
          src={this.src}
        />
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

  @Prop() bindtap: string;

  @Prop() bindLongpress: string;

  @Prop() bindLongtap: string;

  @Prop() catchTouchstart: string;

  @Prop() catchTouchmove: string;

  @Prop() catchTouchcancel: string;

  @Prop() catchTouchend: string;

  @Prop() catchtap: string;

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
    if (this.catchtap) {
      event.stopPropagation();
      eventToNative(this.catchtap, createEvent(event));
    }
    if (this.bindtap) {
      eventToNative(this.bindtap, createEvent(event));
    }
  }
}
