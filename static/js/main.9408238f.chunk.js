(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){"use strict";var a=n(2),i=n(3),o="http://localhost:8100",r=function(){function e(){Object(a.a)(this,e)}return Object(i.a)(e,null,[{key:"getOne",value:function(e){return fetch("".concat(o,"/notes/").concat(e)).then(function(e){return e.json()})}},{key:"create",value:function(e){var t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};return fetch("".concat(o,"/notes"),t).then(function(e){return e.json()}).catch(console.log)}},{key:"update",value:function(e){var t={method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};return console.log("Note in update:",e),fetch("".concat(o,"/notes/").concat(e.title),t).then(function(e){return e.json()})}},{key:"reload",value:function(e){return fetch("".concat(o,"/reload"),{method:"PUT"}).then(function(e){return e.text()})}}]),e}();t.a=r},21:function(e,t,n){"use strict";(function(e){var a=n(2),i=n(3),o=n(6),r=n(5),c=n(7),l=n(0),s=n.n(l),u=n(23),d=(n(35),n(25)),h=n(24),m=function(e){function t(){var e;return Object(a.a)(this,t),(e=Object(o.a)(this,Object(r.a)(t).call(this))).toggleEdit=function(){e.setState(function(e){return{editing:!e.editing}})},e.initState={editing:!1,local:!1},e.state=e.initState,e}return Object(c.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){window.location.href.match("//localhost:")&&(console.log("hello",window.location.href),this.setState({local:!0,editing:!0}))}},{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(d.a,{viewInfo:this.state}),s.a.createElement(h.a,{viewInfo:this.state,toggleEdit:this.toggleEdit}))}}]),t}(s.a.Component);t.a=Object(u.hot)(e)(m)}).call(this,n(34)(e))},229:function(e,t,n){var a={"./hapi-notes.md":230,"./hapi-pal.md":231,"./javascript.md":232,"./knex.md":233,"./test 2.md":234,"./test.md":235,"./test2.md":236};function i(e){var t=o(e);return n(t)}function o(e){var t=a[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}i.keys=function(){return Object.keys(a)},i.resolve=o,e.exports=i,i.id=229},230:function(e,t,n){e.exports=n.p+"static/media/hapi-notes.5369a74d.md"},231:function(e,t,n){e.exports=n.p+"static/media/hapi-pal.d5395c67.md"},232:function(e,t,n){e.exports=n.p+"static/media/javascript.d41d8cd9.md"},233:function(e,t,n){e.exports=n.p+"static/media/knex.9ecfae0a.md"},234:function(e,t,n){e.exports=n.p+"static/media/test 2.d41d8cd9.md"},235:function(e,t,n){e.exports=n.p+"static/media/test.384b8b57.md"},236:function(e,t,n){e.exports=n.p+"static/media/test2.d41d8cd9.md"},238:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(20),r=n.n(o),c=n(240),l=(n(32),n(21));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(c.a,null,i.a.createElement(l.a,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},24:function(e,t,n){"use strict";var a=n(0),i=n.n(a),o=n(242),r=n(241),c=n(22),l=n(13),s=n(2),u=n(3),d=n(6),h=n(5),m=n(7),p=function(e){function t(){return Object(s.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return i.a.createElement("form",{onChange:this.props.handleChange,onSubmit:this.props.handleSubmit},i.a.createElement("label",{htmlFor:"title"},"title"),i.a.createElement("input",{id:"title",name:"title",type:"text",value:this.props.newNote.title}),i.a.createElement("label",{htmlFor:"text"},"text"),i.a.createElement("textarea",{id:"text",name:"text",value:this.props.newNote.text}),i.a.createElement("button",null,"Save"))}}]),t}(i.a.Component),f=n(11),v=n.n(f),g=n(16),b=n.n(g);n(227);b.a.initHighlightingOnLoad();var w=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(d.a)(this,Object(h.a)(t).call(this))).state={markdown:""},e}return Object(m.a)(t,e),Object(u.a)(t,[{key:"renderWelcome",value:function(){return"# hello there \n ## start adding markdown to get started"}},{key:"createCustomRenderer",value:function(){alert("creating new renderer");var e=new f.Renderer;e.code=function(e,t){var n=b.a.highlightAuto(e).value;return'<pre><code class="hljs">'.concat(n,"</code></pre>")},v.a.setOptions({renderer:e})}},{key:"resetRenderer",value:function(){v.a.setOptions({renderer:new f.Renderer})}},{key:"render",value:function(){var e=this.props.note,t=e.title,n=e.text;console.log("view info:",this.props.viewInfo),this.props.viewInfo.editing?this.resetRenderer():this.createCustomRenderer();var a=n||this.renderWelcome(),o=v()(a);return i.a.createElement("div",{id:"md-preview"},i.a.createElement("h1",null,"Preview of: ",t),i.a.createElement("div",{dangerouslySetInnerHTML:{__html:o}}))}}]),t}(i.a.Component),E=function(e){function t(){return Object(s.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{id:"mode-bar"},i.a.createElement("p",null,"Currently in ",this.props.viewInfo.editing?"Editing":"Viewing"," mode"),i.a.createElement("button",{onClick:this.props.toggleEdit},"Toggle"))}}]),t}(i.a.Component),O=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(d.a)(this,Object(h.a)(t).call(this))).initState={sections:[]},e.state=e.initState,e}return Object(m.a)(t,e),Object(u.a)(t,[{key:"loadContents",value:function(){if(this.props.text){var e=v()(this.props.text).match(/<h(?:1|2|3).+>.+</g).map(function(e){var t=e.match(/<h(1|2|3) id="(.+)">(.+)</);return{padding:t[1],link:t[2],text:t[3]}});this.setState({sections:e})}}},{key:"componentDidMount",value:function(){this.loadContents()}},{key:"componentDidUpdate",value:function(e){e.text!==this.props.text&&this.loadContents()}},{key:"render",value:function(){return i.a.createElement("div",{id:"table-of-contents"},i.a.createElement("h3",null,"Table of contents"),i.a.createElement("div",{id:"sections"},i.a.createElement("ul",null,this.state.sections.map(function(e){return i.a.createElement("li",{class:"padding-lvl-".concat(e.padding)},i.a.createElement("a",{href:"#".concat(e.link)},e.text))}))))}}]),t}(i.a.Component),j=n(12),y=n(243),k=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(d.a)(this,Object(h.a)(t).call(this))).handleChange=function(t){e.setState(Object(l.a)({},t.target.name,t.target.value))},e.handleSubmit=function(t){t.preventDefault(),console.log("update it"),j.a.update(Object(c.a)({},e.state,{oldTitle:e.props.match.params.fileName})).then(function(){e.props.match.params.fileName||e.setState({redirectNewFile:!0})})},e.initState={title:"",text:"",redirectNewFile:!1,redirectMissingFile:!1},e.state=e.initState,e}return Object(m.a)(t,e),Object(u.a)(t,[{key:"loadFile",value:function(e){var t=this,a=n(229)("./"+e+".md");fetch(a).then(function(e){return e.text()}).then(function(n){t.setState(function(t){return{title:e,text:n}})})}},{key:"componentDidMount",value:function(){console.log("mount");try{this.props.match.params.fileName&&this.loadFile(this.props.match.params.fileName)}catch(e){console.log("couldnt find the file"),this.setState({redirectMissingFile:!0})}}},{key:"componentDidUpdate",value:function(e,t,n){this.props.match.params.fileName!==e.match.params.fileName&&(this.props.match.params.fileName?this.loadFile(this.props.match.params.fileName):this.setState(this.initState)),this.state.redirectMissingFile&&this.setState(this.initState)}},{key:"render",value:function(){return this.state.redirectNewFile?(console.log("redirected new file"),i.a.createElement(y.a,{to:"/notes/".concat(this.state.title)})):this.state.redirectMissingFile?(console.log("redirected missing file"),i.a.createElement(y.a,{to:"/"})):i.a.createElement("div",{className:"note"},this.props.viewInfo.editing?i.a.createElement(p,{handleChange:this.handleChange,handleSubmit:this.handleSubmit,newNote:this.state,viewInfo:this.props.viewInfo,toggleEdit:this.props.toggleEdit}):"",i.a.createElement(w,{note:this.state,viewInfo:this.props.viewInfo}),this.props.viewInfo.editing?"":i.a.createElement(O,{text:this.state.text}),this.props.viewInfo.local?i.a.createElement(E,{viewInfo:this.props.viewInfo,toggleEdit:this.props.toggleEdit}):"")}}]),t}(i.a.Component);t.a=function(e){var t=e.viewInfo,n=e.toggleEdit;return i.a.createElement(o.a,null,i.a.createElement(r.a,{exact:!0,path:"/",render:function(e){return i.a.createElement(k,Object.assign({},e,{viewInfo:t,toggleEdit:n}))}}),i.a.createElement(r.a,{exact:!0,path:"/notes/:fileName",render:function(e){return i.a.createElement(k,Object.assign({},e,{viewInfo:t,toggleEdit:n}))}}),i.a.createElement(r.a,{exact:!0,path:"*",render:function(e){return i.a.createElement(k,Object.assign({},e,{viewInfo:t,toggleEdit:n}))}}))}},25:function(e,t,n){"use strict";var a=n(2),i=n(3),o=n(6),r=n(5),c=n(7),l=n(0),s=n.n(l),u=n(12),d=n(13),h=n(243),m=function(e){function t(){var e;return Object(a.a)(this,t),(e=Object(o.a)(this,Object(r.a)(t).call(this))).handleChange=function(t){e.setState(Object(d.a)({},t.target.name,t.target.value))},e.sleep=function(e){return new Promise(function(t){return setTimeout(t,e)})},e.handleSubmit=function(t){t.preventDefault(),u.a.create(e.state).then(function(t){t.msg?alert(t.msg):e.sleep(100).then(function(){e.setState({redirectNewFile:!0})})})},e.componentDidUpdate=function(){e.state.redirectNewFile&&e.setState({redirectNewFile:!1})},e.initState={title:"",redirectNewFile:!1},e.state=e.initState,e}return Object(c.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return this.state.redirectNewFile?s.a.createElement(h.a,{to:"/notes/".concat(this.state.title)}):s.a.createElement("div",{id:"new-file-modal"},s.a.createElement("h1",null,"I am the new file modal"),s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("label",null,"File Name"),s.a.createElement("input",{type:"text",name:"title",onChange:this.handleChange}),s.a.createElement("p",null,"Warning: creating a new file will destroy any unsaved changes. Be sure to save your current file"),s.a.createElement("button",{onClick:this.props.toggleNewFileModal},"Cancel"),s.a.createElement("button",null,"Create")))}}]),t}(s.a.Component),p=n(239),f=function(e){function t(){var e;return Object(a.a)(this,t),(e=Object(o.a)(this,Object(r.a)(t).call(this))).toggleNewFileModal=function(){console.log("hello"),e.setState(function(e){return{isNewFileModalVisibile:!e.isNewFileModalVisibile}})},e.state={files:[],isNewFileModalVisibile:!1},e}return Object(c.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){var e=n(40);this.setState({files:e})}},{key:"reload",value:function(){u.a.reload()}},{key:"isEditMode",value:function(){return this.props.viewInfo.editing&&this.props.viewInfo.local}},{key:"render",value:function(){return s.a.createElement("div",{id:"notes-dir"},s.a.createElement("h1",null,"Files"),this.isEditMode()?s.a.createElement("button",{onClick:this.toggleNewFileModal},"New File"):"",this.state.isNewFileModalVisibile?s.a.createElement(m,{toggleNewFileModal:this.toggleNewFileModal}):"",this.state.files.map(function(e,t){return s.a.createElement(p.a,{to:"/notes/".concat(e),key:t},e)}),this.isEditMode()?s.a.createElement("button",{onClick:this.reload},"Reload"):"")}}]),t}(s.a.Component);t.a=f},27:function(e,t,n){e.exports=n(238)},32:function(e,t,n){},35:function(e,t,n){},40:function(e){e.exports=["hapi-notes","hapi-pal","javascript","knex","test","test 2","test2"]}},[[27,2,1]]]);
//# sourceMappingURL=main.9408238f.chunk.js.map