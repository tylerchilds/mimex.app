import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from "./my-element.css?inline"
// eslint-disable-next-line import/no-extraneous-dependencies
import 'urlpattern-polyfill';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { MyButton } from './my-button.ts';
import '@webcomponents/scoped-custom-element-registry';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends ScopedElementsMixin(LitElement) {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  render() {
    return html`

      <slot></slot>

      <div class="card p-8">
        <div class="prose max-w-none">
          <h1 class="text-9xl text-red-500">my-element</h1>
        </div>
        <br />
        <my-button @click=${this._onClick} part="button">
          count is ${this.count}
        </my-button>
      </div>
    `
  }

  private _onClick() {
    this.count++
  }

  static styles = [
    unsafeCSS(styles),
    css`
      :host {
      }
    `,
  ]

  static scopedElements = {
    'my-button': MyButton,
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
