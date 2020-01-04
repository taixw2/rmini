
import { LitElement, html, customElement, property, css, unsafeCSS } from 'lit-element';

@customElement('rmini-scroll-view')
class ScrollView extends LitElement {
  @property({ type: Boolean, attribute: 'scroll-x' }) _scrollX = false;
  @property({ type: Boolean, attribute: 'scroll-y' }) _scrollY = false;
  @property({ type: Number, attribute: 'upper-threshold' }) _upperThreshold = 50;
  @property({ type: Number, attribute: 'lower-threshold' }) _lowerThreshold = 50;
  @property({ type: Number, attribute: 'scroll-top' }) _scrollTop = 0;
  @property({ type: Number, attribute: 'scroll-left' }) _scrollLeft = 0;
  @property({ type: String, attribute: 'scroll-into-view' }) _scrollIntoView = '';
  @property({ type: Boolean, attribute: 'scroll-with-animation' }) _scrollWithAnimation = false;
  @property({ type: Boolean, attribute: 'enable-back-to-top' }) _enableBackToTop = false;
  @property({ type: Boolean, attribute: 'enable-flex' }) _enableFlex = false;
  @property({ type: Boolean, attribute: 'scroll-anchoring' }) _scrollAnchoring = false;

  // 
  @property({ type: String, attribute: 'bindscrolltoupper' }) _bindscrolltoupper = '';
  @property({ type: String, attribute: 'bindscrolltolower' }) _bindscrolltolower = '';
  @property({ type: String, attribute: 'bindscroll' }) _bindscroll = '';

  static get styles() {
    return css`
      :host {
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

  onScrollHandler(e) {
    window.__vm.triggerEvent('scroll', this._bindscroll, e)

    // TODO: 其他方法
    // const target = e.target;
    // const triggerTerminal = (currentPosition, presetPosition, eventName) => {
    //   if (currentPosition !== presetPosition) { return; }
    //   window.__vm.triggerEvent(eventName, this['_' + eventName], e)
    // }

    // if (this._scrollX) {
    //   triggerTerminal(target.scrollLeft, this._upperThreshold, 'bindscrolltoupper')
    //   triggerTerminal(target.scrollWidth - target.scrollLeft, this._lowerThreshold, 'bindscrolltolower')
    // }
    
    // if (this._scrollY) {
    //   console.log("TCL: ScrollView -> onScrollHandler -> target.scrollTop, this._upperThreshold", target.scrollTop, this._upperThreshold)
    //   triggerTerminal(target.scrollTop, this._upperThreshold, 'bindscrolltoupper')
    //   triggerTerminal(target.scrollHeight - target.scrollTop, this._lowerThreshold, 'bindscrolltolower')
    // }
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('scroll', this.onScrollHandler)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('scroll', this.onScrollHandler)
  }

  render() {
    return html`
      <style>
        :host {
          overflow-x: ${unsafeCSS(this._scrollX ? 'scroll' : 'hidden')};
          overflow-y: ${unsafeCSS(this._scrollY ? 'scroll' : 'hidden')};
        }
      </style>
      <slot></slot>
    `
  }
}

