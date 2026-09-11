var iw = Object.defineProperty;
var ow = (e, t, n) => t in e ? iw(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var mf = (e, t, n) => ow(e, typeof t != "symbol" ? t + "" : t, n);
function cp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var fp = { exports: {} }, ol = {}, dp = { exports: {} }, ce = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ho = Symbol.for("react.element"), sw = Symbol.for("react.portal"), lw = Symbol.for("react.fragment"), uw = Symbol.for("react.strict_mode"), aw = Symbol.for("react.profiler"), cw = Symbol.for("react.provider"), fw = Symbol.for("react.context"), dw = Symbol.for("react.forward_ref"), hw = Symbol.for("react.suspense"), pw = Symbol.for("react.memo"), gw = Symbol.for("react.lazy"), yf = Symbol.iterator;
function mw(e) {
  return e === null || typeof e != "object" ? null : (e = yf && e[yf] || e["@@iterator"], typeof e == "function" ? e : null);
}
var hp = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, pp = Object.assign, gp = {};
function ni(e, t, n) {
  this.props = e, this.context = t, this.refs = gp, this.updater = n || hp;
}
ni.prototype.isReactComponent = {};
ni.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
ni.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function mp() {
}
mp.prototype = ni.prototype;
function Ha(e, t, n) {
  this.props = e, this.context = t, this.refs = gp, this.updater = n || hp;
}
var Va = Ha.prototype = new mp();
Va.constructor = Ha;
pp(Va, ni.prototype);
Va.isPureReactComponent = !0;
var vf = Array.isArray, yp = Object.prototype.hasOwnProperty, Wa = { current: null }, vp = { key: !0, ref: !0, __self: !0, __source: !0 };
function wp(e, t, n) {
  var r, i = {}, o = null, s = null;
  if (t != null) for (r in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (o = "" + t.key), t) yp.call(t, r) && !vp.hasOwnProperty(r) && (i[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) i.children = n;
  else if (1 < l) {
    for (var u = Array(l), a = 0; a < l; a++) u[a] = arguments[a + 2];
    i.children = u;
  }
  if (e && e.defaultProps) for (r in l = e.defaultProps, l) i[r] === void 0 && (i[r] = l[r]);
  return { $$typeof: ho, type: e, key: o, ref: s, props: i, _owner: Wa.current };
}
function yw(e, t) {
  return { $$typeof: ho, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Ya(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ho;
}
function vw(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var wf = /\/+/g;
function Fl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? vw("" + e.key) : t.toString(36);
}
function is(e, t, n, r, i) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else switch (o) {
    case "string":
    case "number":
      s = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case ho:
        case sw:
          s = !0;
      }
  }
  if (s) return s = e, i = i(s), e = r === "" ? "." + Fl(s, 0) : r, vf(i) ? (n = "", e != null && (n = e.replace(wf, "$&/") + "/"), is(i, t, n, "", function(a) {
    return a;
  })) : i != null && (Ya(i) && (i = yw(i, n + (!i.key || s && s.key === i.key ? "" : ("" + i.key).replace(wf, "$&/") + "/") + e)), t.push(i)), 1;
  if (s = 0, r = r === "" ? "." : r + ":", vf(e)) for (var l = 0; l < e.length; l++) {
    o = e[l];
    var u = r + Fl(o, l);
    s += is(o, t, n, u, i);
  }
  else if (u = mw(e), typeof u == "function") for (e = u.call(e), l = 0; !(o = e.next()).done; ) o = o.value, u = r + Fl(o, l++), s += is(o, t, n, u, i);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return s;
}
function Io(e, t, n) {
  if (e == null) return e;
  var r = [], i = 0;
  return is(e, r, "", "", function(o) {
    return t.call(n, o, i++);
  }), r;
}
function ww(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Ze = { current: null }, os = { transition: null }, xw = { ReactCurrentDispatcher: Ze, ReactCurrentBatchConfig: os, ReactCurrentOwner: Wa };
function xp() {
  throw Error("act(...) is not supported in production builds of React.");
}
ce.Children = { map: Io, forEach: function(e, t, n) {
  Io(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Io(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Io(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Ya(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
ce.Component = ni;
ce.Fragment = lw;
ce.Profiler = aw;
ce.PureComponent = Ha;
ce.StrictMode = uw;
ce.Suspense = hw;
ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = xw;
ce.act = xp;
ce.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = pp({}, e.props), i = e.key, o = e.ref, s = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, s = Wa.current), t.key !== void 0 && (i = "" + t.key), e.type && e.type.defaultProps) var l = e.type.defaultProps;
    for (u in t) yp.call(t, u) && !vp.hasOwnProperty(u) && (r[u] = t[u] === void 0 && l !== void 0 ? l[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    l = Array(u);
    for (var a = 0; a < u; a++) l[a] = arguments[a + 2];
    r.children = l;
  }
  return { $$typeof: ho, type: e.type, key: i, ref: o, props: r, _owner: s };
};
ce.createContext = function(e) {
  return e = { $$typeof: fw, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: cw, _context: e }, e.Consumer = e;
};
ce.createElement = wp;
ce.createFactory = function(e) {
  var t = wp.bind(null, e);
  return t.type = e, t;
};
ce.createRef = function() {
  return { current: null };
};
ce.forwardRef = function(e) {
  return { $$typeof: dw, render: e };
};
ce.isValidElement = Ya;
ce.lazy = function(e) {
  return { $$typeof: gw, _payload: { _status: -1, _result: e }, _init: ww };
};
ce.memo = function(e, t) {
  return { $$typeof: pw, type: e, compare: t === void 0 ? null : t };
};
ce.startTransition = function(e) {
  var t = os.transition;
  os.transition = {};
  try {
    e();
  } finally {
    os.transition = t;
  }
};
ce.unstable_act = xp;
ce.useCallback = function(e, t) {
  return Ze.current.useCallback(e, t);
};
ce.useContext = function(e) {
  return Ze.current.useContext(e);
};
ce.useDebugValue = function() {
};
ce.useDeferredValue = function(e) {
  return Ze.current.useDeferredValue(e);
};
ce.useEffect = function(e, t) {
  return Ze.current.useEffect(e, t);
};
ce.useId = function() {
  return Ze.current.useId();
};
ce.useImperativeHandle = function(e, t, n) {
  return Ze.current.useImperativeHandle(e, t, n);
};
ce.useInsertionEffect = function(e, t) {
  return Ze.current.useInsertionEffect(e, t);
};
ce.useLayoutEffect = function(e, t) {
  return Ze.current.useLayoutEffect(e, t);
};
ce.useMemo = function(e, t) {
  return Ze.current.useMemo(e, t);
};
ce.useReducer = function(e, t, n) {
  return Ze.current.useReducer(e, t, n);
};
ce.useRef = function(e) {
  return Ze.current.useRef(e);
};
ce.useState = function(e) {
  return Ze.current.useState(e);
};
ce.useSyncExternalStore = function(e, t, n) {
  return Ze.current.useSyncExternalStore(e, t, n);
};
ce.useTransition = function() {
  return Ze.current.useTransition();
};
ce.version = "18.3.1";
dp.exports = ce;
var A = dp.exports;
const _w = /* @__PURE__ */ cp(A);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ew = A, Sw = Symbol.for("react.element"), kw = Symbol.for("react.fragment"), Nw = Object.prototype.hasOwnProperty, bw = Ew.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Cw = { key: !0, ref: !0, __self: !0, __source: !0 };
function _p(e, t, n) {
  var r, i = {}, o = null, s = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (r in t) Nw.call(t, r) && !Cw.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) i[r] === void 0 && (i[r] = t[r]);
  return { $$typeof: Sw, type: e, key: o, ref: s, props: i, _owner: bw.current };
}
ol.Fragment = kw;
ol.jsx = _p;
ol.jsxs = _p;
fp.exports = ol;
var b = fp.exports, Ep = { exports: {} }, vt = {}, Sp = { exports: {} }, kp = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(M, T) {
    var F = M.length;
    M.push(T);
    e: for (; 0 < F; ) {
      var D = F - 1 >>> 1, H = M[D];
      if (0 < i(H, T)) M[D] = T, M[F] = H, F = D;
      else break e;
    }
  }
  function n(M) {
    return M.length === 0 ? null : M[0];
  }
  function r(M) {
    if (M.length === 0) return null;
    var T = M[0], F = M.pop();
    if (F !== T) {
      M[0] = F;
      e: for (var D = 0, H = M.length, Z = H >>> 1; D < Z; ) {
        var q = 2 * (D + 1) - 1, ie = M[q], oe = q + 1, ne = M[oe];
        if (0 > i(ie, F)) oe < H && 0 > i(ne, ie) ? (M[D] = ne, M[oe] = F, D = oe) : (M[D] = ie, M[q] = F, D = q);
        else if (oe < H && 0 > i(ne, F)) M[D] = ne, M[oe] = F, D = oe;
        else break e;
      }
    }
    return T;
  }
  function i(M, T) {
    var F = M.sortIndex - T.sortIndex;
    return F !== 0 ? F : M.id - T.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var s = Date, l = s.now();
    e.unstable_now = function() {
      return s.now() - l;
    };
  }
  var u = [], a = [], c = 1, f = null, d = 3, h = !1, g = !1, x = !1, E = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, w = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function v(M) {
    for (var T = n(a); T !== null; ) {
      if (T.callback === null) r(a);
      else if (T.startTime <= M) r(a), T.sortIndex = T.expirationTime, t(u, T);
      else break;
      T = n(a);
    }
  }
  function _(M) {
    if (x = !1, v(M), !g) if (n(u) !== null) g = !0, R(C);
    else {
      var T = n(a);
      T !== null && j(_, T.startTime - M);
    }
  }
  function C(M, T) {
    g = !1, x && (x = !1, p(L), L = -1), h = !0;
    var F = d;
    try {
      for (v(T), f = n(u); f !== null && (!(f.expirationTime > T) || M && !z()); ) {
        var D = f.callback;
        if (typeof D == "function") {
          f.callback = null, d = f.priorityLevel;
          var H = D(f.expirationTime <= T);
          T = e.unstable_now(), typeof H == "function" ? f.callback = H : f === n(u) && r(u), v(T);
        } else r(u);
        f = n(u);
      }
      if (f !== null) var Z = !0;
      else {
        var q = n(a);
        q !== null && j(_, q.startTime - T), Z = !1;
      }
      return Z;
    } finally {
      f = null, d = F, h = !1;
    }
  }
  var I = !1, P = null, L = -1, B = 5, V = -1;
  function z() {
    return !(e.unstable_now() - V < B);
  }
  function X() {
    if (P !== null) {
      var M = e.unstable_now();
      V = M;
      var T = !0;
      try {
        T = P(!0, M);
      } finally {
        T ? W() : (I = !1, P = null);
      }
    } else I = !1;
  }
  var W;
  if (typeof w == "function") W = function() {
    w(X);
  };
  else if (typeof MessageChannel < "u") {
    var N = new MessageChannel(), O = N.port2;
    N.port1.onmessage = X, W = function() {
      O.postMessage(null);
    };
  } else W = function() {
    E(X, 0);
  };
  function R(M) {
    P = M, I || (I = !0, W());
  }
  function j(M, T) {
    L = E(function() {
      M(e.unstable_now());
    }, T);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(M) {
    M.callback = null;
  }, e.unstable_continueExecution = function() {
    g || h || (g = !0, R(C));
  }, e.unstable_forceFrameRate = function(M) {
    0 > M || 125 < M ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : B = 0 < M ? Math.floor(1e3 / M) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return d;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(M) {
    switch (d) {
      case 1:
      case 2:
      case 3:
        var T = 3;
        break;
      default:
        T = d;
    }
    var F = d;
    d = T;
    try {
      return M();
    } finally {
      d = F;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(M, T) {
    switch (M) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        M = 3;
    }
    var F = d;
    d = M;
    try {
      return T();
    } finally {
      d = F;
    }
  }, e.unstable_scheduleCallback = function(M, T, F) {
    var D = e.unstable_now();
    switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? D + F : D) : F = D, M) {
      case 1:
        var H = -1;
        break;
      case 2:
        H = 250;
        break;
      case 5:
        H = 1073741823;
        break;
      case 4:
        H = 1e4;
        break;
      default:
        H = 5e3;
    }
    return H = F + H, M = { id: c++, callback: T, priorityLevel: M, startTime: F, expirationTime: H, sortIndex: -1 }, F > D ? (M.sortIndex = F, t(a, M), n(u) === null && M === n(a) && (x ? (p(L), L = -1) : x = !0, j(_, F - D))) : (M.sortIndex = H, t(u, M), g || h || (g = !0, R(C))), M;
  }, e.unstable_shouldYield = z, e.unstable_wrapCallback = function(M) {
    var T = d;
    return function() {
      var F = d;
      d = T;
      try {
        return M.apply(this, arguments);
      } finally {
        d = F;
      }
    };
  };
})(kp);
Sp.exports = kp;
var Iw = Sp.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pw = A, mt = Iw;
function Q(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Np = /* @__PURE__ */ new Set(), Bi = {};
function fr(e, t) {
  zr(e, t), zr(e + "Capture", t);
}
function zr(e, t) {
  for (Bi[e] = t, e = 0; e < t.length; e++) Np.add(t[e]);
}
var fn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Lu = Object.prototype.hasOwnProperty, Mw = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, xf = {}, _f = {};
function Tw(e) {
  return Lu.call(_f, e) ? !0 : Lu.call(xf, e) ? !1 : Mw.test(e) ? _f[e] = !0 : (xf[e] = !0, !1);
}
function Lw(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function $w(e, t, n, r) {
  if (t === null || typeof t > "u" || Lw(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function Je(e, t, n, r, i, o, s) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = s;
}
var He = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  He[e] = new Je(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  He[t] = new Je(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  He[e] = new Je(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  He[e] = new Je(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  He[e] = new Je(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  He[e] = new Je(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  He[e] = new Je(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  He[e] = new Je(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  He[e] = new Je(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ga = /[\-:]([a-z])/g;
function Xa(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Ga,
    Xa
  );
  He[t] = new Je(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Ga, Xa);
  He[t] = new Je(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Ga, Xa);
  He[t] = new Je(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  He[e] = new Je(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
He.xlinkHref = new Je("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  He[e] = new Je(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Qa(e, t, n, r) {
  var i = He.hasOwnProperty(t) ? He[t] : null;
  (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && ($w(t, n, i, r) && (n = null), r || i === null ? Tw(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var mn = Pw.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Po = Symbol.for("react.element"), vr = Symbol.for("react.portal"), wr = Symbol.for("react.fragment"), Ka = Symbol.for("react.strict_mode"), $u = Symbol.for("react.profiler"), bp = Symbol.for("react.provider"), Cp = Symbol.for("react.context"), qa = Symbol.for("react.forward_ref"), ju = Symbol.for("react.suspense"), Ru = Symbol.for("react.suspense_list"), Za = Symbol.for("react.memo"), En = Symbol.for("react.lazy"), Ip = Symbol.for("react.offscreen"), Ef = Symbol.iterator;
function li(e) {
  return e === null || typeof e != "object" ? null : (e = Ef && e[Ef] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Me = Object.assign, Dl;
function wi(e) {
  if (Dl === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Dl = t && t[1] || "";
  }
  return `
` + Dl + e;
}
var zl = !1;
function Ul(e, t) {
  if (!e || zl) return "";
  zl = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (a) {
        var r = a;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (a) {
        r = a;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (a) {
        r = a;
      }
      e();
    }
  } catch (a) {
    if (a && r && typeof a.stack == "string") {
      for (var i = a.stack.split(`
`), o = r.stack.split(`
`), s = i.length - 1, l = o.length - 1; 1 <= s && 0 <= l && i[s] !== o[l]; ) l--;
      for (; 1 <= s && 0 <= l; s--, l--) if (i[s] !== o[l]) {
        if (s !== 1 || l !== 1)
          do
            if (s--, l--, 0 > l || i[s] !== o[l]) {
              var u = `
` + i[s].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= s && 0 <= l);
        break;
      }
    }
  } finally {
    zl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? wi(e) : "";
}
function jw(e) {
  switch (e.tag) {
    case 5:
      return wi(e.type);
    case 16:
      return wi("Lazy");
    case 13:
      return wi("Suspense");
    case 19:
      return wi("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ul(e.type, !1), e;
    case 11:
      return e = Ul(e.type.render, !1), e;
    case 1:
      return e = Ul(e.type, !0), e;
    default:
      return "";
  }
}
function Au(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case wr:
      return "Fragment";
    case vr:
      return "Portal";
    case $u:
      return "Profiler";
    case Ka:
      return "StrictMode";
    case ju:
      return "Suspense";
    case Ru:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Cp:
      return (e.displayName || "Context") + ".Consumer";
    case bp:
      return (e._context.displayName || "Context") + ".Provider";
    case qa:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Za:
      return t = e.displayName || null, t !== null ? t : Au(e.type) || "Memo";
    case En:
      t = e._payload, e = e._init;
      try {
        return Au(e(t));
      } catch {
      }
  }
  return null;
}
function Rw(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Au(t);
    case 8:
      return t === Ka ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Bn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Pp(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Aw(e) {
  var t = Pp(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var i = n.get, o = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return i.call(this);
    }, set: function(s) {
      r = "" + s, o.call(this, s);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(s) {
      r = "" + s;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function Mo(e) {
  e._valueTracker || (e._valueTracker = Aw(e));
}
function Mp(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Pp(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function _s(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ou(e, t) {
  var n = t.checked;
  return Me({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Sf(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = Bn(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Tp(e, t) {
  t = t.checked, t != null && Qa(e, "checked", t, !1);
}
function Bu(e, t) {
  Tp(e, t);
  var n = Bn(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Fu(e, t.type, n) : t.hasOwnProperty("defaultValue") && Fu(e, t.type, Bn(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function kf(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Fu(e, t, n) {
  (t !== "number" || _s(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var xi = Array.isArray;
function $r(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Bn(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        e[i].selected = !0, r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function Du(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(Q(91));
  return Me({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Nf(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(Q(92));
      if (xi(n)) {
        if (1 < n.length) throw Error(Q(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: Bn(n) };
}
function Lp(e, t) {
  var n = Bn(t.value), r = Bn(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function bf(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function $p(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function zu(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? $p(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var To, jp = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, i);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (To = To || document.createElement("div"), To.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = To.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Fi(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Ci = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, Ow = ["Webkit", "ms", "Moz", "O"];
Object.keys(Ci).forEach(function(e) {
  Ow.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Ci[t] = Ci[e];
  });
});
function Rp(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Ci.hasOwnProperty(e) && Ci[e] ? ("" + t).trim() : t + "px";
}
function Ap(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, i = Rp(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
  }
}
var Bw = Me({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Uu(e, t) {
  if (t) {
    if (Bw[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(Q(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(Q(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(Q(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(Q(62));
  }
}
function Hu(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Vu = null;
function Ja(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Wu = null, jr = null, Rr = null;
function Cf(e) {
  if (e = mo(e)) {
    if (typeof Wu != "function") throw Error(Q(280));
    var t = e.stateNode;
    t && (t = cl(t), Wu(e.stateNode, e.type, t));
  }
}
function Op(e) {
  jr ? Rr ? Rr.push(e) : Rr = [e] : jr = e;
}
function Bp() {
  if (jr) {
    var e = jr, t = Rr;
    if (Rr = jr = null, Cf(e), t) for (e = 0; e < t.length; e++) Cf(t[e]);
  }
}
function Fp(e, t) {
  return e(t);
}
function Dp() {
}
var Hl = !1;
function zp(e, t, n) {
  if (Hl) return e(t, n);
  Hl = !0;
  try {
    return Fp(e, t, n);
  } finally {
    Hl = !1, (jr !== null || Rr !== null) && (Dp(), Bp());
  }
}
function Di(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = cl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(Q(231, t, typeof n));
  return n;
}
var Yu = !1;
if (fn) try {
  var ui = {};
  Object.defineProperty(ui, "passive", { get: function() {
    Yu = !0;
  } }), window.addEventListener("test", ui, ui), window.removeEventListener("test", ui, ui);
} catch {
  Yu = !1;
}
function Fw(e, t, n, r, i, o, s, l, u) {
  var a = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, a);
  } catch (c) {
    this.onError(c);
  }
}
var Ii = !1, Es = null, Ss = !1, Gu = null, Dw = { onError: function(e) {
  Ii = !0, Es = e;
} };
function zw(e, t, n, r, i, o, s, l, u) {
  Ii = !1, Es = null, Fw.apply(Dw, arguments);
}
function Uw(e, t, n, r, i, o, s, l, u) {
  if (zw.apply(this, arguments), Ii) {
    if (Ii) {
      var a = Es;
      Ii = !1, Es = null;
    } else throw Error(Q(198));
    Ss || (Ss = !0, Gu = a);
  }
}
function dr(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Up(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function If(e) {
  if (dr(e) !== e) throw Error(Q(188));
}
function Hw(e) {
  var t = e.alternate;
  if (!t) {
    if (t = dr(e), t === null) throw Error(Q(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var o = i.alternate;
    if (o === null) {
      if (r = i.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o; ) {
        if (o === n) return If(i), e;
        if (o === r) return If(i), t;
        o = o.sibling;
      }
      throw Error(Q(188));
    }
    if (n.return !== r.return) n = i, r = o;
    else {
      for (var s = !1, l = i.child; l; ) {
        if (l === n) {
          s = !0, n = i, r = o;
          break;
        }
        if (l === r) {
          s = !0, r = i, n = o;
          break;
        }
        l = l.sibling;
      }
      if (!s) {
        for (l = o.child; l; ) {
          if (l === n) {
            s = !0, n = o, r = i;
            break;
          }
          if (l === r) {
            s = !0, r = o, n = i;
            break;
          }
          l = l.sibling;
        }
        if (!s) throw Error(Q(189));
      }
    }
    if (n.alternate !== r) throw Error(Q(190));
  }
  if (n.tag !== 3) throw Error(Q(188));
  return n.stateNode.current === n ? e : t;
}
function Hp(e) {
  return e = Hw(e), e !== null ? Vp(e) : null;
}
function Vp(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Vp(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Wp = mt.unstable_scheduleCallback, Pf = mt.unstable_cancelCallback, Vw = mt.unstable_shouldYield, Ww = mt.unstable_requestPaint, $e = mt.unstable_now, Yw = mt.unstable_getCurrentPriorityLevel, ec = mt.unstable_ImmediatePriority, Yp = mt.unstable_UserBlockingPriority, ks = mt.unstable_NormalPriority, Gw = mt.unstable_LowPriority, Gp = mt.unstable_IdlePriority, sl = null, qt = null;
function Xw(e) {
  if (qt && typeof qt.onCommitFiberRoot == "function") try {
    qt.onCommitFiberRoot(sl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ft = Math.clz32 ? Math.clz32 : qw, Qw = Math.log, Kw = Math.LN2;
function qw(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Qw(e) / Kw | 0) | 0;
}
var Lo = 64, $o = 4194304;
function _i(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Ns(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, i = e.suspendedLanes, o = e.pingedLanes, s = n & 268435455;
  if (s !== 0) {
    var l = s & ~i;
    l !== 0 ? r = _i(l) : (o &= s, o !== 0 && (r = _i(o)));
  } else s = n & ~i, s !== 0 ? r = _i(s) : o !== 0 && (r = _i(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & i) && (i = r & -r, o = t & -t, i >= o || i === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Ft(t), i = 1 << n, r |= e[n], t &= ~i;
  return r;
}
function Zw(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Jw(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var s = 31 - Ft(o), l = 1 << s, u = i[s];
    u === -1 ? (!(l & n) || l & r) && (i[s] = Zw(l, t)) : u <= t && (e.expiredLanes |= l), o &= ~l;
  }
}
function Xu(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Xp() {
  var e = Lo;
  return Lo <<= 1, !(Lo & 4194240) && (Lo = 64), e;
}
function Vl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function po(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ft(t), e[t] = n;
}
function ex(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - Ft(n), o = 1 << i;
    t[i] = 0, r[i] = -1, e[i] = -1, n &= ~o;
  }
}
function tc(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Ft(n), i = 1 << r;
    i & t | e[r] & t && (e[r] |= t), n &= ~i;
  }
}
var ve = 0;
function Qp(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Kp, nc, qp, Zp, Jp, Qu = !1, jo = [], Pn = null, Mn = null, Tn = null, zi = /* @__PURE__ */ new Map(), Ui = /* @__PURE__ */ new Map(), kn = [], tx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Mf(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Pn = null;
      break;
    case "dragenter":
    case "dragleave":
      Mn = null;
      break;
    case "mouseover":
    case "mouseout":
      Tn = null;
      break;
    case "pointerover":
    case "pointerout":
      zi.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ui.delete(t.pointerId);
  }
}
function ai(e, t, n, r, i, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [i] }, t !== null && (t = mo(t), t !== null && nc(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
}
function nx(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return Pn = ai(Pn, e, t, n, r, i), !0;
    case "dragenter":
      return Mn = ai(Mn, e, t, n, r, i), !0;
    case "mouseover":
      return Tn = ai(Tn, e, t, n, r, i), !0;
    case "pointerover":
      var o = i.pointerId;
      return zi.set(o, ai(zi.get(o) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return o = i.pointerId, Ui.set(o, ai(Ui.get(o) || null, e, t, n, r, i)), !0;
  }
  return !1;
}
function eg(e) {
  var t = Gn(e.target);
  if (t !== null) {
    var n = dr(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Up(n), t !== null) {
          e.blockedOn = t, Jp(e.priority, function() {
            qp(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function ss(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Ku(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Vu = r, n.target.dispatchEvent(r), Vu = null;
    } else return t = mo(n), t !== null && nc(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Tf(e, t, n) {
  ss(e) && n.delete(t);
}
function rx() {
  Qu = !1, Pn !== null && ss(Pn) && (Pn = null), Mn !== null && ss(Mn) && (Mn = null), Tn !== null && ss(Tn) && (Tn = null), zi.forEach(Tf), Ui.forEach(Tf);
}
function ci(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Qu || (Qu = !0, mt.unstable_scheduleCallback(mt.unstable_NormalPriority, rx)));
}
function Hi(e) {
  function t(i) {
    return ci(i, e);
  }
  if (0 < jo.length) {
    ci(jo[0], e);
    for (var n = 1; n < jo.length; n++) {
      var r = jo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (Pn !== null && ci(Pn, e), Mn !== null && ci(Mn, e), Tn !== null && ci(Tn, e), zi.forEach(t), Ui.forEach(t), n = 0; n < kn.length; n++) r = kn[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < kn.length && (n = kn[0], n.blockedOn === null); ) eg(n), n.blockedOn === null && kn.shift();
}
var Ar = mn.ReactCurrentBatchConfig, bs = !0;
function ix(e, t, n, r) {
  var i = ve, o = Ar.transition;
  Ar.transition = null;
  try {
    ve = 1, rc(e, t, n, r);
  } finally {
    ve = i, Ar.transition = o;
  }
}
function ox(e, t, n, r) {
  var i = ve, o = Ar.transition;
  Ar.transition = null;
  try {
    ve = 4, rc(e, t, n, r);
  } finally {
    ve = i, Ar.transition = o;
  }
}
function rc(e, t, n, r) {
  if (bs) {
    var i = Ku(e, t, n, r);
    if (i === null) eu(e, t, r, Cs, n), Mf(e, r);
    else if (nx(i, e, t, n, r)) r.stopPropagation();
    else if (Mf(e, r), t & 4 && -1 < tx.indexOf(e)) {
      for (; i !== null; ) {
        var o = mo(i);
        if (o !== null && Kp(o), o = Ku(e, t, n, r), o === null && eu(e, t, r, Cs, n), o === i) break;
        i = o;
      }
      i !== null && r.stopPropagation();
    } else eu(e, t, r, null, n);
  }
}
var Cs = null;
function Ku(e, t, n, r) {
  if (Cs = null, e = Ja(r), e = Gn(e), e !== null) if (t = dr(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Up(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Cs = e, null;
}
function tg(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Yw()) {
        case ec:
          return 1;
        case Yp:
          return 4;
        case ks:
        case Gw:
          return 16;
        case Gp:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Cn = null, ic = null, ls = null;
function ng() {
  if (ls) return ls;
  var e, t = ic, n = t.length, r, i = "value" in Cn ? Cn.value : Cn.textContent, o = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++) ;
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === i[o - r]; r++) ;
  return ls = i.slice(e, 1 < r ? 1 - r : void 0);
}
function us(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Ro() {
  return !0;
}
function Lf() {
  return !1;
}
function wt(e) {
  function t(n, r, i, o, s) {
    this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = o, this.target = s, this.currentTarget = null;
    for (var l in e) e.hasOwnProperty(l) && (n = e[l], this[l] = n ? n(o) : o[l]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Ro : Lf, this.isPropagationStopped = Lf, this;
  }
  return Me(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ro);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ro);
  }, persist: function() {
  }, isPersistent: Ro }), t;
}
var ri = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, oc = wt(ri), go = Me({}, ri, { view: 0, detail: 0 }), sx = wt(go), Wl, Yl, fi, ll = Me({}, go, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: sc, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== fi && (fi && e.type === "mousemove" ? (Wl = e.screenX - fi.screenX, Yl = e.screenY - fi.screenY) : Yl = Wl = 0, fi = e), Wl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Yl;
} }), $f = wt(ll), lx = Me({}, ll, { dataTransfer: 0 }), ux = wt(lx), ax = Me({}, go, { relatedTarget: 0 }), Gl = wt(ax), cx = Me({}, ri, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), fx = wt(cx), dx = Me({}, ri, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), hx = wt(dx), px = Me({}, ri, { data: 0 }), jf = wt(px), gx = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, mx = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, yx = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function vx(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = yx[e]) ? !!t[e] : !1;
}
function sc() {
  return vx;
}
var wx = Me({}, go, { key: function(e) {
  if (e.key) {
    var t = gx[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = us(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? mx[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: sc, charCode: function(e) {
  return e.type === "keypress" ? us(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? us(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), xx = wt(wx), _x = Me({}, ll, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Rf = wt(_x), Ex = Me({}, go, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: sc }), Sx = wt(Ex), kx = Me({}, ri, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Nx = wt(kx), bx = Me({}, ll, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Cx = wt(bx), Ix = [9, 13, 27, 32], lc = fn && "CompositionEvent" in window, Pi = null;
fn && "documentMode" in document && (Pi = document.documentMode);
var Px = fn && "TextEvent" in window && !Pi, rg = fn && (!lc || Pi && 8 < Pi && 11 >= Pi), Af = " ", Of = !1;
function ig(e, t) {
  switch (e) {
    case "keyup":
      return Ix.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function og(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var xr = !1;
function Mx(e, t) {
  switch (e) {
    case "compositionend":
      return og(t);
    case "keypress":
      return t.which !== 32 ? null : (Of = !0, Af);
    case "textInput":
      return e = t.data, e === Af && Of ? null : e;
    default:
      return null;
  }
}
function Tx(e, t) {
  if (xr) return e === "compositionend" || !lc && ig(e, t) ? (e = ng(), ls = ic = Cn = null, xr = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return rg && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Lx = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Bf(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Lx[e.type] : t === "textarea";
}
function sg(e, t, n, r) {
  Op(r), t = Is(t, "onChange"), 0 < t.length && (n = new oc("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Mi = null, Vi = null;
function $x(e) {
  yg(e, 0);
}
function ul(e) {
  var t = Sr(e);
  if (Mp(t)) return e;
}
function jx(e, t) {
  if (e === "change") return t;
}
var lg = !1;
if (fn) {
  var Xl;
  if (fn) {
    var Ql = "oninput" in document;
    if (!Ql) {
      var Ff = document.createElement("div");
      Ff.setAttribute("oninput", "return;"), Ql = typeof Ff.oninput == "function";
    }
    Xl = Ql;
  } else Xl = !1;
  lg = Xl && (!document.documentMode || 9 < document.documentMode);
}
function Df() {
  Mi && (Mi.detachEvent("onpropertychange", ug), Vi = Mi = null);
}
function ug(e) {
  if (e.propertyName === "value" && ul(Vi)) {
    var t = [];
    sg(t, Vi, e, Ja(e)), zp($x, t);
  }
}
function Rx(e, t, n) {
  e === "focusin" ? (Df(), Mi = t, Vi = n, Mi.attachEvent("onpropertychange", ug)) : e === "focusout" && Df();
}
function Ax(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return ul(Vi);
}
function Ox(e, t) {
  if (e === "click") return ul(t);
}
function Bx(e, t) {
  if (e === "input" || e === "change") return ul(t);
}
function Fx(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var zt = typeof Object.is == "function" ? Object.is : Fx;
function Wi(e, t) {
  if (zt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!Lu.call(t, i) || !zt(e[i], t[i])) return !1;
  }
  return !0;
}
function zf(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Uf(e, t) {
  var n = zf(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = zf(n);
  }
}
function ag(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ag(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function cg() {
  for (var e = window, t = _s(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = _s(e.document);
  }
  return t;
}
function uc(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Dx(e) {
  var t = cg(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && ag(n.ownerDocument.documentElement, n)) {
    if (r !== null && uc(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var i = n.textContent.length, o = Math.min(r.start, i);
        r = r.end === void 0 ? o : Math.min(r.end, i), !e.extend && o > r && (i = r, r = o, o = i), i = Uf(n, o);
        var s = Uf(
          n,
          r
        );
        i && s && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== s.node || e.focusOffset !== s.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(s.node, s.offset)) : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var zx = fn && "documentMode" in document && 11 >= document.documentMode, _r = null, qu = null, Ti = null, Zu = !1;
function Hf(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Zu || _r == null || _r !== _s(r) || (r = _r, "selectionStart" in r && uc(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Ti && Wi(Ti, r) || (Ti = r, r = Is(qu, "onSelect"), 0 < r.length && (t = new oc("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = _r)));
}
function Ao(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Er = { animationend: Ao("Animation", "AnimationEnd"), animationiteration: Ao("Animation", "AnimationIteration"), animationstart: Ao("Animation", "AnimationStart"), transitionend: Ao("Transition", "TransitionEnd") }, Kl = {}, fg = {};
fn && (fg = document.createElement("div").style, "AnimationEvent" in window || (delete Er.animationend.animation, delete Er.animationiteration.animation, delete Er.animationstart.animation), "TransitionEvent" in window || delete Er.transitionend.transition);
function al(e) {
  if (Kl[e]) return Kl[e];
  if (!Er[e]) return e;
  var t = Er[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in fg) return Kl[e] = t[n];
  return e;
}
var dg = al("animationend"), hg = al("animationiteration"), pg = al("animationstart"), gg = al("transitionend"), mg = /* @__PURE__ */ new Map(), Vf = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Dn(e, t) {
  mg.set(e, t), fr(t, [e]);
}
for (var ql = 0; ql < Vf.length; ql++) {
  var Zl = Vf[ql], Ux = Zl.toLowerCase(), Hx = Zl[0].toUpperCase() + Zl.slice(1);
  Dn(Ux, "on" + Hx);
}
Dn(dg, "onAnimationEnd");
Dn(hg, "onAnimationIteration");
Dn(pg, "onAnimationStart");
Dn("dblclick", "onDoubleClick");
Dn("focusin", "onFocus");
Dn("focusout", "onBlur");
Dn(gg, "onTransitionEnd");
zr("onMouseEnter", ["mouseout", "mouseover"]);
zr("onMouseLeave", ["mouseout", "mouseover"]);
zr("onPointerEnter", ["pointerout", "pointerover"]);
zr("onPointerLeave", ["pointerout", "pointerover"]);
fr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ei = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Vx = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ei));
function Wf(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Uw(r, t, void 0, e), e.currentTarget = null;
}
function yg(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], i = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var s = r.length - 1; 0 <= s; s--) {
        var l = r[s], u = l.instance, a = l.currentTarget;
        if (l = l.listener, u !== o && i.isPropagationStopped()) break e;
        Wf(i, l, a), o = u;
      }
      else for (s = 0; s < r.length; s++) {
        if (l = r[s], u = l.instance, a = l.currentTarget, l = l.listener, u !== o && i.isPropagationStopped()) break e;
        Wf(i, l, a), o = u;
      }
    }
  }
  if (Ss) throw e = Gu, Ss = !1, Gu = null, e;
}
function Ee(e, t) {
  var n = t[ra];
  n === void 0 && (n = t[ra] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (vg(t, e, 2, !1), n.add(r));
}
function Jl(e, t, n) {
  var r = 0;
  t && (r |= 4), vg(n, e, r, t);
}
var Oo = "_reactListening" + Math.random().toString(36).slice(2);
function Yi(e) {
  if (!e[Oo]) {
    e[Oo] = !0, Np.forEach(function(n) {
      n !== "selectionchange" && (Vx.has(n) || Jl(n, !1, e), Jl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Oo] || (t[Oo] = !0, Jl("selectionchange", !1, t));
  }
}
function vg(e, t, n, r) {
  switch (tg(t)) {
    case 1:
      var i = ix;
      break;
    case 4:
      i = ox;
      break;
    default:
      i = rc;
  }
  n = i.bind(null, t, n, e), i = void 0, !Yu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: i }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, { passive: i }) : e.addEventListener(t, n, !1);
}
function eu(e, t, n, r, i) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var s = r.tag;
    if (s === 3 || s === 4) {
      var l = r.stateNode.containerInfo;
      if (l === i || l.nodeType === 8 && l.parentNode === i) break;
      if (s === 4) for (s = r.return; s !== null; ) {
        var u = s.tag;
        if ((u === 3 || u === 4) && (u = s.stateNode.containerInfo, u === i || u.nodeType === 8 && u.parentNode === i)) return;
        s = s.return;
      }
      for (; l !== null; ) {
        if (s = Gn(l), s === null) return;
        if (u = s.tag, u === 5 || u === 6) {
          r = o = s;
          continue e;
        }
        l = l.parentNode;
      }
    }
    r = r.return;
  }
  zp(function() {
    var a = o, c = Ja(n), f = [];
    e: {
      var d = mg.get(e);
      if (d !== void 0) {
        var h = oc, g = e;
        switch (e) {
          case "keypress":
            if (us(n) === 0) break e;
          case "keydown":
          case "keyup":
            h = xx;
            break;
          case "focusin":
            g = "focus", h = Gl;
            break;
          case "focusout":
            g = "blur", h = Gl;
            break;
          case "beforeblur":
          case "afterblur":
            h = Gl;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            h = $f;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            h = ux;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            h = Sx;
            break;
          case dg:
          case hg:
          case pg:
            h = fx;
            break;
          case gg:
            h = Nx;
            break;
          case "scroll":
            h = sx;
            break;
          case "wheel":
            h = Cx;
            break;
          case "copy":
          case "cut":
          case "paste":
            h = hx;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            h = Rf;
        }
        var x = (t & 4) !== 0, E = !x && e === "scroll", p = x ? d !== null ? d + "Capture" : null : d;
        x = [];
        for (var w = a, v; w !== null; ) {
          v = w;
          var _ = v.stateNode;
          if (v.tag === 5 && _ !== null && (v = _, p !== null && (_ = Di(w, p), _ != null && x.push(Gi(w, _, v)))), E) break;
          w = w.return;
        }
        0 < x.length && (d = new h(d, g, null, n, c), f.push({ event: d, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (d = e === "mouseover" || e === "pointerover", h = e === "mouseout" || e === "pointerout", d && n !== Vu && (g = n.relatedTarget || n.fromElement) && (Gn(g) || g[dn])) break e;
        if ((h || d) && (d = c.window === c ? c : (d = c.ownerDocument) ? d.defaultView || d.parentWindow : window, h ? (g = n.relatedTarget || n.toElement, h = a, g = g ? Gn(g) : null, g !== null && (E = dr(g), g !== E || g.tag !== 5 && g.tag !== 6) && (g = null)) : (h = null, g = a), h !== g)) {
          if (x = $f, _ = "onMouseLeave", p = "onMouseEnter", w = "mouse", (e === "pointerout" || e === "pointerover") && (x = Rf, _ = "onPointerLeave", p = "onPointerEnter", w = "pointer"), E = h == null ? d : Sr(h), v = g == null ? d : Sr(g), d = new x(_, w + "leave", h, n, c), d.target = E, d.relatedTarget = v, _ = null, Gn(c) === a && (x = new x(p, w + "enter", g, n, c), x.target = v, x.relatedTarget = E, _ = x), E = _, h && g) t: {
            for (x = h, p = g, w = 0, v = x; v; v = pr(v)) w++;
            for (v = 0, _ = p; _; _ = pr(_)) v++;
            for (; 0 < w - v; ) x = pr(x), w--;
            for (; 0 < v - w; ) p = pr(p), v--;
            for (; w--; ) {
              if (x === p || p !== null && x === p.alternate) break t;
              x = pr(x), p = pr(p);
            }
            x = null;
          }
          else x = null;
          h !== null && Yf(f, d, h, x, !1), g !== null && E !== null && Yf(f, E, g, x, !0);
        }
      }
      e: {
        if (d = a ? Sr(a) : window, h = d.nodeName && d.nodeName.toLowerCase(), h === "select" || h === "input" && d.type === "file") var C = jx;
        else if (Bf(d)) if (lg) C = Bx;
        else {
          C = Ax;
          var I = Rx;
        }
        else (h = d.nodeName) && h.toLowerCase() === "input" && (d.type === "checkbox" || d.type === "radio") && (C = Ox);
        if (C && (C = C(e, a))) {
          sg(f, C, n, c);
          break e;
        }
        I && I(e, d, a), e === "focusout" && (I = d._wrapperState) && I.controlled && d.type === "number" && Fu(d, "number", d.value);
      }
      switch (I = a ? Sr(a) : window, e) {
        case "focusin":
          (Bf(I) || I.contentEditable === "true") && (_r = I, qu = a, Ti = null);
          break;
        case "focusout":
          Ti = qu = _r = null;
          break;
        case "mousedown":
          Zu = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Zu = !1, Hf(f, n, c);
          break;
        case "selectionchange":
          if (zx) break;
        case "keydown":
        case "keyup":
          Hf(f, n, c);
      }
      var P;
      if (lc) e: {
        switch (e) {
          case "compositionstart":
            var L = "onCompositionStart";
            break e;
          case "compositionend":
            L = "onCompositionEnd";
            break e;
          case "compositionupdate":
            L = "onCompositionUpdate";
            break e;
        }
        L = void 0;
      }
      else xr ? ig(e, n) && (L = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (L = "onCompositionStart");
      L && (rg && n.locale !== "ko" && (xr || L !== "onCompositionStart" ? L === "onCompositionEnd" && xr && (P = ng()) : (Cn = c, ic = "value" in Cn ? Cn.value : Cn.textContent, xr = !0)), I = Is(a, L), 0 < I.length && (L = new jf(L, e, null, n, c), f.push({ event: L, listeners: I }), P ? L.data = P : (P = og(n), P !== null && (L.data = P)))), (P = Px ? Mx(e, n) : Tx(e, n)) && (a = Is(a, "onBeforeInput"), 0 < a.length && (c = new jf("onBeforeInput", "beforeinput", null, n, c), f.push({ event: c, listeners: a }), c.data = P));
    }
    yg(f, t);
  });
}
function Gi(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Is(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e, o = i.stateNode;
    i.tag === 5 && o !== null && (i = o, o = Di(e, n), o != null && r.unshift(Gi(e, o, i)), o = Di(e, t), o != null && r.push(Gi(e, o, i))), e = e.return;
  }
  return r;
}
function pr(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Yf(e, t, n, r, i) {
  for (var o = t._reactName, s = []; n !== null && n !== r; ) {
    var l = n, u = l.alternate, a = l.stateNode;
    if (u !== null && u === r) break;
    l.tag === 5 && a !== null && (l = a, i ? (u = Di(n, o), u != null && s.unshift(Gi(n, u, l))) : i || (u = Di(n, o), u != null && s.push(Gi(n, u, l)))), n = n.return;
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var Wx = /\r\n?/g, Yx = /\u0000|\uFFFD/g;
function Gf(e) {
  return (typeof e == "string" ? e : "" + e).replace(Wx, `
`).replace(Yx, "");
}
function Bo(e, t, n) {
  if (t = Gf(t), Gf(e) !== t && n) throw Error(Q(425));
}
function Ps() {
}
var Ju = null, ea = null;
function ta(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var na = typeof setTimeout == "function" ? setTimeout : void 0, Gx = typeof clearTimeout == "function" ? clearTimeout : void 0, Xf = typeof Promise == "function" ? Promise : void 0, Xx = typeof queueMicrotask == "function" ? queueMicrotask : typeof Xf < "u" ? function(e) {
  return Xf.resolve(null).then(e).catch(Qx);
} : na;
function Qx(e) {
  setTimeout(function() {
    throw e;
  });
}
function tu(e, t) {
  var n = t, r = 0;
  do {
    var i = n.nextSibling;
    if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$") {
      if (r === 0) {
        e.removeChild(i), Hi(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = i;
  } while (n);
  Hi(t);
}
function Ln(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Qf(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var ii = Math.random().toString(36).slice(2), Xt = "__reactFiber$" + ii, Xi = "__reactProps$" + ii, dn = "__reactContainer$" + ii, ra = "__reactEvents$" + ii, Kx = "__reactListeners$" + ii, qx = "__reactHandles$" + ii;
function Gn(e) {
  var t = e[Xt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[dn] || n[Xt]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Qf(e); e !== null; ) {
        if (n = e[Xt]) return n;
        e = Qf(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function mo(e) {
  return e = e[Xt] || e[dn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Sr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(Q(33));
}
function cl(e) {
  return e[Xi] || null;
}
var ia = [], kr = -1;
function zn(e) {
  return { current: e };
}
function Se(e) {
  0 > kr || (e.current = ia[kr], ia[kr] = null, kr--);
}
function _e(e, t) {
  kr++, ia[kr] = e.current, e.current = t;
}
var Fn = {}, Qe = zn(Fn), st = zn(!1), tr = Fn;
function Ur(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Fn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var i = {}, o;
  for (o in n) i[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
}
function lt(e) {
  return e = e.childContextTypes, e != null;
}
function Ms() {
  Se(st), Se(Qe);
}
function Kf(e, t, n) {
  if (Qe.current !== Fn) throw Error(Q(168));
  _e(Qe, t), _e(st, n);
}
function wg(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(Q(108, Rw(e) || "Unknown", i));
  return Me({}, n, r);
}
function Ts(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Fn, tr = Qe.current, _e(Qe, e), _e(st, st.current), !0;
}
function qf(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(Q(169));
  n ? (e = wg(e, t, tr), r.__reactInternalMemoizedMergedChildContext = e, Se(st), Se(Qe), _e(Qe, e)) : Se(st), _e(st, n);
}
var sn = null, fl = !1, nu = !1;
function xg(e) {
  sn === null ? sn = [e] : sn.push(e);
}
function Zx(e) {
  fl = !0, xg(e);
}
function Un() {
  if (!nu && sn !== null) {
    nu = !0;
    var e = 0, t = ve;
    try {
      var n = sn;
      for (ve = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      sn = null, fl = !1;
    } catch (i) {
      throw sn !== null && (sn = sn.slice(e + 1)), Wp(ec, Un), i;
    } finally {
      ve = t, nu = !1;
    }
  }
  return null;
}
var Nr = [], br = 0, Ls = null, $s = 0, Et = [], St = 0, nr = null, ln = 1, un = "";
function Vn(e, t) {
  Nr[br++] = $s, Nr[br++] = Ls, Ls = e, $s = t;
}
function _g(e, t, n) {
  Et[St++] = ln, Et[St++] = un, Et[St++] = nr, nr = e;
  var r = ln;
  e = un;
  var i = 32 - Ft(r) - 1;
  r &= ~(1 << i), n += 1;
  var o = 32 - Ft(t) + i;
  if (30 < o) {
    var s = i - i % 5;
    o = (r & (1 << s) - 1).toString(32), r >>= s, i -= s, ln = 1 << 32 - Ft(t) + i | n << i | r, un = o + e;
  } else ln = 1 << o | n << i | r, un = e;
}
function ac(e) {
  e.return !== null && (Vn(e, 1), _g(e, 1, 0));
}
function cc(e) {
  for (; e === Ls; ) Ls = Nr[--br], Nr[br] = null, $s = Nr[--br], Nr[br] = null;
  for (; e === nr; ) nr = Et[--St], Et[St] = null, un = Et[--St], Et[St] = null, ln = Et[--St], Et[St] = null;
}
var pt = null, dt = null, Ce = !1, Rt = null;
function Eg(e, t) {
  var n = kt(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Zf(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, pt = e, dt = Ln(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, pt = e, dt = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = nr !== null ? { id: ln, overflow: un } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = kt(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, pt = e, dt = null, !0) : !1;
    default:
      return !1;
  }
}
function oa(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function sa(e) {
  if (Ce) {
    var t = dt;
    if (t) {
      var n = t;
      if (!Zf(e, t)) {
        if (oa(e)) throw Error(Q(418));
        t = Ln(n.nextSibling);
        var r = pt;
        t && Zf(e, t) ? Eg(r, n) : (e.flags = e.flags & -4097 | 2, Ce = !1, pt = e);
      }
    } else {
      if (oa(e)) throw Error(Q(418));
      e.flags = e.flags & -4097 | 2, Ce = !1, pt = e;
    }
  }
}
function Jf(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  pt = e;
}
function Fo(e) {
  if (e !== pt) return !1;
  if (!Ce) return Jf(e), Ce = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !ta(e.type, e.memoizedProps)), t && (t = dt)) {
    if (oa(e)) throw Sg(), Error(Q(418));
    for (; t; ) Eg(e, t), t = Ln(t.nextSibling);
  }
  if (Jf(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(Q(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              dt = Ln(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      dt = null;
    }
  } else dt = pt ? Ln(e.stateNode.nextSibling) : null;
  return !0;
}
function Sg() {
  for (var e = dt; e; ) e = Ln(e.nextSibling);
}
function Hr() {
  dt = pt = null, Ce = !1;
}
function fc(e) {
  Rt === null ? Rt = [e] : Rt.push(e);
}
var Jx = mn.ReactCurrentBatchConfig;
function di(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(Q(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(Q(147, e));
      var i = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(s) {
        var l = i.refs;
        s === null ? delete l[o] : l[o] = s;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(Q(284));
    if (!n._owner) throw Error(Q(290, e));
  }
  return e;
}
function Do(e, t) {
  throw e = Object.prototype.toString.call(t), Error(Q(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function ed(e) {
  var t = e._init;
  return t(e._payload);
}
function kg(e) {
  function t(p, w) {
    if (e) {
      var v = p.deletions;
      v === null ? (p.deletions = [w], p.flags |= 16) : v.push(w);
    }
  }
  function n(p, w) {
    if (!e) return null;
    for (; w !== null; ) t(p, w), w = w.sibling;
    return null;
  }
  function r(p, w) {
    for (p = /* @__PURE__ */ new Map(); w !== null; ) w.key !== null ? p.set(w.key, w) : p.set(w.index, w), w = w.sibling;
    return p;
  }
  function i(p, w) {
    return p = An(p, w), p.index = 0, p.sibling = null, p;
  }
  function o(p, w, v) {
    return p.index = v, e ? (v = p.alternate, v !== null ? (v = v.index, v < w ? (p.flags |= 2, w) : v) : (p.flags |= 2, w)) : (p.flags |= 1048576, w);
  }
  function s(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function l(p, w, v, _) {
    return w === null || w.tag !== 6 ? (w = au(v, p.mode, _), w.return = p, w) : (w = i(w, v), w.return = p, w);
  }
  function u(p, w, v, _) {
    var C = v.type;
    return C === wr ? c(p, w, v.props.children, _, v.key) : w !== null && (w.elementType === C || typeof C == "object" && C !== null && C.$$typeof === En && ed(C) === w.type) ? (_ = i(w, v.props), _.ref = di(p, w, v), _.return = p, _) : (_ = gs(v.type, v.key, v.props, null, p.mode, _), _.ref = di(p, w, v), _.return = p, _);
  }
  function a(p, w, v, _) {
    return w === null || w.tag !== 4 || w.stateNode.containerInfo !== v.containerInfo || w.stateNode.implementation !== v.implementation ? (w = cu(v, p.mode, _), w.return = p, w) : (w = i(w, v.children || []), w.return = p, w);
  }
  function c(p, w, v, _, C) {
    return w === null || w.tag !== 7 ? (w = Zn(v, p.mode, _, C), w.return = p, w) : (w = i(w, v), w.return = p, w);
  }
  function f(p, w, v) {
    if (typeof w == "string" && w !== "" || typeof w == "number") return w = au("" + w, p.mode, v), w.return = p, w;
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case Po:
          return v = gs(w.type, w.key, w.props, null, p.mode, v), v.ref = di(p, null, w), v.return = p, v;
        case vr:
          return w = cu(w, p.mode, v), w.return = p, w;
        case En:
          var _ = w._init;
          return f(p, _(w._payload), v);
      }
      if (xi(w) || li(w)) return w = Zn(w, p.mode, v, null), w.return = p, w;
      Do(p, w);
    }
    return null;
  }
  function d(p, w, v, _) {
    var C = w !== null ? w.key : null;
    if (typeof v == "string" && v !== "" || typeof v == "number") return C !== null ? null : l(p, w, "" + v, _);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Po:
          return v.key === C ? u(p, w, v, _) : null;
        case vr:
          return v.key === C ? a(p, w, v, _) : null;
        case En:
          return C = v._init, d(
            p,
            w,
            C(v._payload),
            _
          );
      }
      if (xi(v) || li(v)) return C !== null ? null : c(p, w, v, _, null);
      Do(p, v);
    }
    return null;
  }
  function h(p, w, v, _, C) {
    if (typeof _ == "string" && _ !== "" || typeof _ == "number") return p = p.get(v) || null, l(w, p, "" + _, C);
    if (typeof _ == "object" && _ !== null) {
      switch (_.$$typeof) {
        case Po:
          return p = p.get(_.key === null ? v : _.key) || null, u(w, p, _, C);
        case vr:
          return p = p.get(_.key === null ? v : _.key) || null, a(w, p, _, C);
        case En:
          var I = _._init;
          return h(p, w, v, I(_._payload), C);
      }
      if (xi(_) || li(_)) return p = p.get(v) || null, c(w, p, _, C, null);
      Do(w, _);
    }
    return null;
  }
  function g(p, w, v, _) {
    for (var C = null, I = null, P = w, L = w = 0, B = null; P !== null && L < v.length; L++) {
      P.index > L ? (B = P, P = null) : B = P.sibling;
      var V = d(p, P, v[L], _);
      if (V === null) {
        P === null && (P = B);
        break;
      }
      e && P && V.alternate === null && t(p, P), w = o(V, w, L), I === null ? C = V : I.sibling = V, I = V, P = B;
    }
    if (L === v.length) return n(p, P), Ce && Vn(p, L), C;
    if (P === null) {
      for (; L < v.length; L++) P = f(p, v[L], _), P !== null && (w = o(P, w, L), I === null ? C = P : I.sibling = P, I = P);
      return Ce && Vn(p, L), C;
    }
    for (P = r(p, P); L < v.length; L++) B = h(P, p, L, v[L], _), B !== null && (e && B.alternate !== null && P.delete(B.key === null ? L : B.key), w = o(B, w, L), I === null ? C = B : I.sibling = B, I = B);
    return e && P.forEach(function(z) {
      return t(p, z);
    }), Ce && Vn(p, L), C;
  }
  function x(p, w, v, _) {
    var C = li(v);
    if (typeof C != "function") throw Error(Q(150));
    if (v = C.call(v), v == null) throw Error(Q(151));
    for (var I = C = null, P = w, L = w = 0, B = null, V = v.next(); P !== null && !V.done; L++, V = v.next()) {
      P.index > L ? (B = P, P = null) : B = P.sibling;
      var z = d(p, P, V.value, _);
      if (z === null) {
        P === null && (P = B);
        break;
      }
      e && P && z.alternate === null && t(p, P), w = o(z, w, L), I === null ? C = z : I.sibling = z, I = z, P = B;
    }
    if (V.done) return n(
      p,
      P
    ), Ce && Vn(p, L), C;
    if (P === null) {
      for (; !V.done; L++, V = v.next()) V = f(p, V.value, _), V !== null && (w = o(V, w, L), I === null ? C = V : I.sibling = V, I = V);
      return Ce && Vn(p, L), C;
    }
    for (P = r(p, P); !V.done; L++, V = v.next()) V = h(P, p, L, V.value, _), V !== null && (e && V.alternate !== null && P.delete(V.key === null ? L : V.key), w = o(V, w, L), I === null ? C = V : I.sibling = V, I = V);
    return e && P.forEach(function(X) {
      return t(p, X);
    }), Ce && Vn(p, L), C;
  }
  function E(p, w, v, _) {
    if (typeof v == "object" && v !== null && v.type === wr && v.key === null && (v = v.props.children), typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Po:
          e: {
            for (var C = v.key, I = w; I !== null; ) {
              if (I.key === C) {
                if (C = v.type, C === wr) {
                  if (I.tag === 7) {
                    n(p, I.sibling), w = i(I, v.props.children), w.return = p, p = w;
                    break e;
                  }
                } else if (I.elementType === C || typeof C == "object" && C !== null && C.$$typeof === En && ed(C) === I.type) {
                  n(p, I.sibling), w = i(I, v.props), w.ref = di(p, I, v), w.return = p, p = w;
                  break e;
                }
                n(p, I);
                break;
              } else t(p, I);
              I = I.sibling;
            }
            v.type === wr ? (w = Zn(v.props.children, p.mode, _, v.key), w.return = p, p = w) : (_ = gs(v.type, v.key, v.props, null, p.mode, _), _.ref = di(p, w, v), _.return = p, p = _);
          }
          return s(p);
        case vr:
          e: {
            for (I = v.key; w !== null; ) {
              if (w.key === I) if (w.tag === 4 && w.stateNode.containerInfo === v.containerInfo && w.stateNode.implementation === v.implementation) {
                n(p, w.sibling), w = i(w, v.children || []), w.return = p, p = w;
                break e;
              } else {
                n(p, w);
                break;
              }
              else t(p, w);
              w = w.sibling;
            }
            w = cu(v, p.mode, _), w.return = p, p = w;
          }
          return s(p);
        case En:
          return I = v._init, E(p, w, I(v._payload), _);
      }
      if (xi(v)) return g(p, w, v, _);
      if (li(v)) return x(p, w, v, _);
      Do(p, v);
    }
    return typeof v == "string" && v !== "" || typeof v == "number" ? (v = "" + v, w !== null && w.tag === 6 ? (n(p, w.sibling), w = i(w, v), w.return = p, p = w) : (n(p, w), w = au(v, p.mode, _), w.return = p, p = w), s(p)) : n(p, w);
  }
  return E;
}
var Vr = kg(!0), Ng = kg(!1), js = zn(null), Rs = null, Cr = null, dc = null;
function hc() {
  dc = Cr = Rs = null;
}
function pc(e) {
  var t = js.current;
  Se(js), e._currentValue = t;
}
function la(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Or(e, t) {
  Rs = e, dc = Cr = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (it = !0), e.firstContext = null);
}
function bt(e) {
  var t = e._currentValue;
  if (dc !== e) if (e = { context: e, memoizedValue: t, next: null }, Cr === null) {
    if (Rs === null) throw Error(Q(308));
    Cr = e, Rs.dependencies = { lanes: 0, firstContext: e };
  } else Cr = Cr.next = e;
  return t;
}
var Xn = null;
function gc(e) {
  Xn === null ? Xn = [e] : Xn.push(e);
}
function bg(e, t, n, r) {
  var i = t.interleaved;
  return i === null ? (n.next = n, gc(t)) : (n.next = i.next, i.next = n), t.interleaved = n, hn(e, r);
}
function hn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Sn = !1;
function mc(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Cg(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function cn(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function $n(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, pe & 2) {
    var i = r.pending;
    return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, hn(e, n);
  }
  return i = r.interleaved, i === null ? (t.next = t, gc(r)) : (t.next = i.next, i.next = t), r.interleaved = t, hn(e, n);
}
function as(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, tc(e, n);
  }
}
function td(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var i = null, o = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var s = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        o === null ? i = o = s : o = o.next = s, n = n.next;
      } while (n !== null);
      o === null ? i = o = t : o = o.next = t;
    } else i = o = t;
    n = { baseState: r.baseState, firstBaseUpdate: i, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function As(e, t, n, r) {
  var i = e.updateQueue;
  Sn = !1;
  var o = i.firstBaseUpdate, s = i.lastBaseUpdate, l = i.shared.pending;
  if (l !== null) {
    i.shared.pending = null;
    var u = l, a = u.next;
    u.next = null, s === null ? o = a : s.next = a, s = u;
    var c = e.alternate;
    c !== null && (c = c.updateQueue, l = c.lastBaseUpdate, l !== s && (l === null ? c.firstBaseUpdate = a : l.next = a, c.lastBaseUpdate = u));
  }
  if (o !== null) {
    var f = i.baseState;
    s = 0, c = a = u = null, l = o;
    do {
      var d = l.lane, h = l.eventTime;
      if ((r & d) === d) {
        c !== null && (c = c.next = {
          eventTime: h,
          lane: 0,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null
        });
        e: {
          var g = e, x = l;
          switch (d = t, h = n, x.tag) {
            case 1:
              if (g = x.payload, typeof g == "function") {
                f = g.call(h, f, d);
                break e;
              }
              f = g;
              break e;
            case 3:
              g.flags = g.flags & -65537 | 128;
            case 0:
              if (g = x.payload, d = typeof g == "function" ? g.call(h, f, d) : g, d == null) break e;
              f = Me({}, f, d);
              break e;
            case 2:
              Sn = !0;
          }
        }
        l.callback !== null && l.lane !== 0 && (e.flags |= 64, d = i.effects, d === null ? i.effects = [l] : d.push(l));
      } else h = { eventTime: h, lane: d, tag: l.tag, payload: l.payload, callback: l.callback, next: null }, c === null ? (a = c = h, u = f) : c = c.next = h, s |= d;
      if (l = l.next, l === null) {
        if (l = i.shared.pending, l === null) break;
        d = l, l = d.next, d.next = null, i.lastBaseUpdate = d, i.shared.pending = null;
      }
    } while (!0);
    if (c === null && (u = f), i.baseState = u, i.firstBaseUpdate = a, i.lastBaseUpdate = c, t = i.shared.interleaved, t !== null) {
      i = t;
      do
        s |= i.lane, i = i.next;
      while (i !== t);
    } else o === null && (i.shared.lanes = 0);
    ir |= s, e.lanes = s, e.memoizedState = f;
  }
}
function nd(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], i = r.callback;
    if (i !== null) {
      if (r.callback = null, r = n, typeof i != "function") throw Error(Q(191, i));
      i.call(r);
    }
  }
}
var yo = {}, Zt = zn(yo), Qi = zn(yo), Ki = zn(yo);
function Qn(e) {
  if (e === yo) throw Error(Q(174));
  return e;
}
function yc(e, t) {
  switch (_e(Ki, t), _e(Qi, e), _e(Zt, yo), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : zu(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = zu(t, e);
  }
  Se(Zt), _e(Zt, t);
}
function Wr() {
  Se(Zt), Se(Qi), Se(Ki);
}
function Ig(e) {
  Qn(Ki.current);
  var t = Qn(Zt.current), n = zu(t, e.type);
  t !== n && (_e(Qi, e), _e(Zt, n));
}
function vc(e) {
  Qi.current === e && (Se(Zt), Se(Qi));
}
var Ie = zn(0);
function Os(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var ru = [];
function wc() {
  for (var e = 0; e < ru.length; e++) ru[e]._workInProgressVersionPrimary = null;
  ru.length = 0;
}
var cs = mn.ReactCurrentDispatcher, iu = mn.ReactCurrentBatchConfig, rr = 0, Pe = null, Oe = null, Fe = null, Bs = !1, Li = !1, qi = 0, e_ = 0;
function We() {
  throw Error(Q(321));
}
function xc(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!zt(e[n], t[n])) return !1;
  return !0;
}
function _c(e, t, n, r, i, o) {
  if (rr = o, Pe = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, cs.current = e === null || e.memoizedState === null ? i_ : o_, e = n(r, i), Li) {
    o = 0;
    do {
      if (Li = !1, qi = 0, 25 <= o) throw Error(Q(301));
      o += 1, Fe = Oe = null, t.updateQueue = null, cs.current = s_, e = n(r, i);
    } while (Li);
  }
  if (cs.current = Fs, t = Oe !== null && Oe.next !== null, rr = 0, Fe = Oe = Pe = null, Bs = !1, t) throw Error(Q(300));
  return e;
}
function Ec() {
  var e = qi !== 0;
  return qi = 0, e;
}
function Yt() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return Fe === null ? Pe.memoizedState = Fe = e : Fe = Fe.next = e, Fe;
}
function Ct() {
  if (Oe === null) {
    var e = Pe.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Oe.next;
  var t = Fe === null ? Pe.memoizedState : Fe.next;
  if (t !== null) Fe = t, Oe = e;
  else {
    if (e === null) throw Error(Q(310));
    Oe = e, e = { memoizedState: Oe.memoizedState, baseState: Oe.baseState, baseQueue: Oe.baseQueue, queue: Oe.queue, next: null }, Fe === null ? Pe.memoizedState = Fe = e : Fe = Fe.next = e;
  }
  return Fe;
}
function Zi(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ou(e) {
  var t = Ct(), n = t.queue;
  if (n === null) throw Error(Q(311));
  n.lastRenderedReducer = e;
  var r = Oe, i = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (i !== null) {
      var s = i.next;
      i.next = o.next, o.next = s;
    }
    r.baseQueue = i = o, n.pending = null;
  }
  if (i !== null) {
    o = i.next, r = r.baseState;
    var l = s = null, u = null, a = o;
    do {
      var c = a.lane;
      if ((rr & c) === c) u !== null && (u = u.next = { lane: 0, action: a.action, hasEagerState: a.hasEagerState, eagerState: a.eagerState, next: null }), r = a.hasEagerState ? a.eagerState : e(r, a.action);
      else {
        var f = {
          lane: c,
          action: a.action,
          hasEagerState: a.hasEagerState,
          eagerState: a.eagerState,
          next: null
        };
        u === null ? (l = u = f, s = r) : u = u.next = f, Pe.lanes |= c, ir |= c;
      }
      a = a.next;
    } while (a !== null && a !== o);
    u === null ? s = r : u.next = l, zt(r, t.memoizedState) || (it = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    i = e;
    do
      o = i.lane, Pe.lanes |= o, ir |= o, i = i.next;
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function su(e) {
  var t = Ct(), n = t.queue;
  if (n === null) throw Error(Q(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, i = n.pending, o = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var s = i = i.next;
    do
      o = e(o, s.action), s = s.next;
    while (s !== i);
    zt(o, t.memoizedState) || (it = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function Pg() {
}
function Mg(e, t) {
  var n = Pe, r = Ct(), i = t(), o = !zt(r.memoizedState, i);
  if (o && (r.memoizedState = i, it = !0), r = r.queue, Sc($g.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || Fe !== null && Fe.memoizedState.tag & 1) {
    if (n.flags |= 2048, Ji(9, Lg.bind(null, n, r, i, t), void 0, null), De === null) throw Error(Q(349));
    rr & 30 || Tg(n, t, i);
  }
  return i;
}
function Tg(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Pe.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Pe.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Lg(e, t, n, r) {
  t.value = n, t.getSnapshot = r, jg(t) && Rg(e);
}
function $g(e, t, n) {
  return n(function() {
    jg(t) && Rg(e);
  });
}
function jg(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !zt(e, n);
  } catch {
    return !0;
  }
}
function Rg(e) {
  var t = hn(e, 1);
  t !== null && Dt(t, e, 1, -1);
}
function rd(e) {
  var t = Yt();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Zi, lastRenderedState: e }, t.queue = e, e = e.dispatch = r_.bind(null, Pe, e), [t.memoizedState, e];
}
function Ji(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Pe.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Pe.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ag() {
  return Ct().memoizedState;
}
function fs(e, t, n, r) {
  var i = Yt();
  Pe.flags |= e, i.memoizedState = Ji(1 | t, n, void 0, r === void 0 ? null : r);
}
function dl(e, t, n, r) {
  var i = Ct();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (Oe !== null) {
    var s = Oe.memoizedState;
    if (o = s.destroy, r !== null && xc(r, s.deps)) {
      i.memoizedState = Ji(t, n, o, r);
      return;
    }
  }
  Pe.flags |= e, i.memoizedState = Ji(1 | t, n, o, r);
}
function id(e, t) {
  return fs(8390656, 8, e, t);
}
function Sc(e, t) {
  return dl(2048, 8, e, t);
}
function Og(e, t) {
  return dl(4, 2, e, t);
}
function Bg(e, t) {
  return dl(4, 4, e, t);
}
function Fg(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Dg(e, t, n) {
  return n = n != null ? n.concat([e]) : null, dl(4, 4, Fg.bind(null, t, e), n);
}
function kc() {
}
function zg(e, t) {
  var n = Ct();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && xc(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Ug(e, t) {
  var n = Ct();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && xc(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Hg(e, t, n) {
  return rr & 21 ? (zt(n, t) || (n = Xp(), Pe.lanes |= n, ir |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, it = !0), e.memoizedState = n);
}
function t_(e, t) {
  var n = ve;
  ve = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = iu.transition;
  iu.transition = {};
  try {
    e(!1), t();
  } finally {
    ve = n, iu.transition = r;
  }
}
function Vg() {
  return Ct().memoizedState;
}
function n_(e, t, n) {
  var r = Rn(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Wg(e)) Yg(t, n);
  else if (n = bg(e, t, n, r), n !== null) {
    var i = qe();
    Dt(n, e, r, i), Gg(n, t, r);
  }
}
function r_(e, t, n) {
  var r = Rn(e), i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Wg(e)) Yg(t, i);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var s = t.lastRenderedState, l = o(s, n);
      if (i.hasEagerState = !0, i.eagerState = l, zt(l, s)) {
        var u = t.interleaved;
        u === null ? (i.next = i, gc(t)) : (i.next = u.next, u.next = i), t.interleaved = i;
        return;
      }
    } catch {
    } finally {
    }
    n = bg(e, t, i, r), n !== null && (i = qe(), Dt(n, e, r, i), Gg(n, t, r));
  }
}
function Wg(e) {
  var t = e.alternate;
  return e === Pe || t !== null && t === Pe;
}
function Yg(e, t) {
  Li = Bs = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Gg(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, tc(e, n);
  }
}
var Fs = { readContext: bt, useCallback: We, useContext: We, useEffect: We, useImperativeHandle: We, useInsertionEffect: We, useLayoutEffect: We, useMemo: We, useReducer: We, useRef: We, useState: We, useDebugValue: We, useDeferredValue: We, useTransition: We, useMutableSource: We, useSyncExternalStore: We, useId: We, unstable_isNewReconciler: !1 }, i_ = { readContext: bt, useCallback: function(e, t) {
  return Yt().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: bt, useEffect: id, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, fs(
    4194308,
    4,
    Fg.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return fs(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return fs(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Yt();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Yt();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = n_.bind(null, Pe, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Yt();
  return e = { current: e }, t.memoizedState = e;
}, useState: rd, useDebugValue: kc, useDeferredValue: function(e) {
  return Yt().memoizedState = e;
}, useTransition: function() {
  var e = rd(!1), t = e[0];
  return e = t_.bind(null, e[1]), Yt().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Pe, i = Yt();
  if (Ce) {
    if (n === void 0) throw Error(Q(407));
    n = n();
  } else {
    if (n = t(), De === null) throw Error(Q(349));
    rr & 30 || Tg(r, t, n);
  }
  i.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return i.queue = o, id($g.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Ji(9, Lg.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Yt(), t = De.identifierPrefix;
  if (Ce) {
    var n = un, r = ln;
    n = (r & ~(1 << 32 - Ft(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = qi++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = e_++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, o_ = {
  readContext: bt,
  useCallback: zg,
  useContext: bt,
  useEffect: Sc,
  useImperativeHandle: Dg,
  useInsertionEffect: Og,
  useLayoutEffect: Bg,
  useMemo: Ug,
  useReducer: ou,
  useRef: Ag,
  useState: function() {
    return ou(Zi);
  },
  useDebugValue: kc,
  useDeferredValue: function(e) {
    var t = Ct();
    return Hg(t, Oe.memoizedState, e);
  },
  useTransition: function() {
    var e = ou(Zi)[0], t = Ct().memoizedState;
    return [e, t];
  },
  useMutableSource: Pg,
  useSyncExternalStore: Mg,
  useId: Vg,
  unstable_isNewReconciler: !1
}, s_ = { readContext: bt, useCallback: zg, useContext: bt, useEffect: Sc, useImperativeHandle: Dg, useInsertionEffect: Og, useLayoutEffect: Bg, useMemo: Ug, useReducer: su, useRef: Ag, useState: function() {
  return su(Zi);
}, useDebugValue: kc, useDeferredValue: function(e) {
  var t = Ct();
  return Oe === null ? t.memoizedState = e : Hg(t, Oe.memoizedState, e);
}, useTransition: function() {
  var e = su(Zi)[0], t = Ct().memoizedState;
  return [e, t];
}, useMutableSource: Pg, useSyncExternalStore: Mg, useId: Vg, unstable_isNewReconciler: !1 };
function Lt(e, t) {
  if (e && e.defaultProps) {
    t = Me({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function ua(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : Me({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var hl = { isMounted: function(e) {
  return (e = e._reactInternals) ? dr(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = qe(), i = Rn(e), o = cn(r, i);
  o.payload = t, n != null && (o.callback = n), t = $n(e, o, i), t !== null && (Dt(t, e, i, r), as(t, e, i));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = qe(), i = Rn(e), o = cn(r, i);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = $n(e, o, i), t !== null && (Dt(t, e, i, r), as(t, e, i));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = qe(), r = Rn(e), i = cn(n, r);
  i.tag = 2, t != null && (i.callback = t), t = $n(e, i, r), t !== null && (Dt(t, e, r, n), as(t, e, r));
} };
function od(e, t, n, r, i, o, s) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, s) : t.prototype && t.prototype.isPureReactComponent ? !Wi(n, r) || !Wi(i, o) : !0;
}
function Xg(e, t, n) {
  var r = !1, i = Fn, o = t.contextType;
  return typeof o == "object" && o !== null ? o = bt(o) : (i = lt(t) ? tr : Qe.current, r = t.contextTypes, o = (r = r != null) ? Ur(e, i) : Fn), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = hl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function sd(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && hl.enqueueReplaceState(t, t.state, null);
}
function aa(e, t, n, r) {
  var i = e.stateNode;
  i.props = n, i.state = e.memoizedState, i.refs = {}, mc(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? i.context = bt(o) : (o = lt(t) ? tr : Qe.current, i.context = Ur(e, o)), i.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (ua(e, t, o, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && hl.enqueueReplaceState(i, i.state, null), As(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function Yr(e, t) {
  try {
    var n = "", r = t;
    do
      n += jw(r), r = r.return;
    while (r);
    var i = n;
  } catch (o) {
    i = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function lu(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function ca(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var l_ = typeof WeakMap == "function" ? WeakMap : Map;
function Qg(e, t, n) {
  n = cn(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    zs || (zs = !0, xa = r), ca(e, t);
  }, n;
}
function Kg(e, t, n) {
  n = cn(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    n.payload = function() {
      return r(i);
    }, n.callback = function() {
      ca(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    ca(e, t), typeof r != "function" && (jn === null ? jn = /* @__PURE__ */ new Set([this]) : jn.add(this));
    var s = t.stack;
    this.componentDidCatch(t.value, { componentStack: s !== null ? s : "" });
  }), n;
}
function ld(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new l_();
    var i = /* @__PURE__ */ new Set();
    r.set(t, i);
  } else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
  i.has(n) || (i.add(n), e = __.bind(null, e, t, n), t.then(e, e));
}
function ud(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function ad(e, t, n, r, i) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = cn(-1, 1), t.tag = 2, $n(n, t, 1))), n.lanes |= 1), e);
}
var u_ = mn.ReactCurrentOwner, it = !1;
function Ke(e, t, n, r) {
  t.child = e === null ? Ng(t, null, n, r) : Vr(t, e.child, n, r);
}
function cd(e, t, n, r, i) {
  n = n.render;
  var o = t.ref;
  return Or(t, i), r = _c(e, t, n, r, o, i), n = Ec(), e !== null && !it ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, pn(e, t, i)) : (Ce && n && ac(t), t.flags |= 1, Ke(e, t, r, i), t.child);
}
function fd(e, t, n, r, i) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Lc(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, qg(e, t, o, r, i)) : (e = gs(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & i)) {
    var s = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Wi, n(s, r) && e.ref === t.ref) return pn(e, t, i);
  }
  return t.flags |= 1, e = An(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function qg(e, t, n, r, i) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Wi(o, r) && e.ref === t.ref) if (it = !1, t.pendingProps = r = o, (e.lanes & i) !== 0) e.flags & 131072 && (it = !0);
    else return t.lanes = e.lanes, pn(e, t, i);
  }
  return fa(e, t, n, r, i);
}
function Zg(e, t, n) {
  var r = t.pendingProps, i = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, _e(Pr, ct), ct |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, _e(Pr, ct), ct |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, _e(Pr, ct), ct |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, _e(Pr, ct), ct |= r;
  return Ke(e, t, i, n), t.child;
}
function Jg(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function fa(e, t, n, r, i) {
  var o = lt(n) ? tr : Qe.current;
  return o = Ur(t, o), Or(t, i), n = _c(e, t, n, r, o, i), r = Ec(), e !== null && !it ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, pn(e, t, i)) : (Ce && r && ac(t), t.flags |= 1, Ke(e, t, n, i), t.child);
}
function dd(e, t, n, r, i) {
  if (lt(n)) {
    var o = !0;
    Ts(t);
  } else o = !1;
  if (Or(t, i), t.stateNode === null) ds(e, t), Xg(t, n, r), aa(t, n, r, i), r = !0;
  else if (e === null) {
    var s = t.stateNode, l = t.memoizedProps;
    s.props = l;
    var u = s.context, a = n.contextType;
    typeof a == "object" && a !== null ? a = bt(a) : (a = lt(n) ? tr : Qe.current, a = Ur(t, a));
    var c = n.getDerivedStateFromProps, f = typeof c == "function" || typeof s.getSnapshotBeforeUpdate == "function";
    f || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (l !== r || u !== a) && sd(t, s, r, a), Sn = !1;
    var d = t.memoizedState;
    s.state = d, As(t, r, s, i), u = t.memoizedState, l !== r || d !== u || st.current || Sn ? (typeof c == "function" && (ua(t, n, c, r), u = t.memoizedState), (l = Sn || od(t, n, l, r, d, u, a)) ? (f || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), s.props = r, s.state = u, s.context = a, r = l) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    s = t.stateNode, Cg(e, t), l = t.memoizedProps, a = t.type === t.elementType ? l : Lt(t.type, l), s.props = a, f = t.pendingProps, d = s.context, u = n.contextType, typeof u == "object" && u !== null ? u = bt(u) : (u = lt(n) ? tr : Qe.current, u = Ur(t, u));
    var h = n.getDerivedStateFromProps;
    (c = typeof h == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (l !== f || d !== u) && sd(t, s, r, u), Sn = !1, d = t.memoizedState, s.state = d, As(t, r, s, i);
    var g = t.memoizedState;
    l !== f || d !== g || st.current || Sn ? (typeof h == "function" && (ua(t, n, h, r), g = t.memoizedState), (a = Sn || od(t, n, a, r, d, g, u) || !1) ? (c || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, g, u), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, g, u)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = g), s.props = r, s.state = g, s.context = u, r = a) : (typeof s.componentDidUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return da(e, t, n, r, o, i);
}
function da(e, t, n, r, i, o) {
  Jg(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return i && qf(t, n, !1), pn(e, t, o);
  r = t.stateNode, u_.current = t;
  var l = s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && s ? (t.child = Vr(t, e.child, null, o), t.child = Vr(t, null, l, o)) : Ke(e, t, l, o), t.memoizedState = r.state, i && qf(t, n, !0), t.child;
}
function e0(e) {
  var t = e.stateNode;
  t.pendingContext ? Kf(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Kf(e, t.context, !1), yc(e, t.containerInfo);
}
function hd(e, t, n, r, i) {
  return Hr(), fc(i), t.flags |= 256, Ke(e, t, n, r), t.child;
}
var ha = { dehydrated: null, treeContext: null, retryLane: 0 };
function pa(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function t0(e, t, n) {
  var r = t.pendingProps, i = Ie.current, o = !1, s = (t.flags & 128) !== 0, l;
  if ((l = s) || (l = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), l ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), _e(Ie, i & 1), e === null)
    return sa(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, s = { mode: "hidden", children: s }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = s) : o = ml(s, r, 0, null), e = Zn(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = pa(n), t.memoizedState = ha, e) : Nc(t, s));
  if (i = e.memoizedState, i !== null && (l = i.dehydrated, l !== null)) return a_(e, t, s, r, l, i, n);
  if (o) {
    o = r.fallback, s = t.mode, i = e.child, l = i.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(s & 1) && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = An(i, u), r.subtreeFlags = i.subtreeFlags & 14680064), l !== null ? o = An(l, o) : (o = Zn(o, s, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, s = e.child.memoizedState, s = s === null ? pa(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }, o.memoizedState = s, o.childLanes = e.childLanes & ~n, t.memoizedState = ha, r;
  }
  return o = e.child, e = o.sibling, r = An(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Nc(e, t) {
  return t = ml({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function zo(e, t, n, r) {
  return r !== null && fc(r), Vr(t, e.child, null, n), e = Nc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function a_(e, t, n, r, i, o, s) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = lu(Error(Q(422))), zo(e, t, s, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, i = t.mode, r = ml({ mode: "visible", children: r.children }, i, 0, null), o = Zn(o, i, s, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Vr(t, e.child, null, s), t.child.memoizedState = pa(s), t.memoizedState = ha, o);
  if (!(t.mode & 1)) return zo(e, t, s, null);
  if (i.data === "$!") {
    if (r = i.nextSibling && i.nextSibling.dataset, r) var l = r.dgst;
    return r = l, o = Error(Q(419)), r = lu(o, r, void 0), zo(e, t, s, r);
  }
  if (l = (s & e.childLanes) !== 0, it || l) {
    if (r = De, r !== null) {
      switch (s & -s) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      i = i & (r.suspendedLanes | s) ? 0 : i, i !== 0 && i !== o.retryLane && (o.retryLane = i, hn(e, i), Dt(r, e, i, -1));
    }
    return Tc(), r = lu(Error(Q(421))), zo(e, t, s, r);
  }
  return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = E_.bind(null, e), i._reactRetry = t, null) : (e = o.treeContext, dt = Ln(i.nextSibling), pt = t, Ce = !0, Rt = null, e !== null && (Et[St++] = ln, Et[St++] = un, Et[St++] = nr, ln = e.id, un = e.overflow, nr = t), t = Nc(t, r.children), t.flags |= 4096, t);
}
function pd(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), la(e.return, t, n);
}
function uu(e, t, n, r, i) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: i } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i);
}
function n0(e, t, n) {
  var r = t.pendingProps, i = r.revealOrder, o = r.tail;
  if (Ke(e, t, r.children, n), r = Ie.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && pd(e, n, t);
      else if (e.tag === 19) pd(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    r &= 1;
  }
  if (_e(Ie, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (i) {
    case "forwards":
      for (n = t.child, i = null; n !== null; ) e = n.alternate, e !== null && Os(e) === null && (i = n), n = n.sibling;
      n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), uu(t, !1, i, n, o);
      break;
    case "backwards":
      for (n = null, i = t.child, t.child = null; i !== null; ) {
        if (e = i.alternate, e !== null && Os(e) === null) {
          t.child = i;
          break;
        }
        e = i.sibling, i.sibling = n, n = i, i = e;
      }
      uu(t, !0, n, null, o);
      break;
    case "together":
      uu(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function ds(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function pn(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), ir |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(Q(153));
  if (t.child !== null) {
    for (e = t.child, n = An(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = An(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function c_(e, t, n) {
  switch (t.tag) {
    case 3:
      e0(t), Hr();
      break;
    case 5:
      Ig(t);
      break;
    case 1:
      lt(t.type) && Ts(t);
      break;
    case 4:
      yc(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, i = t.memoizedProps.value;
      _e(js, r._currentValue), r._currentValue = i;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (_e(Ie, Ie.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? t0(e, t, n) : (_e(Ie, Ie.current & 1), e = pn(e, t, n), e !== null ? e.sibling : null);
      _e(Ie, Ie.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return n0(e, t, n);
        t.flags |= 128;
      }
      if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), _e(Ie, Ie.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Zg(e, t, n);
  }
  return pn(e, t, n);
}
var r0, ga, i0, o0;
r0 = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
ga = function() {
};
i0 = function(e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    e = t.stateNode, Qn(Zt.current);
    var o = null;
    switch (n) {
      case "input":
        i = Ou(e, i), r = Ou(e, r), o = [];
        break;
      case "select":
        i = Me({}, i, { value: void 0 }), r = Me({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        i = Du(e, i), r = Du(e, r), o = [];
        break;
      default:
        typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Ps);
    }
    Uu(n, r);
    var s;
    n = null;
    for (a in i) if (!r.hasOwnProperty(a) && i.hasOwnProperty(a) && i[a] != null) if (a === "style") {
      var l = i[a];
      for (s in l) l.hasOwnProperty(s) && (n || (n = {}), n[s] = "");
    } else a !== "dangerouslySetInnerHTML" && a !== "children" && a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && a !== "autoFocus" && (Bi.hasOwnProperty(a) ? o || (o = []) : (o = o || []).push(a, null));
    for (a in r) {
      var u = r[a];
      if (l = i != null ? i[a] : void 0, r.hasOwnProperty(a) && u !== l && (u != null || l != null)) if (a === "style") if (l) {
        for (s in l) !l.hasOwnProperty(s) || u && u.hasOwnProperty(s) || (n || (n = {}), n[s] = "");
        for (s in u) u.hasOwnProperty(s) && l[s] !== u[s] && (n || (n = {}), n[s] = u[s]);
      } else n || (o || (o = []), o.push(
        a,
        n
      )), n = u;
      else a === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, l = l ? l.__html : void 0, u != null && l !== u && (o = o || []).push(a, u)) : a === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(a, "" + u) : a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && (Bi.hasOwnProperty(a) ? (u != null && a === "onScroll" && Ee("scroll", e), o || l === u || (o = [])) : (o = o || []).push(a, u));
    }
    n && (o = o || []).push("style", n);
    var a = o;
    (t.updateQueue = a) && (t.flags |= 4);
  }
};
o0 = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function hi(e, t) {
  if (!Ce) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
  }
}
function Ye(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var i = e.child; i !== null; ) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
  else for (i = e.child; i !== null; ) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function f_(e, t, n) {
  var r = t.pendingProps;
  switch (cc(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Ye(t), null;
    case 1:
      return lt(t.type) && Ms(), Ye(t), null;
    case 3:
      return r = t.stateNode, Wr(), Se(st), Se(Qe), wc(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Fo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Rt !== null && (Sa(Rt), Rt = null))), ga(e, t), Ye(t), null;
    case 5:
      vc(t);
      var i = Qn(Ki.current);
      if (n = t.type, e !== null && t.stateNode != null) i0(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(Q(166));
          return Ye(t), null;
        }
        if (e = Qn(Zt.current), Fo(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Xt] = t, r[Xi] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              Ee("cancel", r), Ee("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              Ee("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < Ei.length; i++) Ee(Ei[i], r);
              break;
            case "source":
              Ee("error", r);
              break;
            case "img":
            case "image":
            case "link":
              Ee(
                "error",
                r
              ), Ee("load", r);
              break;
            case "details":
              Ee("toggle", r);
              break;
            case "input":
              Sf(r, o), Ee("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, Ee("invalid", r);
              break;
            case "textarea":
              Nf(r, o), Ee("invalid", r);
          }
          Uu(n, o), i = null;
          for (var s in o) if (o.hasOwnProperty(s)) {
            var l = o[s];
            s === "children" ? typeof l == "string" ? r.textContent !== l && (o.suppressHydrationWarning !== !0 && Bo(r.textContent, l, e), i = ["children", l]) : typeof l == "number" && r.textContent !== "" + l && (o.suppressHydrationWarning !== !0 && Bo(
              r.textContent,
              l,
              e
            ), i = ["children", "" + l]) : Bi.hasOwnProperty(s) && l != null && s === "onScroll" && Ee("scroll", r);
          }
          switch (n) {
            case "input":
              Mo(r), kf(r, o, !0);
              break;
            case "textarea":
              Mo(r), bf(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Ps);
          }
          r = i, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          s = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = $p(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = s.createElement(n, { is: r.is }) : (e = s.createElement(n), n === "select" && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), e[Xt] = t, e[Xi] = r, r0(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (s = Hu(n, r), n) {
              case "dialog":
                Ee("cancel", e), Ee("close", e), i = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                Ee("load", e), i = r;
                break;
              case "video":
              case "audio":
                for (i = 0; i < Ei.length; i++) Ee(Ei[i], e);
                i = r;
                break;
              case "source":
                Ee("error", e), i = r;
                break;
              case "img":
              case "image":
              case "link":
                Ee(
                  "error",
                  e
                ), Ee("load", e), i = r;
                break;
              case "details":
                Ee("toggle", e), i = r;
                break;
              case "input":
                Sf(e, r), i = Ou(e, r), Ee("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, i = Me({}, r, { value: void 0 }), Ee("invalid", e);
                break;
              case "textarea":
                Nf(e, r), i = Du(e, r), Ee("invalid", e);
                break;
              default:
                i = r;
            }
            Uu(n, i), l = i;
            for (o in l) if (l.hasOwnProperty(o)) {
              var u = l[o];
              o === "style" ? Ap(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && jp(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Fi(e, u) : typeof u == "number" && Fi(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Bi.hasOwnProperty(o) ? u != null && o === "onScroll" && Ee("scroll", e) : u != null && Qa(e, o, u, s));
            }
            switch (n) {
              case "input":
                Mo(e), kf(e, r, !1);
                break;
              case "textarea":
                Mo(e), bf(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Bn(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? $r(e, !!r.multiple, o, !1) : r.defaultValue != null && $r(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = Ps);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return Ye(t), null;
    case 6:
      if (e && t.stateNode != null) o0(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(Q(166));
        if (n = Qn(Ki.current), Qn(Zt.current), Fo(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Xt] = t, (o = r.nodeValue !== n) && (e = pt, e !== null)) switch (e.tag) {
            case 3:
              Bo(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Bo(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Xt] = t, t.stateNode = r;
      }
      return Ye(t), null;
    case 13:
      if (Se(Ie), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Ce && dt !== null && t.mode & 1 && !(t.flags & 128)) Sg(), Hr(), t.flags |= 98560, o = !1;
        else if (o = Fo(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(Q(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(Q(317));
            o[Xt] = t;
          } else Hr(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          Ye(t), o = !1;
        } else Rt !== null && (Sa(Rt), Rt = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Ie.current & 1 ? Be === 0 && (Be = 3) : Tc())), t.updateQueue !== null && (t.flags |= 4), Ye(t), null);
    case 4:
      return Wr(), ga(e, t), e === null && Yi(t.stateNode.containerInfo), Ye(t), null;
    case 10:
      return pc(t.type._context), Ye(t), null;
    case 17:
      return lt(t.type) && Ms(), Ye(t), null;
    case 19:
      if (Se(Ie), o = t.memoizedState, o === null) return Ye(t), null;
      if (r = (t.flags & 128) !== 0, s = o.rendering, s === null) if (r) hi(o, !1);
      else {
        if (Be !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (s = Os(e), s !== null) {
            for (t.flags |= 128, hi(o, !1), r = s.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, s = o.alternate, s === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = s.childLanes, o.lanes = s.lanes, o.child = s.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = s.memoizedProps, o.memoizedState = s.memoizedState, o.updateQueue = s.updateQueue, o.type = s.type, e = s.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return _e(Ie, Ie.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && $e() > Gr && (t.flags |= 128, r = !0, hi(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Os(s), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), hi(o, !0), o.tail === null && o.tailMode === "hidden" && !s.alternate && !Ce) return Ye(t), null;
        } else 2 * $e() - o.renderingStartTime > Gr && n !== 1073741824 && (t.flags |= 128, r = !0, hi(o, !1), t.lanes = 4194304);
        o.isBackwards ? (s.sibling = t.child, t.child = s) : (n = o.last, n !== null ? n.sibling = s : t.child = s, o.last = s);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = $e(), t.sibling = null, n = Ie.current, _e(Ie, r ? n & 1 | 2 : n & 1), t) : (Ye(t), null);
    case 22:
    case 23:
      return Mc(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ct & 1073741824 && (Ye(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ye(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(Q(156, t.tag));
}
function d_(e, t) {
  switch (cc(t), t.tag) {
    case 1:
      return lt(t.type) && Ms(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Wr(), Se(st), Se(Qe), wc(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return vc(t), null;
    case 13:
      if (Se(Ie), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(Q(340));
        Hr();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Se(Ie), null;
    case 4:
      return Wr(), null;
    case 10:
      return pc(t.type._context), null;
    case 22:
    case 23:
      return Mc(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Uo = !1, Ge = !1, h_ = typeof WeakSet == "function" ? WeakSet : Set, ee = null;
function Ir(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    Le(e, t, r);
  }
  else n.current = null;
}
function ma(e, t, n) {
  try {
    n();
  } catch (r) {
    Le(e, t, r);
  }
}
var gd = !1;
function p_(e, t) {
  if (Ju = bs, e = cg(), uc(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var i = r.anchorOffset, o = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, o.nodeType;
        } catch {
          n = null;
          break e;
        }
        var s = 0, l = -1, u = -1, a = 0, c = 0, f = e, d = null;
        t: for (; ; ) {
          for (var h; f !== n || i !== 0 && f.nodeType !== 3 || (l = s + i), f !== o || r !== 0 && f.nodeType !== 3 || (u = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (h = f.firstChild) !== null; )
            d = f, f = h;
          for (; ; ) {
            if (f === e) break t;
            if (d === n && ++a === i && (l = s), d === o && ++c === r && (u = s), (h = f.nextSibling) !== null) break;
            f = d, d = f.parentNode;
          }
          f = h;
        }
        n = l === -1 || u === -1 ? null : { start: l, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (ea = { focusedElem: e, selectionRange: n }, bs = !1, ee = t; ee !== null; ) if (t = ee, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, ee = e;
  else for (; ee !== null; ) {
    t = ee;
    try {
      var g = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (g !== null) {
            var x = g.memoizedProps, E = g.memoizedState, p = t.stateNode, w = p.getSnapshotBeforeUpdate(t.elementType === t.type ? x : Lt(t.type, x), E);
            p.__reactInternalSnapshotBeforeUpdate = w;
          }
          break;
        case 3:
          var v = t.stateNode.containerInfo;
          v.nodeType === 1 ? v.textContent = "" : v.nodeType === 9 && v.documentElement && v.removeChild(v.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(Q(163));
      }
    } catch (_) {
      Le(t, t.return, _);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, ee = e;
      break;
    }
    ee = t.return;
  }
  return g = gd, gd = !1, g;
}
function $i(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var i = r = r.next;
    do {
      if ((i.tag & e) === e) {
        var o = i.destroy;
        i.destroy = void 0, o !== void 0 && ma(t, n, o);
      }
      i = i.next;
    } while (i !== r);
  }
}
function pl(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function ya(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function s0(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, s0(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Xt], delete t[Xi], delete t[ra], delete t[Kx], delete t[qx])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function l0(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function md(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || l0(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function va(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ps));
  else if (r !== 4 && (e = e.child, e !== null)) for (va(e, t, n), e = e.sibling; e !== null; ) va(e, t, n), e = e.sibling;
}
function wa(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (wa(e, t, n), e = e.sibling; e !== null; ) wa(e, t, n), e = e.sibling;
}
var ze = null, $t = !1;
function vn(e, t, n) {
  for (n = n.child; n !== null; ) u0(e, t, n), n = n.sibling;
}
function u0(e, t, n) {
  if (qt && typeof qt.onCommitFiberUnmount == "function") try {
    qt.onCommitFiberUnmount(sl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      Ge || Ir(n, t);
    case 6:
      var r = ze, i = $t;
      ze = null, vn(e, t, n), ze = r, $t = i, ze !== null && ($t ? (e = ze, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ze.removeChild(n.stateNode));
      break;
    case 18:
      ze !== null && ($t ? (e = ze, n = n.stateNode, e.nodeType === 8 ? tu(e.parentNode, n) : e.nodeType === 1 && tu(e, n), Hi(e)) : tu(ze, n.stateNode));
      break;
    case 4:
      r = ze, i = $t, ze = n.stateNode.containerInfo, $t = !0, vn(e, t, n), ze = r, $t = i;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Ge && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        i = r = r.next;
        do {
          var o = i, s = o.destroy;
          o = o.tag, s !== void 0 && (o & 2 || o & 4) && ma(n, t, s), i = i.next;
        } while (i !== r);
      }
      vn(e, t, n);
      break;
    case 1:
      if (!Ge && (Ir(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (l) {
        Le(n, t, l);
      }
      vn(e, t, n);
      break;
    case 21:
      vn(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (Ge = (r = Ge) || n.memoizedState !== null, vn(e, t, n), Ge = r) : vn(e, t, n);
      break;
    default:
      vn(e, t, n);
  }
}
function yd(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new h_()), t.forEach(function(r) {
      var i = S_.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(i, i));
    });
  }
}
function Tt(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var i = n[r];
    try {
      var o = e, s = t, l = s;
      e: for (; l !== null; ) {
        switch (l.tag) {
          case 5:
            ze = l.stateNode, $t = !1;
            break e;
          case 3:
            ze = l.stateNode.containerInfo, $t = !0;
            break e;
          case 4:
            ze = l.stateNode.containerInfo, $t = !0;
            break e;
        }
        l = l.return;
      }
      if (ze === null) throw Error(Q(160));
      u0(o, s, i), ze = null, $t = !1;
      var u = i.alternate;
      u !== null && (u.return = null), i.return = null;
    } catch (a) {
      Le(i, t, a);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) a0(t, e), t = t.sibling;
}
function a0(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Tt(t, e), Vt(e), r & 4) {
        try {
          $i(3, e, e.return), pl(3, e);
        } catch (x) {
          Le(e, e.return, x);
        }
        try {
          $i(5, e, e.return);
        } catch (x) {
          Le(e, e.return, x);
        }
      }
      break;
    case 1:
      Tt(t, e), Vt(e), r & 512 && n !== null && Ir(n, n.return);
      break;
    case 5:
      if (Tt(t, e), Vt(e), r & 512 && n !== null && Ir(n, n.return), e.flags & 32) {
        var i = e.stateNode;
        try {
          Fi(i, "");
        } catch (x) {
          Le(e, e.return, x);
        }
      }
      if (r & 4 && (i = e.stateNode, i != null)) {
        var o = e.memoizedProps, s = n !== null ? n.memoizedProps : o, l = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          l === "input" && o.type === "radio" && o.name != null && Tp(i, o), Hu(l, s);
          var a = Hu(l, o);
          for (s = 0; s < u.length; s += 2) {
            var c = u[s], f = u[s + 1];
            c === "style" ? Ap(i, f) : c === "dangerouslySetInnerHTML" ? jp(i, f) : c === "children" ? Fi(i, f) : Qa(i, c, f, a);
          }
          switch (l) {
            case "input":
              Bu(i, o);
              break;
            case "textarea":
              Lp(i, o);
              break;
            case "select":
              var d = i._wrapperState.wasMultiple;
              i._wrapperState.wasMultiple = !!o.multiple;
              var h = o.value;
              h != null ? $r(i, !!o.multiple, h, !1) : d !== !!o.multiple && (o.defaultValue != null ? $r(
                i,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : $r(i, !!o.multiple, o.multiple ? [] : "", !1));
          }
          i[Xi] = o;
        } catch (x) {
          Le(e, e.return, x);
        }
      }
      break;
    case 6:
      if (Tt(t, e), Vt(e), r & 4) {
        if (e.stateNode === null) throw Error(Q(162));
        i = e.stateNode, o = e.memoizedProps;
        try {
          i.nodeValue = o;
        } catch (x) {
          Le(e, e.return, x);
        }
      }
      break;
    case 3:
      if (Tt(t, e), Vt(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Hi(t.containerInfo);
      } catch (x) {
        Le(e, e.return, x);
      }
      break;
    case 4:
      Tt(t, e), Vt(e);
      break;
    case 13:
      Tt(t, e), Vt(e), i = e.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || (Ic = $e())), r & 4 && yd(e);
      break;
    case 22:
      if (c = n !== null && n.memoizedState !== null, e.mode & 1 ? (Ge = (a = Ge) || c, Tt(t, e), Ge = a) : Tt(t, e), Vt(e), r & 8192) {
        if (a = e.memoizedState !== null, (e.stateNode.isHidden = a) && !c && e.mode & 1) for (ee = e, c = e.child; c !== null; ) {
          for (f = ee = c; ee !== null; ) {
            switch (d = ee, h = d.child, d.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                $i(4, d, d.return);
                break;
              case 1:
                Ir(d, d.return);
                var g = d.stateNode;
                if (typeof g.componentWillUnmount == "function") {
                  r = d, n = d.return;
                  try {
                    t = r, g.props = t.memoizedProps, g.state = t.memoizedState, g.componentWillUnmount();
                  } catch (x) {
                    Le(r, n, x);
                  }
                }
                break;
              case 5:
                Ir(d, d.return);
                break;
              case 22:
                if (d.memoizedState !== null) {
                  wd(f);
                  continue;
                }
            }
            h !== null ? (h.return = d, ee = h) : wd(f);
          }
          c = c.sibling;
        }
        e: for (c = null, f = e; ; ) {
          if (f.tag === 5) {
            if (c === null) {
              c = f;
              try {
                i = f.stateNode, a ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (l = f.stateNode, u = f.memoizedProps.style, s = u != null && u.hasOwnProperty("display") ? u.display : null, l.style.display = Rp("display", s));
              } catch (x) {
                Le(e, e.return, x);
              }
            }
          } else if (f.tag === 6) {
            if (c === null) try {
              f.stateNode.nodeValue = a ? "" : f.memoizedProps;
            } catch (x) {
              Le(e, e.return, x);
            }
          } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
            f.child.return = f, f = f.child;
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            c === f && (c = null), f = f.return;
          }
          c === f && (c = null), f.sibling.return = f.return, f = f.sibling;
        }
      }
      break;
    case 19:
      Tt(t, e), Vt(e), r & 4 && yd(e);
      break;
    case 21:
      break;
    default:
      Tt(
        t,
        e
      ), Vt(e);
  }
}
function Vt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (l0(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(Q(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (Fi(i, ""), r.flags &= -33);
          var o = md(e);
          wa(e, o, i);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo, l = md(e);
          va(e, l, s);
          break;
        default:
          throw Error(Q(161));
      }
    } catch (u) {
      Le(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function g_(e, t, n) {
  ee = e, c0(e);
}
function c0(e, t, n) {
  for (var r = (e.mode & 1) !== 0; ee !== null; ) {
    var i = ee, o = i.child;
    if (i.tag === 22 && r) {
      var s = i.memoizedState !== null || Uo;
      if (!s) {
        var l = i.alternate, u = l !== null && l.memoizedState !== null || Ge;
        l = Uo;
        var a = Ge;
        if (Uo = s, (Ge = u) && !a) for (ee = i; ee !== null; ) s = ee, u = s.child, s.tag === 22 && s.memoizedState !== null ? xd(i) : u !== null ? (u.return = s, ee = u) : xd(i);
        for (; o !== null; ) ee = o, c0(o), o = o.sibling;
        ee = i, Uo = l, Ge = a;
      }
      vd(e);
    } else i.subtreeFlags & 8772 && o !== null ? (o.return = i, ee = o) : vd(e);
  }
}
function vd(e) {
  for (; ee !== null; ) {
    var t = ee;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            Ge || pl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !Ge) if (n === null) r.componentDidMount();
            else {
              var i = t.elementType === t.type ? n.memoizedProps : Lt(t.type, n.memoizedProps);
              r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && nd(t, o, r);
            break;
          case 3:
            var s = t.updateQueue;
            if (s !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              nd(t, s, n);
            }
            break;
          case 5:
            var l = t.stateNode;
            if (n === null && t.flags & 4) {
              n = l;
              var u = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  u.autoFocus && n.focus();
                  break;
                case "img":
                  u.src && (n.src = u.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var a = t.alternate;
              if (a !== null) {
                var c = a.memoizedState;
                if (c !== null) {
                  var f = c.dehydrated;
                  f !== null && Hi(f);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(Q(163));
        }
        Ge || t.flags & 512 && ya(t);
      } catch (d) {
        Le(t, t.return, d);
      }
    }
    if (t === e) {
      ee = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, ee = n;
      break;
    }
    ee = t.return;
  }
}
function wd(e) {
  for (; ee !== null; ) {
    var t = ee;
    if (t === e) {
      ee = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, ee = n;
      break;
    }
    ee = t.return;
  }
}
function xd(e) {
  for (; ee !== null; ) {
    var t = ee;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            pl(4, t);
          } catch (u) {
            Le(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              Le(t, i, u);
            }
          }
          var o = t.return;
          try {
            ya(t);
          } catch (u) {
            Le(t, o, u);
          }
          break;
        case 5:
          var s = t.return;
          try {
            ya(t);
          } catch (u) {
            Le(t, s, u);
          }
      }
    } catch (u) {
      Le(t, t.return, u);
    }
    if (t === e) {
      ee = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      l.return = t.return, ee = l;
      break;
    }
    ee = t.return;
  }
}
var m_ = Math.ceil, Ds = mn.ReactCurrentDispatcher, bc = mn.ReactCurrentOwner, Nt = mn.ReactCurrentBatchConfig, pe = 0, De = null, Re = null, Ue = 0, ct = 0, Pr = zn(0), Be = 0, eo = null, ir = 0, gl = 0, Cc = 0, ji = null, rt = null, Ic = 0, Gr = 1 / 0, on = null, zs = !1, xa = null, jn = null, Ho = !1, In = null, Us = 0, Ri = 0, _a = null, hs = -1, ps = 0;
function qe() {
  return pe & 6 ? $e() : hs !== -1 ? hs : hs = $e();
}
function Rn(e) {
  return e.mode & 1 ? pe & 2 && Ue !== 0 ? Ue & -Ue : Jx.transition !== null ? (ps === 0 && (ps = Xp()), ps) : (e = ve, e !== 0 || (e = window.event, e = e === void 0 ? 16 : tg(e.type)), e) : 1;
}
function Dt(e, t, n, r) {
  if (50 < Ri) throw Ri = 0, _a = null, Error(Q(185));
  po(e, n, r), (!(pe & 2) || e !== De) && (e === De && (!(pe & 2) && (gl |= n), Be === 4 && Nn(e, Ue)), ut(e, r), n === 1 && pe === 0 && !(t.mode & 1) && (Gr = $e() + 500, fl && Un()));
}
function ut(e, t) {
  var n = e.callbackNode;
  Jw(e, t);
  var r = Ns(e, e === De ? Ue : 0);
  if (r === 0) n !== null && Pf(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Pf(n), t === 1) e.tag === 0 ? Zx(_d.bind(null, e)) : xg(_d.bind(null, e)), Xx(function() {
      !(pe & 6) && Un();
    }), n = null;
    else {
      switch (Qp(r)) {
        case 1:
          n = ec;
          break;
        case 4:
          n = Yp;
          break;
        case 16:
          n = ks;
          break;
        case 536870912:
          n = Gp;
          break;
        default:
          n = ks;
      }
      n = v0(n, f0.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function f0(e, t) {
  if (hs = -1, ps = 0, pe & 6) throw Error(Q(327));
  var n = e.callbackNode;
  if (Br() && e.callbackNode !== n) return null;
  var r = Ns(e, e === De ? Ue : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Hs(e, r);
  else {
    t = r;
    var i = pe;
    pe |= 2;
    var o = h0();
    (De !== e || Ue !== t) && (on = null, Gr = $e() + 500, qn(e, t));
    do
      try {
        w_();
        break;
      } catch (l) {
        d0(e, l);
      }
    while (!0);
    hc(), Ds.current = o, pe = i, Re !== null ? t = 0 : (De = null, Ue = 0, t = Be);
  }
  if (t !== 0) {
    if (t === 2 && (i = Xu(e), i !== 0 && (r = i, t = Ea(e, i))), t === 1) throw n = eo, qn(e, 0), Nn(e, r), ut(e, $e()), n;
    if (t === 6) Nn(e, r);
    else {
      if (i = e.current.alternate, !(r & 30) && !y_(i) && (t = Hs(e, r), t === 2 && (o = Xu(e), o !== 0 && (r = o, t = Ea(e, o))), t === 1)) throw n = eo, qn(e, 0), Nn(e, r), ut(e, $e()), n;
      switch (e.finishedWork = i, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(Q(345));
        case 2:
          Wn(e, rt, on);
          break;
        case 3:
          if (Nn(e, r), (r & 130023424) === r && (t = Ic + 500 - $e(), 10 < t)) {
            if (Ns(e, 0) !== 0) break;
            if (i = e.suspendedLanes, (i & r) !== r) {
              qe(), e.pingedLanes |= e.suspendedLanes & i;
              break;
            }
            e.timeoutHandle = na(Wn.bind(null, e, rt, on), t);
            break;
          }
          Wn(e, rt, on);
          break;
        case 4:
          if (Nn(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var s = 31 - Ft(r);
            o = 1 << s, s = t[s], s > i && (i = s), r &= ~o;
          }
          if (r = i, r = $e() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * m_(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = na(Wn.bind(null, e, rt, on), r);
            break;
          }
          Wn(e, rt, on);
          break;
        case 5:
          Wn(e, rt, on);
          break;
        default:
          throw Error(Q(329));
      }
    }
  }
  return ut(e, $e()), e.callbackNode === n ? f0.bind(null, e) : null;
}
function Ea(e, t) {
  var n = ji;
  return e.current.memoizedState.isDehydrated && (qn(e, t).flags |= 256), e = Hs(e, t), e !== 2 && (t = rt, rt = n, t !== null && Sa(t)), e;
}
function Sa(e) {
  rt === null ? rt = e : rt.push.apply(rt, e);
}
function y_(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var i = n[r], o = i.getSnapshot;
        i = i.value;
        try {
          if (!zt(o(), i)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function Nn(e, t) {
  for (t &= ~Cc, t &= ~gl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Ft(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function _d(e) {
  if (pe & 6) throw Error(Q(327));
  Br();
  var t = Ns(e, 0);
  if (!(t & 1)) return ut(e, $e()), null;
  var n = Hs(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Xu(e);
    r !== 0 && (t = r, n = Ea(e, r));
  }
  if (n === 1) throw n = eo, qn(e, 0), Nn(e, t), ut(e, $e()), n;
  if (n === 6) throw Error(Q(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Wn(e, rt, on), ut(e, $e()), null;
}
function Pc(e, t) {
  var n = pe;
  pe |= 1;
  try {
    return e(t);
  } finally {
    pe = n, pe === 0 && (Gr = $e() + 500, fl && Un());
  }
}
function or(e) {
  In !== null && In.tag === 0 && !(pe & 6) && Br();
  var t = pe;
  pe |= 1;
  var n = Nt.transition, r = ve;
  try {
    if (Nt.transition = null, ve = 1, e) return e();
  } finally {
    ve = r, Nt.transition = n, pe = t, !(pe & 6) && Un();
  }
}
function Mc() {
  ct = Pr.current, Se(Pr);
}
function qn(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Gx(n)), Re !== null) for (n = Re.return; n !== null; ) {
    var r = n;
    switch (cc(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Ms();
        break;
      case 3:
        Wr(), Se(st), Se(Qe), wc();
        break;
      case 5:
        vc(r);
        break;
      case 4:
        Wr();
        break;
      case 13:
        Se(Ie);
        break;
      case 19:
        Se(Ie);
        break;
      case 10:
        pc(r.type._context);
        break;
      case 22:
      case 23:
        Mc();
    }
    n = n.return;
  }
  if (De = e, Re = e = An(e.current, null), Ue = ct = t, Be = 0, eo = null, Cc = gl = ir = 0, rt = ji = null, Xn !== null) {
    for (t = 0; t < Xn.length; t++) if (n = Xn[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var i = r.next, o = n.pending;
      if (o !== null) {
        var s = o.next;
        o.next = i, r.next = s;
      }
      n.pending = r;
    }
    Xn = null;
  }
  return e;
}
function d0(e, t) {
  do {
    var n = Re;
    try {
      if (hc(), cs.current = Fs, Bs) {
        for (var r = Pe.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), r = r.next;
        }
        Bs = !1;
      }
      if (rr = 0, Fe = Oe = Pe = null, Li = !1, qi = 0, bc.current = null, n === null || n.return === null) {
        Be = 1, eo = t, Re = null;
        break;
      }
      e: {
        var o = e, s = n.return, l = n, u = t;
        if (t = Ue, l.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var a = u, c = l, f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var d = c.alternate;
            d ? (c.updateQueue = d.updateQueue, c.memoizedState = d.memoizedState, c.lanes = d.lanes) : (c.updateQueue = null, c.memoizedState = null);
          }
          var h = ud(s);
          if (h !== null) {
            h.flags &= -257, ad(h, s, l, o, t), h.mode & 1 && ld(o, a, t), t = h, u = a;
            var g = t.updateQueue;
            if (g === null) {
              var x = /* @__PURE__ */ new Set();
              x.add(u), t.updateQueue = x;
            } else g.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              ld(o, a, t), Tc();
              break e;
            }
            u = Error(Q(426));
          }
        } else if (Ce && l.mode & 1) {
          var E = ud(s);
          if (E !== null) {
            !(E.flags & 65536) && (E.flags |= 256), ad(E, s, l, o, t), fc(Yr(u, l));
            break e;
          }
        }
        o = u = Yr(u, l), Be !== 4 && (Be = 2), ji === null ? ji = [o] : ji.push(o), o = s;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var p = Qg(o, u, t);
              td(o, p);
              break e;
            case 1:
              l = u;
              var w = o.type, v = o.stateNode;
              if (!(o.flags & 128) && (typeof w.getDerivedStateFromError == "function" || v !== null && typeof v.componentDidCatch == "function" && (jn === null || !jn.has(v)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var _ = Kg(o, l, t);
                td(o, _);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      g0(n);
    } catch (C) {
      t = C, Re === n && n !== null && (Re = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function h0() {
  var e = Ds.current;
  return Ds.current = Fs, e === null ? Fs : e;
}
function Tc() {
  (Be === 0 || Be === 3 || Be === 2) && (Be = 4), De === null || !(ir & 268435455) && !(gl & 268435455) || Nn(De, Ue);
}
function Hs(e, t) {
  var n = pe;
  pe |= 2;
  var r = h0();
  (De !== e || Ue !== t) && (on = null, qn(e, t));
  do
    try {
      v_();
      break;
    } catch (i) {
      d0(e, i);
    }
  while (!0);
  if (hc(), pe = n, Ds.current = r, Re !== null) throw Error(Q(261));
  return De = null, Ue = 0, Be;
}
function v_() {
  for (; Re !== null; ) p0(Re);
}
function w_() {
  for (; Re !== null && !Vw(); ) p0(Re);
}
function p0(e) {
  var t = y0(e.alternate, e, ct);
  e.memoizedProps = e.pendingProps, t === null ? g0(e) : Re = t, bc.current = null;
}
function g0(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = d_(n, t), n !== null) {
        n.flags &= 32767, Re = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        Be = 6, Re = null;
        return;
      }
    } else if (n = f_(n, t, ct), n !== null) {
      Re = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      Re = t;
      return;
    }
    Re = t = e;
  } while (t !== null);
  Be === 0 && (Be = 5);
}
function Wn(e, t, n) {
  var r = ve, i = Nt.transition;
  try {
    Nt.transition = null, ve = 1, x_(e, t, n, r);
  } finally {
    Nt.transition = i, ve = r;
  }
  return null;
}
function x_(e, t, n, r) {
  do
    Br();
  while (In !== null);
  if (pe & 6) throw Error(Q(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(Q(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (ex(e, o), e === De && (Re = De = null, Ue = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Ho || (Ho = !0, v0(ks, function() {
    return Br(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Nt.transition, Nt.transition = null;
    var s = ve;
    ve = 1;
    var l = pe;
    pe |= 4, bc.current = null, p_(e, n), a0(n, e), Dx(ea), bs = !!Ju, ea = Ju = null, e.current = n, g_(n), Ww(), pe = l, ve = s, Nt.transition = o;
  } else e.current = n;
  if (Ho && (Ho = !1, In = e, Us = i), o = e.pendingLanes, o === 0 && (jn = null), Xw(n.stateNode), ut(e, $e()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) i = t[n], r(i.value, { componentStack: i.stack, digest: i.digest });
  if (zs) throw zs = !1, e = xa, xa = null, e;
  return Us & 1 && e.tag !== 0 && Br(), o = e.pendingLanes, o & 1 ? e === _a ? Ri++ : (Ri = 0, _a = e) : Ri = 0, Un(), null;
}
function Br() {
  if (In !== null) {
    var e = Qp(Us), t = Nt.transition, n = ve;
    try {
      if (Nt.transition = null, ve = 16 > e ? 16 : e, In === null) var r = !1;
      else {
        if (e = In, In = null, Us = 0, pe & 6) throw Error(Q(331));
        var i = pe;
        for (pe |= 4, ee = e.current; ee !== null; ) {
          var o = ee, s = o.child;
          if (ee.flags & 16) {
            var l = o.deletions;
            if (l !== null) {
              for (var u = 0; u < l.length; u++) {
                var a = l[u];
                for (ee = a; ee !== null; ) {
                  var c = ee;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      $i(8, c, o);
                  }
                  var f = c.child;
                  if (f !== null) f.return = c, ee = f;
                  else for (; ee !== null; ) {
                    c = ee;
                    var d = c.sibling, h = c.return;
                    if (s0(c), c === a) {
                      ee = null;
                      break;
                    }
                    if (d !== null) {
                      d.return = h, ee = d;
                      break;
                    }
                    ee = h;
                  }
                }
              }
              var g = o.alternate;
              if (g !== null) {
                var x = g.child;
                if (x !== null) {
                  g.child = null;
                  do {
                    var E = x.sibling;
                    x.sibling = null, x = E;
                  } while (x !== null);
                }
              }
              ee = o;
            }
          }
          if (o.subtreeFlags & 2064 && s !== null) s.return = o, ee = s;
          else e: for (; ee !== null; ) {
            if (o = ee, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                $i(9, o, o.return);
            }
            var p = o.sibling;
            if (p !== null) {
              p.return = o.return, ee = p;
              break e;
            }
            ee = o.return;
          }
        }
        var w = e.current;
        for (ee = w; ee !== null; ) {
          s = ee;
          var v = s.child;
          if (s.subtreeFlags & 2064 && v !== null) v.return = s, ee = v;
          else e: for (s = w; ee !== null; ) {
            if (l = ee, l.flags & 2048) try {
              switch (l.tag) {
                case 0:
                case 11:
                case 15:
                  pl(9, l);
              }
            } catch (C) {
              Le(l, l.return, C);
            }
            if (l === s) {
              ee = null;
              break e;
            }
            var _ = l.sibling;
            if (_ !== null) {
              _.return = l.return, ee = _;
              break e;
            }
            ee = l.return;
          }
        }
        if (pe = i, Un(), qt && typeof qt.onPostCommitFiberRoot == "function") try {
          qt.onPostCommitFiberRoot(sl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      ve = n, Nt.transition = t;
    }
  }
  return !1;
}
function Ed(e, t, n) {
  t = Yr(n, t), t = Qg(e, t, 1), e = $n(e, t, 1), t = qe(), e !== null && (po(e, 1, t), ut(e, t));
}
function Le(e, t, n) {
  if (e.tag === 3) Ed(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Ed(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (jn === null || !jn.has(r))) {
        e = Yr(n, e), e = Kg(t, e, 1), t = $n(t, e, 1), e = qe(), t !== null && (po(t, 1, e), ut(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function __(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = qe(), e.pingedLanes |= e.suspendedLanes & n, De === e && (Ue & n) === n && (Be === 4 || Be === 3 && (Ue & 130023424) === Ue && 500 > $e() - Ic ? qn(e, 0) : Cc |= n), ut(e, t);
}
function m0(e, t) {
  t === 0 && (e.mode & 1 ? (t = $o, $o <<= 1, !($o & 130023424) && ($o = 4194304)) : t = 1);
  var n = qe();
  e = hn(e, t), e !== null && (po(e, t, n), ut(e, n));
}
function E_(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), m0(e, n);
}
function S_(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(Q(314));
  }
  r !== null && r.delete(t), m0(e, n);
}
var y0;
y0 = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || st.current) it = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return it = !1, c_(e, t, n);
    it = !!(e.flags & 131072);
  }
  else it = !1, Ce && t.flags & 1048576 && _g(t, $s, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      ds(e, t), e = t.pendingProps;
      var i = Ur(t, Qe.current);
      Or(t, n), i = _c(null, t, r, e, i, n);
      var o = Ec();
      return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, lt(r) ? (o = !0, Ts(t)) : o = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, mc(t), i.updater = hl, t.stateNode = i, i._reactInternals = t, aa(t, r, e, n), t = da(null, t, r, !0, o, n)) : (t.tag = 0, Ce && o && ac(t), Ke(null, t, i, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (ds(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = N_(r), e = Lt(r, e), i) {
          case 0:
            t = fa(null, t, r, e, n);
            break e;
          case 1:
            t = dd(null, t, r, e, n);
            break e;
          case 11:
            t = cd(null, t, r, e, n);
            break e;
          case 14:
            t = fd(null, t, r, Lt(r.type, e), n);
            break e;
        }
        throw Error(Q(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : Lt(r, i), fa(e, t, r, i, n);
    case 1:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : Lt(r, i), dd(e, t, r, i, n);
    case 3:
      e: {
        if (e0(t), e === null) throw Error(Q(387));
        r = t.pendingProps, o = t.memoizedState, i = o.element, Cg(e, t), As(t, r, null, n);
        var s = t.memoizedState;
        if (r = s.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: s.cache, pendingSuspenseBoundaries: s.pendingSuspenseBoundaries, transitions: s.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          i = Yr(Error(Q(423)), t), t = hd(e, t, r, n, i);
          break e;
        } else if (r !== i) {
          i = Yr(Error(Q(424)), t), t = hd(e, t, r, n, i);
          break e;
        } else for (dt = Ln(t.stateNode.containerInfo.firstChild), pt = t, Ce = !0, Rt = null, n = Ng(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Hr(), r === i) {
            t = pn(e, t, n);
            break e;
          }
          Ke(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Ig(t), e === null && sa(t), r = t.type, i = t.pendingProps, o = e !== null ? e.memoizedProps : null, s = i.children, ta(r, i) ? s = null : o !== null && ta(r, o) && (t.flags |= 32), Jg(e, t), Ke(e, t, s, n), t.child;
    case 6:
      return e === null && sa(t), null;
    case 13:
      return t0(e, t, n);
    case 4:
      return yc(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Vr(t, null, r, n) : Ke(e, t, r, n), t.child;
    case 11:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : Lt(r, i), cd(e, t, r, i, n);
    case 7:
      return Ke(e, t, t.pendingProps, n), t.child;
    case 8:
      return Ke(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Ke(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, i = t.pendingProps, o = t.memoizedProps, s = i.value, _e(js, r._currentValue), r._currentValue = s, o !== null) if (zt(o.value, s)) {
          if (o.children === i.children && !st.current) {
            t = pn(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var l = o.dependencies;
          if (l !== null) {
            s = o.child;
            for (var u = l.firstContext; u !== null; ) {
              if (u.context === r) {
                if (o.tag === 1) {
                  u = cn(-1, n & -n), u.tag = 2;
                  var a = o.updateQueue;
                  if (a !== null) {
                    a = a.shared;
                    var c = a.pending;
                    c === null ? u.next = u : (u.next = c.next, c.next = u), a.pending = u;
                  }
                }
                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), la(
                  o.return,
                  n,
                  t
                ), l.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (o.tag === 10) s = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (s = o.return, s === null) throw Error(Q(341));
            s.lanes |= n, l = s.alternate, l !== null && (l.lanes |= n), la(s, n, t), s = o.sibling;
          } else s = o.child;
          if (s !== null) s.return = o;
          else for (s = o; s !== null; ) {
            if (s === t) {
              s = null;
              break;
            }
            if (o = s.sibling, o !== null) {
              o.return = s.return, s = o;
              break;
            }
            s = s.return;
          }
          o = s;
        }
        Ke(e, t, i.children, n), t = t.child;
      }
      return t;
    case 9:
      return i = t.type, r = t.pendingProps.children, Or(t, n), i = bt(i), r = r(i), t.flags |= 1, Ke(e, t, r, n), t.child;
    case 14:
      return r = t.type, i = Lt(r, t.pendingProps), i = Lt(r.type, i), fd(e, t, r, i, n);
    case 15:
      return qg(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : Lt(r, i), ds(e, t), t.tag = 1, lt(r) ? (e = !0, Ts(t)) : e = !1, Or(t, n), Xg(t, r, i), aa(t, r, i, n), da(null, t, r, !0, e, n);
    case 19:
      return n0(e, t, n);
    case 22:
      return Zg(e, t, n);
  }
  throw Error(Q(156, t.tag));
};
function v0(e, t) {
  return Wp(e, t);
}
function k_(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function kt(e, t, n, r) {
  return new k_(e, t, n, r);
}
function Lc(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function N_(e) {
  if (typeof e == "function") return Lc(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === qa) return 11;
    if (e === Za) return 14;
  }
  return 2;
}
function An(e, t) {
  var n = e.alternate;
  return n === null ? (n = kt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function gs(e, t, n, r, i, o) {
  var s = 2;
  if (r = e, typeof e == "function") Lc(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else e: switch (e) {
    case wr:
      return Zn(n.children, i, o, t);
    case Ka:
      s = 8, i |= 8;
      break;
    case $u:
      return e = kt(12, n, t, i | 2), e.elementType = $u, e.lanes = o, e;
    case ju:
      return e = kt(13, n, t, i), e.elementType = ju, e.lanes = o, e;
    case Ru:
      return e = kt(19, n, t, i), e.elementType = Ru, e.lanes = o, e;
    case Ip:
      return ml(n, i, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case bp:
          s = 10;
          break e;
        case Cp:
          s = 9;
          break e;
        case qa:
          s = 11;
          break e;
        case Za:
          s = 14;
          break e;
        case En:
          s = 16, r = null;
          break e;
      }
      throw Error(Q(130, e == null ? e : typeof e, ""));
  }
  return t = kt(s, n, t, i), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Zn(e, t, n, r) {
  return e = kt(7, e, r, t), e.lanes = n, e;
}
function ml(e, t, n, r) {
  return e = kt(22, e, r, t), e.elementType = Ip, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function au(e, t, n) {
  return e = kt(6, e, null, t), e.lanes = n, e;
}
function cu(e, t, n) {
  return t = kt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function b_(e, t, n, r, i) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Vl(0), this.expirationTimes = Vl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Vl(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
}
function $c(e, t, n, r, i, o, s, l, u) {
  return e = new b_(e, t, n, l, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = kt(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, mc(o), e;
}
function C_(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: vr, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function w0(e) {
  if (!e) return Fn;
  e = e._reactInternals;
  e: {
    if (dr(e) !== e || e.tag !== 1) throw Error(Q(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (lt(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(Q(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (lt(n)) return wg(e, n, t);
  }
  return t;
}
function x0(e, t, n, r, i, o, s, l, u) {
  return e = $c(n, r, !0, e, i, o, s, l, u), e.context = w0(null), n = e.current, r = qe(), i = Rn(n), o = cn(r, i), o.callback = t ?? null, $n(n, o, i), e.current.lanes = i, po(e, i, r), ut(e, r), e;
}
function yl(e, t, n, r) {
  var i = t.current, o = qe(), s = Rn(i);
  return n = w0(n), t.context === null ? t.context = n : t.pendingContext = n, t = cn(o, s), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = $n(i, t, s), e !== null && (Dt(e, i, s, o), as(e, i, s)), s;
}
function Vs(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Sd(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function jc(e, t) {
  Sd(e, t), (e = e.alternate) && Sd(e, t);
}
function I_() {
  return null;
}
var _0 = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Rc(e) {
  this._internalRoot = e;
}
vl.prototype.render = Rc.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(Q(409));
  yl(e, t, null, null);
};
vl.prototype.unmount = Rc.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    or(function() {
      yl(null, e, null, null);
    }), t[dn] = null;
  }
};
function vl(e) {
  this._internalRoot = e;
}
vl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Zp();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < kn.length && t !== 0 && t < kn[n].priority; n++) ;
    kn.splice(n, 0, e), n === 0 && eg(e);
  }
};
function Ac(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function wl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function kd() {
}
function P_(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var a = Vs(s);
        o.call(a);
      };
    }
    var s = x0(t, r, e, 0, null, !1, !1, "", kd);
    return e._reactRootContainer = s, e[dn] = s.current, Yi(e.nodeType === 8 ? e.parentNode : e), or(), s;
  }
  for (; i = e.lastChild; ) e.removeChild(i);
  if (typeof r == "function") {
    var l = r;
    r = function() {
      var a = Vs(u);
      l.call(a);
    };
  }
  var u = $c(e, 0, !1, null, null, !1, !1, "", kd);
  return e._reactRootContainer = u, e[dn] = u.current, Yi(e.nodeType === 8 ? e.parentNode : e), or(function() {
    yl(t, u, n, r);
  }), u;
}
function xl(e, t, n, r, i) {
  var o = n._reactRootContainer;
  if (o) {
    var s = o;
    if (typeof i == "function") {
      var l = i;
      i = function() {
        var u = Vs(s);
        l.call(u);
      };
    }
    yl(t, s, e, i);
  } else s = P_(n, t, e, i, r);
  return Vs(s);
}
Kp = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = _i(t.pendingLanes);
        n !== 0 && (tc(t, n | 1), ut(t, $e()), !(pe & 6) && (Gr = $e() + 500, Un()));
      }
      break;
    case 13:
      or(function() {
        var r = hn(e, 1);
        if (r !== null) {
          var i = qe();
          Dt(r, e, 1, i);
        }
      }), jc(e, 1);
  }
};
nc = function(e) {
  if (e.tag === 13) {
    var t = hn(e, 134217728);
    if (t !== null) {
      var n = qe();
      Dt(t, e, 134217728, n);
    }
    jc(e, 134217728);
  }
};
qp = function(e) {
  if (e.tag === 13) {
    var t = Rn(e), n = hn(e, t);
    if (n !== null) {
      var r = qe();
      Dt(n, e, t, r);
    }
    jc(e, t);
  }
};
Zp = function() {
  return ve;
};
Jp = function(e, t) {
  var n = ve;
  try {
    return ve = e, t();
  } finally {
    ve = n;
  }
};
Wu = function(e, t, n) {
  switch (t) {
    case "input":
      if (Bu(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = cl(r);
            if (!i) throw Error(Q(90));
            Mp(r), Bu(r, i);
          }
        }
      }
      break;
    case "textarea":
      Lp(e, n);
      break;
    case "select":
      t = n.value, t != null && $r(e, !!n.multiple, t, !1);
  }
};
Fp = Pc;
Dp = or;
var M_ = { usingClientEntryPoint: !1, Events: [mo, Sr, cl, Op, Bp, Pc] }, pi = { findFiberByHostInstance: Gn, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, T_ = { bundleType: pi.bundleType, version: pi.version, rendererPackageName: pi.rendererPackageName, rendererConfig: pi.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: mn.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Hp(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: pi.findFiberByHostInstance || I_, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Vo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Vo.isDisabled && Vo.supportsFiber) try {
    sl = Vo.inject(T_), qt = Vo;
  } catch {
  }
}
vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = M_;
vt.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ac(t)) throw Error(Q(200));
  return C_(e, t, null, n);
};
vt.createRoot = function(e, t) {
  if (!Ac(e)) throw Error(Q(299));
  var n = !1, r = "", i = _0;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = $c(e, 1, !1, null, null, n, !1, r, i), e[dn] = t.current, Yi(e.nodeType === 8 ? e.parentNode : e), new Rc(t);
};
vt.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(Q(188)) : (e = Object.keys(e).join(","), Error(Q(268, e)));
  return e = Hp(t), e = e === null ? null : e.stateNode, e;
};
vt.flushSync = function(e) {
  return or(e);
};
vt.hydrate = function(e, t, n) {
  if (!wl(t)) throw Error(Q(200));
  return xl(null, e, t, !0, n);
};
vt.hydrateRoot = function(e, t, n) {
  if (!Ac(e)) throw Error(Q(405));
  var r = n != null && n.hydratedSources || null, i = !1, o = "", s = _0;
  if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = x0(t, null, e, 1, n ?? null, i, !1, o, s), e[dn] = t.current, Yi(e), r) for (e = 0; e < r.length; e++) n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(
    n,
    i
  );
  return new vl(t);
};
vt.render = function(e, t, n) {
  if (!wl(t)) throw Error(Q(200));
  return xl(null, e, t, !1, n);
};
vt.unmountComponentAtNode = function(e) {
  if (!wl(e)) throw Error(Q(40));
  return e._reactRootContainer ? (or(function() {
    xl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[dn] = null;
    });
  }), !0) : !1;
};
vt.unstable_batchedUpdates = Pc;
vt.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!wl(n)) throw Error(Q(200));
  if (e == null || e._reactInternals === void 0) throw Error(Q(38));
  return xl(e, t, n, !1, r);
};
vt.version = "18.3.1-next-f1338f8080-20240426";
function E0() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(E0);
    } catch (e) {
      console.error(e);
    }
}
E0(), Ep.exports = vt;
var S0 = Ep.exports, k0, Nd = S0;
k0 = Nd.createRoot, Nd.hydrateRoot;
function Ae(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let t = "";
  if (Array.isArray(e))
    for (let n = 0, r; n < e.length; n++)
      (r = Ae(e[n])) !== "" && (t += (t && " ") + r);
  else
    for (let n in e)
      e[n] && (t += (t && " ") + n);
  return t;
}
var L_ = { value: () => {
} };
function _l() {
  for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
    if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new ms(n);
}
function ms(e) {
  this._ = e;
}
function $_(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
ms.prototype = _l.prototype = {
  constructor: ms,
  on: function(e, t) {
    var n = this._, r = $_(e + "", n), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; ) if ((i = (e = r[o]).type) && (i = j_(n[i], e.name))) return i;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < s; )
      if (i = (e = r[o]).type) n[i] = bd(n[i], e.name, t);
      else if (t == null) for (i in n) n[i] = bd(n[i], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new ms(e);
  },
  call: function(e, t) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, o; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (o = this._[e], r = 0, i = o.length; r < i; ++r) o[r].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var r = this._[e], i = 0, o = r.length; i < o; ++i) r[i].value.apply(t, n);
  }
};
function j_(e, t) {
  for (var n = 0, r = e.length, i; n < r; ++n)
    if ((i = e[n]).name === t)
      return i.value;
}
function bd(e, t, n) {
  for (var r = 0, i = e.length; r < i; ++r)
    if (e[r].name === t) {
      e[r] = L_, e = e.slice(0, r).concat(e.slice(r + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var ka = "http://www.w3.org/1999/xhtml";
const Cd = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ka,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function El(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Cd.hasOwnProperty(t) ? { space: Cd[t], local: e } : e;
}
function R_(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === ka && t.documentElement.namespaceURI === ka ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function A_(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function N0(e) {
  var t = El(e);
  return (t.local ? A_ : R_)(t);
}
function O_() {
}
function Oc(e) {
  return e == null ? O_ : function() {
    return this.querySelector(e);
  };
}
function B_(e) {
  typeof e != "function" && (e = Oc(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = t[i], s = o.length, l = r[i] = new Array(s), u, a, c = 0; c < s; ++c)
      (u = o[c]) && (a = e.call(u, u.__data__, c, o)) && ("__data__" in u && (a.__data__ = u.__data__), l[c] = a);
  return new yt(r, this._parents);
}
function F_(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function D_() {
  return [];
}
function b0(e) {
  return e == null ? D_ : function() {
    return this.querySelectorAll(e);
  };
}
function z_(e) {
  return function() {
    return F_(e.apply(this, arguments));
  };
}
function U_(e) {
  typeof e == "function" ? e = z_(e) : e = b0(e);
  for (var t = this._groups, n = t.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = t[o], l = s.length, u, a = 0; a < l; ++a)
      (u = s[a]) && (r.push(e.call(u, u.__data__, a, s)), i.push(u));
  return new yt(r, i);
}
function C0(e) {
  return function() {
    return this.matches(e);
  };
}
function I0(e) {
  return function(t) {
    return t.matches(e);
  };
}
var H_ = Array.prototype.find;
function V_(e) {
  return function() {
    return H_.call(this.children, e);
  };
}
function W_() {
  return this.firstElementChild;
}
function Y_(e) {
  return this.select(e == null ? W_ : V_(typeof e == "function" ? e : I0(e)));
}
var G_ = Array.prototype.filter;
function X_() {
  return Array.from(this.children);
}
function Q_(e) {
  return function() {
    return G_.call(this.children, e);
  };
}
function K_(e) {
  return this.selectAll(e == null ? X_ : Q_(typeof e == "function" ? e : I0(e)));
}
function q_(e) {
  typeof e != "function" && (e = C0(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = t[i], s = o.length, l = r[i] = [], u, a = 0; a < s; ++a)
      (u = o[a]) && e.call(u, u.__data__, a, o) && l.push(u);
  return new yt(r, this._parents);
}
function P0(e) {
  return new Array(e.length);
}
function Z_() {
  return new yt(this._enter || this._groups.map(P0), this._parents);
}
function Ws(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Ws.prototype = {
  constructor: Ws,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function J_(e) {
  return function() {
    return e;
  };
}
function e1(e, t, n, r, i, o) {
  for (var s = 0, l, u = t.length, a = o.length; s < a; ++s)
    (l = t[s]) ? (l.__data__ = o[s], r[s] = l) : n[s] = new Ws(e, o[s]);
  for (; s < u; ++s)
    (l = t[s]) && (i[s] = l);
}
function t1(e, t, n, r, i, o, s) {
  var l, u, a = /* @__PURE__ */ new Map(), c = t.length, f = o.length, d = new Array(c), h;
  for (l = 0; l < c; ++l)
    (u = t[l]) && (d[l] = h = s.call(u, u.__data__, l, t) + "", a.has(h) ? i[l] = u : a.set(h, u));
  for (l = 0; l < f; ++l)
    h = s.call(e, o[l], l, o) + "", (u = a.get(h)) ? (r[l] = u, u.__data__ = o[l], a.delete(h)) : n[l] = new Ws(e, o[l]);
  for (l = 0; l < c; ++l)
    (u = t[l]) && a.get(d[l]) === u && (i[l] = u);
}
function n1(e) {
  return e.__data__;
}
function r1(e, t) {
  if (!arguments.length) return Array.from(this, n1);
  var n = t ? t1 : e1, r = this._parents, i = this._groups;
  typeof e != "function" && (e = J_(e));
  for (var o = i.length, s = new Array(o), l = new Array(o), u = new Array(o), a = 0; a < o; ++a) {
    var c = r[a], f = i[a], d = f.length, h = i1(e.call(c, c && c.__data__, a, r)), g = h.length, x = l[a] = new Array(g), E = s[a] = new Array(g), p = u[a] = new Array(d);
    n(c, f, x, E, p, h, t);
    for (var w = 0, v = 0, _, C; w < g; ++w)
      if (_ = x[w]) {
        for (w >= v && (v = w + 1); !(C = E[v]) && ++v < g; ) ;
        _._next = C || null;
      }
  }
  return s = new yt(s, r), s._enter = l, s._exit = u, s;
}
function i1(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function o1() {
  return new yt(this._exit || this._groups.map(P0), this._parents);
}
function s1(e, t, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof e == "function" ? (r = e(r), r && (r = r.selection())) : r = r.append(e + ""), t != null && (i = t(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function l1(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, o = r.length, s = Math.min(i, o), l = new Array(i), u = 0; u < s; ++u)
    for (var a = n[u], c = r[u], f = a.length, d = l[u] = new Array(f), h, g = 0; g < f; ++g)
      (h = a[g] || c[g]) && (d[g] = h);
  for (; u < i; ++u)
    l[u] = n[u];
  return new yt(l, this._parents);
}
function u1() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var r = e[t], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function a1(e) {
  e || (e = c1);
  function t(f, d) {
    return f && d ? e(f.__data__, d.__data__) : !f - !d;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = n[o], l = s.length, u = i[o] = new Array(l), a, c = 0; c < l; ++c)
      (a = s[c]) && (u[c] = a);
    u.sort(t);
  }
  return new yt(i, this._parents).order();
}
function c1(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function f1() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function d1() {
  return Array.from(this);
}
function h1() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function p1() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function g1() {
  return !this.node();
}
function m1(e) {
  for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
    for (var i = t[n], o = 0, s = i.length, l; o < s; ++o)
      (l = i[o]) && e.call(l, l.__data__, o, i);
  return this;
}
function y1(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function v1(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function w1(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function x1(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function _1(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function E1(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function S1(e, t) {
  var n = El(e);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((t == null ? n.local ? v1 : y1 : typeof t == "function" ? n.local ? E1 : _1 : n.local ? x1 : w1)(n, t));
}
function M0(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function k1(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function N1(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function b1(e, t, n) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
  };
}
function C1(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? k1 : typeof t == "function" ? b1 : N1)(e, t, n ?? "")) : Xr(this.node(), e);
}
function Xr(e, t) {
  return e.style.getPropertyValue(t) || M0(e).getComputedStyle(e, null).getPropertyValue(t);
}
function I1(e) {
  return function() {
    delete this[e];
  };
}
function P1(e, t) {
  return function() {
    this[e] = t;
  };
}
function M1(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function T1(e, t) {
  return arguments.length > 1 ? this.each((t == null ? I1 : typeof t == "function" ? M1 : P1)(e, t)) : this.node()[e];
}
function T0(e) {
  return e.trim().split(/^|\s+/);
}
function Bc(e) {
  return e.classList || new L0(e);
}
function L0(e) {
  this._node = e, this._names = T0(e.getAttribute("class") || "");
}
L0.prototype = {
  add: function(e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function $0(e, t) {
  for (var n = Bc(e), r = -1, i = t.length; ++r < i; ) n.add(t[r]);
}
function j0(e, t) {
  for (var n = Bc(e), r = -1, i = t.length; ++r < i; ) n.remove(t[r]);
}
function L1(e) {
  return function() {
    $0(this, e);
  };
}
function $1(e) {
  return function() {
    j0(this, e);
  };
}
function j1(e, t) {
  return function() {
    (t.apply(this, arguments) ? $0 : j0)(this, e);
  };
}
function R1(e, t) {
  var n = T0(e + "");
  if (arguments.length < 2) {
    for (var r = Bc(this.node()), i = -1, o = n.length; ++i < o; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? j1 : t ? L1 : $1)(n, t));
}
function A1() {
  this.textContent = "";
}
function O1(e) {
  return function() {
    this.textContent = e;
  };
}
function B1(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function F1(e) {
  return arguments.length ? this.each(e == null ? A1 : (typeof e == "function" ? B1 : O1)(e)) : this.node().textContent;
}
function D1() {
  this.innerHTML = "";
}
function z1(e) {
  return function() {
    this.innerHTML = e;
  };
}
function U1(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function H1(e) {
  return arguments.length ? this.each(e == null ? D1 : (typeof e == "function" ? U1 : z1)(e)) : this.node().innerHTML;
}
function V1() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function W1() {
  return this.each(V1);
}
function Y1() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function G1() {
  return this.each(Y1);
}
function X1(e) {
  var t = typeof e == "function" ? e : N0(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Q1() {
  return null;
}
function K1(e, t) {
  var n = typeof e == "function" ? e : N0(e), r = t == null ? Q1 : typeof t == "function" ? t : Oc(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function q1() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Z1() {
  return this.each(q1);
}
function J1() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function eE() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function tE(e) {
  return this.select(e ? eE : J1);
}
function nE(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function rE(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function iE(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", r = t.indexOf(".");
    return r >= 0 && (n = t.slice(r + 1), t = t.slice(0, r)), { type: t, name: n };
  });
}
function oE(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, r = -1, i = t.length, o; n < i; ++n)
        o = t[n], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++r] = o;
      ++r ? t.length = r : delete this.__on;
    }
  };
}
function sE(e, t, n) {
  return function() {
    var r = this.__on, i, o = rE(t);
    if (r) {
      for (var s = 0, l = r.length; s < l; ++s)
        if ((i = r[s]).type === e.type && i.name === e.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = n), i.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, n), i = { type: e.type, name: e.name, value: t, listener: o, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function lE(e, t, n) {
  var r = iE(e + ""), i, o = r.length, s;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var u = 0, a = l.length, c; u < a; ++u)
        for (i = 0, c = l[u]; i < o; ++i)
          if ((s = r[i]).type === c.type && s.name === c.name)
            return c.value;
    }
    return;
  }
  for (l = t ? sE : oE, i = 0; i < o; ++i) this.each(l(r[i], t, n));
  return this;
}
function R0(e, t, n) {
  var r = M0(e), i = r.CustomEvent;
  typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function uE(e, t) {
  return function() {
    return R0(this, e, t);
  };
}
function aE(e, t) {
  return function() {
    return R0(this, e, t.apply(this, arguments));
  };
}
function cE(e, t) {
  return this.each((typeof t == "function" ? aE : uE)(e, t));
}
function* fE() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var A0 = [null];
function yt(e, t) {
  this._groups = e, this._parents = t;
}
function vo() {
  return new yt([[document.documentElement]], A0);
}
function dE() {
  return this;
}
yt.prototype = vo.prototype = {
  constructor: yt,
  select: B_,
  selectAll: U_,
  selectChild: Y_,
  selectChildren: K_,
  filter: q_,
  data: r1,
  enter: Z_,
  exit: o1,
  join: s1,
  merge: l1,
  selection: dE,
  order: u1,
  sort: a1,
  call: f1,
  nodes: d1,
  node: h1,
  size: p1,
  empty: g1,
  each: m1,
  attr: S1,
  style: C1,
  property: T1,
  classed: R1,
  text: F1,
  html: H1,
  raise: W1,
  lower: G1,
  append: X1,
  insert: K1,
  remove: Z1,
  clone: tE,
  datum: nE,
  on: lE,
  dispatch: cE,
  [Symbol.iterator]: fE
};
function ft(e) {
  return typeof e == "string" ? new yt([[document.querySelector(e)]], [document.documentElement]) : new yt([[e]], A0);
}
function hE(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function jt(e, t) {
  if (e = hE(e), t === void 0 && (t = e.currentTarget), t) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = e.clientX, r.y = e.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (t.getBoundingClientRect) {
      var i = t.getBoundingClientRect();
      return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
const pE = { passive: !1 }, to = { capture: !0, passive: !1 };
function fu(e) {
  e.stopImmediatePropagation();
}
function Fr(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function O0(e) {
  var t = e.document.documentElement, n = ft(e).on("dragstart.drag", Fr, to);
  "onselectstart" in t ? n.on("selectstart.drag", Fr, to) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function B0(e, t) {
  var n = e.document.documentElement, r = ft(e).on("dragstart.drag", null);
  t && (r.on("click.drag", Fr, to), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Wo = (e) => () => e;
function Na(e, {
  sourceEvent: t,
  subject: n,
  target: r,
  identifier: i,
  active: o,
  x: s,
  y: l,
  dx: u,
  dy: a,
  dispatch: c
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: o, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: l, enumerable: !0, configurable: !0 },
    dx: { value: u, enumerable: !0, configurable: !0 },
    dy: { value: a, enumerable: !0, configurable: !0 },
    _: { value: c }
  });
}
Na.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function gE(e) {
  return !e.ctrlKey && !e.button;
}
function mE() {
  return this.parentNode;
}
function yE(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function vE() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function F0() {
  var e = gE, t = mE, n = yE, r = vE, i = {}, o = _l("start", "drag", "end"), s = 0, l, u, a, c, f = 0;
  function d(_) {
    _.on("mousedown.drag", h).filter(r).on("touchstart.drag", E).on("touchmove.drag", p, pE).on("touchend.drag touchcancel.drag", w).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(_, C) {
    if (!(c || !e.call(this, _, C))) {
      var I = v(this, t.call(this, _, C), _, C, "mouse");
      I && (ft(_.view).on("mousemove.drag", g, to).on("mouseup.drag", x, to), O0(_.view), fu(_), a = !1, l = _.clientX, u = _.clientY, I("start", _));
    }
  }
  function g(_) {
    if (Fr(_), !a) {
      var C = _.clientX - l, I = _.clientY - u;
      a = C * C + I * I > f;
    }
    i.mouse("drag", _);
  }
  function x(_) {
    ft(_.view).on("mousemove.drag mouseup.drag", null), B0(_.view, a), Fr(_), i.mouse("end", _);
  }
  function E(_, C) {
    if (e.call(this, _, C)) {
      var I = _.changedTouches, P = t.call(this, _, C), L = I.length, B, V;
      for (B = 0; B < L; ++B)
        (V = v(this, P, _, C, I[B].identifier, I[B])) && (fu(_), V("start", _, I[B]));
    }
  }
  function p(_) {
    var C = _.changedTouches, I = C.length, P, L;
    for (P = 0; P < I; ++P)
      (L = i[C[P].identifier]) && (Fr(_), L("drag", _, C[P]));
  }
  function w(_) {
    var C = _.changedTouches, I = C.length, P, L;
    for (c && clearTimeout(c), c = setTimeout(function() {
      c = null;
    }, 500), P = 0; P < I; ++P)
      (L = i[C[P].identifier]) && (fu(_), L("end", _, C[P]));
  }
  function v(_, C, I, P, L, B) {
    var V = o.copy(), z = jt(B || I, C), X, W, N;
    if ((N = n.call(_, new Na("beforestart", {
      sourceEvent: I,
      target: d,
      identifier: L,
      active: s,
      x: z[0],
      y: z[1],
      dx: 0,
      dy: 0,
      dispatch: V
    }), P)) != null)
      return X = N.x - z[0] || 0, W = N.y - z[1] || 0, function O(R, j, M) {
        var T = z, F;
        switch (R) {
          case "start":
            i[L] = O, F = s++;
            break;
          case "end":
            delete i[L], --s;
          case "drag":
            z = jt(M || j, C), F = s;
            break;
        }
        V.call(
          R,
          _,
          new Na(R, {
            sourceEvent: j,
            subject: N,
            target: d,
            identifier: L,
            active: F,
            x: z[0] + X,
            y: z[1] + W,
            dx: z[0] - T[0],
            dy: z[1] - T[1],
            dispatch: V
          }),
          P
        );
      };
  }
  return d.filter = function(_) {
    return arguments.length ? (e = typeof _ == "function" ? _ : Wo(!!_), d) : e;
  }, d.container = function(_) {
    return arguments.length ? (t = typeof _ == "function" ? _ : Wo(_), d) : t;
  }, d.subject = function(_) {
    return arguments.length ? (n = typeof _ == "function" ? _ : Wo(_), d) : n;
  }, d.touchable = function(_) {
    return arguments.length ? (r = typeof _ == "function" ? _ : Wo(!!_), d) : r;
  }, d.on = function() {
    var _ = o.on.apply(o, arguments);
    return _ === o ? d : _;
  }, d.clickDistance = function(_) {
    return arguments.length ? (f = (_ = +_) * _, d) : Math.sqrt(f);
  }, d;
}
function Fc(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function D0(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function wo() {
}
var no = 0.7, Ys = 1 / no, Dr = "\\s*([+-]?\\d+)\\s*", ro = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Jt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", wE = /^#([0-9a-f]{3,8})$/, xE = new RegExp(`^rgb\\(${Dr},${Dr},${Dr}\\)$`), _E = new RegExp(`^rgb\\(${Jt},${Jt},${Jt}\\)$`), EE = new RegExp(`^rgba\\(${Dr},${Dr},${Dr},${ro}\\)$`), SE = new RegExp(`^rgba\\(${Jt},${Jt},${Jt},${ro}\\)$`), kE = new RegExp(`^hsl\\(${ro},${Jt},${Jt}\\)$`), NE = new RegExp(`^hsla\\(${ro},${Jt},${Jt},${ro}\\)$`), Id = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Fc(wo, sr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Pd,
  // Deprecated! Use color.formatHex.
  formatHex: Pd,
  formatHex8: bE,
  formatHsl: CE,
  formatRgb: Md,
  toString: Md
});
function Pd() {
  return this.rgb().formatHex();
}
function bE() {
  return this.rgb().formatHex8();
}
function CE() {
  return z0(this).formatHsl();
}
function Md() {
  return this.rgb().formatRgb();
}
function sr(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = wE.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Td(t) : n === 3 ? new ot(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Yo(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Yo(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = xE.exec(e)) ? new ot(t[1], t[2], t[3], 1) : (t = _E.exec(e)) ? new ot(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = EE.exec(e)) ? Yo(t[1], t[2], t[3], t[4]) : (t = SE.exec(e)) ? Yo(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = kE.exec(e)) ? jd(t[1], t[2] / 100, t[3] / 100, 1) : (t = NE.exec(e)) ? jd(t[1], t[2] / 100, t[3] / 100, t[4]) : Id.hasOwnProperty(e) ? Td(Id[e]) : e === "transparent" ? new ot(NaN, NaN, NaN, 0) : null;
}
function Td(e) {
  return new ot(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Yo(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new ot(e, t, n, r);
}
function IE(e) {
  return e instanceof wo || (e = sr(e)), e ? (e = e.rgb(), new ot(e.r, e.g, e.b, e.opacity)) : new ot();
}
function ba(e, t, n, r) {
  return arguments.length === 1 ? IE(e) : new ot(e, t, n, r ?? 1);
}
function ot(e, t, n, r) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
Fc(ot, ba, D0(wo, {
  brighter(e) {
    return e = e == null ? Ys : Math.pow(Ys, e), new ot(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? no : Math.pow(no, e), new ot(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ot(Jn(this.r), Jn(this.g), Jn(this.b), Gs(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ld,
  // Deprecated! Use color.formatHex.
  formatHex: Ld,
  formatHex8: PE,
  formatRgb: $d,
  toString: $d
}));
function Ld() {
  return `#${Kn(this.r)}${Kn(this.g)}${Kn(this.b)}`;
}
function PE() {
  return `#${Kn(this.r)}${Kn(this.g)}${Kn(this.b)}${Kn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function $d() {
  const e = Gs(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Jn(this.r)}, ${Jn(this.g)}, ${Jn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Gs(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Jn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Kn(e) {
  return e = Jn(e), (e < 16 ? "0" : "") + e.toString(16);
}
function jd(e, t, n, r) {
  return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new At(e, t, n, r);
}
function z0(e) {
  if (e instanceof At) return new At(e.h, e.s, e.l, e.opacity);
  if (e instanceof wo || (e = sr(e)), !e) return new At();
  if (e instanceof At) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), o = Math.max(t, n, r), s = NaN, l = o - i, u = (o + i) / 2;
  return l ? (t === o ? s = (n - r) / l + (n < r) * 6 : n === o ? s = (r - t) / l + 2 : s = (t - n) / l + 4, l /= u < 0.5 ? o + i : 2 - o - i, s *= 60) : l = u > 0 && u < 1 ? 0 : s, new At(s, l, u, e.opacity);
}
function ME(e, t, n, r) {
  return arguments.length === 1 ? z0(e) : new At(e, t, n, r ?? 1);
}
function At(e, t, n, r) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
Fc(At, ME, D0(wo, {
  brighter(e) {
    return e = e == null ? Ys : Math.pow(Ys, e), new At(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? no : Math.pow(no, e), new At(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * t, i = 2 * n - r;
    return new ot(
      du(e >= 240 ? e - 240 : e + 120, i, r),
      du(e, i, r),
      du(e < 120 ? e + 240 : e - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new At(Rd(this.h), Go(this.s), Go(this.l), Gs(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Gs(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Rd(this.h)}, ${Go(this.s) * 100}%, ${Go(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Rd(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Go(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function du(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Dc = (e) => () => e;
function TE(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function LE(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(r) {
    return Math.pow(e + r * t, n);
  };
}
function $E(e) {
  return (e = +e) == 1 ? U0 : function(t, n) {
    return n - t ? LE(t, n, e) : Dc(isNaN(t) ? n : t);
  };
}
function U0(e, t) {
  var n = t - e;
  return n ? TE(e, n) : Dc(isNaN(e) ? t : e);
}
const Xs = function e(t) {
  var n = $E(t);
  function r(i, o) {
    var s = n((i = ba(i)).r, (o = ba(o)).r), l = n(i.g, o.g), u = n(i.b, o.b), a = U0(i.opacity, o.opacity);
    return function(c) {
      return i.r = s(c), i.g = l(c), i.b = u(c), i.opacity = a(c), i + "";
    };
  }
  return r.gamma = e, r;
}(1);
function jE(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), i;
  return function(o) {
    for (i = 0; i < n; ++i) r[i] = e[i] * (1 - o) + t[i] * o;
    return r;
  };
}
function RE(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function AE(e, t) {
  var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, i = new Array(r), o = new Array(n), s;
  for (s = 0; s < r; ++s) i[s] = Ai(e[s], t[s]);
  for (; s < n; ++s) o[s] = t[s];
  return function(l) {
    for (s = 0; s < r; ++s) o[s] = i[s](l);
    return o;
  };
}
function OE(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(r) {
    return n.setTime(e * (1 - r) + t * r), n;
  };
}
function Gt(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function BE(e, t) {
  var n = {}, r = {}, i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in e ? n[i] = Ai(e[i], t[i]) : r[i] = t[i];
  return function(o) {
    for (i in n) r[i] = n[i](o);
    return r;
  };
}
var Ca = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, hu = new RegExp(Ca.source, "g");
function FE(e) {
  return function() {
    return e;
  };
}
function DE(e) {
  return function(t) {
    return e(t) + "";
  };
}
function H0(e, t) {
  var n = Ca.lastIndex = hu.lastIndex = 0, r, i, o, s = -1, l = [], u = [];
  for (e = e + "", t = t + ""; (r = Ca.exec(e)) && (i = hu.exec(t)); )
    (o = i.index) > n && (o = t.slice(n, o), l[s] ? l[s] += o : l[++s] = o), (r = r[0]) === (i = i[0]) ? l[s] ? l[s] += i : l[++s] = i : (l[++s] = null, u.push({ i: s, x: Gt(r, i) })), n = hu.lastIndex;
  return n < t.length && (o = t.slice(n), l[s] ? l[s] += o : l[++s] = o), l.length < 2 ? u[0] ? DE(u[0].x) : FE(t) : (t = u.length, function(a) {
    for (var c = 0, f; c < t; ++c) l[(f = u[c]).i] = f.x(a);
    return l.join("");
  });
}
function Ai(e, t) {
  var n = typeof t, r;
  return t == null || n === "boolean" ? Dc(t) : (n === "number" ? Gt : n === "string" ? (r = sr(t)) ? (t = r, Xs) : H0 : t instanceof sr ? Xs : t instanceof Date ? OE : RE(t) ? jE : Array.isArray(t) ? AE : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? BE : Gt)(e, t);
}
var Ad = 180 / Math.PI, Ia = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function V0(e, t, n, r, i, o) {
  var s, l, u;
  return (s = Math.sqrt(e * e + t * t)) && (e /= s, t /= s), (u = e * n + t * r) && (n -= e * u, r -= t * u), (l = Math.sqrt(n * n + r * r)) && (n /= l, r /= l, u /= l), e * r < t * n && (e = -e, t = -t, u = -u, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(t, e) * Ad,
    skewX: Math.atan(u) * Ad,
    scaleX: s,
    scaleY: l
  };
}
var Xo;
function zE(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Ia : V0(t.a, t.b, t.c, t.d, t.e, t.f);
}
function UE(e) {
  return e == null || (Xo || (Xo = document.createElementNS("http://www.w3.org/2000/svg", "g")), Xo.setAttribute("transform", e), !(e = Xo.transform.baseVal.consolidate())) ? Ia : (e = e.matrix, V0(e.a, e.b, e.c, e.d, e.e, e.f));
}
function W0(e, t, n, r) {
  function i(a) {
    return a.length ? a.pop() + " " : "";
  }
  function o(a, c, f, d, h, g) {
    if (a !== f || c !== d) {
      var x = h.push("translate(", null, t, null, n);
      g.push({ i: x - 4, x: Gt(a, f) }, { i: x - 2, x: Gt(c, d) });
    } else (f || d) && h.push("translate(" + f + t + d + n);
  }
  function s(a, c, f, d) {
    a !== c ? (a - c > 180 ? c += 360 : c - a > 180 && (a += 360), d.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: Gt(a, c) })) : c && f.push(i(f) + "rotate(" + c + r);
  }
  function l(a, c, f, d) {
    a !== c ? d.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: Gt(a, c) }) : c && f.push(i(f) + "skewX(" + c + r);
  }
  function u(a, c, f, d, h, g) {
    if (a !== f || c !== d) {
      var x = h.push(i(h) + "scale(", null, ",", null, ")");
      g.push({ i: x - 4, x: Gt(a, f) }, { i: x - 2, x: Gt(c, d) });
    } else (f !== 1 || d !== 1) && h.push(i(h) + "scale(" + f + "," + d + ")");
  }
  return function(a, c) {
    var f = [], d = [];
    return a = e(a), c = e(c), o(a.translateX, a.translateY, c.translateX, c.translateY, f, d), s(a.rotate, c.rotate, f, d), l(a.skewX, c.skewX, f, d), u(a.scaleX, a.scaleY, c.scaleX, c.scaleY, f, d), a = c = null, function(h) {
      for (var g = -1, x = d.length, E; ++g < x; ) f[(E = d[g]).i] = E.x(h);
      return f.join("");
    };
  };
}
var HE = W0(zE, "px, ", "px)", "deg)"), VE = W0(UE, ", ", ")", ")"), WE = 1e-12;
function Od(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function YE(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function GE(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const ys = function e(t, n, r) {
  function i(o, s) {
    var l = o[0], u = o[1], a = o[2], c = s[0], f = s[1], d = s[2], h = c - l, g = f - u, x = h * h + g * g, E, p;
    if (x < WE)
      p = Math.log(d / a) / t, E = function(P) {
        return [
          l + P * h,
          u + P * g,
          a * Math.exp(t * P * p)
        ];
      };
    else {
      var w = Math.sqrt(x), v = (d * d - a * a + r * x) / (2 * a * n * w), _ = (d * d - a * a - r * x) / (2 * d * n * w), C = Math.log(Math.sqrt(v * v + 1) - v), I = Math.log(Math.sqrt(_ * _ + 1) - _);
      p = (I - C) / t, E = function(P) {
        var L = P * p, B = Od(C), V = a / (n * w) * (B * GE(t * L + C) - YE(C));
        return [
          l + V * h,
          u + V * g,
          a * B / Od(t * L + C)
        ];
      };
    }
    return E.duration = p * 1e3 * t / Math.SQRT2, E;
  }
  return i.rho = function(o) {
    var s = Math.max(1e-3, +o), l = s * s, u = l * l;
    return e(s, l, u);
  }, i;
}(Math.SQRT2, 2, 4);
var Qr = 0, Si = 0, gi = 0, Y0 = 1e3, Qs, ki, Ks = 0, lr = 0, Sl = 0, io = typeof performance == "object" && performance.now ? performance : Date, G0 = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function zc() {
  return lr || (G0(XE), lr = io.now() + Sl);
}
function XE() {
  lr = 0;
}
function qs() {
  this._call = this._time = this._next = null;
}
qs.prototype = X0.prototype = {
  constructor: qs,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? zc() : +n) + (t == null ? 0 : +t), !this._next && ki !== this && (ki ? ki._next = this : Qs = this, ki = this), this._call = e, this._time = n, Pa();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Pa());
  }
};
function X0(e, t, n) {
  var r = new qs();
  return r.restart(e, t, n), r;
}
function QE() {
  zc(), ++Qr;
  for (var e = Qs, t; e; )
    (t = lr - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Qr;
}
function Bd() {
  lr = (Ks = io.now()) + Sl, Qr = Si = 0;
  try {
    QE();
  } finally {
    Qr = 0, qE(), lr = 0;
  }
}
function KE() {
  var e = io.now(), t = e - Ks;
  t > Y0 && (Sl -= t, Ks = e);
}
function qE() {
  for (var e, t = Qs, n, r = 1 / 0; t; )
    t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : Qs = n);
  ki = e, Pa(r);
}
function Pa(e) {
  if (!Qr) {
    Si && (Si = clearTimeout(Si));
    var t = e - lr;
    t > 24 ? (e < 1 / 0 && (Si = setTimeout(Bd, e - io.now() - Sl)), gi && (gi = clearInterval(gi))) : (gi || (Ks = io.now(), gi = setInterval(KE, Y0)), Qr = 1, G0(Bd));
  }
}
function Fd(e, t, n) {
  var r = new qs();
  return t = t == null ? 0 : +t, r.restart((i) => {
    r.stop(), e(i + t);
  }, t, n), r;
}
var ZE = _l("start", "end", "cancel", "interrupt"), JE = [], Q0 = 0, Dd = 1, Ma = 2, vs = 3, zd = 4, Ta = 5, ws = 6;
function kl(e, t, n, r, i, o) {
  var s = e.__transition;
  if (!s) e.__transition = {};
  else if (n in s) return;
  eS(e, n, {
    name: t,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: ZE,
    tween: JE,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Q0
  });
}
function Uc(e, t) {
  var n = Ht(e, t);
  if (n.state > Q0) throw new Error("too late; already scheduled");
  return n;
}
function en(e, t) {
  var n = Ht(e, t);
  if (n.state > vs) throw new Error("too late; already running");
  return n;
}
function Ht(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function eS(e, t, n) {
  var r = e.__transition, i;
  r[t] = n, n.timer = X0(o, 0, n.time);
  function o(a) {
    n.state = Dd, n.timer.restart(s, n.delay, n.time), n.delay <= a && s(a - n.delay);
  }
  function s(a) {
    var c, f, d, h;
    if (n.state !== Dd) return u();
    for (c in r)
      if (h = r[c], h.name === n.name) {
        if (h.state === vs) return Fd(s);
        h.state === zd ? (h.state = ws, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete r[c]) : +c < t && (h.state = ws, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete r[c]);
      }
    if (Fd(function() {
      n.state === vs && (n.state = zd, n.timer.restart(l, n.delay, n.time), l(a));
    }), n.state = Ma, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Ma) {
      for (n.state = vs, i = new Array(d = n.tween.length), c = 0, f = -1; c < d; ++c)
        (h = n.tween[c].value.call(e, e.__data__, n.index, n.group)) && (i[++f] = h);
      i.length = f + 1;
    }
  }
  function l(a) {
    for (var c = a < n.duration ? n.ease.call(null, a / n.duration) : (n.timer.restart(u), n.state = Ta, 1), f = -1, d = i.length; ++f < d; )
      i[f].call(e, c);
    n.state === Ta && (n.on.call("end", e, e.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = ws, n.timer.stop(), delete r[t];
    for (var a in r) return;
    delete e.__transition;
  }
}
function xs(e, t) {
  var n = e.__transition, r, i, o = !0, s;
  if (n) {
    t = t == null ? null : t + "";
    for (s in n) {
      if ((r = n[s]).name !== t) {
        o = !1;
        continue;
      }
      i = r.state > Ma && r.state < Ta, r.state = ws, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[s];
    }
    o && delete e.__transition;
  }
}
function tS(e) {
  return this.each(function() {
    xs(this, e);
  });
}
function nS(e, t) {
  var n, r;
  return function() {
    var i = en(this, e), o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var s = 0, l = r.length; s < l; ++s)
        if (r[s].name === t) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function rS(e, t, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = en(this, e), s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var l = { name: t, value: n }, u = 0, a = i.length; u < a; ++u)
        if (i[u].name === t) {
          i[u] = l;
          break;
        }
      u === a && i.push(l);
    }
    o.tween = i;
  };
}
function iS(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var r = Ht(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === e)
        return s.value;
    return null;
  }
  return this.each((t == null ? nS : rS)(n, e, t));
}
function Hc(e, t, n) {
  var r = e._id;
  return e.each(function() {
    var i = en(this, r);
    (i.value || (i.value = {}))[t] = n.apply(this, arguments);
  }), function(i) {
    return Ht(i, r).value[t];
  };
}
function K0(e, t) {
  var n;
  return (typeof t == "number" ? Gt : t instanceof sr ? Xs : (n = sr(t)) ? (t = n, Xs) : H0)(e, t);
}
function oS(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function sS(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function lS(e, t, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttribute(e);
    return s === i ? null : s === r ? o : o = t(r = s, n);
  };
}
function uS(e, t, n) {
  var r, i = n + "", o;
  return function() {
    var s = this.getAttributeNS(e.space, e.local);
    return s === i ? null : s === r ? o : o = t(r = s, n);
  };
}
function aS(e, t, n) {
  var r, i, o;
  return function() {
    var s, l = n(this), u;
    return l == null ? void this.removeAttribute(e) : (s = this.getAttribute(e), u = l + "", s === u ? null : s === r && u === i ? o : (i = u, o = t(r = s, l)));
  };
}
function cS(e, t, n) {
  var r, i, o;
  return function() {
    var s, l = n(this), u;
    return l == null ? void this.removeAttributeNS(e.space, e.local) : (s = this.getAttributeNS(e.space, e.local), u = l + "", s === u ? null : s === r && u === i ? o : (i = u, o = t(r = s, l)));
  };
}
function fS(e, t) {
  var n = El(e), r = n === "transform" ? VE : K0;
  return this.attrTween(e, typeof t == "function" ? (n.local ? cS : aS)(n, r, Hc(this, "attr." + e, t)) : t == null ? (n.local ? sS : oS)(n) : (n.local ? uS : lS)(n, r, t));
}
function dS(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function hS(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function pS(e, t) {
  var n, r;
  function i() {
    var o = t.apply(this, arguments);
    return o !== r && (n = (r = o) && hS(e, o)), n;
  }
  return i._value = t, i;
}
function gS(e, t) {
  var n, r;
  function i() {
    var o = t.apply(this, arguments);
    return o !== r && (n = (r = o) && dS(e, o)), n;
  }
  return i._value = t, i;
}
function mS(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var r = El(e);
  return this.tween(n, (r.local ? pS : gS)(r, t));
}
function yS(e, t) {
  return function() {
    Uc(this, e).delay = +t.apply(this, arguments);
  };
}
function vS(e, t) {
  return t = +t, function() {
    Uc(this, e).delay = t;
  };
}
function wS(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? yS : vS)(t, e)) : Ht(this.node(), t).delay;
}
function xS(e, t) {
  return function() {
    en(this, e).duration = +t.apply(this, arguments);
  };
}
function _S(e, t) {
  return t = +t, function() {
    en(this, e).duration = t;
  };
}
function ES(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? xS : _S)(t, e)) : Ht(this.node(), t).duration;
}
function SS(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    en(this, e).ease = t;
  };
}
function kS(e) {
  var t = this._id;
  return arguments.length ? this.each(SS(t, e)) : Ht(this.node(), t).ease;
}
function NS(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    en(this, e).ease = n;
  };
}
function bS(e) {
  if (typeof e != "function") throw new Error();
  return this.each(NS(this._id, e));
}
function CS(e) {
  typeof e != "function" && (e = C0(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = t[i], s = o.length, l = r[i] = [], u, a = 0; a < s; ++a)
      (u = o[a]) && e.call(u, u.__data__, a, o) && l.push(u);
  return new gn(r, this._parents, this._name, this._id);
}
function IS(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, r = t.length, i = n.length, o = Math.min(r, i), s = new Array(r), l = 0; l < o; ++l)
    for (var u = t[l], a = n[l], c = u.length, f = s[l] = new Array(c), d, h = 0; h < c; ++h)
      (d = u[h] || a[h]) && (f[h] = d);
  for (; l < r; ++l)
    s[l] = t[l];
  return new gn(s, this._parents, this._name, this._id);
}
function PS(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function MS(e, t, n) {
  var r, i, o = PS(t) ? Uc : en;
  return function() {
    var s = o(this, e), l = s.on;
    l !== r && (i = (r = l).copy()).on(t, n), s.on = i;
  };
}
function TS(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Ht(this.node(), n).on.on(e) : this.each(MS(n, e, t));
}
function LS(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function $S() {
  return this.on("end.remove", LS(this._id));
}
function jS(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Oc(e));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var l = r[s], u = l.length, a = o[s] = new Array(u), c, f, d = 0; d < u; ++d)
      (c = l[d]) && (f = e.call(c, c.__data__, d, l)) && ("__data__" in c && (f.__data__ = c.__data__), a[d] = f, kl(a[d], t, n, d, a, Ht(c, n)));
  return new gn(o, this._parents, t, n);
}
function RS(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = b0(e));
  for (var r = this._groups, i = r.length, o = [], s = [], l = 0; l < i; ++l)
    for (var u = r[l], a = u.length, c, f = 0; f < a; ++f)
      if (c = u[f]) {
        for (var d = e.call(c, c.__data__, f, u), h, g = Ht(c, n), x = 0, E = d.length; x < E; ++x)
          (h = d[x]) && kl(h, t, n, x, d, g);
        o.push(d), s.push(c);
      }
  return new gn(o, s, t, n);
}
var AS = vo.prototype.constructor;
function OS() {
  return new AS(this._groups, this._parents);
}
function BS(e, t) {
  var n, r, i;
  return function() {
    var o = Xr(this, e), s = (this.style.removeProperty(e), Xr(this, e));
    return o === s ? null : o === n && s === r ? i : i = t(n = o, r = s);
  };
}
function q0(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function FS(e, t, n) {
  var r, i = n + "", o;
  return function() {
    var s = Xr(this, e);
    return s === i ? null : s === r ? o : o = t(r = s, n);
  };
}
function DS(e, t, n) {
  var r, i, o;
  return function() {
    var s = Xr(this, e), l = n(this), u = l + "";
    return l == null && (u = l = (this.style.removeProperty(e), Xr(this, e))), s === u ? null : s === r && u === i ? o : (i = u, o = t(r = s, l));
  };
}
function zS(e, t) {
  var n, r, i, o = "style." + t, s = "end." + o, l;
  return function() {
    var u = en(this, e), a = u.on, c = u.value[o] == null ? l || (l = q0(t)) : void 0;
    (a !== n || i !== c) && (r = (n = a).copy()).on(s, i = c), u.on = r;
  };
}
function US(e, t, n) {
  var r = (e += "") == "transform" ? HE : K0;
  return t == null ? this.styleTween(e, BS(e, r)).on("end.style." + e, q0(e)) : typeof t == "function" ? this.styleTween(e, DS(e, r, Hc(this, "style." + e, t))).each(zS(this._id, e)) : this.styleTween(e, FS(e, r, t), n).on("end.style." + e, null);
}
function HS(e, t, n) {
  return function(r) {
    this.style.setProperty(e, t.call(this, r), n);
  };
}
function VS(e, t, n) {
  var r, i;
  function o() {
    var s = t.apply(this, arguments);
    return s !== i && (r = (i = s) && HS(e, s, n)), r;
  }
  return o._value = t, o;
}
function WS(e, t, n) {
  var r = "style." + (e += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  return this.tween(r, VS(e, t, n ?? ""));
}
function YS(e) {
  return function() {
    this.textContent = e;
  };
}
function GS(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function XS(e) {
  return this.tween("text", typeof e == "function" ? GS(Hc(this, "text", e)) : YS(e == null ? "" : e + ""));
}
function QS(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function KS(e) {
  var t, n;
  function r() {
    var i = e.apply(this, arguments);
    return i !== n && (t = (n = i) && QS(i)), t;
  }
  return r._value = e, r;
}
function qS(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, KS(e));
}
function ZS() {
  for (var e = this._name, t = this._id, n = Z0(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], l = s.length, u, a = 0; a < l; ++a)
      if (u = s[a]) {
        var c = Ht(u, t);
        kl(u, e, n, a, s, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease
        });
      }
  return new gn(r, this._parents, e, n);
}
function JS() {
  var e, t, n = this, r = n._id, i = n.size();
  return new Promise(function(o, s) {
    var l = { value: s }, u = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var a = en(this, r), c = a.on;
      c !== e && (t = (e = c).copy(), t._.cancel.push(l), t._.interrupt.push(l), t._.end.push(u)), a.on = t;
    }), i === 0 && o();
  });
}
var e2 = 0;
function gn(e, t, n, r) {
  this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function Z0() {
  return ++e2;
}
var rn = vo.prototype;
gn.prototype = {
  constructor: gn,
  select: jS,
  selectAll: RS,
  selectChild: rn.selectChild,
  selectChildren: rn.selectChildren,
  filter: CS,
  merge: IS,
  selection: OS,
  transition: ZS,
  call: rn.call,
  nodes: rn.nodes,
  node: rn.node,
  size: rn.size,
  empty: rn.empty,
  each: rn.each,
  on: TS,
  attr: fS,
  attrTween: mS,
  style: US,
  styleTween: WS,
  text: XS,
  textTween: qS,
  remove: $S,
  tween: iS,
  delay: wS,
  duration: ES,
  ease: kS,
  easeVarying: bS,
  end: JS,
  [Symbol.iterator]: rn[Symbol.iterator]
};
function t2(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var n2 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: t2
};
function r2(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function i2(e) {
  var t, n;
  e instanceof gn ? (t = e._id, e = e._name) : (t = Z0(), (n = n2).time = zc(), e = e == null ? null : e + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], l = s.length, u, a = 0; a < l; ++a)
      (u = s[a]) && kl(u, e, t, a, s, n || r2(u, t));
  return new gn(r, this._parents, e, t);
}
vo.prototype.interrupt = tS;
vo.prototype.transition = i2;
const Qo = (e) => () => e;
function o2(e, {
  sourceEvent: t,
  target: n,
  transform: r,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function an(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
an.prototype = {
  constructor: an,
  scale: function(e) {
    return e === 1 ? this : new an(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new an(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Nl = new an(1, 0, 0);
J0.prototype = an.prototype;
function J0(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return Nl;
  return e.__zoom;
}
function pu(e) {
  e.stopImmediatePropagation();
}
function mi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function s2(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function l2() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Ud() {
  return this.__zoom || Nl;
}
function u2(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function a2() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function c2(e, t, n) {
  var r = e.invertX(t[0][0]) - n[0][0], i = e.invertX(t[1][0]) - n[1][0], o = e.invertY(t[0][1]) - n[0][1], s = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s)
  );
}
function em() {
  var e = s2, t = l2, n = c2, r = u2, i = a2, o = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, u = ys, a = _l("start", "zoom", "end"), c, f, d, h = 500, g = 150, x = 0, E = 10;
  function p(N) {
    N.property("__zoom", Ud).on("wheel.zoom", L, { passive: !1 }).on("mousedown.zoom", B).on("dblclick.zoom", V).filter(i).on("touchstart.zoom", z).on("touchmove.zoom", X).on("touchend.zoom touchcancel.zoom", W).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  p.transform = function(N, O, R, j) {
    var M = N.selection ? N.selection() : N;
    M.property("__zoom", Ud), N !== M ? C(N, O, R, j) : M.interrupt().each(function() {
      I(this, arguments).event(j).start().zoom(null, typeof O == "function" ? O.apply(this, arguments) : O).end();
    });
  }, p.scaleBy = function(N, O, R, j) {
    p.scaleTo(N, function() {
      var M = this.__zoom.k, T = typeof O == "function" ? O.apply(this, arguments) : O;
      return M * T;
    }, R, j);
  }, p.scaleTo = function(N, O, R, j) {
    p.transform(N, function() {
      var M = t.apply(this, arguments), T = this.__zoom, F = R == null ? _(M) : typeof R == "function" ? R.apply(this, arguments) : R, D = T.invert(F), H = typeof O == "function" ? O.apply(this, arguments) : O;
      return n(v(w(T, H), F, D), M, s);
    }, R, j);
  }, p.translateBy = function(N, O, R, j) {
    p.transform(N, function() {
      return n(this.__zoom.translate(
        typeof O == "function" ? O.apply(this, arguments) : O,
        typeof R == "function" ? R.apply(this, arguments) : R
      ), t.apply(this, arguments), s);
    }, null, j);
  }, p.translateTo = function(N, O, R, j, M) {
    p.transform(N, function() {
      var T = t.apply(this, arguments), F = this.__zoom, D = j == null ? _(T) : typeof j == "function" ? j.apply(this, arguments) : j;
      return n(Nl.translate(D[0], D[1]).scale(F.k).translate(
        typeof O == "function" ? -O.apply(this, arguments) : -O,
        typeof R == "function" ? -R.apply(this, arguments) : -R
      ), T, s);
    }, j, M);
  };
  function w(N, O) {
    return O = Math.max(o[0], Math.min(o[1], O)), O === N.k ? N : new an(O, N.x, N.y);
  }
  function v(N, O, R) {
    var j = O[0] - R[0] * N.k, M = O[1] - R[1] * N.k;
    return j === N.x && M === N.y ? N : new an(N.k, j, M);
  }
  function _(N) {
    return [(+N[0][0] + +N[1][0]) / 2, (+N[0][1] + +N[1][1]) / 2];
  }
  function C(N, O, R, j) {
    N.on("start.zoom", function() {
      I(this, arguments).event(j).start();
    }).on("interrupt.zoom end.zoom", function() {
      I(this, arguments).event(j).end();
    }).tween("zoom", function() {
      var M = this, T = arguments, F = I(M, T).event(j), D = t.apply(M, T), H = R == null ? _(D) : typeof R == "function" ? R.apply(M, T) : R, Z = Math.max(D[1][0] - D[0][0], D[1][1] - D[0][1]), q = M.__zoom, ie = typeof O == "function" ? O.apply(M, T) : O, oe = u(q.invert(H).concat(Z / q.k), ie.invert(H).concat(Z / ie.k));
      return function(ne) {
        if (ne === 1) ne = ie;
        else {
          var Y = oe(ne), K = Z / Y[2];
          ne = new an(K, H[0] - Y[0] * K, H[1] - Y[1] * K);
        }
        F.zoom(null, ne);
      };
    });
  }
  function I(N, O, R) {
    return !R && N.__zooming || new P(N, O);
  }
  function P(N, O) {
    this.that = N, this.args = O, this.active = 0, this.sourceEvent = null, this.extent = t.apply(N, O), this.taps = 0;
  }
  P.prototype = {
    event: function(N) {
      return N && (this.sourceEvent = N), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(N, O) {
      return this.mouse && N !== "mouse" && (this.mouse[1] = O.invert(this.mouse[0])), this.touch0 && N !== "touch" && (this.touch0[1] = O.invert(this.touch0[0])), this.touch1 && N !== "touch" && (this.touch1[1] = O.invert(this.touch1[0])), this.that.__zoom = O, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(N) {
      var O = ft(this.that).datum();
      a.call(
        N,
        this.that,
        new o2(N, {
          sourceEvent: this.sourceEvent,
          target: p,
          transform: this.that.__zoom,
          dispatch: a
        }),
        O
      );
    }
  };
  function L(N, ...O) {
    if (!e.apply(this, arguments)) return;
    var R = I(this, O).event(N), j = this.__zoom, M = Math.max(o[0], Math.min(o[1], j.k * Math.pow(2, r.apply(this, arguments)))), T = jt(N);
    if (R.wheel)
      (R.mouse[0][0] !== T[0] || R.mouse[0][1] !== T[1]) && (R.mouse[1] = j.invert(R.mouse[0] = T)), clearTimeout(R.wheel);
    else {
      if (j.k === M) return;
      R.mouse = [T, j.invert(T)], xs(this), R.start();
    }
    mi(N), R.wheel = setTimeout(F, g), R.zoom("mouse", n(v(w(j, M), R.mouse[0], R.mouse[1]), R.extent, s));
    function F() {
      R.wheel = null, R.end();
    }
  }
  function B(N, ...O) {
    if (d || !e.apply(this, arguments)) return;
    var R = N.currentTarget, j = I(this, O, !0).event(N), M = ft(N.view).on("mousemove.zoom", H, !0).on("mouseup.zoom", Z, !0), T = jt(N, R), F = N.clientX, D = N.clientY;
    O0(N.view), pu(N), j.mouse = [T, this.__zoom.invert(T)], xs(this), j.start();
    function H(q) {
      if (mi(q), !j.moved) {
        var ie = q.clientX - F, oe = q.clientY - D;
        j.moved = ie * ie + oe * oe > x;
      }
      j.event(q).zoom("mouse", n(v(j.that.__zoom, j.mouse[0] = jt(q, R), j.mouse[1]), j.extent, s));
    }
    function Z(q) {
      M.on("mousemove.zoom mouseup.zoom", null), B0(q.view, j.moved), mi(q), j.event(q).end();
    }
  }
  function V(N, ...O) {
    if (e.apply(this, arguments)) {
      var R = this.__zoom, j = jt(N.changedTouches ? N.changedTouches[0] : N, this), M = R.invert(j), T = R.k * (N.shiftKey ? 0.5 : 2), F = n(v(w(R, T), j, M), t.apply(this, O), s);
      mi(N), l > 0 ? ft(this).transition().duration(l).call(C, F, j, N) : ft(this).call(p.transform, F, j, N);
    }
  }
  function z(N, ...O) {
    if (e.apply(this, arguments)) {
      var R = N.touches, j = R.length, M = I(this, O, N.changedTouches.length === j).event(N), T, F, D, H;
      for (pu(N), F = 0; F < j; ++F)
        D = R[F], H = jt(D, this), H = [H, this.__zoom.invert(H), D.identifier], M.touch0 ? !M.touch1 && M.touch0[2] !== H[2] && (M.touch1 = H, M.taps = 0) : (M.touch0 = H, T = !0, M.taps = 1 + !!c);
      c && (c = clearTimeout(c)), T && (M.taps < 2 && (f = H[0], c = setTimeout(function() {
        c = null;
      }, h)), xs(this), M.start());
    }
  }
  function X(N, ...O) {
    if (this.__zooming) {
      var R = I(this, O).event(N), j = N.changedTouches, M = j.length, T, F, D, H;
      for (mi(N), T = 0; T < M; ++T)
        F = j[T], D = jt(F, this), R.touch0 && R.touch0[2] === F.identifier ? R.touch0[0] = D : R.touch1 && R.touch1[2] === F.identifier && (R.touch1[0] = D);
      if (F = R.that.__zoom, R.touch1) {
        var Z = R.touch0[0], q = R.touch0[1], ie = R.touch1[0], oe = R.touch1[1], ne = (ne = ie[0] - Z[0]) * ne + (ne = ie[1] - Z[1]) * ne, Y = (Y = oe[0] - q[0]) * Y + (Y = oe[1] - q[1]) * Y;
        F = w(F, Math.sqrt(ne / Y)), D = [(Z[0] + ie[0]) / 2, (Z[1] + ie[1]) / 2], H = [(q[0] + oe[0]) / 2, (q[1] + oe[1]) / 2];
      } else if (R.touch0) D = R.touch0[0], H = R.touch0[1];
      else return;
      R.zoom("touch", n(v(F, D, H), R.extent, s));
    }
  }
  function W(N, ...O) {
    if (this.__zooming) {
      var R = I(this, O).event(N), j = N.changedTouches, M = j.length, T, F;
      for (pu(N), d && clearTimeout(d), d = setTimeout(function() {
        d = null;
      }, h), T = 0; T < M; ++T)
        F = j[T], R.touch0 && R.touch0[2] === F.identifier ? delete R.touch0 : R.touch1 && R.touch1[2] === F.identifier && delete R.touch1;
      if (R.touch1 && !R.touch0 && (R.touch0 = R.touch1, delete R.touch1), R.touch0) R.touch0[1] = this.__zoom.invert(R.touch0[0]);
      else if (R.end(), R.taps === 2 && (F = jt(F, this), Math.hypot(f[0] - F[0], f[1] - F[1]) < E)) {
        var D = ft(this).on("dblclick.zoom");
        D && D.apply(this, arguments);
      }
    }
  }
  return p.wheelDelta = function(N) {
    return arguments.length ? (r = typeof N == "function" ? N : Qo(+N), p) : r;
  }, p.filter = function(N) {
    return arguments.length ? (e = typeof N == "function" ? N : Qo(!!N), p) : e;
  }, p.touchable = function(N) {
    return arguments.length ? (i = typeof N == "function" ? N : Qo(!!N), p) : i;
  }, p.extent = function(N) {
    return arguments.length ? (t = typeof N == "function" ? N : Qo([[+N[0][0], +N[0][1]], [+N[1][0], +N[1][1]]]), p) : t;
  }, p.scaleExtent = function(N) {
    return arguments.length ? (o[0] = +N[0], o[1] = +N[1], p) : [o[0], o[1]];
  }, p.translateExtent = function(N) {
    return arguments.length ? (s[0][0] = +N[0][0], s[1][0] = +N[1][0], s[0][1] = +N[0][1], s[1][1] = +N[1][1], p) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, p.constrain = function(N) {
    return arguments.length ? (n = N, p) : n;
  }, p.duration = function(N) {
    return arguments.length ? (l = +N, p) : l;
  }, p.interpolate = function(N) {
    return arguments.length ? (u = N, p) : u;
  }, p.on = function() {
    var N = a.on.apply(a, arguments);
    return N === a ? p : N;
  }, p.clickDistance = function(N) {
    return arguments.length ? (x = (N = +N) * N, p) : Math.sqrt(x);
  }, p.tapDistance = function(N) {
    return arguments.length ? (E = +N, p) : E;
  }, p;
}
const Ut = {
  error001: (e = "react") => `Seems like you have not used ${e === "svelte" ? "SvelteFlowProvider" : "ReactFlowProvider"} as an ancestor. Help: https://${e}flow.dev/error#001`,
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (e) => `Node type "${e}" not found. Using fallback type "default".`,
  error004: () => "The parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (e) => `The old edge with id=${e} does not exist.`,
  error009: (e) => `Marker type "${e}" doesn't exist.`,
  error008: (e, { id: t, sourceHandle: n, targetHandle: r }) => `Couldn't create edge for ${e} handle id: "${e === "source" ? n : r}", edge id: ${t}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (e) => `Edge type "${e}" not found. Using fallback type "default".`,
  error012: (e) => `Node with id "${e}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (e = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${e}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
  error016: (e) => `Edge with id "${e}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`
}, oo = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], tm = ["Enter", " ", "Escape"], nm = {
  "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.ariaLiveMessage": ({ direction: e, x: t, y: n }) => `Moved selected node ${e}. New position, x: ${t}, y: ${n}`,
  "edge.a11yDescription.default": "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
  // Control elements
  "controls.ariaLabel": "Control Panel",
  "controls.zoomIn.ariaLabel": "Zoom In",
  "controls.zoomOut.ariaLabel": "Zoom Out",
  "controls.fitView.ariaLabel": "Fit View",
  "controls.interactive.ariaLabel": "Toggle Interactivity",
  // Mini map
  "minimap.ariaLabel": "Mini Map",
  // Handle
  "handle.ariaLabel": "Handle"
};
var Kr;
(function(e) {
  e.Strict = "strict", e.Loose = "loose";
})(Kr || (Kr = {}));
var er;
(function(e) {
  e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(er || (er = {}));
var so;
(function(e) {
  e.Partial = "partial", e.Full = "full";
})(so || (so = {}));
const rm = {
  inProgress: !1,
  isValid: null,
  from: null,
  fromHandle: null,
  fromPosition: null,
  fromNode: null,
  to: null,
  toHandle: null,
  toPosition: null,
  toNode: null,
  pointer: null
};
var bn;
(function(e) {
  e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(bn || (bn = {}));
var lo;
(function(e) {
  e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(lo || (lo = {}));
var J;
(function(e) {
  e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(J || (J = {}));
const Hd = {
  [J.Left]: J.Right,
  [J.Right]: J.Left,
  [J.Top]: J.Bottom,
  [J.Bottom]: J.Top
};
function im(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const om = (e) => !!e && typeof e == "object" && "id" in e && "source" in e && "target" in e, f2 = (e) => !!e && typeof e == "object" && "id" in e && "position" in e && !("source" in e) && !("target" in e), Vc = (e) => !!e && typeof e == "object" && "id" in e && "internals" in e && !("source" in e) && !("target" in e), xo = (e, t = [0, 0]) => {
  const { width: n, height: r } = tn(e), i = e.origin ?? t, o = n * i[0], s = r * i[1];
  return {
    x: e.position.x - o,
    y: e.position.y - s
  };
}, d2 = (e, t = { nodeOrigin: [0, 0] }) => {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const n = e.reduce((r, i) => {
    const o = typeof i == "string";
    let s = !t.nodeLookup && !o ? i : void 0;
    t.nodeLookup && (s = o ? t.nodeLookup.get(i) : Vc(i) ? i : t.nodeLookup.get(i.id));
    const l = s ? Zs(s, t.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return bl(r, l);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return Cl(n);
}, _o = (e, t = {}) => {
  let n = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, r = !1;
  return e.forEach((i) => {
    (t.filter === void 0 || t.filter(i)) && (n = bl(n, Zs(i)), r = !0);
  }), r ? Cl(n) : { x: 0, y: 0, width: 0, height: 0 };
}, Wc = (e, t, [n, r, i] = [0, 0, 1], o = !1, s = !1) => {
  const l = (t.x - n) / i, u = (t.y - r) / i, a = t.width / i, c = t.height / i, f = [];
  for (const d of e.values()) {
    const { measured: h, selectable: g = !0, hidden: x = !1 } = d;
    if (s && !g || x)
      continue;
    const E = h.width ?? d.width ?? d.initialWidth ?? 0, p = h.height ?? d.height ?? d.initialHeight ?? 0, { x: w, y: v } = d.internals.positionAbsolute, _ = am(l, u, a, c, w, v, E, p), C = E * p, I = o && _ > 0;
    (!d.internals.handleBounds || I || _ >= C || d.dragging) && f.push(d);
  }
  return f;
}, h2 = (e, t) => {
  const n = /* @__PURE__ */ new Set();
  return e.forEach((r) => {
    n.add(r.id);
  }), t.filter((r) => n.has(r.source) || n.has(r.target));
};
function p2(e, t) {
  const n = /* @__PURE__ */ new Map(), r = t != null && t.nodes ? new Set(t.nodes.map((i) => i.id)) : null;
  return e.forEach((i) => {
    let o;
    if (t != null && t.includeHiddenNodes) {
      const { width: s, height: l } = tn(i);
      o = s > 0 && l > 0;
    } else
      o = !!(i.measured.width && i.measured.height && !i.hidden);
    o && (!r || r.has(i.id)) && n.set(i.id, i);
  }), n;
}
async function g2({ nodes: e, width: t, height: n, panZoom: r, minZoom: i, maxZoom: o }, s) {
  if (e.size === 0)
    return !0;
  const l = p2(e, s), u = _o(l), a = Gc(u, t, n, (s == null ? void 0 : s.minZoom) ?? i, (s == null ? void 0 : s.maxZoom) ?? o, (s == null ? void 0 : s.padding) ?? 0.1);
  return await r.setViewport(a, {
    duration: s == null ? void 0 : s.duration,
    ease: s == null ? void 0 : s.ease,
    interpolate: s == null ? void 0 : s.interpolate
  }), !0;
}
function sm({ nodeId: e, nextPosition: t, nodeLookup: n, nodeOrigin: r = [0, 0], nodeExtent: i, onError: o }) {
  const s = n.get(e), l = s.parentId ? n.get(s.parentId) : void 0, { x: u, y: a } = l ? l.internals.positionAbsolute : { x: 0, y: 0 }, c = s.origin ?? r;
  let f = s.extent || i;
  if (s.extent === "parent" && !s.expandParent)
    if (!l)
      o == null || o("005", Ut.error005());
    else {
      const h = l.measured.width, g = l.measured.height;
      h && g && (f = [
        [u, a],
        [u + h, a + g]
      ]);
    }
  else l && ar(s.extent) && (f = [
    [s.extent[0][0] + u, s.extent[0][1] + a],
    [s.extent[1][0] + u, s.extent[1][1] + a]
  ]);
  const d = ar(f) ? ur(t, f, s.measured) : t;
  return (s.measured.width === void 0 || s.measured.height === void 0) && (o == null || o("015", Ut.error015())), {
    position: {
      x: d.x - u + (s.measured.width ?? 0) * c[0],
      y: d.y - a + (s.measured.height ?? 0) * c[1]
    },
    positionAbsolute: d
  };
}
async function m2({ nodesToRemove: e = [], edgesToRemove: t = [], nodes: n, edges: r, onBeforeDelete: i }) {
  const o = new Set(e.map((d) => d.id)), s = [];
  for (const d of n) {
    if (d.deletable === !1)
      continue;
    const h = o.has(d.id), g = !h && d.parentId && s.find((x) => x.id === d.parentId);
    (h || g) && s.push(d);
  }
  const l = new Set(t.map((d) => d.id)), u = r.filter((d) => d.deletable !== !1), c = h2(s, u);
  for (const d of u)
    l.has(d.id) && !c.find((g) => g.id === d.id) && c.push(d);
  if (!i)
    return {
      edges: c,
      nodes: s
    };
  const f = await i({
    nodes: s,
    edges: c
  });
  return typeof f == "boolean" ? f ? { edges: c, nodes: s } : { edges: [], nodes: [] } : f;
}
const qr = (e, t = 0, n = 1) => Math.min(Math.max(e, t), n), ur = (e = { x: 0, y: 0 }, t, n) => ({
  x: qr(e.x, t[0][0], t[1][0] - ((n == null ? void 0 : n.width) ?? 0)),
  y: qr(e.y, t[0][1], t[1][1] - ((n == null ? void 0 : n.height) ?? 0))
});
function lm(e, t, n) {
  const { width: r, height: i } = tn(n), { x: o, y: s } = n.internals.positionAbsolute;
  return ur(e, [
    [o, s],
    [o + r, s + i]
  ], t);
}
const Vd = (e, t, n) => e < t ? qr(Math.abs(e - t), 1, t) / t : e > n ? -qr(Math.abs(e - n), 1, t) / t : 0, Yc = (e, t, n = 15, r = 40) => {
  const i = Vd(e.x, r, t.width - r) * n, o = Vd(e.y, r, t.height - r) * n;
  return [i, o];
}, bl = (e, t) => ({
  x: Math.min(e.x, t.x),
  y: Math.min(e.y, t.y),
  x2: Math.max(e.x2, t.x2),
  y2: Math.max(e.y2, t.y2)
}), La = ({ x: e, y: t, width: n, height: r }) => ({
  x: e,
  y: t,
  x2: e + n,
  y2: t + r
}), Cl = ({ x: e, y: t, x2: n, y2: r }) => ({
  x: e,
  y: t,
  width: n - e,
  height: r - t
}), uo = (e, t = [0, 0]) => {
  var i, o;
  const { x: n, y: r } = Vc(e) ? e.internals.positionAbsolute : xo(e, t);
  return {
    x: n,
    y: r,
    width: ((i = e.measured) == null ? void 0 : i.width) ?? e.width ?? e.initialWidth ?? 0,
    height: ((o = e.measured) == null ? void 0 : o.height) ?? e.height ?? e.initialHeight ?? 0
  };
}, Zs = (e, t = [0, 0]) => {
  var i, o;
  const { x: n, y: r } = Vc(e) ? e.internals.positionAbsolute : xo(e, t);
  return {
    x: n,
    y: r,
    x2: n + (((i = e.measured) == null ? void 0 : i.width) ?? e.width ?? e.initialWidth ?? 0),
    y2: r + (((o = e.measured) == null ? void 0 : o.height) ?? e.height ?? e.initialHeight ?? 0)
  };
}, um = (e, t) => Cl(bl(La(e), La(t))), am = (e, t, n, r, i, o, s, l) => {
  const u = Math.max(0, Math.min(e + n, i + s) - Math.max(e, i)), a = Math.max(0, Math.min(t + r, o + l) - Math.max(t, o));
  return Math.ceil(u * a);
}, Js = (e, t) => am(e.x, e.y, e.width, e.height, t.x, t.y, t.width, t.height), Wd = (e) => Ot(e.width) && Ot(e.height) && Ot(e.x) && Ot(e.y), Ot = (e) => !isNaN(e) && isFinite(e), cm = (e, t) => (n, r) => {
}, Eo = (e, t = [1, 1]) => ({
  x: t[0] * Math.round(e.x / t[0]),
  y: t[1] * Math.round(e.y / t[1])
}), So = ({ x: e, y: t }, [n, r, i], o = !1, s = [1, 1]) => {
  const l = {
    x: (e - n) / i,
    y: (t - r) / i
  };
  return o ? Eo(l, s) : l;
}, Zr = ({ x: e, y: t }, [n, r, i]) => ({
  x: e * i + n,
  y: t * i + r
});
function gr(e, t) {
  if (typeof e == "number")
    return Math.floor((t - t / (1 + e)) * 0.5);
  if (typeof e == "string" && e.endsWith("px")) {
    const n = parseFloat(e);
    if (!Number.isNaN(n))
      return Math.floor(n);
  }
  if (typeof e == "string" && e.endsWith("%")) {
    const n = parseFloat(e);
    if (!Number.isNaN(n))
      return Math.floor(t * n * 0.01);
  }
  return console.error(`The padding value "${e}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function y2(e, t, n) {
  if (typeof e == "string" || typeof e == "number") {
    const r = gr(e, n), i = gr(e, t);
    return {
      top: r,
      right: i,
      bottom: r,
      left: i,
      x: i * 2,
      y: r * 2
    };
  }
  if (typeof e == "object") {
    const r = gr(e.top ?? e.y ?? 0, n), i = gr(e.bottom ?? e.y ?? 0, n), o = gr(e.left ?? e.x ?? 0, t), s = gr(e.right ?? e.x ?? 0, t);
    return { top: r, right: s, bottom: i, left: o, x: o + s, y: r + i };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function v2(e, t, n, r, i, o) {
  const { x: s, y: l } = Zr(e, [t, n, r]), { x: u, y: a } = Zr({ x: e.x + e.width, y: e.y + e.height }, [t, n, r]), c = i - u, f = o - a;
  return {
    left: Math.floor(s),
    top: Math.floor(l),
    right: Math.floor(c),
    bottom: Math.floor(f)
  };
}
const Gc = (e, t, n, r, i, o) => {
  const s = y2(o, t, n), l = (t - s.x) / e.width, u = (n - s.y) / e.height, a = Math.min(l, u), c = qr(a, r, i), f = e.x + e.width / 2, d = e.y + e.height / 2, h = t / 2 - f * c, g = n / 2 - d * c, x = v2(e, h, g, c, t, n), E = {
    left: Math.min(x.left - s.left, 0),
    top: Math.min(x.top - s.top, 0),
    right: Math.min(x.right - s.right, 0),
    bottom: Math.min(x.bottom - s.bottom, 0)
  };
  return {
    x: h - E.left + E.right,
    y: g - E.top + E.bottom,
    zoom: c
  };
}, ao = () => {
  var e;
  return typeof navigator < "u" && ((e = navigator == null ? void 0 : navigator.userAgent) == null ? void 0 : e.indexOf("Mac")) >= 0;
};
function ar(e) {
  return e != null && e !== "parent";
}
function tn(e) {
  var t, n;
  return {
    width: ((t = e.measured) == null ? void 0 : t.width) ?? e.width ?? e.initialWidth ?? 0,
    height: ((n = e.measured) == null ? void 0 : n.height) ?? e.height ?? e.initialHeight ?? 0
  };
}
function fm(e) {
  var t, n;
  return (((t = e.measured) == null ? void 0 : t.width) ?? e.width ?? e.initialWidth) !== void 0 && (((n = e.measured) == null ? void 0 : n.height) ?? e.height ?? e.initialHeight) !== void 0;
}
function dm(e, t = { width: 0, height: 0 }, n, r, i) {
  const o = { ...e }, s = r.get(n);
  if (s) {
    const l = s.origin || i;
    o.x += s.internals.positionAbsolute.x - (t.width ?? 0) * l[0], o.y += s.internals.positionAbsolute.y - (t.height ?? 0) * l[1];
  }
  return o;
}
function Yd(e, t) {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
}
function w2() {
  let e, t;
  return { promise: new Promise((r, i) => {
    e = r, t = i;
  }), resolve: e, reject: t };
}
function x2(e) {
  return { ...nm, ...e || {} };
}
function Oi(e, { snapGrid: t = [0, 0], snapToGrid: n = !1, transform: r, containerBounds: i }) {
  const { x: o, y: s } = Bt(e), l = So({ x: o - ((i == null ? void 0 : i.left) ?? 0), y: s - ((i == null ? void 0 : i.top) ?? 0) }, r), { x: u, y: a } = n ? Eo(l, t) : l;
  return {
    xSnapped: u,
    ySnapped: a,
    ...l
  };
}
const Xc = (e) => ({
  width: e.offsetWidth,
  height: e.offsetHeight
}), hm = (e) => {
  var t;
  return ((t = e == null ? void 0 : e.getRootNode) == null ? void 0 : t.call(e)) || (window == null ? void 0 : window.document);
}, _2 = ["INPUT", "SELECT", "TEXTAREA"];
function pm(e) {
  var r, i;
  const t = ((i = (r = e.composedPath) == null ? void 0 : r.call(e)) == null ? void 0 : i[0]) || e.target;
  return (t == null ? void 0 : t.nodeType) !== 1 ? !1 : _2.includes(t.nodeName) || t.hasAttribute("contenteditable") || !!t.closest(".nokey");
}
const gm = (e) => "clientX" in e, Bt = (e, t) => {
  var o, s;
  const n = gm(e), r = n ? e.clientX : (o = e.touches) == null ? void 0 : o[0].clientX, i = n ? e.clientY : (s = e.touches) == null ? void 0 : s[0].clientY;
  return {
    x: r - ((t == null ? void 0 : t.left) ?? 0),
    y: i - ((t == null ? void 0 : t.top) ?? 0)
  };
}, Gd = (e, t, n, r, i) => {
  const o = t.querySelectorAll(`.${e}`);
  return !o || !o.length ? null : Array.from(o).map((s) => {
    const l = s.getBoundingClientRect();
    return {
      id: s.getAttribute("data-handleid"),
      type: e,
      nodeId: i,
      position: s.getAttribute("data-handlepos"),
      x: (l.left - n.left) / r,
      y: (l.top - n.top) / r,
      ...Xc(s)
    };
  });
};
function mm({ sourceX: e, sourceY: t, targetX: n, targetY: r, sourceControlX: i, sourceControlY: o, targetControlX: s, targetControlY: l }) {
  const u = e * 0.125 + i * 0.375 + s * 0.375 + n * 0.125, a = t * 0.125 + o * 0.375 + l * 0.375 + r * 0.125, c = Math.abs(u - e), f = Math.abs(a - t);
  return [u, a, c, f];
}
function Ko(e, t) {
  return e >= 0 ? 0.5 * e : t * 25 * Math.sqrt(-e);
}
function Xd({ pos: e, x1: t, y1: n, x2: r, y2: i, c: o }) {
  switch (e) {
    case J.Left:
      return [t - Ko(t - r, o), n];
    case J.Right:
      return [t + Ko(r - t, o), n];
    case J.Top:
      return [t, n - Ko(n - i, o)];
    case J.Bottom:
      return [t, n + Ko(i - n, o)];
  }
}
function Il({ sourceX: e, sourceY: t, sourcePosition: n = J.Bottom, targetX: r, targetY: i, targetPosition: o = J.Top, curvature: s = 0.25 }) {
  const [l, u] = Xd({
    pos: n,
    x1: e,
    y1: t,
    x2: r,
    y2: i,
    c: s
  }), [a, c] = Xd({
    pos: o,
    x1: r,
    y1: i,
    x2: e,
    y2: t,
    c: s
  }), [f, d, h, g] = mm({
    sourceX: e,
    sourceY: t,
    targetX: r,
    targetY: i,
    sourceControlX: l,
    sourceControlY: u,
    targetControlX: a,
    targetControlY: c
  });
  return [
    `M${e},${t} C${l},${u} ${a},${c} ${r},${i}`,
    f,
    d,
    h,
    g
  ];
}
function ym({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
  const i = Math.abs(n - e) / 2, o = n < e ? n + i : n - i, s = Math.abs(r - t) / 2, l = r < t ? r + s : r - s;
  return [o, l, i, s];
}
function E2({ sourceNode: e, targetNode: t, selected: n = !1, zIndex: r = 0, elevateOnSelect: i = !1, zIndexMode: o = "basic" }) {
  if (o === "manual")
    return r;
  const s = i && n ? r + 1e3 : r, l = Math.max(e.parentId || i && e.selected ? e.internals.z : 0, t.parentId || i && t.selected ? t.internals.z : 0);
  return s + l;
}
function S2({ sourceNode: e, targetNode: t, width: n, height: r, transform: i }) {
  const o = bl(Zs(e), Zs(t));
  o.x === o.x2 && (o.x2 += 1), o.y === o.y2 && (o.y2 += 1);
  const s = {
    x: -i[0] / i[2],
    y: -i[1] / i[2],
    width: n / i[2],
    height: r / i[2]
  };
  return Js(s, Cl(o)) > 0;
}
const k2 = ({ source: e, sourceHandle: t, target: n, targetHandle: r }) => `xy-edge__${e}${t || ""}-${n}${r || ""}`, N2 = (e, t) => t.some((n) => n.source === e.source && n.target === e.target && (n.sourceHandle === e.sourceHandle || !n.sourceHandle && !e.sourceHandle) && (n.targetHandle === e.targetHandle || !n.targetHandle && !e.targetHandle)), b2 = (e, t, n = {}) => {
  var o;
  if (!e.source || !e.target)
    return (o = n.onError) == null || o.call(n, "006", Ut.error006()), t;
  const r = n.getEdgeId || k2;
  let i;
  return om(e) ? i = { ...e } : i = {
    ...e,
    id: r(e)
  }, N2(i, t) ? t : (i.sourceHandle === null && delete i.sourceHandle, i.targetHandle === null && delete i.targetHandle, t.concat(i));
};
function vm({ sourceX: e, sourceY: t, targetX: n, targetY: r }) {
  const [i, o, s, l] = ym({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: r
  });
  return [`M ${e},${t}L ${n},${r}`, i, o, s, l];
}
const Qd = {
  [J.Left]: { x: -1, y: 0 },
  [J.Right]: { x: 1, y: 0 },
  [J.Top]: { x: 0, y: -1 },
  [J.Bottom]: { x: 0, y: 1 }
}, C2 = ({ source: e, sourcePosition: t = J.Bottom, target: n }) => t === J.Left || t === J.Right ? e.x < n.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < n.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, Kd = (e, t) => Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
function I2({ source: e, sourcePosition: t = J.Bottom, target: n, targetPosition: r = J.Top, center: i, offset: o, stepPosition: s }) {
  const l = Qd[t], u = Qd[r], a = { x: e.x + l.x * o, y: e.y + l.y * o }, c = { x: n.x + u.x * o, y: n.y + u.y * o }, f = C2({
    source: a,
    sourcePosition: t,
    target: c
  }), d = f.x !== 0 ? "x" : "y", h = f[d];
  let g = [], x, E;
  const p = { x: 0, y: 0 }, w = { x: 0, y: 0 }, [, , v, _] = ym({
    sourceX: e.x,
    sourceY: e.y,
    targetX: n.x,
    targetY: n.y
  });
  if (l[d] * u[d] === -1) {
    d === "x" ? (x = i.x ?? a.x + (c.x - a.x) * s, E = i.y ?? (a.y + c.y) / 2) : (x = i.x ?? (a.x + c.x) / 2, E = i.y ?? a.y + (c.y - a.y) * s);
    const L = [
      { x, y: a.y },
      { x, y: c.y }
    ], B = [
      { x: a.x, y: E },
      { x: c.x, y: E }
    ];
    l[d] === h ? g = d === "x" ? L : B : g = d === "x" ? B : L;
  } else {
    const L = [{ x: a.x, y: c.y }], B = [{ x: c.x, y: a.y }];
    if (d === "x" ? g = l.x === h ? B : L : g = l.y === h ? L : B, t === r) {
      const N = Math.abs(e[d] - n[d]);
      if (N <= o) {
        const O = Math.min(o - 1, o - N);
        l[d] === h ? p[d] = (a[d] > e[d] ? -1 : 1) * O : w[d] = (c[d] > n[d] ? -1 : 1) * O;
      }
    }
    if (t !== r) {
      const N = d === "x" ? "y" : "x", O = l[d] === u[N], R = a[N] > c[N], j = a[N] < c[N];
      (l[d] === 1 && (!O && R || O && j) || l[d] !== 1 && (!O && j || O && R)) && (g = d === "x" ? L : B);
    }
    const V = { x: a.x + p.x, y: a.y + p.y }, z = { x: c.x + w.x, y: c.y + w.y }, X = Math.max(Math.abs(V.x - g[0].x), Math.abs(z.x - g[0].x)), W = Math.max(Math.abs(V.y - g[0].y), Math.abs(z.y - g[0].y));
    X >= W ? (x = (V.x + z.x) / 2, E = g[0].y) : (x = g[0].x, E = (V.y + z.y) / 2);
  }
  const C = { x: a.x + p.x, y: a.y + p.y }, I = { x: c.x + w.x, y: c.y + w.y };
  return [[
    e,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...C.x !== g[0].x || C.y !== g[0].y ? [C] : [],
    ...g,
    ...I.x !== g[g.length - 1].x || I.y !== g[g.length - 1].y ? [I] : [],
    n
  ], x, E, v, _];
}
function P2(e, t, n, r) {
  const i = Math.min(Kd(e, t) / 2, Kd(t, n) / 2, r), { x: o, y: s } = t;
  if (e.x === o && o === n.x || e.y === s && s === n.y)
    return `L${o} ${s}`;
  if (e.y === s) {
    const a = e.x < n.x ? -1 : 1, c = e.y < n.y ? 1 : -1;
    return `L ${o + i * a},${s}Q ${o},${s} ${o},${s + i * c}`;
  }
  const l = e.x < n.x ? 1 : -1, u = e.y < n.y ? -1 : 1;
  return `L ${o},${s + i * u}Q ${o},${s} ${o + i * l},${s}`;
}
function $a({ sourceX: e, sourceY: t, sourcePosition: n = J.Bottom, targetX: r, targetY: i, targetPosition: o = J.Top, borderRadius: s = 5, centerX: l, centerY: u, offset: a = 20, stepPosition: c = 0.5 }) {
  const [f, d, h, g, x] = I2({
    source: { x: e, y: t },
    sourcePosition: n,
    target: { x: r, y: i },
    targetPosition: o,
    center: { x: l, y: u },
    offset: a,
    stepPosition: c
  });
  let E = `M${f[0].x} ${f[0].y}`;
  for (let p = 1; p < f.length - 1; p++)
    E += P2(f[p - 1], f[p], f[p + 1], s);
  return E += `L${f[f.length - 1].x} ${f[f.length - 1].y}`, [E, d, h, g, x];
}
function qd(e) {
  var t;
  return e && !!(e.internals.handleBounds || (t = e.handles) != null && t.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function M2(e) {
  var f;
  const { sourceNode: t, targetNode: n } = e;
  if (!qd(t) || !qd(n))
    return null;
  const r = t.internals.handleBounds || Zd(t.handles), i = n.internals.handleBounds || Zd(n.handles), o = Jd((r == null ? void 0 : r.source) ?? [], e.sourceHandle), s = Jd(
    // when connection type is loose we can define all handles as sources and connect source -> source
    e.connectionMode === Kr.Strict ? (i == null ? void 0 : i.target) ?? [] : ((i == null ? void 0 : i.target) ?? []).concat((i == null ? void 0 : i.source) ?? []),
    e.targetHandle
  );
  if (!o || !s)
    return (f = e.onError) == null || f.call(e, "008", Ut.error008(o ? "target" : "source", {
      id: e.id,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle
    })), null;
  const l = (o == null ? void 0 : o.position) || J.Bottom, u = (s == null ? void 0 : s.position) || J.Top, a = cr(t, o, l), c = cr(n, s, u);
  return {
    sourceX: a.x,
    sourceY: a.y,
    targetX: c.x,
    targetY: c.y,
    sourcePosition: l,
    targetPosition: u
  };
}
function Zd(e) {
  if (!e)
    return null;
  const t = [], n = [];
  for (const r of e)
    r.width = r.width ?? 1, r.height = r.height ?? 1, r.type === "source" ? t.push(r) : r.type === "target" && n.push(r);
  return {
    source: t,
    target: n
  };
}
function cr(e, t, n = J.Left, r = !1) {
  const i = ((t == null ? void 0 : t.x) ?? 0) + e.internals.positionAbsolute.x, o = ((t == null ? void 0 : t.y) ?? 0) + e.internals.positionAbsolute.y, { width: s, height: l } = t ?? tn(e);
  if (r)
    return { x: i + s / 2, y: o + l / 2 };
  switch ((t == null ? void 0 : t.position) ?? n) {
    case J.Top:
      return { x: i + s / 2, y: o };
    case J.Right:
      return { x: i + s, y: o + l / 2 };
    case J.Bottom:
      return { x: i + s / 2, y: o + l };
    case J.Left:
      return { x: i, y: o + l / 2 };
  }
}
function Jd(e, t) {
  return e && (t ? e.find((n) => n.id === t) : e[0]) || null;
}
function ja(e, t) {
  return e ? typeof e == "string" ? e : `${t ? `${t}__` : ""}${Object.keys(e).sort().map((r) => `${r}=${e[r]}`).join("&")}` : "";
}
function T2(e, { id: t, defaultColor: n, defaultMarkerStart: r, defaultMarkerEnd: i }) {
  const o = /* @__PURE__ */ new Set();
  return e.reduce((s, l) => ([l.markerStart || r, l.markerEnd || i].forEach((u) => {
    if (u && typeof u == "object") {
      const a = ja(u, t);
      o.has(a) || (s.push({ id: a, color: u.color || n, ...u }), o.add(a));
    }
  }), s), []).sort((s, l) => s.id.localeCompare(l.id));
}
const wm = 1e3, L2 = 10, Qc = {
  nodeOrigin: [0, 0],
  nodeExtent: oo,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, $2 = {
  ...Qc,
  checkEquality: !0
};
function Kc(e, t) {
  const n = { ...e };
  for (const r in t)
    t[r] !== void 0 && (n[r] = t[r]);
  return n;
}
function j2(e, t, n) {
  const r = Kc(Qc, n);
  for (const i of e.values())
    if (i.parentId)
      Zc(i, e, t, r);
    else {
      const o = xo(i, r.nodeOrigin), s = ar(i.extent) ? i.extent : r.nodeExtent, l = ur(o, s, tn(i));
      i.internals.positionAbsolute = l;
    }
}
function R2(e, t) {
  if (!e.handles)
    return e.measured ? t == null ? void 0 : t.internals.handleBounds : void 0;
  const n = [], r = [];
  for (const i of e.handles) {
    const o = {
      id: i.id,
      width: i.width ?? 1,
      height: i.height ?? 1,
      nodeId: e.id,
      x: i.x,
      y: i.y,
      position: i.position,
      type: i.type
    };
    i.type === "source" ? n.push(o) : i.type === "target" && r.push(o);
  }
  return {
    source: n,
    target: r
  };
}
function qc(e) {
  return e === "manual";
}
function Ra(e, t, n, r = {}) {
  var c, f;
  const i = Kc($2, r), o = { i: 0 }, s = new Map(t), l = i != null && i.elevateNodesOnSelect && !qc(i.zIndexMode) ? wm : 0;
  let u = e.length > 0, a = !1;
  t.clear(), n.clear();
  for (const d of e) {
    let h = s.get(d.id);
    if (i.checkEquality && d === (h == null ? void 0 : h.internals.userNode))
      t.set(d.id, h);
    else {
      const g = xo(d, i.nodeOrigin), x = ar(d.extent) ? d.extent : i.nodeExtent, E = ur(g, x, tn(d));
      h = {
        ...i.defaults,
        ...d,
        measured: {
          width: (c = d.measured) == null ? void 0 : c.width,
          height: (f = d.measured) == null ? void 0 : f.height
        },
        internals: {
          positionAbsolute: E,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: R2(d, h),
          z: xm(d, l, i.zIndexMode),
          userNode: d
        }
      }, t.set(d.id, h);
    }
    (h.measured === void 0 || h.measured.width === void 0 || h.measured.height === void 0) && !h.hidden && (u = !1), d.parentId && Zc(h, t, n, r, o), a || (a = d.selected ?? !1);
  }
  return { nodesInitialized: u, hasSelectedNodes: a };
}
function A2(e, t) {
  if (!e.parentId)
    return;
  const n = t.get(e.parentId);
  n ? n.set(e.id, e) : t.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function Zc(e, t, n, r, i) {
  const { elevateNodesOnSelect: o, nodeOrigin: s, nodeExtent: l, zIndexMode: u } = Kc(Qc, r), a = e.parentId, c = t.get(a);
  if (!c) {
    console.warn(`Parent node ${a} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  A2(e, n), i && !c.parentId && c.internals.rootParentIndex === void 0 && u === "auto" && (c.internals.rootParentIndex = ++i.i, c.internals.z = c.internals.z + i.i * L2), i && c.internals.rootParentIndex !== void 0 && (i.i = c.internals.rootParentIndex);
  const f = o && !qc(u) ? wm : 0, { x: d, y: h, z: g } = O2(e, c, s, l, f, u), { positionAbsolute: x } = e.internals, E = d !== x.x || h !== x.y;
  (E || g !== e.internals.z) && t.set(e.id, {
    ...e,
    internals: {
      ...e.internals,
      positionAbsolute: E ? { x: d, y: h } : x,
      z: g
    }
  });
}
function xm(e, t, n) {
  const r = Ot(e.zIndex) ? e.zIndex : 0;
  return qc(n) ? r : r + (e.selected ? t : 0);
}
function O2(e, t, n, r, i, o) {
  const { x: s, y: l } = t.internals.positionAbsolute, u = tn(e), a = xo(e, n), c = ar(e.extent) ? ur(a, e.extent, u) : a;
  let f = ur({ x: s + c.x, y: l + c.y }, r, u);
  e.extent === "parent" && (f = lm(f, u, t));
  const d = xm(e, i, o), h = t.internals.z ?? 0;
  return {
    x: f.x,
    y: f.y,
    z: h >= d ? h + 1 : d
  };
}
function Jc(e, t, n, r = [0, 0]) {
  var s;
  const i = [], o = /* @__PURE__ */ new Map();
  for (const l of e) {
    const u = t.get(l.parentId);
    if (!u)
      continue;
    const a = ((s = o.get(l.parentId)) == null ? void 0 : s.expandedRect) ?? uo(u), c = um(a, l.rect);
    o.set(l.parentId, { expandedRect: c, parent: u });
  }
  return o.size > 0 && o.forEach(({ expandedRect: l, parent: u }, a) => {
    var v;
    const c = u.internals.positionAbsolute, f = tn(u), d = u.origin ?? r, h = l.x < c.x ? Math.round(Math.abs(c.x - l.x)) : 0, g = l.y < c.y ? Math.round(Math.abs(c.y - l.y)) : 0, x = Math.max(f.width, Math.round(l.width)), E = Math.max(f.height, Math.round(l.height)), p = (x - f.width) * d[0], w = (E - f.height) * d[1];
    (h > 0 || g > 0 || p || w) && (i.push({
      id: a,
      type: "position",
      position: {
        x: u.position.x - h + p,
        y: u.position.y - g + w
      }
    }), (v = n.get(a)) == null || v.forEach((_) => {
      e.some((C) => C.id === _.id) || i.push({
        id: _.id,
        type: "position",
        position: {
          x: _.position.x + h,
          y: _.position.y + g
        }
      });
    })), (f.width < l.width || f.height < l.height || h || g) && i.push({
      id: a,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: x + (h ? d[0] * h - p : 0),
        height: E + (g ? d[1] * g - w : 0)
      }
    });
  }), i;
}
function B2(e, t, n, r, i, o, s) {
  const l = r == null ? void 0 : r.querySelector(".xyflow__viewport");
  let u = !1;
  if (!l)
    return { changes: [], updatedInternals: u };
  const a = [], c = window.getComputedStyle(l), { m22: f } = new window.DOMMatrixReadOnly(c.transform), d = [];
  for (const h of e.values()) {
    const g = t.get(h.id);
    if (!g)
      continue;
    if (g.hidden) {
      t.set(g.id, {
        ...g,
        internals: {
          ...g.internals,
          handleBounds: void 0
        }
      }), u = !0;
      continue;
    }
    const x = Xc(h.nodeElement), E = g.measured.width !== x.width || g.measured.height !== x.height;
    if (!!(x.width && x.height && (E || !g.internals.handleBounds || h.force))) {
      const w = h.nodeElement.getBoundingClientRect(), v = ar(g.extent) ? g.extent : o;
      let { positionAbsolute: _ } = g.internals;
      if (g.parentId && g.extent === "parent") {
        const I = t.get(g.parentId);
        I && (_ = lm(_, x, I));
      } else v && (_ = ur(_, v, x));
      const C = {
        ...g,
        measured: x,
        internals: {
          ...g.internals,
          positionAbsolute: _,
          handleBounds: {
            source: Gd("source", h.nodeElement, w, f, g.id),
            target: Gd("target", h.nodeElement, w, f, g.id)
          }
        }
      };
      t.set(g.id, C), g.parentId && Zc(C, t, n, { nodeOrigin: i, zIndexMode: s }), u = !0, E && (a.push({
        id: g.id,
        type: "dimensions",
        dimensions: x
      }), g.expandParent && g.parentId && d.push({
        id: g.id,
        parentId: g.parentId,
        rect: uo(C, i)
      }));
    }
  }
  if (d.length > 0) {
    const h = Jc(d, t, n, i);
    a.push(...h);
  }
  return { changes: a, updatedInternals: u };
}
async function F2({ delta: e, panZoom: t, transform: n, translateExtent: r, width: i, height: o }) {
  if (!t || !e.x && !e.y)
    return !1;
  const s = await t.setViewportConstrained({
    x: n[0] + e.x,
    y: n[1] + e.y,
    zoom: n[2]
  }, [
    [0, 0],
    [i, o]
  ], r);
  return !!s && (s.x !== n[0] || s.y !== n[1] || s.k !== n[2]);
}
function eh(e, t, n, r, i, o) {
  let s = i;
  const l = r.get(s) || /* @__PURE__ */ new Map();
  r.set(s, l.set(n, t)), s = `${i}-${e}`;
  const u = r.get(s) || /* @__PURE__ */ new Map();
  if (r.set(s, u.set(n, t)), o) {
    s = `${i}-${e}-${o}`;
    const a = r.get(s) || /* @__PURE__ */ new Map();
    r.set(s, a.set(n, t));
  }
}
function _m(e, t, n) {
  e.clear(), t.clear();
  for (const r of n) {
    const { source: i, target: o, sourceHandle: s = null, targetHandle: l = null } = r, u = { edgeId: r.id, source: i, target: o, sourceHandle: s, targetHandle: l }, a = `${i}-${s}--${o}-${l}`, c = `${o}-${l}--${i}-${s}`;
    eh("source", u, c, e, i, s), eh("target", u, a, e, o, l), t.set(r.id, r);
  }
}
function Em(e, t) {
  if (!e.parentId)
    return !1;
  const n = t.get(e.parentId);
  return n ? n.selected ? !0 : Em(n, t) : !1;
}
function th(e, t, n) {
  var i;
  let r = e;
  do {
    if ((i = r == null ? void 0 : r.matches) != null && i.call(r, t))
      return !0;
    if (r === n)
      return !1;
    r = r == null ? void 0 : r.parentElement;
  } while (r);
  return !1;
}
function D2(e, t, n, r) {
  const i = /* @__PURE__ */ new Map();
  for (const [o, s] of e)
    if ((s.selected || s.id === r) && (!s.parentId || !Em(s, e)) && (s.draggable || t && typeof s.draggable > "u")) {
      const l = e.get(o);
      l && i.set(o, {
        id: o,
        position: l.position || { x: 0, y: 0 },
        distance: {
          x: n.x - l.internals.positionAbsolute.x,
          y: n.y - l.internals.positionAbsolute.y
        },
        extent: l.extent,
        parentId: l.parentId,
        origin: l.origin,
        expandParent: l.expandParent,
        internals: {
          positionAbsolute: l.internals.positionAbsolute || { x: 0, y: 0 }
        },
        measured: {
          width: l.measured.width ?? 0,
          height: l.measured.height ?? 0
        }
      });
    }
  return i;
}
function gu({ nodeId: e, dragItems: t, nodeLookup: n, dragging: r = !0 }) {
  var s, l, u;
  const i = [];
  for (const [a, c] of t) {
    const f = (s = n.get(a)) == null ? void 0 : s.internals.userNode;
    f && i.push({
      ...f,
      position: c.position,
      dragging: r
    });
  }
  if (!e)
    return [i[0], i];
  const o = (l = n.get(e)) == null ? void 0 : l.internals.userNode;
  return [
    o ? {
      ...o,
      position: ((u = t.get(e)) == null ? void 0 : u.position) || o.position,
      dragging: r
    } : i[0],
    i
  ];
}
function z2({ dragItems: e, snapGrid: t, x: n, y: r }) {
  const i = e.values().next().value;
  if (!i)
    return null;
  const o = {
    x: n - i.distance.x,
    y: r - i.distance.y
  }, s = Eo(o, t);
  return {
    x: s.x - o.x,
    y: s.y - o.y
  };
}
function U2({ onNodeMouseDown: e, getStoreItems: t, onDragStart: n, onDrag: r, onDragStop: i }) {
  let o = { x: null, y: null }, s = 0, l = /* @__PURE__ */ new Map(), u = !1, a = { x: 0, y: 0 }, c = null, f = !1, d = null, h = !1, g = !1, x = null;
  function E({ noDragClassName: w, handleSelector: v, domNode: _, isSelectable: C, nodeId: I, nodeClickDistance: P = 0 }) {
    d = ft(_);
    function L({ x: X, y: W }) {
      const { nodeLookup: N, nodeExtent: O, snapGrid: R, snapToGrid: j, nodeOrigin: M, onNodeDrag: T, onSelectionDrag: F, onError: D, updateNodePositions: H } = t();
      o = { x: X, y: W };
      let Z = !1;
      const q = l.size > 1, ie = q && O ? La(_o(l)) : null, oe = q && j ? z2({
        dragItems: l,
        snapGrid: R,
        x: X,
        y: W
      }) : null;
      for (const [ne, Y] of l) {
        if (!N.has(ne))
          continue;
        let K = { x: X - Y.distance.x, y: W - Y.distance.y };
        j && (K = oe ? {
          x: Math.round(K.x + oe.x),
          y: Math.round(K.y + oe.y)
        } : Eo(K, R));
        let se = null;
        if (q && O && !Y.extent && ie) {
          const { positionAbsolute: te } = Y.internals, ue = te.x - ie.x + O[0][0], fe = te.x + Y.measured.width - ie.x2 + O[1][0], he = te.y - ie.y + O[0][1], we = te.y + Y.measured.height - ie.y2 + O[1][1];
          se = [
            [ue, he],
            [fe, we]
          ];
        }
        const { position: le, positionAbsolute: re } = sm({
          nodeId: ne,
          nextPosition: K,
          nodeLookup: N,
          nodeExtent: se || O,
          nodeOrigin: M,
          onError: D
        });
        Z = Z || Y.position.x !== le.x || Y.position.y !== le.y, Y.position = le, Y.internals.positionAbsolute = re;
      }
      if (g = g || Z, !!Z && (H(l, !0), x && (r || T || !I && F))) {
        const [ne, Y] = gu({
          nodeId: I,
          dragItems: l,
          nodeLookup: N
        });
        r == null || r(x, l, ne, Y), T == null || T(x, ne, Y), I || F == null || F(x, Y);
      }
    }
    async function B() {
      if (!c)
        return;
      const { transform: X, panBy: W, autoPanSpeed: N, autoPanOnNodeDrag: O } = t();
      if (!O) {
        u = !1, cancelAnimationFrame(s);
        return;
      }
      const [R, j] = Yc(a, c, N);
      (R !== 0 || j !== 0) && (o.x = (o.x ?? 0) - R / X[2], o.y = (o.y ?? 0) - j / X[2], await W({ x: R, y: j }) && L(o)), s = requestAnimationFrame(B);
    }
    function V(X) {
      var q;
      const { nodeLookup: W, multiSelectionActive: N, nodesDraggable: O, transform: R, snapGrid: j, snapToGrid: M, selectNodesOnDrag: T, onNodeDragStart: F, onSelectionDragStart: D, unselectNodesAndEdges: H } = t();
      f = !0, (!T || !C) && !N && I && ((q = W.get(I)) != null && q.selected || H()), C && T && I && (e == null || e(I));
      const Z = Oi(X.sourceEvent, { transform: R, snapGrid: j, snapToGrid: M, containerBounds: c });
      if (o = Z, l = D2(W, O, Z, I), l.size > 0 && (n || F || !I && D)) {
        const [ie, oe] = gu({
          nodeId: I,
          dragItems: l,
          nodeLookup: W
        });
        n == null || n(X.sourceEvent, l, ie, oe), F == null || F(X.sourceEvent, ie, oe), I || D == null || D(X.sourceEvent, oe);
      }
    }
    const z = F0().clickDistance(P).on("start", (X) => {
      const { domNode: W, nodeDragThreshold: N, transform: O, snapGrid: R, snapToGrid: j } = t();
      c = (W == null ? void 0 : W.getBoundingClientRect()) || null, h = !1, g = !1, x = X.sourceEvent, N === 0 && V(X), o = Oi(X.sourceEvent, { transform: O, snapGrid: R, snapToGrid: j, containerBounds: c }), a = Bt(X.sourceEvent, c);
    }).on("drag", (X) => {
      const { autoPanOnNodeDrag: W, transform: N, snapGrid: O, snapToGrid: R, nodeDragThreshold: j, nodeLookup: M } = t(), T = Oi(X.sourceEvent, { transform: N, snapGrid: O, snapToGrid: R, containerBounds: c });
      if (x = X.sourceEvent, (X.sourceEvent.type === "touchmove" && X.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      I && !M.has(I)) && (h = !0), !h) {
        if (!u && W && f && (u = !0, B()), !f) {
          const F = Bt(X.sourceEvent, c), D = F.x - a.x, H = F.y - a.y;
          Math.sqrt(D * D + H * H) > j && V(X);
        }
        (o.x !== T.xSnapped || o.y !== T.ySnapped) && l && f && (a = Bt(X.sourceEvent, c), L(T));
      }
    }).on("end", (X) => {
      if (!f || h) {
        h && l.size > 0 && t().updateNodePositions(l, !1);
        return;
      }
      if (u = !1, f = !1, cancelAnimationFrame(s), l.size > 0) {
        const { nodeLookup: W, updateNodePositions: N, onNodeDragStop: O, onSelectionDragStop: R } = t();
        if (g && (N(l, !1), g = !1), i || O || !I && R) {
          const [j, M] = gu({
            nodeId: I,
            dragItems: l,
            nodeLookup: W,
            dragging: !1
          });
          i == null || i(X.sourceEvent, l, j, M), O == null || O(X.sourceEvent, j, M), I || R == null || R(X.sourceEvent, M);
        }
      }
    }).filter((X) => {
      const W = X.target;
      return !X.button && (!w || !th(W, `.${w}`, _)) && (!v || th(W, v, _));
    });
    d.call(z);
  }
  function p() {
    d == null || d.on(".drag", null);
  }
  return {
    update: E,
    destroy: p
  };
}
function H2(e, t, n) {
  const r = [], i = {
    x: e.x - n,
    y: e.y - n,
    width: n * 2,
    height: n * 2
  };
  for (const o of t.values())
    Js(i, uo(o)) > 0 && r.push(o);
  return r;
}
const V2 = 250;
function W2(e, t, n, r) {
  var l, u;
  let i = [], o = 1 / 0;
  const s = H2(e, n, t + V2);
  for (const a of s) {
    const c = [...((l = a.internals.handleBounds) == null ? void 0 : l.source) ?? [], ...((u = a.internals.handleBounds) == null ? void 0 : u.target) ?? []];
    for (const f of c) {
      if (r.nodeId === f.nodeId && r.type === f.type && r.id === f.id)
        continue;
      const { x: d, y: h } = cr(a, f, f.position, !0), g = Math.sqrt(Math.pow(d - e.x, 2) + Math.pow(h - e.y, 2));
      g > t || (g < o ? (i = [{ ...f, x: d, y: h }], o = g) : g === o && i.push({ ...f, x: d, y: h }));
    }
  }
  if (!i.length)
    return null;
  if (i.length > 1) {
    const a = r.type === "source" ? "target" : "source";
    return i.find((c) => c.type === a) ?? i[0];
  }
  return i[0];
}
function Sm(e, t, n, r, i, o = !1) {
  var a, c, f;
  const s = r.get(e);
  if (!s)
    return null;
  const l = i === "strict" ? (a = s.internals.handleBounds) == null ? void 0 : a[t] : [...((c = s.internals.handleBounds) == null ? void 0 : c.source) ?? [], ...((f = s.internals.handleBounds) == null ? void 0 : f.target) ?? []], u = (n ? l == null ? void 0 : l.find((d) => d.id === n) : l == null ? void 0 : l[0]) ?? null;
  return u && o ? { ...u, ...cr(s, u, u.position, !0) } : u;
}
function km(e, t) {
  return e || (t != null && t.classList.contains("target") ? "target" : t != null && t.classList.contains("source") ? "source" : null);
}
function Y2(e, t) {
  let n = null;
  return t ? n = !0 : e && !t && (n = !1), n;
}
const Nm = () => !0;
function G2(e, { connectionMode: t, connectionRadius: n, handleId: r, nodeId: i, edgeUpdaterType: o, isTarget: s, domNode: l, nodeLookup: u, lib: a, autoPanOnConnect: c, flowId: f, panBy: d, cancelConnection: h, onConnectStart: g, onConnect: x, onConnectEnd: E, isValidConnection: p = Nm, onReconnectEnd: w, updateConnection: v, getTransform: _, getFromHandle: C, autoPanSpeed: I, dragThreshold: P = 1, handleDomNode: L }) {
  const B = hm(e.target);
  let V = 0, z;
  const { x: X, y: W } = Bt(e), N = km(o, L), O = l == null ? void 0 : l.getBoundingClientRect();
  let R = !1;
  if (!O || !N)
    return;
  const j = Sm(i, N, r, u, t);
  if (!j)
    return;
  let M = Bt(e, O), T = !1, F = null, D = !1, H = null;
  function Z() {
    if (!c || !O)
      return;
    const [le, re] = Yc(M, O, I);
    d({ x: le, y: re }), V = requestAnimationFrame(Z);
  }
  const q = {
    ...j,
    nodeId: i,
    type: N,
    position: j.position
  }, ie = u.get(i);
  let ne = {
    inProgress: !0,
    isValid: null,
    from: cr(ie, q, J.Left, !0),
    fromHandle: q,
    fromPosition: q.position,
    fromNode: ie,
    to: M,
    toHandle: null,
    toPosition: Hd[q.position],
    toNode: null,
    pointer: M
  };
  function Y() {
    R = !0, v(ne), g == null || g(e, { nodeId: i, handleId: r, handleType: N });
  }
  P === 0 && Y();
  function K(le) {
    if (!R) {
      const { x: we, y: et } = Bt(le), xt = we - X, at = et - W;
      if (!(xt * xt + at * at > P * P))
        return;
      Y();
    }
    if (!C() || !q) {
      se(le);
      return;
    }
    const re = _();
    M = Bt(le, O), z = W2(So(M, re, !1, [1, 1]), n, u, q), T || (Z(), T = !0);
    const te = bm(le, {
      handle: z,
      connectionMode: t,
      fromNodeId: i,
      fromHandleId: r,
      fromType: s ? "target" : "source",
      isValidConnection: p,
      doc: B,
      lib: a,
      flowId: f,
      nodeLookup: u
    });
    H = te.handleDomNode, F = te.connection, D = Y2(!!z, te.isValid);
    const ue = u.get(i), fe = ue ? cr(ue, q, J.Left, !0) : ne.from, he = {
      ...ne,
      from: fe,
      isValid: D,
      to: te.toHandle && D ? Zr({ x: te.toHandle.x, y: te.toHandle.y }, re) : M,
      toHandle: te.toHandle,
      toPosition: D && te.toHandle ? te.toHandle.position : Hd[q.position],
      toNode: te.toHandle ? u.get(te.toHandle.nodeId) : null,
      pointer: M
    };
    v(he), ne = he;
  }
  function se(le) {
    if (!("touches" in le && le.touches.length > 0)) {
      if (R) {
        (z || H) && F && D && (x == null || x(F));
        const { inProgress: re, ...te } = ne, ue = {
          ...te,
          toPosition: ne.toHandle ? ne.toPosition : null
        };
        E == null || E(le, ue), o && (w == null || w(le, ue));
      }
      h(), cancelAnimationFrame(V), T = !1, D = !1, F = null, H = null, B.removeEventListener("mousemove", K), B.removeEventListener("mouseup", se), B.removeEventListener("touchmove", K), B.removeEventListener("touchend", se);
    }
  }
  B.addEventListener("mousemove", K), B.addEventListener("mouseup", se), B.addEventListener("touchmove", K), B.addEventListener("touchend", se);
}
function bm(e, { handle: t, connectionMode: n, fromNodeId: r, fromHandleId: i, fromType: o, doc: s, lib: l, flowId: u, isValidConnection: a = Nm, nodeLookup: c }) {
  const f = o === "target", d = t ? s.querySelector(`.${l}-flow__handle[data-id="${u}-${t == null ? void 0 : t.nodeId}-${t == null ? void 0 : t.id}-${t == null ? void 0 : t.type}"]`) : null, { x: h, y: g } = Bt(e), x = s.elementFromPoint(h, g), E = x != null && x.classList.contains(`${l}-flow__handle`) ? x : d, p = {
    handleDomNode: E,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (E) {
    const w = km(void 0, E), v = E.getAttribute("data-nodeid"), _ = E.getAttribute("data-handleid"), C = E.classList.contains("connectable"), I = E.classList.contains("connectableend");
    if (!v || !w)
      return p;
    const P = {
      source: f ? v : r,
      sourceHandle: f ? _ : i,
      target: f ? r : v,
      targetHandle: f ? i : _
    };
    p.connection = P;
    const B = C && I && (n === Kr.Strict ? f && w === "source" || !f && w === "target" : v !== r || _ !== i);
    p.isValid = B && a(P), p.toHandle = Sm(v, w, _, c, n, !0);
  }
  return p;
}
const Aa = {
  onPointerDown: G2,
  isValid: bm
};
function X2({ domNode: e, panZoom: t, getTransform: n, getViewScale: r }) {
  const i = ft(e);
  function o({ translateExtent: l, width: u, height: a, zoomStep: c = 1, pannable: f = !0, zoomable: d = !0, inversePan: h = !1 }) {
    const g = (v) => {
      if (v.sourceEvent.type !== "wheel" || !t)
        return;
      const _ = n(), C = v.sourceEvent.ctrlKey && ao() ? 10 : 1, I = -v.sourceEvent.deltaY * (v.sourceEvent.deltaMode === 1 ? 0.05 : v.sourceEvent.deltaMode ? 1 : 2e-3) * c, P = _[2] * Math.pow(2, I * C);
      t.scaleTo(P);
    };
    let x = [0, 0];
    const E = (v) => {
      (v.sourceEvent.type === "mousedown" || v.sourceEvent.type === "touchstart") && (x = [
        v.sourceEvent.clientX ?? v.sourceEvent.touches[0].clientX,
        v.sourceEvent.clientY ?? v.sourceEvent.touches[0].clientY
      ]);
    }, p = (v) => {
      const _ = n();
      if (v.sourceEvent.type !== "mousemove" && v.sourceEvent.type !== "touchmove" || !t)
        return;
      const C = [
        v.sourceEvent.clientX ?? v.sourceEvent.touches[0].clientX,
        v.sourceEvent.clientY ?? v.sourceEvent.touches[0].clientY
      ], I = [C[0] - x[0], C[1] - x[1]];
      x = C;
      const P = r() * Math.max(_[2], Math.log(_[2])) * (h ? -1 : 1), L = {
        x: _[0] - I[0] * P,
        y: _[1] - I[1] * P
      }, B = [
        [0, 0],
        [u, a]
      ];
      t.setViewportConstrained({
        x: L.x,
        y: L.y,
        zoom: _[2]
      }, B, l);
    }, w = em().on("start", E).on("zoom", f ? p : null).on("zoom.wheel", d ? g : null);
    i.call(w, {});
  }
  function s() {
    i.on("zoom", null);
  }
  return {
    update: o,
    destroy: s,
    pointer: jt
  };
}
const Pl = (e) => ({
  x: e.x,
  y: e.y,
  zoom: e.k
}), mu = ({ x: e, y: t, zoom: n }) => Nl.translate(e, t).scale(n), Mr = (e, t) => e.target.closest(`.${t}`), Cm = (e, t) => t === 2 && Array.isArray(e) && e.includes(2), Q2 = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, yu = (e, t = 0, n = Q2, r = () => {
}) => {
  const i = typeof t == "number" && t > 0;
  return i || r(), i ? e.transition().duration(t).ease(n).on("end", r) : e;
}, Im = (e) => {
  const t = e.ctrlKey && ao() ? 10 : 1;
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * t;
};
function K2({ zoomPanValues: e, noWheelClassName: t, d3Selection: n, d3Zoom: r, panOnScrollMode: i, panOnScrollSpeed: o, zoomOnPinch: s, onPanZoomStart: l, onPanZoom: u, onPanZoomEnd: a }) {
  return (c) => {
    if (Mr(c, t))
      return c.ctrlKey && c.preventDefault(), !1;
    c.preventDefault(), c.stopImmediatePropagation();
    const f = n.property("__zoom").k || 1;
    if (c.ctrlKey && s) {
      const E = jt(c), p = Im(c), w = f * Math.pow(2, p);
      r.scaleTo(n, w, E, c);
      return;
    }
    const d = c.deltaMode === 1 ? 20 : 1;
    let h = i === er.Vertical ? 0 : c.deltaX * d, g = i === er.Horizontal ? 0 : c.deltaY * d;
    !ao() && c.shiftKey && i !== er.Vertical && (h = c.deltaY * d, g = 0), r.translateBy(
      n,
      -(h / f) * o,
      -(g / f) * o,
      // @ts-ignore
      { internal: !0 }
    );
    const x = Pl(n.property("__zoom"));
    clearTimeout(e.panScrollTimeout), e.isPanScrolling ? u == null || u(c, x) : (e.isPanScrolling = !0, l == null || l(c, x)), e.panScrollTimeout = setTimeout(() => {
      a == null || a(c, x), e.isPanScrolling = !1;
    }, 150);
  };
}
function q2({ noWheelClassName: e, preventScrolling: t, d3ZoomHandler: n }) {
  return function(r, i) {
    const o = r.type === "wheel", s = !t && o && !r.ctrlKey, l = Mr(r, e);
    if (r.ctrlKey && o && l && r.preventDefault(), s || l)
      return null;
    r.preventDefault(), n.call(this, r, i);
  };
}
function Z2({ zoomPanValues: e, onDraggingChange: t, onPanZoomStart: n }) {
  return (r) => {
    var o, s, l;
    if ((o = r.sourceEvent) != null && o.internal)
      return;
    const i = Pl(r.transform);
    e.mouseButton = ((s = r.sourceEvent) == null ? void 0 : s.button) || 0, e.isZoomingOrPanning = !0, e.prevViewport = i, ((l = r.sourceEvent) == null ? void 0 : l.type) === "mousedown" && t(!0), n && (n == null || n(r.sourceEvent, i));
  };
}
function J2({ zoomPanValues: e, panOnDrag: t, onPaneContextMenu: n, onTransformChange: r, onPanZoom: i }) {
  return (o) => {
    var s, l;
    e.usedRightMouseButton = !!(n && Cm(t, e.mouseButton ?? 0)), (s = o.sourceEvent) != null && s.sync || r([o.transform.x, o.transform.y, o.transform.k]), i && !((l = o.sourceEvent) != null && l.internal) && (i == null || i(o.sourceEvent, Pl(o.transform)));
  };
}
function ek({ zoomPanValues: e, panOnDrag: t, panOnScroll: n, onDraggingChange: r, onPanZoomEnd: i, onPaneContextMenu: o }) {
  return (s) => {
    var l;
    if (!((l = s.sourceEvent) != null && l.internal) && (e.isZoomingOrPanning = !1, o && Cm(t, e.mouseButton ?? 0) && !e.usedRightMouseButton && s.sourceEvent && o(s.sourceEvent), e.usedRightMouseButton = !1, r(!1), i)) {
      const u = Pl(s.transform);
      e.prevViewport = u, clearTimeout(e.timerId), e.timerId = setTimeout(
        () => {
          i == null || i(s.sourceEvent, u);
        },
        // we need a setTimeout for panOnScroll to suppress multiple end events fired during scroll
        n ? 150 : 0
      );
    }
  };
}
function tk({ zoomActivationKeyPressed: e, zoomOnScroll: t, zoomOnPinch: n, panOnDrag: r, panOnScroll: i, zoomOnDoubleClick: o, userSelectionActive: s, noWheelClassName: l, noPanClassName: u, lib: a, connectionInProgress: c }) {
  return (f) => {
    var E;
    const d = e || t, h = n && f.ctrlKey, g = f.type === "wheel";
    if (f.button === 1 && f.type === "mousedown" && (Mr(f, `${a}-flow__node`) || Mr(f, `${a}-flow__edge`)))
      return !0;
    if (!r && !d && !i && !o && !n || s || c && !g || Mr(f, l) && g || Mr(f, u) && (!g || i && g && !e) || !n && f.ctrlKey && g)
      return !1;
    if (!n && f.type === "touchstart" && ((E = f.touches) == null ? void 0 : E.length) > 1)
      return f.preventDefault(), !1;
    if (!d && !i && !h && g || !r && (f.type === "mousedown" || f.type === "touchstart") || Array.isArray(r) && !r.includes(f.button) && f.type === "mousedown")
      return !1;
    const x = Array.isArray(r) && r.includes(f.button) || !f.button || f.button <= 1;
    return (!f.ctrlKey || g) && x;
  };
}
function nk({ domNode: e, minZoom: t, maxZoom: n, translateExtent: r, viewport: i, onPanZoom: o, onPanZoomStart: s, onPanZoomEnd: l, onDraggingChange: u }) {
  const a = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, c = e.getBoundingClientRect();
  let f = [
    [0, 0],
    [c.width, c.height]
  ];
  const d = typeof ResizeObserver < "u" ? new ResizeObserver((W) => {
    const N = W[0];
    N && (f = [
      [0, 0],
      [N.contentRect.width, N.contentRect.height]
    ]);
  }) : null;
  d == null || d.observe(e);
  const h = em().extent(() => f).scaleExtent([t, n]).translateExtent(r), g = ft(e).call(h);
  _({
    x: i.x,
    y: i.y,
    zoom: qr(i.zoom, t, n)
  }, [
    [0, 0],
    [c.width, c.height]
  ], r);
  const x = g.on("wheel.zoom"), E = g.on("dblclick.zoom");
  h.wheelDelta(Im);
  async function p(W, N) {
    return g ? new Promise((O) => {
      h == null || h.interpolate((N == null ? void 0 : N.interpolate) === "linear" ? Ai : ys).transform(yu(g, N == null ? void 0 : N.duration, N == null ? void 0 : N.ease, () => O(!0)), W);
    }) : !1;
  }
  function w({ noWheelClassName: W, noPanClassName: N, onPaneContextMenu: O, userSelectionActive: R, panOnScroll: j, panOnDrag: M, panOnScrollMode: T, panOnScrollSpeed: F, preventScrolling: D, zoomOnPinch: H, zoomOnScroll: Z, zoomOnDoubleClick: q, zoomActivationKeyPressed: ie, lib: oe, onTransformChange: ne, connectionInProgress: Y, paneClickDistance: K, selectionOnDrag: se }) {
    R && !a.isZoomingOrPanning && v();
    const le = j && !ie && !R;
    h.clickDistance(se ? 1 / 0 : !Ot(K) || K < 0 ? 0 : K);
    const re = le ? K2({
      zoomPanValues: a,
      noWheelClassName: W,
      d3Selection: g,
      d3Zoom: h,
      panOnScrollMode: T,
      panOnScrollSpeed: F,
      zoomOnPinch: H,
      onPanZoomStart: s,
      onPanZoom: o,
      onPanZoomEnd: l
    }) : q2({
      noWheelClassName: W,
      preventScrolling: D,
      d3ZoomHandler: x
    });
    g.on("wheel.zoom", re, { passive: !1 });
    const te = Z2({
      zoomPanValues: a,
      onDraggingChange: u,
      onPanZoomStart: s
    });
    h.on("start", te);
    const ue = J2({
      zoomPanValues: a,
      panOnDrag: M,
      onPaneContextMenu: !!O,
      onPanZoom: o,
      onTransformChange: ne
    });
    h.on("zoom", ue);
    const fe = ek({
      zoomPanValues: a,
      panOnDrag: M,
      panOnScroll: j,
      onPaneContextMenu: O,
      onPanZoomEnd: l,
      onDraggingChange: u
    });
    h.on("end", fe);
    const he = tk({
      zoomActivationKeyPressed: ie,
      panOnDrag: M,
      zoomOnScroll: Z,
      panOnScroll: j,
      zoomOnDoubleClick: q,
      zoomOnPinch: H,
      userSelectionActive: R,
      noPanClassName: N,
      noWheelClassName: W,
      lib: oe,
      connectionInProgress: Y
    });
    h.filter(he), q ? g.on("dblclick.zoom", E) : g.on("dblclick.zoom", null);
  }
  function v() {
    h.on("zoom", null);
  }
  async function _(W, N, O) {
    const R = mu(W), j = h == null ? void 0 : h.constrain()(R, N, O);
    return j && await p(j), j;
  }
  async function C(W, N) {
    const O = mu(W);
    return await p(O, N), O;
  }
  function I(W) {
    if (g) {
      const N = mu(W), O = g.property("__zoom");
      (O.k !== W.zoom || O.x !== W.x || O.y !== W.y) && (h == null || h.transform(g, N, null, { sync: !0 }));
    }
  }
  function P() {
    const W = g ? J0(g.node()) : { x: 0, y: 0, k: 1 };
    return { x: W.x, y: W.y, zoom: W.k };
  }
  async function L(W, N) {
    return g ? new Promise((O) => {
      h == null || h.interpolate((N == null ? void 0 : N.interpolate) === "linear" ? Ai : ys).scaleTo(yu(g, N == null ? void 0 : N.duration, N == null ? void 0 : N.ease, () => O(!0)), W);
    }) : !1;
  }
  async function B(W, N) {
    return g ? new Promise((O) => {
      h == null || h.interpolate((N == null ? void 0 : N.interpolate) === "linear" ? Ai : ys).scaleBy(yu(g, N == null ? void 0 : N.duration, N == null ? void 0 : N.ease, () => O(!0)), W);
    }) : !1;
  }
  function V(W) {
    h == null || h.scaleExtent(W);
  }
  function z(W) {
    h == null || h.translateExtent(W);
  }
  function X(W) {
    const N = !Ot(W) || W < 0 ? 0 : W;
    h == null || h.clickDistance(N);
  }
  return {
    update: w,
    destroy: v,
    setViewport: C,
    setViewportConstrained: _,
    getViewport: P,
    scaleTo: L,
    scaleBy: B,
    setScaleExtent: V,
    setTranslateExtent: z,
    syncViewport: I,
    setClickDistance: X
  };
}
var Jr;
(function(e) {
  e.Line = "line", e.Handle = "handle";
})(Jr || (Jr = {}));
function rk({ width: e, prevWidth: t, height: n, prevHeight: r, affectsX: i, affectsY: o }) {
  const s = e - t, l = n - r, u = [s > 0 ? 1 : s < 0 ? -1 : 0, l > 0 ? 1 : l < 0 ? -1 : 0];
  return s && i && (u[0] = u[0] * -1), l && o && (u[1] = u[1] * -1), u;
}
function nh(e) {
  const t = e.includes("right") || e.includes("left"), n = e.includes("bottom") || e.includes("top"), r = e.includes("left"), i = e.includes("top");
  return {
    isHorizontal: t,
    isVertical: n,
    affectsX: r,
    affectsY: i
  };
}
function wn(e, t) {
  return Math.max(0, t - e);
}
function xn(e, t) {
  return Math.max(0, e - t);
}
function qo(e, t, n) {
  return Math.max(0, t - e, e - n);
}
function rh(e, t) {
  return e ? !t : t;
}
function ik(e, t, n, r, i, o, s, l) {
  let { affectsX: u, affectsY: a } = t;
  const { isHorizontal: c, isVertical: f } = t, d = c && f, { xSnapped: h, ySnapped: g } = n, { minWidth: x, maxWidth: E, minHeight: p, maxHeight: w } = r, { x: v, y: _, width: C, height: I, aspectRatio: P } = e;
  let L = Math.floor(c ? h - e.pointerX : 0), B = Math.floor(f ? g - e.pointerY : 0);
  const V = C + (u ? -L : L), z = I + (a ? -B : B), X = -o[0] * C, W = -o[1] * I;
  let N = qo(V, x, E), O = qo(z, p, w);
  if (s) {
    let M = 0, T = 0;
    u && L < 0 ? M = wn(v + L + X, s[0][0]) : !u && L > 0 && (M = xn(v + V + X, s[1][0])), a && B < 0 ? T = wn(_ + B + W, s[0][1]) : !a && B > 0 && (T = xn(_ + z + W, s[1][1])), N = Math.max(N, M), O = Math.max(O, T);
  }
  if (l) {
    let M = 0, T = 0;
    u && L > 0 ? M = xn(v + L, l[0][0]) : !u && L < 0 && (M = wn(v + V, l[1][0])), a && B > 0 ? T = xn(_ + B, l[0][1]) : !a && B < 0 && (T = wn(_ + z, l[1][1])), N = Math.max(N, M), O = Math.max(O, T);
  }
  if (i) {
    if (c) {
      const M = qo(V / P, p, w) * P;
      if (N = Math.max(N, M), s) {
        let T = 0;
        !u && !a || u && !a && d ? T = xn(_ + W + V / P, s[1][1]) * P : T = wn(_ + W + (u ? L : -L) / P, s[0][1]) * P, N = Math.max(N, T);
      }
      if (l) {
        let T = 0;
        !u && !a || u && !a && d ? T = wn(_ + V / P, l[1][1]) * P : T = xn(_ + (u ? L : -L) / P, l[0][1]) * P, N = Math.max(N, T);
      }
    }
    if (f) {
      const M = qo(z * P, x, E) / P;
      if (O = Math.max(O, M), s) {
        let T = 0;
        !u && !a || a && !u && d ? T = xn(v + z * P + X, s[1][0]) / P : T = wn(v + (a ? B : -B) * P + X, s[0][0]) / P, O = Math.max(O, T);
      }
      if (l) {
        let T = 0;
        !u && !a || a && !u && d ? T = wn(v + z * P, l[1][0]) / P : T = xn(v + (a ? B : -B) * P, l[0][0]) / P, O = Math.max(O, T);
      }
    }
  }
  B = B + (B < 0 ? O : -O), L = L + (L < 0 ? N : -N), i && (d ? V > z * P ? B = (rh(u, a) ? -L : L) / P : L = (rh(u, a) ? -B : B) * P : c ? (B = L / P, a = u) : (L = B * P, u = a));
  const R = u ? v + L : v, j = a ? _ + B : _;
  return {
    width: C + (u ? -L : L),
    height: I + (a ? -B : B),
    x: o[0] * L * (u ? -1 : 1) + R,
    y: o[1] * B * (a ? -1 : 1) + j
  };
}
const Pm = { width: 0, height: 0, x: 0, y: 0 }, ok = {
  ...Pm,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function sk(e, t, n) {
  const r = t.position.x + e.position.x, i = t.position.y + e.position.y, o = e.measured.width ?? 0, s = e.measured.height ?? 0, l = n[0] * o, u = n[1] * s;
  return [
    [r - l, i - u],
    [r + o - l, i + s - u]
  ];
}
function lk({ domNode: e, nodeId: t, getStoreItems: n, onChange: r, onEnd: i }) {
  const o = ft(e);
  let s = {
    controlDirection: nh("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function l({ controlPosition: a, boundaries: c, keepAspectRatio: f, resizeDirection: d, onResizeStart: h, onResize: g, onResizeEnd: x, shouldResize: E }) {
    let p = { ...Pm }, w = { ...ok };
    s = {
      boundaries: c,
      resizeDirection: d,
      keepAspectRatio: f,
      controlDirection: nh(a)
    };
    let v, _ = null, C = [], I, P, L, B = !1;
    const V = F0().on("start", (z) => {
      const { nodeLookup: X, transform: W, snapGrid: N, snapToGrid: O, nodeOrigin: R, paneDomNode: j } = n();
      if (v = X.get(t), !v)
        return;
      _ = (j == null ? void 0 : j.getBoundingClientRect()) ?? null;
      const { xSnapped: M, ySnapped: T } = Oi(z.sourceEvent, {
        transform: W,
        snapGrid: N,
        snapToGrid: O,
        containerBounds: _
      });
      p = {
        width: v.measured.width ?? 0,
        height: v.measured.height ?? 0,
        x: v.position.x ?? 0,
        y: v.position.y ?? 0
      }, w = {
        ...p,
        pointerX: M,
        pointerY: T,
        aspectRatio: p.width / p.height
      }, I = void 0, P = ar(v.extent) ? v.extent : void 0, v.parentId && (v.extent === "parent" || v.expandParent) && (I = X.get(v.parentId)), I && v.extent === "parent" && (P = [
        [0, 0],
        [I.measured.width, I.measured.height]
      ]), C = [], L = void 0;
      for (const [F, D] of X)
        if (D.parentId === t && (C.push({
          id: F,
          position: { ...D.position },
          extent: D.extent
        }), D.extent === "parent" || D.expandParent)) {
          const H = sk(D, v, D.origin ?? R);
          L ? L = [
            [Math.min(H[0][0], L[0][0]), Math.min(H[0][1], L[0][1])],
            [Math.max(H[1][0], L[1][0]), Math.max(H[1][1], L[1][1])]
          ] : L = H;
        }
      h == null || h(z, { ...p });
    }).on("drag", (z) => {
      const { transform: X, snapGrid: W, snapToGrid: N, nodeOrigin: O } = n(), R = Oi(z.sourceEvent, {
        transform: X,
        snapGrid: W,
        snapToGrid: N,
        containerBounds: _
      }), j = [];
      if (!v)
        return;
      const { x: M, y: T, width: F, height: D } = p, H = {}, Z = v.origin ?? O, { width: q, height: ie, x: oe, y: ne } = ik(w, s.controlDirection, R, s.boundaries, s.keepAspectRatio, Z, P, L), Y = q !== F, K = ie !== D, se = oe !== M && Y, le = ne !== T && K;
      if (!se && !le && !Y && !K)
        return;
      if ((se || le || Z[0] === 1 || Z[1] === 1) && (H.x = se ? oe : p.x, H.y = le ? ne : p.y, p.x = H.x, p.y = H.y, C.length > 0)) {
        const fe = oe - M, he = ne - T;
        for (const we of C)
          we.position = {
            x: we.position.x - fe + Z[0] * (q - F),
            y: we.position.y - he + Z[1] * (ie - D)
          }, j.push(we);
      }
      if ((Y || K) && (H.width = Y && (!s.resizeDirection || s.resizeDirection === "horizontal") ? q : p.width, H.height = K && (!s.resizeDirection || s.resizeDirection === "vertical") ? ie : p.height, p.width = H.width, p.height = H.height), I && v.expandParent) {
        const fe = Z[0] * (H.width ?? 0);
        H.x && H.x < fe && (p.x = fe, w.x = w.x - (H.x - fe));
        const he = Z[1] * (H.height ?? 0);
        H.y && H.y < he && (p.y = he, w.y = w.y - (H.y - he));
      }
      const re = rk({
        width: p.width,
        prevWidth: F,
        height: p.height,
        prevHeight: D,
        affectsX: s.controlDirection.affectsX,
        affectsY: s.controlDirection.affectsY
      }), te = { ...p, direction: re };
      (E == null ? void 0 : E(z, te)) !== !1 && (B = !0, g == null || g(z, te), r(H, j));
    }).on("end", (z) => {
      B && (x == null || x(z, { ...p }), i == null || i({ ...p }), B = !1);
    });
    o.call(V);
  }
  function u() {
    o.on(".drag", null);
  }
  return {
    update: l,
    destroy: u
  };
}
var Mm = { exports: {} }, Tm = {}, Lm = { exports: {} }, $m = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ei = A;
function uk(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var ak = typeof Object.is == "function" ? Object.is : uk, ck = ei.useState, fk = ei.useEffect, dk = ei.useLayoutEffect, hk = ei.useDebugValue;
function pk(e, t) {
  var n = t(), r = ck({ inst: { value: n, getSnapshot: t } }), i = r[0].inst, o = r[1];
  return dk(
    function() {
      i.value = n, i.getSnapshot = t, vu(i) && o({ inst: i });
    },
    [e, n, t]
  ), fk(
    function() {
      return vu(i) && o({ inst: i }), e(function() {
        vu(i) && o({ inst: i });
      });
    },
    [e]
  ), hk(n), n;
}
function vu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !ak(e, n);
  } catch {
    return !0;
  }
}
function gk(e, t) {
  return t();
}
var mk = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? gk : pk;
$m.useSyncExternalStore = ei.useSyncExternalStore !== void 0 ? ei.useSyncExternalStore : mk;
Lm.exports = $m;
var yk = Lm.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ml = A, vk = yk;
function wk(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var xk = typeof Object.is == "function" ? Object.is : wk, _k = vk.useSyncExternalStore, Ek = Ml.useRef, Sk = Ml.useEffect, kk = Ml.useMemo, Nk = Ml.useDebugValue;
Tm.useSyncExternalStoreWithSelector = function(e, t, n, r, i) {
  var o = Ek(null);
  if (o.current === null) {
    var s = { hasValue: !1, value: null };
    o.current = s;
  } else s = o.current;
  o = kk(
    function() {
      function u(h) {
        if (!a) {
          if (a = !0, c = h, h = r(h), i !== void 0 && s.hasValue) {
            var g = s.value;
            if (i(g, h))
              return f = g;
          }
          return f = h;
        }
        if (g = f, xk(c, h)) return g;
        var x = r(h);
        return i !== void 0 && i(g, x) ? (c = h, g) : (c = h, f = x);
      }
      var a = !1, c, f, d = n === void 0 ? null : n;
      return [
        function() {
          return u(t());
        },
        d === null ? void 0 : function() {
          return u(d());
        }
      ];
    },
    [t, n, r, i]
  );
  var l = _k(e, o[0], o[1]);
  return Sk(
    function() {
      s.hasValue = !0, s.value = l;
    },
    [l]
  ), Nk(l), l;
};
Mm.exports = Tm;
var bk = Mm.exports;
const Ck = /* @__PURE__ */ cp(bk), Ik = {}, ih = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), r = (c, f) => {
    const d = typeof c == "function" ? c(t) : c;
    if (!Object.is(d, t)) {
      const h = t;
      t = f ?? (typeof d != "object" || d === null) ? d : Object.assign({}, t, d), n.forEach((g) => g(t, h));
    }
  }, i = () => t, u = { setState: r, getState: i, getInitialState: () => a, subscribe: (c) => (n.add(c), () => n.delete(c)), destroy: () => {
    (Ik ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), n.clear();
  } }, a = t = e(r, i, u);
  return u;
}, Pk = (e) => e ? ih(e) : ih, { useDebugValue: Mk } = _w, { useSyncExternalStoreWithSelector: Tk } = Ck, Lk = (e) => e;
function jm(e, t = Lk, n) {
  const r = Tk(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n
  );
  return Mk(r), r;
}
const oh = (e, t) => {
  const n = Pk(e), r = (i, o = t) => jm(n, i, o);
  return Object.assign(r, n), r;
}, $k = (e, t) => e ? oh(e, t) : oh;
function Te(e, t) {
  if (Object.is(e, t))
    return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  if (e instanceof Map && t instanceof Map) {
    if (e.size !== t.size) return !1;
    for (const [r, i] of e)
      if (!Object.is(i, t.get(r)))
        return !1;
    return !0;
  }
  if (e instanceof Set && t instanceof Set) {
    if (e.size !== t.size) return !1;
    for (const r of e)
      if (!t.has(r))
        return !1;
    return !0;
  }
  const n = Object.keys(e);
  if (n.length !== Object.keys(t).length)
    return !1;
  for (const r of n)
    if (!Object.prototype.hasOwnProperty.call(t, r) || !Object.is(e[r], t[r]))
      return !1;
  return !0;
}
const Tl = A.createContext(null), jk = Tl.Provider, Rm = Ut.error001("react");
function de(e, t) {
  const n = A.useContext(Tl);
  if (n === null)
    throw new Error(Rm);
  return jm(n, e, t);
}
function ke() {
  const e = A.useContext(Tl);
  if (e === null)
    throw new Error(Rm);
  return A.useMemo(() => ({
    getState: e.getState,
    setState: e.setState,
    subscribe: e.subscribe
  }), [e]);
}
const sh = { display: "none" }, Rk = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, Am = "react-flow__node-desc", Om = "react-flow__edge-desc", Ak = "react-flow__aria-live", Ok = (e) => e.ariaLiveMessage, Bk = (e) => e.ariaLabelConfig;
function Fk({ rfId: e }) {
  const t = de(Ok);
  return b.jsx("div", { id: `${Ak}-${e}`, "aria-live": "assertive", "aria-atomic": "true", style: Rk, children: t });
}
function Dk({ rfId: e, disableKeyboardA11y: t }) {
  const n = de(Bk);
  return b.jsxs(b.Fragment, { children: [b.jsx("div", { id: `${Am}-${e}`, style: sh, children: t ? n["node.a11yDescription.default"] : n["node.a11yDescription.keyboardDisabled"] }), b.jsx("div", { id: `${Om}-${e}`, style: sh, children: n["edge.a11yDescription.default"] }), !t && b.jsx(Fk, { rfId: e })] });
}
const Ll = A.forwardRef(({ position: e = "top-left", children: t, className: n, style: r, ...i }, o) => {
  const s = `${e}`.split("-");
  return b.jsx("div", { className: Ae(["react-flow__panel", n, ...s]), style: r, ref: o, ...i, children: t });
});
Ll.displayName = "Panel";
const lh = "https://reactflow.dev?utm_source=attribution";
function zk({ proOptions: e, position: t = "bottom-right" }) {
  return e != null && e.hideAttribution ? null : b.jsx(Ll, { position: t, className: "react-flow__attribution", "data-message": `Please only hide this attribution when you are subscribed to React Flow Pro: ${lh}`, children: b.jsx("a", { href: lh, target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const Uk = (e) => {
  const t = [], n = [];
  for (const [, r] of e.nodeLookup)
    r.selected && t.push(r.internals.userNode);
  for (const [, r] of e.edgeLookup)
    r.selected && n.push(r);
  return { selectedNodes: t, selectedEdges: n };
}, Zo = (e) => e.id;
function Hk(e, t) {
  return Te(e.selectedNodes.map(Zo), t.selectedNodes.map(Zo)) && Te(e.selectedEdges.map(Zo), t.selectedEdges.map(Zo));
}
function Vk({ onSelectionChange: e }) {
  const t = ke(), { selectedNodes: n, selectedEdges: r } = de(Uk, Hk);
  return A.useEffect(() => {
    const i = { nodes: n, edges: r };
    e == null || e(i), t.getState().onSelectionChangeHandlers.forEach((o) => o(i));
  }, [n, r, e]), null;
}
const Wk = (e) => !!e.onSelectionChangeHandlers;
function Yk({ onSelectionChange: e }) {
  const t = de(Wk);
  return e || t ? b.jsx(Vk, { onSelectionChange: e }) : null;
}
const Bm = [0, 0], Gk = { x: 0, y: 0, zoom: 1 }, Xk = [
  "nodes",
  "edges",
  "defaultNodes",
  "defaultEdges",
  "onConnect",
  "onConnectStart",
  "onConnectEnd",
  "onClickConnectStart",
  "onClickConnectEnd",
  "nodesDraggable",
  "autoPanOnNodeFocus",
  "nodesConnectable",
  "nodesFocusable",
  "edgesFocusable",
  "edgesReconnectable",
  "elevateNodesOnSelect",
  "elevateEdgesOnSelect",
  "minZoom",
  "maxZoom",
  "nodeExtent",
  "onNodesChange",
  "onEdgesChange",
  "elementsSelectable",
  "connectionMode",
  "snapGrid",
  "snapToGrid",
  "translateExtent",
  "connectOnClick",
  "defaultEdgeOptions",
  "fitView",
  "fitViewOptions",
  "onNodesDelete",
  "onEdgesDelete",
  "onDelete",
  "onNodeDrag",
  "onNodeDragStart",
  "onNodeDragStop",
  "onSelectionDrag",
  "onSelectionDragStart",
  "onSelectionDragStop",
  "onMoveStart",
  "onMove",
  "onMoveEnd",
  "noPanClassName",
  "nodeOrigin",
  "autoPanOnConnect",
  "autoPanOnNodeDrag",
  "onError",
  "connectionRadius",
  "isValidConnection",
  "selectNodesOnDrag",
  "nodeDragThreshold",
  "connectionDragThreshold",
  "onBeforeDelete",
  "debug",
  "autoPanSpeed",
  "ariaLabelConfig",
  "zIndexMode"
], uh = [...Xk, "rfId"], Qk = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges
}), ah = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: oo,
  nodeOrigin: Bm,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function Kk(e) {
  const { setNodes: t, setEdges: n, setMinZoom: r, setMaxZoom: i, setTranslateExtent: o, setNodeExtent: s, reset: l, setDefaultNodesAndEdges: u } = de(Qk, Te), a = ke();
  A.useEffect(() => (u(e.defaultNodes, e.defaultEdges), () => {
    c.current = ah, l();
  }), []);
  const c = A.useRef(ah);
  return A.useEffect(
    () => {
      for (const f of uh) {
        const d = e[f], h = c.current[f];
        d !== h && (typeof e[f] > "u" || (f === "nodes" ? t(d) : f === "edges" ? n(d) : f === "minZoom" ? r(d) : f === "maxZoom" ? i(d) : f === "translateExtent" ? o(d) : f === "nodeExtent" ? s(d) : f === "ariaLabelConfig" ? a.setState({ ariaLabelConfig: x2(d) }) : f === "fitView" ? a.setState({ fitViewQueued: d }) : f === "fitViewOptions" ? a.setState({ fitViewOptions: d }) : a.setState({ [f]: d })));
      }
      c.current = e;
    },
    // Only re-run the effect if one of the fields we track changes
    uh.map((f) => e[f])
  ), null;
}
function ch() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function qk(e) {
  var r;
  const [t, n] = A.useState(e === "system" ? null : e);
  return A.useEffect(() => {
    if (e !== "system") {
      n(e);
      return;
    }
    const i = ch(), o = () => n(i != null && i.matches ? "dark" : "light");
    return o(), i == null || i.addEventListener("change", o), () => {
      i == null || i.removeEventListener("change", o);
    };
  }, [e]), t !== null ? t : (r = ch()) != null && r.matches ? "dark" : "light";
}
const fh = typeof document < "u" ? document : null;
function co(e = null, t = { target: fh, actInsideInputWithModifier: !0 }) {
  const [n, r] = A.useState(!1), i = A.useRef(!1), o = A.useRef(/* @__PURE__ */ new Set([])), [s, l] = A.useMemo(() => {
    if (e !== null) {
      const a = (Array.isArray(e) ? e : [e]).filter((f) => typeof f == "string").map((f) => f.replace("+", `
`).replace(`

`, `
+`).split(`
`)), c = a.reduce((f, d) => f.concat(...d), []);
      return [a, c];
    }
    return [[], []];
  }, [e]);
  return A.useEffect(() => {
    const u = (t == null ? void 0 : t.target) ?? fh, a = (t == null ? void 0 : t.actInsideInputWithModifier) ?? !0;
    if (e !== null) {
      const c = (h) => {
        var E, p;
        if (i.current = h.ctrlKey || h.metaKey || h.shiftKey || h.altKey, (!i.current || i.current && !a) && pm(h))
          return !1;
        const x = hh(h.code, l);
        if (o.current.add(h[x]), dh(s, o.current, !1)) {
          const w = ((p = (E = h.composedPath) == null ? void 0 : E.call(h)) == null ? void 0 : p[0]) || h.target, v = (w == null ? void 0 : w.nodeName) === "BUTTON" || (w == null ? void 0 : w.nodeName) === "A";
          t.preventDefault !== !1 && (i.current || !v) && h.preventDefault(), r(!0);
        }
      }, f = (h) => {
        const g = hh(h.code, l);
        dh(s, o.current, !0) ? (r(!1), o.current.clear()) : o.current.delete(h[g]), h.key === "Meta" && o.current.clear(), i.current = !1;
      }, d = () => {
        o.current.clear(), r(!1);
      };
      return u == null || u.addEventListener("keydown", c), u == null || u.addEventListener("keyup", f), window.addEventListener("blur", d), window.addEventListener("contextmenu", d), () => {
        u == null || u.removeEventListener("keydown", c), u == null || u.removeEventListener("keyup", f), window.removeEventListener("blur", d), window.removeEventListener("contextmenu", d);
      };
    }
  }, [e, r]), n;
}
function dh(e, t, n) {
  return e.filter((r) => n || r.length === t.size).some((r) => r.every((i) => t.has(i)));
}
function hh(e, t) {
  return t.includes(e) ? "code" : "key";
}
const Zk = () => {
  const e = ke();
  return A.useMemo(() => ({
    zoomIn: async (t) => {
      const { panZoom: n } = e.getState();
      return n ? n.scaleBy(1.2, t) : !1;
    },
    zoomOut: async (t) => {
      const { panZoom: n } = e.getState();
      return n ? n.scaleBy(1 / 1.2, t) : !1;
    },
    zoomTo: async (t, n) => {
      const { panZoom: r } = e.getState();
      return r ? r.scaleTo(t, n) : !1;
    },
    getZoom: () => e.getState().transform[2],
    setViewport: async (t, n) => {
      const { transform: [r, i, o], panZoom: s } = e.getState();
      return s ? (await s.setViewport({
        x: t.x ?? r,
        y: t.y ?? i,
        zoom: t.zoom ?? o
      }, n), !0) : !1;
    },
    getViewport: () => {
      const [t, n, r] = e.getState().transform;
      return { x: t, y: n, zoom: r };
    },
    setCenter: async (t, n, r) => e.getState().setCenter(t, n, r),
    fitBounds: async (t, n) => {
      const { width: r, height: i, minZoom: o, maxZoom: s, panZoom: l } = e.getState(), u = Gc(t, r, i, o, s, (n == null ? void 0 : n.padding) ?? 0.1);
      return l ? (await l.setViewport(u, {
        duration: n == null ? void 0 : n.duration,
        ease: n == null ? void 0 : n.ease,
        interpolate: n == null ? void 0 : n.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (t, n = {}) => {
      const { transform: r, snapGrid: i, snapToGrid: o, domNode: s } = e.getState();
      if (!s)
        return t;
      const { x: l, y: u } = s.getBoundingClientRect(), a = {
        x: t.x - l,
        y: t.y - u
      }, c = n.snapGrid ?? i, f = n.snapToGrid ?? o;
      return So(a, r, f, c);
    },
    flowToScreenPosition: (t) => {
      const { transform: n, domNode: r } = e.getState();
      if (!r)
        return t;
      const { x: i, y: o } = r.getBoundingClientRect(), s = Zr(t, n);
      return {
        x: s.x + i,
        y: s.y + o
      };
    }
  }), []);
};
function Fm(e, t) {
  const n = [], r = /* @__PURE__ */ new Map(), i = [];
  for (const o of e)
    if (o.type === "add") {
      i.push(o);
      continue;
    } else if (o.type === "remove" || o.type === "replace")
      r.set(o.id, [o]);
    else {
      const s = r.get(o.id);
      s ? s.push(o) : r.set(o.id, [o]);
    }
  for (const o of t) {
    const s = r.get(o.id);
    if (!s) {
      n.push(o);
      continue;
    }
    if (s[0].type === "remove")
      continue;
    if (s[0].type === "replace") {
      n.push({ ...s[0].item });
      continue;
    }
    const l = { ...o };
    for (const u of s)
      Jk(u, l);
    n.push(l);
  }
  return i.length && i.forEach((o) => {
    o.index !== void 0 ? n.splice(o.index, 0, { ...o.item }) : n.push({ ...o.item });
  }), n;
}
function Jk(e, t) {
  switch (e.type) {
    case "select": {
      t.selected = e.selected;
      break;
    }
    case "position": {
      typeof e.position < "u" && (t.position = e.position), typeof e.dragging < "u" && (t.dragging = e.dragging);
      break;
    }
    case "dimensions": {
      typeof e.dimensions < "u" && (t.measured = {
        ...e.dimensions
      }, e.setAttributes && ((e.setAttributes === !0 || e.setAttributes === "width") && (t.width = e.dimensions.width), (e.setAttributes === !0 || e.setAttributes === "height") && (t.height = e.dimensions.height))), typeof e.resizing == "boolean" && (t.resizing = e.resizing);
      break;
    }
  }
}
function Dm(e, t) {
  return Fm(e, t);
}
function eN(e, t) {
  return Fm(e, t);
}
function Yn(e, t) {
  return {
    id: e,
    type: "select",
    selected: t
  };
}
function Tr(e, t = /* @__PURE__ */ new Set(), n = !1) {
  const r = [];
  for (const [i, o] of e) {
    const s = t.has(i);
    !(o.selected === void 0 && !s) && o.selected !== s && (n && (o.selected = s), r.push(Yn(o.id, s)));
  }
  return r;
}
function ph({ items: e = [], lookup: t }) {
  var i;
  const n = [], r = new Map(e.map((o) => [o.id, o]));
  for (const [o, s] of e.entries()) {
    const l = t.get(s.id), u = ((i = l == null ? void 0 : l.internals) == null ? void 0 : i.userNode) ?? l;
    u !== void 0 && u !== s && n.push({ id: s.id, item: s, type: "replace" }), u === void 0 && n.push({ item: s, type: "add", index: o });
  }
  for (const [o] of t)
    r.get(o) === void 0 && n.push({ id: o, type: "remove" });
  return n;
}
function gh(e) {
  return {
    id: e.id,
    type: "remove"
  };
}
const tN = cm();
function nN(e, t, n = {}) {
  return b2(e, t, {
    ...n,
    onError: n.onError ?? tN
  });
}
const mh = (e) => f2(e), rN = (e) => om(e);
function zm(e) {
  return A.forwardRef(e);
}
const Um = typeof window < "u" ? A.useLayoutEffect : A.useEffect;
function yh(e) {
  const [t, n] = A.useState(BigInt(0)), [r] = A.useState(() => iN(() => n((i) => i + BigInt(1))));
  return Um(() => {
    const i = r.get();
    i.length && (e(i), r.reset());
  }, [t]), r;
}
function iN(e) {
  let t = [];
  return {
    get: () => t,
    reset: () => {
      t = [];
    },
    push: (n) => {
      t.push(n), e();
    }
  };
}
const Hm = A.createContext(null);
function oN({ children: e }) {
  const t = ke(), n = A.useCallback((l) => {
    const { nodes: u = [], setNodes: a, hasDefaultNodes: c, onNodesChange: f, nodeLookup: d, fitViewQueued: h, onNodesChangeMiddlewareMap: g } = t.getState();
    let x = u;
    for (const p of l)
      x = typeof p == "function" ? p(x) : p;
    let E = ph({
      items: x,
      lookup: d
    });
    for (const p of g.values())
      E = p(E);
    c && a(x), E.length > 0 ? f == null || f(E) : h && window.requestAnimationFrame(() => {
      const { fitViewQueued: p, nodes: w, setNodes: v } = t.getState();
      p && v(w);
    });
  }, []), r = yh(n), i = A.useCallback((l) => {
    const { edges: u = [], setEdges: a, hasDefaultEdges: c, onEdgesChange: f, edgeLookup: d } = t.getState();
    let h = u;
    for (const g of l)
      h = typeof g == "function" ? g(h) : g;
    c ? a(h) : f && f(ph({
      items: h,
      lookup: d
    }));
  }, []), o = yh(i), s = A.useMemo(() => ({ nodeQueue: r, edgeQueue: o }), []);
  return b.jsx(Hm.Provider, { value: s, children: e });
}
function sN() {
  const e = A.useContext(Hm);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const lN = (e) => !!e.panZoom;
function $l() {
  const e = Zk(), t = ke(), n = sN(), r = de(lN), i = A.useMemo(() => {
    const o = (f) => t.getState().nodeLookup.get(f), s = (f) => {
      n.nodeQueue.push(f);
    }, l = (f) => {
      n.edgeQueue.push(f);
    }, u = (f) => {
      var p, w;
      const { nodeLookup: d, nodeOrigin: h } = t.getState(), g = mh(f) ? f : d.get(f.id), x = g.parentId ? dm(g.position, g.measured, g.parentId, d, h) : g.position, E = {
        ...g,
        position: x,
        width: ((p = g.measured) == null ? void 0 : p.width) ?? g.width,
        height: ((w = g.measured) == null ? void 0 : w.height) ?? g.height
      };
      return uo(E);
    }, a = (f, d, h = { replace: !1 }) => {
      s((g) => g.map((x) => {
        if (x.id === f) {
          const E = typeof d == "function" ? d(x) : d;
          return h.replace && mh(E) ? E : { ...x, ...E };
        }
        return x;
      }));
    }, c = (f, d, h = { replace: !1 }) => {
      l((g) => g.map((x) => {
        if (x.id === f) {
          const E = typeof d == "function" ? d(x) : d;
          return h.replace && rN(E) ? E : { ...x, ...E };
        }
        return x;
      }));
    };
    return {
      getNodes: () => t.getState().nodes.map((f) => ({ ...f })),
      getNode: (f) => {
        var d;
        return (d = o(f)) == null ? void 0 : d.internals.userNode;
      },
      getInternalNode: o,
      getEdges: () => {
        const { edges: f = [] } = t.getState();
        return f.map((d) => ({ ...d }));
      },
      getEdge: (f) => t.getState().edgeLookup.get(f),
      setNodes: s,
      setEdges: l,
      addNodes: (f) => {
        const d = Array.isArray(f) ? f : [f];
        n.nodeQueue.push((h) => [...h, ...d]);
      },
      addEdges: (f) => {
        const d = Array.isArray(f) ? f : [f];
        n.edgeQueue.push((h) => [...h, ...d]);
      },
      toObject: () => {
        const { nodes: f = [], edges: d = [], transform: h } = t.getState(), [g, x, E] = h;
        return {
          nodes: f.map((p) => ({ ...p })),
          edges: d.map((p) => ({ ...p })),
          viewport: {
            x: g,
            y: x,
            zoom: E
          }
        };
      },
      deleteElements: async ({ nodes: f = [], edges: d = [] }) => {
        const { nodes: h, edges: g, onNodesDelete: x, onEdgesDelete: E, triggerNodeChanges: p, triggerEdgeChanges: w, onDelete: v, onBeforeDelete: _ } = t.getState(), { nodes: C, edges: I } = await m2({
          nodesToRemove: f,
          edgesToRemove: d,
          nodes: h,
          edges: g,
          onBeforeDelete: _
        }), P = I.length > 0, L = C.length > 0;
        if (P) {
          const B = I.map(gh);
          E == null || E(I), w(B);
        }
        if (L) {
          const B = C.map(gh);
          x == null || x(C), p(B);
        }
        return (L || P) && (v == null || v({ nodes: C, edges: I })), { deletedNodes: C, deletedEdges: I };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (f, d = !0, h) => {
        const g = Wd(f), x = g ? f : u(f), E = h !== void 0;
        return x ? (h || t.getState().nodes).filter((p) => {
          const w = t.getState().nodeLookup.get(p.id);
          if (w && !g && (p.id === f.id || !w.internals.positionAbsolute))
            return !1;
          const v = uo(E ? p : w), _ = Js(v, x);
          return d && _ > 0 || _ >= v.width * v.height || _ >= x.width * x.height;
        }) : [];
      },
      isNodeIntersecting: (f, d, h = !0) => {
        const x = Wd(f) ? f : u(f);
        if (!x)
          return !1;
        const E = Js(x, d);
        return h && E > 0 || E >= d.width * d.height || E >= x.width * x.height;
      },
      updateNode: a,
      updateNodeData: (f, d, h = { replace: !1 }) => {
        a(f, (g) => {
          const x = typeof d == "function" ? d(g) : d;
          return h.replace ? { ...g, data: x } : { ...g, data: { ...g.data, ...x } };
        }, h);
      },
      updateEdge: c,
      updateEdgeData: (f, d, h = { replace: !1 }) => {
        c(f, (g) => {
          const x = typeof d == "function" ? d(g) : d;
          return h.replace ? { ...g, data: x } : { ...g, data: { ...g.data, ...x } };
        }, h);
      },
      getNodesBounds: (f) => {
        const { nodeLookup: d, nodeOrigin: h } = t.getState();
        return d2(f, { nodeLookup: d, nodeOrigin: h });
      },
      getHandleConnections: ({ type: f, id: d, nodeId: h }) => {
        var g;
        return Array.from(((g = t.getState().connectionLookup.get(`${h}-${f}${d ? `-${d}` : ""}`)) == null ? void 0 : g.values()) ?? []);
      },
      getNodeConnections: ({ type: f, handleId: d, nodeId: h }) => {
        var g;
        return Array.from(((g = t.getState().connectionLookup.get(`${h}${f ? d ? `-${f}-${d}` : `-${f}` : ""}`)) == null ? void 0 : g.values()) ?? []);
      },
      fitView: async (f) => {
        const d = t.getState().fitViewResolver ?? w2();
        return t.setState({ fitViewQueued: !0, fitViewOptions: f, fitViewResolver: d }), n.nodeQueue.push((h) => [...h]), d.promise;
      }
    };
  }, []);
  return A.useMemo(() => ({
    ...i,
    ...e,
    viewportInitialized: r
  }), [r]);
}
const vh = (e) => e.selected, uN = typeof window < "u" ? window : void 0;
function aN({ deleteKeyCode: e, multiSelectionKeyCode: t }) {
  const n = ke(), { deleteElements: r } = $l(), i = co(e, { actInsideInputWithModifier: !1 }), o = co(t, { target: uN });
  A.useEffect(() => {
    if (i) {
      const { edges: s, nodes: l } = n.getState();
      r({ nodes: l.filter(vh), edges: s.filter(vh) }), n.setState({ nodesSelectionActive: !1 });
    }
  }, [i]), A.useEffect(() => {
    n.setState({ multiSelectionActive: o });
  }, [o]);
}
function cN(e) {
  const t = ke();
  A.useEffect(() => {
    const n = () => {
      var i, o, s, l;
      if (!e.current || !(((o = (i = e.current).checkVisibility) == null ? void 0 : o.call(i)) ?? !0))
        return !1;
      const r = Xc(e.current);
      (r.height === 0 || r.width === 0) && ((l = (s = t.getState()).onError) == null || l.call(s, "004", Ut.error004())), t.setState({ width: r.width || 500, height: r.height || 500 });
    };
    if (e.current) {
      n(), window.addEventListener("resize", n);
      const r = new ResizeObserver(() => n());
      return r.observe(e.current), () => {
        window.removeEventListener("resize", n), r && e.current && r.unobserve(e.current);
      };
    }
  }, []);
}
const jl = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, fN = (e) => ({
  userSelectionActive: e.userSelectionActive,
  lib: e.lib,
  connectionInProgress: e.connection.inProgress
});
function dN({ onPaneContextMenu: e, zoomOnScroll: t = !0, zoomOnPinch: n = !0, panOnScroll: r = !1, panOnScrollSpeed: i = 0.5, panOnScrollMode: o = er.Free, zoomOnDoubleClick: s = !0, panOnDrag: l = !0, defaultViewport: u, translateExtent: a, minZoom: c, maxZoom: f, zoomActivationKeyCode: d, preventScrolling: h = !0, children: g, noWheelClassName: x, noPanClassName: E, onViewportChange: p, isControlledViewport: w, paneClickDistance: v, selectionOnDrag: _ }) {
  const C = ke(), I = A.useRef(null), { userSelectionActive: P, lib: L, connectionInProgress: B } = de(fN, Te), V = co(d), z = A.useRef();
  cN(I);
  const X = A.useCallback((W) => {
    p == null || p({ x: W[0], y: W[1], zoom: W[2] }), w || C.setState({ transform: W });
  }, [p, w]);
  return A.useEffect(() => {
    if (I.current) {
      z.current = nk({
        domNode: I.current,
        minZoom: c,
        maxZoom: f,
        translateExtent: a,
        viewport: u,
        onDraggingChange: (R) => C.setState((j) => j.paneDragging === R ? j : { paneDragging: R }),
        onPanZoomStart: (R, j) => {
          const { onViewportChangeStart: M, onMoveStart: T } = C.getState();
          T == null || T(R, j), M == null || M(j);
        },
        onPanZoom: (R, j) => {
          const { onViewportChange: M, onMove: T } = C.getState();
          T == null || T(R, j), M == null || M(j);
        },
        onPanZoomEnd: (R, j) => {
          const { onViewportChangeEnd: M, onMoveEnd: T } = C.getState();
          T == null || T(R, j), M == null || M(j);
        }
      });
      const { x: W, y: N, zoom: O } = z.current.getViewport();
      return C.setState({
        panZoom: z.current,
        transform: [W, N, O],
        domNode: I.current.closest(".react-flow")
      }), () => {
        var R;
        (R = z.current) == null || R.destroy();
      };
    }
  }, []), A.useEffect(() => {
    var W;
    (W = z.current) == null || W.update({
      onPaneContextMenu: e,
      zoomOnScroll: t,
      zoomOnPinch: n,
      panOnScroll: r,
      panOnScrollSpeed: i,
      panOnScrollMode: o,
      zoomOnDoubleClick: s,
      panOnDrag: l,
      zoomActivationKeyPressed: V,
      preventScrolling: h,
      noPanClassName: E,
      userSelectionActive: P,
      noWheelClassName: x,
      lib: L,
      onTransformChange: X,
      connectionInProgress: B,
      selectionOnDrag: _,
      paneClickDistance: v
    });
  }, [
    e,
    t,
    n,
    r,
    i,
    o,
    s,
    l,
    V,
    h,
    E,
    P,
    x,
    L,
    X,
    B,
    _,
    v
  ]), b.jsx("div", { className: "react-flow__renderer", ref: I, style: jl, children: g });
}
const hN = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect
});
function pN() {
  const { userSelectionActive: e, userSelectionRect: t } = de(hN, Te);
  return e && t ? b.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: t.width,
    height: t.height,
    transform: `translate(${t.x}px, ${t.y}px)`
  } }) : null;
}
const wu = (e, t) => (n) => {
  n.target === t.current && (e == null || e(n));
}, gN = (e) => ({
  userSelectionActive: e.userSelectionActive,
  elementsSelectable: e.elementsSelectable,
  dragging: e.paneDragging,
  panBy: e.panBy,
  autoPanSpeed: e.autoPanSpeed
});
function mN({ isSelecting: e, selectionKeyPressed: t, selectionMode: n = so.Full, panOnDrag: r, autoPanOnSelection: i, paneClickDistance: o, selectionOnDrag: s, onSelectionStart: l, onSelectionEnd: u, onPaneClick: a, onPaneContextMenu: c, onPaneScroll: f, onPaneMouseEnter: d, onPaneMouseMove: h, onPaneMouseLeave: g, children: x }) {
  const E = A.useRef(0), p = ke(), { userSelectionActive: w, elementsSelectable: v, dragging: _, panBy: C, autoPanSpeed: I } = de(gN, Te), P = v && (e || w), L = A.useRef(null), B = A.useRef(), V = A.useRef(/* @__PURE__ */ new Set()), z = A.useRef(/* @__PURE__ */ new Set()), X = A.useRef(!1), W = A.useRef(!1), N = A.useRef({ x: 0, y: 0 }), O = A.useRef(!1), R = (Y) => {
    if (W.current || X.current || p.getState().connection.inProgress) {
      W.current = !1, X.current = !1;
      return;
    }
    a == null || a(Y), p.getState().resetSelectedElements(), p.setState({ nodesSelectionActive: !1 });
  }, j = (Y) => {
    if (Array.isArray(r) && (r != null && r.includes(2))) {
      Y.preventDefault();
      return;
    }
    c == null || c(Y);
  }, M = f ? (Y) => f(Y) : void 0, T = (Y) => {
    W.current && (Y.stopPropagation(), W.current = !1);
  }, F = (Y) => {
    var we, et;
    const { domNode: K, transform: se } = p.getState();
    if (B.current = K == null ? void 0 : K.getBoundingClientRect(), !B.current)
      return;
    const le = Y.target === L.current;
    if (!le && !!Y.target.closest(".nokey") || !e || !(s && le || t) || Y.button !== 0 || !Y.isPrimary)
      return;
    (et = (we = Y.target) == null ? void 0 : we.setPointerCapture) == null || et.call(we, Y.pointerId), W.current = !1;
    const { x: ue, y: fe } = Bt(Y.nativeEvent, B.current), he = So({ x: ue, y: fe }, se);
    p.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: he.x,
        startY: he.y,
        x: ue,
        y: fe
      }
    }), le || (Y.stopPropagation(), Y.preventDefault());
  };
  function D(Y, K) {
    const { userSelectionRect: se } = p.getState();
    if (!se)
      return;
    const { transform: le, nodeLookup: re, edgeLookup: te, connectionLookup: ue, triggerNodeChanges: fe, triggerEdgeChanges: he, defaultEdgeOptions: we } = p.getState(), et = { x: se.startX, y: se.startY }, { x: xt, y: at } = Zr(et, le), tt = {
      startX: et.x,
      startY: et.y,
      x: Y < xt ? Y : xt,
      y: K < at ? K : at,
      width: Math.abs(Y - xt),
      height: Math.abs(K - at)
    }, Ve = V.current, Pt = z.current;
    V.current = new Set(Wc(re, tt, le, n === so.Partial, !0).map((je) => je.id)), z.current = /* @__PURE__ */ new Set();
    const nn = (we == null ? void 0 : we.selectable) ?? !0;
    for (const je of V.current) {
      const Mt = ue.get(je);
      if (Mt)
        for (const { edgeId: S } of Mt.values()) {
          const m = te.get(S);
          m && (m.selectable ?? nn) && z.current.add(S);
        }
    }
    if (!Yd(Ve, V.current)) {
      const je = Tr(re, V.current, !0);
      fe(je);
    }
    if (!Yd(Pt, z.current)) {
      const je = Tr(te, z.current);
      he(je);
    }
    p.setState({
      userSelectionRect: tt,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function H() {
    if (!i || !B.current)
      return;
    const [Y, K] = Yc(N.current, B.current, I);
    C({ x: Y, y: K }).then((se) => {
      if (!W.current || !se) {
        E.current = requestAnimationFrame(H);
        return;
      }
      const { x: le, y: re } = N.current;
      D(le, re), E.current = requestAnimationFrame(H);
    });
  }
  const Z = () => {
    cancelAnimationFrame(E.current), E.current = 0, O.current = !1;
  };
  A.useEffect(() => () => Z(), []);
  const q = (Y) => {
    const { userSelectionRect: K, transform: se, resetSelectedElements: le } = p.getState();
    if (!B.current || !K)
      return;
    const { x: re, y: te } = Bt(Y.nativeEvent, B.current);
    N.current = { x: re, y: te };
    const ue = Zr({ x: K.startX, y: K.startY }, se);
    if (!W.current) {
      const fe = t ? 0 : o;
      if (Math.hypot(re - ue.x, te - ue.y) <= fe)
        return;
      le(), l == null || l(Y);
    }
    W.current = !0, O.current || (H(), O.current = !0), D(re, te);
  }, ie = (Y) => {
    var K, se;
    if (!P) {
      Y.target === L.current && p.getState().connection.inProgress && (X.current = !0);
      return;
    }
    Y.button === 0 && ((se = (K = Y.target) == null ? void 0 : K.releasePointerCapture) == null || se.call(K, Y.pointerId), !w && Y.target === L.current && p.getState().userSelectionRect && (R == null || R(Y)), p.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), W.current && (u == null || u(Y), p.setState({
      nodesSelectionActive: V.current.size > 0
    })), Z());
  }, oe = (Y) => {
    var K, se;
    (se = (K = Y.target) == null ? void 0 : K.releasePointerCapture) == null || se.call(K, Y.pointerId), Z();
  }, ne = r === !0 || Array.isArray(r) && r.includes(0);
  return b.jsxs("div", { className: Ae(["react-flow__pane", { draggable: ne, dragging: _, selection: e }]), onClick: P ? void 0 : wu(R, L), onContextMenu: wu(j, L), onWheel: wu(M, L), onPointerEnter: P ? void 0 : d, onPointerMove: P ? q : h, onPointerUp: ie, onPointerCancel: P ? oe : void 0, onPointerDownCapture: P ? F : void 0, onClickCapture: P ? T : void 0, onPointerLeave: g, ref: L, style: jl, children: [x, b.jsx(pN, {})] });
}
function Oa({ id: e, store: t, unselect: n = !1, nodeRef: r }) {
  const { addSelectedNodes: i, unselectNodesAndEdges: o, multiSelectionActive: s, nodeLookup: l, onError: u } = t.getState(), a = l.get(e);
  if (!a) {
    u == null || u("012", Ut.error012(e));
    return;
  }
  t.setState({ nodesSelectionActive: !1 }), a.selected ? (n || a.selected && s) && (o({ nodes: [a], edges: [] }), requestAnimationFrame(() => {
    var c;
    return (c = r == null ? void 0 : r.current) == null ? void 0 : c.blur();
  })) : i([e]);
}
function Vm({ nodeRef: e, disabled: t = !1, noDragClassName: n, handleSelector: r, nodeId: i, isSelectable: o, nodeClickDistance: s }) {
  const l = ke(), [u, a] = A.useState(!1), c = A.useRef();
  return A.useEffect(() => {
    if (!t)
      return c.current = U2({
        getStoreItems: () => l.getState(),
        onNodeMouseDown: (f) => {
          Oa({
            id: f,
            store: l,
            nodeRef: e
          });
        },
        onDragStart: () => {
          a(!0);
        },
        onDragStop: () => {
          a(!1);
        }
      }), () => {
        var f;
        (f = c.current) == null || f.destroy(), c.current = void 0;
      };
  }, [t, l, e]), A.useEffect(() => {
    t || !e.current || !c.current || c.current.update({
      noDragClassName: n,
      handleSelector: r,
      domNode: e.current,
      isSelectable: o,
      nodeId: i,
      nodeClickDistance: s
    });
  }, [n, r, t, o, e, i, s]), u;
}
const yN = (e) => (t) => t.selected && (t.draggable || e && typeof t.draggable > "u");
function Wm() {
  const e = ke();
  return A.useCallback((n) => {
    const { nodeExtent: r, snapToGrid: i, snapGrid: o, nodesDraggable: s, onError: l, updateNodePositions: u, nodeLookup: a, nodeOrigin: c } = e.getState(), f = /* @__PURE__ */ new Map(), d = yN(s), h = i ? o[0] : 5, g = i ? o[1] : 5, x = n.direction.x * h * n.factor, E = n.direction.y * g * n.factor;
    for (const [, p] of a) {
      if (!d(p))
        continue;
      let w = {
        x: p.internals.positionAbsolute.x + x,
        y: p.internals.positionAbsolute.y + E
      };
      i && (w = Eo(w, o));
      const { position: v, positionAbsolute: _ } = sm({
        nodeId: p.id,
        nextPosition: w,
        nodeLookup: a,
        nodeExtent: r,
        nodeOrigin: c,
        onError: l
      });
      p.position = v, p.internals.positionAbsolute = _, f.set(p.id, p);
    }
    u(f);
  }, []);
}
const ef = A.createContext(null), vN = ef.Provider;
ef.Consumer;
const Ym = () => A.useContext(ef), wN = (e) => ({
  connectOnClick: e.connectOnClick,
  noPanClassName: e.noPanClassName,
  rfId: e.rfId
}), Gm = A.createContext(null);
function xN({ children: e }) {
  const t = de(wN, Te);
  return b.jsx(Gm.Provider, { value: t, children: e });
}
function _N() {
  const e = A.useContext(Gm);
  if (!e)
    throw new Error("useHandleConfig must be used within a HandleConfigProvider");
  return e;
}
const EN = {
  connectingFrom: !1,
  connectingTo: !1,
  clickConnecting: !1,
  isPossibleEndHandle: !0,
  connectionInProcess: !1,
  clickConnectionInProcess: !1,
  valid: !1
}, SN = (e, t, n) => (r) => {
  const { connectionClickStartHandle: i, connectionMode: o, connection: s } = r, { fromHandle: l, toHandle: u, isValid: a } = s;
  if (!l && !i)
    return EN;
  const c = (u == null ? void 0 : u.nodeId) === e && (u == null ? void 0 : u.id) === t && (u == null ? void 0 : u.type) === n;
  return {
    connectingFrom: (l == null ? void 0 : l.nodeId) === e && (l == null ? void 0 : l.id) === t && (l == null ? void 0 : l.type) === n,
    connectingTo: c,
    clickConnecting: (i == null ? void 0 : i.nodeId) === e && (i == null ? void 0 : i.id) === t && (i == null ? void 0 : i.type) === n,
    isPossibleEndHandle: o === Kr.Strict ? (l == null ? void 0 : l.type) !== n : e !== (l == null ? void 0 : l.nodeId) || t !== (l == null ? void 0 : l.id),
    connectionInProcess: !!l,
    clickConnectionInProcess: !!i,
    valid: c && a
  };
};
function kN({ type: e = "source", position: t = J.Top, isValidConnection: n, isConnectable: r = !0, isConnectableStart: i = !0, isConnectableEnd: o = !0, id: s, onConnect: l, children: u, className: a, onMouseDown: c, onTouchStart: f, ...d }, h) {
  var O, R;
  const g = s || null, x = e === "target", E = ke(), p = Ym(), { connectOnClick: w, noPanClassName: v, rfId: _ } = _N(), { connectingFrom: C, connectingTo: I, clickConnecting: P, isPossibleEndHandle: L, connectionInProcess: B, clickConnectionInProcess: V, valid: z } = de(SN(p, g, e), Te);
  p || (R = (O = E.getState()).onError) == null || R.call(O, "010", Ut.error010());
  const X = (j) => {
    const { defaultEdgeOptions: M, onConnect: T, hasDefaultEdges: F } = E.getState(), D = {
      ...M,
      ...j
    };
    if (F) {
      const { edges: H, setEdges: Z, onError: q } = E.getState();
      Z(nN(D, H, { onError: q }));
    }
    T == null || T(D), l == null || l(D);
  }, W = (j) => {
    if (!p)
      return;
    const M = gm(j.nativeEvent);
    if (i && (M && j.button === 0 || !M)) {
      const T = E.getState();
      Aa.onPointerDown(j.nativeEvent, {
        handleDomNode: j.currentTarget,
        autoPanOnConnect: T.autoPanOnConnect,
        connectionMode: T.connectionMode,
        connectionRadius: T.connectionRadius,
        domNode: T.domNode,
        nodeLookup: T.nodeLookup,
        lib: T.lib,
        isTarget: x,
        handleId: g,
        nodeId: p,
        flowId: T.rfId,
        panBy: T.panBy,
        cancelConnection: T.cancelConnection,
        onConnectStart: T.onConnectStart,
        onConnectEnd: (...F) => {
          var D, H;
          return (H = (D = E.getState()).onConnectEnd) == null ? void 0 : H.call(D, ...F);
        },
        updateConnection: T.updateConnection,
        onConnect: X,
        isValidConnection: n || ((...F) => {
          var D, H;
          return ((H = (D = E.getState()).isValidConnection) == null ? void 0 : H.call(D, ...F)) ?? !0;
        }),
        getTransform: () => E.getState().transform,
        getFromHandle: () => E.getState().connection.fromHandle,
        autoPanSpeed: T.autoPanSpeed,
        dragThreshold: T.connectionDragThreshold
      });
    }
    M ? c == null || c(j) : f == null || f(j);
  }, N = (j) => {
    const { onClickConnectStart: M, onClickConnectEnd: T, connectionClickStartHandle: F, connectionMode: D, isValidConnection: H, lib: Z, rfId: q, nodeLookup: ie, connection: oe } = E.getState();
    if (!p || !F && !i)
      return;
    if (!F) {
      M == null || M(j.nativeEvent, { nodeId: p, handleId: g, handleType: e }), E.setState({ connectionClickStartHandle: { nodeId: p, type: e, id: g } });
      return;
    }
    const ne = hm(j.target), Y = n || H, { connection: K, isValid: se } = Aa.isValid(j.nativeEvent, {
      handle: {
        nodeId: p,
        id: g,
        type: e
      },
      connectionMode: D,
      fromNodeId: F.nodeId,
      fromHandleId: F.id || null,
      fromType: F.type,
      isValidConnection: Y,
      flowId: q,
      doc: ne,
      lib: Z,
      nodeLookup: ie
    });
    se && K && X(K);
    const le = structuredClone(oe);
    delete le.inProgress, le.toPosition = le.toHandle ? le.toHandle.position : null, T == null || T(j, le), E.setState({ connectionClickStartHandle: null });
  };
  return b.jsx("div", { "data-handleid": g, "data-nodeid": p, "data-handlepos": t, "data-id": `${_}-${p}-${g}-${e}`, className: Ae([
    "react-flow__handle",
    `react-flow__handle-${t}`,
    "nodrag",
    v,
    a,
    {
      source: !x,
      target: x,
      connectable: r,
      connectablestart: i,
      connectableend: o,
      clickconnecting: P,
      connectingfrom: C,
      connectingto: I,
      valid: z,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: r && (!B || L) && (B || V ? o : i)
    }
  ]), onMouseDown: W, onTouchStart: W, onClick: w ? N : void 0, ref: h, ...d, children: u });
}
const gt = A.memo(zm(kN));
function NN({ data: e, isConnectable: t, sourcePosition: n = J.Bottom }) {
  return b.jsxs(b.Fragment, { children: [e == null ? void 0 : e.label, b.jsx(gt, { type: "source", position: n, isConnectable: t })] });
}
function bN({ data: e, isConnectable: t, targetPosition: n = J.Top, sourcePosition: r = J.Bottom }) {
  return b.jsxs(b.Fragment, { children: [b.jsx(gt, { type: "target", position: n, isConnectable: t }), e == null ? void 0 : e.label, b.jsx(gt, { type: "source", position: r, isConnectable: t })] });
}
function CN() {
  return null;
}
function IN({ data: e, isConnectable: t, targetPosition: n = J.Top }) {
  return b.jsxs(b.Fragment, { children: [b.jsx(gt, { type: "target", position: n, isConnectable: t }), e == null ? void 0 : e.label] });
}
const el = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, wh = {
  input: NN,
  default: bN,
  output: IN,
  group: CN
};
function PN(e) {
  var t, n, r, i;
  return e.internals.handleBounds === void 0 ? {
    width: e.width ?? e.initialWidth ?? ((t = e.style) == null ? void 0 : t.width),
    height: e.height ?? e.initialHeight ?? ((n = e.style) == null ? void 0 : n.height)
  } : {
    width: e.width ?? ((r = e.style) == null ? void 0 : r.width),
    height: e.height ?? ((i = e.style) == null ? void 0 : i.height)
  };
}
const MN = (e) => {
  const { width: t, height: n, x: r, y: i } = _o(e.nodeLookup, {
    filter: (o) => !!o.selected
  });
  return {
    width: Ot(t) ? t : null,
    height: Ot(n) ? n : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${r}px,${i}px)`
  };
};
function TN({ onSelectionContextMenu: e, noPanClassName: t, disableKeyboardA11y: n }) {
  const r = ke(), { width: i, height: o, transformString: s, userSelectionActive: l } = de(MN, Te), u = Wm(), a = A.useRef(null);
  A.useEffect(() => {
    var h;
    n || (h = a.current) == null || h.focus({
      preventScroll: !0
    });
  }, [n]);
  const c = !l && i !== null && o !== null;
  if (Vm({
    nodeRef: a,
    disabled: !c
  }), !c)
    return null;
  const f = e ? (h) => {
    const g = r.getState().nodes.filter((x) => x.selected);
    e(h, g);
  } : void 0, d = (h) => {
    Object.prototype.hasOwnProperty.call(el, h.key) && (h.preventDefault(), u({
      direction: el[h.key],
      factor: h.shiftKey ? 4 : 1
    }));
  };
  return b.jsx("div", { className: Ae(["react-flow__nodesselection", "react-flow__container", t]), style: {
    transform: s
  }, children: b.jsx("div", { ref: a, className: "react-flow__nodesselection-rect", onContextMenu: f, tabIndex: n ? void 0 : -1, onKeyDown: n ? void 0 : d, style: {
    width: i,
    height: o
  } }) });
}
const xh = typeof window < "u" ? window : void 0, LN = (e) => ({ nodesSelectionActive: e.nodesSelectionActive, userSelectionActive: e.userSelectionActive });
function Xm({ children: e, onPaneClick: t, onPaneMouseEnter: n, onPaneMouseMove: r, onPaneMouseLeave: i, onPaneContextMenu: o, onPaneScroll: s, paneClickDistance: l, deleteKeyCode: u, selectionKeyCode: a, selectionOnDrag: c, selectionMode: f, onSelectionStart: d, onSelectionEnd: h, multiSelectionKeyCode: g, panActivationKeyCode: x, zoomActivationKeyCode: E, elementsSelectable: p, zoomOnScroll: w, zoomOnPinch: v, panOnScroll: _, panOnScrollSpeed: C, panOnScrollMode: I, zoomOnDoubleClick: P, panOnDrag: L, autoPanOnSelection: B, defaultViewport: V, translateExtent: z, minZoom: X, maxZoom: W, preventScrolling: N, onSelectionContextMenu: O, noWheelClassName: R, noPanClassName: j, disableKeyboardA11y: M, onViewportChange: T, isControlledViewport: F }) {
  const { nodesSelectionActive: D, userSelectionActive: H } = de(LN, Te), Z = co(a, { target: xh }), q = co(x, { target: xh }), ie = q || L, oe = q || _, ne = c && ie !== !0, Y = Z || H || ne;
  return aN({ deleteKeyCode: u, multiSelectionKeyCode: g }), b.jsx(dN, { onPaneContextMenu: o, elementsSelectable: p, zoomOnScroll: w, zoomOnPinch: v, panOnScroll: oe, panOnScrollSpeed: C, panOnScrollMode: I, zoomOnDoubleClick: P, panOnDrag: !Z && ie, defaultViewport: V, translateExtent: z, minZoom: X, maxZoom: W, zoomActivationKeyCode: E, preventScrolling: N, noWheelClassName: R, noPanClassName: j, onViewportChange: T, isControlledViewport: F, paneClickDistance: l, selectionOnDrag: ne, children: b.jsxs(mN, { onSelectionStart: d, onSelectionEnd: h, onPaneClick: t, onPaneMouseEnter: n, onPaneMouseMove: r, onPaneMouseLeave: i, onPaneContextMenu: o, onPaneScroll: s, panOnDrag: ie, autoPanOnSelection: B, isSelecting: !!Y, selectionMode: f, selectionKeyPressed: Z, paneClickDistance: l, selectionOnDrag: ne, children: [e, D && b.jsx(TN, { onSelectionContextMenu: O, noPanClassName: j, disableKeyboardA11y: M })] }) });
}
Xm.displayName = "FlowRenderer";
const $N = A.memo(Xm), jN = (e) => (t) => e ? Wc(t.nodeLookup, { x: 0, y: 0, width: t.width, height: t.height }, t.transform, !0).map((n) => n.id) : Array.from(t.nodeLookup.keys());
function RN(e) {
  return de(A.useCallback(jN(e), [e]), Te);
}
const AN = (e) => e.updateNodeInternals;
function ON() {
  const e = de(AN), [t] = A.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((n) => {
    const r = /* @__PURE__ */ new Map();
    n.forEach((i) => {
      const o = i.target.getAttribute("data-id");
      r.set(o, {
        id: o,
        nodeElement: i.target,
        force: !0
      });
    }), e(r);
  }));
  return A.useEffect(() => () => {
    t == null || t.disconnect();
  }, [t]), t;
}
function BN({ node: e, nodeType: t, hasDimensions: n, resizeObserver: r }) {
  const i = ke(), o = A.useRef(null), s = A.useRef(null), l = A.useRef(e.sourcePosition), u = A.useRef(e.targetPosition), a = A.useRef(t), c = n && !!e.internals.handleBounds;
  return A.useEffect(() => {
    o.current && !e.hidden && (!c || s.current !== o.current) && (s.current && (r == null || r.unobserve(s.current)), r == null || r.observe(o.current), s.current = o.current);
  }, [c, e.hidden]), A.useEffect(() => () => {
    s.current && (r == null || r.unobserve(s.current), s.current = null);
  }, []), A.useEffect(() => {
    if (o.current) {
      const f = a.current !== t, d = l.current !== e.sourcePosition, h = u.current !== e.targetPosition;
      (f || d || h) && (a.current = t, l.current = e.sourcePosition, u.current = e.targetPosition, i.getState().updateNodeInternals(/* @__PURE__ */ new Map([[e.id, { id: e.id, nodeElement: o.current, force: !0 }]])));
    }
  }, [e.id, t, e.sourcePosition, e.targetPosition]), o;
}
function FN({ id: e, onClick: t, onMouseEnter: n, onMouseMove: r, onMouseLeave: i, onContextMenu: o, onDoubleClick: s, nodesDraggable: l, elementsSelectable: u, nodesConnectable: a, nodesFocusable: c, resizeObserver: f, noDragClassName: d, noPanClassName: h, disableKeyboardA11y: g, rfId: x, nodeTypes: E, nodeClickDistance: p, onError: w }) {
  const { node: v, internals: _, isParent: C } = de((Y) => {
    const K = Y.nodeLookup.get(e), se = Y.parentLookup.has(e);
    return {
      node: K,
      internals: K.internals,
      isParent: se
    };
  }, Te);
  let I = v.type || "default", P = (E == null ? void 0 : E[I]) || wh[I];
  P === void 0 && (w == null || w("003", Ut.error003(I)), I = "default", P = (E == null ? void 0 : E.default) || wh.default);
  const L = !!(v.draggable || l && typeof v.draggable > "u"), B = !!(v.selectable || u && typeof v.selectable > "u"), V = !!(v.connectable || a && typeof v.connectable > "u"), z = !!(v.focusable || c && typeof v.focusable > "u"), X = ke(), W = fm(v), N = BN({ node: v, nodeType: I, hasDimensions: W, resizeObserver: f }), O = Vm({
    nodeRef: N,
    disabled: v.hidden || !L,
    noDragClassName: d,
    handleSelector: v.dragHandle,
    nodeId: e,
    isSelectable: B,
    nodeClickDistance: p
  }), R = Wm();
  if (v.hidden)
    return null;
  const j = tn(v), M = PN(v), T = B || L || t || n || r || i, F = n ? (Y) => n(Y, { ..._.userNode }) : void 0, D = r ? (Y) => r(Y, { ..._.userNode }) : void 0, H = i ? (Y) => i(Y, { ..._.userNode }) : void 0, Z = o ? (Y) => o(Y, { ..._.userNode }) : void 0, q = s ? (Y) => s(Y, { ..._.userNode }) : void 0, ie = (Y) => {
    const { selectNodesOnDrag: K, nodeDragThreshold: se } = X.getState();
    B && (!K || !L || se > 0) && Oa({
      id: e,
      store: X,
      nodeRef: N
    }), t && t(Y, { ..._.userNode });
  }, oe = (Y) => {
    if (!(pm(Y.nativeEvent) || g)) {
      if (tm.includes(Y.key) && B) {
        const K = Y.key === "Escape";
        Oa({
          id: e,
          store: X,
          unselect: K,
          nodeRef: N
        });
      } else if (L && v.selected && Object.prototype.hasOwnProperty.call(el, Y.key)) {
        Y.preventDefault();
        const { ariaLabelConfig: K } = X.getState();
        X.setState({
          ariaLiveMessage: K["node.a11yDescription.ariaLiveMessage"]({
            direction: Y.key.replace("Arrow", "").toLowerCase(),
            x: ~~_.positionAbsolute.x,
            y: ~~_.positionAbsolute.y
          })
        }), R({
          direction: el[Y.key],
          factor: Y.shiftKey ? 4 : 1
        });
      }
    }
  }, ne = () => {
    var ue;
    if (g || !((ue = N.current) != null && ue.matches(":focus-visible")))
      return;
    const { transform: Y, width: K, height: se, autoPanOnNodeFocus: le, setCenter: re } = X.getState();
    if (!le)
      return;
    Wc(/* @__PURE__ */ new Map([[e, v]]), { x: 0, y: 0, width: K, height: se }, Y, !0).length > 0 || re(v.position.x + j.width / 2, v.position.y + j.height / 2, {
      zoom: Y[2]
    });
  };
  return b.jsx("div", { className: Ae([
    "react-flow__node",
    `react-flow__node-${I}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [h]: L
    },
    v.className,
    {
      selected: v.selected,
      selectable: B,
      parent: C,
      draggable: L,
      dragging: O
    }
  ]), ref: N, style: {
    zIndex: _.z,
    transform: `translate(${_.positionAbsolute.x}px,${_.positionAbsolute.y}px)`,
    pointerEvents: T ? "all" : "none",
    visibility: W ? "visible" : "hidden",
    ...v.style,
    ...M
  }, "data-id": e, "data-testid": `rf__node-${e}`, onMouseEnter: F, onMouseMove: D, onMouseLeave: H, onContextMenu: Z, onClick: ie, onDoubleClick: q, onKeyDown: z ? oe : void 0, tabIndex: z ? 0 : void 0, onFocus: z ? ne : void 0, role: v.ariaRole ?? (z ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": g ? void 0 : `${Am}-${x}`, "aria-label": v.ariaLabel, ...v.domAttributes, children: b.jsx(vN, { value: e, children: b.jsx(P, { id: e, data: v.data, type: I, positionAbsoluteX: _.positionAbsolute.x, positionAbsoluteY: _.positionAbsolute.y, selected: v.selected ?? !1, selectable: B, draggable: L, deletable: v.deletable ?? !0, isConnectable: V, sourcePosition: v.sourcePosition, targetPosition: v.targetPosition, dragging: O, dragHandle: v.dragHandle, zIndex: _.z, parentId: v.parentId, ...j }) }) });
}
var DN = A.memo(FN);
const zN = (e) => ({
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError
});
function Qm(e) {
  const { nodesConnectable: t, nodesFocusable: n, elementsSelectable: r, onError: i } = de(zN, Te), o = RN(e.onlyRenderVisibleElements), s = ON();
  return b.jsx("div", { className: "react-flow__nodes", style: jl, children: o.map((l) => (
    /*
     * The split of responsibilities between NodeRenderer and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For example, when you’re dragging a single node, that node gets
     * updated multiple times per second. If `NodeRenderer` were to update
     * every time, it would have to re-run the `nodes.map()` loop every
     * time. This gets pricey with hundreds of nodes, especially if every
     * loop cycle does more than just rendering a JSX element!
     *
     * As a result of this choice, we took the following implementation
     * decisions:
     * - NodeRenderer subscribes *only* to node IDs – and therefore
     *   rerender *only* when visible nodes are added or removed.
     * - NodeRenderer performs all operations the result of which can be
     *   shared between nodes (such as creating the `ResizeObserver`
     *   instance, or subscribing to `selector`). This means extra prop
     *   drilling into `NodeComponentWrapper`, but it means we need to run
     *   these operations only once – instead of once per node.
     * - Any operations that you’d normally write inside `nodes.map` are
     *   moved into `NodeComponentWrapper`. This ensures they are
     *   memorized – so if `NodeRenderer` *has* to rerender, it only
     *   needs to regenerate the list of nodes, nothing else.
     */
    b.jsx(DN, { id: l, nodeTypes: e.nodeTypes, nodeExtent: e.nodeExtent, onClick: e.onNodeClick, onMouseEnter: e.onNodeMouseEnter, onMouseMove: e.onNodeMouseMove, onMouseLeave: e.onNodeMouseLeave, onContextMenu: e.onNodeContextMenu, onDoubleClick: e.onNodeDoubleClick, noDragClassName: e.noDragClassName, noPanClassName: e.noPanClassName, rfId: e.rfId, disableKeyboardA11y: e.disableKeyboardA11y, resizeObserver: s, nodesDraggable: e.nodesDraggable ?? !0, nodesConnectable: t, nodesFocusable: n, elementsSelectable: r, nodeClickDistance: e.nodeClickDistance, onError: i }, l)
  )) });
}
Qm.displayName = "NodeRenderer";
const UN = A.memo(Qm);
function HN(e) {
  return de(A.useCallback((n) => {
    if (!e)
      return n.edges.map((i) => i.id);
    const r = [];
    if (n.width && n.height)
      for (const i of n.edges) {
        const o = n.nodeLookup.get(i.source), s = n.nodeLookup.get(i.target);
        o && s && S2({
          sourceNode: o,
          targetNode: s,
          width: n.width,
          height: n.height,
          transform: n.transform
        }) && r.push(i.id);
      }
    return r;
  }, [e]), Te);
}
const VN = ({ color: e = "none", strokeWidth: t = 1 }) => {
  const n = {
    strokeWidth: t,
    ...e && { stroke: e }
  };
  return b.jsx("polyline", { className: "arrow", style: n, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, WN = ({ color: e = "none", strokeWidth: t = 1 }) => {
  const n = {
    strokeWidth: t,
    ...e && { stroke: e, fill: e }
  };
  return b.jsx("polyline", { className: "arrowclosed", style: n, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, _h = {
  [lo.Arrow]: VN,
  [lo.ArrowClosed]: WN
};
function YN(e) {
  const t = ke();
  return A.useMemo(() => {
    var i, o;
    return Object.prototype.hasOwnProperty.call(_h, e) ? _h[e] : ((o = (i = t.getState()).onError) == null || o.call(i, "009", Ut.error009(e)), null);
  }, [e]);
}
const GN = ({ id: e, type: t, color: n, width: r = 12.5, height: i = 12.5, markerUnits: o = "strokeWidth", strokeWidth: s, orient: l = "auto-start-reverse" }) => {
  const u = YN(t);
  return u ? b.jsx("marker", { className: "react-flow__arrowhead", id: e, markerWidth: `${r}`, markerHeight: `${i}`, viewBox: "-10 -10 20 20", markerUnits: o, orient: l, refX: "0", refY: "0", children: b.jsx(u, { color: n, strokeWidth: s }) }) : null;
}, Km = ({ defaultColor: e, rfId: t }) => {
  const n = de((o) => o.edges), r = de((o) => o.defaultEdgeOptions), i = A.useMemo(() => T2(n, {
    id: t,
    defaultColor: e,
    defaultMarkerStart: r == null ? void 0 : r.markerStart,
    defaultMarkerEnd: r == null ? void 0 : r.markerEnd
  }), [n, r, t, e]);
  return i.length ? b.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: b.jsx("defs", { children: i.map((o) => b.jsx(GN, { id: o.id, type: o.type, color: o.color, width: o.width, height: o.height, markerUnits: o.markerUnits, strokeWidth: o.strokeWidth, orient: o.orient }, o.id)) }) }) : null;
};
Km.displayName = "MarkerDefinitions";
var XN = A.memo(Km);
function qm({ x: e, y: t, label: n, labelStyle: r, labelShowBg: i = !0, labelBgStyle: o, labelBgPadding: s = [2, 4], labelBgBorderRadius: l = 2, children: u, className: a, ...c }) {
  const [f, d] = A.useState({ x: 1, y: 0, width: 0, height: 0 }), h = Ae(["react-flow__edge-textwrapper", a]), g = A.useRef(null);
  return A.useEffect(() => {
    if (g.current) {
      const x = g.current.getBBox();
      d({
        x: x.x,
        y: x.y,
        width: x.width,
        height: x.height
      });
    }
  }, [n]), n ? b.jsxs("g", { transform: `translate(${e - f.width / 2} ${t - f.height / 2})`, className: h, visibility: f.width ? "visible" : "hidden", ...c, children: [i && b.jsx("rect", { width: f.width + 2 * s[0], x: -s[0], y: -s[1], height: f.height + 2 * s[1], className: "react-flow__edge-textbg", style: o, rx: l, ry: l }), b.jsx("text", { className: "react-flow__edge-text", y: f.height / 2, dy: "0.3em", ref: g, style: r, children: n }), u] }) : null;
}
qm.displayName = "EdgeText";
const QN = A.memo(qm);
function oi({ path: e, labelX: t, labelY: n, label: r, labelStyle: i, labelShowBg: o, labelBgStyle: s, labelBgPadding: l, labelBgBorderRadius: u, interactionWidth: a = 20, ...c }) {
  return b.jsxs(b.Fragment, { children: [b.jsx("path", { ...c, d: e, fill: "none", className: Ae(["react-flow__edge-path", c.className]) }), a ? b.jsx("path", { d: e, fill: "none", strokeOpacity: 0, strokeWidth: a, className: "react-flow__edge-interaction" }) : null, r && Ot(t) && Ot(n) ? b.jsx(QN, { x: t, y: n, label: r, labelStyle: i, labelShowBg: o, labelBgStyle: s, labelBgPadding: l, labelBgBorderRadius: u }) : null] });
}
function Eh({ pos: e, x1: t, y1: n, x2: r, y2: i }) {
  return e === J.Left || e === J.Right ? [0.5 * (t + r), n] : [t, 0.5 * (n + i)];
}
function Zm({ sourceX: e, sourceY: t, sourcePosition: n = J.Bottom, targetX: r, targetY: i, targetPosition: o = J.Top }) {
  const [s, l] = Eh({
    pos: n,
    x1: e,
    y1: t,
    x2: r,
    y2: i
  }), [u, a] = Eh({
    pos: o,
    x1: r,
    y1: i,
    x2: e,
    y2: t
  }), [c, f, d, h] = mm({
    sourceX: e,
    sourceY: t,
    targetX: r,
    targetY: i,
    sourceControlX: s,
    sourceControlY: l,
    targetControlX: u,
    targetControlY: a
  });
  return [
    `M${e},${t} C${s},${l} ${u},${a} ${r},${i}`,
    c,
    f,
    d,
    h
  ];
}
function Jm(e) {
  return A.memo(({ id: t, sourceX: n, sourceY: r, targetX: i, targetY: o, sourcePosition: s, targetPosition: l, label: u, labelStyle: a, labelShowBg: c, labelBgStyle: f, labelBgPadding: d, labelBgBorderRadius: h, style: g, markerEnd: x, markerStart: E, interactionWidth: p }) => {
    const [w, v, _] = Zm({
      sourceX: n,
      sourceY: r,
      sourcePosition: s,
      targetX: i,
      targetY: o,
      targetPosition: l
    }), C = e.isInternal ? void 0 : t;
    return b.jsx(oi, { id: C, path: w, labelX: v, labelY: _, label: u, labelStyle: a, labelShowBg: c, labelBgStyle: f, labelBgPadding: d, labelBgBorderRadius: h, style: g, markerEnd: x, markerStart: E, interactionWidth: p });
  });
}
const KN = Jm({ isInternal: !1 }), ey = Jm({ isInternal: !0 });
KN.displayName = "SimpleBezierEdge";
ey.displayName = "SimpleBezierEdgeInternal";
function ty(e) {
  return A.memo(({ id: t, sourceX: n, sourceY: r, targetX: i, targetY: o, label: s, labelStyle: l, labelShowBg: u, labelBgStyle: a, labelBgPadding: c, labelBgBorderRadius: f, style: d, sourcePosition: h = J.Bottom, targetPosition: g = J.Top, markerEnd: x, markerStart: E, pathOptions: p, interactionWidth: w }) => {
    const [v, _, C] = $a({
      sourceX: n,
      sourceY: r,
      sourcePosition: h,
      targetX: i,
      targetY: o,
      targetPosition: g,
      borderRadius: p == null ? void 0 : p.borderRadius,
      offset: p == null ? void 0 : p.offset,
      stepPosition: p == null ? void 0 : p.stepPosition
    }), I = e.isInternal ? void 0 : t;
    return b.jsx(oi, { id: I, path: v, labelX: _, labelY: C, label: s, labelStyle: l, labelShowBg: u, labelBgStyle: a, labelBgPadding: c, labelBgBorderRadius: f, style: d, markerEnd: x, markerStart: E, interactionWidth: w });
  });
}
const ny = ty({ isInternal: !1 }), ry = ty({ isInternal: !0 });
ny.displayName = "SmoothStepEdge";
ry.displayName = "SmoothStepEdgeInternal";
function iy(e) {
  return A.memo(({ id: t, ...n }) => {
    var i;
    const r = e.isInternal ? void 0 : t;
    return b.jsx(ny, { ...n, id: r, pathOptions: A.useMemo(() => {
      var o;
      return { borderRadius: 0, offset: (o = n.pathOptions) == null ? void 0 : o.offset };
    }, [(i = n.pathOptions) == null ? void 0 : i.offset]) });
  });
}
const qN = iy({ isInternal: !1 }), oy = iy({ isInternal: !0 });
qN.displayName = "StepEdge";
oy.displayName = "StepEdgeInternal";
function sy(e) {
  return A.memo(({ id: t, sourceX: n, sourceY: r, targetX: i, targetY: o, label: s, labelStyle: l, labelShowBg: u, labelBgStyle: a, labelBgPadding: c, labelBgBorderRadius: f, style: d, markerEnd: h, markerStart: g, interactionWidth: x }) => {
    const [E, p, w] = vm({ sourceX: n, sourceY: r, targetX: i, targetY: o }), v = e.isInternal ? void 0 : t;
    return b.jsx(oi, { id: v, path: E, labelX: p, labelY: w, label: s, labelStyle: l, labelShowBg: u, labelBgStyle: a, labelBgPadding: c, labelBgBorderRadius: f, style: d, markerEnd: h, markerStart: g, interactionWidth: x });
  });
}
const ZN = sy({ isInternal: !1 }), ly = sy({ isInternal: !0 });
ZN.displayName = "StraightEdge";
ly.displayName = "StraightEdgeInternal";
function uy(e) {
  return A.memo(({ id: t, sourceX: n, sourceY: r, targetX: i, targetY: o, sourcePosition: s = J.Bottom, targetPosition: l = J.Top, label: u, labelStyle: a, labelShowBg: c, labelBgStyle: f, labelBgPadding: d, labelBgBorderRadius: h, style: g, markerEnd: x, markerStart: E, pathOptions: p, interactionWidth: w }) => {
    const [v, _, C] = Il({
      sourceX: n,
      sourceY: r,
      sourcePosition: s,
      targetX: i,
      targetY: o,
      targetPosition: l,
      curvature: p == null ? void 0 : p.curvature
    }), I = e.isInternal ? void 0 : t;
    return b.jsx(oi, { id: I, path: v, labelX: _, labelY: C, label: u, labelStyle: a, labelShowBg: c, labelBgStyle: f, labelBgPadding: d, labelBgBorderRadius: h, style: g, markerEnd: x, markerStart: E, interactionWidth: w });
  });
}
const JN = uy({ isInternal: !1 }), ay = uy({ isInternal: !0 });
JN.displayName = "BezierEdge";
ay.displayName = "BezierEdgeInternal";
const Sh = {
  default: ay,
  straight: ly,
  step: oy,
  smoothstep: ry,
  simplebezier: ey
}, kh = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null,
  zIndex: void 0
}, eb = (e, t, n) => n === J.Left ? e - t : n === J.Right ? e + t : e, tb = (e, t, n) => n === J.Top ? e - t : n === J.Bottom ? e + t : e, Nh = "react-flow__edgeupdater";
function bh({ position: e, centerX: t, centerY: n, radius: r = 10, onMouseDown: i, onMouseEnter: o, onMouseOut: s, type: l }) {
  return b.jsx("circle", { onMouseDown: i, onMouseEnter: o, onMouseOut: s, className: Ae([Nh, `${Nh}-${l}`]), cx: eb(t, r, e), cy: tb(n, r, e), r, stroke: "transparent", fill: "transparent" });
}
function nb({ isReconnectable: e, reconnectRadius: t, edge: n, sourceX: r, sourceY: i, targetX: o, targetY: s, sourcePosition: l, targetPosition: u, onReconnect: a, onReconnectStart: c, onReconnectEnd: f, setReconnecting: d, setUpdateHover: h }) {
  const g = ke(), x = (_, C) => {
    if (_.button !== 0)
      return;
    const { autoPanOnConnect: I, domNode: P, connectionMode: L, connectionRadius: B, lib: V, onConnectStart: z, cancelConnection: X, nodeLookup: W, rfId: N, panBy: O, updateConnection: R } = g.getState(), j = C.type === "target", M = (D, H) => {
      d(!1), f == null || f(D, n, C.type, H);
    }, T = (D) => a == null ? void 0 : a(n, D), F = (D, H) => {
      d(!0), c == null || c(_, n, C.type), z == null || z(D, H);
    };
    Aa.onPointerDown(_.nativeEvent, {
      autoPanOnConnect: I,
      connectionMode: L,
      connectionRadius: B,
      domNode: P,
      handleId: C.id,
      nodeId: C.nodeId,
      nodeLookup: W,
      isTarget: j,
      edgeUpdaterType: C.type,
      lib: V,
      flowId: N,
      cancelConnection: X,
      panBy: O,
      isValidConnection: (...D) => {
        var H, Z;
        return ((Z = (H = g.getState()).isValidConnection) == null ? void 0 : Z.call(H, ...D)) ?? !0;
      },
      onConnect: T,
      onConnectStart: F,
      onConnectEnd: (...D) => {
        var H, Z;
        return (Z = (H = g.getState()).onConnectEnd) == null ? void 0 : Z.call(H, ...D);
      },
      onReconnectEnd: M,
      updateConnection: R,
      getTransform: () => g.getState().transform,
      getFromHandle: () => g.getState().connection.fromHandle,
      dragThreshold: g.getState().connectionDragThreshold,
      handleDomNode: _.currentTarget
    });
  }, E = (_) => x(_, { nodeId: n.target, id: n.targetHandle ?? null, type: "target" }), p = (_) => x(_, { nodeId: n.source, id: n.sourceHandle ?? null, type: "source" }), w = () => h(!0), v = () => h(!1);
  return b.jsxs(b.Fragment, { children: [(e === !0 || e === "source") && b.jsx(bh, { position: l, centerX: r, centerY: i, radius: t, onMouseDown: E, onMouseEnter: w, onMouseOut: v, type: "source" }), (e === !0 || e === "target") && b.jsx(bh, { position: u, centerX: o, centerY: s, radius: t, onMouseDown: p, onMouseEnter: w, onMouseOut: v, type: "target" })] });
}
function rb({ id: e, edgesFocusable: t, edgesReconnectable: n, elementsSelectable: r, onClick: i, onDoubleClick: o, onContextMenu: s, onMouseEnter: l, onMouseMove: u, onMouseLeave: a, reconnectRadius: c, onReconnect: f, onReconnectStart: d, onReconnectEnd: h, rfId: g, edgeTypes: x, noPanClassName: E, onError: p, disableKeyboardA11y: w }) {
  let v = de((re) => re.edgeLookup.get(e));
  const _ = de((re) => re.defaultEdgeOptions);
  v = _ ? { ..._, ...v } : v;
  let C = v.type || "default", I = (x == null ? void 0 : x[C]) || Sh[C];
  I === void 0 && (p == null || p("011", Ut.error011(C)), C = "default", I = (x == null ? void 0 : x.default) || Sh.default);
  const P = !!(v.focusable || t && typeof v.focusable > "u"), L = typeof f < "u" && (v.reconnectable || n && typeof v.reconnectable > "u"), B = !!(v.selectable || r && typeof v.selectable > "u"), V = A.useRef(null), [z, X] = A.useState(!1), [W, N] = A.useState(!1), O = ke(), { zIndex: R = v.zIndex, sourceX: j, sourceY: M, targetX: T, targetY: F, sourcePosition: D, targetPosition: H } = de(A.useCallback((re) => {
    const te = re.nodeLookup.get(v.source), ue = re.nodeLookup.get(v.target);
    if (!te || !ue)
      return kh;
    const fe = M2({
      id: e,
      sourceNode: te,
      targetNode: ue,
      sourceHandle: v.sourceHandle || null,
      targetHandle: v.targetHandle || null,
      connectionMode: re.connectionMode,
      onError: p
    }), he = E2({
      selected: v.selected,
      zIndex: v.zIndex,
      sourceNode: te,
      targetNode: ue,
      elevateOnSelect: re.elevateEdgesOnSelect,
      zIndexMode: re.zIndexMode
    });
    return {
      ...fe || kh,
      zIndex: he
    };
  }, [v.source, v.target, v.sourceHandle, v.targetHandle, v.selected, v.zIndex]), Te), Z = A.useMemo(() => v.markerStart ? `url('#${ja(v.markerStart, g)}')` : void 0, [v.markerStart, g]), q = A.useMemo(() => v.markerEnd ? `url('#${ja(v.markerEnd, g)}')` : void 0, [v.markerEnd, g]);
  if (v.hidden || j === null || M === null || T === null || F === null)
    return null;
  const ie = (re) => {
    var he;
    const { addSelectedEdges: te, unselectNodesAndEdges: ue, multiSelectionActive: fe } = O.getState();
    B && (O.setState({ nodesSelectionActive: !1 }), v.selected && fe ? (ue({ nodes: [], edges: [v] }), (he = V.current) == null || he.blur()) : te([e])), i && i(re, v);
  }, oe = o ? (re) => {
    o(re, { ...v });
  } : void 0, ne = s ? (re) => {
    s(re, { ...v });
  } : void 0, Y = l ? (re) => {
    l(re, { ...v });
  } : void 0, K = u ? (re) => {
    u(re, { ...v });
  } : void 0, se = a ? (re) => {
    a(re, { ...v });
  } : void 0, le = (re) => {
    var te;
    if (!w && tm.includes(re.key) && B) {
      const { unselectNodesAndEdges: ue, addSelectedEdges: fe } = O.getState();
      re.key === "Escape" ? ((te = V.current) == null || te.blur(), ue({ edges: [v] })) : fe([e]);
    }
  };
  return b.jsx("svg", { style: { zIndex: R }, children: b.jsxs("g", { className: Ae([
    "react-flow__edge",
    `react-flow__edge-${C}`,
    v.className,
    E,
    {
      selected: v.selected,
      animated: v.animated,
      inactive: !B && !i,
      updating: z,
      selectable: B
    }
  ]), onClick: ie, onDoubleClick: oe, onContextMenu: ne, onMouseEnter: Y, onMouseMove: K, onMouseLeave: se, onKeyDown: P ? le : void 0, tabIndex: P ? 0 : void 0, role: v.ariaRole ?? (P ? "group" : "img"), "aria-roledescription": "edge", "data-id": e, "data-testid": `rf__edge-${e}`, "aria-label": v.ariaLabel === null ? void 0 : v.ariaLabel || `Edge from ${v.source} to ${v.target}`, "aria-describedby": P ? `${Om}-${g}` : void 0, ref: V, ...v.domAttributes, children: [!W && b.jsx(I, { id: e, source: v.source, target: v.target, type: v.type, selected: v.selected, animated: v.animated, selectable: B, deletable: v.deletable ?? !0, label: v.label, labelStyle: v.labelStyle, labelShowBg: v.labelShowBg, labelBgStyle: v.labelBgStyle, labelBgPadding: v.labelBgPadding, labelBgBorderRadius: v.labelBgBorderRadius, sourceX: j, sourceY: M, targetX: T, targetY: F, sourcePosition: D, targetPosition: H, data: v.data, style: v.style, sourceHandleId: v.sourceHandle, targetHandleId: v.targetHandle, markerStart: Z, markerEnd: q, pathOptions: "pathOptions" in v ? v.pathOptions : void 0, interactionWidth: v.interactionWidth }), L && b.jsx(nb, { edge: v, isReconnectable: L, reconnectRadius: c, onReconnect: f, onReconnectStart: d, onReconnectEnd: h, sourceX: j, sourceY: M, targetX: T, targetY: F, sourcePosition: D, targetPosition: H, setUpdateHover: X, setReconnecting: N })] }) });
}
var ib = A.memo(rb);
const ob = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError
});
function cy({ defaultMarkerColor: e, onlyRenderVisibleElements: t, rfId: n, edgeTypes: r, noPanClassName: i, onReconnect: o, onEdgeContextMenu: s, onEdgeMouseEnter: l, onEdgeMouseMove: u, onEdgeMouseLeave: a, onEdgeClick: c, reconnectRadius: f, onEdgeDoubleClick: d, onReconnectStart: h, onReconnectEnd: g, disableKeyboardA11y: x }) {
  const { edgesFocusable: E, edgesReconnectable: p, elementsSelectable: w, onError: v } = de(ob, Te), _ = HN(t);
  return b.jsxs("div", { className: "react-flow__edges", children: [b.jsx(XN, { defaultColor: e, rfId: n }), _.map((C) => b.jsx(ib, { id: C, edgesFocusable: E, edgesReconnectable: p, elementsSelectable: w, noPanClassName: i, onReconnect: o, onContextMenu: s, onMouseEnter: l, onMouseMove: u, onMouseLeave: a, onClick: c, reconnectRadius: f, onDoubleClick: d, onReconnectStart: h, onReconnectEnd: g, rfId: n, onError: v, edgeTypes: r, disableKeyboardA11y: x }, C))] });
}
cy.displayName = "EdgeRenderer";
const sb = A.memo(cy), Ch = (e) => `translate(${e[0]}px,${e[1]}px) scale(${e[2]})`;
function lb({ children: e }) {
  const t = ke(), n = A.useRef(null), [r] = A.useState(() => t.getState().transform);
  return Um(() => {
    let i = null;
    const o = () => {
      const s = t.getState().transform;
      i && s[0] === i[0] && s[1] === i[1] && s[2] === i[2] || (i = s, n.current && (n.current.style.transform = Ch(s)));
    };
    return o(), t.subscribe(o);
  }, [t]), b.jsx("div", { ref: n, className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: Ch(r) }, children: e });
}
function ub(e) {
  const t = $l(), n = A.useRef(!1);
  A.useEffect(() => {
    !n.current && t.viewportInitialized && e && (setTimeout(() => e(t), 1), n.current = !0);
  }, [e, t.viewportInitialized]);
}
const ab = (e) => {
  var t;
  return (t = e.panZoom) == null ? void 0 : t.syncViewport;
};
function cb(e) {
  const t = de(ab), n = ke();
  return A.useEffect(() => {
    e && (t == null || t(e), n.setState({ transform: [e.x, e.y, e.zoom] }));
  }, [e, t]), null;
}
function fb(e) {
  return e.connection.inProgress ? { ...e.connection, to: So(e.connection.to, e.transform) } : { ...e.connection };
}
function db(e) {
  return fb;
}
function hb(e) {
  const t = db();
  return de(t, Te);
}
const pb = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height
});
function gb({ containerStyle: e, style: t, type: n, component: r }) {
  const { nodesConnectable: i, width: o, height: s, isValid: l, inProgress: u } = de(pb, Te);
  return !(o && i && u) ? null : b.jsx("svg", { style: e, width: o, height: s, className: "react-flow__connectionline react-flow__container", children: b.jsx("g", { className: Ae(["react-flow__connection", im(l)]), children: b.jsx(fy, { style: t, type: n, CustomComponent: r, isValid: l }) }) });
}
const fy = ({ style: e, type: t = bn.Bezier, CustomComponent: n, isValid: r }) => {
  const { inProgress: i, from: o, fromNode: s, fromHandle: l, fromPosition: u, to: a, toNode: c, toHandle: f, toPosition: d, pointer: h } = hb();
  if (!i)
    return;
  if (n)
    return b.jsx(n, { connectionLineType: t, connectionLineStyle: e, fromNode: s, fromHandle: l, fromX: o.x, fromY: o.y, toX: a.x, toY: a.y, fromPosition: u, toPosition: d, connectionStatus: im(r), toNode: c, toHandle: f, pointer: h });
  let g = "";
  const x = {
    sourceX: o.x,
    sourceY: o.y,
    sourcePosition: u,
    targetX: a.x,
    targetY: a.y,
    targetPosition: d
  };
  switch (t) {
    case bn.Bezier:
      [g] = Il(x);
      break;
    case bn.SimpleBezier:
      [g] = Zm(x);
      break;
    case bn.Step:
      [g] = $a({
        ...x,
        borderRadius: 0
      });
      break;
    case bn.SmoothStep:
      [g] = $a(x);
      break;
    default:
      [g] = vm(x);
  }
  return b.jsx("path", { d: g, fill: "none", className: "react-flow__connection-path", style: e });
};
fy.displayName = "ConnectionLine";
const mb = {};
function Ih(e = mb) {
  A.useRef(e), ke(), A.useEffect(() => {
  }, [e]);
}
function yb() {
  ke(), A.useRef(!1), A.useEffect(() => {
  }, []);
}
function dy({ nodeTypes: e, edgeTypes: t, onInit: n, onNodeClick: r, onEdgeClick: i, onNodeDoubleClick: o, onEdgeDoubleClick: s, onNodeMouseEnter: l, onNodeMouseMove: u, onNodeMouseLeave: a, onNodeContextMenu: c, onSelectionContextMenu: f, onSelectionStart: d, onSelectionEnd: h, connectionLineType: g, connectionLineStyle: x, connectionLineComponent: E, connectionLineContainerStyle: p, selectionKeyCode: w, selectionOnDrag: v, selectionMode: _, multiSelectionKeyCode: C, panActivationKeyCode: I, zoomActivationKeyCode: P, deleteKeyCode: L, onlyRenderVisibleElements: B, elementsSelectable: V, defaultViewport: z, translateExtent: X, minZoom: W, maxZoom: N, preventScrolling: O, defaultMarkerColor: R, zoomOnScroll: j, zoomOnPinch: M, panOnScroll: T, panOnScrollSpeed: F, panOnScrollMode: D, zoomOnDoubleClick: H, panOnDrag: Z, autoPanOnSelection: q, onPaneClick: ie, onPaneMouseEnter: oe, onPaneMouseMove: ne, onPaneMouseLeave: Y, onPaneScroll: K, onPaneContextMenu: se, paneClickDistance: le, nodeClickDistance: re, onEdgeContextMenu: te, onEdgeMouseEnter: ue, onEdgeMouseMove: fe, onEdgeMouseLeave: he, reconnectRadius: we, onReconnect: et, onReconnectStart: xt, onReconnectEnd: at, noDragClassName: tt, noWheelClassName: Ve, noPanClassName: Pt, disableKeyboardA11y: nn, nodeExtent: je, rfId: Mt, viewport: S, onViewportChange: m, nodesDraggable: y }) {
  return Ih(e), Ih(t), yb(), ub(n), cb(S), b.jsx($N, { onPaneClick: ie, onPaneMouseEnter: oe, onPaneMouseMove: ne, onPaneMouseLeave: Y, onPaneContextMenu: se, onPaneScroll: K, paneClickDistance: le, deleteKeyCode: L, selectionKeyCode: w, selectionOnDrag: v, selectionMode: _, onSelectionStart: d, onSelectionEnd: h, multiSelectionKeyCode: C, panActivationKeyCode: I, zoomActivationKeyCode: P, elementsSelectable: V, zoomOnScroll: j, zoomOnPinch: M, zoomOnDoubleClick: H, panOnScroll: T, panOnScrollSpeed: F, panOnScrollMode: D, panOnDrag: Z, autoPanOnSelection: q, defaultViewport: z, translateExtent: X, minZoom: W, maxZoom: N, onSelectionContextMenu: f, preventScrolling: O, noDragClassName: tt, noWheelClassName: Ve, noPanClassName: Pt, disableKeyboardA11y: nn, onViewportChange: m, isControlledViewport: !!S, children: b.jsxs(lb, { children: [b.jsx(sb, { edgeTypes: t, onEdgeClick: i, onEdgeDoubleClick: s, onReconnect: et, onReconnectStart: xt, onReconnectEnd: at, onlyRenderVisibleElements: B, onEdgeContextMenu: te, onEdgeMouseEnter: ue, onEdgeMouseMove: fe, onEdgeMouseLeave: he, reconnectRadius: we, defaultMarkerColor: R, noPanClassName: Pt, disableKeyboardA11y: nn, rfId: Mt }), b.jsx(gb, { style: x, type: g, component: E, containerStyle: p }), b.jsx("div", { className: "react-flow__edgelabel-renderer" }), b.jsx(UN, { nodeTypes: e, onNodeClick: r, onNodeDoubleClick: o, onNodeMouseEnter: l, onNodeMouseMove: u, onNodeMouseLeave: a, onNodeContextMenu: c, nodeClickDistance: re, onlyRenderVisibleElements: B, noPanClassName: Pt, noDragClassName: tt, disableKeyboardA11y: nn, nodeExtent: je, rfId: Mt, nodesDraggable: y }), b.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
dy.displayName = "GraphView";
const vb = A.memo(dy), wb = cm(), Ph = ({ nodes: e, edges: t, defaultNodes: n, defaultEdges: r, width: i, height: o, fitView: s, fitViewOptions: l, minZoom: u = 0.5, maxZoom: a = 2, nodeOrigin: c, nodeExtent: f, zIndexMode: d = "basic" } = {}) => {
  const h = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Map(), p = r ?? t ?? [], w = n ?? e ?? [], v = c ?? [0, 0], _ = f ?? oo;
  _m(x, E, p);
  const { nodesInitialized: C } = Ra(w, h, g, {
    nodeOrigin: v,
    nodeExtent: _,
    zIndexMode: d
  });
  let I = [0, 0, 1];
  if (s && i && o) {
    const P = _o(h, {
      filter: (z) => !!((z.width || z.initialWidth) && (z.height || z.initialHeight))
    }), { x: L, y: B, zoom: V } = Gc(P, i, o, u, a, (l == null ? void 0 : l.padding) ?? 0.1);
    I = [L, B, V];
  }
  return {
    rfId: "1",
    width: i ?? 0,
    height: o ?? 0,
    transform: I,
    nodes: w,
    nodesInitialized: C,
    nodeLookup: h,
    parentLookup: g,
    edges: p,
    edgeLookup: E,
    connectionLookup: x,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: n !== void 0,
    hasDefaultEdges: r !== void 0,
    panZoom: null,
    minZoom: u,
    maxZoom: a,
    translateExtent: oo,
    nodeExtent: _,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: Kr.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: v,
    nodeDragThreshold: 1,
    connectionDragThreshold: 1,
    snapGrid: [15, 15],
    snapToGrid: !1,
    nodesDraggable: !0,
    nodesConnectable: !0,
    nodesFocusable: !0,
    edgesFocusable: !0,
    edgesReconnectable: !0,
    elementsSelectable: !0,
    elevateNodesOnSelect: !0,
    elevateEdgesOnSelect: !0,
    selectNodesOnDrag: !0,
    multiSelectionActive: !1,
    fitViewQueued: s ?? !1,
    fitViewOptions: l,
    fitViewResolver: null,
    connection: { ...rm },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: wb,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: nm,
    zIndexMode: d,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, xb = ({ nodes: e, edges: t, defaultNodes: n, defaultEdges: r, width: i, height: o, fitView: s, fitViewOptions: l, minZoom: u, maxZoom: a, nodeOrigin: c, nodeExtent: f, zIndexMode: d }) => $k((h, g) => {
  async function x() {
    const { nodeLookup: E, panZoom: p, fitViewOptions: w, fitViewResolver: v, width: _, height: C, minZoom: I, maxZoom: P } = g();
    p && (await g2({
      nodes: E,
      width: _,
      height: C,
      panZoom: p,
      minZoom: I,
      maxZoom: P
    }, w), v == null || v.resolve(!0), h({ fitViewResolver: null }));
  }
  return {
    ...Ph({
      nodes: e,
      edges: t,
      width: i,
      height: o,
      fitView: s,
      fitViewOptions: l,
      minZoom: u,
      maxZoom: a,
      nodeOrigin: c,
      nodeExtent: f,
      defaultNodes: n,
      defaultEdges: r,
      zIndexMode: d
    }),
    setNodes: (E) => {
      const { nodeLookup: p, parentLookup: w, nodeOrigin: v, elevateNodesOnSelect: _, fitViewQueued: C, zIndexMode: I, nodesSelectionActive: P } = g(), { nodesInitialized: L, hasSelectedNodes: B } = Ra(E, p, w, {
        nodeOrigin: v,
        nodeExtent: f,
        elevateNodesOnSelect: _,
        checkEquality: !0,
        zIndexMode: I
      }), V = P && B;
      C && L ? (x(), h({
        nodes: E,
        nodesInitialized: L,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: V
      })) : h({ nodes: E, nodesInitialized: L, nodesSelectionActive: V });
    },
    setEdges: (E) => {
      const { connectionLookup: p, edgeLookup: w } = g();
      _m(p, w, E), h({ edges: E });
    },
    setDefaultNodesAndEdges: (E, p) => {
      if (E) {
        const { setNodes: w } = g();
        w(E), h({ hasDefaultNodes: !0 });
      }
      if (p) {
        const { setEdges: w } = g();
        w(p), h({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (E) => {
      const { triggerNodeChanges: p, nodeLookup: w, parentLookup: v, domNode: _, nodeOrigin: C, nodeExtent: I, debug: P, fitViewQueued: L, zIndexMode: B } = g(), { changes: V, updatedInternals: z } = B2(E, w, v, _, C, I, B);
      z && (j2(w, v, { nodeOrigin: C, nodeExtent: I, zIndexMode: B }), L ? (x(), h({ fitViewQueued: !1, fitViewOptions: void 0 })) : h({}), (V == null ? void 0 : V.length) > 0 && (P && console.log("React Flow: trigger node changes", V), p == null || p(V)));
    },
    updateNodePositions: (E, p = !1) => {
      const w = [];
      let v = [];
      const { nodeLookup: _, triggerNodeChanges: C, connection: I, updateConnection: P, onNodesChangeMiddlewareMap: L } = g();
      for (const [B, V] of E) {
        const z = _.get(B), X = !!(z != null && z.expandParent && (z != null && z.parentId) && (V != null && V.position)), W = {
          id: B,
          type: "position",
          position: X ? {
            x: Math.max(0, V.position.x),
            y: Math.max(0, V.position.y)
          } : V.position,
          dragging: p
        };
        if (z && I.inProgress && I.fromNode.id === z.id) {
          const N = cr(z, I.fromHandle, J.Left, !0);
          P({ ...I, from: N });
        }
        X && z.parentId && w.push({
          id: B,
          parentId: z.parentId,
          rect: {
            ...V.internals.positionAbsolute,
            width: V.measured.width ?? 0,
            height: V.measured.height ?? 0
          }
        }), v.push(W);
      }
      if (w.length > 0) {
        const { parentLookup: B, nodeOrigin: V } = g(), z = Jc(w, _, B, V);
        v.push(...z);
      }
      for (const B of L.values())
        v = B(v);
      C(v);
    },
    triggerNodeChanges: (E) => {
      const { onNodesChange: p, setNodes: w, nodes: v, hasDefaultNodes: _, debug: C } = g();
      if (E != null && E.length) {
        if (_) {
          const I = Dm(E, v);
          w(I);
        }
        C && console.log("React Flow: trigger node changes", E), p == null || p(E);
      }
    },
    triggerEdgeChanges: (E) => {
      const { onEdgesChange: p, setEdges: w, edges: v, hasDefaultEdges: _, debug: C } = g();
      if (E != null && E.length) {
        if (_) {
          const I = eN(E, v);
          w(I);
        }
        C && console.log("React Flow: trigger edge changes", E), p == null || p(E);
      }
    },
    addSelectedNodes: (E) => {
      const { multiSelectionActive: p, edgeLookup: w, nodeLookup: v, triggerNodeChanges: _, triggerEdgeChanges: C } = g();
      if (p) {
        const I = E.map((P) => Yn(P, !0));
        _(I);
        return;
      }
      _(Tr(v, /* @__PURE__ */ new Set([...E]), !0)), C(Tr(w));
    },
    addSelectedEdges: (E) => {
      const { multiSelectionActive: p, edgeLookup: w, nodeLookup: v, triggerNodeChanges: _, triggerEdgeChanges: C } = g();
      if (p) {
        const I = E.map((P) => Yn(P, !0));
        C(I);
        return;
      }
      C(Tr(w, /* @__PURE__ */ new Set([...E]))), _(Tr(v, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: E, edges: p } = {}) => {
      const { edges: w, nodes: v, nodeLookup: _, triggerNodeChanges: C, triggerEdgeChanges: I } = g(), P = E || v, L = p || w, B = [];
      for (const z of P) {
        if (!z.selected)
          continue;
        const X = _.get(z.id);
        X && (X.selected = !1), B.push(Yn(z.id, !1));
      }
      const V = [];
      for (const z of L)
        z.selected && V.push(Yn(z.id, !1));
      C(B), I(V);
    },
    setMinZoom: (E) => {
      const { panZoom: p, maxZoom: w } = g();
      p == null || p.setScaleExtent([E, w]), h({ minZoom: E });
    },
    setMaxZoom: (E) => {
      const { panZoom: p, minZoom: w } = g();
      p == null || p.setScaleExtent([w, E]), h({ maxZoom: E });
    },
    setTranslateExtent: (E) => {
      var p;
      (p = g().panZoom) == null || p.setTranslateExtent(E), h({ translateExtent: E });
    },
    resetSelectedElements: () => {
      const { edges: E, nodes: p, triggerNodeChanges: w, triggerEdgeChanges: v, elementsSelectable: _ } = g();
      if (!_)
        return;
      const C = p.reduce((P, L) => L.selected ? [...P, Yn(L.id, !1)] : P, []), I = E.reduce((P, L) => L.selected ? [...P, Yn(L.id, !1)] : P, []);
      w(C), v(I);
    },
    setNodeExtent: (E) => {
      const { nodes: p, nodeLookup: w, parentLookup: v, nodeOrigin: _, elevateNodesOnSelect: C, nodeExtent: I, zIndexMode: P } = g();
      E[0][0] === I[0][0] && E[0][1] === I[0][1] && E[1][0] === I[1][0] && E[1][1] === I[1][1] || (Ra(p, w, v, {
        nodeOrigin: _,
        nodeExtent: E,
        elevateNodesOnSelect: C,
        checkEquality: !1,
        zIndexMode: P
      }), h({ nodeExtent: E }));
    },
    panBy: (E) => {
      const { transform: p, width: w, height: v, panZoom: _, translateExtent: C } = g();
      return F2({ delta: E, panZoom: _, transform: p, translateExtent: C, width: w, height: v });
    },
    setCenter: async (E, p, w) => {
      const { width: v, height: _, maxZoom: C, panZoom: I } = g();
      if (!I)
        return !1;
      const P = typeof (w == null ? void 0 : w.zoom) < "u" ? w.zoom : C;
      return await I.setViewport({
        x: v / 2 - E * P,
        y: _ / 2 - p * P,
        zoom: P
      }, { duration: w == null ? void 0 : w.duration, ease: w == null ? void 0 : w.ease, interpolate: w == null ? void 0 : w.interpolate }), !0;
    },
    cancelConnection: () => {
      h({
        connection: { ...rm }
      });
    },
    updateConnection: (E) => {
      h({ connection: E });
    },
    reset: () => h({ ...Ph() })
  };
}, Object.is);
function hy({ initialNodes: e, initialEdges: t, defaultNodes: n, defaultEdges: r, initialWidth: i, initialHeight: o, initialMinZoom: s, initialMaxZoom: l, initialFitViewOptions: u, fitView: a, nodeOrigin: c, nodeExtent: f, zIndexMode: d, children: h }) {
  const [g] = A.useState(() => xb({
    nodes: e,
    edges: t,
    defaultNodes: n,
    defaultEdges: r,
    width: i,
    height: o,
    fitView: a,
    minZoom: s,
    maxZoom: l,
    fitViewOptions: u,
    nodeOrigin: c,
    nodeExtent: f,
    zIndexMode: d
  }));
  return b.jsx(jk, { value: g, children: b.jsx(oN, { children: b.jsx(xN, { children: h }) }) });
}
function _b({ children: e, nodes: t, edges: n, defaultNodes: r, defaultEdges: i, width: o, height: s, fitView: l, fitViewOptions: u, minZoom: a, maxZoom: c, nodeOrigin: f, nodeExtent: d, zIndexMode: h }) {
  return A.useContext(Tl) ? b.jsx(b.Fragment, { children: e }) : b.jsx(hy, { initialNodes: t, initialEdges: n, defaultNodes: r, defaultEdges: i, initialWidth: o, initialHeight: s, fitView: l, initialFitViewOptions: u, initialMinZoom: a, initialMaxZoom: c, nodeOrigin: f, nodeExtent: d, zIndexMode: h, children: e });
}
const Eb = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function Sb({ nodes: e, edges: t, defaultNodes: n, defaultEdges: r, className: i, nodeTypes: o, edgeTypes: s, onNodeClick: l, onEdgeClick: u, onInit: a, onMove: c, onMoveStart: f, onMoveEnd: d, onConnect: h, onConnectStart: g, onConnectEnd: x, onClickConnectStart: E, onClickConnectEnd: p, onNodeMouseEnter: w, onNodeMouseMove: v, onNodeMouseLeave: _, onNodeContextMenu: C, onNodeDoubleClick: I, onNodeDragStart: P, onNodeDrag: L, onNodeDragStop: B, onNodesDelete: V, onEdgesDelete: z, onDelete: X, onSelectionChange: W, onSelectionDragStart: N, onSelectionDrag: O, onSelectionDragStop: R, onSelectionContextMenu: j, onSelectionStart: M, onSelectionEnd: T, onBeforeDelete: F, connectionMode: D, connectionLineType: H = bn.Bezier, connectionLineStyle: Z, connectionLineComponent: q, connectionLineContainerStyle: ie, deleteKeyCode: oe = "Backspace", selectionKeyCode: ne = "Shift", selectionOnDrag: Y = !1, selectionMode: K = so.Full, panActivationKeyCode: se = "Space", multiSelectionKeyCode: le = ao() ? "Meta" : "Control", zoomActivationKeyCode: re = ao() ? "Meta" : "Control", snapToGrid: te, snapGrid: ue, onlyRenderVisibleElements: fe = !1, selectNodesOnDrag: he, nodesDraggable: we, autoPanOnNodeFocus: et, nodesConnectable: xt, nodesFocusable: at, nodeOrigin: tt = Bm, edgesFocusable: Ve, edgesReconnectable: Pt, elementsSelectable: nn = !0, defaultViewport: je = Gk, minZoom: Mt = 0.5, maxZoom: S = 2, translateExtent: m = oo, preventScrolling: y = !0, nodeExtent: k, defaultMarkerColor: $ = "#b1b1b7", zoomOnScroll: U = !0, zoomOnPinch: G = !0, panOnScroll: ae = !1, panOnScrollSpeed: Ne = 0.5, panOnScrollMode: xe = er.Free, zoomOnDoubleClick: be = !0, panOnDrag: ye = !0, onPaneClick: av, onPaneMouseEnter: cv, onPaneMouseMove: fv, onPaneMouseLeave: dv, onPaneScroll: hv, onPaneContextMenu: pv, paneClickDistance: gv = 1, nodeClickDistance: mv = 0, children: yv, onReconnect: vv, onReconnectStart: wv, onReconnectEnd: xv, onEdgeContextMenu: _v, onEdgeDoubleClick: Ev, onEdgeMouseEnter: Sv, onEdgeMouseMove: kv, onEdgeMouseLeave: Nv, reconnectRadius: bv = 10, onNodesChange: Cv, onEdgesChange: Iv, noDragClassName: Pv = "nodrag", noWheelClassName: Mv = "nowheel", noPanClassName: af = "nopan", fitView: cf, fitViewOptions: ff, connectOnClick: Tv, attributionPosition: Lv, proOptions: $v, defaultEdgeOptions: jv, elevateNodesOnSelect: Rv = !0, elevateEdgesOnSelect: Av = !1, disableKeyboardA11y: df = !1, autoPanOnConnect: Ov, autoPanOnNodeDrag: Bv, autoPanOnSelection: Fv = !0, autoPanSpeed: Dv, connectionRadius: zv, isValidConnection: Uv, onError: Hv, style: Vv, id: hf, nodeDragThreshold: Wv, connectionDragThreshold: Yv, viewport: Gv, onViewportChange: Xv, width: Qv, height: Kv, colorMode: qv = "light", debug: Zv, onScroll: Co, ariaLabelConfig: Jv, zIndexMode: pf = "basic", ...ew }, tw) {
  const Bl = hf || "1", nw = qk(qv), rw = A.useCallback((gf) => {
    gf.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Co == null || Co(gf);
  }, [Co]);
  return b.jsx("div", { "data-testid": "rf__wrapper", ...ew, onScroll: rw, style: { ...Vv, ...Eb }, ref: tw, className: Ae(["react-flow", i, nw]), id: hf, role: "application", children: b.jsxs(_b, { nodes: e, edges: t, width: Qv, height: Kv, fitView: cf, fitViewOptions: ff, minZoom: Mt, maxZoom: S, nodeOrigin: tt, nodeExtent: k, zIndexMode: pf, children: [b.jsx(Kk, { nodes: e, edges: t, defaultNodes: n, defaultEdges: r, onConnect: h, onConnectStart: g, onConnectEnd: x, onClickConnectStart: E, onClickConnectEnd: p, nodesDraggable: we, autoPanOnNodeFocus: et, nodesConnectable: xt, nodesFocusable: at, edgesFocusable: Ve, edgesReconnectable: Pt, elementsSelectable: nn, elevateNodesOnSelect: Rv, elevateEdgesOnSelect: Av, minZoom: Mt, maxZoom: S, nodeExtent: k, onNodesChange: Cv, onEdgesChange: Iv, snapToGrid: te, snapGrid: ue, connectionMode: D, translateExtent: m, connectOnClick: Tv, defaultEdgeOptions: jv, fitView: cf, fitViewOptions: ff, onNodesDelete: V, onEdgesDelete: z, onDelete: X, onNodeDragStart: P, onNodeDrag: L, onNodeDragStop: B, onSelectionDrag: O, onSelectionDragStart: N, onSelectionDragStop: R, onMove: c, onMoveStart: f, onMoveEnd: d, noPanClassName: af, nodeOrigin: tt, rfId: Bl, autoPanOnConnect: Ov, autoPanOnNodeDrag: Bv, autoPanSpeed: Dv, onError: Hv, connectionRadius: zv, isValidConnection: Uv, selectNodesOnDrag: he, nodeDragThreshold: Wv, connectionDragThreshold: Yv, onBeforeDelete: F, debug: Zv, ariaLabelConfig: Jv, zIndexMode: pf }), b.jsx(vb, { onInit: a, onNodeClick: l, onEdgeClick: u, onNodeMouseEnter: w, onNodeMouseMove: v, onNodeMouseLeave: _, onNodeContextMenu: C, onNodeDoubleClick: I, nodeTypes: o, edgeTypes: s, connectionLineType: H, connectionLineStyle: Z, connectionLineComponent: q, connectionLineContainerStyle: ie, selectionKeyCode: ne, selectionOnDrag: Y, selectionMode: K, deleteKeyCode: oe, multiSelectionKeyCode: le, panActivationKeyCode: se, zoomActivationKeyCode: re, onlyRenderVisibleElements: fe, defaultViewport: je, translateExtent: m, minZoom: Mt, maxZoom: S, preventScrolling: y, zoomOnScroll: U, zoomOnPinch: G, zoomOnDoubleClick: be, panOnScroll: ae, panOnScrollSpeed: Ne, panOnScrollMode: xe, panOnDrag: ye, autoPanOnSelection: Fv, onPaneClick: av, onPaneMouseEnter: cv, onPaneMouseMove: fv, onPaneMouseLeave: dv, onPaneScroll: hv, onPaneContextMenu: pv, paneClickDistance: gv, nodeClickDistance: mv, onSelectionContextMenu: j, onSelectionStart: M, onSelectionEnd: T, onReconnect: vv, onReconnectStart: wv, onReconnectEnd: xv, onEdgeContextMenu: _v, onEdgeDoubleClick: Ev, onEdgeMouseEnter: Sv, onEdgeMouseMove: kv, onEdgeMouseLeave: Nv, reconnectRadius: bv, defaultMarkerColor: $, noDragClassName: Pv, noWheelClassName: Mv, noPanClassName: af, rfId: Bl, disableKeyboardA11y: df, nodeExtent: k, viewport: Gv, onViewportChange: Xv, nodesDraggable: we }), b.jsx(Yk, { onSelectionChange: W }), yv, b.jsx(zk, { proOptions: $v, position: Lv }), b.jsx(Dk, { rfId: Bl, disableKeyboardA11y: df })] }) });
}
var kb = zm(Sb);
const Nb = (e) => {
  var t;
  return (t = e.domNode) == null ? void 0 : t.querySelector(".react-flow__edgelabel-renderer");
};
function py({ children: e }) {
  const t = de(Nb);
  return t ? S0.createPortal(e, t) : null;
}
function bb({ dimensions: e, lineWidth: t, variant: n, className: r }) {
  return b.jsx("path", { strokeWidth: t, d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`, className: Ae(["react-flow__background-pattern", n, r]) });
}
function Cb({ radius: e, className: t }) {
  return b.jsx("circle", { cx: e, cy: e, r: e, className: Ae(["react-flow__background-pattern", "dots", t]) });
}
var On;
(function(e) {
  e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(On || (On = {}));
const Ib = {
  [On.Dots]: 1,
  [On.Lines]: 1,
  [On.Cross]: 6
}, Pb = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function gy({
  id: e,
  variant: t = On.Dots,
  // only used for dots and cross
  gap: n = 20,
  // only used for lines and cross
  size: r,
  lineWidth: i = 1,
  offset: o = 0,
  color: s,
  bgColor: l,
  style: u,
  className: a,
  patternClassName: c
}) {
  const f = A.useRef(null), { transform: d, patternId: h } = de(Pb, Te), g = r || Ib[t], x = t === On.Dots, E = t === On.Cross, p = Array.isArray(n) ? n : [n, n], w = [p[0] * d[2] || 1, p[1] * d[2] || 1], v = g * d[2], _ = Array.isArray(o) ? o : [o, o], C = E ? [v, v] : w, I = [
    _[0] * d[2] || 1 + C[0] / 2,
    _[1] * d[2] || 1 + C[1] / 2
  ], P = `${h}${e || ""}`;
  return b.jsxs("svg", { className: Ae(["react-flow__background", a]), style: {
    ...u,
    ...jl,
    "--xy-background-color-props": l,
    "--xy-background-pattern-color-props": s
  }, ref: f, "data-testid": "rf__background", children: [b.jsx("pattern", { id: P, x: d[0] % w[0], y: d[1] % w[1], width: w[0], height: w[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${I[0]},-${I[1]})`, children: x ? b.jsx(Cb, { radius: v / 2, className: c }) : b.jsx(bb, { dimensions: C, lineWidth: i, variant: t, className: c }) }), b.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${P})` })] });
}
gy.displayName = "Background";
const Mb = A.memo(gy);
function Tb() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: b.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function Lb() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: b.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function $b() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: b.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function jb() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: b.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function Rb() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: b.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function Jo({ children: e, className: t, ...n }) {
  return b.jsx("button", { type: "button", className: Ae(["react-flow__controls-button", t]), ...n, children: e });
}
const Ab = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig
});
function my({ style: e, showZoom: t = !0, showFitView: n = !0, showInteractive: r = !0, fitViewOptions: i, onZoomIn: o, onZoomOut: s, onFitView: l, onInteractiveChange: u, className: a, children: c, position: f = "bottom-left", orientation: d = "vertical", "aria-label": h }) {
  const g = ke(), { isInteractive: x, minZoomReached: E, maxZoomReached: p, ariaLabelConfig: w } = de(Ab, Te), { zoomIn: v, zoomOut: _, fitView: C } = $l(), I = () => {
    v(), o == null || o();
  }, P = () => {
    _(), s == null || s();
  }, L = () => {
    C(i), l == null || l();
  }, B = () => {
    g.setState({
      nodesDraggable: !x,
      nodesConnectable: !x,
      elementsSelectable: !x
    }), u == null || u(!x);
  }, V = d === "horizontal" ? "horizontal" : "vertical";
  return b.jsxs(Ll, { className: Ae(["react-flow__controls", V, a]), position: f, style: e, "data-testid": "rf__controls", "aria-label": h ?? w["controls.ariaLabel"], children: [t && b.jsxs(b.Fragment, { children: [b.jsx(Jo, { onClick: I, className: "react-flow__controls-zoomin", title: w["controls.zoomIn.ariaLabel"], "aria-label": w["controls.zoomIn.ariaLabel"], disabled: p, children: b.jsx(Tb, {}) }), b.jsx(Jo, { onClick: P, className: "react-flow__controls-zoomout", title: w["controls.zoomOut.ariaLabel"], "aria-label": w["controls.zoomOut.ariaLabel"], disabled: E, children: b.jsx(Lb, {}) })] }), n && b.jsx(Jo, { className: "react-flow__controls-fitview", onClick: L, title: w["controls.fitView.ariaLabel"], "aria-label": w["controls.fitView.ariaLabel"], children: b.jsx($b, {}) }), r && b.jsx(Jo, { className: "react-flow__controls-interactive", onClick: B, title: w["controls.interactive.ariaLabel"], "aria-label": w["controls.interactive.ariaLabel"], children: x ? b.jsx(Rb, {}) : b.jsx(jb, {}) }), c] });
}
my.displayName = "Controls";
const Ob = A.memo(my);
function Bb({ id: e, x: t, y: n, width: r, height: i, style: o, color: s, strokeColor: l, strokeWidth: u, className: a, borderRadius: c, shapeRendering: f, selected: d, onClick: h }) {
  const { background: g, backgroundColor: x } = o || {}, E = s || g || x;
  return b.jsx("rect", { className: Ae(["react-flow__minimap-node", { selected: d }, a]), x: t, y: n, rx: c, ry: c, width: r, height: i, style: {
    fill: E,
    stroke: l,
    strokeWidth: u
  }, shapeRendering: f, onClick: h ? (p) => h(p, e) : void 0 });
}
const Fb = A.memo(Bb), Db = (e) => e.nodes.map((t) => t.id), xu = (e) => e instanceof Function ? e : () => e;
function zb({
  nodeStrokeColor: e,
  nodeColor: t,
  nodeClassName: n = "",
  nodeBorderRadius: r = 5,
  nodeStrokeWidth: i,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: o = Fb,
  onClick: s
}) {
  const l = de(Db, Te), u = xu(t), a = xu(e), c = xu(n), f = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return b.jsx(b.Fragment, { children: l.map((d) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    b.jsx(Hb, { id: d, nodeColorFunc: u, nodeStrokeColorFunc: a, nodeClassNameFunc: c, nodeBorderRadius: r, nodeStrokeWidth: i, NodeComponent: o, onClick: s, shapeRendering: f }, d)
  )) });
}
function Ub({ id: e, nodeColorFunc: t, nodeStrokeColorFunc: n, nodeClassNameFunc: r, nodeBorderRadius: i, nodeStrokeWidth: o, shapeRendering: s, NodeComponent: l, onClick: u }) {
  const { node: a, x: c, y: f, width: d, height: h } = de((g) => {
    const x = g.nodeLookup.get(e);
    if (!x)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const E = x.internals.userNode, { x: p, y: w } = x.internals.positionAbsolute, { width: v, height: _ } = tn(E);
    return {
      node: E,
      x: p,
      y: w,
      width: v,
      height: _
    };
  }, Te);
  return !a || a.hidden || !fm(a) ? null : b.jsx(l, { x: c, y: f, width: d, height: h, style: a.style, selected: !!a.selected, className: r(a), color: t(a), borderRadius: i, strokeColor: n(a), strokeWidth: o, shapeRendering: s, onClick: u, id: a.id });
}
const Hb = A.memo(Ub);
var Vb = A.memo(zb);
const Wb = 200, Yb = 150, Gb = (e) => !e.hidden, Xb = (e) => {
  const t = {
    x: -e.transform[0] / e.transform[2],
    y: -e.transform[1] / e.transform[2],
    width: e.width / e.transform[2],
    height: e.height / e.transform[2]
  };
  return {
    viewBB: t,
    boundingRect: e.nodeLookup.size > 0 ? um(_o(e.nodeLookup, { filter: Gb }), t) : t,
    rfId: e.rfId,
    panZoom: e.panZoom,
    translateExtent: e.translateExtent,
    flowWidth: e.width,
    flowHeight: e.height,
    ariaLabelConfig: e.ariaLabelConfig
  };
}, Mh = (e, t) => e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height, Qb = (e, t) => Mh(e.viewBB, t.viewBB) && Mh(e.boundingRect, t.boundingRect) && e.rfId === t.rfId && e.panZoom === t.panZoom && e.translateExtent === t.translateExtent && e.flowWidth === t.flowWidth && e.flowHeight === t.flowHeight && e.ariaLabelConfig === t.ariaLabelConfig, Kb = "react-flow__minimap-desc";
function yy({
  style: e,
  className: t,
  nodeStrokeColor: n,
  nodeColor: r,
  nodeClassName: i = "",
  nodeBorderRadius: o = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: l,
  bgColor: u,
  maskColor: a,
  maskStrokeColor: c,
  maskStrokeWidth: f,
  position: d = "bottom-right",
  onClick: h,
  onNodeClick: g,
  pannable: x = !1,
  zoomable: E = !1,
  ariaLabel: p,
  inversePan: w,
  zoomStep: v = 1,
  offsetScale: _ = 5
}) {
  const C = ke(), I = A.useRef(null), { boundingRect: P, viewBB: L, rfId: B, panZoom: V, translateExtent: z, flowWidth: X, flowHeight: W, ariaLabelConfig: N } = de(Xb, Qb), O = (e == null ? void 0 : e.width) ?? Wb, R = (e == null ? void 0 : e.height) ?? Yb, j = P.width / O, M = P.height / R, T = Math.max(j, M), F = T * O, D = T * R, H = _ * T, Z = P.x - (F - P.width) / 2 - H, q = P.y - (D - P.height) / 2 - H, ie = F + H * 2, oe = D + H * 2, ne = `${Kb}-${B}`, Y = A.useRef(0), K = A.useRef();
  Y.current = T, A.useEffect(() => {
    if (I.current && V)
      return K.current = X2({
        domNode: I.current,
        panZoom: V,
        getTransform: () => C.getState().transform,
        getViewScale: () => Y.current
      }), () => {
        var te;
        (te = K.current) == null || te.destroy();
      };
  }, [V]), A.useEffect(() => {
    var te;
    (te = K.current) == null || te.update({
      translateExtent: z,
      width: X,
      height: W,
      inversePan: w,
      pannable: x,
      zoomStep: v,
      zoomable: E
    });
  }, [x, E, w, v, z, X, W]);
  const se = h ? (te) => {
    var he;
    const [ue, fe] = ((he = K.current) == null ? void 0 : he.pointer(te)) || [0, 0];
    h(te, { x: ue, y: fe });
  } : void 0, le = g ? A.useCallback((te, ue) => {
    const fe = C.getState().nodeLookup.get(ue).internals.userNode;
    g(te, fe);
  }, []) : void 0, re = p ?? N["minimap.ariaLabel"];
  return b.jsx(Ll, { position: d, style: {
    ...e,
    "--xy-minimap-background-color-props": typeof u == "string" ? u : void 0,
    "--xy-minimap-mask-background-color-props": typeof a == "string" ? a : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof c == "string" ? c : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof f == "number" ? f * T : void 0,
    "--xy-minimap-node-background-color-props": typeof r == "string" ? r : void 0,
    "--xy-minimap-node-stroke-color-props": typeof n == "string" ? n : void 0,
    "--xy-minimap-node-stroke-width-props": typeof s == "number" ? s : void 0
  }, className: Ae(["react-flow__minimap", t]), "data-testid": "rf__minimap", children: b.jsxs("svg", { width: O, height: R, viewBox: `${Z} ${q} ${ie} ${oe}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": ne, ref: I, onClick: se, children: [re && b.jsx("title", { id: ne, children: re }), b.jsx(Vb, { onClick: le, nodeColor: r, nodeStrokeColor: n, nodeBorderRadius: o, nodeClassName: i, nodeStrokeWidth: s, nodeComponent: l }), b.jsx("path", { className: "react-flow__minimap-mask", d: `M${Z - H},${q - H}h${ie + H * 2}v${oe + H * 2}h${-ie - H * 2}z
        M${L.x},${L.y}h${L.width}v${L.height}h${-L.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
yy.displayName = "MiniMap";
const qb = A.memo(yy), Zb = (e) => (t) => e ? `${Math.max(1 / t.transform[2], 1)}` : void 0, Jb = {
  [Jr.Line]: "right",
  [Jr.Handle]: "bottom-right"
};
function eC({ nodeId: e, position: t, variant: n = Jr.Handle, className: r, style: i = void 0, children: o, color: s, minWidth: l = 10, minHeight: u = 10, maxWidth: a = Number.MAX_VALUE, maxHeight: c = Number.MAX_VALUE, keepAspectRatio: f = !1, resizeDirection: d, autoScale: h = !0, shouldResize: g, onResizeStart: x, onResize: E, onResizeEnd: p }) {
  const w = Ym(), v = typeof e == "string" ? e : w, _ = ke(), C = A.useRef(null), I = n === Jr.Handle, P = de(A.useCallback(Zb(I && h), [I, h]), Te), L = A.useRef(null), B = t ?? Jb[n];
  A.useEffect(() => {
    if (!(!C.current || !v))
      return L.current || (L.current = lk({
        domNode: C.current,
        nodeId: v,
        getStoreItems: () => {
          const { nodeLookup: z, transform: X, snapGrid: W, snapToGrid: N, nodeOrigin: O, domNode: R } = _.getState();
          return {
            nodeLookup: z,
            transform: X,
            snapGrid: W,
            snapToGrid: N,
            nodeOrigin: O,
            paneDomNode: R
          };
        },
        onChange: (z, X) => {
          const { triggerNodeChanges: W, nodeLookup: N, parentLookup: O, nodeOrigin: R } = _.getState(), j = [], M = { x: z.x, y: z.y }, T = N.get(v);
          if (T && T.expandParent && T.parentId) {
            const F = T.origin ?? R, D = z.width ?? T.measured.width ?? 0, H = z.height ?? T.measured.height ?? 0, Z = {
              id: T.id,
              parentId: T.parentId,
              rect: {
                width: D,
                height: H,
                ...dm({
                  x: z.x ?? T.position.x,
                  y: z.y ?? T.position.y
                }, { width: D, height: H }, T.parentId, N, F)
              }
            }, q = Jc([Z], N, O, R);
            j.push(...q), M.x = z.x ? Math.max(F[0] * D, z.x) : void 0, M.y = z.y ? Math.max(F[1] * H, z.y) : void 0;
          }
          if (M.x !== void 0 && M.y !== void 0) {
            const F = {
              id: v,
              type: "position",
              position: { ...M }
            };
            j.push(F);
          }
          if (z.width !== void 0 && z.height !== void 0) {
            const D = {
              id: v,
              type: "dimensions",
              resizing: !0,
              setAttributes: d ? d === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: z.width,
                height: z.height
              }
            };
            j.push(D);
          }
          for (const F of X) {
            const D = {
              ...F,
              type: "position"
            };
            j.push(D);
          }
          W(j);
        },
        onEnd: ({ width: z, height: X }) => {
          const W = {
            id: v,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: z,
              height: X
            }
          };
          _.getState().triggerNodeChanges([W]);
        }
      })), L.current.update({
        controlPosition: B,
        boundaries: {
          minWidth: l,
          minHeight: u,
          maxWidth: a,
          maxHeight: c
        },
        keepAspectRatio: f,
        resizeDirection: d,
        onResizeStart: x,
        onResize: E,
        onResizeEnd: p,
        shouldResize: g
      }), () => {
        var z;
        (z = L.current) == null || z.destroy();
      };
  }, [
    B,
    l,
    u,
    a,
    c,
    f,
    x,
    E,
    p,
    g
  ]);
  const V = B.split("-");
  return b.jsx("div", { className: Ae(["react-flow__resize-control", "nodrag", ...V, n, r]), ref: C, style: {
    ...i,
    scale: P,
    ...s && { [I ? "backgroundColor" : "borderColor"]: s }
  }, children: o });
}
A.memo(eC);
const tC = "http://data.ashrae.org/standard223#", Th = "http://qudt.org/schema/qudt/", nC = "http://www.w3.org/2000/01/rdf-schema#", ge = (e) => `${tC}${e}`, me = {
  contains: ge("contains"),
  hasMember: ge("hasMember"),
  encloses: ge("encloses"),
  hasConnectionPoint: ge("hasConnectionPoint"),
  hasBoundaryConnectionPoint: ge("hasBoundaryConnectionPoint"),
  hasOptionalConnectionPoint: ge("hasOptionalConnectionPoint"),
  isConnectionPointOf: ge("isConnectionPointOf"),
  cnx: ge("cnx"),
  connectsThrough: ge("connectsThrough"),
  hasProperty: ge("hasProperty"),
  hasMedium: ge("hasMedium"),
  hasValue: ge("hasValue"),
  hasEnumerationKind: ge("hasEnumerationKind"),
  mapsTo: ge("mapsTo"),
  hasQuantityKind: `${Th}hasQuantityKind`,
  hasUnit: `${Th}hasUnit`,
  observes: ge("observes"),
  hasObservationLocation: ge("hasObservationLocation"),
  hasPhysicalLocation: ge("hasPhysicalLocation"),
  actuatedByProperty: ge("actuatedByProperty"),
  hasInput: ge("hasInput"),
  hasOutput: ge("hasOutput"),
  executes: ge("executes"),
  hasDomainSpace: ge("hasDomainSpace"),
  actuates: ge("actuates")
}, Xe = {
  InletConnectionPoint: ge("InletConnectionPoint"),
  OutletConnectionPoint: ge("OutletConnectionPoint"),
  BidirectionalConnectionPoint: ge("BidirectionalConnectionPoint"),
  Connection: ge("Connection"),
  Conductor: ge("Conductor"),
  // Verified against the published ontology (data.ashrae.org/BACnet/223p/223p.ttl): Duct and
  // Pipe are rdfs:subClassOf s223:Connection, same as Conductor — all three are physical carrier
  // hubs that should collapse into a connection arrow, not render as their own box.
  Duct: ge("Duct"),
  Pipe: ge("Pipe"),
  System: ge("System"),
  Zone: ge("Zone")
};
function ht(e) {
  const t = e.lastIndexOf("#");
  if (t !== -1) return e.slice(t + 1);
  const n = e.lastIndexOf("/");
  return n !== -1 ? e.slice(n + 1) : e;
}
const rC = /* @__PURE__ */ new Set([Xe.Connection, Xe.Conductor, Xe.Duct, Xe.Pipe]);
function Lh(e, t) {
  if (e.connectionPoints.has(t)) return !0;
  const n = e.nodes.get(t);
  return n ? rC.has(n.typeUri ?? "") : !1;
}
class iC {
  constructor() {
    mf(this, "parent", /* @__PURE__ */ new Map());
  }
  find(t) {
    this.parent.has(t) || this.parent.set(t, t);
    let n = t;
    for (; this.parent.get(n) !== n; ) n = this.parent.get(n);
    let r = t;
    for (; this.parent.get(r) !== n; ) {
      const i = this.parent.get(r);
      this.parent.set(r, n), r = i;
    }
    return n;
  }
  union(t, n) {
    const r = this.find(t), i = this.find(n);
    r !== i && this.parent.set(r, i);
  }
}
function oC(e, t) {
  var o;
  const n = new iC();
  for (const s of e.edges)
    s.predicate !== me.cnx && s.predicate !== me.connectsThrough || !Lh(t, s.source) || !Lh(t, s.target) || n.union(s.source, s.target);
  const r = /* @__PURE__ */ new Map();
  for (const s of t.connectionPoints.keys()) {
    const l = n.find(s);
    r.has(l) || r.set(l, { cps: [], hubs: [] }), r.get(l).cps.push(s);
  }
  for (const s of t.nodes.keys()) {
    const l = n.find(s), u = r.get(l);
    u && u.hubs.push(s);
  }
  const i = [];
  for (const [s, { cps: l, hubs: u }] of r) {
    const a = l.map((p) => t.connectionPoints.get(p)).filter((p) => p.ownerUris.length > 0);
    if (a.length < 2) continue;
    const c = a.filter((p) => p.kind === "Outlet"), f = a.filter((p) => p.kind === "Inlet");
    a.filter((p) => p.kind !== "Outlet" && p.kind !== "Inlet");
    const d = [];
    if (c.length > 0 && f.length > 0)
      for (const p of c) for (const w of f) d.push([p.uri, w.uri]);
    else {
      const p = [...a].sort((w, v) => w.uri.localeCompare(v.uri));
      for (let w = 0; w < p.length; w++)
        for (let v = w + 1; v < p.length; v++) d.push([p[w].uri, p[v].uri]);
    }
    const h = u.map((p) => t.nodes.get(p)).find((p) => p.label), g = (h == null ? void 0 : h.label) ?? "", x = u.flatMap((p) => {
      var w;
      return ((w = t.nodes.get(p)) == null ? void 0 : w.properties) ?? [];
    }), E = (o = a.find((p) => p.medium)) == null ? void 0 : o.medium;
    for (const [p, w] of d) {
      const v = t.connectionPoints.get(p), _ = t.connectionPoints.get(w);
      for (const C of v.ownerUris)
        for (const I of _.ownerUris)
          C !== I && i.push({
            id: `${s}::${p}::${w}::${C}::${I}`,
            hubUri: s,
            hubLabel: g,
            medium: E,
            fromEquipmentUri: C,
            fromCPUri: p,
            toEquipmentUri: I,
            toCPUri: w,
            properties: x
          });
    }
  }
  return i;
}
const sC = {
  DEG_F: "°F",
  DEG_C: "°C",
  K: "K",
  PERCENT: "%",
  PSI: "psi",
  LUX: "lx",
  "FT3-PER-MIN": "CFM",
  "M3-PER-SEC": "m³/s",
  NUM: "",
  W: "W",
  KiloW: "kW",
  V: "V",
  A: "A",
  HZ: "Hz",
  PA: "Pa"
};
function lC(e) {
  return sC[e] ?? e;
}
const vy = /* @__PURE__ */ new Set([Xe.InletConnectionPoint, Xe.OutletConnectionPoint, Xe.BidirectionalConnectionPoint]), _u = /* @__PURE__ */ new Set([Xe.Connection, Xe.Conductor, Xe.Duct, Xe.Pipe]), uC = "http://www.w3.org/2002/07/owl#Ontology";
function aC(e, t) {
  return e.types.some((n) => t.has(n));
}
function cC(e) {
  return vy.has(e) || ht(e).endsWith("ConnectionPoint");
}
function fC(e) {
  return ht(e).endsWith("Property");
}
function dC(e) {
  return e.types.includes(Xe.InletConnectionPoint) ? "Inlet" : e.types.includes(Xe.OutletConnectionPoint) ? "Outlet" : e.types.includes(Xe.BidirectionalConnectionPoint) ? "Bidirectional" : "Other";
}
function hC(e) {
  const t = e.properties.find((r) => r.predicate === me.hasMedium && !r.isLiteral), n = e.properties.filter((r) => r.predicate === me.mapsTo && !r.isLiteral).map((r) => r.object);
  return {
    uri: e.uri,
    label: e.label,
    kind: dC(e),
    medium: t ? ht(t.object) : void 0,
    ownerUri: void 0,
    ownerUris: [],
    mapsTo: n
  };
}
function wy(e) {
  const t = e.properties.find((l) => l.predicate === me.hasValue && l.isLiteral), n = e.properties.find((l) => l.predicate === me.hasQuantityKind && !l.isLiteral), r = e.properties.find((l) => l.predicate === me.hasUnit && !l.isLiteral), i = e.properties.find((l) => l.predicate === me.hasEnumerationKind && !l.isLiteral), o = e.properties.filter((l) => l.predicate === me.mapsTo && !l.isLiteral).map((l) => l.object), s = r ? ht(r.object) : void 0;
  return {
    uri: e.uri,
    label: e.label,
    typeName: e.types[0] ? ht(e.types[0]) : void 0,
    value: t == null ? void 0 : t.object,
    quantityKind: n ? ht(n.object) : void 0,
    unit: s,
    unitSymbol: s ? lC(s) : void 0,
    enumerationKind: i ? ht(i.object) : void 0,
    mapsTo: o
  };
}
function pC(e) {
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const h of e.nodes.values())
    if (h.types.length !== 0 && !h.types.includes(uC)) {
      if (aC(h, vy) || h.types.some(cC)) {
        t.set(h.uri, hC(h));
        continue;
      }
      if (h.types.some(fC) || ht(h.types[0] ?? "").includes("ExternalReference")) {
        n.set(h.uri, wy(h));
        continue;
      }
      r.set(h.uri, {
        uri: h.uri,
        label: h.label,
        typeUri: h.types[0],
        typeName: h.types[0] ? ht(h.types[0]) : void 0,
        connectionPoints: [],
        properties: [],
        children: [],
        instrumentationLinks: [],
        groupMemberships: []
      });
    }
  const i = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
  for (const h of e.edges) {
    if (h.predicate === me.hasConnectionPoint || h.predicate === me.hasBoundaryConnectionPoint || h.predicate === me.hasOptionalConnectionPoint) {
      const g = t.get(h.target), x = r.get(h.source);
      g && x && (g.ownerUris.includes(x.uri) || g.ownerUris.push(x.uri), g.ownerUri || (g.ownerUri = x.uri, x.connectionPoints.push(g.uri)));
      continue;
    }
    if (h.predicate === me.isConnectionPointOf) {
      const g = t.get(h.source), x = r.get(h.target);
      g && x && (g.ownerUris.includes(x.uri) || g.ownerUris.push(x.uri), g.ownerUri || (g.ownerUri = x.uri, x.connectionPoints.push(g.uri)));
    }
  }
  const s = {
    [me.contains]: "contains",
    [me.encloses]: "encloses"
  }, l = {
    [me.observes]: "observes",
    [me.actuatedByProperty]: "actuatedByProperty",
    [me.hasInput]: "hasInput",
    [me.hasOutput]: "hasOutput",
    [me.hasObservationLocation]: "hasObservationLocation",
    [me.hasPhysicalLocation]: "hasPhysicalLocation",
    // Distinct from actuatedByProperty: points straight at the equipment/component an Actuator
    // physically acts on (e.g. a Driver `actuates` the LightEngine it drives), not a Property.
    [me.actuates]: "actuates"
  }, u = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const h of e.edges) {
    if (h.predicate === me.hasConnectionPoint || h.predicate === me.hasBoundaryConnectionPoint || h.predicate === me.hasOptionalConnectionPoint || h.predicate === me.isConnectionPointOf)
      continue;
    if (h.predicate === me.hasProperty) {
      const E = n.get(h.target);
      if (!E) continue;
      const p = r.get(h.source);
      p ? (p.properties.push(E.uri), o.set(E.uri, p.uri)) : t.has(h.source) && a.set(E.uri, h.source);
      continue;
    }
    const g = l[h.predicate];
    if (g) {
      const E = r.get(h.source);
      E && E.instrumentationLinks.push({ relation: g, targetUri: h.target });
      continue;
    }
    if (h.predicate === me.executes) {
      const E = r.get(h.target);
      E && r.has(h.source) && E.instrumentationLinks.push({ relation: "executedBy", targetUri: h.source });
      continue;
    }
    if (h.predicate === me.hasMember || h.predicate === me.hasDomainSpace) {
      r.has(h.source) && r.has(h.target) && (u.has(h.source) || u.set(h.source, []), u.get(h.source).push(h.target));
      continue;
    }
    const x = s[h.predicate];
    if (x) {
      const E = r.get(h.source), p = r.get(h.target);
      E && p && (E.children.push({ uri: p.uri, via: x }), p.parentUri = E.uri, i.add(p.uri));
    }
  }
  for (const h of e.edges) {
    if (h.predicate !== me.cnx && h.predicate !== me.connectsThrough) continue;
    const g = r.get(h.source), x = t.get(h.target);
    !g || !x || x.ownerUri || _u.has(g.typeUri ?? "") || (x.ownerUri = g.uri, x.ownerUris.push(g.uri), g.connectionPoints.push(x.uri));
  }
  function c(h) {
    var g, x;
    for (const E of h.instrumentationLinks) {
      if (E.relation !== "observes" && E.relation !== "actuatedByProperty" && E.relation !== "hasInput" && E.relation !== "hasOutput") continue;
      const p = o.get(E.targetUri);
      if (p) return p;
      const w = a.get(E.targetUri), v = w ? (g = t.get(w)) == null ? void 0 : g.ownerUri : void 0;
      if (v) return v;
    }
    for (const E of h.instrumentationLinks) {
      if (E.relation !== "hasObservationLocation" && E.relation !== "hasPhysicalLocation" && E.relation !== "actuates") continue;
      if (r.has(E.targetUri)) return E.targetUri;
      const p = t.get(E.targetUri);
      if (p != null && p.ownerUri) return p.ownerUri;
    }
    return (x = h.instrumentationLinks.find((E) => E.relation === "executedBy")) == null ? void 0 : x.targetUri;
  }
  for (const h of r.values()) {
    if (i.has(h.uri) || _u.has(h.typeUri ?? "")) continue;
    const g = c(h), x = g ? r.get(g) : void 0;
    !x || x.uri === h.uri || (x.children.push({ uri: h.uri, via: "functional" }), h.parentUri = x.uri, i.add(h.uri));
  }
  const f = oC(e, { nodes: r, connectionPoints: t });
  for (const [h, g] of u)
    for (const x of g)
      r.get(x).groupMemberships.push(h);
  const d = [...r.values()].filter((h) => !i.has(h.uri) && !_u.has(h.typeUri ?? "") && !xy(h) && !mC(h)).map((h) => h.uri);
  return { nodes: r, connectionPoints: t, properties: n, edges: f, roots: d };
}
function xy(e) {
  return e.typeUri === Xe.System || e.typeUri === Xe.Zone;
}
const gC = ["Sensor", "Actuator", "Function"];
function mC(e) {
  const t = e.typeName ?? "";
  return t === "Thermostat" || gC.some((n) => t.endsWith(n));
}
const yC = /* @__PURE__ */ new Set([
  "observes",
  "actuatedByProperty",
  "hasInput",
  "hasOutput",
  "executedBy",
  "actuates"
]);
function _y(e) {
  return e.instrumentationLinks.some((t) => yC.has(t.relation));
}
const Ey = "https://brickschema.org/schema/Brick#", _n = (e) => `${Ey}${e}`, Wt = {
  feeds: _n("feeds"),
  isFedBy: _n("isFedBy"),
  hasPoint: _n("hasPoint"),
  isPointOf: _n("isPointOf"),
  hasPart: _n("hasPart"),
  isPartOf: _n("isPartOf"),
  hasLocation: _n("hasLocation"),
  isLocationOf: _n("isLocationOf")
};
function vC(e) {
  const t = /* @__PURE__ */ new Set();
  for (const d of e.edges)
    d.predicate === Wt.hasPoint ? t.add(d.target) : d.predicate === Wt.isPointOf && t.add(d.source);
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const d of e.nodes.values()) {
    if (!d.types.some((x) => x.startsWith(Ey))) continue;
    const h = d.types[0], g = ht(h);
    if (t.has(d.uri)) {
      r.set(d.uri, wy(d));
      continue;
    }
    n.set(d.uri, {
      uri: d.uri,
      label: d.label,
      typeUri: h,
      typeName: g,
      connectionPoints: [],
      properties: [],
      children: [],
      instrumentationLinks: [],
      groupMemberships: []
    });
  }
  const i = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), s = [];
  let l = 0;
  function u(d, h) {
    const g = n.get(d), x = n.get(h);
    !g || !x || g.uri === x.uri || i.has(x.uri) || (g.children.push({ uri: x.uri, via: "contains" }), x.parentUri = g.uri, i.add(x.uri));
  }
  function a(d, h) {
    const g = n.get(d), x = r.get(h);
    g && x && g.properties.push(x.uri);
  }
  function c(d, h) {
    const g = n.get(d), x = n.get(h);
    if (!g || !x || g.uri === x.uri) return;
    const E = `feeds::${g.uri}::${x.uri}::${l++}`, p = `${E}#out`, w = `${E}#in`;
    o.set(p, { uri: p, label: "feeds", kind: "Outlet", ownerUri: g.uri, ownerUris: [g.uri], mapsTo: [] }), o.set(w, { uri: w, label: "feeds", kind: "Inlet", ownerUri: x.uri, ownerUris: [x.uri], mapsTo: [] }), g.connectionPoints.push(p), x.connectionPoints.push(w), s.push({
      id: E,
      hubUri: E,
      hubLabel: "feeds",
      fromEquipmentUri: g.uri,
      fromCPUri: p,
      toEquipmentUri: x.uri,
      toCPUri: w,
      properties: []
    });
  }
  for (const d of e.edges)
    switch (d.predicate) {
      case Wt.hasPoint:
        a(d.source, d.target);
        break;
      case Wt.isPointOf:
        a(d.target, d.source);
        break;
      case Wt.hasPart:
      case Wt.isLocationOf:
        u(d.source, d.target);
        break;
      case Wt.isPartOf:
      case Wt.hasLocation:
        u(d.target, d.source);
        break;
      case Wt.feeds:
        c(d.source, d.target);
        break;
      case Wt.isFedBy:
        c(d.target, d.source);
        break;
    }
  const f = [...n.values()].filter((d) => !i.has(d.uri)).map((d) => d.uri);
  return { nodes: n, connectionPoints: o, properties: r, edges: s, roots: f };
}
var Sy = {}, Rl = {};
Rl.byteLength = _C;
Rl.toByteArray = SC;
Rl.fromByteArray = bC;
var Qt = [], _t = [], wC = typeof Uint8Array < "u" ? Uint8Array : Array, Eu = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var mr = 0, xC = Eu.length; mr < xC; ++mr)
  Qt[mr] = Eu[mr], _t[Eu.charCodeAt(mr)] = mr;
_t[45] = 62;
_t[95] = 63;
function ky(e) {
  var t = e.length;
  if (t % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var n = e.indexOf("=");
  n === -1 && (n = t);
  var r = n === t ? 0 : 4 - n % 4;
  return [n, r];
}
function _C(e) {
  var t = ky(e), n = t[0], r = t[1];
  return (n + r) * 3 / 4 - r;
}
function EC(e, t, n) {
  return (t + n) * 3 / 4 - n;
}
function SC(e) {
  var t, n = ky(e), r = n[0], i = n[1], o = new wC(EC(e, r, i)), s = 0, l = i > 0 ? r - 4 : r, u;
  for (u = 0; u < l; u += 4)
    t = _t[e.charCodeAt(u)] << 18 | _t[e.charCodeAt(u + 1)] << 12 | _t[e.charCodeAt(u + 2)] << 6 | _t[e.charCodeAt(u + 3)], o[s++] = t >> 16 & 255, o[s++] = t >> 8 & 255, o[s++] = t & 255;
  return i === 2 && (t = _t[e.charCodeAt(u)] << 2 | _t[e.charCodeAt(u + 1)] >> 4, o[s++] = t & 255), i === 1 && (t = _t[e.charCodeAt(u)] << 10 | _t[e.charCodeAt(u + 1)] << 4 | _t[e.charCodeAt(u + 2)] >> 2, o[s++] = t >> 8 & 255, o[s++] = t & 255), o;
}
function kC(e) {
  return Qt[e >> 18 & 63] + Qt[e >> 12 & 63] + Qt[e >> 6 & 63] + Qt[e & 63];
}
function NC(e, t, n) {
  for (var r, i = [], o = t; o < n; o += 3)
    r = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (e[o + 2] & 255), i.push(kC(r));
  return i.join("");
}
function bC(e) {
  for (var t, n = e.length, r = n % 3, i = [], o = 16383, s = 0, l = n - r; s < l; s += o)
    i.push(NC(e, s, s + o > l ? l : s + o));
  return r === 1 ? (t = e[n - 1], i.push(
    Qt[t >> 2] + Qt[t << 4 & 63] + "=="
  )) : r === 2 && (t = (e[n - 2] << 8) + e[n - 1], i.push(
    Qt[t >> 10] + Qt[t >> 4 & 63] + Qt[t << 2 & 63] + "="
  )), i.join("");
}
var tf = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
tf.read = function(e, t, n, r, i) {
  var o, s, l = i * 8 - r - 1, u = (1 << l) - 1, a = u >> 1, c = -7, f = n ? i - 1 : 0, d = n ? -1 : 1, h = e[t + f];
  for (f += d, o = h & (1 << -c) - 1, h >>= -c, c += l; c > 0; o = o * 256 + e[t + f], f += d, c -= 8)
    ;
  for (s = o & (1 << -c) - 1, o >>= -c, c += r; c > 0; s = s * 256 + e[t + f], f += d, c -= 8)
    ;
  if (o === 0)
    o = 1 - a;
  else {
    if (o === u)
      return s ? NaN : (h ? -1 : 1) * (1 / 0);
    s = s + Math.pow(2, r), o = o - a;
  }
  return (h ? -1 : 1) * s * Math.pow(2, o - r);
};
tf.write = function(e, t, n, r, i, o) {
  var s, l, u, a = o * 8 - i - 1, c = (1 << a) - 1, f = c >> 1, d = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, h = r ? 0 : o - 1, g = r ? 1 : -1, x = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
  for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (l = isNaN(t) ? 1 : 0, s = c) : (s = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), s + f >= 1 ? t += d / u : t += d * Math.pow(2, 1 - f), t * u >= 2 && (s++, u /= 2), s + f >= c ? (l = 0, s = c) : s + f >= 1 ? (l = (t * u - 1) * Math.pow(2, i), s = s + f) : (l = t * Math.pow(2, f - 1) * Math.pow(2, i), s = 0)); i >= 8; e[n + h] = l & 255, h += g, l /= 256, i -= 8)
    ;
  for (s = s << i | l, a += i; a > 0; e[n + h] = s & 255, h += g, s /= 256, a -= 8)
    ;
  e[n + h - g] |= x * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(e) {
  const t = Rl, n = tf, r = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  e.Buffer = l, e.SlowBuffer = w, e.INSPECT_MAX_BYTES = 50;
  const i = 2147483647;
  e.kMaxLength = i, l.TYPED_ARRAY_SUPPORT = o(), !l.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function o() {
    try {
      const S = new Uint8Array(1), m = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(m, Uint8Array.prototype), Object.setPrototypeOf(S, m), S.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(l.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (l.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(l.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (l.isBuffer(this))
        return this.byteOffset;
    }
  });
  function s(S) {
    if (S > i)
      throw new RangeError('The value "' + S + '" is invalid for option "size"');
    const m = new Uint8Array(S);
    return Object.setPrototypeOf(m, l.prototype), m;
  }
  function l(S, m, y) {
    if (typeof S == "number") {
      if (typeof m == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return f(S);
    }
    return u(S, m, y);
  }
  l.poolSize = 8192;
  function u(S, m, y) {
    if (typeof S == "string")
      return d(S, m);
    if (ArrayBuffer.isView(S))
      return g(S);
    if (S == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof S
      );
    if (Ve(S, ArrayBuffer) || S && Ve(S.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Ve(S, SharedArrayBuffer) || S && Ve(S.buffer, SharedArrayBuffer)))
      return x(S, m, y);
    if (typeof S == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const k = S.valueOf && S.valueOf();
    if (k != null && k !== S)
      return l.from(k, m, y);
    const $ = E(S);
    if ($) return $;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof S[Symbol.toPrimitive] == "function")
      return l.from(S[Symbol.toPrimitive]("string"), m, y);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof S
    );
  }
  l.from = function(S, m, y) {
    return u(S, m, y);
  }, Object.setPrototypeOf(l.prototype, Uint8Array.prototype), Object.setPrototypeOf(l, Uint8Array);
  function a(S) {
    if (typeof S != "number")
      throw new TypeError('"size" argument must be of type number');
    if (S < 0)
      throw new RangeError('The value "' + S + '" is invalid for option "size"');
  }
  function c(S, m, y) {
    return a(S), S <= 0 ? s(S) : m !== void 0 ? typeof y == "string" ? s(S).fill(m, y) : s(S).fill(m) : s(S);
  }
  l.alloc = function(S, m, y) {
    return c(S, m, y);
  };
  function f(S) {
    return a(S), s(S < 0 ? 0 : p(S) | 0);
  }
  l.allocUnsafe = function(S) {
    return f(S);
  }, l.allocUnsafeSlow = function(S) {
    return f(S);
  };
  function d(S, m) {
    if ((typeof m != "string" || m === "") && (m = "utf8"), !l.isEncoding(m))
      throw new TypeError("Unknown encoding: " + m);
    const y = v(S, m) | 0;
    let k = s(y);
    const $ = k.write(S, m);
    return $ !== y && (k = k.slice(0, $)), k;
  }
  function h(S) {
    const m = S.length < 0 ? 0 : p(S.length) | 0, y = s(m);
    for (let k = 0; k < m; k += 1)
      y[k] = S[k] & 255;
    return y;
  }
  function g(S) {
    if (Ve(S, Uint8Array)) {
      const m = new Uint8Array(S);
      return x(m.buffer, m.byteOffset, m.byteLength);
    }
    return h(S);
  }
  function x(S, m, y) {
    if (m < 0 || S.byteLength < m)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (S.byteLength < m + (y || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let k;
    return m === void 0 && y === void 0 ? k = new Uint8Array(S) : y === void 0 ? k = new Uint8Array(S, m) : k = new Uint8Array(S, m, y), Object.setPrototypeOf(k, l.prototype), k;
  }
  function E(S) {
    if (l.isBuffer(S)) {
      const m = p(S.length) | 0, y = s(m);
      return y.length === 0 || S.copy(y, 0, 0, m), y;
    }
    if (S.length !== void 0)
      return typeof S.length != "number" || Pt(S.length) ? s(0) : h(S);
    if (S.type === "Buffer" && Array.isArray(S.data))
      return h(S.data);
  }
  function p(S) {
    if (S >= i)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
    return S | 0;
  }
  function w(S) {
    return +S != S && (S = 0), l.alloc(+S);
  }
  l.isBuffer = function(m) {
    return m != null && m._isBuffer === !0 && m !== l.prototype;
  }, l.compare = function(m, y) {
    if (Ve(m, Uint8Array) && (m = l.from(m, m.offset, m.byteLength)), Ve(y, Uint8Array) && (y = l.from(y, y.offset, y.byteLength)), !l.isBuffer(m) || !l.isBuffer(y))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (m === y) return 0;
    let k = m.length, $ = y.length;
    for (let U = 0, G = Math.min(k, $); U < G; ++U)
      if (m[U] !== y[U]) {
        k = m[U], $ = y[U];
        break;
      }
    return k < $ ? -1 : $ < k ? 1 : 0;
  }, l.isEncoding = function(m) {
    switch (String(m).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, l.concat = function(m, y) {
    if (!Array.isArray(m))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (m.length === 0)
      return l.alloc(0);
    let k;
    if (y === void 0)
      for (y = 0, k = 0; k < m.length; ++k)
        y += m[k].length;
    const $ = l.allocUnsafe(y);
    let U = 0;
    for (k = 0; k < m.length; ++k) {
      let G = m[k];
      if (Ve(G, Uint8Array))
        U + G.length > $.length ? (l.isBuffer(G) || (G = l.from(G)), G.copy($, U)) : Uint8Array.prototype.set.call(
          $,
          G,
          U
        );
      else if (l.isBuffer(G))
        G.copy($, U);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      U += G.length;
    }
    return $;
  };
  function v(S, m) {
    if (l.isBuffer(S))
      return S.length;
    if (ArrayBuffer.isView(S) || Ve(S, ArrayBuffer))
      return S.byteLength;
    if (typeof S != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof S
      );
    const y = S.length, k = arguments.length > 2 && arguments[2] === !0;
    if (!k && y === 0) return 0;
    let $ = !1;
    for (; ; )
      switch (m) {
        case "ascii":
        case "latin1":
        case "binary":
          return y;
        case "utf8":
        case "utf-8":
          return we(S).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return y * 2;
        case "hex":
          return y >>> 1;
        case "base64":
          return at(S).length;
        default:
          if ($)
            return k ? -1 : we(S).length;
          m = ("" + m).toLowerCase(), $ = !0;
      }
  }
  l.byteLength = v;
  function _(S, m, y) {
    let k = !1;
    if ((m === void 0 || m < 0) && (m = 0), m > this.length || ((y === void 0 || y > this.length) && (y = this.length), y <= 0) || (y >>>= 0, m >>>= 0, y <= m))
      return "";
    for (S || (S = "utf8"); ; )
      switch (S) {
        case "hex":
          return T(this, m, y);
        case "utf8":
        case "utf-8":
          return N(this, m, y);
        case "ascii":
          return j(this, m, y);
        case "latin1":
        case "binary":
          return M(this, m, y);
        case "base64":
          return W(this, m, y);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return F(this, m, y);
        default:
          if (k) throw new TypeError("Unknown encoding: " + S);
          S = (S + "").toLowerCase(), k = !0;
      }
  }
  l.prototype._isBuffer = !0;
  function C(S, m, y) {
    const k = S[m];
    S[m] = S[y], S[y] = k;
  }
  l.prototype.swap16 = function() {
    const m = this.length;
    if (m % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let y = 0; y < m; y += 2)
      C(this, y, y + 1);
    return this;
  }, l.prototype.swap32 = function() {
    const m = this.length;
    if (m % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let y = 0; y < m; y += 4)
      C(this, y, y + 3), C(this, y + 1, y + 2);
    return this;
  }, l.prototype.swap64 = function() {
    const m = this.length;
    if (m % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let y = 0; y < m; y += 8)
      C(this, y, y + 7), C(this, y + 1, y + 6), C(this, y + 2, y + 5), C(this, y + 3, y + 4);
    return this;
  }, l.prototype.toString = function() {
    const m = this.length;
    return m === 0 ? "" : arguments.length === 0 ? N(this, 0, m) : _.apply(this, arguments);
  }, l.prototype.toLocaleString = l.prototype.toString, l.prototype.equals = function(m) {
    if (!l.isBuffer(m)) throw new TypeError("Argument must be a Buffer");
    return this === m ? !0 : l.compare(this, m) === 0;
  }, l.prototype.inspect = function() {
    let m = "";
    const y = e.INSPECT_MAX_BYTES;
    return m = this.toString("hex", 0, y).replace(/(.{2})/g, "$1 ").trim(), this.length > y && (m += " ... "), "<Buffer " + m + ">";
  }, r && (l.prototype[r] = l.prototype.inspect), l.prototype.compare = function(m, y, k, $, U) {
    if (Ve(m, Uint8Array) && (m = l.from(m, m.offset, m.byteLength)), !l.isBuffer(m))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof m
      );
    if (y === void 0 && (y = 0), k === void 0 && (k = m ? m.length : 0), $ === void 0 && ($ = 0), U === void 0 && (U = this.length), y < 0 || k > m.length || $ < 0 || U > this.length)
      throw new RangeError("out of range index");
    if ($ >= U && y >= k)
      return 0;
    if ($ >= U)
      return -1;
    if (y >= k)
      return 1;
    if (y >>>= 0, k >>>= 0, $ >>>= 0, U >>>= 0, this === m) return 0;
    let G = U - $, ae = k - y;
    const Ne = Math.min(G, ae), xe = this.slice($, U), be = m.slice(y, k);
    for (let ye = 0; ye < Ne; ++ye)
      if (xe[ye] !== be[ye]) {
        G = xe[ye], ae = be[ye];
        break;
      }
    return G < ae ? -1 : ae < G ? 1 : 0;
  };
  function I(S, m, y, k, $) {
    if (S.length === 0) return -1;
    if (typeof y == "string" ? (k = y, y = 0) : y > 2147483647 ? y = 2147483647 : y < -2147483648 && (y = -2147483648), y = +y, Pt(y) && (y = $ ? 0 : S.length - 1), y < 0 && (y = S.length + y), y >= S.length) {
      if ($) return -1;
      y = S.length - 1;
    } else if (y < 0)
      if ($) y = 0;
      else return -1;
    if (typeof m == "string" && (m = l.from(m, k)), l.isBuffer(m))
      return m.length === 0 ? -1 : P(S, m, y, k, $);
    if (typeof m == "number")
      return m = m & 255, typeof Uint8Array.prototype.indexOf == "function" ? $ ? Uint8Array.prototype.indexOf.call(S, m, y) : Uint8Array.prototype.lastIndexOf.call(S, m, y) : P(S, [m], y, k, $);
    throw new TypeError("val must be string, number or Buffer");
  }
  function P(S, m, y, k, $) {
    let U = 1, G = S.length, ae = m.length;
    if (k !== void 0 && (k = String(k).toLowerCase(), k === "ucs2" || k === "ucs-2" || k === "utf16le" || k === "utf-16le")) {
      if (S.length < 2 || m.length < 2)
        return -1;
      U = 2, G /= 2, ae /= 2, y /= 2;
    }
    function Ne(be, ye) {
      return U === 1 ? be[ye] : be.readUInt16BE(ye * U);
    }
    let xe;
    if ($) {
      let be = -1;
      for (xe = y; xe < G; xe++)
        if (Ne(S, xe) === Ne(m, be === -1 ? 0 : xe - be)) {
          if (be === -1 && (be = xe), xe - be + 1 === ae) return be * U;
        } else
          be !== -1 && (xe -= xe - be), be = -1;
    } else
      for (y + ae > G && (y = G - ae), xe = y; xe >= 0; xe--) {
        let be = !0;
        for (let ye = 0; ye < ae; ye++)
          if (Ne(S, xe + ye) !== Ne(m, ye)) {
            be = !1;
            break;
          }
        if (be) return xe;
      }
    return -1;
  }
  l.prototype.includes = function(m, y, k) {
    return this.indexOf(m, y, k) !== -1;
  }, l.prototype.indexOf = function(m, y, k) {
    return I(this, m, y, k, !0);
  }, l.prototype.lastIndexOf = function(m, y, k) {
    return I(this, m, y, k, !1);
  };
  function L(S, m, y, k) {
    y = Number(y) || 0;
    const $ = S.length - y;
    k ? (k = Number(k), k > $ && (k = $)) : k = $;
    const U = m.length;
    k > U / 2 && (k = U / 2);
    let G;
    for (G = 0; G < k; ++G) {
      const ae = parseInt(m.substr(G * 2, 2), 16);
      if (Pt(ae)) return G;
      S[y + G] = ae;
    }
    return G;
  }
  function B(S, m, y, k) {
    return tt(we(m, S.length - y), S, y, k);
  }
  function V(S, m, y, k) {
    return tt(et(m), S, y, k);
  }
  function z(S, m, y, k) {
    return tt(at(m), S, y, k);
  }
  function X(S, m, y, k) {
    return tt(xt(m, S.length - y), S, y, k);
  }
  l.prototype.write = function(m, y, k, $) {
    if (y === void 0)
      $ = "utf8", k = this.length, y = 0;
    else if (k === void 0 && typeof y == "string")
      $ = y, k = this.length, y = 0;
    else if (isFinite(y))
      y = y >>> 0, isFinite(k) ? (k = k >>> 0, $ === void 0 && ($ = "utf8")) : ($ = k, k = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const U = this.length - y;
    if ((k === void 0 || k > U) && (k = U), m.length > 0 && (k < 0 || y < 0) || y > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    $ || ($ = "utf8");
    let G = !1;
    for (; ; )
      switch ($) {
        case "hex":
          return L(this, m, y, k);
        case "utf8":
        case "utf-8":
          return B(this, m, y, k);
        case "ascii":
        case "latin1":
        case "binary":
          return V(this, m, y, k);
        case "base64":
          return z(this, m, y, k);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return X(this, m, y, k);
        default:
          if (G) throw new TypeError("Unknown encoding: " + $);
          $ = ("" + $).toLowerCase(), G = !0;
      }
  }, l.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function W(S, m, y) {
    return m === 0 && y === S.length ? t.fromByteArray(S) : t.fromByteArray(S.slice(m, y));
  }
  function N(S, m, y) {
    y = Math.min(S.length, y);
    const k = [];
    let $ = m;
    for (; $ < y; ) {
      const U = S[$];
      let G = null, ae = U > 239 ? 4 : U > 223 ? 3 : U > 191 ? 2 : 1;
      if ($ + ae <= y) {
        let Ne, xe, be, ye;
        switch (ae) {
          case 1:
            U < 128 && (G = U);
            break;
          case 2:
            Ne = S[$ + 1], (Ne & 192) === 128 && (ye = (U & 31) << 6 | Ne & 63, ye > 127 && (G = ye));
            break;
          case 3:
            Ne = S[$ + 1], xe = S[$ + 2], (Ne & 192) === 128 && (xe & 192) === 128 && (ye = (U & 15) << 12 | (Ne & 63) << 6 | xe & 63, ye > 2047 && (ye < 55296 || ye > 57343) && (G = ye));
            break;
          case 4:
            Ne = S[$ + 1], xe = S[$ + 2], be = S[$ + 3], (Ne & 192) === 128 && (xe & 192) === 128 && (be & 192) === 128 && (ye = (U & 15) << 18 | (Ne & 63) << 12 | (xe & 63) << 6 | be & 63, ye > 65535 && ye < 1114112 && (G = ye));
        }
      }
      G === null ? (G = 65533, ae = 1) : G > 65535 && (G -= 65536, k.push(G >>> 10 & 1023 | 55296), G = 56320 | G & 1023), k.push(G), $ += ae;
    }
    return R(k);
  }
  const O = 4096;
  function R(S) {
    const m = S.length;
    if (m <= O)
      return String.fromCharCode.apply(String, S);
    let y = "", k = 0;
    for (; k < m; )
      y += String.fromCharCode.apply(
        String,
        S.slice(k, k += O)
      );
    return y;
  }
  function j(S, m, y) {
    let k = "";
    y = Math.min(S.length, y);
    for (let $ = m; $ < y; ++$)
      k += String.fromCharCode(S[$] & 127);
    return k;
  }
  function M(S, m, y) {
    let k = "";
    y = Math.min(S.length, y);
    for (let $ = m; $ < y; ++$)
      k += String.fromCharCode(S[$]);
    return k;
  }
  function T(S, m, y) {
    const k = S.length;
    (!m || m < 0) && (m = 0), (!y || y < 0 || y > k) && (y = k);
    let $ = "";
    for (let U = m; U < y; ++U)
      $ += nn[S[U]];
    return $;
  }
  function F(S, m, y) {
    const k = S.slice(m, y);
    let $ = "";
    for (let U = 0; U < k.length - 1; U += 2)
      $ += String.fromCharCode(k[U] + k[U + 1] * 256);
    return $;
  }
  l.prototype.slice = function(m, y) {
    const k = this.length;
    m = ~~m, y = y === void 0 ? k : ~~y, m < 0 ? (m += k, m < 0 && (m = 0)) : m > k && (m = k), y < 0 ? (y += k, y < 0 && (y = 0)) : y > k && (y = k), y < m && (y = m);
    const $ = this.subarray(m, y);
    return Object.setPrototypeOf($, l.prototype), $;
  };
  function D(S, m, y) {
    if (S % 1 !== 0 || S < 0) throw new RangeError("offset is not uint");
    if (S + m > y) throw new RangeError("Trying to access beyond buffer length");
  }
  l.prototype.readUintLE = l.prototype.readUIntLE = function(m, y, k) {
    m = m >>> 0, y = y >>> 0, k || D(m, y, this.length);
    let $ = this[m], U = 1, G = 0;
    for (; ++G < y && (U *= 256); )
      $ += this[m + G] * U;
    return $;
  }, l.prototype.readUintBE = l.prototype.readUIntBE = function(m, y, k) {
    m = m >>> 0, y = y >>> 0, k || D(m, y, this.length);
    let $ = this[m + --y], U = 1;
    for (; y > 0 && (U *= 256); )
      $ += this[m + --y] * U;
    return $;
  }, l.prototype.readUint8 = l.prototype.readUInt8 = function(m, y) {
    return m = m >>> 0, y || D(m, 1, this.length), this[m];
  }, l.prototype.readUint16LE = l.prototype.readUInt16LE = function(m, y) {
    return m = m >>> 0, y || D(m, 2, this.length), this[m] | this[m + 1] << 8;
  }, l.prototype.readUint16BE = l.prototype.readUInt16BE = function(m, y) {
    return m = m >>> 0, y || D(m, 2, this.length), this[m] << 8 | this[m + 1];
  }, l.prototype.readUint32LE = l.prototype.readUInt32LE = function(m, y) {
    return m = m >>> 0, y || D(m, 4, this.length), (this[m] | this[m + 1] << 8 | this[m + 2] << 16) + this[m + 3] * 16777216;
  }, l.prototype.readUint32BE = l.prototype.readUInt32BE = function(m, y) {
    return m = m >>> 0, y || D(m, 4, this.length), this[m] * 16777216 + (this[m + 1] << 16 | this[m + 2] << 8 | this[m + 3]);
  }, l.prototype.readBigUInt64LE = je(function(m) {
    m = m >>> 0, te(m, "offset");
    const y = this[m], k = this[m + 7];
    (y === void 0 || k === void 0) && ue(m, this.length - 8);
    const $ = y + this[++m] * 2 ** 8 + this[++m] * 2 ** 16 + this[++m] * 2 ** 24, U = this[++m] + this[++m] * 2 ** 8 + this[++m] * 2 ** 16 + k * 2 ** 24;
    return BigInt($) + (BigInt(U) << BigInt(32));
  }), l.prototype.readBigUInt64BE = je(function(m) {
    m = m >>> 0, te(m, "offset");
    const y = this[m], k = this[m + 7];
    (y === void 0 || k === void 0) && ue(m, this.length - 8);
    const $ = y * 2 ** 24 + this[++m] * 2 ** 16 + this[++m] * 2 ** 8 + this[++m], U = this[++m] * 2 ** 24 + this[++m] * 2 ** 16 + this[++m] * 2 ** 8 + k;
    return (BigInt($) << BigInt(32)) + BigInt(U);
  }), l.prototype.readIntLE = function(m, y, k) {
    m = m >>> 0, y = y >>> 0, k || D(m, y, this.length);
    let $ = this[m], U = 1, G = 0;
    for (; ++G < y && (U *= 256); )
      $ += this[m + G] * U;
    return U *= 128, $ >= U && ($ -= Math.pow(2, 8 * y)), $;
  }, l.prototype.readIntBE = function(m, y, k) {
    m = m >>> 0, y = y >>> 0, k || D(m, y, this.length);
    let $ = y, U = 1, G = this[m + --$];
    for (; $ > 0 && (U *= 256); )
      G += this[m + --$] * U;
    return U *= 128, G >= U && (G -= Math.pow(2, 8 * y)), G;
  }, l.prototype.readInt8 = function(m, y) {
    return m = m >>> 0, y || D(m, 1, this.length), this[m] & 128 ? (255 - this[m] + 1) * -1 : this[m];
  }, l.prototype.readInt16LE = function(m, y) {
    m = m >>> 0, y || D(m, 2, this.length);
    const k = this[m] | this[m + 1] << 8;
    return k & 32768 ? k | 4294901760 : k;
  }, l.prototype.readInt16BE = function(m, y) {
    m = m >>> 0, y || D(m, 2, this.length);
    const k = this[m + 1] | this[m] << 8;
    return k & 32768 ? k | 4294901760 : k;
  }, l.prototype.readInt32LE = function(m, y) {
    return m = m >>> 0, y || D(m, 4, this.length), this[m] | this[m + 1] << 8 | this[m + 2] << 16 | this[m + 3] << 24;
  }, l.prototype.readInt32BE = function(m, y) {
    return m = m >>> 0, y || D(m, 4, this.length), this[m] << 24 | this[m + 1] << 16 | this[m + 2] << 8 | this[m + 3];
  }, l.prototype.readBigInt64LE = je(function(m) {
    m = m >>> 0, te(m, "offset");
    const y = this[m], k = this[m + 7];
    (y === void 0 || k === void 0) && ue(m, this.length - 8);
    const $ = this[m + 4] + this[m + 5] * 2 ** 8 + this[m + 6] * 2 ** 16 + (k << 24);
    return (BigInt($) << BigInt(32)) + BigInt(y + this[++m] * 2 ** 8 + this[++m] * 2 ** 16 + this[++m] * 2 ** 24);
  }), l.prototype.readBigInt64BE = je(function(m) {
    m = m >>> 0, te(m, "offset");
    const y = this[m], k = this[m + 7];
    (y === void 0 || k === void 0) && ue(m, this.length - 8);
    const $ = (y << 24) + // Overflow
    this[++m] * 2 ** 16 + this[++m] * 2 ** 8 + this[++m];
    return (BigInt($) << BigInt(32)) + BigInt(this[++m] * 2 ** 24 + this[++m] * 2 ** 16 + this[++m] * 2 ** 8 + k);
  }), l.prototype.readFloatLE = function(m, y) {
    return m = m >>> 0, y || D(m, 4, this.length), n.read(this, m, !0, 23, 4);
  }, l.prototype.readFloatBE = function(m, y) {
    return m = m >>> 0, y || D(m, 4, this.length), n.read(this, m, !1, 23, 4);
  }, l.prototype.readDoubleLE = function(m, y) {
    return m = m >>> 0, y || D(m, 8, this.length), n.read(this, m, !0, 52, 8);
  }, l.prototype.readDoubleBE = function(m, y) {
    return m = m >>> 0, y || D(m, 8, this.length), n.read(this, m, !1, 52, 8);
  };
  function H(S, m, y, k, $, U) {
    if (!l.isBuffer(S)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (m > $ || m < U) throw new RangeError('"value" argument is out of bounds');
    if (y + k > S.length) throw new RangeError("Index out of range");
  }
  l.prototype.writeUintLE = l.prototype.writeUIntLE = function(m, y, k, $) {
    if (m = +m, y = y >>> 0, k = k >>> 0, !$) {
      const ae = Math.pow(2, 8 * k) - 1;
      H(this, m, y, k, ae, 0);
    }
    let U = 1, G = 0;
    for (this[y] = m & 255; ++G < k && (U *= 256); )
      this[y + G] = m / U & 255;
    return y + k;
  }, l.prototype.writeUintBE = l.prototype.writeUIntBE = function(m, y, k, $) {
    if (m = +m, y = y >>> 0, k = k >>> 0, !$) {
      const ae = Math.pow(2, 8 * k) - 1;
      H(this, m, y, k, ae, 0);
    }
    let U = k - 1, G = 1;
    for (this[y + U] = m & 255; --U >= 0 && (G *= 256); )
      this[y + U] = m / G & 255;
    return y + k;
  }, l.prototype.writeUint8 = l.prototype.writeUInt8 = function(m, y, k) {
    return m = +m, y = y >>> 0, k || H(this, m, y, 1, 255, 0), this[y] = m & 255, y + 1;
  }, l.prototype.writeUint16LE = l.prototype.writeUInt16LE = function(m, y, k) {
    return m = +m, y = y >>> 0, k || H(this, m, y, 2, 65535, 0), this[y] = m & 255, this[y + 1] = m >>> 8, y + 2;
  }, l.prototype.writeUint16BE = l.prototype.writeUInt16BE = function(m, y, k) {
    return m = +m, y = y >>> 0, k || H(this, m, y, 2, 65535, 0), this[y] = m >>> 8, this[y + 1] = m & 255, y + 2;
  }, l.prototype.writeUint32LE = l.prototype.writeUInt32LE = function(m, y, k) {
    return m = +m, y = y >>> 0, k || H(this, m, y, 4, 4294967295, 0), this[y + 3] = m >>> 24, this[y + 2] = m >>> 16, this[y + 1] = m >>> 8, this[y] = m & 255, y + 4;
  }, l.prototype.writeUint32BE = l.prototype.writeUInt32BE = function(m, y, k) {
    return m = +m, y = y >>> 0, k || H(this, m, y, 4, 4294967295, 0), this[y] = m >>> 24, this[y + 1] = m >>> 16, this[y + 2] = m >>> 8, this[y + 3] = m & 255, y + 4;
  };
  function Z(S, m, y, k, $) {
    re(m, k, $, S, y, 7);
    let U = Number(m & BigInt(4294967295));
    S[y++] = U, U = U >> 8, S[y++] = U, U = U >> 8, S[y++] = U, U = U >> 8, S[y++] = U;
    let G = Number(m >> BigInt(32) & BigInt(4294967295));
    return S[y++] = G, G = G >> 8, S[y++] = G, G = G >> 8, S[y++] = G, G = G >> 8, S[y++] = G, y;
  }
  function q(S, m, y, k, $) {
    re(m, k, $, S, y, 7);
    let U = Number(m & BigInt(4294967295));
    S[y + 7] = U, U = U >> 8, S[y + 6] = U, U = U >> 8, S[y + 5] = U, U = U >> 8, S[y + 4] = U;
    let G = Number(m >> BigInt(32) & BigInt(4294967295));
    return S[y + 3] = G, G = G >> 8, S[y + 2] = G, G = G >> 8, S[y + 1] = G, G = G >> 8, S[y] = G, y + 8;
  }
  l.prototype.writeBigUInt64LE = je(function(m, y = 0) {
    return Z(this, m, y, BigInt(0), BigInt("0xffffffffffffffff"));
  }), l.prototype.writeBigUInt64BE = je(function(m, y = 0) {
    return q(this, m, y, BigInt(0), BigInt("0xffffffffffffffff"));
  }), l.prototype.writeIntLE = function(m, y, k, $) {
    if (m = +m, y = y >>> 0, !$) {
      const Ne = Math.pow(2, 8 * k - 1);
      H(this, m, y, k, Ne - 1, -Ne);
    }
    let U = 0, G = 1, ae = 0;
    for (this[y] = m & 255; ++U < k && (G *= 256); )
      m < 0 && ae === 0 && this[y + U - 1] !== 0 && (ae = 1), this[y + U] = (m / G >> 0) - ae & 255;
    return y + k;
  }, l.prototype.writeIntBE = function(m, y, k, $) {
    if (m = +m, y = y >>> 0, !$) {
      const Ne = Math.pow(2, 8 * k - 1);
      H(this, m, y, k, Ne - 1, -Ne);
    }
    let U = k - 1, G = 1, ae = 0;
    for (this[y + U] = m & 255; --U >= 0 && (G *= 256); )
      m < 0 && ae === 0 && this[y + U + 1] !== 0 && (ae = 1), this[y + U] = (m / G >> 0) - ae & 255;
    return y + k;
  }, l.prototype.writeInt8 = function(m, y, k) {
    return m = +m, y = y >>> 0, k || H(this, m, y, 1, 127, -128), m < 0 && (m = 255 + m + 1), this[y] = m & 255, y + 1;
  }, l.prototype.writeInt16LE = function(m, y, k) {
    return m = +m, y = y >>> 0, k || H(this, m, y, 2, 32767, -32768), this[y] = m & 255, this[y + 1] = m >>> 8, y + 2;
  }, l.prototype.writeInt16BE = function(m, y, k) {
    return m = +m, y = y >>> 0, k || H(this, m, y, 2, 32767, -32768), this[y] = m >>> 8, this[y + 1] = m & 255, y + 2;
  }, l.prototype.writeInt32LE = function(m, y, k) {
    return m = +m, y = y >>> 0, k || H(this, m, y, 4, 2147483647, -2147483648), this[y] = m & 255, this[y + 1] = m >>> 8, this[y + 2] = m >>> 16, this[y + 3] = m >>> 24, y + 4;
  }, l.prototype.writeInt32BE = function(m, y, k) {
    return m = +m, y = y >>> 0, k || H(this, m, y, 4, 2147483647, -2147483648), m < 0 && (m = 4294967295 + m + 1), this[y] = m >>> 24, this[y + 1] = m >>> 16, this[y + 2] = m >>> 8, this[y + 3] = m & 255, y + 4;
  }, l.prototype.writeBigInt64LE = je(function(m, y = 0) {
    return Z(this, m, y, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), l.prototype.writeBigInt64BE = je(function(m, y = 0) {
    return q(this, m, y, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function ie(S, m, y, k, $, U) {
    if (y + k > S.length) throw new RangeError("Index out of range");
    if (y < 0) throw new RangeError("Index out of range");
  }
  function oe(S, m, y, k, $) {
    return m = +m, y = y >>> 0, $ || ie(S, m, y, 4), n.write(S, m, y, k, 23, 4), y + 4;
  }
  l.prototype.writeFloatLE = function(m, y, k) {
    return oe(this, m, y, !0, k);
  }, l.prototype.writeFloatBE = function(m, y, k) {
    return oe(this, m, y, !1, k);
  };
  function ne(S, m, y, k, $) {
    return m = +m, y = y >>> 0, $ || ie(S, m, y, 8), n.write(S, m, y, k, 52, 8), y + 8;
  }
  l.prototype.writeDoubleLE = function(m, y, k) {
    return ne(this, m, y, !0, k);
  }, l.prototype.writeDoubleBE = function(m, y, k) {
    return ne(this, m, y, !1, k);
  }, l.prototype.copy = function(m, y, k, $) {
    if (!l.isBuffer(m)) throw new TypeError("argument should be a Buffer");
    if (k || (k = 0), !$ && $ !== 0 && ($ = this.length), y >= m.length && (y = m.length), y || (y = 0), $ > 0 && $ < k && ($ = k), $ === k || m.length === 0 || this.length === 0) return 0;
    if (y < 0)
      throw new RangeError("targetStart out of bounds");
    if (k < 0 || k >= this.length) throw new RangeError("Index out of range");
    if ($ < 0) throw new RangeError("sourceEnd out of bounds");
    $ > this.length && ($ = this.length), m.length - y < $ - k && ($ = m.length - y + k);
    const U = $ - k;
    return this === m && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(y, k, $) : Uint8Array.prototype.set.call(
      m,
      this.subarray(k, $),
      y
    ), U;
  }, l.prototype.fill = function(m, y, k, $) {
    if (typeof m == "string") {
      if (typeof y == "string" ? ($ = y, y = 0, k = this.length) : typeof k == "string" && ($ = k, k = this.length), $ !== void 0 && typeof $ != "string")
        throw new TypeError("encoding must be a string");
      if (typeof $ == "string" && !l.isEncoding($))
        throw new TypeError("Unknown encoding: " + $);
      if (m.length === 1) {
        const G = m.charCodeAt(0);
        ($ === "utf8" && G < 128 || $ === "latin1") && (m = G);
      }
    } else typeof m == "number" ? m = m & 255 : typeof m == "boolean" && (m = Number(m));
    if (y < 0 || this.length < y || this.length < k)
      throw new RangeError("Out of range index");
    if (k <= y)
      return this;
    y = y >>> 0, k = k === void 0 ? this.length : k >>> 0, m || (m = 0);
    let U;
    if (typeof m == "number")
      for (U = y; U < k; ++U)
        this[U] = m;
    else {
      const G = l.isBuffer(m) ? m : l.from(m, $), ae = G.length;
      if (ae === 0)
        throw new TypeError('The value "' + m + '" is invalid for argument "value"');
      for (U = 0; U < k - y; ++U)
        this[U + y] = G[U % ae];
    }
    return this;
  };
  const Y = {};
  function K(S, m, y) {
    Y[S] = class extends y {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: m.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${S}]`, this.stack, delete this.name;
      }
      get code() {
        return S;
      }
      set code($) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: $,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${S}]: ${this.message}`;
      }
    };
  }
  K(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(S) {
      return S ? `${S} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), K(
    "ERR_INVALID_ARG_TYPE",
    function(S, m) {
      return `The "${S}" argument must be of type number. Received type ${typeof m}`;
    },
    TypeError
  ), K(
    "ERR_OUT_OF_RANGE",
    function(S, m, y) {
      let k = `The value of "${S}" is out of range.`, $ = y;
      return Number.isInteger(y) && Math.abs(y) > 2 ** 32 ? $ = se(String(y)) : typeof y == "bigint" && ($ = String(y), (y > BigInt(2) ** BigInt(32) || y < -(BigInt(2) ** BigInt(32))) && ($ = se($)), $ += "n"), k += ` It must be ${m}. Received ${$}`, k;
    },
    RangeError
  );
  function se(S) {
    let m = "", y = S.length;
    const k = S[0] === "-" ? 1 : 0;
    for (; y >= k + 4; y -= 3)
      m = `_${S.slice(y - 3, y)}${m}`;
    return `${S.slice(0, y)}${m}`;
  }
  function le(S, m, y) {
    te(m, "offset"), (S[m] === void 0 || S[m + y] === void 0) && ue(m, S.length - (y + 1));
  }
  function re(S, m, y, k, $, U) {
    if (S > y || S < m) {
      const G = typeof m == "bigint" ? "n" : "";
      let ae;
      throw m === 0 || m === BigInt(0) ? ae = `>= 0${G} and < 2${G} ** ${(U + 1) * 8}${G}` : ae = `>= -(2${G} ** ${(U + 1) * 8 - 1}${G}) and < 2 ** ${(U + 1) * 8 - 1}${G}`, new Y.ERR_OUT_OF_RANGE("value", ae, S);
    }
    le(k, $, U);
  }
  function te(S, m) {
    if (typeof S != "number")
      throw new Y.ERR_INVALID_ARG_TYPE(m, "number", S);
  }
  function ue(S, m, y) {
    throw Math.floor(S) !== S ? (te(S, y), new Y.ERR_OUT_OF_RANGE("offset", "an integer", S)) : m < 0 ? new Y.ERR_BUFFER_OUT_OF_BOUNDS() : new Y.ERR_OUT_OF_RANGE(
      "offset",
      `>= 0 and <= ${m}`,
      S
    );
  }
  const fe = /[^+/0-9A-Za-z-_]/g;
  function he(S) {
    if (S = S.split("=")[0], S = S.trim().replace(fe, ""), S.length < 2) return "";
    for (; S.length % 4 !== 0; )
      S = S + "=";
    return S;
  }
  function we(S, m) {
    m = m || 1 / 0;
    let y;
    const k = S.length;
    let $ = null;
    const U = [];
    for (let G = 0; G < k; ++G) {
      if (y = S.charCodeAt(G), y > 55295 && y < 57344) {
        if (!$) {
          if (y > 56319) {
            (m -= 3) > -1 && U.push(239, 191, 189);
            continue;
          } else if (G + 1 === k) {
            (m -= 3) > -1 && U.push(239, 191, 189);
            continue;
          }
          $ = y;
          continue;
        }
        if (y < 56320) {
          (m -= 3) > -1 && U.push(239, 191, 189), $ = y;
          continue;
        }
        y = ($ - 55296 << 10 | y - 56320) + 65536;
      } else $ && (m -= 3) > -1 && U.push(239, 191, 189);
      if ($ = null, y < 128) {
        if ((m -= 1) < 0) break;
        U.push(y);
      } else if (y < 2048) {
        if ((m -= 2) < 0) break;
        U.push(
          y >> 6 | 192,
          y & 63 | 128
        );
      } else if (y < 65536) {
        if ((m -= 3) < 0) break;
        U.push(
          y >> 12 | 224,
          y >> 6 & 63 | 128,
          y & 63 | 128
        );
      } else if (y < 1114112) {
        if ((m -= 4) < 0) break;
        U.push(
          y >> 18 | 240,
          y >> 12 & 63 | 128,
          y >> 6 & 63 | 128,
          y & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return U;
  }
  function et(S) {
    const m = [];
    for (let y = 0; y < S.length; ++y)
      m.push(S.charCodeAt(y) & 255);
    return m;
  }
  function xt(S, m) {
    let y, k, $;
    const U = [];
    for (let G = 0; G < S.length && !((m -= 2) < 0); ++G)
      y = S.charCodeAt(G), k = y >> 8, $ = y % 256, U.push($), U.push(k);
    return U;
  }
  function at(S) {
    return t.toByteArray(he(S));
  }
  function tt(S, m, y, k) {
    let $;
    for ($ = 0; $ < k && !($ + y >= m.length || $ >= S.length); ++$)
      m[$ + y] = S[$];
    return $;
  }
  function Ve(S, m) {
    return S instanceof m || S != null && S.constructor != null && S.constructor.name != null && S.constructor.name === m.name;
  }
  function Pt(S) {
    return S !== S;
  }
  const nn = function() {
    const S = "0123456789abcdef", m = new Array(256);
    for (let y = 0; y < 16; ++y) {
      const k = y * 16;
      for (let $ = 0; $ < 16; ++$)
        m[k + $] = S[y] + S[$];
    }
    return m;
  }();
  function je(S) {
    return typeof BigInt > "u" ? Mt : S;
  }
  function Mt() {
    throw new Error("BigInt not supported");
  }
})(Sy);
const Hn = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", yi = "http://www.w3.org/2001/XMLSchema#", es = "http://www.w3.org/2000/10/swap/", nt = {
  xsd: {
    decimal: `${yi}decimal`,
    boolean: `${yi}boolean`,
    double: `${yi}double`,
    integer: `${yi}integer`,
    string: `${yi}string`
  },
  rdf: {
    type: `${Hn}type`,
    nil: `${Hn}nil`,
    first: `${Hn}first`,
    rest: `${Hn}rest`,
    langString: `${Hn}langString`,
    dirLangString: `${Hn}dirLangString`,
    reifies: `${Hn}reifies`
  },
  owl: {
    sameAs: "http://www.w3.org/2002/07/owl#sameAs"
  },
  r: {
    forSome: `${es}reify#forSome`,
    forAll: `${es}reify#forAll`
  },
  log: {
    implies: `${es}log#implies`,
    isImpliedBy: `${es}log#isImpliedBy`
  }
}, { xsd: ts } = nt, CC = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\([^])/g, $h = {
  "\\": "\\",
  "'": "'",
  '"': '"',
  n: `
`,
  r: "\r",
  t: "	",
  f: "\f",
  b: "\b",
  _: "_",
  "~": "~",
  ".": ".",
  "-": "-",
  "!": "!",
  $: "$",
  "&": "&",
  "(": "(",
  ")": ")",
  "*": "*",
  "+": "+",
  ",": ",",
  ";": ";",
  "=": "=",
  "/": "/",
  "?": "?",
  "#": "#",
  "@": "@",
  "%": "%"
}, IC = /[\x00-\x20<>\\"\{\}\|\^\`]/;
function jh(e) {
  return e >= 55296 && e <= 57343;
}
const PC = {
  _iri: !0,
  _unescapedIri: !0,
  _simpleQuotedString: !0,
  _langcode: !0,
  _dircode: !0,
  _blank: !0,
  _newline: !0,
  _comment: !0,
  _whitespace: !0,
  _endOfFile: !0
}, MC = /$0^/;
class TC {
  constructor(t) {
    if (this._iri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/, this._unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/, this._simpleQuotedString = /^"([^"\\\r\n]*)"(?=[^"])/, this._simpleApostropheString = /^'([^'\\\r\n]*)'(?=[^'])/, this._langcode = /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9])/i, this._dircode = /^--(ltr)|(rtl)/, this._prefix = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/, this._prefixed = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<>]))/, this._variable = /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<>])/, this._blank = /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<>]))/, this._number = /^[\-+]?(?:(\d+\.\d*|\.?\d+)[eE][\-+]?|\d*(\.)?)\d+(?=\.?[,;:\s#()\[\]\{\}"'<>])/, this._boolean = /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<>])/, this._atKeyword = /^@[a-z]+(?=[\s#<:])/i, this._keyword = /^(?:PREFIX|BASE|VERSION|GRAPH)(?=[\s#<])/i, this._shortPredicates = /^a(?=[\s#()\[\]\{\}"'<>])/, this._newline = /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/, this._comment = /#([^\n\r]*)/, this._whitespace = /^[ \t]+/, this._endOfFile = /^(?:#[^\n\r]*)?$/, t = t || {}, this._isImpliedBy = t.isImpliedBy, this._lineMode = !!t.lineMode) {
      this._n3Mode = !1;
      for (const n in this)
        !(n in PC) && this[n] instanceof RegExp && (this[n] = MC);
    } else
      this._n3Mode = t.n3 !== !1;
    this.comments = !!t.comments, this._literalClosingPos = 0;
  }
  // ## Private methods
  // ### `_tokenizeToEnd` tokenizes as for as possible, emitting tokens through the callback
  _tokenizeToEnd(t, n) {
    let r = this._input, i = r.length;
    for (; ; ) {
      let l, u;
      for (; l = this._newline.exec(r); )
        this.comments && (u = this._comment.exec(l[0])) && o("comment", u[1], "", this._line, l[0].length), r = r.substr(l[0].length, r.length), i = r.length, this._line++;
      if (!l && (l = this._whitespace.exec(r)) && (r = r.substr(l[0].length, r.length)), this._endOfFile.test(r))
        return n && (this.comments && (u = this._comment.exec(r)) && o("comment", u[1], "", this._line, r.length), r = null, o("eof", "", "", this._line, 0)), this._input = r;
      const a = this._line, c = r[0];
      let f = "", d = "", h = "", g = null, x = 0, E = !1;
      switch (c) {
        case "^":
          if (r.length < 3)
            break;
          if (r[1] === "^") {
            if (this._previousMarker = "^^", r = r.substr(2), r[0] !== "<") {
              E = !0;
              break;
            }
          } else {
            this._n3Mode && (x = 1, f = "^");
            break;
          }
        case "<":
          if (g = this._unescapedIri.exec(r))
            f = "IRI", d = g[1];
          else if (g = this._iri.exec(r)) {
            if (d = this._unescape(g[1]), d === null || IC.test(d))
              return s(this);
            f = "IRI";
          } else r.length > 2 && r[1] === "<" && r[2] === "(" ? (f = "<<(", x = 3) : !this._lineMode && r.length > (n ? 1 : 2) && r[1] === "<" ? (f = "<<", x = 2) : this._n3Mode && r.length > 1 && r[1] === "=" && (x = 2, this._isImpliedBy ? (f = "abbreviation", d = "<") : (f = "inverse", d = ">"));
          break;
        case ">":
          r.length > 1 && r[1] === ">" && (f = ">>", x = 2);
          break;
        case "_":
          ((g = this._blank.exec(r)) || n && (g = this._blank.exec(`${r} `))) && (f = "blank", h = "_", d = g[1]);
          break;
        case '"':
          if (g = this._simpleQuotedString.exec(r))
            d = g[1];
          else if ({ value: d, matchLength: x } = this._parseLiteral(r), d === null)
            return s(this);
          (g !== null || x !== 0) && (f = "literal", this._literalClosingPos = 0);
          break;
        case "'":
          if (!this._lineMode) {
            if (g = this._simpleApostropheString.exec(r))
              d = g[1];
            else if ({ value: d, matchLength: x } = this._parseLiteral(r), d === null)
              return s(this);
            (g !== null || x !== 0) && (f = "literal", this._literalClosingPos = 0);
          }
          break;
        case "?":
          this._n3Mode && (g = this._variable.exec(r)) && (f = "var", d = g[0]);
          break;
        case "@":
          this._previousMarker === "literal" && (g = this._langcode.exec(r)) && g[1] !== "version" ? (f = "langcode", d = g[1]) : (g = this._atKeyword.exec(r)) && (f = g[0]);
          break;
        case ".":
          if (r.length === 1 ? n : r[1] < "0" || r[1] > "9") {
            f = ".", x = 1;
            break;
          }
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "+":
        case "-":
          if (r[1] === "-") {
            this._previousMarker === "langcode" && (g = this._dircode.exec(r)) && (f = "dircode", x = 2, d = g[1] || g[2], x = d.length + 2);
            break;
          }
          (g = this._number.exec(r) || n && (g = this._number.exec(`${r} `))) && (f = "literal", d = g[0], h = typeof g[1] == "string" ? ts.double : typeof g[2] == "string" ? ts.decimal : ts.integer);
          break;
        case "B":
        case "b":
        case "p":
        case "P":
        case "G":
        case "g":
        case "V":
        case "v":
          (g = this._keyword.exec(r)) ? f = g[0].toUpperCase() : E = !0;
          break;
        case "f":
        case "t":
          (g = this._boolean.exec(r)) ? (f = "literal", d = g[0], h = ts.boolean) : E = !0;
          break;
        case "a":
          (g = this._shortPredicates.exec(r)) ? (f = "abbreviation", d = "a") : E = !0;
          break;
        case "=":
          this._n3Mode && r.length > 1 && (f = "abbreviation", r[1] !== ">" ? (x = 1, d = "=") : (x = 2, d = ">"));
          break;
        case "!":
          if (!this._n3Mode)
            break;
        case ")":
          if (!n && (r.length === 1 || r.length === 2 && r[1] === ">"))
            break;
          if (r.length > 2 && r[1] === ">" && r[2] === ">") {
            f = ")>>", x = 3;
            break;
          }
        case ",":
        case ";":
        case "[":
        case "]":
        case "(":
        case "}":
        case "~":
          this._lineMode || (x = 1, f = c);
          break;
        case "{":
          !this._lineMode && r.length >= 2 && (r[1] === "|" ? (f = "{|", x = 2) : (f = c, x = 1));
          break;
        case "|":
          r.length >= 2 && r[1] === "}" && (f = "|}", x = 2);
          break;
        default:
          E = !0;
      }
      if (E && ((this._previousMarker === "@prefix" || this._previousMarker === "PREFIX") && (g = this._prefix.exec(r)) ? (f = "prefix", d = g[1] || "") : ((g = this._prefixed.exec(r)) || n && (g = this._prefixed.exec(`${r} `))) && (f = "prefixed", h = g[1] || "", d = this._unescape(g[2]))), this._previousMarker === "^^")
        switch (f) {
          case "prefixed":
            f = "type";
            break;
          case "IRI":
            f = "typeIRI";
            break;
          default:
            f = "";
        }
      if (!f)
        return n || !/^'''|^"""/.test(r) && /\n|\r/.test(r) ? s(this) : this._input = r;
      const p = x || g[0].length, w = o(f, d, h, a, p);
      this.previousToken = w, this._previousMarker = f, r = r.substr(p, r.length);
    }
    function o(l, u, a, c, f) {
      const d = r ? i - r.length : i, h = d + f, g = { type: l, value: u, prefix: a, line: c, start: d, end: h };
      return t(null, g), g;
    }
    function s(l) {
      t(l._syntaxError(/^\S*/.exec(r)[0]));
    }
  }
  // ### `_unescape` replaces N3 escape codes by their corresponding characters
  _unescape(t) {
    let n = !1;
    const r = t.replace(CC, (i, o, s, l) => {
      if (typeof o == "string") {
        const u = Number.parseInt(o, 16);
        return jh(u) ? (n = !0, "") : String.fromCharCode(u);
      }
      if (typeof s == "string") {
        let u = Number.parseInt(s, 16);
        return jh(u) ? (n = !0, "") : u <= 65535 ? String.fromCharCode(Number.parseInt(s, 16)) : String.fromCharCode(55296 + ((u -= 65536) >> 10), 56320 + (u & 1023));
      }
      return l in $h ? $h[l] : (n = !0, "");
    });
    return n ? null : r;
  }
  // ### `_parseLiteral` parses a literal into an unescaped value
  _parseLiteral(t) {
    if (t.length >= 3) {
      const n = t.match(/^(?:"""|"|'''|'|)/)[0], r = n.length;
      let i = Math.max(this._literalClosingPos, r);
      for (; (i = t.indexOf(n, i)) > 0; ) {
        let o = 0;
        for (; t[i - o - 1] === "\\"; )
          o++;
        if (o % 2 === 0) {
          const s = t.substring(r, i), l = s.split(/\r\n|\r|\n/).length - 1, u = i + r;
          if (r === 1 && l !== 0 || r === 3 && this._lineMode)
            break;
          return this._line += l, { value: this._unescape(s), matchLength: u };
        }
        i++;
      }
      this._literalClosingPos = t.length - r + 1;
    }
    return { value: "", matchLength: 0 };
  }
  // ### `_syntaxError` creates a syntax error for the given issue
  _syntaxError(t) {
    this._input = null;
    const n = new Error(`Unexpected "${t}" on line ${this._line}.`);
    return n.context = {
      token: void 0,
      line: this._line,
      previousToken: this.previousToken
    }, n;
  }
  // ### Strips off any starting UTF BOM mark.
  _readStartingBom(t) {
    return t.startsWith("\uFEFF") ? t.substr(1) : t;
  }
  // ## Public methods
  // ### `tokenize` starts the transformation of an N3 document into an array of tokens.
  // The input can be a string or a stream.
  tokenize(t, n) {
    if (this._line = 1, typeof t == "string")
      if (this._input = this._readStartingBom(t), typeof n == "function")
        queueMicrotask(() => this._tokenizeToEnd(n, !0));
      else {
        const r = [];
        let i;
        if (this._tokenizeToEnd((o, s) => o ? i = o : r.push(s), !0), i) throw i;
        return r;
      }
    else
      this._pendingBuffer = null, typeof t.setEncoding == "function" && t.setEncoding("utf8"), t.on("data", (r) => {
        this._input !== null && r.length !== 0 && (this._pendingBuffer && (r = Sy.Buffer.concat([this._pendingBuffer, r]), this._pendingBuffer = null), r[r.length - 1] & 128 ? this._pendingBuffer = r : (typeof this._input > "u" ? this._input = this._readStartingBom(typeof r == "string" ? r : r.toString()) : this._input += r, this._tokenizeToEnd(n, !1)));
      }), t.on("end", () => {
        typeof this._input == "string" && this._tokenizeToEnd(n, !0);
      }), t.on("error", n);
  }
}
const { rdf: Rh, xsd: yr } = nt;
let ko, LC = 0;
const $C = {
  namedNode: Cy,
  blankNode: Iy,
  variable: My,
  literal: Py,
  defaultGraph: OC,
  quad: Ba,
  triple: Ba,
  fromTerm: Ni,
  fromQuad: Ty
};
class yn {
  constructor(t) {
    this.id = t;
  }
  // ### The value of this term
  get value() {
    return this.id;
  }
  // ### Returns whether this object represents the same term as the other
  equals(t) {
    return t instanceof yn ? this.id === t.id : !!t && this.termType === t.termType && this.value === t.value;
  }
  // ### Implement hashCode for Immutable.js, since we implement `equals`
  // https://immutable-js.com/docs/v4.0.0/ValueObject/#hashCode()
  hashCode() {
    return 0;
  }
  // ### Returns a plain object representation of this term
  toJSON() {
    return {
      termType: this.termType,
      value: this.value
    };
  }
}
class Ny extends yn {
  // ### The term type of this term
  get termType() {
    return "NamedNode";
  }
}
class Lr extends yn {
  // ### The term type of this term
  get termType() {
    return "Literal";
  }
  // ### The text value of this literal
  get value() {
    return this.id.substring(1, this.id.lastIndexOf('"'));
  }
  // ### The language of this literal
  get language() {
    const t = this.id;
    let n = t.lastIndexOf('"') + 1;
    const r = t.lastIndexOf("--");
    return n < t.length && t[n++] === "@" ? (r > n ? t.substr(0, r) : t).substr(n).toLowerCase() : "";
  }
  // ### The direction of this literal
  get direction() {
    const t = this.id, n = t.lastIndexOf('"'), r = t.lastIndexOf("--");
    return r > n && r + 2 < t.length ? t.substr(r + 2).toLowerCase() : "";
  }
  // ### The datatype IRI of this literal
  get datatype() {
    return new Ny(this.datatypeString);
  }
  // ### The datatype string of this literal
  get datatypeString() {
    const t = this.id, n = t.lastIndexOf('"') + 1, r = n < t.length ? t[n] : "";
    return r === "^" ? t.substr(n + 2) : (
      // If "@" follows, return rdf:langString or rdf:dirLangString; xsd:string otherwise
      r !== "@" ? yr.string : t.indexOf("--", n) > 0 ? Rh.dirLangString : Rh.langString
    );
  }
  // ### Returns whether this object represents the same term as the other
  equals(t) {
    return t instanceof Lr ? this.id === t.id : !!t && !!t.datatype && this.termType === t.termType && this.value === t.value && this.language === t.language && (this.direction === t.direction || this.direction === "" && !t.direction) && this.datatype.value === t.datatype.value;
  }
  toJSON() {
    return {
      termType: this.termType,
      value: this.value,
      language: this.language,
      direction: this.direction,
      datatype: { termType: "NamedNode", value: this.datatypeString }
    };
  }
}
class jC extends yn {
  constructor(t) {
    super(`_:${t}`);
  }
  // ### The term type of this term
  get termType() {
    return "BlankNode";
  }
  // ### The name of this blank node
  get value() {
    return this.id.substr(2);
  }
}
class RC extends yn {
  constructor(t) {
    super(`?${t}`);
  }
  // ### The term type of this term
  get termType() {
    return "Variable";
  }
  // ### The name of this variable
  get value() {
    return this.id.substr(1);
  }
}
class AC extends yn {
  constructor() {
    return super(""), ko || this;
  }
  // ### The term type of this term
  get termType() {
    return "DefaultGraph";
  }
  // ### Returns whether this object represents the same term as the other
  equals(t) {
    return this === t || !!t && this.termType === t.termType;
  }
}
ko = new AC();
class by extends yn {
  constructor(t, n, r, i) {
    super(""), this._subject = t, this._predicate = n, this._object = r, this._graph = i || ko;
  }
  // ### The term type of this term
  get termType() {
    return "Quad";
  }
  get subject() {
    return this._subject;
  }
  get predicate() {
    return this._predicate;
  }
  get object() {
    return this._object;
  }
  get graph() {
    return this._graph;
  }
  // ### Returns a plain object representation of this quad
  toJSON() {
    return {
      termType: this.termType,
      subject: this._subject.toJSON(),
      predicate: this._predicate.toJSON(),
      object: this._object.toJSON(),
      graph: this._graph.toJSON()
    };
  }
  // ### Returns whether this object represents the same quad as the other
  equals(t) {
    return !!t && this._subject.equals(t.subject) && this._predicate.equals(t.predicate) && this._object.equals(t.object) && this._graph.equals(t.graph);
  }
}
function Cy(e) {
  return new Ny(e);
}
function Iy(e) {
  return new jC(e || `n3-${LC++}`);
}
function Py(e, t) {
  if (typeof t == "string")
    return new Lr(`"${e}"@${t.toLowerCase()}`);
  if (t !== void 0 && !("termType" in t))
    return new Lr(`"${e}"@${t.language.toLowerCase()}${t.direction ? `--${t.direction.toLowerCase()}` : ""}`);
  let n = t ? t.value : "";
  return n === "" && (typeof e == "boolean" ? n = yr.boolean : typeof e == "number" && (Number.isFinite(e) ? n = Number.isInteger(e) ? yr.integer : yr.double : (n = yr.double, Number.isNaN(e) || (e = e > 0 ? "INF" : "-INF")))), n === "" || n === yr.string ? new Lr(`"${e}"`) : new Lr(`"${e}"^^${n}`);
}
function My(e) {
  return new RC(e);
}
function OC() {
  return ko;
}
function Ba(e, t, n, r) {
  return new by(e, t, n, r);
}
function Ni(e) {
  if (e instanceof yn)
    return e;
  switch (e.termType) {
    case "NamedNode":
      return Cy(e.value);
    case "BlankNode":
      return Iy(e.value);
    case "Variable":
      return My(e.value);
    case "DefaultGraph":
      return ko;
    case "Literal":
      return Py(e.value, e.language || e.datatype);
    case "Quad":
      return Ty(e);
    default:
      throw new Error(`Unexpected termType: ${e.termType}`);
  }
}
function Ty(e) {
  if (e instanceof by)
    return e;
  if (e.termType !== "Quad")
    throw new Error(`Unexpected termType: ${e.termType}`);
  return Ba(Ni(e.subject), Ni(e.predicate), Ni(e.object), Ni(e.graph));
}
let Ah = 0;
class No {
  constructor(t) {
    this._contextStack = [], this._graph = null, t = t || {}, this._setBase(t.baseIRI), t.factory && Ly(this, t.factory);
    const n = typeof t.format == "string" ? t.format.match(/\w*$/)[0].toLowerCase() : "", r = /turtle/.test(n), i = /trig/.test(n), o = /triple/.test(n), s = /quad/.test(n), l = this._n3Mode = /n3/.test(n), u = o || s;
    (this._supportsNamedGraphs = !(r || l)) || (this._readPredicateOrNamedGraph = this._readPredicate), this._supportsQuads = !(r || i || o || l), this._isImpliedBy = t.isImpliedBy, u && (this._resolveRelativeIRI = (a) => null), this._blankNodePrefix = typeof t.blankNodePrefix != "string" ? "" : t.blankNodePrefix.replace(/^(?!_:)/, "_:"), this._lexer = t.lexer || new TC({ lineMode: u, n3: l, isImpliedBy: this._isImpliedBy }), this._explicitQuantifiers = !!t.explicitQuantifiers, this._parseUnsupportedVersions = !!t.parseUnsupportedVersions, this._version = t.version;
  }
  // ## Static class methods
  // ### `_resetBlankNodePrefix` restarts blank node prefix identification
  static _resetBlankNodePrefix() {
    Ah = 0;
  }
  // ## Private methods
  // ### `_setBase` sets the base IRI to resolve relative IRIs
  _setBase(t) {
    if (!t)
      this._base = "", this._basePath = "";
    else {
      const n = t.indexOf("#");
      n >= 0 && (t = t.substr(0, n)), this._base = t, this._basePath = t.indexOf("/") < 0 ? t : t.replace(/[^\/?]*(?:\?.*)?$/, ""), t = t.match(/^(?:([a-z][a-z0-9+.-]*:))?(?:\/\/[^\/]*)?/i), this._baseRoot = t[0], this._baseScheme = t[1];
    }
  }
  // ### `_saveContext` stores the current parsing context
  // when entering a new scope (list, blank node, formula)
  _saveContext(t, n, r, i, o) {
    const s = this._n3Mode;
    this._contextStack.push({
      type: t,
      subject: r,
      predicate: i,
      object: o,
      graph: n,
      inverse: s ? this._inversePredicate : !1,
      blankPrefix: s ? this._prefixes._ : "",
      quantified: s ? this._quantified : null
    }), s && (this._inversePredicate = !1, this._prefixes._ = this._graph ? `${this._graph.value}.` : ".", this._quantified = Object.create(this._quantified));
  }
  // ### `_restoreContext` restores the parent context
  // when leaving a scope (list, blank node, formula)
  _restoreContext(t, n) {
    const r = this._contextStack.pop();
    if (!r || r.type !== t)
      return this._error(`Unexpected ${n.type}`, n);
    this._subject = r.subject, this._predicate = r.predicate, this._object = r.object, this._graph = r.graph, this._n3Mode && (this._inversePredicate = r.inverse, this._prefixes._ = r.blankPrefix, this._quantified = r.quantified);
  }
  // ### `_readBeforeTopContext` is called once only at the start of parsing.
  _readBeforeTopContext(t) {
    return this._version && !this._isValidVersion(this._version) ? this._error(`Detected unsupported version as media type parameter: "${this._version}"`, t) : this._readInTopContext(t);
  }
  // ### `_readInTopContext` reads a token when in the top context
  _readInTopContext(t) {
    switch (t.type) {
      case "eof":
        return this._graph !== null ? this._error("Unclosed graph", t) : (delete this._prefixes._, this._callback(null, null, this._prefixes));
      case "PREFIX":
        this._sparqlStyle = !0;
      case "@prefix":
        return this._readPrefix;
      case "BASE":
        this._sparqlStyle = !0;
      case "@base":
        return this._readBaseIRI;
      case "VERSION":
        this._sparqlStyle = !0;
      case "@version":
        return this._readVersion;
      case "{":
        if (this._supportsNamedGraphs)
          return this._graph = "", this._subject = null, this._readSubject;
      case "GRAPH":
        if (this._supportsNamedGraphs)
          return this._readNamedGraphLabel;
      default:
        return this._readSubject(t);
    }
  }
  // ### `_readEntity` reads an IRI, prefixed name, blank node, or variable
  _readEntity(t, n) {
    let r;
    switch (t.type) {
      case "IRI":
      case "typeIRI":
        const i = this._resolveIRI(t.value);
        if (i === null)
          return this._error("Invalid IRI", t);
        r = this._factory.namedNode(i);
        break;
      case "type":
      case "prefixed":
        const o = this._prefixes[t.prefix];
        if (o === void 0)
          return this._error(`Undefined prefix "${t.prefix}:"`, t);
        r = this._factory.namedNode(o + t.value);
        break;
      case "blank":
        r = this._factory.blankNode(this._prefixes[t.prefix] + t.value);
        break;
      case "var":
        r = this._factory.variable(t.value.substr(1));
        break;
      default:
        return this._error(`Expected entity but got ${t.type}`, t);
    }
    return !n && this._n3Mode && r.id in this._quantified && (r = this._quantified[r.id]), r;
  }
  // ### `_readSubject` reads a quad's subject
  _readSubject(t) {
    switch (this._predicate = null, t.type) {
      case "[":
        return this._saveContext(
          "blank",
          this._graph,
          this._subject = this._factory.blankNode(),
          null,
          null
        ), this._readBlankNodeHead;
      case "(":
        const n = this._contextStack;
        return (n.length && n[n.length - 1]).type === "<<" ? this._error("Unexpected list in reified triple", t) : (this._saveContext("list", this._graph, this.RDF_NIL, null, null), this._subject = null, this._readListItem);
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._graph = this._factory.blankNode(),
          null,
          null
        ), this._readSubject) : this._error("Unexpected graph", t);
      case "}":
        return this._readPunctuation(t);
      case "@forSome":
        return this._n3Mode ? (this._subject = null, this._predicate = this.N3_FORSOME, this._quantifier = "blankNode", this._readQuantifierList) : this._error('Unexpected "@forSome"', t);
      case "@forAll":
        return this._n3Mode ? (this._subject = null, this._predicate = this.N3_FORALL, this._quantifier = "variable", this._readQuantifierList) : this._error('Unexpected "@forAll"', t);
      case "literal":
        if (!this._n3Mode)
          return this._error("Unexpected literal", t);
        if (t.prefix.length === 0)
          return this._literalValue = t.value, this._completeSubjectLiteral;
        this._subject = this._factory.literal(t.value, this._factory.namedNode(t.prefix));
        break;
      case "<<(":
        return this._n3Mode ? (this._saveContext("<<(", this._graph, null, null, null), this._graph = null, this._readSubject) : this._error("Disallowed triple term as subject", t);
      case "<<":
        return this._saveContext("<<", this._graph, null, null, null), this._graph = null, this._readSubject;
      default:
        if ((this._subject = this._readEntity(t)) === void 0)
          return;
        if (this._n3Mode)
          return this._getPathReader(this._readPredicateOrNamedGraph);
    }
    return this._readPredicateOrNamedGraph;
  }
  // ### `_readPredicate` reads a quad's predicate
  _readPredicate(t) {
    const n = t.type;
    switch (n) {
      case "inverse":
        this._inversePredicate = !0;
      case "abbreviation":
        this._predicate = this.ABBREVIATIONS[t.value];
        break;
      case ".":
      case "]":
      case "}":
      case "|}":
        return this._predicate === null ? this._error(`Unexpected ${n}`, t) : (this._subject = null, n === "]" ? this._readBlankNodeTail(t) : this._readPunctuation(t));
      case ";":
        return this._predicate !== null ? this._readPredicate : this._error("Expected predicate but got ;", t);
      case "[":
        if (this._n3Mode)
          return this._saveContext(
            "blank",
            this._graph,
            this._subject,
            this._subject = this._factory.blankNode(),
            null
          ), this._readBlankNodeHead;
      case "blank":
        if (!this._n3Mode)
          return this._error("Disallowed blank node as predicate", t);
      default:
        if ((this._predicate = this._readEntity(t)) === void 0)
          return;
    }
    return this._validAnnotation = !0, this._readObject;
  }
  // ### `_readObject` reads a quad's object
  _readObject(t) {
    switch (t.type) {
      case "literal":
        if (t.prefix.length === 0)
          return this._literalValue = t.value, this._readDataTypeOrLang;
        this._object = this._factory.literal(t.value, this._factory.namedNode(t.prefix));
        break;
      case "[":
        return this._saveContext(
          "blank",
          this._graph,
          this._subject,
          this._predicate,
          this._subject = this._factory.blankNode()
        ), this._readBlankNodeHead;
      case "(":
        const n = this._contextStack;
        return (n.length && n[n.length - 1]).type === "<<" ? this._error("Unexpected list in reified triple", t) : (this._saveContext("list", this._graph, this._subject, this._predicate, this.RDF_NIL), this._subject = null, this._readListItem);
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._subject,
          this._predicate,
          this._graph = this._factory.blankNode()
        ), this._readSubject) : this._error("Unexpected graph", t);
      case "<<(":
        return this._saveContext("<<(", this._graph, this._subject, this._predicate, null), this._graph = null, this._readSubject;
      case "<<":
        return this._saveContext("<<", this._graph, this._subject, this._predicate, null), this._graph = null, this._readSubject;
      default:
        if ((this._object = this._readEntity(t)) === void 0)
          return;
        if (this._n3Mode)
          return this._getPathReader(this._getContextEndReader());
    }
    return this._getContextEndReader();
  }
  // ### `_readPredicateOrNamedGraph` reads a quad's predicate, or a named graph
  _readPredicateOrNamedGraph(t) {
    return t.type === "{" ? this._readGraph(t) : this._readPredicate(t);
  }
  // ### `_readGraph` reads a graph
  _readGraph(t) {
    return t.type !== "{" ? this._error(`Expected graph but got ${t.type}`, t) : (this._graph = this._subject, this._subject = null, this._readSubject);
  }
  // ### `_readBlankNodeHead` reads the head of a blank node
  _readBlankNodeHead(t) {
    if (t.type === "]")
      return this._subject = null, this._readBlankNodeTail(t);
    {
      const n = this._contextStack;
      return (n.length > 1 && n[n.length - 2]).type === "<<" ? this._error("Unexpected compound blank node expression in reified triple", t) : (this._predicate = null, this._readPredicate(t));
    }
  }
  // ### `_readBlankNodeTail` reads the end of a blank node
  _readBlankNodeTail(t) {
    if (t.type !== "]")
      return this._readBlankNodePunctuation(t);
    this._subject !== null && this._emit(this._subject, this._predicate, this._object, this._graph);
    const n = this._predicate === null;
    return this._restoreContext("blank", t), this._object !== null ? this._getContextEndReader() : this._predicate !== null ? this._readObject : n ? this._readPredicateOrNamedGraph : this._readPredicateAfterBlank;
  }
  // ### `_readPredicateAfterBlank` reads a predicate after an anonymous blank node
  _readPredicateAfterBlank(t) {
    switch (t.type) {
      case ".":
      case "}":
        return this._subject = null, this._readPunctuation(t);
      default:
        return this._readPredicate(t);
    }
  }
  // ### `_readListItem` reads items from a list
  _readListItem(t) {
    let n = null, r = null, i = this._readListItem;
    const o = this._subject, s = this._contextStack, l = s[s.length - 1];
    switch (t.type) {
      case "[":
        this._saveContext(
          "blank",
          this._graph,
          r = this._factory.blankNode(),
          this.RDF_FIRST,
          this._subject = n = this._factory.blankNode()
        ), i = this._readBlankNodeHead;
        break;
      case "(":
        this._saveContext(
          "list",
          this._graph,
          r = this._factory.blankNode(),
          this.RDF_FIRST,
          this.RDF_NIL
        ), this._subject = null;
        break;
      case ")":
        if (this._restoreContext("list", t), s.length !== 0 && s[s.length - 1].type === "list" && this._emit(this._subject, this._predicate, this._object, this._graph), this._predicate === null) {
          if (i = this._readPredicate, this._subject === this.RDF_NIL)
            return i;
        } else if (i = this._getContextEndReader(), this._object === this.RDF_NIL)
          return i;
        r = this.RDF_NIL;
        break;
      case "literal":
        t.prefix.length === 0 ? (this._literalValue = t.value, i = this._readListItemDataTypeOrLang) : (n = this._factory.literal(t.value, this._factory.namedNode(t.prefix)), i = this._getContextEndReader());
        break;
      case "{":
        return this._n3Mode ? (this._saveContext(
          "formula",
          this._graph,
          this._subject,
          this._predicate,
          this._graph = this._factory.blankNode()
        ), this._readSubject) : this._error("Unexpected graph", t);
      case "<<":
        this._saveContext("<<", this._graph, null, null, null), this._graph = null, i = this._readSubject;
        break;
      default:
        if ((n = this._readEntity(t)) === void 0)
          return;
    }
    if (r === null && (this._subject = r = this._factory.blankNode()), t.type === "<<" && (s[s.length - 1].subject = this._subject), o === null ? l.predicate === null ? l.subject = r : l.object = r : this._emit(o, this.RDF_REST, r, this._graph), n !== null) {
      if (this._n3Mode && (t.type === "IRI" || t.type === "prefixed"))
        return this._saveContext("item", this._graph, r, this.RDF_FIRST, n), this._subject = n, this._predicate = null, this._getPathReader(this._readListItem);
      this._emit(r, this.RDF_FIRST, n, this._graph);
    }
    return i;
  }
  // ### `_readDataTypeOrLang` reads an _optional_ datatype or language
  _readDataTypeOrLang(t) {
    return this._completeObjectLiteral(t, !1);
  }
  // ### `_readListItemDataTypeOrLang` reads an _optional_ datatype or language in a list
  _readListItemDataTypeOrLang(t) {
    return this._completeObjectLiteral(t, !0);
  }
  // ### `_completeLiteral` completes a literal with an optional datatype or language
  _completeLiteral(t, n) {
    let r = this._factory.literal(this._literalValue), i;
    switch (t.type) {
      case "type":
      case "typeIRI":
        const o = this._readEntity(t);
        if (o === void 0) return;
        if (o.value === nt.rdf.langString || o.value === nt.rdf.dirLangString)
          return this._error("Detected illegal (directional) languaged-tagged string with explicit datatype", t);
        r = this._factory.literal(this._literalValue, o), t = null;
        break;
      case "langcode":
        if (t.value.split("-").some((s) => s.length > 8))
          return this._error("Detected language tag with subtag longer than 8 characters", t);
        r = this._factory.literal(this._literalValue, t.value), this._literalLanguage = t.value, t = null, i = this._readDirCode.bind(this, n);
        break;
    }
    return { token: t, literal: r, readCb: i };
  }
  _readDirCode(t, n, r) {
    if (r.type === "dircode") {
      const i = this._factory.literal(this._literalValue, { language: this._literalLanguage, direction: r.value });
      t === "subject" ? this._subject = i : this._object = i, this._literalLanguage = void 0, r = null;
    }
    return t === "subject" ? r === null ? this._readPredicateOrNamedGraph : this._readPredicateOrNamedGraph(r) : this._completeObjectLiteralPost(r, n);
  }
  // Completes a literal in subject position
  _completeSubjectLiteral(t) {
    const n = this._completeLiteral(t, "subject");
    return this._subject = n.literal, n.readCb ? n.readCb.bind(this, !1) : this._readPredicateOrNamedGraph;
  }
  // Completes a literal in object position
  _completeObjectLiteral(t, n) {
    const r = this._completeLiteral(t, "object");
    if (r)
      return this._object = r.literal, r.readCb ? r.readCb.bind(this, n) : this._completeObjectLiteralPost(r.token, n);
  }
  _completeObjectLiteralPost(t, n) {
    return n && this._emit(this._subject, this.RDF_FIRST, this._object, this._graph), t === null ? this._getContextEndReader() : (this._readCallback = this._getContextEndReader(), this._readCallback(t));
  }
  // ### `_readFormulaTail` reads the end of a formula
  _readFormulaTail(t) {
    return t.type !== "}" ? this._readPunctuation(t) : (this._subject !== null && this._emit(this._subject, this._predicate, this._object, this._graph), this._restoreContext("formula", t), this._object === null ? this._readPredicate : this._getContextEndReader());
  }
  // ### `_readPunctuation` reads punctuation between quads or quad parts
  _readPunctuation(t) {
    let n, r = this._graph, i = !1;
    const o = this._subject, s = this._inversePredicate;
    switch (t.type) {
      case "}":
        if (this._graph === null)
          return this._error("Unexpected graph closing", t);
        if (this._n3Mode)
          return this._readFormulaTail(t);
        this._graph = null;
      case ".":
        this._subject = null, this._tripleTerm = null, n = this._contextStack.length ? this._readSubject : this._readInTopContext, s && (this._inversePredicate = !1);
        break;
      case ";":
        n = this._readPredicate;
        break;
      case ",":
        n = this._readObject;
        break;
      case "~":
        n = this._readReifierInAnnotation, i = !0;
        break;
      case "{|":
        this._subject = this._readTripleTerm(), this._validAnnotation = !1, i = !0, n = this._readPredicate;
        break;
      case "|}":
        if (!this._annotation)
          return this._error("Unexpected annotation syntax closing", t);
        if (!this._validAnnotation)
          return this._error("Annotation block can not be empty", t);
        this._subject = null, this._annotation = !1, n = this._readPunctuation;
        break;
      default:
        if (this._supportsQuads && this._graph === null && (r = this._readEntity(t)) !== void 0) {
          n = this._readQuadPunctuation;
          break;
        }
        return this._error(`Expected punctuation to follow "${this._object.id}"`, t);
    }
    if (o !== null && (!i || i && !this._annotation)) {
      const l = this._predicate, u = this._object;
      s ? this._emit(u, l, o, r) : this._emit(o, l, u, r);
    }
    return i && (this._annotation = !0), n;
  }
  // ### `_readBlankNodePunctuation` reads punctuation in a blank node
  _readBlankNodePunctuation(t) {
    let n;
    switch (t.type) {
      case ";":
        n = this._readPredicate;
        break;
      case ",":
        n = this._readObject;
        break;
      default:
        return this._error(`Expected punctuation to follow "${this._object.id}"`, t);
    }
    return this._emit(this._subject, this._predicate, this._object, this._graph), n;
  }
  // ### `_readQuadPunctuation` reads punctuation after a quad
  _readQuadPunctuation(t) {
    return t.type !== "." ? this._error("Expected dot to follow quad", t) : this._readInTopContext;
  }
  // ### `_readPrefix` reads the prefix of a prefix declaration
  _readPrefix(t) {
    return t.type !== "prefix" ? this._error("Expected prefix to follow @prefix", t) : (this._prefix = t.value, this._readPrefixIRI);
  }
  // ### `_readPrefixIRI` reads the IRI of a prefix declaration
  _readPrefixIRI(t) {
    if (t.type !== "IRI")
      return this._error(`Expected IRI to follow prefix "${this._prefix}:"`, t);
    const n = this._readEntity(t);
    return this._prefixes[this._prefix] = n.value, this._prefixCallback(this._prefix, n), this._readDeclarationPunctuation;
  }
  // ### `_readBaseIRI` reads the IRI of a base declaration
  _readBaseIRI(t) {
    const n = t.type === "IRI" && this._resolveIRI(t.value);
    return n ? (this._setBase(n), this._readDeclarationPunctuation) : this._error("Expected valid IRI to follow base declaration", t);
  }
  // ### `_isValidVersion` checks if the given version is valid for this parser to handle.
  _isValidVersion(t) {
    return this._parseUnsupportedVersions || No.SUPPORTED_VERSIONS.includes(t);
  }
  // ### `_readVersion` reads version string declaration
  _readVersion(t) {
    return t.type !== "literal" ? this._error("Expected literal to follow version declaration", t) : t.end - t.start !== t.value.length + 2 ? this._error("Version declarations must use single quotes", t) : (this._versionCallback(t.value), this._isValidVersion(t.value) ? this._readDeclarationPunctuation : this._error(`Detected unsupported version: "${t.value}"`, t));
  }
  // ### `_readNamedGraphLabel` reads the label of a named graph
  _readNamedGraphLabel(t) {
    switch (t.type) {
      case "IRI":
      case "blank":
      case "prefixed":
        return this._readSubject(t), this._readGraph;
      case "[":
        return this._readNamedGraphBlankLabel;
      default:
        return this._error("Invalid graph label", t);
    }
  }
  // ### `_readNamedGraphLabel` reads a blank node label of a named graph
  _readNamedGraphBlankLabel(t) {
    return t.type !== "]" ? this._error("Invalid graph label", t) : (this._subject = this._factory.blankNode(), this._readGraph);
  }
  // ### `_readDeclarationPunctuation` reads the punctuation of a declaration
  _readDeclarationPunctuation(t) {
    return this._sparqlStyle ? (this._sparqlStyle = !1, this._readInTopContext(t)) : t.type !== "." ? this._error("Expected declaration to end with a dot", t) : this._readInTopContext;
  }
  // Reads a list of quantified symbols from a @forSome or @forAll statement
  _readQuantifierList(t) {
    let n;
    switch (t.type) {
      case "IRI":
      case "prefixed":
        if ((n = this._readEntity(t, !0)) !== void 0)
          break;
      default:
        return this._error(`Unexpected ${t.type}`, t);
    }
    return this._explicitQuantifiers ? (this._subject === null ? this._emit(
      this._graph || this.DEFAULTGRAPH,
      this._predicate,
      this._subject = this._factory.blankNode(),
      this.QUANTIFIERS_GRAPH
    ) : this._emit(
      this._subject,
      this.RDF_REST,
      this._subject = this._factory.blankNode(),
      this.QUANTIFIERS_GRAPH
    ), this._emit(this._subject, this.RDF_FIRST, n, this.QUANTIFIERS_GRAPH)) : this._quantified[n.id] = this._factory[this._quantifier](this._factory.blankNode().value), this._readQuantifierPunctuation;
  }
  // Reads punctuation from a @forSome or @forAll statement
  _readQuantifierPunctuation(t) {
    return t.type === "," ? this._readQuantifierList : (this._explicitQuantifiers && (this._emit(this._subject, this.RDF_REST, this.RDF_NIL, this.QUANTIFIERS_GRAPH), this._subject = null), this._readCallback = this._getContextEndReader(), this._readCallback(t));
  }
  // ### `_getPathReader` reads a potential path and then resumes with the given function
  _getPathReader(t) {
    return this._afterPath = t, this._readPath;
  }
  // ### `_readPath` reads a potential path
  _readPath(t) {
    switch (t.type) {
      case "!":
        return this._readForwardPath;
      case "^":
        return this._readBackwardPath;
      default:
        const n = this._contextStack, r = n.length && n[n.length - 1];
        if (r && r.type === "item") {
          const i = this._subject;
          this._restoreContext("item", t), this._emit(this._subject, this.RDF_FIRST, i, this._graph);
        }
        return this._afterPath(t);
    }
  }
  // ### `_readForwardPath` reads a '!' path
  _readForwardPath(t) {
    let n, r;
    const i = this._factory.blankNode();
    if ((r = this._readEntity(t)) !== void 0)
      return this._predicate === null ? (n = this._subject, this._subject = i) : (n = this._object, this._object = i), this._emit(n, r, i, this._graph), this._readPath;
  }
  // ### `_readBackwardPath` reads a '^' path
  _readBackwardPath(t) {
    const n = this._factory.blankNode();
    let r, i;
    if ((r = this._readEntity(t)) !== void 0)
      return this._predicate === null ? (i = this._subject, this._subject = n) : (i = this._object, this._object = n), this._emit(n, r, i, this._graph), this._readPath;
  }
  // ### `_readTripleTermTail` reads the end of a triple term
  _readTripleTermTail(t) {
    if (t.type !== ")>>")
      return this._error(`Expected )>> but got ${t.type}`, t);
    const n = this._factory.quad(
      this._subject,
      this._predicate,
      this._object,
      this._graph || this.DEFAULTGRAPH
    );
    return this._restoreContext("<<(", t), this._subject === null ? (this._subject = n, this._readPredicate) : (this._object = n, this._getContextEndReader());
  }
  // ### `_readReifiedTripleTailOrReifier` reads a reifier or the end of a nested reified triple
  _readReifiedTripleTailOrReifier(t) {
    return t.type === "~" ? this._readReifier : this._readReifiedTripleTail(t);
  }
  // ### `_readReifiedTripleTail` reads the end of a nested reified triple
  _readReifiedTripleTail(t) {
    if (t.type !== ">>")
      return this._error(`Expected >> but got ${t.type}`, t);
    this._tripleTerm = null;
    const n = this._readTripleTerm();
    this._restoreContext("<<", t);
    const r = this._contextStack, i = r.length && r[r.length - 1];
    return i && i.type === "list" ? (this._emit(this._subject, this.RDF_FIRST, n, this._graph), this._getContextEndReader()) : this._subject === null ? (this._subject = n, this._readPredicateOrReifierTripleEnd) : (this._object = n, this._getContextEndReader());
  }
  _readPredicateOrReifierTripleEnd(t) {
    return t.type === "." ? (this._subject = null, this._readPunctuation(t)) : this._readPredicate(t);
  }
  // ### `_readReifier` reads the triple term identifier after a tilde when in a reifying triple.
  _readReifier(t) {
    return this._reifier = this._readEntity(t), this._readReifiedTripleTail;
  }
  // ### `_readReifier` reads the optional triple term identifier after a tilde when in annotation syntax.
  _readReifierInAnnotation(t) {
    return t.type === "IRI" || t.type === "typeIRI" || t.type === "type" || t.type === "prefixed" || t.type === "blank" || t.type === "var" ? (this._reifier = this._readEntity(t), this._readPunctuation) : (this._readTripleTerm(), this._subject = null, this._readPunctuation(t));
  }
  _readTripleTerm() {
    const t = this._contextStack, n = t.length && t[t.length - 1], r = n ? n.graph : void 0, i = this._reifier || this._factory.blankNode();
    return this._reifier = null, this._tripleTerm = this._tripleTerm || this._factory.quad(this._subject, this._predicate, this._object), this._emit(i, this.RDF_REIFIES, this._tripleTerm, r || this.DEFAULTGRAPH), i;
  }
  // ### `_getContextEndReader` gets the next reader function at the end of a context
  _getContextEndReader() {
    const t = this._contextStack;
    if (!t.length)
      return this._readPunctuation;
    switch (t[t.length - 1].type) {
      case "blank":
        return this._readBlankNodeTail;
      case "list":
        return this._readListItem;
      case "formula":
        return this._readFormulaTail;
      case "<<(":
        return this._readTripleTermTail;
      case "<<":
        return this._readReifiedTripleTailOrReifier;
    }
  }
  // ### `_emit` sends a quad through the callback
  _emit(t, n, r, i) {
    this._callback(null, this._factory.quad(t, n, r, i || this.DEFAULTGRAPH));
  }
  // ### `_error` emits an error message through the callback
  _error(t, n) {
    const r = new Error(`${t} on line ${n.line}.`);
    r.context = {
      token: n,
      line: n.line,
      previousToken: this._lexer.previousToken
    }, this._callback(r), this._callback = vi;
  }
  // ### `_resolveIRI` resolves an IRI against the base path
  _resolveIRI(t) {
    return /^[a-z][a-z0-9+.-]*:/i.test(t) ? t : this._resolveRelativeIRI(t);
  }
  // ### `_resolveRelativeIRI` resolves an IRI against the base path,
  // assuming that a base path has been set and that the IRI is indeed relative
  _resolveRelativeIRI(t) {
    if (!t.length)
      return this._base;
    switch (t[0]) {
      case "#":
        return this._base + t;
      case "?":
        return this._base.replace(/(?:\?.*)?$/, t);
      case "/":
        return (t[1] === "/" ? this._baseScheme : this._baseRoot) + this._removeDotSegments(t);
      default:
        return /^[^/:]*:/.test(t) ? null : this._removeDotSegments(this._basePath + t);
    }
  }
  // ### `_removeDotSegments` resolves './' and '../' path segments in an IRI as per RFC3986
  _removeDotSegments(t) {
    if (!/(^|\/)\.\.?($|[/#?])/.test(t))
      return t;
    const n = t.length;
    let r = "", i = -1, o = -1, s = 0, l = "/";
    for (; i < n; ) {
      switch (l) {
        case ":":
          if (o < 0 && t[++i] === "/" && t[++i] === "/")
            for (; (o = i + 1) < n && t[o] !== "/"; )
              i = o;
          break;
        case "?":
        case "#":
          i = n;
          break;
        case "/":
          if (t[i + 1] === ".")
            switch (l = t[++i + 1], l) {
              case "/":
                r += t.substring(s, i - 1), s = i + 1;
                break;
              case void 0:
              case "?":
              case "#":
                return r + t.substring(s, i) + t.substr(i + 1);
              case ".":
                if (l = t[++i + 1], l === void 0 || l === "/" || l === "?" || l === "#") {
                  if (r += t.substring(s, i - 2), (s = r.lastIndexOf("/")) >= o && (r = r.substr(0, s)), l !== "/")
                    return `${r}/${t.substr(i + 1)}`;
                  s = i + 1;
                }
            }
      }
      l = t[++i];
    }
    return r + t.substring(s);
  }
  // ## Public methods
  // ### `parse` parses the N3 input and emits each parsed quad through the onQuad callback.
  parse(t, n, r, i) {
    let o, s, l, u;
    if (n && (n.onQuad || n.onPrefix || n.onComment || n.onVersion) ? (o = n.onQuad, s = n.onPrefix, l = n.onComment, u = n.onVersion) : (o = n, s = r, u = i), this._readCallback = this._readBeforeTopContext, this._sparqlStyle = !1, this._prefixes = /* @__PURE__ */ Object.create(null), this._prefixes._ = this._blankNodePrefix ? this._blankNodePrefix.substr(2) : `b${Ah++}_`, this._prefixCallback = s || vi, this._versionCallback = u || vi, this._inversePredicate = !1, this._quantified = /* @__PURE__ */ Object.create(null), !o) {
      const c = [];
      let f;
      if (this._callback = (d, h) => {
        d ? f = d : h && c.push(h);
      }, this._lexer.tokenize(t).every((d) => this._readCallback = this._readCallback(d)), f) throw f;
      return c;
    }
    let a = (c, f) => {
      c !== null ? (this._callback(c), this._callback = vi) : this._readCallback && (this._readCallback = this._readCallback(f));
    };
    l && (this._lexer.comments = !0, a = (c, f) => {
      c !== null ? (this._callback(c), this._callback = vi) : this._readCallback && (f.type === "comment" ? l(f.value) : this._readCallback = this._readCallback(f));
    }), this._callback = o, this._lexer.tokenize(t, a);
  }
}
function vi() {
}
function Ly(e, t) {
  e._factory = t, e.DEFAULTGRAPH = t.defaultGraph(), e.RDF_FIRST = t.namedNode(nt.rdf.first), e.RDF_REST = t.namedNode(nt.rdf.rest), e.RDF_NIL = t.namedNode(nt.rdf.nil), e.RDF_REIFIES = t.namedNode(nt.rdf.reifies), e.N3_FORALL = t.namedNode(nt.r.forAll), e.N3_FORSOME = t.namedNode(nt.r.forSome), e.ABBREVIATIONS = {
    a: t.namedNode(nt.rdf.type),
    "=": t.namedNode(nt.owl.sameAs),
    ">": t.namedNode(nt.log.implies),
    "<": t.namedNode(nt.log.isImpliedBy)
  }, e.QUANTIFIERS_GRAPH = t.namedNode("urn:n3:quantifiers");
}
No.SUPPORTED_VERSIONS = [
  "1.2",
  "1.2-basic",
  "1.1"
];
Ly(No.prototype, $C);
const BC = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", FC = "http://www.w3.org/2000/01/rdf-schema#label";
function DC(e) {
  const t = e.lastIndexOf("#");
  if (t !== -1)
    return { namespace: e.slice(0, t + 1), localName: e.slice(t + 1) };
  const n = e.lastIndexOf("/");
  return n !== -1 ? { namespace: e.slice(0, n + 1), localName: e.slice(n + 1) } : { namespace: "", localName: e };
}
function Oh(e, t) {
  let n = e.get(t);
  if (!n) {
    const { namespace: r, localName: i } = DC(t);
    n = { uri: t, types: [], label: i, localName: i, namespace: r, properties: [] }, e.set(t, n);
  }
  return n;
}
function zC(e) {
  var a;
  const t = performance.now(), n = {}, r = /* @__PURE__ */ new Map(), i = [];
  let o = 0;
  const l = new No({ format: "text/turtle" }).parse(e, void 0, (c, f) => {
    n[c] = f.value;
  });
  for (const c of l) {
    const f = c.subject;
    if (f.termType !== "NamedNode" && f.termType !== "BlankNode") continue;
    o++;
    const d = f.value, h = Oh(r, d), g = c.predicate.value, x = c.object;
    if (g === BC && x.termType === "NamedNode") {
      h.types.push(x.value);
      continue;
    }
    if (g === FC && x.termType === "Literal") {
      h.label = x.value;
      continue;
    }
    x.termType === "NamedNode" || x.termType === "BlankNode" ? (i.push({ source: d, target: x.value, predicate: g }), Oh(r, x.value), h.properties.push({ predicate: g, object: x.value, isLiteral: !1 })) : x.termType === "Literal" && h.properties.push({
      predicate: g,
      object: x.value,
      isLiteral: !0,
      language: x.language || void 0,
      datatype: (a = x.datatype) == null ? void 0 : a.value
    });
  }
  const u = performance.now() - t;
  return {
    graph: { nodes: r, edges: i, prefixes: n },
    stats: { tripleCount: o, nodeCount: r.size, edgeCount: i.length, parseTimeMs: u }
  };
}
function UC(e, t) {
  const n = e.nodes.get(t);
  return n ? n.children.map((r) => e.nodes.get(r.uri)).filter((r) => !!r) : [];
}
function HC(e) {
  return e.roots.map((t) => e.nodes.get(t)).filter((t) => !!t);
}
function VC(e, t) {
  const n = [];
  let r = e.nodes.get(t);
  for (; r; )
    n.unshift(r), r = r.parentUri ? e.nodes.get(r.parentUri) : void 0;
  return n;
}
function tl(e, t, n) {
  var o;
  let r = t;
  const i = /* @__PURE__ */ new Set();
  for (; r && !i.has(r); ) {
    if (n.has(r)) return r;
    i.add(r), r = (o = e.nodes.get(r)) == null ? void 0 : o.parentUri;
  }
}
function nf(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e.edges) {
    const i = tl(e, r.fromEquipmentUri, t), o = tl(e, r.toEquipmentUri, t);
    if (!i || !o || i === o) continue;
    const s = i === r.fromEquipmentUri && o === r.toEquipmentUri, l = s ? `direct::${r.id}` : `rollup::${i}::${o}`, u = n.get(l);
    u ? u.raw.push(r) : n.set(l, {
      id: l,
      source: i,
      sourceHandle: s ? r.fromCPUri : void 0,
      target: o,
      targetHandle: s ? r.toCPUri : void 0,
      rolledUp: !s,
      raw: [r]
    });
  }
  return [...n.values()];
}
function $y(e) {
  return e != null && e.endsWith("Sensor") ? "sensor" : e != null && e.endsWith("Actuator") ? "actuator" : e != null && e.endsWith("Function") ? "function" : "controller";
}
function Fa(e, t, n) {
  if (!_y(e)) return !1;
  const r = $y(e.typeName);
  return r === "function" ? t : r === "sensor" || r === "actuator" ? n : !0;
}
function WC(e, t) {
  const n = e.connectionPoints.get(t);
  if (n)
    return { uri: n.uri, label: n.label, kind: n.kind, medium: n.medium, mapsTo: n.mapsTo };
}
function Da(e, t) {
  const n = e.properties.get(t);
  if (n)
    return {
      label: n.label,
      value: n.value,
      unitSymbol: n.unitSymbol,
      quantityKind: n.quantityKind,
      enumerationKind: n.enumerationKind,
      mapsTo: n.mapsTo
    };
}
function YC(e, t, n = !1, r = !1, i = !0) {
  const o = n ? t : new Set([...t].filter((u) => {
    const a = e.nodes.get(u);
    return !a || !_y(a);
  })), s = [];
  for (const u of o) {
    const a = e.nodes.get(u);
    if (!a || xy(a)) continue;
    const c = a.connectionPoints.map((x) => WC(e, x)).filter((x) => !!x), f = a.properties.map((x) => Da(e, x)).filter((x) => !!x), d = a.groupMemberships.map((x) => {
      var E;
      return (E = e.nodes.get(x)) == null ? void 0 : E.label;
    }).filter((x) => !!x), h = c.length > 0 ? "equipment" : "space", g = Fa(a, r, i);
    s.push({
      id: u,
      type: "equipmentNode",
      position: { x: 0, y: 0 },
      data: {
        label: a.label,
        typeName: a.typeName,
        kind: h,
        hasChildren: a.children.length > 0,
        connectionPoints: c,
        properties: f,
        groupMemberships: d,
        pointKind: n && g ? $y(a.typeName) : void 0,
        muted: n && f.length === 0 && !g
      }
    });
  }
  const l = nf(e, o).map((u) => {
    const a = u.raw[0], c = new Set(u.raw.map((d) => d.medium).filter((d) => !!d)), f = u.raw.length > 1 ? `${u.raw.length} connections` : a.hubLabel || "connection";
    return {
      id: u.id,
      source: u.source,
      sourceHandle: u.sourceHandle,
      target: u.target,
      targetHandle: u.targetHandle,
      type: "connectionEdge",
      data: {
        hubLabel: f,
        medium: c.size === 1 ? [...c][0] : void 0,
        properties: u.rolledUp ? [] : a.properties.map((d) => Da(e, d)).filter((d) => !!d),
        rolledUp: u.rolledUp
      }
    };
  });
  return { nodes: s, edges: l };
}
const jy = {
  observes: "observes",
  actuatedByProperty: "actuates",
  hasInput: "input",
  hasOutput: "output",
  hasObservationLocation: "location",
  hasPhysicalLocation: "location",
  actuates: "actuates",
  executedBy: "executed by",
  hasProperty: "hasProperty"
}, GC = (e) => `points-prop::${e}`, XC = (e) => `conn-junction::${e}`;
function ns(e) {
  return e === "observes" || e === "actuatedByProperty" || e === "hasInput" || e === "hasOutput";
}
function QC(e, t, n, r, i) {
  const o = /* @__PURE__ */ new Map();
  for (const p of e.nodes.values())
    for (const w of p.properties) o.set(w, p.uri);
  const s = [], l = [], u = [], a = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
  function h(p) {
    var w;
    return ns(p.relation) ? o.get(p.targetUri) : p.relation === "hasObservationLocation" || p.relation === "hasPhysicalLocation" ? e.nodes.has(p.targetUri) ? p.targetUri : (w = e.connectionPoints.get(p.targetUri)) == null ? void 0 : w.ownerUri : p.targetUri;
  }
  function g(p) {
    const w = e.properties.get(p);
    if (!w) return;
    const v = GC(p);
    if (d.has(p)) return v;
    d.add(p), s.push({
      id: v,
      type: "propertyPill",
      position: { x: 0, y: 0 },
      data: {
        label: w.label,
        typeName: w.typeName,
        value: w.value,
        unitSymbol: w.unitSymbol,
        quantityKind: w.quantityKind,
        enumerationKind: w.enumerationKind,
        mapsTo: w.mapsTo
      }
    });
    const _ = o.get(p), C = _ ? tl(e, _, t) : void 0;
    return C && l.push({
      id: `instr-prop-owner::${p}::${C}`,
      source: v,
      target: C,
      type: "instrumentationEdge",
      data: { relation: "hasProperty", rolledUp: C !== _ }
    }), v;
  }
  function x(p) {
    var w;
    for (const v of p.instrumentationLinks) {
      if (ns(v.relation)) {
        const P = g(v.targetUri);
        if (!P) continue;
        l.push({
          id: `instr-overlay::${p.uri}::${v.relation}::${v.targetUri}`,
          source: p.uri,
          target: P,
          type: "instrumentationEdge",
          data: { relation: v.relation, rolledUp: !1 }
        });
        continue;
      }
      const _ = h(v);
      if (!_) continue;
      const C = tl(e, _, t);
      if (C && C !== p.uri) {
        l.push({
          id: `instr-overlay::${p.uri}::${v.relation}::${v.targetUri}`,
          source: p.uri,
          target: C,
          type: "instrumentationEdge",
          data: { relation: v.relation, rolledUp: C !== _ }
        });
        continue;
      }
      const I = c.get(p.uri) ?? [];
      I.push({ relation: v.relation, targetLabel: (w = e.nodes.get(_)) == null ? void 0 : w.label }), c.set(p.uri, I);
    }
  }
  if (i)
    for (const p of t) {
      const w = e.nodes.get(p);
      if (w)
        for (const v of w.properties) g(v);
    }
  const E = /* @__PURE__ */ new Set();
  for (const p of e.nodes.values()) {
    if (!Fa(p, n, r)) continue;
    if (!t.has(p.uri)) {
      if (!p.instrumentationLinks.some((_) => {
        if (ns(_.relation)) return !1;
        const C = h(_);
        return C !== void 0 && t.has(C);
      })) continue;
      f.add(p.uri);
    }
    E.add(p.uri), x(p);
  }
  for (const p of e.nodes.values())
    E.has(p.uri) || !Fa(p, n, r) || !p.instrumentationLinks.some(
      (v) => ns(v.relation) && d.has(v.targetUri)
    ) || (t.has(p.uri) || f.add(p.uri), x(p));
  if (i)
    for (const p of nf(e, t)) {
      if (p.rolledUp) continue;
      const w = p.raw[0];
      if (w.properties.length === 0) continue;
      const v = XC(p.id);
      s.push({ id: v, type: "connectionJunction", position: { x: 0, y: 0 }, data: {} }), a.add(p.id), u.push(
        {
          id: `${p.id}::seg1`,
          source: p.source,
          sourceHandle: p.sourceHandle,
          target: v,
          targetHandle: "in",
          type: "connectionEdge",
          data: { hubLabel: w.hubLabel, medium: w.medium, properties: [], rolledUp: !1 }
        },
        {
          id: `${p.id}::seg2`,
          source: v,
          sourceHandle: "out",
          target: p.target,
          targetHandle: p.targetHandle,
          type: "connectionEdge",
          data: {
            hubLabel: w.hubLabel,
            medium: w.medium,
            properties: w.properties.map((_) => Da(e, _)).filter((_) => !!_),
            rolledUp: !1
          }
        }
      );
      for (const _ of w.properties) {
        const C = g(_);
        C && l.push({
          id: `conn-junction-prop::${p.id}::${_}`,
          source: C,
          target: v,
          targetHandle: "prop",
          type: "instrumentationEdge",
          data: { relation: "hasProperty", rolledUp: !1 }
        });
      }
    }
  return { nodes: s, edges: l, connectionSegmentEdges: u, summaries: c, extraPointUris: f, replacedConnectionEdgeIds: a };
}
var Ry = Object.defineProperty, KC = (e, t, n) => t in e ? Ry(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, qC = (e, t) => {
  for (var n in t) Ry(e, n, { get: t[n], enumerable: !0 });
}, ZC = (e, t, n) => KC(e, t + "", n), Ay = {};
qC(Ay, { Graph: () => It, alg: () => rf, json: () => By, version: () => tI });
var JC = Object.defineProperty, Oy = (e, t) => {
  for (var n in t) JC(e, n, { get: t[n], enumerable: !0 });
}, It = class {
  constructor(e) {
    this._isDirected = !0, this._isMultigraph = !1, this._isCompound = !1, this._nodes = {}, this._in = {}, this._preds = {}, this._out = {}, this._sucs = {}, this._edgeObjs = {}, this._edgeLabels = {}, this._nodeCount = 0, this._edgeCount = 0, this._defaultNodeLabelFn = () => {
    }, this._defaultEdgeLabelFn = () => {
    }, e && (this._isDirected = "directed" in e ? e.directed : !0, this._isMultigraph = "multigraph" in e ? e.multigraph : !1, this._isCompound = "compound" in e ? e.compound : !1), this._isCompound && (this._parent = {}, this._children = {}, this._children["\0"] = {});
  }
  isDirected() {
    return this._isDirected;
  }
  isMultigraph() {
    return this._isMultigraph;
  }
  isCompound() {
    return this._isCompound;
  }
  setGraph(e) {
    return this._label = e, this;
  }
  graph() {
    return this._label;
  }
  setDefaultNodeLabel(e) {
    return typeof e != "function" ? this._defaultNodeLabelFn = () => e : this._defaultNodeLabelFn = e, this;
  }
  nodeCount() {
    return this._nodeCount;
  }
  nodes() {
    return Object.keys(this._nodes);
  }
  sources() {
    return this.nodes().filter((e) => Object.keys(this._in[e]).length === 0);
  }
  sinks() {
    return this.nodes().filter((e) => Object.keys(this._out[e]).length === 0);
  }
  setNodes(e, t) {
    return e.forEach((n) => {
      t !== void 0 ? this.setNode(n, t) : this.setNode(n);
    }), this;
  }
  setNode(e, t) {
    return e in this._nodes ? (arguments.length > 1 && (this._nodes[e] = t), this) : (this._nodes[e] = arguments.length > 1 ? t : this._defaultNodeLabelFn(e), this._isCompound && (this._parent[e] = "\0", this._children[e] = {}, this._children["\0"][e] = !0), this._in[e] = {}, this._preds[e] = {}, this._out[e] = {}, this._sucs[e] = {}, ++this._nodeCount, this);
  }
  node(e) {
    return this._nodes[e];
  }
  hasNode(e) {
    return e in this._nodes;
  }
  removeNode(e) {
    if (e in this._nodes) {
      let t = (n) => this.removeEdge(this._edgeObjs[n]);
      delete this._nodes[e], this._isCompound && (this._removeFromParentsChildList(e), delete this._parent[e], this.children(e).forEach((n) => {
        this.setParent(n);
      }), delete this._children[e]), Object.keys(this._in[e]).forEach(t), delete this._in[e], delete this._preds[e], Object.keys(this._out[e]).forEach(t), delete this._out[e], delete this._sucs[e], --this._nodeCount;
    }
    return this;
  }
  setParent(e, t) {
    if (!this._isCompound) throw new Error("Cannot set parent in a non-compound graph");
    if (t === void 0) t = "\0";
    else {
      t += "";
      for (let n = t; n !== void 0; n = this.parent(n)) if (n === e) throw new Error("Setting " + t + " as parent of " + e + " would create a cycle");
      this.setNode(t);
    }
    return this.setNode(e), this._removeFromParentsChildList(e), this._parent[e] = t, this._children[t][e] = !0, this;
  }
  parent(e) {
    if (this._isCompound) {
      let t = this._parent[e];
      if (t !== "\0") return t;
    }
  }
  children(e = "\0") {
    if (this._isCompound) {
      let t = this._children[e];
      if (t) return Object.keys(t);
    } else {
      if (e === "\0") return this.nodes();
      if (this.hasNode(e)) return [];
    }
    return [];
  }
  predecessors(e) {
    let t = this._preds[e];
    if (t) return Object.keys(t);
  }
  successors(e) {
    let t = this._sucs[e];
    if (t) return Object.keys(t);
  }
  neighbors(e) {
    let t = this.predecessors(e);
    if (t) {
      let n = new Set(t);
      for (let r of this.successors(e)) n.add(r);
      return Array.from(n.values());
    }
  }
  isLeaf(e) {
    let t;
    return this.isDirected() ? t = this.successors(e) : t = this.neighbors(e), t.length === 0;
  }
  filterNodes(e) {
    let t = new this.constructor({ directed: this._isDirected, multigraph: this._isMultigraph, compound: this._isCompound });
    t.setGraph(this.graph()), Object.entries(this._nodes).forEach(([i, o]) => {
      e(i) && t.setNode(i, o);
    }), Object.values(this._edgeObjs).forEach((i) => {
      t.hasNode(i.v) && t.hasNode(i.w) && t.setEdge(i, this.edge(i));
    });
    let n = {}, r = (i) => {
      let o = this.parent(i);
      return !o || t.hasNode(o) ? (n[i] = o ?? void 0, o ?? void 0) : o in n ? n[o] : r(o);
    };
    return this._isCompound && t.nodes().forEach((i) => t.setParent(i, r(i))), t;
  }
  setDefaultEdgeLabel(e) {
    return typeof e != "function" ? this._defaultEdgeLabelFn = () => e : this._defaultEdgeLabelFn = e, this;
  }
  edgeCount() {
    return this._edgeCount;
  }
  edges() {
    return Object.values(this._edgeObjs);
  }
  setPath(e, t) {
    return e.reduce((n, r) => (t !== void 0 ? this.setEdge(n, r, t) : this.setEdge(n, r), r)), this;
  }
  setEdge(e, t, n, r) {
    let i, o, s, l, u = !1;
    typeof e == "object" && e !== null && "v" in e ? (i = e.v, o = e.w, s = e.name, arguments.length === 2 && (l = t, u = !0)) : (i = e, o = t, s = r, arguments.length > 2 && (l = n, u = !0)), i = "" + i, o = "" + o, s !== void 0 && (s = "" + s);
    let a = bi(this._isDirected, i, o, s);
    if (a in this._edgeLabels) return u && (this._edgeLabels[a] = l), this;
    if (s !== void 0 && !this._isMultigraph) throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(i), this.setNode(o), this._edgeLabels[a] = u ? l : this._defaultEdgeLabelFn(i, o, s);
    let c = eI(this._isDirected, i, o, s);
    return i = c.v, o = c.w, Object.freeze(c), this._edgeObjs[a] = c, Bh(this._preds[o], i), Bh(this._sucs[i], o), this._in[o][a] = c, this._out[i][a] = c, this._edgeCount++, this;
  }
  edge(e, t, n) {
    let r = arguments.length === 1 ? Su(this._isDirected, e) : bi(this._isDirected, e, t, n);
    return this._edgeLabels[r];
  }
  edgeAsObj(e, t, n) {
    let r = arguments.length === 1 ? this.edge(e) : this.edge(e, t, n);
    return typeof r != "object" ? { label: r } : r;
  }
  hasEdge(e, t, n) {
    return (arguments.length === 1 ? Su(this._isDirected, e) : bi(this._isDirected, e, t, n)) in this._edgeLabels;
  }
  removeEdge(e, t, n) {
    let r = arguments.length === 1 ? Su(this._isDirected, e) : bi(this._isDirected, e, t, n), i = this._edgeObjs[r];
    if (i) {
      let o = i.v, s = i.w;
      delete this._edgeLabels[r], delete this._edgeObjs[r], Fh(this._preds[s], o), Fh(this._sucs[o], s), delete this._in[s][r], delete this._out[o][r], this._edgeCount--;
    }
    return this;
  }
  inEdges(e, t) {
    return this.isDirected() ? this.filterEdges(this._in[e], e, t) : this.nodeEdges(e, t);
  }
  outEdges(e, t) {
    return this.isDirected() ? this.filterEdges(this._out[e], e, t) : this.nodeEdges(e, t);
  }
  nodeEdges(e, t) {
    if (e in this._nodes) return this.filterEdges({ ...this._in[e], ...this._out[e] }, e, t);
  }
  _removeFromParentsChildList(e) {
    delete this._children[this._parent[e]][e];
  }
  filterEdges(e, t, n) {
    if (!e) return;
    let r = Object.values(e);
    return n ? r.filter((i) => i.v === t && i.w === n || i.v === n && i.w === t) : r;
  }
};
function Bh(e, t) {
  e[t] ? e[t]++ : e[t] = 1;
}
function Fh(e, t) {
  e[t] !== void 0 && !--e[t] && delete e[t];
}
function bi(e, t, n, r) {
  let i = "" + t, o = "" + n;
  if (!e && i > o) {
    let s = i;
    i = o, o = s;
  }
  return i + "" + o + "" + (r === void 0 ? "\0" : r);
}
function eI(e, t, n, r) {
  let i = "" + t, o = "" + n;
  if (!e && i > o) {
    let l = i;
    i = o, o = l;
  }
  let s = { v: i, w: o };
  return r && (s.name = r), s;
}
function Su(e, t) {
  return bi(e, t.v, t.w, t.name);
}
var tI = "4.0.1", By = {};
Oy(By, { read: () => oI, write: () => nI });
function nI(e) {
  let t = { options: { directed: e.isDirected(), multigraph: e.isMultigraph(), compound: e.isCompound() }, nodes: rI(e), edges: iI(e) }, n = e.graph();
  return n !== void 0 && (t.value = structuredClone(n)), t;
}
function rI(e) {
  return e.nodes().map((t) => {
    let n = e.node(t), r = e.parent(t), i = { v: t };
    return n !== void 0 && (i.value = n), r !== void 0 && (i.parent = r), i;
  });
}
function iI(e) {
  return e.edges().map((t) => {
    let n = e.edge(t), r = { v: t.v, w: t.w };
    return t.name !== void 0 && (r.name = t.name), n !== void 0 && (r.value = n), r;
  });
}
function oI(e) {
  let t = new It(e.options);
  return e.value !== void 0 && t.setGraph(e.value), e.nodes.forEach((n) => {
    t.setNode(n.v, n.value), n.parent && t.setParent(n.v, n.parent);
  }), e.edges.forEach((n) => {
    t.setEdge({ v: n.v, w: n.w, name: n.name }, n.value);
  }), t;
}
var rf = {};
Oy(rf, { CycleException: () => rl, bellmanFord: () => Fy, components: () => uI, dijkstra: () => nl, dijkstraAll: () => fI, findCycles: () => dI, floydWarshall: () => pI, isAcyclic: () => mI, postorder: () => vI, preorder: () => wI, prim: () => xI, shortestPaths: () => _I, tarjan: () => zy, topsort: () => Uy });
var sI = () => 1;
function Fy(e, t, n, r) {
  return lI(e, String(t), n || sI, r || function(i) {
    return e.outEdges(i);
  });
}
function lI(e, t, n, r) {
  let i = {}, o, s = 0, l = e.nodes(), u = function(f) {
    let d = n(f);
    i[f.v].distance + d < i[f.w].distance && (i[f.w] = { distance: i[f.v].distance + d, predecessor: f.v }, o = !0);
  }, a = function() {
    l.forEach(function(f) {
      r(f).forEach(function(d) {
        let h = d.v === f ? d.v : d.w, g = h === d.v ? d.w : d.v;
        u({ v: h, w: g });
      });
    });
  };
  l.forEach(function(f) {
    let d = f === t ? 0 : Number.POSITIVE_INFINITY;
    i[f] = { distance: d, predecessor: "" };
  });
  let c = l.length;
  for (let f = 1; f < c && (o = !1, s++, a(), !!o); f++) ;
  if (s === c - 1 && (o = !1, a(), o)) throw new Error("The graph contains a negative weight cycle");
  return i;
}
function uI(e) {
  let t = {}, n = [], r;
  function i(o) {
    o in t || (t[o] = !0, r.push(o), e.successors(o).forEach(i), e.predecessors(o).forEach(i));
  }
  return e.nodes().forEach(function(o) {
    r = [], i(o), r.length && n.push(r);
  }), n;
}
var Dy = class {
  constructor() {
    this._arr = [], this._keyIndices = {};
  }
  size() {
    return this._arr.length;
  }
  keys() {
    return this._arr.map((e) => e.key);
  }
  has(e) {
    return e in this._keyIndices;
  }
  priority(e) {
    let t = this._keyIndices[e];
    if (t !== void 0) return this._arr[t].priority;
  }
  min() {
    if (this.size() === 0) throw new Error("Queue underflow");
    return this._arr[0].key;
  }
  add(e, t) {
    let n = this._keyIndices, r = String(e);
    if (!(r in n)) {
      let i = this._arr, o = i.length;
      return n[r] = o, i.push({ key: r, priority: t }), this._decrease(o), !0;
    }
    return !1;
  }
  removeMin() {
    this._swap(0, this._arr.length - 1);
    let e = this._arr.pop();
    return delete this._keyIndices[e.key], this._heapify(0), e.key;
  }
  decrease(e, t) {
    let n = this._keyIndices[e];
    if (n === void 0) throw new Error(`Key not found: ${e}`);
    let r = this._arr[n].priority;
    if (t > r) throw new Error(`New priority is greater than current priority. Key: ${e} Old: ${r} New: ${t}`);
    this._arr[n].priority = t, this._decrease(n);
  }
  _heapify(e) {
    let t = this._arr, n = 2 * e, r = n + 1, i = e;
    n < t.length && (i = t[n].priority < t[i].priority ? n : i, r < t.length && (i = t[r].priority < t[i].priority ? r : i), i !== e && (this._swap(e, i), this._heapify(i)));
  }
  _decrease(e) {
    let t = this._arr, n = t[e].priority, r;
    for (; e !== 0 && (r = e >> 1, !(t[r].priority < n)); ) this._swap(e, r), e = r;
  }
  _swap(e, t) {
    let n = this._arr, r = this._keyIndices, i = n[e], o = n[t];
    n[e] = o, n[t] = i, r[o.key] = e, r[i.key] = t;
  }
}, aI = () => 1;
function nl(e, t, n, r) {
  let i = function(o) {
    return e.outEdges(o);
  };
  return cI(e, String(t), n || aI, r || i);
}
function cI(e, t, n, r) {
  let i = {}, o = new Dy(), s, l, u = function(a) {
    let c = a.v !== s ? a.v : a.w, f = i[c], d = n(a), h = l.distance + d;
    if (d < 0) throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + a + " Weight: " + d);
    h < f.distance && (f.distance = h, f.predecessor = s, o.decrease(c, h));
  };
  for (e.nodes().forEach(function(a) {
    let c = a === t ? 0 : Number.POSITIVE_INFINITY;
    i[a] = { distance: c, predecessor: "" }, o.add(a, c);
  }); o.size() > 0 && (s = o.removeMin(), l = i[s], l.distance !== Number.POSITIVE_INFINITY); ) r(s).forEach(u);
  return i;
}
function fI(e, t, n) {
  return e.nodes().reduce(function(r, i) {
    return r[i] = nl(e, i, t, n), r;
  }, {});
}
function zy(e) {
  let t = 0, n = [], r = {}, i = [];
  function o(s) {
    let l = r[s] = { onStack: !0, lowlink: t, index: t++ };
    if (n.push(s), e.successors(s).forEach(function(u) {
      u in r ? r[u].onStack && (l.lowlink = Math.min(l.lowlink, r[u].index)) : (o(u), l.lowlink = Math.min(l.lowlink, r[u].lowlink));
    }), l.lowlink === l.index) {
      let u = [], a;
      do
        a = n.pop(), r[a].onStack = !1, u.push(a);
      while (s !== a);
      i.push(u);
    }
  }
  return e.nodes().forEach(function(s) {
    s in r || o(s);
  }), i;
}
function dI(e) {
  return zy(e).filter(function(t) {
    return t.length > 1 || t.length === 1 && e.hasEdge(t[0], t[0]);
  });
}
var hI = () => 1;
function pI(e, t, n) {
  return gI(e, t || hI, n || function(r) {
    return e.outEdges(r);
  });
}
function gI(e, t, n) {
  let r = {}, i = e.nodes();
  return i.forEach(function(o) {
    r[o] = {}, r[o][o] = { distance: 0, predecessor: "" }, i.forEach(function(s) {
      o !== s && (r[o][s] = { distance: Number.POSITIVE_INFINITY, predecessor: "" });
    }), n(o).forEach(function(s) {
      let l = s.v === o ? s.w : s.v, u = t(s);
      r[o][l] = { distance: u, predecessor: o };
    });
  }), i.forEach(function(o) {
    let s = r[o];
    i.forEach(function(l) {
      let u = r[l];
      i.forEach(function(a) {
        let c = u[o], f = s[a], d = u[a], h = c.distance + f.distance;
        h < d.distance && (d.distance = h, d.predecessor = f.predecessor);
      });
    });
  }), r;
}
var rl = class extends Error {
  constructor(...e) {
    super(...e);
  }
};
function Uy(e) {
  let t = {}, n = {}, r = [];
  function i(o) {
    if (o in n) throw new rl();
    o in t || (n[o] = !0, t[o] = !0, e.predecessors(o).forEach(i), delete n[o], r.push(o));
  }
  if (e.sinks().forEach(i), Object.keys(t).length !== e.nodeCount()) throw new rl();
  return r;
}
function mI(e) {
  try {
    Uy(e);
  } catch (t) {
    if (t instanceof rl) return !1;
    throw t;
  }
  return !0;
}
function yI(e, t, n, r, i) {
  Array.isArray(t) || (t = [t]);
  let o = (l) => {
    var u;
    return (u = e.isDirected() ? e.successors(l) : e.neighbors(l)) != null ? u : [];
  }, s = {};
  return t.forEach(function(l) {
    if (!e.hasNode(l)) throw new Error("Graph does not have node: " + l);
    i = Hy(e, l, n === "post", s, o, r, i);
  }), i;
}
function Hy(e, t, n, r, i, o, s) {
  return t in r || (r[t] = !0, n || (s = o(s, t)), i(t).forEach(function(l) {
    s = Hy(e, l, n, r, i, o, s);
  }), n && (s = o(s, t))), s;
}
function Vy(e, t, n) {
  return yI(e, t, n, function(r, i) {
    return r.push(i), r;
  }, []);
}
function vI(e, t) {
  return Vy(e, t, "post");
}
function wI(e, t) {
  return Vy(e, t, "pre");
}
function xI(e, t) {
  let n = new It(), r = {}, i = new Dy(), o;
  function s(u) {
    let a = u.v === o ? u.w : u.v, c = i.priority(a);
    if (c !== void 0) {
      let f = t(u);
      f < c && (r[a] = o, i.decrease(a, f));
    }
  }
  if (e.nodeCount() === 0) return n;
  e.nodes().forEach(function(u) {
    i.add(u, Number.POSITIVE_INFINITY), n.setNode(u);
  }), i.decrease(e.nodes()[0], 0);
  let l = !1;
  for (; i.size() > 0; ) {
    if (o = i.removeMin(), o in r) n.setEdge(o, r[o]);
    else {
      if (l) throw new Error("Input graph is not connected: " + e);
      l = !0;
    }
    e.nodeEdges(o).forEach(s);
  }
  return n;
}
function _I(e, t, n, r) {
  return EI(e, t, n, r ?? ((i) => {
    let o = e.outEdges(i);
    return o ?? [];
  }));
}
function EI(e, t, n, r) {
  if (n === void 0) return nl(e, t, n, r);
  let i = !1, o = e.nodes();
  for (let s = 0; s < o.length; s++) {
    let l = r(o[s]);
    for (let u = 0; u < l.length; u++) {
      let a = l[u], c = a.v === o[s] ? a.v : a.w, f = c === a.v ? a.w : a.v;
      n({ v: c, w: f }) < 0 && (i = !0);
    }
    if (i) return Fy(e, t, n, r);
  }
  return nl(e, t, n, r);
}
function si(e, t, n, r) {
  let i = r;
  for (; e.hasNode(i); ) i = of(r);
  return n.dummy = t, e.setNode(i, n), i;
}
function SI(e) {
  let t = new It().setGraph(e.graph());
  return e.nodes().forEach((n) => t.setNode(n, e.node(n))), e.edges().forEach((n) => {
    let r = t.edge(n.v, n.w) || { weight: 0, minlen: 1 }, i = e.edge(n);
    t.setEdge(n.v, n.w, { weight: r.weight + i.weight, minlen: Math.max(r.minlen, i.minlen) });
  }), t;
}
function Wy(e) {
  let t = new It({ multigraph: e.isMultigraph() }).setGraph(e.graph());
  return e.nodes().forEach((n) => {
    e.children(n).length || t.setNode(n, e.node(n));
  }), e.edges().forEach((n) => {
    t.setEdge(n, e.edge(n));
  }), t;
}
function Dh(e, t) {
  let n = e.x, r = e.y, i = t.x - n, o = t.y - r, s = e.width / 2, l = e.height / 2;
  if (!i && !o) throw new Error("Not possible to find intersection inside of the rectangle");
  let u, a;
  return Math.abs(o) * s > Math.abs(i) * l ? (o < 0 && (l = -l), u = l * i / o, a = l) : (i < 0 && (s = -s), u = s, a = s * o / i), { x: n + u, y: r + a };
}
function bo(e) {
  let t = fo(Gy(e) + 1).map(() => []);
  return e.nodes().forEach((n) => {
    let r = e.node(n), i = r.rank;
    i !== void 0 && (t[i] || (t[i] = []), t[i][r.order] = n);
  }), t;
}
function kI(e) {
  let t = e.nodes().map((r) => {
    let i = e.node(r).rank;
    return i === void 0 ? Number.MAX_VALUE : i;
  }), n = Kt(Math.min, t);
  e.nodes().forEach((r) => {
    let i = e.node(r);
    Object.hasOwn(i, "rank") && (i.rank -= n);
  });
}
function NI(e) {
  let t = e.nodes().map((s) => e.node(s).rank).filter((s) => s !== void 0), n = Kt(Math.min, t), r = [];
  e.nodes().forEach((s) => {
    let l = e.node(s).rank - n;
    r[l] || (r[l] = []), r[l].push(s);
  });
  let i = 0, o = e.graph().nodeRankFactor;
  Array.from(r).forEach((s, l) => {
    s === void 0 && l % o !== 0 ? --i : s !== void 0 && i && s.forEach((u) => e.node(u).rank += i);
  });
}
function zh(e, t, n, r) {
  let i = { width: 0, height: 0 };
  return arguments.length >= 4 && (i.rank = n, i.order = r), si(e, "border", i, t);
}
function bI(e, t = Yy) {
  let n = [];
  for (let r = 0; r < e.length; r += t) {
    let i = e.slice(r, r + t);
    n.push(i);
  }
  return n;
}
var Yy = 65535;
function Kt(e, t) {
  if (t.length > Yy) {
    let n = bI(t);
    return e(...n.map((r) => e(...r)));
  } else return e(...t);
}
function Gy(e) {
  let t = e.nodes().map((n) => {
    let r = e.node(n).rank;
    return r === void 0 ? Number.MIN_VALUE : r;
  });
  return Kt(Math.max, t);
}
function CI(e, t) {
  let n = { lhs: [], rhs: [] };
  return e.forEach((r) => {
    t(r) ? n.lhs.push(r) : n.rhs.push(r);
  }), n;
}
function Xy(e, t) {
  let n = Date.now();
  try {
    return t();
  } finally {
    console.log(e + " time: " + (Date.now() - n) + "ms");
  }
}
function Qy(e, t) {
  return t();
}
var II = 0;
function of(e) {
  let t = ++II;
  return e + ("" + t);
}
function fo(e, t, n = 1) {
  t == null && (t = e, e = 0);
  let r = (o) => o < t;
  n < 0 && (r = (o) => t < o);
  let i = [];
  for (let o = e; r(o); o += n) i.push(o);
  return i;
}
function il(e, t) {
  let n = {};
  for (let r of t) e[r] !== void 0 && (n[r] = e[r]);
  return n;
}
function Al(e, t) {
  let n;
  return typeof t == "string" ? n = (r) => r[t] : n = t, Object.entries(e).reduce((r, [i, o]) => (r[i] = n(o, i), r), {});
}
function PI(e, t) {
  return e.reduce((n, r, i) => (n[r] = t[i], n), {});
}
var Ol = "\0", MI = "3.0.0", TI = class {
  constructor() {
    ZC(this, "_sentinel");
    let e = {};
    e._next = e._prev = e, this._sentinel = e;
  }
  dequeue() {
    let e = this._sentinel, t = e._prev;
    if (t !== e) return Uh(t), t;
  }
  enqueue(e) {
    let t = this._sentinel;
    e._prev && e._next && Uh(e), e._next = t._next, t._next._prev = e, t._next = e, e._prev = t;
  }
  toString() {
    let e = [], t = this._sentinel, n = t._prev;
    for (; n !== t; ) e.push(JSON.stringify(n, LI)), n = n._prev;
    return "[" + e.join(", ") + "]";
  }
};
function Uh(e) {
  e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev;
}
function LI(e, t) {
  if (e !== "_next" && e !== "_prev") return t;
}
var $I = TI, jI = () => 1;
function RI(e, t) {
  if (e.nodeCount() <= 1) return [];
  let n = OI(e, t || jI);
  return AI(n.graph, n.buckets, n.zeroIdx).flatMap((r) => e.outEdges(r.v, r.w) || []);
}
function AI(e, t, n) {
  var r;
  let i = [], o = t[t.length - 1], s = t[0], l;
  for (; e.nodeCount(); ) {
    for (; l = s.dequeue(); ) ku(e, t, n, l);
    for (; l = o.dequeue(); ) ku(e, t, n, l);
    if (e.nodeCount()) {
      for (let u = t.length - 2; u > 0; --u) if (l = (r = t[u]) == null ? void 0 : r.dequeue(), l) {
        i = i.concat(ku(e, t, n, l, !0) || []);
        break;
      }
    }
  }
  return i;
}
function ku(e, t, n, r, i) {
  let o = [], s = i ? o : void 0;
  return (e.inEdges(r.v) || []).forEach((l) => {
    let u = e.edge(l), a = e.node(l.v);
    i && o.push({ v: l.v, w: l.w }), a.out -= u, za(t, n, a);
  }), (e.outEdges(r.v) || []).forEach((l) => {
    let u = e.edge(l), a = l.w, c = e.node(a);
    c.in -= u, za(t, n, c);
  }), e.removeNode(r.v), s;
}
function OI(e, t) {
  let n = new It(), r = 0, i = 0;
  e.nodes().forEach((l) => {
    n.setNode(l, { v: l, in: 0, out: 0 });
  }), e.edges().forEach((l) => {
    let u = n.edge(l.v, l.w) || 0, a = t(l), c = u + a;
    n.setEdge(l.v, l.w, c);
    let f = n.node(l.v), d = n.node(l.w);
    i = Math.max(i, f.out += a), r = Math.max(r, d.in += a);
  });
  let o = BI(i + r + 3).map(() => new $I()), s = r + 1;
  return n.nodes().forEach((l) => {
    za(o, s, n.node(l));
  }), { graph: n, buckets: o, zeroIdx: s };
}
function za(e, t, n) {
  var r, i, o;
  n.out ? n.in ? (o = e[n.out - n.in + t]) == null || o.enqueue(n) : (i = e[e.length - 1]) == null || i.enqueue(n) : (r = e[0]) == null || r.enqueue(n);
}
function BI(e) {
  let t = [];
  for (let n = 0; n < e; n++) t.push(n);
  return t;
}
function FI(e) {
  (e.graph().acyclicer === "greedy" ? RI(e, t(e)) : DI(e)).forEach((n) => {
    let r = e.edge(n);
    e.removeEdge(n), r.forwardName = n.name, r.reversed = !0, e.setEdge(n.w, n.v, r, of("rev"));
  });
  function t(n) {
    return (r) => n.edge(r).weight;
  }
}
function DI(e) {
  let t = [], n = {}, r = {};
  function i(o) {
    Object.hasOwn(r, o) || (r[o] = !0, n[o] = !0, e.outEdges(o).forEach((s) => {
      Object.hasOwn(n, s.w) ? t.push(s) : i(s.w);
    }), delete n[o]);
  }
  return e.nodes().forEach(i), t;
}
function zI(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.reversed) {
      e.removeEdge(t);
      let r = n.forwardName;
      delete n.reversed, delete n.forwardName, e.setEdge(t.w, t.v, n, r);
    }
  });
}
function UI(e) {
  e.graph().dummyChains = [], e.edges().forEach((t) => HI(e, t));
}
function HI(e, t) {
  let n = t.v, r = e.node(n).rank, i = t.w, o = e.node(i).rank, s = t.name, l = e.edge(t), u = l.labelRank;
  if (o === r + 1) return;
  e.removeEdge(t);
  let a, c, f;
  for (f = 0, ++r; r < o; ++f, ++r) l.points = [], c = { width: 0, height: 0, edgeLabel: l, edgeObj: t, rank: r }, a = si(e, "edge", c, "_d"), r === u && (c.width = l.width, c.height = l.height, c.dummy = "edge-label", c.labelpos = l.labelpos), e.setEdge(n, a, { weight: l.weight }, s), f === 0 && e.graph().dummyChains.push(a), n = a;
  e.setEdge(n, i, { weight: l.weight }, s);
}
function VI(e) {
  e.graph().dummyChains.forEach((t) => {
    let n = e.node(t), r = n.edgeLabel, i;
    for (e.setEdge(n.edgeObj, r); n.dummy; ) i = e.successors(t)[0], e.removeNode(t), r.points.push({ x: n.x, y: n.y }), n.dummy === "edge-label" && (r.x = n.x, r.y = n.y, r.width = n.width, r.height = n.height), t = i, n = e.node(t);
  });
}
function sf(e) {
  let t = {};
  function n(r) {
    let i = e.node(r);
    if (Object.hasOwn(t, r)) return i.rank;
    t[r] = !0;
    let o = e.outEdges(r), s = o ? o.map((u) => u == null ? Number.POSITIVE_INFINITY : n(u.w) - e.edge(u).minlen) : [], l = Kt(Math.min, s);
    return l === Number.POSITIVE_INFINITY && (l = 0), i.rank = l;
  }
  e.sources().forEach(n);
}
function ti(e, t) {
  return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen;
}
var Ky = WI;
function WI(e) {
  let t = new It({ directed: !1 }), n = e.nodes();
  if (n.length === 0) throw new Error("Graph must have at least one node");
  let r = n[0], i = e.nodeCount();
  t.setNode(r, {});
  let o, s;
  for (; YI(t, e) < i && (o = GI(t, e), !!o); ) s = t.hasNode(o.v) ? ti(e, o) : -ti(e, o), XI(t, e, s);
  return t;
}
function YI(e, t) {
  function n(r) {
    let i = t.nodeEdges(r);
    i && i.forEach((o) => {
      let s = o.v, l = r === s ? o.w : s;
      !e.hasNode(l) && !ti(t, o) && (e.setNode(l, {}), e.setEdge(r, l, {}), n(l));
    });
  }
  return e.nodes().forEach(n), e.nodeCount();
}
function GI(e, t) {
  return t.edges().reduce((n, r) => {
    let i = Number.POSITIVE_INFINITY;
    return e.hasNode(r.v) !== e.hasNode(r.w) && (i = ti(t, r)), i < n[0] ? [i, r] : n;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function XI(e, t, n) {
  e.nodes().forEach((r) => t.node(r).rank += n);
}
var { preorder: QI, postorder: KI } = rf, qI = hr;
hr.initLowLimValues = uf;
hr.initCutValues = lf;
hr.calcCutValue = qy;
hr.leaveEdge = Jy;
hr.enterEdge = ev;
hr.exchangeEdges = tv;
function hr(e) {
  e = SI(e), sf(e);
  let t = Ky(e);
  uf(t), lf(t, e);
  let n, r;
  for (; n = Jy(t); ) r = ev(t, e, n), tv(t, e, n, r);
}
function lf(e, t) {
  let n = KI(e, e.nodes());
  n = n.slice(0, n.length - 1), n.forEach((r) => ZI(e, t, r));
}
function ZI(e, t, n) {
  let r = e.node(n).parent, i = e.edge(n, r);
  i.cutvalue = qy(e, t, n);
}
function qy(e, t, n) {
  let r = e.node(n).parent, i = !0, o = t.edge(n, r), s = 0;
  o || (i = !1, o = t.edge(r, n)), s = o.weight;
  let l = t.nodeEdges(n);
  return l && l.forEach((u) => {
    let a = u.v === n, c = a ? u.w : u.v;
    if (c !== r) {
      let f = a === i, d = t.edge(u).weight;
      if (s += f ? d : -d, eP(e, n, c)) {
        let h = e.edge(n, c).cutvalue;
        s += f ? -h : h;
      }
    }
  }), s;
}
function uf(e, t) {
  arguments.length < 2 && (t = e.nodes()[0]), Zy(e, {}, 1, t);
}
function Zy(e, t, n, r, i) {
  let o = n, s = e.node(r);
  t[r] = !0;
  let l = e.neighbors(r);
  return l && l.forEach((u) => {
    Object.hasOwn(t, u) || (n = Zy(e, t, n, u, r));
  }), s.low = o, s.lim = n++, i ? s.parent = i : delete s.parent, n;
}
function Jy(e) {
  return e.edges().find((t) => e.edge(t).cutvalue < 0);
}
function ev(e, t, n) {
  let r = n.v, i = n.w;
  t.hasEdge(r, i) || (r = n.w, i = n.v);
  let o = e.node(r), s = e.node(i), l = o, u = !1;
  return o.lim > s.lim && (l = s, u = !0), t.edges().filter((a) => u === Hh(e, e.node(a.v), l) && u !== Hh(e, e.node(a.w), l)).reduce((a, c) => ti(t, c) < ti(t, a) ? c : a);
}
function tv(e, t, n, r) {
  let i = n.v, o = n.w;
  e.removeEdge(i, o), e.setEdge(r.v, r.w, {}), uf(e), lf(e, t), JI(e, t);
}
function JI(e, t) {
  let n = e.nodes().find((i) => !e.node(i).parent);
  if (!n) return;
  let r = QI(e, [n]);
  r = r.slice(1), r.forEach((i) => {
    let o = e.node(i).parent, s = t.edge(i, o), l = !1;
    s || (s = t.edge(o, i), l = !0), t.node(i).rank = t.node(o).rank + (l ? s.minlen : -s.minlen);
  });
}
function eP(e, t, n) {
  return e.hasEdge(t, n);
}
function Hh(e, t, n) {
  return n.low <= t.lim && t.lim <= n.lim;
}
var tP = nP;
function nP(e) {
  let t = e.graph().ranker;
  if (typeof t == "function") return t(e);
  switch (t) {
    case "network-simplex":
      Vh(e);
      break;
    case "tight-tree":
      iP(e);
      break;
    case "longest-path":
      rP(e);
      break;
    case "none":
      break;
    default:
      Vh(e);
  }
}
var rP = sf;
function iP(e) {
  sf(e), Ky(e);
}
function Vh(e) {
  qI(e);
}
var oP = sP;
function sP(e) {
  let t = uP(e);
  e.graph().dummyChains.forEach((n) => {
    let r = e.node(n), i = r.edgeObj, o = lP(e, t, i.v, i.w), s = o.path, l = o.lca, u = 0, a = s[u], c = !0;
    for (; n !== i.w; ) {
      if (r = e.node(n), c) {
        for (; (a = s[u]) !== l && e.node(a).maxRank < r.rank; ) u++;
        a === l && (c = !1);
      }
      if (!c) {
        for (; u < s.length - 1 && e.node(s[u + 1]).minRank <= r.rank; ) u++;
        a = s[u];
      }
      a !== void 0 && e.setParent(n, a), n = e.successors(n)[0];
    }
  });
}
function lP(e, t, n, r) {
  let i = [], o = [], s = Math.min(t[n].low, t[r].low), l = Math.max(t[n].lim, t[r].lim), u;
  u = n;
  do
    u = e.parent(u), i.push(u);
  while (u && (t[u].low > s || l > t[u].lim));
  let a = u, c = r;
  for (; (c = e.parent(c)) !== a; ) o.push(c);
  return { path: i.concat(o.reverse()), lca: a };
}
function uP(e) {
  let t = {}, n = 0;
  function r(i) {
    let o = n;
    e.children(i).forEach(r), t[i] = { low: o, lim: n++ };
  }
  return e.children(Ol).forEach(r), t;
}
function aP(e) {
  let t = si(e, "root", {}, "_root"), n = cP(e), r = Object.values(n), i = Kt(Math.max, r) - 1, o = 2 * i + 1;
  e.graph().nestingRoot = t, e.edges().forEach((l) => e.edge(l).minlen *= o);
  let s = fP(e) + 1;
  e.children(Ol).forEach((l) => nv(e, t, o, s, i, n, l)), e.graph().nodeRankFactor = o;
}
function nv(e, t, n, r, i, o, s) {
  var l;
  let u = e.children(s);
  if (!u.length) {
    s !== t && e.setEdge(t, s, { weight: 0, minlen: n });
    return;
  }
  let a = zh(e, "_bt"), c = zh(e, "_bb"), f = e.node(s);
  e.setParent(a, s), f.borderTop = a, e.setParent(c, s), f.borderBottom = c, u.forEach((d) => {
    var h;
    nv(e, t, n, r, i, o, d);
    let g = e.node(d), x = g.borderTop ? g.borderTop : d, E = g.borderBottom ? g.borderBottom : d, p = g.borderTop ? r : 2 * r, w = x !== E ? 1 : i - ((h = o[s]) != null ? h : 0) + 1;
    e.setEdge(a, x, { weight: p, minlen: w, nestingEdge: !0 }), e.setEdge(E, c, { weight: p, minlen: w, nestingEdge: !0 });
  }), e.parent(s) || e.setEdge(t, a, { weight: 0, minlen: i + ((l = o[s]) != null ? l : 0) });
}
function cP(e) {
  let t = {};
  function n(r, i) {
    let o = e.children(r);
    o && o.length && o.forEach((s) => n(s, i + 1)), t[r] = i;
  }
  return e.children(Ol).forEach((r) => n(r, 1)), t;
}
function fP(e) {
  return e.edges().reduce((t, n) => t + e.edge(n).weight, 0);
}
function dP(e) {
  let t = e.graph();
  e.removeNode(t.nestingRoot), delete t.nestingRoot, e.edges().forEach((n) => {
    e.edge(n).nestingEdge && e.removeEdge(n);
  });
}
var hP = pP;
function pP(e) {
  function t(n) {
    let r = e.children(n), i = e.node(n);
    if (r.length && r.forEach(t), Object.hasOwn(i, "minRank")) {
      i.borderLeft = [], i.borderRight = [];
      for (let o = i.minRank, s = i.maxRank + 1; o < s; ++o) Wh(e, "borderLeft", "_bl", n, i, o), Wh(e, "borderRight", "_br", n, i, o);
    }
  }
  e.children(Ol).forEach(t);
}
function Wh(e, t, n, r, i, o) {
  let s = { width: 0, height: 0, rank: o, borderType: t }, l = i[t][o - 1], u = si(e, "border", s, n);
  i[t][o] = u, e.setParent(u, r), l && e.setEdge(l, u, { weight: 1 });
}
function gP(e) {
  var t;
  let n = (t = e.graph().rankdir) == null ? void 0 : t.toLowerCase();
  (n === "lr" || n === "rl") && rv(e);
}
function mP(e) {
  var t;
  let n = (t = e.graph().rankdir) == null ? void 0 : t.toLowerCase();
  (n === "bt" || n === "rl") && yP(e), (n === "lr" || n === "rl") && (vP(e), rv(e));
}
function rv(e) {
  e.nodes().forEach((t) => Yh(e.node(t))), e.edges().forEach((t) => Yh(e.edge(t)));
}
function Yh(e) {
  let t = e.width;
  e.width = e.height, e.height = t;
}
function yP(e) {
  e.nodes().forEach((t) => Nu(e.node(t))), e.edges().forEach((t) => {
    var n;
    let r = e.edge(t);
    (n = r.points) == null || n.forEach(Nu), Object.hasOwn(r, "y") && Nu(r);
  });
}
function Nu(e) {
  e.y = -e.y;
}
function vP(e) {
  e.nodes().forEach((t) => bu(e.node(t))), e.edges().forEach((t) => {
    var n;
    let r = e.edge(t);
    (n = r.points) == null || n.forEach(bu), Object.hasOwn(r, "x") && bu(r);
  });
}
function bu(e) {
  let t = e.x;
  e.x = e.y, e.y = t;
}
function wP(e) {
  let t = {}, n = e.nodes().filter((l) => !e.children(l).length), r = n.map((l) => e.node(l).rank), i = Kt(Math.max, r), o = fo(i + 1).map(() => []);
  function s(l) {
    if (t[l]) return;
    t[l] = !0;
    let u = e.node(l);
    o[u.rank].push(l);
    let a = e.successors(l);
    a && a.forEach(s);
  }
  return n.sort((l, u) => e.node(l).rank - e.node(u).rank).forEach(s), o;
}
function xP(e, t) {
  let n = 0;
  for (let r = 1; r < t.length; ++r) n += _P(e, t[r - 1], t[r]);
  return n;
}
function _P(e, t, n) {
  let r = PI(n, n.map((a, c) => c)), i = t.flatMap((a) => {
    let c = e.outEdges(a);
    return c ? c.map((f) => ({ pos: r[f.w], weight: e.edge(f).weight })).sort((f, d) => f.pos - d.pos) : [];
  }), o = 1;
  for (; o < n.length; ) o <<= 1;
  let s = 2 * o - 1;
  o -= 1;
  let l = new Array(s).fill(0), u = 0;
  return i.forEach((a) => {
    let c = a.pos + o;
    l[c] += a.weight;
    let f = 0;
    for (; c > 0; ) c % 2 && (f += l[c + 1]), c = c - 1 >> 1, l[c] += a.weight;
    u += a.weight * f;
  }), u;
}
function EP(e, t = []) {
  return t.map((n) => {
    let r = e.inEdges(n);
    if (!r || !r.length) return { v: n };
    {
      let i = r.reduce((o, s) => {
        let l = e.edge(s), u = e.node(s.v);
        return { sum: o.sum + l.weight * u.order, weight: o.weight + l.weight };
      }, { sum: 0, weight: 0 });
      return { v: n, barycenter: i.sum / i.weight, weight: i.weight };
    }
  });
}
function SP(e, t) {
  let n = {};
  e.forEach((i, o) => {
    let s = { indegree: 0, in: [], out: [], vs: [i.v], i: o };
    i.barycenter !== void 0 && (s.barycenter = i.barycenter, s.weight = i.weight), n[i.v] = s;
  }), t.edges().forEach((i) => {
    let o = n[i.v], s = n[i.w];
    o !== void 0 && s !== void 0 && (s.indegree++, o.out.push(s));
  });
  let r = Object.values(n).filter((i) => !i.indegree);
  return kP(r);
}
function kP(e) {
  let t = [];
  function n(i) {
    return (o) => {
      o.merged || (o.barycenter === void 0 || i.barycenter === void 0 || o.barycenter >= i.barycenter) && NP(i, o);
    };
  }
  function r(i) {
    return (o) => {
      o.in.push(i), --o.indegree === 0 && e.push(o);
    };
  }
  for (; e.length; ) {
    let i = e.pop();
    t.push(i), i.in.reverse().forEach(n(i)), i.out.forEach(r(i));
  }
  return t.filter((i) => !i.merged).map((i) => il(i, ["vs", "i", "barycenter", "weight"]));
}
function NP(e, t) {
  let n = 0, r = 0;
  e.weight && (n += e.barycenter * e.weight, r += e.weight), t.weight && (n += t.barycenter * t.weight, r += t.weight), e.vs = t.vs.concat(e.vs), e.barycenter = n / r, e.weight = r, e.i = Math.min(t.i, e.i), t.merged = !0;
}
function bP(e, t) {
  let n = CI(e, (c) => Object.hasOwn(c, "barycenter")), r = n.lhs, i = n.rhs.sort((c, f) => f.i - c.i), o = [], s = 0, l = 0, u = 0;
  r.sort(CP(!!t)), u = Gh(o, i, u), r.forEach((c) => {
    u += c.vs.length, o.push(c.vs), s += c.barycenter * c.weight, l += c.weight, u = Gh(o, i, u);
  });
  let a = { vs: o.flat(1) };
  return l && (a.barycenter = s / l, a.weight = l), a;
}
function Gh(e, t, n) {
  let r;
  for (; t.length && (r = t[t.length - 1]).i <= n; ) t.pop(), e.push(r.vs), n++;
  return n;
}
function CP(e) {
  return (t, n) => t.barycenter < n.barycenter ? -1 : t.barycenter > n.barycenter ? 1 : e ? n.i - t.i : t.i - n.i;
}
function iv(e, t, n, r) {
  let i = e.children(t), o = e.node(t), s = o ? o.borderLeft : void 0, l = o ? o.borderRight : void 0, u = {};
  s && (i = i.filter((d) => d !== s && d !== l));
  let a = EP(e, i);
  a.forEach((d) => {
    if (e.children(d.v).length) {
      let h = iv(e, d.v, n, r);
      u[d.v] = h, Object.hasOwn(h, "barycenter") && PP(d, h);
    }
  });
  let c = SP(a, n);
  IP(c, u);
  let f = bP(c, r);
  if (s && l) {
    f.vs = [s, f.vs, l].flat(1);
    let d = e.predecessors(s);
    if (d && d.length) {
      let h = e.node(d[0]), g = e.predecessors(l), x = e.node(g[0]);
      Object.hasOwn(f, "barycenter") || (f.barycenter = 0, f.weight = 0), f.barycenter = (f.barycenter * f.weight + h.order + x.order) / (f.weight + 2), f.weight += 2;
    }
  }
  return f;
}
function IP(e, t) {
  e.forEach((n) => {
    n.vs = n.vs.flatMap((r) => t[r] ? t[r].vs : r);
  });
}
function PP(e, t) {
  e.barycenter !== void 0 ? (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight), e.weight += t.weight) : (e.barycenter = t.barycenter, e.weight = t.weight);
}
function MP(e, t, n, r) {
  r || (r = e.nodes());
  let i = TP(e), o = new It({ compound: !0 }).setGraph({ root: i }).setDefaultNodeLabel((s) => e.node(s));
  return r.forEach((s) => {
    let l = e.node(s), u = e.parent(s);
    if (l.rank === t || l.minRank <= t && t <= l.maxRank) {
      o.setNode(s), o.setParent(s, u || i);
      let a = e[n](s);
      a && a.forEach((c) => {
        let f = c.v === s ? c.w : c.v, d = o.edge(f, s), h = d !== void 0 ? d.weight : 0;
        o.setEdge(f, s, { weight: e.edge(c).weight + h });
      }), Object.hasOwn(l, "minRank") && o.setNode(s, { borderLeft: l.borderLeft[t], borderRight: l.borderRight[t] });
    }
  }), o;
}
function TP(e) {
  let t;
  for (; e.hasNode(t = of("_root")); ) ;
  return t;
}
function LP(e, t, n) {
  let r = {}, i;
  n.forEach((o) => {
    let s = e.parent(o), l, u;
    for (; s; ) {
      if (l = e.parent(s), l ? (u = r[l], r[l] = s) : (u = i, i = s), u && u !== s) {
        t.setEdge(u, s);
        return;
      }
      s = l;
    }
  });
}
function ov(e, t = {}) {
  if (typeof t.customOrder == "function") {
    t.customOrder(e, ov);
    return;
  }
  let n = Gy(e), r = Xh(e, fo(1, n + 1), "inEdges"), i = Xh(e, fo(n - 1, -1, -1), "outEdges"), o = wP(e);
  if (Qh(e, o), t.disableOptimalOrderHeuristic) return;
  let s = Number.POSITIVE_INFINITY, l, u = t.constraints || [];
  for (let a = 0, c = 0; c < 4; ++a, ++c) {
    $P(a % 2 ? r : i, a % 4 >= 2, u), o = bo(e);
    let f = xP(e, o);
    f < s ? (c = 0, l = Object.assign({}, o), s = f) : f === s && (l = structuredClone(o));
  }
  Qh(e, l);
}
function Xh(e, t, n) {
  let r = /* @__PURE__ */ new Map(), i = (o, s) => {
    r.has(o) || r.set(o, []), r.get(o).push(s);
  };
  for (let o of e.nodes()) {
    let s = e.node(o);
    if (typeof s.rank == "number" && i(s.rank, o), typeof s.minRank == "number" && typeof s.maxRank == "number") for (let l = s.minRank; l <= s.maxRank; l++) l !== s.rank && i(l, o);
  }
  return t.map(function(o) {
    return MP(e, o, n, r.get(o) || []);
  });
}
function $P(e, t, n) {
  let r = new It();
  e.forEach(function(i) {
    n.forEach((l) => r.setEdge(l.left, l.right));
    let o = i.graph().root, s = iv(i, o, r, t);
    s.vs.forEach((l, u) => i.node(l).order = u), LP(i, r, s.vs);
  });
}
function Qh(e, t) {
  Object.values(t).forEach((n) => n.forEach((r, i) => e.node(r).order = i));
}
function jP(e, t) {
  let n = {};
  function r(i, o) {
    let s = 0, l = 0, u = i.length, a = o[o.length - 1];
    return o.forEach((c, f) => {
      let d = AP(e, c), h = d ? e.node(d).order : u;
      (d || c === a) && (o.slice(l, f + 1).forEach((g) => {
        let x = e.predecessors(g);
        x && x.forEach((E) => {
          let p = e.node(E), w = p.order;
          (w < s || h < w) && !(p.dummy && e.node(g).dummy) && sv(n, E, g);
        });
      }), l = f + 1, s = h);
    }), o;
  }
  return t.length && t.reduce(r), n;
}
function RP(e, t) {
  let n = {};
  function r(o, s, l, u, a) {
    fo(s, l).forEach((c) => {
      let f = o[c];
      if (f !== void 0 && e.node(f).dummy) {
        let d = e.predecessors(f);
        d && d.forEach((h) => {
          if (h === void 0) return;
          let g = e.node(h);
          g.dummy && (g.order < u || g.order > a) && sv(n, h, f);
        });
      }
    });
  }
  function i(o, s) {
    let l = -1, u = -1, a = 0;
    return s.forEach((c, f) => {
      if (e.node(c).dummy === "border") {
        let d = e.predecessors(c);
        if (d && d.length) {
          let h = d[0];
          if (h === void 0) return;
          u = e.node(h).order, r(s, a, f, l, u), a = f, l = u;
        }
      }
      r(s, a, s.length, u, o.length);
    }), s;
  }
  return t.length && t.reduce(i), n;
}
function AP(e, t) {
  if (e.node(t).dummy) {
    let n = e.predecessors(t);
    if (n) return n.find((r) => e.node(r).dummy);
  }
}
function sv(e, t, n) {
  if (t > n) {
    let i = t;
    t = n, n = i;
  }
  let r = e[t];
  r || (e[t] = r = {}), r[n] = !0;
}
function OP(e, t, n) {
  if (t > n) {
    let i = t;
    t = n, n = i;
  }
  let r = e[t];
  return r !== void 0 && Object.hasOwn(r, n);
}
function BP(e, t, n, r) {
  let i = {}, o = {}, s = {};
  return t.forEach((l) => {
    l.forEach((u, a) => {
      i[u] = u, o[u] = u, s[u] = a;
    });
  }), t.forEach((l) => {
    let u = -1;
    l.forEach((a) => {
      let c = r(a);
      if (c && c.length) {
        let f = c.sort((h, g) => {
          let x = s[h], E = s[g];
          return (x !== void 0 ? x : 0) - (E !== void 0 ? E : 0);
        }), d = (f.length - 1) / 2;
        for (let h = Math.floor(d), g = Math.ceil(d); h <= g; ++h) {
          let x = f[h];
          if (x === void 0) continue;
          let E = s[x];
          if (E !== void 0 && o[a] === a && u < E && !OP(n, a, x)) {
            let p = i[x];
            p !== void 0 && (o[x] = a, o[a] = i[a] = p, u = E);
          }
        }
      }
    });
  }), { root: i, align: o };
}
function FP(e, t, n, r, i = !1) {
  let o = {}, s = DP(e, t, n, i), l = i ? "borderLeft" : "borderRight";
  function u(h, g) {
    let x = s.nodes().slice(), E = {}, p = x.pop();
    for (; p; ) {
      if (E[p]) h(p);
      else {
        E[p] = !0, x.push(p);
        for (let w of g(p)) x.push(w);
      }
      p = x.pop();
    }
  }
  function a(h) {
    let g = s.inEdges(h);
    g ? o[h] = g.reduce((x, E) => {
      var p;
      let w = (p = o[E.v]) != null ? p : 0, v = s.edge(E);
      return Math.max(x, w + (v !== void 0 ? v : 0));
    }, 0) : o[h] = 0;
  }
  function c(h) {
    let g = s.outEdges(h), x = Number.POSITIVE_INFINITY;
    g && (x = g.reduce((p, w) => {
      let v = o[w.w], _ = s.edge(w);
      return Math.min(p, (v !== void 0 ? v : 0) - (_ !== void 0 ? _ : 0));
    }, Number.POSITIVE_INFINITY));
    let E = e.node(h);
    x !== Number.POSITIVE_INFINITY && E.borderType !== l && (o[h] = Math.max(o[h] !== void 0 ? o[h] : 0, x));
  }
  function f(h) {
    return s.predecessors(h) || [];
  }
  function d(h) {
    return s.successors(h) || [];
  }
  return u(a, f), u(c, d), Object.keys(r).forEach((h) => {
    var g;
    let x = n[h];
    x !== void 0 && (o[h] = (g = o[x]) != null ? g : 0);
  }), o;
}
function DP(e, t, n, r) {
  let i = new It(), o = e.graph(), s = WP(o.nodesep, o.edgesep, r);
  return t.forEach((l) => {
    let u;
    l.forEach((a) => {
      let c = n[a];
      if (c !== void 0) {
        if (i.setNode(c), u !== void 0) {
          let f = n[u];
          if (f !== void 0) {
            let d = i.edge(f, c);
            i.setEdge(f, c, Math.max(s(e, a, u), d || 0));
          }
        }
        u = a;
      }
    });
  }), i;
}
function zP(e, t) {
  return Object.values(t).reduce((n, r) => {
    let i = Number.NEGATIVE_INFINITY, o = Number.POSITIVE_INFINITY;
    Object.entries(r).forEach(([l, u]) => {
      let a = YP(e, l) / 2;
      i = Math.max(u + a, i), o = Math.min(u - a, o);
    });
    let s = i - o;
    return s < n[0] && (n = [s, r]), n;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function UP(e, t) {
  let n = Object.values(t), r = Kt(Math.min, n), i = Kt(Math.max, n);
  ["u", "d"].forEach((o) => {
    ["l", "r"].forEach((s) => {
      let l = o + s, u = e[l];
      if (!u || u === t) return;
      let a = Object.values(u), c = r - Kt(Math.min, a);
      s !== "l" && (c = i - Kt(Math.max, a)), c && (e[l] = Al(u, (f) => f + c));
    });
  });
}
function HP(e, t = void 0) {
  let n = e.ul;
  return n ? Al(n, (r, i) => {
    var o, s;
    if (t) {
      let u = t.toLowerCase(), a = e[u];
      if (a && a[i] !== void 0) return a[i];
    }
    let l = Object.values(e).map((u) => {
      let a = u[i];
      return a !== void 0 ? a : 0;
    }).sort((u, a) => u - a);
    return (((o = l[1]) != null ? o : 0) + ((s = l[2]) != null ? s : 0)) / 2;
  }) : {};
}
function VP(e) {
  let t = bo(e), n = Object.assign(jP(e, t), RP(e, t)), r = {}, i;
  ["u", "d"].forEach((s) => {
    i = s === "u" ? t : Object.values(t).reverse(), ["l", "r"].forEach((l) => {
      l === "r" && (i = i.map((c) => Object.values(c).reverse()));
      let u = BP(e, i, n, (c) => (s === "u" ? e.predecessors(c) : e.successors(c)) || []), a = FP(e, i, u.root, u.align, l === "r");
      l === "r" && (a = Al(a, (c) => -c)), r[s + l] = a;
    });
  });
  let o = zP(e, r);
  return UP(r, o), HP(r, e.graph().align);
}
function WP(e, t, n) {
  return (r, i, o) => {
    let s = r.node(i), l = r.node(o), u = 0, a;
    if (u += s.width / 2, Object.hasOwn(s, "labelpos")) switch (s.labelpos.toLowerCase()) {
      case "l":
        a = -s.width / 2;
        break;
      case "r":
        a = s.width / 2;
        break;
    }
    if (a && (u += n ? a : -a), a = void 0, u += (s.dummy ? t : e) / 2, u += (l.dummy ? t : e) / 2, u += l.width / 2, Object.hasOwn(l, "labelpos")) switch (l.labelpos.toLowerCase()) {
      case "l":
        a = l.width / 2;
        break;
      case "r":
        a = -l.width / 2;
        break;
    }
    return a && (u += n ? a : -a), u;
  };
}
function YP(e, t) {
  return e.node(t).width;
}
function GP(e) {
  e = Wy(e), XP(e), Object.entries(VP(e)).forEach(([t, n]) => e.node(t).x = n);
}
function XP(e) {
  let t = bo(e), n = e.graph(), r = n.ranksep, i = n.rankalign, o = 0;
  t.forEach((s) => {
    let l = s.reduce((u, a) => {
      var c;
      let f = (c = e.node(a).height) != null ? c : 0;
      return u > f ? u : f;
    }, 0);
    s.forEach((u) => {
      let a = e.node(u);
      i === "top" ? a.y = o + a.height / 2 : i === "bottom" ? a.y = o + l - a.height / 2 : a.y = o + l / 2;
    }), o += l + r;
  });
}
function QP(e, t = {}) {
  let n = t.debugTiming ? Xy : Qy;
  return n("layout", () => {
    let r = n("  buildLayoutGraph", () => o3(e));
    return n("  runLayout", () => KP(r, n, t)), n("  updateInputGraph", () => qP(e, r)), r;
  });
}
function KP(e, t, n) {
  t("    makeSpaceForEdgeLabels", () => s3(e)), t("    removeSelfEdges", () => g3(e)), t("    acyclic", () => FI(e)), t("    nestingGraph.run", () => aP(e)), t("    rank", () => tP(Wy(e))), t("    injectEdgeLabelProxies", () => l3(e)), t("    removeEmptyRanks", () => NI(e)), t("    nestingGraph.cleanup", () => dP(e)), t("    normalizeRanks", () => kI(e)), t("    assignRankMinMax", () => u3(e)), t("    removeEdgeLabelProxies", () => a3(e)), t("    normalize.run", () => UI(e)), t("    parentDummyChains", () => oP(e)), t("    addBorderSegments", () => hP(e)), t("    order", () => ov(e, n)), t("    insertSelfEdges", () => m3(e)), t("    adjustCoordinateSystem", () => gP(e)), t("    position", () => GP(e)), t("    positionSelfEdges", () => y3(e)), t("    removeBorderNodes", () => p3(e)), t("    normalize.undo", () => VI(e)), t("    fixupEdgeLabelCoords", () => d3(e)), t("    undoCoordinateSystem", () => mP(e)), t("    translateGraph", () => c3(e)), t("    assignNodeIntersects", () => f3(e)), t("    reversePoints", () => h3(e)), t("    acyclic.undo", () => zI(e));
}
function qP(e, t) {
  e.nodes().forEach((n) => {
    let r = e.node(n), i = t.node(n);
    r && (r.x = i.x, r.y = i.y, r.order = i.order, r.rank = i.rank, t.children(n).length && (r.width = i.width, r.height = i.height));
  }), e.edges().forEach((n) => {
    let r = e.edge(n), i = t.edge(n);
    r.points = i.points, Object.hasOwn(i, "x") && (r.x = i.x, r.y = i.y);
  }), e.graph().width = t.graph().width, e.graph().height = t.graph().height;
}
var ZP = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], JP = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "TB", rankalign: "center" }, e3 = ["acyclicer", "ranker", "rankdir", "align", "rankalign"], t3 = ["width", "height", "rank"], Kh = { width: 0, height: 0 }, n3 = ["minlen", "weight", "width", "height", "labeloffset"], r3 = { minlen: 1, weight: 1, width: 0, height: 0, labeloffset: 10, labelpos: "r" }, i3 = ["labelpos"];
function o3(e) {
  let t = new It({ multigraph: !0, compound: !0 }), n = Iu(e.graph());
  return t.setGraph(Object.assign({}, JP, Cu(n, ZP), il(n, e3))), e.nodes().forEach((r) => {
    let i = Iu(e.node(r)), o = Cu(i, t3);
    Object.keys(Kh).forEach((l) => {
      o[l] === void 0 && (o[l] = Kh[l]);
    }), t.setNode(r, o);
    let s = e.parent(r);
    s !== void 0 && t.setParent(r, s);
  }), e.edges().forEach((r) => {
    let i = Iu(e.edge(r));
    t.setEdge(r, Object.assign({}, r3, Cu(i, n3), il(i, i3)));
  }), t;
}
function s3(e) {
  let t = e.graph();
  t.ranksep /= 2, e.edges().forEach((n) => {
    let r = e.edge(n);
    r.minlen *= 2, r.labelpos.toLowerCase() !== "c" && (t.rankdir === "TB" || t.rankdir === "BT" ? r.width += r.labeloffset : r.height += r.labeloffset);
  });
}
function l3(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.width && n.height) {
      let r = e.node(t.v), i = { rank: (e.node(t.w).rank - r.rank) / 2 + r.rank, e: t };
      si(e, "edge-proxy", i, "_ep");
    }
  });
}
function u3(e) {
  let t = 0;
  e.nodes().forEach((n) => {
    let r = e.node(n);
    r.borderTop && (r.minRank = e.node(r.borderTop).rank, r.maxRank = e.node(r.borderBottom).rank, t = Math.max(t, r.maxRank));
  }), e.graph().maxRank = t;
}
function a3(e) {
  e.nodes().forEach((t) => {
    let n = e.node(t);
    if (n.dummy === "edge-proxy") {
      let r = n;
      e.edge(r.e).labelRank = n.rank, e.removeNode(t);
    }
  });
}
function c3(e) {
  let t = Number.POSITIVE_INFINITY, n = 0, r = Number.POSITIVE_INFINITY, i = 0, o = e.graph(), s = o.marginx || 0, l = o.marginy || 0;
  function u(a) {
    let c = a.x, f = a.y, d = a.width, h = a.height;
    t = Math.min(t, c - d / 2), n = Math.max(n, c + d / 2), r = Math.min(r, f - h / 2), i = Math.max(i, f + h / 2);
  }
  e.nodes().forEach((a) => u(e.node(a))), e.edges().forEach((a) => {
    let c = e.edge(a);
    Object.hasOwn(c, "x") && u(c);
  }), t -= s, r -= l, e.nodes().forEach((a) => {
    let c = e.node(a);
    c.x -= t, c.y -= r;
  }), e.edges().forEach((a) => {
    let c = e.edge(a);
    c.points.forEach((f) => {
      f.x -= t, f.y -= r;
    }), Object.hasOwn(c, "x") && (c.x -= t), Object.hasOwn(c, "y") && (c.y -= r);
  }), o.width = n - t + s, o.height = i - r + l;
}
function f3(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t), r = e.node(t.v), i = e.node(t.w), o, s;
    n.points ? (o = n.points[0], s = n.points[n.points.length - 1]) : (n.points = [], o = i, s = r), n.points.unshift(Dh(r, o)), n.points.push(Dh(i, s));
  });
}
function d3(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (Object.hasOwn(n, "x")) switch ((n.labelpos === "l" || n.labelpos === "r") && (n.width -= n.labeloffset), n.labelpos) {
      case "l":
        n.x -= n.width / 2 + n.labeloffset;
        break;
      case "r":
        n.x += n.width / 2 + n.labeloffset;
        break;
    }
  });
}
function h3(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    n.reversed && n.points.reverse();
  });
}
function p3(e) {
  e.nodes().forEach((t) => {
    if (e.children(t).length) {
      let n = e.node(t), r = e.node(n.borderTop), i = e.node(n.borderBottom), o = e.node(n.borderLeft[n.borderLeft.length - 1]), s = e.node(n.borderRight[n.borderRight.length - 1]);
      n.width = Math.abs(s.x - o.x), n.height = Math.abs(i.y - r.y), n.x = o.x + n.width / 2, n.y = r.y + n.height / 2;
    }
  }), e.nodes().forEach((t) => {
    e.node(t).dummy === "border" && e.removeNode(t);
  });
}
function g3(e) {
  e.edges().forEach((t) => {
    if (t.v === t.w) {
      let n = e.node(t.v);
      n.selfEdges || (n.selfEdges = []), n.selfEdges.push({ e: t, label: e.edge(t) }), e.removeEdge(t);
    }
  });
}
function m3(e) {
  bo(e).forEach((t) => {
    let n = 0;
    t.forEach((r, i) => {
      let o = e.node(r);
      o.order = i + n, (o.selfEdges || []).forEach((s) => {
        si(e, "selfedge", { width: s.label.width, height: s.label.height, rank: o.rank, order: i + ++n, e: s.e, label: s.label }, "_se");
      }), delete o.selfEdges;
    });
  });
}
function y3(e) {
  e.nodes().forEach((t) => {
    let n = e.node(t);
    if (n.dummy === "selfedge") {
      let r = n, i = e.node(r.e.v), o = i.x + i.width / 2, s = i.y, l = n.x - o, u = i.height / 2;
      e.setEdge(r.e, r.label), e.removeNode(t), r.label.points = [{ x: o + 2 * l / 3, y: s - u }, { x: o + 5 * l / 6, y: s - u }, { x: o + l, y: s }, { x: o + 5 * l / 6, y: s + u }, { x: o + 2 * l / 3, y: s + u }], r.label.x = n.x, r.label.y = n.y;
    }
  });
}
function Cu(e, t) {
  return Al(il(e, t), Number);
}
function Iu(e) {
  let t = {};
  return e && Object.entries(e).forEach(([n, r]) => {
    typeof n == "string" && (n = n.toLowerCase()), t[n] = r;
  }), t;
}
function v3(e) {
  let t = bo(e), n = new It({ compound: !0, multigraph: !0 }).setGraph({});
  return e.nodes().forEach((r) => {
    n.setNode(r, { label: r }), n.setParent(r, "layer" + e.node(r).rank);
  }), e.edges().forEach((r) => n.setEdge(r.v, r.w, {}, r.name)), t.forEach((r, i) => {
    let o = "layer" + i;
    n.setNode(o, { rank: "same" }), r.reduce((s, l) => (n.setEdge(s, l, { style: "invis" }), l));
  }), n;
}
var w3 = { graphlib: Ay, version: MI, layout: QP, debug: v3, util: { time: Xy, notime: Qy } }, qh = w3;
/*! For license information please see dagre.esm.js.LEGAL.txt */
const x3 = 200, Zh = 56, _3 = 18, E3 = 8, Jh = 60, S3 = 1600, ep = 14, k3 = 8, tp = 70, np = 130, N3 = 6, b3 = 40;
function C3(e) {
  const t = Math.min(Math.ceil(e / 2), E3);
  return Math.max(Zh, Zh + t * _3);
}
function Ua(e, t) {
  return e.type === "connectionJunction" ? { width: ep, height: ep } : { width: x3, height: C3(t(e)) };
}
function I3(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const s of e) n.set(s.id, []);
  for (const s of t)
    !n.has(s.source) || !n.has(s.target) || (n.get(s.source).push(s.target), n.get(s.target).push(s.source));
  const r = new Map(e.map((s) => [s.id, s])), i = /* @__PURE__ */ new Set(), o = [];
  for (const s of e) {
    if (i.has(s.id)) continue;
    const l = [], u = [s.id];
    for (i.add(s.id); u.length > 0; ) {
      const a = u.pop();
      l.push(r.get(a));
      for (const c of n.get(a) ?? [])
        i.has(c) || (i.add(c), u.push(c));
    }
    o.push(l);
  }
  return o;
}
function P3(e) {
  let t = e;
  return () => {
    t |= 0, t = t + 1831565813 | 0;
    let n = Math.imul(t ^ t >>> 15, 1 | t);
    return n = n + Math.imul(n ^ n >>> 7, 61 | n) ^ n, ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
}
function rp(e, t) {
  const n = e.slice();
  for (let r = n.length - 1; r > 0; r--) {
    const i = Math.floor(t() * (r + 1));
    [n[r], n[i]] = [n[i], n[r]];
  }
  return n;
}
function M3(e, t, n, r) {
  const i = (o, s, l) => (l[1] - o[1]) * (s[0] - o[0]) > (s[1] - o[1]) * (l[0] - o[0]);
  return i(e, n, r) !== i(t, n, r) && i(e, t, n) !== i(e, t, r);
}
function ip(e, t) {
  const n = [];
  for (const i of e) {
    const o = t.node(i.source), s = t.node(i.target);
    n.push([[o.x, o.y], [s.x, s.y]]);
  }
  let r = 0;
  for (let i = 0; i < n.length; i++)
    for (let o = i + 1; o < n.length; o++) {
      const s = e[i], l = e[o];
      s.source === l.source || s.source === l.target || s.target === l.source || s.target === l.target || M3(n[i][0], n[i][1], n[o][0], n[o][1]) && r++;
    }
  return r;
}
function Pu(e, t, n, r, i, o) {
  const s = new qh.graphlib.Graph();
  s.setDefaultEdgeLabel(() => ({})), s.setGraph({ rankdir: r, nodesep: i, ranksep: o });
  for (const l of e)
    s.setNode(l.id, Ua(l, n));
  for (const l of t) s.setEdge(l.source, l.target);
  return qh.layout(s), s;
}
function T3(e, t, n, r) {
  const i = new Set(e.map((x) => x.id)), o = t.filter((x) => i.has(x.source) && i.has(x.target));
  if (e.length === 1) {
    const { width: x, height: E } = Ua(e[0], n);
    return { nodes: [{ ...e[0], position: { x: 0, y: 0 }, style: { ...e[0].style, width: x, height: E } }], width: x, height: E };
  }
  let s;
  if (e.length < k3)
    s = Pu(e, o, n, r, 40, 110);
  else {
    const x = P3(49734321), E = Math.max(
      N3,
      Math.min(b3, Math.round(6e3 / (e.length + o.length + 1)))
    );
    s = Pu(e, o, n, r, tp, np);
    let p = ip(o, s);
    for (let w = 0; w < E && p > 0; w++) {
      const v = Pu(
        rp(e, x),
        rp(o, x),
        n,
        r,
        tp,
        np
      ), _ = ip(o, v);
      _ < p && (s = v, p = _);
    }
  }
  let l = 1 / 0, u = 1 / 0, a = -1 / 0, c = -1 / 0;
  const f = e.map((x) => {
    const E = s.node(x.id), { width: p, height: w } = Ua(x, n), v = E.x - p / 2, _ = E.y - w / 2;
    return l = Math.min(l, v), u = Math.min(u, _), a = Math.max(a, v + p), c = Math.max(c, _ + w), { ...x, position: { x: v, y: _ }, style: { ...x.style, width: p, height: w } };
  }), d = a - l, h = c - u;
  return { nodes: f.map((x) => ({ ...x, position: { x: x.position.x - l, y: x.position.y - u } })), width: d, height: h };
}
function L3(e, t, n, r = "LR") {
  const i = I3(e, t).map((a) => T3(a, t, n, r)).sort((a, c) => c.height - a.height), o = [];
  let s = 0, l = 0, u = 0;
  for (const a of i) {
    s > 0 && s + a.width > S3 && (s = 0, l += u + Jh, u = 0);
    for (const c of a.nodes)
      o.push({ ...c, position: { x: c.position.x + s, y: c.position.y + l } });
    s += a.width + Jh, u = Math.max(u, a.height);
  }
  return o;
}
const op = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", sp = `${nC}label`, lv = /* @__PURE__ */ new Set();
function $3(e, t, n) {
  var o, s, l;
  const r = /* @__PURE__ */ new Set(), i = (u) => {
    u && r.add(u);
  };
  for (const u of /* @__PURE__ */ new Set([...t, ...n])) {
    i(u);
    const a = e.nodes.get(u);
    if (a) {
      for (const c of a.connectionPoints)
        i(c), (o = e.connectionPoints.get(c)) == null || o.mapsTo.forEach(i);
      for (const c of a.properties)
        i(c), (s = e.properties.get(c)) == null || s.mapsTo.forEach(i);
      a.groupMemberships.forEach(i);
      for (const c of a.instrumentationLinks) i(c.targetUri);
    }
  }
  for (const u of nf(e, t))
    for (const a of u.raw) {
      i(a.hubUri), i(a.fromCPUri), i(a.toCPUri), i(a.fromEquipmentUri), i(a.toEquipmentUri);
      for (const c of a.properties)
        i(c), (l = e.properties.get(c)) == null || l.mapsTo.forEach(i);
    }
  return r;
}
function lp(e, t, n, r = lv) {
  var f;
  const i = $3(t, n, r), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), u = [], a = /* @__PURE__ */ new Set();
  for (const d of i) {
    const h = e.nodes.get(d);
    if (h) {
      o.set(d, { uri: d, label: h.label }), h.types.length > 0 && l.set(op, { uri: op, label: "type" });
      for (const g of h.types)
        s.has(g) || s.set(g, { uri: g, label: ((f = e.nodes.get(g)) == null ? void 0 : f.label) ?? ht(g) });
      if (h.label && h.label !== h.localName) {
        const g = `${d}::${sp}::${h.label}`;
        a.has(g) || (a.add(g), u.push({ subjectUri: d, subjectLabel: h.label, predicate: sp, predicateLabel: "label", value: h.label }));
      }
      for (const g of h.properties)
        if (g.isLiteral) {
          const x = `${d}::${g.predicate}::${g.object}::${g.datatype ?? ""}::${g.language ?? ""}`;
          if (a.has(x)) continue;
          a.add(x), u.push({
            subjectUri: d,
            subjectLabel: h.label,
            predicate: g.predicate,
            predicateLabel: ht(g.predicate),
            value: g.object,
            datatype: g.datatype,
            language: g.language
          });
        } else l.has(g.predicate) || l.set(g.predicate, { uri: g.predicate, label: ht(g.predicate) });
    }
  }
  const c = (d, h) => d.label.localeCompare(h.label);
  return {
    instances: [...o.values()].sort(c),
    classes: [...s.values()].sort(c),
    predicates: [...l.values()].sort(c),
    literals: u.sort((d, h) => d.subjectLabel.localeCompare(h.subjectLabel) || d.predicateLabel.localeCompare(h.predicateLabel))
  };
}
function Mu(e, t) {
  return { key: `${e}::${t.uri}`, kind: e, label: t.label, uri: t.uri };
}
function j3(e) {
  return {
    key: `literal::${e.subjectUri}::${e.predicate}::${e.value}::${e.datatype ?? ""}::${e.language ?? ""}`,
    kind: "literal",
    label: `${e.subjectLabel} · ${e.predicateLabel} = "${e.value}"`,
    subjectUri: e.subjectUri,
    subjectLabel: e.subjectLabel,
    predicate: e.predicate,
    datatype: e.datatype,
    language: e.language,
    value: e.value
  };
}
function R3(e) {
  const t = e.data.connectionPoints;
  return Array.isArray(t) ? t.length : 0;
}
function A3(e, t) {
  const { containerUri: n, showPoints: r, showFunctions: i, showSensorsActuators: o, showAllProperties: s, highlightUri: l, selectedUris: u, buildModel: a } = t, c = A.useMemo(() => zC(e), [e]), f = A.useMemo(() => (a ?? pC)(c.graph), [c, a]), d = A.useMemo(() => n ? VC(f, n) : [], [f, n]), h = A.useMemo(() => {
    const w = n ? UC(f, n) : HC(f);
    return new Set(w.map((v) => v.uri));
  }, [f, n]), g = A.useMemo(
    () => r ? QC(f, h, i, o, s) : null,
    [f, h, r, i, o, s]
  ), x = A.useMemo(() => u && u.size > 0 ? lp(c.graph, f, u) : lp(c.graph, f, h, (g == null ? void 0 : g.extraPointUris) ?? lv), [c, f, h, g, u]), E = A.useMemo(() => {
    let w = h;
    g && g.extraPointUris.size > 0 && (w = /* @__PURE__ */ new Set([...h, ...g.extraPointUris]));
    const v = YC(f, w, r, i, o), _ = g ? [
      ...v.nodes.map((I) => g.summaries.has(I.id) ? { ...I, data: { ...I.data, instrumentation: g.summaries.get(I.id) } } : I),
      ...g.nodes
    ] : v.nodes, C = g ? [
      ...v.edges.filter((I) => !g.replacedConnectionEdgeIds.has(I.id)),
      ...g.edges,
      ...g.connectionSegmentEdges
    ] : v.edges;
    return { nodes: L3(_, C, R3), edges: C };
  }, [f, h, g, r, i, o]), p = A.useMemo(() => !l && (!u || u.size === 0) ? E : { nodes: E.nodes.map((v) => {
    const _ = l && v.id === l ? { ...v, data: { ...v.data, highlighted: !0 } } : v;
    return u != null && u.has(v.id) ? { ..._, data: { ..._.data, selected: !0 } } : _;
  }), edges: E.edges }, [E, l, u]);
  return { parsed: c, model: f, path: d, visibleUris: h, overlay: g, scope: x, flow: p };
}
function O3({
  nodes: e,
  edges: t,
  nodeTypes: n,
  edgeTypes: r,
  viewKey: i,
  focusNodeId: o,
  onNodeDoubleClick: s,
  onNodeClick: l,
  onPaneClick: u
}) {
  const [a, c] = A.useState(e);
  A.useEffect(() => c(e), [e]);
  const f = A.useCallback((h) => {
    c((g) => Dm(h, g));
  }, []), { fitView: d } = $l();
  return A.useEffect(() => {
    const h = window.setTimeout(() => {
      o && e.some((g) => g.id === o) ? d({ nodes: [{ id: o }], duration: 300, padding: 2, maxZoom: 1 }) : d({ duration: 200, padding: 0.2 });
    }, 50);
    return () => window.clearTimeout(h);
  }, [i, o]), /* @__PURE__ */ b.jsxs(
    kb,
    {
      nodes: a,
      edges: t,
      nodeTypes: n,
      edgeTypes: r,
      onNodesChange: f,
      onlyRenderVisibleElements: !0,
      defaultEdgeOptions: { markerEnd: { type: lo.ArrowClosed, color: "#495057", width: 16, height: 16 } },
      onNodeDoubleClick: s ? (h, g) => s(g.id) : void 0,
      onNodeClick: l ? (h, g) => l(g, h) : void 0,
      onPaneClick: u,
      minZoom: 0.05,
      children: [
        /* @__PURE__ */ b.jsx(Mb, {}),
        /* @__PURE__ */ b.jsx(Ob, {}),
        /* @__PURE__ */ b.jsx(qb, { pannable: !0, zoomable: !0 })
      ]
    }
  );
}
function Tu({ title: e, placeholder: t, entities: n, onPick: r }) {
  const [i, o] = A.useState(0), s = (l) => {
    const u = Number(l.target.value);
    !Number.isNaN(u) && n[u] && r(n[u]), o((a) => a + 1);
  };
  return /* @__PURE__ */ b.jsxs("div", { className: "in-view-sidebar__section", children: [
    /* @__PURE__ */ b.jsxs("div", { className: "in-view-sidebar__section-title", children: [
      e,
      " ",
      /* @__PURE__ */ b.jsx("span", { className: "in-view-sidebar__count", children: n.length })
    ] }),
    /* @__PURE__ */ b.jsxs("select", { className: "in-view-sidebar__select", defaultValue: "", onChange: s, disabled: n.length === 0, children: [
      /* @__PURE__ */ b.jsx("option", { value: "", disabled: !0, children: n.length === 0 ? "none in view" : t }),
      n.map((l, u) => /* @__PURE__ */ b.jsx("option", { value: u, title: l.uri, children: l.label }, l.uri))
    ] }, i)
  ] });
}
function B3({ literals: e, onPick: t }) {
  const [n, r] = A.useState(0), i = (o) => {
    const s = Number(o.target.value);
    !Number.isNaN(s) && e[s] && t(e[s]), r((l) => l + 1);
  };
  return /* @__PURE__ */ b.jsxs("div", { className: "in-view-sidebar__section", children: [
    /* @__PURE__ */ b.jsxs("div", { className: "in-view-sidebar__section-title", children: [
      "Literals ",
      /* @__PURE__ */ b.jsx("span", { className: "in-view-sidebar__count", children: e.length })
    ] }),
    /* @__PURE__ */ b.jsxs("select", { className: "in-view-sidebar__select", defaultValue: "", onChange: i, disabled: e.length === 0, children: [
      /* @__PURE__ */ b.jsx("option", { value: "", disabled: !0, children: e.length === 0 ? "none in view" : "Add literal…" }),
      e.map((o, s) => /* @__PURE__ */ b.jsxs("option", { value: s, title: o.predicate, children: [
        o.subjectLabel,
        " · ",
        o.predicateLabel,
        ' = "',
        o.value,
        '"'
      ] }, `${o.subjectUri}::${o.predicate}::${o.value}::${o.datatype ?? ""}::${o.language ?? ""}`))
    ] }, n)
  ] });
}
const F3 = {
  instance: "Inst",
  class: "Class",
  predicate: "Pred",
  literal: "Lit"
};
function D3({ scope: e, clipboard: t, onAdd: n, onRemove: r, onClear: i, onClose: o }) {
  return /* @__PURE__ */ b.jsxs("aside", { className: "in-view-sidebar", children: [
    /* @__PURE__ */ b.jsxs("div", { className: "in-view-sidebar__header", children: [
      /* @__PURE__ */ b.jsx("span", { children: "Query selection" }),
      /* @__PURE__ */ b.jsx("button", { className: "in-view-sidebar__close", onClick: o, "aria-label": "Close", children: "×" })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: "in-view-sidebar__pickers", children: [
      /* @__PURE__ */ b.jsx(Tu, { title: "Instances", placeholder: "Add instance…", entities: e.instances, onPick: (s) => n(Mu("instance", s)) }),
      /* @__PURE__ */ b.jsx(Tu, { title: "Classes", placeholder: "Add class…", entities: e.classes, onPick: (s) => n(Mu("class", s)) }),
      /* @__PURE__ */ b.jsx(Tu, { title: "Predicates", placeholder: "Add predicate…", entities: e.predicates, onPick: (s) => n(Mu("predicate", s)) }),
      /* @__PURE__ */ b.jsx(B3, { literals: e.literals, onPick: (s) => n(j3(s)) })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: "in-view-sidebar__clipboard", children: [
      /* @__PURE__ */ b.jsxs("div", { className: "in-view-sidebar__clipboard-header", children: [
        /* @__PURE__ */ b.jsxs("span", { children: [
          "Clipboard (",
          t.length,
          ")"
        ] }),
        t.length > 0 && /* @__PURE__ */ b.jsx("button", { className: "in-view-sidebar__clear", onClick: i, children: "Clear" })
      ] }),
      t.length === 0 ? /* @__PURE__ */ b.jsx("div", { className: "in-view-sidebar__empty", children: "Nothing selected yet — pick from the dropdowns above." }) : /* @__PURE__ */ b.jsx("ul", { className: "in-view-sidebar__clipboard-list", children: t.map((s) => /* @__PURE__ */ b.jsxs("li", { className: "in-view-sidebar__clipboard-item", children: [
        /* @__PURE__ */ b.jsx("span", { className: "in-view-sidebar__clipboard-kind", children: F3[s.kind] }),
        /* @__PURE__ */ b.jsx("span", { className: "in-view-sidebar__clipboard-label", title: s.uri ?? s.predicate, children: s.label }),
        /* @__PURE__ */ b.jsx("button", { className: "in-view-sidebar__remove", onClick: () => r(s.key), "aria-label": `Remove ${s.label}`, children: "×" })
      ] }, s.key)) })
    ] })
  ] });
}
function z3({ path: e, onNavigate: t }) {
  return /* @__PURE__ */ b.jsxs("div", { className: "breadcrumb", children: [
    /* @__PURE__ */ b.jsx("button", { className: "breadcrumb__item", onClick: () => t(null), children: "Root" }),
    e.map((n) => /* @__PURE__ */ b.jsxs("span", { children: [
      /* @__PURE__ */ b.jsx("span", { className: "breadcrumb__sep", children: "/" }),
      /* @__PURE__ */ b.jsx("button", { className: "breadcrumb__item", onClick: () => t(n.uri), children: n.label })
    ] }, n.uri))
  ] });
}
function U3({ members: e, onMemberClick: t }) {
  return e.length === 0 ? null : /* @__PURE__ */ b.jsxs("div", { className: "tooltip-members", children: [
    /* @__PURE__ */ b.jsxs("div", { className: "tooltip-members__header", children: [
      "Members (",
      e.length,
      ")"
    ] }),
    e.map((n) => /* @__PURE__ */ b.jsx("div", { className: "tooltip-row", children: n.navigable ? /* @__PURE__ */ b.jsx(
      "button",
      {
        type: "button",
        className: "tooltip-member-link",
        onPointerDown: (r) => r.stopPropagation(),
        onClick: (r) => {
          r.stopPropagation(), t == null || t(n.uri);
        },
        children: n.label
      }
    ) : /* @__PURE__ */ b.jsx("span", { className: "tooltip-member-inert", children: n.label }) }, n.uri))
  ] });
}
function uv({ properties: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ b.jsxs("div", { className: "tooltip-properties", children: [
    /* @__PURE__ */ b.jsxs("div", { className: "tooltip-properties__header", children: [
      "Properties (",
      e.length,
      ")"
    ] }),
    e.map((t, n) => /* @__PURE__ */ b.jsxs("div", { className: "tooltip-row", children: [
      /* @__PURE__ */ b.jsx("strong", { children: t.label }),
      " ",
      t.value !== void 0 && /* @__PURE__ */ b.jsx("span", { children: t.value }),
      t.unitSymbol && /* @__PURE__ */ b.jsxs("span", { children: [
        " ",
        t.unitSymbol
      ] }),
      t.quantityKind && /* @__PURE__ */ b.jsxs("span", { className: "tooltip-meta", children: [
        " (",
        t.quantityKind,
        ")"
      ] }),
      t.enumerationKind && /* @__PURE__ */ b.jsxs("span", { className: "tooltip-meta", children: [
        " [",
        t.enumerationKind,
        "]"
      ] })
    ] }, `${t.label}-${n}`))
  ] });
}
const H3 = {
  Inlet: "#4C6EF5",
  Outlet: "#F08C00",
  Bidirectional: "#37B24D",
  Other: "#868E96"
};
function up(e) {
  return e.kind === "Outlet" ? J.Right : J.Left;
}
function ap({ cp: e, position: t, offsetPct: n }) {
  const r = t === J.Left, i = {
    position: "absolute",
    inset: 0,
    transform: "none",
    borderRadius: "50%",
    background: H3[e.kind],
    border: "2px solid var(--bg)"
  }, o = {
    position: "absolute",
    top: `${n}%`,
    width: 10,
    height: 10,
    ...r ? { left: -6 } : { right: -6 }
  };
  return /* @__PURE__ */ b.jsxs("div", { className: "cp-dot-wrap", style: o, children: [
    /* @__PURE__ */ b.jsx(gt, { type: "target", id: e.uri, position: t, style: i }),
    /* @__PURE__ */ b.jsx(gt, { type: "source", id: e.uri, position: t, style: i }),
    /* @__PURE__ */ b.jsxs("div", { className: `cp-tooltip ${r ? "cp-tooltip--left" : "cp-tooltip--right"}`, children: [
      /* @__PURE__ */ b.jsx("strong", { children: e.label }),
      /* @__PURE__ */ b.jsxs("div", { children: [
        e.kind,
        e.medium ? ` · ${e.medium}` : ""
      ] })
    ] })
  ] });
}
function V3({ data: e }) {
  var l;
  const t = e.connectionPoints.filter((u) => up(u) === J.Left), n = e.connectionPoints.filter((u) => up(u) === J.Right), r = e.pointKind ? ` equipment-node--point equipment-node--point-${e.pointKind}` : "", i = e.muted ? " equipment-node--muted" : "", o = e.highlighted ? " equipment-node--highlighted" : "", s = e.selected ? " equipment-node--selected" : "";
  return /* @__PURE__ */ b.jsxs("div", { className: `equipment-node equipment-node--${e.kind}${r}${i}${o}${s}`, children: [
    /* @__PURE__ */ b.jsx(gt, { type: "target", position: J.Left, className: "equipment-node__fallback-handle" }),
    /* @__PURE__ */ b.jsx(gt, { type: "source", position: J.Left, className: "equipment-node__fallback-handle" }),
    t.map((u, a) => /* @__PURE__ */ b.jsx(ap, { cp: u, position: J.Left, offsetPct: (a + 1) / (t.length + 1) * 100 }, u.uri)),
    n.map((u, a) => /* @__PURE__ */ b.jsx(ap, { cp: u, position: J.Right, offsetPct: (a + 1) / (n.length + 1) * 100 }, u.uri)),
    /* @__PURE__ */ b.jsx("div", { className: "equipment-node__label", children: e.label }),
    e.typeName && /* @__PURE__ */ b.jsx("div", { className: "equipment-node__type", children: e.typeName }),
    e.hasChildren && /* @__PURE__ */ b.jsx("div", { className: "equipment-node__hint", children: "double-click to open" }),
    (e.properties.length > 0 || e.groupMemberships.length > 0 || e.instrumentation && e.instrumentation.length > 0 || e.members && e.members.length > 0) && /* @__PURE__ */ b.jsxs("div", { className: "equipment-node__tooltip nowheel", children: [
      e.members && /* @__PURE__ */ b.jsx(U3, { members: e.members, onMemberClick: e.onMemberClick }),
      e.groupMemberships.length > 0 && /* @__PURE__ */ b.jsxs("div", { className: "tooltip-row", children: [
        /* @__PURE__ */ b.jsx("strong", { children: "member of" }),
        " ",
        e.groupMemberships.join(", ")
      ] }),
      /* @__PURE__ */ b.jsx(uv, { properties: e.properties }),
      (l = e.instrumentation) == null ? void 0 : l.map((u, a) => /* @__PURE__ */ b.jsxs("div", { className: "tooltip-row", children: [
        /* @__PURE__ */ b.jsx("strong", { children: jy[u.relation] }),
        u.targetLabel ? ` ${u.targetLabel}` : ""
      ] }, a))
    ] })
  ] });
}
const W3 = A.memo(V3);
function Y3({ data: e }) {
  return /* @__PURE__ */ b.jsxs("div", { className: "property-pill-node", children: [
    /* @__PURE__ */ b.jsx(gt, { type: "target", position: J.Left }),
    /* @__PURE__ */ b.jsx("div", { className: "property-pill-node__label", children: e.label }),
    (e.value !== void 0 || e.unitSymbol) && /* @__PURE__ */ b.jsxs("div", { className: "property-pill-node__value", children: [
      e.value,
      e.unitSymbol && ` ${e.unitSymbol}`
    ] }),
    /* @__PURE__ */ b.jsx(gt, { type: "source", position: J.Right })
  ] });
}
const G3 = A.memo(Y3);
function X3() {
  return /* @__PURE__ */ b.jsxs("div", { className: "connection-junction-node", children: [
    /* @__PURE__ */ b.jsx(gt, { type: "target", id: "in", position: J.Left }),
    /* @__PURE__ */ b.jsx(gt, { type: "source", id: "out", position: J.Right }),
    /* @__PURE__ */ b.jsx(gt, { type: "target", id: "prop", position: J.Top }),
    /* @__PURE__ */ b.jsx("div", { className: "connection-junction-node__dot" })
  ] });
}
const Q3 = A.memo(X3);
function K3({
  id: e,
  sourceX: t,
  sourceY: n,
  targetX: r,
  targetY: i,
  sourcePosition: o,
  targetPosition: s,
  data: l,
  markerEnd: u
}) {
  const [a, c, f] = Il({ sourceX: t, sourceY: n, sourcePosition: o, targetX: r, targetY: i, targetPosition: s }), d = !!(l != null && l.hubLabel) || !!(l != null && l.medium) || ((l == null ? void 0 : l.properties.length) ?? 0) > 0;
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsx(
      oi,
      {
        id: e,
        path: a,
        markerEnd: u,
        style: {
          stroke: l != null && l.rolledUp ? "#adb5bd" : "#495057",
          strokeWidth: l != null && l.rolledUp ? 1.25 : 1.75,
          strokeDasharray: l != null && l.rolledUp ? "5 4" : void 0
        }
      }
    ),
    d && /* @__PURE__ */ b.jsx(py, { children: /* @__PURE__ */ b.jsxs(
      "div",
      {
        className: "connection-edge-hit",
        style: { transform: `translate(-50%, -50%) translate(${c}px, ${f}px)` },
        children: [
          /* @__PURE__ */ b.jsx("div", { className: "connection-edge-dot" }),
          /* @__PURE__ */ b.jsxs("div", { className: "connection-edge-tooltip", children: [
            (l == null ? void 0 : l.hubLabel) && /* @__PURE__ */ b.jsx("strong", { children: l.hubLabel }),
            (l == null ? void 0 : l.medium) && /* @__PURE__ */ b.jsx("div", { children: l.medium }),
            (l == null ? void 0 : l.rolledUp) && /* @__PURE__ */ b.jsx("div", { className: "tooltip-meta", children: "via nested equipment — drill in to see the exact link" }),
            l && /* @__PURE__ */ b.jsx(uv, { properties: l.properties })
          ] })
        ]
      }
    ) })
  ] });
}
const q3 = A.memo(K3);
function Z3({
  id: e,
  sourceX: t,
  sourceY: n,
  targetX: r,
  targetY: i,
  sourcePosition: o,
  targetPosition: s,
  data: l,
  markerEnd: u
}) {
  const [a, c, f] = Il({ sourceX: t, sourceY: n, sourcePosition: o, targetX: r, targetY: i, targetPosition: s });
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsx(
      oi,
      {
        id: e,
        path: a,
        markerEnd: u,
        style: {
          stroke: "#adb5bd",
          strokeWidth: l != null && l.rolledUp ? 1 : 1.25,
          strokeDasharray: l != null && l.rolledUp ? "5 4" : void 0
        }
      }
    ),
    l && /* @__PURE__ */ b.jsx(py, { children: /* @__PURE__ */ b.jsxs(
      "div",
      {
        className: "instrumentation-edge-hit",
        style: { transform: `translate(-50%, -50%) translate(${c}px, ${f}px)` },
        children: [
          /* @__PURE__ */ b.jsx("div", { className: "instrumentation-edge-label", children: jy[l.relation] }),
          l.rolledUp && /* @__PURE__ */ b.jsx("div", { className: "instrumentation-edge-tooltip", children: /* @__PURE__ */ b.jsx("div", { className: "tooltip-meta", children: "via nested equipment — drill in to see the exact link" }) })
        ]
      }
    ) })
  ] });
}
const J3 = A.memo(Z3);
function rs(e, t) {
  const [n, r] = A.useState(() => e.get(t));
  A.useEffect(() => {
    const o = () => r(e.get(t));
    return e.on(`change:${t}`, o), () => e.off(`change:${t}`, o);
  }, [e, t]);
  const i = A.useCallback(
    (o) => {
      e.set(t, o), e.save_changes();
    },
    [e, t]
  );
  return [n, i];
}
const eM = {
  equipmentNode: W3,
  propertyPill: G3,
  connectionJunction: Q3
}, tM = { connectionEdge: q3, instrumentationEdge: J3 };
function nM({ model: e }) {
  const [t] = rs(e, "source"), [n] = rs(e, "kind"), [r, i] = rs(e, "clipboard"), [o] = rs(e, "height"), s = r, [l, u] = A.useState(null), [a, c] = A.useState(!1), [f, d] = A.useState(!1), [h, g] = A.useState(!0), [x, E] = A.useState(!1), [p, w] = A.useState(!0), [v, _] = A.useState(/* @__PURE__ */ new Set()), C = A.useCallback((j, M) => {
    _((T) => {
      if (M.shiftKey) {
        const F = new Set(T);
        return F.has(j.id) ? F.delete(j.id) : F.add(j.id), F;
      }
      return T.size === 1 && T.has(j.id) ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([j.id]);
    });
  }, []), I = A.useCallback(() => _(/* @__PURE__ */ new Set()), []), P = A.useMemo(() => n === "brick" ? vC : void 0, [n]), { model: L, path: B, scope: V, flow: z } = A3(t, {
    containerUri: l,
    showPoints: a,
    showFunctions: f,
    showSensorsActuators: h,
    showAllProperties: x,
    selectedUris: v,
    buildModel: P
  }), X = A.useCallback(
    (j) => {
      const M = L.nodes.get(j);
      M && M.children.length > 0 && u(j), _(/* @__PURE__ */ new Set());
    },
    [L]
  ), W = A.useCallback((j) => {
    u(j), _(/* @__PURE__ */ new Set());
  }, []), N = A.useCallback(
    (j) => {
      s.some((M) => M.key === j.key) || i([...r, j]);
    },
    [s, r, i]
  ), O = A.useCallback(
    (j) => i(r.filter((M) => M.key !== j)),
    [r, i]
  ), R = A.useCallback(() => i([]), [i]);
  return /* @__PURE__ */ b.jsxs("div", { className: "app s223-widget", style: { height: o || "600px" }, children: [
    /* @__PURE__ */ b.jsxs("header", { className: "app__header", children: [
      /* @__PURE__ */ b.jsx("div", { className: "app__title", children: "223P Model Viewer" }),
      /* @__PURE__ */ b.jsx(z3, { path: B, onNavigate: W }),
      n !== "brick" && /* @__PURE__ */ b.jsx("div", { className: "app__view-toggle", children: /* @__PURE__ */ b.jsx(
        "button",
        {
          className: `app__view-toggle-btn ${a ? "app__view-toggle-btn--active" : ""}`,
          "aria-pressed": a,
          onClick: () => c((j) => !j),
          children: "Sensors & Controls"
        }
      ) }),
      n !== "brick" && a && /* @__PURE__ */ b.jsxs("label", { className: "app__sub-toggle", children: [
        /* @__PURE__ */ b.jsx("input", { type: "checkbox", checked: h, onChange: (j) => g(j.target.checked) }),
        "Sensors & Actuators"
      ] }),
      n !== "brick" && a && /* @__PURE__ */ b.jsxs("label", { className: "app__sub-toggle", children: [
        /* @__PURE__ */ b.jsx("input", { type: "checkbox", checked: f, onChange: (j) => d(j.target.checked) }),
        "Functions"
      ] }),
      n !== "brick" && a && /* @__PURE__ */ b.jsxs("label", { className: "app__sub-toggle", children: [
        /* @__PURE__ */ b.jsx("input", { type: "checkbox", checked: x, onChange: (j) => E(j.target.checked) }),
        "All Properties"
      ] }),
      /* @__PURE__ */ b.jsxs("div", { className: "app__header-right", children: [
        v.size > 0 && /* @__PURE__ */ b.jsxs("button", { className: "app__view-toggle-btn", onClick: I, children: [
          "Clear box selection (",
          v.size,
          ")"
        ] }),
        /* @__PURE__ */ b.jsxs(
          "button",
          {
            className: `app__view-toggle-btn app__sidebar-toggle ${p ? "app__view-toggle-btn--active" : ""}`,
            "aria-pressed": p,
            onClick: () => w((j) => !j),
            title: "Click a box to narrow the dropdowns below to it; shift-click to select more than one",
            children: [
              "Query selection",
              s.length > 0 ? ` (${s.length})` : ""
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: "app__body", children: [
      /* @__PURE__ */ b.jsx("div", { className: "app__canvas", children: /* @__PURE__ */ b.jsx(hy, { children: /* @__PURE__ */ b.jsx(
        O3,
        {
          nodes: z.nodes,
          edges: z.edges,
          nodeTypes: eM,
          edgeTypes: tM,
          viewKey: `${l ?? "__root__"}::${a}::${f}::${h}::${x}`,
          onNodeDoubleClick: X,
          onNodeClick: C,
          onPaneClick: I
        }
      ) }) }),
      p && /* @__PURE__ */ b.jsx(
        D3,
        {
          scope: V,
          clipboard: s,
          onAdd: N,
          onRemove: O,
          onClear: R,
          onClose: () => w(!1)
        }
      )
    ] })
  ] });
}
function rM({ model: e, el: t }) {
  const n = document.createElement("div");
  t.appendChild(n);
  const r = k0(n);
  return r.render(
    /* @__PURE__ */ b.jsx(A.StrictMode, { children: /* @__PURE__ */ b.jsx(nM, { model: e }) })
  ), () => r.unmount();
}
const sM = { render: rM };
export {
  sM as default
};
