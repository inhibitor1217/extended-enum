"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[194],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var d=r.createContext({}),s=function(e){var t=r.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(d.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,d=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=s(n),m=i,f=c["".concat(d,".").concat(m)]||c[m]||p[m]||a;return n?r.createElement(f,o(o({ref:t},u),{},{components:n})):r.createElement(f,o({ref:t},u))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=c;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var s=2;s<a;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},2673:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return d},default:function(){return m},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return p}});var r=n(7462),i=n(3366),a=(n(7294),n(3905)),o=["components"],l={sidebar_position:2},d="Overriding default behaviors",s={unversionedId:"advanced-usages/override",id:"advanced-usages/override",title:"Overriding default behaviors",description:"Motivation",source:"@site/docs/advanced-usages/override.md",sourceDirName:"advanced-usages",slug:"/advanced-usages/override",permalink:"/extended-enum/docs/advanced-usages/override",editUrl:"https://github.com/inhibitor1217/extended-enum/docs/advanced-usages/override.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Defining additional interfaces",permalink:"/extended-enum/docs/advanced-usages/extend-base"}},u={},p=[{value:"Motivation",id:"motivation",level:2},{value:"<code>eq</code>",id:"eq",level:2},{value:"Signature",id:"signature",level:3}],c={toc:p};function m(e){var t=e.components,n=(0,i.Z)(e,o);return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"overriding-default-behaviors"},"Overriding default behaviors"),(0,a.kt)("h2",{id:"motivation"},"Motivation"),(0,a.kt)("p",null,"Extended features - ",(0,a.kt)("inlineCode",{parentName:"p"},"is"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"from"),", etc - determine the equality of the primitive and the enum by its native definition. In the following example, values in enum ",(0,a.kt)("inlineCode",{parentName:"p"},"_Priority")," are defined by the corresponding number primitives, ",(0,a.kt)("inlineCode",{parentName:"p"},"300"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"200"),", and ",(0,a.kt)("inlineCode",{parentName:"p"},"100"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"enum _Priority { High = 300, Medium = 200, Low = 100 }\nclass Priority extends extend<typeof _Priority, _Priority>(_Priority) {}\n\nPriority.High.is(300);   // true\nPriority.Medium.is(200); // true\n")),(0,a.kt)("p",null,"However, in some cases, you would want other values to be regarded as a valid primitive for this enum."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"What if the priority should be defined by ranges, ",(0,a.kt)("inlineCode",{parentName:"li"},"[0, 100], [101, 200], [201, 300]"),"?"),(0,a.kt)("li",{parentName:"ul"},"What if string values ",(0,a.kt)("inlineCode",{parentName:"li"},'"low", "medium", "high"')," should be also parsed to ",(0,a.kt)("inlineCode",{parentName:"li"},"Priority")," enum?")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"Priority.High.is(250); // expected: true\nPriority.from(42);     // expected: Priority.Low\n\nPriority.from('low');  // expected: Priority.Low\nPriority.High\n  .match({\n    low: true,\n    medium: true,\n    high: false,\n  });                  // expected: false\n")),(0,a.kt)("p",null,"To meet the additional needs for overriding the default behavior, ",(0,a.kt)("inlineCode",{parentName:"p"},"extend"),"ed enums expose an interface ",(0,a.kt)("inlineCode",{parentName:"p"},"eq"),"."),(0,a.kt)("h2",{id:"eq"},(0,a.kt)("inlineCode",{parentName:"h2"},"eq")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"eq")," determines the equality of the given primitive value and the defined value. It governs the comparison performed in ",(0,a.kt)("inlineCode",{parentName:"p"},"extend"),"ed enums, such as in ",(0,a.kt)("inlineCode",{parentName:"p"},"from"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"is"),", or ",(0,a.kt)("inlineCode",{parentName:"p"},"match"),"."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Using this method directly in usecases is not recommended.")," ",(0,a.kt)("inlineCode",{parentName:"p"},"is")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"isNot")," are perhaps the methods you are looking for."),(0,a.kt)("p",null,"In default behavior, ",(0,a.kt)("inlineCode",{parentName:"p"},"eq")," does the reference equality comparison (",(0,a.kt)("inlineCode",{parentName:"p"},"==="),"). Overriding this method will alter the core behavior, granting new possibilities. (See the example.)"),(0,a.kt)("p",null,"In the following example, the case-insensitive comparison overrides the default comparison, as specified at overrided method ",(0,a.kt)("inlineCode",{parentName:"p"},"eq"),". Observe how the behaviors of ",(0,a.kt)("inlineCode",{parentName:"p"},"from"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"is"),", or ",(0,a.kt)("inlineCode",{parentName:"p"},"match")," differ from the original behaviors."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"enum _Level { Low = 'LOW', High = 'HIGH' }\n\nclass Level extends extend<typeof _Level, _Level>(_Level) {\n\n  eq(other: string) {\n    return this.valueOf().toLowerCase() === other.toLowerCase();\n  }\n\n}\n\nLevel.Low.is('low')                  // true\nLevel.from('high')                   // Level.High\nLevel.Low.match({ low: 0, high: 1 }) // 0\n")),(0,a.kt)("h3",{id:"signature"},"Signature"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'  /**\n   * @param other The primitive value to compare with.\n   * @returns Whether given value is "equal" to this instance.\n   * This "equality" can be freely defined in advanced usage.\n   */\n  eq(other: string | number): boolean;\n')))}m.isMDXComponent=!0}}]);