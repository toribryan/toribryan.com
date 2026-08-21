import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./badge-BA2YQJp_.js";import{a as i,i as a,n as o,o as s,r as c,s as l,t as u}from"./table-YsnxCb4u.js";var d,f,p,m,h;function g(){return(g=e((()=>{l(),n(),d=t(),f={title:`UI/Table`,component:u,tags:[`autodocs`]},p=[{student:`Jordan Lee`,exam:`BIO 201 Midterm`,status:`Escalated`},{student:`Priya Nair`,exam:`CHEM 110 Final`,status:`Cleared`},{student:`Sam Okafor`,exam:`MATH 220 Quiz 3`,status:`Cleared`}],m={render:()=>(0,d.jsxs)(u,{children:[(0,d.jsx)(i,{children:(0,d.jsxs)(s,{children:[(0,d.jsx)(a,{children:`Student`}),(0,d.jsx)(a,{children:`Exam`}),(0,d.jsx)(a,{children:`Status`})]})}),(0,d.jsx)(o,{children:p.map(e=>(0,d.jsxs)(s,{children:[(0,d.jsx)(c,{className:`font-medium`,children:e.student}),(0,d.jsx)(c,{children:e.exam}),(0,d.jsx)(c,{children:(0,d.jsx)(r,{variant:e.status===`Escalated`?`destructive`:`secondary`,children:e.status})})]},e.student))})]})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Table>\r
      <TableHeader>\r
        <TableRow>\r
          <TableHead>Student</TableHead>\r
          <TableHead>Exam</TableHead>\r
          <TableHead>Status</TableHead>\r
        </TableRow>\r
      </TableHeader>\r
      <TableBody>\r
        {ROWS.map(row => <TableRow key={row.student}>\r
            <TableCell className="font-medium">{row.student}</TableCell>\r
            <TableCell>{row.exam}</TableCell>\r
            <TableCell>\r
              <Badge variant={row.status === "Escalated" ? "destructive" : "secondary"}>\r
                {row.status}\r
              </Badge>\r
            </TableCell>\r
          </TableRow>)}\r
      </TableBody>\r
    </Table>
}`,...m.parameters?.docs?.source}}},h=[`Default`]})))()}g();export{m as Default,h as __namedExportsOrder,f as default};