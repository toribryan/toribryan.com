/* ---------------- icon library ---------------- */
const ICON = {
  inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  book:'<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>',
  bar:'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',
  search:'<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',
  settings:'<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/>',
  chevronRight:'<path d="m9 18 6-6-6-6"/>',
  chevronDown:'<path d="m6 9 6 6 6-6"/>',
  plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',
  x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  external:'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  fileText:'<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  heart:'<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',
  folder:'<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  filter:'<path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"/>',
  download:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
  calClock:'<path d="M16 14v2.2l1.6 1"/><path d="M16 2v3"/><path d="M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338"/><path d="M3 9h5.859"/><path d="M8 2v3"/><circle cx="16" cy="16" r="6"/>',
  msgSquare:'<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>',
  list:'<path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/>',
  crown:'<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>',
  clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  card:'<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
  grid:'<path d="M12 3v18"/><path d="M3 12h18"/><rect x="3" y="3" width="18" height="18" rx="2"/>',
  monitor:'<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
  headset:'<path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/>',
  camOff:'<path d="M14.564 14.558a3 3 0 1 1-4.122-4.121"/><path d="m2 2 20 20"/><path d="M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175"/><path d="M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344"/>',
  scan:'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>',
  rotateCcw:'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  flag:'<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/>',
  shieldAlert:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  alertCircle:'<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  hourglass:'<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>',
  alertTriangle:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  userCheck:'<path d="m16 11 2 2 4-4"/><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
  arrowUp:'<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
  arrowDown:'<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  arrowUpRight:'<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  smile:'<path d="M15 10V9"/><path d="M16.472 15a6 6 0 01-8.943 0"/><path d="M9 10V9"/><circle cx="12" cy="12" r="10"/>',
  mic:'<path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/>',
  sparkles:'<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>',
  dots:'<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
  user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  cpu:'<path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/>',
  puzzle:'<path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/>',
  sliders:'<path d="M10 8h4"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M17 16h4"/><path d="M19 12V3"/><path d="M19 21v-5"/><path d="M3 14h4"/><path d="M5 10V3"/><path d="M5 21v-7"/>',
  reply:'<path d="M20 18v-2a4 4 0 0 0-4-4H4"/><path d="m9 17-5-5 5-5"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  camera:'<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>',
  menu:'<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>',
  listFilter:'<path d="M2 5h20"/><path d="M6 12h12"/><path d="M9 19h6"/>',
  messageCircle:'<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>',
  settings2:'<path d="M14 17H5"/><path d="M19 7h-9"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>',
  appWindow:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 4v4"/><path d="M2 8h20"/><path d="M6 4v4"/>',
  panelRightClose:'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m8 9 3 3-3 3"/>',
  panelRightOpen:'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m10 15-3-3 3-3"/>',
  bot:'<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
};
/* Selected-state counterparts for the sidenav. Recipe, taken from the Figma
   selected-inbox export: fill the outer silhouette with currentColor, then knock
   the interior detail back out in the chip colour (.knockout). Lines that can't
   be filled — chart axes — stay as strokes (.rule) and the bars become solid. */
const ICON_SOLID = {
  inbox:'<path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>'
       +'<path class="knockout" d="M22 12h-6l-2 3h-4l-2-3H2"/>',
  book:'<path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>'
      +'<path class="knockout" d="M12 5v16"/>',
  bar:'<path class="rule" d="M3 3v16a2 2 0 0 0 2 2h16"/>'
     +'<rect x="6.4" y="13" width="3.2" height="6" rx="1.2"/>'
     +'<rect x="11.4" y="4" width="3.2" height="15" rx="1.2"/>'
     +'<rect x="16.4" y="8" width="3.2" height="11" rx="1.2"/>',
  users:'<circle cx="9" cy="7.5" r="3.9"/>'
       +'<path d="M9 13c-3.6 0-6.4 2.3-6.4 5.3V20a1 1 0 0 0 1 1h10.8a1 1 0 0 0 1-1v-1.7C15.4 15.3 12.6 13 9 13Z"/>'
       +'<path d="M15.1 4.02a1 1 0 0 0-.63 1.87 3 3 0 0 1 0 5.22 1 1 0 0 0 .63 1.87 5 5 0 0 0 0-8.96Z"/>'
       +'<path d="M17.7 13.9a1 1 0 1 0-.5 1.94 3.1 3.1 0 0 1 2.3 2.96V20a1 1 0 0 0 1 1h.5a1 1 0 0 0 1-1v-1.2a5.1 5.1 0 0 0-4.3-4.9Z"/>',
  settings:'<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/>'
          +'<circle class="knockout-fill" cx="12" cy="12" r="3.1"/>',
};
function I(name, size){ return '<svg class="icon" style="width:'+size+'px;height:'+size+'px" viewBox="0 0 24 24">'+ICON[name]+'</svg>'; }
function Isolid(name, size){
  return '<svg class="icon icon-solid" style="width:'+size+'px;height:'+size+'px" viewBox="0 0 24 24">'+(ICON_SOLID[name]||ICON[name])+'</svg>';
}
function Ifill(name, size){ return '<svg class="icon icon-fill" style="width:'+size+'px;height:'+size+'px" viewBox="0 0 24 24">'+ICON[name]+'</svg>'; }

/* LMS marks: full-colour brand logos (not currentColor icons), used to badge
   which learning-management platform a student's exam session lives in. */
const LMS_LOGO = {
  canvas:'<g clip-path="url(#lmsCanvasClip)"><path d="M9.31319 31.9999C9.31319 27.2238 5.7311 23.4029 1.19379 22.9253C0.477368 25.791 -0.000244141 28.6566 -0.000244141 31.9999C-0.000244141 35.3432 0.477368 38.2089 1.19379 41.0745C5.7311 40.5969 9.31319 36.5372 9.31319 31.9999Z" fill="#D64027"/><path d="M14.8059 34.6269C16.3885 34.6269 17.6715 33.3438 17.6715 31.7612C17.6715 30.1785 16.3885 28.8955 14.8059 28.8955C13.2232 28.8955 11.9402 30.1785 11.9402 31.7612C11.9402 33.3438 13.2232 34.6269 14.8059 34.6269Z" fill="#D64027"/><path d="M54.4475 31.9999C54.4475 36.776 58.0296 40.5969 62.5669 41.0745C63.2833 38.2089 63.7609 35.1044 63.7609 31.9999C63.7609 28.8954 63.2833 25.791 62.5669 22.9253C58.0296 23.4029 54.4475 27.2238 54.4475 31.9999Z" fill="#D64027"/><path d="M48.2387 34.6269C49.8214 34.6269 51.1044 33.3438 51.1044 31.7612C51.1044 30.1785 49.8214 28.8955 48.2387 28.8955C46.6561 28.8955 45.373 30.1785 45.373 31.7612C45.373 33.3438 46.6561 34.6269 48.2387 34.6269Z" fill="#D64027"/><path d="M31.7612 54.6865C26.985 54.6865 23.1641 58.2686 22.6865 62.8059C25.5522 63.5223 28.6567 64 31.7612 64C34.8656 64 37.9701 63.5223 40.8358 62.8059C40.3582 58.2686 36.5373 54.6865 31.7612 54.6865Z" fill="#D64027"/><path d="M31.5222 51.3432C33.1048 51.3432 34.3878 50.0602 34.3878 48.4775C34.3878 46.8948 33.1048 45.6118 31.5222 45.6118C29.9395 45.6118 28.6565 46.8948 28.6565 48.4775C28.6565 50.0602 29.9395 51.3432 31.5222 51.3432Z" fill="#D64027"/><path d="M31.7612 9.31343C36.5373 9.31343 40.3582 5.73134 40.8358 1.19403C37.9701 0.477612 34.8656 0 31.7612 0C28.6567 0 25.5522 0.477612 22.6865 1.19403C23.1641 5.73134 26.985 9.31343 31.7612 9.31343Z" fill="#D64027"/><path d="M31.5222 17.9101C33.1048 17.9101 34.3878 16.6271 34.3878 15.0444C34.3878 13.4617 33.1048 12.1787 31.5222 12.1787C29.9395 12.1787 28.6565 13.4617 28.6565 15.0444C28.6565 16.6271 29.9395 17.9101 31.5222 17.9101Z" fill="#D64027"/><path d="M47.7609 48.0002C44.4176 51.3434 44.1788 56.5972 47.0445 60.1793C52.2982 57.0748 56.8355 52.5375 59.94 47.2837C56.3579 44.4181 51.1042 44.6569 47.7609 48.0002Z" fill="#D64027"/><path d="M43.4626 46.5668C45.0453 46.5668 46.3283 45.2838 46.3283 43.7011C46.3283 42.1185 45.0453 40.8354 43.4626 40.8354C41.8799 40.8354 40.5969 42.1185 40.5969 43.7011C40.5969 45.2838 41.8799 46.5668 43.4626 46.5668Z" fill="#D64027"/><path d="M15.7611 15.9999C19.1044 12.6566 19.3432 7.40289 16.4776 3.8208C11.2238 6.92528 6.68651 11.4626 3.58203 16.7163C7.16412 19.582 12.4179 19.3432 15.7611 15.9999Z" fill="#D64027"/><path d="M19.582 22.6864C21.1646 22.6864 22.4477 21.4034 22.4477 19.8207C22.4477 18.2381 21.1646 16.9551 19.582 16.9551C17.9993 16.9551 16.7163 18.2381 16.7163 19.8207C16.7163 21.4034 17.9993 22.6864 19.582 22.6864Z" fill="#D64027"/><path d="M47.7609 15.9999C51.1042 19.3432 56.3579 19.582 59.94 16.7163C56.8355 11.4626 52.2982 6.92528 47.0445 3.8208C44.1788 7.40289 44.4176 12.6566 47.7609 15.9999Z" fill="#D64027"/><path d="M43.4626 22.6864C45.0453 22.6864 46.3283 21.4034 46.3283 19.8207C46.3283 18.2381 45.0453 16.9551 43.4626 16.9551C41.8799 16.9551 40.5969 18.2381 40.5969 19.8207C40.5969 21.4034 41.8799 22.6864 43.4626 22.6864Z" fill="#D64027"/><path d="M15.7611 48.0002C12.4179 44.6569 7.16412 44.4181 3.58203 47.2837C6.68651 52.5375 11.2238 57.0748 16.4776 60.1793C19.3432 56.3584 19.1044 51.3434 15.7611 48.0002Z" fill="#D64027"/><path d="M19.582 46.5668C21.1646 46.5668 22.4477 45.2838 22.4477 43.7011C22.4477 42.1185 21.1646 40.8354 19.582 40.8354C17.9993 40.8354 16.7163 42.1185 16.7163 43.7011C16.7163 45.2838 17.9993 46.5668 19.582 46.5668Z" fill="#D64027"/></g><defs><clipPath id="lmsCanvasClip"><rect width="63.7612" height="64" fill="white"/></clipPath></defs>',
  moodle:'<path d="M53.1293 52.8772V33.4877C53.1293 29.4057 51.4308 27.3657 48.1123 27.3657C44.7978 27.3657 43.0953 29.4057 43.0953 33.4877V52.8772H33.1468V33.4877C33.1468 29.4057 31.5328 27.3657 28.2158 27.3657C24.8993 27.3657 23.1978 29.4057 23.1978 33.4877V52.8772H13.3333V32.3842C13.3333 28.1322 14.7788 24.9837 17.7553 22.7727C20.3063 20.8177 23.8783 19.8842 28.2153 19.8842C32.7228 19.8842 35.9543 20.9877 38.0788 23.2847C39.8638 20.9877 43.1823 19.8842 48.0273 19.8842C52.4493 19.8842 55.9368 20.8177 58.4883 22.7727C61.4638 24.9837 62.9098 28.1322 62.9098 32.3842V52.9602H53.1283V52.8772H53.1293Z" fill="url(#lmsMoodleRadial)"/><path d="M14.2692 24.8135L13.2487 29.917C22.6027 33.0625 31.4462 30 36.1242 21.838C29.2352 17.077 22.8567 21.923 14.2692 24.8135Z" fill="#58595B"/><path d="M14.2693 23.5405C13.9288 25.4955 13.6733 27.3655 13.3333 29.322C22.2618 32.3845 31.0208 29.747 35.6983 21.7535C29.7438 14.8655 23.1133 20.562 14.2693 23.5405Z" fill="url(#lmsMoodleLinear1)"/><path d="M24.8993 25.8343C20.8173 24.9838 16.3948 27.1118 13.3338 29.3218C11.3778 15.0368 20.2223 15.3753 31.7853 18.9468C31.0208 22.4343 29.7438 27.1118 27.5343 29.9173C27.4498 28.0453 26.5998 26.7708 24.8993 25.8343Z" fill="url(#lmsMoodleLinear2)"/><path d="M1.08917 23.5404C16.0552 14.5249 24.4742 12.8254 41.9062 11.0404C21.6672 27.0249 21.1567 23.5404 1.08917 23.5404Z" fill="url(#lmsMoodleLinear3)"/><path d="M41.9058 11.1224L25.8333 22.7719" stroke="#4A4A4C" stroke-width="0.25"/><path opacity="0.23" d="M22.7727 17.3295C22.9427 19.2015 22.5172 15.5435 22.7727 17.3295Z" fill="#231F20"/><path d="M1.08917 23.5396L25.8337 22.7721" stroke="#A8ABAD" stroke-width="0.25"/><path d="M21.2417 17.5013C16.9897 18.6918 3.0447 21.7533 2.8732 23.5403C2.4487 26.8558 2.7897 32.1283 2.7897 32.1283" stroke="#F16922" stroke-width="0.25"/><path d="M4.06567 44.7982C2.53417 40.9722 0.663672 36.7192 2.87367 31.4467C4.32017 36.3782 4.06567 40.1202 4.06567 44.7982Z" fill="#F16922"/><path d="M20.5381 16.9216C20.8921 16.7966 21.2301 16.8366 21.2926 17.0136C21.3556 17.1911 21.1206 17.4366 20.7666 17.5616C20.4121 17.6896 20.0746 17.6476 20.0116 17.4696C19.9481 17.2936 20.1836 17.0476 20.5381 16.9216Z" fill="#6D6E70"/><defs><radialGradient id="lmsMoodleRadial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(117.627 38.3287) scale(104.88 104.88)"><stop stop-color="#FAAF40"/><stop offset="0.043" stop-color="#F9A538"/><stop offset="0.112" stop-color="#F89D31"/><stop offset="0.227" stop-color="#F89A2F"/><stop offset="0.528" stop-color="#F7922D"/><stop offset="1" stop-color="#F37B28"/></radialGradient><linearGradient id="lmsMoodleLinear1" x1="13.3338" y1="24.5265" x2="35.6658" y2="24.5265" gradientUnits="userSpaceOnUse"><stop stop-color="#929497"/><stop offset="0.124" stop-color="#757578"/><stop offset="0.279" stop-color="#575658"/><stop offset="0.44" stop-color="#403E3F"/><stop offset="0.609" stop-color="#302D2E"/><stop offset="0.788" stop-color="#262223"/><stop offset="1" stop-color="#231F20"/></linearGradient><linearGradient id="lmsMoodleLinear2" x1="17.6168" y1="17.0758" x2="26.8883" y2="30.3173" gradientUnits="userSpaceOnUse"><stop stop-color="#231F20"/><stop offset="1" stop-color="#231F20" stop-opacity="0"/></linearGradient><linearGradient id="lmsMoodleLinear3" x1="1.08917" y1="17.4514" x2="41.9062" y2="17.4514" gradientUnits="userSpaceOnUse"><stop stop-color="#929497"/><stop offset="0.124" stop-color="#757578"/><stop offset="0.279" stop-color="#575658"/><stop offset="0.44" stop-color="#403E3F"/><stop offset="0.609" stop-color="#302D2E"/><stop offset="0.788" stop-color="#262223"/><stop offset="1" stop-color="#231F20"/></linearGradient></defs>',
};
function Ilms(name, size){
  return '<svg viewBox="0 0 64 64" style="width:'+size+'px;height:'+size+'px;display:block;flex:0 0 auto;" xmlns="http://www.w3.org/2000/svg">'+LMS_LOGO[name]+'</svg>';
}

/* Inbox context panel: collapsed state is module-level so it survives renderShell() */
let sidePanelCollapsed = false;

/* Which conversation the chat window is currently showing — starts on the
   pinned Welcome message, since the inbox no longer opens with an empty
   state or a modal. Module-level so pageInbox() knows what to render and a
   real click (selectChatItem) can hand off from the trickle. */
let activeConvo = 'welcome';

/* Pending timers for the inbox's "conversations trickling in" sequence
   (see startInboxTrickle in app.js) — module-level so a real click can find
   and cancel them. */
let inboxDemoTimers = [];

/* Once true, clicking Close skips the "Are you sure?" confirmation entirely
   — set only via the "Don't ask again" follow-up (see dontAskAgain in
   app.js). Session-only, like every other local-only preference in this
   prototype (settingsToggles, etc.) — resets on reload. */
let skipCloseConfirm = false;

/* The single source of truth for every non-pinned row in the inbox list —
   most-recent-first. pageInbox() always renders from this array (never from
   whatever happens to already be in the DOM), so navigating away and back to
   the inbox reconstructs the exact same list instead of resetting to just
   the pinned Welcome row. Every live mutation (an arrival, a close, a reply)
   updates this array AND the live DOM together, so the two never drift out
   of sync — see demoAddChatter / closeActiveConversation / markRowReplied
   in app.js. Each entry: {key, role, label, preview, timeMode, fixedTime,
   arrivedAt, activityAt, opts:{live, unread, replied, closed}}. */
let inboxRows = [];

/* Inbox filter/sort selection: module-level so it survives renderShell() and
   so the tab label + popover checkmark read from one source of truth. */
const SORT_LABELS = {'last-activity':'Last activity', 'date-started':'Date started', 'waiting-since':'Waiting since'};
let inboxStatusFilter = 'open';
let inboxSortBy = 'last-activity';

/* Settings: module-level so edits survive renderShell() — genuinely local
   state (toggled/typed for real), just never sent anywhere. */
let settingsFields = {
  name: 'The Proctoring',
  customerName: 'The Proctoring Support',
  appId: 'yilng9t9',
  timezone: 'America/Los_Angeles',
};
let settingsToggles = {
  institutionFeatures: true,
  testWorkspace: false,
};

