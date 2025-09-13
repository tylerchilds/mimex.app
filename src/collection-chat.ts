import { html, LitElement } from 'lit';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { z } from "zod"
import { repeat } from 'lit/directives/repeat.js';

const shapeOfCollection = z.object({
  totalItems: z.int(),
  items: z.array(z.object({
    name: z.string(),
  }))
})

export class CollectionChat extends ScopedElementsMixin(LitElement) {
  @property()
  collection?: z.infer<typeof shapeOfCollection>;

  @property()
  initializeCollectionError?: unknown;

  @property()
  src?: string;

  render() {
    return html`<div class="p-8 prose">
      <dl>
        ${when(this.initializeCollectionError, () => html`<dt>initializeCollectionError</dt><dd>${(this.initializeCollectionError as any)?.message}</dd>`)}
        ${this.collection && html`
          <dt>items</dt><dd>
            <ul>
              ${repeat(this.collection.items, i => i.name, i => html`<li>${i.name}</li>`)}
            </ul>
          </dd>
        `}
        <dt>src</dt><dd>${this.src}</dd>
        ${when(this.collection, () => html`<dt>totalItems</dt><dd>${this.collection?.totalItems}</dd>`)}
        ${when(this.collection, () => html`<dt>JSON</dt><dd><pre><details>${JSON.stringify(this.collection, null, 2)}</details></pre></dd>`)}
      </dl>
    </div>`;
  }

  static scopedElements = {
  };

  async connectedCallback() {
    super.connectedCallback();
    try {
      await this.initializeCollection()
    } catch (error) {
      console.debug('error during initializeCollection', error)
      this.initializeCollectionError = error
    }
  }

  /** like globalThis.fetch, but can be customized */
  fetch(...args: Parameters<typeof fetch>) {
    return fetch(...args)
  }

  /**
   * fetch collection of data that should be rendered 
   */
  async initializeCollection() {
    const collectionHref = this.src
    if (!collectionHref) return;

    const collectionResponse = await this.fetch(collectionHref)
    if (!collectionResponse.ok) throw new Error(`response to get collection indicates not ok (status ${collectionResponse.status})`, { cause: collectionResponse })

    const responseContentType = collectionResponse.headers.get('content-type')
    if (!responseContentType?.startsWith('application/json')) throw new Error(`response content-type should be JSON, not ${responseContentType}`)

    const collectionObject = await collectionResponse.json()
    const collection = shapeOfCollection.loose().parse(collectionObject)
    this.collection = collection
  }
}
