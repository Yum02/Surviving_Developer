const E=require(require('path').resolve(process.argv[2]||require('path').join(__dirname,'../src/engine.js')));
function texts(seed){ const s=E.newLife(seed);s.autoPlan=true;const it=E.life(s);let r=it.next();const out=new Set();
  while(!r.done){const b=r.value; if(b.t==='log'&&!b.tag)out.add(b.text.replace(/[0-9,.]+(억|만)? ?원|\d+/g,'#').slice(0,30)); if(b.t==='choice')out.add('Q:'+b.q.slice(0,20)); r=b.t==='choice'?it.next(Math.floor(Math.random()*b.opts.length)):it.next();}
  return out;}
let N=400,j=0,size=0;const all=new Set();
let prev=texts(1);
for(let i=2;i<N+2;i++){const cur=texts(i*7919);size+=cur.size;for(const x of cur)all.add(x);let inter=0;for(const x of cur)if(prev.has(x))inter++;j+=inter/(cur.size+prev.size-inter);prev=cur;}
console.log(process.argv[2],'distinct per life',(size/N).toFixed(0),'overlap between two lives',(100*j/N).toFixed(1)+'%','unique texts seen across',N,'lives',all.size);
