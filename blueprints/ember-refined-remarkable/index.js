module.exports = {
  name: 'ember-refined-remarkable',
  description: 'install remarkable and highlightjs through bower',

  normalizeEntityName() {},

  afterInstall() {
    return this.addBowerPackagesToProject([
      { name: 'remarkable' },
      { name: 'highlightjs' }
    ]);
  }
};
