(this.webpackJsonpptms=this.webpackJsonpptms||[]).push([[50],{651:function(e,a,t){"use strict";function n(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}t.d(a,"a",(function(){return n}))},655:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(673),c=t(713),o=t(699),i=(t(658),t(43)),s=t(116),m=(t(659),t(587)),u=t(75);var d=r.a.memo((function(){var e=Object(i.d)((function(e){return e.messagebar})),a=Object(i.c)(),t=function(t){var n=t.msgClass,l=t.icon;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:n},r.a.createElement("div",{className:"message-icon"},r.a.createElement(m.a,null,l)),r.a.createElement("div",{className:"message-list"},r.a.createElement("ul",null,e.messages.map((function(e,a){return r.a.createElement("li",{key:a},e)})))),r.a.createElement("div",{className:"close-icon",onClick:function(){a(Object(u.a)())}},r.a.createElement(m.a,null,"clear"))))};return console.log(e),r.a.createElement(r.a.Fragment,null,e.show&&!0===e.show&&function(){switch(console.log("IN componenet"),e.messageType){case s.e:return r.a.createElement(r.a.Fragment,null,r.a.createElement(t,{msgClass:"alert-message-box bg-success",icon:"check"}));case s.a:return r.a.createElement(r.a.Fragment,null,r.a.createElement(t,{msgClass:"alert-message-box bg-error",icon:"error"}));case s.c:return r.a.createElement(r.a.Fragment,null,r.a.createElement(t,{msgClass:"alert-message-box bg-info",icon:"info"}));case s.f:return r.a.createElement(r.a.Fragment,null,r.a.createElement(t,{msgClass:"alert-message-box bg-warning",icon:"warning"}));default:return r.a.createElement(r.a.Fragment,null)}}())}));a.a=r.a.memo((function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.a,null,r.a.createElement(c.a,{title:e.title,className:"page-header"}),r.a.createElement(o.a,null,r.a.createElement(d,null),e.children)))}))},658:function(e,a,t){},659:function(e,a,t){},713:function(e,a,t){"use strict";var n=t(1),r=t(3),l=t(0),c=(t(6),t(4)),o=t(5),i=t(350),s=l.forwardRef((function(e,a){var t=e.action,o=e.avatar,s=e.classes,m=e.className,u=e.component,d=void 0===u?"div":u,p=e.disableTypography,b=void 0!==p&&p,f=e.subheader,g=e.subheaderTypographyProps,v=e.title,E=e.titleTypographyProps,h=Object(r.a)(e,["action","avatar","classes","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"]),y=v;null==y||y.type===i.a||b||(y=l.createElement(i.a,Object(n.a)({variant:o?"body2":"h5",className:s.title,component:"span",display:"block"},E),y));var O=f;return null==O||O.type===i.a||b||(O=l.createElement(i.a,Object(n.a)({variant:o?"body2":"body1",className:s.subheader,color:"textSecondary",component:"span",display:"block"},g),O)),l.createElement(d,Object(n.a)({className:Object(c.a)(s.root,m),ref:a},h),o&&l.createElement("div",{className:s.avatar},o),l.createElement("div",{className:s.content},y,O),t&&l.createElement("div",{className:s.action},t))}));a.a=Object(o.a)({root:{display:"flex",alignItems:"center",padding:16},avatar:{flex:"0 0 auto",marginRight:16},action:{flex:"0 0 auto",alignSelf:"flex-start",marginTop:-8,marginRight:-8},content:{flex:"1 1 auto"},title:{},subheader:{}},{name:"MuiCardHeader"})(s)},714:function(e,a,t){"use strict";var n=t(591),r=t(592),l=t(602),c=t(727),o=t(595),i=t(647),s=t(0),m=t.n(s);a.a=m.a.memo((function(e){e.multiple;var a=e.options,t=(e.required,e.name),u=e.label,d=e.placeholder,p=e.helperText,b=(e.fieldAction,"");Object(s.useEffect)((function(){b=p}),[]);m.a.useRef(0);return m.a.createElement(m.a.Fragment,null,m.a.createElement(i.a,{name:t},(function(e){e.form;var i=e.field,s=e.meta,f=!1;return s.touched&&s.error?(f=!0,p=s.error):p=b,m.a.createElement(m.a.Fragment,null,m.a.createElement(n.a,{fullWidth:!0},m.a.createElement(r.a,null,u),m.a.createElement(l.a,Object.assign({},i,{label:u,id:t,placeholder:d,error:f}),a.map((function(e,a){return m.a.createElement(c.a,{value:e.value,key:a},e.label)}))),m.a.createElement(o.a,{className:!0===f?"Mui-error":""},p)))})))}))},775:function(e,a,t){"use strict";var n=t(1),r=t(3),l=t(0),c=(t(6),t(4)),o=t(5),i=t(32),s=t(603),m=t(8),u=l.forwardRef((function(e,a){var t=e.edge,o=void 0!==t&&t,i=e.children,u=e.classes,d=e.className,p=e.color,b=void 0===p?"default":p,f=e.disabled,g=void 0!==f&&f,v=e.disableFocusRipple,E=void 0!==v&&v,h=e.size,y=void 0===h?"medium":h,O=Object(r.a)(e,["edge","children","classes","className","color","disabled","disableFocusRipple","size"]);return l.createElement(s.a,Object(n.a)({className:Object(c.a)(u.root,d,"default"!==b&&u["color".concat(Object(m.a)(b))],g&&u.disabled,"small"===y&&u["size".concat(Object(m.a)(y))],{start:u.edgeStart,end:u.edgeEnd}[o]),centerRipple:!0,focusRipple:!E,disabled:g,ref:a},O),l.createElement("span",{className:u.label},i))}));a.a=Object(o.a)((function(e){return{root:{textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:12,borderRadius:"50%",overflow:"visible",color:e.palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{backgroundColor:Object(i.c)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{backgroundColor:"transparent",color:e.palette.action.disabled}},edgeStart:{marginLeft:-12,"$sizeSmall&":{marginLeft:-3}},edgeEnd:{marginRight:-12,"$sizeSmall&":{marginRight:-3}},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(i.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},colorSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(i.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},disabled:{},sizeSmall:{padding:3,fontSize:e.typography.pxToRem(18)},label:{width:"100%",display:"flex",alignItems:"inherit",justifyContent:"inherit"}}}),{name:"MuiIconButton"})(u)},828:function(e,a,t){"use strict";var n=t(651),r=t(41),l=t(0),c=t.n(l),o=t(647),i=t(672),s=t(669),m=t(818);a.a=c.a.memo((function(e){var a=Object(l.useState)(null),t=Object(r.a)(a,2),u=t[0],d=t[1],p=Object(o.e)(e),b=Object(r.a)(p,3),f=b[0];b[1],b[2];Object(l.useEffect)((function(){var e=f.value;if(e){var a=e.split(" ")[0],t=e.split(" ")[1],n=a.split("/")[0],r=a.split("/")[1],l=a.split("/")[2],c=t.split(":")[0],o=t.split(":")[1],i=new Date(l,r-1,n,c,o);i instanceof Date&&d(i)}}),[]);var g=e.label,v=e.name;Object(n.a)(e,["label","name"]);return c.a.createElement(o.b,{name:v},(function(e){var a=e.form,t=e.field,n=a.setFieldValue;t.value;return c.a.createElement(s.a,{utils:i.a},c.a.createElement(m.a,{label:g,placeholder:g,value:u,variant:"inline",format:"dd/MM/yyyy HH:mm",onChange:function(e){if(e&&"Invalid Date"!=e){var a=e.getDate(),t=e.getUTCMonth()+1,r=e.getUTCFullYear(),l=e.getHours(),c=e.getMinutes();n(v,a+"/"+t+"/"+r+" "+l+":"+c)}d(e)},ampm:!1,autoOk:!0}))}))}))},884:function(e,a,t){"use strict";t.r(a);var n=t(19),r=t.n(n),l=t(42),c=t(41),o=t(0),i=t.n(o),s=t(647),m=t(100),u=t(655),d=t(828),p=t(714),b=t(160),f={startTime:"",endTime:"",driverCode:"",truckCode:""},g=m.b({startTime:m.a().required("Start Time is Required"),endTime:m.c().required("End Time is Required")});a.default=function(){var e=Object(o.useState)(f),a=Object(c.a)(e,2),t=a[0],n=(a[1],Object(o.useState)([])),m=Object(c.a)(n,2),v=m[0],E=m[1],h=function(){var e=Object(l.a)(r.a.mark((function e(){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"Tr001",a="".concat(b.G," /").concat("Tr001"),console.log("url is",a),fetch(a).then((function(e){return e.json()})).then((function(e){var a=e.map((function(e){return{value:e.value,label:e.value}}));E(a)})).catch((function(e){console.log(e)}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(o.useEffect)((function(){h()}),[]),console.log("driverOptions",v);var y=[{label:"Truck 1",value:"v"},{label:"Truck 2",value:"nv"}];return i.a.createElement(s.d,{initialValues:t,validationSchema:g,onSubmit:function(e){console.log(e)},enableReinitialize:!0},(function(e){return e,i.a.createElement(i.a.Fragment,null,i.a.createElement(u.a,{title:"Add Trip"},i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-md"},i.a.createElement(d.a,{name:"dateTime",label:"Start Time"})),i.a.createElement("div",{className:"col-md"},i.a.createElement(d.a,{name:"dateTime",label:"End Time"})),i.a.createElement("div",{className:"col-md"},i.a.createElement(p.a,{label:"Driver",name:"driverCode",options:v})),i.a.createElement("div",{className:"col-md"},i.a.createElement(p.a,{label:"Truck",name:"truckCode",options:y})))))}))}}}]);
//# sourceMappingURL=50.9662a79c.chunk.js.map