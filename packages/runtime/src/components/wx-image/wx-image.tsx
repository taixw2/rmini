import { Component, ComponentInterface, Host, h } from '@stencil/core';

@Component({
  tag: 'wx-image',
  styleUrl: 'wx-image.css',
  shadow: true,
})
export class WxImage implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
