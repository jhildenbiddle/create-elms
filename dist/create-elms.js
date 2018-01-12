/*!
 * create-elms
 * v1.0.0
 * https://github.com/jhildenbiddle/create-elms
 * (c) 2018 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.createElms = t();
}(this, function() {
    "use strict";
    var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e;
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, t = function(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
            return n;
        }
        return Array.from(e);
    };
    return function(n) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window.document, i = [];
        function f(e) {
            var n = Array.isArray(e) ? e : "string" == typeof e ? [].concat(t(o.querySelectorAll(e))) : e.length ? [].concat(t(e)) : [ e ];
            return [].concat(t(n)).filter(function(e) {
                return e;
            });
        }
        return (Array.isArray(n) ? n : [ n ]).forEach(function(n) {
            var c = o.createElement("div"), u = n && "string" == typeof n, a = u ? r : function t() {
                for (var n = function(t) {
                    return t && "object" === (void 0 === t ? "undefined" : e(t));
                }, r = arguments.length, o = Array(r), i = 0; i < r; i++) o[i] = arguments[i];
                return o.reduce(function(e, r) {
                    return Object.keys(r).forEach(function(o) {
                        var i = e[o], f = r[o];
                        n(i) && n(f) ? e[o] = t(i, f) : e[o] = f;
                    }), e;
                }, {});
            }(r, n);
            if (u) c.innerHTML = n; else if (a.tag) {
                var l = o.createElement(a.tag);
                c.appendChild(l);
            }
            [].concat(t(c.children)).forEach(function(e) {
                !(e.textContent.length || e.children.length) && (a.html ? e.innerHTML = a.html : a.text && (e.textContent = a.text)), 
                a.attr && Object.keys(a.attr).forEach(function(t) {
                    e.setAttribute(t, a.attr[t]);
                }), a.appendTo ? f(a.appendTo).forEach(function(t, n, r) {
                    var o = r.length > 1 ? e.cloneNode(!0) : e;
                    i.push(t.appendChild(o));
                }) : a.prependTo ? f(a.prependTo).forEach(function(t, n, r) {
                    var o = r.length > 1 ? e.cloneNode(!0) : e;
                    i.push(t.insertBefore(o, t.firstChild));
                }) : a.insertBefore ? f(a.insertBefore).forEach(function(t, n, r) {
                    var o = r.length > 1 ? e.cloneNode(!0) : e;
                    i.push(t.parentNode.insertBefore(o, t));
                }) : a.insertAfter ? f(a.insertAfter).forEach(function(t, n, r) {
                    var o = r.length > 1 ? e.cloneNode(!0) : e;
                    i.push(t.parentNode.insertBefore(o, t.nextSibling));
                }) : i.push(e);
            });
        }), r.returnHtml ? i.map(function(e) {
            return e.outerHTML;
        }) : i;
    };
});
//# sourceMappingURL=create-elms.js.map
