/*!
 * create-elms
 * v1.0.2
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
            var n = [];
            if (e.nodeType) n = [ e ]; else if ("string" == typeof e) n = [].concat(t(o.querySelectorAll(e))); else if (Array.isArray(e)) {
                var r;
                n = e.map(function(e) {
                    return f(e);
                }), n = (r = Array.prototype).concat.apply(r, t(n));
            } else e.length && (n = [].concat(t(e)));
            return n;
        }
        return (Array.isArray(n) ? n : [ n ]).forEach(function(n) {
            var c = o.createElement("div"), a = n && "string" == typeof n, u = a ? r : function t() {
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
            if (a) c.innerHTML = n; else if (u.tag) {
                var l = o.createElement(u.tag);
                c.appendChild(l);
            }
            [].concat(t(c.children)).forEach(function(e) {
                !(e.textContent.length || e.children.length) && (u.html ? e.innerHTML = u.html : u.text && (e.textContent = u.text)), 
                u.attr && Object.keys(u.attr).forEach(function(t) {
                    e.setAttribute(t, u.attr[t]);
                }), u.appendTo ? f(u.appendTo).forEach(function(t, n, r) {
                    var o = r.length > 1 ? e.cloneNode(!0) : e;
                    i.push(t.appendChild(o));
                }) : u.prependTo ? f(u.prependTo).forEach(function(t, n, r) {
                    var o = r.length > 1 ? e.cloneNode(!0) : e;
                    i.push(t.insertBefore(o, t.firstChild));
                }) : u.insertBefore ? f(u.insertBefore).forEach(function(t, n, r) {
                    var o = r.length > 1 ? e.cloneNode(!0) : e;
                    i.push(t.parentNode.insertBefore(o, t));
                }) : u.insertAfter ? f(u.insertAfter).forEach(function(t, n, r) {
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
