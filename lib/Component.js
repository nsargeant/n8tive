import parseTemplate from '../utils/parse-template'

class Component extends HTMLElement {
  constructor({ style, template }) {
    super();
    const element = parseTemplate(template);
    if (style) {
      const styleElement = document.createElement('style');
      styleElement.innerHTML = style;
      element.appendChild(styleElement);
    }
    const slot = element.querySelector('slot');
    if (slot) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('slot', 'wrapper');
      slot.parentNode.replaceChild(wrapper, slot);

      [...this.children].forEach(child => {
        wrapper.appendChild(child);
      });
    }
    this.__element = element;
  }
  // From HTMLElement
  connectedCallback() {
    if (this.contains(this.__element)) {
      return;
    }
    this.appendChild(this.__element);
    this.init();
  }
  disconnectedCallback() {
    this.destroy();
  }
  // Component API
  init() { };
  destroy() { };
}

export default Component;