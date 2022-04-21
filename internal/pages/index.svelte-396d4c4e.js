var F=Object.defineProperty,q=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var R=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var k=(e,t,a)=>t in e?F(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,M=(e,t)=>{for(var a in t||(t={}))D.call(t,a)&&k(e,a,t[a]);if(R)for(var a of R(t))G.call(t,a)&&k(e,a,t[a]);return e},E=(e,t)=>q(e,A(t));import{S as W,i as $,s as z,e as _,k as N,c as p,a as S,m as y,d as b,b as d,K as O,g as U,J as v,L as V,n as P,M as T}from"../chunks/index-dd47dd75.js";function x(e){let t=e.length,a;for(;t!=0;)a=Math.floor(Math.random()*t),t--,[e[t],e[a]]=[e[a],e[t]];return e}const Y="cards/mushroom.png",j="cards/flower.png",J="cards/coin10.png",K="cards/coin20.png",Q="cards/star.png",X="cards/chest.png",Z="cards/backface.png";var B=(e=>(e.MUSHROOM="ncard/MUSHROOM",e.FLOWER="ncard/FLOWER",e.COIN10="ncard/COIN10",e.COIN20="ncard/COIN20",e.STAR="ncard/STAR",e.CHEST="ncard/CHEST",e))(B||{});const h=e=>{const t=`${e}`.replace("ncard/","");switch(e){case"ncard/MUSHROOM":return{img:Y,type:e,name:t};case"ncard/FLOWER":return{img:j,type:e,name:t};case"ncard/CHEST":return{img:X,type:e,name:t};case"ncard/COIN10":return{img:J,type:e,name:t};case"ncard/COIN20":return{img:K,type:e,name:t};case"ncard/STAR":return{img:Q,type:e,name:t};default:throw"Unknown card type"}},ee=()=>Z,te=()=>{const e=x([...Object.values(B)]),t=Math.ceil(e.length/2);return{big:e.slice(0,t),small:e.slice(-t)}},ae=()=>{const e=te(),t=[].concat(...e.big.map(s=>[h(s),h(s),h(s),h(s)])),a=[].concat(...e.small.map(s=>[h(s),h(s)]));return x([...t,...a])};function H(e,t,a){const s=e.slice();return s[12]=t[a],s[14]=a,s}function L(e){let t,a,s,l,r,c,n,u,m,w,g,I,C;return{c(){t=_("div"),a=_("button"),s=_("img"),r=N(),c=_("img"),g=N(),this.h()},l(i){t=p(i,"DIV",{class:!0});var o=S(t);a=p(o,"BUTTON",{class:!0,title:!0,"aria-label":!0,"data-target-idx":!0});var f=S(a);s=p(f,"IMG",{class:!0,src:!0,alt:!0}),r=y(f),c=p(f,"IMG",{class:!0,src:!0,alt:!0}),f.forEach(b),g=y(o),o.forEach(b),this.h()},h(){d(s,"class","face back svelte-7sylvo"),O(s.src,l=e[1])||d(s,"src",l),d(s,"alt","Back face"),d(c,"class","face front svelte-7sylvo"),O(c.src,n=e[12].img)||d(c,"src",n),d(c,"alt","Front face"),d(a,"class",u="card "+(e[12].revealed?"revealed":"")+" svelte-7sylvo"),d(a,"title",m=e[12].name),d(a,"aria-label","Card"),d(a,"data-target-idx",w=e[14]),d(t,"class","card-wrapper svelte-7sylvo")},m(i,o){U(i,t,o),v(t,a),v(a,s),v(a,r),v(a,c),v(t,g),I||(C=V(a,"click",e[2]),I=!0)},p(i,o){o&1&&!O(c.src,n=i[12].img)&&d(c,"src",n),o&1&&u!==(u="card "+(i[12].revealed?"revealed":"")+" svelte-7sylvo")&&d(a,"class",u),o&1&&m!==(m=i[12].name)&&d(a,"title",m)},d(i){i&&b(t),I=!1,C()}}}function ne(e){let t,a,s=e[0],l=[];for(let r=0;r<s.length;r+=1)l[r]=L(H(e,s,r));return{c(){t=_("div"),a=_("div");for(let r=0;r<l.length;r+=1)l[r].c();this.h()},l(r){t=p(r,"DIV",{class:!0});var c=S(t);a=p(c,"DIV",{class:!0});var n=S(a);for(let u=0;u<l.length;u+=1)l[u].l(n);n.forEach(b),c.forEach(b),this.h()},h(){d(a,"class","cards-board svelte-7sylvo"),d(t,"class","memory-game svelte-7sylvo")},m(r,c){U(r,t,c),v(t,a);for(let n=0;n<l.length;n+=1)l[n].m(a,null)},p(r,[c]){if(c&7){s=r[0];let n;for(n=0;n<s.length;n+=1){const u=H(r,s,n);l[n]?l[n].p(u,c):(l[n]=L(u),l[n].c(),l[n].m(a,null))}for(;n<l.length;n+=1)l[n].d(1);l.length=s.length}},i:P,o:P,d(r){r&&b(t),T(l,r)}}}async function se(){return document.querySelector(".memory-game").animate([{backgroundPosition:"0 center"},{backgroundPosition:" 100px center"}],{duration:150,easing:"steps(2)",direction:"normal",iterations:10}).finished}function re(e,t,a){const s=ee(),l=ae();let r=!1,c=new Set,n=new Set,u=g();async function m(i,o="normal"){r=!0,await i.animate([{transform:"rotateY(0.5turn)"},{transform:"rotateY(2turn)"}],{duration:1e3,easing:"ease",direction:o}).finished,r=!1}function w(){return new Set([...n].map(o=>l[o].type)).size===1}function g(){return l.map((i,o)=>E(M({},i),{revealed:c.has(o)||n.has(o)}))}async function I(i,o){n.size===2||r||(console.log("Revealing..."),await m(i),n=new Set([...n,o]),a(0,u=g()),console.log("Revealed..."),console.log("Ready for more"),n.size===2&&(w()?(c=new Set([...c,...n]),n=new Set,await se(),console.log("RIGHT!!! congrats!")):(console.log("WRONG!!!! resetting play"),await Promise.all([...n].map(f=>m(document.querySelector(`.card[data-target-idx="${f}"]`),"reverse"))),n=new Set,console.log("Play resetted")),a(0,u=g())))}function C(i){const o=i.currentTarget;I(o,Number(o.dataset.targetIdx))}return[u,s,C]}class oe extends W{constructor(t){super(),$(this,t,re,ne,z,{})}}export{oe as default};