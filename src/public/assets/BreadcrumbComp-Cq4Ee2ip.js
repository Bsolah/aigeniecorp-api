import {
  X as c,
  Y as d,
  j as t,
  t as m,
  r as u,
  C as f,
  Z as i,
  k as g,
} from "./index-CqYDJsbz.js";
import { I as j } from "./iconify-DcqE7M9x.js";
const b = (s) => (e) => {
    const r = {};
    for (const a in e) s.includes(a) || (r[a] = e[a]);
    return r;
  },
  C = (s) => {
    const {
        children: e,
        className: r,
        horizontal: a,
        href: n,
        theme: l = {},
      } = s,
      h = typeof n > "u" ? "div" : "a",
      x = w(s),
      o = c(d().card, l);
    return t.jsxs(h, {
      "data-testid": "flowbite-card",
      href: n,
      className: m(
        o.root.base,
        o.root.horizontal[a ? "on" : "off"],
        n && o.root.href,
        r,
      ),
      ...x,
      children: [
        t.jsx(N, { ...s }),
        t.jsx("div", { className: o.root.children, children: e }),
      ],
    });
  },
  N = ({ theme: s = {}, ...e }) => {
    const r = c(d().card, s);
    return e.renderImage
      ? e.renderImage(r, e.horizontal ?? !1)
      : e.imgSrc
        ? t.jsx("img", {
            "data-testid": "flowbite-card-image",
            alt: e.imgAlt ?? "",
            src: e.imgSrc,
            className: m(
              r.img.base,
              r.img.horizontal[e.horizontal ? "on" : "off"],
            ),
          })
        : null;
  },
  w = b([
    "renderImage",
    "imgSrc",
    "imgAlt",
    "children",
    "className",
    "horizontal",
    "href",
    "theme",
  ]),
  z = ({ children: s, className: e }) => {
    const { isCardShadow: r, isBorderRadius: a } = u.useContext(f);
    return t.jsx(C, {
      className: `card p-[10px]  ${e} ${r ? " shadow-md dark:shadow-none" : "shadow-none border border-ld"} `,
      style: { borderRadius: `${a}px` },
      children: s,
    });
  },
  B = ({ items: s, title: e }) =>
    t.jsx(t.Fragment, {
      children: t.jsx(z, {
        className: "mb-[30px] py-4",
        children: t.jsxs(i, {
          className: "flex justify-between",
          children: [
            t.jsx("h6", { className: "text-base", children: e }),
            t.jsx("div", {
              className: "flex items-center gap-3",
              children: s
                ? s.map((r) =>
                    t.jsx(
                      "div",
                      {
                        children: r.to
                          ? t.jsxs(i.Item, {
                              href: r.to,
                              children: [
                                t.jsx(j, {
                                  icon: "solar:home-2-line-duotone",
                                  height: 20,
                                }),
                                " ",
                              ],
                            })
                          : t.jsx(g, {
                              color: "lightprimary",
                              children: r.title,
                            }),
                      },
                      r.title,
                    ),
                  )
                : "",
            }),
          ],
        }),
      }),
    });
export { B, z as C, C as a };
