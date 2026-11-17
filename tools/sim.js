const E=require('../src/engine.js');
var da=0;
const N=+process.argv[2]||20000;const cnt={};let dev=0,maxAge=0,ch=0,beats=0;const tiers={};
for(let i=0;i<N;i++){
  const s=E.newLife(i*7919+13);s.autoPlan=true;const it=E.life(s);let r=it.next();
  while(!r.done){const b=r.value;beats++;
    if(b.t==='choice'){ch++; /*marriedCheck*/ if(s.partner&&s.partner.married&&(/장거리|헤어지자|청혼|고백|사귄|(^|[^업])데이트/.test(b.q)||b.opts.some(o=>/장거리|여기서 정리|헤어지자|청혼|고백/.test(o.l))))throw new Error('married choice: '+b.q+' / '+b.opts.map(o=>o.l).join(','));if(!b.q||!b.opts.length||b.opts.some(o=>!o.l))throw new Error('bad choice '+JSON.stringify(b));r=it.next(Math.floor(Math.random()*b.opts.length));}
    else{ if(b.t==='log'&&s.partner&&s.partner.married&&/(^|[^업])데이트|처음으로 긴 여행|부모님께 인사를 드렸다|같은 카페/.test(b.text))throw new Error('married log: '+b.text); /*ageCheck*/ if(b.t==='log'&&s.age<13&&/공모전|올림피아드|모의고사|야자|아르바이트|고백|회사|배포|연봉/.test(b.text))throw new Error('age '+s.age+' '+b.text); if(b.t==='log'&&(!b.text||/undefined|NaN/.test(b.text)))throw new Error('bad text '+b.text); r=it.next();}
  }
  if(!s.over||!s.deathAge)throw new Error('not over');da+=s.deathAge;
  for(const k in s.st)if(!(s.st[k]>=0&&s.st[k]<=100))throw new Error('stat '+k);
  if(Number.isNaN(s.money))throw new Error('money');
  cnt[s.ending]=(cnt[s.ending]||0)+1;dev+=s.devYears;
  for(const h of s.hist){tiers[h.tier]=(tiers[h.tier]||0)+1;if(h.to==null)throw new Error('open hist');}
}
const out={};Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]).forEach(k=>out[k]=+(cnt[k]/N*100).toFixed(1));
console.log(JSON.stringify(out));
console.log('avg devYears',(dev/N).toFixed(1),'choices/life',(ch/N).toFixed(1),'beats/life',(beats/N).toFixed(0));
console.log(tiers);
console.log('avg death',(da/N).toFixed(1));
