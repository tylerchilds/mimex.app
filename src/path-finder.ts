import { LitElement, html, css } from 'lit';

const STR = 'STR'
const DEX = 'DEX'
const CON = 'CON'
const INT = 'INT'
const WIS = 'WIS'
const CHA = 'CHA'

const attributes = {
  [STR]: 'Strength',
  [DEX]: 'Dexterity',
  [CON]: 'Constitution',
  [INT]: 'Intelligence',
  [WIS]: 'Wisdom',
  [CHA]: 'Charisma',
}

const ancestriesList = [
  'Dwarf',
  'Elf',
  'Gnome',
  'Halfling',
  'Human',
  'Leshy',
  'Orc',
]

const classesList = [
  'Bard',
  'Cleric',
  'Druid',
  'Fighter',
  'Ranger',
  'Rogue',
  'Witch',
  'Wizard',
]

const skillsList = [
  {
    label: 'Acrobatics',
    name: 'acrobatics',
    modifier: DEX,
  },
  {
    label: 'Arcana',
    name: 'arcana',
    modifier: INT,
  },
  {
    label: 'Athletics',
    name: 'athletics',
    modifier: STR,
  },
  {
    label: 'Crafting',
    name: 'crafting',
    modifier: INT,
  },
  {
    label: 'Deception',
    name: 'deception',
    modifier: CHA,
  },
  {
    label: 'Diplomacy',
    name: 'diplomacy',
    modifier: CHA,
  },
  {
    label: 'Intimidation',
    name: 'intimidation',
    modifier: CHA,
  },
  {
    label: 'Lore',
    name: 'lore',
    modifier: INT,
  },
  {
    label: 'Medicine',
    name: 'medicine',
    modifier: WIS,
  },
  {
    label: 'Nature',
    name: 'nature',
    modifier: WIS,
  },
  {
    label: 'Occultism',
    name: 'occultism',
    modifier: INT,
  },
  {
    label: 'Performance',
    name: 'performance',
    modifier: CHA,
  },
  {
    label: 'Religion',
    name: 'religion',
    modifier: WIS,
  },
  {
    label: 'Society',
    name: 'society',
    modifier: INT,
  },
  {
    label: 'Stealth',
    name: 'stealth',
    modifier: DEX,
  },
  {
    label: 'Survival',
    name: 'survival',
    modifier: WIS,
  },
  {
    label: 'Thievery',
    name: 'thievery',
    modifier: DEX,
  },
]

const ethicsList = ["Lawful", "Neutral", "Chaotic"]
const modalsList = ["Good", "Neutral", "Evil"]

export class PathFinder extends LitElement {
  static properties = {
    character: { type: String },
    ancestry: { type: String },
    classification: { type: String },
    ethics: { type: String },
    morals: { type: String },
    background: { type: String },
    inventory: { type: String },
    [STR]: { type: Number },
    [DEX]: { type: Number },
    [CON]: { type: Number },
    [INT]: { type: Number },
    [WIS]: { type: Number },
    [CHA]: { type: Number },
    ...Object.fromEntries(skillsList.map(skill => [skill.name, { type: Number }])),
    ...Object.fromEntries(skillsList.map(skill => [`${skill.name}-note`, { type: String }])),
  };

  constructor() {
    super();
    this.character = '';
    this.ancestry = '';
    this.classification = '';
    this.ethics = '';
    this.morals = '';
    this.background = '';
    this.inventory = '';
    this[STR] = 0;
    this[DEX] = 0;
    this[CON] = 0;
    this[INT] = 0;
    this[WIS] = 0;
    this[CHA] = 0;
    
    // Initialize skills
    skillsList.forEach(skill => {
      this[skill.name] = 0;
      this[`${skill.name}-note`] = '';
    });
  }

  handleInput(event) {
    const { name, value, type } = event.target;
    this[name] = type === 'number' ? parseInt(value) || 0 : value;
    this.requestUpdate();
  }

  renderAncestryOptions() {
    return html`
      <option disabled>--select--</option>
      ${ancestriesList.map(ancestry => html`
        <option value="${ancestry}" ?selected="${ancestry === this.ancestry}">
          ${ancestry}
        </option>
      `)}
    `;
  }

  renderClassOptions() {
    return html`
      <option disabled>--select--</option>
      ${classesList.map(cls => html`
        <option value="${cls}" ?selected="${cls === this.classification}">
          ${cls}
        </option>
      `)}
    `;
  }

  renderStats() {
    return Object.keys(attributes).map(attr => html`
      <label class="field">
        <span class="label" title="${attributes[attr]}">${attr}</span>
        <input 
          type="number" 
          name="${attr}" 
          .value="${this[attr]}"
          @input="${this.handleInput}"
        >
      </label>
    `);
  }

  renderEthicsRadios() {
    return ethicsList.map(value => html`
      <label class="field -inline">
        <input 
          type="radio" 
          name="ethics" 
          .value="${value}" 
          .checked="${this.ethics === value}"
          @change="${this.handleInput}"
        />
        <span class="label">${value}</span>
      </label>
    `);
  }

  renderMoralsRadios() {
    return modalsList.map(value => html`
      <label class="field -inline">
        <input 
          type="radio" 
          name="morals" 
          .value="${value}" 
          .checked="${this.morals === value}"
          @change="${this.handleInput}"
        />
        <span class="label">${value}</span>
      </label>
    `);
  }

  renderSkills() {
    return skillsList.map(skill => {
      const { label, name, modifier } = skill;
      const skillValue = parseInt(this[name] || 0);
      const modValue = parseInt(this[modifier] || 0);
      const total = skillValue + modValue;
      
      return html`
        <div class="skill">
          <div class="skill-value">
            <label class="field">
              <span class="label">${label}</span>
              <input 
                type="number" 
                name="${name}" 
                .value="${skillValue}"
                @input="${this.handleInput}"
              >
            </label>
          </div>
          <div class="skill-math">${total}</div>
          <div class="skill-notes">
            <textarea 
              class="standard-input" 
              name="${name}-note"
              .value="${this[`${name}-note`] || ''}"
              @input="${this.handleInput}"
            ></textarea>
          </div>
        </div>
      `;
    });
  }

  render() {
    return html`
      <div class="page">
        <label class="field">
          <span class="label">Background</span>
          <textarea 
            class="standard-input" 
            name="background"
            .value="${this.background}"
            @input="${this.handleInput}"
          ></textarea>
        </label>

        <div class="character">
          <label class="field" style="grid-area: name;">
            <span class="label">Character</span>
            <input 
              name="character" 
              .value="${this.character}"
              @input="${this.handleInput}"
            >
          </label>
          <label class="field">
            <span class="label">Ancestry</span>
            <select name="ancestry" @change="${this.handleInput}">
              ${this.renderAncestryOptions()}
            </select>
          </label>
          <label class="field">
            <span class="label">Class</span>
            <select name="classification" @change="${this.handleInput}">
              ${this.renderClassOptions()}
            </select>
          </label>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr;">
          <div>
            Ethics<br>
            ${this.renderEthicsRadios()}
          </div>
          <div>
            Morals<br>
            ${this.renderMoralsRadios()}
          </div>
        </div>

        <div class="stats">
          ${this.renderStats()}
        </div>

        <div class="skills">
          ${this.renderSkills()}
        </div>

        <label class="field">
          <span class="label">Inventory</span>
          <textarea 
            class="standard-input" 
            name="inventory"
            .value="${this.inventory}"
            @input="${this.handleInput}"
          ></textarea>
        </label>

        ${this.classification === 'Bard' ? html`<paper-pocket></paper-pocket>` : ''}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      overflow: auto;
    }

    .page {
      padding: 1in 1rem;
      max-width: 7.5in;
      margin: auto;
      display: grid;
      gap: 1rem;
    }

    .character {
      display: grid;
      grid-template-areas: "name name" "ancestry classification";
      grid-template-columns: 1fr 1fr;
      gap: .5rem;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(4ch, 1fr));
      gap: .5rem;
    }

    .skills {
      display: grid;
      gap: 1rem;
    }

    .skill {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
      gap: .5rem;
    }

    .skill-math {
      display: grid;
      place-content: end;
      font-size: 2rem;
      color: rgba(0,0,0,.5);
    }

    .skill-value input {
      max-width: 100%;
    }

    .skill .field {
      margin-bottom: 0;
    }

    .skill-notes textarea {
      height: 100%;
      resize: none;
      max-width: 100%;
    }

    .navigation {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
    }

    .field {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }

    .field.-inline {
      flex-direction: row;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .field.-inline input {
      margin-right: 0.5rem;
    }

    .label {
      font-weight: bold;
      margin-bottom: 0.25rem;
    }

    .standard-input, input, select, textarea {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-family: inherit;
    }

    textarea.standard-input {
      min-height: 4rem;
      resize: vertical;
    }

    input[type="number"] {
      max-width: 100px;
    }
  `;
}
