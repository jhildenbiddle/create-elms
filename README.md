# create-elms <!-- omit in toc -->

[![NPM](https://img.shields.io/npm/v/create-elms.svg?style=flat-square)](https://www.npmjs.com/package/create-elms)
[![GitHub Workflow Status (master)](https://img.shields.io/github/actions/workflow/status/jhildenbiddle/create-elms/test.yml?branch=master&label=checks&style=flat-square)](https://github.com/jhildenbiddle/create-elms/actions?query=branch%3Amaster+)
[![Codacy code quality](https://img.shields.io/codacy/grade/22ce05a1fe9b406e8426ea0ef61c30b9/master?style=flat-square)](https://app.codacy.com/gh/jhildenbiddle/create-elms/dashboard?branch=master)
[![Codacy branch coverage](https://img.shields.io/codacy/coverage/22ce05a1fe9b406e8426ea0ef61c30b9/master?style=flat-square)](https://app.codacy.com/gh/jhildenbiddle/create-elms/dashboard?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/jhildenbiddle/create-elms/blob/master/LICENSE)
[![Sponsor this project](https://img.shields.io/static/v1?style=flat-square&label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/jhildenbiddle)

Create HTML elements, set attributes, add to other elements, and return an array of DOM nodes or HTML markup in a single function call.

## Features

- Quickly create HTML elements using markup or JavaScript objects
- Set attributes on individual or groups of elements
- Append, prepend, and insert elements before or after other elements
- Return an array of elements or HTML markup
- UMD and ES6 module available
- Compatible with modern and legacy browsers (IE9+)
- Compatible with Node environments using [jsdom](https://github.com/tmpvar/jsdom)
- Lightweight (~1k min+gzip) and dependency-free

## Installation

NPM:

```bash
npm install create-elms
```

```javascript
// file.js
import createElms from 'create-elms';
const elms = createElms(/* ... */);
```

Git:

```bash
git clone https://github.com/jhildenbiddle/create-elms.git
```

CDN ([jsdelivr.com](https://www.jsdelivr.com/) shown, also on [unpkg.com](https://unpkg.com/)):

```html
<!-- ES5 (latest v1.x.x) -->
<script src="https://cdn.jsdelivr.net/npm/create-elms@1"></script>
<script>
  var elms = createElms(/* ... */);
</script>
```

```html
<!-- ES6 module (latest v1.x.x) -->
<script type="module">
  import getCssData from 'https://cdn.jsdelivr.net/npm/create-elms@1/dist/create-elms.esm.min.js';
  const elms = createElms(/* ... */);
</script>
```

## Examples

Render elements using strings and/or objects:

```javascript
let elm, elms;

// Create an element from a string
elm = createElms('<p>Foo</p>'); // => [elm]

// ... or an object
elm = createElms({
  tag : 'p',
  text: 'Foo'
}); // => [elm]

// ... or multiple elements from a string
elms = createElms('<p>Foo</p><p>Bar</p><p>Baz</p>'); // => [elm, elm, elm]

// ... or an array of strings
elms = createElms([
  '<p>Foo</p>',
  '<p>Bar</p>',
  '<p>Baz</p>'
]); // => [elm, elm, elm]

// ... or an array of objects
elms = createElms([
  { tag: 'p', text: 'Foo' },
  { tag: 'p', text: 'Bar' },
  { tag: 'p', text: 'Baz' }
]); // => [elm, elm, elm]

// ... or an array containing strings and objects
elms = createElms([
  '<p>Foo</p>',
  '<p>Bar</p>',
  { tag: 'p', text: 'Baz' }
]); // => [elm, elm, elm]
```

Set per-element attributes or shared attributes:

```javascript
let elm, elms;

// Set attributes on specific elements...
elm = createElms({
  tag : 'p',
  text: 'Foo',
  attr: { id: 'foo', class: 'myclass' }
});

// ... or use the 'sharedOptions' argument for multiple elementData objects
elms = createElms(
  // elementData
  [
    { text: 'Foo', attr: { id: 'foo' } },
    { text: 'Bar', attr: { id: 'bar' } },
    { text: 'Baz', attr: { id: 'baz' } }
  ],
  // sharedOptions
  {
    tag : 'p',
    attr: { class: 'myclass' }
  }
);

// ... or to apply options to one-or-more elementData strings
elms = createElms(
  // elementData
  [
    '<p id="foo">Foo</p>',
    '<p id="bar">Bar</p>',
    '<p id="baz">Baz</p>'
  ],
  // sharedOptions
  {
    class: 'myclass'
  }
);
```

Append, prepend, or insert elements:

```javascript
let elm, elms;

// Use CSS selectors, HTMLElement(s) or Node(s)
elm = createElms({ tag: 'p', appendTo: 'body' });
elm = createElms({ tag: 'p', appendTo: document.body });
elm = createElms({ tag: 'p', appendTo: document.querySelector('body') });
elm = createElms({ tag: 'p', appendTo: document.querySelectorAll('div') });

// ... or an array of CSS selectors, HTMLElements, and/or Nodes
elm = createElms({
  tag     : 'p',
  appendTo: [
    'body',
    document.querySelectorAll('div')
  ]
});

// Specify multiple append/prepend/insert points per element
elms = createElms({
  tag         : 'p',
  appendTo    : 'body',
  prependTo   : document.body,
  insertBefore: document.querySelectorAll('div'),
  insertAfter : document.getElementsByTagName('h1')
});

// ... or use the 'shadedOptions' argument for multiple elements
elms = createElms(
  // elementData
  [
    '<p>Text1</p>',
    '<p>Text2</p>'
  ],
  // shadedOptions
  {
    appendTo    : 'body',
    prependTo   : document.body,
    insertBefore: document.querySelectorAll('div'),
    insertAfter : document.getElementsByTagName('h1')
  }
);
```

Have elements returned as HTMLElements or HTML markup:

```javascript
// Return as HTML elements (default)
let elm = createElms({ tag: 'p' });
// => [elm]

// Return as HTML markup
let html = createElms({ tag: 'p' }, { returnHtml: true });
// => '<p></p>'
```

## Usage

```javascript
createElements(elementData, sharedOptions = {}, documentObject = window.document)
```

- Returns: `Array`
  - An array of of elements (default)
  - An array of HTML markup (when [returnHtml](#sharedoptions) option is `true`).

### elementData <!-- omit in toc -->

- Type: `Object`, `String`, or `Array`
  - `String` should be valid HTML markup
  - `Object` should be an HTMLElement or Node
  - `Array` should contain HTML markup, HTMLElements, and/or Nodes

**Strings**

- Strings may contain multiple elements
- Each top-level element in a string will be returned in the return `Array`
- Use sharedOptions to apply properties to `String` elementData
- If sharedOptions are used, options will be applied to all top-level elements in the string

**Objects**

- The `html` value will be inserted as HTML content
- The `text` value will be inserted as text content. This value is ignored if `html` is defined.
- The `attr` value should contain attribute name/value pairs
- The `appendTo`, `prependTo`, `insertBefore` and `insertAfter` properties accept a CSS selector, HTMLElement, HTMLCollection, Node, NodeList, or an `Array` of these `Object` types.

| Property     | Type           | Description                             |
| ------------ | -------------- | --------------------------------------- |
| tag          | string         | Element HTML tag                        |
| attr         | object         | Element attributes                      |
| html         | string         | Content to append to element(s) as HTML |
| text         | string         | Content to append to element(s) as text |
| appendTo     | object\|string | Node(s) to append element(s) to         |
| prependTo    | object\|string | Node(s) to prepend element(s) to        |
| insertBefore | object\|string | Node(s) to insert element(s) before     |
| insertAfter  | object\|string | Node(s) to insert element(s) after      |

**Examples**

```javascript
// String
let elm1 = createElement('<p id="foo" class="myclass"><a href="/">Home</a>');
// => [elm] (top-level <p> is returned, not nested <a>)

// String with multiple elements
let elms1 = createElement('<p>Text1</p><p>Text2</p><p>Text3</p>');
// => [elm, elm, elm] (all top-level elements returned)

// Object
let elm2 = createElement({
  tag : 'p',
  html: '<a href="/">Home</a>',
  attr: { id: 'foo', class: 'myclass' }
});
// => [elm]

// Array of strings and/or objects
let elms = createElement([
  '<p>Text</p>',
  { tag: 'p', text: 'Text' }
]);
// => [elm, elm]
```

### sharedOptions <!-- omit in toc -->

- Type: `Object`
- Default: `{}`

Options are applied to all [elementData](#elementData) with the following rules:

- When applied to an elementData `Object`, all options are valid.
- When applied to an elementData `String`, the `tag` property is ignored.
- Existing tags, attributes, HTML and text content will not be replaced by shared options.

**Object properties**

All properties from [elementData](#elementData) plus the following:

| Property   | Type    | Default | Description                              |
| ---------- | ------- | ------- | ---------------------------------------- |
| returnHtml | Boolean | `false` | Return elements as array of HTML markup when `true`. |

**Example**

```javascript
// Return as HTML markup
let html = createElms(
  // elementData
  { tag: 'p', text: 'Text' },
  // sharedOptions
  { returnHtml: true }
);
// => '<p>Text</p>'
```

### documentObject <!-- omit in toc -->

- Type: `Object`
- Default: `window.document`

This is the document object on which `document.createElement` and `document.querySelectorAll` methods will be called. The default value assumes a browser environment, but passing a reference to a document object created by tools like [jsdom](https://github.com/tmpvar/jsdom) allows creating HTML elements and markup in a Node environment (without polluting global variables).

**Example**

```javascript
const createElms = require('create-elms');
const jsdom      = require('jsdom');
const dom        = new JSDOM();
const jsDocument = dom.window.document;

let elm = createElms({ tag: 'p', {}, dom.window.document)
// => [elm]

let html = createElms({ tag: 'p', { returnHtml: true }, dom.window.document)
// => '<p></p>'
```

## Sponsorship

A [sponsorship](https://github.com/sponsors/jhildenbiddle) is more than just a way to show appreciation for the open-source authors and projects we rely on; it can be the spark that ignites the next big idea, the inspiration to create something new, and the motivation to share so that others may benefit.

If you benefit from this project, please consider lending your support and encouraging future efforts by [becoming a sponsor](https://github.com/sponsors/jhildenbiddle).

Thank you! 🙏🏻

## Contact & Support

- Follow 👨🏻‍💻 **@jhildenbiddle** on [Twitter](https://twitter.com/jhildenbiddle) and [GitHub](https://github.com/jhildenbiddle) for announcements
- Create a 💬 [GitHub issue](https://github.com/jhildenbiddle/create-elms/issues) for bug reports, feature requests, or questions
- Add a ⭐️ [star on GitHub](https://github.com/jhildenbiddle/create-elms) and 🐦 [tweet](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fcreate-elms&hashtags=css,developers,frontend,javascript) to promote the project
- Become a 💖 [sponsor](https://github.com/sponsors/jhildenbiddle) to support the project and future efforts

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/jhildenbiddle/create-elms/blob/master/LICENSE) for details.

Copyright (c) John Hildenbiddle ([@jhildenbiddle](https://twitter.com/jhildenbiddle))
