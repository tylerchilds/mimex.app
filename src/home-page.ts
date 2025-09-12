import { html, LitElement, unsafeCSS } from 'lit';
import styles from "./home-page.css?inline"
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { MyButton } from './my-button';

export class HomePage extends ScopedElementsMixin(LitElement) {
  render() {
    return html`<div class="prose">
      <h1>Home</h1>
      <p>Home is where the heart is.</p>
    </div>`;
  }

  static styles = [
    unsafeCSS(styles),
  ]

  static scopedElements = {
    'my-button': MyButton,
  };
}
