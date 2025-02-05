import {
  r as o,
  g as nr,
  a as ir,
  b as lr,
  C as E,
  j as e,
  B as w,
  D as _,
  T as je,
  R as or,
  L,
  H as dr,
  l as k,
  c as f,
  d as cr,
  u as R,
  e as we,
  S as A,
  t as z,
  f as hr,
  M as he,
  h as ur,
  i as F,
  k as ke,
  m as mr,
  n as pr,
  p as ue,
  o as xr,
  N as P,
  O as gr,
} from "./index-CqYDJsbz.js";
import { I as x } from "./iconify-DcqE7M9x.js";
import {
  o as D,
  K as V,
  L as H,
  p as Ne,
  m as fr,
  a as Ce,
  w as Le,
  b as Se,
  l as br,
  f as vr,
  H as Q,
  Q as X,
  u as yr,
  y as jr,
  I as wr,
  U as kr,
  $ as Nr,
  c as Cr,
  d as Lr,
  _ as Sr,
} from "./label-CDmPfQvc.js";
import { S as Ir } from "./ScrollToTop-CzZMWtQu.js";
function Er() {
  if (console && console.warn) {
    for (var r = arguments.length, t = new Array(r), a = 0; a < r; a++)
      t[a] = arguments[a];
    typeof t[0] == "string" && (t[0] = `react-i18next:: ${t[0]}`),
      console.warn(...t);
  }
}
const me = {};
function K() {
  for (var r = arguments.length, t = new Array(r), a = 0; a < r; a++)
    t[a] = arguments[a];
  (typeof t[0] == "string" && me[t[0]]) ||
    (typeof t[0] == "string" && (me[t[0]] = new Date()), Er(...t));
}
const Ie = (r, t) => () => {
  if (r.isInitialized) t();
  else {
    const a = () => {
      setTimeout(() => {
        r.off("initialized", a);
      }, 0),
        t();
    };
    r.on("initialized", a);
  }
};
function pe(r, t, a) {
  r.loadNamespaces(t, Ie(r, a));
}
function xe(r, t, a, s) {
  typeof a == "string" && (a = [a]),
    a.forEach((l) => {
      r.options.ns.indexOf(l) < 0 && r.options.ns.push(l);
    }),
    r.loadLanguages(t, Ie(r, s));
}
function Tr(r, t) {
  let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const s = t.languages[0],
    l = t.options ? t.options.fallbackLng : !1,
    n = t.languages[t.languages.length - 1];
  if (s.toLowerCase() === "cimode") return !0;
  const d = (h, u) => {
    const i = t.services.backendConnector.state[`${h}|${u}`];
    return i === -1 || i === 2;
  };
  return a.bindI18n &&
    a.bindI18n.indexOf("languageChanging") > -1 &&
    t.services.backendConnector.backend &&
    t.isLanguageChangingTo &&
    !d(t.isLanguageChangingTo, r)
    ? !1
    : !!(
        t.hasResourceBundle(s, r) ||
        !t.services.backendConnector.backend ||
        (t.options.resources && !t.options.partialBundledLanguages) ||
        (d(s, r) && (!l || d(n, r)))
      );
}
function $r(r, t) {
  let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  return !t.languages || !t.languages.length
    ? (K("i18n.languages were undefined or empty", t.languages), !0)
    : t.options.ignoreJSONStructure !== void 0
      ? t.hasLoadedNamespace(r, {
          lng: a.lng,
          precheck: (l, n) => {
            if (
              a.bindI18n &&
              a.bindI18n.indexOf("languageChanging") > -1 &&
              l.services.backendConnector.backend &&
              l.isLanguageChangingTo &&
              !n(l.isLanguageChangingTo, r)
            )
              return !1;
          },
        })
      : Tr(r, t, a);
}
const Mr = o.createContext();
class Ar {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(t) {
    t.forEach((a) => {
      this.usedNamespaces[a] || (this.usedNamespaces[a] = !0);
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
const Pr = (r, t) => {
  const a = o.useRef();
  return (
    o.useEffect(() => {
      a.current = r;
    }, [r, t]),
    a.current
  );
};
function q(r) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const { i18n: a } = t,
    { i18n: s, defaultNS: l } = o.useContext(Mr) || {},
    n = a || s || nr();
  if ((n && !n.reportNamespaces && (n.reportNamespaces = new Ar()), !n)) {
    K("You will need to pass in an i18next instance by using initReactI18next");
    const j = (b, y) =>
        typeof y == "string"
          ? y
          : y && typeof y == "object" && typeof y.defaultValue == "string"
            ? y.defaultValue
            : Array.isArray(b)
              ? b[b.length - 1]
              : b,
      C = [j, {}, !1];
    return (C.t = j), (C.i18n = {}), (C.ready = !1), C;
  }
  n.options.react &&
    n.options.react.wait !== void 0 &&
    K(
      "It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.",
    );
  const d = { ...ir(), ...n.options.react, ...t },
    { useSuspense: h, keyPrefix: u } = d;
  let i = l || (n.options && n.options.defaultNS);
  (i = typeof i == "string" ? [i] : i || ["translation"]),
    n.reportNamespaces.addUsedNamespaces &&
      n.reportNamespaces.addUsedNamespaces(i);
  const m =
    (n.isInitialized || n.initializedStoreOnce) && i.every((j) => $r(j, n, d));
  function c() {
    return n.getFixedT(t.lng || null, d.nsMode === "fallback" ? i : i[0], u);
  }
  const [p, g] = o.useState(c);
  let v = i.join();
  t.lng && (v = `${t.lng}${v}`);
  const T = Pr(v),
    N = o.useRef(!0);
  o.useEffect(() => {
    const { bindI18n: j, bindI18nStore: C } = d;
    (N.current = !0),
      !m &&
        !h &&
        (t.lng
          ? xe(n, t.lng, i, () => {
              N.current && g(c);
            })
          : pe(n, i, () => {
              N.current && g(c);
            })),
      m && T && T !== v && N.current && g(c);
    function b() {
      N.current && g(c);
    }
    return (
      j && n && n.on(j, b),
      C && n && n.store.on(C, b),
      () => {
        (N.current = !1),
          j && n && j.split(" ").forEach((y) => n.off(y, b)),
          C && n && C.split(" ").forEach((y) => n.store.off(y, b));
      }
    );
  }, [n, v]);
  const $ = o.useRef(!0);
  o.useEffect(() => {
    N.current && !$.current && g(c), ($.current = !1);
  }, [n, u]);
  const S = [p, n, m];
  if (((S.t = p), (S.i18n = n), (S.ready = m), m || (!m && !h))) return S;
  throw new Promise((j) => {
    t.lng ? xe(n, t.lng, i, () => j()) : pe(n, i, () => j());
  });
}
var Ee = { exports: {} },
  Fr = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
  Or = Fr,
  Dr = Or;
function Te() {}
function $e() {}
$e.resetWarningCache = Te;
var Rr = function () {
  function r(s, l, n, d, h, u) {
    if (u !== Dr) {
      var i = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
      );
      throw ((i.name = "Invariant Violation"), i);
    }
  }
  r.isRequired = r;
  function t() {
    return r;
  }
  var a = {
    array: r,
    bigint: r,
    bool: r,
    func: r,
    number: r,
    object: r,
    string: r,
    symbol: r,
    any: r,
    arrayOf: t,
    element: r,
    elementType: r,
    instanceOf: t,
    node: r,
    objectOf: t,
    oneOf: t,
    oneOfType: t,
    shape: t,
    exact: t,
    checkPropTypes: $e,
    resetWarningCache: Te,
  };
  return (a.PropTypes = a), a;
};
Ee.exports = Rr();
var zr = Ee.exports;
const M = lr(zr);
var _r = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  Br = Object.defineProperty,
  Hr = Object.defineProperties,
  qr = Object.getOwnPropertyDescriptors,
  B = Object.getOwnPropertySymbols,
  Me = Object.prototype.hasOwnProperty,
  Ae = Object.prototype.propertyIsEnumerable,
  ge = (r, t, a) =>
    t in r
      ? Br(r, t, { enumerable: !0, configurable: !0, writable: !0, value: a })
      : (r[t] = a),
  fe = (r, t) => {
    for (var a in t || (t = {})) Me.call(t, a) && ge(r, a, t[a]);
    if (B) for (var a of B(t)) Ae.call(t, a) && ge(r, a, t[a]);
    return r;
  },
  Ur = (r, t) => Hr(r, qr(t)),
  Gr = (r, t) => {
    var a = {};
    for (var s in r) Me.call(r, s) && t.indexOf(s) < 0 && (a[s] = r[s]);
    if (r != null && B)
      for (var s of B(r)) t.indexOf(s) < 0 && Ae.call(r, s) && (a[s] = r[s]);
    return a;
  },
  ee = (r, t, a) => {
    const s = o.forwardRef((l, n) => {
      var d = l,
        {
          color: h = "currentColor",
          size: u = 24,
          stroke: i = 2,
          children: m,
        } = d,
        c = Gr(d, ["color", "size", "stroke", "children"]);
      return o.createElement(
        "svg",
        fe(
          Ur(fe({ ref: n }, _r), {
            width: u,
            height: u,
            stroke: h,
            strokeWidth: i,
            className: `tabler-icon tabler-icon-${r}`,
          }),
          c,
        ),
        [...a.map(([p, g]) => o.createElement(p, g)), ...(m || [])],
      );
    });
    return (
      (s.propTypes = {
        color: M.string,
        size: M.oneOfType([M.string, M.number]),
        stroke: M.oneOfType([M.string, M.number]),
      }),
      (s.displayName = `${t}`),
      s
    );
  },
  Wr = ee("check", "IconCheck", [
    ["path", { d: "M5 12l5 5l10 -10", key: "svg-0" }],
  ]),
  Pe = ee("chevron-down", "IconChevronDown", [
    ["path", { d: "M6 9l6 6l6 -6", key: "svg-0" }],
  ]),
  Kr = ee("settings", "IconSettings", [
    [
      "path",
      {
        d: "M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z",
        key: "svg-0",
      },
    ],
    ["path", { d: "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0", key: "svg-1" }],
  ]);
const Yr = () => {
    const [r, t] = o.useState(!1),
      a = () => t(!1),
      s = (b) => {
        document.body.setAttribute("data-color-theme", b);
      },
      {
        activeDir: l,
        setActiveDir: n,
        activeMode: d,
        setActiveMode: h,
        isCollapse: u,
        setIsCollapse: i,
        activeTheme: m,
        setActiveTheme: c,
        activeLayout: p,
        setActiveLayout: g,
        isLayout: v,
        isCardShadow: T,
        setIsCardShadow: N,
        setIsLayout: $,
        isBorderRadius: S,
        setIsBorderRadius: j,
      } = o.useContext(E),
      C = [
        { id: 1, bgColor: "#635BFF", disp: "BLUE_THEME" },
        { id: 2, bgColor: "#0074BA", disp: "AQUA_THEME" },
        { id: 3, bgColor: "#763EBD", disp: "PURPLE_THEME" },
        { id: 4, bgColor: "#0A7EA4", disp: "GREEN_THEME" },
        { id: 5, bgColor: "#01C0C8", disp: "CYAN_THEME" },
        { id: 6, bgColor: "#FA896B", disp: "ORANGE_THEME" },
      ];
    return e.jsxs("div", {
      children: [
        e.jsx("div", {
          children: e.jsx(w, {
            color: "primary",
            className:
              "h-14 w-14 flex justify-center items-center fixed bottom-6 end-6  rounded-full hover:bg-primaryemphasis",
            onClick: () => t(!0),
            children: e.jsx(Kr, {}),
          }),
        }),
        e.jsxs(_, {
          open: r,
          onClose: a,
          position: `${l === "rtl" ? "left" : "right"}`,
          className: "dark:bg-darkgray max-w-[350px] w-full",
          children: [
            e.jsx("div", {
              className: "border-ld  border-b",
              children: e.jsx("div", {
                className: "flex justify-between items-center p-4",
                children: e.jsx("h5", {
                  className: "text-xl",
                  children: "Settings",
                }),
              }),
            }),
            e.jsx("div", {
              className: "h-n80",
              children: e.jsxs("div", {
                className: "p-4",
                children: [
                  e.jsx("h4", {
                    className: "text-base mb-2",
                    children: "Theme Option",
                  }),
                  e.jsxs("div", {
                    className: "flex gap-4 mb-7",
                    children: [
                      e.jsx(w, {
                        color: "primary",
                        className: `border bg-transparent text-darklink btn-shadow border-ld  dark:text-white  hover:bg-primary hover:text-white rounded-md py-3 px-3 dark:hover:text-white 
                ${d === "light" ? "active text-primary bg-lightprimary hover:bg-lightprimary hover:text-primary " : "dark:hover:bg-darkminisidebar "}`,
                        onClick: () => {
                          h("light");
                        },
                        children: e.jsxs("span", {
                          className: "flex items-center",
                          children: [
                            e.jsx(x, {
                              icon: "solar:sun-bold-duotone",
                              width: "20",
                              className: "me-2",
                            }),
                            "Light",
                          ],
                        }),
                      }),
                      e.jsx(w, {
                        color: "primary",
                        className: `border bg-transparent dark:text-white border-ld text-darklink hover:bg-primary  dark:hover:text-white hover:text-white rounded-md py-3 px-3 ${d === "dark" ? "active text-primary bg-lightprimary   dark:bg-darkminisidebar dark:text-white" : "hover:bg-lightprimary hover:text-primary"}`,
                        onClick: () => {
                          h("dark");
                        },
                        children: e.jsxs("span", {
                          className: "flex items-center",
                          children: [
                            e.jsx(x, {
                              icon: "solar:moon-bold-duotone",
                              width: "20",
                              className: "me-2",
                            }),
                            " ",
                            "Dark",
                          ],
                        }),
                      }),
                    ],
                  }),
                  e.jsx("h4", {
                    className: "text-base mb-2",
                    children: "Theme Direction",
                  }),
                  e.jsxs("div", {
                    className: "flex gap-4 mb-7",
                    children: [
                      e.jsx(w, {
                        color: "primary",
                        className: `border bg-transparent text-darklink dark:text-white border-ld  hover:bg-primary hover:text-white rounded-md py-3 px-3  dark:hover:text-white ${l === "ltr" ? "text-primary bg-lightprimary dark:text-white dark:bg-darkminisidebar hover:bg-lightprimary hover:text-primary" : "dark:hover:bg-darkminisidebar hover:bg-lightprimary hover:text-primary"}`,
                        onClick: () => {
                          n("ltr");
                        },
                        children: e.jsxs("span", {
                          className: "flex items-center",
                          children: [
                            e.jsx(x, {
                              icon: "solar:align-left-line-duotone",
                              width: "20",
                              className: "me-2",
                            }),
                            " ",
                            "LTR",
                          ],
                        }),
                      }),
                      e.jsx(w, {
                        color: "primary",
                        className: `border bg-transparent btn-shadow border-ld text-darklink dark:text-white hover:bg-primary hover:text-white rounded-md py-3 px-3 ${l === "rtl" ? "text-primary bg-lightprimary  dark:text-white dark:bg-darkminisidebar hover:bg-lightprimary hover:text-primary" : "dark:hover:bg-darkminisidebar hover:bg-lightprimary hover:text-primary"}`,
                        onClick: () => {
                          n("rtl");
                        },
                        children: e.jsxs("span", {
                          className: "flex items-center",
                          children: [
                            e.jsx(x, {
                              icon: "solar:align-right-line-duotone",
                              width: "20",
                              className: "me-2",
                            }),
                            " ",
                            "RTL",
                          ],
                        }),
                      }),
                    ],
                  }),
                  e.jsx("h4", {
                    className: "text-base mb-2",
                    children: "Theme Colors",
                  }),
                  e.jsx("div", {
                    className: "flex flex-row flex-wrap gap-4 mb-7",
                    children: C.map((b, y) =>
                      e.jsx(
                        "span",
                        {
                          onClick: () => {
                            s(b.disp), c(b.disp);
                          },
                          className:
                            "border bg-transparent text-link dark:text-white border-ld py-5 px-6 rounded-md cursor-pointer ",
                          children: e.jsx(je, {
                            content: b.disp,
                            placement: "top",
                            animation: "duration-500",
                            children: e.jsx("label", {
                              className:
                                " h-6 w-6 rounded-full  cursor-pointer flex items-center justify-center",
                              style: { backgroundColor: b.bgColor },
                              children:
                                m === b.disp &&
                                e.jsx(Wr, {
                                  className: "text-white",
                                  size: 18,
                                }),
                            }),
                          }),
                        },
                        y,
                      ),
                    ),
                  }),
                  e.jsx("h4", {
                    className: "text-base mb-2",
                    children: "Layout Type",
                  }),
                  e.jsxs("div", {
                    className: "flex flex-wrap  gap-4 mb-7",
                    children: [
                      e.jsx(w, {
                        color: "primary",
                        className: `border bg-transparent btn-shadow border-ld text-darklink dark:text-white hover:bg-primary hover:text-white rounded-md py-3 px-2  dark:hover:text-white ${p === "vertical" ? "text-primary bg-lightprimary dark:text-white dark:bg-darkminisidebar hover:bg-lightprimary hover:text-primary" : "dark:hover:bg-darkminisidebar hover:bg-lightprimary hover:text-primary"}`,
                        onClick: () => g("vertical"),
                        children: e.jsxs("span", {
                          className: "flex items-center",
                          children: [
                            e.jsx(x, {
                              icon: "solar:slider-vertical-line-duotone",
                              width: "20",
                              className: "me-2",
                            }),
                            "Vertical",
                          ],
                        }),
                      }),
                      e.jsx(w, {
                        color: "primary",
                        onClick: () => g("horizontal"),
                        className: `border bg-transparent dark:text-white border-ld text-darklink hover:bg-primary hover:text-white rounded-md py-3 px-2 ${p === "horizontal" ? "text-primary bg-lightprimary  dark:text-white dark:bg-darkminisidebar hover:bg-lightprimary hover:text-primary" : "dark:hover:bg-darkminisidebar hover:bg-lightprimary hover:text-primary"}`,
                        children: e.jsxs("span", {
                          className: "flex items-center",
                          children: [
                            e.jsx(x, {
                              icon: "solar:slider-horizontal-line-duotone",
                              width: "20",
                              className: "me-2",
                            }),
                            "Horizontal",
                          ],
                        }),
                      }),
                    ],
                  }),
                  e.jsx("h4", {
                    className: "text-base mb-2",
                    children: "Container Option",
                  }),
                  e.jsxs("div", {
                    className: "flex flex-wrap  gap-4 mb-7",
                    children: [
                      e.jsx(w, {
                        color: "primary",
                        className: `border bg-transparent btn-shadow border-ld text-darklink dark:text-white hover:bg-primary hover:text-white rounded-md py-3 px-2   dark:hover:text-white ${v === "boxed" ? "text-primary bg-lightprimary  dark:text-white dark:bg-darkminisidebar hover:bg-lightprimary hover:text-primary" : "dark:hover:bg-darkminisidebar hover:bg-lightprimary hover:text-primary"}`,
                        onClick: () => $("boxed"),
                        children: e.jsxs("span", {
                          className: "flex items-center",
                          children: [
                            e.jsx(x, {
                              icon: "solar:quit-full-screen-square-line-duotone",
                              width: "20",
                              className: "me-2",
                            }),
                            "Boxed",
                          ],
                        }),
                      }),
                      e.jsx(w, {
                        color: "primary",
                        className: `border bg-transparent dark:text-white border-ld text-darklink hover:bg-primary hover:text-white rounded-md py-3 px-2 ${v === "full" ? "text-primary bg-lightprimary  dark:text-white dark:bg-darkminisidebar hover:bg-lightprimary hover:text-primary" : "dark:hover:bg-darkminisidebar hover:bg-lightprimary hover:text-primary"}`,
                        onClick: () => $("full"),
                        children: e.jsxs("span", {
                          className: "flex items-center",
                          children: [
                            e.jsx(x, {
                              icon: "solar:full-screen-square-line-duotone",
                              width: "20",
                              className: "me-2",
                            }),
                            "Full",
                          ],
                        }),
                      }),
                    ],
                  }),
                  e.jsx("h4", {
                    className: "text-base mb-2",
                    children: "Sidebar Type",
                  }),
                  e.jsxs("div", {
                    className: "flex flex-wrap  gap-4 mb-7",
                    children: [
                      e.jsx(w, {
                        color: "primary",
                        className: `border bg-transparent btn-shadow border-ld text-darklink dark:text-white hover:bg-primary hover:text-white rounded-md py-3 px-2   dark:hover:text-white ${u == "full-sidebar" ? "text-primary bg-lightprimary  dark:text-white dark:bg-darkminisidebar hover:bg-lightprimary hover:text-primary" : "dark:hover:bg-darkminisidebar hover:bg-lightprimary hover:text-primary"}`,
                        onClick: () => i("full-sidebar"),
                        children: e.jsxs("span", {
                          className: "flex items-center",
                          children: [
                            e.jsx(x, {
                              icon: "solar:mirror-left-line-duotone",
                              width: "20",
                              className: "me-2",
                            }),
                            "Full",
                          ],
                        }),
                      }),
                      e.jsx(w, {
                        color: "primary",
                        className: `border bg-transparent dark:text-white border-ld text-darklink hover:bg-primary hover:text-white rounded-md py-3 px-2 ${u == "mini-sidebar" ? "text-primary bg-lightprimary  dark:text-white dark:bg-darkminisidebar hover:bg-lightprimary hover:text-primary" : "dark:hover:bg-darkminisidebar hover:bg-lightprimary hover:text-primary"}`,
                        onClick: () => i("mini-sidebar"),
                        children: e.jsxs("span", {
                          className: "flex items-center",
                          children: [
                            e.jsx(x, {
                              icon: "solar:mirror-right-line-duotone",
                              width: "20",
                              className: "me-2",
                            }),
                            "Collapse",
                          ],
                        }),
                      }),
                    ],
                  }),
                  e.jsx("h4", {
                    className: "text-base mb-2",
                    children: "Card With",
                  }),
                  e.jsxs("div", {
                    className: "flex flex-wrap  gap-4 mb-7",
                    children: [
                      e.jsx(w, {
                        color: "primary",
                        className: `border bg-transparent btn-shadow border-ld text-darklink dark:text-white hover:bg-primary hover:text-white rounded-md py-3 px-2  ${T ? "dark:hover:bg-darkminisidebar hover:bg-lightprimary hover:text-primary" : "text-primary bg-lightprimary  dark:text-white dark:bg-darkminisidebar hover:bg-lightprimary hover:text-primary"}`,
                        onClick: () => N(!1),
                        children: e.jsxs("span", {
                          className: "flex items-center",
                          children: [
                            e.jsx(x, {
                              icon: "solar:three-squares-line-duotone",
                              width: "20",
                              className: "me-2",
                            }),
                            "Border",
                          ],
                        }),
                      }),
                      e.jsx(w, {
                        color: "primary",
                        className: `border bg-transparent dark:text-white border-ld text-darklink hover:bg-primary hover:text-white rounded-md py-3 px-2 dark:hover:text-white ${T ? "text-primary bg-lightprimary  dark:text-white dark:bg-darkminisidebar hover:bg-lightprimary hover:text-primary" : "dark:hover:bg-darkminisidebar hover:bg-lightprimary hover:text-primary"}`,
                        onClick: () => N(!0),
                        children: e.jsxs("span", {
                          className: "flex items-center",
                          children: [
                            e.jsx(x, {
                              icon: "solar:three-squares-bold-duotone",
                              width: "20",
                              className: "me-2",
                            }),
                            "Shadow",
                          ],
                        }),
                      }),
                    ],
                  }),
                  e.jsx("h4", {
                    className: "text-base mb-2",
                    children: "Theme Border Radius",
                  }),
                  e.jsx(or, {
                    id: "default-range",
                    value: S,
                    min: 4,
                    max: 24,
                    onChange: (b) => j(b.target.value),
                  }),
                  e.jsx("div", {
                    children: e.jsxs("p", {
                      className: "dark:text-applinksubtext",
                      children: ["Current Value: ", S],
                    }),
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    });
  },
  be = [
    {
      id: 1,
      icon: "solar:text-underline-cross-broken",
      tooltip: "Genie Chat",
      url: "/chats",
    },
    {
      id: 2,
      icon: "solar:mirror-left-line-duotone",
      tooltip: "Knowledge Base",
      url: "/repository",
    },
    {
      id: 3,
      icon: "solar:palette-round-line-duotone",
      tooltip: "Agents",
      url: "/agents",
    },
    {
      id: 4,
      icon: "solar:tuning-square-2-line-duotone",
      tooltip: "Projects",
      url: "/projects",
    },
    {
      id: 5,
      icon: "solar:chart-line-duotone",
      tooltip: "Analytics",
      url: "analytics",
    },
  ],
  Fe = () => {
    const {
        selectedIconId: r,
        setSelectedIconId: t,
        setIsCollapse: a,
        isCollapse: s,
      } = o.useContext(E) || {},
      l = (n) => {
        t(n), a("full-sidebar");
      };
    return e.jsx(e.Fragment, {
      children: e.jsxs("div", {
        className: "minisidebar-icon dark:bg-dark",
        children: [
          e.jsx("div", {
            className: "barnd-logo",
            children: e.jsx(L, {
              to: "#",
              className: "nav-link",
              onClick: () => {
                a(s === "full-sidebar" ? "mini-sidebar" : "full-sidebar");
              },
              children: e.jsx(x, {
                icon: "solar:hamburger-menu-line-duotone",
                height: 24,
                className: "text-black dark:text-white dark:hover:text-primary",
              }),
            }),
          }),
          e.jsx("div", {
            className: "miniicons ",
            children: be.map((n, d) =>
              e.jsxs(
                je,
                {
                  content: n.tooltip,
                  placement: "right",
                  className: "flowbite-tooltip",
                  children: [
                    e.jsx(L, {
                      to: `${n.url}`,
                      children: e.jsx(
                        w,
                        {
                          className: `h-12 w-12 hover:text-primary text-darklink dark:text-white/70 hover:bg-lightprimary rounded-tw flex justify-center items-center mx-auto mb-2 ${n.id === r ? "text-white bg-primary hover:bg-primaryemphasis hover:text-white dark:hover:text-white" : "text-darklink  bg-transparent"}`,
                          type: "button",
                          onClick: () => l(n.id),
                          children: e.jsx(x, {
                            icon: n.icon,
                            height: 24,
                            className: "dark:bg-blue ",
                          }),
                        },
                        d,
                      ),
                    }),
                    d > 0 &&
                      (d + 1) % 3 === 0 &&
                      d + 1 !== be.length &&
                      e.jsx(dr, { className: "my-3" }),
                  ],
                },
                n.id,
              ),
            ),
          }),
        ],
      }),
    });
  },
  Y = [
    {
      id: 1,
      name: "Conversations",
      items: [
        {
          heading: "AI Models",
          children: [
            {
              name: "External",
              description: "Sources from Web",
              selector: !0,
              id: k.uniqueId(),
              url: "/#",
            },
            {
              name: "Internal",
              description: "Sources internally",
              selector: !0,
              id: k.uniqueId(),
              url: "/#",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Repositories",
      items: [
        {
          heading: "Knowledge Base",
          children: [
            {
              name: "Root",
              icon: "solar:widget-add-line-duotone",
              id: k.uniqueId(),
              url: "/repository",
              children: [
                {
                  id: k.uniqueId(),
                  name: "Marketing",
                  icon: "flat-color-icons:opened-folder",
                  url: "/repository/marketing",
                },
                {
                  id: k.uniqueId(),
                  name: "Sales",
                  icon: "flat-color-icons:opened-folder",
                  url: "/repository/sales",
                  children: [
                    {
                      id: k.uniqueId(),
                      name: "Sales Scripts",
                      icon: "flat-color-icons:file",
                      url: "/repository/sales-scripts",
                    },
                  ],
                },
                {
                  id: k.uniqueId(),
                  name: "Customers",
                  icon: "flat-color-icons:opened-folder",
                  url: "/repository/customers",
                  children: [
                    {
                      id: k.uniqueId(),
                      name: "Support",
                      icon: "flat-color-icons:file",
                      url: "/repository/customers/support",
                    },
                    {
                      id: k.uniqueId(),
                      name: "Complaints",
                      icon: "flat-color-icons:file",
                      url: "/repository/customers/complaints",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          heading: "Add More",
          children: [
            {
              id: k.uniqueId(),
              url: "/repository/new-page",
              name: "New Page",
              icon: "solar:document-text-outline",
              color: "text-primary",
            },
          ],
        },
        {
          heading: "Integrations",
          children: [
            {
              id: k.uniqueId(),
              url: "/sample-page",
              name: "Google Docs",
              icon: "solar:google-docs",
              color: "text-primary",
            },
          ],
        },
      ],
    },
  ];
function Jr(r, t, a) {
  let [s, l] = o.useState(a),
    n = r !== void 0,
    d = o.useRef(n),
    h = o.useRef(!1),
    u = o.useRef(!1);
  return (
    n && !d.current && !h.current
      ? ((h.current = !0),
        (d.current = n),
        console.error(
          "A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.",
        ))
      : !n &&
        d.current &&
        !u.current &&
        ((u.current = !0),
        (d.current = n),
        console.error(
          "A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.",
        )),
    [n ? r : s, D((i) => (n || l(i), t == null ? void 0 : t(i)))]
  );
}
function Zr(r) {
  let [t] = o.useState(r);
  return t;
}
function Oe(r = {}, t = null, a = []) {
  for (let [s, l] of Object.entries(r)) Re(a, De(t, s), l);
  return a;
}
function De(r, t) {
  return r ? r + "[" + t + "]" : t;
}
function Re(r, t, a) {
  if (Array.isArray(a))
    for (let [s, l] of a.entries()) Re(r, De(t, s.toString()), l);
  else
    a instanceof Date
      ? r.push([t, a.toISOString()])
      : typeof a == "boolean"
        ? r.push([t, a ? "1" : "0"])
        : typeof a == "string"
          ? r.push([t, a])
          : typeof a == "number"
            ? r.push([t, `${a}`])
            : a == null
              ? r.push([t, ""])
              : Oe(a, t, r);
}
function Vr(r) {
  var t, a;
  let s = (t = r == null ? void 0 : r.form) != null ? t : r.closest("form");
  if (s) {
    for (let l of s.elements)
      if (
        l !== r &&
        ((l.tagName === "INPUT" && l.type === "submit") ||
          (l.tagName === "BUTTON" && l.type === "submit") ||
          (l.nodeName === "INPUT" && l.type === "image"))
      ) {
        l.click();
        return;
      }
    (a = s.requestSubmit) == null || a.call(s);
  }
}
let Qr = "span";
var U = ((r) => (
  (r[(r.None = 1)] = "None"),
  (r[(r.Focusable = 2)] = "Focusable"),
  (r[(r.Hidden = 4)] = "Hidden"),
  r
))(U || {});
function Xr(r, t) {
  var a;
  let { features: s = 1, ...l } = r,
    n = {
      ref: t,
      "aria-hidden":
        (s & 2) === 2 ? !0 : (a = l["aria-hidden"]) != null ? a : void 0,
      hidden: (s & 4) === 4 ? !0 : void 0,
      style: {
        position: "fixed",
        top: 1,
        left: 1,
        width: 1,
        height: 0,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: "0",
        ...((s & 4) === 4 && (s & 2) !== 2 && { display: "none" }),
      },
    };
  return H()({
    ourProps: n,
    theirProps: l,
    slot: {},
    defaultTag: Qr,
    name: "Hidden",
  });
}
let re = V(Xr),
  ze = o.createContext(null);
function et(r) {
  let [t, a] = o.useState(null);
  return f.createElement(
    ze.Provider,
    { value: { target: t } },
    r.children,
    f.createElement(re, { features: U.Hidden, ref: a }),
  );
}
function rt({ children: r }) {
  let t = o.useContext(ze);
  if (!t) return f.createElement(f.Fragment, null, r);
  let { target: a } = t;
  return a ? cr.createPortal(f.createElement(f.Fragment, null, r), a) : null;
}
function tt({ data: r, form: t, disabled: a, onReset: s, overrides: l }) {
  let [n, d] = o.useState(null),
    h = Ne();
  return (
    o.useEffect(() => {
      if (s && n) return h.addEventListener(n, "reset", s);
    }, [n, t, s]),
    f.createElement(
      rt,
      null,
      f.createElement(at, { setForm: d, formId: t }),
      Oe(r).map(([u, i]) =>
        f.createElement(re, {
          features: U.Hidden,
          ...fr({
            key: u,
            as: "input",
            type: "hidden",
            hidden: !0,
            readOnly: !0,
            form: t,
            disabled: a,
            name: u,
            value: i,
            ...l,
          }),
        }),
      ),
    )
  );
}
function at({ setForm: r, formId: t }) {
  return (
    o.useEffect(() => {
      if (t) {
        let a = document.getElementById(t);
        a && r(a);
      }
    }, [r, t]),
    t
      ? null
      : f.createElement(re, {
          features: U.Hidden,
          as: "input",
          type: "hidden",
          hidden: !0,
          readOnly: !0,
          ref: (a) => {
            if (!a) return;
            let s = a.closest("form");
            s && r(s);
          },
        })
  );
}
function st(r) {
  let t = r.parentElement,
    a = null;
  for (; t && !(t instanceof HTMLFieldSetElement); )
    t instanceof HTMLLegendElement && (a = t), (t = t.parentElement);
  let s = (t == null ? void 0 : t.getAttribute("disabled")) === "";
  return s && nt(a) ? !1 : s;
}
function nt(r) {
  if (!r) return !1;
  let t = r.previousElementSibling;
  for (; t !== null; ) {
    if (t instanceof HTMLLegendElement) return !1;
    t = t.previousElementSibling;
  }
  return !0;
}
var J = ((r) => (
  (r.Space = " "),
  (r.Enter = "Enter"),
  (r.Escape = "Escape"),
  (r.Backspace = "Backspace"),
  (r.Delete = "Delete"),
  (r.ArrowLeft = "ArrowLeft"),
  (r.ArrowUp = "ArrowUp"),
  (r.ArrowRight = "ArrowRight"),
  (r.ArrowDown = "ArrowDown"),
  (r.Home = "Home"),
  (r.End = "End"),
  (r.PageUp = "PageUp"),
  (r.PageDown = "PageDown"),
  (r.Tab = "Tab"),
  r
))(J || {});
function it(r, t) {
  return o.useMemo(() => {
    var a;
    if (r.type) return r.type;
    let s = (a = r.as) != null ? a : "button";
    if (
      (typeof s == "string" && s.toLowerCase() === "button") ||
      ((t == null ? void 0 : t.tagName) === "BUTTON" && !t.hasAttribute("type"))
    )
      return "button";
  }, [r.type, r.as, t]);
}
let lt = "div";
function ot(r, t) {
  let a = `headlessui-control-${o.useId()}`,
    [s, l] = Ce(),
    [n, d] = Le(),
    h = Se(),
    { disabled: u = h || !1, ...i } = r,
    m = o.useMemo(() => ({ disabled: u }), [u]),
    c = { ref: t, disabled: u || void 0, "aria-disabled": u || void 0 },
    p = H();
  return f.createElement(
    br,
    { value: u },
    f.createElement(
      l,
      { value: s },
      f.createElement(
        d,
        { value: n },
        f.createElement(
          vr,
          { id: a },
          p({
            ourProps: c,
            theirProps: {
              ...i,
              children: f.createElement(
                et,
                null,
                typeof i.children == "function" ? i.children(m) : i.children,
              ),
            },
            slot: m,
            defaultTag: lt,
            name: "Field",
          }),
        ),
      ),
    ),
  );
}
let _e = V(ot),
  te = o.createContext(null);
te.displayName = "GroupContext";
let dt = o.Fragment;
function ct(r) {
  var t;
  let [a, s] = o.useState(null),
    [l, n] = Ce(),
    [d, h] = Le(),
    u = o.useMemo(() => ({ switch: a, setSwitch: s }), [a, s]),
    i = {},
    m = r,
    c = H();
  return f.createElement(
    h,
    { name: "Switch.Description", value: d },
    f.createElement(
      n,
      {
        name: "Switch.Label",
        value: l,
        props: {
          htmlFor: (t = u.switch) == null ? void 0 : t.id,
          onClick(p) {
            a &&
              (p.currentTarget instanceof HTMLLabelElement &&
                p.preventDefault(),
              a.click(),
              a.focus({ preventScroll: !0 }));
          },
        },
      },
      f.createElement(
        te.Provider,
        { value: u },
        c({
          ourProps: i,
          theirProps: m,
          slot: {},
          defaultTag: dt,
          name: "Switch.Group",
        }),
      ),
    ),
  );
}
let ht = "button";
function ut(r, t) {
  var a;
  let s = o.useId(),
    l = yr(),
    n = Se(),
    {
      id: d = l || `headlessui-switch-${s}`,
      disabled: h = n || !1,
      checked: u,
      defaultChecked: i,
      onChange: m,
      name: c,
      value: p,
      form: g,
      autoFocus: v = !1,
      ...T
    } = r,
    N = o.useContext(te),
    [$, S] = o.useState(null),
    j = o.useRef(null),
    C = jr(j, t, N === null ? null : N.setSwitch, S),
    b = Zr(i),
    [y, O] = Jr(u, m, b ?? !1),
    We = Ne(),
    [ne, ie] = o.useState(!1),
    le = D(() => {
      ie(!0),
        O == null || O(!y),
        We.nextFrame(() => {
          ie(!1);
        });
    }),
    Ke = D((I) => {
      if (st(I.currentTarget)) return I.preventDefault();
      I.preventDefault(), le();
    }),
    Ye = D((I) => {
      I.key === J.Space
        ? (I.preventDefault(), le())
        : I.key === J.Enter && Vr(I.currentTarget);
    }),
    Je = D((I) => I.preventDefault()),
    Ze = wr(),
    Ve = kr(),
    { isFocusVisible: oe, focusProps: Qe } = Nr({ autoFocus: v }),
    { isHovered: de, hoverProps: Xe } = Cr({ isDisabled: h }),
    { pressed: ce, pressProps: er } = Lr({ disabled: h }),
    rr = o.useMemo(
      () => ({
        checked: y,
        disabled: h,
        hover: de,
        focus: oe,
        active: ce,
        autofocus: v,
        changing: ne,
      }),
      [y, de, oe, ce, h, ne, v],
    ),
    tr = Sr(
      {
        id: d,
        ref: C,
        role: "switch",
        type: it(r, $),
        tabIndex: r.tabIndex === -1 ? 0 : (a = r.tabIndex) != null ? a : 0,
        "aria-checked": y,
        "aria-labelledby": Ze,
        "aria-describedby": Ve,
        disabled: h || void 0,
        autoFocus: v,
        onClick: Ke,
        onKeyUp: Ye,
        onKeyPress: Je,
      },
      Qe,
      Xe,
      er,
    ),
    ar = o.useCallback(() => {
      if (b !== void 0) return O == null ? void 0 : O(b);
    }, [O, b]),
    sr = H();
  return f.createElement(
    f.Fragment,
    null,
    c != null &&
      f.createElement(tt, {
        disabled: h,
        data: { [c]: p || "on" },
        overrides: { type: "checkbox", checked: y },
        form: g,
        onReset: ar,
      }),
    sr({
      ourProps: tr,
      theirProps: T,
      slot: rr,
      defaultTag: ht,
      name: "Switch",
    }),
  );
}
let mt = V(ut),
  pt = ct,
  xt = X,
  gt = Q,
  G = Object.assign(mt, { Group: pt, Label: xt, Description: gt });
const ae = ({ item: r }) => {
    const a = R().pathname,
      { t: s } = q(),
      { setIsMobileSidebarOpen: l } = o.useContext(we);
    return e.jsx(e.Fragment, {
      children: e.jsx(A.Item, {
        to: r.url,
        as: L,
        onClick: () => l(!1),
        className: `${r.url == a ? "text-white bg-primary rounded-xl  hover:text-white hover:bg-primary dark:hover:text-white shadow-btnshdw active" : "text-link bg-transparent group/link "} `,
        children: e.jsxs("span", {
          className: "flex gap-3 align-center items-center",
          children: [
            r.selector
              ? e.jsx(G, {
                  checked: !0,
                  className:
                    "group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary",
                  children: e.jsx("span", {
                    className:
                      "size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6",
                  }),
                })
              : e.jsxs(e.Fragment, {
                  children: [
                    "  ",
                    r.icon
                      ? e.jsx(x, {
                          icon: r.icon,
                          className: `${r.color}`,
                          height: 18,
                        })
                      : e.jsx("span", {
                          className: `${r.url == a ? "dark:bg-white rounded-full mx-1.5 group-hover/link:bg-primary !bg-primary h-[6px] w-[6px]" : "h-[6px] w-[6px] bg-black/40 dark:bg-white rounded-full mx-1.5 group-hover/link:bg-primary"} `,
                        }),
                  ],
                }),
            e.jsx("span", {
              className: "max-w-36 overflow-hidden",
              children: s(`${r.name}`),
            }),
          ],
        }),
      }),
    });
  },
  ft = ({
    label: r,
    open: t,
    onClick: a,
    icon: s,
    children: l,
    className: n,
    selector: d,
  }) =>
    e.jsxs("div", {
      className: z("transition-all duration-300"),
      children: [
        e.jsxs("div", {
          className: z(
            "flex cursor-pointer mb-1 items-center justify-between rounded-lg px-4 py-[11px] gap-3 text-[15px] leading-[normal] font-normal text-link  hover:text-primary dark:text-white  dark:hover:text-primary",
            n,
          ),
          onClick: a,
          children: [
            e.jsxs("div", {
              className: "flex items-center gap-3",
              children: [
                d
                  ? e.jsx(G, {
                      checked: !0,
                      className:
                        "group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary",
                      children: e.jsx("span", {
                        className:
                          "size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6",
                      }),
                    })
                  : e.jsx(x, { icon: s, height: 18 }),
                e.jsx("span", { className: "truncate max-w-28", children: r }),
              ],
            }),
            e.jsx(hr, {
              className: z(
                "transform transition-transform",
                t ? "rotate-180" : "rotate-0",
              ),
            }),
          ],
        }),
        e.jsx("div", {
          className: z(
            "overflow-hidden transition-all duration-300",
            t ? "max-h-screen" : "max-h-0",
          ),
          children: l,
        }),
      ],
    }),
  se = ({ item: r }) => {
    const a = R().pathname,
      s = r.children.find((c) => c.url === a),
      { t: l, i18n: n } = q(),
      [d, h] = o.useState(null),
      [u, i] = o.useState(!s);
    o.useEffect(() => {
      (async () => {
        const p = l(`${r.name}`);
        h(p);
      })();
    }, [n.language, r.name, l]);
    const m = () => {
      i((c) => !c);
    };
    return e.jsx(ft, {
      label: d || `${r.name}`,
      open: u,
      onClick: m,
      icon: r.icon,
      selector: r.selector,
      className: s
        ? "!text-white bg-primary rounded-xl hover:bg-primary hover:text-white shadow-btnshdw"
        : "rounded-xl dark:text-white/80 hover:text-primary",
      children:
        r.children &&
        e.jsx("div", {
          className: "sidebar-dropdown",
          children: r.children.map((c) =>
            e.jsx(
              f.Fragment,
              {
                children: c.children
                  ? e.jsx(se, { item: c })
                  : e.jsx(ae, { item: c }),
              },
              c.id,
            ),
          ),
        }),
    });
  },
  bt = "/assets/logo-BFjfueis.svg",
  Z = () =>
    e.jsx(L, {
      to: "/",
      children: e.jsx("img", { src: bt, alt: "logo", className: "block" }),
    }),
  vt = () => {
    var u;
    const { selectedIconId: r, setSelectedIconId: t } = o.useContext(E) || {};
    console.log("I am here ", r);
    const a = Y.find((i) => i.id === r),
      l = R().pathname;
    function n(i, m, c = null) {
      for (const p of i) {
        const g = c ?? p.id;
        if (p.url === m) return g;
        if (p.children) {
          const v = n(p.children, m, g);
          if (v) return v;
        }
        if (p.items) {
          const v = n(p.items, m, g);
          if (v) return v;
        }
      }
      return null;
    }
    const d = (i) => {
        var m;
        return i.heading === "AI Models"
          ? e.jsx("div", {
              children:
                (m = i.children) == null
                  ? void 0
                  : m.map((c) =>
                      e.jsxs(
                        _e,
                        {
                          className:
                            "flex items-center gap-3 bg-lightgray dark:bg-dark py-2 px-4 rounded-md mb-2 ",
                          children: [
                            e.jsx(G, {
                              checked: !0,
                              className:
                                "group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary",
                              children: e.jsx("span", {
                                className:
                                  "size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6",
                              }),
                            }),
                            e.jsxs("div", {
                              children: [
                                e.jsx(X, {
                                  className: "text-ld cursor-pointer",
                                  children: c.name,
                                }),
                                e.jsx(Q, {
                                  className: "text-bodytext text-xs",
                                  children: c.description,
                                }),
                              ],
                            }),
                          ],
                        },
                        c.name,
                      ),
                    ),
            })
          : (i.heading, h(i));
      },
      h = (i) => {
        var m;
        return (m = i == null ? void 0 : i.children) == null
          ? void 0
          : m.map((c, p) =>
              e.jsx(
                f.Fragment,
                {
                  children: c.children
                    ? e.jsx(se, { item: c })
                    : e.jsx(ae, { item: c }),
                },
                c.id && p,
              ),
            );
      };
    return (
      o.useEffect(() => {
        const i = n(Y, l);
        console.log("find path result ", i), i && t(i);
      }, [l, t]),
      e.jsx(e.Fragment, {
        children: e.jsxs("div", {
          className: "xl:block hidden",
          children: [
            e.jsx("div", {
              className:
                "minisidebar-icon border-e border-ld  fixed start-0 z-[1]",
              children: e.jsx(Fe, {}),
            }),
            e.jsxs(A, {
              className:
                "fixed menu-sidebar  bg-white dark:bg-darkgray rtl:pe-4 rtl:ps-0 ",
              "aria-label": "Sidebar with multi-level dropdown example",
              children: [
                e.jsx("div", {
                  className: "px-6 py-4 flex items-center sidebarlogo",
                  children: e.jsx(Z, {}),
                }),
                e.jsx("div", {
                  className: "h-[calc(100vh_-_85px)]",
                  children: e.jsx(A.Items, {
                    className: "pe-4 rtl:pe-0 rtl:ps-4 px-5 mt-2",
                    children: e.jsx(A.ItemGroup, {
                      className: "sidebar-nav hide-menu",
                      children:
                        a &&
                        ((u = a.items) == null
                          ? void 0
                          : u.map((i, m) =>
                              e.jsx(
                                "div",
                                {
                                  className: "caption",
                                  children: e.jsxs(
                                    f.Fragment,
                                    {
                                      children: [
                                        e.jsx("h5", {
                                          className:
                                            "text-link dark:text-white/70 font-semibold caption font-semibold leading-6 tracking-widest text-xs text-sm  pb-2 uppercase",
                                          children: i.heading,
                                        }),
                                        d(i),
                                      ],
                                    },
                                    m,
                                  ),
                                },
                                i.heading,
                              ),
                            )),
                    }),
                  }),
                }),
              ],
            }),
          ],
        }),
      })
    );
  },
  yt = [
    {
      href: "/apps/chats",
      title: "Chat Application",
      subtext: "New messages arrived",
      icon: "solar:chat-line-bold-duotone",
      iconbg: "bg-lightprimary",
      iconcolor: "text-primary",
    },
    {
      href: "/apps/ecommerce/shop",
      title: "eCommerce App",
      subtext: "New stock available",
      icon: "solar:widget-6-bold-duotone",
      iconbg: "bg-lightsecondary",
      iconcolor: "text-secondary",
    },
    {
      href: "/apps/notes",
      title: "Notes App",
      subtext: "To-do and Daily tasks",
      icon: "solar:notes-bold-duotone",
      iconbg: "bg-lightwarning",
      iconcolor: "text-warning",
    },
    {
      href: "/apps/calendar",
      title: "Calendar App",
      subtext: "Get dates",
      icon: "solar:calendar-bold-duotone",
      iconbg: "bg-lighterror",
      iconcolor: "text-error",
    },
    {
      href: "/apps/contacts",
      title: "Contact Application",
      subtext: "2 Unsaved Contacts",
      icon: "solar:phone-calling-rounded-bold-duotone",
      iconbg: "bg-lighterror",
      iconcolor: "text-error",
    },
    {
      href: "/apps/tickets",
      title: "Tickets App",
      subtext: "Submit tickets",
      icon: "solar:ticket-sale-bold-duotone",
      iconbg: "bg-lightprimary",
      iconcolor: "text-primary",
    },
    {
      href: "/apps/email",
      title: "Email App",
      subtext: "Get new emails",
      icon: "solar:letter-bold-duotone",
      iconbg: "bg-lightsuccess",
      iconcolor: "text-success",
    },
    {
      href: "/apps/blog/post",
      title: "Blog App",
      subtext: "added new blog",
      icon: "solar:chat-square-like-bold-duotone",
      iconbg: "bg-lightsecondary",
      iconcolor: "text-secondary",
    },
  ],
  jt = [
    { title: "Analytics", href: "/dashboards/analytics" },
    { title: "eCommerce", href: "/dashboards/eCommerce" },
    { title: "CRM", href: "/dashboards/crm" },
    { title: "Contacts", href: "/dashboards/eCommerce" },
    { title: "Posts", href: "/dashboards/posts" },
    { title: "Details", href: "/dashboards/details" },
  ],
  wt = [
    {
      icon: "solar:widget-3-line-duotone",
      bgcolor: "bg-lighterror dark:bg-lighterror",
      color: "text-error",
      title: "Launch Admin",
      subtitle: "Just see the my new admin!",
      time: "9:30 AM",
    },
    {
      icon: "solar:calendar-line-duotone",
      bgcolor: "bg-lightprimary dark:bg-lightprimary",
      color: "text-primary",
      title: "Event Today",
      subtitle: "Just a reminder that you have event",
      time: "9:15 AM",
    },
    {
      icon: "solar:settings-line-duotone",
      bgcolor: "bg-lightsecondary dark:bg-lightsecondary",
      color: "text-secondary",
      title: "Settings",
      subtitle: "You can customize this template as you want",
      time: "4:36 PM",
    },
    {
      icon: "solar:widget-4-line-duotone",
      bgcolor: "bg-lightwarning dark:bg-lightwarning ",
      color: "text-warning",
      title: "Launch Admin",
      subtitle: "Just see the my new admin!",
      time: "9:30 AM",
    },
    {
      icon: "solar:calendar-line-duotone",
      bgcolor: "bg-lightprimary dark:bg-lightprimary",
      color: "text-primary",
      title: "Event Today",
      subtitle: "Just a reminder that you have event",
      time: "9:15 AM",
    },
    {
      icon: "solar:settings-line-duotone",
      bgcolor: "bg-lightsecondary dark:bg-lightsecondary",
      color: "text-secondary",
      title: "Settings",
      subtitle: "You can customize this template as you want",
      time: "4:36 PM",
    },
  ],
  kt = [
    { title: "My Profile", url: "/apps/user-profile/profile" },
    { title: "My Subscription", url: "/theme-pages/pricing" },
    { title: "My Invoice", url: "/apps/invoice" },
    { title: "Account Settings", url: "/theme-pages/account-settings" },
    { title: "Sign Out", url: "/auth/auth1/login" },
  ],
  Nt = () => {
    const [r, t] = o.useState(!1);
    return e.jsxs("div", {
      children: [
        e.jsx("button", {
          onClick: () => t(!0),
          className:
            "h-10 w-10 text-darklink  dark:text-white text-sm hover:text-primary  hover:bg-lightprimary dark:hover:text-primary dark:hover:bg-darkminisidebar  rounded-full flex justify-center items-center cursor-pointer",
          children: e.jsx(x, {
            icon: "solar:magnifer-line-duotone",
            height: 20,
          }),
        }),
        e.jsxs(he, {
          dismissible: !0,
          show: r,
          onClose: () => t(!1),
          children: [
            e.jsx("div", {
              className: "p-6 border-b border-ld",
              children: e.jsx(ur, {
                placeholder: "Search here",
                className: "form-control",
                sizing: "md",
                required: !0,
              }),
            }),
            e.jsx(he.Body, {
              className: "pt-0 ",
              children: e.jsxs("div", {
                className: "max-h-72",
                children: [
                  e.jsx("h5", {
                    className: "text-lg pt-5",
                    children: "Quick Page Links",
                  }),
                  jt.map((a, s) =>
                    e.jsxs(
                      L,
                      {
                        to: a.href,
                        className: "py-1 px-3  group relative",
                        children: [
                          e.jsx("h6", {
                            className:
                              "group-hover:text-primary mb-1 font-medium text-sm",
                            children: a.title,
                          }),
                          e.jsx("p", {
                            className: "text-xs text-bodytext",
                            children: a.href,
                          }),
                        ],
                      },
                      s,
                    ),
                  ),
                ],
              }),
            }),
          ],
        }),
      ],
    });
  },
  Ct = "/assets/mega-dd-bg-tkkf8VpG.jpg",
  Be = () => {
    const [r, t] = o.useState(!1),
      a = () => t(!1);
    return e.jsx(e.Fragment, {
      children: e.jsxs("div", {
        className: "relative group ",
        children: [
          e.jsx("span", {
            className:
              "h-10 w-10 text-darklink  dark:text-white text-sm hover:text-primary  hover:bg-lightprimary dark:hover:text-primary dark:hover:bg-darkminisidebar  rounded-full flex justify-center items-center cursor-pointer group-hover:bg-lightprimary group-hover:text-primary xl:flex hidden",
            children: e.jsx(x, {
              icon: "solar:widget-3-line-duotone",
              height: 20,
            }),
          }),
          e.jsx("span", {
            className:
              "xl:hidden block h-10 w-10 hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover:bg-lightprimary group-hover:text-primary ",
            onClick: () => t(!0),
            children: e.jsx(x, {
              icon: "solar:widget-3-line-duotone",
              height: 20,
            }),
          }),
          e.jsx("div", {
            className:
              "sm:w-[860px] w-screen dropdown  invisible  group-hover:visible absolute z-[10]",
            children: e.jsx(_, {
              open: r,
              onClose: a,
              position: "right",
              className:
                "xl:relative xl:transform-none xl:h-auto xl:bg-transparent xl:z-[0] xl:w-[860px] w-64",
              children: e.jsx("div", {
                className: "md:h-auto h-[calc(100vh_-_50px)]",
                children: e.jsxs("div", {
                  className: "grid grid-cols-12 w-full",
                  children: [
                    e.jsx("div", {
                      className:
                        "xl:col-span-8 col-span-12 flex items-stretch p-6",
                      children: e.jsx("div", {
                        className: "grid grid-cols-12 gap-3 w-full",
                        children: yt.map((s, l) =>
                          e.jsx(
                            "div",
                            {
                              className: "col-span-12 xl:col-span-6 ",
                              children: e.jsxs(L, {
                                to: s.href,
                                className:
                                  "flex gap-3 hover:text-primary group relative items-center",
                                children: [
                                  e.jsx("span", {
                                    className: `h-12 w-12 flex justify-center items-center rounded-tw ${s.iconbg}`,
                                    children: e.jsx(x, {
                                      icon: s.icon,
                                      height: 24,
                                      className: `${s.iconcolor}`,
                                    }),
                                  }),
                                  e.jsxs("div", {
                                    children: [
                                      e.jsx("h6", {
                                        className:
                                          "font-semibold text-15 text-ld hover:text-primary ",
                                        children: s.title,
                                      }),
                                      e.jsx("p", {
                                        className: "text-13 text-bodytext",
                                        children: s.subtext,
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            },
                            l,
                          ),
                        ),
                      }),
                    }),
                    e.jsx("div", {
                      className:
                        "xl:col-span-4 col-span-12  flex items-strech h-[300px] lg:block hidden",
                      children: e.jsx("img", {
                        src: Ct,
                        alt: "image",
                        className: "h-full w-full",
                      }),
                    }),
                  ],
                }),
              }),
            }),
          }),
        ],
      }),
    });
  },
  He = () =>
    e.jsx("div", {
      className: "relative group/menu",
      children: e.jsxs(F, {
        label: "",
        className: "w-screen sm:w-[360px] py-6  rounded-sm",
        dismissOnClick: !1,
        renderTrigger: () =>
          e.jsxs("div", {
            className: "relative",
            children: [
              e.jsx("span", {
                className:
                  "h-10 w-10 hover:bg-lightprimary text-darklink  dark:text-white rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary",
                children: e.jsx(x, {
                  icon: "solar:bell-bing-line-duotone",
                  height: 20,
                }),
              }),
              e.jsx("span", {
                className:
                  "rounded-full absolute end-1 top-1 bg-error text-[10px] h-4 w-4 flex justify-center items-center text-white",
                children: "5",
              }),
            ],
          }),
        children: [
          e.jsxs("div", {
            className: "flex items-center px-6 justify-between",
            children: [
              e.jsx("h3", {
                className: "mb-0 text-lg font-semibold text-ld",
                children: "Notifications",
              }),
              e.jsx(ke, { color: "primary", children: "5 new" }),
            ],
          }),
          e.jsx("div", {
            className: "max-h-80 mt-3",
            children: wt.map((r, t) =>
              e.jsx(
                F.Item,
                {
                  as: L,
                  to: "#",
                  className:
                    "px-6 py-3 flex justify-between items-center bg-hover group/link w-full",
                  children: e.jsxs("div", {
                    className: "flex items-center w-full",
                    children: [
                      e.jsx("div", {
                        className: `h-11 w-11 flex-shrink-0 rounded-full flex justify-center items-center ${r.bgcolor} `,
                        children: e.jsx(x, {
                          icon: r.icon,
                          height: 20,
                          className: r.color,
                        }),
                      }),
                      e.jsxs("div", {
                        className: "ps-4 flex justify-between w-full",
                        children: [
                          e.jsxs("div", {
                            className: "w-3/4 text-start",
                            children: [
                              e.jsx("h5", {
                                className:
                                  "mb-1 text-15 font-semibold group-hover/link:text-primary",
                                children: r.title,
                              }),
                              e.jsx("div", {
                                className: "text-sm text-bodytext line-clamp-1",
                                children: r.subtitle,
                              }),
                            ],
                          }),
                          e.jsx("div", {
                            className: "text-xs block self-start pt-1.5",
                            children: r.time,
                          }),
                        ],
                      }),
                    ],
                  }),
                },
                t,
              ),
            ),
          }),
          e.jsx("div", {
            className: "pt-5 px-6",
            children: e.jsx(w, {
              color: "primary",
              className: "w-full",
              children: "See All Notifications",
            }),
          }),
        ],
      }),
    }),
  qe = () => {
    const { user: r } = mr((s) => s.auth),
      t = pr(),
      a = (s) => {
        s.title === "Sign Out" && t(xr());
      };
    return e.jsx("div", {
      className: "relative ",
      children: e.jsxs(F, {
        label: "",
        className: "w-screen sm:w-[360px] pb-4 rounded-sm",
        dismissOnClick: !1,
        renderTrigger: () =>
          e.jsxs("div", {
            className: "flex items-center gap-1",
            children: [
              e.jsx("span", {
                className:
                  "h-10 w-10 hover:text-primary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary",
                children: e.jsx("img", {
                  src: ue,
                  alt: "logo",
                  height: "35",
                  width: "35",
                  className: "rounded-full",
                }),
              }),
              e.jsx(x, {
                icon: "solar:alt-arrow-down-bold",
                className:
                  "hover:text-primary dark:text-primary group-hover/menu:text-primary",
                height: 12,
              }),
            ],
          }),
        children: [
          e.jsx("div", {
            className: "px-6",
            children: e.jsxs("div", {
              className:
                "flex items-center gap-6 pb-5 border-b dark:border-darkborder mt-5 mb-3",
              children: [
                e.jsx("img", {
                  src: ue,
                  alt: "logo",
                  height: "56",
                  width: "56",
                  className: "rounded-full",
                }),
                e.jsxs("div", {
                  children: [
                    e.jsxs("h5", {
                      className: "text-15 font-semibold",
                      children: [
                        r && r.username,
                        " ",
                        e.jsx("span", {
                          className: "text-success",
                          children: "Pro",
                        }),
                      ],
                    }),
                    e.jsx("p", {
                      className: "text-sm text-ld opacity-80",
                      children: r && r.email,
                    }),
                  ],
                }),
              ],
            }),
          }),
          e.jsx("div", {
            children: kt.map((s, l) =>
              e.jsx(
                "div",
                {
                  className: "px-6 mb-2",
                  children: e.jsx(
                    F.Item,
                    {
                      className:
                        "px-3 py-2 flex justify-between items-center bg-hover group/link w-full rounded-md",
                      children: e.jsx("div", {
                        className: "flex items-center w-full ",
                        children: e.jsxs("div", {
                          className: " flex gap-3 w-full ",
                          children: [
                            e.jsx("h5", {
                              onClick: () => a(s),
                              className:
                                "text-15 font-normal group-hover/link:text-primary",
                              children: s.title,
                            }),
                            s.url == "/apps/invoice"
                              ? e.jsx(ke, {
                                  color: "lightprimary",
                                  children: "4",
                                })
                              : null,
                          ],
                        }),
                      }),
                    },
                    l,
                  ),
                },
                l,
              ),
            ),
          }),
        ],
      }),
    });
  },
  Lt =
    "data:image/svg+xml,%3csvg%20height='20'%20viewBox='0%200%2028%2020'%20width='28'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cdefs%3e%3crect%20id='a'%20height='20'%20rx='3'%20width='28'/%3e%3cmask%20id='b'%20fill='%23fff'%3e%3cuse%20fill='%23fff'%20fill-rule='evenodd'%20xlink:href='%23a'/%3e%3c/mask%3e%3c/defs%3e%3cg%20fill='none'%20fill-rule='evenodd'%3e%3cuse%20fill='%230a17a7'%20xlink:href='%23a'/%3e%3cpath%20d='m29.2824692-1.91644623%201.4911811%202.21076686-9.4483006%206.37223314%206.6746503.0001129v6.66666663l-6.6746503-.0007795%209.4483006%206.3731256-1.4911811%202.2107668-11.9501195-8.0608924.0009836%207.4777795h-6.6666666l-.000317-7.4777795-11.9488189%208.0608924-1.49118107-2.2107668%209.448-6.3731256-6.67434973.0007795v-6.66666663l6.67434973-.0001129-9.448-6.37223314%201.49118107-2.21076686%2011.9488189%208.06.000317-7.4768871h6.6666666l-.0009836%207.4768871z'%20fill='%23fff'%20mask='url(%23b)'/%3e%3cg%20stroke='%23db1f35'%20stroke-linecap='round'%20stroke-width='.667'%3e%3cpath%20d='m18.668%206.332%2012.665-8.332'%20mask='url(%23b)'/%3e%3cpath%20d='m20.013%2021.35%2011.354-7.652'%20mask='url(%23b)'%20transform='matrix(1%200%200%20-1%200%2035.048)'/%3e%3cpath%20d='m8.006%206.31-11.843-7.981'%20mask='url(%23b)'/%3e%3cpath%20d='m9.29%2022.31-13.127-8.705'%20mask='url(%23b)'%20transform='matrix(1%200%200%20-1%200%2035.915)'/%3e%3c/g%3e%3cpath%20d='m0%2012h12v8h4v-8h12v-4h-12v-8h-4v8h-12z'%20fill='%23e6273e'%20mask='url(%23b)'/%3e%3c/g%3e%3c/svg%3e",
  St =
    "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='28px'%20height='20px'%20viewBox='0%200%2028%2020'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3eic_flag_cn%3c/title%3e%3cg%20id='Page-1'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='ic_flag_cn'%3e%3crect%20id='Mask'%20fill='%23F1361D'%20x='0'%20y='0'%20width='28'%20height='20'%20rx='3'%3e%3c/rect%3e%3cpath%20d='M11.9592954,10.1560699%20L11.9708698,11.1384189%20L12.5105968,11.9592954%20L11.5282478,11.9708698%20L10.7073712,12.5105968%20L10.6957968,11.5282478%20L10.1560699,10.7073712%20L11.1384189,10.6957968%20L11.9592954,10.1560699%20Z%20M6.66666667,2.66666667%20L7.5836117,5.40460011%20L10.4708927,5.43059869%20L8.15031489,7.1487332%20L9.01780768,9.90273464%20L6.66666667,8.22666673%20L4.31552566,9.90273464%20L5.18301844,7.1487332%20L2.8624406,5.43059869%20L5.74972164,5.40460011%20L6.66666667,2.66666667%20Z%20M12.5685648,7.57446394%20L13.4490988,8.01012816%20L14.4255361,7.90189808%20L13.9898718,8.78243212%20L14.0981019,9.75886939%20L13.2175679,9.32320517%20L12.2411306,9.43143525%20L12.6767948,8.55090121%20L12.5685648,7.57446394%20Z%20M14,4.17863279%20L13.9772839,5.1607873%20L14.4880339,6%20L13.5058794,5.97728388%20L12.6666667,6.48803387%20L12.6893828,5.50587936%20L12.1786328,4.66666667%20L13.1607873,4.68938278%20L14,4.17863279%20Z%20M10.8992425,1.40597523%20L11.6255808,2.06747064%20L12.5940248,2.23257579%20L11.9325294,2.9589141%20L11.7674242,3.9273581%20L11.0410859,3.2658627%20L10.0726419,3.10075754%20L10.7341373,2.37441924%20L10.8992425,1.40597523%20Z'%20id='Combined-Shape'%20fill='%23FFDC42'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e",
  It =
    "data:image/svg+xml,%3csvg%20height='20'%20viewBox='0%200%2028%2020'%20width='28'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cdefs%3e%3crect%20id='a'%20height='20'%20rx='3'%20width='28'/%3e%3cmask%20id='b'%20fill='%23fff'%3e%3cuse%20fill='%23fff'%20fill-rule='evenodd'%20xlink:href='%23a'/%3e%3c/mask%3e%3c/defs%3e%3cg%20fill='none'%20fill-rule='evenodd'%3e%3cuse%20fill='%23fff'%20xlink:href='%23a'/%3e%3cpath%20d='m19%200h9v20h-9z'%20fill='%23f44653'%20mask='url(%23b)'/%3e%3cpath%20d='m0%200h9v20h-9z'%20fill='%231035bb'%20mask='url(%23b)'/%3e%3c/g%3e%3c/svg%3e",
  Et = "/assets/icon-flag-sa-BOwveY-t.svg",
  W = [
    { flagname: "English (UK)", icon: Lt, value: "en" },
    { flagname: "中国人 (Chinese)", icon: St, value: "ch" },
    { flagname: "français (French)", icon: It, value: "fr" },
    { flagname: "عربي (Arabic)", icon: Et, value: "ar" },
  ],
  Ue = () => {
    const { i18n: r } = q(),
      { isLanguage: t, setIsLanguage: a } = o.useContext(E),
      s = W.find((l) => l.value === t) || W[1];
    return (
      o.useEffect(() => {
        r.changeLanguage(t);
      }, [t]),
      e.jsx(e.Fragment, {
        children: e.jsx("div", {
          className: "relative group/menu",
          children: e.jsx(F, {
            label: "",
            className: "w-56  rounded-sm",
            dismissOnClick: !1,
            renderTrigger: () =>
              e.jsx("span", {
                className:
                  "h-8 w-8 hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary ",
                children: e.jsx("img", {
                  src: s.icon,
                  height: 35,
                  width: 32,
                  alt: "language",
                  className: "rounded-full h-5 w-5 object-cover cursor-pointer",
                }),
              }),
            children: W.map((l, n) =>
              e.jsxs(
                F.Item,
                {
                  className: "flex gap-3 items-center py-3 w-full",
                  onClick: () => a(l.value),
                  children: [
                    e.jsx("img", {
                      src: l.icon,
                      alt: "flag",
                      height: 24,
                      width: 24,
                      className: "rounded-full object-cover h-6 w-6",
                    }),
                    e.jsx("span", { children: l.flagname }),
                  ],
                },
                n,
              ),
            ),
          }),
        }),
      })
    );
  },
  Tt = () => {
    const { activeMode: r, setActiveMode: t } = o.useContext(E),
      a = () => {
        t((s) => (s === "light" ? "dark" : "light"));
      };
    return e.jsx(P, {
      fluid: !0,
      className: "rounded-none bg-white dark:bg-darkgray flex-1 px-9 ",
      children: e.jsx("div", {
        className: "xl:hidden block w-full",
        children: e.jsxs("div", {
          className: "flex gap-3 justify-center items-center",
          children: [
            r === "light"
              ? e.jsx("div", {
                  className:
                    "h-10 w-10 hover:text-primary hover:bg-lightprimary dark:hover:bg-darkminisidebar  dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-darklink  dark:text-white",
                  onClick: a,
                  children: e.jsx("span", {
                    className: "flex items-center",
                    children: e.jsx(x, {
                      icon: "solar:moon-line-duotone",
                      width: "20",
                    }),
                  }),
                })
              : e.jsx("div", {
                  className:
                    "h-10 w-10 hover:text-primary hover:bg-lightprimary dark:hover:bg-darkminisidebar  dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-darklink  dark:text-white",
                  onClick: a,
                  children: e.jsx("span", {
                    className: "flex items-center",
                    children: e.jsx(x, {
                      icon: "solar:sun-bold-duotone",
                      width: "20",
                    }),
                  }),
                }),
            e.jsx(He, {}),
            e.jsx(Be, {}),
            e.jsx(Ue, {}),
            e.jsx(qe, {}),
          ],
        }),
      }),
    });
  },
  $t = () => {
    var l;
    const { selectedIconId: r } = o.useContext(E) || {};
    console.log({ selectedIconId: r });
    const t = Y.find((n) => n.id === r),
      a = (n) => {
        var d;
        return n.heading === "AI Models"
          ? e.jsx(e.Fragment, {
              children:
                (d = n.children) == null
                  ? void 0
                  : d.map((h) =>
                      e.jsxs(
                        _e,
                        {
                          className:
                            "flex items-center gap-3 bg-lightgray dark:bg-dark py-2 px-4 rounded-md mb-2 ",
                          children: [
                            e.jsx(G, {
                              checked: !0,
                              className:
                                "group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary",
                              children: e.jsx("span", {
                                className:
                                  "size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6",
                              }),
                            }),
                            e.jsxs("div", {
                              children: [
                                e.jsx(X, {
                                  className: "text-ld cursor-pointer",
                                  children: h.name,
                                }),
                                e.jsx(Q, {
                                  className: "text-bodytext text-xs",
                                  children: h.description,
                                }),
                              ],
                            }),
                          ],
                        },
                        h.name,
                      ),
                    ),
            })
          : (n.heading, s(n));
      },
      s = (n) => {
        var d;
        return (d = n == null ? void 0 : n.children) == null
          ? void 0
          : d.map((h, u) =>
              e.jsx(
                f.Fragment,
                {
                  children: h.children
                    ? e.jsx(se, { item: h })
                    : e.jsx(ae, { item: h }),
                },
                h.id && u,
              ),
            );
      };
    return e.jsx(e.Fragment, {
      children: e.jsxs("div", {
        children: [
          e.jsx("div", {
            className:
              "minisidebar-icon border-e border-ld bg-white dark:bg-darkgray fixed start-0 z-[1] ",
            children: e.jsx(Fe, {}),
          }),
          e.jsx(A, {
            className:
              "fixed menu-sidebar pt-8 bg-white dark:bg-darkgray transition-all",
            "aria-label": "Sidebar with multi-level dropdown example",
            children: e.jsx("div", {
              className: "h-[calc(100vh_-_85px)]",
              children: e.jsx(A.Items, {
                className: "ps-4 pe-4",
                children: e.jsx(A.ItemGroup, {
                  className: "sidebar-nav",
                  children:
                    t &&
                    ((l = t.items) == null
                      ? void 0
                      : l.map((n, d) =>
                          e.jsxs(
                            f.Fragment,
                            {
                              children: [
                                e.jsx("h5", {
                                  className:
                                    "text-link font-semibold text-sm caption",
                                  children: n.heading,
                                }),
                                a(n),
                              ],
                            },
                            d,
                          ),
                        )),
                }),
              }),
            }),
          }),
        ],
      }),
    });
  },
  Ge = ({
    item: r,
    isActive: t,
    handleMouseEnter: a,
    handleMouseLeave: s,
    onClick: l,
    title: n,
  }) => {
    const [d, h] = o.useState(!1),
      i = R().pathname,
      m = () => {
        h(!0);
      },
      c = () => {
        h(!1);
      },
      { t: p } = q();
    return e.jsxs("div", {
      className: "relative group",
      onMouseEnter: m,
      onMouseLeave: c,
      onClick: l,
      children: [
        e.jsx(L, {
          to: r.href,
          children: e.jsx("p", {
            className: `w-full ${r.href === i ? "text-primary dark:text-primary hover:text-primary" : "group-hover/nav:bg-lightprimary group-hover/nav:text-primary"} py-1 px-3 rounded-md flex gap-3 items-center text-ld  hover:text-primary`,
            children: e.jsxs("span", {
              className: "flex gap-3 items-center w-full",
              children: [
                e.jsx(x, { icon: `${r.icon}`, height: 18 }),
                e.jsx("span", {
                  className: "line-clamp-1 max-w-24 overflow-hidden",
                  children: p(`${r.title}`),
                }),
                r.children && e.jsx(Pe, { size: 18, className: "ms-auto" }),
              ],
            }),
          }),
        }),
        d &&
          r.children &&
          e.jsx("div", {
            className: `absolute   top-0 mt-0 w-56 bg-white dark:bg-dark rounded-md shadow-lg ${n == "Tables" ? "tables-position" : "left-full rtl:right-full"}`,
            children: e.jsx("ul", {
              className: "p-3 flex flex-col gap-2",
              children: r.children.map((g) =>
                e.jsx(
                  "li",
                  {
                    children: g.children
                      ? e.jsx(Ge, {
                          item: g,
                          isActive: t,
                          handleMouseEnter: a,
                          handleMouseLeave: s,
                        })
                      : e.jsx(L, {
                          to: g.href,
                          children: e.jsxs("p", {
                            className: `group/menu hover:text-primary ${g.href == i ? "!text-primary " : "group-hover/nav:bg-lightprimary group-hover/nav:text-primary"} py-1 px-3 rounded-md flex gap-2 items-center text-ld opacity-80 hover:text-primary`,
                            children: [
                              e.jsx("span", {
                                className: ` ${g.href == i ? "bg-primary dark:bg-primary" : "bg-dark dark:bg-white"} group-hover/menu:bg-primary  rounded-md mx-1.5 h-[6px] w-[6px]`,
                              }),
                              p(`${g.title}`),
                            ],
                          }),
                        }),
                  },
                  g.id,
                ),
              ),
            }),
          }),
      ],
    });
  },
  ve = [
    {
      id: k.uniqueId(),
      title: "Dashboard",
      icon: "solar:layers-line-duotone",
      href: "",
      column: 1,
      children: [
        {
          id: k.uniqueId(),
          title: "External",
          icon: "solar:home-angle-outline",
          href: "#",
        },
        {
          id: k.uniqueId(),
          title: "Internal",
          icon: "solar:settings-minimalistic-line-duotone",
          href: "#",
        },
      ],
    },
  ],
  Mt = () => {
    const [r, t] = o.useState(null),
      [a, s] = o.useState(ve[0].id),
      n = R().pathname,
      d = (i) => {
        t(i), s(i);
      },
      h = () => {
        t(null);
      },
      u = (i) => {
        s(i);
      };
    return e.jsx(P, {
      fluid: !0,
      rounded: !0,
      className:
        "horizontal-nav bg-transparent dark:bg-transparent sm:px-0 xl:py-4 py-0",
      children: e.jsx(P.Collapse, {
        className: "xl:block",
        children: e.jsx("ul", {
          className: "flex items-center space-x-3",
          children: ve.map((i) => {
            let m = !1;
            return (
              i.children.find((c) => {
                c != null && c.children
                  ? c.children.find((g) => g.href === n) && (m = !0)
                  : c.href === n && (m = !0);
              }),
              e.jsx(
                "li",
                {
                  className: "relative group",
                  children: i.children
                    ? e.jsxs("div", {
                        className: "relative group",
                        onMouseEnter: () => d(i.id),
                        children: [
                          e.jsx("p", {
                            className: `w-full ${m ? "text-white bg-primary shadow-btnshdw" : "group-hover:bg-lightprimary group-hover:text-primary"} py-2 px-3 rounded-md flex gap-3 items-center text-ld`,
                            children: e.jsx(L, {
                              to: i.href,
                              children: e.jsxs("span", {
                                className: "flex gap-2 items-center w-full ",
                                children: [
                                  e.jsx(x, { icon: `${i.icon}`, height: 18 }),
                                  e.jsx("span", { children: i.title }),
                                  i.children &&
                                    e.jsx(Pe, {
                                      size: 18,
                                      className: "ms-auto",
                                    }),
                                ],
                              }),
                            }),
                          }),
                          r === i.id &&
                            e.jsx("div", {
                              className: `absolute left-0 rtl:right-0 mt-2  bg-white dark:bg-dark rounded-md shadow-lg ${i.column == 4 ? "w-screen max-w-[800px]" : "w-52"}`,
                              onMouseEnter: () => d(i.id),
                              onMouseLeave: h,
                              children: e.jsx("ul", {
                                className: `p-3 text-sm  gap-2  ${i.column == 4 ? "two-cols" : "flex flex-col"} `,
                                children: i.children.map((c) =>
                                  e.jsx(
                                    "li",
                                    {
                                      className: ` ${i.column == 4 ? "mb-2" : ""} `,
                                      children: e.jsx(Ge, {
                                        item: c,
                                        title: i.title,
                                        isActive: r === i.id,
                                        handleMouseEnter: () => d(i.id),
                                        handleMouseLeave: h,
                                        onClick: () => u(i.id),
                                      }),
                                    },
                                    c.id,
                                  ),
                                ),
                              }),
                            }),
                        ],
                      })
                    : e.jsx(L, {
                        to: i.href,
                        children: e.jsxs("p", {
                          className: `py-2 px-3 rounded-md flex gap-3 items-center ${a === i.id ? "bg-error text-white" : "group-hover/nav:bg-primary group-hover/nav:text-primary"}`,
                          children: [
                            e.jsx(x, { icon: `${i.icon}`, height: 18 }),
                            e.jsx("span", { children: `${i.title}` }),
                          ],
                        }),
                      }),
                },
                i.id,
              )
            );
          }),
        }),
      }),
    });
  },
  At = () => e.jsx(e.Fragment, { children: e.jsx(Mt, {}) }),
  ye = ({ layoutType: r }) => {
    const [t, a] = o.useState(!1);
    o.useEffect(() => {
      const g = () => {
        window.scrollY > 50 ? a(!0) : a(!1);
      };
      return (
        window.addEventListener("scroll", g),
        () => {
          window.removeEventListener("scroll", g);
        }
      );
    }, []);
    const { isLayout: s, activeMode: l, setActiveMode: n } = o.useContext(E),
      { isMobileSidebarOpen: d, setIsMobileSidebarOpen: h } = o.useContext(we),
      [u, i] = o.useState(""),
      m = () => {
        i(u === "active" ? "" : "active");
      },
      c = () => {
        n((g) => (g === "light" ? "dark" : "light"));
      },
      p = () => h(!1);
    return e.jsxs(e.Fragment, {
      children: [
        e.jsxs("header", {
          className: `top-0 z-[5]  ${t ? "bg-white dark:bg-darkgray sticky" : "bg-transparent"}`,
          children: [
            e.jsxs(P, {
              fluid: !0,
              className: `rounded-none bg-transparent dark:bg-transparent py-4 sm:px-[15px] px-2 ${r == "horizontal" ? "container mx-auto !px-6" : ""}  ${s == "full" ? "!max-w-full " : ""}`,
              children: [
                e.jsx("span", {
                  onClick: () => h(!0),
                  className:
                    "h-10 w-10 flex text-black dark:text-white text-opacity-65 xl:hidden hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer",
                  children: e.jsx(x, {
                    icon: "solar:hamburger-menu-line-duotone",
                    height: 21,
                  }),
                }),
                e.jsx(P.Collapse, {
                  className: "xl:block ",
                  children: e.jsxs("div", {
                    className: "flex gap-3 items-center relative",
                    children: [
                      r == "horizontal"
                        ? e.jsx("div", {
                            className: "me-3",
                            children: e.jsx(Z, {}),
                          })
                        : null,
                      e.jsx(Nt, {}),
                      e.jsx(Be, {}),
                    ],
                  }),
                }),
                e.jsx("div", {
                  className: "block xl:hidden",
                  children: e.jsx(Z, {}),
                }),
                e.jsx(P.Collapse, {
                  className: "xl:block hidden",
                  children: e.jsxs("div", {
                    className: "flex gap-3 items-center",
                    children: [
                      l === "light"
                        ? e.jsx("div", {
                            className:
                              "h-10 w-10 hover:text-primary hover:bg-lightprimary dark:hover:bg-darkminisidebar  dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-darklink  dark:text-white",
                            onClick: c,
                            children: e.jsx("span", {
                              className: "flex items-center",
                              children: e.jsx(x, {
                                icon: "solar:moon-line-duotone",
                                width: "20",
                              }),
                            }),
                          })
                        : e.jsx("div", {
                            className:
                              "h-10 w-10 hover:text-primary hover:bg-lightprimary dark:hover:bg-darkminisidebar  dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-darklink  dark:text-white",
                            onClick: c,
                            children: e.jsx("span", {
                              className: "flex items-center",
                              children: e.jsx(x, {
                                icon: "solar:sun-bold-duotone",
                                width: "20",
                              }),
                            }),
                          }),
                      e.jsx(He, {}),
                      e.jsx(Ue, {}),
                      e.jsx(qe, {}),
                    ],
                  }),
                }),
                e.jsx("span", {
                  className:
                    "h-10 w-10 flex xl:hidden hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer",
                  onClick: m,
                  children: e.jsx(x, { icon: "tabler:dots", height: 21 }),
                }),
              ],
            }),
            e.jsx("div", {
              className: `w-full  xl:hidden block mobile-header-menu ${u}`,
              children: e.jsx(Tt, {}),
            }),
            r == "horizontal"
              ? e.jsx("div", {
                  className: "xl:border-t xl:border-ld",
                  children: e.jsx("div", {
                    className: `${s == "full" ? "w-full px-6" : "container"}`,
                    children: e.jsx(At, {}),
                  }),
                })
              : null,
          ],
        }),
        e.jsx(_, {
          open: d,
          onClose: p,
          className: "w-130",
          children: e.jsx(_.Items, { children: e.jsx($t, {}) }),
        }),
      ],
    });
  },
  Rt = () => {
    const { activeLayout: r, isLayout: t } = o.useContext(E);
    return e.jsx(e.Fragment, {
      children: e.jsx("div", {
        className: "flex w-full min-h-screen dark:bg-darkgray",
        children: e.jsxs("div", {
          className: "page-wrapper flex w-full  ",
          children: [
            r == "vertical" ? e.jsx(vt, {}) : null,
            e.jsxs("div", {
              className:
                "page-wrapper-sub flex flex-col w-full dark:bg-darkgray",
              children: [
                r == "horizontal"
                  ? e.jsx(ye, { layoutType: "horizontal" })
                  : e.jsx(ye, { layoutType: "vertical" }),
                e.jsxs("div", {
                  className: `bg-lightgray dark:bg-dark  h-full ${r != "horizontal" ? "rounded-bb" : "rounded-none"} `,
                  children: [
                    e.jsx("div", {
                      className: ` ${t == "full" ? "w-full py-30 md:px-30 px-5" : "container mx-auto  py-30"} ${r == "horizontal" ? "xl:mt-3" : ""}
              `,
                      children: e.jsx(Ir, { children: e.jsx(gr, {}) }),
                    }),
                    e.jsx(Yr, {}),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    });
  };
export { Rt as default };
