import { r as S } from "./index-CqYDJsbz.js";
const ie = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }),
  M = Object.freeze({ rotate: 0, vFlip: !1, hFlip: !1 }),
  z = Object.freeze({ ...ie, ...M }),
  H = Object.freeze({ ...z, body: "", hidden: !1 });
function ye(e, n) {
  const o = {};
  !e.hFlip != !n.hFlip && (o.hFlip = !0),
    !e.vFlip != !n.vFlip && (o.vFlip = !0);
  const i = ((e.rotate || 0) + (n.rotate || 0)) % 4;
  return i && (o.rotate = i), o;
}
function B(e, n) {
  const o = ye(e, n);
  for (const i in H)
    i in M
      ? i in e && !(i in o) && (o[i] = M[i])
      : i in n
        ? (o[i] = n[i])
        : i in e && (o[i] = e[i]);
  return o;
}
function xe(e, n) {
  const o = e.icons,
    i = e.aliases || Object.create(null),
    t = Object.create(null);
  function r(s) {
    if (o[s]) return (t[s] = []);
    if (!(s in t)) {
      t[s] = null;
      const l = i[s] && i[s].parent,
        c = l && r(l);
      c && (t[s] = [l].concat(c));
    }
    return t[s];
  }
  return Object.keys(o).concat(Object.keys(i)).forEach(r), t;
}
function be(e, n, o) {
  const i = e.icons,
    t = e.aliases || Object.create(null);
  let r = {};
  function s(l) {
    r = B(i[l] || t[l], r);
  }
  return s(n), o.forEach(s), B(e, r);
}
function re(e, n) {
  const o = [];
  if (typeof e != "object" || typeof e.icons != "object") return o;
  e.not_found instanceof Array &&
    e.not_found.forEach((t) => {
      n(t, null), o.push(t);
    });
  const i = xe(e);
  for (const t in i) {
    const r = i[t];
    r && (n(t, be(e, t, r)), o.push(t));
  }
  return o;
}
const Ie = { provider: "", aliases: {}, not_found: {}, ...ie };
function D(e, n) {
  for (const o in n) if (o in e && typeof e[o] != typeof n[o]) return !1;
  return !0;
}
function se(e) {
  if (typeof e != "object" || e === null) return null;
  const n = e;
  if (
    typeof n.prefix != "string" ||
    !e.icons ||
    typeof e.icons != "object" ||
    !D(e, Ie)
  )
    return null;
  const o = n.icons;
  for (const t in o) {
    const r = o[t];
    if (!t || typeof r.body != "string" || !D(r, H)) return null;
  }
  const i = n.aliases || Object.create(null);
  for (const t in i) {
    const r = i[t],
      s = r.parent;
    if (!t || typeof s != "string" || (!o[s] && !i[s]) || !D(r, H)) return null;
  }
  return n;
}
const ce = /^[a-z0-9]+(-[a-z0-9]+)*$/,
  N = (e, n, o, i = "") => {
    const t = e.split(":");
    if (e.slice(0, 1) === "@") {
      if (t.length < 2 || t.length > 3) return null;
      i = t.shift().slice(1);
    }
    if (t.length > 3 || !t.length) return null;
    if (t.length > 1) {
      const l = t.pop(),
        c = t.pop(),
        f = { provider: t.length > 0 ? t[0] : i, prefix: c, name: l };
      return n && !L(f) ? null : f;
    }
    const r = t[0],
      s = r.split("-");
    if (s.length > 1) {
      const l = { provider: i, prefix: s.shift(), name: s.join("-") };
      return n && !L(l) ? null : l;
    }
    if (o && i === "") {
      const l = { provider: i, prefix: "", name: r };
      return n && !L(l, o) ? null : l;
    }
    return null;
  },
  L = (e, n) => (e ? !!(((n && e.prefix === "") || e.prefix) && e.name) : !1),
  W = Object.create(null);
function we(e, n) {
  return {
    provider: e,
    prefix: n,
    icons: Object.create(null),
    missing: new Set(),
  };
}
function T(e, n) {
  const o = W[e] || (W[e] = Object.create(null));
  return o[n] || (o[n] = we(e, n));
}
function le(e, n) {
  return se(n)
    ? re(n, (o, i) => {
        i ? (e.icons[o] = i) : e.missing.add(o);
      })
    : [];
}
function Se(e, n, o) {
  try {
    if (typeof o.body == "string") return (e.icons[n] = { ...o }), !0;
  } catch {}
  return !1;
}
let O = !1;
function fe(e) {
  return typeof e == "boolean" && (O = e), O;
}
function J(e) {
  const n = typeof e == "string" ? N(e, !0, O) : e;
  if (n) {
    const o = T(n.provider, n.prefix),
      i = n.name;
    return o.icons[i] || (o.missing.has(i) ? null : void 0);
  }
}
function ke(e, n) {
  const o = N(e, !0, O);
  if (!o) return !1;
  const i = T(o.provider, o.prefix);
  return n ? Se(i, o.name, n) : (i.missing.add(o.name), !0);
}
function ve(e, n) {
  if (typeof e != "object") return !1;
  if ((typeof n != "string" && (n = e.provider || ""), O && !n && !e.prefix)) {
    let t = !1;
    return (
      se(e) &&
        ((e.prefix = ""),
        re(e, (r, s) => {
          ke(r, s) && (t = !0);
        })),
      t
    );
  }
  const o = e.prefix;
  if (!L({ prefix: o, name: "a" })) return !1;
  const i = T(n, o);
  return !!le(i, e);
}
const ue = Object.freeze({ width: null, height: null }),
  ae = Object.freeze({ ...ue, ...M }),
  Te = /(-?[0-9.]*[0-9]+[0-9.]*)/g,
  Pe = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function K(e, n, o) {
  if (n === 1) return e;
  if (((o = o || 100), typeof e == "number")) return Math.ceil(e * n * o) / o;
  if (typeof e != "string") return e;
  const i = e.split(Te);
  if (i === null || !i.length) return e;
  const t = [];
  let r = i.shift(),
    s = Pe.test(r);
  for (;;) {
    if (s) {
      const l = parseFloat(r);
      isNaN(l) ? t.push(r) : t.push(Math.ceil(l * n * o) / o);
    } else t.push(r);
    if (((r = i.shift()), r === void 0)) return t.join("");
    s = !s;
  }
}
function Ce(e, n = "defs") {
  let o = "";
  const i = e.indexOf("<" + n);
  for (; i >= 0; ) {
    const t = e.indexOf(">", i),
      r = e.indexOf("</" + n);
    if (t === -1 || r === -1) break;
    const s = e.indexOf(">", r);
    if (s === -1) break;
    (o += e.slice(t + 1, r).trim()),
      (e = e.slice(0, i).trim() + e.slice(s + 1));
  }
  return { defs: o, content: e };
}
function Ee(e, n) {
  return e ? "<defs>" + e + "</defs>" + n : n;
}
function je(e, n, o) {
  const i = Ce(e);
  return Ee(i.defs, n + i.content + o);
}
const Oe = (e) => e === "unset" || e === "undefined" || e === "none";
function Fe(e, n) {
  const o = { ...z, ...e },
    i = { ...ae, ...n },
    t = { left: o.left, top: o.top, width: o.width, height: o.height };
  let r = o.body;
  [o, i].forEach((x) => {
    const a = [],
      h = x.hFlip,
      k = x.vFlip;
    let b = x.rotate;
    h
      ? k
        ? (b += 2)
        : (a.push(
            "translate(" +
              (t.width + t.left).toString() +
              " " +
              (0 - t.top).toString() +
              ")",
          ),
          a.push("scale(-1 1)"),
          (t.top = t.left = 0))
      : k &&
        (a.push(
          "translate(" +
            (0 - t.left).toString() +
            " " +
            (t.height + t.top).toString() +
            ")",
        ),
        a.push("scale(1 -1)"),
        (t.top = t.left = 0));
    let I;
    switch ((b < 0 && (b -= Math.floor(b / 4) * 4), (b = b % 4), b)) {
      case 1:
        (I = t.height / 2 + t.top),
          a.unshift("rotate(90 " + I.toString() + " " + I.toString() + ")");
        break;
      case 2:
        a.unshift(
          "rotate(180 " +
            (t.width / 2 + t.left).toString() +
            " " +
            (t.height / 2 + t.top).toString() +
            ")",
        );
        break;
      case 3:
        (I = t.width / 2 + t.left),
          a.unshift("rotate(-90 " + I.toString() + " " + I.toString() + ")");
        break;
    }
    b % 2 === 1 &&
      (t.left !== t.top && ((I = t.left), (t.left = t.top), (t.top = I)),
      t.width !== t.height &&
        ((I = t.width), (t.width = t.height), (t.height = I))),
      a.length && (r = je(r, '<g transform="' + a.join(" ") + '">', "</g>"));
  });
  const s = i.width,
    l = i.height,
    c = t.width,
    f = t.height;
  let u, d;
  s === null
    ? ((d = l === null ? "1em" : l === "auto" ? f : l), (u = K(d, c / f)))
    : ((u = s === "auto" ? c : s),
      (d = l === null ? K(u, f / c) : l === "auto" ? f : l));
  const p = {},
    g = (x, a) => {
      Oe(a) || (p[x] = a.toString());
    };
  g("width", u), g("height", d);
  const y = [t.left, t.top, c, f];
  return (p.viewBox = y.join(" ")), { attributes: p, viewBox: y, body: r };
}
const Le = /\sid="(\S+)"/g,
  Ae =
    "IconifyId" +
    Date.now().toString(16) +
    ((Math.random() * 16777216) | 0).toString(16);
let Me = 0;
function Ne(e, n = Ae) {
  const o = [];
  let i;
  for (; (i = Le.exec(e)); ) o.push(i[1]);
  if (!o.length) return e;
  const t = "suffix" + ((Math.random() * 16777216) | Date.now()).toString(16);
  return (
    o.forEach((r) => {
      const s = typeof n == "function" ? n(r) : n + (Me++).toString(),
        l = r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      e = e.replace(
        new RegExp('([#;"])(' + l + ')([")]|\\.[a-z])', "g"),
        "$1" + s + t + "$3",
      );
    }),
    (e = e.replace(new RegExp(t, "g"), "")),
    e
  );
}
const Q = Object.create(null);
function Re(e, n) {
  Q[e] = n;
}
function U(e) {
  return Q[e] || Q[""];
}
function $(e) {
  let n;
  if (typeof e.resources == "string") n = [e.resources];
  else if (((n = e.resources), !(n instanceof Array) || !n.length)) return null;
  return {
    resources: n,
    path: e.path || "/",
    maxURL: e.maxURL || 500,
    rotate: e.rotate || 750,
    timeout: e.timeout || 5e3,
    random: e.random === !0,
    index: e.index || 0,
    dataAfterTimeout: e.dataAfterTimeout !== !1,
  };
}
const V = Object.create(null),
  C = ["https://api.simplesvg.com", "https://api.unisvg.com"],
  A = [];
for (; C.length > 0; )
  C.length === 1 || Math.random() > 0.5 ? A.push(C.shift()) : A.push(C.pop());
V[""] = $({ resources: ["https://api.iconify.design"].concat(A) });
function De(e, n) {
  const o = $(n);
  return o === null ? !1 : ((V[e] = o), !0);
}
function G(e) {
  return V[e];
}
const _e = () => {
  let e;
  try {
    if (((e = fetch), typeof e == "function")) return e;
  } catch {}
};
let X = _e();
function He(e, n) {
  const o = G(e);
  if (!o) return 0;
  let i;
  if (!o.maxURL) i = 0;
  else {
    let t = 0;
    o.resources.forEach((s) => {
      t = Math.max(t, s.length);
    });
    const r = n + ".json?icons=";
    i = o.maxURL - t - o.path.length - r.length;
  }
  return i;
}
function Qe(e) {
  return e === 404;
}
const Ue = (e, n, o) => {
  const i = [],
    t = He(e, n),
    r = "icons";
  let s = { type: r, provider: e, prefix: n, icons: [] },
    l = 0;
  return (
    o.forEach((c, f) => {
      (l += c.length + 1),
        l >= t &&
          f > 0 &&
          (i.push(s),
          (s = { type: r, provider: e, prefix: n, icons: [] }),
          (l = c.length)),
        s.icons.push(c);
    }),
    i.push(s),
    i
  );
};
function qe(e) {
  if (typeof e == "string") {
    const n = G(e);
    if (n) return n.path;
  }
  return "/";
}
const ze = (e, n, o) => {
    if (!X) {
      o("abort", 424);
      return;
    }
    let i = qe(n.provider);
    switch (n.type) {
      case "icons": {
        const r = n.prefix,
          l = n.icons.join(","),
          c = new URLSearchParams({ icons: l });
        i += r + ".json?" + c.toString();
        break;
      }
      case "custom": {
        const r = n.uri;
        i += r.slice(0, 1) === "/" ? r.slice(1) : r;
        break;
      }
      default:
        o("abort", 400);
        return;
    }
    let t = 503;
    X(e + i)
      .then((r) => {
        const s = r.status;
        if (s !== 200) {
          setTimeout(() => {
            o(Qe(s) ? "abort" : "next", s);
          });
          return;
        }
        return (t = 501), r.json();
      })
      .then((r) => {
        if (typeof r != "object" || r === null) {
          setTimeout(() => {
            r === 404 ? o("abort", r) : o("next", t);
          });
          return;
        }
        setTimeout(() => {
          o("success", r);
        });
      })
      .catch(() => {
        o("next", t);
      });
  },
  $e = { prepare: Ue, send: ze };
function Ve(e) {
  const n = { loaded: [], missing: [], pending: [] },
    o = Object.create(null);
  e.sort((t, r) =>
    t.provider !== r.provider
      ? t.provider.localeCompare(r.provider)
      : t.prefix !== r.prefix
        ? t.prefix.localeCompare(r.prefix)
        : t.name.localeCompare(r.name),
  );
  let i = { provider: "", prefix: "", name: "" };
  return (
    e.forEach((t) => {
      if (
        i.name === t.name &&
        i.prefix === t.prefix &&
        i.provider === t.provider
      )
        return;
      i = t;
      const r = t.provider,
        s = t.prefix,
        l = t.name,
        c = o[r] || (o[r] = Object.create(null)),
        f = c[s] || (c[s] = T(r, s));
      let u;
      l in f.icons
        ? (u = n.loaded)
        : s === "" || f.missing.has(l)
          ? (u = n.missing)
          : (u = n.pending);
      const d = { provider: r, prefix: s, name: l };
      u.push(d);
    }),
    n
  );
}
function de(e, n) {
  e.forEach((o) => {
    const i = o.loaderCallbacks;
    i && (o.loaderCallbacks = i.filter((t) => t.id !== n));
  });
}
function Ge(e) {
  e.pendingCallbacksFlag ||
    ((e.pendingCallbacksFlag = !0),
    setTimeout(() => {
      e.pendingCallbacksFlag = !1;
      const n = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
      if (!n.length) return;
      let o = !1;
      const i = e.provider,
        t = e.prefix;
      n.forEach((r) => {
        const s = r.icons,
          l = s.pending.length;
        (s.pending = s.pending.filter((c) => {
          if (c.prefix !== t) return !0;
          const f = c.name;
          if (e.icons[f]) s.loaded.push({ provider: i, prefix: t, name: f });
          else if (e.missing.has(f))
            s.missing.push({ provider: i, prefix: t, name: f });
          else return (o = !0), !0;
          return !1;
        })),
          s.pending.length !== l &&
            (o || de([e], r.id),
            r.callback(
              s.loaded.slice(0),
              s.missing.slice(0),
              s.pending.slice(0),
              r.abort,
            ));
      });
    }));
}
let Be = 0;
function We(e, n, o) {
  const i = Be++,
    t = de.bind(null, o, i);
  if (!n.pending.length) return t;
  const r = { id: i, icons: n, callback: e, abort: t };
  return (
    o.forEach((s) => {
      (s.loaderCallbacks || (s.loaderCallbacks = [])).push(r);
    }),
    t
  );
}
function Je(e, n = !0, o = !1) {
  const i = [];
  return (
    e.forEach((t) => {
      const r = typeof t == "string" ? N(t, n, o) : t;
      r && i.push(r);
    }),
    i
  );
}
var Ke = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1,
};
function Xe(e, n, o, i) {
  const t = e.resources.length,
    r = e.random ? Math.floor(Math.random() * t) : e.index;
  let s;
  if (e.random) {
    let m = e.resources.slice(0);
    for (s = []; m.length > 1; ) {
      const w = Math.floor(Math.random() * m.length);
      s.push(m[w]), (m = m.slice(0, w).concat(m.slice(w + 1)));
    }
    s = s.concat(m);
  } else s = e.resources.slice(r).concat(e.resources.slice(0, r));
  const l = Date.now();
  let c = "pending",
    f = 0,
    u,
    d = null,
    p = [],
    g = [];
  typeof i == "function" && g.push(i);
  function y() {
    d && (clearTimeout(d), (d = null));
  }
  function x() {
    c === "pending" && (c = "aborted"),
      y(),
      p.forEach((m) => {
        m.status === "pending" && (m.status = "aborted");
      }),
      (p = []);
  }
  function a(m, w) {
    w && (g = []), typeof m == "function" && g.push(m);
  }
  function h() {
    return {
      startTime: l,
      payload: n,
      status: c,
      queriesSent: f,
      queriesPending: p.length,
      subscribe: a,
      abort: x,
    };
  }
  function k() {
    (c = "failed"),
      g.forEach((m) => {
        m(void 0, u);
      });
  }
  function b() {
    p.forEach((m) => {
      m.status === "pending" && (m.status = "aborted");
    }),
      (p = []);
  }
  function I(m, w, P) {
    const F = w !== "success";
    switch (((p = p.filter((v) => v !== m)), c)) {
      case "pending":
        break;
      case "failed":
        if (F || !e.dataAfterTimeout) return;
        break;
      default:
        return;
    }
    if (w === "abort") {
      (u = P), k();
      return;
    }
    if (F) {
      (u = P), p.length || (s.length ? R() : k());
      return;
    }
    if ((y(), b(), !e.random)) {
      const v = e.resources.indexOf(m.resource);
      v !== -1 && v !== e.index && (e.index = v);
    }
    (c = "completed"),
      g.forEach((v) => {
        v(P);
      });
  }
  function R() {
    if (c !== "pending") return;
    y();
    const m = s.shift();
    if (m === void 0) {
      if (p.length) {
        d = setTimeout(() => {
          y(), c === "pending" && (b(), k());
        }, e.timeout);
        return;
      }
      k();
      return;
    }
    const w = {
      status: "pending",
      resource: m,
      callback: (P, F) => {
        I(w, P, F);
      },
    };
    p.push(w), f++, (d = setTimeout(R, e.rotate)), o(m, n, w.callback);
  }
  return setTimeout(R), h;
}
function he(e) {
  const n = { ...Ke, ...e };
  let o = [];
  function i() {
    o = o.filter((l) => l().status === "pending");
  }
  function t(l, c, f) {
    const u = Xe(n, l, c, (d, p) => {
      i(), f && f(d, p);
    });
    return o.push(u), u;
  }
  function r(l) {
    return o.find((c) => l(c)) || null;
  }
  return {
    query: t,
    find: r,
    setIndex: (l) => {
      n.index = l;
    },
    getIndex: () => n.index,
    cleanup: i,
  };
}
function Y() {}
const _ = Object.create(null);
function Ye(e) {
  if (!_[e]) {
    const n = G(e);
    if (!n) return;
    const o = he(n),
      i = { config: n, redundancy: o };
    _[e] = i;
  }
  return _[e];
}
function Ze(e, n, o) {
  let i, t;
  if (typeof e == "string") {
    const r = U(e);
    if (!r) return o(void 0, 424), Y;
    t = r.send;
    const s = Ye(e);
    s && (i = s.redundancy);
  } else {
    const r = $(e);
    if (r) {
      i = he(r);
      const s = e.resources ? e.resources[0] : "",
        l = U(s);
      l && (t = l.send);
    }
  }
  return !i || !t ? (o(void 0, 424), Y) : i.query(n, t, o)().abort;
}
function Z() {}
function et(e) {
  e.iconsLoaderFlag ||
    ((e.iconsLoaderFlag = !0),
    setTimeout(() => {
      (e.iconsLoaderFlag = !1), Ge(e);
    }));
}
function tt(e) {
  const n = [],
    o = [];
  return (
    e.forEach((i) => {
      (i.match(ce) ? n : o).push(i);
    }),
    { valid: n, invalid: o }
  );
}
function E(e, n, o) {
  function i() {
    const t = e.pendingIcons;
    n.forEach((r) => {
      t && t.delete(r), e.icons[r] || e.missing.add(r);
    });
  }
  if (o && typeof o == "object")
    try {
      if (!le(e, o).length) {
        i();
        return;
      }
    } catch (t) {
      console.error(t);
    }
  i(), et(e);
}
function ee(e, n) {
  e instanceof Promise
    ? e
        .then((o) => {
          n(o);
        })
        .catch(() => {
          n(null);
        })
    : n(e);
}
function nt(e, n) {
  e.iconsToLoad
    ? (e.iconsToLoad = e.iconsToLoad.concat(n).sort())
    : (e.iconsToLoad = n),
    e.iconsQueueFlag ||
      ((e.iconsQueueFlag = !0),
      setTimeout(() => {
        e.iconsQueueFlag = !1;
        const { provider: o, prefix: i } = e,
          t = e.iconsToLoad;
        if ((delete e.iconsToLoad, !t || !t.length)) return;
        const r = e.loadIcon;
        if (e.loadIcons && (t.length > 1 || !r)) {
          ee(e.loadIcons(t, i, o), (u) => {
            E(e, t, u);
          });
          return;
        }
        if (r) {
          t.forEach((u) => {
            const d = r(u, i, o);
            ee(d, (p) => {
              const g = p ? { prefix: i, icons: { [u]: p } } : null;
              E(e, [u], g);
            });
          });
          return;
        }
        const { valid: s, invalid: l } = tt(t);
        if ((l.length && E(e, l, null), !s.length)) return;
        const c = i.match(ce) ? U(o) : null;
        if (!c) {
          E(e, s, null);
          return;
        }
        c.prepare(o, i, s).forEach((u) => {
          Ze(o, u, (d) => {
            E(e, u.icons, d);
          });
        });
      }));
}
const ot = (e, n) => {
  const o = Je(e, !0, fe()),
    i = Ve(o);
  if (!i.pending.length) {
    let c = !0;
    return (
      n &&
        setTimeout(() => {
          c && n(i.loaded, i.missing, i.pending, Z);
        }),
      () => {
        c = !1;
      }
    );
  }
  const t = Object.create(null),
    r = [];
  let s, l;
  return (
    i.pending.forEach((c) => {
      const { provider: f, prefix: u } = c;
      if (u === l && f === s) return;
      (s = f), (l = u), r.push(T(f, u));
      const d = t[f] || (t[f] = Object.create(null));
      d[u] || (d[u] = []);
    }),
    i.pending.forEach((c) => {
      const { provider: f, prefix: u, name: d } = c,
        p = T(f, u),
        g = p.pendingIcons || (p.pendingIcons = new Set());
      g.has(d) || (g.add(d), t[f][u].push(d));
    }),
    r.forEach((c) => {
      const f = t[c.provider][c.prefix];
      f.length && nt(c, f);
    }),
    n ? We(n, i, r) : Z
  );
};
function it(e, n) {
  const o = { ...e };
  for (const i in n) {
    const t = n[i],
      r = typeof t;
    i in ue
      ? (t === null || (t && (r === "string" || r === "number"))) && (o[i] = t)
      : r === typeof o[i] && (o[i] = i === "rotate" ? t % 4 : t);
  }
  return o;
}
const rt = /[\s,]+/;
function st(e, n) {
  n.split(rt).forEach((o) => {
    switch (o.trim()) {
      case "horizontal":
        e.hFlip = !0;
        break;
      case "vertical":
        e.vFlip = !0;
        break;
    }
  });
}
function ct(e, n = 0) {
  const o = e.replace(/^-?[0-9.]*/, "");
  function i(t) {
    for (; t < 0; ) t += 4;
    return t % 4;
  }
  if (o === "") {
    const t = parseInt(e);
    return isNaN(t) ? 0 : i(t);
  } else if (o !== e) {
    let t = 0;
    switch (o) {
      case "%":
        t = 25;
        break;
      case "deg":
        t = 90;
    }
    if (t) {
      let r = parseFloat(e.slice(0, e.length - o.length));
      return isNaN(r) ? 0 : ((r = r / t), r % 1 === 0 ? i(r) : 0);
    }
  }
  return n;
}
function lt(e, n) {
  let o =
    e.indexOf("xlink:") === -1
      ? ""
      : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const i in n) o += " " + i + '="' + n[i] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + o + ">" + e + "</svg>";
}
function ft(e) {
  return e
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")
    .replace(/\s+/g, " ");
}
function ut(e) {
  return "data:image/svg+xml," + ft(e);
}
function at(e) {
  return 'url("' + ut(e) + '")';
}
let j;
function dt() {
  try {
    j = window.trustedTypes.createPolicy("iconify", { createHTML: (e) => e });
  } catch {
    j = null;
  }
}
function ht(e) {
  return j === void 0 && dt(), j ? j.createHTML(e) : e;
}
const pe = { ...ae, inline: !1 },
  pt = {
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    "aria-hidden": !0,
    role: "img",
  },
  gt = { display: "inline-block" },
  q = { backgroundColor: "currentColor" },
  ge = { backgroundColor: "transparent" },
  te = { Image: "var(--svg)", Repeat: "no-repeat", Size: "100% 100%" },
  ne = { WebkitMask: q, mask: q, background: ge };
for (const e in ne) {
  const n = ne[e];
  for (const o in te) n[e + o] = te[o];
}
const mt = { ...pe, inline: !0 };
function oe(e) {
  return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
const yt = (e, n, o) => {
  const i = n.inline ? mt : pe,
    t = it(i, n),
    r = n.mode || "svg",
    s = {},
    l = n.style || {},
    c = { ...(r === "svg" ? pt : {}) };
  if (o) {
    const a = N(o, !1, !0);
    if (a) {
      const h = ["iconify"],
        k = ["provider", "prefix"];
      for (const b of k) a[b] && h.push("iconify--" + a[b]);
      c.className = h.join(" ");
    }
  }
  for (let a in n) {
    const h = n[a];
    if (h !== void 0)
      switch (a) {
        case "icon":
        case "style":
        case "children":
        case "onLoad":
        case "mode":
        case "ssr":
          break;
        case "_ref":
          c.ref = h;
          break;
        case "className":
          c[a] = (c[a] ? c[a] + " " : "") + h;
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          t[a] = h === !0 || h === "true" || h === 1;
          break;
        case "flip":
          typeof h == "string" && st(t, h);
          break;
        case "color":
          s.color = h;
          break;
        case "rotate":
          typeof h == "string"
            ? (t[a] = ct(h))
            : typeof h == "number" && (t[a] = h);
          break;
        case "ariaHidden":
        case "aria-hidden":
          h !== !0 && h !== "true" && delete c["aria-hidden"];
          break;
        default:
          i[a] === void 0 && (c[a] = h);
      }
  }
  const f = Fe(e, t),
    u = f.attributes;
  if ((t.inline && (s.verticalAlign = "-0.125em"), r === "svg")) {
    (c.style = { ...s, ...l }), Object.assign(c, u);
    let a = 0,
      h = n.id;
    return (
      typeof h == "string" && (h = h.replace(/-/g, "_")),
      (c.dangerouslySetInnerHTML = {
        __html: ht(Ne(f.body, h ? () => h + "ID" + a++ : "iconifyReact")),
      }),
      S.createElement("svg", c)
    );
  }
  const { body: d, width: p, height: g } = e,
    y = r === "mask" || (r === "bg" ? !1 : d.indexOf("currentColor") !== -1),
    x = lt(d, { ...u, width: p + "", height: g + "" });
  return (
    (c.style = {
      ...s,
      "--svg": at(x),
      width: oe(u.width),
      height: oe(u.height),
      ...gt,
      ...(y ? q : ge),
      ...l,
    }),
    S.createElement("span", c)
  );
};
fe(!0);
Re("", $e);
if (typeof document < "u" && typeof window < "u") {
  const e = window;
  if (e.IconifyPreload !== void 0) {
    const n = e.IconifyPreload,
      o = "Invalid IconifyPreload syntax.";
    typeof n == "object" &&
      n !== null &&
      (n instanceof Array ? n : [n]).forEach((i) => {
        try {
          (typeof i != "object" ||
            i === null ||
            i instanceof Array ||
            typeof i.icons != "object" ||
            typeof i.prefix != "string" ||
            !ve(i)) &&
            console.error(o);
        } catch {
          console.error(o);
        }
      });
  }
  if (e.IconifyProviders !== void 0) {
    const n = e.IconifyProviders;
    if (typeof n == "object" && n !== null)
      for (let o in n) {
        const i = "IconifyProviders[" + o + "] is invalid.";
        try {
          const t = n[o];
          if (typeof t != "object" || !t || t.resources === void 0) continue;
          De(o, t) || console.error(i);
        } catch {
          console.error(i);
        }
      }
  }
}
function me(e) {
  const [n, o] = S.useState(!!e.ssr),
    [i, t] = S.useState({});
  function r(g) {
    if (g) {
      const y = e.icon;
      if (typeof y == "object") return { name: "", data: y };
      const x = J(y);
      if (x) return { name: y, data: x };
    }
    return { name: "" };
  }
  const [s, l] = S.useState(r(!!e.ssr));
  function c() {
    const g = i.callback;
    g && (g(), t({}));
  }
  function f(g) {
    if (JSON.stringify(s) !== JSON.stringify(g)) return c(), l(g), !0;
  }
  function u() {
    var g;
    const y = e.icon;
    if (typeof y == "object") {
      f({ name: "", data: y });
      return;
    }
    const x = J(y);
    if (f({ name: y, data: x }))
      if (x === void 0) {
        const a = ot([y], u);
        t({ callback: a });
      } else x && ((g = e.onLoad) === null || g === void 0 || g.call(e, y));
  }
  S.useEffect(() => (o(!0), c), []),
    S.useEffect(() => {
      n && u();
    }, [e.icon, n]);
  const { name: d, data: p } = s;
  return p
    ? yt({ ...z, ...p }, e, d)
    : e.children
      ? e.children
      : S.createElement("span", {});
}
const bt = S.forwardRef((e, n) => me({ ...e, _ref: n }));
S.forwardRef((e, n) => me({ inline: !0, ...e, _ref: n }));
export { bt as I };
