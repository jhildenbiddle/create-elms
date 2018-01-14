/*!
 * create-elms
 * v1.0.3
 * https://github.com/jhildenbiddle/create-elms
 * (c) 2018 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, toConsumableArray = function(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
};

function mergeDeep() {
    for (var e = function(e) {
        return e && "object" === (void 0 === e ? "undefined" : _typeof(e));
    }, t = arguments.length, r = Array(t), n = 0; n < t; n++) r[n] = arguments[n];
    return r.reduce(function(t, r) {
        return Object.keys(r).forEach(function(n) {
            var o = t[n], a = r[n];
            e(o) && e(a) ? t[n] = mergeDeep(o, a) : t[n] = a;
        }), t;
    }, {});
}

function createElms(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window.document, n = [];
    function o(e) {
        var t = [];
        if (e.nodeType) t = [ e ]; else if ("string" == typeof e) t = [].concat(toConsumableArray(r.querySelectorAll(e))); else if (Array.isArray(e)) {
            var n;
            t = e.map(function(e) {
                return o(e);
            }), t = (n = Array.prototype).concat.apply(n, toConsumableArray(t));
        } else e.length && (t = [].concat(toConsumableArray(e)));
        return t;
    }
    return (Array.isArray(e) ? e : [ e ]).forEach(function(e) {
        var a = r.createElement("div"), f = e && "string" == typeof e, i = f ? t : mergeDeep(t, e);
        if (f) a.innerHTML = e; else if (i.tag) {
            var c = r.createElement(i.tag);
            a.appendChild(c);
        }
        [].concat(toConsumableArray(a.children)).forEach(function(e) {
            !(e.textContent.length || e.children.length) && (i.html ? e.innerHTML = i.html : i.text && (e.textContent = i.text)), 
            i.attr && Object.keys(i.attr).forEach(function(t) {
                e.setAttribute(t, i.attr[t]);
            }), i.appendTo ? o(i.appendTo).forEach(function(t, r, o) {
                var a = o.length > 1 ? e.cloneNode(!0) : e;
                n.push(t.appendChild(a));
            }) : i.prependTo ? o(i.prependTo).forEach(function(t, r, o) {
                var a = o.length > 1 ? e.cloneNode(!0) : e;
                n.push(t.insertBefore(a, t.firstChild));
            }) : i.insertBefore ? o(i.insertBefore).forEach(function(t, r, o) {
                var a = o.length > 1 ? e.cloneNode(!0) : e;
                n.push(t.parentNode.insertBefore(a, t));
            }) : i.insertAfter ? o(i.insertAfter).forEach(function(t, r, o) {
                var a = o.length > 1 ? e.cloneNode(!0) : e;
                n.push(t.parentNode.insertBefore(a, t.nextSibling));
            }) : n.push(e);
        });
    }), t.returnHtml ? n.map(function(e) {
        return e.outerHTML;
    }) : n;
}

export default createElms;
//# sourceMappingURL=create-elms.esm.js.map
