(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,,function(t,e,n){t.exports=n(30)},,,,,function(t,e,n){},,function(t,e,n){},,,function(t){t.exports=["test","another-test","third-test","fourth-test","fifth","asdasdasdasdasd","my file "]},function(t,e,n){var a={"./another-test.md":23,"./asdasdasdasdasd.md":24,"./fifth.md":25,"./fourth-test.md":26,"./my file .md":27,"./test.md":28,"./third-test.md":29};function o(t){var e=r(t);return n(e)}function r(t){var e=a[t];if(!(e+1)){var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}return e}o.keys=function(){return Object.keys(a)},o.resolve=r,t.exports=o,o.id=22},function(t,e,n){t.exports=n.p+"static/media/another-test.d62f1558.md"},function(t,e,n){t.exports=n.p+"static/media/asdasdasdasdasd.a8f5f167.md"},function(t,e,n){t.exports=n.p+"static/media/fifth.acebaeab.md"},function(t,e,n){t.exports=n.p+"static/media/fourth-test.684123aa.md"},function(t,e,n){t.exports=n.p+"static/media/my file .68e34535.md"},function(t,e,n){t.exports=n.p+"static/media/test.5a9a6137.md"},function(t,e,n){t.exports=n.p+"static/media/third-test.35b0203d.md"},function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),r=n(8),i=n.n(r),c=(n(16),n(1)),l=n(2),s=n(4),u=n(3),d=n(5),m=(n(18),n(6)),h=n(9),f=function(){function t(){Object(c.a)(this,t)}return Object(l.a)(t,null,[{key:"getOne",value:function(t){return fetch("".concat("http://localhost:8100","/notes/").concat(t)).then(function(t){return t.json()})}},{key:"create",value:function(t){var e={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};return fetch("".concat("http://localhost:8100","/notes"),e).then(function(t){return t.json()})}}]),t}(),p=function(t){function e(){var t;return Object(c.a)(this,e),(t=Object(s.a)(this,Object(u.a)(e).call(this))).handleChange=function(e){t.setState({newNote:Object(h.a)({},t.state.newNote,Object(m.a)({},e.target.name,e.target.value))})},t.handleSubmit=function(e){e.preventDefault(),f.create(t.state),t.handleClear(e)},t.handleClear=function(e){e.preventDefault(),t.setState(t.initState)},t.initState={newNote:{title:"",text:""}},t.state=t.initState,t}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return o.a.createElement("form",{onChange:this.handleChange,onSubmit:this.handleSubmit},o.a.createElement("p",null,"tester: ",this.state.newNote.text),o.a.createElement("label",{htmlFor:"title"},"title"),o.a.createElement("input",{id:"title",name:"title",type:"text",value:this.state.newNote.title}),o.a.createElement("label",{htmlFor:"text"},"text"),o.a.createElement("textarea",{id:"text",name:"text",value:this.state.newNote.text}),o.a.createElement("button",null,"Submit"),o.a.createElement("button",{onClick:this.handleClear},"Clear"))}}]),e}(o.a.Component),b=n(10),v=n.n(b),w=function(t){function e(){var t;return Object(c.a)(this,e),(t=Object(s.a)(this,Object(u.a)(e).call(this))).state={markdown:""},t}return Object(d.a)(e,t),Object(l.a)(e,[{key:"componentWillMount",value:function(){var t=this,e=n(21);console.log(e);for(var a=0;a<e.length;a++){var o=n(22)("./"+e[a]+".md");fetch(o).then(function(t){return t.text()}).then(function(e){t.setState(function(t){return{markdown:t.markdown+v()(e)}})})}}},{key:"render",value:function(){var t=this.state.markdown;return console.log("location",window.location.href),o.a.createElement("div",null,o.a.createElement("h1",null,"Preview"),o.a.createElement("section",null,o.a.createElement("article",{dangerouslySetInnerHTML:{__html:t}})))}}]),e}(o.a.Component),O=function(t){function e(){return Object(c.a)(this,e),Object(s.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(p,null),o.a.createElement(w,null))}}]),e}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}],[[11,2,1]]]);
//# sourceMappingURL=main.6006d6a0.chunk.js.map