# Ember-refined-remarkable [![Build Status](https://travis-ci.org/very-geek/ember-refined-remarkable.svg?branch=master)](https://travis-ci.org/very-geek/ember-refined-remarkable)

## IMPORTANT!!! Why another (refined) xxx ember addon?

Before you decide to use this ember addon, pay attention that you can find another similar addon which provide (almost) same functionalities compares to this one.

So the question is: why reinvent another wheel?

I have plenty of reasons, but most important one is the way passing parameters through wrapper component to third party libraries. See, most ember addons choose to explicitly passing every parameter as an individual attribute. In this way, component itself has to set every parameter’s default value, even most third party libraries don’t require that (they have internal default value and allows you to pass an object of custom parameters to merge with defaults).

Since Ember.js 2.3, we have an very useful helper [`hash`](http://emberjs.com/api/classes/Ember.Templates.helpers.html#method_hash). Although it’s main purpose is to provide contextual yield object, we could also use it to passing multiple parameters as a single object when using regular component(s).

Thus, instead of:

```htmlbars
{{some-component option-foo="foo" option-bar="bar" options-baz="baz" ...}}
```

it is much nicer to:

```htmlbars
{{some-component options=(hash foo="foo" bar="bar" baz="baz")}}
```

The only problem is the lower versions (`<= v2.3.0`) don’t have built-in `hash` helper support, so this style of passing parameters doesn’t work at all. If you like this style as I did, you can install [ember-hash-helper-polyfill](https://github.com/cibernox/ember-hash-helper-polyfill) to support it, otherwise don’t use this addon, you can find the similar one at [Ember Observer](https://emberobserver.com/) or [Ember Addons](https://www.emberaddons.com/).

OK, I GOT IT! How to use this addon?

## Installation

Simple, just type this command in your ember project:

```shell
$ ember install ember-refined-remarkable
```

## Usages

### Components

####  `mark-down`

```htmlbars
{{#mark-down presets="default" highlight=false options=(hash
  ...
  )}}

{{!-- markdown text...--}}

{{/mark-down}}
```

**⚠️ CAUTION: This component only support block mode usage, if you use it inline will rendering a (sort of) friendly warning**.

This is the major difference compares to another similar addon [ember-remarkable](https://github.com/johnotander/ember-remarkable). _ember-remarkabler_ forces you to passing markdown text by a dedicated attribute, this is so inconvenient! In contrast, this addon allows you put markdown text in block mode, no matter written by hand or rendering as a property (e.g: through an ember model object).
