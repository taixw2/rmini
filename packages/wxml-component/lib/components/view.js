
import { LitElement, html, customElement, property, css, unsafeCSS } from 'lit-element';

@customElement('rmini-view')
class ScrollView extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `
  }

  render() {
    return html`<slot></slot>`
  }
}

