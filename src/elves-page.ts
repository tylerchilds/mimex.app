import { html, LitElement, unsafeCSS } from 'lit';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { MyButton } from './my-button';
import styles from "./home-page.css?inline"

export class ElvesPage extends ScopedElementsMixin(LitElement) {
  render() {
    return html`<div class="p-8 prose">
      <h1>Elves</h1>
      <p>Elves are self transforming machines. There are many different kinds, all kind, which you can find below:</p>
      <ul>
        <li>
          <code>elf-elves-page</code> is an element that describes elf, written in elf.
          <!-- <elf-elves-page></elf-elves-page> -->
        </li>
      </ul>
    </div>`;
  }
  static scopedElements = {
    'my-button': MyButton,
    // @todo add something like
    // 'elf-elves-page': (await import('./elf-elves-page.js')).ElfElvesPage
  };
  static styles = [
    unsafeCSS(styles),
  ]
}
