(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{110:function(e,t,n){e.exports=n(111)},111:function(e,t,n){var r=n(11),a=n(1),u=n(19),l=r(n(62));(0,u.render)((0,a.createElement)(l.default),document.getElementById("react-root"))},131:function(e,t,n){var r=n(24),a=n(11);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.event,n=e.data,r=(0,l.default)(e,["event","data"]),a=(0,f.useSocket)(),d=(0,o.useCallback)(function(){var e="function"===typeof n?n()||null:n;(e||void 0===e)&&a.send(t,e)},[a,t,n]);return o.default.createElement(c.default,(0,u.default)({},r,{onPress:d}))};var u=a(n(41)),l=a(n(63)),o=r(n(1)),f=n(32),c=a(n(79))},132:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return(0,r.useContext)(a.navigationContext)};var r=n(1),a=n(62)},133:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=(0,r.useContext)(a.socketContext);return(0,r.useEffect)(function(){if("string"===typeof e&&"function"===typeof t)return n.on(e,t),function(){return n.removeListener(e,t)}},[e]),n};var r=n(1),a=n(62)},134:function(e,t,n){var r=n(11);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=(0,u.useState)(null),n=(0,a.default)(t,2),r=n[0],l=n[1];return(0,u.useEffect)(function(){fetch("http://localhost:4000/".concat(e)).then(function(e){return e.json()}).then(l).catch(function(e){return console.error(e)})},[e]),r};var a=r(n(18)),u=n(1)},135:function(e,t,n){var r=n(11);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=(0,u.useState)(!1),t=(0,a.default)(e,2),n=t[0],r=t[1],l=(0,u.useCallback)(function(){return r(function(e){return!e})},[]);return[n,l]};var a=r(n(18)),u=n(1)},136:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=(0,r.useRef)(e),n=(0,r.useCallback)(function(e){return t.current=e},[]);return[t,n]};var r=n(1)},137:function(e,t,n){var r=n(11);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=(0,l.useContext)(f.context)||o.mat4.create(),n=e.reduce(function(e,t){var n=(0,u.default)(t),r=n[0],l=n.slice(1);return o.mat4[r].apply(o.mat4,[e,e].concat((0,a.default)(l)))},o.mat4.clone(t));return[n,c(n)]};var a=r(n(52)),u=r(n(140)),l=n(1),o=n(175),f=n(78);function c(e){var t=o.mat4.getTranslation(o.vec3.create(),e),n=d(o.vec3.create(),o.mat4.getRotation(o.quat.create(),e));return"\n\t\ttranslate(".concat(i(t[0])," ").concat(i(t[1]),")\n\t\trotate(").concat(i(180*n[0]/Math.PI)," 0 0)\n\t")}function d(e,t){e[0]=Math.atan2(2*(t[0]*t[3]+t[1]*t[2]),1-2*(t[0]*t[0]+t[1]*t[1]));var n=2*(t[1]*t[3]-t[0]*t[2]);return e[1]=Math.abs(n)>=1?Math.PI/2*Math.sign(n):Math.asin(n),e[0]=Math.atan2(2*(t[2]*t[3]+t[0]*t[1]),1-2*(t[1]*t[1]+t[2]*t[2])),e}function i(e){return Math.round(1e5*e)/1e5}o.mat4.removeRotation=function(e,t){var n=o.vec3.create();return o.mat4.getTranslation(n,t),o.mat4.fromTranslation(e,n),e}},141:function(e,t,n){var r=n(11);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=(0,u.useState)(t),r=(0,a.default)(n,2),l=r[0],o=r[1],f=(0,u.useRef)([]),c=(0,u.useRef)(),d=(0,u.useCallback)(function(t){f.current.length||(c.current=setTimeout(i,e)),f.current.push(t)},[e]),i=(0,u.useCallback)(function(){f.current.length&&o(f.current.shift()),f.current.length&&(c.current=setTimeout(i,e))},[e]);return(0,u.useEffect)(function(){return function(){return clearTimeout(c.current)}},[]),[l,d]};var a=r(n(18)),u=n(1)},142:function(e,t,n){var r=n(11);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return u.default.createElement(l.Text,(0,a.default)({},e,{style:[o.default.text,o.default.header,e.style]}))};var a=r(n(41)),u=r(n(1)),l=n(26),o=r(n(25))},143:function(e,t,n){var r=n(11);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.transforms,n=void 0===t?[]:t,r=e.style,i=e.s,s=e.n,m=e.stroke,v=e.onPress,g=(0,l.useTransform)(n),p=(0,a.default)(g,2)[1],y=1&i?"red":"black";return u.default.createElement(o.G,{style:[f.default.card,r],transform:p,onClick:v,onPress:v},u.default.createElement(o.Rect,{rx:"7",width:"50",height:"100",x:"-25",y:"-50",strokeWidth:"2",stroke:m||"black",fill:void 0!==i?"white":"url(#pattern)"}),void 0!==i&&u.default.createElement(u.default.Fragment,null,u.default.createElement(o.Text,{x:"-10",y:"-30",style:[{fill:y,dominantBaseline:"text-before-edge",textAnchor:"middle"},f.default.number]},void 0!==i?c[s]:"?"),u.default.createElement(o.Text,{x:"-10",y:"-12",style:[{fill:y,dominantBaseline:"text-before-edge",textAnchor:"middle"},f.default.smallSuit]},void 0!==i?d[i]:"?"),u.default.createElement(o.Text,{y:"20",style:[{fill:y,dominantBaseline:"central",textAnchor:"middle"},f.default.suit]},void 0!==i?d[i]:"?")))};var a=r(n(18)),u=r(n(1)),l=n(32),o=n(70),f=r(n(25));var c=[3,4,5,6,7,8,9,10,"J","Q","K","A",2],d=["\u26a3","\u26a2","\u26a4","\u2665"]},167:function(e,t){},170:function(e,t,n){var r=n(24),a=n(11);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=(0,o.useInputRef)(""),t=(0,u.default)(e,2),n=t[0],r=t[1],a=(0,l.useCallback)(function(){return n.current},[]);return l.default.createElement(l.default.Fragment,null,l.default.createElement(f.Input,{onChangeText:r}),l.default.createElement(f.Action,{event:"register",data:a},"Register!"))};var u=a(n(18)),l=r(n(1)),o=n(32),f=n(31)},171:function(e,t,n){var r=n(24),a=n(11);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=(0,c.useToggle)(),n=(0,o.default)(t,2),r=n[0],a=n[1];return r?f.default.createElement(s,{toggle:a}):f.default.createElement(i,(0,l.default)({},e,{toggle:a}))};var u=a(n(52)),l=a(n(41)),o=a(n(18)),f=r(n(1)),c=n(32),d=n(31);function i(e){var t=(0,f.useState)(e.rooms),n=(0,o.default)(t,2),r=n[0],a=n[1];return(0,c.useSocket)("open",function(e){return a(function(t){return t.find(function(t){return t.id===e.id})?t:[].concat((0,u.default)(t),[e])})}),(0,c.useSocket)("update",function(e){return a(function(t){return t.find(function(t){return t.id===e.id})?t.map(function(t){return t.id===e.id?e:t}):[].concat((0,u.default)(t),[e])})}),(0,c.useSocket)("close",function(e){return a(function(t){return t.find(function(t){return t.id===e.id})?t.filter(function(t){return t.id!==e.id}):t})}),f.default.createElement(f.default.Fragment,null,f.default.createElement(d.Row,null,f.default.createElement(d.Header,{style:{flex:1}},"Rooms"),f.default.createElement(d.Button,{onPress:e.toggle},"create room")),f.default.createElement(d.Column,null,r.map(function(e){return f.default.createElement(d.Row,{key:e.id},f.default.createElement(d.Action,{event:"enter",data:e.id},e.name," - ",e.players.length," / ",e.rules.size))})))}function s(e){var t=(0,c.useInputRef)(""),n=(0,o.default)(t,2),r=n[0],a=n[1],u=(0,c.useInputRef)(3),l=(0,o.default)(u,2),i=l[0],s=l[1],m=(0,f.useCallback)(function(){return{name:r.current,players:i.current}},[]);return f.default.createElement(f.default.Fragment,null,f.default.createElement(d.Row,null,f.default.createElement(d.Header,{style:{flex:1}},"Create room"),f.default.createElement(d.Button,{onClick:e.toggle},"cancel")),f.default.createElement(d.Column,null,f.default.createElement(d.Input,{onChangeText:a}),f.default.createElement(d.Picker,{defaultValue:3,onValueChange:s},f.default.createElement(d.Picker.Item,{label:"2",value:2}),f.default.createElement(d.Picker.Item,{label:"3",value:3}),f.default.createElement(d.Picker.Item,{label:"4",value:4}),f.default.createElement(d.Picker.Item,{label:"5",value:5})),f.default.createElement(d.Action,{event:"create",data:m},"Create!")))}},172:function(e,t,n){var r=n(24),a=n(11);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=(0,l.useState)(e.room),n=(0,u.default)(t,2),r=n[0],a=n[1];return(0,o.useSocket)("room",a),l.default.createElement(l.default.Fragment,null,l.default.createElement(f.Row,null,l.default.createElement(f.Header,{style:{flex:1}},r.name," - ",r.players.length," / ",r.rules.size),l.default.createElement(f.Action,{event:"exit"},"leave")),l.default.createElement(f.Column,null,r.players.map(function(e){return l.default.createElement(f.Text,{key:e.id},e.name)})),r.mine&&l.default.createElement(f.Action,{event:"start"},"Start game"),l.default.createElement(c.default,null))};var u=a(n(18)),l=r(n(1)),o=n(32),f=n(31),c=a(n(93))},173:function(e,t,n){var r=n(11);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.room,n=u.Dimensions.get("window").width;return a.default.createElement(a.default.Fragment,null,a.default.createElement(o.Row,null,a.default.createElement(o.Header,{style:{flex:1}},t.name," - ",t.players.length," / ",t.rules.size),a.default.createElement(o.Action,{event:"exit"},"leave")),a.default.createElement(l.Svg,{width:n,height:n,viewBox:"-350 -350 700 700",style:d.default.scene},a.default.createElement(l.Defs,null,a.default.createElement(l.Pattern,{id:"pattern",x:"0",y:"0",width:"20",height:"20",patternUnits:"userSpaceOnUse"},a.default.createElement(l.Circle,{cx:"10",cy:"10",r:"10",stroke:"none",fill:"#0000ff"}))),a.default.createElement(c.default,{room:t})),a.default.createElement(f.default,null))};var a=r(n(1)),u=n(26),l=n(70),o=n(31),f=r(n(93)),c=r(n(174)),d=r(n(25))},174:function(e,t,n){var r=n(24),a=n(11);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.room,n=(0,d.useTransform)([["rotateZ",g/4]]),r=(0,f.default)(n,2),a=r[0],u=r[1],l=(0,d.useQueue)(500,t),m=(0,f.default)(l,2),v=m[0],b=v.players,E=v.game,P=E.size,k=E.turn,C=E.draw,T=E.plays,S=E.hands,_=E.legal,w=E.orNothing,j=m[1];(0,d.useSocket)("room",j);var O=T.filter(Array.isArray),M=S.findIndex(Array.isArray);return c.default.createElement(s.Transform,{value:a},c.default.createElement(i.Circle,{r:"250",fill:"forestgreen",transform:u}),c.default.createElement(p,{cards:C,transforms:[["translate",[-100,0,0]]]}),!!O.length&&c.default.createElement(y,{cards:O[0]}),O.slice(1).map(function(e,t,n){return c.default.createElement(p,{key:t,cards:e,transforms:[["translate",[100,0,n.length-t]]]})}),b.map(function(e,t){return M!==t&&c.default.createElement(h,(0,o.default)({key:e.id},e,{cards:S[t],action:(k-1)%P===t?T[0]:null,position:(M-t)%P/P}))}),c.default.createElement(x,{cards:S[M],legal:_||[],orNothing:w}))};var u=a(n(52)),l=a(n(63)),o=a(n(41)),f=a(n(18)),c=r(n(1)),d=n(32),i=n(70),s=n(31);a(n(25));var m=Math.sin,v=Math.cos,g=2*Math.PI;function p(e){var t=e.cards,n=e.transforms,r=(0,d.useTransform)(n),a=(0,f.default)(r,1)[0];return c.default.createElement(s.Transform,{value:a},t.map(function(e,t){return c.default.createElement(s.Card,(0,o.default)({},e,{key:void 0!==e.s?"".concat(e.s,"-").concat(e.n):t,transforms:[["translate",[0,0,t]],["rotateX",void 0!==e.s?0:g/2]]}))}))}function y(e){var t=e.cards,n=g/5/t.length;return t.map(function(e,t){return c.default.createElement(s.Card,(0,o.default)({},e,{key:void 0!==e.s?"".concat(e.s,"-").concat(e.n):t,transforms:[["translate",[100*m(t*n),200*m(t*n),t]],["rotateZ",t*n]]}))})}function b(e){var t=e.transforms,n=void 0===t?[]:t,r=(0,l.default)(e,["transforms"]),a=(0,d.useTransform)([].concat((0,u.default)(n),[["removeRotation"]])),s=(0,f.default)(a,2)[1];return c.default.createElement(i.G,(0,o.default)({},r,{transform:s}))}function E(e){var t=e.children,n=e.onPress,r=(0,l.default)(e,["children","onPress"]);return c.default.createElement(b,(0,o.default)({onClick:n,onPress:n},r),c.default.createElement(i.Text,{textAnchor:"middle",fontFamily:"Bungee-Regular",fontSize:"35",fill:"rgb(255, 36, 0)"},t))}function h(e){var t=e.name,n=e.cards,r=e.action,a=e.position,u=g*a,l=(0,d.useTransform)([["translate",[250*v(u),250*m(u),0]]]),o=(0,f.default)(l,1)[0];return console.log(n),c.default.createElement(s.Transform,{value:o},c.default.createElement(E,{transforms:[["translate",[0,0,0]]]},t),n?c.default.createElement(E,{transforms:[["translate",[40,0,0]]]},"".concat(n," cards left")):c.default.createElement(E,{transforms:[["translate",[40,0,0]]]},"finished"),"string"===typeof r&&c.default.createElement(E,{transforms:[["translate",[80,0,0]]]},r))}function x(e){var t=e.cards,n=e.legal,r=e.orNothing,a=(0,d.useTransform)([["translate",[200,0,0]],["rotateZ",-g/4]]),u=(0,f.default)(a,1)[0],l=(0,c.useState)([]),i=(0,f.default)(l,2),m=i[0],v=i[1];(0,c.useEffect)(function(){return v(function(e){return e.length?[]:e})},[n]);var p=n.filter(function(e){return!m.find(function(t){return!e.find(function(e){return k(t,e)})})}).flat(),y=(0,d.useSocket)(),b=n.find(function(e){return n=m,(t=e)&&n&&t.length===n.length&&!t.find(function(e){return!n.find(function(t){return k(e,t)})});var t,n}),h=(0,c.useCallback)(function(){return b&&y.send("play",b)},[y,b]),x=(0,c.useCallback)(function(){return y.send("play","SKIP")},[y]),C=(0,c.useCallback)(function(){return y.send("play","PASS")},[y]);return c.default.createElement(s.Transform,{value:u},(Array.isArray(t)?t:new Array(t).fill({})).map(function(e,t,n){return c.default.createElement(P,(0,o.default)({},e,{key:void 0!==e.s?"".concat(e.s,"-").concat(e.n):t,transforms:[["translate",[t/(n.length-1)*500-250,0,0]]],select:p.find(function(t){return k(e,t)})&&v,selected:m.find(function(t){return k(e,t)})}))}),!!n.length&&c.default.createElement(c.default.Fragment,null,c.default.createElement(E,{onPress:h,transforms:[["translate",[0,90,0]]]},"play"),c.default.createElement(E,{onPress:r?x:C,transforms:[["translate",[0,120,0]]]},r?"skip":"pass")))}function P(e){var t=e.transforms,n=void 0===t?[]:t,r=e.select,a=e.selected,f=(0,l.default)(e,["transforms","select","selected"]),d=(0,c.useCallback)(function(){return r&&r(function(e){return e.find(function(e){return k(f,e)})?e.filter(function(e){return!k(f,e)}):[].concat((0,u.default)(e),[f])})},[r]),i=a?"lime":r?"dodgerblue":null;return n=[].concat((0,u.default)(n),[["translate",[0,a?-20:r?-10:0,0]]]),c.default.createElement(s.Card,(0,o.default)({},f,{stroke:i,transforms:n,onPress:d}))}function k(e,t){return e&&t&&e.s===t.s&&e.n===t.n}},25:function(e,t,n){const{StyleSheet:r,Dimensions:a}=n(26);e.exports=r.create({body:{flexGrow:1,flexShrink:1,flexBasis:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",marginTop:0,marginRight:0,marginBottom:0,marginLeft:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0,backgroundColor:"rgb(234, 234, 219)"},input:{fontSize:"1.5rem",backgroundColor:"white",paddingTop:".375rem",paddingRight:".5rem",paddingBottom:".375rem",paddingLeft:".5rem"},select:{fontSize:"1.5rem"},button:{fontSize:"1.5rem",backgroundColor:"rgb(255, 36, 0)",borderWidth:0,borderColor:"black",borderStyle:"solid",color:"white",paddingTop:"0rem",paddingRight:".5rem",paddingBottom:"0rem",paddingLeft:".5rem",borderTopWidth:0,borderRightWidth:4,borderBottomWidth:3,borderLeftWidth:0},"form .input":{marginBottom:".5rem"},"form .select":{marginBottom:".5rem"},"form .button":{marginBottom:".5rem"},text:{color:"rgb(255, 36, 0)",fontFamily:"Bungee-Regular",fontSize:"2rem"},scene:{overflow:"visible"},suit:{fontSize:30,fontFamily:"auto"},smallSuit:{fontSize:20,fontFamily:"auto"},number:{fontSize:20},row:{display:"flex",alignItems:"center",flexDirection:"row"},column:{display:"flex",alignItems:"center",flexDirection:"column"},chat:{backgroundColor:"white",display:"flex",flexDirection:"column-reverse",height:"15rem",overflow:"hidden",paddingTop:".25rem",paddingRight:".25rem",paddingBottom:".25rem",paddingLeft:".25rem"},message:{color:"#26547C",marginLeft:".5rem",lineHeight:"1.5rem"}})},31:function(e,t,n){var r=n(11);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"View",{enumerable:!0,get:function(){return l.View}}),Object.defineProperty(t,"Picker",{enumerable:!0,get:function(){return l.Picker}}),Object.defineProperty(t,"Transform",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(t,"Button",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"Action",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(t,"Header",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"Card",{enumerable:!0,get:function(){return s.default}}),t.Input=t.Text=t.Column=t.Row=void 0;var a=r(n(41)),u=r(n(1)),l=n(26),o=r(n(25)),f=r(n(78)),c=r(n(79)),d=r(n(131)),i=r(n(142)),s=r(n(143));function m(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return function(t){return u.default.createElement(e,(0,a.default)({},t,{style:[].concat(n,[t.style])}))}}var v=m(l.View,o.default.row);t.Row=v;var g=m(l.View,o.default.column);t.Column=g;var p=m(l.Text,o.default.text);t.Text=p;var y=m(l.TextInput,o.default.input);t.Input=y},32:function(e,t,n){var r=n(11);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useNavigation",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(t,"useSocket",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"useFetch",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"useToggle",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"useInputRef",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(t,"useTransform",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"useQueue",{enumerable:!0,get:function(){return d.default}});var a=r(n(132)),u=r(n(133)),l=r(n(134)),o=r(n(135)),f=r(n(136)),c=r(n(137)),d=r(n(141))},62:function(e,t,n){var r=n(24),a=n(11);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=(0,l.useMemo)(function(){return(0,c.default)("http://sigzag-precedent.glitch.me")},[]),t=(0,l.useState)({}),n=(0,u.default)(t,2),r=n[0],a=n[1];return(0,l.useEffect)(function(){e.on("alert",alert),e.on("rooms",function(e){return a({screen:"Lobby",data:{rooms:e}})}),e.on("room",function(e){e.game?a({screen:"Game",data:{room:e}}):a({screen:"Room",data:{room:e}})})},[e]),l.default.createElement(p.Provider,{value:a},l.default.createElement(g.Provider,{value:e},l.default.createElement(f.View,{style:[v.default.body,o.StyleSheet.absoluteFill]},l.default.createElement(y,r))))},t.navigationContext=t.socketContext=void 0;var u=a(n(18)),l=r(n(1)),o=n(26),f=n(31),c=a(n(144)),d=a(n(170)),i=a(n(171)),s=a(n(172)),m=a(n(173)),v=a(n(25)),g=(0,l.createContext)();t.socketContext=g;var p=(0,l.createContext)();function y(e){var t=e.screen,n=e.data,r=void 0===n?{}:n;switch(t){case"Lobby":return l.default.createElement(i.default,r);case"Room":return l.default.createElement(s.default,r);case"Game":return l.default.createElement(m.default,r);default:return l.default.createElement(d.default,null)}}t.navigationContext=p},78:function(e,t,n){var r=n(24);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return a.default.createElement(u.Provider,e)},t.context=void 0;var a=r(n(1)),u=(0,a.createContext)();t.context=u},79:function(e,t,n){var r=n(11);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.children,n=(0,a.default)(e,["children"]);return u.default.createElement(l.TouchableOpacity,n,u.default.createElement(l.Text,{style:[o.default.text,o.default.button]},t))};var a=r(n(63)),u=r(n(1)),l=n(26),o=r(n(25))},93:function(e,t,n){var r=n(24),a=n(11);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return o.default.createElement(o.default.Fragment,null,o.default.createElement(i,null),o.default.createElement(s,null))};var u=a(n(52)),l=a(n(18)),o=r(n(1)),f=n(32),c=n(31),d=a(n(25));function i(){var e=(0,o.useState)([]),t=(0,l.default)(e,2),n=t[0],r=t[1];return(0,f.useSocket)("message",(0,o.useCallback)(function(e){return r(function(t){return[].concat((0,u.default)(t),[e])})},[])),o.default.createElement(c.Column,{style:d.default.chat},n.reverse().map(function(e,t){var n=e.user,r=e.message;return o.default.createElement(c.Text,{key:t},n.name,":",o.default.createElement(c.Text,{style:d.default.message},r))}))}function s(){var e=(0,o.useState)(),t=(0,l.default)(e,2),n=t[0],r=t[1],a=(0,f.useSocket)(),u=(0,o.useCallback)(function(){n&&a.send("message",n),r("")},[a,n]);return o.default.createElement(c.Row,null,o.default.createElement(c.Input,{style:{flex:1},value:n,onChangeText:r}),o.default.createElement(c.Button,{style:{alignSelf:"stretch"},onPress:u},"\u279c"))}}},[[110,1,2]]]);
//# sourceMappingURL=main.bad5e724.chunk.js.map