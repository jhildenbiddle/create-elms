/*!
 * create-elms
 * v1.0.6
 * https://github.com/jhildenbiddle/create-elms
 * (c) 2018 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */
function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
    }
}

function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function mergeDeep() {
    var isObject = function isObject(obj) {
        return obj && _typeof(obj) === "object";
    };
    for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
        objects[_key] = arguments[_key];
    }
    return objects.reduce(function(prev, obj) {
        Object.keys(obj).forEach(function(key) {
            var pVal = prev[key];
            var oVal = obj[key];
            if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep(pVal, oVal);
            } else {
                prev[key] = oVal;
            }
        });
        return prev;
    }, {});
}

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
 */ function createElms(elmData) {
    var sharedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var document = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.document;
    var elmArray = [];
    var dataArray = Array.isArray(elmData) ? elmData : [ elmData ];
    function getElms(elms) {
        var elmArray = [];
        if (elms.nodeType) {
            elmArray = [ elms ];
        } else if (typeof elms === "string") {
            elmArray = _toConsumableArray(document.querySelectorAll(elms));
        } else if (Array.isArray(elms)) {
            var _Array$prototype;
            elmArray = elms.map(function(elm) {
                return getElms(elm);
            });
            elmArray = (_Array$prototype = Array.prototype).concat.apply(_Array$prototype, _toConsumableArray(elmArray));
        } else if (elms.length) {
            elmArray = _toConsumableArray(elms);
        }
        return elmArray;
    }
    dataArray.forEach(function(data) {
        var fragment = document.createElement("div");
        var isString = data && typeof data === "string";
        var settings = isString ? sharedOptions : mergeDeep(sharedOptions, data);
        if (isString) {
            fragment.innerHTML = data;
        } else if (settings.tag) {
            var elm = document.createElement(settings.tag);
            fragment.appendChild(elm);
        }
        _toConsumableArray(fragment.children).forEach(function(elm) {
            var isEmpty = !(elm.textContent.length || elm.children.length);
            if (isEmpty) {
                if (settings.html) {
                    elm.innerHTML = settings.html;
                } else if (settings.text) {
                    elm.textContent = settings.text;
                }
            }
            if (settings.attr) {
                Object.keys(settings.attr).forEach(function(key) {
                    elm.setAttribute(key, settings.attr[key]);
                });
            }
            if (settings.appendTo) {
                getElms(settings.appendTo).forEach(function(toElm, i, arr) {
                    var addElm = arr.length > 1 ? elm.cloneNode(true) : elm;
                    elmArray.push(toElm.appendChild(addElm));
                });
            } else if (settings.prependTo) {
                getElms(settings.prependTo).forEach(function(toElm, i, arr) {
                    var addElm = arr.length > 1 ? elm.cloneNode(true) : elm;
                    elmArray.push(toElm.insertBefore(addElm, toElm.firstChild));
                });
            } else if (settings.insertBefore) {
                getElms(settings.insertBefore).forEach(function(beforeNode, i, arr) {
                    var addElm = arr.length > 1 ? elm.cloneNode(true) : elm;
                    elmArray.push(beforeNode.parentNode.insertBefore(addElm, beforeNode));
                });
            } else if (settings.insertAfter) {
                getElms(settings.insertAfter).forEach(function(afterNode, i, arr) {
                    var addElm = arr.length > 1 ? elm.cloneNode(true) : elm;
                    elmArray.push(afterNode.parentNode.insertBefore(addElm, afterNode.nextSibling));
                });
            } else {
                elmArray.push(elm);
            }
        });
    });
    return sharedOptions.returnHtml ? elmArray.map(function(elm) {
        return elm.outerHTML;
    }) : elmArray;
}

export default createElms;
//# sourceMappingURL=create-elms.esm.js.map
