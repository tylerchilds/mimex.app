import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from "./my-element.css?inline"
// eslint-disable-next-line import/no-extraneous-dependencies
import 'urlpattern-polyfill';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { MyButton } from './my-button.ts';
import '@webcomponents/scoped-custom-element-registry';
import { Routes } from '@lit-labs/router';
import { HomePage } from './home-page.ts';
import { AboutPage } from './about-page.ts';

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

  connectedCallback(): void {
    super.connectedCallback?.();
    // eslint-disable-next-line no-undef
    this._routes.goto(globalThis?.location.pathname);
  }

  render() {
    return html`
      <main>
        ${this._routes.outlet()}
      </main>
    `
  }

  static styles = [
    unsafeCSS(styles),
  ]

  static scopedElements = {
    'about-page': AboutPage,
    'home-page': HomePage,
    'my-button': MyButton,
  };

  private _routes = new Routes(
    this,
    [
      { path: '/', render: () => html`<home-page></home-page>` },
      { path: '/about', render: () => html`<about-page></about-page>` },
      { path: '/space/:space/', render: () => html`<h1>Space</h1>` },
      {
        path: '/space/:space/about',
        render: () =>
          html`<h1>About Space</h1>
            <my-button></my-button>`,
      },
    ],
    {
      fallback: {
        render: () => html`
          <div class="prose">
            <h1>Not Found</h1>
          </div>
        `,
      },
    },
  );

}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
