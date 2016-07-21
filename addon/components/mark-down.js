import Ember from 'ember';
import layout from '../templates/components/mark-down';
import Remarkable from 'remarkable';
import HighlightJS from 'highlight';

export default Ember.Component.extend({
  layout,

  didReceiveAttrs() {
    this._super(...arguments);

    const presets = this.attrs.presets || 'default';
    const options = this.attrs.options || {};

    if (this.getWithDefault('highlight', true)) {
      options.highlight = function highlight(source, language) {
        if (language && HighlightJS.getLanguage(language)) {
          return HighlightJS.highlight(language, source).value;
        }
        return HighlightJS.highlightAuto(source).value;
      };
    }

    this.remarkable = new Remarkable(presets, options);
  },

  didInsertElement() {
    this._super(...arguments);

    this.element.innerHTML = this.remarkable.render(
      this.attrs.options && this.attrs.options.html
      ? this.element.innerHTML
      : this.element.textContent
    );
  }
});
