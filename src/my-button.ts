import { html, LitElement, unsafeCSS } from 'lit';
import styles from "./my-button.css?inline"

export class MyButton extends LitElement {
  render() {
    return html`<button><slot>${Math.random()}</slot></button>`;
  }

  static styles = [
    unsafeCSS(styles),
  ]
}
