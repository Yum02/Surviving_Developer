// src/engine.js 와 src/template.html 을 합쳐 index.html 한 파일로 만든다.
// 사용법: node tools/build.js
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..');
const eng=fs.readFileSync(path.join(root,'src/engine.js'),'utf8').replace(/^'use strict';\n/,'');
const rar=fs.readFileSync(path.join(root,'src/rarity.json'),'utf8').trim();
let t=fs.readFileSync(path.join(root,'src/template.html'),'utf8');
t=t.replace('/*ENGINE*/',()=>eng).replace('/*RAR*/',()=>rar);
fs.writeFileSync(path.join(root,'index.html'),t);
console.log('index.html',t.length,'bytes');
