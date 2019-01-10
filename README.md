# create-elms

[![NPM](https://img.shields.io/npm/v/create-elms.svg?style=flat-square)](https://www.npmjs.com/package/create-elms)
[![Build Status](https://img.shields.io/travis/jhildenbiddle/create-elms/master.svg?style=flat-square)](https://travis-ci.org/jhildenbiddle/create-elms)
[![Codacy grade](https://img.shields.io/codacy/grade/85a81097fa574bc3b011e30d76ed02ab.svg?style=flat-square)](https://www.codacy.com/app/jhildenbiddle/create-elms?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jhildenbiddle/create-elms&amp;utm_campaign=Badge_Grade)
[![Codecov](https://img.shields.io/codecov/c/github/jhildenbiddle/create-elms.svg?style=flat-square)](https://codecov.io/gh/jhildenbiddle/create-elms)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/jhildenbiddle/create-elms/blob/master/LICENSE)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=A%20micro-library%20for%20efficiently%20creating%20HTML%20elements%2C%20settings%20attributes%2C%20adding%20to%20other%20elements%2C%20and%20returning%20an%20array%20of%20elements%20or%20HTML%20markup&url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fcreate-elms&hashtags=css,developers,frontend,javascript)

A micro-library for efficiently creating HTML elements, settings attributes, adding to other elements, and returning an array of elements or HTML markup.

## Features

- Create elements using strings or objects
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

### elementData

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

### sharedOptions

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

### documentObject

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

## Contact

- Create a [Github issue](https://github.com/jhildenbiddle/create-elms/issues) for bug reports, feature requests, or questions
- Follow [@jhildenbiddle](https://twitter.com/jhildenbiddle) for announcements
- Add a [star on GitHub](https://github.com/jhildenbiddle/create-elms) or [tweet](https://twitter.com/intent/tweet?text=A%20micro-library%20for%20efficiently%20creating%20HTML%20elements%2C%20settings%20attributes%2C%20adding%20to%20other%20elements%2C%20and%20returning%20an%20array%20of%20elements%20or%20HTML%20markup&url=https%3A%2F%2Fgithub.com%2Fjhildenbiddle%2Fcreate-elms&hashtags=css,developers,frontend,javascript) to support the project!

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/jhildenbiddle/create-elms/blob/master/LICENSE) for details.

Copyright (c) John Hildenbiddle ([@jhildenbiddle](https://twitter.com/jhildenbiddle))
