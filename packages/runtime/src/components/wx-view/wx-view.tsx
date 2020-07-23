import { Component, ComponentInterface, Host, h } from '@stencil/core';

@Component({
  tag: 'wx-view',
  styleUrl: 'wx-view.css',
  shadow: true,
})
export class WxView implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
