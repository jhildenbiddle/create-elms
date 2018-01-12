/*!
 * create-elms
 * v1.0.0
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
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = [];
    function n(e) {
        var t = Array.isArray(e) ? e : "string" == typeof e ? [].concat(toConsumableArray(document.querySelectorAll(e))) : e.length ? [].concat(toConsumableArray(e)) : [ e ];
        return [].concat(toConsumableArray(t)).filter(function(e) {
            return e;
        });
    }
    return (Array.isArray(e) ? e : [ e ]).forEach(function(e) {
        var o = document.createElement("div"), a = e && "string" == typeof e, c = a ? t : mergeDeep(t, e);
        if (a) o.innerHTML = e; else if (c.tag) {
            var f = document.createElement(c.tag);
            o.appendChild(f);
        }
        [].concat(toConsumableArray(o.children)).forEach(function(e) {
            !(e.textContent.length || e.children.length) && (c.html ? e.innerHTML = c.html : c.text && (e.textContent = c.text)), 
            c.attr && Object.keys(c.attr).forEach(function(t) {
                e.setAttribute(t, c.attr[t]);
            }), c.appendTo ? n(c.appendTo).forEach(function(t, n, o) {
                var a = o.length > 1 ? e.cloneNode(!0) : e;
                r.push(t.appendChild(a));
            }) : c.prependTo ? n(c.prependTo).forEach(function(t, n, o) {
                var a = o.length > 1 ? e.cloneNode(!0) : e;
                r.push(t.prepend(a));
            }) : c.insertBefore ? n(c.insertBefore).forEach(function(t, n, o) {
                var a = o.length > 1 ? e.cloneNode(!0) : e;
                r.push(t.parentNode.insertBefore(a, t));
            }) : c.insertAfter ? n(c.insertAfter).forEach(function(t, n, o) {
                var a = o.length > 1 ? e.cloneNode(!0) : e;
                r.push(t.parentNode.insertBefore(a, t.nextSibling));
            }) : r.push(e);
        });
    }), r;
}

export default createElms;
//# sourceMappingURL=create-elms.esm.js.map
