import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mark-down', 'Integration | Component | mark down', {
  integration: true
});

test('it renders inline will shows a friendly warning', function(assert) {
  this.render(hbs`{{mark-down}}`);

  assert.equal(this.$(':first-child').find('pre > code').text(),
    `This component only support block rendering, inline rendering will be useless.
这个组件仅支持块级方式渲染，内联方式渲染将毫无作用。\n`,
    'friendly warning has been shown');

  console.log(this.$(':first-child')[0]);
});

test('it renders regular markdown document', function(assert) {
  this.render(hbs`
  {{#mark-down}}
  # h1 Heading
  ## h2 Heading
  ### h3 Heading
  #### h4 Heading
  ##### h5 Heading
  ###### h6 Heading

  **This is bold text**
  __This is bold text__
  *This is italic text*
  _This is italic text_
  ~~Deleted text~~

  ___

  ***

  > Blockquotes can also be nested...
  > > ...by using additional greater-than signs right next to each other...
  > > > ...or with spaces between arrows.

  + Create a list by starting a line with '+', '-', or '*'
  + Sub-lists are made by indenting 2 spaces:
    - Marker character change forces new list start:
      * Ac tristique libero volutpat at
      + Facilisis in pretium nisl aliquet
      - Nulla volutpat aliquam velit
  + Very easy!

  1. Lorem ipsum dolor sit amet
  2. Consectetur adipiscing elit
  3. Integer molestie lorem at massa

  1. You can use sequential numbers...
  1. ...or keep all the numbers as '1.'

  Inline \`code\`

      // Some comments
      line 1 of code
      line 2 of code
      line 3 of code

  \`\`\`
  Sample text here...
  \`\`\`

  \`\`\` js
  var foo = function (bar) {
    return bar++;
  };

  console.log(foo(5));
  \`\`\`

  | Option | Description |
  | ------ | ----------- |
  | data   | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext    | extension to be used for dest files. |

  | Option | Description |
  | ------:| -----------:|
  | data   | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext    | extension to be used for dest files. |

  [link text](http://dev.nodeca.com)
  [link with title](http://nodeca.github.io/pica/demo/ "title text!")

  ![Minion](https://octodex.github.com/images/minion.png)
  ![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")
  ![Alt text][id]

  [id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"
  {{/mark-down}}
  `);

  const $component = this.$(':first-child');

  assert.ok($component.find('h1').length > 0, 'h1 has been processed');
  assert.ok($component.find('h2').length > 0, 'h2 has been processed');
  assert.ok($component.find('h3').length > 0, 'h3 has been processed');
  assert.ok($component.find('h4').length > 0, 'h4 has been processed');
  assert.ok($component.find('h5').length > 0, 'h5 has been processed');
  assert.ok($component.find('h6').length > 0, 'h6 has been processed');

  assert.ok($component.find('p > strong').length == 2, 'strong has been processed');
  assert.ok($component.find('p > em').length == 2, 'em has been processed');
  assert.ok($component.find('p > del').length == 1, 'del has been processed');

  assert.ok($component.find('hr').length == 2, 'horizontal line has been processed');

  assert.ok($component.find('blockquote').length == 3, 'blockquote has been processed');

  assert.ok($component.find('ul').length == 5, 'ul has been processed');
  assert.ok($component.find('ol').length == 1, 'ol has been processed');

  assert.ok($component.find('code').length == 4, 'code has been processed');
  assert.ok($component.find('pre').length == 3, 'code block has been processed');
  assert.ok($component.find('code.language-js').length == 1, 'code highlight has been processed');

  assert.ok($component.find('table').length == 2, 'table has been processed');

  assert.ok($component.find('a[href*=dev]').length == 1, 'link has been processed');
  assert.ok($component.find('a[href*=demo]').attr('title') == 'title text!', 'link w/ title has been processed');

  assert.ok($component.find('img[alt=Minion]').length == 1, 'image has been processed');
  assert.ok($component.find('img[alt=Stormtroopocat]').attr('title') == 'The Stormtroopocat', 'image w/ custom title has been processed');
  assert.ok($component.find('img[alt="Alt text"]').attr('title') == 'The Dojocat', 'image w/ footnote has been processed');
});

test('it renders extended markdown document w/ presets full', function(assert) {
  this.render(hbs`
  {{#mark-down presets="full"}}
  Superscript: 19^th^
  Subscript: H~2~O
  ++Inserted text++
  ==Marked text==

  Footnote 1 link[^first].

  Footnote 2 link[^second].

  Inline footnote^[Text of inline footnote] definition.

  Duplicated footnote reference[^second].

  [^first]: Footnote **can have markup**

      and multiple paragraphs.

  [^second]: Footnote text.

  Term 1

  :   Definition 1
  with lazy continuation.

  Term 2 with *inline markup*

  :   Definition 2

          { some code, part of Definition 2 }

      Third paragraph of definition 2.

  Compact style:

  Term 1
    ~ Definition 1

  Term 2
    ~ Definition 2a
    ~ Definition 2b

  It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

  *[HTML]: Hyper Text Markup Language
  {{/mark-down}}
  `);

  const $component = this.$(':first-child');

  assert.ok($component.find('p:first-of-type > sup').length == 1, 'sup has been processed');
  assert.ok($component.find('p:first-of-type > sub').length == 1, 'sub has been processed');
  assert.ok($component.find('p:first-of-type > ins').length == 1, 'ins has been processed');
  assert.ok($component.find('p:first-of-type > mark').length == 1, 'mark has been processed');

  assert.ok($component.find('sup.footnote-ref').length == 4, 'footnote ref has been processed');
  assert.ok($component.find('hr.footnotes-sep').length == 1, 'footnote seprator has been processed');
  assert.ok($component.find('section.footnotes').length == 1, 'footnotes section has been processed');
  assert.ok($component.find('ol.footnotes-list').length == 1, 'footnotes list has been processed');
  assert.ok($component.find('li.footnote-item').length == 3, 'footnote item has been processed');
  assert.ok($component.find('a.footnote-backref').length == 4, 'footnote backref has been processed');

  assert.ok($component.find('dl').length == 2, 'definition list has been processed');
  assert.ok($component.find('dt').length == 4, 'definition term has been processed');
  assert.ok($component.find('dd').length == 5, 'definition description has been processed');

  assert.ok($component.find('abbr').attr('title') == 'Hyper Text Markup Language', 'abbreviation has been processed');
});

test('it renders inline link w/ option linkify set to true', function(assert) {
  this.render(hbs`
  {{#mark-down presets="full" options=(hash linkify=true)}}
  Autoconverted link https://github.com/nodeca/pica (enable linkify to see)
  {{/mark-down}}
  `);

  const $component = this.$(':first-child');

  assert.ok($component.find('a[href$=pica]').length == 1, 'linkify has been enabled');
});

test('it renders html w/ option html set to true', function(assert) {
  this.render(hbs`
  {{#mark-down presets="full" options=(hash html=true)}}
  <code>console.log("Hello, world!")</code>
  {{/mark-down}}
  `);

  const $component = this.$(':first-child');

  assert.ok($component.find('p > code').length == 1, 'html has been processed');
});

test('it renders highlighted code depends on option highlight', function(assert) {
  this.render(hbs`
  {{#mark-down}}
  \`\`\` js
  var foo = function (bar) {
    return bar++;
  };

  console.log(foo(5));
  \`\`\`
  {{/mark-down}}
  `);

  assert.ok(this.$(':first-child').find('.hljs-keyword').length > 0, 'highlightjs has been enabled');

  this.render(hbs`
  {{#mark-down highlight=false}}
  \`\`\` js
  var foo = function (bar) {
    return bar++;
  };

  console.log(foo(5));
  \`\`\`
  {{/mark-down}}
  `);

  assert.ok(this.$(':first-child').find('.hljs-keyword').length == 0, 'highlightjs has been disabled');
});

test('it renders htmlbars syntax as highlighted code properly', function(assert) {
  this.render(hbs`
  {{#mark-down}}
  \`\`\` htmlbars
  \\{{link-to "Home" "application" class="link-item" tagName="li"}}
  \`\`\`
  {{/mark-down}}
  `);

  assert.equal(this.$('.language-htmlbars').text().trim(),
    '{{link-to "Home" "application" class="link-item" tagName="li"}}',
    'inline helper has been processed');

  this.render(hbs`
  {{#mark-down}}
  \`\`\` htmlbars
  \\{{#link-to "application" class="link-item" tagName="li"}}
  Home
  \\{{/link-to}}
  \`\`\`
  {{/mark-down}}
  `);

  assert.equal(this.$('.language-htmlbars').text().trim(),
`{{#link-to \"application\" class=\"link-item\" tagName=\"li\"}}
Home
{{/link-to}}`, 'block helper has been processed')

  this.render(hbs`
  {{#mark-down}}
  \`\`\` htmlbars
  \\{{!-- comment --}}
  \`\`\`
  {{/mark-down}}
  `);

  assert.equal(this.$('.language-htmlbars').text().trim(),
    '{{!-- comment --}}', 'comment helper has been processed')

  this.render(hbs`
  {{#mark-down}}
  \`\`\` htmlbars
  &lt;button type=&quot;button&quot; class=\\{{name}}&gt;Button&lt;/button&gt;
  \`\`\`
  {{/mark-down}}
  `);

  assert.equal(this.$('.language-htmlbars').text().trim(),
    '<button type="button" class={{name}}>Button</button>',
    'html tag with curly brace has been processed');
});

test('it renders markdown which passed in as a property', function(assert) {
  this.set('model', {
    content: `
  # h1 Heading

  Some text with **BOLD** and _italic_, also \`inline code\`.

  > Blockquote

  - Unordered list

  1. Ordered list

  \`\`\` htmlbars
  \{{#link-to "index"}}
  <button type="button" class=\\{{name}}>Button</button>
  \{{/link-to}}
  \`\`\`
    `
  });

  this.render(hbs`
  {{#mark-down}}
  {{model.content}}
  {{/mark-down}}
  `)

  const $component = this.$(':first-child');
  assert.ok($component.find('h1').length == 1, 'check for h1 tag');
  assert.ok($component.find('p').length == 2, 'check for p tag');
  assert.ok($component.find('blockquote').length == 1, 'check for blockquote tag');
  assert.ok($component.find('strong').length == 1, 'check for strong tag');
  assert.ok($component.find('em').length == 1, 'check for em tag');
  assert.ok($component.find('p > code').length == 1, 'check for inline code tag');
  assert.ok($component.find('ul').length == 1, 'check for ul tag');
  assert.ok($component.find('ol').length == 1, 'check for ol tag');
  assert.ok($component.find('li').length == 2, 'check for li tag');
  assert.ok($component.find('pre > code').length == 1, 'check for block code tag');
});
