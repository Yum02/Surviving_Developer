const E=require(require('path').resolve(process.argv[2]||'src/engine.js'));
const N=+process.argv[3]||4000;
const GOODF=['입사한다','회사를 옮긴다','사귀게 된다','결혼한다'];
const LBLK=['skill','health','mental','network','english','money','study','rep','charm','love'];
const M={};
const norm=t=>t.replace(/[0-9,.]+/g,'#');
for(let k=0;k<N;k++){
  const s=E.newLife(7000+k*31);s.autoPlan=true;const g=E.life(s);let r=g.next(),n=0;
  while(!r.done&&n<6000){const b=r.value;n++;
    if(b.t!=='choice'){r=g.next();continue;}
    const i=Math.floor(Math.random()*b.opts.length);
    const co0=s.job&&s.job.co, p0=s.partner?{m:s.partner.married,l:s.partner.love}:null;
    let qq0=b.q.replace(/[가-힣]{3}(?=(과|와|의|에게|이|가|은|는|을|를)[ ,.?])/g,'X'); if(co0)qq0=qq0.split(co0).join('CO');
    r=g.next(i);let res=null,c=0;
    while(!r.done&&c++<8){const x=r.value;
      if(x.t==='year'){res={sp:1};break;}
      if(x.t==='log'&&(x.era||x.rare)){r=g.next();continue;}
      if(x.t==='log'&&!x.tag){res={tone:x.tone,d:Object.assign({},x.d||{}),f:[],text:x.text};break;}
      if(x.t==='choice'||x.t==='career'||x.t==='end'){res={sp:1};break;}
      r=g.next();}
    if(!res)res={sp:1};
    let good=false;
    if(!res.sp&&res.tone!=='bad'){
      const co1=s.job&&s.job.co;
      if(co0!==co1&&s.job)good=true;
      if(!p0&&s.partner)good=true;
      if(p0&&s.partner&&!p0.m&&s.partner.married)good=true;
      if(p0&&s.partner&&s.partner.love-p0.l>=.5)good=true;
      for(const x in res.d)if(LBLK.includes(x)&&res.d[x]>=.5)good=true;
    }
    const key=norm(qq0.slice(0,40));const ol=norm(b.opts[i].l);
    const e=(M[key]||(M[key]={opts:b.opts.map(o=>norm(o.l)),st:{}}));
    const o=(e.st[ol]||(e.st[ol]={n:0,good:0,sp:0,ex:''}));o.n++;if(good)o.good++;if(res.sp)o.sp++;if(!good&&!res.sp&&!o.ex)o.ex=res.text; if(good&&!o.gx)o.gx=res.text;
    // r already advanced: continue loop with r
  }
}
let cnt=0;const rows=[];
for(const q in M){for(const ol in M[q].st){const o=M[q].st[ol];if(o.n>=1&&o.good===0&&o.sp<o.n*.6){cnt++;rows.push(`${q} | ${ol} | n=${o.n} sp=${o.sp} | ${(o.ex||'').slice(0,50)}`);}}}
console.log(rows.sort().join('\n'));console.log('TOTAL',cnt,'of',Object.values(M).reduce((a,e)=>a+Object.keys(e.st).length,0));
