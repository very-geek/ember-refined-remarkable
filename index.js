'use strict';

module.exports = {
  name: 'ember-refined-remarkable',

  included(app) {
    this._super.included.apply(this, ...arguments);

    this.app.import(app.bowerDirectory + '/remarkable/dist/remarkable.js');
    this.app.import('vendor/shims/remarkable.js');

    this.app.import(app.bowerDirectory + '/highlightjs/highlight.pack.js');
    this.app.import('vendor/shims/highlight.js');

    const addonOptions = app.options[this.name];

    if (addonOptions && addonOptions.theme) {
      this.app.import(app.bowerDirectory
        + '/highlightjs/styles/' + addonOptions.theme + '.css');
    }
  }
};
