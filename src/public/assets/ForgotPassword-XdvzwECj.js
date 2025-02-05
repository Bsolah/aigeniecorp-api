import {
  u as r,
  j as s,
  x as o,
  h as l,
  B as a,
  L as d,
} from "./index-CqYDJsbz.js";
import { L as t, a as c } from "./LeftSidebarPart-wcx0syL1.js";
const i = () => {
    const e = r().pathname;
    return s.jsx(s.Fragment, {
      children: s.jsxs("form", {
        className: "mt-6",
        children: [
          s.jsxs("div", {
            className: "mb-4",
            children: [
              s.jsx("div", {
                className: "mb-2 block",
                children: s.jsx(o, {
                  htmlFor: "emadd",
                  value: "Email Address",
                }),
              }),
              s.jsx(l, {
                id: "emadd",
                type: "text",
                sizing: "md",
                className: "form-control",
              }),
            ],
          }),
          e == "/auth/auth2/forgot-password"
            ? s.jsx(a, {
                className:
                  "rounded-md w-full bg-sky dark:bg-sky  hover:bg-dark dark:hover:bg-dark",
                children: "Forgot Password",
              })
            : s.jsx(a, {
                color: "primary",
                className: "rounded-md w-full",
                children: "Forgot Password",
              }),
        ],
      }),
    });
  },
  h = () =>
    s.jsx(s.Fragment, {
      children: s.jsx("div", {
        className: "relative overflow-hidden h-screen",
        children: s.jsxs("div", {
          className:
            "grid grid-cols-12 gap-3 h-screen bg-white dark:bg-darkgray",
          children: [
            s.jsx("div", {
              className:
                "xl:col-span-4 lg:col-span-6 col-span-12 sm:px-12 px-4",
              children: s.jsx("div", {
                className: "flex h-screen items-center px-3 max-w-md mx-auto ",
                children: s.jsxs("div", {
                  className: "w-full",
                  children: [
                    s.jsx(t, {}),
                    s.jsx("h3", {
                      className: "text-2xl font-bold my-3 mt-5",
                      children: "Forgot Password",
                    }),
                    s.jsx("p", {
                      className:
                        "text-ld opacity-80 dark:text-white/60 text-sm font-medium",
                      children:
                        "Please enter the email address associated with your account and We will email you a link to reset your password.",
                    }),
                    s.jsx(i, {}),
                    s.jsx(a, {
                      color: "lightprimary",
                      as: d,
                      to: "/auth/auth1/login",
                      className: "rounded-md w-full mt-4",
                      children: "Back to Login",
                    }),
                  ],
                }),
              }),
            }),
            s.jsx("div", {
              className:
                "xl:col-span-8 lg:col-span-6 col-span-12 bg-[#0A2540] dark:bg-dark lg:block hidden relative overflow-hidden",
              children: s.jsx(c, {}),
            }),
          ],
        }),
      }),
    });
export { h as default };
