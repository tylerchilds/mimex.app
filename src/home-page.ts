import { html, LitElement, unsafeCSS } from 'lit';
import styles from "./home-page.css?inline"
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { MyButton } from './my-button';
import { CollectionChat } from './collection-chat';

const MIMEX_GATHERING_SPACE_UUID = 'd971ae62-27f8-4186-9b09-75704739dffb'

export class HomePage extends ScopedElementsMixin(LitElement) {
  render() {
    return html`<div class="p-8 prose">
      <h1>Mimex</h1>
      <p>an exocortex for mimes like you.</p>
      <h2>Chat</h2>
      <collection-chat src="/space/${MIMEX_GATHERING_SPACE_UUID}/chat/"></collection-chat>
    </div>`;
  }

  static styles = [
    unsafeCSS(styles),
  ]

  static scopedElements = {
    'my-button': MyButton,
    'collection-chat': CollectionChat,
  };

  connectedCallback(): void {
    super.connectedCallback();
  }
}
