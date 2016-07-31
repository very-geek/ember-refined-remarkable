'use strict';

module.exports = {
  name: 'ember-refined-remarkable',

  included(app, parentAddon) {
    const target = parentAddon || app;
    this._super.included.call(this, target);

    const bowerDir = target.bowerDirectory;

    target.import(bowerDir + '/remarkable/dist/remarkable.js');
    target.import('vendor/shims/remarkable.js');

    target.import(bowerDir + '/highlightjs/highlight.pack.js');
    target.import('vendor/shims/highlight.js');

    const options = target.options[this.name];

    if (options && options.theme) {
      target.import(bowerDir + '/highlightjs/styles/' + options.theme + '.css');
    }
  }
};
