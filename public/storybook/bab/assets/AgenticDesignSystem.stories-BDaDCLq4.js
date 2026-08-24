import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";function n({label:e,tone:t,code:n,note:i}){return(0,r.jsxs)(`section`,{className:`flex flex-col gap-2`,children:[(0,r.jsxs)(`header`,{className:`flex items-center gap-2`,children:[(0,r.jsx)(`span`,{className:`size-2 shrink-0 rounded-[2px] ${t===`bad`?`bg-border`:`bg-primary`}`,"aria-hidden":!0}),(0,r.jsx)(`h3`,{className:`text-sm font-medium`,children:e})]}),(0,r.jsx)(`pre`,{className:`overflow-x-auto rounded-lg bg-surface-nested p-4 font-mono text-[11px] leading-relaxed`,children:n}),(0,r.jsx)(`p`,{className:`text-xs leading-relaxed text-muted-foreground`,children:i})]})}var r,i,a,o;function s(){return(s=e((()=>{r=t(),i={title:`Case Study/Agentic Design System`,tags:[`!dev`,`!autodocs`,`!test`],parameters:{layout:`padded`,docs:{description:{component:`Visual companions to the Agentic Design System case study on toribryan.com.

Same tag treatment as the Design System Overhaul stories: hidden from the
sidebar so they do not appear inside the Integrity Console's embedded
Storybook, but still reachable by \`iframe.html?id=...\`. Story names are the
embed contract, so renaming one breaks its embed.`}}}},a={render:()=>(0,r.jsxs)(`div`,{className:`flex max-w-[880px] flex-col gap-5`,children:[(0,r.jsx)(`p`,{className:`font-mono text-xs tracking-wide text-muted-foreground uppercase`,children:`Same design. Same prompt.`}),(0,r.jsxs)(`div`,{className:`grid gap-6 sm:grid-cols-2`,children:[(0,r.jsx)(n,{tone:`bad`,label:`Without usage instructions`,code:`<div
  className="rounded-md px-4 py-3
    bg-[#008b8b] text-white
    text-sm font-medium"
>
  Save changes
</div>`,note:`Rebuilt from scratch. The hex is hardcoded, the radius is invented, and nothing links back to the system. It looks right and is unmaintainable.`}),(0,r.jsx)(n,{tone:`good`,label:`With Code Connect`,code:`<Button variant="primary" size="sm">
  Save changes
</Button>`,note:`Resolved to the component. Variants and tokens arrive with it, so a rebrand reaches this automatically.`})]})]})},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex max-w-[880px] flex-col gap-5">
      <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
        Same design. Same prompt.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Panel tone="bad" label="Without usage instructions" code={\`<div
  className="rounded-md px-4 py-3
    bg-[#008b8b] text-white
    text-sm font-medium"
>
  Save changes
</div>\`} note="Rebuilt from scratch. The hex is hardcoded, the radius is invented, and nothing links back to the system. It looks right and is unmaintainable." />

        <Panel tone="good" label="With Code Connect" code={\`<Button variant="primary" size="sm">
  Save changes
</Button>\`} note="Resolved to the component. Variants and tokens arrive with it, so a rebrand reaches this automatically." />
      </div>
    </div>
}`,...a.parameters?.docs?.source},description:{story:`The finding, in the smallest honest form: the same design and the same
prompt, with and without the component carrying its own usage contract.`,...a.parameters?.docs?.description}}},o=[`InferenceVsLookup`]})))()}s();export{a as InferenceVsLookup,o as __namedExportsOrder,i as default};