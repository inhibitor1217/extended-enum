"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[852],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),u=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=u(e.components);return r.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=u(n),m=a,f=c["".concat(p,".").concat(m)]||c[m]||s[m]||i;return n?r.createElement(f,o(o({ref:t},d),{},{components:n})):r.createElement(f,o({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=c;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var u=2;u<i;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},2018:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return p},default:function(){return m},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return s}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],l={sidebar_position:1},p="Get Started",u={unversionedId:"get-started",id:"get-started",title:"Get Started",description:"Installation",source:"@site/docs/get-started.md",sourceDirName:".",slug:"/get-started",permalink:"/extended-enum/docs/get-started",editUrl:"https://github.com/inhibitor1217/extended-enum/docs/get-started.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Basics",permalink:"/extended-enum/docs/basic"}},d={},s=[{value:"Installation",id:"installation",level:2},{value:"Peer dependencies",id:"peer-dependencies",level:3},{value:"TL;DR",id:"tldr",level:2},{value:"What should I do next?",id:"what-should-i-do-next",level:2}],c={toc:s};function m(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"get-started"},"Get Started"),(0,i.kt)("h2",{id:"installation"},"Installation"),(0,i.kt)("p",null,"Install the package via ",(0,i.kt)("inlineCode",{parentName:"p"},"npm")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"yarn"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# npm\nnpm i extended-enum@latest\n\n# yarn\nyarn add extended-enum@latest\n")),(0,i.kt)("h3",{id:"peer-dependencies"},"Peer dependencies"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"extended-enum")," requires ",(0,i.kt)("inlineCode",{parentName:"p"},"typescript")," with version ",(0,i.kt)("inlineCode",{parentName:"p"},"4.1.2")," or higher."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# npm\nnpm i -D typescript@^4.1.2\n\n# yarn\nyarn add -D typescript@^4.1.2\n")),(0,i.kt)("h2",{id:"tldr"},"TL;DR"),(0,i.kt)("p",null,"Import ",(0,i.kt)("inlineCode",{parentName:"p"},"extend")," magic function from ",(0,i.kt)("inlineCode",{parentName:"p"},"extended-enum")," package. Wrap a TypeScript ",(0,i.kt)("inlineCode",{parentName:"p"},"enum")," with ",(0,i.kt)("inlineCode",{parentName:"p"},"extend"),", using the following syntax."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"import { extend } from 'extended-enum';\n\nenum _Fruit { Apple, Orange, Pear, Strawberry }\n\n// note: ensure to specify the type parameters correctly\nclass Fruit extends extend<typeof _Fruit, _Fruit>(_Fruit) {}\n")),(0,i.kt)("p",null,"Now, you are good to go!"),(0,i.kt)("blockquote",null,(0,i.kt)("h3",{parentName:"blockquote",id:"\ufe0f-warnings"},"\u26a0\ufe0f Warnings"),(0,i.kt)("ul",{parentName:"blockquote"},(0,i.kt)("li",{parentName:"ul"},"You cannot ",(0,i.kt)("inlineCode",{parentName:"li"},"extend")," a ",(0,i.kt)("inlineCode",{parentName:"li"},"const enum"),"."))),(0,i.kt)("h2",{id:"what-should-i-do-next"},"What should I do next?"),(0,i.kt)("p",null,"If your existing code was using native TypeScript enums, simply ",(0,i.kt)("inlineCode",{parentName:"p"},"extend"),"ing them should require no or very little migration. You may use native features from TypeScript enums as they are."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"extend"),"ed enums do not break the original enum, so your project could choose to migrate into ",(0,i.kt)("inlineCode",{parentName:"p"},"extend"),"ed enums gradually."),(0,i.kt)("p",null,"The magic utility, ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"extend")," provides additional utilities attached to the native behavior"),". Read ",(0,i.kt)("a",{parentName:"p",href:"/docs/extended-features/parsing"},"Extended Features")," section to explore the benefits."))}m.isMDXComponent=!0}}]);