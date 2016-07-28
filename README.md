# Ember-refined-remarkable [![Build Status](https://travis-ci.org/very-geek/ember-refined-remarkable.svg?branch=master)](https://travis-ci.org/very-geek/ember-refined-remarkable) [![Ember Observer Score](https://emberobserver.com/badges/ember-refined-remarkable.svg)](https://emberobserver.com/addons/ember-refined-remarkable)

An ember addon to wrap the famous markdown parsing library [remarkable](https://github.com/jonschlinkert/remarkable) and provides a simple component to render any markdown text in your ember application(s). It also integrate with [highlight.js](https://highlightjs.org/) to support code syntax highlighting.

## IMPORTANT!!! Why another (refined) xxx ember addon?

Before you decide to use this ember addon, pay attention that you can find another similar addon which provide (almost) same functionalities compares to this one.

So the question is: why reinvent another wheel?

I have plenty of reasons, but most important one is the way passing parameters through wrapper component to third party libraries. See, most ember addons choose to explicitly passing every parameter as an individual attribute. In this way, component itself has to set every parameter’s default value, even most third party libraries don’t require that (they have internal default value and allows you to pass an object of custom parameters to merge with defaults).

Since Ember.js 2.3, we have a very useful helper [`hash`](http://emberjs.com/api/classes/Ember.Templates.helpers.html#method_hash). Although it’s main purpose is to provide contextual yield object, we could also use it to passing multiple parameters as a single object when using regular component(s).

Thus, instead of:

```htmlbars
{{some-component option-foo="foo" option-bar="bar" options-baz="baz" ...}}
```

it is much nicer to:

```htmlbars
{{some-component options=(hash foo="foo" bar="bar" baz="baz") ...}}
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
{{#mark-down presets="default" highlight=false
  options=(hash
  ...
  )}}

{{!-- markdown text here... (without extra indentation, see caveats at the bottom) --}}

{{/mark-down}}
```

> **⚠️ CAUTION: This component only support block mode usage, iuse it inline will rendering a (sort of) friendly warning.**
>
> > This is the major difference compares to another similar addon [ember-remarkable](https://github.com/johnotander/ember-remarkable). _ember-remarkable_ forces you to passing markdown text by a dedicated attribute, this is so inconvenient! In contrast, this addon allows you put markdown text in block mode, no matter written by hand or rendering as a property (e.g: through an ember model object).

#### Attributes

##### `presets` (optional, default value: `"default"`)

Remarkable provides three presets to contain different feature set: `"default"`, `"full"`, `"commonmarks"`. You can also toggle each feature explicitly by using `options`, see its [documentation](https://github.com/jonschlinkert/remarkable#presets) to understand the details.

##### `highlight` (optional, default value: `true`)

This is not a Remarkable parameter. This addon uses highlight.js to highlight the code block syntax, if you don’t need syntax highlighting, you can turn it off by passing `false` to this attribute.

By default, this addon import the highlight.js scripts in vendor tree even if you set `highlight` to `false`. This is because I personally think that code syntax highlighting is almost the “standard” feature for a modern markdown parser. `highlight` option is only for toggle syntax highlighting on/off per component usage.

This addon doesn’t provide a way to exclude highlight.js scripts from the vendor tree (though it is possible) currently, if you really need this, just tell me by file an issue.

Talking about code syntax highlighting, highlight.js has provide many themes to make it look pretty. In order to choose the one you like, just put a configuration in `ember-cli-buld.js` file:

```javascript
module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    'ember-refined-remarkable': {
      theme: 'default'  // change this to your favorite theme’s name
    }
  });

  return app.toTree();
};
```

How do I know the name of all themes? Here you go: https://github.com/isagalaev/highlight.js/tree/master/src/styles

##### `options` (optional)

You can find all the options and default value in [Remarkable’s documentation](https://github.com/jonschlinkert/remarkable#options). Pass whatever you like to change by using the `hash` helper, for example:

```htmlbars
{{#mark-down presets="full" options=(hash
  html=true
  linkify=true
  typographer=true
  langPrefix="lang"
  )}}

{{!-- markdown text here... --}}

{{/mark-down}}
```

### Caveats

#### 1. Don’t put extra indentations in markdown text

Many users like indentations in block of HTMLBars helpers, such as:

```htmlbars
{{#my-component}}
˽˽<div>...</div>
{{/my-component}}
```

This is not a problem when using markup languages like HTML or HTMLBars, but this addon will parse whatever contents you put in the block as markdown text, and markdown format is _indentation sensitive_, so extra indentations will be a problem when using this addon (actually two spaces will be fine generally, but four spaces or a tab will definitely causing troubles).

Please don’t use indentations in markdown text except for reasonable needs (for example, indented code blocks).

In addition, passing markdown text as a property will not be affected (hopefully! Issue my if it does).

#### 2. Avoid to parse HTMLBars in markdown code blocks

The downside of putting markdown text inside the component block is HTMLBars will try to parse valid syntax before Remarkable get involved. This could be a problem as well when your try to write code examples, the way to avoid HTMLBars parsing is to escape the double curly braces:

```htmlbars
{{#mark-down presets="full"}}

{{!-- 1. to escape inline helpers --}}
\{{link-to "Home" "index"}}

{{!-- 2. to escape block helpers --}}
\{{#link-to "index"}}
  Home
\{{/link-to}}

{{!-- 3. to escape HTML and inline helpers --}}
&lt;button type="button" onclick=\{{action "submit"}}&gt;Submit&lt;/button&gt;
{{/mark-down}}
```

> 🗒 **Note:** Proper HTML entities escaping is only required when you write markdown directly inside the component, if your markdown contents are referenced by properties, then you should keep HTML as it’s original form.

You can see more example of usages in this repo’s [tests](tests/integration/components/mark-down-test.js).
