import { Component, ComponentInterface, Host, h } from '@stencil/core';

@Component({
  tag: 'wx-text',
  styleUrl: 'wx-text.css',
  shadow: true,
})
export class WxText implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
