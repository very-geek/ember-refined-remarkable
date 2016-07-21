import Ember from 'ember';
import layout from '../templates/components/mark-down';
import Remarkable from 'remarkable';
import HighlightJS from 'highlight';

const { assign } = Ember;

export default Ember.Component.extend({
  layout,

  didReceiveAttrs() {
    this._super(...arguments);

    if (this.getWithDefault('highlight', true)) {
      this.markdownOptions = assign({}, this.attrs.options || {}, {
        highlight(source, language) {
          if (language && HighlightJS.getLanguage(language)) {
            return HighlightJS.highlight(language, source).value;
          }

          return HighlightJS.highlightAuto(source).value;
        }
      });
    }
  },

  willRender() {
    this._super(...arguments);

    this.remarkable = new Remarkable(
      this.attrs.presets || 'default', this.markdownOptions
    );
  },

  didRender() {
    this._super(...arguments);

    let source;

    if (this.attrs.options && this.attrs.options.html) {
      source = this.element.innerHTML;
    } else {
      source = this.element.textContent;
    }

    this.element.innerHTML = this.remarkable.render(source);
  }
});
