import { Component, ComponentInterface, Host, h } from '@stencil/core';

@Component({
  tag: 'wx-block',
  styleUrl: 'wx-block.css',
  shadow: true,
})
export class WxBlock implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
