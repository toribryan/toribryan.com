/* ================= PAGE CONTENT ================= */

/* ---------- Knowledge: Sources ---------- */
function pageKnowledgeSources(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Sources</h1></div>
      <div class="topbar-actions">
        <button class="btn">Operator</button>
        <button class="btn">Learn &#8964;</button>
        <button class="btn btn-primary">+ New content</button>
      </div>
    </div>
  </div>
  <div class="tabs-row">
    <div class="tab active">All sources</div>
    <div class="tab">AI Agent</div>
    <div class="tab">Copilot</div>
    <div class="tab">Help Center</div>
  </div>
  <div class="scroll-body">
    <div>
      <h3 style="font-size:16px;font-weight:600;letter-spacing:-.02em;margin-bottom:16px;">Optimize your content for AI Assist, Copilot, and Help Center</h3>
      <div style="display:flex;gap:16px;flex-wrap:wrap;">
        <div class="source-card">
          <div class="source-thumb" style="background:#bfeacb;">
            <span class="wordmark" style="font-size:22px;color:#2f7549;">BAB Help</span>
          </div>
          <div class="source-body">
            <div class="source-title-row"><strong>Help Center</strong><span class="status-pill" style="background:#bfeacb;color:#2f7549;">Live</span></div>
            <p class="source-desc">Students and instructors use your knowledge to find accurate answers themselves.</p>
            <div class="link-line" style="color:var(--green);">Set up now ${I('arrowUpRight',14)}</div>
          </div>
        </div>
        <div class="source-card">
          <div class="source-thumb" style="background:#bfe6ea;color:#0c4a6e;">${I('bot',40)}</div>
          <div class="source-body">
            <div class="source-title-row"><strong>AI Assist</strong><span class="status-pill" style="background:var(--unread);color:var(--muted);">Not live</span></div>
            <p class="source-desc">AI Assist uses your knowledge to generate accurate answers for students, instructors, and administrators.</p>
            <div class="link-line" style="color:var(--green);">Set up now ${I('arrowUpRight',14)}</div>
          </div>
        </div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div>
        <h3>Public articles</h3>
        <p style="font-size:13px;color:var(--muted);margin-top:4px;">Let AI Assist and Copilot use public articles from your Help Center.</p>
      </div>
      <div class="source-list">
        <div class="source-row">
          <div class="source-left">
            <span class="source-status-dot" style="background:var(--green-text);"></span>
            <span class="wordmark" style="font-size:16px;">EH</span>
            <strong>Company Help Center</strong>
          </div>
          <span style="color:var(--muted);font-size:13px;">1 article</span>
          <button class="btn">Add article</button>
        </div>
        <div style="height:1px;background:var(--border);"></div>
        <div class="source-row">
          <div class="source-left">
            <span class="source-status-dot" style="background:var(--green-text);"></span>
            <div class="service-mark" style="background:#03363d;">Z</div>
            <strong>Zendesk</strong>
          </div>
          <span style="color:var(--muted);font-size:13px;">Not set up</span>
          <button class="btn">Sync or Import</button>
        </div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div>
        <h3>Internal articles</h3>
        <p style="font-size:13px;color:var(--muted);margin-top:4px;">Give AI Assist and Copilot internal knowledge only available to you and your team.</p>
      </div>
      <div class="source-list">
        <div class="source-row">
          <div class="source-left">
            <span class="source-status-dot" style="background:var(--green-text);"></span>
            <div class="service-mark" style="background:#1f2e47;"></div>
            <strong>Agent Runbooks</strong>
          </div>
          <span style="color:var(--muted);font-size:13px;">1 article</span>
          <button class="btn">Add article</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ---------- Knowledge: Content ---------- */
function pageKnowledgeContent(){
  const row = (icon, name, type, usedIn, edited, author) => `
    <tr data-name="${name.replace(/&amp;/g,'&').toLowerCase()}" data-type="${type}">
      <td class="strong"><span style="display:inline-flex;align-items:center;gap:8px;">${I(icon,16)}${name}</span></td>
      <td>${type}</td><td>${usedIn}</td><td>${edited}</td><td>${author}</td>
    </tr>`;
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Content</h1></div>
      <div class="topbar-actions"><button class="btn btn-primary">+ Create content</button></div>
    </div>
  </div>
  <div class="filter-row bordered">
    ${searchField('content-search','Search content','onKnowledgeContentSearch')}
    ${reportFilterDropdown('content-type','All types',['Folder','Article','Snippet'],'selectContentType')}
    <button class="btn btn-clickable" onclick="showHint('This is a prototype — folder view isn’t wired up yet')">${I('folder',13)} Folders</button>
  </div>
  <div class="scroll-body">
    <div class="card">
      <table>
        <thead><tr><th>Name</th><th>Type</th><th>Used in</th><th>Last edited</th><th>Author</th></tr></thead>
        <tbody id="content-tbody">
          ${row('folder','Restart Lockdown Browser','Folder','AI Assist, Copilot','Aug 12, 2026','Victoria Bryan')}
          ${row('fileText','Camera &amp; mic permissions','Article','Help Center, AI Assist','Aug 10, 2026','Victoria Bryan')}
          ${row('fileText','Room scan troubleshooting','Article','Help Center, Copilot','Aug 9, 2026','Jordan Kim')}
          ${row('folder','Exam accommodation policy','Folder','AI Assist, Help Center','Aug 5, 2026','Victoria Bryan')}
          ${row('msgSquare','Standard greeting','Snippet','AI Assist, Copilot','Jul 30, 2026','Jordan Kim')}
          ${row('fileText','Extension conflict checklist','Article','Copilot','Jul 22, 2026','Victoria Bryan')}
          <tr id="content-empty" style="display:none;"><td colspan="5" style="color:var(--muted);text-align:center;padding:24px;">No content matches your search.</td></tr>
        </tbody>
      </table>
    </div>
  </div>`;
}

/* ---------- Knowledge: Articles ---------- */
function pageKnowledgeArticles(){
  const row = (title, status, collection, views, updated) => `
    <tr data-title="${title.toLowerCase()}" data-status="${status}">
      <td class="strong">${title}</td>
      <td><span class="status-pill ${status==='Published'?'status-live':'status-notlive'}">${status}</span></td>
      <td>${collection}</td><td>${views}</td><td>${updated}</td>
    </tr>`;
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Articles</h1></div>
      <div class="topbar-actions"><button class="btn btn-primary">+ New article</button></div>
    </div>
  </div>
  <div class="filter-row bordered">
    ${searchField('articles-search','Search articles','onKnowledgeArticlesSearch')}
  </div>
  <div class="tabs-row">
    <div class="tab active clickable" onclick="selectArticleTab(event,'All')">All articles</div>
    <div class="tab clickable" onclick="selectArticleTab(event,'Published')">Published</div>
    <div class="tab clickable" onclick="selectArticleTab(event,'Draft')">Drafts</div>
  </div>
  <div class="scroll-body">
    <div class="card">
      <table>
        <thead><tr><th>Title</th><th>Status</th><th>Collection</th><th>Views (30d)</th><th>Last updated</th></tr></thead>
        <tbody id="articles-tbody">
          ${row('What to do if the lockdown browser crashes','Published','Technical Issues','842','Aug 11, 2026')}
          ${row('Camera and microphone permissions guide','Published','Getting Started','611','Aug 9, 2026')}
          ${row('Room scan troubleshooting','Published','Technical Issues','505','Aug 6, 2026')}
          ${row('Requesting extended time accommodations','Draft','Policies','0','Aug 4, 2026')}
          ${row('Two-monitor exam setup requirements','Published','Getting Started','289','Jul 28, 2026')}
          ${row('Rescheduling a missed exam','Draft','Policies','0','Jul 20, 2026')}
          <tr id="articles-empty" style="display:none;"><td colspan="5" style="color:var(--muted);text-align:center;padding:24px;">No articles match your search.</td></tr>
        </tbody>
      </table>
    </div>
  </div>`;
}

/* ---------- Contacts: People (All / Students / Instructors / Administrators) ---------- */
const CONTACTS_BY_ROLE = {
  student: ['jordan','maya','devon','aisha','ty'],
  instructor: ['priya','robert','nina'],
  admin: ['alex','victoria','jordank','dana'],
};
const CONTACT_META = {
  jordan:   {seen:'2 hours ago',  inst:'Cascade State University', signup:'May 3, 2025',  stat:'6'},
  maya:     {seen:'5 hours ago',  inst:'Cascade State University', signup:'Jan 14, 2025', stat:'9'},
  devon:    {seen:'1 day ago',    inst:'Northfield College',       signup:'Sep 8, 2024',  stat:'4'},
  aisha:    {seen:'3 days ago',   inst:'Cascade State University', signup:'Mar 22, 2025', stat:'11'},
  ty:       {seen:'1 week ago',   inst:'Northfield College',       signup:'Oct 30, 2024', stat:'3'},
  priya:    {seen:'6 hours ago',  inst:'Cascade State University', signup:'Aug 19, 2024', stat:'14'},
  robert:   {seen:'2 days ago',   inst:'Northfield College',       signup:'Jul 1, 2024',  stat:'8'},
  nina:     {seen:'4 days ago',   inst:'Cascade State University', signup:'Apr 11, 2025', stat:'5'},
  alex:     {seen:'4 hours ago',  inst:'Cascade State University', signup:'Aug 2, 2025',  stat:'1,204'},
  victoria: {seen:'1 day ago',    inst:'Cascade State University', signup:'Jun 14, 2025', stat:'860'},
  jordank:  {seen:'3 days ago',   inst:'Northfield College',       signup:'Feb 3, 2025',  stat:'512'},
  dana:     {seen:'2 weeks ago',  inst:'Northfield College',       signup:'Nov 19, 2024', stat:'298'},
};
const CONTACT_STAT_LABEL = {student:'Exams taken', instructor:'Exams proctored', admin:'Exams overseen'};
const CONTACT_FILTER_ICON = {all:'users', student:'user', instructor:'userCheck', admin:'users'};
function pageContactsPeople(roleKey){
  const title = {all:'All contacts', student:'Students', instructor:'Instructors', admin:'Administrators'}[roleKey];
  const keys = roleKey==='all'
    ? [...CONTACTS_BY_ROLE.student, ...CONTACTS_BY_ROLE.instructor, ...CONTACTS_BY_ROLE.admin]
    : CONTACTS_BY_ROLE[roleKey];
  const showStatCol = roleKey!=='all';
  const countLabel = roleKey==='all' ? 'contacts' : title.toLowerCase();
  const row = (key) => {
    const p = PEOPLE[key], m = CONTACT_META[key];
    return `<tr>
      <td><span style="display:flex;align-items:center;gap:10px;">${avatar(key,28)}<span class="strong">${p.name}</span></span></td>
      <td>${roleBadge(p.role)}</td><td>${m.seen}</td><td>${m.inst}</td><td>${m.signup}</td>
      ${showStatCol?`<td>${m.stat}</td>`:''}
    </tr>`;
  };
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>${title}</h1></div>
      <div class="topbar-actions"><button class="btn">Learn &#8964;</button><button class="btn btn-primary">New contact &#8964;</button></div>
    </div>
  </div>
  <div class="scroll-body">
    <div class="promo-banner">
      <div style="flex:1;min-width:0;">
        <h3 style="font-size:20px;font-weight:600;letter-spacing:-.02em;">Import your contacts for a personalized experience</h3>
        <p style="font-size:14px;color:var(--muted);margin-top:10px;">View student, instructor, and administrator profiles, or segment your contacts by institution and role. Integrate your SIS/LMS roster, and start reaching your users more effectively with AI Assist and Workflows.</p>
        <div class="promo-links">
          <div class="link-line">${I('book',16)}Get started with contacts</div>
          <div class="link-line">${I('book',16)}Tracking and grouping your contacts</div>
          <div class="link-line">${I('book',16)}Using apps and integrations</div>
          <div class="link-line">${I('arrowUpRight',16)}Visit our App Store</div>
        </div>
      </div>
    </div>
    <div style="display:flex;gap:8px;align-items:center;">
      <button class="btn">${I(CONTACT_FILTER_ICON[roleKey],13)} ${title}</button>
      <button class="btn">${I('calClock',13)} Last seen less than 30 days ago</button>
      <span class="link-line" style="margin:0;">+ Add filter</span>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <h3 style="font-size:16px;font-weight:600;letter-spacing:-.02em;">${keys.length} ${countLabel}</h3>
      <div style="display:flex;gap:8px;"><button class="btn">New message</button><button class="btn">Add tag</button><button class="btn">More &#8964;</button></div>
    </div>
    <div class="card">
      <table>
        <thead><tr><th>Name</th><th>Role</th><th>Last seen</th><th>Institution</th><th>Signed up</th>${showStatCol?`<th>${CONTACT_STAT_LABEL[roleKey]}</th>`:''}</tr></thead>
        <tbody>${keys.map(row).join('')}</tbody>
      </table>
    </div>
  </div>`;
}

/* ---------- Reports: Overview ---------- */
function pageReportsOverview(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Overview</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button></div>
    </div>
  </div>
  <div class="filter-row bordered">
    ${searchField('overview-search','Search reports')}
    ${reportFilterDropdown('overview-category','All categories',['Human Support','AI & Automation','Proctoring'])}
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-4">
      <div class="stat-tile highlight"><div class="stat-label">${I('msgSquare',14)}Total conversations this week</div>
        <div class="stat-value-row"><span class="stat-value">24</span><span class="stat-delta up">${I('arrowUp',12)}+3</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('clock',14)}Median time to first response</div>
        <div class="stat-value-row"><span class="stat-value">2.1 hrs</span><span class="stat-delta down">${I('arrowDown',12)}-0.2 hrs</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('target',14)}Flag precision</div>
        <div class="stat-value-row"><span class="stat-value">77%</span></div>
        <div class="stat-caption">See Flagged Sessions for detail</div></div>
      <div class="stat-tile"><div class="stat-label">${I('userCheck',14)}Deflected by AI Assist</div>
        <div class="stat-value-row"><span class="stat-value">68%</span><span class="stat-delta up">${I('arrowUp',12)}+4pt</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Overall volume growth</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:200px;"><span>30</span><span>15</span><span>0</span></div>
        <div class="chart-plot">${multiLineChart([
          {data:[9,10,11,10,12,13,14,15,17,19,21,24],color:'var(--series-all)',width:2.5,name:'All conversations'},
          {data:[5,6,6,6,7,7,8,9,10,11,12,13],color:'var(--series-student)',name:'Student'},
          {data:[3,3,4,3,4,4,4,5,5,6,6,7],color:'var(--series-instructor)',name:'Instructor'},
          {data:[1,1,1,2,1,2,2,2,2,3,3,3],color:'var(--series-admin)',name:'Administrator'},
        ],1140,200,WEEKS)}</div>
      </div>
      ${xAxis(WEEKS)}
      <div class="chart-legend">
        <div class="legend-item"><span class="legend-dot" style="background:var(--series-all);"></span>All conversations</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--series-student);"></span>Student</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--series-instructor);"></span>Instructor</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--series-admin);"></span>Administrator</div>
      </div>
    </div>
    <div class="card chart-card">
      <h3>Median time to first response, last 12 weeks</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:160px;"><span>3.5h</span><span>1.75h</span><span>0h</span></div>
        <div class="chart-plot">${lineChart([3.4,3.2,3.1,2.9,2.8,2.9,2.6,2.5,2.4,2.2,2.3,2.1],1140,160,'var(--series-all)',WEEKS,'Median time to first response','hrs')}</div>
      </div>
      ${xAxis(WEEKS)}
    </div>
  </div>`;
}

/* ---------- Reports: All reports ---------- */
function pageReportsAll(){
  const row = (icon, name, cat, type, viewed, author, page) => `
    <tr class="clickable" data-page="${page}" data-name="${name.replace(/&amp;/g,'&').toLowerCase()}" data-category="${cat.replace(/&amp;/g,'&')}"><td class="strong"><span style="display:inline-flex;align-items:center;gap:8px;">${I(icon,16)}${name}</span></td>
    <td>${cat}</td><td>${type}</td><td>${viewed}</td><td>${author}</td></tr>`;
  return `
  <div class="topbar">
    <div class="topbar-row"><div><h1>All reports</h1></div>
      <div class="topbar-actions"><button class="btn btn-primary">+ New report</button></div>
    </div>
  </div>
  <div class="filter-row bordered">
    ${searchField('all-reports-search','Search reports','onAllReportsSearch')}
    ${reportFilterDropdown('all-reports-category','All categories',['Human Support','AI & Automation','Proctoring'],'selectAllReportsCategory')}
  </div>
  <div class="scroll-body">
    <div class="card">
      <table>
        <thead><tr><th>Report</th><th>Category</th><th>Type</th><th>Last viewed</th><th>Created by</th></tr></thead>
        <tbody id="all-reports-tbody">
          ${row('msgSquare','Conversation topics','Human Support','Donut','Just now','Victoria Bryan','reports-topics')}
          ${row('bar','Overall volume growth','Human Support','Line','2 hours ago','Victoria Bryan','reports-overview')}
          ${row('users','New conversations by role','Human Support','Line','2 hours ago','Victoria Bryan','reports-conversations-by-role')}
          ${row('clock','Response time','Human Support','Line','2 hours ago','Victoria Bryan','reports-response-time')}
          ${row('smile','Satisfaction (CSAT)','Human Support','Line','5 hours ago','Victoria Bryan','reports-csat')}
          ${row('userCheck','AI Assist deflection rate','AI &amp; Automation','Line','2 days ago','Victoria Bryan','reports-ai-assist')}
          ${row('flag','Flagged sessions by week','Proctoring','Bar','3 hours ago','Victoria Bryan','reports-flagged-sessions')}
          ${row('camOff','Room scan failure rate','Proctoring','Line','1 day ago','Jordan Kim','reports-room-scan')}
          ${row('monitor','Lockdown browser stability','Proctoring','Line','1 day ago','Jordan Kim','reports-lockdown-browser')}
          ${row('puzzle','Extension violations detected','Proctoring','Bar','1 day ago','Jordan Kim','reports-extension-violations')}
          ${row('monitor','Screen share &amp; multi-monitor issues','Proctoring','Line','1 day ago','Jordan Kim','reports-screen-share')}
          ${row('check','Exam completion rate','Proctoring','Line','4 days ago','Jordan Kim','reports-exam-completion')}
          <tr id="all-reports-empty" style="display:none;"><td colspan="5" style="color:var(--muted);text-align:center;padding:24px;">No reports match your search.</td></tr>
        </tbody>
      </table>
    </div>
  </div>`;
}

/* ---------- Reports: Flagged Sessions ---------- */
function pageReportsFlagged(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Flagged Sessions</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">Use this report to monitor exam sessions flagged for manual integrity review.</p>
  </div>
  <div class="filter-row bordered">
    ${searchField('flagged-search','Search sessions')}
    ${reportFilterDropdown('flagged-status','All statuses',['Escalated','False positive','Pending review'])}
    <span class="filter-spacer"></span>
    <span class="filter-meta">Updated 3 minutes ago</span>
    <button class="btn btn-clickable" data-page="integrity-review">View flagged queue &rarr;</button>
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-4">
      <div class="stat-tile highlight"><div class="stat-label">${I('target',14)}Flag precision</div>
        <div class="stat-value-row"><span class="stat-value">77%</span></div>
        <div class="stat-caption">5 escalated of 22 decided sessions</div></div>
      <div class="stat-tile"><div class="stat-label">${I('flag',14)}Sessions flagged this week</div>
        <div class="stat-value-row"><span class="stat-value">14</span><span class="stat-delta up">${I('arrowUp',12)}+3 vs last week</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('shieldAlert',14)}Escalated</div>
        <div class="stat-value-row"><span class="stat-value">5</span><span class="stat-delta up">${I('arrowUp',12)}+2</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('alertCircle',14)}False positives</div>
        <div class="stat-value-row"><span class="stat-value">17</span></div></div>
    </div>
    <div class="footnote"><span class="f">&fnof;</span><span>Method: Flag precision = escalated &divide; (escalated + false positives). Roughly 3 false alarms for every real incident, at ~38 min of review each.</span></div>
    <div class="stat-grid cols-2">
      <div class="stat-tile"><div class="stat-label">${I('hourglass',14)}Total reviewer time this week</div>
        <div class="stat-value-row"><span class="stat-value">14.2 hrs</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('clock',14)}Median time to decision</div>
        <div class="stat-value-row"><span class="stat-value">38 min</span><span class="stat-delta down">${I('arrowDown',12)}-6 min</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Flagged sessions by week</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:200px;"><span>5</span><span>0</span></div>
        <div class="chart-plot">${barChart([1,0,2,1,1,3,2,1,4,2,3,5],1138,200,'var(--bar-idle)',5,'Flagged sessions',WEEKS)}</div>
      </div>
      ${xAxis(WEEKS)}
    </div>
  </div>`;
}

/* ---------- Reports: Room Scan Failures ---------- */
function pageReportsRoomScan(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Room Scan Failures</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">Track how often students fail the initial room scan before an exam can begin.</p>
  </div>
  <div class="filter-row bordered">
    ${searchField('room-scan-search','Search sessions')}
    ${reportFilterDropdown('room-scan-institution','All institutions',['Cascade State University','Northfield College'])}
    <span class="filter-spacer"></span>
    ${compareToggle()}
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-3">
      <div class="stat-tile"><div class="stat-label">${I('camOff',14)}Room scans failed</div>
        <div class="stat-value-row"><span class="stat-value">6.8%</span><span class="stat-delta down">${I('arrowDown',12)}-1.2pt</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('scan',14)}Room scans attempted</div>
        <div class="stat-value-row"><span class="stat-value">2,914</span><span class="stat-delta up">${I('arrowUp',12)}+8%</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('rotateCcw',14)}Retry success rate</div>
        <div class="stat-value-row"><span class="stat-value">91%</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Failure rate by week</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:220px;"><span>15%</span><span>7.5%</span><span>0%</span></div>
        <div class="chart-plot">${lineChart([9.4,8.8,9.1,8.2,7.9,8.4,7.6,7.1,7.4,6.9,7.2,6.8],1124,220,'var(--series-all)',WEEKS,'Failure rate','%')}</div>
      </div>
      ${xAxis(WEEKS)}
    </div>
  </div>`;
}

/* ---------- Reports: AI Assist ---------- */
function pageReportsAiAssist(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>AI Assist</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <div class="segment-row" style="margin-top:14px;">
      <span class="segment-pill active">All</span>
      <span class="segment-pill">Outside live attempt</span>
      <span class="segment-pill">During live attempt</span>
    </div>
  </div>
  <div class="filter-row bordered">
    ${searchField('ai-assist-search','Search conversations')}
    ${reportFilterDropdown('ai-assist-outcome','All outcomes',['Resolved','Escalated','Abandoned'])}
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-4">
      <div class="stat-tile"><div class="stat-label">${I('headset',14)}Time to human (live)</div>
        <div class="stat-value-row"><span class="stat-value">41 sec</span><span class="stat-delta down">${I('arrowDown',12)}-9 sec</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('userCheck',14)}Deflected by AI Assist</div>
        <div class="stat-value-row"><span class="stat-value">68%</span><span class="stat-delta up">${I('arrowUp',12)}+4pt</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('alertTriangle',14)}Escalated without resolution</div>
        <div class="stat-value-row"><span class="stat-value">12%</span><span class="stat-delta warn">${I('alertTriangle',12)}flat</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('userCheck',14)}Resolved by AI Assist</div>
        <div class="stat-value-row"><span class="stat-value">341</span><span class="stat-delta up">${I('arrowUp',12)}+22</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Time to human by week (live attempts)</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:220px;"><span>50%</span><span>25%</span><span>0%</span></div>
        <div class="chart-plot">${lineChart([38,36,34,33,31,30,29,27,26,24,23,22],1120,220,'var(--series-all)',WEEKS,'Time to human','%')}</div>
      </div>
      ${xAxis(WEEKS)}
    </div>
  </div>`;
}

/* ---------- Reports: Conversation Topics ---------- */
function pageReportsTopics(){
  const TOPIC_CATEGORIES = [
    { key:'lockdown', label:'Lockdown browser', icon:'monitor', color:'var(--topic-1)',
      weekly:[3,4,3,5,4,6,5,7,6,8,7,9],
      examples:[ {role:'student', quote:'The lockdown browser closed mid-exam. What do I do?'},
                 {role:'student', quote:'The lockdown browser closed mid-exam'} ] },
    { key:'camera', label:'Camera & room scan', icon:'camOff', color:'var(--topic-2)',
      weekly:[4,5,4,6,5,4,6,5,4,5,4,5], linkPage:'reports-room-scan',
      examples:[ {role:'student', quote:'My camera permission keeps getting denied'} ] },
    { key:'extension', label:'Browser extension conflicts', icon:'puzzle', color:'var(--topic-3)',
      weekly:[2,3,2,4,3,5,4,6,5,7,6,8],
      examples:[ {role:'student', quote:'The proctoring extension says it needs an update'},
                 {role:'student', quote:"Extension update loop won't finish installing"} ] },
    { key:'screenshare', label:'Screen share / multi-monitor', icon:'monitor', color:'var(--topic-4)',
      weekly:[3,4,3,4,3,4,3,4,3,4,3,4],
      examples:[ {role:'student', quote:'Screen recording permission keeps resetting'},
                 {role:'unknown', quote:'My screen share stopped working mid-exam'},
                 {role:'unknown', quote:'Do I need two monitors disconnected?'} ] },
    { key:'access', label:'Exam access', icon:'appWindow', color:'var(--topic-5)',
      weekly:[6,7,6,8,7,6,8,7,6,8,7,9],
      examples:[ {role:'student', quote:'I keep getting a black screen after the proctoring loads'},
                 {role:'unknown', quote:"Hi, I can't access my exam page"} ] },
    { key:'scheduling', label:'Scheduling & accommodations', icon:'calClock', color:'var(--topic-6)',
      weekly:[2,2,3,2,2,3,2,3,2,3,2,3],
      examples:[ {role:'admin', quote:'Is there a way to reschedule my exam time'} ] },
  ];
  const total = c => c.weekly.reduce((s,v)=>s+v,0);
  const top3 = TOPIC_CATEGORIES.slice().sort((a,b)=>total(b)-total(a)).slice(0,3);
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Conversation Topics</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">See what students, instructors, and administrators are asking for help with, grouped by topic.</p>
  </div>
  <div class="filter-row bordered">
    ${searchField('topics-search','Search conversations')}
    ${reportFilterDropdown('topics-category','All categories',TOPIC_CATEGORIES.map(c=>c.label),'onTopicCategorySelect')}
    <span class="filter-spacer"></span>
    <span class="filter-meta">Updated 3 minutes ago</span>
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-3">
      <div class="stat-tile highlight"><div class="stat-label">${I('msgSquare',14)}Top topic this week</div>
        <div class="stat-value-row"><span class="stat-value">Exam access</span></div>
        <div class="stat-caption">85 conversations &middot; 25% of total volume</div></div>
      <div class="stat-tile"><div class="stat-label">${I('bar',14)}Total categorized conversations</div>
        <div class="stat-value-row"><span class="stat-value">335</span><span class="stat-delta up">${I('arrowUp',12)}+11%</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('arrowUp',14)}Fastest-growing topic</div>
        <div class="stat-value-row"><span class="stat-value">Browser extensions</span><span class="stat-delta up">${I('arrowUp',12)}+89%</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Conversations by topic</h3>
      <div style="display:flex;align-items:center;gap:32px;flex-wrap:wrap;">
        ${donutChart(TOPIC_CATEGORIES.map(c=>({value:total(c),color:c.color,name:c.label})),200,28,'Conversations')}
        <div class="chart-legend" style="flex-direction:column;align-items:flex-start;gap:10px;">
          ${TOPIC_CATEGORIES.map(c=>`<div class="legend-item"><span class="legend-dot" style="background:${c.color};"></span>${c.label}</div>`).join('')}
        </div>
      </div>
    </div>
    <div class="card chart-card">
      <h3>Topic volume, last 12 weeks</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:200px;"><span>9</span><span>4.5</span><span>0</span></div>
        <div class="chart-plot">${multiLineChart(top3.map(c=>({data:c.weekly,color:c.color,name:c.label})),1140,200,WEEKS)}</div>
      </div>
      ${xAxis(WEEKS)}
      <div class="chart-legend">
        ${top3.map(c=>`<div class="legend-item"><span class="legend-dot" style="background:${c.color};"></span>${c.label}</div>`).join('')}
      </div>
    </div>
    <div class="card">
      <h3>Themes with real examples</h3>
      <div class="segment-row" style="margin-top:14px;">
        ${TOPIC_CATEGORIES.map((c,i)=>`<span class="segment-pill clickable${i===0?' active':''}" data-topic="${c.key}" onclick="selectTopicTab(event,'${c.key}')">${c.label}</span>`).join('')}
      </div>
      ${TOPIC_CATEGORIES.map((c,i)=>`
      <div class="topic-examples${i===0?' active':''}" id="topic-examples-${c.key}">
        ${c.examples.map(ex=>`
        <div class="example-card">
          <div>${roleBadge(ex.role)}</div>
          <div class="example-card-title">${c.label}</div>
          <div class="example-card-quote">"${ex.quote}"</div>
        </div>`).join('')}
        ${c.linkPage?`<button class="btn btn-clickable" data-page="${c.linkPage}" style="flex-basis:100%;align-self:flex-start;">View Room Scan Failures report &rarr;</button>`:''}
      </div>`).join('')}
    </div>
  </div>`;
}

/* ---------- Reports: New Conversations by Role ---------- */
function pageReportsConversationsByRole(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>New Conversations by Role</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">See how new conversation volume breaks down by who's asking for help.</p>
  </div>
  <div class="filter-row bordered">
    ${searchField('by-role-search','Search conversations')}
    ${reportFilterDropdown('by-role-role','All roles',['Student','Instructor','Administrator'])}
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-3">
      <div class="stat-tile"><div class="stat-label">${I('user',14)}Student conversations</div>
        <div class="stat-value-row"><span class="stat-value">13</span><span class="stat-delta up">${I('arrowUp',12)}+1</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('userCheck',14)}Instructor conversations</div>
        <div class="stat-value-row"><span class="stat-value">7</span><span class="stat-delta up">${I('arrowUp',12)}+1</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('shield',14)}Administrator conversations</div>
        <div class="stat-value-row"><span class="stat-value">3</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>New conversations by role, last 12 weeks</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:200px;"><span>15</span><span>7.5</span><span>0</span></div>
        <div class="chart-plot">${multiLineChart([
          {data:[5,6,6,6,7,7,8,9,10,11,12,13],color:'var(--series-student)',name:'Student'},
          {data:[3,3,4,3,4,4,4,5,5,6,6,7],color:'var(--series-instructor)',name:'Instructor'},
          {data:[1,1,1,2,1,2,2,2,2,3,3,3],color:'var(--series-admin)',name:'Administrator'},
        ],1140,200,WEEKS)}</div>
      </div>
      ${xAxis(WEEKS)}
      <div class="chart-legend">
        <div class="legend-item"><span class="legend-dot" style="background:var(--series-student);"></span>Student</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--series-instructor);"></span>Instructor</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--series-admin);"></span>Administrator</div>
      </div>
    </div>
  </div>`;
}

/* ---------- Reports: Response Time ---------- */
function pageReportsResponseTime(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Response Time</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">Track how quickly conversations get a first reply, and whether that meets your response-time target.</p>
  </div>
  <div class="filter-row bordered">
    ${searchField('response-time-search','Search conversations')}
    ${reportFilterDropdown('response-time-role','All roles',['Student','Instructor','Administrator'])}
    <span class="filter-spacer"></span>
    <span class="filter-meta">Updated 3 minutes ago</span>
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-3">
      <div class="stat-tile highlight"><div class="stat-label">${I('clock',14)}Median time to first response</div>
        <div class="stat-value-row"><span class="stat-value">2.1 hrs</span><span class="stat-delta down">${I('arrowDown',12)}-0.2 hrs</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('target',14)}SLA compliance</div>
        <div class="stat-value-row"><span class="stat-value">92%</span><span class="stat-delta up">${I('arrowUp',12)}+3pt</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('hourglass',14)}Longest outstanding wait</div>
        <div class="stat-value-row"><span class="stat-value">6.4 hrs</span></div></div>
    </div>
    <div class="footnote"><span class="f">&fnof;</span><span>Method: SLA target is 4 hours during business hours. Compliance = replies sent within target &divide; total conversations.</span></div>
    <div class="card chart-card">
      <h3>Median time to first response, last 12 weeks</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:200px;"><span>3.5h</span><span>1.75h</span><span>0h</span></div>
        <div class="chart-plot">${lineChart([3.4,3.2,3.1,2.9,2.8,2.9,2.6,2.5,2.4,2.2,2.3,2.1],1140,200,'var(--series-all)',WEEKS,'Median time to first response','hrs')}</div>
      </div>
      ${xAxis(WEEKS)}
    </div>
  </div>`;
}

/* ---------- Reports: Satisfaction (CSAT) ---------- */
function pageReportsCsat(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Satisfaction (CSAT)</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">See how satisfied students, instructors, and administrators are with the help they received.</p>
  </div>
  <div class="filter-row bordered">
    ${searchField('csat-search','Search conversations')}
    ${reportFilterDropdown('csat-role','All roles',['Student','Instructor','Administrator'])}
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-4">
      <div class="stat-tile highlight"><div class="stat-label">${I('smile',14)}Average satisfaction</div>
        <div class="stat-value-row"><span class="stat-value">4.6/5</span><span class="stat-delta up">${I('arrowUp',12)}+0.1</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('messageCircle',14)}Rated conversations</div>
        <div class="stat-value-row"><span class="stat-value">61%</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('userCheck',14)}Resolution rate</div>
        <div class="stat-value-row"><span class="stat-value">89%</span><span class="stat-delta up">${I('arrowUp',12)}+2pt</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('alertTriangle',14)}Negative ratings this week</div>
        <div class="stat-value-row"><span class="stat-value">3</span><span class="stat-delta down">${I('arrowDown',12)}-2</span></div></div>
    </div>
    <div style="display:flex;gap:20px;flex-wrap:wrap;">
      <div class="card chart-card" style="flex:2;min-width:400px;">
        <h3>Satisfaction score, last 12 weeks</h3>
        <div class="chart-wrap">
          <div class="chart-yaxis" style="height:180px;"><span>5</span><span>2.5</span><span>0</span></div>
          <div class="chart-plot">${lineChart([4.1,4.2,4.2,4.3,4.3,4.4,4.4,4.5,4.5,4.5,4.6,4.6],780,180,'var(--series-all)',WEEKS,'Satisfaction','/5')}</div>
        </div>
        ${xAxis(WEEKS)}
      </div>
      <div class="card chart-card" style="flex:1;min-width:280px;">
        <h3>Rating distribution</h3>
        <div class="chart-wrap">
          <div class="chart-yaxis" style="height:180px;"><span>60%</span><span>30%</span><span>0%</span></div>
          <div class="chart-plot">${barChart([2,3,7,26,62],320,180,'var(--bar-idle)',65,'Ratings',['1 star','2 stars','3 stars','4 stars','5 stars'])}</div>
        </div>
        ${xAxis(['1&#9733;','2&#9733;','3&#9733;','4&#9733;','5&#9733;'])}
      </div>
    </div>
  </div>`;
}

/* ---------- Reports: Lockdown Browser ---------- */
function pageReportsLockdownBrowser(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Lockdown Browser</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">Track lockdown browser stability during exams &mdash; crashes, forced closures, and recovery.</p>
  </div>
  <div class="filter-row bordered">
    ${searchField('lockdown-search','Search sessions')}
    ${reportFilterDropdown('lockdown-institution','All institutions',['Cascade State University','Northfield College'])}
    <span class="filter-spacer"></span>
    ${compareToggle()}
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-3">
      <div class="stat-tile"><div class="stat-label">${I('monitor',14)}Sessions with a crash or forced close</div>
        <div class="stat-value-row"><span class="stat-value">4.1%</span><span class="stat-delta down">${I('arrowDown',12)}-0.6pt</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('scan',14)}Sessions using lockdown browser</div>
        <div class="stat-value-row"><span class="stat-value">3,208</span><span class="stat-delta up">${I('arrowUp',12)}+6%</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('rotateCcw',14)}Recovered without support</div>
        <div class="stat-value-row"><span class="stat-value">84%</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Crash rate by week</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:220px;"><span>8%</span><span>4%</span><span>0%</span></div>
        <div class="chart-plot">${lineChart([6.8,6.5,6.9,6.1,5.8,6,5.4,5.1,5.3,4.6,4.4,4.1],1124,220,'var(--series-all)',WEEKS,'Crash rate','%')}</div>
      </div>
      ${xAxis(WEEKS)}
    </div>
  </div>`;
}

/* ---------- Reports: Extension Violations ---------- */
function pageReportsExtensionViolations(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Extension Violations</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">Track browser extension conflicts and policy violations detected during proctored exams.</p>
  </div>
  <div class="filter-row bordered">
    ${searchField('extension-search','Search sessions')}
    ${reportFilterDropdown('extension-institution','All institutions',['Cascade State University','Northfield College'])}
    <span class="filter-spacer"></span>
    <span class="filter-meta">Updated 3 minutes ago</span>
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-3">
      <div class="stat-tile highlight"><div class="stat-label">${I('puzzle',14)}Violations detected this week</div>
        <div class="stat-value-row"><span class="stat-value">8</span><span class="stat-delta up">${I('arrowUp',12)}+2 vs last week</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('scan',14)}Sessions scanned for extensions</div>
        <div class="stat-value-row"><span class="stat-value">3,208</span><span class="stat-delta up">${I('arrowUp',12)}+6%</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('rotateCcw',14)}Resolved without escalation</div>
        <div class="stat-value-row"><span class="stat-value">88%</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Violations detected by week</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:200px;"><span>10</span><span>5</span><span>0</span></div>
        <div class="chart-plot">${barChart([2,3,2,4,3,5,4,6,5,7,6,8],1138,200,'var(--bar-idle)',10,'Violations',WEEKS)}</div>
      </div>
      ${xAxis(WEEKS)}
    </div>
  </div>`;
}

/* ---------- Reports: Screen Share & Multi-Monitor ---------- */
function pageReportsScreenShare(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Screen Share &amp; Multi-Monitor</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">Track screen share permission failures and multi-monitor detections during proctored exams.</p>
  </div>
  <div class="filter-row bordered">
    ${searchField('screen-share-search','Search sessions')}
    ${reportFilterDropdown('screen-share-institution','All institutions',['Cascade State University','Northfield College'])}
    <span class="filter-spacer"></span>
    ${compareToggle()}
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-3">
      <div class="stat-tile"><div class="stat-label">${I('monitor',14)}Multi-monitor detections</div>
        <div class="stat-value-row"><span class="stat-value">3.2%</span><span class="stat-delta down">${I('arrowDown',12)}-0.4pt</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('camOff',14)}Screen share permission failures</div>
        <div class="stat-value-row"><span class="stat-value">41</span><span class="stat-delta up">${I('arrowUp',12)}+5</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('rotateCcw',14)}Cleared on retry</div>
        <div class="stat-value-row"><span class="stat-value">79%</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Detection rate by week</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:220px;"><span>6%</span><span>3%</span><span>0%</span></div>
        <div class="chart-plot">${lineChart([4.8,4.6,4.9,4.3,4.5,4.1,4.4,3.9,3.7,3.6,3.4,3.2],1124,220,'var(--series-all)',WEEKS,'Detection rate','%')}</div>
      </div>
      ${xAxis(WEEKS)}
    </div>
  </div>`;
}

/* ---------- Reports: Exam Completion Rate ---------- */
function pageReportsExamCompletion(){
  return `
  <div class="topbar">
    <div class="topbar-row">
      <div><h1>Exam Completion Rate</h1></div>
      <div class="topbar-actions"><button class="btn">Date range</button><button class="btn">Export</button><button class="btn">Share</button><button class="btn btn-primary">Save</button></div>
    </div>
    <p class="sub" style="margin-top:14px;">Track how often proctored exam sessions complete without a technical or integrity interruption.</p>
  </div>
  <div class="filter-row bordered">
    ${searchField('exam-completion-search','Search sessions')}
    ${reportFilterDropdown('exam-completion-institution','All institutions',['Cascade State University','Northfield College'])}
    <span class="filter-spacer"></span>
    ${compareToggle()}
  </div>
  <div class="scroll-body">
    <div class="stat-grid cols-3">
      <div class="stat-tile highlight"><div class="stat-label">${I('check',14)}Completed without interruption</div>
        <div class="stat-value-row"><span class="stat-value">93.4%</span><span class="stat-delta up">${I('arrowUp',12)}+0.7pt</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('monitor',14)}Terminated early &mdash; technical</div>
        <div class="stat-value-row"><span class="stat-value">142</span><span class="stat-delta down">${I('arrowDown',12)}-18</span></div></div>
      <div class="stat-tile"><div class="stat-label">${I('shieldAlert',14)}Terminated early &mdash; integrity flag</div>
        <div class="stat-value-row"><span class="stat-value">31</span><span class="stat-delta up">${I('arrowUp',12)}+4</span></div></div>
    </div>
    <div class="card chart-card">
      <h3>Sessions terminated early, by week</h3>
      <div class="chart-wrap">
        <div class="chart-yaxis" style="height:200px;"><span>20</span><span>10</span><span>0</span></div>
        <div class="chart-plot">${multiLineChart([
          {data:[16,15,17,14,13,15,12,13,11,10,12,9],color:'var(--bar-idle)',width:2.5,name:'Technical'},
          {data:[2,3,2,3,2,4,2,3,3,4,3,4],color:'var(--red-text)',name:'Integrity flag'},
        ],1140,200,WEEKS)}</div>
      </div>
      ${xAxis(WEEKS)}
      <div class="chart-legend">
        <div class="legend-item"><span class="legend-dot" style="background:var(--bar-idle);"></span>Technical</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--red-text);"></span>Integrity flag</div>
      </div>
    </div>
  </div>`;
}

/* ---------- Settings: Home ---------- */
function pageSettingsHome(){
  const card = (icon,bg,title,desc,page) => `
    <div class="settings-card clickable" data-page="${page}">
      <div class="settings-icon-bg" style="background:${bg};">${I(icon,20)}</div>
      <div><h4>${title}</h4><p>${desc}</p></div>
    </div>`;
  return `
  <div class="topbar"><h1>Home</h1></div>
  <div class="scroll-body">
    <div class="section-block">
      <h3>Workspace</h3>
      <div class="settings-grid">
        ${card('list','var(--purple-bg)','General','Set workspace name, time zone, and defaults.','settings-general')}
        ${card('globe','var(--purple-bg)','Institutions','Manage the institutions using this workspace.','settings-institutions')}
        ${card('puzzle','var(--pink-bg)','Integrations','Connect Canvas, Zendesk, and other tools.','settings-integrations')}
      </div>
    </div>
  </div>`;
}

/* ---------- Settings: General ---------- */
function pageSettingsGeneral(){
  const field = (label, key, readonly) => `<div class="form-field"><label>${label}</label>
    <input class="form-input" value="${settingsFields[key]}" ${readonly?'readonly':`oninput="updateSettingsField(event,'${key}')"`}></div>`;
  const toggle = (key) => `<div class="toggle ${settingsToggles[key]?'on':'off'} clickable" onclick="toggleSetting(event,'${key}')"><span class="toggle-knob"></span></div>`;
  return `
  <div class="topbar">
    <div class="topbar-row"><h1>General</h1><button class="btn btn-primary btn-clickable" onclick="showToast('Settings saved', {type:'success', description:'Changes are stored for this session only.'})">Save</button></div>
  </div>
  <div class="scroll-body">
    <div class="field-group">
      <div class="field-label"><h4>Workspace name &amp; time zone</h4><p>The workspace time zone will affect time-dependent features across the proctoring workspace.</p></div>
      <div class="field-body">
        ${field('Name','name')}
        ${field('Customer-facing name','customerName')}
        ${field('App ID','appId',true)}
        ${field('Time zone','timezone')}
      </div>
    </div>
    <div class="field-group">
      <div class="field-label"><h4>Test workspace</h4><p>Experiment with features and integrations in a risk-free environment before rolling changes out to your live workspace.</p></div>
      <div class="field-body">
        <div class="toggle-row">${toggle('testWorkspace')}
          <div class="toggle-text"><strong>Enable test workspace</strong></div></div>
      </div>
    </div>
  </div>`;
}

/* ---------- Settings: Institutions ---------- */
// Real data, not a mock table — grouped straight from the same CONTACT_META
// Contacts already uses, so this can never drift out of sync with the People
// counts the way the old hardcoded settings copy did.
function pageSettingsInstitutions(){
  const counts = {};
  Object.keys(CONTACT_META).forEach(key => {
    const inst = CONTACT_META[key].inst;
    counts[inst] = (counts[inst]||0) + 1;
  });
  const toggle = (key) => `<div class="toggle ${settingsToggles[key]?'on':'off'} clickable" onclick="toggleSetting(event,'${key}')"><span class="toggle-knob"></span></div>`;
  return `
  <div class="topbar">
    <div class="topbar-row"><h1>Institutions</h1><button class="btn btn-primary btn-clickable" onclick="showToast('Settings saved', {type:'success', description:'Changes are stored for this session only.'})">Save</button></div>
  </div>
  <div class="scroll-body">
    <div class="field-group">
      <div class="field-label"><h4>Institution grouping</h4><p>The proctoring treats all users as individuals, but this feature groups students, instructors, and administrators from the same institution together.</p></div>
      <div class="field-body">
        <div class="toggle-row">${toggle('institutionFeatures')}
          <div class="toggle-text"><strong>Enable institution-related features</strong></div></div>
      </div>
    </div>
    <div class="card">
      <table>
        <thead><tr><th>Institution</th><th>Contacts</th></tr></thead>
        <tbody>
          ${Object.keys(counts).map(inst=>`<tr><td class="strong">${inst}</td><td>${counts[inst]}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

/* ---------- Settings: Integrations ---------- */
// Only the two integrations that actually mean something elsewhere in the
// app: Canvas is what powers the Exam/Course fields already shown in every
// conversation's Environment panel, and Zendesk is the same "Not set up"
// source already listed on Knowledge > Sources. No Blackboard card — nothing
// else in the app ever references it, so it had no reason to exist here.
function pageSettingsIntegrations(){
  return `
  <div class="topbar"><h1>Integrations</h1></div>
  <div class="scroll-body">
    <div style="display:flex;gap:16px;flex-wrap:wrap;">
      <div class="source-card">
        <div class="source-thumb" style="background:#fff;border-bottom:1px solid var(--border);">${Ilms('canvas',40)}</div>
        <div class="source-body">
          <div class="source-title-row"><strong>Canvas LMS</strong><span class="status-pill status-live">Connected</span></div>
          <p class="source-desc">Powers the exam and course details shown in each conversation's Environment panel.</p>
          <button class="btn btn-clickable" onclick="showHint('This is a prototype — integration settings aren’t wired up yet')">Manage</button>
        </div>
      </div>
      <div class="source-card">
        <div class="source-thumb" style="background:#fff;border-bottom:1px solid var(--border);">
          <div class="service-mark" style="background:#03363d;width:40px;height:40px;font-size:16px;border-radius:8px;">Z</div>
        </div>
        <div class="source-body">
          <div class="source-title-row"><strong>Zendesk</strong><span class="status-pill status-notlive">Not connected</span></div>
          <p class="source-desc">Sync support tickets and Help Center articles into your knowledge sources.</p>
          <button class="btn btn-clickable" onclick="showHint('This is a prototype — integration settings aren’t wired up yet')">Connect</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ---------- Integrity Review ---------- */
function pageIntegrityReview(){
  const row = (key,course,note,pill,bg) => `
    <div class="ir-row" style="display:flex;gap:16px;align-items:center;padding:12px 16px;border-top:.5px solid var(--border-soft);${bg?`background:${bg};`:''}">
      <div style="width:180px;flex:0 0 180px;">
        <div class="strong" style="font-weight:600;">${PEOPLE[key].name}</div>
        <div style="font-size:12px;color:var(--muted);">${course}</div>
      </div>
      <div style="flex:1;font-size:13px;color:var(--muted);">${note}</div>
      <div style="flex:0 0 auto;">${pill}</div>
    </div>`;
  return `
  <div class="topbar">
    <h1>Integrity Review</h1>
    <p class="sub">Flag classification and adjudication live here &mdash; never in the support conversation. Support agents send facts; reviewers make the call.</p>
  </div>
  <div class="scroll-body" style="flex-direction:row;align-items:flex-start;">
    <div class="card" style="width:760px;flex:0 0 760px;">
      <div class="card-header bordered">Flagged sessions</div>
      ${row('jordan','BIO 201 Midterm','Room scan re-check triggered after browser restart','<span class="pill pill-outline">Under review</span>','var(--amber-bg)')}
      ${row('priya','CHEM 110 Final','Lockdown browser closed and reopened','<span class="pill pill-escalated">Escalated</span>')}
      ${row('marcus','MATH 220 Quiz 3','Two monitors detected at start of exam','<span class="pill pill-cleared">Cleared</span>')}
    </div>
    <div class="card" style="width:390px;flex:0 0 390px;">
      <div style="padding:16px 20px 12px;">
        <div style="font-size:14px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--red-text);">Support Activity &middot; Facts Only</div>
        <div style="font-size:16px;font-weight:600;letter-spacing:-.02em;margin-top:4px;">Jordan Lee &mdash; auto-generated on close</div>
      </div>
      <div style="padding:0 20px 16px;display:flex;flex-direction:column;gap:14px;">
        <div style="display:flex;gap:10px;"><span style="width:6px;height:6px;border-radius:999px;background:var(--muted);margin-top:6px;flex:0 0 auto;"></span>
          <div><div style="font-size:12px;color:var(--muted);font-weight:500;">2:44 PM</div><div style="font-size:13px;margin-top:2px;">Student reported: lockdown browser closed mid-exam.</div></div></div>
        <div style="display:flex;gap:10px;"><span style="width:6px;height:6px;border-radius:999px;background:var(--muted);margin-top:6px;flex:0 0 auto;"></span>
          <div><div style="font-size:12px;color:var(--muted);font-weight:500;">2:44 PM</div><div style="font-size:13px;margin-top:2px;">Agent diagnosed: application crash, consistent with a known browser-extension conflict &mdash; not tab-switch or exit behavior.</div></div></div>
        <div style="display:flex;gap:10px;"><span style="width:6px;height:6px;border-radius:999px;background:var(--muted);margin-top:6px;flex:0 0 auto;"></span>
          <div><div style="font-size:12px;color:var(--muted);font-weight:500;">2:45 PM</div><div style="font-size:13px;margin-top:2px;">Action taken: instructed restart from desktop shortcut; confirmed exam progress saved automatically.</div></div></div>
        <div style="display:flex;gap:10px;"><span style="width:6px;height:6px;border-radius:999px;background:var(--muted);margin-top:6px;flex:0 0 auto;"></span>
          <div><div style="font-size:12px;color:var(--muted);font-weight:500;">2:47 PM</div><div style="font-size:13px;margin-top:2px;">Outcome: student re-entered the exam. Session resumed without further interruption.</div></div></div>
      </div>
      <div style="border-top:1px solid var(--border);padding:14px 20px 18px;">
        <p style="font-size:12px;color:var(--muted);">This record is generated automatically from the support conversation. It contains no suspicion language and no reviewer conclusion &mdash; reviewers decide below.</p>
        <div style="display:flex;gap:8px;margin-top:10px;">
          <button class="btn" style="background:var(--green-bg);color:var(--green-text);">Clear &mdash; no action needed</button>
          <button class="btn" style="background:#fffbeb;color:var(--amber);">Escalate</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ---------- Inbox ---------- */
function inboxChatItem(role, roleLabel, timeLabel, preview, opts){
  opts = opts || {};
  // Row state drives surface: selected > unread (lighter than ground) > read.
  // closed/replied/filteredOut are independent overlay classes, not part of
  // that priority chain — see css/inbox.css for what each one does visually.
  const state = (opts.selected ? ' selected' : (opts.unread ? ' unread' : ''))
    + (opts.pinned ? ' pinned' : '')
    + (opts.closed ? ' closed' : '')
    + (opts.replied ? ' replied' : '')
    + (opts.filteredOut ? ' filtered-out' : '');
  // Closed beats live beats a plain timestamp — a resolved ticket doesn't
  // still look "in progress", even if the underlying attempt hasn't ended.
  const right = opts.closed
    ? `<span class="closed-badge">Closed</span>`
    : opts.live
      ? `<span class="live-badge">In-attempt</span>`
      : `<span class="chat-item-time">${timeLabel}</span>`;
  return `<div class="chat-item${state}" role="button" tabindex="0" aria-current="${opts.selected?'true':'false'}"
    ${opts.convo?`data-convo="${opts.convo}"`:''}
    onclick="selectChatItem(event,this)" onkeydown="onChatItemKeydown(event)">
    ${roleAvatar(role, opts.replied)}
    <div class="chat-item-body">
      <div class="chat-item-top">
        <span class="chat-item-name">${roleLabel}</span>
        ${right}
      </div>
      <div class="chat-item-preview"><p>${preview}</p></div>
    </div>
  </div>`;
}

/* Every row in the inbox list has a real backing entry here — selectChatItem()
   can always switch the chat window to whatever's clicked, so the selected
   row and the open conversation never disagree. The six "flagship" entries
   below (welcome, jordan, aisha, maya, dana, ty) carry full detail: a real
   multi-message thread, side-panel fields, sometimes an accordion. Every
   other arrival (see INBOX_ARRIVALS/INBOX_TAIL_ARRIVALS further down) gets a
   minimal entry auto-generated from its own row data — a one-message thread
   using the exact text already shown in its preview, no fields, no
   accordion. That's not faking a full roster; it's just also showing, once
   opened, the one real thing we already know about that row. */
const CONVERSATIONS = {
  welcome: {
    key:'welcome', name:'Integrity Console', role:'system', initials:'IC',
    started:'Just now', pinned:true,
    thread:[
      {mine:false, wide:true, time:'Just now', text:`
        <p style="margin:0 0 10px;">This is a fully interactive front-end prototype &mdash; a proctoring and academic-integrity support console, designed and built to showcase product and UX work. Every screen is clickable; all data is fictional and no backend is connected.</p>
        <div class="welcome-hotkeys">
          <div class="welcome-hotkey-row"><div class="hotkey-keys"><kbd>Esc</kbd></div><div class="hotkey-label">Exit prototype, return to portfolio</div></div>
          <div class="welcome-hotkey-row"><div class="hotkey-keys"><kbd>&#8984;</kbd><kbd>G</kbd></div><div class="hotkey-label">Show guided walkthroughs</div></div>
        </div>`},
    ],
  },
  jordan: {
    key:'jordan', name:'Jordan Lee', role:'student', initials:'JL', canvas:true,
    started:'2:44 PM',
    thread:[
      {mine:false, text:'The lockdown browser closed mid-exam. What do I do?', time:'2:44 PM'},
      {mine:true, text:'Reopen it from your desktop shortcut &mdash; your progress is saved automatically.', time:'2:45 PM'},
    ],
    fields:[['Student Name','Jordan Lee'],['Student ID','e6a0c4f2b8d6e0a4'],['Course','BIO 201 &middot; Cell Biology'],
      ['Exam','Midterm &mdash; Ch. 4-7'],['Institution','Cascade State University']],
  },
  aisha: {
    key:'aisha', name:'Aisha Patel', role:'student', initials:'AP',
    started:'1:12 PM',
    thread:[
      {mine:false, text:'I keep getting a black screen after the proctoring loads', time:'1:12 PM'},
      {mine:true, text:"Let's try clearing the app's cache &mdash; go to Settings &gt; Privacy &gt; Clear browsing data, then relaunch.", time:'1:13 PM'},
      {mine:false, text:'That worked, thank you!', time:'1:16 PM'},
    ],
    fields:[['Student Name','Aisha Patel'],['Student ID','8f1c2d4e6a0b3f9c'],['Course','PSYC 210 &middot; Intro Psychology'],
      ['Exam','Quiz 4'],['Institution','Cascade State University']],
    accordion:{icon:'appWindow', title:'Environment', rows:[
      ['Canvas &mdash; PSYC 210 Exam','chat.theproctoring.com'],
      ['Access status','Cleared &mdash; session resumed'],
    ]},
  },
  maya: {
    key:'maya', name:'Maya Chen', role:'student', initials:'MC',
    started:'1:58 PM',
    thread:[
      {mine:false, text:'My camera permission keeps getting denied', time:'1:58 PM'},
      {mine:true, text:'No problem &mdash; click the camera icon in your address bar and set it to Allow, then refresh the page.', time:'1:59 PM'},
    ],
    fields:[['Student Name','Maya Chen'],['Student ID','a3f091cbb7e2d9c1'],['Course','MATH 220 &middot; Calculus II'],
      ['Exam','Quiz 3'],['Institution','Cascade State University']],
    accordion:{icon:'cpu', title:'Hardware &amp; System', rows:[
      ['Webcam','Permission blocked by browser'],
      ['Browser','Chrome 128.0.6613'],
      ['Displays Detected','1 monitor'],
    ]},
  },
  dana: {
    key:'dana', name:'Dana Ortiz', role:'admin', initials:'DO',
    started:'12:41 PM',
    thread:[
      {mine:false, text:'Is there a way to reschedule my exam time', time:'12:41 PM'},
      {mine:true, text:'Yes &mdash; reschedule requests go through the Institutions settings page. I can walk you through submitting one now if you’d like.', time:'12:43 PM'},
    ],
    fields:[['Name','Dana Ortiz'],['Role','Administrator'],['Institution','Northfield College'],['Request type','Reschedule policy question']],
  },
  ty: {
    key:'ty', name:'Ty Fischer', role:'student', initials:'TF',
    started:'11:20 AM',
    thread:[
      {mine:false, text:'The proctoring extension says it needs an update', time:'11:20 AM'},
      {mine:true, text:'Go ahead and update it from the Chrome Web Store &mdash; it only takes a minute, and your exam won’t start until it’s current.', time:'11:21 AM'},
    ],
    fields:[['Student Name','Ty Fischer'],['Student ID','5b7e2a9c1f4d8036'],['Course','ENG 105 &middot; Composition'],
      ['Exam','Final'],['Institution','Northfield College']],
    accordion:{icon:'puzzle', title:'Extensions', rows:[
      ['Proctoring Extension','v2.0.1 &mdash; update available'],
      ['Grammarly','Disabled during exam'],
    ]},
  },
  visitor: {
    key:'visitor', name:'Unverified visitor', role:'unknown', initials:'?',
    started:'10:05 AM',
    thread:[
      {mine:false, text:"Hi, I can't access my exam page", time:'10:05 AM'},
      {mine:true, text:'I can help &mdash; first I’ll need to verify your identity. Can you confirm the email you used to register for this exam?', time:'10:06 AM'},
    ],
    fields:[['Name','Not yet verified'],['Student ID','Pending verification'],['Course','Unknown'],
      ['Exam','Unknown'],['Institution','Unknown']],
  },
};
// The inbox starts with only the pinned Welcome message — everything else
// trickles in one at a time at randomized, realistic intervals (see
// startInboxTrickle in app.js) rather than appearing all at once. Every
// entry uses its `key` as both the CONVERSATIONS lookup and the DOM
// data-convo attribute — one identifier, not two fields that can drift out
// of sync. The first six keys (jordan/aisha/maya/dana/ty, plus welcome
// itself) are the flagship conversations defined above; every other key
// gets a minimal CONVERSATIONS entry auto-generated below from this same
// data, so opening it shows the one real message it already has instead of
// silently doing nothing.
// time:'now' is a sentinel — it tells demoAddChatter to stamp the row with a
// real arrival time and keep its "_m ago" text accurate as real time passes,
// starting from "Just now". A row with opts.live shows the "In-attempt"
// badge instead of any time label, so it has no time field at all. The
// "6 min left" row is a real exception to the sentinel: that's an
// exam-timer countdown, not a message-age label, so it stays hand-typed.
const INBOX_ARRIVALS = [
  {key:'aisha', role:'student', label:'Student', preview:'I keep getting a black screen after The proctoring loads', opts:{live:true}},
  {key:'visitor', role:'unknown', label:'Unknown', preview:"Hi, I can't access my exam page", opts:{live:true}},
  {key:'jordan', role:'student', label:'Student', time:'now', preview:'The lockdown browser closed mid-exam. What do I do?', opts:{}},
  {key:'maya', role:'student', label:'Student', time:'now', preview:'My camera permission keeps getting denied', opts:{}},
  {key:'dana', role:'admin', label:'Administrator', time:'now', preview:'Is there a way to reschedule my exam time', opts:{}},
  {key:'ty', role:'student', label:'Student', time:'now', preview:'The proctoring extension says it needs an update', opts:{}},
  {key:'filler-lockdown', role:'student', label:'Student', time:'6 min left', preview:'My lockdown browser keeps flashing a black screen every few minutes', opts:{}},
  {key:'filler-verify', role:'unknown', label:'Unknown', time:'now', preview:"It's asking me to verify my identity again and I don't know why", opts:{}},
  {key:'filler-instructor', role:'admin', label:'Administrator', time:'now', preview:"One of my instructors can't see a student's exam submission", opts:{}},
  {key:'filler-screenrec', role:'student', label:'Student', time:'now', preview:'Screen recording permission keeps resetting', opts:{}},
  {key:'filler-screenshare', role:'unknown', label:'Unknown', time:'now', preview:'My screen share stopped working mid-exam', opts:{}},
  {key:'filler-extloop', role:'student', label:'Student', time:'now', preview:"Extension update loop won't finish installing", opts:{}},
  {key:'filler-monitors', role:'unknown', label:'Unknown', time:'now', preview:'Do I need two monitors disconnected?', opts:{}},
  {key:'filler-submit', role:'student', label:'Student', time:'now', preview:"The exam won't let me submit, it just spins", opts:{}},
];
// A handful of extra late arrivals once the main list has finished trickling
// in, so the inbox still feels "live" for a bit rather than just stopping.
const INBOX_TAIL_ARRIVALS = [
  {key:'filler-timer', role:'student', label:'Student', preview:'My exam timer looks wrong, is that normal?', opts:{live:true}},
  {key:'filler-loggedout', role:'unknown', label:'Unknown', preview:"I got logged out mid-exam, what do I do?", opts:{live:true}},
  {key:'filler-report', role:'admin', label:'Administrator', preview:"Can I get a report of today's flagged sessions?", opts:{live:true}},
];
// Auto-generate a minimal CONVERSATIONS entry for every arrival that isn't
// one of the flagship conversations already defined above — a one-message
// thread using the exact text already shown in the row's preview. This is
// what makes every row in the list openable: selectChatItem() only has to
// know that CONVERSATIONS[key] exists, never which keys are "real".
[...INBOX_ARRIVALS, ...INBOX_TAIL_ARRIVALS].forEach(function(item){
  if(CONVERSATIONS[item.key]) return;
  CONVERSATIONS[item.key] = {
    key:item.key, name:item.label, role:item.role, initials:item.label[0],
    thread:[{mine:false, text:item.preview, time:'Just now'}],
  };
});
function convoThreadHtml(conv){
  const rows = conv.thread.map(m => {
    if(m.mine) return `<div class="msg-row mine"><div class="msg-col mine"><div class="bubble mine">${m.text}</div><span class="msg-time">${m.time}</span></div></div>`;
    const colClass = m.wide ? ' welcome-col' : '';
    const bubbleClass = m.wide ? ' welcome-bubble' : '';
    return `<div class="msg-row"><div class="msg-avatar">${conv.initials}</div><div class="msg-col${colClass}"><div class="bubble${bubbleClass}">${m.text}</div><span class="msg-time">${m.time}</span></div></div>`;
  }).join('');
  if(conv.role === 'system' || !conv.started) return rows;
  return `<div class="system-msg">Chat Started - ${conv.started}</div>${rows}`;
}
function convoAccordionsHtml(conv){
  if(conv.key === 'jordan') return jordanAccordionsHtml();
  if(!conv.accordion) return '';
  const a = conv.accordion;
  return `<div class="accordion-header open" onclick="toggleAccordion(event,'acc-${conv.key}')"><span class="left">${I(a.icon,16)}${a.title}</span><span class="chev">${I('chevronRight',16)}</span></div>
    <div class="accordion-body open" id="acc-${conv.key}">
      ${a.rows.map(r=>`<div class="accordion-row"><strong>${r[0]}</strong><span>${r[1]}</span></div>`).join('')}
    </div>`;
}
// Jordan is the one flagship conversation with the full 4-section device/exam
// breakdown — extracted so both the initial render and renderConversation()
// (js/app.js) produce the exact same markup when the demo cycles back to him.
function jordanAccordionsHtml(){
  return `
        <div class="accordion-header" onclick="toggleAccordion(event,'acc-userdata')"><span class="left">${I('user',16)}User Data</span><span class="chev">${I('chevronRight',16)}</span></div>
        <div class="accordion-body" id="acc-userdata">
          <div class="accordion-row"><strong>Email</strong><span>jordan.lee@cascadestate.edu</span></div>
          <div class="accordion-row"><strong>Enrollment Status</strong><span>Active &mdash; Fall 2026</span></div>
          <div class="accordion-row"><strong>Accommodations</strong><span>None on file</span></div>
          <div class="accordion-row"><strong>Time Zone</strong><span>Pacific Time (UTC-7)</span></div>
        </div>
        <div class="accordion-header" onclick="toggleAccordion(event,'acc-hardware')"><span class="left">${I('cpu',16)}Hardware &amp; System</span><span class="chev">${I('chevronRight',16)}</span></div>
        <div class="accordion-body" id="acc-hardware">
          <div class="accordion-row"><strong>Operating System</strong><span>Windows 11 Home</span></div>
          <div class="accordion-row"><strong>Browser</strong><span>Chrome 128.0.6613</span></div>
          <div class="accordion-row"><strong>Lockdown Browser Version</strong><span>2.1.4 &mdash; up to date</span></div>
          <div class="accordion-row"><strong>Webcam</strong><span>Logitech C920 &mdash; Connected</span></div>
          <div class="accordion-row"><strong>Microphone</strong><span>Built-in &mdash; Connected</span></div>
          <div class="accordion-row"><strong>Displays Detected</strong><span>1 monitor</span></div>
        </div>
        <div class="accordion-header" onclick="toggleAccordion(event,'acc-extensions')"><span class="left">${I('puzzle',16)}Extensions</span><span class="chev">${I('chevronRight',16)}</span></div>
        <div class="accordion-body" id="acc-extensions">
          <div class="accordion-row"><strong>Grammarly</strong><span>Disabled during exam</span></div>
          <div class="accordion-row"><strong>1Password</strong><span>Disabled during exam</span></div>
          <div class="accordion-row"><strong>Honey</strong><span>Not detected running</span></div>
        </div>
        <div class="accordion-header" onclick="toggleAccordion(event,'acc-examsettings')"><span class="left">${I('settings2',16)}Exam Settings</span><span class="chev">${I('chevronRight',16)}</span></div>
        <div class="accordion-body" id="acc-examsettings">
          <div class="accordion-row"><strong>Time Limit</strong><span>90 minutes</span></div>
          <div class="accordion-row"><strong>Attempts Allowed</strong><span>1</span></div>
          <div class="accordion-row"><strong>Webcam Required</strong><span>Yes</span></div>
          <div class="accordion-row"><strong>Allowed Materials</strong><span>None &mdash; closed book</span></div>
          <div class="accordion-row"><strong>Extra Time Granted</strong><span>None</span></div>
        </div>
        <div class="accordion-header open" onclick="toggleAccordion(event,'acc-environment')"><span class="left">${I('appWindow',16)}Environment</span><span class="chev">${I('chevronRight',16)}</span></div>
        <div class="accordion-body open" id="acc-environment">
          <div class="accordion-row"><strong>Canvas &mdash; BIO 201 Exam</strong><span>chat.theproctoring.com</span></div>
          <div class="accordion-row"><strong>Chegg &mdash; Homework Help</strong><span>May conflict with lockdown browser</span></div>
          <div class="accordion-row"><strong>Access status</strong><span>Identity re-verification required before re-entry</span></div>
        </div>`;
}
// Renders one inboxRows entry against the CURRENT module state (activeConvo,
// inboxStatusFilter) — the single function both pageInbox()'s full render
// and any live DOM patch should go through, so a row never looks different
// depending on which code path drew it.
function inboxRowHtml(r){
  const timeLabel = r.opts.live ? '' : (r.timeMode === 'fixed' ? r.fixedTime : relativeTimeLabel(Date.now() - r.activityAt));
  const opts = Object.assign({}, r.opts, {
    convo: r.key,
    selected: activeConvo === r.key,
    filteredOut: inboxRowFilteredOut(r),
  });
  return inboxChatItem(r.role, r.label, timeLabel, r.preview, opts);
}
function inboxRowFilteredOut(r){
  if(inboxStatusFilter === 'open') return !!r.opts.closed;
  if(inboxStatusFilter === 'closed') return !r.opts.closed;
  return false; // all
}
// The one real list of commands — shared verbatim by the composer's inline
// "!" dropdown and the ⌘K command palette modal, so there's exactly one
// place that ever needs updating when a command changes.
function commandListHtml(){
  const item = (icon, name, shortcut, onclick, dataCmd, subtext) => `
    <div class="command-item" ${dataCmd?`data-cmd="${dataCmd}"`:''} onclick="${onclick}">
      <span class="command-item-left">
        <span class="command-item-icon">${I(icon,13)}</span>
        ${subtext
          ? `<span class="command-item-text"><span class="name">${name}</span><span class="subtext">${subtext}</span></span>`
          : `<span class="name">${name}</span>`}
      </span>
      <span class="command-trigger-key">${shortcut}</span>
    </div>`;
  return `
    <div class="command-group-header">Diagnostics &amp; Utilities</div>
    ${item('rotateCcw','Restart lockdown browser','!restart','useCommand(event)','restart')}
    ${item('userCheck','Verify student ID','!verify-id','useCommand(event)','verifyid')}
    ${item('smile','Insert greeting','!greeting','useCommand(event)','greeting')}
    <div class="command-divider"></div>
    <div class="command-group-header">Academic Remedies</div>
    ${item('hourglass','Grant extra time','!extra-time','openModal(event)',null,'Requires approval &middot; writes to record')}
    ${item('calClock','Reschedule exam','!reschedule','rescheduleCommand(event)',null,'Requires approval &middot; writes to record')}
    ${item('flag','Escalate to administrator','!escalate','goToIntegrityReview(event)',null,'Requires approval &middot; writes to record')}
  `;
}
function pageInbox(){
  const welcome = CONVERSATIONS.welcome;
  const listBody = `
        ${inboxChatItem(welcome.role, 'Welcome', welcome.started, 'This is a fully interactive front-end prototype &mdash; tap to read more.', {convo:'welcome', selected: activeConvo==='welcome', pinned:true})}
        ${inboxSortedRows().map(inboxRowHtml).join('')}
  `;
  const activeConv = CONVERSATIONS[activeConvo] || welcome;
  // The Welcome message is a system announcement, not a person — there's no
  // real user context to show, so the panel (and its reopen affordance)
  // aren't just collapsed, they're not applicable at all.
  const isWelcomeActive = activeConv.key === 'welcome';
  const chatArea = `
    <div class="chat-window-wrap">
      <div class="chat-window">
        <div class="chat-header">
          <div class="chat-header-id">
            <strong>${activeConv.name}</strong>
            <div class="chat-header-badges">
              ${roleBadge(activeConv.role)}
              ${activeConv.canvas ? `<span class="icon-btn-square" style="border:.5px solid var(--border-soft);" title="Canvas">${Ilms('canvas',16)}</span>` : ''}
            </div>
          </div>
          <div class="chat-actions">
            <button class="icon-btn-square panel-reopen${(sidePanelCollapsed && !isWelcomeActive)?' show':''}" data-panel-toggle
              aria-label="Show context panel" title="Show context panel"
              aria-expanded="${!sidePanelCollapsed}"
              onclick="toggleSidePanel(event)">${I('panelRightOpen',16)}</button>
            <div class="chat-more-wrap">
              <button class="icon-btn-square" onclick="toggleChatMoreMenu(event)" aria-haspopup="true" aria-expanded="false" title="More">${I('dots',16)}</button>
              <div id="chat-more-menu" class="chat-more-menu">
                <button class="chat-more-item" onclick="chatMoreAction(event,'screenshare')">${I('monitor',15)}Screen share</button>
                <button class="chat-more-item" onclick="chatMoreAction(event,'transfer')">${I('reply',15)}Transfer conversation</button>
                <button class="chat-more-item" onclick="chatMoreAction(event,'assign')">${I('userCheck',15)}Assign to teammate</button>
                <div class="chat-more-divider"></div>
                <button class="chat-more-item" onclick="chatMoreAction(event,'spam')">${I('alertCircle',15)}Mark as spam</button>
              </div>
            </div>
            <button class="btn btn-primary btn-deep btn-clickable" style="padding:8px 12px;gap:4px;" onclick="closeActiveConversation(event)">${I('x',16)} Close</button>
          </div>
        </div>
        <div class="chat-thread">
          ${convoThreadHtml(activeConv)}
        </div>
        <div class="composer-wrap">
          <div class="composer">
            <div id="composer-input" class="composer-input" contenteditable="true"
              data-placeholder="Type a message or ! for commands"
              oninput="onComposerInput(event)" onkeydown="onComposerKeydown(event)"></div>
            <div class="composer-toolbar">
              <div class="composer-icons">
                <button class="toolbar-icon-btn" onclick="toggleEmojiMenu(event)" title="Emoji">${I('smile',20)}</button>
                <button id="mic-btn" class="toolbar-icon-btn" onclick="toggleMic(event)" title="Speech to text">${I('mic',20)}</button>
                <button class="toolbar-icon-btn" onclick="toggleAiMenu(event)" title="AI Assist">${I('sparkles',20)}</button>
              </div>
              <button id="send-btn" class="send-btn" onclick="sendComposerMessage(event)" disabled>${I('arrowUp',20)}</button>
            </div>
          </div>
          <div id="emoji-menu" class="emoji-menu">
            <div class="emoji-grid">${EMOJIS.map(function(em){return '<button onclick="insertEmoji(event,\''+em+'\')">'+em+'</button>';}).join('')}</div>
          </div>
          <div id="ai-menu" class="ai-menu">
            <div class="ai-menu-header">${I('sparkles',13)} AI Assist &middot; Suggested replies</div>
            <button class="ai-suggestion" onclick="useAiSuggestion(event,this)">Glad that worked! Let me know if the browser closes again during the exam.</button>
            <button class="ai-suggestion" onclick="useAiSuggestion(event,this)">I can also verify your student ID now, just to be safe &mdash; want me to do that?</button>
            <button class="ai-suggestion" onclick="useAiSuggestion(event,this)">You're all set. Go ahead and continue with the exam whenever you're ready.</button>
          </div>
        </div>
        <div id="command-menu" class="command-menu">
          <div class="command-trigger"><span class="bang">!</span> Commands &middot; type to filter
            <span class="command-trigger-key" style="margin-left:auto;">&#8984;K</span></div>
          <div class="command-list">${commandListHtml()}</div>
        </div>
        <div id="command-backdrop" class="backdrop" onclick="closeCommandModal()"></div>
        <div id="command-modal" class="modal command-palette">
          <div class="command-palette-search">
            ${I('search',16)}
            <input id="command-modal-search" type="text" placeholder="Type a command or search…"
              oninput="onCommandModalSearchInput(event)" onkeydown="onCommandModalSearchKeydown(event)">
            <span class="command-trigger-key">Esc</span>
          </div>
          <div class="command-list">${commandListHtml()}</div>
          <div class="command-palette-footer">
            <span class="command-trigger-key">&#8593;</span><span class="command-trigger-key">&#8595;</span>
            <span class="command-palette-footer-label">Navigate</span>
            <span class="command-palette-divider">&middot;</span>
            <span class="command-trigger-key">&#8629;</span>
            <span class="command-palette-footer-label">Select</span>
            <span class="command-palette-footer-spacer"></span>
            <span class="command-trigger-key">&#8984;K</span>
            <span class="command-palette-footer-label">Toggle</span>
          </div>
        </div>
      </div>
      <div class="side-panel${sidePanelCollapsed?' collapsed':''}${isWelcomeActive?' hidden':''}" aria-hidden="${sidePanelCollapsed || isWelcomeActive}">
        <div class="side-tabs">
          <div class="side-tabs-left">
            <button class="side-tab active" onclick="selectSideTab(event,'user')">User</button>
            <button class="side-tab" onclick="selectSideTab(event,'history')">History</button>
            <button class="side-tab" onclick="selectSideTab(event,'resources')">Resources</button>
          </div>
          <div class="side-tabs-actions">
            <button class="icon-btn-square">${I('external',14)}</button>
            <button class="icon-btn-square" aria-label="Collapse context panel" title="Collapse context panel"
              onclick="toggleSidePanel(event)">${I('panelRightClose',14)}</button>
          </div>
        </div>
        <div class="field-row-list">
          ${activeConv.fields ? activeConv.fields.map(f=>`<div class="field-row"><span>${f[0]}</span><strong>${f[1]}</strong></div>`).join('') : '<div class="field-row-empty">No details to show for this message.</div>'}
        </div>
        <div id="side-panel-accordions">${convoAccordionsHtml(activeConv)}</div>
      </div>
    </div>
  `;
  return `
  <div class="inbox-shell">
    <div class="convo-list">
      <div class="convo-header">
        <div class="convo-header-left">
          <button class="convo-header-btn" onclick="toggleViews(event)" title="Views">${I('menu',18)}</button>
          <h2>Chats</h2>
        </div>
        <div class="convo-search-wrap" id="convo-search-wrap">
          <div class="convo-search-form">
            <input id="convo-search-input" class="convo-search-input" type="text" placeholder="Search conversations" onkeydown="onConvoSearchKeydown(event)">
          </div>
          <button class="convo-header-btn round" onclick="toggleConvoSearch(event)" title="Search" aria-label="Search" aria-expanded="false">${I('search',16)}</button>
        </div>
      </div>
      <div id="views-popover" class="views-popover">
        <div class="views-popover-header">Inbox</div>
        <div class="views-list">
          <div class="view-item active" data-view="your-inbox" onclick="selectView(event,'your-inbox')">
            ${I('inbox',16)}Your Inbox <span class="view-count">${inboxOpenCount()}</span>
          </div>
          <div class="view-item" data-view="mentions" onclick="selectView(event,'mentions')">
            ${I('user',16)}Mentions <span class="view-count">0</span>
          </div>
          <div class="view-item" data-view="all" onclick="selectView(event,'all')">
            ${I('inbox',16)}All <span class="view-count">${inboxRows.length}</span>
          </div>
          <div class="view-item" data-view="unassigned" onclick="selectView(event,'unassigned')">
            ${I('inbox',16)}Unassigned <span class="view-count">${inboxOpenCount()}</span>
          </div>
          <div class="view-item" data-view="spam" onclick="selectView(event,'spam')">
            ${I('alertCircle',16)}Spam <span class="view-count">0</span>
          </div>
        </div>
      </div>
      <div class="convo-filters">
        <div class="filter-tab-wrap">
          <button class="filter-tab" data-role="filter" onclick="toggleFilterMenu(event)">
            <span class="filter-tab-label">${computeFilterLabel(inboxStatusFilter)}</span>${I('chevronDown',12)}
          </button>
          <div id="filter-menu" class="filter-menu">
            <button class="menu-check-item${inboxStatusFilter==='open'?' active':''}" onclick="selectFilter(event,'open')">${I('inbox',15)}Open<span class="check">${I('check',14)}</span></button>
            <button class="menu-check-item${inboxStatusFilter==='closed'?' active':''}" onclick="selectFilter(event,'closed')">${I('x',15)}Closed<span class="check">${I('check',14)}</span></button>
            <button class="menu-check-item${inboxStatusFilter==='all'?' active':''}" onclick="selectFilter(event,'all')">${I('inbox',15)}Open &amp; Closed<span class="check">${I('check',14)}</span></button>
          </div>
        </div>
        <div class="filter-tab-wrap">
          <button class="filter-tab" data-role="sort" onclick="toggleSortMenu(event)">
            <span class="filter-tab-label">${SORT_LABELS[inboxSortBy]}</span>${I('listFilter',12)}
          </button>
          <div id="sort-menu" class="sort-menu">
            <button class="menu-check-item${inboxSortBy==='last-activity'?' active':''}" onclick="selectSort(event,'last-activity')">${I('clock',15)}Last activity<span class="check">${I('check',14)}</span></button>
            <button class="menu-check-item${inboxSortBy==='date-started'?' active':''}" onclick="selectSort(event,'date-started')">${I('calClock',15)}Date started<span class="check">${I('check',14)}</span></button>
            <button class="menu-check-item${inboxSortBy==='waiting-since'?' active':''}" onclick="selectSort(event,'waiting-since')">${I('hourglass',15)}Waiting since<span class="check">${I('check',14)}</span></button>
          </div>
        </div>
      </div>
      <div class="convo-scroll">${listBody}</div>
    </div>
    ${chatArea}
  </div>`;
}
