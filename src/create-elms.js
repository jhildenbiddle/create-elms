// Dependencies
// =============================================================================
import mergeDeep from './merge-deep';


// Functions
// =============================================================================
/**
 * Creates new elements and optionally adds them to the DOM.
 *
 * @preserve
 * @param {string|createElmsOptions} elmData - Data used to render and/or return
 * array of elements. Accepts a string, object, and an array of strings or
 * objects.
 * @param {createElmsOptions} [sharedOptions={}] - Shared options object. The
 * 'attr', 'html' and 'text' options will be shared with all elmData objects and
 * strings but will not override existing attributes or html/text content. Note
 * that for elmData strings the 'tag' option is ignored and all other shared
 * options will be applied to top-level elements only (not nested elements).
 * @example
 *
 *   // Single element as HTML string
 *   createElms('<p class="myclass">Text</p>');
 *
 *   // Single element as object
 *   createElms({
 *     tag : 'p',
 *     attr: { class: 'myclass' },
 *     text: 'Text'
 *   });
 *
 * @example
 *
 *   // Multiple elements as HTML string
 *   createElms(`
 *     <p class="myclass">Text1</p>
 *     <p class="myclass"><a href="page.html">Link</a></p>
 *   `);
 *
 *   // Multiple elements as array of HTML string
 *   createElms([
 *     '<p class="myclass">Text</p>',
 *     '<p class="myclass"><a href="page.html">Link</a></p>'
 *   ]);
 *
 *   // Multiple elements as array of objects
 *   createElms([
 *     {
 *       tag : 'p',
 *       attr: { class: 'myclass' },
 *       text: 'Text'
 *     },
 *     {
 *       tag : 'p',
 *       attr: { class: 'myclass' },
 *       html: '<a href="page.html">Link</a>'
 *     }
 *   ]);
 *
 * @example
 *
 *   // Multiple elements as array of objects with shared options
 *   createElms([
 *     { text: 'Text' }
 *     { html: '<a href="page.html">Link</a>' }
 *   ], {
 *     tag     : 'p',
 *     attr    : { class: 'myclass' },
 *     appendTo: 'body'
 *   });
 */
/**
 * @typedef createElmsOptions
 * @type {object}
 * @property {string} [options.tag] - The HTML tag
 * @property {string} [options.html] - Content to append to tag as HTML
 * @property {string} [options.text] - Content to append to tag as text
 * @property {object} [options.attr] - Tag attributes (key/value pairs)
 * @property {object|string} [options.appendTo] - The node(s) to append element(s) to
 * @property {object|string} [options.prependTo] - The node(s) to prepend element(s) to
 * @property {object|string} [options.insertBefore] - The node(s) to insert element(s) before
 * @property {object|string} [options.insertAfter] - The node(s) to insert element(s) after
 */
function createElms(elmData, sharedOptions = {}, document = window.document) {
    const elmArray  = [];
    const dataArray = Array.isArray(elmData) ? elmData : [elmData];

    // Returns a flattened array of element(s) when passed a string, Element,
    // HTMLCollection, NodeList, or Array of aforementioned types.
    function getElms(elms) {
        let elmArray = [];

        // Element
        if (elms.nodeType) {
            elmArray = [elms];
        }
        // CSS selector
        else if (typeof elms === 'string') {
            elmArray = [...document.querySelectorAll(elms)];
        }
        // Array
        else if (Array.isArray(elms)) {
            // Convert CSS selectors, HTMLCollections, and NodeLists to arrays
            elmArray = elms.map(elm => getElms(elm));

            // Flatten arrays
            elmArray = Array.prototype.concat(...elmArray);
        }
        // HTMLCollection or NodeList
        else if (elms.length) {
            elmArray = [...elms];
        }

        return elmArray;
    }

    dataArray.forEach(data => {
        const fragment = document.createElement('div');
        const isString = data && typeof data === 'string';
        const settings = isString ? sharedOptions : mergeDeep(sharedOptions, data);

        // String
        if (isString) {
            fragment.innerHTML = data;
        }
        // Object with tag defined
        else if (settings.tag) {
            const elm = document.createElement(settings.tag);
            fragment.appendChild(elm);
        }

        // A loop is required to handle data strings with multiple elements
        [...fragment.children].forEach(elm => {
            const isEmpty = !(elm.textContent.length || elm.children.length);

            // HTML / Text
            if (isEmpty) {
                if (settings.html) {
                    elm.innerHTML = settings.html;
                }
                else if (settings.text) {
                    elm.textContent = settings.text;
                }
            }

            // Attributes
            if (settings.attr) {
                Object.keys(settings.attr).forEach(key => {
                    elm.setAttribute(key, settings.attr[key]);
                });
            }

            // Add to element
            if (settings.appendTo) {
                getElms(settings.appendTo).forEach((toElm, i, arr) => {
                    const addElm = arr.length > 1 ? elm.cloneNode(true) : elm;
                    elmArray.push(toElm.appendChild(addElm));
                });
            }
            else if (settings.prependTo) {
                getElms(settings.prependTo).forEach((toElm, i, arr) => {
                    const addElm = arr.length > 1 ? elm.cloneNode(true) : elm;
                    elmArray.push(toElm.insertBefore(addElm, toElm.firstChild));
                });
            }
            else if (settings.insertBefore) {
                getElms(settings.insertBefore).forEach((beforeNode, i, arr) => {
                    const addElm = arr.length > 1 ? elm.cloneNode(true) : elm;
                    elmArray.push(beforeNode.parentNode.insertBefore(addElm, beforeNode));
                });
            }
            else if (settings.insertAfter) {
                getElms(settings.insertAfter).forEach((afterNode, i, arr) => {
                    const addElm = arr.length > 1 ? elm.cloneNode(true) : elm;
                    elmArray.push(afterNode.parentNode.insertBefore(addElm, afterNode.nextSibling));
                });
            }
            else {
                elmArray.push(elm);
            }
        });
    });

    return sharedOptions.returnHtml ? elmArray.map(elm => elm.outerHTML) : elmArray;
}


// Export
// =============================================================================
export default createElms;
