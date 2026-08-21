/* ================= APP / ROUTING ================= */
const PAGES = {
  'inbox':                    {sidenav:'inbox',     secondary:null, bare:true,                   content:pageInbox},
  'knowledge-sources':        {sidenav:'knowledge',  secondary:()=>knowledgeNav('knowledge-sources'), content:pageKnowledgeSources},
  'knowledge-content':        {sidenav:'knowledge',  secondary:()=>knowledgeNav('knowledge-content'), content:pageKnowledgeContent},
  'knowledge-articles':       {sidenav:'knowledge',  secondary:()=>knowledgeNav('knowledge-articles'),content:pageKnowledgeArticles},
  'reports-overview':         {sidenav:'reports',    secondary:()=>reportsNav('reports-overview'),content:pageReportsOverview},
  'reports-all':              {sidenav:'reports',    secondary:()=>reportsNav('reports-all'),     content:pageReportsAll},
  'reports-topics':           {sidenav:'reports',    secondary:()=>reportsNav('reports-topics'),  content:pageReportsTopics},
  'reports-conversations-by-role': {sidenav:'reports', secondary:()=>reportsNav('reports-conversations-by-role'), content:pageReportsConversationsByRole},
  'reports-response-time':    {sidenav:'reports',    secondary:()=>reportsNav('reports-response-time'), content:pageReportsResponseTime},
  'reports-csat':             {sidenav:'reports',    secondary:()=>reportsNav('reports-csat'),    content:pageReportsCsat},
  'reports-flagged-sessions': {sidenav:'reports',    secondary:()=>reportsNav('reports-flagged-sessions'),content:pageReportsFlagged},
  'reports-room-scan':        {sidenav:'reports',    secondary:()=>reportsNav('reports-room-scan'),content:pageReportsRoomScan},
  'reports-lockdown-browser': {sidenav:'reports',    secondary:()=>reportsNav('reports-lockdown-browser'), content:pageReportsLockdownBrowser},
  'reports-extension-violations': {sidenav:'reports', secondary:()=>reportsNav('reports-extension-violations'), content:pageReportsExtensionViolations},
  'reports-screen-share':     {sidenav:'reports',    secondary:()=>reportsNav('reports-screen-share'), content:pageReportsScreenShare},
  'reports-exam-completion':  {sidenav:'reports',    secondary:()=>reportsNav('reports-exam-completion'), content:pageReportsExamCompletion},
  'reports-ai-assist':        {sidenav:'reports',    secondary:()=>reportsNav('reports-ai-assist'),content:pageReportsAiAssist},
  'contacts-all':             {sidenav:'contacts',   secondary:()=>contactsNav('contacts-all'),         content:()=>pageContactsPeople('all')},
  'contacts-students':        {sidenav:'contacts',   secondary:()=>contactsNav('contacts-students'),    content:()=>pageContactsPeople('student')},
  'contacts-instructors':     {sidenav:'contacts',   secondary:()=>contactsNav('contacts-instructors'), content:()=>pageContactsPeople('instructor')},
  'contacts-administrators':  {sidenav:'contacts',   secondary:()=>contactsNav('contacts-administrators'), content:()=>pageContactsPeople('admin')},
  'settings-home':            {sidenav:'settings',   secondary:()=>settingsNav('settings-home'),  content:pageSettingsHome},
  'settings-general':         {sidenav:'settings',   secondary:()=>settingsNav('settings-general'),content:pageSettingsGeneral},
  'settings-institutions':    {sidenav:'settings',   secondary:()=>settingsNav('settings-institutions'), content:pageSettingsInstitutions},
  'settings-integrations':    {sidenav:'settings',   secondary:()=>settingsNav('settings-integrations'), content:pageSettingsIntegrations},
  'integrity-review':         {sidenav:null,         secondary:null,                              content:pageIntegrityReview},
};
const DEFAULT_FOR_ICON = {inbox:'inbox', knowledge:'knowledge-sources', reports:'reports-overview', contacts:'contacts-all', settings:'settings-home'};

function renderShell(key){
  const cfg = PAGES[key];
  if(!cfg) return;
  const app = document.getElementById('app');
  // Every page body sits inside one white card, except the inbox, which composes
  // its own pair of cards (conversation list + chat window) and opts out.
  const body = cfg.bare ? cfg.content() : '<div class="content-card">' + cfg.content() + '</div>';
  app.innerHTML = sidenav(cfg.sidenav) + (cfg.secondary ? cfg.secondary() : '')
    + `<div class="content${cfg.bare?' bare':''}">` + body + '</div>';
}
// Mirrors renderShell, swapping real content for a shimmer stand-in — nav
// stays live (instant highlight) while only the content pane "loads".
function renderSkeleton(key){
  const cfg = PAGES[key];
  if(!cfg) return;
  const app = document.getElementById('app');
  const mock = cfg.bare ? skeletonInbox() : skeletonStandard();
  const body = cfg.bare ? mock : '<div class="content-card">' + mock + '</div>';
  app.innerHTML = sidenav(cfg.sidenav) + (cfg.secondary ? cfg.secondary() : '')
    + `<div class="content${cfg.bare?' bare':''}">` + body + '</div>';
}

let appBooted = false;
let skeletonTimer = null;
function showPage(key){
  if(!PAGES[key]) return;
  closeCommandMenu();
  closeModal();
  window.scrollTo(0,0);
  clearTimeout(skeletonTimer);
  // The very first paint shouldn't skeleton — only page-to-page navigation
  // mocks a fetch delay, matching what a real data-backed page would need.
  if(!appBooted){
    appBooted = true;
    renderShell(key);
    return;
  }
  renderSkeleton(key);
  skeletonTimer = setTimeout(function(){ renderShell(key); }, 300);
}

document.addEventListener('click', function(e){
  const iconBtn = e.target.closest('[data-page-icon]');
  if(iconBtn){
    const target = DEFAULT_FOR_ICON[iconBtn.dataset.pageIcon];
    if(target){ showPage(target); }
    return;
  }
  const pageBtn = e.target.closest('[data-page]');
  if(pageBtn){
    e.preventDefault();
    showPage(pageBtn.dataset.page);
    return;
  }
  // click-away closes the views popover
  const popover = document.getElementById('views-popover');
  if(popover && popover.classList.contains('open')){
    const withinPopover = e.target.closest('#views-popover');
    const isToggle = e.target.closest('.convo-header-btn');
    if(!withinPopover && !isToggle) popover.classList.remove('open');
  }
  // click-away closes composer flyouts (command menu / emoji / AI) — the ⌘K
  // palette is exempt since it isn't inside .composer-wrap at all; it has
  // its own dedicated close paths (the backdrop's onclick, Escape, running a
  // command), so this generic composer click-away must not also fire for
  // clicks inside it (e.g. clicking the palette's own search input).
  if(!e.target.closest('.composer-wrap') && !e.target.closest('#command-modal')){
    closeCommandMenu();
    closeEmojiMenu();
    closeAiMenu();
  }
  // click-away closes the chat header "more" menu
  const moreMenu = document.getElementById('chat-more-menu');
  if(moreMenu && moreMenu.classList.contains('open')){
    const withinMore = e.target.closest('#chat-more-menu');
    const isMoreToggle = e.target.closest('.chat-more-wrap > .icon-btn-square');
    if(!withinMore && !isMoreToggle) moreMenu.classList.remove('open');
  }
  // click-away closes the status filter / sort dropdowns
  const filterMenu = document.getElementById('filter-menu');
  if(filterMenu && filterMenu.classList.contains('open')){
    const within = e.target.closest('#filter-menu');
    const isToggle = e.target.closest('[data-role="filter"]');
    if(!within && !isToggle) filterMenu.classList.remove('open');
  }
  const sortMenu = document.getElementById('sort-menu');
  if(sortMenu && sortMenu.classList.contains('open')){
    const within = e.target.closest('#sort-menu');
    const isToggle = e.target.closest('[data-role="sort"]');
    if(!within && !isToggle) sortMenu.classList.remove('open');
  }
  // click-away closes any open report filter dropdown (Reports pages)
  document.querySelectorAll('.report-filter-menu.open').forEach(function(menu){
    const within = e.target.closest('#'+menu.id);
    const isToggle = e.target.closest('[data-filter-toggle="'+menu.id+'"]');
    if(!within && !isToggle) menu.classList.remove('open');
  });
  // click-away closes the search field, but only if it's still empty —
  // don't discard a query the user is mid-typing.
  const searchWrap = document.getElementById('convo-search-wrap');
  if(searchWrap && searchWrap.classList.contains('open')){
    const withinSearch = e.target.closest('#convo-search-wrap');
    const input = document.getElementById('convo-search-input');
    if(!withinSearch && input && input.value === '') closeConvoSearch();
  }
});

// Cmd/Ctrl+K opens the same commands as the composer's inline "!" trigger,
// just presented full-screen instead of anchored to the composer (see
// openCommandModal). It only acts when the palette actually exists in the
// DOM (the inbox's chat window), so it never hijacks the browser's own
// shortcut on a page with no composer.
document.addEventListener('keydown', function(e){
  if(e.key.toLowerCase() !== 'k' || !(e.metaKey || e.ctrlKey)) return;
  const modal = document.getElementById('command-modal');
  if(!modal) return;
  e.preventDefault();
  if(modal.classList.contains('open')) closeCommandModal();
  else openCommandModal();
});

// These five popovers all live in the header/list area (as opposed to the
// composer flyouts, which are spatially separate) — each one's toggle closes
// the other four, since stopPropagation() below means the document-level
// click-away listener never runs for these clicks, only for genuine
// click-aways.
function closeViews(){ const p = document.getElementById('views-popover'); if(p) p.classList.remove('open'); }
function closeChatMoreMenu(){ const m = document.getElementById('chat-more-menu'); if(m) m.classList.remove('open'); }
function closeConvoSearch(){
  const wrap = document.getElementById('convo-search-wrap');
  if(!wrap || !wrap.classList.contains('open')) return;
  wrap.classList.remove('open');
  const btn = wrap.querySelector('.convo-header-btn.round');
  if(btn){ btn.setAttribute('aria-expanded','false'); btn.title = 'Search'; btn.innerHTML = I('search',16); }
  const input = document.getElementById('convo-search-input');
  if(input) input.value = '';
}
function toggleViews(e){
  e.stopPropagation();
  closeChatMoreMenu(); closeFilterMenu(); closeSortMenu(); closeConvoSearch();
  const popover = document.getElementById('views-popover');
  if(popover) popover.classList.toggle('open');
}
// There's no multi-agent assignment or spam/mention system in this
// prototype, so Your Inbox / All / Unassigned are honestly the same
// underlying list (nothing is ever assigned to anyone else, which is
// exactly why their counts already match) — switching between them doesn't
// pretend to filter to a different set. Mentions/Spam say so plainly instead
// of the generic "isn't wired up" phrasing, since those aren't unwired, they
// simply don't exist as a feature yet.
const VIEW_HINTS = {
  'your-inbox': 'Showing Your Inbox',
  all: 'Showing all conversations',
  unassigned: 'Showing unassigned conversations — nothing is assigned to a specific teammate in this prototype',
  mentions: 'This is a prototype — @mentions aren’t implemented',
  spam: 'This is a prototype — spam marking isn’t implemented',
};
function selectView(e, key){
  e.stopPropagation();
  document.querySelectorAll('.view-item').forEach(el=>el.classList.remove('active'));
  e.currentTarget.classList.add('active');
  document.getElementById('views-popover').classList.remove('open');
  showHint(VIEW_HINTS[key] || 'Showing Your Inbox');
}
function toggleChatMoreMenu(e){
  e.stopPropagation();
  closeViews(); closeFilterMenu(); closeSortMenu(); closeConvoSearch();
  const menu = document.getElementById('chat-more-menu');
  if(!menu) return;
  const open = menu.classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', String(open));
}
function chatMoreAction(e, key){
  e.stopPropagation();
  document.getElementById('chat-more-menu').classList.remove('open');
  const labels = {screenshare:'Screen share',transfer:'Transfer conversation',assign:'Assign to teammate',spam:'Mark as spam'};
  showHint('This is a prototype — ' + (labels[key]||'this action') + ' isn’t wired up yet');
}
function toggleFilterMenu(e){ e.stopPropagation(); closeSortMenu(); closeViews(); closeChatMoreMenu(); closeConvoSearch(); document.getElementById('filter-menu').classList.toggle('open'); }
function toggleSortMenu(e){ e.stopPropagation(); closeFilterMenu(); closeViews(); closeChatMoreMenu(); closeConvoSearch(); document.getElementById('sort-menu').classList.toggle('open'); }
function toggleConvoSearch(e){
  e.stopPropagation();
  closeViews(); closeChatMoreMenu(); closeFilterMenu(); closeSortMenu();
  const wrap = document.getElementById('convo-search-wrap');
  const btn = e.currentTarget;
  const open = wrap.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
  btn.title = open ? 'Close search' : 'Search';
  btn.innerHTML = open ? I('x',16) : I('search',16);
  if(open){
    setTimeout(function(){ const input = document.getElementById('convo-search-input'); if(input) input.focus(); }, 120);
  } else {
    const input = document.getElementById('convo-search-input');
    if(input) input.value = '';
  }
}
function onConvoSearchKeydown(e){
  e.stopPropagation();
  if(e.key === 'Escape'){
    closeConvoSearch();
    e.currentTarget.blur();
  } else if(e.key === 'Enter' && e.currentTarget.value.trim()){
    showHint('This is a prototype — search isn’t wired up yet');
  }
}
function closeFilterMenu(){ const m=document.getElementById('filter-menu'); if(m) m.classList.remove('open'); }
function closeSortMenu(){ const m=document.getElementById('sort-menu'); if(m) m.classList.remove('open'); }
// Open/Closed counts are computed fresh from inboxRows every time, rather
// than mutated as strings — there's exactly one source of truth for "how
// many are open" (inboxRows itself), so the label can never drift from what
// the list actually shows.
function computeFilterLabel(key){
  const openCount = inboxOpenCount();
  const closedCount = inboxRows.length - openCount;
  if(key === 'open') return openCount + ' Open';
  if(key === 'closed') return closedCount + ' Closed';
  return inboxRows.length + ' Open & Closed';
}
function inboxOpenCount(){
  return inboxRows.filter(function(r){ return !r.opts.closed; }).length;
}
// Real filtering: a row's visibility is just "does its closed state match
// the selected tab" — recomputed on every row, not merely relabeled.
function applyInboxFilterVisibility(){
  inboxRows.forEach(function(r){
    const row = document.querySelector('.chat-item[data-convo="'+r.key+'"]');
    if(row) row.classList.toggle('filtered-out', inboxRowFilteredOut(r));
  });
}
function selectFilter(e, key){
  e.stopPropagation();
  inboxStatusFilter = key;
  document.querySelector('[data-role="filter"] .filter-tab-label').textContent = computeFilterLabel(key);
  document.querySelectorAll('#filter-menu .menu-check-item').forEach(function(el,i){ el.classList.toggle('active', ['open','closed','all'][i]===key); });
  closeFilterMenu();
  applyInboxFilterVisibility();
}
// Real sorting: each mode reads a different real timestamp off inboxRows —
// see inboxSortKeyFor for what each one actually measures.
function inboxSortKeyFor(r, mode){
  if(mode === 'date-started') return r.arrivedAt;
  if(mode === 'waiting-since') return r.opts.replied ? r.activityAt : r.arrivedAt;
  return r.activityAt; // last-activity (default)
}
function inboxSortedRows(){
  return inboxRows.slice().sort(function(a,b){ return inboxSortKeyFor(b, inboxSortBy) - inboxSortKeyFor(a, inboxSortBy); });
}
function applyInboxSort(){
  const scroll = document.querySelector('.convo-scroll');
  if(!scroll) return;
  const pinned = scroll.querySelector('.chat-item.pinned');
  inboxSortedRows().forEach(function(r){
    const row = scroll.querySelector('.chat-item[data-convo="'+r.key+'"]');
    if(row) scroll.appendChild(row); // repeated append walks every row into sorted order
  });
  if(pinned) scroll.insertBefore(pinned, scroll.firstChild);
}
function selectSort(e, key){
  e.stopPropagation();
  inboxSortBy = key;
  document.querySelector('[data-role="sort"] .filter-tab-label').textContent = SORT_LABELS[key];
  document.querySelectorAll('#sort-menu .menu-check-item').forEach(function(el,i){ el.classList.toggle('active', ['last-activity','date-started','waiting-since'][i]===key); });
  closeSortMenu();
  applyInboxSort();
}
// Selecting a row marks it read and moves the selected state. Every row —
// flagship or filler — has a real CONVERSATIONS entry now, so the chat pane
// always ends up showing exactly the conversation that's visually selected.
function selectChatItem(e, row){
  if(row.classList.contains('selected')) return;
  cancelInboxDemo(); // a real click always takes control back from the auto-demo
  const key = row.dataset.convo;
  document.querySelectorAll('.chat-item.selected').forEach(function(el){
    el.classList.remove('selected');
    el.setAttribute('aria-current','false');
  });
  row.classList.remove('unread');
  row.classList.add('selected');
  row.setAttribute('aria-current','true');
  const state = inboxRows.find(function(r){ return r.key === key; });
  if(state) state.opts.unread = false;
  if(key && CONVERSATIONS[key]){
    renderConversation(key);
  } else {
    showHint('This is a prototype — this conversation has no data yet');
  }
}
// Swaps the chat window's header/thread/side-panel to a different
// CONVERSATIONS entry in place — the composer, command menu, and emoji/AI
// menus are left untouched so nothing mid-interaction gets reset.
function renderConversation(key){
  const conv = CONVERSATIONS[key];
  if(!conv) return;
  activeConvo = key;
  const nameEl = document.querySelector('.chat-header-id strong');
  if(nameEl) nameEl.textContent = conv.name;
  const badgesEl = document.querySelector('.chat-header-badges');
  if(badgesEl){
    badgesEl.innerHTML = roleBadge(conv.role) + (conv.canvas
      ? `<span class="icon-btn-square" style="border:.5px solid var(--border-soft);" title="Canvas">${Ilms('canvas',16)}</span>`
      : '');
  }
  const threadEl = document.querySelector('.chat-thread');
  if(threadEl) threadEl.innerHTML = convoThreadHtml(conv);
  const fieldsEl = document.querySelector('.field-row-list');
  if(fieldsEl) fieldsEl.innerHTML = conv.fields
    ? conv.fields.map(f=>`<div class="field-row"><span>${f[0]}</span><strong>${f[1]}</strong></div>`).join('')
    : '<div class="field-row-empty">No details to show for this message.</div>';
  const accEl = document.getElementById('side-panel-accordions');
  if(accEl) accEl.innerHTML = convoAccordionsHtml(conv);
  // Welcome has no side panel at all — not just collapsed, not applicable
  // (see pageInbox's isWelcomeActive). Keep this in sync with that same
  // condition so switching conversations without a full re-render still
  // shows/hides it correctly.
  const isWelcomeActive = key === 'welcome';
  const sidePanel = document.querySelector('.side-panel');
  if(sidePanel){
    sidePanel.classList.toggle('hidden', isWelcomeActive);
    sidePanel.setAttribute('aria-hidden', String(sidePanelCollapsed || isWelcomeActive));
  }
  const reopenBtn = document.querySelector('[data-panel-toggle]');
  if(reopenBtn) reopenBtn.classList.toggle('show', sidePanelCollapsed && !isWelcomeActive);
  const composer = document.getElementById('composer-input');
  if(composer){ composer.innerHTML = ''; updateSendBtn(); }
}
// Recomputes the filter tab label and the Views popover counts from
// inboxRows — call after anything that changes row count or open/closed mix
// (an arrival, a close). Replying doesn't change either, so it doesn't need
// this.
function syncInboxCounters(){
  const filterLabel = document.querySelector('[data-role="filter"] .filter-tab-label');
  if(filterLabel) filterLabel.textContent = computeFilterLabel(inboxStatusFilter);
  const openCount = inboxOpenCount();
  ['your-inbox','unassigned'].forEach(function(view){
    const el = document.querySelector('.view-item[data-view="'+view+'"] .view-count');
    if(el) el.textContent = openCount;
  });
  const allEl = document.querySelector('.view-item[data-view="all"] .view-count');
  if(allEl) allEl.textContent = inboxRows.length;
}
// Clicking Close asks for confirmation first (skipCloseConfirm, icons.js) —
// unless the agent already opted out via the "don't ask again" follow-up,
// in which case it closes immediately. That opt-out is the ONLY thing that
// ever skips the confirmation; declining it (Cancel, or dismissing the
// follow-up without choosing "Don't ask again") means it keeps showing up
// every time, by design.
function closeActiveConversation(e){
  if(e) e.stopPropagation();
  if(activeConvo === 'welcome'){
    showHint('This is a prototype — the Welcome message can’t be closed');
    return;
  }
  cancelInboxDemo(); // clicking Close is a real action, even before it's confirmed
  if(skipCloseConfirm){
    performCloseConversation();
    return;
  }
  document.getElementById('confirm-backdrop').classList.add('open');
  document.getElementById('close-confirm-modal').classList.add('open');
}
function cancelCloseConversation(){
  document.getElementById('confirm-backdrop').classList.remove('open');
  document.getElementById('close-confirm-modal').classList.remove('open');
}
function confirmCloseConversation(){
  document.getElementById('close-confirm-modal').classList.remove('open');
  performCloseConversation();
  // The backdrop stays open — straight into the "don't ask again" follow-up,
  // same overlay, so it doesn't flicker closed and reopen between the two.
  document.getElementById('dont-ask-modal').classList.add('open');
}
function closeDontAskModal(){
  document.getElementById('confirm-backdrop').classList.remove('open');
  document.getElementById('dont-ask-modal').classList.remove('open');
}
function dontAskAgain(){
  skipCloseConfirm = true;
  closeDontAskModal();
  showToast('Got it — you won’t be asked again', {type:'success'});
}
document.getElementById('confirm-backdrop').addEventListener('click', function(){
  cancelCloseConversation();
  closeDontAskModal();
});
// The actual close: marks the row genuinely leaving the Open view (and
// genuinely reappearing under Closed/Open & Closed — this isn't a one-way
// disappearance), shifts the counts for real, and falls back to the pinned
// Welcome message.
function performCloseConversation(){
  const key = activeConvo;
  const state = inboxRows.find(function(r){ return r.key === key; });
  const row = document.querySelector('.chat-item[data-convo="'+key+'"]');
  if(state) state.opts.closed = true;
  if(row){
    row.classList.remove('unread','selected');
    row.classList.add('closed');
    row.setAttribute('aria-current','false');
    const rightEl = row.querySelector('.chat-item-time, .live-badge');
    if(rightEl) rightEl.outerHTML = '<span class="closed-badge">Closed</span>';
  }
  applyInboxFilterVisibility();
  syncInboxCounters();
  showToast('Conversation closed', {type:'success'});
  const welcomeRow = document.querySelector('.chat-item[data-convo="welcome"]');
  if(welcomeRow){
    welcomeRow.classList.add('selected');
    welcomeRow.setAttribute('aria-current','true');
  }
  renderConversation('welcome');
}

/* ---------------- inbox intro trickle ---------------- */
// The inbox starts with only the pinned Welcome message. Every other
// conversation trickles in one at a time, at a randomized interval, so the
// arrival rate reads as live traffic rather than a scripted batch. Rows land
// just below the pinned Welcome row (which never moves). Arrivals never
// select themselves — the agent stays on whatever they're reading (Welcome,
// by default) until they choose to click into something. Any real click
// cancels every pending timer immediately.
function startInboxTrickle(){
  const queue = INBOX_ARRIVALS.concat(INBOX_TAIL_ARRIVALS);
  let i = 0;
  function next(){
    if(i >= queue.length) return;
    const item = queue[i++];
    if(document.querySelector('.inbox-shell')) demoAddChatter(item);
    const delay = 1400 + Math.random()*2600;
    inboxDemoTimers.push(setTimeout(next, delay));
  }
  inboxDemoTimers.push(setTimeout(next, 1800));
}
function cancelInboxDemo(){
  inboxDemoTimers.forEach(clearTimeout);
  inboxDemoTimers = [];
}
// Pushes a real inboxRows entry (see icons.js) and reflects it in the live
// DOM — every arrival lands unread and never pre-replied, since a message
// that just arrived can't already have a staff reply attached to it.
function demoAddChatter(item){
  const scroll = document.querySelector('.convo-scroll');
  if(!scroll) return;
  const pinned = scroll.querySelector('.chat-item.pinned');
  const now = Date.now();
  const state = {
    key: item.key, role: item.role, label: item.label, preview: item.preview,
    timeMode: item.time === 'now' ? 'ticking' : (item.time ? 'fixed' : 'badge'),
    fixedTime: item.time && item.time !== 'now' ? item.time : null,
    arrivedAt: now, activityAt: now,
    opts: Object.assign({}, item.opts, {unread:true, replied:false, closed:false}),
  };
  inboxRows.unshift(state);
  const html = inboxRowHtml(state);
  if(pinned) pinned.insertAdjacentHTML('afterend', html);
  else scroll.insertAdjacentHTML('afterbegin', html);
  syncInboxCounters();
}
// Recomputes a row's "_m ago" text from its real activity timestamp — runs
// on an interval so a row that's been sitting for a while keeps climbing
// instead of freezing at whatever it said when it landed or last changed.
function relativeTimeLabel(ms){
  const mins = Math.floor(ms / 60000);
  return mins < 1 ? 'Just now' : mins + 'm ago';
}
function updateArrivalTimestamps(){
  inboxRows.forEach(function(r){
    if(r.timeMode !== 'ticking') return; // fixed/badge rows never show a live-computed label
    const timeEl = document.querySelector('.chat-item[data-convo="'+r.key+'"] .chat-item-time');
    if(timeEl) timeEl.textContent = relativeTimeLabel(Date.now() - r.activityAt);
  });
}
setInterval(updateArrivalTimestamps, 10000);
function onChatItemKeydown(e){
  if(e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    e.currentTarget.click();
  }
}
function toggleAccordion(e, id){
  e.stopPropagation();
  const header = e.currentTarget;
  const body = document.getElementById(id);
  header.classList.toggle('open');
  if(body) body.classList.toggle('open');
}
function toggleSidePanel(e){
  if(e) e.stopPropagation();
  sidePanelCollapsed = !sidePanelCollapsed;
  const panel = document.querySelector('.side-panel');
  if(panel){
    panel.classList.toggle('collapsed', sidePanelCollapsed);
    panel.setAttribute('aria-hidden', String(sidePanelCollapsed));
  }
  document.querySelectorAll('[data-panel-toggle]').forEach(btn=>{
    btn.classList.toggle('show', sidePanelCollapsed);
    btn.setAttribute('aria-expanded', String(!sidePanelCollapsed));
  });
  // Whichever control was clicked is the one that just disappeared, so hand
  // focus to its counterpart rather than dropping it on <body>.
  const next = sidePanelCollapsed
    ? document.querySelector('[data-panel-toggle]')
    : document.querySelector('.side-tabs-actions [aria-label="Collapse context panel"]');
  if(next) next.focus();
}
function selectSideTab(e, key){
  e.stopPropagation();
  document.querySelectorAll('.side-tab').forEach(el=>el.classList.remove('active'));
  e.currentTarget.classList.add('active');
  if(key !== 'user') showHint('This is a prototype — only the User tab has live data');
}
function selectTopicTab(e, key){
  e.stopPropagation();
  document.querySelectorAll('.segment-pill[data-topic]').forEach(el=>el.classList.remove('active'));
  e.currentTarget.classList.add('active');
  document.querySelectorAll('.topic-examples').forEach(el=>el.classList.remove('active'));
  const panel = document.getElementById('topic-examples-'+key);
  if(panel) panel.classList.add('active');
}

function toggleCommandMenu(e){
  if(e) e.stopPropagation();
  const menu = document.getElementById('command-menu');
  if(menu) menu.classList.toggle('open');
}
// "Close the command menu" means whichever command surface is currently
// open — the composer's inline dropdown or the ⌘K palette modal — so every
// existing call site that already calls this (Escape, a command being run,
// click-away, navigating pages) correctly dismisses either one without
// needing to know which is active.
function closeCommandMenu(){
  const menu = document.getElementById('command-menu');
  if(menu) menu.classList.remove('open');
  closeCommandModal();
}
// The ⌘K palette: same command list as the inline dropdown, presented as a
// centered modal over a full-screen backdrop instead of a small anchored
// panel — see css/inbox.css's .command-palette rules.
let commandModalIndex = 0;
function openCommandModal(){
  closeCommandMenuInline();
  closeEmojiMenu();
  closeAiMenu();
  const backdrop = document.getElementById('command-backdrop');
  const modal = document.getElementById('command-modal');
  if(!backdrop || !modal) return;
  backdrop.classList.add('open');
  modal.classList.add('open');
  const input = document.getElementById('command-modal-search');
  if(input){
    input.value = '';
    filterCommandModal('');
    highlightCommandModalItem(0);
    setTimeout(function(){ input.focus(); }, 30);
  }
}
function closeCommandModal(){
  const backdrop = document.getElementById('command-backdrop');
  const modal = document.getElementById('command-modal');
  if(backdrop) backdrop.classList.remove('open');
  if(modal) modal.classList.remove('open');
}
// Only the inline "!" dropdown, not the palette — used by openCommandModal
// so opening the palette doesn't recursively close itself via closeCommandMenu().
function closeCommandMenuInline(){
  const menu = document.getElementById('command-menu');
  if(menu) menu.classList.remove('open');
}
function commandModalVisibleItems(){
  const modal = document.getElementById('command-modal');
  return modal ? [...modal.querySelectorAll('.command-item')].filter(function(i){ return i.style.display !== 'none'; }) : [];
}
function highlightCommandModalItem(index){
  const items = commandModalVisibleItems();
  items.forEach(function(i){ i.classList.remove('active'); });
  if(!items.length) return;
  commandModalIndex = Math.max(0, Math.min(index, items.length - 1));
  const el = items[commandModalIndex];
  el.classList.add('active');
  el.scrollIntoView({block:'nearest'});
}
function filterCommandModal(query){
  const modal = document.getElementById('command-modal');
  if(!modal) return;
  modal.querySelectorAll('.command-item').forEach(function(item){
    const match = !query || item.textContent.toLowerCase().includes(query);
    item.style.display = match ? '' : 'none';
  });
}
function onCommandModalSearchInput(e){
  filterCommandModal(e.currentTarget.value.trim().toLowerCase());
  highlightCommandModalItem(0);
}
function onCommandModalSearchKeydown(e){
  if(e.key === 'Escape'){
    e.preventDefault();
    closeCommandModal();
  } else if(e.key === 'ArrowDown'){
    e.preventDefault();
    highlightCommandModalItem(commandModalIndex + 1);
  } else if(e.key === 'ArrowUp'){
    e.preventDefault();
    highlightCommandModalItem(commandModalIndex - 1);
  } else if(e.key === 'Enter'){
    e.preventDefault();
    const items = commandModalVisibleItems();
    const target = items[commandModalIndex] || items[0];
    if(target) target.click();
  }
}
function closeEmojiMenu(){
  const menu = document.getElementById('emoji-menu');
  if(menu) menu.classList.remove('open');
}
function closeAiMenu(){
  const menu = document.getElementById('ai-menu');
  if(menu) menu.classList.remove('open');
}

/* ---------------- composer ---------------- */
function placeCaretAtEnd(el){
  el.focus();
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
function updateSendBtn(){
  const el = document.getElementById('composer-input');
  const btn = document.getElementById('send-btn');
  if(!el || !btn) return;
  btn.disabled = el.textContent.trim().length === 0;
}
function filterCommandMenu(query){
  document.querySelectorAll('#command-menu .command-item').forEach(item=>{
    const match = !query || item.textContent.toLowerCase().includes(query);
    item.style.display = match ? '' : 'none';
  });
}
function onComposerInput(e){
  const el = e.currentTarget;
  updateSendBtn();
  const text = el.textContent;
  if(text.trim().startsWith('!')){
    closeEmojiMenu();
    closeAiMenu();
    document.getElementById('command-menu').classList.add('open');
    filterCommandMenu(text.trim().slice(1).toLowerCase());
  } else {
    closeCommandMenu();
  }
}
function onComposerKeydown(e){
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    sendComposerMessage(e);
  } else if(e.key === 'Escape'){
    closeCommandMenu();
  }
}
function formatNowTime(){
  const d = new Date();
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2,'0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12; if(h === 0) h = 12;
  return h + ':' + m + ' ' + ampm;
}
function appendMineMessage(text){
  const thread = document.querySelector('.chat-thread');
  if(!thread) return;
  const row = document.createElement('div');
  row.className = 'msg-row mine';
  const col = document.createElement('div');
  col.className = 'msg-col mine';
  const bubble = document.createElement('div');
  bubble.className = 'bubble mine';
  bubble.textContent = text;
  const time = document.createElement('span');
  time.className = 'msg-time';
  time.textContent = formatNowTime();
  col.appendChild(bubble);
  col.appendChild(time);
  row.appendChild(col);
  thread.appendChild(row);
  thread.scrollTop = thread.scrollHeight;
}
function sendComposerMessage(e){
  if(e) e.preventDefault();
  const el = document.getElementById('composer-input');
  if(!el) return;
  const text = el.textContent.trim();
  if(!text) return;
  appendMineMessage(text);
  if(activeConvo !== 'welcome') markRowReplied(activeConvo, text);
  el.textContent = '';
  updateSendBtn();
  closeCommandMenu();
  el.focus();
}
// Sending a reply is the only thing that ever produces the "replied" state:
// the row drops out of unread, its avatar swaps to the reply-arrow icon (see
// roleAvatar), its preview becomes the message we actually just sent, and it
// jumps to the top of the list as the most recently active conversation.
function markRowReplied(key, text){
  const state = inboxRows.find(function(r){ return r.key === key; });
  const row = document.querySelector('.chat-item[data-convo="'+key+'"]');
  if(!state || !row) return;
  state.opts.unread = false;
  state.opts.replied = true;
  state.activityAt = Date.now();
  state.preview = 'You: ' + text;
  row.classList.remove('unread');
  row.classList.add('replied');
  const avatarEl = row.querySelector('.role-avatar');
  if(avatarEl) avatarEl.outerHTML = roleAvatar(state.role, true);
  const previewEl = row.querySelector('.chat-item-preview p');
  if(previewEl) previewEl.textContent = state.preview; // textContent: this is raw typed user input, never innerHTML
  const timeEl = row.querySelector('.chat-item-time');
  if(timeEl) timeEl.textContent = relativeTimeLabel(0);
  if(inboxSortBy === 'last-activity'){
    const scroll = document.querySelector('.convo-scroll');
    const pinned = scroll && scroll.querySelector('.chat-item.pinned');
    if(scroll && pinned) pinned.insertAdjacentElement('afterend', row);
  } else {
    applyInboxSort();
  }
}
function toggleEmojiMenu(e){
  e.stopPropagation();
  closeCommandMenu();
  closeAiMenu();
  document.getElementById('emoji-menu').classList.toggle('open');
}
function insertEmoji(e, emoji){
  e.stopPropagation();
  const el = document.getElementById('composer-input');
  el.textContent += emoji;
  placeCaretAtEnd(el);
  updateSendBtn();
  closeEmojiMenu();
}
function toggleAiMenu(e){
  e.stopPropagation();
  closeCommandMenu();
  closeEmojiMenu();
  document.getElementById('ai-menu').classList.toggle('open');
}
function useAiSuggestion(e, btn){
  e.stopPropagation();
  const el = document.getElementById('composer-input');
  el.textContent = btn.textContent;
  placeCaretAtEnd(el);
  updateSendBtn();
  closeAiMenu();
}
function useCommand(e){
  e.stopPropagation();
  const key = e.currentTarget.dataset.cmd;
  const text = COMMAND_TEXTS[key];
  if(!text) return;
  const el = document.getElementById('composer-input');
  el.textContent = text;
  placeCaretAtEnd(el);
  updateSendBtn();
  closeCommandMenu();
}
/* ---------------- dictation (Web Speech API, with simulated fallback) ---------------- */
let recognition = null;
let micBaseText = '';
let micFallbackTimer = null;
function getSpeechRecognitionCtor(){
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}
function startSimulatedDictation(btn, el){
  micBaseText = el.textContent.trim() ? el.textContent.trim() + ' ' : '';
  btn.classList.add('mic-recording');
  el.setAttribute('data-placeholder','Listening…');
  micFallbackTimer = setTimeout(function(){
    btn.classList.remove('mic-recording');
    el.setAttribute('data-placeholder','Type a message or ! for commands');
    const phrase = "Sure — I’ll walk you through the restart steps now.";
    el.textContent = micBaseText + phrase;
    placeCaretAtEnd(el);
    updateSendBtn();
  }, 1400);
}
function toggleMic(e){
  e.stopPropagation();
  closeCommandMenu();
  closeEmojiMenu();
  closeAiMenu();
  const btn = document.getElementById('mic-btn');
  const el = document.getElementById('composer-input');
  if(btn.classList.contains('mic-recording')){
    clearTimeout(micFallbackTimer);
    if(recognition){ recognition.stop(); recognition = null; }
    btn.classList.remove('mic-recording');
    el.setAttribute('data-placeholder','Type a message or ! for commands');
    return;
  }
  const SpeechRecognitionCtor = getSpeechRecognitionCtor();
  if(!SpeechRecognitionCtor){
    // no browser support at all — keep the demo alive with a simulated transcript
    startSimulatedDictation(btn, el);
    return;
  }
  micBaseText = el.textContent.trim() ? el.textContent.trim() + ' ' : '';
  let finalTranscript = '';
  let started = false;
  let settled = false; // true once this session has been resolved exactly once (real or fallback)
  recognition = new SpeechRecognitionCtor();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.onstart = function(){
    started = true;
    btn.classList.add('mic-recording');
    el.setAttribute('data-placeholder','Listening…');
  };
  recognition.onresult = function(event){
    let interimTranscript = '';
    for(let i = event.resultIndex; i < event.results.length; i++){
      const transcript = event.results[i][0].transcript;
      if(event.results[i].isFinal){
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }
    el.textContent = micBaseText + finalTranscript + interimTranscript;
    placeCaretAtEnd(el);
    updateSendBtn();
  };
  recognition.onerror = function(event){
    if(settled) return; // watchdog (or a prior error) already resolved this session
    settled = true;
    recognition = null;
    if(event.error === 'no-speech'){
      showToast('No speech detected', {type:'error', description:'Try again, or type your message instead.'});
      btn.classList.remove('mic-recording');
      el.setAttribute('data-placeholder','Type a message or ! for commands');
    } else {
      // permission denied, or blocked by this page's embed context — fall back to a simulated transcript
      startSimulatedDictation(btn, el);
    }
  };
  recognition.onend = function(){
    if(settled) return;
    settled = true;
    btn.classList.remove('mic-recording');
    el.setAttribute('data-placeholder','Type a message or ! for commands');
    recognition = null;
  };
  try {
    recognition.start();
  } catch(err){
    settled = true;
    recognition = null;
    startSimulatedDictation(btn, el);
    return;
  }
  // watchdog: some embed contexts silently block the mic (no onstart, no onerror ever fires) —
  // fall back to a simulated transcript rather than leaving the button looking unresponsive
  setTimeout(function(){
    if(started || settled) return;
    settled = true;
    const stale = recognition;
    recognition = null;
    try { stale.abort(); } catch(err){}
    startSimulatedDictation(btn, el);
  }, 700);
}

// Grant extra time only makes sense for a student conversation we actually
// have exam data for — populate the modal from whichever conversation is
// active rather than always showing Jordan Lee, and refuse to open it at all
// when there's no real student/exam data to show (an honest hint instead of
// a modal with fabricated or mismatched facts).
function openModal(e){
  if(e) e.stopPropagation();
  closeCommandMenu();
  const conv = CONVERSATIONS[activeConvo];
  const examField = conv && conv.fields && conv.fields.find(function(f){ return f[0] === 'Exam'; });
  const nameField = conv && conv.fields && conv.fields.find(function(f){ return f[0].indexOf('Name') !== -1; });
  const instField = conv && conv.fields && conv.fields.find(function(f){ return f[0] === 'Institution'; });
  if(!conv || conv.role !== 'student' || !examField || !nameField){
    showHint('This is a prototype — extra time isn’t available without student and exam data for this conversation');
    return;
  }
  const institution = instField ? instField[1] : 'the institution';
  document.getElementById('modal-student-name').textContent = nameField[1];
  document.getElementById('modal-exam').innerHTML = examField[1];
  document.getElementById('modal-writeback').innerHTML = 'This will be written to ' + nameField[1]
    + '&rsquo;s incident record and to the ' + institution + ' gradebook, and will be visible to their instructor.';
  document.getElementById('modal-approval-text').innerHTML = institution
    + ' requires administrator approval for extra-time grants. This will be sent, not applied directly.';
  document.getElementById('backdrop').classList.add('open');
  document.getElementById('remedy-modal').classList.add('open');
}
function closeModal(){
  const backdrop = document.getElementById('backdrop');
  const modal = document.getElementById('remedy-modal');
  if(backdrop) backdrop.classList.remove('open');
  if(modal) modal.classList.remove('open');
}
document.getElementById('backdrop').addEventListener('click', closeModal);
// No reschedule-request UI exists yet — unlike Grant extra time, this is
// honestly unbuilt rather than conditionally available, so it always shows
// the same "not wired up" hint instead of silently doing nothing.
function rescheduleCommand(e){
  if(e) e.stopPropagation();
  closeCommandMenu();
  showHint('This is a prototype — Reschedule exam isn’t wired up yet');
}

function goToIntegrityReview(e){
  if(e) e.stopPropagation();
  closeCommandMenu();
  showPage('integrity-review');
}

let hintTimer = null;
// opts.type: 'default' (no icon, neutral — informational hints, the
// "isn't wired up yet" convention) | 'success' | 'error'. opts.description
// is optional second-line detail; omit it for a terse one-liner.
function showToast(message, opts){
  opts = opts || {};
  const toast = document.getElementById('hint-toast');
  const iconEl = document.getElementById('hint-toast-icon');
  const msgEl = document.getElementById('hint-toast-message');
  const descEl = document.getElementById('hint-toast-description');
  toast.classList.remove('success','error');
  if(opts.type === 'success'){ toast.classList.add('success'); iconEl.innerHTML = I('check',16); }
  else if(opts.type === 'error'){ toast.classList.add('error'); iconEl.innerHTML = I('alertCircle',16); }
  else { iconEl.innerHTML = ''; }
  msgEl.textContent = message;
  descEl.textContent = opts.description || '';
  toast.classList.add('show');
  clearTimeout(hintTimer);
  hintTimer = setTimeout(()=>toast.classList.remove('show'), opts.description ? 3200 : 2200);
}
// Thin wrapper — every existing "This is a prototype — … isn't wired up
// yet" call site keeps working unchanged, as a neutral/default toast.
function showHint(msg){ showToast(msg, {type:'default'}); }

/* ---------------- Settings > General ---------------- */
// Real local state (see settingsFields/settingsToggles in icons.js) — edits
// and toggles genuinely stick for the session, they just never leave the browser.
function updateSettingsField(e, key){ settingsFields[key] = e.currentTarget.value; }
function toggleSetting(e, key){
  settingsToggles[key] = !settingsToggles[key];
  e.currentTarget.classList.toggle('on', settingsToggles[key]);
  e.currentTarget.classList.toggle('off', !settingsToggles[key]);
}

/* ---------------- report filter/search controls ---------------- */
// Generic handlers for searchField()/reportFilterDropdown() (js/chrome.js).
// Report pages are mostly stat/chart summaries with nothing underneath to
// actually filter, so the default path here just confirms the interaction
// — same idiom as the inbox's own selectFilter/selectSort. All Reports and
// Conversation Topics pass their own handlers instead (below) since they
// have real underlying data.
function onReportSearchKeydown(e){
  if(e.key === 'Escape'){
    e.currentTarget.value = '';
    e.currentTarget.blur();
  } else if(e.key === 'Enter' && e.currentTarget.value.trim()){
    showHint('This is a prototype — search isn’t wired up yet');
  }
}
function toggleReportFilter(e, id){
  e.stopPropagation();
  document.querySelectorAll('.report-filter-menu.open').forEach(function(m){
    if(m.id !== id) m.classList.remove('open');
  });
  const menu = document.getElementById(id);
  if(menu) menu.classList.toggle('open');
}
function closeReportFilters(){
  document.querySelectorAll('.report-filter-menu.open').forEach(function(m){ m.classList.remove('open'); });
}
function selectReportFilter(e, id, value){
  e.stopPropagation();
  const label = document.getElementById(id+'-label');
  if(label) label.textContent = value;
  const menu = document.getElementById(id);
  if(menu){
    menu.querySelectorAll('.menu-check-item').forEach(function(item){
      item.classList.toggle('active', item.textContent.trim()===value);
    });
    menu.classList.remove('open');
  }
  showHint('This is a prototype — filtering isn’t wired up yet');
}
// "Compare to last period" toggles the delta badges already sitting in the
// page's stat tiles — the one report-page control with real data to act on
// without fabricating anything new.
function toggleCompareRow(e){
  const btn = e.currentTarget;
  const on = btn.classList.toggle('active');
  const grid = document.querySelector('.scroll-body .stat-grid');
  if(grid) grid.querySelectorAll('.stat-delta').forEach(function(el){ el.style.display = on ? 'none' : ''; });
}

/* All Reports: search + category actually filter the table. */
function filterAllReportsTable(){
  const q = (document.getElementById('all-reports-search')||{}).value?.trim().toLowerCase() || '';
  const cat = window.allReportsCategory || 'All categories';
  const rows = document.querySelectorAll('#all-reports-tbody tr[data-name]');
  let visible = 0;
  rows.forEach(function(tr){
    const matchesQ = !q || (tr.dataset.name||'').includes(q);
    const matchesCat = cat === 'All categories' || tr.dataset.category === cat;
    const show = matchesQ && matchesCat;
    tr.style.display = show ? '' : 'none';
    if(show) visible++;
  });
  const empty = document.getElementById('all-reports-empty');
  if(empty) empty.style.display = visible ? 'none' : '';
}
function onAllReportsSearch(e){ filterAllReportsTable(); }
function selectAllReportsCategory(e, id, value){
  e.stopPropagation();
  window.allReportsCategory = value;
  const label = document.getElementById(id+'-label');
  if(label) label.textContent = value;
  const menu = document.getElementById(id);
  if(menu){
    menu.querySelectorAll('.menu-check-item').forEach(function(item){
      item.classList.toggle('active', item.textContent.trim()===value);
    });
    menu.classList.remove('open');
  }
  filterAllReportsTable();
}

/* Conversation Topics: category filter selects the matching theme tab. */
function onTopicCategorySelect(e, id, value){
  e.stopPropagation();
  const label = document.getElementById(id+'-label');
  if(label) label.textContent = value;
  const menu = document.getElementById(id);
  if(menu){
    menu.querySelectorAll('.menu-check-item').forEach(function(item){
      item.classList.toggle('active', item.textContent.trim()===value);
    });
    menu.classList.remove('open');
  }
  if(value === 'All categories') return;
  const tab = [...document.querySelectorAll('.segment-pill[data-topic]')].find(function(el){ return el.textContent.trim()===value; });
  if(tab){ tab.click(); tab.scrollIntoView({block:'nearest', inline:'center'}); }
}

/* Knowledge > Content: search + type actually filter the table. */
function filterKnowledgeContentTable(){
  const q = (document.getElementById('content-search')||{}).value?.trim().toLowerCase() || '';
  const type = window.knowledgeContentType || 'All types';
  const rows = document.querySelectorAll('#content-tbody tr[data-name]');
  let visible = 0;
  rows.forEach(function(tr){
    const matchesQ = !q || (tr.dataset.name||'').includes(q);
    const matchesType = type === 'All types' || tr.dataset.type === type;
    const show = matchesQ && matchesType;
    tr.style.display = show ? '' : 'none';
    if(show) visible++;
  });
  const empty = document.getElementById('content-empty');
  if(empty) empty.style.display = visible ? 'none' : '';
}
function onKnowledgeContentSearch(e){ filterKnowledgeContentTable(); }
function selectContentType(e, id, value){
  e.stopPropagation();
  window.knowledgeContentType = value;
  const label = document.getElementById(id+'-label');
  if(label) label.textContent = value;
  const menu = document.getElementById(id);
  if(menu){
    menu.querySelectorAll('.menu-check-item').forEach(function(item){
      item.classList.toggle('active', item.textContent.trim()===value);
    });
    menu.classList.remove('open');
  }
  filterKnowledgeContentTable();
}

/* Knowledge > Articles: search + status tabs actually filter the table. */
function filterKnowledgeArticlesTable(){
  const q = (document.getElementById('articles-search')||{}).value?.trim().toLowerCase() || '';
  const status = window.knowledgeArticleStatus || 'All';
  const rows = document.querySelectorAll('#articles-tbody tr[data-title]');
  let visible = 0;
  rows.forEach(function(tr){
    const matchesQ = !q || (tr.dataset.title||'').includes(q);
    const matchesStatus = status === 'All' || tr.dataset.status === status;
    const show = matchesQ && matchesStatus;
    tr.style.display = show ? '' : 'none';
    if(show) visible++;
  });
  const empty = document.getElementById('articles-empty');
  if(empty) empty.style.display = visible ? 'none' : '';
}
function onKnowledgeArticlesSearch(e){ filterKnowledgeArticlesTable(); }
function selectArticleTab(e, status){
  window.knowledgeArticleStatus = status;
  document.querySelectorAll('.tabs-row .tab').forEach(function(t){ t.classList.remove('active'); });
  e.currentTarget.classList.add('active');
  filterKnowledgeArticlesTable();
}

/* ---------------- chart hover tooltip ---------------- */
// One shared floating tooltip, positioned from delegated pointer events —
// works against every re-render of the reports pages without re-wiring.
function chartTooltipEl(){
  let el = document.getElementById('chart-tooltip');
  if(!el){
    el = document.createElement('div');
    el.id = 'chart-tooltip';
    el.className = 'chart-tooltip';
    document.body.appendChild(el);
  }
  return el;
}
function clearChartMarks(){
  document.querySelectorAll('.chart-crosshair.show, .chart-hover-dot.show').forEach(function(mark){ mark.classList.remove('show'); });
}
function hideChartTooltip(){
  const el = document.getElementById('chart-tooltip');
  if(el) el.classList.remove('show');
  clearChartMarks();
}
function positionChartTooltip(tip, clientX, clientY){
  const pad = 14;
  const rect = tip.getBoundingClientRect();
  let left = clientX + pad, top = clientY + pad;
  if(left + rect.width > window.innerWidth - 8) left = clientX - rect.width - pad;
  if(top + rect.height > window.innerHeight - 8) top = clientY - rect.height - pad;
  tip.style.left = left+'px';
  tip.style.top = top+'px';
}
function showBarTooltip(bar, e){
  let data; try{ data = JSON.parse(bar.dataset.tip); } catch(err){ return; }
  clearChartMarks();
  const tip = chartTooltipEl();
  tip.innerHTML = chartTooltipHtml(data);
  tip.classList.add('show');
  positionChartTooltip(tip, e.clientX, e.clientY);
}
function showLineTooltip(hit, e){
  const svg = hit.closest('svg.mini-chart');
  if(!svg) return;
  let data; try{ data = JSON.parse(hit.dataset.tip); } catch(err){ return; }
  clearChartMarks();
  const tip = chartTooltipEl();
  tip.innerHTML = chartTooltipHtml(data);
  tip.classList.add('show');
  positionChartTooltip(tip, e.clientX, e.clientY);

  const cx = hit.getAttribute('data-cx');
  const cross = svg.querySelector('.chart-crosshair');
  if(cross){ cross.setAttribute('x1', cx); cross.setAttribute('x2', cx); cross.classList.add('show'); }
  let cys = []; try{ cys = JSON.parse(hit.getAttribute('data-cy')); } catch(err){}
  svg.querySelectorAll('.chart-hover-dot').forEach(function(dot){
    const si = Number(dot.dataset.series);
    if(cys[si] === undefined) return;
    dot.setAttribute('cx', cx);
    dot.setAttribute('cy', cys[si]);
    dot.classList.add('show');
  });
}
function chartTooltipHtml(data){
  const rows = (data.entries||[]).map(function(en){
    return '<div class="chart-tip-row"><span class="chart-tip-dot" style="background:'+en.color+'"></span>'
      + '<span class="chart-tip-name">'+en.name+'</span><span class="chart-tip-value">'+en.value+'</span></div>';
  }).join('');
  return (data.label ? '<div class="chart-tip-label">'+data.label+'</div>' : '') + rows;
}
function initChartTooltip(){
  document.addEventListener('mousemove', function(e){
    const hit = e.target.closest && e.target.closest('.chart-hit');
    if(hit){ showLineTooltip(hit, e); return; }
    const bar = e.target.closest && e.target.closest('.chart-bar');
    if(bar){ showBarTooltip(bar, e); return; }
    hideChartTooltip();
  });
  // mousemove alone won't fire once the pointer leaves the window entirely.
  document.addEventListener('mouseout', function(e){
    if(!e.relatedTarget) hideChartTooltip();
  });
}
initChartTooltip();

showPage('inbox');
startInboxTrickle();
