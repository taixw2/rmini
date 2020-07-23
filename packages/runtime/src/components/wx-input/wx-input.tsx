import { Component, ComponentInterface, Host, h } from '@stencil/core';

@Component({
  tag: 'wx-input',
  styleUrl: 'wx-input.css',
  shadow: true,
})
export class WxInput implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
