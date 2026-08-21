/* ---------------- shared avatars ---------------- */
const EMOJIS = ['😀','😊','🙂','👍','🙏','✅','❌','⚠️','🎉','👀','💬','📎','🕐','📌','🙌','🤝','😅','😬','🔧','💡','📸','🖥️','🔒','✨'];
const COMMAND_TEXTS = {
  restart: "Let’s get your lockdown browser restarted — go ahead and reopen it from your desktop shortcut.",
  verifyid: "Before we continue, I need to verify your student ID on file.",
  greeting: "Hi! Thanks for reaching out — I’m here to help."
};
const PEOPLE = {
  jordan:  {initials:'JL', color:'#cd4c15', bg:'#fae0d1', name:'Jordan Lee', role:'student'},
  maya:    {initials:'MC', color:'#0f766e', bg:'#ccfbf1', name:'Maya Chen', role:'student'},
  devon:   {initials:'DB', color:'#4338ca', bg:'#e0e7ff', name:'Devon Brooks', role:'student'},
  aisha:   {initials:'AP', color:'#c026d3', bg:'#fae8ff', name:'Aisha Patel', role:'student'},
  ty:      {initials:'TF', color:'#0891b2', bg:'#cffafe', name:'Ty Fischer', role:'student'},
  priya:   {initials:'PN', color:'#1d4ed8', bg:'#dbeafe', name:'Priya Nair', role:'instructor'},
  robert:  {initials:'RK', color:'#4d7c0f', bg:'#ecfccb', name:'Robert Klein', role:'instructor'},
  nina:    {initials:'NA', color:'#c2410c', bg:'#ffedd5', name:'Nina Alvarez', role:'instructor'},
  marcus:  {initials:'MW', color:'#0c0a09', bg:'#e8e4e3', name:'Marcus Webb', role:'unknown'},
  alex:    {initials:'AR', color:'#92400e', bg:'#fef3c7', name:'Alex Rivera', role:'admin'},
  dana:    {initials:'DO', color:'#166534', bg:'#dcfce7', name:'Dana Ortiz', role:'admin'},
  victoria:{initials:'VB', color:'#6d28d9', bg:'#ede9fe', name:'Victoria Bryan', role:'admin'},
  jordank: {initials:'JK', color:'#be185d', bg:'#fce7f3', name:'Jordan Kim', role:'admin'},
  agent:   {initials:'A', color:'#fff', bg:'#c70036', name:'Support Agent', role:'admin'},
};
function avatar(key, size){
  const p = PEOPLE[key];
  return '<div class="avatar-circle" style="width:'+size+'px;height:'+size+'px;background:'+p.bg+';color:'+p.color+';font-size:'+(size*0.38)+'px">'+p.initials+'</div>';
}
function roleAvatar(role, replied){
  // Replying doesn't recolor the avatar — it stays the sender's role colour;
  // only the glyph swaps to the reply arrow, per the Figma inbox spec.
  const icon = role === 'system' ? Ifill('bot',16) : (replied ? I('reply',16) : Ifill('messageCircle',16));
  return '<div class="role-avatar role-'+role+'">'+icon+'</div>';
}
function roleBadge(role){
  if(role==='admin') return '<span class="badge badge-admin">Administrator</span>';
  if(role==='instructor') return '<span class="badge badge-instructor">Instructor</span>';
  if(role==='student') return '<span class="badge badge-student">Student</span>';
  if(role==='system') return '<span class="badge" style="background:var(--red-bg);color:var(--red-text);">System</span>';
  return '<span class="badge" style="background:#e8e4e3;color:#403e3f;">Unknown</span>';
}

/* ---------------- chrome builders ---------------- */
function sidenav(active){
  // Nav destinations swap glyph style with state: solid when selected, outlined
  // otherwise. Search is an action rather than a destination, so it never fills.
  const item = (key,icon,dot) => {
    const on = active===key;
    return `<button class="nav-icon-btn${on?' active':''}" data-page-icon="${key}" title="${key}"
      aria-current="${on?'page':'false'}">${on?Isolid(icon,20):I(icon,20)}${dot?`<span class="nav-dot"></span>`:''}</button>`;
  };
  return `
  <div class="sidenav">
    <div class="sidenav-top">
      <div class="sidenav-mark">EH</div>
      <hr class="sidenav-divider"/>
      ${item('inbox','inbox',true)}
      ${item('knowledge','book')}
      ${item('reports','bar')}
      ${item('contacts','users')}
    </div>
    <div class="sidenav-bottom">
      <hr class="sidenav-divider solid"/>
      <button class="nav-icon-btn" title="Search">${I('search',20)}</button>
      ${item('settings','settings')}
      <div class="avatar-dot" title="Your profile"><span class="unread-dot"></span></div>
    </div>
  </div>`;
}

function knowledgeNav(active){
  const link = (key,label,icon) => `<button class="nav-item clickable${active===key?' active':''}" data-page="${key}">
      <span class="left">${I(icon,18)}<span>${label}</span></span>${active===key?'':''}${I('chevronRight',10)}</button>`;
  return `<div class="secondary-nav">
    <div class="secondary-nav-header"><h2>Knowledge</h2></div>
    <ul class="nav-list" style="gap:2px;">
      <li>${link('knowledge-sources','Sources','grid')}</li>
      <li>${link('knowledge-content','Content','book')}</li>
      <li>${link('knowledge-articles','Articles','fileText')}</li>
      <li><a class="nav-item" href="#" onclick="return false;"><span class="left">${I('external','18')}<span>Help Center</span></span>${I('external',14)}</a></li>
    </ul>
  </div>`;
}

function reportsNav(active){
  const item = (key,label,icon,count) => `<button class="nav-item clickable${active===key?' active':''}" data-page="${key}">
      <span class="left">${I(icon,18)}<span>${label}</span></span>${count!==undefined?`<span class="count">${count}</span>`:''}</button>`;
  const folder = (id, label, pages, children) => {
    const open = pages.includes(active);
    return `<li class="nav-folder-group">
      <button class="nav-folder clickable${open?' open':''}" onclick="toggleAccordion(event,'${id}')">
        <span class="left">${I('folder',18)}<span>${label}</span></span>${I('chevronRight',10)}
      </button>
      <ul class="nav-sublist${open?' open':''}" id="${id}">
        ${children.map(([key,childLabel])=>`<li><button class="nav-child clickable${active===key?' active':''}" data-page="${key}">${childLabel}</button></li>`).join('')}
      </ul>
    </li>`;
  };
  return `<div class="secondary-nav">
    <div class="secondary-nav-header"><h2>Reports</h2></div>
    <ul class="nav-list">
      <li>${item('reports-overview','Overview','grid')}</li>
      <li>${item('reports-all','All reports','bar',31)}</li>
      <li><span class="nav-item">${'<span class="left">'+I('fileText',18)+'<span>Your reports</span></span>'}<span class="count">0</span></span></li>
      <li><span class="nav-item">${'<span class="left">'+I('filter',18)+'<span>Saved filters</span></span>'}</span></li>
      <li><span class="nav-item">${'<span class="left">'+I('download',18)+'<span>Dataset export</span></span>'}</span></li>
      <li><span class="nav-item">${'<span class="left">'+I('calClock',18)+'<span>Manage schedules</span></span>'}</span></li>
    </ul>
    <div class="nav-divider"></div>
    <ul class="nav-list">
      ${folder('reports-folder-human-support','Human Support',
        ['reports-topics','reports-conversations-by-role','reports-response-time','reports-csat'],
        [['reports-topics','Conversation Topics'],['reports-conversations-by-role','New Conversations by Role'],
         ['reports-response-time','Response Time'],['reports-csat','Satisfaction (CSAT)']])}
      ${folder('reports-folder-ai-automation','AI &amp; Automation',
        ['reports-ai-assist'],
        [['reports-ai-assist','AI Assist']])}
      ${folder('reports-folder-proctoring','Proctoring',
        ['reports-flagged-sessions','reports-room-scan','reports-lockdown-browser','reports-extension-violations','reports-screen-share','reports-exam-completion'],
        [['reports-flagged-sessions','Flagged Sessions'],['reports-room-scan','Room Scan Failures'],
         ['reports-lockdown-browser','Lockdown Browser'],['reports-extension-violations','Extension Violations'],
         ['reports-screen-share','Screen Share &amp; Multi-Monitor'],['reports-exam-completion','Exam Completion Rate']])}
    </ul>
  </div>`;
}

function contactsNav(active){
  const item = (key,label,count) => `<button class="nav-child clickable${active===key?' active':''}" data-page="${key}">${label}<span class="count">${count}</span></button>`;
  return `<div class="secondary-nav">
    <div class="secondary-nav-header"><h2>Contacts</h2>${I('sliders',18)}</div>
    <ul class="nav-list">
      <li class="nav-group-label">People${I('chevronRight',10)}</li>
      <li>${item('contacts-all','All contacts',12)}</li>
      <li>${item('contacts-students','Students',5)}</li>
      <li>${item('contacts-instructors','Instructors',3)}</li>
      <li>${item('contacts-administrators','Administrators',4)}</li>
      <li class="nav-section-gap"></li>
      <li class="nav-group-label">Institutions${I('chevronRight',10)}</li>
      <li class="nav-section-gap"></li>
      <li class="nav-group-label">Conversations</li>
    </ul>
  </div>`;
}

function settingsNav(active){
  // Flat, four real destinations — no accordion, no decorative chevrons on
  // dead ends. Every item here goes somewhere (see the whole-dashboard audit
  // this replaced: the old version had 1 real page and 10 that led nowhere).
  const item = (key,label,icon) => `<button class="nav-item clickable${active===key?' active':''}" data-page="${key}">
      <span class="left">${I(icon,18)}<span>${label}</span></span></button>`;
  return `<div class="secondary-nav">
    <div class="secondary-nav-header"><h2>Settings</h2></div>
    <ul class="nav-list">
      <li>${item('settings-home','Home','grid')}</li>
      <li>${item('settings-general','General','list')}</li>
      <li>${item('settings-institutions','Institutions','globe')}</li>
      <li>${item('settings-integrations','Integrations','puzzle')}</li>
    </ul>
  </div>`;
}

/* ---------------- report filter/search controls ---------------- */
// Shared across every Reports page. Two flavors:
//  - searchField(): a real <input>, styled to match the old placeholder
//    button. Live-filters as you type if given a handler, otherwise just
//    confirms on Enter (see the branches inside it).
//  - reportFilterDropdown(): a real open/close menu with checkable options,
//    calling the named handler as (event, value) on selection.
// Neither has backing data to filter on most report pages (they're
// summary/stat pages, not itemized lists), so the default handlers just
// confirm the interaction via the same "prototype" hint the inbox's own
// filter/sort controls already use. All Reports and Conversation Topics DO
// have real underlying data, so those two pages pass their own handler
// names (onAllReportsSearch/onTopicCategorySelect) that actually filter.
function searchField(id, placeholder, liveHandlerFn){
  // With a live handler (real underlying data to filter): fires on every
  // keystroke, Escape clears. Without one (most report pages have nothing
  // to filter): only Enter fires, and it just confirms via showHint — same
  // idiom as the inbox's own onConvoSearchKeydown.
  if(liveHandlerFn){
    return `<div class="btn search-field">
      ${I('search',13)}
      <input type="text" id="${id}" placeholder="${placeholder}"
        oninput="${liveHandlerFn}(event)"
        onkeydown="if(event.key==='Escape'){event.currentTarget.value='';event.currentTarget.blur();${liveHandlerFn}(event);}">
    </div>`;
  }
  return `<div class="btn search-field">
    ${I('search',13)}
    <input type="text" id="${id}" placeholder="${placeholder}" onkeydown="onReportSearchKeydown(event)">
  </div>`;
}
function reportFilterDropdown(id, defaultLabel, options, handlerFn){
  const fn = handlerFn || 'selectReportFilter';
  const item = (label, active) => `<button class="menu-check-item${active?' active':''}" onclick="${fn}(event,'${id}','${label.replace(/'/g,"&#39;")}')">${label}<span class="check">${I('check',14)}</span></button>`;
  return `<div class="filter-tab-wrap">
    <button class="btn btn-clickable" data-filter-toggle="${id}" onclick="toggleReportFilter(event,'${id}')">
      <span class="filter-tab-label" id="${id}-label">${defaultLabel}</span>${I('chevronDown',10)}
    </button>
    <div id="${id}" class="filter-menu report-filter-menu">
      ${item(defaultLabel, true)}
      ${options.map(opt=>item(opt,false)).join('')}
    </div>
  </div>`;
}
function compareToggle(){
  return `<button class="btn btn-clickable" onclick="toggleCompareRow(event)">${I('arrowUpRight',13)} Compare to last period</button>`;
}

/* ---------------- skeleton loading state ---------------- */
// Shown briefly on every page navigation (see showPage in app.js) as a mock
// stand-in for wherever a real fetch would need one. Reuses the real layout
// classes (.topbar/.filter-row/.scroll-body, .inbox-shell/.convo-list/
// .side-panel) so nothing shifts when the real content swaps in — only the
// content inside those wrappers is a shimmer block.
function skel(w, h, r){ return `<div class="skeleton" style="width:${w};height:${h};${r?`border-radius:${r};`:''}"></div>`; }
function skeletonStandard(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div>${skel('170px','26px')}</div>
      <div class="topbar-actions">${skel('84px','34px')}${skel('84px','34px')}${skel('84px','34px')}</div>
    </div>
  </div>
  <div class="filter-row bordered">
    ${skel('150px','30px')}${skel('110px','30px')}
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-4">
      ${skel('100%','88px','12px')}${skel('100%','88px','12px')}${skel('100%','88px','12px')}${skel('100%','88px','12px')}
    </div>
    ${skel('100%','280px','12px')}
    ${skel('100%','180px','12px')}
  </div>`;
}
function skeletonInbox(){
  const rows = Array.from({length:7}).map(()=>skel('auto','60px','10px')).join('');
  // Fixed px widths, not %: these are flex items with align-self overriding
  // the default stretch, so a percentage width has no definite containing
  // block to resolve against and silently collapses to 0.
  const bubble = (w,align) => `<div class="skeleton" style="width:${w};height:48px;border-radius:12px;align-self:${align};"></div>`;
  return `
  <div class="inbox-shell">
    <div class="convo-list">
      <div style="padding:16px 12px;">${skel('90px','20px','6px')}</div>
      <div style="display:flex;flex-direction:column;gap:8px;padding:0 12px;">${rows}</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;padding:20px;gap:16px;min-width:0;">
      ${skel('200px','20px','6px')}
      <div style="flex:1;display:flex;flex-direction:column;gap:14px;justify-content:flex-end;">
        ${bubble('220px','flex-start')}
        ${bubble('300px','flex-end')}
        ${bubble('170px','flex-start')}
      </div>
    </div>
    <div class="side-panel">
      <div style="padding:20px;display:flex;flex-direction:column;gap:14px;">
        ${skel('100%','80px','12px')}${skel('100%','120px','12px')}${skel('100%','120px','12px')}
      </div>
    </div>
  </div>`;
}

/* ---------------- mini chart helpers ---------------- */
// Every chart draws itself in on mount (CSS keyframes, see components.css) and
// carries invisible per-index hit targets so a shared delegated handler in
// app.js can show a hover tooltip + crosshair — see initChartTooltip().
function chartHit(x0, cw, h, cx, cyList, i, tip){
  return `<rect class="chart-hit" x="${x0.toFixed(1)}" y="0" width="${cw.toFixed(1)}" height="${h}" fill="transparent"
    data-cx="${cx}" data-cy='[${cyList.join(',')}]' data-i="${i}" data-tip='${tip.replace(/'/g,'&#39;')}'/>`;
}
let __chartUid = 0;
// Catmull-Rom -> cubic Bezier, so line charts read as smooth curves through
// each point (rounded peaks/valleys) rather than sharp polyline joints.
function smoothPath(coords){
  if(coords.length<2) return `M${coords[0][0]},${coords[0][1]}`;
  let d = `M${coords[0][0].toFixed(2)},${coords[0][1].toFixed(2)}`;
  for(let i=0;i<coords.length-1;i++){
    const p0 = coords[i-1] || coords[i];
    const p1 = coords[i];
    const p2 = coords[i+1];
    const p3 = coords[i+2] || p2;
    const c1x = p1[0] + (p2[0]-p0[0])/6, c1y = p1[1] + (p2[1]-p0[1])/6;
    const c2x = p2[0] - (p3[0]-p1[0])/6, c2y = p2[1] - (p3[1]-p1[1])/6;
    d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
  }
  return d;
}
function lineChart(points, w, h, color, labels, seriesName, unit){
  const step = w/(points.length-1);
  const max = Math.max(...points), min=0;
  const norm = v => h - ((v-min)/(max-min||1))*h;
  const coords = points.map((v,i)=>[i*step, norm(v)]);
  const linePath = smoothPath(coords);
  const areaPath = `${linePath} L${w},${h} L0,${h} Z`;
  const name = seriesName || 'Value';
  const gradId = 'lg'+(__chartUid++);
  let hits = '';
  for(let i=0;i<points.length;i++){
    const cx = (i*step).toFixed(1), cy = norm(points[i]).toFixed(1);
    const tip = JSON.stringify({label:labels&&labels[i], entries:[{color, name, value:points[i]+(unit||'')}]});
    const x0 = Math.max(0, i*step-step/2);
    const cw = (i===0||i===points.length-1) ? step/2 : step;
    hits += chartHit(x0, cw, h, cx, [cy], i, tip);
  }
  return `<svg class="mini-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" preserveAspectRatio="none" style="display:block;overflow:visible;">
    <defs><linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${color}" stop-opacity=".2"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </linearGradient></defs>
    <line class="chart-grid" x1="0" y1="0" x2="${w}" y2="0"/>
    <line class="chart-grid" x1="0" y1="${h/2}" x2="${w}" y2="${h/2}"/>
    <line class="chart-grid" x1="0" y1="${h}" x2="${w}" y2="${h}"/>
    <path class="chart-area" d="${areaPath}" fill="url(#${gradId})"/>
    <path class="chart-line" d="${linePath}" fill="none" stroke="${color}" stroke-width="2.5" pathLength="100"/>
    <circle class="chart-dot-ping" cx="${w}" cy="${norm(points[points.length-1])}" r="4" fill="${color}"/>
    <circle class="chart-dot" cx="${w}" cy="${norm(points[points.length-1])}" r="4" fill="${color}"/>
    <line class="chart-crosshair" x1="0" y1="0" x2="0" y2="${h}"/>
    <circle class="chart-hover-dot" data-series="0" r="4" fill="${color}" cx="-10" cy="-10"/>
    ${hits}
  </svg>`;
}
function multiLineChart(series, w, h, labels){
  const step = w/(series[0].data.length-1);
  const max = Math.max(...series.flatMap(s=>s.data));
  const norm = v => h - (v/(max||1))*h;
  let out = `<svg class="mini-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" preserveAspectRatio="none" style="display:block;overflow:visible;">
    <line class="chart-grid" x1="0" y1="0" x2="${w}" y2="0"/>
    <line class="chart-grid" x1="0" y1="${h/2}" x2="${w}" y2="${h/2}"/>
    <line class="chart-grid" x1="0" y1="${h}" x2="${w}" y2="${h}"/>`;
  series.forEach((s,si)=>{
    const coords = s.data.map((v,i)=>[i*step, norm(v)]);
    out += `<path class="chart-line" d="${smoothPath(coords)}" fill="none" stroke="${s.color}" stroke-width="${s.width||2}" pathLength="100" style="--delay:${(si*0.12).toFixed(2)}s"/>`;
  });
  // Only the lead series gets the live pulse — restraint over decorating every line.
  const lead = series[0];
  const leadCy = norm(lead.data[lead.data.length-1]);
  out += `<circle class="chart-dot-ping" cx="${w}" cy="${leadCy}" r="3.5" fill="${lead.color}"/>
    <circle class="chart-dot" cx="${w}" cy="${leadCy}" r="3.5" fill="${lead.color}"/>
    <line class="chart-crosshair" x1="0" y1="0" x2="0" y2="${h}"/>`;
  series.forEach((s,si)=>{
    out += `<circle class="chart-hover-dot" data-series="${si}" r="3.5" fill="${s.color}" cx="-10" cy="-10"/>`;
  });
  const n = series[0].data.length;
  for(let i=0;i<n;i++){
    const cx = (i*step).toFixed(1);
    const cys = series.map(s=>norm(s.data[i]).toFixed(1));
    const entries = series.map(s=>({color:s.color, name:s.name||'Series', value:s.data[i]}));
    const tip = JSON.stringify({label:labels&&labels[i], entries});
    const x0 = Math.max(0, i*step-step/2);
    const cw = (i===0||i===n-1) ? step/2 : step;
    out += chartHit(x0, cw, h, cx, cys, i, tip);
  }
  out += `</svg>`;
  return out;
}
function barChart(values, w, h, color, max, seriesName, labels){
  max = max || Math.max(...values);
  const gap = 10, n = values.length, bw = (w-gap*(n-1))/n;
  const name = seriesName || 'Value';
  let bars='';
  values.forEach((v,i)=>{
    const bh = (v/max)*h;
    const x = i*(bw+gap);
    const isMax = v===max;
    const fill = isMax?'var(--bar-alert)':color;
    const tip = JSON.stringify({label:labels&&labels[i], entries:[{color:fill, name, value:v}]});
    bars += `<rect class="chart-bar" x="${x.toFixed(1)}" y="${(h-bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(bh,2).toFixed(1)}" rx="2" fill="${fill}"
      style="--delay:${(i*0.045).toFixed(3)}s" data-tip='${tip.replace(/'/g,'&#39;')}'/>`;
  });
  return `<svg class="mini-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" preserveAspectRatio="none" style="display:block;">
    <line class="chart-grid" x1="0" y1="0" x2="${w}" y2="0"/>
    <line class="chart-grid" x1="0" y1="${h/2}" x2="${w}" y2="${h/2}"/>
    <line class="chart-grid" x1="0" y1="${h}" x2="${w}" y2="${h}"/>
    ${bars}</svg>`;
}
// Ring via stroke-dasharray/dashoffset on concentric circles (pathLength=100
// normalization, same trick lineChart uses) rather than path-arc math — each
// segment is a fixed-position circle (dashoffset = -cumulative%, never
// animated) layered under an identically-positioned invisible .chart-bar
// hit circle (wider stroke, animation:none so it doesn't inherit barGrow's
// scaleY meant for actual bars) that feeds the existing tooltip pipeline.
// The visible ring segment's own draw-in grows its dasharray length from 0.
function donutChart(segments, size, strokeWidth, centerLabel){
  const cx = size/2, cy = size/2;
  const r = size/2 - strokeWidth;
  const total = segments.reduce((s,seg)=>s+seg.value,0) || 1;
  let cum = 0, rings = '';
  segments.forEach((seg,i)=>{
    const Li = seg.value/total*100;
    const LiStr = Li.toFixed(2), gapStr = (100-Li).toFixed(2), offset = (-cum).toFixed(2);
    const tip = JSON.stringify({label:seg.name, entries:[{color:seg.color, name:'Conversations', value:seg.value}]});
    rings += `<circle class="chart-seg" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${seg.color}" stroke-width="${strokeWidth}"
      pathLength="100" stroke-dashoffset="${offset}" style="--seg-len:${LiStr};--seg-gap:${gapStr};--delay:${(i*0.12).toFixed(2)}s"/>
      <circle class="chart-bar" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="transparent" stroke-width="${strokeWidth+12}"
      pathLength="100" stroke-dasharray="${LiStr} ${gapStr}" stroke-dashoffset="${offset}" style="animation:none"
      data-tip='${tip.replace(/'/g,'&#39;')}'/>`;
    cum += Li;
  });
  return `<svg class="mini-chart" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="display:block;overflow:visible;">
    <g transform="rotate(-90 ${cx} ${cy})">${rings}</g>
    <text x="${cx}" y="${cy-4}" text-anchor="middle" font-size="24" font-weight="600" fill="var(--text)">${total}</text>
    <text x="${cx}" y="${cy+16}" text-anchor="middle" font-size="11" fill="var(--muted)">${centerLabel||''}</text>
  </svg>`;
}
const WEEKS = ['May 18','May 25','Jun 1','Jun 8','Jun 15','Jun 22','Jun 29','Jul 6','Jul 13','Jul 20','Jul 27','Aug 3'];
function xAxis(labels){ return `<div class="chart-xaxis">${labels.map(l=>`<span>${l}</span>`).join('')}</div>`; }
