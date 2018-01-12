// Dependencies
// =============================================================================
import mergeDeep from './merge-deep';


// Functions
// =============================================================================
/**
 * Creates new elements and optionally adds them to the DOM.
 *
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
 * @property {object} [options.attr] - Tag attributes (key/value pairs)
 * @property {string} [options.text] - Content to append to tag as text
 * @property {string} [options.html] - Content to append to tag as HTML
 * @property {object|string} [options.appendTo] - The parent node to append element to
 * @property {object|string} [options.prependTo] - The parent node to append element to
 * @property {object|string} [options.insertBefore] - The parent node to append element to
 * @property {object|string} [options.insertAfter] - The parent node to append element to
 */
function createElms(elmData, sharedOptions = {}) {
    const elmArray  = [];
    const dataArray = Array.isArray(elmData) ? elmData : [elmData];

    // Returns an array of elements when passed a string, NodeList,
    // HTMLCollection, or individual element.
    function getElms(selectorElmsOrNodes) {
        const elms = Array.isArray(selectorElmsOrNodes) ? selectorElmsOrNodes : typeof selectorElmsOrNodes === 'string' ? [...document.querySelectorAll(selectorElmsOrNodes)] : selectorElmsOrNodes.length ? [...selectorElmsOrNodes] : [selectorElmsOrNodes];

        return [...elms].filter(elm => elm);
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
                    elmArray.push(toElm.prepend(addElm));
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

    return elmArray;
}


// Export
// =============================================================================
export default createElms;
