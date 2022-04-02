"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[520],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return f}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),c=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=c(e.components);return r.createElement(l.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},p=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(t),f=a,m=p["".concat(l,".").concat(f)]||p[f]||d[f]||i;return t?r.createElement(m,o(o({ref:n},u),{},{components:t})):r.createElement(m,o({ref:n},u))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=p;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var c=2;c<i;c++)o[c]=t[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}p.displayName="MDXCreateElement"},5162:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return l},default:function(){return f},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return d}});var r=t(7462),a=t(3366),i=(t(7294),t(3905)),o=["components"],s={sidebar_position:1},l="Defining additional interfaces",c={unversionedId:"advanced-usages/extend-base",id:"advanced-usages/extend-base",title:"Defining additional interfaces",description:"Further extending the extended class is also possible.",source:"@site/docs/advanced-usages/extend-base.md",sourceDirName:"advanced-usages",slug:"/advanced-usages/extend-base",permalink:"/docs/advanced-usages/extend-base",editUrl:"https://github.com/inhibitor1217/extended-enum/docs/advanced-usages/extend-base.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Matches",permalink:"/docs/extended-features/matches"},next:{title:"Overriding default behaviors",permalink:"/docs/advanced-usages/override"}},u={},d=[],p={toc:d};function f(e){var n=e.components,t=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"defining-additional-interfaces"},"Defining additional interfaces"),(0,i.kt)("p",null,"Further extending the ",(0,i.kt)("inlineCode",{parentName:"p"},"extend"),"ed class is also possible."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Define an interface for additional methods or getters.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"interface IAnimal {\n  readonly favorite: boolean;\n  walks(): boolean;\n  code(prefix: string): string;\n}\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Provide the interface as ",(0,i.kt)("strong",{parentName:"li"},"third type paramter")," when ",(0,i.kt)("inlineCode",{parentName:"li"},"extend"),"ing the enum.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"enum _Animal { Cat, Dog, Eagle }\n\nclass Animal extends extend<typeof _Animal, _Animal, IAnimal>(_Animal) {\n\n}\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Implement the attached interface.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"class Animal extends extend<typeof _Animal, _Animal, IAnimal>(_Animal) {\n\n  get favorite(): boolean {\n    return this.is(Animal.Dog);\n  }\n\n  walks(): boolean {\n    return this.isNot(Animal.Eagle);\n  }\n\n  code(prefix: string): string {\n    return `${prefix}:${this.toString()}`;\n  }\n\n}\n")))}f.isMDXComponent=!0}}]);