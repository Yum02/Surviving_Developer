const E=require(require('path').resolve(process.argv[3]||'src/engine.js'));const N=+process.argv[2]||3000;
const cnt={},end={};let lives=0,anyNeg=0,choices=0;
for(let k=0;k<N;k++){const s=E.autoRun(90000+k*17);lives++;
  const ids=new Set((s.condLog||[]).map(x=>x.id));for(const id of ids)cnt[id]=(cnt[id]||0)+1;
  if([...ids].some(id=>E.COND[id].p<0))anyNeg++;end[s.ending]=(end[s.ending]||0)+1;}
const o=Object.entries(cnt).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${E.COND[k].n} ${(v/lives*100).toFixed(1)}%`);
console.log(o.join(' | '));console.log('negative any',(anyNeg/lives*100).toFixed(1)+'%');
console.log(Object.entries(end).sort((a,b)=>b[1]-a[1]).map(([k,v])=>k+' '+(v/lives*100).toFixed(1)).join(' '));
