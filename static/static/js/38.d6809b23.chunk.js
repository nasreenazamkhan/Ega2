(this.webpackJsonpptms=this.webpackJsonpptms||[]).push([[38],{646:function(e,t,a){"use strict";var n=a(0),r=n.createContext();t.a=r},650:function(e,t,a){"use strict";var n=a(0),r=n.createContext();t.a=r},666:function(e,t,a){"use strict";var n=a(0),r=a.n(n);a(671);t.a=function(e){var t=e.title,a=e.message,n=e.icon,l=e.position,c=e.showToast;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"notification-container ".concat(l)},r.a.createElement("div",{className:"info-box"},r.a.createElement("div",{className:"icon bg-red"},r.a.createElement("i",{className:"material-icons"},n)),r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"title"},t),r.a.createElement("div",{className:"message"},a)),r.a.createElement("div",{className:"col-md"},r.a.createElement("button",{style:{marginTop:"5px",fontSize:"25px"},type:"button",onClick:function(){c(!1)},className:"close","data-dismiss":"alert","aria-label":"Close"},r.a.createElement("span",{"aria-hidden":"true"},"\xd7"))))))}},671:function(e,t,a){},692:function(e,t,a){"use strict";var n=a(3),r=a(1),l=a(0),c=(a(6),a(4)),o=a(5),i=a(650),s=l.forwardRef((function(e,t){var a=e.classes,o=e.className,s=e.component,m=void 0===s?"table":s,d=e.padding,p=void 0===d?"default":d,u=e.size,g=void 0===u?"medium":u,f=e.stickyHeader,b=void 0!==f&&f,x=Object(n.a)(e,["classes","className","component","padding","size","stickyHeader"]),v=l.useMemo((function(){return{padding:p,size:g,stickyHeader:b}}),[p,g,b]);return l.createElement(i.a.Provider,{value:v},l.createElement(m,Object(r.a)({role:"table"===m?null:"table",ref:t,className:Object(c.a)(a.root,o,b&&a.stickyHeader)},x)))}));t.a=Object(o.a)((function(e){return{root:{display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":Object(r.a)({},e.typography.body2,{padding:e.spacing(2),color:e.palette.text.secondary,textAlign:"left",captionSide:"bottom"})},stickyHeader:{borderCollapse:"separate"}}}),{name:"MuiTable"})(s)},693:function(e,t,a){"use strict";var n=a(3),r=a(1),l=a(0),c=(a(6),a(4)),o=a(5),i=a(8),s=a(32),m=a(650),d=a(646),p=l.forwardRef((function(e,t){var a,o,s=e.align,p=void 0===s?"inherit":s,u=e.classes,g=e.className,f=e.component,b=e.padding,x=e.scope,v=e.size,E=e.sortDirection,y=e.variant,h=Object(n.a)(e,["align","classes","className","component","padding","scope","size","sortDirection","variant"]),j=l.useContext(m.a),O=l.useContext(d.a),w=O&&"head"===O.variant;f?(o=f,a=w?"columnheader":"cell"):o=w?"th":"td";var N=x;!N&&w&&(N="col");var S=b||(j&&j.padding?j.padding:"default"),C=v||(j&&j.size?j.size:"medium"),k=y||O&&O.variant,z=null;return E&&(z="asc"===E?"ascending":"descending"),l.createElement(o,Object(r.a)({ref:t,className:Object(c.a)(u.root,u[k],g,"inherit"!==p&&u["align".concat(Object(i.a)(p))],"default"!==S&&u["padding".concat(Object(i.a)(S))],"medium"!==C&&u["size".concat(Object(i.a)(C))],"head"===k&&j&&j.stickyHeader&&u.stickyHeader),"aria-sort":z,role:a,scope:N},h))}));t.a=Object(o.a)((function(e){return{root:Object(r.a)({},e.typography.body2,{display:"table-cell",verticalAlign:"inherit",borderBottom:"1px solid\n    ".concat("light"===e.palette.type?Object(s.e)(Object(s.c)(e.palette.divider,1),.88):Object(s.a)(Object(s.c)(e.palette.divider,1),.68)),textAlign:"left",padding:16}),head:{color:e.palette.text.primary,lineHeight:e.typography.pxToRem(24),fontWeight:e.typography.fontWeightMedium},body:{color:e.palette.text.primary},footer:{color:e.palette.text.secondary,lineHeight:e.typography.pxToRem(21),fontSize:e.typography.pxToRem(12)},sizeSmall:{padding:"6px 24px 6px 16px","&:last-child":{paddingRight:16},"&$paddingCheckbox":{width:24,padding:"0 12px 0 16px","&:last-child":{paddingLeft:12,paddingRight:16},"& > *":{padding:0}}},paddingCheckbox:{width:48,padding:"0 0 0 4px","&:last-child":{paddingLeft:0,paddingRight:4}},paddingNone:{padding:0,"&:last-child":{padding:0}},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right",flexDirection:"row-reverse"},alignJustify:{textAlign:"justify"},stickyHeader:{position:"sticky",top:0,left:0,zIndex:2,backgroundColor:e.palette.background.default}}}),{name:"MuiTableCell"})(p)},694:function(e,t,a){"use strict";var n=a(1),r=a(3),l=a(0),c=(a(6),a(4)),o=a(5),i=a(646),s={variant:"body"},m=l.forwardRef((function(e,t){var a=e.classes,o=e.className,m=e.component,d=void 0===m?"tbody":m,p=Object(r.a)(e,["classes","className","component"]);return l.createElement(i.a.Provider,{value:s},l.createElement(d,Object(n.a)({className:Object(c.a)(a.root,o),ref:t,role:"tbody"===d?null:"rowgroup"},p)))}));t.a=Object(o.a)({root:{display:"table-row-group"}},{name:"MuiTableBody"})(m)},695:function(e,t,a){"use strict";var n=a(1),r=a(3),l=a(0),c=(a(6),a(4)),o=a(5),i=a(646),s=a(32),m=l.forwardRef((function(e,t){var a=e.classes,o=e.className,s=e.component,m=void 0===s?"tr":s,d=e.hover,p=void 0!==d&&d,u=e.selected,g=void 0!==u&&u,f=Object(r.a)(e,["classes","className","component","hover","selected"]),b=l.useContext(i.a);return l.createElement(m,Object(n.a)({ref:t,className:Object(c.a)(a.root,o,b&&{head:a.head,footer:a.footer}[b.variant],p&&a.hover,g&&a.selected),role:"tr"===m?null:"row"},f))}));t.a=Object(o.a)((function(e){return{root:{color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,"&$hover:hover":{backgroundColor:e.palette.action.hover},"&$selected, &$selected:hover":{backgroundColor:Object(s.c)(e.palette.secondary.main,e.palette.action.selectedOpacity)}},selected:{},hover:{},head:{},footer:{}}}),{name:"MuiTableRow"})(m)},696:function(e,t,a){},717:function(e,t,a){"use strict";a(651),a(41),a(0),a(696),a(775),a(587),a(732),a(60)},722:function(e,t,a){"use strict";var n=a(103),r=a.n(n),l=a(39);t.a={upload:function(e,t,a){var n=new FormData;n.append("file",e);var c={url:"/ptms/app/api/secure/fileUpload/upload",body:n},o={headers:{access_token:Object(l.b)(),"content-type":"multipart/form-data"},params:{locale:"en",paramDto:{upload:t.uploadType,referenceNumber:t.referenceNumber,dpwTransactionId:t.dpwTransactionId,boeNumber:t.boeNumber}},onUploadProgress:a};return r.a.post(c.url,c.body,o).then((function(e){return Object(l.a)(),e.data})).catch((function(e){return Object(l.a)(),e}))},getFiles:function(){var e="ptms/app/api/secure/fileUpload/files",t={headers:{access_token:Object(l.b)()},params:{locale:"en"}};return r.a.get(e,t)}}},737:function(e,t,a){"use strict";a.r(t);var n=a(41),r=a(0),l=a.n(r),c=(a(696),a(816)),o=a(783),i=a(244),s=a(722),m=a(738),d=(a(770),a(742)),p=(a(666),a(25)),u=Object(i.a)((function(e){return{root:{flexGrow:3},menuButton:{marginRight:e.spacing(100)},title:{flexGrow:1},input:{display:"none"},center:{display:"none"}}}));t.default=function(e){console.log("props in upload document",e);var t=u(),a=Object(r.useState)(void 0),i=Object(n.a)(a,2),g=i[0],f=i[1],b=Object(r.useState)(void 0),x=Object(n.a)(b,2),v=x[0],E=x[1],y=Object(r.useState)(0),h=Object(n.a)(y,2),j=h[0],O=h[1],w=Object(r.useState)(""),N=Object(n.a)(w,2),S=N[0],C=N[1],k=Object(r.useState)(0),z=Object(n.a)(k,2),T=(z[0],z[1]),D=["pdf","doc","png","docx","jpg","jpeg"],P=e.popUpParams.uploadType,A=Object(r.useState)(!1),R=Object(n.a)(A,2),U=R[0],B=R[1],M=Object(r.useState)(!1),W=Object(n.a)(M,2),I=W[0],L=W[1],H=(Object(p.f)(),function(e){f(e.target.files)});Object(r.useEffect)((function(){if(g){L(!1),B(!1);var t=g[0],a=t.name.split(".")[1];D.some((function(e){return a===e}))?t.size<=5e5?(O(20),E(t),s.a.upload(t,e.popUpParams,(function(e){O(Math.round(100*e.loaded/e.total))})).then((function(t){t.isAxiosError?(console.log("error"),O(0),C("Could not upload the file!"),E(void 0)):(console.log("response success"),T(1),e.onSuccess(t.data.dataItems[0]))})).catch((function(){console.log("error"),O(0),C("Could not upload the file!"),E(void 0)})),f(void 0)):B(!0):L(!0)}}),[g]);var F=function(){return 100===j?l.a.createElement(o.a,null,l.a.createElement("label",{for:"image"},l.a.createElement("input",{type:"file",name:"image",id:"image",className:t.center}),"invoice"===P&&l.a.createElement("img",{src:"./uploaded_invoice.png",style:{position:"relative",marginLeft:"120%",width:"80%"}}),"POD"===P&&l.a.createElement("img",{src:"./uploaded_pod.png",style:{position:"relative",marginLeft:"120%",width:"80%"}}),l.a.createElement("div",null))):l.a.createElement(o.a,null,l.a.createElement("label",{for:"image"},l.a.createElement("input",{type:"file",name:"image",id:"image",className:t.center,onChange:H}),"invoice"===P&&l.a.createElement("img",{src:"./upload_invoice.png",style:{position:"relative",marginLeft:"120%",width:"80%"}}),"POD"===P&&l.a.createElement("img",{src:"./upload_pod.png",style:{position:"relative",marginLeft:"120%",width:"80%"}})))};return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:t.root},l.a.createElement(c.a,{position:"static",style:{position:"relative",marginTop:"100px",height:"100px",centerTitle:!0,backgroundColor:"#0E1B3D"}},l.a.createElement(F,null))),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),v&&l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-4"}),l.a.createElement("div",{className:"col-md-5"},l.a.createElement(d.a,{container:!0},l.a.createElement(d.a,{item:!0,xs:12},l.a.createElement(m.a,{variant:"danger",now:j})),l.a.createElement(d.a,{item:!0,xs:11},v.name),l.a.createElement(d.a,{item:!0,xs:1},j,"%"))))),S&&l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-5"}),l.a.createElement("div",{className:"col-md-3"},l.a.createElement("p",{style:{color:"#FF0000"}},S))),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-5"}),l.a.createElement("div",{className:"col-md-5"},U&&l.a.createElement("p",{style:{color:"#C62926"}},"Allowed maximum size is 500 KB "),I&&l.a.createElement("p",{style:{color:"#C62926"}},"File format is not supported "))),0===j&&!S&&l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-3"}),l.a.createElement("div",{className:"col-md-5"},l.a.createElement("p",{style:{color:"#0E1B3D"}},"Only files with the following extensions are allowed *.pdf,.doc,.png,.jpg,.jpeg  ")),l.a.createElement("div",{className:"col-md-3"},l.a.createElement("p",null,"0%"))),e.popUpParams.status&&0===j&&l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-2"}),l.a.createElement("div",{className:"col-md-8"},l.a.createElement("p",{style:{textAlign:"center",position:"relative",color:"#0E1B3D"}},"Uploaded ",P," has been rejected by admin, please upload a new updated copy for verification."),l.a.createElement("p",{style:{textAlign:"center",position:"relative",color:"red"}},"Reason: ",e.popUpParams.status.remarks))),(!e.popUpParams.status||e.popUpParams.status&&100===j)&&l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-2"}),l.a.createElement("div",{className:"col-md-8"},l.a.createElement("p",{style:{textAlign:"center",position:"relative",color:"#0E1B3D"}},e.popUpParams.customMessage?e.popUpParams.customMessage:"Please note: Document will be sent to DT admin after uploading and\n              will notify you if gets successfully verified"))),void 0!==e.popUpParams.message&&100===j&&l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-md-2"}),l.a.createElement("div",{className:"col-md-8"},l.a.createElement("p",{style:{textAlign:"center",position:"relative",color:"grey"}},e.popUpParams.message[0]),l.a.createElement("p",{style:{textAlign:"center",position:"relative",fontColor:"#0E1B3D",fontWeight:"bold"}},e.popUpParams.message[1],e.popUpParams.message[2]),l.a.createElement("br",null),l.a.createElement("p",{style:{textAlign:"center",position:"relative",color:"#0E1B3D"}},e.popUpParams.message[3]," "),l.a.createElement("p",null,e.popUpParams.message[4]))))}},742:function(e,t,a){"use strict";var n=a(3),r=a(1),l=a(0),c=(a(6),a(4)),o=a(5),i=[0,1,2,3,4,5,6,7,8,9,10],s=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=parseFloat(e);return"".concat(a/t).concat(String(e).replace(String(a),"")||"px")}var d=l.forwardRef((function(e,t){var a=e.alignContent,o=void 0===a?"stretch":a,i=e.alignItems,s=void 0===i?"stretch":i,m=e.classes,d=e.className,p=e.component,u=void 0===p?"div":p,g=e.container,f=void 0!==g&&g,b=e.direction,x=void 0===b?"row":b,v=e.item,E=void 0!==v&&v,y=e.justify,h=void 0===y?"flex-start":y,j=e.lg,O=void 0!==j&&j,w=e.md,N=void 0!==w&&w,S=e.sm,C=void 0!==S&&S,k=e.spacing,z=void 0===k?0:k,T=e.wrap,D=void 0===T?"wrap":T,P=e.xl,A=void 0!==P&&P,R=e.xs,U=void 0!==R&&R,B=e.zeroMinWidth,M=void 0!==B&&B,W=Object(n.a)(e,["alignContent","alignItems","classes","className","component","container","direction","item","justify","lg","md","sm","spacing","wrap","xl","xs","zeroMinWidth"]),I=Object(c.a)(m.root,d,f&&[m.container,0!==z&&m["spacing-xs-".concat(String(z))]],E&&m.item,M&&m.zeroMinWidth,"row"!==x&&m["direction-xs-".concat(String(x))],"wrap"!==D&&m["wrap-xs-".concat(String(D))],"stretch"!==s&&m["align-items-xs-".concat(String(s))],"stretch"!==o&&m["align-content-xs-".concat(String(o))],"flex-start"!==h&&m["justify-xs-".concat(String(h))],!1!==U&&m["grid-xs-".concat(String(U))],!1!==C&&m["grid-sm-".concat(String(C))],!1!==N&&m["grid-md-".concat(String(N))],!1!==O&&m["grid-lg-".concat(String(O))],!1!==A&&m["grid-xl-".concat(String(A))]);return l.createElement(u,Object(r.a)({className:I,ref:t},W))})),p=Object(o.a)((function(e){return Object(r.a)({root:{},container:{boxSizing:"border-box",display:"flex",flexWrap:"wrap",width:"100%"},item:{boxSizing:"border-box",margin:"0"},zeroMinWidth:{minWidth:0},"direction-xs-column":{flexDirection:"column"},"direction-xs-column-reverse":{flexDirection:"column-reverse"},"direction-xs-row-reverse":{flexDirection:"row-reverse"},"wrap-xs-nowrap":{flexWrap:"nowrap"},"wrap-xs-wrap-reverse":{flexWrap:"wrap-reverse"},"align-items-xs-center":{alignItems:"center"},"align-items-xs-flex-start":{alignItems:"flex-start"},"align-items-xs-flex-end":{alignItems:"flex-end"},"align-items-xs-baseline":{alignItems:"baseline"},"align-content-xs-center":{alignContent:"center"},"align-content-xs-flex-start":{alignContent:"flex-start"},"align-content-xs-flex-end":{alignContent:"flex-end"},"align-content-xs-space-between":{alignContent:"space-between"},"align-content-xs-space-around":{alignContent:"space-around"},"justify-xs-center":{justifyContent:"center"},"justify-xs-flex-end":{justifyContent:"flex-end"},"justify-xs-space-between":{justifyContent:"space-between"},"justify-xs-space-around":{justifyContent:"space-around"},"justify-xs-space-evenly":{justifyContent:"space-evenly"}},function(e,t){var a={};return i.forEach((function(n){var r=e.spacing(n);0!==r&&(a["spacing-".concat(t,"-").concat(n)]={margin:"-".concat(m(r,2)),width:"calc(100% + ".concat(m(r),")"),"& > $item":{padding:m(r,2)}})})),a}(e,"xs"),e.breakpoints.keys.reduce((function(t,a){return function(e,t,a){var n={};s.forEach((function(e){var t="grid-".concat(a,"-").concat(e);if(!0!==e)if("auto"!==e){var r="".concat(Math.round(e/12*1e8)/1e6,"%");n[t]={flexBasis:r,flexGrow:0,maxWidth:r}}else n[t]={flexBasis:"auto",flexGrow:0,maxWidth:"none"};else n[t]={flexBasis:0,flexGrow:1,maxWidth:"100%"}})),"xs"===a?Object(r.a)(e,n):e[t.breakpoints.up(a)]=n}(t,e,a),t}),{}))}),{name:"MuiGrid"})(d);t.a=p},743:function(e,t,a){},767:function(e,t,a){"use strict";var n=a(1),r=a(3),l=a(0),c=(a(6),a(4)),o=a(5),i=a(646),s={variant:"head"},m=l.forwardRef((function(e,t){var a=e.classes,o=e.className,m=e.component,d=void 0===m?"thead":m,p=Object(r.a)(e,["classes","className","component"]);return l.createElement(i.a.Provider,{value:s},l.createElement(d,Object(n.a)({className:Object(c.a)(a.root,o),ref:t,role:"thead"===d?null:"rowgroup"},p)))}));t.a=Object(o.a)({root:{display:"table-header-group"}},{name:"MuiTableHead"})(m)},783:function(e,t,a){"use strict";var n=a(1),r=a(3),l=a(29),c=a(0),o=(a(6),a(4)),i=a(5),s=c.forwardRef((function(e,t){var a=e.classes,l=e.className,i=e.component,s=void 0===i?"div":i,m=e.disableGutters,d=void 0!==m&&m,p=e.variant,u=void 0===p?"regular":p,g=Object(r.a)(e,["classes","className","component","disableGutters","variant"]);return c.createElement(s,Object(n.a)({className:Object(o.a)(a.root,a[u],l,!d&&a.gutters),ref:t},g))}));t.a=Object(i.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center"},gutters:Object(l.a)({paddingLeft:e.spacing(2),paddingRight:e.spacing(2)},e.breakpoints.up("sm"),{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}),regular:e.mixins.toolbar,dense:{minHeight:48}}}),{name:"MuiToolbar"})(s)},785:function(e,t,a){"use strict";a.d(t,"a",(function(){return y}));var n=a(41),r=a(651),l=a(0),c=a.n(l),o=a(5),i=a(597),s=a(598),m=a(599),d=a(600),p=a(775),u=a(652),g=a.n(u),f=a(350),b=(a(743),a(717),a(737)),x=Object(o.a)((function(e){return{root:{margin:0,padding:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]}}}))((function(e){var t=e.children,a=e.classes,n=e.onClose,l=Object(r.a)(e,["children","classes","onClose"]);return c.a.createElement(s.a,Object.assign({disableTypography:!0,className:a.root},l),c.a.createElement(f.a,{variant:"h6"},t),n?c.a.createElement(p.a,{"aria-label":"close",className:a.closeButton,onClick:n},c.a.createElement(g.a,null)):null)})),v=Object(o.a)((function(e){return{root:{padding:e.spacing(2)}}}))(m.a),E=Object(o.a)((function(e){return{root:{margin:0,padding:e.spacing(1)}}}))(d.a);function y(e){var t=c.a.useState(!0),a=Object(n.a)(t,2),r=a[0],l=a[1],o=c.a.useState(!1),s=Object(n.a)(o,2),m=s[0],d=s[1],p=c.a.useState(),u=Object(n.a)(p,2),g=u[0],f=u[1],y=c.a.useState(0),h=Object(n.a)(y,2),j=(h[0],h[1],function(){"invoice"===e.popUpParams.uploadType&&!0===m?e.redirectToClaim(g):e.onClose(),l(!1)});return c.a.createElement("div",null,c.a.createElement(i.a,{fullWidth:!0,maxWidth:"md",onClose:j,"aria-labelledby":"customized-dialog-title",open:r},c.a.createElement(x,{id:"customized-dialog-title",onClose:j}),c.a.createElement(v,null,c.a.createElement(b.default,{popUpParams:e.popUpParams,onSuccess:function(e){return function(e){d(!0),f(e)}(e)},land:function(t){console.log("parent clicked",t),e.land(t)}})),c.a.createElement(E,null)))}},847:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return k}));var n=a(27),r=a(41),l=a(0),c=a.n(l),o=a(673),i=a(636),s=a(596),m=a(763),d=(a(717),a(113),a(785)),p=a(778),u=a(592),g=a(4),f=a(807),b=a(767),x=a(244),v=a(692),E=a(349),y=a(695),h=a(693),j=a(694),O=a(742),w=Object(x.a)({leftPane:{width:"60%"},rightPane:{width:"40%"},matCell:{fontSize:"14px",height:"160px",textAlign:"center",borderRight:"1px solid grey",width:"500px"},matCell1:{fontSize:"14px",height:"160px",textAlign:"center",borderRight:"1px  grey",width:"500px"}}),N={m:1,style:{width:"3rem",height:"2rem"},color:"black",textAlign:"center",align:"right",marginTop:"40px",border:"2px dashed #ccc"},S={m:1,style:{width:"12rem",height:"6rem"},color:"black",textAlign:"center",align:"right",marginTop:"5px",border:"2px dashed #ccc"},C={m:1,style:{width:"10rem",height:"2rem"},color:"Black",textAlign:"center",align:"right",marginTop:"2px",border:"2px  #ccc",bgcolor:"warning.main"};function k(e){var t=Object(l.useState)(!1),a=Object(r.a)(t,2),x=a[0],k=a[1],z=Object(l.useState)(0),T=Object(r.a)(z,2),D=T[0],P=T[1],A=w(),R=Object(l.useState)(!1),U=Object(r.a)(R,2),B=U[0],M=U[1],W=Object(l.useState)([]),I=Object(r.a)(W,2),L=I[0],H=I[1];Object(l.useEffect)((function(){}),[D]);var F=function(){console.log("Delivered clicked"),k(!0),P(D+1)};return c.a.createElement(c.a.Fragment,null,e.columnsValues.map((function(t,a){return c.a.createElement(o.a,{style:{width:"1000px",height:"200px"}},c.a.createElement(v.a,null,c.a.createElement(j.a,null,c.a.createElement(y.a,null,"In Progress"===e.tabSelected&&c.a.createElement(h.a,null,c.a.createElement(O.a,{item:!0,xs:5},c.a.createElement(u.a,{style:{fontSize:"13px",color:"grey"}},"Job Start Date")),c.a.createElement(O.a,{item:!0,xs:5},c.a.createElement(u.a,{style:{fontSize:"13px",color:"black"}},t.createdDate))),"Delivered"===e.tabSelected&&c.a.createElement(h.a,null,c.a.createElement(O.a,{item:!0,xs:5},c.a.createElement(u.a,{style:{fontSize:"13px",color:"grey"}},"Delivered on")),c.a.createElement(O.a,{item:!0,xs:5},c.a.createElement(u.a,{style:{fontSize:"13px",color:"black"}},"10/20/2020"))),"Completed"===e.tabSelected&&c.a.createElement(h.a,null,c.a.createElement(O.a,{item:!0,xs:5},c.a.createElement(u.a,{style:{fontSize:"13px",color:"grey"}},"Completed Date")),c.a.createElement(O.a,{item:!0,xs:5},c.a.createElement(u.a,{style:{fontSize:"13px",color:"black"}},"10/20/2020"))),c.a.createElement(h.a,null,c.a.createElement(O.a,{item:!0,xs:5},c.a.createElement(u.a,{style:{fontSize:"13px",color:"grey"}},"Job Number")),c.a.createElement(O.a,{item:!0,xs:5},c.a.createElement(u.a,{style:{fontSize:"13px",color:"black"}},t.referenceNumber))),"Delivered"===e.tabSelected&&c.a.createElement(h.a,null,c.a.createElement(O.a,{item:!0,xs:5},c.a.createElement(u.a,{style:{fontSize:"13px",color:"grey"}},"order Number")),c.a.createElement(O.a,{item:!0,xs:5},c.a.createElement(u.a,{style:{fontSize:"13px",color:"black"}},"#12345"))),c.a.createElement(h.a,null,c.a.createElement(O.a,{item:!0,xs:2},c.a.createElement(u.a,{style:{fontSize:"13px",color:"grey"}},"Token#")),c.a.createElement(O.a,{item:!0,xs:2},c.a.createElement(u.a,{style:{fontSize:"13px",color:"black"}},t.tokenNo))),c.a.createElement(h.a,null,c.a.createElement(O.a,{item:!0,xs:7},c.a.createElement(u.a,{style:{fontSize:"13px",color:"grey"}},"Number of containers")),c.a.createElement(O.a,{item:!0,xs:7},c.a.createElement(i.a,{style:{color:"red"},component:"button",variant:"body2",onClick:function(){M(!0),H(t.requestContainerList)}},t.noOfContainers)),c.a.createElement(f.a,{anchor:"right",open:B,onClose:function(){M(!1)},onOpen:function(){M(!0)}},(r="right",l=L,c.a.createElement("div",{className:Object(g.a)(A.list,Object(n.a)({},A.fullList,"top"===r||"bottom"===r))},c.a.createElement("br",null),c.a.createElement(u.a,{style:{fontSize:"20px",color:"grey",marginLeft:"15px"}}," ","Container Details"),c.a.createElement("br",null),c.a.createElement(m.a,null),c.a.createElement("br",null),c.a.createElement(v.a,{size:"small",style:{width:"320px",marginLeft:"12px"}},c.a.createElement(b.a,null,c.a.createElement(E.a,{elevation:0,style:{marginTop:"5px"}},c.a.createElement(y.a,null,c.a.createElement(h.a,{style:{fontSize:"13px",color:"grey"}},"Container Number"),c.a.createElement(h.a,{style:{fontSize:"13px",color:"grey"}},"ISO Code")))),c.a.createElement(j.a,null,l.map((function(e,t){return c.a.createElement(y.a,null,c.a.createElement(E.a,{variant:"outlined",style:{marginTop:"5px"}},c.a.createElement(h.a,{style:{fontSize:"13px",color:"grey"}},e.container_number),c.a.createElement(h.a,{style:{fontSize:"13px",color:"black"}},e.iso_code)))})))))))),c.a.createElement(h.a,null,c.a.createElement(i.a,{style:{color:"red"},component:"button",variant:"body2"},"Track")),"In Progress"===e.tabSelected&&c.a.createElement(h.a,null,c.a.createElement(s.a,{variant:"contained",color:"primary",style:{textTransform:"none"},onClick:F},"Delivered?")),"Delivered"===e.tabSelected&&c.a.createElement(h.a,null,c.a.createElement(p.a,C,"POD not verified")),"Completed"===e.tabSelected&&c.a.createElement(h.a,null,c.a.createElement(s.a,{variant:"contained",color:"primary",style:{textTransform:"none"}},"Claim Amount"))))),c.a.createElement(y.a,null,c.a.createElement(h.a,{className:A.matCell},c.a.createElement("div",{className:"row"},c.a.createElement(p.a,N),c.a.createElement("img",{src:"../from_to.svg",style:{marginTop:"7px"}}),c.a.createElement(p.a,S),c.a.createElement("img",{src:"../from_to.svg",style:{marginTop:"7px"}}),c.a.createElement(p.a,N)),c.a.createElement(m.a,{orientation:"vertical",flexItem:!0})),c.a.createElement(h.a,{className:A.matCell1},c.a.createElement(p.a,{style:{border:"2px dashed #ccc",height:"90px",width:"500px",marginBottom:"25px"}},c.a.createElement("div",{className:"row"},c.a.createElement(p.a,{style:{height:"30px",width:"200px",border:"2px solid #ccc",marginTop:"30px",marginLeft:"30px"}},t.vehicleRegNo),c.a.createElement(p.a,{style:{height:"30px",width:"200px",border:"2px solid #ccc",marginTop:"30px",marginLeft:"30px"}},t.vehicleType))))));var r,l})),x&&c.a.createElement(d.a,{onClose:function(){k(!1)}}))}}}]);
//# sourceMappingURL=38.d6809b23.chunk.js.map