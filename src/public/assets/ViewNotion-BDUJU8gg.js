import{j as e}from"./index-CJPFVNcn.js";import{C as o}from"./Card-DxGgCpey.js";import{m as n,F as r,a as m,b as c}from"./googleData-DEExk1An.js";import{I as p}from"./iconify-DQsmSZas.js";import"./createLucideIcon-BpOLNCH7.js";const l={Docs:{icon:e.jsx(c,{className:"w-6 h-6 text-blue-500"}),type:"application/vnd.google-apps.document"},Sheets:{icon:e.jsx(m,{className:"w-6 h-6 text-green-500"}),type:"application/vnd.google-apps.spreadsheet"},Slides:{icon:e.jsx(r,{className:"w-6 h-6 text-yellow-500"}),type:"application/vnd.google-apps.presentation"}};function g(){const a=Object.keys(l).reduce((s,i)=>(s[i]=n.filter(t=>t.mimeType===l[i].type),s),{});return e.jsxs("div",{className:"max-w-4xl mx-auto p-6",children:[e.jsx("h1",{className:"text-xl font-bold mb-4",children:"Google Drive Files"}),e.jsx("div",{className:"grid gap-6",children:Object.entries(a).map(([s,i])=>e.jsxs("div",{children:[e.jsxs("h2",{className:"text-sm font-semibold mb-2 flex items-center gap-2",children:[l[s].icon," ",s]}),e.jsx("div",{className:"grid grid-cols-10 gap-2 minh-50",children:i.map(t=>e.jsxs(o,{className:"p-3 flex flex-col items-center text-center border rounded-xl shadow-sm",children:[e.jsx(p,{icon:"ri:notion-fill",className:"w-6 h-6 self-center"}),e.jsx("p",{className:"text-xs font-light mt-2",children:t.name})]},t.id))})]},s))})]})}export{g as default};
