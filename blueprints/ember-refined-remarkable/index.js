module.exports = {
  name: 'ember-refined-remarkable',

  normalizeEntiryName() {},

  afterInstall() {
    return this.addBowerPackagesToProject([
      { name: 'remarkable' },
      { name: 'highlightjs' }
    ]);
  }
};
