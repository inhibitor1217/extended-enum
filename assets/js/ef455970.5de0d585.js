"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[550],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return f}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),d=s(r),f=a,m=d["".concat(l,".").concat(f)]||d[f]||c[f]||i;return r?n.createElement(m,o(o({ref:t},p),{},{components:r})):n.createElement(m,o({ref:t},p))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=d;var u={};for(var l in t)hasOwnProperty.call(t,l)&&(u[l]=t[l]);u.originalType=e,u.mdxType="string"==typeof e?e:a,o[1]=u;for(var s=2;s<i;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},10:function(e,t,r){r.r(t),r.d(t,{assets:function(){return p},contentTitle:function(){return l},default:function(){return f},frontMatter:function(){return u},metadata:function(){return s},toc:function(){return c}});var n=r(7462),a=r(3366),i=(r(7294),r(3905)),o=["components"],u={sidebar_position:2},l="Iteration",s={unversionedId:"extended-features/iteration",id:"extended-features/iteration",title:"Iteration",description:"Symbol.iterator",source:"@site/docs/extended-features/iteration.md",sourceDirName:"extended-features",slug:"/extended-features/iteration",permalink:"/docs/extended-features/iteration",editUrl:"https://github.com/inhibitor1217/extended-enum/docs/extended-features/iteration.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Parsing",permalink:"/docs/extended-features/parsing"},next:{title:"Matches",permalink:"/docs/extended-features/matches"}},p={},c=[{value:"<code>[Symbol.iterator]()</code>",id:"symboliterator",level:2},{value:"<code>values()</code>",id:"values",level:2},{value:"<code>keys()</code>",id:"keys",level:2},{value:"<code>entries()</code>",id:"entries",level:2}],d={toc:c};function f(e){var t=e.components,r=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"iteration"},"Iteration"),(0,i.kt)("h2",{id:"symboliterator"},(0,i.kt)("inlineCode",{parentName:"h2"},"[Symbol.iterator]()")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"extend"),"ed enum ",(0,i.kt)("strong",{parentName:"p"},"itself is an ES6 iterable"),". Iteration through the values is possible with ",(0,i.kt)("inlineCode",{parentName:"p"},"for .. of")," syntax, spread operator, or via similar methods. The values are iterated by its definition order."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"enum _Fruit {\n  Apple = 'apple',\n  Orange = 'orange',\n  Pear = 'pear',\n  Strawberry = 'strawberry',\n}\nclass Fruit extends extend<typeof _Fruit, _Fruit>(_Fruit) {}\n\n// USAGE\n\n/**\n * Prints:\n * \"apple\"\n * \"orange\"\n * \"pear\"\n * \"strawberry\"\n */\nfor (const fruit of Fruit) {\n  console.log(fruit.toString());\n}\n\n// [Fruit.Apple, Fruit.Orange, Fruit.Pear, Fruit.Strawberry]\nconst fruits = [...Fruit];\n")),(0,i.kt)("h2",{id:"values"},(0,i.kt)("inlineCode",{parentName:"h2"},"values()")),(0,i.kt)("p",null,"An alias of ",(0,i.kt)("inlineCode",{parentName:"p"},"[Symbol.iterator()]"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"// [Fruit.Apple, Fruit.Orange, Fruit.Pear, Fruit.Strawberry]\nconst fruits = [...Fruit.values()];\n")),(0,i.kt)("h2",{id:"keys"},(0,i.kt)("inlineCode",{parentName:"h2"},"keys()")),(0,i.kt)("p",null,"Returns an ES6 iterable which iterates through the keys of the enum."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'// ["Apple", "Orange", "Pear", "Strawberry"]\nconst fruitKeys = [...Fruit.keys()];\n')),(0,i.kt)("h2",{id:"entries"},(0,i.kt)("inlineCode",{parentName:"h2"},"entries()")),(0,i.kt)("p",null,"Returns an ES6 iterable which iterates through each tuple ",(0,i.kt)("inlineCode",{parentName:"p"},"[key, value]")," of the enum."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'/**\n * [\n *  ["Apple",      Fruit.Apple],\n *  ["Orange",     Fruit.Orange],\n *  ["Pear",       Fruit.Pear],\n *  ["Strawberry", Fruit.Strawberry],\n * ]\n */\nconst entries = [...Fruit.entries()];\n')))}f.isMDXComponent=!0}}]);