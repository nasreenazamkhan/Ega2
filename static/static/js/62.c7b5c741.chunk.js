(this.webpackJsonpptms=this.webpackJsonpptms||[]).push([[62],{772:function(e,t,a){"use strict";var n=a(114),c=a(115),r=a(160),o=a(138),l=function(){function e(){Object(n.a)(this,e)}return Object(c.a)(e,[{key:"fetchSettlements",value:function(e,t){var a={url:"".concat(r.H,"?fromDate=").concat(e,"&toDate=").concat(t)};return Object(o.a)(a,!1)}},{key:"fetchInvoice",value:function(e){var t={url:"".concat(r.A,"?jobRefNo=").concat(e)};return Object(o.a)(t,!1)}},{key:"fetchInvoiceSubmittedJobs",value:function(){var e={url:"".concat(r.C)};return Object(o.a)(e,!1)}},{key:"approveInvoice",value:function(e){var t={url:r.b,body:{jobRefNo:e}};return Object(o.c)(t,!0).catch((function(e){return e}))}},{key:"rejectInvoice",value:function(e,t){var a={url:r.R,body:{jobRefNo:e,remarks:t}};return Object(o.c)(a,!0).catch((function(e){return e}))}},{key:"fetchInvoiceApprovedJobs",value:function(e,t){var a={url:"".concat(r.B,"?fromDate=").concat(e,"&toDate=").concat(t)};return Object(o.a)(a,!1)}},{key:"markJobAsPaid",value:function(e,t){var a={url:r.P,body:{jobRefNo:e,paymentRefNo:t}};return Object(o.c)(a,!0).catch((function(e){return e}))}},{key:"loadEmptyInContainers",value:function(){var e={url:r.O};return Object(o.a)(e,!1)}},{key:"updateTokenInDetails",value:function(e){var t={url:r.hb,body:e};return Object(o.c)(t,!0).catch((function(e){return e}))}},{key:"fetchExpiredCountForDashBoard",value:function(){var e={url:r.e};return Object(o.a)(e,!1)}},{key:"fetchPendingTokenJobCount",value:function(){var e={url:r.g};return Object(o.a)(e,!1)}}]),e}();t.a=new l},784:function(e,t,a){},814:function(e,t,a){"use strict";var n=a(41),c=a(0),r=a.n(c),o=a(244),l=a(349),i=a(352),u=a(775),s=a(763),m=a(588),f=a(727),d=a(845),p=(a(784),a(257)),h=Object(o.a)((function(){return{root:{padding:"2px 4px",display:"flex",alignItems:"center",width:700,flexGrow:1,marginTop:15},input:{marginLeft:p.a.spacing(1),flex:1},iconButton:{padding:10},divider:{height:28,margin:4}}}));t.a=function(e){var t=h(),a=Object(c.useState)(),o=Object(n.a)(a,2),p=o[0],b=o[1],v=Object(c.useState)(),F=Object(n.a)(v,2),y=F[0],g=F[1],E=Object(c.useState)(e.optionValues),O=Object(n.a)(E,2),x=O[0];O[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.a,{component:"form",className:t.root},r.a.createElement(i.a,{value:null!==p&&void 0!==p?p:e.defaultValue,className:t.input,onChange:function(t){return e.changeValue((b((a=t).target.value),a.target.value));var a},placeholder:"Search by ".concat(null!==y&&void 0!==y?y:e.defaultType),inputProps:{"aria-label":"Search by ".concat(null!==y&&void 0!==y?y:e.defaultType)}}),r.a.createElement(u.a,{onClick:function(){return e.searchClick({serviceType:null!==y&&void 0!==y?y:e.defaultType,serviceNumber:p})},className:t.iconButton,"aria-label":"search"},r.a.createElement(d.a,null)),r.a.createElement(s.a,{className:t.divider,orientation:"vertical"}),r.a.createElement(m.a,{id:"standard-select-currency",select:!0,value:null!==y&&void 0!==y?y:e.defaultType,onChange:function(t){return e.changeType((g((a=t).target.value),a.target.value));var a},variant:"outlined",size:"small"},x.map((function(e,t){return r.a.createElement(f.a,{key:t,value:e.value},e.label)})))))}},904:function(e,t,a){"use strict";a.r(t);var n=a(19),c=a.n(n),r=a(42),o=a(41),l=a(0),i=a.n(l),u=a(244),s=a(742),m=a(673),f=a(699),d=a(857),p=a(592),h=a(775),b=a(850),v=a.n(b),F=a(25),y=a(772),g=a(814),E=Object(u.a)((function(e){return{root:{flexGrow:1},paper:{padding:e.spacing(2),margin:"auto",maxWidth:1200},splitScreen:{display:"flex",flexDirection:"row"},leftPane:{width:"33%"},middlePane:{width:"32%"},rightPane:{width:"35%"},cardStyle:{width:"350px",height:"120px",marginTop:30,backgroundColor:"#FF7575"},cardStyle1:{width:"350px",height:"120px",marginTop:30,backgroundColor:"#FFBA42"},cardStyle2:{width:"350px",height:"120px",marginTop:30,backgroundColor:"#59B7FF"}}})),O=[{value:"DECLARATION",label:"By Declaration Number"},{value:"BOOKING",label:"By Booking Number"},{value:"CONTAINER",label:"By Container Number"}];t.default=i.a.memo((function(){var e=E(),t=Object(F.f)(),a=Object(l.useState)(null),n=Object(o.a)(a,2),u=n[0],b=n[1],x=Object(l.useState)(""),j=Object(o.a)(x,2),S=(j[0],j[1]),k=Object(l.useState)(""),T=Object(o.a)(k,2),I=(T[0],T[1]),N=Object(l.useState)(null),w=Object(o.a)(N,2),C=w[0],P=w[1],D=Object(l.useState)(null),z=Object(o.a)(D,2),B=z[0],A=z[1];return Object(l.useEffect)((function(){var e=function(){var e=Object(r.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:y.a.fetchExpiredCountForDashBoard().then((function(e){console.log(e.data.dataItems[0].EXP),b(e.data.dataItems[0].EXP)})).catch((function(e){console.log("error")}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),t=function(){var e=Object(r.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:y.a.fetchPendingTokenJobCount().then((function(e){console.log("------",e.data.dataItems[0].PTOK),console.log("------**",e.data.dataItems[0].PMTTOK),P(e.data.dataItems[0].PTOK+e.data.dataItems[0].PMTTOK),A(e.data.dataItems[0].INVSUBMT+e.data.dataItems[0].PODUPL)})).catch((function(e){console.log("error")}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e(),t()}),[]),i.a.createElement(i.a.Fragment,null,i.a.createElement(s.a,{container:!0,direction:"row",justify:"center",alignItems:"center",xs:12},i.a.createElement(s.a,{item:!0,container:!0,xs:12,sm:10,md:8},i.a.createElement(g.a,{optionValues:O,changeValue:function(e){return S(e)},defaultType:"DECLARATION",changeType:function(e){return I(e)},searchClick:function(e){return function(e){console.log("event",e);var a={search:e,from:!0};t.push("/search-by-service",a)}(e)}}))),i.a.createElement(s.a,{container:!0,xs:12,sm:!0,spacing:1},i.a.createElement(s.a,{item:!0,xs:12,sm:4,md:4},i.a.createElement(m.a,{className:e.cardStyle},i.a.createElement(f.a,null,i.a.createElement(d.a,null,i.a.createElement(s.a,{container:!0},i.a.createElement(s.a,{item:!0,xs:6,style:{fontSize:"45px",color:"#FFFFFF",align:"center"}},u),i.a.createElement(s.a,{item:!0,xs:6},i.a.createElement(p.a,{style:{fontSize:"20px",color:"#FFFFFF"}}," Expired Jobs"),i.a.createElement(p.a,{style:{fontSize:"13px",color:"#FFFFFF",fontStyle:"italic",fontWeight:"light"}},"Trucks not assigned"),i.a.createElement(h.a,{onClick:function(){t.push("/expiredJobs")}}," ",i.a.createElement(v.a,{style:{color:"white",fontSize:"30px",float:"right"}})))))))),i.a.createElement(s.a,{item:!0,xs:12,sm:4,md:4},i.a.createElement(m.a,{className:e.cardStyle1},i.a.createElement(f.a,null,i.a.createElement(d.a,null,i.a.createElement(s.a,{container:!0},i.a.createElement(s.a,{item:!0,xs:6,style:{fontSize:"45px",color:"#FFFFFF",align:"center"}},C),i.a.createElement(s.a,{item:!0,xs:6},i.a.createElement(p.a,{style:{fontSize:"20px",color:"#FFFFFF"}}," Update Token"),i.a.createElement(p.a,{style:{fontSize:"13px",color:"#FFFFFF",fontStyle:"italic",fontWeight:"light"}},"Generate to start job"),i.a.createElement(h.a,{onClick:function(){t.push("/assignToken")}}," ",i.a.createElement(v.a,{style:{color:"white",fontSize:"30px",float:"right"}})))))))),i.a.createElement(s.a,{item:!0,xs:12,sm:4,md:4},i.a.createElement(m.a,{className:e.cardStyle2},i.a.createElement(f.a,null,i.a.createElement(d.a,null,i.a.createElement(s.a,{container:!0},i.a.createElement(s.a,{item:!0,xs:6,style:{fontSize:"45px",color:"#FFFFFF",align:"center"}},B),i.a.createElement(s.a,{item:!0,xs:6},i.a.createElement(p.a,{style:{fontSize:"20px",color:"#FFFFFF"}}," Verify Documents"),i.a.createElement(p.a,{style:{fontSize:"13px",color:"#FFFFFF",fontStyle:"italic",fontWeight:"light"}},"Invoices/POD"),i.a.createElement(h.a,{onClick:function(){t.push("/verifyDocument")}}," ",i.a.createElement(v.a,{style:{color:"white",fontSize:"30px",float:"right"}}))))))))))}))}}]);
//# sourceMappingURL=62.c7b5c741.chunk.js.map