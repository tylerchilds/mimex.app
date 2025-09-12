import { html, LitElement, unsafeCSS } from 'lit';
import styles from "./home-page.css?inline"
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { MyButton } from './my-button';

export class HomePage extends ScopedElementsMixin(LitElement) {
  render() {
    return html`<div class="p-8 prose">
      <h1>Mimex</h1>
      <p>an exocortex for mimes like you.</p>
    </div>`;
  }

  static styles = [
    unsafeCSS(styles),
  ]

  static scopedElements = {
    'my-button': MyButton,
  };
}
