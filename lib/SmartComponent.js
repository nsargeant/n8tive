import Component from './Component'

class SmartComponent extends Component {
  constructor({ store, style, template }) {
    super({ style, template });
    
    this._render = () => {
      const selectedState = this.select(store.getState());
      if (selectedState) {
        this.render(selectedState);
      }
    };
    if (!store) {
      throw new Error('Missing store');
    }
    this.store = store;
    this.unsubscribe = store.subscribe(this._render);
  }
  
  // Override Component.js
  connectedCallback() {
    super.connectedCallback();
    this._render();
  }
  disconnectedCallback() {
    this.unsubscribe();
    this.destroy();
  }
  
  // API
  destroy() { }
  init() { }
  select(state) {
    return state
  }
  render() { }
}

export default SmartComponent;