import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'wx-input',
  styleUrl: 'wx-input.css',
  shadow: true,
})
export class WxInput implements ComponentInterface {

  @Prop() value: string

  render() {
    return (
      <Host>
        <input value={this.value} />
      </Host>
    );
  }

}
