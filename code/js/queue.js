! function(n, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : n.queue = t()
}(this, function() {
  "use strict";

  function n() {}

  function t(t) {
    function r() {
      if (!c) try {
        e()
      } catch (n) {
        a[w + s - 1] && i(n)
      }
    }

    function e() {
      for (; c = h && t > s;) {
        var n = w + s,
          r = a[n],
          o = r.length - 1,
          e = r[o];
        r[o] = f(n), --h, ++s, r = e.apply(null, r), a[n] && (a[n] = r || u)
      }
    }

    function f(n) {
      return function(t, o) {
        a[n] && (--s, ++w, a[n] = null, null == d && (null != t ? i(t) : (p[n] = o, h ? r() : s || y(d, p))))
      }
    }

    function i(n) {
      var t, r = a.length;
      for (d = n, p = void 0, h = NaN; --r >= 0;)
        if ((t = a[r]) && (a[r] = null, t.abort)) try {
          t.abort()
        } catch (n) {}
      s = NaN, y(d, p)
    }
    if (!(t >= 1)) throw new Error;
    var l, c, a = [],
      p = [],
      h = 0,
      s = 0,
      w = 0,
      d = null,
      y = n;
    return l = {
      defer: function(t) {
        if ("function" != typeof t || y !== n) throw new Error;
        if (null != d) return l;
        var u = o.call(arguments, 1);
        return u.push(t), ++h, a.push(u), r(), l
      },
      abort: function() {
        return null == d && i(new Error("abort")), l
      },
      await: function(t) {
        if ("function" != typeof t || y !== n) throw new Error;
        return y = function(n, r) {
          t.apply(null, [n].concat(r))
        }, s || y(d, p), l
      },
      awaitAll: function(t) {
        if ("function" != typeof t || y !== n) throw new Error;
        return y = t, s || y(d, p), l
      }
    }
  }

  function r(n) {
    return t(arguments.length ? +n : 1 / 0)
  }
  var o = [].slice,
    u = {};
  return r.version = "1.2.3", r
});
