import { html, LitElement } from 'lit';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';

export class AboutPage extends ScopedElementsMixin(LitElement) {
  render() {
    return html`<div class="prose">
      <h1>About</h1>
      <p>Mimex is an exocortex for discerning mimes 🤡.</p>
    </div>`;
  }
  static scopedElements = {
  };
}
