import { Component, ComponentInterface, Host, h } from '@stencil/core';

@Component({
  tag: 'wx-button',
  styleUrl: 'wx-button.css',
  shadow: true,
})
export class WxButton implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
