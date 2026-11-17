// 밸런스 측정: 무작위 / 신중한 플레이 / 무리하는 플레이
const E=require('../src/engine.js');
const N=+process.argv[2]||6000;
const HEAL=['fit','checkup','t_sport','k_play','o_walk','k_swim'],CALM=['rest','family','t_fun','k_play','o_garden','hobby','k_art'];
function run(seed,mode){
  const s=E.newLife(seed);const it=E.life(s);let r=it.next();
  while(!r.done){const b=r.value;
    if(b.t==='choice')r=it.next(Math.floor(Math.random()*b.opts.length));
    else{ if(b.t==='planpoint'){ const o=E.planOptions(s);const ids=o.acts.map(a=>a.id);
        let pick=ids[Math.floor(Math.random()*ids.length)];
        if(mode==='smart'){ const h=HEAL.find(x=>ids.includes(x)),c=CALM.find(x=>ids.includes(x)); if(s.st.health<50&&h)pick=h; else if(s.st.mental<50&&c)pick=c; }
        s.plan.act=pick;
        if(o.spend){ s.plan.inv=mode==='random'?['dep','etf','stock','coin','div'][Math.floor(Math.random()*5)]:'etf'; s.plan.work=mode==='grind'?'grind':mode==='smart'?'normal':['balance','normal','grind'][Math.floor(Math.random()*3)]; s.plan.spend=mode==='random'?['frugal','normal','enjoy'][Math.floor(Math.random()*3)]:'normal'; } }
      r=it.next(); } }
  return s;
}
for(const mode of ['random','smart','grind']){
  const c={};let w=[],ret=0,oldM=0,oldN=0,no=0;
  for(let i=0;i<N;i++){const s=run(i*101+7,mode);c[s.ending]=(c[s.ending]||0)+1;w.push(E.wealth(s));if(/^r_/.test(s.ending)&&s.ending!=='r_none')ret++;oldM+=s.st.mental;oldN+=s.st.network;no++;}
  w.sort((a,b)=>a-b);const pct=k=>(100*(c[k]||0)/N).toFixed(1);
  console.log(mode.padEnd(7),'생존',(100*ret/N).toFixed(1),'건강',pct('health'),'번아웃',pct('burnout'),'조기은퇴',pct('fire'),'매각',pct('exit'),'| 자산 중앙값',Math.round(w[N>>1]/10000)+'억','상위10%',Math.round(w[Math.floor(N*.9)]/10000)+'억','| 사망 시 멘탈',Math.round(oldM/no),'인맥',Math.round(oldN/no));
}
