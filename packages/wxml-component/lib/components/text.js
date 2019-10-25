
import { LitElement, html, customElement, property, css, unsafeCSS } from 'lit-element';

@customElement('rmini-text')
class ScrollView extends LitElement {

  static get styles() {
    return css`
      :host {
        display: inline;
      }
    `
  }

  render() {
    return html`<slot></slot>`
  }
}

