import { customElement, LitElement, property, css, html } from "lit-element";

class Button extends LitElement {
  @property({ type: Boolean, attribute: "type" })
  _type = "default";

  initialize(...arg) {
    super.initialize(...arg);
  }

  static get styles() {
    return css`
      :host {
        position: relative;
        display: block;
        margin-left: auto;
        margin-right: auto;
        padding-left: 14px;
        padding-right: 14px;
        box-sizing: border-box;
        font-size: 18px;
        text-align: center;
        text-decoration: none;
        line-height: 2.55555556;
        border-radius: 5px;
        -webkit-tap-highlight-color: transparent;
        overflow: hidden;
        color: #000;
        background-color: #f8f8f8;
      }

      :host::after {
        content: " ";
        width: 200%;
        height: 200%;
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid rgba(0, 0, 0, .2);
        -webkit-transform: scale(.5);
        transform: scale(.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        box-sizing: border-box;
        border-radius: 10px;
      }

      :host([type=primary]) {
        color: #fff;
        background-color: #1aad19;
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

export default customElement("rmini-button")(Button);
