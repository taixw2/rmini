
import { LitElement, html, customElement, property, css, unsafeCSS } from 'lit-element';

@customElement('rmini-input')
class ScrollView extends LitElement {
  @property({ type: Boolean, attribute: 'type' }) _type = 'text';
  @property({ type: Number, attribute: 'password' }) _password = false;
  @property({ type: Number, attribute: 'placeholder' }) _placeholder = "";
  @property({ type: String, attribute: 'value' }) _value = '';

  // 
  @property({ type: String, attribute: 'bindinput' }) _bindinput = '';

  static get styles() {
    return css`
        :host {
          display: block;
          position: relative;
          height: 32px;
          width: 50px;
        }
        input {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
        }
      `
  }

  update(changedProperties) {
    super.update(changedProperties);
    if (changedProperties.has('_value')) {
      this.shadowRoot.firstElementChild.value = this._value
    }
  }

  handleInput(e) {
    window.__vm.triggerEvent('scroll', this._bindinput, e)
  }

  render() {
    return html`
        <input class="input" @input="${this.handleInput}" />
      `
  }
}

