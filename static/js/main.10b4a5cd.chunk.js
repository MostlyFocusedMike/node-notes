(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,t,n){e.exports=n(39)},23:function(e,t,n){},25:function(e,t,n){},27:function(e){e.exports=["test","testerino","tester","new-file","ok neato","why-refresh"]},31:function(e,t,n){var a={"./new-file.md":32,"./ok neato.md":33,"./test.md":34,"./tester.md":35,"./testerino.md":36,"./why-refresh.md":37};function i(e){var t=o(e);return n(t)}function o(e){var t=a[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}i.keys=function(){return Object.keys(a)},i.resolve=o,e.exports=i,i.id=31},32:function(e,t,n){e.exports=n.p+"static/media/new-file.7367aa21.md"},33:function(e,t,n){e.exports=n.p+"static/media/ok neato.d812c3d4.md"},34:function(e,t,n){e.exports=n.p+"static/media/test.994ac91a.md"},35:function(e,t,n){e.exports=n.p+"static/media/tester.909ba826.md"},36:function(e,t,n){e.exports=n.p+"static/media/testerino.b0b37e9a.md"},37:function(e,t,n){e.exports=n.p+"static/media/why-refresh.6af8fae8.md"},39:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(14),r=n.n(o),c=n(41),l=(n(23),n(3)),s=n(4),u=n(8),h=n(7),m=n(9),d=(n(25),n(40)),f=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(h.a)(t).call(this))).state={files:[]},e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){var e=n(27);this.setState({files:e})}},{key:"render",value:function(){return console.log("props",this.props),i.a.createElement("div",{id:"notes-dir"},i.a.createElement("h1",null,"Files"),this.props.viewInfo.editing&&this.props.viewInfo.local?i.a.createElement(d.a,{to:"/"},"New File"):"",this.state.files.map(function(e,t){return i.a.createElement(d.a,{to:"/notes/".concat(e),key:t},e)}))}}]),t}(i.a.Component),p=n(43),v=n(42),g=n(15),b=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("form",{onChange:this.props.handleChange,onSubmit:this.props.handleSubmit},i.a.createElement("label",{htmlFor:"title"},"title"),i.a.createElement("input",{id:"title",name:"title",type:"text",value:this.props.newNote.title}),i.a.createElement("label",{htmlFor:"text"},"text"),i.a.createElement("textarea",{id:"text",name:"text",value:this.props.newNote.text}),i.a.createElement("button",null,"Submit"))}}]),t}(i.a.Component),w=n(16),E=n.n(w),O=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(h.a)(t).call(this))).state={markdown:""},e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"renderWelcome",value:function(){return"# hello there \n ## start adding markdown to get started"}},{key:"render",value:function(){var e=this.props.note,t=e.title,n=e.text||this.renderWelcome(),a=E()(n);return i.a.createElement("div",{id:"md-preview"},i.a.createElement("h1",null,"Preview of: ",t),i.a.createElement("div",{dangerouslySetInnerHTML:{__html:a}}))}}]),t}(i.a.Component),j=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{id:"mode-bar"},i.a.createElement("h1",null,"Currently in ",this.props.viewInfo.editing?"Editing":"Viewing"," mode"),i.a.createElement("button",{onClick:this.props.toggleEdit},"Toggle"))}}]),t}(i.a.Component),y=function(){function e(){Object(l.a)(this,e)}return Object(s.a)(e,null,[{key:"getOne",value:function(e){return fetch("".concat("http://localhost:8100","/notes/").concat(e)).then(function(e){return e.json()})}},{key:"create",value:function(e){var t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};return fetch("".concat("http://localhost:8100","/notes"),t).then(function(e){return e.json()})}}]),e}(),k=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(h.a)(t).call(this))).handleChange=function(t){e.setState(Object(g.a)({},t.target.name,t.target.value))},e.handleSubmit=function(t){t.preventDefault(),y.create(e.state)},e.initState={title:"",text:""},e.state=e.initState,e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"loadFile",value:function(e){var t=this;if(e){var a=n(31)("./"+e+".md");fetch(a).then(function(e){return e.text()}).then(function(n){t.setState(function(t){return{title:e,text:n}})})}else this.setState(this.initState)}},{key:"componentDidMount",value:function(){this.props.match.params.fileName&&this.loadFile(this.props.match.params.fileName)}},{key:"componentDidUpdate",value:function(e,t,n){this.props.match.params.fileName!==e.match.params.fileName&&this.loadFile(this.props.match.params.fileName)}},{key:"render",value:function(){return i.a.createElement("div",{className:"note"},this.props.viewInfo.editing?i.a.createElement(b,{handleChange:this.handleChange,handleSubmit:this.handleSubmit,newNote:this.state,viewInfo:this.props.viewInfo,toggleEdit:this.props.toggleEdit}):"",i.a.createElement(O,{note:this.state,viewInfo:this.props.viewInfo}),this.props.viewInfo.local?i.a.createElement(j,{viewInfo:this.props.viewInfo,toggleEdit:this.props.toggleEdit}):"")}}]),t}(i.a.Component),x=function(e){var t=e.viewInfo,n=e.toggleEdit;return i.a.createElement(p.a,null,i.a.createElement(v.a,{exact:!0,path:"/",render:function(e){return i.a.createElement(k,Object.assign({},e,{viewInfo:t,toggleEdit:n}))}}),i.a.createElement(v.a,{exact:!0,path:"/notes/:fileName",render:function(e){return i.a.createElement(k,Object.assign({},e,{viewInfo:t,toggleEdit:n}))}}),i.a.createElement(v.a,{exact:!0,path:"*",render:function(e){return i.a.createElement(k,Object.assign({},e,{viewInfo:t,toggleEdit:n}))}}))},S=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(h.a)(t).call(this))).toggleEdit=function(){e.setState(function(e){return{editing:!e.editing}})},e.initState={editing:!1,local:!1},e.state=e.initState,e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){window.location.href.match("//localhost:")&&(console.log("hello",window.location.href),this.setState({local:!0,editing:!0}))}},{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement(f,{viewInfo:this.state}),i.a.createElement(x,{viewInfo:this.state,toggleEdit:this.toggleEdit}))}}]),t}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(c.a,null,i.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[18,2,1]]]);
//# sourceMappingURL=main.10b4a5cd.chunk.js.map