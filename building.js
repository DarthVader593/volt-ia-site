/* Volt IA: prédio-núcleo em corte (SVG gerado em código, sem bibliotecas) */
window.VOLT_ROOMS=[
 {id:'vendas',  t:'VENDAS · WHATSAPP',   l:'Responde, tira pedido e envia orçamento'},
 {id:'atend',   t:'ATENDIMENTO',         l:'Tira dúvidas e abre chamados'},
 {id:'trafego', t:'TRÁFEGO PAGO',        l:'Cria, testa e ajusta anúncios'},
 {id:'criativos',t:'CRIATIVOS · INSTAGRAM',l:'Gera posts, artes e legendas'},
 {id:'crm',     t:'CRM',                 l:'Organiza leads e follow-ups'},
 {id:'agenda',  t:'AGENDAMENTO',         l:'Marca, confirma e lembra horários'},
 {id:'fin',     t:'FINANCEIRO',          l:'Lança contas e mostra o caixa'},
 {id:'erp',     t:'ERP · ESTOQUE',       l:'Controla estoque, pedidos e notas'},
];
window.VOLT_FLOORS=[
 {n:'04',t:'Relacionamento',d:'Quem fala com o seu cliente: no WhatsApp e no atendimento.'},
 {n:'03',t:'Marketing',d:'Quem atrai cliente novo: anúncios, posts e criativos.'},
 {n:'02',t:'Clientes',d:'Quem não deixa ninguém sumir: CRM e agenda.'},
 {n:'01',t:'Gestão',d:'Quem cuida do dinheiro e do estoque: financeiro e ERP.'},
];
window.buildVolt=function(svg){
 const V='#C8FF2E',S='#F2F4EF',D='#8B929C',L='#262A31',G='#121418',K='#07080A',B='#FF5A1F';
 const W=760,RW=270,CX0=310,CX1=450,FY0=150,FH=250,ROOMH=240;
 const fx=(side)=>side?460:30;
 let o=`<defs>
  <linearGradient id="shaft" x1="0" x2="1"><stop offset="0" stop-color="${V}" stop-opacity=".05"/><stop offset=".5" stop-color="${V}" stop-opacity=".22"/><stop offset="1" stop-color="${V}" stop-opacity=".05"/></linearGradient>
  <radialGradient id="rglow"><stop offset="0" stop-color="${V}" stop-opacity=".55"/><stop offset=".45" stop-color="${V}" stop-opacity=".12"/><stop offset="1" stop-color="${V}" stop-opacity="0"/></radialGradient>
  <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#15181D"/><stop offset="1" stop-color="#0D0F12"/></linearGradient>
  <linearGradient id="floorg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1013"/><stop offset="1" stop-color="#181B20"/></linearGradient>
  <pattern id="pgrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="${L}" stroke-width="1"/></pattern>
  <symbol id="bot" viewBox="0 0 40 64" overflow="visible">
   <line x1="20" y1="0" x2="20" y2="7" stroke="${D}" stroke-width="2"/><circle cx="20" cy="0" r="2.5" fill="${V}" class="ant"/>
   <rect x="7" y="7" width="26" height="19" rx="6" fill="#DADDD6"/>
   <rect x="10" y="12" width="20" height="8" rx="4" fill="${K}"/>
   <circle cx="16" cy="16" r="2.2" fill="${V}" class="eye"/><circle cx="24" cy="16" r="2.2" fill="${V}" class="eye"/>
   <path d="M10 30 H30 L27 50 H13 Z" fill="#C4C8C0"/><rect x="16" y="34" width="8" height="5" rx="1.5" fill="${V}" opacity=".85"/>
   <path d="M15 50 L14 63 M25 50 L26 63" stroke="#9EA39A" stroke-width="4" stroke-linecap="round"/>
  </symbol>
 </defs>`;
 // terreno / base
 o+=`<g class="part base" style="--i:0">
  <rect x="-200" y="1150" width="1160" height="140" fill="url(#pgrid)" opacity=".6"/>
  <rect x="10" y="1150" width="740" height="16" fill="#1B1E23"/><rect x="10" y="1150" width="740" height="2" fill="${V}" opacity=".5"/>
  <rect x="${CX0}" y="1166" width="140" height="70" fill="${G}" stroke="${L}"/>
  <text x="380" y="1206" text-anchor="middle" class="svg-mono" fill="${D}">LOBBY · VOLT IA</text>
 </g>`;
 o+=`<g class="part shell" style="--i:1">
  <rect x="-2" y="132" width="12" height="1030" fill="#1B1E23"/><rect x="750" y="132" width="12" height="1030" fill="#1B1E23"/>
  ${Array.from({length:20},(_,i)=>`<rect x="-14" y="${150+i*50}" width="8" height="34" fill="${i%5==2?V:L}" opacity="${i%5==2?.7:1}" class="win" style="--d:${(i*0.21).toFixed(2)}s"/><rect x="766" y="${165+i*50}" width="8" height="34" fill="${i%7==3?V:L}" opacity="${i%7==3?.7:1}" class="win" style="--d:${(i*0.17).toFixed(2)}s"/>`).join('')}
 </g>`;
 // núcleo (poço central atravessando tudo)
 o+=`<g class="part core-shaft" style="--i:1">
  <rect x="${CX0}" y="${FY0-10}" width="140" height="${4*FH+20}" fill="#0B0D10" stroke="${L}" stroke-width="2"/>
  <rect x="${CX0+40}" y="${FY0-10}" width="60" height="${4*FH+20}" fill="url(#shaft)"/>
  <line x1="${CX0+70}" y1="${FY0-10}" x2="${CX0+70}" y2="${FY0+4*FH+10}" stroke="${V}" stroke-width="1" opacity=".35"/>
  <g class="lift">${Array.from({length:14},(_,i)=>`<rect class="pk" x="${CX0+58+(i%3)*8}" y="${FY0+i*72}" width="6" height="14" fill="${V}" style="--d:${(-i*0.37).toFixed(2)}s"/>`).join('')}</g>
 </g>`;
 // andares e salas
 let beams='';
 for(let f=0;f<4;f++){
  const y=FY0+f*FH;
  o+=`<g class="part floor" data-floor="${f}" style="--i:${2+(3-f)}">`;
  o+=`<rect x="10" y="${y-10}" width="740" height="10" fill="#1E2227"/><rect x="10" y="${y-10}" width="740" height="1.5" fill="${S}" opacity=".18"/>`;
  for(let s=0;s<2;s++){
   const r=VOLT_ROOMS[f*2+s], x=fx(s);
   o+=`<g class="room" id="room-${r.id}" data-room="${f*2+s}" tabindex="0" role="button" aria-label="${r.t}: ${r.l}" transform="translate(${x},${y})">
    <rect class="r-frame" x="0" y="0" width="${RW}" height="${ROOMH}" fill="${K}" stroke="${L}" stroke-width="2"/>
    <rect x="26" y="22" width="218" height="148" fill="url(#wall)"/>
    <polygon points="26,170 244,170 ${RW},${ROOMH} 0,${ROOMH}" fill="url(#floorg)"/>
    <path d="M0 0 L26 22 M${RW} 0 L244 22 M0 ${ROOMH} L26 170 M${RW} ${ROOMH} L244 170" stroke="${L}" stroke-width="1.5"/>
    <rect x="26" y="22" width="218" height="148" fill="none" stroke="${L}" stroke-width="1.5"/>
    <rect class="lamp" x="70" y="6" width="130" height="4" rx="2" fill="${V}" opacity=".25"/>
    <text x="36" y="42" class="svg-mono r-title" fill="${D}">${String(f*2+s+1).padStart(2,'0')} · ${r.t}</text>
    <circle class="r-led" cx="236" cy="30" r="3.5" fill="${V}"/>
    <g class="scene">${scene(r.id)}</g>
    <g class="r-label"><rect x="10" y="${ROOMH-42}" width="${RW-20}" height="32" rx="6" fill="${V}"/><text x="${RW/2}" y="${ROOMH-21}" text-anchor="middle" class="svg-label" fill="${K}">${r.l}</text></g>
    <rect class="r-hit" x="0" y="0" width="${RW}" height="${ROOMH}" fill="transparent"/>
   </g>`;
   // feixe: do reator, sobe/desce pelo poço e entra na sala
   const by=y+132, lane=380+(s?1:-1)*(14+f*12), ry0=FY0+2*FH-5, tx=s?486:274, wall=s?460:300;
   const d=`M${lane} ${ry0} V${by} H${tx}`;
   beams+=`<g class="beam" data-room="${f*2+s}"><path d="${d}" class="b-base"/><path d="${d}" class="b-flow"/><circle cx="${wall}" cy="${by}" r="5" class="b-port"/><circle cx="${tx}" cy="${by}" r="3.5" class="b-end"/></g>`;
  }
  o+=`</g>`;
 }
 o+=`<g class="part beams" style="--i:6">${beams}</g>`;
 // reator (a IA que comanda): entre andares 03 e 02
 const ry=FY0+2*FH-5;
 o+=`<g class="part reactor" style="--i:7"><g transform="translate(380 ${ry})">
  <circle r="150" fill="url(#rglow)" class="r-halo"/>
  <circle r="66" fill="${K}" stroke="${L}" stroke-width="2"/>
  <circle r="58" fill="none" stroke="${V}" stroke-width="2" stroke-dasharray="6 8" class="ring r1"/>
  <circle r="48" fill="none" stroke="${S}" stroke-opacity=".35" stroke-width="1.5" stroke-dasharray="30 10 4 10" class="ring r2"/>
  <circle r="38" fill="${G}" stroke="${V}" stroke-width="1.5" class="r-pulse"/>
  <g transform="translate(-26 -30) scale(.52)">
   <polygon points="6,26 30,26 48,58.73 48,88 40.1,88" fill="${S}"/>
   <polygon points="82.45,47 58.45,47 52,58.73 52,88 59.9,88" fill="${V}"/>
   <polygon class="pkt" points="94,26 70,26 62.3,40 86.3,40" fill="${V}"/>
  </g>
  <rect x="-52" y="76" width="104" height="22" rx="4" fill="${K}" stroke="${V}" stroke-width="1.2"/>
  <text y="91" text-anchor="middle" class="svg-mono" fill="${V}">NÚCLEO · IA</text>
 </g></g>`;
 // telhado
 o+=`<g class="part roof" style="--i:8">
  <path d="M10 140 L60 92 H700 L750 140 Z" fill="#14171B" stroke="${L}" stroke-width="2"/>
  <rect x="${CX0}" y="40" width="140" height="56" fill="#0B0D10" stroke="${L}" stroke-width="2"/>
  <line x1="380" y1="40" x2="380" y2="-10" stroke="${D}" stroke-width="3"/><circle cx="380" cy="-14" r="6" fill="${V}" class="beacon"/>
  <circle cx="380" cy="-14" r="6" fill="none" stroke="${V}" class="beacon-ring"/>
  <g transform="translate(332 54)"><text x="48" y="22" text-anchor="middle" class="svg-sign" fill="${S}">VOLT</text></g>
  ${Array.from({length:12},(_,i)=>`<rect x="${80+i*52}" y="110" width="30" height="6" fill="${i%3?L:V}" opacity="${i%3?1:.6}" class="win" style="--d:${(i*0.3).toFixed(1)}s"/>`).join('')}
 </g>`;
 svg.setAttribute('viewBox','-40 -40 840 1340');
 svg.innerHTML=o;

 function scene(id){
  const bot=(x,y,s=1,cls='')=>`<use href="#bot" x="${x}" y="${y}" width="${40*s}" height="${64*s}" class="botu ${cls}"/>`;
  switch(id){
  case 'vendas': return `
   <rect x="44" y="56" width="70" height="104" rx="10" fill="${K}" stroke="${D}" stroke-width="1.5"/>
   <g><svg x="48" y="62" width="62" height="92" overflow="hidden"><g class="chat">
    ${[0,1,2,3,4,5].map(i=>`<rect x="${i%2?20:4}" y="${8+i*22}" width="38" height="14" rx="5" fill="${i%2?V:'#3A3F47'}"/>`).join('')}
    ${[0,1,2,3,4,5].map(i=>`<rect x="${i%2?20:4}" y="${140+i*22}" width="38" height="14" rx="5" fill="${i%2?V:'#3A3F47'}"/>`).join('')}
   </g></svg></g>
   <g class="ticket"><rect x="132" y="70" width="88" height="54" rx="6" fill="${G}" stroke="${V}" stroke-width="1.5"/>
    <rect x="142" y="82" width="50" height="5" fill="${D}"/><rect x="142" y="94" width="34" height="5" fill="${D}"/>
    <path d="M190 104 l7 7 l13 -15" stroke="${V}" stroke-width="3.5" fill="none" class="check"/></g>
   ${bot(150,150,1,'bob')}`;
  case 'atend': return `
   ${[0,1,2,3].map(i=>`<g class="tk" style="--d:${i*0.6}s"><rect x="128" y="${58+i*24}" width="96" height="16" rx="4" fill="${G}" stroke="${L}"/><rect x="136" y="${64+i*24}" width="50" height="4" fill="${D}"/><circle cx="212" cy="${66+i*24}" r="5" fill="${V}" class="tkc"/></g>`).join('')}
   <g class="wave">${[0,1,2,3,4,5,6].map(i=>`<rect x="${44+i*10}" y="70" width="5" height="30" rx="2" fill="${V}" style="--d:${(i*0.12).toFixed(2)}s"/>`).join('')}</g>
   ${bot(60,140,1.15,'bob')}
   <path d="M66 157 q19 -20 38 0" stroke="${V}" stroke-width="3" fill="none"/>`;
  case 'trafego': return `
   <rect x="40" y="54" width="190" height="104" rx="6" fill="${K}" stroke="${L}"/>
   ${[0,1,2,3].map(i=>`<line x1="48" y1="${70+i*22}" x2="222" y2="${70+i*22}" stroke="${L}"/>`).join('')}
   <path d="M50 140 L80 128 L104 132 L130 110 L156 114 L182 90 L214 76" fill="none" stroke="${V}" stroke-width="3" class="draw"/>
   ${[0,1,2,3,4,5].map(i=>`<rect x="${54+i*28}" y="120" width="14" height="32" fill="${S}" opacity=".18" class="bar" style="--d:${(i*0.2).toFixed(1)}s"/>`).join('')}
   <g class="target" transform="translate(214 76)"><circle r="10" fill="none" stroke="${B}" stroke-width="2"/><circle r="3" fill="${B}"/></g>
   ${bot(196,150,.9,'bob')}`;
  case 'criativos': return `
   ${Array.from({length:9},(_,i)=>`<rect x="${44+(i%3)*42}" y="${56+Math.floor(i/3)*36}" width="36" height="30" rx="4" class="tile" style="--d:${(i*0.33).toFixed(2)}s"/>`).join('')}
   <rect x="44" y="56" width="36" height="30" rx="4" fill="none" stroke="${S}" stroke-width="2" class="cursorbox"/>
   <g transform="translate(184 64)"><rect width="48" height="60" rx="6" fill="${G}" stroke="${V}" stroke-width="1.5"/><circle cx="24" cy="24" r="10" fill="none" stroke="${V}" stroke-width="2"/><rect x="10" y="44" width="28" height="4" fill="${D}"/>
   <path d="M38 -6 l3 6 l6 1 l-5 4 l2 6 l-6 -3 l-6 3 l2 -6 l-5 -4 l6 -1 Z" fill="${V}" class="spark"/></g>
   ${bot(184,150,.9,'bob')}`;
  case 'crm': return `
   ${[[70,80],[130,62],[190,84],[96,130],[160,128],[212,138]].map((p,i,a)=>'').join('')}
   <g stroke="${L}" stroke-width="2"><path d="M70 80 L130 62 L190 84 M70 80 L96 130 L160 128 L190 84 M130 62 L160 128 M160 128 L212 138 M96 130 L130 62"/></g>
   <path d="M70 80 L130 62 L190 84 L160 128 L96 130 Z" fill="none" stroke="${V}" stroke-width="2" class="crmflow"/>
   ${[[70,80],[130,62],[190,84],[96,130],[160,128],[212,138]].map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="9" fill="${G}" stroke="${i==5?D:V}" stroke-width="2" class="cn" style="--d:${(i*0.4).toFixed(1)}s"/>`).join('')}
   ${bot(40,150,.9,'bob')}`;
  case 'agenda': return `
   <rect x="44" y="54" width="150" height="104" rx="6" fill="${K}" stroke="${L}"/><rect x="44" y="54" width="150" height="16" rx="6" fill="#1B1E23"/>
   ${Array.from({length:15},(_,i)=>`<rect x="${52+(i%5)*28}" y="${78+Math.floor(i/5)*26}" width="22" height="18" rx="3" class="slot" style="--d:${([3,7,1,11,5,13,9,0,14,6,2,10,4,12,8][i]*0.28).toFixed(2)}s"/>`).join('')}
   <g transform="translate(218 84)"><circle r="18" fill="${G}" stroke="${V}" stroke-width="2"/><line x1="0" y1="0" x2="0" y2="-12" stroke="${S}" stroke-width="2.5" class="hand"/><line x1="0" y1="0" x2="8" y2="0" stroke="${S}" stroke-width="2.5"/></g>
   ${bot(204,150,.9,'bob')}`;
  case 'fin': return `
   <rect x="40" y="54" width="120" height="104" rx="6" fill="${K}" stroke="${L}"/>
   ${[0,1,2,3,4].map(i=>`<rect x="${52+i*21}" y="${66}" width="13" height="80" fill="${i==4?V:'#2F343B'}" class="fbar" style="--d:${(i*0.25).toFixed(2)}s;--h:${[.35,.5,.42,.66,.82][i]}"/>`).join('')}
   ${[0,1,2,3].map(i=>`<g><rect x="172" y="${60+i*22}" width="56" height="14" rx="3" fill="${G}" stroke="${L}"/><rect x="178" y="${65+i*22}" width="${[30,22,34,26][i]}" height="4" fill="${i%2?D:V}" class="ledger" style="--d:${(i*0.5).toFixed(1)}s"/></g>`).join('')}
   ${bot(186,150,.9,'bob')}`;
  case 'erp': return `
   <g fill="none" stroke="${L}" stroke-width="2"><path d="M44 74 H150 M44 112 H150"/></g>
   ${[0,1,2,3].map(i=>`<rect x="${50+i*24}" y="${54}" width="18" height="18" fill="${i==2?V:'#3A3F47'}"/>`).join('')}
   ${[0,1,2].map(i=>`<rect x="${56+i*30}" y="${90}" width="22" height="20" fill="${i==1?'#3A3F47':'#2F343B'}"/>`).join('')}
   <g transform="translate(200 82)"><g class="gear"><circle r="20" fill="none" stroke="${V}" stroke-width="6" stroke-dasharray="7 5.6"/><circle r="11" fill="${G}" stroke="${V}" stroke-width="2"/></g></g>
   <rect x="34" y="150" width="200" height="8" rx="4" fill="#1B1E23" stroke="${L}"/>
   <svg x="34" y="124" width="200" height="28" overflow="hidden"><g class="belt">${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${i*50}" y="6" width="22" height="20" rx="2" fill="${i%3==0?V:'#C4C8C0'}" opacity="${i%3==0?1:.7}"/>`).join('')}</g></svg>
   ${bot(116,152,.8,'bob')}`;
  }
 }
};
