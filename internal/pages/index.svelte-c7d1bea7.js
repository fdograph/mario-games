var A=Object.defineProperty,D=Object.defineProperties;var G=Object.getOwnPropertyDescriptors;var M=Object.getOwnPropertySymbols;var W=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;var $=(e,t,a)=>t in e?A(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,E=(e,t)=>{for(var a in t||(t={}))W.call(t,a)&&$(e,a,t[a]);if(M)for(var a of M(t))x.call(t,a)&&$(e,a,t[a]);return e},N=(e,t)=>D(e,G(t));import{S as z,i as V,s as T,e as p,k as j,c as b,a as O,m as H,d as I,b as u,K as R,g as B,J as _,L as Y,n as P,M as J}from"../chunks/index-dd47dd75.js";function F(e){let t=e.length,a;for(;t!=0;)a=Math.floor(Math.random()*t),t--,[e[t],e[a]]=[e[a],e[t]];return e}const f="/mario-games/",K=`${f}cards/mushroom.png`,y=`${f}cards/flower.png`,Q=`${f}cards/coin10.png`,X=`${f}cards/coin20.png`,Z=`${f}cards/star.png`,ee=`${f}cards/chest.png`,te=`${f}cards/backface.png`;var q=(e=>(e.MUSHROOM="ncard/MUSHROOM",e.FLOWER="ncard/FLOWER",e.COIN10="ncard/COIN10",e.COIN20="ncard/COIN20",e.STAR="ncard/STAR",e.CHEST="ncard/CHEST",e))(q||{});const v=e=>{const t=`${e}`.replace("ncard/","");switch(e){case"ncard/MUSHROOM":return{img:K,type:e,name:t};case"ncard/FLOWER":return{img:y,type:e,name:t};case"ncard/CHEST":return{img:ee,type:e,name:t};case"ncard/COIN10":return{img:Q,type:e,name:t};case"ncard/COIN20":return{img:X,type:e,name:t};case"ncard/STAR":return{img:Z,type:e,name:t};default:throw"Unknown card type"}},ae=()=>te,ne=()=>{const e=F([...Object.values(q)]),t=Math.ceil(e.length/2);return{big:e.slice(0,t),small:e.slice(-t)}},se=()=>{const e=ne(),t=[].concat(...e.big.map(s=>[v(s),v(s),v(s),v(s)])),a=[].concat(...e.small.map(s=>[v(s),v(s)]));return F([...t,...a])};function L(e,t,a){const s=e.slice();return s[12]=t[a],s[14]=a,s}function U(e){let t,a,s,c,r,l,n,d,h,S,C,m,w;return{c(){t=p("div"),a=p("button"),s=p("img"),r=j(),l=p("img"),C=j(),this.h()},l(g){t=b(g,"DIV",{class:!0});var o=O(t);a=b(o,"BUTTON",{class:!0,title:!0,"aria-label":!0,"data-target-idx":!0});var i=O(a);s=b(i,"IMG",{class:!0,src:!0,alt:!0}),r=H(i),l=b(i,"IMG",{class:!0,src:!0,alt:!0}),i.forEach(I),C=H(o),o.forEach(I),this.h()},h(){u(s,"class","face back svelte-g7ujgt"),R(s.src,c=e[1])||u(s,"src",c),u(s,"alt","Back face"),u(l,"class","face front svelte-g7ujgt"),R(l.src,n=e[12].img)||u(l,"src",n),u(l,"alt","Front face"),u(a,"class",d="card "+(e[12].revealed?"revealed":"")+" svelte-g7ujgt"),u(a,"title",h=e[12].name),u(a,"aria-label","Card"),u(a,"data-target-idx",S=e[14]),u(t,"class","card-wrapper svelte-g7ujgt")},m(g,o){B(g,t,o),_(t,a),_(a,s),_(a,r),_(a,l),_(t,C),m||(w=Y(a,"click",e[2]),m=!0)},p(g,o){o&1&&!R(l.src,n=g[12].img)&&u(l,"src",n),o&1&&d!==(d="card "+(g[12].revealed?"revealed":"")+" svelte-g7ujgt")&&u(a,"class",d),o&1&&h!==(h=g[12].name)&&u(a,"title",h)},d(g){g&&I(t),m=!1,w()}}}function re(e){let t,a,s=e[0],c=[];for(let r=0;r<s.length;r+=1)c[r]=U(L(e,s,r));return{c(){t=p("div"),a=p("div");for(let r=0;r<c.length;r+=1)c[r].c();this.h()},l(r){t=b(r,"DIV",{class:!0});var l=O(t);a=b(l,"DIV",{class:!0});var n=O(a);for(let d=0;d<c.length;d+=1)c[d].l(n);n.forEach(I),l.forEach(I),this.h()},h(){u(a,"class","cards-board svelte-g7ujgt"),u(t,"class","memory-game svelte-g7ujgt")},m(r,l){B(r,t,l),_(t,a);for(let n=0;n<c.length;n+=1)c[n].m(a,null)},p(r,[l]){if(l&7){s=r[0];let n;for(n=0;n<s.length;n+=1){const d=L(r,s,n);c[n]?c[n].p(d,l):(c[n]=U(d),c[n].c(),c[n].m(a,null))}for(;n<c.length;n+=1)c[n].d(1);c.length=s.length}},i:P,o:P,d(r){r&&I(t),J(c,r)}}}function ce(e,t,a){const s=ae(),c=se();let r=!1,l=new Set,n=new Set,d=m();async function h(){r=!0,await document.querySelector(".memory-game").animate([{backgroundPosition:"0 center"},{backgroundPosition:" 100px center"}],{duration:150,easing:"steps(2)",direction:"normal",iterations:10}).finished,r=!1}async function S(o,i="normal"){r=!0,await o.animate([{transform:"rotateY(0.5turn)"},{transform:"rotateY(2turn)"}],{duration:1e3,easing:"ease",direction:i}).finished,r=!1}function C(){return new Set([...n].map(i=>c[i].type)).size===1}function m(){return c.map((o,i)=>N(E({},o),{revealed:l.has(i)||n.has(i)}))}async function w(o,i){if(!(n.size===2||r||l.has(i)||n.has(i))){if(console.log("Revealing..."),await S(o),n=new Set([...n,i]),a(0,d=m()),console.log("Revealed..."),n.size!==2){console.log("Ready for more");return}C()?(l=new Set([...l,...n]),await h(),console.log("RIGHT!!! congrats!")):(console.log("WRONG!!!! resetting play"),await Promise.all([...n].map(k=>S(document.querySelector(`.card[data-target-idx="${k}"]`),"reverse")))),n=new Set,a(0,d=m())}}function g(o){const i=o.currentTarget;w(i,Number(i.dataset.targetIdx))}return[d,s,g]}class ie extends z{constructor(t){super(),V(this,t,ce,re,T,{})}}export{ie as default};