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
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = [];
        function c(e) {
            var n = Array.isArray(e) ? e : "string" == typeof e ? [].concat(t(document.querySelectorAll(e))) : e.length ? [].concat(t(e)) : [ e ];
            return [].concat(t(n)).filter(function(e) {
                return e;
            });
        }
        return (Array.isArray(n) ? n : [ n ]).forEach(function(n) {
            var f = document.createElement("div"), i = n && "string" == typeof n, u = i ? r : function t() {
                for (var n = function(t) {
                    return t && "object" === (void 0 === t ? "undefined" : e(t));
                }, r = arguments.length, o = Array(r), c = 0; c < r; c++) o[c] = arguments[c];
                return o.reduce(function(e, r) {
                    return Object.keys(r).forEach(function(o) {
                        var c = e[o], f = r[o];
                        n(c) && n(f) ? e[o] = t(c, f) : e[o] = f;
                    }), e;
                }, {});
            }(r, n);
            if (i) f.innerHTML = n; else if (u.tag) {
                var a = document.createElement(u.tag);
                f.appendChild(a);
            }
            [].concat(t(f.children)).forEach(function(e) {
                !(e.textContent.length || e.children.length) && (u.html ? e.innerHTML = u.html : u.text && (e.textContent = u.text)), 
                u.attr && Object.keys(u.attr).forEach(function(t) {
                    e.setAttribute(t, u.attr[t]);
                }), u.appendTo ? c(u.appendTo).forEach(function(t, n, r) {
                    var c = r.length > 1 ? e.cloneNode(!0) : e;
                    o.push(t.appendChild(c));
                }) : u.prependTo ? c(u.prependTo).forEach(function(t, n, r) {
                    var c = r.length > 1 ? e.cloneNode(!0) : e;
                    o.push(t.prepend(c));
                }) : u.insertBefore ? c(u.insertBefore).forEach(function(t, n, r) {
                    var c = r.length > 1 ? e.cloneNode(!0) : e;
                    o.push(t.parentNode.insertBefore(c, t));
                }) : u.insertAfter ? c(u.insertAfter).forEach(function(t, n, r) {
                    var c = r.length > 1 ? e.cloneNode(!0) : e;
                    o.push(t.parentNode.insertBefore(c, t.nextSibling));
                }) : o.push(e);
            });
        }), o;
    };
});
//# sourceMappingURL=create-elms.js.map
