import Component from 'ember-component';
import layout from 'ember-refined-remarkable/templates/components/mark-down';
import Remarkable from 'remarkable';
import HighlightJS from 'highlight';

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);

    const presets = this.attrs.presets || 'default';
    const options = this.attrs.options || {};

    if (this.getWithDefault('highlight', true)) {
      options.highlight =(source, language) => {
        if (language && HighlightJS.getLanguage(language)) {
          return HighlightJS.highlight(language, source).value;
        }
        return HighlightJS.highlightAuto(source).value;
      };
    }

    this.remarkable = new Remarkable(presets, options);
  },

  didInsertElement() {
    this.element.innerHTML = this.remarkable.render(
      this.attrs.options && this.attrs.options.html
        ? this.element.innerHTML
        : this.element.textContent
    );
  }
});
