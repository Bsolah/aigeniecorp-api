import { j as e, B as r, L as t } from "./index-CqYDJsbz.js";
const s = "/assets/errorimg-Dl4rCc9v.svg",
  o = () =>
    e.jsx(e.Fragment, {
      children: e.jsx("div", {
        className:
          "h-screen flex items-center justify-center bg-white dark:bg-darkgray",
        children: e.jsxs("div", {
          className: "text-center max-w-lg mx-auto",
          children: [
            e.jsx("img", { src: s, alt: "error", className: "mb-4" }),
            e.jsx("h1", {
              className: "text-dark dark:text-white text-4xl mb-6",
              children: "Opps!!!",
            }),
            e.jsx("h6", {
              className: "text-xl text-dark dark:text-white",
              children: "This page you are looking for could not be found.",
            }),
            e.jsx(r, {
              color: "primary",
              as: t,
              to: "/",
              className: "w-fit mt-6 mx-auto",
              children: "Go Back to Home",
            }),
          ],
        }),
      }),
    });
export { o as default };
