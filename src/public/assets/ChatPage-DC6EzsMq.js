import {
  F as I,
  G as R,
  I as E,
  J as B,
  K as q,
  P as V,
  Q as $,
  r as h,
  m as F,
  j as e,
  p as U,
  k as y,
  i as N,
  U as T,
  h as Y,
  x as G,
  V as z,
  l as k,
  c as K,
  B as J,
  H,
  D as X,
  n as Z,
  W as ee,
} from "./index-CqYDJsbz.js";
import { I as b } from "./iconify-DcqE7M9x.js";
import { C as te, B as se } from "./BreadcrumbComp-Cq4Ee2ip.js";
let ne = {};
function ae() {
  return ne;
}
function _(t) {
  const n = I(t),
    s = new Date(
      Date.UTC(
        n.getFullYear(),
        n.getMonth(),
        n.getDate(),
        n.getHours(),
        n.getMinutes(),
        n.getSeconds(),
        n.getMilliseconds(),
      ),
    );
  return s.setUTCFullYear(n.getFullYear()), +t - +s;
}
function re(t, ...n) {
  const s = R.bind(null, t || n.find((a) => typeof a == "object"));
  return n.map(s);
}
function ie(t, n) {
  const s = +I(t) - +I(n);
  return s < 0 ? -1 : s > 0 ? 1 : s;
}
function oe(t) {
  return R(t, Date.now());
}
function le(t) {
  return (n) => {
    const a = (t ? Math[t] : Math.trunc)(n);
    return a === 0 ? 0 : a;
  };
}
const ce = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds",
    },
    xSeconds: { one: "1 second", other: "{{count}} seconds" },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes",
    },
    xMinutes: { one: "1 minute", other: "{{count}} minutes" },
    aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
    xHours: { one: "1 hour", other: "{{count}} hours" },
    xDays: { one: "1 day", other: "{{count}} days" },
    aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
    xWeeks: { one: "1 week", other: "{{count}} weeks" },
    aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
    xMonths: { one: "1 month", other: "{{count}} months" },
    aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
    xYears: { one: "1 year", other: "{{count}} years" },
    overXYears: { one: "over 1 year", other: "over {{count}} years" },
    almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
  },
  de = (t, n, s) => {
    let a;
    const o = ce[t];
    return (
      typeof o == "string"
        ? (a = o)
        : n === 1
          ? (a = o.one)
          : (a = o.other.replace("{{count}}", n.toString())),
      s != null && s.addSuffix
        ? s.comparison && s.comparison > 0
          ? "in " + a
          : a + " ago"
        : a
    );
  };
function A(t) {
  return (n = {}) => {
    const s = n.width ? String(n.width) : t.defaultWidth;
    return t.formats[s] || t.formats[t.defaultWidth];
  };
}
const me = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy",
  },
  ue = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a",
  },
  he = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}",
  },
  xe = {
    date: A({ formats: me, defaultWidth: "full" }),
    time: A({ formats: ue, defaultWidth: "full" }),
    dateTime: A({ formats: he, defaultWidth: "full" }),
  },
  fe = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P",
  },
  ge = (t, n, s, a) => fe[t];
function S(t) {
  return (n, s) => {
    const a = s != null && s.context ? String(s.context) : "standalone";
    let o;
    if (a === "formatting" && t.formattingValues) {
      const l = t.defaultFormattingWidth || t.defaultWidth,
        m = s != null && s.width ? String(s.width) : l;
      o = t.formattingValues[m] || t.formattingValues[l];
    } else {
      const l = t.defaultWidth,
        m = s != null && s.width ? String(s.width) : t.defaultWidth;
      o = t.values[m] || t.values[l];
    }
    const c = t.argumentCallback ? t.argumentCallback(n) : n;
    return o[c];
  };
}
const pe = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"],
  },
  ve = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
  },
  je = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    wide: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  be = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
  ye = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
  },
  we = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
  },
  Ne = (t, n) => {
    const s = Number(t),
      a = s % 100;
    if (a > 20 || a < 10)
      switch (a % 10) {
        case 1:
          return s + "st";
        case 2:
          return s + "nd";
        case 3:
          return s + "rd";
      }
    return s + "th";
  },
  Me = {
    ordinalNumber: Ne,
    era: S({ values: pe, defaultWidth: "wide" }),
    quarter: S({
      values: ve,
      defaultWidth: "wide",
      argumentCallback: (t) => t - 1,
    }),
    month: S({ values: je, defaultWidth: "wide" }),
    day: S({ values: be, defaultWidth: "wide" }),
    dayPeriod: S({
      values: ye,
      defaultWidth: "wide",
      formattingValues: we,
      defaultFormattingWidth: "wide",
    }),
  };
function C(t) {
  return (n, s = {}) => {
    const a = s.width,
      o = (a && t.matchPatterns[a]) || t.matchPatterns[t.defaultMatchWidth],
      c = n.match(o);
    if (!c) return null;
    const l = c[0],
      m = (a && t.parsePatterns[a]) || t.parsePatterns[t.defaultParseWidth],
      v = Array.isArray(m) ? Ce(m, (f) => f.test(l)) : Se(m, (f) => f.test(l));
    let x;
    (x = t.valueCallback ? t.valueCallback(v) : v),
      (x = s.valueCallback ? s.valueCallback(x) : x);
    const j = n.slice(l.length);
    return { value: x, rest: j };
  };
}
function Se(t, n) {
  for (const s in t)
    if (Object.prototype.hasOwnProperty.call(t, s) && n(t[s])) return s;
}
function Ce(t, n) {
  for (let s = 0; s < t.length; s++) if (n(t[s])) return s;
}
function ke(t) {
  return (n, s = {}) => {
    const a = n.match(t.matchPattern);
    if (!a) return null;
    const o = a[0],
      c = n.match(t.parsePattern);
    if (!c) return null;
    let l = t.valueCallback ? t.valueCallback(c[0]) : c[0];
    l = s.valueCallback ? s.valueCallback(l) : l;
    const m = n.slice(o.length);
    return { value: l, rest: m };
  };
}
const Pe = /^(\d+)(th|st|nd|rd)?/i,
  De = /\d+/i,
  We = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i,
  },
  Fe = { any: [/^b/i, /^(a|c)/i] },
  Ae = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i,
  },
  Ie = { any: [/1/i, /2/i, /3/i, /4/i] },
  Te = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
  },
  ze = {
    narrow: [
      /^j/i,
      /^f/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i,
    ],
    any: [
      /^ja/i,
      /^f/i,
      /^mar/i,
      /^ap/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i,
    ],
  },
  Oe = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
  },
  Ee = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
  },
  Be = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
  },
  qe = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i,
    },
  },
  Ve = {
    ordinalNumber: ke({
      matchPattern: Pe,
      parsePattern: De,
      valueCallback: (t) => parseInt(t, 10),
    }),
    era: C({
      matchPatterns: We,
      defaultMatchWidth: "wide",
      parsePatterns: Fe,
      defaultParseWidth: "any",
    }),
    quarter: C({
      matchPatterns: Ae,
      defaultMatchWidth: "wide",
      parsePatterns: Ie,
      defaultParseWidth: "any",
      valueCallback: (t) => t + 1,
    }),
    month: C({
      matchPatterns: Te,
      defaultMatchWidth: "wide",
      parsePatterns: ze,
      defaultParseWidth: "any",
    }),
    day: C({
      matchPatterns: Oe,
      defaultMatchWidth: "wide",
      parsePatterns: Ee,
      defaultParseWidth: "any",
    }),
    dayPeriod: C({
      matchPatterns: Be,
      defaultMatchWidth: "any",
      parsePatterns: qe,
      defaultParseWidth: "any",
    }),
  },
  _e = {
    code: "en-US",
    formatDistance: de,
    formatLong: xe,
    formatRelative: ge,
    localize: Me,
    match: Ve,
    options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
  };
function Le(t, n, s) {
  const a = ae(),
    o = (s == null ? void 0 : s.locale) ?? a.locale ?? _e,
    c = ie(t, n);
  if (isNaN(c)) throw new RangeError("Invalid time value");
  const l = Object.assign({}, s, {
      addSuffix: s == null ? void 0 : s.addSuffix,
      comparison: c,
    }),
    [m, v] = re(s == null ? void 0 : s.in, ...(c > 0 ? [n, t] : [t, n])),
    x = le((s == null ? void 0 : s.roundingMethod) ?? "round"),
    j = v.getTime() - m.getTime(),
    f = j / V,
    d = _(v) - _(m),
    i = (j - d) / V,
    w = s == null ? void 0 : s.unit;
  let g;
  if (
    (w
      ? (g = w)
      : f < 1
        ? (g = "second")
        : f < 60
          ? (g = "minute")
          : f < E
            ? (g = "hour")
            : i < B
              ? (g = "day")
              : i < q
                ? (g = "month")
                : (g = "year"),
    g === "second")
  ) {
    const r = x(j / 1e3);
    return o.formatDistance("xSeconds", r, l);
  } else if (g === "minute") {
    const r = x(f);
    return o.formatDistance("xMinutes", r, l);
  } else if (g === "hour") {
    const r = x(f / 60);
    return o.formatDistance("xHours", r, l);
  } else if (g === "day") {
    const r = x(i / E);
    return o.formatDistance("xDays", r, l);
  } else if (g === "month") {
    const r = x(i / B);
    return r === 12 && w !== "month"
      ? o.formatDistance("xYears", 1, l)
      : o.formatDistance("xMonths", r, l);
  } else {
    const r = x(i / q);
    return o.formatDistance("xYears", r, l);
  }
}
function O(t, n) {
  return Le(t, oe(t), n);
}
const Q = $.create();
Q.interceptors.response.use(
  (t) => t,
  (t) => Promise.reject((t.response && t.response.data) || "Wrong Services"),
);
const P = h.createContext({
    chatData: [],
    chatContent: [],
    chatSearch: "",
    selectedChat: null,
    loading: !0,
    activeChatId: null,
    setChatContent: () => {},
    setChatSearch: () => {},
    setSelectedChat: () => {},
    setActiveChatId: () => {},
    sendMessage: () => {},
    setLoading: () => {},
  }),
  Re = ({ children: t }) => {
    const [n, s] = h.useState([]),
      [a, o] = h.useState([]),
      [c, l] = h.useState(""),
      [m, v] = h.useState(null),
      [x, j] = h.useState(1),
      [f, d] = h.useState(!0),
      { chatRooms: i } = F((r) => r.chatRoom);
    console.log("response ", i),
      h.useEffect(() => {
        var r;
        v(i == null ? void 0 : i.chats[0]),
          j((r = i == null ? void 0 : i.chats[0]) == null ? void 0 : r.id);
      }, []),
      h.useEffect(() => {
        s(i == null ? void 0 : i.chats);
      }, [n, a, c, i]),
      h.useEffect(() => {
        const r = n.find(
          (p) => (p == null ? void 0 : p.id) === (m == null ? void 0 : m.id),
        );
        v(r), j(r == null ? void 0 : r.id);
      }, [n]);
    const g = {
      chatData: n,
      chatContent: a,
      chatSearch: c,
      selectedChat: m,
      loading: f,
      activeChatId: x,
      setChatContent: o,
      setChatSearch: l,
      setSelectedChat: v,
      setActiveChatId: j,
      sendMessage: async (r, p) => {
        try {
          const u = await Q.post("/api/sendMessage", { chatId: r, message: p });
          if (u.status === 201) {
            const D = u.data;
            v((M) => ({ ...M, messages: [...M.messages, D] })),
              s((M) =>
                M.map((W) =>
                  W.id === r ? { ...W, messages: [...W.messages, D] } : W,
                ),
              );
          } else console.error("Failed to send message:");
        } catch (u) {
          console.error("Error sending message:", u);
        }
      },
      setLoading: d,
    };
    return e.jsx(P.Provider, { value: g, children: t });
  },
  Ye = () => {
    const { user: t } = F((r) => r.auth),
      n = [
        { icon: "solar:settings-outline", listtitle: "Setting", divider: !0 },
        {
          icon: "solar:question-circle-outline",
          listtitle: "Help and feedback",
          divider: !1,
        },
        { icon: "solar:logout-2-outline", listtitle: "Sign Out", divider: !1 },
      ],
      s = (r) => {
        var p;
        return (p = k.last(r.messages)) == null ? void 0 : p.createdAt;
      },
      a = (r) => {
        let p = "";
        const u = r.messages[r.messages.length - 1];
        if (u) {
          const D = u.senderId === r.id ? "You: " : "",
            M = u.type === "image" ? "Sent a photo" : u.msg;
          p = `${D}${M}`;
        }
        return p;
      },
      {
        chatData: o,
        chatSearch: c,
        setChatSearch: l,
        setSelectedChat: m,
        setActiveChatId: v,
        activeChatId: x,
      } = h.useContext(P),
      j = (r) => {
        l(r.target.value);
      },
      f =
        o == null
          ? void 0
          : o.filter((r) => r.name.toLowerCase().includes(c.toLowerCase())),
      d = f.filter((r) => r.name === "Genie Bot"),
      i = f.filter((r) => r.name !== "Genie Bot"),
      w = (r) => {
        const p = r.id;
        m(r), v(p);
      },
      g = (r) => {
        const p = r.find((u) => u.name === "Genie Bot");
        return e.jsxs(e.Fragment, {
          children: [
            e.jsx(G, {
              className:
                "flex justify-start h-8 p-2 bg-lightprimary text-ld dark:bg-lightprimary",
              children: p ? "Agents" : "Employees",
            }),
            r.map((u) =>
              e.jsxs(
                "div",
                {
                  className: `cursor-pointer py-4 px-6 gap-0 flex justify-between group bg-hover ${x === u.id ? "bg-lighthover dark:bg-darkmuted" : "initial"}`,
                  onClick: () => w(u),
                  children: [
                    e.jsxs("div", {
                      className: "flex items-center gap-3 max-w-[235px] w-full",
                      children: [
                        e.jsxs("div", {
                          className: "relative min-w-12",
                          children: [
                            e.jsx("img", {
                              src: u.thumb ?? z,
                              height: 48,
                              width: 48,
                              alt: "user",
                              className: "rounded-full",
                            }),
                            u.status == "online"
                              ? e.jsx(y, {
                                  color: "success",
                                  className:
                                    "p-0 h-2 w-2 absolute bottom-1 end-0",
                                })
                              : u.status == "busy"
                                ? e.jsx(y, {
                                    color: "error",
                                    className:
                                      "p-0 h-2 w-2 absolute bottom-1 end-0",
                                  })
                                : u.status == "away"
                                  ? e.jsx(y, {
                                      color: "warning",
                                      className:
                                        "p-0 h-2 w-2 absolute bottom-1 end-0",
                                    })
                                  : e.jsx(y, {
                                      color: "primary",
                                      className:
                                        "p-0 h-2 w-2 absolute bottom-1 end-0",
                                    }),
                          ],
                        }),
                        e.jsxs("div", {
                          children: [
                            e.jsx("h5", {
                              className: "text-sm mb-1",
                              children: u.name,
                            }),
                            e.jsx("div", {
                              className:
                                "text-sm text-ld opacity-90 line-clamp-1",
                              children: a(u),
                            }),
                          ],
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "text-xs pt-1",
                      children: [
                        O(new Date(s(u)), { addSuffix: !1 }),
                        u.name === "Genie Bot" &&
                          e.jsx("div", {
                            className:
                              "pt-1 text-sm text-ld opacity-90 line-clamp-1 flex justify-end",
                            children: e.jsx(b, {
                              icon: "ri:chat-new-fill",
                              height: "20",
                            }),
                          }),
                      ],
                    }),
                  ],
                },
                u.id,
              ),
            ),
            " ",
          ],
        });
      };
    return e.jsx(e.Fragment, {
      children: e.jsxs("div", {
        className: "left-part  w-full px-0 ",
        children: [
          e.jsxs("div", {
            className: "flex justify-between items-center px-6",
            children: [
              e.jsxs("div", {
                className: "flex items-center gap-3",
                children: [
                  e.jsxs("div", {
                    className: "relative",
                    children: [
                      e.jsx("img", {
                        src: U,
                        height: 56,
                        width: 56,
                        alt: "user",
                        className: "rounded-full",
                      }),
                      e.jsx(y, {
                        color: "success",
                        className: "p-0 h-2 w-2 absolute bottom-1 end-0",
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    children: [
                      e.jsx("h5", {
                        className: "text-sm mb-1",
                        children: t.username,
                      }),
                      e.jsx("p", {
                        className: "text-darklink dark:text-bodytext text-xs",
                        children: "Marketing Director",
                      }),
                    ],
                  }),
                ],
              }),
              e.jsx(N, {
                label: "",
                dismissOnClick: !1,
                renderTrigger: () =>
                  e.jsx("span", {
                    className:
                      "h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer ",
                    children: e.jsx(T, { size: 22 }),
                  }),
                children: n.map((r, p) =>
                  e.jsxs(
                    h.Fragment,
                    {
                      children: [
                        e.jsxs(N.Item, {
                          className: "flex gap-3",
                          children: [
                            e.jsx(b, { icon: `${r.icon}`, height: 18 }),
                            e.jsx("span", { children: r.listtitle }),
                          ],
                        }),
                        r.divider == !0 ? e.jsx(N.Divider, {}) : null,
                      ],
                    },
                    p,
                  ),
                ),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "px-6",
            children: [
              e.jsx("div", {
                className:
                  "flex gap-3 bg-white dark:bg-transparent  py-5 items-center ",
                children: e.jsx(Y, {
                  id: "search",
                  placeholder: "Search contacts",
                  onChange: j,
                  value: c,
                  className: "form-control w-full",
                  sizing: "md",
                  required: !0,
                  icon: () =>
                    e.jsx(b, {
                      icon: "solar:magnifer-line-duotone",
                      height: 18,
                    }),
                }),
              }),
              e.jsx("div", {
                className: "sorting mb-3",
                children: e.jsxs(N, {
                  label: "Recent Chats",
                  children: [
                    e.jsx(N.Item, { children: "Sort by Time" }),
                    e.jsx(N.Item, { children: "Sort by Unread" }),
                    e.jsx(N.Divider, {}),
                    e.jsx(N.Item, { children: "Sort by Pinned" }),
                  ],
                }),
              }),
            ],
          }),
          e.jsxs("div", {
            className: "max-h-[600px] h-[calc(100vh_-_100px)]",
            children: [g(d), g(i)],
          }),
        ],
      }),
    });
  },
  L = () => {
    const { selectedChat: t } = h.useContext(P),
      n = k.uniq(
        k.flatten(t == null ? void 0 : t.messages.map((a) => a.attachment)),
      ).length,
      s =
        k.uniq(
          k.flatten(
            t == null
              ? void 0
              : t.messages.map((a) =>
                  (a == null ? void 0 : a.type) === "image" ? a.msg : null,
                ),
          ),
        ).length - 1;
    return e.jsx(e.Fragment, {
      children: e.jsxs("div", {
        className: "p-5",
        children: [
          e.jsxs("h6", {
            className: "text-sm",
            children: [" Media (", s, ")"],
          }),
          e.jsx("div", {
            className: "mt-3",
            children: e.jsx(e.Fragment, {
              children: e.jsx(K.Fragment, {
                children:
                  t == null
                    ? void 0
                    : t.messages.map((a, o) =>
                        e.jsx(
                          "div",
                          {
                            className:
                              "md:col-span-4 sm:col-span-6 col-span-12",
                            children:
                              (a == null ? void 0 : a.type) === "image"
                                ? e.jsx("img", {
                                    src: a.msg,
                                    alt: "media",
                                    className: "rounded-md",
                                    height: 100,
                                    width: 100,
                                  })
                                : null,
                          },
                          o,
                        ),
                      ),
              }),
            }),
          }),
          e.jsxs("div", {
            className: "mt-8",
            children: [
              e.jsxs("h6", {
                className: "text-sm",
                children: ["  Attachments (", n, ")"],
              }),
              e.jsx("div", {
                children:
                  t == null
                    ? void 0
                    : t.messages.map((a, o) => {
                        var c;
                        return e.jsx(
                          "div",
                          {
                            children: e.jsx("div", {
                              className: "flex flex-col gap-4 mt-4",
                              children:
                                (c = a == null ? void 0 : a.attachment) == null
                                  ? void 0
                                  : c.map((l, m) =>
                                      e.jsx(
                                        "div",
                                        {
                                          children: e.jsxs("div", {
                                            className:
                                              "flex items-center gap-3 group cursor-pointer",
                                            children: [
                                              e.jsx("div", {
                                                className:
                                                  "bg-muted dark:bg-darkmuted p-3 rounded-md",
                                                children: e.jsx("img", {
                                                  src: l.icon || "",
                                                  height: 24,
                                                  width: 24,
                                                  alt: "download",
                                                }),
                                              }),
                                              e.jsxs("div", {
                                                children: [
                                                  e.jsx("h5", {
                                                    className:
                                                      "text-sm group-hover:text-primary",
                                                    children: l.file,
                                                  }),
                                                  e.jsx("p", {
                                                    className:
                                                      "text-xs text-darklink dark:text-bodytext",
                                                    children: l.fileSize,
                                                  }),
                                                ],
                                              }),
                                              e.jsx("div", {
                                                className:
                                                  "btn-circle-hover cursor-pointer invisible  group-hover:visible ms-auto  opacity:50",
                                                children: e.jsx(b, {
                                                  icon: "solar:download-outline",
                                                  height: "20",
                                                }),
                                              }),
                                            ],
                                          }),
                                        },
                                        m,
                                      ),
                                    ),
                            }),
                          },
                          o,
                        );
                      }),
              }),
            ],
          }),
        ],
      }),
    });
  },
  Je = ({ onClickMobile: t }) => {
    var f;
    const { selectedChat: n } = h.useContext(P),
      [s, a] = h.useState(!1),
      { user: o } = F((d) => d.auth),
      c = h.useRef(null);
    h.useEffect(() => {
      n && m();
    }, [n, n == null ? void 0 : n.messages]);
    const l = () => {
        a(!s);
      },
      m = () => {
        var d;
        (d = c.current) == null || d.scrollIntoView({ behavior: "smooth" });
      },
      [v, x] = h.useState(!1),
      j = () => x(!1);
    return e.jsxs(e.Fragment, {
      children: [
        e.jsx("div", {
          className: "p-5",
          children: e.jsx("div", {
            children: n
              ? e.jsxs("div", {
                  className: "flex items-center justify-between ",
                  children: [
                    e.jsxs("div", {
                      className: "flex items-center gap-3 ",
                      children: [
                        e.jsx(J, {
                          color: "lightprimary",
                          className: "btn-circle p-0 lg:hidden flex",
                          onClick: t,
                          children: e.jsx(b, {
                            icon: "solar:hamburger-menu-outline",
                            height: 18,
                          }),
                        }),
                        e.jsxs("div", {
                          className: "relative sm:min-w-12 min-w-9",
                          children: [
                            e.jsx("img", {
                              src: z,
                              height: 48,
                              width: 48,
                              alt: "user",
                              className: "rounded-full sm:h-12 sm:w-12 h-9 w-9",
                            }),
                            n.status == "online"
                              ? e.jsx(y, {
                                  color: "success",
                                  className:
                                    "p-0 h-2 w-2 absolute bottom-1 end-0",
                                })
                              : n.status == "busy"
                                ? e.jsx(y, {
                                    color: "error",
                                    className:
                                      "p-0 h-2 w-2 absolute bottom-1 end-0",
                                  })
                                : n.status == "away"
                                  ? e.jsx(y, {
                                      color: "warning",
                                      className:
                                        "p-0 h-2 w-2 absolute bottom-1 end-0",
                                    })
                                  : e.jsx(y, {
                                      color: "primary",
                                      className:
                                        "p-0 h-2 w-2 absolute bottom-1 end-0",
                                    }),
                          ],
                        }),
                        e.jsxs("div", {
                          children: [
                            e.jsx("h5", {
                              className: "text-base sm:mb-1",
                              children: n.name,
                            }),
                            e.jsx("div", {
                              className:
                                "text-sm text-ld opacity-90 line-clamp-1",
                              children: n.status,
                            }),
                          ],
                        }),
                      ],
                    }),
                    e.jsxs("div", {
                      className: "flex items-center md:gap-2 gap-1",
                      children: [
                        e.jsx("div", {
                          className:
                            "btn-circle-hover cursor-pointer sm:h-10 sm:w-10",
                          children: e.jsx(b, {
                            icon: "solar:phone-rounded-linear",
                            height: 25,
                            className: "sm:h-10 h-5 ",
                          }),
                        }),
                        e.jsx("div", {
                          className:
                            "btn-circle-hover cursor-pointer sm:h-10 sm:w-10",
                          children: e.jsx(b, {
                            icon: "solar:videocamera-outline",
                            height: 25,
                            className: "sm:h-10 h-5 ",
                          }),
                        }),
                        e.jsx("div", {
                          className:
                            "btn-circle-hover cursor-pointer sm:h-10 sm:w-10 xl:flex hidden",
                          onClick: l,
                          children: e.jsx(T, {
                            size: 18,
                            className: "sm:h-10 h-5 ",
                          }),
                        }),
                        e.jsx("div", {
                          className:
                            "btn-circle-hover cursor-pointer sm:h-10 sm:w-10 xl:hidden flex",
                          onClick: () => x(!0),
                          children: e.jsx(T, {
                            size: 20,
                            className: "sm:h-10 h-5 ",
                          }),
                        }),
                      ],
                    }),
                  ],
                })
              : null,
          }),
        }),
        e.jsx(H, { className: "my-0" }),
        e.jsxs("div", {
          className: "flex max-h-[800px] h-[650px] ",
          children: [
            e.jsx("div", {
              className: `transition-all ${s ? "xl:w-[calc(100%_-_300px)] w-full" : "lg:w-[calc(100%_-_0px)]"} `,
              children: e.jsx("div", {
                className: `${s ? "lg:border-e" : "border-none"} border-ld h-full py-5 px-5`,
                children: e.jsx("div", {
                  className: "max-h-[700px] h-[600px]",
                  style: { flexDirection: "column-reverse", overflowY: "auto" },
                  children: e.jsxs("div", {
                    children: [
                      e.jsx(e.Fragment, {
                        children:
                          (f = n == null ? void 0 : n.messages) == null
                            ? void 0
                            : f.map((d) =>
                                e.jsx(
                                  "div",
                                  {
                                    className: "flex gap-3 mb-[30px]",
                                    children:
                                      o.username !== d.sender
                                        ? e.jsxs("div", {
                                            className: "flex gap-3",
                                            children: [
                                              e.jsx("div", {
                                                className: "w-10",
                                                children: e.jsx("img", {
                                                  src: z,
                                                  height: 40,
                                                  width: 40,
                                                  alt: "user",
                                                  className: "rounded-full",
                                                }),
                                              }),
                                              d.type === "text"
                                                ? e.jsxs("div", {
                                                    children: [
                                                      e.jsxs("div", {
                                                        className:
                                                          "text-xs text-ld opacity-60 font-medium mb-1 block",
                                                        children: [
                                                          n.name,
                                                          ",",
                                                          " ",
                                                          O(
                                                            new Date(
                                                              d.createdAt,
                                                            ),
                                                            { addSuffix: !1 },
                                                          ),
                                                          " ",
                                                          "ago",
                                                        ],
                                                      }),
                                                      e.jsx("div", {
                                                        className:
                                                          "p-2 bg-muted dark:bg-darkmuted text-ld rounded-md",
                                                        children: d.msg,
                                                      }),
                                                    ],
                                                  })
                                                : null,
                                              d.type === "image"
                                                ? e.jsx("img", {
                                                    src: d.msg,
                                                    height: 150,
                                                    width: 150,
                                                    alt: "user",
                                                    className: "rounded-md",
                                                  })
                                                : null,
                                            ],
                                          })
                                        : e.jsx("div", {
                                            className:
                                              "flex  justify-end w-full",
                                            children: e.jsxs("div", {
                                              children: [
                                                d.timestamp
                                                  ? e.jsxs("div", {
                                                      className:
                                                        "text-xs text-ld opacity-60 font-medium mb-1 block text-end",
                                                      children: [
                                                        O(
                                                          new Date(d.createdAt),
                                                          { addSuffix: !1 },
                                                        ),
                                                        " ",
                                                        "ago",
                                                      ],
                                                    })
                                                  : null,
                                                d.type === "text"
                                                  ? e.jsx("div", {
                                                      className:
                                                        "p-2 bg-lightinfo text-ld dark:bg-lightinfo rounded-md",
                                                      children: d.msg,
                                                    })
                                                  : null,
                                                d.type === "image"
                                                  ? e.jsx("img", {
                                                      src: d.msg,
                                                      height: 150,
                                                      width: 150,
                                                      alt: "user",
                                                      className: "rounded-md",
                                                    })
                                                  : null,
                                              ],
                                            }),
                                          }),
                                  },
                                  d.id + d.createdAt,
                                ),
                              ),
                      }),
                      e.jsx("div", { ref: c }),
                    ],
                  }),
                }),
              }),
            }),
            s &&
              e.jsxs(e.Fragment, {
                children: [
                  e.jsx("div", {
                    className: `shrink-0 ${s ? "xl:max-w-[300px] max-w-0" : "max-w-[0]"}`,
                    children: e.jsx(L, {}),
                  }),
                  e.jsx(X, {
                    open: v,
                    onClose: j,
                    className: "max-w-[300px] ",
                    position: "right",
                    children: e.jsx("div", { children: e.jsx(L, {}) }),
                  }),
                ],
              }),
          ],
        }),
      ],
    });
  },
  He = () => {
    var d;
    const { selectedChat: t } = h.useContext(P),
      n = F((i) => i.auth.user),
      [s, a] = h.useState(""),
      o = Z(),
      c =
        ((d =
          t == null
            ? void 0
            : t.messages[(t == null ? void 0 : t.messages.length) - 1]) == null
          ? void 0
          : d.prompts) ?? null,
      [l, m] = h.useState(!0);
    h.useEffect(() => {
      var i;
      (i =
        t == null
          ? void 0
          : t.messages[(t == null ? void 0 : t.messages.length) - 1]) != null &&
        i.prompts &&
        m(!0);
    }, [t]);
    const v = (i) => {
      a(i.target.value);
    };
    console.log(
      "initialPrompts ",
      c,
      t == null
        ? void 0
        : t.messages[(t == null ? void 0 : t.messages.length) - 1],
    );
    const x = (i) => {
        i.preventDefault(), !(!s.trim() || !t) && (f(), m(!1), a(""));
      },
      j = (i) => {
        console.log("pressed the button ", i), f(i), m(!1), a("");
      },
      f = async (i) => {
        const w = i || s;
        console.log("got here 1 ", n),
          console.log("selectedChat ", t),
          o(
            ee({
              receiverId: t == null ? void 0 : t.id,
              senderId: n._id,
              content: w,
              chatRoomId: null,
              type: "text",
            }),
          );
      };
    return e.jsxs(e.Fragment, {
      children: [
        l &&
          c &&
          e.jsxs("div", {
            className:
              "flex flex-row mb-[50px] relative -top-[50px] justify-center",
            children: [
              " ",
              c.map(
                (i) =>
                  i !== "" &&
                  e.jsx(J, {
                    onClick: () => j(i),
                    size: "xs",
                    color: "lightinfo",
                    className: "rounded-lg mx-[5px]",
                    children: i,
                  }),
              ),
            ],
          }),
        e.jsx("form", {
          onSubmit: x,
          children: e.jsxs("div", {
            className: "flex gap-3 items-center py-5 px-5",
            children: [
              e.jsx("div", {
                children: e.jsx("div", {
                  className: "btn-circle-hover cursor-pointer",
                  children: e.jsx(b, {
                    icon: "solar:sticker-smile-circle-2-linear",
                    height: "20",
                  }),
                }),
              }),
              e.jsx(Y, {
                className: "form-control-chat border-0 w-full",
                sizing: "md",
                required: !0,
                value: s,
                onChange: v,
              }),
              e.jsxs("div", {
                className: "flex gap-3 items-center",
                children: [
                  e.jsx("div", {
                    className: "btn-circle-hover cursor-pointer ",
                    children: e.jsx(b, {
                      icon: "solar:plain-linear",
                      height: "20",
                      onClick: j,
                    }),
                  }),
                  e.jsx("div", {
                    className: "btn-circle-hover cursor-pointer",
                    children: e.jsx(b, {
                      icon: "solar:gallery-add-linear",
                      height: "20",
                    }),
                  }),
                  e.jsx("div", {
                    className: "btn-circle-hover cursor-pointer",
                    children: e.jsx(b, {
                      icon: "solar:paperclip-outline",
                      height: "20",
                    }),
                  }),
                  e.jsx("div", {
                    className: "btn-circle-hover cursor-pointer",
                    children: e.jsx(b, {
                      icon: "solar:microphone-2-outline",
                      height: "20",
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    });
  },
  Xe = () => {
    const [t, n] = h.useState(!1),
      s = () => n(!1);
    return e.jsx(e.Fragment, {
      children: e.jsx(Re, {
        children: e.jsx(te, {
          className: "p-0 overflow-hidden",
          children: e.jsxs("div", {
            className: "flex",
            children: [
              e.jsx(X, {
                open: t,
                onClose: s,
                className:
                  "lg:relative lg:transform-none lg:h-auto lg:bg-transparent max-w-[350px] w-full  lg:z-[0] ",
                children: e.jsx(Ye, {}),
              }),
              e.jsxs("div", {
                className: "grow w-[70%]",
                children: [
                  e.jsx(Je, { onClickMobile: () => n(!0) }),
                  e.jsx(H, { className: "my-0" }),
                  e.jsx(He, {}),
                ],
              }),
            ],
          }),
        }),
      }),
    });
  },
  Qe = [{ to: "/", title: "Home" }, { title: "Chat" }],
  Ke = () =>
    e.jsxs(e.Fragment, {
      children: [e.jsx(se, { title: "Chat App", items: Qe }), e.jsx(Xe, {})],
    });
export { Ke as default };
