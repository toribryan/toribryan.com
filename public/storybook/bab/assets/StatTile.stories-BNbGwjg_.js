import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,r,t as i}from"./StatTile-CyNq9Ygh.js";import{n as a,t as o}from"./message-circle-BDPwj1s8.js";var s,c,l,u,d;function f(){return(f=e((()=>{a(),r(),s=t(),c={title:`Dashboard/StatTile`,component:n,tags:[`autodocs`]},l={args:{label:`Total conversations`,value:`482`,delta:{text:`+12% vs last period`,direction:`up`}}},u={args:{label:``,value:``},render:()=>(0,s.jsxs)(i,{className:`w-220`,children:[(0,s.jsx)(n,{label:`Total conversations`,icon:(0,s.jsx)(o,{className:`size-3.5`}),value:`482`,delta:{text:`+12%`,direction:`up`},caption:`Last 7 days`}),(0,s.jsx)(n,{label:`Escalated`,value:`14`,delta:{text:`+3`,direction:`down`},highlight:!0,caption:`Requires review`}),(0,s.jsx)(n,{label:`Avg. response time`,value:`2m 14s`,delta:{text:`Above target`,direction:`warn`}}),(0,s.jsx)(n,{label:`CSAT`,value:`94%`,delta:{text:`+2 pts`,direction:`up`}})]})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Total conversations",
    value: "482",
    delta: {
      text: "+12% vs last period",
      direction: "up"
    }
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: "",
    value: ""
  },
  render: () => <StatGrid className="w-220">
      <StatTile label="Total conversations" icon={<MessageCircle className="size-3.5" />} value="482" delta={{
      text: "+12%",
      direction: "up"
    }} caption="Last 7 days" />
      <StatTile label="Escalated" value="14" delta={{
      text: "+3",
      direction: "down"
    }} highlight caption="Requires review" />
      <StatTile label="Avg. response time" value="2m 14s" delta={{
      text: "Above target",
      direction: "warn"
    }} />
      <StatTile label="CSAT" value="94%" delta={{
      text: "+2 pts",
      direction: "up"
    }} />
    </StatGrid>
}`,...u.parameters?.docs?.source}}},d=[`Default`,`Grid`]})))()}f();export{l as Default,u as Grid,d as __namedExportsOrder,c as default};