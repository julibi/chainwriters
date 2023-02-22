(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[327],{70094:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/projects",function(){return t(69128)}])},44853:function(n,e,t){"use strict";t.d(e,{xC:function(){return p},NZ:function(){return v}});var r=t(52322),i=(t(2784),t(3411)),o=t(52024),c=t(95468),a=t(48965),u=t(20612),s=t(18217);function l(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}function d(){var n=l(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]);return d=function(){return n},n}function f(){var n=l(["\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n"]);return f=function(){return n},n}function h(){var n=l(["\n  text-align: center;\n  font-family: ",";\n  color: ",";\n  font-size: 54px;\n  padding: 1rem;\n\n  @media (max-width: 900px) {\n    margin-block-start: 1rem;\n  }\n"]);return h=function(){return n},n}function x(){var n=l(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  flex-wrap: wrap;\n  padding: 3rem 3rem 6rem 3rem;\n\n  @media (max-width: 900px) {\n    padding: 3rem;\n  }\n"]);return x=function(){return n},n}var m=i.ZP.section(d()),p=i.ZP.div(f()),v=i.ZP.h1(h(),c.kn,c.p6),g=i.ZP.section(x());e.ZP=function(){var n=(0,o.Z)(),e=n.topProjects,t=n.areTopProjectsLoading;return(0,r.jsxs)(m,{children:[(0,r.jsx)(s.Z,{color:c.p6,children:"Top Projects"}),t&&!e&&(0,r.jsx)(a.Z,{height:530}),(0,r.jsx)(g,{children:null===e||void 0===e?void 0:e.map((function(n,e){var t=n.id,i=n.title,o=n.balance,c=n.createdAt,a=n.creator,s=n.imgIpfsHash,l=n.isFrozen,d=n.isPaused,f=n.subtitle,h=n.genre;return(0,r.jsx)(u.L,{id:t,createdAt:c,creator:a,title:i,imgIpfsHash:s,subtitle:f,genre:h,tvl:o,isFrozen:l,isPaused:d},e)}))})]})}},20612:function(n,e,t){"use strict";t.d(e,{L:function(){return N}});var r=t(94776),i=t.n(r),o=t(52322),c=t(2784),a=t(96577),u=t(3411),s=t(5632),l=t(20384),d=t(94992),f=t(95468),h=t(81013),x=t(87049),m=t(17896),p=t(28700),v=t(12250),g=t(97204);function j(n,e,t,r,i,o,c){try{var a=n[o](c),u=a.value}catch(s){return void t(s)}a.done?e(u):Promise.resolve(u).then(r,i)}function w(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}function b(){var n=w(["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  width: 260px;\n  height: 400px;\n  margin: 1rem;\n  padding: 1rem;\n\n  border-radius: ",";\n  box-shadow: ",";\n\n  :hover {\n    cursor: pointer;\n  }\n"]);return b=function(){return n},n}function P(){var n=w(["\n  position: relative;\n  flex: 1;\n\n  span {\n    width: 100% !important;\n    height: 100% !important;\n\n    img {\n      object-fit: contain !important;\n    }\n  }\n"]);return P=function(){return n},n}function y(){var n=w(["\n  position: absolute;\n  bottom: 12px;\n  right: 12px;\n\n  display: flex;\n  justify-content: space-between;\n"]);return y=function(){return n},n}function Z(){var n=w(["\n  flex: 1;\n  font-family: ",";\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n"]);return Z=function(){return n},n}function k(){var n=w(["\n  color: ",";\n  font-family: ",";\n  margin-block-end: 0;\n"]);return k=function(){return n},n}function C(){var n=w(["\n  display: flex;\n  justify-content: space-between;\n"]);return C=function(){return n},n}function _(){var n=w(["\n  color: ",";\n"]);return _=function(){return n},n}var O=u.ZP.div(b(),f.B,(function(n){return n.theme.BASE_BOX_SHADOW})),A=u.ZP.div(P()),S=u.ZP.div(y()),z=u.ZP.div(Z(),f.X),E=u.ZP.h4(k(),f.p6,f.cr),I=u.ZP.div(C()),L=u.ZP.span(_(),(function(n){return n.theme.MAIN_TEXT_COLOR})),N=function(n){var e,t=n.id,r=n.createdAt,u=n.creator,w=n.isFrozen,b=(n.isPaused,n.title),P=n.imgIpfsHash,y=n.subtitle,Z=n.genre,k=n.tvl,C=(0,s.useRouter)(),_=(0,h.F)(),N=(0,c.useState)(null),H=N[0],T=N[1],F=new Date(1e3*Number(r)).toLocaleDateString("en-US"),X=(0,c.useCallback)((e=i().mark((function n(){var e;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!t||!(null===P||void 0===P?void 0:P.length)){n.next=5;break}return n.next=3,(0,x.R)(t,P);case 3:e=n.sent,T(e);case 5:case"end":return n.stop()}}),n)})),function(){var n=this,t=arguments;return new Promise((function(r,i){var o=e.apply(n,t);function c(n){j(o,r,i,c,a,"next",n)}function a(n){j(o,r,i,c,a,"throw",n)}c(void 0)}))}),[t,P]);return(0,c.useEffect)((function(){X()}),[X]),(0,o.jsxs)(O,{onClick:function(n){n.preventDefault(),C.push("projects/".concat(t))},theme:_,children:[(0,o.jsxs)(A,{children:[(0,o.jsx)(a.default,{src:null!==H&&void 0!==H?H:"/ImgPlaceholder.png",height:"100%",width:"100%",alt:"Project Image",priority:!0}),(0,o.jsx)(S,{children:w?(0,o.jsx)(v.Z,{tooltipContent:"Project was locked by autor. Content won't change anymore.",icon:(0,o.jsx)(d.Z,{htmlColor:"#fff",fontSize:"inherit"})}):(0,o.jsx)(v.Z,{tooltipContent:"Author can still change the content.",icon:(0,o.jsx)(l.Z,{htmlColor:"#fff",fontSize:"inherit"})})})]}),(0,o.jsxs)(z,{children:[(0,o.jsx)(E,{children:b}),(0,o.jsx)(I,{children:(0,o.jsx)(L,{style:{color:f.p6},children:null!==y&&void 0!==y?y:""})}),(0,o.jsxs)(I,{children:[(0,o.jsx)(L,{children:"Genre"}),(0,o.jsx)("div",{children:null!==Z&&void 0!==Z?Z:"Unknown"})]}),(0,o.jsxs)(I,{children:[(0,o.jsx)(L,{children:"Created"}),(0,o.jsx)("div",{children:F})]}),(0,o.jsxs)(I,{children:[(0,o.jsx)(L,{theme:_,children:"Author"}),(0,o.jsx)(g.Z,{account:u})]}),(0,o.jsxs)(I,{children:[(0,o.jsx)(m.u,{content:"Total Value Locked. Matic collected in this edition.",theme:_,children:(0,o.jsx)(L,{theme:_,children:"TVL"})}),(0,o.jsx)("div",{children:"".concat(k?(0,p.s)(k):0," Matic")})]})]})]})}},69128:function(n,e,t){"use strict";t.r(e);var r=t(52322),i=t(2784),o=t(96577),c=t(3411),a=t(44853),u=t(20612),s=t(52024),l=t(95468),d=t(48965);function f(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}function h(){var n=f(["\n  display: flex;\n  flex-direction: column;\n"]);return h=function(){return n},n}function x(){var n=f(["\n  height: 3rem;\n"]);return x=function(){return n},n}function m(){var n=f(["\n  margin: 3rem 2rem;\n"]);return m=function(){return n},n}function p(){var n=f(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 4rem;\n\n  @media (max-width: 900px) {\n    flex-direction: column;\n    align-items: flex-start;\n    padding: 0;\n    margin: 0 0 1rem 1rem;\n  }\n"]);return p=function(){return n},n}function v(){var n=f(["\n  margin: 1rem 0;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n"]);return v=function(){return n},n}function g(){var n=f(["\n  display: flex;\n  align-items: center;\n  margin-inline-start: 2.5rem;\n  padding: 1rem;\n\n  :disabled {\n    pointer-events: none;\n    box-shadow: ",";\n  }\n\n  @media (max-width: 900px) {\n    margin-inline-start: 3rem;\n  }\n"]);return g=function(){return n},n}function j(){var n=f(["\n  display: flex;\n  align-items: center;\n  margin-inline-start: 1rem;\n  padding: 1rem;\n\n  :disabled {\n    pointer-events: none;\n    box-shadow: ",";\n  }\n\n  @media (max-width: 900px) {\n    margin-inline-start: 0;\n    margin-block-start: 1rem;\n  }\n"]);return j=function(){return n},n}function w(){var n=f(["\n  display: inline-block;\n  margin-inline-end: 1rem;\n  padding: 1rem;\n  width: 350px;\n  height: 50px;\n\n  @media (max-width: 900px) {\n    width: 200px;\n  }\n"]);return w=function(){return n},n}function b(){var n=f(["\n  display: flex;\n  justify-content: center;\n  flex: 1;\n"]);return b=function(){return n},n}function P(){var n=f(["\n  display: inline-block;\n  font-family: ",";\n"]);return P=function(){return n},n}function y(){var n=f(["\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  grid-auto-rows: auto;\n  grid-gap: 1rem;\n  padding: 3rem;\n\n  @media (max-width: 900px) {\n    flex-direction: column;\n    justify-content: center;\n    padding: 0;\n  }\n"]);return y=function(){return n},n}var Z=c.ZP.div(h()),k=c.ZP.div(x()),C=c.ZP.div(m()),_=c.ZP.div(p()),O=c.ZP.div(v()),A=(0,c.ZP)(l.Yd)(g(),(function(n){return n.theme.INSET_BASE_BOX_SHADOW})),S=(0,c.ZP)(l.Yd)(j(),(function(n){return n.theme.INSET_BASE_BOX_SHADOW})),z=(0,c.ZP)(l.Qc)(w()),E=c.ZP.div(b()),I=c.ZP.h3(P(),l.cr),L=c.ZP.div(y());e.default=function(){var n=(0,c.Fg)(),e=(0,i.useState)(null),t=e[0],f=e[1],h=(0,i.useState)(""),x=h[0],m=h[1],p=(0,i.useState)(!1),v=p[0],g=p[1],j=(0,s.Z)(),w=j.allProjects,b=j.refetchAllProjects,P=j.areAllProjectsLoading,y=(0,i.useCallback)((function(){var n=w;if(n&&n.length>0&&x.trim().length>0){var e=x.trim().toLowerCase(),t=n.filter((function(n){var t;return n.title.toLowerCase().includes(e)||(null===(t=n.subtitle)||void 0===t?void 0:t.toLowerCase().includes(e))||n.creator.toLowerCase().includes(e)}));g(!0),t.length>0&&f(t)}}),[w,x]);return(0,i.useEffect)((function(){b()}),[]),(0,r.jsxs)(Z,{children:[(0,r.jsx)(k,{}),(0,r.jsx)(a.xC,{children:(0,r.jsx)(a.NZ,{children:"Projects"})}),(0,r.jsxs)(C,{children:[(0,r.jsx)(_,{children:(0,r.jsxs)(O,{children:[(0,r.jsx)(z,{onKeyDown:function(n){"Enter"===n.key&&y()},onChange:function(n){var e=n.target.value;m(e)},value:x}),(0,r.jsx)(l.X1,{onClick:function(){return m("")}}),(0,r.jsx)(A,{onClick:y,disabled:!w||w.length<1||x.length<1,theme:n,children:(0,r.jsx)(o.default,{src:"/SearchIcon.svg",height:"16px",width:"20px",alt:"SearchIcon"})}),(0,r.jsx)(S,{onClick:function(){m(""),f(null),g(!1)},disabled:!t&&!v,theme:n,children:"Reset"})]})}),P&&!w&&(0,r.jsx)(d.Z,{height:530}),(0,r.jsxs)(L,{children:[v&&!t&&(0,r.jsx)(E,{children:(0,r.jsx)(I,{children:"No results"})}),v&&t&&t.map((function(n,e){var t=n.title,i=n.balance,o=n.createdAt,c=n.creator,a=n.genre,s=n.subtitle,l=n.imgIpfsHash,d=n.isFrozen,f=n.isPaused,h=n.id;return(0,r.jsx)(u.L,{id:h,title:t,createdAt:o,creator:c,imgIpfsHash:l,subtitle:s,genre:a,tvl:i,isFrozen:d,isPaused:f},e)})),!v&&!t&&w&&w.map((function(n,e){var t=n.title,i=n.balance,o=n.createdAt,c=n.creator,a=n.genre,s=n.subtitle,l=n.imgIpfsHash,d=n.isFrozen,f=n.isPaused,h=n.id;return(0,r.jsx)(u.L,{id:h,createdAt:o,creator:c,title:t,imgIpfsHash:l,subtitle:s,genre:a,tvl:i,isFrozen:d,isPaused:f},e)}))]})]})]})}}},function(n){n.O(0,[774,888,179],(function(){return e=70094,n(n.s=e);var e}));var e=n.O();_N_E=e}]);