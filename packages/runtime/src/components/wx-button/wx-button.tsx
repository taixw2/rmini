import {
  Component,
  ComponentInterface,
  Host,
  h,
  Prop,
  Listen,
  State
} from "@stencil/core";
import {
  createEvent,
  TouchTargetEvent,
  eventToNative,
  same,
  log
} from "../../utils/utils";

@Component({
  tag: "wx-button",
  styleUrl: "wx-button.css",
  shadow: true
})
export class WxButton implements ComponentInterface {
  @State() hoved: boolean = false;

  /**
   * 按钮的大小
   */
  @Prop() size: "default" | "mini" = "default";

  /**
   * 按钮的样式类型
   */
  @Prop() type: "default" | "primary" | "warn" = "default";

  /**
   * 按钮是否镂空，背景色透明
   */
  @Prop() plain: boolean = false;

  /**
   * 是否禁用
   */
  @Prop() disabled: boolean = false;

  /**
   * 名称前是否带 loading 图标
   */
  @Prop() loading: boolean = false;

  render() {
    return (
      <Host
        class={{
          "size-default": same(this.size, "default"),
          "size-mini": same(this.size, "mini"),
          "type-default": same(this.type, "default"),
          "type-primary": same(this.type, "primary"),
          "type-warn": same(this.type, "warn"),
          "button-plain": this.plain,
          "button-disabled": this.disabled,
          "button-hover": this.hoved
        }}
      >
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
    if (this.disabled) return
    this.hoved = true;
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
    if (this.disabled) return
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
    if (this.disabled) return
    this.hoved = false;
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
    if (this.disabled) return
    this.hoved = false;
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

  // XXX: 点击太快会有一次触发丢失
  @Listen("click")
  handlerTap(event: TouchTargetEvent) {
    if (this.disabled) return
    if (this.catchtap) {
      event.stopPropagation();
      eventToNative(this.catchtap, createEvent(event));
    }
    if (this.bindtap) {
      eventToNative(this.bindtap, createEvent(event));
    }
  }
}
