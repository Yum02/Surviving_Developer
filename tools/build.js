// src/engine.js 와 src/template.html 을 합쳐 index.html 한 파일로 만든다.
// 사용법: node tools/build.js
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..');
const eng=fs.readFileSync(path.join(root,'src/engine.js'),'utf8').replace(/^'use strict';\n/,'');
const rar=fs.readFileSync(path.join(root,'src/rarity.json'),'utf8').trim();
let t=fs.readFileSync(path.join(root,'src/template.html'),'utf8');
// 엔진이 바뀌면 값이 달라지는 표식. 저장해 둔 인생이 다른 버전의 규칙으로 이어지지 않게 한다.
let hv=5381;for(let i=0;i<eng.length;i++)hv=(hv*33^eng.charCodeAt(i))>>>0;
t=t.replace('/*ENGINE*/',()=>eng).replace('/*RAR*/',()=>rar).replace('/*VER*/',()=>JSON.stringify(hv.toString(36)));
fs.writeFileSync(path.join(root,'index.html'),t);
console.log('index.html',t.length,'bytes');
