(this.webpackJsonpfermentationtracker=this.webpackJsonpfermentationtracker||[]).push([[0],{78:function(e,t,c){},84:function(e,t,c){},85:function(e,t,c){},88:function(e,t,c){"use strict";c.r(t);var n=c(26),r=c(17),a=c.n(r),s=c(1),o=c(24),i=c(12),l=c(0),j=c.n(l),u=c(20),b=c.n(u),d=function(e){return Object(s.jsxs)("div",{children:[Object(s.jsx)("input",{className:"form-control ".concat(e.errorPresent?"form-error":""),type:e.type,id:e.for,name:e.title,onChange:function(t){parseInt(t.target.value)&&parseInt(t.target.value)<0||e.onChange(t.target.value)},value:"".concat(null===e.value?"":e.value),placeholder:e.title,required:!0,readOnly:!!e.readOnly&&e.readOnly}),Object(s.jsx)("br",{})]})},h=function(e){return Object(s.jsxs)("div",{children:[Object(s.jsx)("textarea",{class:"form-control",id:e.for,rows:"3",onChange:function(t){return e.onChange(t.target.value)},placeholder:e.title,value:e.value?e.value:null}),Object(s.jsx)("br",{})]})},O=c(91),x=c(92),p=c(50),f=c(101),m=c(95),g=j.a.createContext([]),v=g.Provider,y=g.Consumer,C=c(23),k=c.n(C),P=c(22),w=c(97),N=c(93),S=c(94),T=c(31),F=(c(78),function(e){var t=e.project,c=e.handleStatusChange,n=e.handleDelete,r=e.handleEditClick,a=Object(l.useState)(!1),o=Object(i.a)(a,2),j=o[0],u=o[1];return Object(l.useEffect)((function(){!function(e){var t=Object(w.a)(new Date,"yyyy-MM-dd"),c=Object(w.a)(Object(N.a)(e),"yyyy-MM-dd");Object(S.a)(Object(N.a)(t),Object(N.a)(c))<0&&u(!0)}(t.time)}),[]),Object(s.jsx)(p.a,{className:"project-col",children:Object(s.jsxs)(f.a,{children:[Object(s.jsxs)(f.a.Header,{children:[j&&t.active?Object(s.jsx)("i",{className:"fas fa-exclamation mr-4 mt-1",style:{color:"red",fontSize:"1.5rem"},title:"This project is past due!"}):null,Object(s.jsx)(f.a.Title,{className:"mt-1",children:t.projectName})]}),Object(s.jsxs)(f.a.Body,{children:[Object(s.jsxs)(f.a.Text,{className:"text-left",children:[Object(s.jsx)("strong",{children:"Description:"})," ",t.description," ",Object(s.jsx)("br",{}),Object(s.jsx)("strong",{children:"Total Dry Weight (g):"})," ",t.weight," g ",Object(s.jsx)("br",{}),Object(s.jsx)("strong",{children:"Salt Percentage:"})," ",t.saltPercentage,"% ",Object(s.jsx)("br",{}),Object(s.jsx)("strong",{children:"Total Salt:"})," ",t.saltWeight," g ",Object(s.jsx)("br",{}),t.active?Object(s.jsxs)("div",{children:[Object(s.jsx)("strong",{children:"Complete on:"})," ",t.time,Object(s.jsx)("br",{})]}):Object(s.jsxs)("div",{children:[Object(s.jsx)("strong",{children:"Completed on:"})," ",t.time,Object(s.jsx)("br",{})]}),Object(s.jsx)("strong",{children:"Notes:"}),Object(s.jsx)("br",{})," ",""===t.notes?"N/A":t.notes]}),Object(s.jsxs)(x.a,{className:"mt-4 btn-row",children:[Object(s.jsx)(p.a,{className:"btn-col",children:t.active?Object(s.jsx)(m.a,{className:"ut-btn",onClick:c,id:t._id,children:"Complete Project"}):null}),Object(s.jsx)(p.a,{className:"btn-col",children:Object(s.jsx)(m.a,{variant:"danger",className:"ut-btn",onClick:n,id:t._id,children:"Delete Project"})}),Object(s.jsx)(p.a,{className:"btn-col",children:t.active?Object(s.jsx)(T.b,{to:"/projectForm",children:Object(s.jsx)(m.a,{variant:"warning",className:"ut-btn",onClick:function(){return r(t)},id:t._id,children:"Edit Project"})}):null})]})]})]},t._id)})}),E=function(e){var t=e.projectState;return Object(s.jsxs)(f.a,{id:"empty-card",children:[Object(s.jsx)(f.a.Header,{className:"empty-header",children:Object(s.jsxs)(f.a.Title,{className:"mt-2",children:["You haven't ",t?"added":"archived"," any projects yet!"]})}),Object(s.jsx)(f.a.Body,{children:Object(s.jsxs)(f.a.Text,{children:["This page will contain projects ",t?"you're currently working on!":"you've completed and archived!",". ",Object(s.jsx)("br",{}),t?"You can start tracking projects by filling out the form!":"You can complete and archive a project in the active projects screen!"]})})]})},D=function(e){var t=e.projectState,c=e.setSelectedProject,r=Object(l.useContext)(y),a=[r.projects,r.setProjects,r.setEdit],o=a[0],i=a[1],j=a[2],u=o.filter((function(e){return e.active===t})),b=function(e){if(!0===window.confirm("Mark project as completed?")){k.a.patch("/fermentation/projects",{id:e.target.id}).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}));var t=o.findIndex((function(t){return t._id===e.target.id}));o[t].active=!1,i(Object(n.a)(o)),P.a.success("Project moved to archive!",{position:"bottom-center",autoClose:4e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!1,draggable:!1,progress:void 0})}},d=function(e){c(e),j(!0)},h=function(e){if(!0===window.confirm("Are you sure you want to delete this project?")){k.a.delete("/fermentation/projects",{data:{id:e.target.id}}).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}));var t=o.filter((function(t){return t._id!==e.target.id}));i(t),P.a.success("Project Deleted!",{position:"bottom-center",autoClose:3e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!1,draggable:!1,progress:void 0})}};return Object(s.jsx)(O.a,{style:{height:"100rem"},children:Object(s.jsx)(x.a,{children:0===u.length?Object(s.jsx)(p.a,{className:"d-flex justify-content-center",children:Object(s.jsx)(E,{projectState:t})}):u.map((function(e){return Object(s.jsx)(F,{project:e,handleStatusChange:b,handleDelete:h,handleEditClick:d})}))})})},B=c.p+"static/media/logo.82fea119.png",_=(c(84),c(96)),H=function(){return Object(s.jsx)(O.a,{children:Object(s.jsxs)(x.a,{children:[Object(s.jsx)(p.a,{children:Object(s.jsx)(_.a,{src:B,alt:"brand logo",className:"logo"})}),Object(s.jsxs)(p.a,{className:"text-center text-col",children:[Object(s.jsx)("h1",{children:"Fermentation Tracker"})," ",Object(s.jsx)("br",{}),Object(s.jsxs)("p",{children:[" This a web app for tracking different lacto-fermentation projects! ",Object(s.jsx)("br",{})," ",Object(s.jsx)("br",{}),"For more information about the background or technical workings of this app, please checkout the readme located in the project's",Object(s.jsx)("a",{href:"https://github.com/akennedy94/FermentationTracker",alt:"github link",children:"\xa0github repository."})," ",Object(s.jsx)("br",{})," ",Object(s.jsx)("br",{}),"To begin using this app, click the button below to be taken to the project form! ",Object(s.jsx)("br",{})," ",Object(s.jsx)("br",{})]}),Object(s.jsx)(x.a,{className:"justify-content-center mb-2",children:Object(s.jsx)(m.a,{href:"/projectForm",className:"btn btn-lg",children:"Get Started!"})})]})]})})},A=c(98),W=c(100),I=c(99),L=c(8);c(85),c(86);P.a.configure();var M=function(){var e=Object(l.useState)([]),t=Object(i.a)(e,2),c=t[0],n=t[1],r=Object(l.useState)(!1),j=Object(i.a)(r,2),u=j[0],b=j[1],d=Object(l.useState)({}),h=Object(i.a)(d,2),O=h[0],x=h[1],p=c.filter((function(e){return!0===e.active})).length,f=c.filter((function(e){return!1===e.active})).length;function m(){return(m=Object(o.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.get("/fermentation/projects").then((function(e){n(e.data)})).catch((function(e){return console.log(e)}));case 2:e.sent;case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(l.useEffect)((function(){!function(){m.apply(this,arguments)}()}),[]),Object(s.jsx)(T.a,{children:Object(s.jsxs)(v,{value:{projects:c,setProjects:n,setEdit:b},children:[Object(s.jsxs)(A.a,{bg:"light",expand:"lg",children:[Object(s.jsx)(A.a.Brand,{children:"Fermentation Tracker"}),Object(s.jsx)(A.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(s.jsx)(A.a.Collapse,{id:"basic-navbar-nav",children:Object(s.jsxs)(W.a,{children:[Object(s.jsx)(W.a.Link,{href:"/",children:"Home"}),Object(s.jsx)(W.a.Link,{href:"/projectForm",children:"Project Form"}),Object(s.jsxs)(W.a.Link,{href:"/active",children:[p," Active Project",1===p?"":"s"]}),Object(s.jsxs)(W.a.Link,{href:"/archive",children:[f," Archived Project",1===f?"":"s"]})]})})]}),Object(s.jsxs)(L.c,{children:[Object(s.jsx)(L.a,{exact:!0,path:"/",component:function(){return Object(s.jsx)(H,{})}}),Object(s.jsx)(L.a,{exact:!0,path:"/projectForm",component:function(){return Object(s.jsx)(z,{edit:u,selectedProject:O})}}),Object(s.jsx)(L.a,{exact:!0,path:"/active",component:function(){return Object(s.jsx)(D,{setSelectedProject:x,projectState:!0})}}),Object(s.jsx)(L.a,{exact:!0,path:"/archive",component:function(){return Object(s.jsx)(D,{projectState:!1})}})]})]})})},z=function(e){var t=e.edit,c=e.selectedProject,r=Object(l.useContext)(y),j=[r.projects,r.setProjects,r.setEdit],u=j[0],b=j[1],O=j[2],f=Object(l.useState)(null),g=Object(i.a)(f,2),v=g[0],C=g[1],w=Object(l.useState)(null),N=Object(i.a)(w,2),S=N[0],T=N[1],F=Object(l.useState)(null),E=Object(i.a)(F,2),D=E[0],B=E[1],_=Object(l.useState)(null),H=Object(i.a)(_,2),A=H[0],W=H[1],L=Object(l.useState)(null),M=Object(i.a)(L,2),z=M[0],Y=M[1],J=Object(l.useState)(null),U=Object(i.a)(J,2),q=U[0],G=U[1],K=Object(l.useState)(null),Q=Object(i.a)(K,2),R=Q[0],V=Q[1],X=Object(l.useState)(null),Z=Object(i.a)(X,2),$=Z[0],ee=Z[1],te=Object(l.useState)(!1),ce=Object(i.a)(te,2),ne=ce[0],re=ce[1],ae=function(){return!0===(null!==v&&null!==S&&null!==D&&null!==A&&null!==q)?{built:!0,newProject:{projectName:v,description:S,weight:D,saltPercentage:A,saltWeight:z,time:q,active:!0,notes:R}}:(window.alert("Please fill out all of the fields!"),{built:!1})},se=function(){var e=Object(o.a)(a.a.mark((function e(t){var c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),re(!0),(c=ae()).built&&(le(c.newProject).then((function(e){return b([].concat(Object(n.a)(u),[e]))})),P.a.success("Project Added!",{position:"bottom-center",autoClose:3e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!1,draggable:!1,progress:void 0}),ie());case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),oe=function(){var e=Object(o.a)(a.a.mark((function e(t){var c,r,s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),(c=ae()).built&&(je($,c.newProject).then((function(e){return c.newProject._id=e})),r=u.findIndex((function(e){return e._id===$})),(s=Object(n.a)(u)).splice(r,1,c.newProject),b(s),ie(),P.a.success("Project Updated!",{position:"bottom-center",autoClose:3e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!1,draggable:!1,progress:void 0}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ie=function(){re(!1),O(!1),C(null),T(null),B(null),W(null),G(null),V(null),ee(null)},le=function(){var e=Object(o.a)(a.a.mark((function e(t){var c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.post("/fermentation/projects",t).then((function(e){c=e.data.addedProject})).catch((function(e){return console.log(e)}));case 2:return e.abrupt("return",c);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),je=function(){var e=Object(o.a)(a.a.mark((function e(t,c){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.patch("/fermentation/projects/update",{id:t,project:c}).then((function(e){return n=e.data.id})).catch((function(e){return console.log(e)}));case 2:return e.abrupt("return",n);case 3:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}();return Object(l.useEffect)((function(){Y((D*(A/100)).toFixed(2))}),[D,A]),Object(l.useEffect)((function(){t&&(C(c.projectName),T(c.description),B(c.weight),W(c.saltPercentage),G(c.time),V(c.notes),ee(c._id))}),[t]),Object(s.jsx)("div",{className:"section",children:Object(s.jsx)("div",{className:"box",children:Object(s.jsxs)(I.a,{id:"form",children:[Object(s.jsx)(I.a.Label,{className:"label",children:"Fermentation Tracker"}),Object(s.jsx)(x.a,{className:"mt-2",children:Object(s.jsx)(p.a,{children:Object(s.jsx)(d,{for:"project",type:"text",title:"Project Name",onChange:C,errorPresent:ne&&null===v,value:v})})}),Object(s.jsx)(x.a,{className:"mt-2",children:Object(s.jsx)(p.a,{children:Object(s.jsx)(d,{for:"description",type:"text",title:"Description",onChange:T,errorPresent:ne&&null===S,value:S})})}),Object(s.jsx)(x.a,{className:"mt-2",children:Object(s.jsx)(p.a,{children:Object(s.jsx)(d,{for:"weight",type:"number",title:"Dry Weight of Ferment (g)",onChange:B,errorPresent:ne&&null===D,value:D})})}),Object(s.jsx)(x.a,{className:"mt-2",children:Object(s.jsx)(p.a,{children:Object(s.jsx)(d,{for:"salt",type:"number",title:"Salt %",onChange:W,errorPresent:ne&&null===A,value:A})})}),Object(s.jsx)(x.a,{children:Object(s.jsxs)(p.a,{children:[Object(s.jsx)("label",{children:"Calculated Salt Weight (g)"}),Object(s.jsx)(d,{for:"saltWeight",type:"number",title:"Salt Weight (g)",value:z,readOnly:!0})]})}),Object(s.jsx)(x.a,{children:Object(s.jsxs)(p.a,{children:[Object(s.jsx)("label",{children:"Complete on"}),Object(s.jsx)(d,{for:"time",type:"date",title:"Complete on",onChange:G,errorPresent:ne&&null===q,value:q})]})}),Object(s.jsx)(x.a,{children:Object(s.jsxs)(p.a,{children:[Object(s.jsx)("label",{children:"Additional Notes?"}),Object(s.jsx)("br",{}),Object(s.jsx)(h,{for:"notes",type:"text",title:"Additional notes",onChange:V,value:R})]})}),Object(s.jsxs)(x.a,{children:[Object(s.jsx)(p.a,{children:Object(s.jsx)(m.a,{className:"ut-btn",type:"submit",id:"formButton",onClick:function(e){t?oe(e):se(e)},children:t?"Submit Edits":"Submit"})}),Object(s.jsx)(p.a,{children:t?Object(s.jsx)(m.a,{className:"ut-btn",variant:"danger",size:"lg",onClick:function(){return ie(),void P.a.warning("Updates Canceled!",{position:"bottom-center",autoClose:3e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!1,draggable:!1,progress:void 0})},children:"Cancel changes"}):Object(s.jsx)(m.a,{className:"ut-btn",variant:"danger",size:"lg",onClick:function(){return ie()},children:"Clear Form"})})]})]})})})};b.a.render(Object(s.jsx)(M,{}),document.getElementById("root"))}},[[88,1,2]]]);
//# sourceMappingURL=main.36a70718.chunk.js.map