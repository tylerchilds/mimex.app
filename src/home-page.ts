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
      <collection-chat src="${this.collectionSrc}"></collection-chat>
    </div>`;
  }

  get collectionSrc() {
    const search = this.ownerDocument.location.search
    const searchParams = new URLSearchParams(search)
    const srcFromSearchParams = searchParams.get('src')
    // if location had ?src={uri}, return that
    if (srcFromSearchParams) return srcFromSearchParams
    // default to this constant space uuid hosted on same as this element
    return `/space/${MIMEX_GATHERING_SPACE_UUID}/chat/`
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
