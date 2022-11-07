var Vs=Object.defineProperty;var Ws=(e,t,s)=>t in e?Vs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var w=(e,t,s)=>(Ws(e,typeof t!="symbol"?t+"":t,s),s),qs=(e,t,s)=>{if(!t.has(e))throw TypeError("Cannot "+s)};var j=(e,t,s)=>(qs(e,t,"read from private field"),s?s.call(e):t.get(e)),At=(e,t,s)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,s)};(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Et=window,de=Et.ShadowRoot&&(Et.ShadyCSS===void 0||Et.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,fe=Symbol(),Se=new WeakMap;class es{constructor(t,s,i){if(this._$cssResult$=!0,i!==fe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=s}get styleSheet(){let t=this.o;const s=this.t;if(de&&t===void 0){const i=s!==void 0&&s.length===1;i&&(t=Se.get(s)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Se.set(s,t))}return t}toString(){return this.cssText}}const zs=e=>new es(typeof e=="string"?e:e+"",void 0,fe),I=(e,...t)=>{const s=e.length===1?e[0]:t.reduce((i,n,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[r+1],e[0]);return new es(s,e,fe)},Fs=(e,t)=>{de?e.adoptedStyleSheets=t.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet):t.forEach(s=>{const i=document.createElement("style"),n=Et.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=s.cssText,e.appendChild(i)})},Ce=de?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let s="";for(const i of t.cssRules)s+=i.cssText;return zs(s)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var qt;const kt=window,ke=kt.trustedTypes,Zs=ke?ke.emptyScript:"",Te=kt.reactiveElementPolyfillSupport,Jt={toAttribute(e,t){switch(t){case Boolean:e=e?Zs:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=e!==null;break;case Number:s=e===null?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch{s=null}}return s}},ss=(e,t)=>t!==e&&(t==t||e==e),zt={attribute:!0,type:String,converter:Jt,reflect:!1,hasChanged:ss};class tt extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var s;this.finalize(),((s=this.h)!==null&&s!==void 0?s:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((s,i)=>{const n=this._$Ep(i,s);n!==void 0&&(this._$Ev.set(n,i),t.push(n))}),t}static createProperty(t,s=zt){if(s.state&&(s.attribute=!1),this.finalize(),this.elementProperties.set(t,s),!s.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,s);n!==void 0&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,s,i){return{get(){return this[s]},set(n){const r=this[t];this[s]=n,this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||zt}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const s=this.properties,i=[...Object.getOwnPropertyNames(s),...Object.getOwnPropertySymbols(s)];for(const n of i)this.createProperty(n,s[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const s=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const n of i)s.unshift(Ce(n))}else t!==void 0&&s.push(Ce(t));return s}static _$Ep(t,s){const i=s.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(s=>this.enableUpdating=s),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(s=>s(this))}addController(t){var s,i;((s=this._$ES)!==null&&s!==void 0?s:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var s;(s=this._$ES)===null||s===void 0||s.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,s)=>{this.hasOwnProperty(s)&&(this._$Ei.set(s,this[s]),delete this[s])})}createRenderRoot(){var t;const s=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Fs(s,this.constructor.elementStyles),s}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(s=>{var i;return(i=s.hostConnected)===null||i===void 0?void 0:i.call(s)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(s=>{var i;return(i=s.hostDisconnected)===null||i===void 0?void 0:i.call(s)})}attributeChangedCallback(t,s,i){this._$AK(t,i)}_$EO(t,s,i=zt){var n;const r=this.constructor._$Ep(t,i);if(r!==void 0&&i.reflect===!0){const o=(((n=i.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?i.converter:Jt).toAttribute(s,i.type);this._$El=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$El=null}}_$AK(t,s){var i;const n=this.constructor,r=n._$Ev.get(t);if(r!==void 0&&this._$El!==r){const o=n.getPropertyOptions(r),a=typeof o.converter=="function"?{fromAttribute:o.converter}:((i=o.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?o.converter:Jt;this._$El=r,this[r]=a.fromAttribute(s,o.type),this._$El=null}}requestUpdate(t,s,i){let n=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||ss)(this[t],s)?(this._$AL.has(t)||this._$AL.set(t,s),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(s){Promise.reject(s)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,r)=>this[r]=n),this._$Ei=void 0);let s=!1;const i=this._$AL;try{s=this.shouldUpdate(i),s?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach(n=>{var r;return(r=n.hostUpdate)===null||r===void 0?void 0:r.call(n)}),this.update(i)):this._$Ek()}catch(n){throw s=!1,this._$Ek(),n}s&&this._$AE(i)}willUpdate(t){}_$AE(t){var s;(s=this._$ES)===null||s===void 0||s.forEach(i=>{var n;return(n=i.hostUpdated)===null||n===void 0?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((s,i)=>this._$EO(i,this[i],s)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}tt.finalized=!0,tt.elementProperties=new Map,tt.elementStyles=[],tt.shadowRootOptions={mode:"open"},Te==null||Te({ReactiveElement:tt}),((qt=kt.reactiveElementVersions)!==null&&qt!==void 0?qt:kt.reactiveElementVersions=[]).push("1.4.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ft;const Tt=window,nt=Tt.trustedTypes,Oe=nt?nt.createPolicy("lit-html",{createHTML:e=>e}):void 0,D=`lit$${(Math.random()+"").slice(9)}$`,pe="?"+D,Ks=`<${pe}>`,rt=document,ft=(e="")=>rt.createComment(e),pt=e=>e===null||typeof e!="object"&&typeof e!="function",is=Array.isArray,ns=e=>is(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",ct=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pe=/-->/g,Le=/>/g,G=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ne=/'/g,Me=/"/g,rs=/^(?:script|style|textarea|title)$/i,os=e=>(t,...s)=>({_$litType$:e,strings:t,values:s}),g=os(1),Ht=os(2),V=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),Re=new WeakMap,st=rt.createTreeWalker(rt,129,null,!1),ls=(e,t)=>{const s=e.length-1,i=[];let n,r=t===2?"<svg>":"",o=ct;for(let c=0;c<s;c++){const l=e[c];let f,h,u=-1,d=0;for(;d<l.length&&(o.lastIndex=d,h=o.exec(l),h!==null);)d=o.lastIndex,o===ct?h[1]==="!--"?o=Pe:h[1]!==void 0?o=Le:h[2]!==void 0?(rs.test(h[2])&&(n=RegExp("</"+h[2],"g")),o=G):h[3]!==void 0&&(o=G):o===G?h[0]===">"?(o=n!=null?n:ct,u=-1):h[1]===void 0?u=-2:(u=o.lastIndex-h[2].length,f=h[1],o=h[3]===void 0?G:h[3]==='"'?Me:Ne):o===Me||o===Ne?o=G:o===Pe||o===Le?o=ct:(o=G,n=void 0);const p=o===G&&e[c+1].startsWith("/>")?" ":"";r+=o===ct?l+Ks:u>=0?(i.push(f),l.slice(0,u)+"$lit$"+l.slice(u)+D+p):l+D+(u===-2?(i.push(void 0),c):p)}const a=r+(e[s]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Oe!==void 0?Oe.createHTML(a):a,i]};class gt{constructor({strings:t,_$litType$:s},i){let n;this.parts=[];let r=0,o=0;const a=t.length-1,c=this.parts,[l,f]=ls(t,s);if(this.el=gt.createElement(l,i),st.currentNode=this.el.content,s===2){const h=this.el.content,u=h.firstChild;u.remove(),h.append(...u.childNodes)}for(;(n=st.nextNode())!==null&&c.length<a;){if(n.nodeType===1){if(n.hasAttributes()){const h=[];for(const u of n.getAttributeNames())if(u.endsWith("$lit$")||u.startsWith(D)){const d=f[o++];if(h.push(u),d!==void 0){const p=n.getAttribute(d.toLowerCase()+"$lit$").split(D),m=/([.?@])?(.*)/.exec(d);c.push({type:1,index:r,name:m[2],strings:p,ctor:m[1]==="."?cs:m[1]==="?"?hs:m[1]==="@"?us:bt})}else c.push({type:6,index:r})}for(const u of h)n.removeAttribute(u)}if(rs.test(n.tagName)){const h=n.textContent.split(D),u=h.length-1;if(u>0){n.textContent=nt?nt.emptyScript:"";for(let d=0;d<u;d++)n.append(h[d],ft()),st.nextNode(),c.push({type:2,index:++r});n.append(h[u],ft())}}}else if(n.nodeType===8)if(n.data===pe)c.push({type:2,index:r});else{let h=-1;for(;(h=n.data.indexOf(D,h+1))!==-1;)c.push({type:7,index:r}),h+=D.length-1}r++}}static createElement(t,s){const i=rt.createElement("template");return i.innerHTML=t,i}}function J(e,t,s=e,i){var n,r,o,a;if(t===V)return t;let c=i!==void 0?(n=s._$Co)===null||n===void 0?void 0:n[i]:s._$Cl;const l=pt(t)?void 0:t._$litDirective$;return(c==null?void 0:c.constructor)!==l&&((r=c==null?void 0:c._$AO)===null||r===void 0||r.call(c,!1),l===void 0?c=void 0:(c=new l(e),c._$AT(e,s,i)),i!==void 0?((o=(a=s)._$Co)!==null&&o!==void 0?o:a._$Co=[])[i]=c:s._$Cl=c),c!==void 0&&(t=J(e,c._$AS(e,t.values),c,i)),t}class as{constructor(t,s){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var s;const{el:{content:i},parts:n}=this._$AD,r=((s=t==null?void 0:t.creationScope)!==null&&s!==void 0?s:rt).importNode(i,!0);st.currentNode=r;let o=st.nextNode(),a=0,c=0,l=n[0];for(;l!==void 0;){if(a===l.index){let f;l.type===2?f=new lt(o,o.nextSibling,this,t):l.type===1?f=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(f=new ds(o,this,t)),this.u.push(f),l=n[++c]}a!==(l==null?void 0:l.index)&&(o=st.nextNode(),a++)}return r}p(t){let s=0;for(const i of this.u)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,s),s+=i.strings.length-2):i._$AI(t[s])),s++}}class lt{constructor(t,s,i,n){var r;this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=t,this._$AB=s,this._$AM=i,this.options=n,this._$Cm=(r=n==null?void 0:n.isConnected)===null||r===void 0||r}get _$AU(){var t,s;return(s=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&s!==void 0?s:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&t.nodeType===11&&(t=s.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,s=this){t=J(this,t,s),pt(t)?t===x||t==null||t===""?(this._$AH!==x&&this._$AR(),this._$AH=x):t!==this._$AH&&t!==V&&this.g(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ns(t)?this.k(t):this.g(t)}O(t,s=this._$AB){return this._$AA.parentNode.insertBefore(t,s)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==x&&pt(this._$AH)?this._$AA.nextSibling.data=t:this.T(rt.createTextNode(t)),this._$AH=t}$(t){var s;const{values:i,_$litType$:n}=t,r=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=gt.createElement(n.h,this.options)),n);if(((s=this._$AH)===null||s===void 0?void 0:s._$AD)===r)this._$AH.p(i);else{const o=new as(r,this),a=o.v(this.options);o.p(i),this.T(a),this._$AH=o}}_$AC(t){let s=Re.get(t.strings);return s===void 0&&Re.set(t.strings,s=new gt(t)),s}k(t){is(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,n=0;for(const r of t)n===s.length?s.push(i=new lt(this.O(ft()),this.O(ft()),this,this.options)):i=s[n],i._$AI(r),n++;n<s.length&&(this._$AR(i&&i._$AB.nextSibling,n),s.length=n)}_$AR(t=this._$AA.nextSibling,s){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,s);t&&t!==this._$AB;){const n=t.nextSibling;t.remove(),t=n}}setConnected(t){var s;this._$AM===void 0&&(this._$Cm=t,(s=this._$AP)===null||s===void 0||s.call(this,t))}}class bt{constructor(t,s,i,n,r){this.type=1,this._$AH=x,this._$AN=void 0,this.element=t,this.name=s,this._$AM=n,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=x}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,s=this,i,n){const r=this.strings;let o=!1;if(r===void 0)t=J(this,t,s,0),o=!pt(t)||t!==this._$AH&&t!==V,o&&(this._$AH=t);else{const a=t;let c,l;for(t=r[0],c=0;c<r.length-1;c++)l=J(this,a[i+c],s,c),l===V&&(l=this._$AH[c]),o||(o=!pt(l)||l!==this._$AH[c]),l===x?t=x:t!==x&&(t+=(l!=null?l:"")+r[c+1]),this._$AH[c]=l}o&&!n&&this.j(t)}j(t){t===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t!=null?t:"")}}class cs extends bt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===x?void 0:t}}const Gs=nt?nt.emptyScript:"";class hs extends bt{constructor(){super(...arguments),this.type=4}j(t){t&&t!==x?this.element.setAttribute(this.name,Gs):this.element.removeAttribute(this.name)}}class us extends bt{constructor(t,s,i,n,r){super(t,s,i,n,r),this.type=5}_$AI(t,s=this){var i;if((t=(i=J(this,t,s,0))!==null&&i!==void 0?i:x)===V)return;const n=this._$AH,r=t===x&&n!==x||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==x&&(n===x||r);r&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var s,i;typeof this._$AH=="function"?this._$AH.call((i=(s=this.options)===null||s===void 0?void 0:s.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class ds{constructor(t,s,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=s,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const Xs={P:"$lit$",A:D,M:pe,C:1,L:ls,R:as,D:ns,V:J,I:lt,H:bt,N:hs,U:us,B:cs,F:ds},Be=Tt.litHtmlPolyfillSupport;Be==null||Be(gt,lt),((Ft=Tt.litHtmlVersions)!==null&&Ft!==void 0?Ft:Tt.litHtmlVersions=[]).push("2.4.0");const Ys=(e,t,s)=>{var i,n;const r=(i=s==null?void 0:s.renderBefore)!==null&&i!==void 0?i:t;let o=r._$litPart$;if(o===void 0){const a=(n=s==null?void 0:s.renderBefore)!==null&&n!==void 0?n:null;r._$litPart$=o=new lt(t.insertBefore(ft(),a),a,void 0,s!=null?s:{})}return o._$AI(e),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Zt,Kt;class N extends tt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,s;const i=super.createRenderRoot();return(t=(s=this.renderOptions).renderBefore)!==null&&t!==void 0||(s.renderBefore=i.firstChild),i}update(t){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ys(s,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return V}}N.finalized=!0,N._$litElement$=!0,(Zt=globalThis.litElementHydrateSupport)===null||Zt===void 0||Zt.call(globalThis,{LitElement:N});const He=globalThis.litElementPolyfillSupport;He==null||He({LitElement:N});((Kt=globalThis.litElementVersions)!==null&&Kt!==void 0?Kt:globalThis.litElementVersions=[]).push("3.2.2");/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Gt;((Gt=window.HTMLSlotElement)===null||Gt===void 0?void 0:Gt.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ge={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},me=e=>(...t)=>({_$litDirective$:e,values:t});class ve{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,s,i){this._$Ct=t,this._$AM=s,this._$Ci=i}_$AS(t,s){return this.update(t,s)}update(t,s){return this.render(...s)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Qt extends ve{constructor(t){if(super(t),this.it=x,t.type!==ge.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===x||t==null)return this._t=void 0,this.it=t;if(t===V)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const s=[t];return s.raw=s,this._t={_$litType$:this.constructor.resultType,strings:s,values:[]}}}Qt.directiveName="unsafeHTML",Qt.resultType=1;const wt=me(Qt);function Js(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var te={exports:{}};(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});class s{constructor(f,h){this.stream=f,this.pos=h}get value(){return this.stream[this.pos]}}class i{constructor(f,h,u){this.stream=f,this.start=h,this.end=u}get value(){return this.stream.slice(this.start,this.end)}get whitespace(){let f=this.start-1;for(;f>=0&&/\s/.test(this.stream[f]);f--);return new i(this.stream,f+1,this.start)}}function n(l,f,h=/\S/g){if(!h.global)throw new Error("Regexp must be global");h.lastIndex=f;const u=h.exec(l);if(!!u)return new s(l,u.index)}function r(l,f){let h=n(l,f);if(!h)return;const u=h.pos;h=n(l,u+1,/[\s<]|>/g);const d=h?h.pos+Number(h.value==">"):l.length;return new i(l,u,d)}const o=["area","base","br","col","command","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr","!doctype","--"];function a(l){let f=l.replace(/^<\/?|>$/g,"").toLowerCase();(f.startsWith("!--")||f.endsWith("--"))&&(f="--");const h=/</.test(l),u=/>/.test(l),d=/<([^/]|$)/.test(l),p=/<\//.test(l)||d&&o.includes(f);return{isTagStart:h,isTagEnd:u,isStartTag:d,isEndTag:p,tagName:f}}function c(l,f="  ",h=80){const u=[];let d=!1,p=!1,m=!1,v=!1,b="",$=0,E={},y,R=0;for(;y=r(l,R);){let A=y.value,z=y.whitespace.value,P="",{isTagStart:S,isTagEnd:C,isStartTag:k,isEndTag:L,tagName:T}=a(A);if(!v){if(S&&!T){if(R=y.end,y=r(l,R),!y)break;A+=y.value,{isTagStart:S,isTagEnd:C,isStartTag:k,isEndTag:L,tagName:T}=a(A)}if(!S&&(d||p)){const at=/[^=]"\w/g.exec(A);at&&y.end!=y.start+at.index+2&&(y.end=y.start+at.index+2,A=y.value,{isTagStart:S,isTagEnd:C,isStartTag:k,isEndTag:L,tagName:T}=a(A),P=f)}}!v&&k&&(b=T);const F=(L&&T!="--"||C&&T=="--")&&T==b;v&&!F&&(S=C=k=L=!1),k&&(d=!0),L&&(p=!0),L&&!k&&--$;const Vt=d&&C&&["script","style"].includes(b)||k&&b=="--",xe=d||p,Ae=z||E.pendingWhitespace,Hs=/^=([^!=]|$)/.test(A)||/^"/.test(A)&&/(^|[^!=])=$/.test(E.tokenValue),Is=xe&&(Hs||/^>/.test(A));if(v||m)u.push(z);else if(Ae&&!Is){const Wt=(Ae.match(/\n/g)||[]).length,at=Math.max(0,u.lastIndexOf(`
`)),js=u.slice(at).reduce((Us,Ds)=>Us+Ds.length,0),Ee=f.repeat($+Number(xe&&!S));js+A.length>h?u.push(`
`,Ee):Wt?u.push(...Array(Wt).fill(`
`),Ee):u.push(" ")}u.push(A),E={pendingWhitespace:P,tokenValue:A},Vt&&(v=!0),F&&(v=!1),d&&C&&b=="pre"&&(m=!0),L&&T=="pre"&&(m=!1),d&&C&&!p&&++$,C&&(d=p=!1),R=y.end}return l[l.length-1]==`
`&&u.push(`
`),u.join("")}t.default=c,e.exports=Object.assign(t.default,t)})(te,te.exports);const Qs=Js(te.exports);class fs extends N{static get properties(){return{source:{attribute:!1}}}firstUpdated(){let s=this.shadowRoot.querySelector("slot").assignedNodes().map(n=>n.nodeType===Node.TEXT_NODE?n.textContent:n.outerHTML).join("").trim();s=Qs(s);const i=window.Prism.highlight(s,window.Prism.languages.markup,"html");this.source=i}render(){return g` <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css"
        integrity="sha512-tN7Ec6zAFaVSG3TpNAKtk4DOHNpSwKHxxrsiw4GHKESGPs5njn/0sMCUMl2svV4wo4BK/rCP7juYz+zx+l6oeQ=="
        crossorigin="anonymous"
      />
      <slot></slot>
      <pre><code>${wt(this.source)}</code></pre>`}}w(fs,"styles",I`
    :host {
      display: block;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    pre {
      background-color: var(--f-bluegray-50);
      font-family: Monaco, Ubuntu Mono, Consolas, monospace;
      font-size: 14px;
      margin: 0;
      padding: 16px;
      overflow-x: auto;
    }

    slot {
      display: none;
    }
  `);customElements.define("syntax-highlight",fs);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ye=me(class extends ve{constructor(e){var t;if(super(e),e.type!==ge.ATTRIBUTE||e.name!=="class"||((t=e.strings)===null||t===void 0?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var s,i;if(this.nt===void 0){this.nt=new Set,e.strings!==void 0&&(this.st=new Set(e.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in t)t[r]&&!(!((s=this.st)===null||s===void 0)&&s.has(r))&&this.nt.add(r);return this.render(t)}const n=e.element.classList;this.nt.forEach(r=>{r in t||(n.remove(r),this.nt.delete(r))});for(const r in t){const o=!!t[r];o===this.nt.has(r)||((i=this.st)===null||i===void 0?void 0:i.has(r))||(o?(n.add(r),this.nt.add(r)):(n.remove(r),this.nt.delete(r)))}return V}}),ti=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();function It(e){return class extends e{static createProperty(t,s){let i=s;(typeof(s==null?void 0:s.attribute)>"u"||(s==null?void 0:s.attribute)===!0)&&(i=Object.assign({},s,{attribute:ti(t.toString())})),super.createProperty(t,i)}}}function Ie(e){const t=[];for(const[s,i]of Object.entries(e))i&&t.push(s);return t.join(" ")}class M extends N{get _fabricStylesheet(){return g`<link
      href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css"
      rel="stylesheet"
      type="text/css"
    />`}}const mt=typeof window<"u";function B(e){const t={};for(const[s,i]of Object.entries(e))for(const n of s.split(" "))t[n]=i;return ye(t)}function ps(){return`m${Math.random().toString(36).slice(2)}`}const ei=()=>g`<svg
  aria-label="Rødt utropstegn"
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="none"
>
  ${ri}
</svg>`,si=()=>g`<svg
  aria-label="Grønt hake"
  role="img"
  width="16"
  height="16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  ${oi}
</svg> `,ii=()=>g`<svg
  aria-label="Gult utropstegn"
  role="img"
  width="16"
  height="16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  ${li}
</svg> `,ni=()=>g`<svg
  aria-label="Info"
  role="img"
  width="16"
  height="16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  ${ai}
</svg>`,ri=Ht`<path
d="M4.1.586A2 2 0 0 1 5.516 0h4.97A2 2 0 0 1 11.9.586L15.413 4.1A2 2 0 0 1 16 5.514v4.97a2 2 0 0 1-.586 1.415L11.9 15.413a2 2 0 0 1-1.415.586h-4.97a2 2 0 0 1-1.414-.586L.586 11.9A2 2 0 0 1 0 10.485v-4.97A2 2 0 0 1 .586 4.1L4.1.586Z"
fill="currentColor"
/>
<path
fill-rule="evenodd"
clip-rule="evenodd"
d="M8 3.25a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V4A.75.75 0 0 1 8 3.25Z"
fill="#fff"
/>
<path d="M8.8 11.8a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0Z" fill="#fff" />`,oi=Ht`<circle cx="8" cy="8" r="8" transform="rotate(180 8 8)" fill="currentColor" />
<path
  fill-rule="evenodd"
  clip-rule="evenodd"
  d="M11.5 4.94c.3.27.34.75.06 1.06l-4 4.5a.75.75 0 0 1-1.09.03l-2-2a.75.75 0 0 1 1.06-1.06l1.44 1.44L10.44 5a.75.75 0 0 1 1.06-.07Z"
  fill="#fff"
/>`,li=Ht`<path
d="M.24 12 6.16 1.09a2.1 2.1 0 0 1 3.68 0l5.92 10.93c.73 1.36-.28 2.99-1.85 2.99H2.1a2.04 2.04 0 0 1-1.85-3Z"
fill="currentColor"
/>
<path
fill-rule="evenodd"
clip-rule="evenodd"
d="M8 3.25c.41 0 .75.34.75.75v5a.75.75 0 0 1-1.5 0V4c0-.41.34-.75.75-.75Z"
fill="#fff"
/>
<path d="M8.8 11.8a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0Z" fill="#fff" />`,ai=Ht`<circle cx="8" cy="8" r="8" fill="currentColor" />
<path
  fill-rule="evenodd"
  clip-rule="evenodd"
  d="M7.25 12a.75.75 0 0 0 1.5 0V8a.75.75 0 0 0-1.5 0v4ZM8 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
  fill="#fff"
/>`,je={negative:{color:"red",icon:ei()},positive:{color:"green",icon:si()},warning:{color:"yellow",icon:ii()},info:{color:"aqua",icon:ni()}};class ee extends M{constructor(){super(),this.show=!1,this.role="alert"}connectedCallback(){if(super.connectedCallback(),!this.variant||!Object.keys(je).includes(this.variant))throw new Error(`Invalid "variant" attribute. Set its value to one of the following:
negative, positive, warning, info.`)}get _style(){return this.variant?je[this.variant]:{}}render(){const{color:t,icon:s}=this._style;return g`
      ${this._fabricStylesheet}
      <f-expand-transition ?show=${this.show}>
        <div
          role=${this.role}
          class="${`flex p-16 border rounded-4 border-l-4 bg-${t}-50 border-${t}-300`}"
          style="border-left-color:var(--f-${t}-600)"
        >
          <div class="mr-8 text-${t}-600">${s}</div>
          <div class="text-14">
            <slot></slot>
          </div>
        </div>
      </f-expand-transition>
    `}}w(ee,"properties",{variant:{type:String,reflect:!0},show:{type:Boolean,reflect:!0},role:{type:String,reflect:!0}}),w(ee,"styles",I`
    :host {
      display: block;
    }
    ::slotted(:last-child) {
      margin-bottom: 0px !important;
    }
  `);customElements.get("f-alert")||customElements.define("f-alert",ee);var be=function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];return e.reduce(function(s,i){return s.concat(typeof i=="string"?i:Array.isArray(i)?be.apply(void 0,i):typeof i=="object"&&i?Object.keys(i).map(function(n){return i[n]?n:""}):"")},[]).join(" ")};const Ue={primary:"button button--primary",secondary:"button",negative:"button button--destructive",utility:"button button--utility",link:"button button--link",pill:"button button--pill"};class se extends It(M){constructor(){super(),this.variant="secondary"}connectedCallback(){super.connectedCallback();const t=Object.keys(Ue);if(!t.includes(this.variant))throw new Error(`Invalid "variant" attribute. Set its value to one of the following:
${t.join(", ")}.`)}firstUpdated(){this.autofocus&&setTimeout(()=>this.focus(),0)}get _classes(){return be(Ue[this.variant],{"button--flat":this.variant==="secondary"&&this.quiet,"button--destructive-flat":this.variant==="negative"&&this.quiet,"button--utility-flat":this.variant==="utility"&&this.quiet,"button--small":this.small,"button--in-progress":this.loading},this.buttonClass)}render(){return g`${this._fabricStylesheet}
    ${this.href?g`<a
          href=${this.href}
          target=${this.target}
          rel=${this.target==="_blank"?this.rel||"noopener":void 0}
          class=${this._classes}
        >
          <slot></slot>
        </a>`:g`<button type=${this.type||"button"} class=${this._classes}>
          <slot></slot>
        </button>`}
    ${this.loading?g`<span
          class="sr-only"
          role="progressbar"
          aria-valuenow="{0}"
          aria-valuetext="Laster..."
        />`:null}`}}w(se,"shadowRootOptions",{...N.shadowRootOptions,delegatesFocus:!0}),w(se,"properties",{type:{type:"button"|"submit"|"reset",reflect:!0},autofocus:{type:Boolean,reflect:!0},variant:{type:String,reflect:!0},quiet:{type:Boolean,reflect:!0},small:{type:Boolean,reflect:!0},loading:{type:Boolean,reflect:!0},href:{type:String,reflect:!0},target:{type:String,reflect:!0},rel:{type:String,reflect:!0},buttonClass:{type:String,reflect:!0}});customElements.get("f-button")||customElements.define("f-button",se);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _=e=>e!=null?e:x,Z={base:"border-2 relative",tooltip:"bg-gray-700 border-gray-700 text-white rounded-4 py-6 px-8",callout:"bg-green-100 border-green-400 py-8 px-16 rounded-8",popover:"bg-white border-white rounded-8 p-16 filter drop-shadow-20",arrowBase:"absolute h-14 w-14 border-2 border-b-0 border-r-0 transform",arrowTooltip:"bg-gray-700 border-gray-700",arrowCallout:"bg-green-100 border-green-400",arrowPopover:"bg-white border-white"},et={box:"group block relative break-words last-child:mb-0 p-16 rounded-8",bleed:"-mx-16 sm:mx-0 rounded-l-0 rounded-r-0 sm:rounded-8"},U={card:"cursor-pointer overflow-hidden relative transition-all outline-none",cardShadow:"f-card rounded-8",cardFlat:"border-2 rounded-4",cardFlatUnselected:"border-bluegray-300 hover:bg-gray-50 hover:border-bluegray-400 active:border-bluegray-300",cardFlatSelected:"border-blue-600 bg-blue-50 hover:bg-blue-100 hover:border-blue-700 active:border-blue-600",cardSelected:"border-blue-600 bg-blue-50 hover:bg-blue-100 hover:border-blue-700 active:border-blue-600",cardOutline:"f-card-outline absolute rounded-8 inset-0 transition-all border-2",cardOutlineUnselected:"border-transparent",cardOutlineSelected:"border-blue-600 hover:border-blue-700"},De={toasterContainer:"fixed fixed-ios-fix bottom-16 left-0 right-0 mx-8 sm:mx-16 z-50 pointer-events-none",toaster:"f-toaster grid f-grid auto-rows-auto justify-items-center justify-center mx-auto pointer-events-none"},O={toastWrapper:"relative overflow-hidden w-full",toast:"toast flex group p-8 mt-16 rounded-8 border-2 w-full pointer-events-auto transition-all",toastPositive:"bg-green-50 border-green-200 text-green-800",toastWarning:"bg-yellow-50 border-yellow-200 text-yellow-800",toastNegative:"bg-red-50 border-red-200 text-red-800",toastNeutral:"bg-gray-50 border-gray-200 text-gray-800",toastIcon:"flex-shrink-0 rounded-full w-16 h-16 m-8",toastIconPositive:"bg-green-300",toastIconWarning:"bg-yellow-300",toastIconNegative:"bg-red-300",toastIconNeutral:"bg-gray-300",toastIconLoading:"animate-bounce",toastContent:"self-center mr-8 py-4 last-child:mb-0",toastClose:"ml-auto p-8"},ci="focus:outline-none appearance-none cursor-pointer bg-transparent border-0 m-0 p-0 inline-block",gs="absolute top-0 bottom-0 hover:text-aqua-400 flex justify-center items-center focus-ring ",hi={wrapper:gs+"right-0",wrapperWithLabel:"w-max pr-12",wrapperWithIcon:"w-40",label:"field-label pb-0 text-12"},ui={wrapper:gs+"left-0",wrapperWithLabel:"w-max pl-12",wrapperWithIcon:"w-40",label:"field-label pb-0 text-secondary text-12"},Ve={ENTER:"Enter",SPACE:" "};class ie extends M{constructor(){super(),this.selected=!1,this.flat=!1,this.clickable=!1}get _outerClasses(){return B({[U.card]:!0,[U.cardShadow]:!this.flat,[U.cardSelected]:this.selected,[U.cardFlat]:this.flat,[this.selected?U.cardFlatSelected:U.cardFlatUnselected]:this.flat})}get _innerClasses(){return B({[U.cardOutline]:!0,[this.selected?U.cardOutlineSelected:U.cardOutlineUnselected]:!0})}get uuButton(){return g`<button class="sr-only" aria-pressed="${this.selected}" tabindex="-1">
      Velg
    </button>`}get uuSpan(){return g`<span role="checkbox" aria-checked="true" aria-disabled="true"></span>`}keypressed(t){!this.clickable||t.altKey||t.ctrlKey||(t.key===Ve.ENTER||t.key===Ve.SPACE)&&(t.preventDefault(),this.click())}render(){return g`
      ${this._fabricStylesheet}
      <div
        tabindex=${_(this.clickable?"0":void 0)}
        class="${this._outerClasses}"
        @keydown=${this.keypressed}
      >
        ${this.clickable?this.uuButton:""}
        ${!this.clickable&&this.selected?this.uuSpan:""}
        <div class="${this._innerClasses}"></div>
        <slot></slot>
      </div>
    `}}w(ie,"styles",I`
    a::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    :host {
      display: block;
    }
  `),w(ie,"properties",{selected:{type:Boolean,reflect:!0},flat:{type:Boolean},clickable:{type:Boolean}});customElements.get("f-card")||customElements.define("f-card",ie);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function St(e,t,s){return e?t():s==null?void 0:s()}var Bt,vs,it,Ct,Y,ut;class ms extends It(M){constructor(){super();At(this,Bt);At(this,it);At(this,Y);this._options=this.innerHTML}render(){return g`${this._fabricStylesheet}
      <div class="${j(this,Bt,vs)}">
        ${St(this.label,()=>g`<label for="${j(this,it,Ct)}">
              ${this.label}
              ${St(this.optional,()=>g`<span className="pl-8 font-normal text-14 text-gray-500">(valgfritt)</span>`)}</label
            >`)}
        <div class="input--select__wrap">
          <select
            id="${j(this,it,Ct)}"
            ?autofocus=${this.autoFocus}
            aria-describedby="${_(j(this,Y,ut))}"
            aria-invalid="${_(this.invalid&&j(this,Y,ut))}"
            aria-errormessage="${_(this.invalid&&j(this,Y,ut))}"
          >
            ${wt(this._options)}
          </select>
        </div>
        ${St(this.always||this.invalid,()=>g`<div id="${j(this,Y,ut)}" class="input__sub-text">${this.hint}</div>`)}
      </div>`}}Bt=new WeakSet,vs=function(){return be("input mb-0",{"input--is-invalid":this.invalid})},it=new WeakSet,Ct=function(){return this.id||ps()},Y=new WeakSet,ut=function(){return this.hint?`${j(this,it,Ct)}__hint`:void 0},w(ms,"properties",{autoFocus:{type:Boolean,reflect:!0},invalid:{type:Boolean,reflect:!0},always:{type:Boolean,reflect:!0},hint:{type:String,reflect:!0},id:{type:String,reflect:!0},label:{type:String,reflect:!0},optional:{type:Boolean,reflect:!0},_options:{state:!0}});customElements.get("f-select")||customElements.define("f-select",ms);class ne extends M{get _class(){return B({[et.box]:!0,[et.bleed]:this.bleed,"bg-aqua-50":this.info,"bg-bluegray-100":this.neutral,"border-2 border-bluegray-300":this.bordered})}render(){return g`
      ${this._fabricStylesheet}
      <div class="${this._class}">
        <slot></slot>
      </div>
    `}}w(ne,"properties",{bleed:{type:Boolean},bordered:{type:Boolean},info:{type:Boolean},neutral:{type:Boolean}}),w(ne,"styles",I`
    :host {
      display: block;
    }
    ::slotted(:last-child) {
      margin-bottom: 0px !important;
    }
  `);customElements.get("f-box")||customElements.define("f-box",ne);function di(e,t){return e.flatMap(s=>[s,t]).slice(0,-1)}const fi=g`<span class="select-none" aria-hidden="true">/</span>`;class pi extends M{connectedCallback(){super.connectedCallback(),this._children=di(Array.from(this.children),fi)}render(){return g`
      ${this._fabricStylesheet}
      <nav aria-label="Her er du" class="flex space-x-8">
        <h2 class="sr-only">Her er du</h2>
        ${this._children}
      </nav>
    `}}customElements.get("f-breadcrumbs")||customElements.define("f-breadcrumbs",pi);const we=typeof window<"u";let ys=!0;if(we){const e=window.matchMedia("(prefers-reduced-motion: reduce)"),t=({matches:s})=>ys=!s;e.addEventListener&&e.addEventListener("change",t),t(e)}const bs=e=>{e.style.transition=null,e.style.backfaceVisibility=null,e.style.overflow=null},ws=e=>{const t=ys?"var(--f-expansion-duration, 0.3s)":"0.01s";e.style.transition=`height ${t}`,e.style.backfaceVisibility="hidden",e.style.overflow="hidden"},gi=(e,t)=>()=>{e.style.height="auto",e.style.overflow=null,t&&t()},mi=e=>()=>{e&&e()},$s=(e,t)=>{const s=(()=>{if(!t)return new Promise(r=>{t=r})})(),i=gi(e,t);bs(e),e.style.height="auto";let n=e.scrollHeight;if(we&&requestAnimationFrame(()=>{e.addEventListener("transitionend",i,{once:!0}),e.style.height="0px",e.style.transitionTimingFunction="ease-out",ws(e),requestAnimationFrame(()=>e.style.height=n+"px")}),s)return s},_s=(e,t)=>{const s=(()=>{if(!t)return new Promise(r=>{t=r})})(),i=mi(t);bs(e);let n=e.scrollHeight;if(we&&requestAnimationFrame(()=>{e.addEventListener("transitionend",i,{once:!0}),e.style.height=n+"px",e.style.transitionTimingFunction="ease-in",ws(e),requestAnimationFrame(()=>e.style.height="0px")}),s)return s},vi=e=>g`<svg
  role="img"
  aria-label="${e.typeLabel}"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="none"
  viewBox="0 0 16 16"
>
  <path
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="1.5"
    d="M5.5 9l2 1.5L11 6"
  />
</svg>`,yi=e=>g`
  <svg
    role="img"
    aria-label="${e.typeLabel}"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
    class="${ye({"transition-transform duration-200":!0,"transform-rotate-180":e.isInfo})}"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-miterlimit="10"
      stroke-width="1.5"
      d="M8 9V4"
    />
    <circle cx="8" cy="11.8" r=".8" fill="currentColor" />
  </svg>
`,bi=()=>g`
  <svg
    role="img"
    aria-label="Lukk"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M4.03 2.97a.75.75 0 00-1.06 1.06L6.94 8l-3.97 3.97a.75.75 0 101.06 1.06L8 9.06l3.97 3.97a.75.75 0 101.06-1.06L9.06 8l3.97-3.97a.75.75 0 00-1.06-1.06L8 6.94 4.03 2.97z"
      clipRule="evenodd"
    />
  </svg>
`,We=e=>{const t={};for(const[s,i]of Object.entries(e))for(const n of s.split(" "))t[n]=i;return ye(t)};class re extends N{constructor(){super(),this.id=Date.now().toString(36)+Math.random().toString(36).slice(2,5),this.type="success",this.text="",this.canclose=!1}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}updated(){!this._expanded&&this._wrapper&&$s(this._wrapper,()=>this._expanded=!0)}get _primaryClasses(){return We({[O.toast]:!0,[O.toastPositive]:this.type==="success",[O.toastWarning]:this.type==="warning",[O.toastNegative]:this.type==="error",[O.toastNeutral]:this.type==="info"})}get _iconClasses(){return We({[O.toastIcon]:!0,[O.toastIconPositive]:this.type=="success",[O.toastIconWarning]:this.type==="warning",[O.toastIconNegative]:this.type==="error",[O.toastIconNeutral]:this.type==="info"})}get _wrapper(){var t,s;return(s=(t=this.renderRoot)==null?void 0:t.querySelector("section"))!=null?s:null}get _success(){return this.type==="success"}get _warning(){return this.type==="warning"}get _error(){return this.type==="error"}get _info(){return this.type==="info"}get _role(){return this._error||this._warning?"alert":"status"}get _typeLabel(){return this._success?"Vellykket":this._error?"Feil":this._warning?"Varsel":"Info"}get _iconMarkup(){return this._success?vi({typeLabel:this._typeLabel}):yi({typeLabel:this._typeLabel,isInfo:this._info})}async collapse(){return new Promise(t=>{this._expanded&&this._wrapper?_s(this._wrapper,t):t()})}close(){const t=new CustomEvent("close",{detail:{id:this.id},bubbles:!0,composed:!0});this.updateComplete.then(()=>this.dispatchEvent(t))}render(){return this.text?g`<link
        rel="stylesheet"
        type="text/css"
        href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css"
      />
      <section class="${O.toastWrapper}" aria-label="${this._typeLabel}">
        <div class="${this._primaryClasses}">
          <div class="${this._iconClasses}">${this._iconMarkup}</div>
          <div role="${this._role}" class="${O.toastContent}">
            <p>${this.text}</p>
          </div>
          ${St(this.canclose===!0,()=>g`<button class="${O.toastClose}" @click="${this.close}">${bi()}</button>`)}
        </div>
      </section>`:g``}}w(re,"styles",I`
    :host {
      display: block;
    }
  `),w(re,"properties",{id:{type:String,attribute:!0,reflect:!0},type:{type:String,attribute:!0,reflect:!0},text:{type:String,attribute:!0,reflect:!0},canclose:{type:Boolean,attribute:!0,reflect:!0}});customElements.get("f-toast")||customElements.define("f-toast",re);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:wi}=Xs,qe=()=>document.createComment(""),ht=(e,t,s)=>{var i;const n=e._$AA.parentNode,r=t===void 0?e._$AB:t._$AA;if(s===void 0){const o=n.insertBefore(qe(),r),a=n.insertBefore(qe(),r);s=new wi(o,a,e,e.options)}else{const o=s._$AB.nextSibling,a=s._$AM,c=a!==e;if(c){let l;(i=s._$AQ)===null||i===void 0||i.call(s,e),s._$AM=e,s._$AP!==void 0&&(l=e._$AU)!==a._$AU&&s._$AP(l)}if(o!==r||c){let l=s._$AA;for(;l!==o;){const f=l.nextSibling;n.insertBefore(l,r),l=f}}}return s},X=(e,t,s=e)=>(e._$AI(t,s),e),$i={},_i=(e,t=$i)=>e._$AH=t,xi=e=>e._$AH,Xt=e=>{var t;(t=e._$AP)===null||t===void 0||t.call(e,!1,!0);let s=e._$AA;const i=e._$AB.nextSibling;for(;s!==i;){const n=s.nextSibling;s.remove(),s=n}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ze=(e,t,s)=>{const i=new Map;for(let n=t;n<=s;n++)i.set(e[n],n);return i},xs=me(class extends ve{constructor(e){if(super(e),e.type!==ge.CHILD)throw Error("repeat() can only be used in text expressions")}ht(e,t,s){let i;s===void 0?s=t:t!==void 0&&(i=t);const n=[],r=[];let o=0;for(const a of e)n[o]=i?i(a,o):o,r[o]=s(a,o),o++;return{values:r,keys:n}}render(e,t,s){return this.ht(e,t,s).values}update(e,[t,s,i]){var n;const r=xi(e),{values:o,keys:a}=this.ht(t,s,i);if(!Array.isArray(r))return this.ut=a,o;const c=(n=this.ut)!==null&&n!==void 0?n:this.ut=[],l=[];let f,h,u=0,d=r.length-1,p=0,m=o.length-1;for(;u<=d&&p<=m;)if(r[u]===null)u++;else if(r[d]===null)d--;else if(c[u]===a[p])l[p]=X(r[u],o[p]),u++,p++;else if(c[d]===a[m])l[m]=X(r[d],o[m]),d--,m--;else if(c[u]===a[m])l[m]=X(r[u],o[m]),ht(e,l[m+1],r[u]),u++,m--;else if(c[d]===a[p])l[p]=X(r[d],o[p]),ht(e,r[u],r[d]),d--,p++;else if(f===void 0&&(f=ze(a,p,m),h=ze(c,u,d)),f.has(c[u]))if(f.has(c[d])){const v=h.get(a[p]),b=v!==void 0?r[v]:null;if(b===null){const $=ht(e,r[u]);X($,o[p]),l[p]=$}else l[p]=X(b,o[p]),ht(e,r[u],b),r[v]=null;p++}else Xt(r[d]),d--;else Xt(r[u]),u++;for(;p<=m;){const v=ht(e,l[m+1]);X(v,o[p]),l[p++]=v}for(;u<=d;){const v=r[u++];v!==null&&Xt(v)}return this.ut=a,_i(e,l),V}});class Ot extends N{constructor(){super(),this._toasts=new Map}connectedCallback(){super.connectedCallback(),this._interval=setInterval(()=>{const t=[],s=[];for(const n of this._toasts)Date.now()<=n[1].duration?t.push(n):s.push(n);const i=[];for(const[n]of s){const r=this.renderRoot.querySelector(`#${n}`);i.push(r.collapse())}Promise.all(i).then(()=>{t.length!=this._toasts.size&&(this._toasts=new Map(t))})},500)}disconnectedCallback(){super.disconnectedCallback(),this._interval&&clearTimeout(this._interval)}static init(){let t=document.querySelector("f-toast-container");return t||(t=document.createElement("f-toast-container"),document.body.appendChild(t)),t}get _toastsArray(){return Array.from(this._toasts).map(([,t])=>t)}get(t){if(!t)throw new Error('undefined "id" given when attempting to retrieve toast');if(typeof t!="string"&&!Number.isInteger(t))throw new Error('"id" must be number or string when attempting to retrieve toast');return this._toasts.get(t)}set(t){if(!t.id)throw new Error('invalid or undefined "id" on toast object');const s=this._toasts.set(t.id,{...t,duration:Date.now()+(t.duration||5e3)});return this._toasts=new Map(Array.from(this._toasts)),s}async del(t){if(!t)throw new Error('undefined "id" given when attempting to retrieve toast');if(typeof t!="string"&&!Number.isInteger(t))throw new Error('"id" must be number or string when attempting to retrieve toast');await this.renderRoot.querySelector(`#${t}`).collapse();const i=this._toasts.delete(t);return this._toasts=new Map(Array.from(this._toasts)),i}render(){return g`
      <link
        rel="stylesheet"
        type="text/css"
        href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css"
      />
      <aside class="${De.toasterContainer}">
        <div class="${De.toaster}" id="f-toast-container-list">
          ${xs(this._toastsArray,t=>t.id,t=>g` <f-toast
              class="w-full"
              id="${t.id}"
              type="${t.type}"
              text="${t.text}"
              ?canclose=${t.canclose}
              @close=${()=>this.del(t.id)}
            >
            </f-toast>`)}
        </div>
      </aside>
    `}}w(Ot,"styles",I`
    :host {
      display: block;
    }
  `),w(Ot,"properties",{_toasts:{state:!0}});customElements.get("f-toast-container")||customElements.define("f-toast-container",Ot);function Ai(e,t){if(!mt)return;const s=customElements.get("f-toast-container").init(),i={id:Date.now().toString(36)+Math.random().toString(36).slice(2,5),text:e,duration:5e3,type:"success",...t};return s.set(i),i}function Ei(e){return mt?customElements.get("f-toast-container").init().del(e):void 0}function Si(e,t){if(!mt)return;const s=customElements.get("f-toast-container").init();return s.set({...s.get(e),...t}),s.get(e)}class As extends N{constructor(){super(),this._messages=[],this.interval=3e4,this._hiddenMessageIds=[],this.url=mt?window.location.href:""}async connectedCallback(){if(super.connectedCallback(),!this.api){console.error('Broadcast "api" attribute invalid or undefined');return}mt&&(await this._fetchMessage(),setInterval(()=>this._fetchMessage(),this.interval))}async _fetchMessage(){const t=`${this.api}?path=${this.url}`;try{const s=await(await fetch(t)).json();this._messages=s.length?s:[]}catch{console.error(`failed to fetch broadcasts from given url (${t})`)}}async _del(t){await this.renderRoot.querySelector(`#broadcast-${t}`).collapse(),this._hiddenMessageIds=[...new Set([...this._hiddenMessageIds,t])]}render(){const t=this._messages.filter(s=>!this._hiddenMessageIds.includes(s.id));return g`
      <link
        rel="stylesheet"
        type="text/css"
        href="https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css"
      />
      <aside class=${`${t.length===0?"hidden":"mb-16"}`}>
        ${xs(t,({id:s})=>`broadcast-${s}`,({id:s,message:i})=>g`<f-toast
              class="w-full"
              id="broadcast-${s}"
              type="warning"
              text="${i}"
              canclose
              @close=${()=>this._del(s)}
            >
            </f-toast>`)}
      </aside>
    `}}w(As,"properties",{_messages:{state:!0,hasChanged(t,s){if(!s||s.length===0)return!0;const i=t.map(({id:r})=>r).sort(),n=s.map(({id:r})=>r).sort();return JSON.stringify(i)!==JSON.stringify(n)}},_hiddenMessageIds:{state:!0,type:Array},interval:{type:Number,attribute:!0,reflect:!0},url:{type:String,attribute:!0,reflect:!0},api:{type:String,attribute:!0,reflect:!0}});customElements.get("f-broadcast")||customElements.define("f-broadcast",As);function $t(e){return e.split("-")[0]}function jt(e){return e.split("-")[1]}function _t(e){return["top","bottom"].includes($t(e))?"x":"y"}function $e(e){return e==="y"?"height":"width"}function Fe(e,t,s){let{reference:i,floating:n}=e;const r=i.x+i.width/2-n.width/2,o=i.y+i.height/2-n.height/2,a=_t(t),c=$e(a),l=i[c]/2-n[c]/2,f=$t(t),h=a==="x";let u;switch(f){case"top":u={x:r,y:i.y-n.height};break;case"bottom":u={x:r,y:i.y+i.height};break;case"right":u={x:i.x+i.width,y:o};break;case"left":u={x:i.x-n.width,y:o};break;default:u={x:i.x,y:i.y}}switch(jt(t)){case"start":u[a]-=l*(s&&h?-1:1);break;case"end":u[a]+=l*(s&&h?-1:1);break}return u}const Ci=async(e,t,s)=>{const{placement:i="bottom",strategy:n="absolute",middleware:r=[],platform:o}=s,a=await(o.isRTL==null?void 0:o.isRTL(t));let c=await o.getElementRects({reference:e,floating:t,strategy:n}),{x:l,y:f}=Fe(c,i,a),h=i,u={},d=0;for(let p=0;p<r.length;p++){const{name:m,fn:v}=r[p],{x:b,y:$,data:E,reset:y}=await v({x:l,y:f,initialPlacement:i,placement:h,strategy:n,middlewareData:u,rects:c,platform:o,elements:{reference:e,floating:t}});if(l=b!=null?b:l,f=$!=null?$:f,u={...u,[m]:{...u[m],...E}},y&&d<=50){d++,typeof y=="object"&&(y.placement&&(h=y.placement),y.rects&&(c=y.rects===!0?await o.getElementRects({reference:e,floating:t,strategy:n}):y.rects),{x:l,y:f}=Fe(c,h,a)),p=-1;continue}}return{x:l,y:f,placement:h,strategy:n,middlewareData:u}};function ki(e){return{top:0,right:0,bottom:0,left:0,...e}}function Es(e){return typeof e!="number"?ki(e):{top:e,right:e,bottom:e,left:e}}function Pt(e){return{...e,top:e.y,left:e.x,right:e.x+e.width,bottom:e.y+e.height}}async function Ss(e,t){var s;t===void 0&&(t={});const{x:i,y:n,platform:r,rects:o,elements:a,strategy:c}=e,{boundary:l="clippingAncestors",rootBoundary:f="viewport",elementContext:h="floating",altBoundary:u=!1,padding:d=0}=t,p=Es(d),v=a[u?h==="floating"?"reference":"floating":h],b=Pt(await r.getClippingRect({element:(s=await(r.isElement==null?void 0:r.isElement(v)))==null||s?v:v.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(a.floating)),boundary:l,rootBoundary:f,strategy:c})),$=Pt(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({rect:h==="floating"?{...o.floating,x:i,y:n}:o.reference,offsetParent:await(r.getOffsetParent==null?void 0:r.getOffsetParent(a.floating)),strategy:c}):o[h]);return{top:b.top-$.top+p.top,bottom:$.bottom-b.bottom+p.bottom,left:b.left-$.left+p.left,right:$.right-b.right+p.right}}const Ti=Math.min,Oi=Math.max;function oe(e,t,s){return Oi(e,Ti(t,s))}const Pi=e=>({name:"arrow",options:e,async fn(t){const{element:s,padding:i=0}=e!=null?e:{},{x:n,y:r,placement:o,rects:a,platform:c}=t;if(s==null)return{};const l=Es(i),f={x:n,y:r},h=_t(o),u=jt(o),d=$e(h),p=await c.getDimensions(s),m=h==="y"?"top":"left",v=h==="y"?"bottom":"right",b=a.reference[d]+a.reference[h]-f[h]-a.floating[d],$=f[h]-a.reference[h],E=await(c.getOffsetParent==null?void 0:c.getOffsetParent(s));let y=E?h==="y"?E.clientHeight||0:E.clientWidth||0:0;y===0&&(y=a.floating[d]);const R=b/2-$/2,A=l[m],z=y-p[d]-l[v],P=y/2-p[d]/2+R,S=oe(A,P,z),L=(u==="start"?l[m]:l[v])>0&&P!==S&&a.reference[d]<=a.floating[d]?P<A?A-P:z-P:0;return{[h]:f[h]-L,data:{[h]:S,centerOffset:P-S}}}}),Li={left:"right",right:"left",bottom:"top",top:"bottom"};function Lt(e){return e.replace(/left|right|bottom|top/g,t=>Li[t])}function Ni(e,t,s){s===void 0&&(s=!1);const i=jt(e),n=_t(e),r=$e(n);let o=n==="x"?i===(s?"end":"start")?"right":"left":i==="start"?"bottom":"top";return t.reference[r]>t.floating[r]&&(o=Lt(o)),{main:o,cross:Lt(o)}}const Mi={start:"end",end:"start"};function Ze(e){return e.replace(/start|end/g,t=>Mi[t])}function Ri(e){const t=Lt(e);return[Ze(e),t,Ze(t)]}const Bi=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var s;const{placement:i,middlewareData:n,rects:r,initialPlacement:o,platform:a,elements:c}=t,{mainAxis:l=!0,crossAxis:f=!0,fallbackPlacements:h,fallbackStrategy:u="bestFit",flipAlignment:d=!0,...p}=e,m=$t(i),b=h||(m===o||!d?[Lt(o)]:Ri(o)),$=[o,...b],E=await Ss(t,p),y=[];let R=((s=n.flip)==null?void 0:s.overflows)||[];if(l&&y.push(E[m]),f){const{main:S,cross:C}=Ni(i,r,await(a.isRTL==null?void 0:a.isRTL(c.floating)));y.push(E[S],E[C])}if(R=[...R,{placement:i,overflows:y}],!y.every(S=>S<=0)){var A,z;const S=((A=(z=n.flip)==null?void 0:z.index)!=null?A:0)+1,C=$[S];if(C)return{data:{index:S,overflows:R},reset:{placement:C}};let k="bottom";switch(u){case"bestFit":{var P;const L=(P=R.map(T=>[T,T.overflows.filter(F=>F>0).reduce((F,Vt)=>F+Vt,0)]).sort((T,F)=>T[1]-F[1])[0])==null?void 0:P[0].placement;L&&(k=L);break}case"initialPlacement":k=o;break}if(i!==k)return{reset:{placement:k}}}return{}}}};async function Hi(e,t){const{placement:s,platform:i,elements:n}=e,r=await(i.isRTL==null?void 0:i.isRTL(n.floating)),o=$t(s),a=jt(s),c=_t(s)==="x",l=["left","top"].includes(o)?-1:1,f=r&&c?-1:1,h=typeof t=="function"?t(e):t;let{mainAxis:u,crossAxis:d,alignmentAxis:p}=typeof h=="number"?{mainAxis:h,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...h};return a&&typeof p=="number"&&(d=a==="end"?p*-1:p),c?{x:d*f,y:u*l}:{x:u*l,y:d*f}}const Ii=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){const{x:s,y:i}=t,n=await Hi(t,e);return{x:s+n.x,y:i+n.y,data:n}}}};function ji(e){return e==="x"?"y":"x"}const Ui=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:s,y:i,placement:n}=t,{mainAxis:r=!0,crossAxis:o=!1,limiter:a={fn:v=>{let{x:b,y:$}=v;return{x:b,y:$}}},...c}=e,l={x:s,y:i},f=await Ss(t,c),h=_t($t(n)),u=ji(h);let d=l[h],p=l[u];if(r){const v=h==="y"?"top":"left",b=h==="y"?"bottom":"right",$=d+f[v],E=d-f[b];d=oe($,d,E)}if(o){const v=u==="y"?"top":"left",b=u==="y"?"bottom":"right",$=p+f[v],E=p-f[b];p=oe($,p,E)}const m=a.fn({...t,[h]:d,[u]:p});return{...m,data:{x:m.x-s,y:m.y-i}}}}};function Cs(e){return e&&e.document&&e.location&&e.alert&&e.setInterval}function q(e){if(e==null)return window;if(!Cs(e)){const t=e.ownerDocument;return t&&t.defaultView||window}return e}function xt(e){return q(e).getComputedStyle(e)}function W(e){return Cs(e)?"":e?(e.nodeName||"").toLowerCase():""}function ks(){const e=navigator.userAgentData;return e!=null&&e.brands?e.brands.map(t=>t.brand+"/"+t.version).join(" "):navigator.userAgent}function H(e){return e instanceof q(e).HTMLElement}function ot(e){return e instanceof q(e).Element}function Di(e){return e instanceof q(e).Node}function _e(e){if(typeof ShadowRoot>"u")return!1;const t=q(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Ut(e){const{overflow:t,overflowX:s,overflowY:i}=xt(e);return/auto|scroll|overlay|hidden/.test(t+i+s)}function Vi(e){return["table","td","th"].includes(W(e))}function Ts(e){const t=/firefox/i.test(ks()),s=xt(e);return s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].includes(s.willChange)||t&&s.willChange==="filter"||t&&(s.filter?s.filter!=="none":!1)}function Os(){return!/^((?!chrome|android).)*safari/i.test(ks())}const Ke=Math.min,dt=Math.max,Nt=Math.round;function Q(e,t,s){var i,n,r,o;t===void 0&&(t=!1),s===void 0&&(s=!1);const a=e.getBoundingClientRect();let c=1,l=1;t&&H(e)&&(c=e.offsetWidth>0&&Nt(a.width)/e.offsetWidth||1,l=e.offsetHeight>0&&Nt(a.height)/e.offsetHeight||1);const f=ot(e)?q(e):window,h=!Os()&&s,u=(a.left+(h&&(i=(n=f.visualViewport)==null?void 0:n.offsetLeft)!=null?i:0))/c,d=(a.top+(h&&(r=(o=f.visualViewport)==null?void 0:o.offsetTop)!=null?r:0))/l,p=a.width/c,m=a.height/l;return{width:p,height:m,top:d,right:u+p,bottom:d+m,left:u,x:u,y:d}}function K(e){return((Di(e)?e.ownerDocument:e.document)||window.document).documentElement}function Dt(e){return ot(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function Ps(e){return Q(K(e)).left+Dt(e).scrollLeft}function Wi(e){const t=Q(e);return Nt(t.width)!==e.offsetWidth||Nt(t.height)!==e.offsetHeight}function qi(e,t,s){const i=H(t),n=K(t),r=Q(e,i&&Wi(t),s==="fixed");let o={scrollLeft:0,scrollTop:0};const a={x:0,y:0};if(i||!i&&s!=="fixed")if((W(t)!=="body"||Ut(n))&&(o=Dt(t)),H(t)){const c=Q(t,!0);a.x=c.x+t.clientLeft,a.y=c.y+t.clientTop}else n&&(a.x=Ps(n));return{x:r.left+o.scrollLeft-a.x,y:r.top+o.scrollTop-a.y,width:r.width,height:r.height}}function Ls(e){return W(e)==="html"?e:e.assignedSlot||e.parentNode||(_e(e)?e.host:null)||K(e)}function Ge(e){return!H(e)||getComputedStyle(e).position==="fixed"?null:e.offsetParent}function zi(e){let t=Ls(e);for(_e(t)&&(t=t.host);H(t)&&!["html","body"].includes(W(t));){if(Ts(t))return t;t=t.parentNode}return null}function le(e){const t=q(e);let s=Ge(e);for(;s&&Vi(s)&&getComputedStyle(s).position==="static";)s=Ge(s);return s&&(W(s)==="html"||W(s)==="body"&&getComputedStyle(s).position==="static"&&!Ts(s))?t:s||zi(e)||t}function Xe(e){if(H(e))return{width:e.offsetWidth,height:e.offsetHeight};const t=Q(e);return{width:t.width,height:t.height}}function Fi(e){let{rect:t,offsetParent:s,strategy:i}=e;const n=H(s),r=K(s);if(s===r)return t;let o={scrollLeft:0,scrollTop:0};const a={x:0,y:0};if((n||!n&&i!=="fixed")&&((W(s)!=="body"||Ut(r))&&(o=Dt(s)),H(s))){const c=Q(s,!0);a.x=c.x+s.clientLeft,a.y=c.y+s.clientTop}return{...t,x:t.x-o.scrollLeft+a.x,y:t.y-o.scrollTop+a.y}}function Zi(e,t){const s=q(e),i=K(e),n=s.visualViewport;let r=i.clientWidth,o=i.clientHeight,a=0,c=0;if(n){r=n.width,o=n.height;const l=Os();(l||!l&&t==="fixed")&&(a=n.offsetLeft,c=n.offsetTop)}return{width:r,height:o,x:a,y:c}}function Ki(e){var t;const s=K(e),i=Dt(e),n=(t=e.ownerDocument)==null?void 0:t.body,r=dt(s.scrollWidth,s.clientWidth,n?n.scrollWidth:0,n?n.clientWidth:0),o=dt(s.scrollHeight,s.clientHeight,n?n.scrollHeight:0,n?n.clientHeight:0);let a=-i.scrollLeft+Ps(e);const c=-i.scrollTop;return xt(n||s).direction==="rtl"&&(a+=dt(s.clientWidth,n?n.clientWidth:0)-r),{width:r,height:o,x:a,y:c}}function Ns(e){const t=Ls(e);return["html","body","#document"].includes(W(t))?e.ownerDocument.body:H(t)&&Ut(t)?t:Ns(t)}function Ms(e,t){var s;t===void 0&&(t=[]);const i=Ns(e),n=i===((s=e.ownerDocument)==null?void 0:s.body),r=q(i),o=n?[r].concat(r.visualViewport||[],Ut(i)?i:[]):i,a=t.concat(o);return n?a:a.concat(Ms(o))}function Gi(e,t){const s=t.getRootNode==null?void 0:t.getRootNode();if(e.contains(t))return!0;if(s&&_e(s)){let i=t;do{if(i&&e===i)return!0;i=i.parentNode||i.host}while(i)}return!1}function Xi(e,t){const s=Q(e,!1,t==="fixed"),i=s.top+e.clientTop,n=s.left+e.clientLeft;return{top:i,left:n,x:n,y:i,right:n+e.clientWidth,bottom:i+e.clientHeight,width:e.clientWidth,height:e.clientHeight}}function Ye(e,t,s){return t==="viewport"?Pt(Zi(e,s)):ot(t)?Xi(t,s):Pt(Ki(K(e)))}function Yi(e){const t=Ms(e),i=["absolute","fixed"].includes(xt(e).position)&&H(e)?le(e):e;return ot(i)?t.filter(n=>ot(n)&&Gi(n,i)&&W(n)!=="body"):[]}function Ji(e){let{element:t,boundary:s,rootBoundary:i,strategy:n}=e;const o=[...s==="clippingAncestors"?Yi(t):[].concat(s),i],a=o[0],c=o.reduce((l,f)=>{const h=Ye(t,f,n);return l.top=dt(h.top,l.top),l.right=Ke(h.right,l.right),l.bottom=Ke(h.bottom,l.bottom),l.left=dt(h.left,l.left),l},Ye(t,a,n));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}const Qi={getClippingRect:Ji,convertOffsetParentRelativeRectToViewportRelativeRect:Fi,isElement:ot,getDimensions:Xe,getOffsetParent:le,getDocumentElement:K,getElementRects:e=>{let{reference:t,floating:s,strategy:i}=e;return{reference:qi(t,le(s),i),floating:{...Xe(s),x:0,y:0}}},getClientRects:e=>Array.from(e.getClientRects()),isRTL:e=>xt(e).direction==="rtl"},tn=(e,t,s)=>Ci(e,t,{platform:Qi,...s}),vt="top",yt="bottom",Mt="left",Rt="right",Yt={[vt]:yt,[yt]:vt,[Mt]:Rt,[Rt]:Mt},en={[vt]:"\u2191",[yt]:"\u2193",[Mt]:"\u2190",[Rt]:"\u2192"},sn={[Mt]:-45,[vt]:45,[Rt]:135,[yt]:-135},Je="calc(50% - 7px)",nn=e=>[vt,yt].includes(e);function rn({actualDirection:e,directionName:t,arrowEl:s}){if(!s)return;e=t;const i=nn(t);s.style.left=i?Je:"",s.style.top=i?"":Je}async function on(e){var n,r;if(!e.isShowing)return;if(await((n=e==null?void 0:e.waitForDOM)==null?void 0:n.call(e)),e.isCallout)return rn(e);const t=await tn(e.targetEl,e.attentionEl,{placement:e.directionName,middleware:[Bi(),Ii(8),Ui({padding:16}),Pi({element:e.noArrow?void 0:e.arrowEl})]});e.actualDirection=t.placement,Object.assign(((r=e.attentionEl)==null?void 0:r.style)||{},{left:"0",top:"0",transform:`translate3d(${Math.round(t.x)}px, ${Math.round(t.y)}px, 0)`});let{x:s,y:i}=t.middlewareData.arrow;e.arrowEl&&(e.arrowEl.style.left=s?s+"px":"",e.arrowEl.style.top=i?i+"px":"")}class ae extends It(M){constructor(){super(),this.show=!1,this.tooltip=!1,this.callout=!1,this.popover=!1,this.noArrow=!1}connectedCallback(){if(super.connectedCallback(),!this.placement||!Object.keys(Yt).includes(this.placement))throw new Error(`Invalid "placement" attribute. Set its value to one of the following:
${JSON.stringify(Object.keys(Yt))}`);setTimeout(()=>this.requestUpdate(),0)}get _actualDirection(){return this.placement}set _actualDirection(t){this.placement=t}get _arrowDirection(){return Yt[this.placement]}updated(){this.callout||this._attentionEl.style.setProperty("--attention-visibility",this.show?"":"hidden"),this.tooltip||this._attentionEl.style.setProperty("--attention-display",this.show?"block":"none"),this.attentionState={isShowing:this.show,isCallout:this.callout,actualDirection:this._actualDirection,directionName:this.placement,arrowEl:this.renderRoot.querySelector("#arrow"),attentionEl:this._attentionEl,targetEl:this._targetEl,noArrow:this.noArrow},on(this.attentionState)}setAriaLabels(){if(this._targetEl&&!this._targetEl.getAttribute("aria-describedby")){const t=this._messageEl.id||(this._messageEl.id=ps());this._messageEl.setAttribute("role","tooltip"),this._targetEl.setAttribute("aria-describedby",t)}}firstUpdated(){this.setAriaLabels(),this.callout&&(this._attentionEl.style.position="relative")}get _attentionEl(){return this.renderRoot.querySelector("#attention")}get _targetEl(){return this.renderRoot.querySelector("slot[name='target']").assignedNodes()[0]}get _messageEl(){return this.renderRoot.querySelector("slot[name='message']").assignedNodes()[0]}get _wrapperClasses(){return Ie({[Z.base]:!0,[Z.tooltip]:this.tooltip,[Z.callout]:this.callout,[Z.popover]:this.popover})}get _arrowClasses(){return Ie({[Z.arrowBase]:!0,[`-${this._arrowDirection}-8`]:!0,[Z.arrowTooltip]:this.tooltip,[Z.arrowCallout]:this.callout,[Z.arrowPopover]:this.popover})}get _arrowHtml(){return this.noArrow?"":g`<div
          id="arrow"
          role="img"
          aria-label=${en[this._arrowDirection]}
          class="${this._arrowClasses}"
          style="transform:rotate(${sn[this._arrowDirection]}deg);
          margin-${this._arrowDirection.charAt(0).toLowerCase()+this._arrowDirection.slice(1)}:-0.5px;"
        />`}render(){return g`
      ${this._fabricStylesheet}
      <div class=${_(this.className?this.className:void 0)}>
        ${this.placement==="right"||this.placement==="bottom"?g`
              <slot name="target"></slot>
              <div id="attention" class="${this._wrapperClasses}">
                <div>
                  ${this._arrowHtml}
                  <slot name="message"></slot>
                </div>
              </div>
            `:g`
              <div id="attention" class="${this._wrapperClasses}">
                <div>
                  <slot name="message"></slot>
                  ${this._arrowHtml}
                </div>
              </div>
              <slot name="target"></slot>
            `}
      </div>
    `}}w(ae,"properties",{show:{type:Boolean,reflect:!0},placement:{type:String},tooltip:{type:Boolean,reflect:!0},callout:{type:Boolean,reflect:!0},popover:{type:Boolean,reflect:!0},noArrow:{type:Boolean,reflect:!0}}),w(ae,"styles",I`
    #attention {
      position: absolute;
      z-index: 50;
      visibility: var(--attention-visibility);
      display: var(--attention-display);
    }

    #arrow {
      border-top-left-radius: 4px;
      z-index: 1;
    }
  `);customElements.get("f-attention")||customElements.define("f-attention",ae);class ce extends M{constructor(){super(),this.type="text"}get _outerWrapperStyles(){return B({"has-suffix":this._hasSuffix,"has-prefix":this._hasPrefix})}get _innerWrapperStyles(){return B({"input mb-0":!0,"input--is-invalid":this.invalid,"input--is-disabled":this.disabled,"input--is-read-only":this.readOnly})}get _label(){if(this.label)return g`<label for="${this._id}">${this.label}</label>`}get _helpId(){if(this.helpText)return`${this._id}__hint`}get _id(){return"textfield"}get _error(){if(this.invalid&&this._helpId)return this._helpId}handler(t){const{name:s,value:i}=t.target,n=new CustomEvent(t.type,{detail:{name:s,value:i,target:t.target}});this.dispatchEvent(n)}prefixSlotChange(t){this.renderRoot.querySelector("slot[name=prefix]").assignedElements().length&&(this._hasPrefix=!0)}suffixSlotChange(t){this.renderRoot.querySelector("slot[name=suffix]").assignedElements().length&&(this._hasSuffix=!0)}render(){return g`
      ${this._fabricStylesheet}
      <div class="${this._outerWrapperStyles}">
        <div class="${this._innerWrapperStyles}">
          ${this._label}
          <div class="relative">
            <slot @slotchange="${this.prefixSlotChange}" name="prefix"></slot>
            <input
              type="${this.type}"
              min="${_(this.min)}"
              max="${_(this.max)}"
              size="${_(this.size)}"
              minlength="${_(this.minLength)}"
              maxlength="${_(this.maxLength)}"
              name="${_(this.name)}"
              pattern="${_(this.pattern)}"
              placeholder="${_(this.placeholder)}"
              value="${_(this.value)}"
              aria-describedby="${_(this._helpId)}"
              aria-errormessage="${_(this._error)}"
              aria-invalid="${_(this.invalid)}"
              id="${this._id}"
              ?disabled="${this.disabled}"
              ?readonly="${this.readOnly}"
              ?required="${this.required}"
              @blur="${this.handler}"
              @change="${this.handler}"
              @focus="${this.handler}"
            />
            <slot @slotchange="${this.suffixSlotChange}" name="suffix"></slot>
          </div>
          ${this.helpText&&g`<div class="input__sub-text" id="${this._helpId}">${this.helpText}</div>`}
        </div>
      </div>
    `}}w(ce,"properties",{disabled:{type:Boolean},invalid:{type:Boolean},id:{type:String},label:{type:String},helpText:{type:String,attribute:"help-text"},size:{type:String},max:{type:Number},min:{type:Number},minLength:{type:Number,attribute:"min-length"},maxLength:{type:Number,attribute:"max-length"},name:{type:String},pattern:{type:String},placeholder:{type:String},readOnly:{type:Boolean,attribute:"read-only"},required:{type:Boolean},type:{type:String},value:{type:String},_hasPrefix:{state:!0},_hasSuffix:{state:!0}}),w(ce,"styles",I`
    :host {
      display: block;
    }
    ::slotted(:last-child) {
      margin-bottom: 0px !important;
    }
  `);customElements.get("f-textfield")||customElements.define("f-textfield",ce);const ln='<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.5 5.5 8 11l5.5-5.5"></path>';class Qe extends N{get attrs(){const t={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"none",viewBox:"0 0 16 16"};return Array.from(this.attributes).forEach(({nodeName:s,nodeValue:i})=>t[s]=i),Object.entries(t).map(([s,i])=>`${s}="${i}"`).join(" ")}render(){return g`${wt(`<svg ${this.attrs}>${ln}</svg>`)}`}}customElements.get("f-icon-chevron-down16",Qe)||customElements.define("f-icon-chevron-down16",Qe);class he extends It(M){constructor(){super(),this.expanded=!1,this.animated=!1,this.info=!1,this.box=!1,this.bleed=!1,this.noChevron=!1,this._hasTitle=!0}firstUpdated(){this._hasTitle=!!this.title||this.renderRoot.querySelector("slot[name='title']").assignedNodes().length>0}get _expandableSlot(){return g`<div
      class=${B({[this.contentClass||""]:!0,[et.box+(this._hasTitle?" pt-0":"")]:this.box})}
    >
      <slot></slot>
    </div>`}render(){return g`${this._fabricStylesheet}
      <div
        class=${B({"bg-aqua-50":this.info,["py-0 px-0 "+et.box]:this.box,[et.bleed]:this.bleed})}
      >
        ${this._hasTitle?g`<f-unstyled-heading level=${this.headingLevel}>
              <button
                type="button"
                aria-expanded="${this.expanded}"
                class=${B({[this.buttonClass||""]:!0,[ci+" hover:underline focus:underline"]:!0,["w-full text-left relative "+et.box]:this.box,"hover:text-aqua-700 active:text-aqua-800":this.info})}
                @click=${()=>this.expanded=!this.expanded}
              >
                <div class="flex justify-between align-center">
                  ${this.title?g`<span class="h4">${this.title}</span>`:g`<slot name="title"></slot>`}
                  ${this.noChevron?"":g`<div
                        class=${B({"self-center transform transition-transform":!0,"-rotate-180":this.expanded,"relative left-8":!this.box,"box-chevron":this.box})}
                      >
                        <f-icon-chevron-down16></f-icon-chevron-down16>
                      </div>`}
                </div>
              </button>
            </f-unstyled-heading>`:""}
        ${this.animated?g`<f-expand-transition ?show=${this.expanded}>
              ${this._expandableSlot}
            </f-expand-transition>`:g`<div
              class=${B({"overflow-hidden":!0,"h-0 invisible":!this.expanded})}
              aria-hidden=${_(this.expanded?void 0:!0)}
            >
              ${this._expandableSlot}
            </div>`}
      </div>`}}w(he,"properties",{expanded:{type:Boolean,reflect:!0},title:{type:String},info:{type:Boolean},box:{type:Boolean},bleed:{type:Boolean},buttonClass:{type:String},contentClass:{type:String},noChevron:{type:Boolean},animated:{type:Boolean},headingLevel:{type:Number},_hasTitle:{type:Boolean,state:!0}}),w(he,"styles",I`
    :host {
      display: block;
    }
    ::slotted(:last-child) {
      margin-bottom: 0px !important;
    }
  `);customElements.get("f-expandable")||customElements.define("f-expandable",he);const an=g`
  <svg
    role="img"
    aria-label="X"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.03 2.97a.75.75 0 00-1.06 1.06L6.94 8l-3.97 3.97a.75.75 0 101.06 1.06L8 9.06l3.97 3.97a.75.75 0 101.06-1.06L9.06 8l3.97-3.97a.75.75 0 00-1.06-1.06L8 6.94 4.03 2.97z"
      clipRule="evenodd"
    />
  </svg>
`,cn=g`
  <svg
    role="img"
    aria-label="Forstørrelsesglass"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      clipPath="url(#nra-cclip0)"
    >
      <path d="M8.796 11.803A5.684 5.684 0 104.349 1.341a5.684 5.684 0 004.447 10.462zM11 11l4 4" />
    </g>
    <defs>
      <clipPath id="nra-cclip0">
        <path fill="currentColor" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
`;class Rs extends M{get _classBase(){return this.slot==="suffix"?hi:ui}get _classes(){return B({[this._classBase.wrapper]:!0,[this._classBase.wrapperWithLabel]:this.label,[this._classBase.wrapperWithIcon]:!this.label})}get _searchButton(){return g`
      <button aria-label="${_(this.ariaLabel)}" class="${this._classes}" type="submit">
        ${cn}
      </button>
    `}get _clearButton(){return g`
      <button aria-label="${_(this.ariaLabel)}" class="${this._classes}" type="reset">
        ${an}
      </button>
    `}get _text(){return g`
      <div class="${this._classes}">
        <span class="${this._classBase.label}">${this.label}</span>
      </div>
    `}get _markup(){if(this.label)return this._text;if(this.search)return this._searchButton;if(this.clear)return this._clearButton}render(){return g`${this._fabricStylesheet}${this._markup}`}}w(Rs,"properties",{ariaLabel:{type:String,attribute:"aria-label"},clear:{type:Boolean},search:{type:Boolean},label:{type:String}});customElements.get("f-affix")||customElements.define("f-affix",Rs);class ue extends M{constructor(){super(),this.show=!1,this._mounted=!1,this._removeElement=!1}willUpdate(){this._mounted||(this._removeElement=!this.show),this.show&&this._removeElement&&(this._removeElement=!1)}updated(){if(!!this._wrapper){if(!this._mounted){this._mounted=!0;return}this.show&&$s(this._wrapper),!this.show&&!this._removeElement&&_s(this._wrapper,()=>this._removeElement=!0)}}get _wrapper(){return this!=null?this:null}render(){return g`<div aria-hidden=${_(this.show?void 0:"true")}>
      ${this._removeElement?g``:g`<slot></slot>`}
    </div>`}}w(ue,"properties",{show:{type:Boolean,reflect:!0},_removeElement:{type:Boolean,state:!0}}),w(ue,"styles",I`
    :host {
      display: block;
    }
  `);customElements.get("f-expand-transition")||customElements.define("f-expand-transition",ue);class Bs extends M{get _markup(){return`<h${this.level}
    style="margin: 0; font-weight: unset; font-size: unset; line-height: unset;"
  >
    <slot></slot>
  </h${this.level}>
`}render(){return this.level?wt(this._markup):g`<slot></slot>`}}w(Bs,"properties",{level:{type:Number}});customElements.get("f-unstyled-heading")||customElements.define("f-unstyled-heading",Bs);const hn='<title>H\xE5ndveske</title><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 14.5V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v11.5"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12.222 6H3.777a2 2 0 0 0-1.986 1.766l-.53 4.5A2 2 0 0 0 3.25 14.5h9.502a2 2 0 0 0 1.986-2.234l-.53-4.5A2 2 0 0 0 12.222 6Z"></path>';class ts extends N{get attrs(){const t={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"none",viewBox:"0 0 16 16"};return Array.from(this.attributes).forEach(({nodeName:s,nodeValue:i})=>t[s]=i),Object.entries(t).map(([s,i])=>`${s}="${i}"`).join(" ")}render(){return g`${wt(`<svg ${this.attrs}>${hn}</svg>`)}`}}customElements.get("f-icon-bag16",ts)||customElements.define("f-icon-bag16",ts);window.FabricToastContainer=Ot;window.toast=Ai;window.updateToast=Si;window.removeToast=Ei;
